# listRefreshExternalCollectionJobs()

This operation lists all external-collection refresh jobs, optionally filtered by collection name.

```java
public ListRefreshExternalCollectionJobsResp listRefreshExternalCollectionJobs(ListRefreshExternalCollectionJobsReq request)
```

## Request Syntax

```java
listRefreshExternalCollectionJobs(ListRefreshExternalCollectionJobsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The collection name to filter by. If empty, jobs across all collections in the database are returned.

**RETURN TYPE:**

*ListRefreshExternalCollectionJobsResp*

**RETURNS:**

A **ListRefreshExternalCollectionJobsResp** object that wraps `List<RefreshExternalCollectionJobInfo>` accessible via `getJobs()`.

- `getJobs()` (*List\<RefreshExternalCollectionJobInfo\>*) -

    The refresh jobs that match the request filter. Each **RefreshExternalCollectionJobInfo** has the same shape as the entry returned by `getRefreshExternalCollectionProgress()`:

    - `getJobId()` (*long*) -

        The job identifier.

    - `getCollectionName()` (*String*) -

        The target collection name.

    - `getState()` (*String*) -

        The current job state (e.g., `"PENDING"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`).

    - `getProgress()` (*int*) -

        The completion percentage (0-100).

    - `getReason()` (*String*) -

        The failure reason if `state` is `"FAILED"`; empty otherwise.

    - `getExternalSource()` (*String*) -

        The external source used by the job.

    - `getExternalSpec()` (*String*) -

        The external source specification used by the job.

    - `getStartTime()` (*long*) -

        The job start timestamp (epoch milliseconds).

    - `getEndTime()` (*long*) -

        The job end timestamp (epoch milliseconds), or 0 if still running.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;
import io.milvus.v2.service.utility.request.ListRefreshExternalCollectionJobsReq;
import io.milvus.v2.service.utility.response.ListRefreshExternalCollectionJobsResp;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;

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
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());


// 3. List the refresh jobs of the external collection
ListRefreshExternalCollectionJobsResp resp = client.listRefreshExternalCollectionJobs(
    ListRefreshExternalCollectionJobsReq.builder()
        .collectionName("my_collection")
        .build()
);
for (RefreshExternalCollectionJobInfo job : resp.getJobs()) {
    System.out.println(job.getJobId() + " " + job.getState());
}
```
