package httpserver

import "github.com/milvus-io/milvus-proto/go-api/v3/schemapb"

type BorrowReq struct {
	Schema schemapb.CollectionSchema `json:"schema"`
}
