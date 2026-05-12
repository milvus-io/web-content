# getPartitionStatistics()

This operation displays the statistics collected on a specific partition.

```javascript
await milvusClient.getPartitionStatistics(data)
```

## Request Syntax

```javascript
await milvusClient.getPartitionStatistics({
    db_name: string,
    collection_name: string,
    partition_name: string,
    timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*) -

    **[REQUIRED]**

    The name of an existing partition.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<StatisticsResponse>*

This method returns a promise that resolves to a **StatisticsResponse** object.

```javascript
{
    stats: KeyValuePair[],
    data: { [x: string]: any },
    status:  ResStatus
}
```

**PARAMETERS:**

- **stats** (*KeyValuePair[]*) -
The raw statistics list returned by Milvus. Each entry has a **key** (for example, **row_count**) and a **value** as a string.

- **data** (*Record<string, any>*) -
A flattened, key-indexed view of **stats** for convenience. For example, `data.row_count` returns the partition row count as a string.

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
}).getPartitionStatistics({
    collection_name: 'my_collection',
    partition_name: "_default",
 });
```

