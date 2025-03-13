# DescribeAlias()

This method describes an alias by providing detailed information about its associated collection.

```go
func (c *Client) DescribeAlias(ctx context.Context, option DescribeAliasOption, callOptions ...grpc.CallOption) (*entity.Alias, error)
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
     <td><p><code>DescribeAliasOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeAliasOption

This is an interface type. The `describeAliasOption` struct type implements this interface type. 

You can use the `NewDescribeAliasOption()` function to get the concrete implementation.

### NewDescribeAliasOption

The signature of this method is as follows:

```go
func NewDescribeAliasOption(alias string) *describeAliasOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>alias</code></p></td>
     <td><p>Alias to be described.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## entity.Alias

The `entity.Alias` struct type is as follows:

```go
type Alias struct {
    DbName         string
    Alias          string
    CollectionName string
}
```

## Return

`*entity.Alias`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

alias, err := cli.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption("bob"))
if err != nil {
        // handle error
}
fmt.Println(alias)
```
