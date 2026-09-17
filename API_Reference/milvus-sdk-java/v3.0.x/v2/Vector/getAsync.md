# getAsync()

Asynchronously gets specific entities by their IDs. The request and builder parameters are identical to [get()](get.md); this variant returns a `CompletableFuture` instead of blocking.

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

## Request Syntax

```java
CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .partitionNames(partitionNames)
    .ids(ids)
    .outputFields(outputFields)
    .build());
```

For the **BUILDER METHODS**, see [get()](get.md).

**RETURNS:**

*CompletableFuture\<GetResp\>*

A future that completes with the queried entities once the server responds. Check `future.get()` to retrieve the `GetResp`, or attach a callback to handle success and failure asynchronously.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates getAsync() against Milvus.

```java
CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
    .collectionName("books")
    .ids(Collections.singletonList("0"))
    .build());

future.whenComplete((resp, error) -> {
    if (error != null) {
        error.printStackTrace();
        return;
    }
    System.out.println(resp.getFields());
});
```
