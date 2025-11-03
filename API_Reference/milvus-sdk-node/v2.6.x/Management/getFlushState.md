# getFlushState()

This operation returns the flush status of a specific segment.

```javascript
getFlushState(data): Promise<GetFlushStateResponse>
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Milvus automatically flushes data into persistent storage at intervals. You are advised to rely on this automatic data persistence mechnism.</p>

</div>

## Request Syntax

```javascript
milvusClient.getFlushState({
    segment_ids: number[],
    timeout?: number
})
```

**PARAMETERS:**

- **segment_ids** (*number&#91;&#93;*) -

    **&#91;REQUIRED&#93;**

    A list of the target segment IDs.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;GetFlushStateResponse&gt;*

This method returns a promise that resolves to a **GetFlushStateResponse** object.

```javascript
{
    flushed: boolean,
    status: {
        code: number,
        error_code: string | number,
        reason: string
    }
}
```

**PARAMETERS:**

- **flushed** (*boolean*) -

    Whether data in the specified segment is persisted into storage.

- **status** (*ResStatus*) - 

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const flushState = await milvusClient.getFlushState({
    segmentIDs: [1,2,3,4],
});
```

