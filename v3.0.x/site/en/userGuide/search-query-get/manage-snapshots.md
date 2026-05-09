---
id: manage-snapshots.md
title: "Manage Snapshots"
summary: "In this guide, you will learn how to create and manage snapshots, including"
beta: Milvus 3.0.x
---

# Manage Snapshots

In this guide, you will learn how to create and manage snapshots.

### Create snapshot

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
// java
```

```go
import (
    "context"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

client, err := milvusclient.New(context.Background(), &milvusclient.ClientConfig{
    Address: "localhost:19530",
    Token: "root:Milvus",
})

// Recommended: Flush data before creating snapshot to ensure all data is included
err = client.Flush(context.Background(), milvusclient.NewFlushOption("my_collection"))
if err != nil {
    log.Fatal(err)
}

// Create snapshot
createOpt := milvusclient.NewCreateSnapshotOption("backup_20240101", "my_collection").
    WithDescription("Daily backup for January 1st, 2024")

err = client.CreateSnapshot(context.Background(), createOpt)
```

```javascript
// node.js
```

```bash
# restful
```

### List snapshots

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
// java
```

```go
// List snapshots for collection
listOpt := milvusclient.NewListSnapshotsOption().
    WithCollectionName("my_collection")

snapshots, err := client.ListSnapshots(context.Background(), listOpt)
```

```javascript
// node.js
```

```bash
# bash
```

### Describe snapshot

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
// java
```

```go
describeOpt := milvusclient.NewDescribeSnapshotOption("backup_20240101")
resp, err := client.DescribeSnapshot(context.Background(), describeOpt)

fmt.Printf("Snapshot ID: %d\n", resp.GetSnapshotInfo().GetId())
fmt.Printf("Collection: %s\n", resp.GetSnapshotInfo().GetCollectionName())
```

```javascript
// node.js
```

```bash
# restful
```

### Restore snapshot

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
// java
```

```go
restoreOpt := milvusclient.NewRestoreSnapshotOption(
    "backup_20240101",
    "restored_collection"
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
if err != nil {
    log.Fatal(err)
}
```

```javascript
// node.js
```

```bash
# restful
```

For details on monitoring the progress of a restoration job, refer to [Monitor restoration progress](snapshots.md#CvhSd7amkog20mxHid6cvTyknVb).

### Drop snapshot

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
// java
```

```go
dropOpt := milvusclient.NewDropSnapshotOption("backup_20240101")
err := client.DropSnapshot(context.Background(), dropOpt)
```

```javascript
// node.js
```

```bash
# restful
```

### List restoration jobs

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
// java
```

```go
// List all restore jobs
listOpt := milvusclient.NewListRestoreSnapshotJobsOption()
jobs, err := client.ListRestoreSnapshotJobs(context.Background(), listOpt)
if err != nil {
    log.Fatal(err)
}

for _, job := range jobs {
    fmt.Printf("Job %d: %s -> Collection %d\n",
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionId())
    fmt.Printf("  State: %s, Progress: %d%%\n",
        job.GetState(), job.GetProgress())
}

// List restore jobs for a specific collection
listOpt = milvusclient.NewListRestoreSnapshotJobsOption().
    WithCollectionName("my_collection")
jobs, err = client.ListRestoreSnapshotJobs(context.Background(), listOpt)
```

```javascript
// node.js
```

```bash
# restful
```

### Get restoration state

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
// java
```

```go
stateOpt := milvusclient.NewGetRestoreSnapshotStateOption(12345)
state, err := client.GetRestoreSnapshotState(context.Background(), stateOpt)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Job ID: %d\n", state.GetJobId())
fmt.Printf("Snapshot Name: %s\n", state.GetSnapshotName())
fmt.Printf("Collection ID: %d\n", state.GetCollectionId())
fmt.Printf("State: %s\n", state.GetState())
fmt.Printf("Progress: %d%%\n", state.GetProgress())
if state.GetState() == milvuspb.RestoreSnapshotState_RestoreSnapshotFailed {
    fmt.Printf("Failure Reason: %s\n", state.GetReason())
}
fmt.Printf("Time Cost: %dms\n", state.GetTimeCost())
```

```javascript
// node.js
```

```bash
# restful
```
