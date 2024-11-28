# loadPartitions()

This operation loads a specific set of partitions in a specified collection into memory.

```javascript
loadPartitions(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.loadPartitions({
    collection_name: string,
    partition_names: string[],
    replica_number?: number,
    resource_groups[]?: string[],
    timeout?: number
 });
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_names** (string[]) -

    **[REQUIRED]**

    A list of the names of the partitions to load.

- **replica_number** (*number*) -

    The number of replicas of the partition.

- **resource_groups** (*string[]*) -

    A list of the resource groups in the partition.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
new milvusClient(MILUVS_ADDRESS).loadPartitions({
    collection_name: 'my_collection',
    partition_names: ['my_partition'],
 });
```

