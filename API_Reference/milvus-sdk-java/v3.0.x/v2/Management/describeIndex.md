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

    The index descriptions. Each **IndexDesc** has the following getters:

    - `getFieldName()` (*String*) -

        The name of the field the index is built on.

    - `getIndexName()` (*String*) -

        The name of the index.

    - `getId()` (*long*) -

        The internal ID of the index.

    - `getIndexType()` (*IndexType*) -

        The type of the index.

    - `getMetricType()` (*MetricType*) -

        The metric type used to measure vector similarity.

    - `getExtraParams()` (*Map\<String, String\>*) -

        The extra parameters of the index.

    - `getIndexedRows()` (*long*) -

        The number of rows that have been indexed.

    - `getTotalRows()` (*long*) -

        The total number of rows in the collection.

    - `getPendingIndexRows()` (*long*) -

        The number of rows waiting to be indexed.

    - `getIndexState()` (*IndexBuildState*) -

        The build state of the index.

    - `getIndexFailedReason()` (*String*) -

        The reason the index build failed, if any.

    - `getProperties()` (*Map\<String, String\>*) -

        **Deprecated.** The properties of the index. Use `extraParams` instead.

**EXCEPTIONS