# describeIndex()

A MilvusClient interface. This method shows the information of the specified index.

```Java
R<DescribeIndexResponse> describeIndex(DescribeIndexParam requestParam);
```

## DescribeIndexParam

Use the `DescribeIndexParam.Builder` to construct a `DescribeIndexParam` object.

```Java
import io.milvus.param.DescribeIndexParam;
DescribeIndexParam.Builder builder = DescribeIndexParam.newBuilder();
```

Methods of `DescribeIndexParam.Builder`:

| Method                               | Description                                                  | Parameters                                |
| ------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| `withCollectionName(collectionName)` | Sets the collection name. Collection name cannot be empty or null. | `collectionName`: Target collection name. |
| `withIndexName(String indexName)`    | Sets the target index name. Index name cannot be empty or null. If no index name is specified, the default index name (`_default_idx`) is used. | `indexName`: Name of the index.           |
| `build()`                            | Construct a `DescribeIndexParam` object                      | N/A                                       |

The `DropIndexParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeIndexResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns a valid `DescribeIndexResponse` held by the R template. You can use `DescIndexResponseWrapper` to get index descriptions easily.

## DescIndexResponseWrapper

A tool to encapsulate the `DescribeIndexResponse`. 

```Java
import io.milvus.response.DescIndexResponseWrapper;
DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(descIndexResponse);
```

Methods of `DescIndexResponseWrapper`:

| **Method**                                  | **Description**                                              | **Parameters**             | **Returns**       |
| ------------------------------------------- | ------------------------------------------------------------ | -------------------------- | ----------------- |
| `getIndexDescriptions()`                    | Gets a list of all index descriptions (Currently only return the information of one index). | N/A                        | `List<IndexDesc>` |
| `getIndexDescByFieldName(String fieldName)` | Gets index description by field name. Returns null if the field doesn't exist. | `fieldName`: A field name. | `IndexDesc`       |

Methods of `DescIndexResponseWrapper.IndexDesc`:

| **Method**        | **Description**                       | **Returns**  |
| ----------------- | ------------------------------------- | ------------ |
| `getIndexType()`  | Gets index type.                      | `IndexType`  |
| `getMetricType()` | Gets metric type                      | `MetricType` |
| `getExtraParam()` | Gets index parameters in JSON format. | `String`     |

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.DescIndexResponseWrapper;
import io.milvus.grpc.DescribeIndexResponse;

DescribeIndexParam param = DescribeIndexParam.newBuilder()
        .withCollectionName("collection1")
        .withIndexName("index1")
        .build();
R<DescribeIndexResponse> response = client.describeIndex(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(response.getData());
for (DescIndexResponseWrapper.IndexDesc desc : wrapper.getIndexDescriptions()) {
    System.out.println(desc.toString());
}
```
