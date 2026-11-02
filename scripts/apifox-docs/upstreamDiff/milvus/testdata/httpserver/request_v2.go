package httpserver

import "encoding/json"

type EmptyReq struct{}

type CollectionNameReq struct {
	DbName         string   `json:"dbName"`
	CollectionName string   `json:"collectionName" binding:"required"`
	PartitionNames []string `json:"partitionNames"`
	Untagged       string
}

type CollectionDataReq struct {
	DbName         string                   `json:"dbName"`
	CollectionName string                   `json:"collectionName" binding:"required"`
	Data           []map[string]interface{} `json:"data" binding:"required"`
	Options        map[string]string        `json:"options"`
	Raw            json.RawMessage          `json:"raw"`
	Any            interface{}              `json:"any"`
	Count          *int64                   `json:"count"`
	Aliases        [][]string               `json:"aliases"`
	Skipped        string                   `json:"-"`
}

type JobIDReq struct {
	JobID string `json:"jobId" binding:"required"`
}

type FunctionScore struct {
	Name  string `json:"name"`
	Exact *bool  `json:"exact"`
}

type SearchReq struct {
	Params map[string]float64 `json:"params"`
	Scores []FunctionScore    `json:"scores"`
	Helper *FunctionScore     `json:"helper"`
}

// Unreachable from the route table: never enters the skeleton even though its
// shape is unsupported (channels are not JSON).
type Unreachable struct {
	Signal chan int
}

type CreateCollectionReq struct {
	DbName         string            `json:"dbName"`
	CollectionName string            `json:"collectionName" binding:"required"`
	Dimension      *int32            `json:"dimension"`
	Schema         *CollectionSchema `json:"schema"`
}

type CollectionSchema struct {
	Fields []FieldSchema `json:"fields" binding:"required"`
}

type FieldSchema struct {
	Name     string `json:"name" binding:"required"`
	DataType string `json:"dataType" binding:"required"`
}
