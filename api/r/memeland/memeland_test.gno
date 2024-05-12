package memeland

import (
	"std"
	"testing"
	"time"
	"sort"

	"gno.land/p/demo/memeland"
    "gno.land/p/demo/testutils"
)

func TestPostMeme(t *testing.T) {
	m := memeland.NewMemeland()
	data := "Test meme data"
	timestamp := time.Now().Unix()
	id := m.PostMeme(data, timestamp)
	if id == "" {
		t.Errorf("Expected valid ID, got empty string")
	}
}


func TestUpvote(t *testing.T) {
	m := memeland.NewMemeland()
	id := m.PostMeme("Another test meme", time.Now().Unix()) 
	result := m.Upvote(id)
	if result != "upvote successful" {
		t.Errorf("Expected 'upvote successful', got %s", result)
	}
}


func TestGetPostsInRange(t *testing.T) {
	m := memeland.NewMemeland()
	startTimestamp := time.Now().Add(-24 * time.Hour).Unix()
	endTimestamp := time.Now().Unix()                       
	page, pageSize := 1, 10
	sortBy := "DATE_CREATED"
	m.PostMeme("Old Meme", startTimestamp-10)
	m.PostMeme("New Meme", endTimestamp-10)
	result := m.GetPostsInRange(startTimestamp, endTimestamp, page, pageSize, sortBy)
	if result == "" || result == "[]" {
		t.Errorf("Expected non-empty result, got %s", result)
	}
}


func TestRemovePost(t *testing.T) {
	m := memeland.NewMemeland()
	id := m.PostMeme("Meme to be deleted", time.Now().Unix())
	removedID := m.RemovePost(id)
	if removedID != id {
		t.Errorf("Expected %s to be removed, got %s", id, removedID)
	}
}

func TestTransferOwnership(t *testing.T) {
	m := memeland.NewMemeland()
	newOwner := testutils.TestAddress("g1newowneraddress")
	err := m.TransferOwnership(std.Address(newOwner))
	if err != nil {
		t.Errorf("Expected no error, got %s", err)
	}
	if m.Owner() != std.Address(newOwner) {
		t.Errorf("Expected new owner to be %s, got %s", newOwner, m.Owner())
	}
}