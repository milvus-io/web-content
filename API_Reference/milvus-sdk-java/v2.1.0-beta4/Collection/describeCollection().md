# describeCollection()

A MilvusClient interface. This method shows the details of a collection, including collection name, schema, and more.

```Java
R<DescribeCollectionResponse> describeCollection(DescribeCollectionParam requestParam);
```

## DescribeCollectionParam

Use the `DescribeCollectionParam.Builder` to construct a `DescribeCollectionParam` object.

```Java
import io.milvus.param.DescribeCollectionParam;
DescribeCollectionParam.Builder builder = DescribeCollectionParam.newBuilder();
```

Methods of `DescribeCollectionParam.Builder`:

| Method                                      | Description                                                  | Parameters                                                   |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to show details of. |
| `build()`                                   | Constructs a `DescribeCollectionParam` object.                | N/A                                                          |

The `DescribeCollectionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeCollectionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `DescribeCollectionResponse` held by the R template. You can use `DescCollResponseWrapper` to get the information.

## DescCollResponseWrapper

A tool class to encapsulate the `DescribeCollectionResponse`. 

```Java
import io.milvus.response.DescCollResponseWrapper;
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(descCollectionResponse);
```

Methods of `DescCollResponseWrapper`:

| **Method**                         | **Description**                                              | **Parameters**          | **Returns**     |
| ---------------------------------- | ------------------------------------------------------------ | ----------------------- | --------------- |
| `getCollectionName()`              | Gets the name of the collection.                             | N/A                     | String          |
| `getCollectionDescription()`       | Gets the description of the collection.                      | N/A                     | String          |
| `getCollectionID()`                | Gets the ID of the collection.                               | N/A                     | long            |
| `getShardNumber()`                 | Gets the number of shards of the collection.                 | N/A                     | Int             |
| `getCreatedUtcTimestamp()`         | Gets the UTC timestamp that indicates when the collection is created. | N/A                     | long            |
| `getAliases()`                     | Gets the alias of the collection.                            | N/A                     | List<String>    |
| `getFields()`                      | Gets all field schemas in the collection.                    | N/A                     | List<[FieldType](createCollection().md#FieldType)> |
| `getFieldByName(String fieldName)` | Gets a field schema by its field name.                       | fieldName: a field name | FieldType       |

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.DescCollResponseWrapper;
import io.milvus.grpc.DescribeCollectionResponse;

DescribeCollectionParam param = DescribeCollectionParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<DescribeCollectionResponse> response = client.describeCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response.getData());
System.out.println("Collection ID: " + wrapper.getCollectionID());
```

