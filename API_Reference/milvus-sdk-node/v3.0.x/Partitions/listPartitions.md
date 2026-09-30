# listPartitions()

This operation lists the partitions in a specified collection.

```javascript
await milvusClient.listPartitions(data)
```

## Request Syntax

```javascript
await milvusClient.listPartitions({
    db_name: string,
    collection_name: string,
    timeout?: number,
    type?: ShowPartitionsType
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **type** (*ShowPartitionsType*) - 

    Determines whether to list all partitions or only the loaded ones. A **ShowPartitionsType** has the following values:

    - **All** = 0

        Indicates that all partitions are to be listed.

    - **Loaded** = 1

        Indicates that only the loaded partitions are to be listed.

**RETURNS** *Promise<ShowPartitionsResponse>*

This method returns a promise that resolves to a **ShowPartitionsResponse** object.

```javascript
{
    partition_names: string[],
    partitionIDs: number[],
    data: PartitionData[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **partition_names** (*string[]*) -
A list of partition names defined on the collection.

- **partitionIDs** (*number[]*) -
The internal identifiers of the partitions, in the same order as **partition_names**.

- **data** (*PartitionData[]*) -
A flattened, per-partition view that bundles the name, identifier, creation timestamp, and load percentage.

    - **name** (*string*) -

        The partition name.

    - **id** (*string*) -

        The partition identifier.

    - **timestamp** (*string*) -

        The creation timestamp of the partition.

    - **loadedPercentage** (*string*) -

        The percentage of the partition that is currently loaded into memory.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
}).listPartitions({
    collection_name: 'my_collection',
 });
```

