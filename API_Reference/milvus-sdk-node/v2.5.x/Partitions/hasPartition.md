# hasPartition()

This operation checks whether the specified partition exists in the specified collection.

```javascript
hasPartition(data): Promise<BoolResponse>
```

## Request Syntax

```javascript
milvusClient.hasPartition({
    collection_name: string,
    partition_name: string,
    timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*)

    **[REQUIRED]**

    The name of the partition to check.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<BoolResponse>*

This method returns a promise that resolves to a BoolResponse object.

```javascript
{
    value: boolean,
    status: object
}
```

**PARAMETERS:**

- **value** (*bool*) -

    A boolean value indicating whether the partition exists.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
new milvusClient(MILUVS_ADDRESS).hasPartition({
    collection_name: 'my_collection',
    partition_name: 'my_partition',
 });
```

