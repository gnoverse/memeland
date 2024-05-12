package memeland

import (
	"std"
	"strings"
	"testing"
	"time"

	"gno.land/p/demo/memeland"
	"gno.land/p/demo/testutils"
)

func TestPostMeme(t *testing.T) {
	m := memeland.NewMemeland()
	data := "Test meme data"

	startTimestamp := time.Now()
	endTimestamp := time.Now().Add(24 * time.Hour)

	id := m.PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())
	if id == "" {
		t.Errorf("Expected valid ID, got empty string")
	}

	page, pageSize := 1, 10
	sortBy := "DATE_CREATED"

	results := m.GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
	if results == "" || results == "[]" {
		t.Errorf("Expected non-empty result, got %s", results)
	}

	if !strings.Contains(results, data) {
		t.Errorf("Expected %s in the JSON string, but counld't find it", data)
	}
}

func TestUpvote(t *testing.T) {
	m := memeland.NewMemeland()
	data := "Test meme data"

	startTimestamp := time.Now()
	endTimestamp := time.Now().Add(24 * time.Hour)

	id := m.PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())

	page, pageSize := 1, 10
	sortBy := "DATE_CREATED"

	results := m.GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
	upvoteData := "\"upvotes\":0"

	if !strings.Contains(results, upvoteData) {
		t.Errorf("Expected %s in the JSON string, but counld't find it", upvoteData)
	}

	m.Upvote(id)
	upvoteData = "\"upvotes\":1"
	results = m.GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)

	if !strings.Contains(results, upvoteData) {
		t.Errorf("Expected %s in the JSON string, but counld't find it", upvoteData)
	}
}

func TestGetPostsInRange(t *testing.T) {
	m := memeland.NewMemeland()
	startTimestamp := time.Now().Add(-24 * time.Hour).Unix()
	endTimestamp := time.Now().Unix()
	page, pageSize := 1, 10

	sortBy := "DATE_CREATED"
	memeData1 := "Old Meme"
	memeData2 := "New Meme"

	m.PostMeme(memeData1, startTimestamp-10)
	m.PostMeme(memeData2, endTimestamp-10)

	results := m.GetPostsInRange(startTimestamp, endTimestamp, page, pageSize, sortBy)
	if results == "" || results == "[]" {
		t.Errorf("Expected non-empty result, got %s", results)
	}

	if strings.Contains(results, memeData1) || !strings.Contains(results, memeData2) {
		t.Errorf("Expected to find %s and not find %s in the JSON string, which was not the case", memeData1, memeData2)
	}
}

func TestRemovePost(t *testing.T) {
	m := memeland.NewMemeland()
	data := "Test meme data"

	startTimestamp := time.Now()
	endTimestamp := time.Now().Add(24 * time.Hour)

	id := m.PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())

	page, pageSize := 1, 10
	sortBy := "DATE_CREATED"

	results := m.GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
	if !strings.Contains(results, data) {
		t.Errorf("Expected %s in the JSON string, but counld't find it", data)
	}

	removedId := m.RemovePost(id)

	if id != removedId {
		t.Errorf("Expected to get %d, got %d for removed ID", id, removedId)
	}

	results = m.GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
	if strings.Contains(results, data) {
		t.Errorf("Expected to not find %s in JSON string after deleting the post", data)
	}
}

func TestTransferOwnership(t *testing.T) {
	m := memeland.NewMemeland()
	newOwner := testutils.TestAddress("newOwnerAddress")
	err := m.TransferOwnership(std.Address(newOwner))

	if err != nil {
		t.Errorf("Expected no error, got %s", err)
	}

	if m.Owner() != std.Address(newOwner) {
		t.Errorf("Expected new owner to be %s, got %s", newOwner, m.Owner())
	}
}
