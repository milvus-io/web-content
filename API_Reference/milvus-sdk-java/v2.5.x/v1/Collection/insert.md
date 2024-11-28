# insert()

A MilvusClient interface. This method inserts entities into a specified collection.

```java
R<MutationResult> insert(InsertParam requestParam);
```

#### InsertParam

Use the `InsertParam.Builder` to construct an `InsertParam` object.

```java
import io.milvus.param.InsertParam;
InsertParam.Builder builder = InsertParam.newBuilder();
```

Methods of `InsertParam.Builder`:

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
        <td><p>withFields(List&lt;InsertParam.Field> fields)</p></td>
        <td><p>Sets the data to be inserted. The field list cannot be empty. <br/>Note that no input is required for the primary key field if auto_id is enabled.</p></td>
        <td><p>fields: A list of Field objects, each representing a field.</p></td>
    </tr>
    <tr>
        <td><p>withRows(List&lt;gson.JsonObject> rows)</p></td>
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

<p>In Java SDK versions v2.4.1 or earlier versions, the input is a <code>fastjson.JSONObject</code>. But <code>fastjson</code> is not recommended to use now because of its unsafe deserialization vulnerability. Therefore, replace <code>fastjson</code> with <code>gson</code> if you use the Java SDK of v2.4.2 or later releases.</p>

</div>

The `InsertParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Field

A tool class to hold a data field.

Methods of `InsertParam.Field`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
   </tr>
   <tr>
     <td><p>Field(String name, List&lt;?> values)</p></td>
     <td><p>This class only provides a constructor to create a Field object.</p></td>
     <td><p>name: The name of the data field. values:</p><ul><li>Requires List&lt;Boolean> if the data type is Bool.</li><li>Requires List&lt;Long> if the data type is Int64.</li><li>Requires List&lt;Integer> or List&lt;Short> if the data type is Int8/Int16/Int32.</li><li>Requires List&lt;Float> if the data type is Float.</li><li>Requires List&lt;Double> if the data type is Double.</li><li>Requires List&lt;String> if the data type is Varchar.</li><li>Requires List&lt;List&lt;?>gt; if the data type is Array, the inner List type must be equal to the element type of the Array field.</li><li>Requires List&lt;List&lt;Float>gt;, if the data type is FloatVector.</li><li>Requires List&lt;ByteBuffer>, if the data type is BinaryVector/Float16Vector/BFloat16Vector.</li><li>Requires List&lt;SortedMap&lt;Long, Float>gt; if the data type is SparseFloatVector.</li></ul></td>
   </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the `R` template. You can use `MutationResultWrapper` to get the returned information.

#### MutationResultWrapper

A tool class to encapsulate the MutationResult. 

```java
import io.milvus.response.MutationResultWrapper;
MutationResultWrapper wrapper = new MutationResultWrapper(mutationResult);
```

Methods of `MutationResultWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getInsertCount()</p></td>
     <td><p>Gets the row count of the inserted entities.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getLongIDs()</p></td>
     <td><p>Gets the long ID array returned by the insert() interface if the primary key field is int64 type. Throw ParamException if the primary key type is not int64.</p></td>
     <td><p>List&lt;Long></p></td>
   </tr>
   <tr>
     <td><p>getStringIDs()</p></td>
     <td><p>Gets the string ID array returned by the insert() interface if the primary key field is varchar type. Throw ParamException if the primary key type is not varchar type.</p></td>
     <td><p>List&lt;String></p></td>
   </tr>
   <tr>
     <td><p>getDeleteCount()</p></td>
     <td><p>Gets the row count of the deleted entities. Currently, this value is always equal to the input row count.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getOperationTs()</p></td>
     <td><p>Gets the timestamp of the operation marked by the server.</p></td>
     <td><p>long</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

int rowCount = 10000;
List<List<Float>> vectors = generateFloatVectors(rowCount);

// insert data by columns
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}

List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("id", ids));
fields.add(new InsertParam.Field("vector", vectors));

R<MutationResult> response = client.insert(InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFields(fields)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

MutationResultWrapper wrapper = new MutationResultWrapper(response.getData());
System.out.println(wrapper.getInsertCount() + " rows inserted");

// insert data by rows
Gson gson = new Gson();
List<JsonObject> rows = new ArrayList<>();
for (int i = 1; i <= rowCount; ++i) {
    JsonObject row = new JsonObject();
    row.addProperty("id", (long)i);
    row.add("vector", gson.toJsonTree(vectors.get(i)));
    rows.add(row);
}

response = client.insert(InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rows)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
