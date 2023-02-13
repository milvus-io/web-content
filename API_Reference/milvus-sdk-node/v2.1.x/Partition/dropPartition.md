# dropPartition()

This method drops a partition and all data within this partition. Note that the `_default` partition cannot be dropped.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.dropPartition(
  DropPartitionReq
);
```

## Parameters

### DropPartitionReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Name of the collection in which to drop the partition                                  | String | True     |
| partition_name  | Name of the partition to drop                                                          | String | True     |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.dropPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
