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

**RETURNS:**

*DescribeIndexResp*

A **DescribeIndexResp** object that contains the details of the specified index. The object has the following fields:

- **indexDescriptions** (*List\<IndexDesc\>*) -

    The index descriptions. Each **IndexDesc** has the following fields:

    - **fieldName** (*String*) -

        The name of the field the index is built on.

    - **indexName** (*String*) -

        The name of the index.

    - **id** (*long*) -

        The internal ID of the index.

    - **indexType** (*IndexType*) -

        The type of the index.

    - **metricType** (*MetricType*) -

        The metric type used to measure vector similarity.

    - **extraParams** (*Map\<String, String\>*) -

        The extra parameters of the index.

    - **indexedRows** (*long*) -

        The number of rows that have been indexed.

    - **totalRows** (*long*) -

        The total number of rows in the collection.

    - **pendingIndexRows** (*long*) -

        The number of rows waiting to be indexed.

    - **indexState** (*IndexBuildState*) -

        The build state of the index.

    - **indexFailedReason** (*String*) -

        The reason the index build failed, if any.

    - **properties** (*Map\<String, String\>*) -

        **Deprecated.** The properties of the index. Use `extraParams` instead.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;
import java.util.Set;

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
