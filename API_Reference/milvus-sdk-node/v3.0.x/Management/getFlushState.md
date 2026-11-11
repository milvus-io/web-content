# getFlushState()

This operation returns the flush status of a specific segment.

```javascript
await milvusClient.getFlushState(data)
```

<div class="alert note">

Milvus automatically flushes data into persistent storage at intervals. You are advised to rely on this automatic data persistence mechnism.

</div>

## Request Syntax

```javascript
await milvusClient.getFlushState({
    segmentIDs?: number[],
    flush_ts?: number,
    db_name?: string,
    collection_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **segmentIDs** (*number[]*) -

    A list of the target segment IDs.

- **flush_ts** (*number*) -

    The flush timestamp to check against.

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    The name of the collection whose flush state to check. Provide at least one of **segmentIDs**, **flush_ts**, or **collection_name**.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise<GetFlushStateResponse>*

This method returns a promise that resolves to a **GetFlushStateResponse** object.

```javascript
{
    flushed: boolean,
    status:  ResStatus
}
```

**PARAMETERS:**

- **flushed** (*boolean*) -
Whether all targeted segments are flushed to persistent storage. It is **true** when every requested segment ID is sealed and persisted, otherwise **false**.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const flushState = await milvusClient.getFlushState({
    segmentIDs: [1,2,3,4],
});
```

