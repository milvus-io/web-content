# dropAlias()

This operation drops a specified collection alias. 

```javascript
dropAlias(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.dropAlias({
   alias: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

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

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const resStatus = await milvusClient.dropAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
});
```

