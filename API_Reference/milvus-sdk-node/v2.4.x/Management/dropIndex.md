# dropIndex()

This operation drops an index from a specific collection.

```javascript
dropIndex(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.dropPartition({
    collection_name: string,
    field_name?: string,
    index_name?: string,
    timeout?: number
 });
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **field_name** (*string*) -

    The name of an existing field in the collection.

- **index_name** (string) -

    The name of the index to drop.

- **timeout** (*number*) -

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
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const dropIndexReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.dropIndex(dropIndexReq);
console.log(res);
```

