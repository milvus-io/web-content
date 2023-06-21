# insert()

A MilvusClient interface. This method inserts entities into a specified collection.

```Java
R<InsertResponse> insert(InsertRowsParam requestParam);
```

## InsertRowsParam

Use the InsertRowsParam.Builder to construct an InsertRowsParam object.

```Java
import io.milvus.param.highlevel.dml.InsertRowsParam;
InsertRowsParam.Builder builder = InsertRowsParam.newBuilder();
```

Methods of InsertRowsParam.Builder:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the target collection name.<br>The value cannot be empty or null. | `collectionName`: Name of the collection to which the data is to be inserted in rows. |
| `withRows(List<JSONObject> rows)` | Sets the data to insert in rows.<br>The list cannot be empty.<br>Exclude the primary key if it automatically increments. | `rows`: A list of `JSONObject` objects, each representing a row in the dataset. |
| `build()` | Constructs an InsertRowsParam object. | N/A |

The InsertRowsParam.Builder.build() can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<InsertResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns a valid `InsertResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;

List<JSONObject> rowsData = new ArrayList<>();
Random ran = new Random();
for (long i = 0L; i < rowCount; ++i) {
    JSONObject row = new JSONObject();
    row.put(AGE_FIELD, ran.nextInt(99));
    row.put(VECTOR_FIELD, generateFloatVector());

    // $meta if collection EnableDynamicField, you can input this field not exist in schema, else deny
    row.put(INT32_FIELD_NAME, ran.nextInt());
    row.put(INT64_FIELD_NAME, ran.nextLong());
    row.put(VARCHAR_FIELD_NAME, "测试varchar");
    row.put(FLOAT_FIELD_NAME, ran.nextFloat());
    row.put(DOUBLE_FIELD_NAME, ran.nextDouble());
    row.put(BOOL_FIELD_NAME, ran.nextBoolean());

    // $json
    JSONObject jsonObject = new JSONObject();
    jsonObject.put(INT32_FIELD_NAME, ran.nextInt());
    jsonObject.put(INT64_FIELD_NAME, ran.nextLong());
    jsonObject.put(VARCHAR_FIELD_NAME, "测试varchar");
    jsonObject.put(FLOAT_FIELD_NAME, ran.nextFloat());
    jsonObject.put(DOUBLE_FIELD_NAME, ran.nextDouble());
    jsonObject.put(BOOL_FIELD_NAME, ran.nextBoolean());
    row.put(USER_JSON_FIELD, jsonObject);

    rowsData.add(row);
}

InsertRowsParam param = InsertRowsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rowsData)
        .build();
R<InsertResponse> response = client.insert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("insertCount: " + response.getData().getInsertCount());
System.out.println("insertIds: " + response.getData().getInsertIds());
```