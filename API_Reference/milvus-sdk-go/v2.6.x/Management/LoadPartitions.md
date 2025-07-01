# LoadPartitions()

This method loads one or multiple specified partitions.

```go
func (c *Client) LoadPartitions(ctx context.Context, option LoadPartitionsOption, callOptions ...grpc.CallOption) (LoadTask, error)
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
     <td><p><code>LoadPartitionsOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## LoadPartitionsOption

This is an interface type. The `loadPartitionsOption` struct type implements this interface type. 

You can use the `NewLoadPartitionsOption()` function to get the concrete implementation.

### NewLoadPartitionsOption()

The signature of this method is as follows:

```go
func NewLoadPartitionsOption(collectionName string, partitionsNames ...string) *loadPartitionsOption
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
     <td><p><code>partitionsNames</code></p></td>
     <td><p>Names of the partitions to load.</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

## Return

`LoadTask`

## Example

```go
task, err := cli.LoadPartitions(ctx, milvusclient.NewLoadPartitionsOption("custom_quick_setup", "default", "partitionA"))
if err != nil {
        // handle error
}

task.Await(ctx)
```
