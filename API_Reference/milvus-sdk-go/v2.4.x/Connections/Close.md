# Close()

This method closes the connection to Milvus.

```go
func (c *GrpcClient) Close() error
```

## Request Parameters

Null

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- The call to this API fails.

## Example

```go
mc.Close()
```
