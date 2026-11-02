package httpserver

type CollectionNameReq struct {
	CollectionName string `json:"collectionName" binding:"required"`
}

type JobIDReq struct {
	JobID string `json:"jobId"`
}
