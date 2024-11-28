# listPartitions()

This operation lists the partitions in a specified collection.

```javascript
listPartitions(data): Promise<ShowPartitionsResponse>
```

## Request Syntax

```javascript
milvusClient.listPartitions({
    collection_name: string,
    timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ShowPartitionsResponse>*

This method returns a promise that resolves to a **ShowPartitionsResponse** object.

```javascript
{
    created_timestamps: string | list[string],
    created_utc_timestamps: string | list[string],
    partitionIDs: number | list[number],
    partition_names: string | list[string],
    status: object
}
```

**PARAMETERS:**

- **created_timestamps** (*string* | *list[string]*) -

    The timestamp indicating the creation time of the partition.

- **created_utc_timestamps** (*string* | *list[string]*) -

    The timestamp in UTC indicating the creation time of the partition.

- **partitionIDs** (*number* | *list[number]*) -

    A list of the IDs of the partitions.

- **partition_names** (*string* | *list[string]*) -

    A list of the names of the partitions.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
new milvusClient(MILUVS_ADDRESS).listPartitions({
    collection_name: 'my_collection',
 });
```

