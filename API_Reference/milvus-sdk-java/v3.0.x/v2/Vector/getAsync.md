# getAsync()

Gets specific entities asynchronously by their IDs.

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

This method uses the same parameters as `get()`. It submits the request asynchronously and returns a `CompletableFuture` immediately; the future completes with the queried entities when the RPC finishes.

## Request Syntax

```java
getAsync(GetReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .partitionNames(List<String> partitionNames)
    .ids(List<Object> ids)
    .outputFields(List<String> outputFields)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of an existing collection.

- `partitionName(String partitionName)`

    The name of a partition.

- `partitionNames(List<String> partitionNames)`

    A list of partition names.

- `ids(List<Object> ids)`

    A specific entity ID or a list of entity IDs.

- `outputFields(List<String> outputFields)`

    A list of names of the fields to be included in the query result.

**RETURN TYPE:**

*CompletableFuture&lt;GetResp&gt;*

**RETURNS:**

A `CompletableFuture` that completes with a **GetResp** object representing one or more queried entities.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
GetResp getResp = client.getAsync(GetReq.builder()
        .collectionName("test")
        .ids(Collections.singletonList("0"))
        .build()).join();
```
