# Flush()

This method flushes data into storage.

```go
func (c *Client) Flush(ctx context.Context, option FlushOption, callOptions ...grpc.CallOption) (*FlushTask, error)
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
     <td><p><code>FlushOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## FlushOption

This is an interface type. The `flushOption` struct types implement this interface type. 

You can use the `NewFlushOption` function to get the concrete implementation.

### NewFlushOption

The signature of this method is as follows:

```go
func NewFlushOption(collName string) *flushOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## FlushTask

The is a struct type. It provides the following methods.

### Await

This method awaits the current flush task to complete. The signature is as follows:

```plaintext
func (t *FlushTask) Await(ctx context.Context) error
```

This method does not take any input parameters.

### GetFlushStats

This method returns the statistics on the current flush tasks. The signature is as follows:

```plaintext
func (t *FlushTask) GetFlushStats() (segIDs []int64, flushSegIDs []int64, flushTs uint64, channelCheckpoints map[string]*msgpb.MsgPosition)
```

This method does not take any input parameters. The following table lists the values that return.

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>segIDs</code></p></td>
     <td><p>List of segment IDs.</p></td>
     <td><p><code>[]int64</code></p></td>
   </tr>
   <tr>
     <td><p><code>flushSegIDs</code></p></td>
     <td><p>List of flush segment IDs.</p></td>
     <td><p><code>[]int64</code></p></td>
   </tr>
   <tr>
     <td><p><code>flushTs</code></p></td>
     <td><p>Flush timestamp.</p></td>
     <td><p><code>unit64</code></p></td>
   </tr>
   <tr>
     <td><p><code>channelCheckpoints</code></p></td>
     <td><p>Channel check points</p></td>
     <td><p><code>map[string]*msgpb.MsgPosition</code></p></td>
   </tr>
</table>

## Return

`*FlushTask`

## Example

```plaintext
collectionName := `customized_setup_1`

task, err := cli.Flush(ctx, milvusclient.NewFlushOption(collectionName))
if err != nil {
    // handle err
}

// wait flush done, you could choose to ignore this task to do async flush
err = task.Await(ctx)
if err != nil {
    // handle err
}
```

