# get()

The MilvusClient interface. This method gets entity(s) based on the primary field ids. Note that the order of the returned entities can not be guaranteed.

```java
R<GetResponse> get(GetIdsParam requestParam);
```

#### GetIdsParam

Use the `GetIdsParam.Builder` to construct a `GetIdsParam` object.

```java
import io.milvus.param.highlevel.dml.GetIdsParam;
GetIdsParam.Builder builder = GetIdsParam.newBuilder();
```

Methods of `GetIdsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the target collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to insert data into.</p></td>
    </tr>
    <tr>
        <td><p>withPrimaryIds(List&lt;T> primaryIds)</p></td>
        <td><p>Specifies id fields. ID cannot be empty or null.<br/>Note only support the value of primary key.</p></td>
        <td><p>primaryIds: a list of primary field key objects.</p></td>
    </tr>
    <tr>
        <td><p>addPrimaryId(T primaryId)</p></td>
        <td><p>Specifies primaryField id. PrimaryId cannot be empty or null.<br/>Note only support the value of primary key.</p></td>
        <td><p>primaryId: The id of primary field key.</p></td>
    </tr>
    <tr>
        <td><p>withOutputFields(List&lt;String> outputFields)</p></td>
        <td><p>Specifies output fields (Optional).</p></td>
        <td><p>outputFields: A list of output field you need.</p></td>
    </tr>
    <tr>
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Consistency level used in the get. If no level is specified, will use default consistency. Please refer to ConsistencyLevelEnum in Misc.</p></td>
        <td><p>consistencyLevel: The consistency level used in the get.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs an GetIdsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetIdsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetResponse` held by the `R` template.

#### Example

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

