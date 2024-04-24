# hasCollection()

This operation checks whether a specific collection exists.

```javascript
hasCollection(data): Promise<BoolResponse>
```

## Request Syntax

```javascript
milvusClient.hasCollection({ 
    collection_name: string,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise\<BoolResponse>*

This method returns a promise that resolves to a **BoolResponse** object.

```javascript
{
    value: boolean,
    status: object
}
```

**PARAMETERS:**

- **value** (*string*) - 

    A boolean value indicating whether the specified collection exists.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const res = await milvusClient.hasCollection({ collection_name: 'my_collection' });
```

