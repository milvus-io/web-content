# describeIndex()

This operation describes a specific index.

```java
public DescribeIndexResp describeIndex(DescribeIndexReq request)
```

## Request Syntax

```java
describeIndex(DescribeIndexReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .indexName(String indexName)
    .timestamp(Long timestamp)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `fieldName(String fieldName)` -

    The name of the target field.

- `indexName(String indexName)` -

    The name of the target index.

- `timestamp(Long timestamp)` -

    A timestamp for time-travel queries. Defaults to `0L`.

**RETURN TYPE:**

*DescribeIndexResp*

**RETURNS:**

A **DescribeIndexResp** object that contains the details of the specified index.

- `getIndexDescriptions()` (*List\<IndexDesc\>*) -

    Each **IndexDesc** has the following getters:

    - `getFieldName()` (*String*) - The name of the indexed field.

    - `getIndexName()` (*String*) - The name of the index.

    - `getId()` (*long*) - The ID of the index.

    - `getIndexType()` (*IndexParam.IndexType*) - The index type.

    - `getMetricType()` (*IndexParam.MetricType*) - The metric type used by the index.

    - `getExtraParams()` (*Map\<String, String\>*) - The extra index parameters.

    - `getIndexedRows()` (*long*) - The number of rows that have been indexed.

    - `getTotalRows()` (*long*) - The total number of rows known to the index.

    - `getPendingIndexRows()` (*long*) - The number of rows waiting to be indexed.

    - `getIndexState()` (*IndexBuildState*) - The current index-building state. Possible values are:

        - **IndexStateNone** - The index build state is not set.

        - **Unissued** - The index build task has not been issued yet.

        - **InProgress** - The index build task is in progress.

        - **Finished** - The index build task has finished successfully.

        - **Failed** - The index build task has failed.

        - **Retry** - The index build task will be retried.

    - `getIndexFailedReason()` (*String*) - The reason why index building failed.

    - `getProperties()` (*Map\<String, String\>*) - **Deprecated.** The index properties, as set at creation time.

- `getIndexDescByFieldName(String fieldName)` (*IndexDesc*) -

    Returns the index description for the specified field name, or `null` if none is found. Throws `IllegalArgumentException` if the field name is `null`.

- `getIndexDescByIndexName(String indexName)` (*IndexDesc*) -

    Returns the index description for the specified index name, or `null` if none is found. Throws `IllegalArgumentException` if the index name is `null`.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .build());


// 3. Create an index for the field "vector"
IndexParam indexParam = IndexParam.builder()
        .metricType(IndexParam.MetricType.COSINE)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .fieldName("vector")
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName("test")
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 4. Describe the index for the field "vector"
DescribeIndexReq describeIndexReq = DescribeIndexReq.builder()
        .collectionName("test")
        .fieldName("vector")
        .build();
DescribeIndexResp describeIndexResp = client.describeIndex(describeIndexReq);
```
