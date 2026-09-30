# getImportState()

This operation retrieves the current state and metadata of a specific import task. Use this to poll for completion after calling `bulkInsert()`.

```javascript
await milvusClient.getImportState(data)
```

## Request Syntax

```javascript
await milvusClient.getImportState({
    task: number,
    timeout?: number
})
```

**PARAMETERS:**

- **task** (*number*) -

    **[REQUIRED]** The ID of the import task returned by `bulkInsert()`.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC.

**RETURNS** *Promise<GetImportStateResponse>*

This method returns a promise that resolves to a **GetImportStateResponse** object.

```javascript
{
    state: ImportState,
    row_count: number,
    id_list: number[],
    infos: KeyValuePair[],
    id: number,
    collection_id: number,
    segment_ids: number[],
    create_ts: number,
    status: ResStatus
}
```

**PARAMETERS:**

- **state** (*ImportState*) -

    The current state of the import task. Possible values include **ImportPending**, **ImportStarted**, **ImportPersisted**, **ImportCompleted**, **ImportFailed**, and **ImportFailedAndCleaned**.

- **row_count** (*number*) -

    The number of rows that have been imported or parsed.

- **id_list** (*number[]*) -

    A list of auto-generated IDs if the primary key uses autoID.

- **infos** (*KeyValuePair[]*) -

    Additional information about the import task, such as progress, file path, or failure reason.

- **id** (*number*) -

    The ID of the import task.

- **collection_id** (*number*) -

    The collection ID associated with the import task.

- **segment_ids** (*number[]*) -

    Segment IDs created by the import task.

- **create_ts** (*number*) -

    The timestamp when the import task was created.

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

const res = await milvusClient.getImportState({ task: 123456 });
```
