# insert()

A MilvusClient interface. This method inserts entities into a specified collection.

```java
R<InsertResponse> insert(InsertRowsParam requestParam);
```

#### InsertRowsParam

Use the `InsertRowsParam.Builder` to construct an `InsertRowsParam` object.

```java
import io.milvus.param.highlevel.dml.InsertRowsParam;
InsertRowsParam.Builder builder = InsertRowsParam.newBuilder();
```

Methods of `InsertRowsParam.Builder`:

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
        <td><p>withRows(List\<gson.JsonObject> rows)</p></td>
        <td><p>Sets the row data to insert. The rows list cannot be empty.<br/>Note that no input is required for the primary key field if auto-ID is enabled.</p></td>
        <td><p>rows: A list of gson.JsonObject objects, each representing a row data.<br/>For each field:<br/>- If dataType is Bool/Int8/Int16/Int32/Int64/Float/Double/Varchar, use JsonObject.addProperty(key, value) to input;<br/>- If dataType is FloatVector, use JsonObject.add(key, gson.toJsonTree(List[Float]) to input;<br/>- If dataType is BinaryVector/Float16Vector/BFloat16Vector, use JsonObject.add(key, gson.toJsonTree(byte[])) to input;<br/>- If dataType is SparseFloatVector, use JsonObject.add(key, gson.toJsonTree(SortedMap[Long, Float])) to input;<br/>- If dataType is Array, use JsonObject.add(key, gson.toJsonTree(List of Boolean/Integer/Short/Long/Float/Double/String)) to input;<br/>- If dataType is JSON, use JsonObject.add(key, JsonElement) to input;<br/>Note:<br/>1. For scalar numeric values, value will be cut according to the type of the field.<br/>For example:<br/>  An Int8 field named "XX", you set the value to be 128 by JsonObject.addProperty("XX", 128), the value 128 is cut to -128.<br/>  An Int64 field named "XX", you set the value to be 3.9 by JsonObject.addProperty("XX", 3.9), the value 3.9 is cut to 3.<br/>2. String value can be parsed to numeric/boolean type if the value is valid.<br/>For example:<br/>  A Bool field named "XX", you set the value to be "TRUE" by JsonObject.addProperty("XX", "TRUE"), the string "TRUE" is parsed as true.<br/>  A Float field named "XX", you set the value to be "3.5" by JsonObject.addProperty("XX", "3.5", the string "3.5" is parsed as 3.5.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs an InsertRowsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

<div class="admonition note">

<p><b>notes</b></p>

<p>In Java SDK versions v2.3.7 or earlier versions, the input is a <code>fastjson.JSONObject</code>. But <code>fastjson</code> is not recommended to use now because of its unsafe deserialization vulnerability. Therefore, replace <code>fastjson</code> with <code>gson</code> if you use the Java SDK of v2.3.8 or later releases.</p>

</div>

The `InsertRowsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<InsertResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `InsertResponse` held by the R template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

List<JsonObject> rows = new ArrayList<>();
Random ran = new Random();
for (long i = 0L; i < rowCount; ++i) {
    JsonObject row = new JsonObject();
    row.addProperty(AGE_FIELD, ran.nextInt(99));
    List<Float> vector = generateFloatVector();
    row.add(VECTOR_FIELD, gson.toJsonTree(vector));

    // $meta if collection EnableDynamicField, you can input this field not exist in schema, else deny
    row.addProperty(INT32_FIELD_NAME, ran.nextInt());
    row.addProperty(INT64_FIELD_NAME, ran.nextLong());
    row.addProperty(VARCHAR_FIELD_NAME, "varchar");
    row.addProperty(FLOAT_FIELD_NAME, ran.nextFloat());
    row.addProperty(DOUBLE_FIELD_NAME, ran.nextDouble());
    row.addProperty(BOOL_FIELD_NAME, ran.nextBoolean());

    // $json
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty(INT32_FIELD_NAME, ran.nextInt());
    jsonObject.addProperty(INT64_FIELD_NAME, ran.nextLong());
    jsonObject.addProperty(VARCHAR_FIELD_NAME, "varchar");
    jsonObject.addProperty(FLOAT_FIELD_NAME, ran.nextFloat());
    jsonObject.addProperty(DOUBLE_FIELD_NAME, ran.nextDouble());
    jsonObject.addProperty(BOOL_FIELD_NAME, ran.nextBoolean());
    row.add(USER_JSON_FIELD, jsonObject);

    rows.add(row);
}

InsertRowsParam param = InsertRowsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rows)
        .build();
R<InsertResponse> response = client.insert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("insertCount: " + response.getData().getInsertCount());
System.out.println("insertIds: " + response.getData().getInsertIds());
```

