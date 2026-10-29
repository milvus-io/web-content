# MilvusException

The exception thrown by [MilvusClientV2](MilvusClientV2.md) for errors related to the Milvus client.

```csharp
public sealed class MilvusException : Exception
```

A **MilvusException** carries a [MilvusErrorCode](MilvusErrorCode.md) describing the error and, for transport-level failures, the underlying gRPC status code.

## Constructors

Constructs a **MilvusException**.

```csharp
public MilvusException()
public MilvusException(string message)
public MilvusException(string message, Exception innerException)
public MilvusException(MilvusErrorCode errorCode, string reason)
public MilvusException(MilvusErrorCode errorCode, string reason, Exception innerException)
public MilvusException(MilvusErrorCode errorCode, string reason, Grpc.Core.StatusCode grpcStatusCode, Exception innerException)
```

**PARAMETERS:**

- `message` (*string*) -

    The error message.

- `innerException` (*Exception*) -

    The exception that caused this exception.

- `errorCode` (*MilvusErrorCode*) -

    The error code.

- `reason` (*string*) -

    The reason reported by the server.

- `grpcStatusCode` (*Grpc.Core.StatusCode*) -

    The underlying gRPC status code.

## Properties

- `ErrorCode` (*MilvusErrorCode*) -

    The error code.

- `GrpcStatusCode` (*Grpc.Core.StatusCode?*) -

    The underlying gRPC status code, when this exception wraps a transport-level `RpcException`. `null` for server-returned errors.

## Example

```csharp
using Milvus.Client.V2;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

try
{
    await client.DescribeCollectionAsync(new DescribeCollectionReq("my_collection"));
}
catch (MilvusException e)
{
    Console.WriteLine(e.ErrorCode);
}
```
