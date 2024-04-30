# get()

The MilvusClient interface. This method gets entity(s) based on the primary field ids. Note that the order of the returned entities can not be guaranteed.

```java
R<GetResponse> get(GetIdsParam requestParam);
```

## GetIdsParam

Use the `GetIdsParam.Builder` to construct a `GetIdsParam` object.

```java
import io.milvus.param.highlevel.dml.GetIdsParam;
GetIdsParam.Builder builder = GetIdsParam.newBuilder();
```

Methods of `GetIdsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the target collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td>withPrimaryIds(List&lt;T> primaryIds)</td>
        <td>Specifies id fields. ID cannot be empty or null.Note only support the value of primary key.</td>
        <td>primaryIds: a list of primary field key objects.</td>
    </tr>
    <tr>
        <td>addPrimaryId(T primaryId)</td>
        <td>Specifies primaryField id. PrimaryId cannot be empty or null.Note only support the value of primary key.</td>
        <td>primaryId: The id of primary field key.</td>
    </tr>
    <tr>
        <td>withOutputFields(List&lt;String> outputFields)</td>
        <td>Specifies output fields (Optional).</td>
        <td>outputFields: A list of output field you need.</td>
    </tr>
    <tr>
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Consistency level used in the get. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</td>
        <td>consistencyLevel: The consistency level used in the get.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs an GetIdsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetIdsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetResponse` held by the `R` template.

## Example

```java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

List<String> ids = Lists.newArrayList("441966745769900131", "441966745769900133");
GetIdsParam getParam = GetIdsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withId(ids)
        .withOutputFields(Lists.newArrayList("*"))
        .build();

R<GetResponse> response = client.get(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

for (QueryResultsWrapper.RowRecord rowRecord : response.getData().getRowRecords()) {
    System.out.println(rowRecord);
}
```

