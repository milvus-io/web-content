---
id: manage-snapshots.md
title: "Manage Snapshots"
summary: "Learn how to create, list, describe, pin, restore, and drop snapshots and monitor restoration jobs."
beta: Milvus 3.0.x
---

# Manage Snapshots

In this guide, you will learn how to create and manage snapshots, including

- [Create a snapshot](#Create-snapshot),
- [List snapshots](#List-snapshots),
- [Describe a snapshot](#Describe-snapshot),
- [Pin/unpin snapshot data](#Pinunpin-snapshot-data),
- [Restore a snapshot](#Restore-snapshot),
- [Drop a snapshot](#Drop-snapshot),
- [List restoration jobs](#List-restoration-jobs), and
- [Get restoration state](#Get-restoration-state).

## Create snapshot

Before creating a snapshot, you are advised to stop writing data to the target collection and call `flush()` to avoid possible data loss.

<div class="alert note">

Calling `flush()` is not mandatory but highly recommended to avoid data loss. If you skip this, the snapshot contains only the data that has already been flushed.

</div>

When naming a snapshot, use clear, descriptive names, such as `"daily_backup_20240101"` or `"v2.1_production_release"` and avoid generic terms, such as `"backup1"` and `"test"`. Use snapshot names wisely to distinguish snapshots across versions, environments, and stages.

The code examples below assume that you already have a collection named `my_collection`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Recommended: Flush data before creating snapshot to ensure all data is included
client.flush(collection_name="my_collection")

# Create snapshot for entire collection
client.create_snapshot(
    collection_name="my_collection",
    snapshot_name="backup_20240101",
    description="Daily backup for January 1st, 2024"
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.snapshot.request.CreateSnapshotReq;
import io.milvus.v2.service.utility.request.FlushReq;

import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

// Recommended: Flush data before creating snapshot to ensure all data is included
client.flush(FlushReq.builder()
        .collectionNames(Collections.singletonList("my_collection"))
        .build());

// Create snapshot for entire collection
client.createSnapshot(CreateSnapshotReq.builder()
        .collectionName("my_collection")
        .snapshotName("backup_20240101")
        .description("Daily backup for January 1st, 2024")
        .build());
```

```go
import (
    "context"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

client, err := milvusclient.New(context.Background(), &milvusclient.ClientConfig{
    Address:  "localhost:19530",
    Username: "root",
    Password: "Milvus",
})
if err != nil {
    panic(err)
}
defer client.Close(context.Background())

// Recommended: Flush data before creating snapshot to ensure all data is included
flushTask, err := client.Flush(context.Background(), milvusclient.NewFlushOption("my_collection"))
if err != nil {
    panic(err)
}
if err = flushTask.Await(context.Background()); err != nil {
    panic(err)
}

// Create snapshot
createOpt := milvusclient.NewCreateSnapshotOption("backup_20240101", "my_collection").
    WithDescription("Daily backup for January 1st, 2024")

err = client.CreateSnapshot(context.Background(), createOpt)
if err != nil {
    panic(err)
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: "http://localhost:19530",
    token: "root:Milvus",
});

// Recommended: Flush data before creating snapshot to ensure all data is included
await client.flushSync({
    collection_names: ["my_collection"],
});

// Create snapshot for entire collection
await client.createSnapshot({
    collection_name: "my_collection",
    snapshot_name: "backup_20240101",
    description: "Daily backup for January 1st, 2024",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "snapshotName": "backup_20240101",
    "description": "Daily backup for January 1st, 2024"
}'
```

## List snapshots

You can list the names of existing snapshots.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# List all snapshots for a collection
snapshots = client.list_snapshots(
    collection_name="my_collection"
)
```

```java
import io.milvus.v2.service.snapshot.request.ListSnapshotsReq;
import io.milvus.v2.service.snapshot.response.ListSnapshotsResp;

import java.util.List;

// List all snapshots for a collection
ListSnapshotsResp listResp = client.listSnapshots(ListSnapshotsReq.builder()
        .collectionName("my_collection")
        .build());
List<String> snapshots = listResp.getSnapshots();
```

```go
// Add this import to the same Go file for the following examples.
import "fmt"

// List snapshots for collection
listOpt := milvusclient.NewListSnapshotsOption("my_collection")

snapshots, err := client.ListSnapshots(context.Background(), listOpt)
if err != nil {
    panic(err)
}
fmt.Println(snapshots)
```

```javascript
// List all snapshots for a collection
const { snapshots } = await client.listSnapshots({
    collection_name: "my_collection",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'
```

## Describe snapshot

You can get the detailed information about a specific snapshot.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
snapshot_info = client.describe_snapshot(
    snapshot_name="backup_20240101",
    include_collection_info=True
)

print(f"Snapshot ID: {snapshot_info.id}")
print(f"Collection: {snapshot_info.collection_name}")
print(f"Created: {snapshot_info.create_ts}")
print(f"Description: {snapshot_info.description}")
```

```java
import io.milvus.v2.service.snapshot.request.DescribeSnapshotReq;
import io.milvus.v2.service.snapshot.response.DescribeSnapshotResp;

DescribeSnapshotResp snapshotInfo = client.describeSnapshot(DescribeSnapshotReq.builder()
        .collectionName("my_collection")
        .snapshotName("backup_20240101")
        .build());

System.out.println("Snapshot: " + snapshotInfo.getName());
System.out.println("Collection: " + snapshotInfo.getCollectionName());
System.out.println("Created: " + snapshotInfo.getCreateTs());
System.out.println("Description: " + snapshotInfo.getDescription());
```

```go
describeOpt := milvusclient.NewDescribeSnapshotOption("backup_20240101", "my_collection")
resp, err := client.DescribeSnapshot(context.Background(), describeOpt)
if err != nil {
    panic(err)
}

fmt.Printf("Snapshot: %s\n", resp.GetName())
fmt.Printf("Collection: %s\n", resp.GetCollectionName())
fmt.Printf("Created at: %d\n", resp.GetCreateTs())
```

```javascript
const snapshotInfo = await client.describeSnapshot({
    collection_name: "my_collection",
    snapshot_name: "backup_20240101",
});

console.log(`Snapshot: ${snapshotInfo.name}`);
console.log(`Collection: ${snapshotInfo.collection_name}`);
console.log(`Created: ${snapshotInfo.create_ts}`);
console.log(`Description: ${snapshotInfo.description}`);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "snapshotName": "backup_20240101"
}'
```

## Pin/unpin snapshot data

During restoration, you can pin a snapshot to temporarily protect its underlying data from garbage collection, and unpin it to release the data.

You can also set a time-to-live (TTL) duration for the pin operation so that the pinned data will be released when the duration expires.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
pin_id = client.pin_snapshot_data(
    snapshot_name="backup_20240101",
    collection_name="my_collection",
    ttl_seconds=3600,
)

client.unpin_snapshot_data(
    pin_id=pin_id
)
```

```java
import io.milvus.v2.service.snapshot.request.PinSnapshotDataReq;
import io.milvus.v2.service.snapshot.request.UnpinSnapshotDataReq;
import io.milvus.v2.service.snapshot.response.PinSnapshotDataResp;

PinSnapshotDataResp pinResp = client.pinSnapshotData(PinSnapshotDataReq.builder()
        .snapshotName("backup_20240101")
        .collectionName("my_collection")
        .ttlSeconds(3600L)
        .build());

client.unpinSnapshotData(UnpinSnapshotDataReq.builder()
        .pinId(pinResp.getPinId())
        .build());
```

```go
pinID, err := client.PinSnapshotData(
    context.Background(),
    milvusclient.NewPinSnapshotDataOption("backup_20240101", "my_collection").WithTTL(3600),
)
if err != nil {
    panic(err)
}

defer func() {
    _ = client.UnpinSnapshotData(
        context.Background(),
        milvusclient.NewUnpinSnapshotDataOption(pinID),
    )
}()

// Do work with pinned snapshot data.
```

```javascript
const { pin_id } = await client.pinSnapshotData({
    snapshot_name: "backup_20240101",
    collection_name: "my_collection",
    ttl_seconds: 3600,
});

await client.unpinSnapshotData({
    pin_id: pin_id,
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

# The pin response carries the pinId that the unpin request needs
PIN_ID=$(curl --silent --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/pin" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "snapshotName": "backup_20240101",
    "ttlSeconds": 3600
}' | jq -r '.data.pinId')

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/unpin" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"pinId\": \"${PIN_ID}\"
}"
```

## Restore snapshot

You can restore a snapshot to a new collection. This operation is asynchronous and returns a job ID for tracking the restoration progress.

The restoration uses a **copy-segment** mechanism instead of data import, which is more efficient because it

- directly copies segment files (binlogs, deltalogs, index files) from snapshot storage
- preserves field IDs and index IDs to ensure compatibility with existing data files
- avoids data rewriting and index rebuilding, resulting in significantly faster restore times, and
- ensures a 10- to 100-fold performance increase compared with traditional backup and restore methods

To restore a snapshot, do as follows:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Restore snapshot to new collection
job_id = client.restore_snapshot(
    snapshot_name="backup_20240101",
    collection_name="restored_collection",
)
```

```java
import io.milvus.v2.service.snapshot.request.RestoreSnapshotReq;
import io.milvus.v2.service.snapshot.response.RestoreSnapshotResp;

// Restore snapshot to new collection
RestoreSnapshotResp restoreResp = client.restoreSnapshot(RestoreSnapshotReq.builder()
        .snapshotName("backup_20240101")
        .sourceCollectionName("my_collection")
        .targetCollectionName("restored_collection")
        .build());
Long jobId = restoreResp.getJobId();
```

```go
restoreOpt := milvusclient.NewRestoreSnapshotOption(
    "backup_20240101",     // snapshot name
    "my_collection",       // source collection holding the snapshot
    "restored_collection", // target collection
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
if err != nil {
    panic(err)
}

fmt.Println(jobID)
```

```javascript
// Restore snapshot to new collection
const { job_id } = await client.restoreSnapshot({
    snapshot_name: "backup_20240101",
    source_collection_name: "my_collection",
    target_collection_name: "restored_collection",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/restore" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "sourceCollectionName": "my_collection",
    "targetCollectionName": "restored_collection",
    "snapshotName": "backup_20240101"
}'
```

For details on monitoring the progress of a restoration job, refer to [Get restoration state](#Get-restoration-state).

## Drop snapshot

You can drop a snapshot if it is no longer needed. You are advised to remove old snapshots regularly to save storage.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_snapshot(
    snapshot_name="backup_20240101"
)
```

```java
import io.milvus.v2.service.snapshot.request.DropSnapshotReq;

client.dropSnapshot(DropSnapshotReq.builder()
        .collectionName("my_collection")
        .snapshotName("backup_20240101")
        .build());
```

```go
dropOpt := milvusclient.NewDropSnapshotOption("backup_20240101", "my_collection")
err = client.DropSnapshot(context.Background(), dropOpt)
if err != nil {
    panic(err)
}
```

```javascript
await client.dropSnapshot({
    collection_name: "my_collection",
    snapshot_name: "backup_20240101",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/snapshots/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "snapshotName": "backup_20240101"
}'
```

## List restoration jobs

You can use this API to get a list of snapshots already created for the target collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# List all restore jobs
jobs = client.list_restore_snapshot_jobs()

for job in jobs:
    print(f"Job {job.job_id}: {job.snapshot_name} -> Collection {job.collection_id}")
    print(f"  State: {job.state}, Progress: {job.progress}%")

# List restore jobs for a specific collection
jobs = client.list_restore_snapshot_jobs(collection_name="my_collection")
```

```java
import io.milvus.v2.service.snapshot.request.ListRestoreSnapshotJobsReq;
import io.milvus.v2.service.snapshot.response.ListRestoreSnapshotJobsResp;
import io.milvus.v2.service.snapshot.response.RestoreSnapshotJobInfo;

// List all restore jobs
ListRestoreSnapshotJobsResp jobsResp = client.listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
        .build());

for (RestoreSnapshotJobInfo job : jobsResp.getJobs()) {
    System.out.printf("Job %d: %s -> Collection %s%n",
            job.getJobId(), job.getSnapshotName(), job.getCollectionName());
    System.out.printf("  State: %s, Progress: %d%%%n", job.getState(), job.getProgress());
}

// List restore jobs for a specific collection
jobsResp = client.listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
        .collectionName("my_collection")
        .build());
```

```go
// List all restore jobs
jobsOpt := milvusclient.NewListRestoreSnapshotJobsOption()
jobs, err := client.ListRestoreSnapshotJobs(context.Background(), jobsOpt)
if err != nil {
    panic(err)
}

for _, job := range jobs {
    fmt.Printf("Job %d: %s -> Collection %s\n",
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName())
    fmt.Printf("  State: %s, Progress: %d%%\n",
        job.GetState(), job.GetProgress())
}

// List restore jobs for a specific collection
jobsOpt = milvusclient.NewListRestoreSnapshotJobsOption().
    WithCollectionName("my_collection")
jobs, err = client.ListRestoreSnapshotJobs(context.Background(), jobsOpt)
if err != nil {
    panic(err)
}
for _, job := range jobs {
    fmt.Printf("Job %d: %s -> Collection %s\n",
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName())
}
```

```javascript
// List all restore jobs
let jobsResp = await client.listRestoreSnapshotJobs();

for (const job of jobsResp.jobs) {
    console.log(`Job ${job.job_id}: ${job.snapshot_name} -> Collection ${job.collection_name}`);
    console.log(`  State: ${job.state}, Progress: ${job.progress}%`);
}

// List restore jobs for a specific collection
jobsResp = await client.listRestoreSnapshotJobs({
    collection_name: "my_collection",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

# List all restore jobs
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/jobs/snapshot/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{}'

# List restore jobs for a specific collection
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/jobs/snapshot/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'
```

## Get restoration state

Once you have a restoration job ID, you can use it to retrieve restoration progress.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
state = client.get_restore_snapshot_state(job_id=12345)

print(f"Job ID: {state.job_id}")
print(f"Snapshot Name: {state.snapshot_name}")
print(f"Collection ID: {state.collection_id}")
print(f"State: {state.state}")
print(f"Progress: {state.progress}%")
if state.state == "RestoreSnapshotFailed":
    print(f"Failure Reason: {state.reason}")
print(f"Time Cost: {state.time_cost}ms")
```

```java
import io.milvus.v2.service.snapshot.request.GetRestoreSnapshotStateReq;
import io.milvus.v2.service.snapshot.response.GetRestoreSnapshotStateResp;
import io.milvus.v2.service.snapshot.response.RestoreSnapshotJobInfo;

GetRestoreSnapshotStateResp stateResp = client.getRestoreSnapshotState(GetRestoreSnapshotStateReq.builder()
        .jobId(12345L)
        .build());
RestoreSnapshotJobInfo state = stateResp.getJobInfo();

System.out.println("Job ID: " + state.getJobId());
System.out.println("Snapshot Name: " + state.getSnapshotName());
System.out.println("Collection: " + state.getCollectionName());
System.out.println("State: " + state.getState());
System.out.println("Progress: " + state.getProgress() + "%");
if ("RestoreSnapshotFailed".equals(state.getState())) {
    System.out.println("Failure Reason: " + state.getReason());
}
System.out.println("Time Cost: " + state.getTimeCost() + "ms");
```

```go
stateOpt := milvusclient.NewGetRestoreSnapshotStateOption(12345)
state, err := client.GetRestoreSnapshotState(context.Background(), stateOpt)
if err != nil {
    panic(err)
}

fmt.Printf("Job ID: %d\n", state.GetJobId())
fmt.Printf("Snapshot Name: %s\n", state.GetSnapshotName())
fmt.Printf("Collection: %s\n", state.GetCollectionName())
fmt.Printf("State: %s\n", state.GetState())
fmt.Printf("Progress: %d%%\n", state.GetProgress())
if state.GetState().String() == "RestoreSnapshotFailed" {
    fmt.Printf("Failure Reason: %s\n", state.GetReason())
}
fmt.Printf("Time Cost: %dms\n", state.GetTimeCost())
```

```javascript
const stateResp = await client.getRestoreSnapshotState({
    job_id: 12345,
});
const state = stateResp.info;

console.log(`Job ID: ${state.job_id}`);
console.log(`Snapshot Name: ${state.snapshot_name}`);
console.log(`Collection: ${state.collection_name}`);
console.log(`State: ${state.state}`);
console.log(`Progress: ${state.progress}%`);
if (state.state === "RestoreSnapshotFailed") {
    console.log(`Failure Reason: ${state.reason}`);
}
console.log(`Time Cost: ${state.time_cost}ms`);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/jobs/snapshot/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "jobId": "12345"
}'
```
