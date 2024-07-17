# upsert()

A MilvusClient interface. This method inserts new entities into a specified collection, and replaces them if the entities already exist.

```java
R<MutationResult> upsert(UpsertParam requestParam);
```

#### UpsertParam

Use the `UpsertParam.Builder` to construct an `UpsertParam object`.

```java
import io.milvus.param.UpsertParam;
UpsertParam.Builder builder = UpsertParam.newBuilder();
```

Methods of `UpsertParam.Builder`:

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
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionName(String partitionName)</p></td>
        <td><p>Sets the target partition name(optional).</p></td>
        <td><p>partitionName: The name of the partition to insert data into.</p></td>
    </tr>
    <tr>
        <td><p>withFields(List\<InsertParam.Field> fields)</p></td>
        <td><p>Sets the column-based data to be inserted. The fields list cannot be empty. <br/>Note that no input is required for the primary key field if auto-id is enabled.</p></td>
        <td><p>fields: A list of Field objects, each representing a field.</p></td>
    </tr>
    <tr>
        <td><p>withRows(List\<gson.JsonObject> rows)</p></td>
        <td><p>Sets the row-based data to be inserted. The row list cannot be empty.<br/>Note that if the withFields() is called, the rows by withRows() will be ignored.</p></td>
        <td><p>rows: A list of gson.JsonObject objects, each representing a row in key-value format.<br/>For each field:<br/>- If dataType is Bool/Int8/Int16/Int32/Int64/Float/Double/Varchar, use JsonObject.addProperty(key, value) to input;<br/>- If dataType is FloatVector, use JsonObject.add(key, gson.toJsonTree(List[Float]) to input;<br/>- If dataType is BinaryVector/Float16Vector/BFloat16Vector, use JsonObject.add(key, gson.toJsonTree(byte[])) to input;<br/>- If dataType is SparseFloatVector, use JsonObject.add(key, gson.toJsonTree(SortedMap[Long, Float])) to input;<br/>- If dataType is Array, use JsonObject.add(key, gson.toJsonTree(List of Boolean/Integer/Short/Long/Float/Double/String)) to input;<br/>- If dataType is JSON, use JsonObject.add(key, JsonElement) to input;<br/>Note:<br/>1. For scalar numeric values, value will be cut according to the type of the field.<br/>For example:<br/>  An Int8 field named "XX", you set the value to be 128 by JsonObject.addProperty("XX", 128), the value 128 is cut to -128.<br/>  An Int64 field named "XX", you set the value to be 3.9 by JsonObject.addProperty("XX", 3.9), the value 3.9 is cut to 3.<br/>2. String value can be parsed to numeric/boolean type if the value is valid.<br/>For example:<br/>  A Bool field named "XX", you set the value to be "TRUE" by JsonObject.addProperty("XX", "TRUE"), the string "TRUE" is parsed as true.<br/>  A Float field named "XX", you set the value to be "3.5" by JsonObject.addProperty("XX", "3.5", the string "3.5" is parsed as 3.5.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs an InsertParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

<div class="admonition note">

<p><b>notes</b></p>

<p>In Java SDK versions v2.3.7 or earlier versions, the input is a <code>fastjson.JSONObject</code>. But <code>fastjson</code> is not recommended to use now because of its unsafe deserialization vulnerability. Therefore, replace <code>fastjson</code> with <code>gson</code> if you use the Java SDK of v2.3.8 or later releases.</p>

</div>

The `UpsertParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the `R` template. You can use `MutationResultWrapper` to get the returned information.

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

List<List<Float>> vectors = generateFloatVectors(1);
List<JsonObject> rows = new ArrayList<>();
JsonObject row = new JsonObject();
row.addProperty("id", (long)i);
row.add("vector", gson.toJsonTree(vectors.get(0)));
rows.add(row);

UpsertParam param = UpsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rows)
        .build();

R<MutationResult> response = client.upsert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

MutationResultWrapper wrapper = new MutationResultWrapper(response.getData());
System.out.println(wrapper.getInsertCount() + " rows upserted");
```
