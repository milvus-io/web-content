# showCollections()

A MilvusClient interface. This method lists all the collections or gets the collection loading status*.*

```java
R<ShowCollectionsResponse> showCollections(ShowCollectionsParam requestParam);
```

## ShowCollectionsParam

Use the `ShowCollectionsParam.Builder` to construct a `ShowCollectionsParam` object.

```java
import io.milvus.param.ShowCollectionsParam;
ShowCollectionsParam.Builder builder = ShowCollectionsParam.newBuilder();
```

Methods of `ShowCollectionsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionNames(List\<String> collectionNames)</td>
        <td>Sets a list of collection names. If the list is empty, the method will return all the collections in database.<br/>Collection name cannot be empty or null.</td>
        <td>collectionNames: A list of the collection names to show.</td>
    </tr>
    <tr>
        <td>addCollectionName(String collectionName)</td>
        <td>Adds a collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to show.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ShowCollectionsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ShowCollectionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ShowCollectionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ShowCollectionsResponse` held by the `R` template. You can use `ShowCollResponseWrapper` to get the information.

## ShowCollResponseWrapper

A tool class to encapsulate the `ShowCollectionsResponse`. 

```java
import io.milvus.response.ShowCollResponseWrapper;
ShowCollResponseWrapper wrapper = new ShowCollResponseWrapper(showCollectionsResponse);
```

Methods of `ShowCollResponseWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getCollectionsInfo()<br/></td>
     <td>Returns a list of CollectionInfo objects. Each CollectionInfo represents a collection.</td>
     <td>N/A</td>
     <td>List\<CollectionInfo></td>
   </tr>
   <tr>
     <td>getCollectionInfoByName(String collectionName)</td>
     <td>Gets a CollectionInfo object by collection name.<br/></td>
     <td><code>collectionName</code>: The collection name.</td>
     <td>CollectionInfo</td>
   </tr>
</table>

## CollectionInfo

A tool class to store a collection's information.

Methods of `ShowCollResponseWrapper.CollectionInfo`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getName()</td>
     <td>Gets the name of the collection.</td>
     <td>String</td>
   </tr>
   <tr>
     <td>getId()</td>
     <td>Gets the ID of the collection.</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getUtcTimestamp()</td>
     <td>Gets a UTC timestamp that indicates when this collection is created. This method is for internal usage.</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getInMemoryPercentage()<br/></td>
     <td>Load percentage on query node.<br/></td>
     <td>long</td>
   </tr>
</table>

## Example

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
