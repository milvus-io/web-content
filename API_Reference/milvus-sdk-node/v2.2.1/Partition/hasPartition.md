# hasPartition()

This method verifies if a partition exists in the specified collection.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.hasPartition(HasPartitionReq);
```

## Parameters

### HasPartitionReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Name of the collection in which the partition to verify exists                         | String | True     |
| partition_name  | Name of the partition to verify                                                        | String | True     |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.hasPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

## Return

```javascript
{ status: { error_code: 'Success', reason: '' }, value: true }
```
