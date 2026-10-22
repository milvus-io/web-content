# getRefreshExternalCollectionProgress()

This operation returns the progress and current state of a previously started external collection refresh job.

```java
public GetRefreshExternalCollectionProgressResp getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq request)
```

## Request Syntax

```java
getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq.builder()
    .jobId(long jobId)
    .build()
);
```

**BUILDER METHODS:**

- `jobId(long jobId)` -

    **[REQUIRED]**

    The job ID returned by `refreshExternalCollection()`.

**RETURN TYPE:**

*GetRefreshExternalCollectionProgressResp*

**RETURNS:**

A **GetRefreshExternalCollectionProgressResp** object that wraps a single **RefreshExternalCollectionJobInfo** accessible via `getJobInfo()`.

- `getJobInfo()` (*RefreshExternalCollectionJobInfo*) -

    The refresh job information. Each **RefreshExternalCollectionJobInfo** has the following getters:

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
import io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
import io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
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


// 3. Get the progress of a refresh job
long jobId = 123456789L;
GetRefreshExternalCollectionProgressResp resp = client.getRefreshExternalCollectionProgress(
    GetRefreshExternalCollectionProgressReq.builder()
        .jobId(jobId)
        .build()
);
RefreshExternalCollectionJobInfo info = resp.getJobInfo();
System.out.println(info.getState() + " " + info.getProgress() + "%");
```
