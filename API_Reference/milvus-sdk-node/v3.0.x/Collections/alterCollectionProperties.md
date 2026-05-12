# alterCollectionProperties()

This operation modifies the properties of a specified collection.

```javascript
await milvusClient.alterCollectionProperties(data)
```

## Request Syntax

```javascript
await milvusClient.alterCollectionProperties({
   db_name?: string
   collection_name: string,
   delete_keys?: string[],
   properties: Properties,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the target collection to reassign an alias to.

- **delete_keys** (*string[]*) -

    The properties to delete.

- **properties** (*Properties*) -

    **[REQUIRED]**

    The properties to change and their expected values in a TypeScript **Record**. Possible values are as follows:

    - **collection.ttl.seconds** (*number*) -

        The time-to-live (TTL) of a collection in seconds.

    - **mmap.enabled** (*bool*) -

        Whether to enable mmap for the raw data and indexes of all fields in the collection.

- **timeout** (*number*)  

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

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const resStatus = await milvusClient.alterCollection({
    collection_name: 'my-collection',
    properties: {"collection.ttl.seconds": 18000}
});
```

