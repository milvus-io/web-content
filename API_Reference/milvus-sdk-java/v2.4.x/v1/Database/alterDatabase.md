# alterDatabase()

The MilvusClient interface. This method alters a database.

```java
R<RpcStatus> alterDatabase(AlterDatabaseParam requestParam);
```

#### AlterDatabaseParam

Use the `AlterDatabaseParam.Builder` to construct an `AlterDatabaseParam` object.

```java
import io.milvus.param.collection.AlterDatabaseParam;
AlterDatabaseParam.Builder builder = AlterDatabaseParam.newBuilder()
```

Methods of `AlterDatabaseParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the databaseName name. Database name cannot be empty or null.</p></td>
        <td><p>databaseName: The database name</p></td>
    </tr>
    <tr>
        <td><p>withReplicaNumber(int replicaNumber)</p></td>
        <td><p>Sets the replica number in database level, then if load collection doesn't have replica number, it will use this replica number.</p></td>
        <td><p>replicaNumber: replica number</p></td>
    </tr>
    <tr>
        <td><p>WithResourceGroups(List\<String> resourceGroups)</p></td>
        <td><p>Sets the resource groups in database level, then if load collection doesn't have resource groups, it will use this resource groups.</p></td>
        <td><p>resourceGroups: resource group names</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a CreateDatabaseParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.collection.AlterDatabaseParam;

AlterDatabaseParam param = AlterDatabaseParam.newBuilder()
        .withDatabaseName("mydnb")
        .withReplicaNumber(3)
        .WithResourceGroups(Arrays.asList("rg1", "rg2", "rg3"))
        .build();
        
R<RpcStatus> response = client.alterDatabase(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

## describeDatabase()

The MilvusClient interface. This method describes a database.

```java
R<DescribeDatabaseResponse> describeDatabase(DescribeDatabaseParam requestParam);
```

#### DescribeDatabaseParam

Use the `DescribeDatabaseParam.Builder` to construct a `DescribeDatabaseParam` object.

```java
import io.milvus.param.collection.DescribeDatabaseParam;
DescribeDatabaseParam.Builder builder = DescribeDatabaseParam.newBuilder()
```

Methods of `DescribeDatabaseParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the databaseName name. Database name cannot be empty or null.</p></td>
        <td><p>databaseName: The database name</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a DescribeDatabaseParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<DescribeDatabaseResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `DescribeDatabaseResponse` held by the R template. You can use DescDBResponseWrapper to get the information.

#### DescDBResponseWrapper

A tool class to encapsulate the `DescribeDatabaseResponse`. 

```java
import io.milvus.response.DescDBResponseWrapper;
DescDBResponseWrapper wrapper = new DescDBResponseWrapper(describeDBResponse);
```

Methods of `DescDBResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getDatabaseName()</p></td>
     <td><p>Returns the name of the database.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getReplicaNumber()</p></td>
     <td><p>Returns database-level replica number.</p></td>
     <td><p>N/A</p></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getResourceGroups()</p></td>
     <td><p>Returns resource groups of the database.</p></td>
     <td><p>N/A</p></td>
     <td><p>List\<String></p></td>
   </tr>
   <tr>
     <td><p>getProperties()</p></td>
     <td><p>Returns all properties of the database, including the replica number and resource groups.</p></td>
     <td><p>N/A</p></td>
     <td><p>Map\<String, String></p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.collection.DescribeDatabaseParam;
import io.milvus.response.DescDBResponseWrapper;

DescribeDatabaseParam describeDBParam = DescribeDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<DescribeDatabaseResponse> response = client.describeDatabase(describeDBParam);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
DescDBResponseWrapper describeDBWrapper = new DescDBResponseWrapper(response.getData());
System.out.println(describeDBWrapper.getReplicaNumber());
```
