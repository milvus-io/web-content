# getLoadState()

This operation displays whether a specified collection or partition is loaded or not.

```javascript
getLoadState(data): Promise<GetLoadStateResponse>
```

## Request Syntax

```javascript
milvusClient.getLoadState({
   collection_name: string,
   partition_names?: string[],
   timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of a collection.

- **partition_names** (*string[]*) -

    The names of one or more partitions.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise\<GetLoadStateResponse>*

This method returns a promise that resolves to a GetLoadStateResponse object.

```javascript
{
    state: LoadState,
    status: object
}
```

**PARAMETERS:**

- state (*LoadState*) -

    The load status. The are four states:

    - **LoadStateLoaded** indicates the status is loaded.

    - **LoadStateLoading** indicates the status is loading.

    - **LoadStateNotExist** indicates the status is not available.

    - **LoadStateNotLoad** indicates the status is unloaded.

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
 const resStatus = await milvusClient.getLoadState({
   collection_name: 'my_collection',
 });
```

