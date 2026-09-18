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
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

// Recommended: Flush data before creating snapshot to ensure all data is included
milvus::FlushRequest flush_request;
flush_request.WithCollectionNames({"my_collection"});
status = client->Flush(flush_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

// Create snapshot for entire collection
milvus::CreateSnapshotRequest create_request;
create_request.WithCollectionName("my_collection")
    .WithSnapshotName("backup_20240101")
    .WithDescription("Daily backup for January 1st, 2024");
status = client->CreateSnapshot(create_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
use milvus::v2 as sdk;
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

// Recommended: Flush data before creating snapshot to ensure all data is included
client
    .flush(
        sdk::request::utility::FlushRequest::builder()
            .collection_names(["my_collection"])
            .build()?,
    )
    .await?;

// Create snapshot for entire collection
client
    .create_snapshot(
        sdk::request::snapshot::CreateSnapshotRequest::builder()
            .collection_name("my_collection")
            .snapshot_name("backup_20240101")
            .description("Daily backup for January 1st, 2024")
            .build()?,
    )
    .await?;
```

```javascript
// node.js
```

```bash
# restful
```

## List snapshots

You can list the names of existing snapshots.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
// List all snapshots for a collection
milvus::ListSnapshotsRequest list_request;
list_request.WithCollectionName("my_collection");
milvus::ListSnapshotsResponse list_response;
auto status = client->ListSnapshots(list_request, list_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& name : list_response.Snapshots()) {
    std::cout << name << std::endl;
}
```

```rust
// List all snapshots for a collection
let snapshots = client
    .list_snapshots(
        sdk::request::snapshot::ListSnapshotsRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
for name in snapshots.snapshots() {
    println!("{name}");
}
```

```javascript
// node.js
```

```bash
# bash
```

## Describe snapshot

You can get the detailed information about a specific snapshot.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
milvus::DescribeSnapshotRequest describe_request;
describe_request.WithCollectionName("my_collection").WithSnapshotName("backup_20240101");
milvus::DescribeSnapshotResponse describe_response;
auto status = client->DescribeSnapshot(describe_request, describe_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

std::cout << describe_response.Name() << std::endl;
std::cout << describe_response.CollectionName() << std::endl;
std::cout << describe_response.CreateTs() << std::endl;
std::cout << describe_response.Description() << std::endl;
```

```rust
let snapshot_info = client
    .describe_snapshot(
        sdk::request::snapshot::DescribeSnapshotRequest::builder()
            .collection_name("my_collection")
            .snapshot_name("backup_20240101")
            .build()?,
    )
    .await?;
println!("Snapshot ID: {}", snapshot_info.create_ts());
println!("Collection: {}", snapshot_info.collection_name());
println!("Created: {}", snapshot_info.create_ts());
println!("Description: {}", snapshot_info.description());
```
```javascript
// node.js
```

```bash
# restful
```

## Pin/unpin snapshot data

During restoration, you can pin a snapshot to temporarily protect its underlying data from garbage collection, and unpin it to release the data.

You can also set a time-to-live (TTL) duration for the pin operation so that the pinned data will be released when the duration expires.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
// java
```

```go
pinID, err := client.PinSnapshotData(
    context.Background(),
    milvusclient.NewPinSnapshotDataOption("backup_20240101", "my_collection").WithTTL(3600),
)
if err != nil {
    log.Fatal(err)
}

defer func() {
    _ = client.UnpinSnapshotData(
        context.Background(),
        milvusclient.NewUnpinSnapshotDataOption(pinID),
    )
}()

// Do work with pinned snapshot data.
```

```cpp
milvus::PinSnapshotDataRequest pin_request;
pin_request.WithSnapshotName("backup_20240101")
    .WithCollectionName("my_collection")
    .WithTtlSeconds(3600);
milvus::PinSnapshotDataResponse pin_response;
auto status = client->PinSnapshotData(pin_request, pin_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

milvus::UnpinSnapshotDataRequest unpin_request;
unpin_request.WithPinID(pin_response.PinID());
status = client->UnpinSnapshotData(unpin_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
let pin = client
    .pin_snapshot_data(
        sdk::request::snapshot::PinSnapshotDataRequest::builder()
            .snapshot_name("backup_20240101")
            .collection_name("my_collection")
            .ttl_seconds(3600)
            .build()?,
    )
    .await?;

client
    .unpin_snapshot_data(
        sdk::request::snapshot::UnpinSnapshotDataRequest::builder()
            .pin_id(pin.pin_id())
            .build()?,
    )
    .await?;
```

```javascript
// node.js
```

```bash
# restful
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
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
    "restored_collection",
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
if err != nil {
    log.Fatal(err)
}
```

```cpp
milvus::RestoreSnapshotRequest restore_request;
restore_request.WithSnapshotName("backup_20240101")
    .WithSourceCollectionName("my_collection")
    .WithTargetCollectionName("restored_collection");
milvus::RestoreSnapshotResponse restore_response;
auto status = client->RestoreSnapshot(restore_request, restore_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << restore_response.JobID() << std::endl;
```

```rust
// Restore snapshot to new collection
let restore = client
    .restore_snapshot(
        sdk::request::snapshot::RestoreSnapshotRequest::builder()
            .snapshot_name("backup_20240101")
            .source_collection_name("my_collection")
            .target_collection_name("restored_collection")
            .build()?,
    )
    .await?;
println!("job_id={}", restore.job_id());
```

```javascript
// node.js
```

```bash
# restful
```

For details on monitoring the progress of a restoration job, refer to [Get restoration state](#Get-restoration-state).

## Drop snapshot

You can drop a snapshot if it is no longer needed. You are advised to remove old snapshots regularly to save storage.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
milvus::DropSnapshotRequest drop_request;
drop_request.WithCollectionName("my_collection").WithSnapshotName("backup_20240101");
auto status = client->DropSnapshot(drop_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
client
    .drop_snapshot(
        sdk::request::snapshot::DropSnapshotRequest::builder()
            .collection_name("my_collection")
            .snapshot_name("backup_20240101")
            .build()?,
    )
    .await?;
```

```javascript
// node.js
```

```bash
# restful
```

## List restoration jobs

You can use this API to get a list of snapshots already created for the target collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
// List all restore jobs
milvus::ListRestoreSnapshotJobsRequest list_jobs_request;
milvus::ListRestoreSnapshotJobsResponse list_jobs_response;
auto status = client->ListRestoreSnapshotJobs(list_jobs_request, list_jobs_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

for (const auto& job : list_jobs_response.Jobs()) {
    std::cout << "Job " << job.JobID() << ": " << job.SnapshotName()
              << " -> Collection " << job.CollectionName() << std::endl;
    std::cout << "  State: " << static_cast<int>(job.State())
              << ", Progress: " << job.Progress() << "%" << std::endl;
}

// List restore jobs for a specific collection
milvus::ListRestoreSnapshotJobsRequest list_jobs_request2;
list_jobs_request2.WithCollectionName("my_collection");
status = client->ListRestoreSnapshotJobs(list_jobs_request2, list_jobs_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
// List all restore jobs
let jobs = client
    .list_restore_snapshot_jobs(
        sdk::request::snapshot::ListRestoreSnapshotJobsRequest::builder().build()?,
    )
    .await?;
for job in jobs.jobs() {
    println!(
        "Job {}: {} -> Collection {}",
        job.get_job_id(),
        job.get_snapshot_name(),
        job.get_collection_name()
    );
    println!(
        "  State: {:?}, Progress: {}%",
        job.get_state(),
        job.get_progress()
    );
}

// List restore jobs for a specific collection
let jobs = client
    .list_restore_snapshot_jobs(
        sdk::request::snapshot::ListRestoreSnapshotJobsRequest::builder()
            .collection_name("my_collection")
            .build()?,
    )
    .await?;
```

```javascript
// node.js
```

```bash
# restful
```

## Get restoration state

Once you have a restoration job ID, you can use it to retrieve restoration progress.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```cpp
milvus::GetRestoreSnapshotStateRequest state_request;
state_request.WithJobID(12345);
milvus::GetRestoreSnapshotStateResponse state_response;
auto status = client->GetRestoreSnapshotState(state_request, state_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

const auto& job_info = state_response.JobInfo();
std::cout << "Job ID: " << job_info.JobID() << std::endl;
std::cout << "Snapshot Name: " << job_info.SnapshotName() << std::endl;
std::cout << "Collection: " << job_info.CollectionName() << std::endl;
std::cout << "State: " << static_cast<int>(job_info.State()) << std::endl;
std::cout << "Progress: " << job_info.Progress() << "%" << std::endl;
```

```rust
let state = client
    .get_restore_snapshot_state(
        sdk::request::snapshot::GetRestoreSnapshotStateRequest::builder()
            .job_id(12345)
            .build()?,
    )
    .await?;
let job_info = state.job_info();
println!("Job ID: {}", job_info.get_job_id());
println!("Snapshot Name: {}", job_info.get_snapshot_name());
println!("State: {:?}", job_info.get_state());
println!("Progress: {}%", job_info.get_progress());
```

```javascript
// node.js
```

```bash
# restful
```
