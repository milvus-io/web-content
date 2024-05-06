# delete()

This operation deletes entities by their IDs or with a boolean expression.

```java
public DeleteResp delete(DeleteReq request)
```

## Request Syntax

```java
delete(DeleteReq.builder()
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .filter(String filter)
    .ids(List<Object> ids)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

- `partitionName(String partitionName)`

    The name of a partition.

- `filter(String filter)`

    A scalar filtering condition to filter matching entities. 

    The value defaults to an empty string, indicating that no condition applies.

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Scalar Expression Rules](https://milvus.io/docs/boolean.md).

- `ids(List<Object> ids)`

    A specific entity ID or a list of entity IDs.

**RETURN TYPE:**

*DeleteResp*

**RETURNS:**

A **DeleteResp** object contains the number of deleted entities.

**PARAMETERS:**

- **deleteCnt** (*long*)

    The count of deleted entities.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// delete entities with filter "id > 10"
DeleteReq deleteReq = DeleteReq.builder()
        .collectionName("test")
        .filter("id > 10")
        .build();
client.delete(deleteReq);
```

