# listPartitions()

This operation lists the partitions in a specified collection.

```javascript
listPartitions(data): Promise<ShowPartitionsResponse>
```

## Request Syntax

```javascript
milvusClient.listPartitions({
    db_name: string,
    collection_name: string,
    type?: ShowPartitionsType,
    timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **type** (*ShowPartitionsType*) -

     Whether to list all partitions or just the loaded one. Possible values are **All** and **Loaded**.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;ShowPartitionsResponse&gt;*

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

- **created_timestamps** (*string* | *list&#91;string&#93;*) -

    The timestamp indicating the creation time of the partition.

- **created_utc_timestamps** (*string* | *list&#91;string&#93;*) -

    The timestamp in UTC indicating the creation time of the partition.

- **partitionIDs** (*number* | *list&#91;number&#93;*) -

    A list of the IDs of the partitions.

- **partition_names** (*string* | *list&#91;string&#93;*) -

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

