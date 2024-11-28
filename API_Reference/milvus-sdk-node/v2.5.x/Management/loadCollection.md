# loadCollection()

This operation loads the data of a specific collection into memory.

```javascript
loadCollection(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.loadCollection({ 
    collection_name: string,
    refresh?: boolean,
    replica_number?: number,
    resource_groups?: string[],
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of a collection.

- **refresh** (*boolean*) -

    Whether to refresh the load status of an already loaded collection.

- **replica_number** (*number*) -

    The number of replicas of the collection to load.

- **resource_groups** (*string[]*) -

    The number of resource groups in the collection to load.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

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
 const resStatus = await milvusClient.loadCollection({ collection_name: 'my_collection' });
```

