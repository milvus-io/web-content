# LoadCollection()

This method loads the specified collection to memory (for search and query).

```go
func (c *GrpcClient) LoadCollection(ctx context.Context, collName string, async bool, opts ...LoadCollectionOption) error
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
     <td><p><code>collName</code></p></td>
     <td><p>Name of the collection to load.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>async</code></p></td>
     <td><p>Whether to execute this request asynchronously.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra settings for this request.</p></td>
     <td><p><code>client.LoadCollectionOption</code></p></td>
   </tr>
</table>

### client.LoadCollectionOption

You can add extra settings to the `LoadCollection()` request using the following methods.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithReplicaNumber(rn int32)</code></p></td>
     <td><p>Number of replicas to create upon the load of the collection.</p></td>
   </tr>
   <tr>
     <td><p><code>WithResourceGroups(rgs []string)</code></p></td>
     <td><p>A list of specific resource groups used to load the replicas.</p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The call to this API fails.

## Example

```go
// load collection
errLoad := mc.LoadCollection(context.Background(), collectionName, false, client.WithReplicaNumber(1))
if errLoad != nil {
   log.Fatal("failed to load collection:", errLoad.Error())
}
```
