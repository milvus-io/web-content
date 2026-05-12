# listAliases()

This is a method template.

```javascript
await milvusClient.listAliases(data)
```

## Request Syntax

This method has the following alternatives.

```javascript
listAliases({
    db_name: string
    collection_name: string
    timeout?: number
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise<ListAliasesResponse>*

This method returns a promise that resolves to a **ListAliasesResponse** object.

```javascript
{
    db_name: string,
    aliases: string[],
    collection_name: string,
    status:  ResStatus
}
```

**PARAMETERS:**

- **db_name** (*string*) -
The database that owns the listed aliases.

- **aliases** (*string[]*) -
A list of all aliases that point to the requested collection.

- **collection_name** (*string*) -
The collection name to which the listed aliases point.

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
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const res = await milvusClient.listAliases({ collection_name: 'my_collection' });
```

