package httpserver

type CollectionNameReq struct {
	CollectionName string `json:"collectionName" binding:"required"`
}
