# count()

This operation counts the number of entities that match the specified filtering expression.

```javascript
await milvusClient.count(data)
```

## Request Syntax

```javascript
await milvusClient.count({
    db_name?: string,
    collection_name: string,
    expr?: string,
    timeout?: boolean
})
```

**PARAMETERS:**

- **db_name** (*str*) -

    The name of the database that holds the target collection.

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to create an alias for.

- **expr** (*string*) -

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<CountResult>*

This method returns a promise that resolves to a **CountResult** object.

```javascript
{
    data: number,
    status:  ResStatus
}
```

**PARAMETERS:**

- **data** (*number*) -
The number of rows in the collection that match the supplied filter expression. When no expression is supplied, this is the total row count.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Examples

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const num_entities = await milvusClient.count({
   collection_name: 'my_collection',
   expr: "age in [1,2,3,4,5,6,7,8]",
});

// 1000
```
