# bulkInsert()

A MilvusClient interface. This method imports data from external files. Currently, only one JSON file is supported for each call. For details, see [Prepare a JSON File](https://milvus.io/api-reference/pymilvus/v2.2.0/Utility/milvus.io/docs/v2.2.x/bulk_load.md#Prepare-a-JSON-file).

```Java
R<ImportResponse> bulkInsert(BulkInsertParam requestParam);
```

## BulkInsertParam

Use the `BulkInsertParam.Builder` to construct a `BulkInsertParam` object.

```Java
import io.milvus.param.BulkInsertParam;
BulkInsertParam.Builder builder = BulkInsertParam.newBuilder();
```

Methods of `BulkInsertParam.Builder`:

| Method | Description | Parameters |
| ---    | --- | --- |
| `withCollectionName(String collectionName)` | Sets the collection name. Collection name cannot be empty or null. | `collectionName`: The name of the target collection. |
| `withPartitionName(String partitionName)`| Sets the partition name. partition name can be null. |	`partitionName`: The name of the target partition. |
| `withFiles(List<String> files)` | Sets the path of the files. The paths cannot be empty or null.<br> Each file path must be a relative path under the Milvus storage root path. | `files`: A file paths list. Currently, you can only input one row-based JSON file for each call. |
| `addFile(String file)` | Set a file path to be imported.The paths cannot be empty or null. | `file': A file path. |
| `build()` | Constructs a `BulkInsertParam` object | 	N/A |

The `BulkInsertParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ImportResponse>` object. Since only one row-based JSON file is allowed for each call, this result contains one bulk insert task ID.