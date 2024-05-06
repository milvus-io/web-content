# describeCollection()

A MilvusClient interface. This method shows the details of a collection, e.g. name, schema.

```java
R<DescribeCollectionResponse> describeCollection(DescribeCollectionParam requestParam);
```

#### DescribeCollectionParam

Use the `DescribeCollectionParam.Builder` to construct a `DescribeCollectionParam` object.

```java
import io.milvus.param.DescribeCollectionParam;
DescribeCollectionParam.Builder builder = DescribeCollectionParam.newBuilder();
```

Methods of `DescribeCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to release.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ReleaseCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DescribeCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<DescribeCollectionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `DescribeCollectionResponse` held by the `R` template. You can use `DescCollResponseWrapper` to get the information.

#### DescCollResponseWrapper

A tool class to encapsulate the DescribeCollectionResponse. 

```java
import io.milvus.response.DescCollResponseWrapper;
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response);
```

Methods of `DescCollResponseWrapper`:

|  **Method**                       |  **Description**                                                                       |  **Parameters**                 |  **Returns**     |
| --------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------- | ---------------- |
|  getCollectionName()              |  Get the name of the collection.                                                       |  N/A                            |  String          |
|  getCollectionDescription()       |  Get the description of the collection.<br/>                                        |  N/A                            |  String          |
|  getCollectionID()                |  Get the internal ID of the collection.                                                |  N/A                            |  long            |
|  getShardNumber()                 |  Get the shard number of the collection.                                               |  N/A                            |  int<br/>     |
|  getCreatedUtcTimestamp()         |  Get UTC timestamp when the collection is created.                                     |  N/A<br/>                    |  long<br/>    |
|  getAliases()                     |  Get aliases of the collection.                                                        |  N/A                            |  List<String>    |
|  getFields()                      |  Get the schema of the collection's fields.                                            |  N/A                            |  List<FieldType> |
|  getFieldByName(String fieldName) |  Get the schema of a field by name.<br/>Return null if the field doesn't exist.         |  fieldName: The name of a field |  FieldType       |
|  isDynamicFieldEnabled()          |  Get whether the collection dynamic field is enabled                                   |  N/A                            |  boolean         |
|  getPartitionKeyField()           |  Get the partition key field.<br/>Return null if the partition key field doesn't exist. |  N/A                            |  FieldType       |

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.DescCollResponseWrapper;

DescribeCollectionParam param = DescribeCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<DescribeCollectionResponse> response = client.describeCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response.getData());
System.out.println("Shard number: " + wrapper.getShardNumber());
```
