# AlterAlias()

This method changes the alias associated with the specified collection.

```go
func (c *Client) AlterAlias(ctx context.Context, option AlterAliasOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Collection-AlterAlias#alteraliasoption"><code>AlterAliasOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## AlterAliasOption

This is an interface type. The `alterAliasOption` struct type implements this interface type. 

You can use the `NewAlterAliasOption()` function to get the concrete implementation.

### NewAlterAliasOption

The signature of this method is as follows:

```go
func NewAlterAliasOption(alias, collectionName string) *alterAliasOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>alias</code></p></td>
     <td><p>Alias to be assigned to the collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```plaintext
err = cli.AlterAlias(ctx, milvusclient.NewAlterAliasOption("alice", "customized_setup_1"))
if err != nil {
    // handle error
}

aliases, err := cli.ListAliases(ctx, milvusclient.NewListAliasesOption("customized_setup_1"))
if err != nil {
    // handle error
}
fmt.Println(aliases)

aliases, err = cli.ListAliases(ctx, milvusclient.NewListAliasesOption("customized_setup_2"))
if err != nil {
    // handle error
}
fmt.Println(aliases)
```
