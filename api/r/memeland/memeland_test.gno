package memeland

import (
	"std"
	"testing"
	"time"

	"gno.land/p/demo/testutils"
	"gno.land/r/demo/users"
)

func TestPostMeme(t *testing.T) {
	data := "Test meme data"

	// register user
	user1 := testutils.TestAddress("user1")
	std.TestSetOrigCaller(user1)
	std.TestSetOrigSend(std.NewCoins(std.NewCoin("ugnot", 2_000_000)), nil)
	println(std.CurrentRealm().Addr())
	users.Register("", "user1", "1231")

	startTimestamp := time.Now()
	//endTimestamp := time.Now().Add(24 * time.Hour)
	//println(std.GetOrigCaller())
	//println(std.PrevRealm().Addr())

	id := PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())

	println(id)
	//if id == "" {
	//	t.Errorf("Expected valid ID, got empty string")
	//}
	//
	//page, pageSize := 1, 10
	//sortBy := "DATE_CREATED"
	//
	//results := GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
	//if results == "" || results == "[]" {
	//	t.Errorf("Expected non-empty result, got %s", results)
	//}
	//
	//if !strings.Contains(results, data) {
	//	t.Errorf("Expected %s in the JSON string, but counld't find it", data)
	//}
}

//func TestUpvote(t *testing.T) {
//	data := "Test meme data"
//
//	startTimestamp := time.Now()
//	endTimestamp := time.Now().Add(24 * time.Hour)
//
//	id := PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())
//
//	page, pageSize := 1, 10
//	sortBy := "DATE_CREATED"
//
//	results := GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
//	upvoteData := "\"upvotes\":0"
//
//	if !strings.Contains(results, upvoteData) {
//		t.Errorf("Expected %s in the JSON string, but counld't find it", upvoteData)
//	}
//
//	Upvote(id)
//	upvoteData = "\"upvotes\":1"
//	results = GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
//
//	if !strings.Contains(results, upvoteData) {
//		t.Errorf("Expected %s in the JSON string, but counld't find it", upvoteData)
//	}
//}
//
//func TestGetPostsInRange(t *testing.T) {
//	startTimestamp := time.Now().Add(-24 * time.Hour).Unix()
//	endTimestamp := time.Now().Unix()
//	page, pageSize := 1, 10
//
//	sortBy := "DATE_CREATED"
//	memeData1 := "Old Meme"
//	memeData2 := "New Meme"
//
//	PostMeme(memeData1, startTimestamp-10)
//	PostMeme(memeData2, endTimestamp-10)
//
//	results := GetPostsInRange(startTimestamp, endTimestamp, page, pageSize, sortBy)
//	if results == "" || results == "[]" {
//		t.Errorf("Expected non-empty result, got %s", results)
//	}
//
//	if strings.Contains(results, memeData1) || !strings.Contains(results, memeData2) {
//		t.Errorf("Expected to find %s and not find %s in the JSON string, which was not the case", memeData1, memeData2)
//	}
//}
//
//func TestRemovePost(t *testing.T) {
//	data := "Test meme data"
//
//	startTimestamp := time.Now()
//	endTimestamp := time.Now().Add(24 * time.Hour)
//
//	id := PostMeme(data, startTimestamp.Add(10*time.Minute).Unix())
//
//	page, pageSize := 1, 10
//	sortBy := "DATE_CREATED"
//
//	results := GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
//	if !strings.Contains(results, data) {
//		t.Errorf("Expected %s in the JSON string, but counld't find it", data)
//	}
//
//	removedId := RemovePost(id)
//
//	if id != removedId {
//		t.Errorf("Expected to get %d, got %d for removed ID", id, removedId)
//	}
//
//	results = GetPostsInRange(startTimestamp.Unix(), endTimestamp.Add(1*time.Hour).Unix(), page, pageSize, sortBy)
//	if strings.Contains(results, data) {
//		t.Errorf("Expected to not find %s in JSON string after deleting the post", data)
//	}
//}

//func TestTransferOwnership(t *testing.T) {
//	newOwner := testutils.TestAddress("newOwnerAddress")
//
//	if m.Owner() != std.Address(newOwner) {
//		t.Errorf("Expected new owner to be %s, got %s", newOwner, GetOwner())
//	}
//}
