# renameCollection()

This operation renames an existing collection.

```javascript
renameCollection(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.renameCollection({
   db_name: string,
   collection_name: string,
   new_collection_name: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **new_collection_name** (*string*) -

    **[REQUIRED]**

    The name of the target collection after this operation.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const resStatus = await milvusClient.renameCollection({
   collection_name: 'my_collection',
   new_collection_name: 'my_new_collection'
 });
```

