# describeIndex()

A MilvusClient interface. This method shows the information of a specified index.

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
| `withCollectionName(collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose index information needs to be checked. |
| `withIndexName(String indexName)`    | Sets the target index name. The index name cannot be empty or null. If no index name is specified, the default index name is an empty string. | `indexName`: Name of the index whose information needs to be checked.           |
| `build()`                            | Constructs a `DescribeIndexParam` object.                      | N/A                                       |

The `DescribeIndexParam.Builder.build()` could throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeIndexResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `DescribeIndexResponse` held by the R template. You can use `DescIndexResponseWrapper` to get index descriptions easily.

## DescIndexResponseWrapper

A tool class to encapsulate the `DescribeIndexResponse`. 

```Java
import io.milvus.response.DescIndexResponseWrapper;
DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(descIndexResponse);
```

Methods of `DescIndexResponseWrapper`:

| **Method**                                  | **Description**                                              | **Parameters**             | **Returns**       |
| ------------------------------------------- | ------------------------------------------------------------ | -------------------------- | ----------------- |
| `getIndexDescriptions()`                    | Gets a list of all index descriptions. Currently, only the information of one index can be returned. | N/A                        | `List<IndexDesc>` |
| `getIndexDescByFieldName(String fieldName)` | Gets index description by field name. `null` is returned if the field does not exist. | `fieldName`: A field name. | `IndexDesc`       |

## IndexDesc

A tool class to describe an index.

Methods of `DescIndexResponseWrapper.IndexDesc`:

| **Method**        | **Description**                       | **Returns**  |
| ----------------- | ------------------------------------- | ------------ |
| `getIndexType()`  | Gets the index type.                      | [IndexType](../Misc/IndexType.md)  |
| `getMetricType()` | Gets the metric type                      | [MetricType](../Misc/MetricType.md) |
| `getExtraParam()` | Gets the index parameters in `JSON` format. | `String`     |

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
