# AddCollectionField()

This operation adds a new scalar field to an existing collection without recreating it. The field becomes available almost immediately with minimal delay due to internal schema synchronization.

```go
func (c *Client) AddCollectionField(ctx context.Context, opt AddCollectionFieldOption, callOpts ...grpc.CallOption) error
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><a href="./v2-Collection-AddCollectionField#addcollectionfieldoption"><code>AddCollectionFieldOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## AddCollectionFieldOption

This is an interface type. The `addCollectionFieldOption` struct type implements this interface. You can use `NewAddCollectionFieldOption()` to get its concrete implementation.

```go
func NewAddCollectionFieldOption(collectionName string, field *entity.Field) *addCollectionFieldOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>field</code></p></td>
     <td><p>The field to add.</p></td>
     <td><p><a href="./v2-Collection-CreateCollection#entityfield"><code>*entity.Field</code></a></p></td>
   </tr>
</table>

## Return

Null

## Example

```go
package main

import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    milvusAddr := "127.0.0.1:19530"

    cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: milvusAddr,
    })
    if err != nil {
        log.Fatal("failed to connect to milvus server: ", err.Error())
    }

    defer cli.Close(ctx)

    // the field to add
    // must be nullable for now
    newField := entity.NewField().WithName("new_field").WithDataType(entity.FieldTypeInt64).WithNullable(true)

    err = cli.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("customized_setup_2", newField))
    if err != nil {
        // handle error
    }
}

```
