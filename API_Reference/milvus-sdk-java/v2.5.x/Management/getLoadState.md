# getLoadState()

This operation displays whether a specified collection or partition is loaded or not.

```java
public Boolean getLoadState(GetLoadStateReq request)
```

## Request Syntax

```java
getLoadState(GetLoadStateReq.builder()
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

- `partitionName(String partitionName)`

    The name of a partition.

**RETURN TYPE:**

*Boolean*

**RETURNS:**

A Boolean value that indicates the status of the specified collection or partition. 

<div class="admonition note">

<p><b>notes</b></p>

<p>A collection is in the loaded state if any or all of its partitions are loaded.</p>

</div>

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// get load state for collection "test"
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
        .collectionName("test")
        .build();
Boolean resp = client.getLoadState(getLoadStateReq);
// return true or false
```
