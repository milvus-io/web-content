# unpinSnapshotData()

This operation releases a snapshot data pin created by `pinSnapshotData()`.

```java
public void unpinSnapshotData(UnpinSnapshotDataReq request)
```

## Request Syntax

```java
unpinSnapshotData(UnpinSnapshotDataReq.builder()
    .pinId(Long pinId)
    .build()
)
```

**BUILDER METHODS:**

- `pinId(Long pinId)`

    The pin ID returned by `pinSnapshotData()`.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.service.snapshot.request.UnpinSnapshotDataReq;

UnpinSnapshotDataReq request = UnpinSnapshotDataReq.builder()
    .pinId(987654321L)
    .build();

client.unpinSnapshotData(request);
```
