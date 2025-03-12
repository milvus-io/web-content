# dropIndexProperties()

This operation resets the index properties to their default values.

```javascript
dropIndexProperties(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.dropIndexProperties({
     db_name?: string,
     collection_name: string,
     index_name: string,
     properties: string[],
     timeout?: number
});
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **index_name** (*string*) -

    **[REQUIRED]**

    The name of the target index.

- **properties** (*string[]*) -

    **[REQUIRED]**

    The names of the index properties to reset. Possible properties are as follows:

    - **mmap.enabled** -

        Whether to enable mmap for the specified index. Setting this to `True` offloads the specified index onto the disk. For details, refer to [Mmap-enabled Data Storage](https://milvus.io/docs/mmap.md)

- **timeout** (number) -

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
const dropIndexPropertiesReq = {
    collection_name: 'my_collection',
    index_name: 'my_index',
    properties: ['mmap.enabled'],
};
const res = await milvusClient.dropIndexProperties(dropIndexPropertiesReq);
console.log(res);
```

