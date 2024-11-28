# getPartitionStatistics()

This operation displays the statistics collected on a specific partition.

```javascript
getPartitionStatistics(data): Promise<StatisticsResponse>
```

## Request Syntax

```javascript
milvusClient.getPartitionStatistics({
    collection_name: string,
    partition_name: string,
    timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*) -

    **[REQUIRED]**

    The name of an existing partition.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<StatisticsResponse>*

This method returns a promise that resolves to a **StatisticsResponse** object.

```javascript
{
    data: string,
    stats:string,
    status: object
}
```

**PARAMETERS:**

- **data** (*string*) -

    The partition statistics.

- **stats** (*string*) -

    The number of rows in the partition.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
new milvusClient(MILUVS_ADDRESS).getPartitionStatistics({
    collection_name: 'my_collection',
    partition_name: "_default",
 });
```

