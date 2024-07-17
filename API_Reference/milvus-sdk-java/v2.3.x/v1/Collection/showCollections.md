# showCollections()

A MilvusClient interface. This method lists all the collections or gets the collection loading status*.*

```java
R<ShowCollectionsResponse> showCollections(ShowCollectionsParam requestParam);
```

#### ShowCollectionsParam

Use the `ShowCollectionsParam.Builder` to construct a `ShowCollectionsParam` object.

```java
import io.milvus.param.ShowCollectionsParam;
ShowCollectionsParam.Builder builder = ShowCollectionsParam.newBuilder();
```

Methods of `ShowCollectionsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionNames(List\<String> collectionNames)</p></td>
        <td><p>Sets a list of collection names. If the list is empty, the method will return all the collections in database.<br/>Collection name cannot be empty or null.</p></td>
        <td><p>collectionNames: A list of the collection names to show.</p></td>
    </tr>
    <tr>
        <td><p>addCollectionName(String collectionName)</p></td>
        <td><p>Adds a collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to show.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a ShowCollectionsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `ShowCollectionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<ShowCollectionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ShowCollectionsResponse` held by the `R` template. You can use `ShowCollResponseWrapper` to get the information.

#### ShowCollResponseWrapper

A tool class to encapsulate the `ShowCollectionsResponse`. 

```java
import io.milvus.response.ShowCollResponseWrapper;
ShowCollResponseWrapper wrapper = new ShowCollResponseWrapper(showCollectionsResponse);
```

Methods of `ShowCollResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getCollectionsInfo()</p></td>
     <td><p>Returns a list of CollectionInfo objects. Each CollectionInfo represents a collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>List\<CollectionInfo></p></td>
   </tr>
   <tr>
     <td><p>getCollectionInfoByName(String collectionName)</p></td>
     <td><p>Gets a CollectionInfo object by collection name.</p></td>
     <td><p>collectionName: The collection name.</p></td>
     <td><p>CollectionInfo</p></td>
   </tr>
</table>

#### CollectionInfo

A tool class to store a collection's information.

Methods of `ShowCollResponseWrapper.CollectionInfo`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getName()</p></td>
     <td><p>Gets the name of the collection.</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getId()</p></td>
     <td><p>Gets the ID of the collection.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getUtcTimestamp()</p></td>
     <td><p>Gets a UTC timestamp that indicates when this collection is created. This method is for internal usage.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getInMemoryPercentage()</p></td>
     <td><p>Load percentage on query node.</p></td>
     <td><p>long</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.ShowCollResponseWrapper;
import io.milvus.grpc.ShowCollectionsResponse;

ShowCollectionsParam param = ShowCollectionsParam.newBuilder()
        .addCollectionName(COLLECTION_NAME)
        .build();
R<ShowCollectionsResponse> response = client.showCollections(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

ShowCollResponseWrapper wrapper = new ShowCollResponseWrapper(response.getData());
System.out.println("Row count: " + wrapper.getRowCount());

List<ShowCollResponseWrapper.CollectionInfo> infos = wrapper.getCollectionsInfo();
for (ShowCollResponseWrapper.CollectionInfo info : infos) {
    System.out.println(info.getName() + " load percentage: " + info.getInMemoryPercentage() + "%");
}
```
