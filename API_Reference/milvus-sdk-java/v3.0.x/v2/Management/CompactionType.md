# CompactionType

This is an enumeration that provides the following constants. It describes the type of a compaction plan returned by `getCompactionPlans()` and `listCompactionTasks()`.
```java
public enum CompactionType
```


**Constants:**

- **Undefined** (0)

    The compaction type is not set.

- **Merge** (2)

    A merge compaction that combines small segments into larger ones.

- **Mix** (3)

    A mix compaction that merges segments and compacts their data at the same time.

- **Single** (4)

    A single compaction that compacts data within one segment.

- **Minor** (5)

    A minor compaction that merges small segments.

- **Major** (6)

    A major compaction that merges segments and compacts their data.

- **Level0Delete** (7)

    An L0 compaction that merges delete operations in L0 segments into existing data segments.

- **Clustering** (8)

    A clustering compaction that reorganizes segments to improve query performance.

- **Sort** (9)

    A sort compaction that sorts data within segments.

- **PartitionKeySort** (10)

    A compaction that sorts segments by partition key.

- **ClusteringPartitionKeySort** (11)

    A compaction that clusters segments and sorts them by partition key.

- **BumpSchemaVersion** (12)

    A compaction that bumps the schema version of a segment.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.CompactionPlan;
import io.milvus.v2.common.CompactionType;
import io.milvus.v2.service.utility.request.GetCompactionPlansReq;
import io.milvus.v2.service.utility.response.GetCompactionPlansResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetCompactionPlansResp resp = client.getCompactionPlans(GetCompactionPlansReq.builder()
        .compactionID(compactionID)
        .build());
for (CompactionPlan plan : resp.getPlans()) {
    if (plan.getCompactionType() == CompactionType.Merge) {
        System.out.println("Merge compaction plan: " + plan.getPlanId());
    }
}
```
