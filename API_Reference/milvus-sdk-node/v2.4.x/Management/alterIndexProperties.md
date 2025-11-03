# alterIndexProperties()

This operation modifies the settings of specific index properties.

```javascript
alterIndexProperties(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.alterIndexProperties({
     db_name?: string,
     collection_name: string,
     index_name: string,
     params: Record<string, string | number | boolean>,
     timeout?: number
});
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **index_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of the target index.

- **params** (*Record*&lt;*string*, *string* | *number* | *boolean*&gt;) -

    **&#91;REQUIRED&#93;**

    The index properties to modify and their expected values. Possible properties are as follows:

    - **mmap.enabled** (*bool*) -

        Whether to enable mmap for the specified index. Setting this to `True` offloads the specified index onto the disk. For details, refer to [Mmap-enabled Data Storage](https://milvus.io/docs/mmap.md)

- **timeout** (number) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;ResStatus&gt;*

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
const alterIndexReq = {
    collection_name: 'my_collection',
    params: { nlist: 20 },
};
const res = await milvusClient.alterIndex(alterIndexReq);
console.log(res);
```

