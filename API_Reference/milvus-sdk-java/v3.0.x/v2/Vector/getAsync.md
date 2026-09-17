# getAsync()

Retrieves entities by their primary keys asynchronously, using the same request parameters as [get()](get.md).

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

This method invokes the same RPC interface as `get()`, but returns a `CompletableFuture` that completes with the response, or exceptionally when the operation fails.

## Request Syntax

```java
GetReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .partitionNames(List<String> partitionNames)
    .ids(List<Object> ids)
    .outputFields(List<String> outputFields)
    .build();
```

Refer to [get()](get.md) for the full list of builder methods.

**RETURNS:**

*CompletableFuture\<GetResp\>*

A future that completes with a **GetResp** object representing one or more queried entities, or exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
GetResp getResp = client.getAsync(GetReq.builder()
    .collectionName("test")
    .ids(Collections.singletonList("0"))
    .build()).get();
```
