# TruncateCollection()

This operation removes all data from a collection but retains the collection schema and structure

```go
func (c *Client) TruncateCollection(ctx context.Context, option TruncateCollectionOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
err := client.TruncateCollection(
    ctx, 
    milvusclient.NewTruncateCollectionOption("collection_name")
)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
package main

import (
    "context"
    "log"
    
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
    ctx := context.Background()
    
    client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: "localhost:19530",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    // Truncate collection
    err = client.TruncateCollection(ctx, milvusclient.NewTruncateCollectionOption("my_collection"))
    if err != nil {
        log.Printf("Failed to truncate collection: %v", err)
        return
    }
    
    log.Println("Collection truncated successfully")
}
```
