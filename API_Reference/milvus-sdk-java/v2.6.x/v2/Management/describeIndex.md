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

    A list of index descriptions. Each **IndexDesc** object has the following getters:

    - `getFieldName()` (*String*) -

        The name of the field the index is built on.

    - `getIndexName()` (*String*) -

        The name of the index.

    - `getId()` (*long*) -

        The ID of the index.

    - `getIndexType()` (*IndexType*) -

        The index type. See [IndexType](IndexType.md).

    - `getMetricType()` (*MetricType*) -

        The metric type. See [MetricType](MetricType.md).

    - `getExtraParams()` (*Map\<String, String\>*) -

        Additional index parameters.

    - `getIndexedRows()` (*long*) -

        The number of rows that have been indexed.

    - `getTotalRows()` (*long*) -

        The total number of rows in the field.

    - `getPendingIndexRows()` (*long*) -

        The number of rows that are still pending indexing.

    - `getIndexState()` (*IndexBuildState*) -

        The state of the index build.

    - `getIndexFailedReason()` (*String*) -

        The reason for the index build failure, if any.

    - `getProperties()` (*Map\<String, String\>*) -

        The properties of the index.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe the index for the field "vector"
DescribeIndexReq describeIndexReq = DescribeIndexReq.builder()
        .collectionName("test")
        .fieldName("vector")
        .build();
DescribeIndexResp describeIndexResp = client.describeIndex(describeIndexReq);
```
