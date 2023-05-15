# connect()

This method connects the client to a Milvus connection.

## Invocation

```python
connect(alias, **kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `alias`      | Connection alias                                             | String                          | True     |
| `kwargs`
| `kwargs`: `host`     | IP address of the Milvus connection.| String          | True  |
| `kwargs`: `port`     | Port of the Milvus connection.| Integer          | True  |
| `kwargs`: `uri`  | Milvus instance endpoint, usually in the form of `<scheme>://<host>:<port>`. Possible examples are `http://localhost:19530`, `tcp:localhost:19530`, `https://localhost:19530`. | True |
| `kwargs`: `secure` | Whether TLS/SSL is required to access the endpoint. | Integer | False | 

## Return

No return.

## Raises

- `NotImplementedError` -- error if the handler in connection parameters is not gRPC.
- `ParamError` -- error if the parameter is invalid.
- `Exception` -- error if the server specified in parameters is not ready.

## Example

```python
from pymilvus import connections

# Use host and port
connections.connect(
  alias="default", 
  host='localhost', 
  port='19530'
)

# Use uri
uri="http://localhost:19530"
connections.connect(uri=uri)

# Use environment variable
# The following assumes that you have already set an environment 
# variable using export MILVUS_URI=http://username:password@localhost:19530
connections.connect()

# Use environment files
# A sample file at https://github.com/milvus-io/pymilvus/blob/master/.env.example
# Rename the file to .env so that pymilvus will automatically load it.
connections.connect()
```
