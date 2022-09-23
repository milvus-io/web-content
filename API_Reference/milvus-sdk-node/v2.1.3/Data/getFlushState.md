# getFlushState()

This method checks the status of data flush by segment IDs.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getFlushState(GetFlushStateReq);
```

## Parameters

### GetFlushStateReq

| Parameter  | Description                                                                            | type     | required |
| ---------- | -------------------------------------------------------------------------------------- | -------- | -------- |
| segmentIDs | An array of the IDs of the segments to check                                           | String[] | True     |
| timeout    | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getFlushState({
  segmentIDs: segIds,
});
```

## Return

```javascript
// getFlushState return
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```
