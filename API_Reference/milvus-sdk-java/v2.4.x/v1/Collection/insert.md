# insert()

A MilvusClient interface. This method inserts entities into a specified collection.

```java
R<MutationResult> insert(InsertParam requestParam);
```

## InsertParam

Use the `InsertParam.Builder` to construct an `InsertParam` object.

```java
import io.milvus.param.InsertParam;
InsertParam.Builder builder = InsertParam.newBuilder();
```

Methods of `InsertParam.Builder`:

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
        <td>withPartitionName(String partitionName)</td>
        <td>Sets the target partition name(optional).</td>
        <td>partitionName: The name of the partition to insert data into.</td>
    </tr>
    <tr>
        <td>withFields(List\<InsertParam.Field> fields)</td>
        <td>Sets the data to be inserted. The field list cannot be empty. <br/>Note that no input is required for the primary key field if auto_id is enabled.</td>
        <td>fields: A list of Field objects, each representing a field.</td>
    </tr>
    <tr>
        <td>withRows(List\<JSONObject> rows)</td>
        <td>Sets the row-based data to be inserted. The row list cannot be empty.<br/>Note that if the withFields() is called, the rows by withRows() will be ignored.</td>
        <td>rows: A list of JSONObject objects, each representing a row in key-value format.<br/>- Requires List\<Boolean> if the data type is Bool.<br/>- Requires List\<Long> if the data type is Int64.<br/>- Requires List\<Integer> or List\<Short> if the data type is Int8/Int16/Int32.<br/>- Value is List\<Float> if the data type is Float.<br/>- Value is List\<Double> if the data type is Double.<br/>- Value is List\<String> if the data type is Varchar.<br/>- Value is List\<List\<?>gt; if the data type is Array, the inner List type must be equal to the element type of the Array field.<br/>- Value is List\<List\<Float>gt;, if the data type is FloatVector.<br/>- Value is List\<ByteBuffer>, if the data type is BinaryVector/Float16Vector/BFloat16Vector.<br/>- Value is List\<SortedMap\<Long, Float>gt; if the data type is SparseFloatVector.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs an InsertParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `InsertParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Field

A tool class to hold a data field.

Methods of `InsertParam.Field`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
   </tr>
   <tr>
     <td>Field(String name, List\<?> values)<br/></td>
     <td>This class only provides a constructor to create a Field object.<br/></td>
     <td>name: The name of the data field. values:<br/>- Requires List\<Boolean> if the data type is Bool.<br/>- Requires List\<Long> if the data type is Int64.<br/>- Requires List\<Integer> or List\<Short> if the data type is Int8/Int16/Int32.<br/>- Requires List\<Float> if the data type is Float.<br/>- Requires List\<Double> if the data type is Double.<br/>- Requires List\<String> if the data type is Varchar.<br/>- Requires List\<List\<?>gt; if the data type is Array, the inner List type must be equal to the element type of the Array field.<br/>- Requires List\<List\<Float>gt;, if the data type is FloatVector.<br/>- Requires List\<ByteBuffer>, if the data type is BinaryVector/Float16Vector/BFloat16Vector.<br/>- Requires List\<SortedMap\<Long, Float>gt; if the data type is SparseFloatVector.</td>
   </tr>
</table>

## Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the `R` template. You can use `MutationResultWrapper` to get the returned information.

## MutationResultWrapper

A tool class to encapsulate the MutationResult. 

```java
import io.milvus.response.MutationResultWrapper;
MutationResultWrapper wrapper = new MutationResultWrapper(mutationResult);
```

Methods of `MutationResultWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getInsertCount()</td>
     <td>Gets the row count of the inserted entities.<br/></td>
     <td>long</td>
   </tr>
   <tr>
     <td>getLongIDs()<br/></td>
     <td>Gets the long ID array returned by the insert() interface if the primary key field is int64 type. Throw ParamException if the primary key type is not int64.<br/></td>
     <td>List\<Long></td>
   </tr>
   <tr>
     <td>getStringIDs()</td>
     <td>Gets the string ID array returned by the insert() interface if the primary key field is varchar type. Throw ParamException if the primary key type is not varchar type.</td>
     <td>List\<String><br/></td>
   </tr>
   <tr>
     <td>getDeleteCount()</td>
     <td>Gets the row count of the deleted entities. Currently, this value is always equal to the input row count.</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getOperationTs()<br/></td>
     <td>Gets the timestamp of the operation marked by the server.</td>
     <td>long</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;

int rowCount = 10000;
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}
List<List<Float>> vectors = generateFloatVectors(rowCount);

List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("id", ids));
fields.add(new InsertParam.Field("vec", vectors));

InsertParam param = InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFields(fields)
        .build();
R<MutationResult> response = client.insert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

MutationResultWrapper wrapper = new MutationResultWrapper(response.getData());
System.out.println(wrapper.getInsertCount() + " rows inserted");
```
