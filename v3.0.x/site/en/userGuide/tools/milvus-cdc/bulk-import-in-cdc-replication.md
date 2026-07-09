---
id: bulk-import-in-cdc-replication.md
summary: Learn how to run a bulk import against Milvus clusters that use CDC replication.
title: Bulk Import in CDC Replication
---

# Bulk Import in CDC Replication

This guide explains how to run a bulk import against Milvus clusters that are part of a CDC replication topology. In a replicating cluster, bulk import must use two-phase commit (2PC) so that the import is committed as a single, ordered point across the primary and standby clusters.

In this guide, the primary cluster is the source Milvus cluster, and the standby cluster is the target Milvus cluster.

Before you begin, make sure CDC replication is already configured between your clusters. For details, refer to [Set Up CDC Replication](set_up_cdc_replication.md).

## Why 2PC is required

A normal bulk import auto-commits when the import job finishes, which makes the imported data visible immediately. In a CDC replication topology, this behavior is not allowed because the primary and standby clusters must make the imported data visible at the same logical point.

Instead, run the import in two-phase commit mode by setting `auto_commit=false`:

1. **Import phase**: Milvus loads the data on the primary cluster and replicates the import to the standby cluster, but the imported data remains invisible. The import job stops at the `Uncommitted` state and waits.

1. **Commit phase**: You explicitly commit the import job on the primary cluster. The commit is replicated to the standby cluster as a single ordered fence, so both clusters make the imported data visible at the same logical point.

## Step 1: Enable import in a replicating cluster

Import in a replicating cluster is disabled by default. Enable it by setting `dataCoord.import.enableInReplicatingCluster` to `true` on both the primary and standby clusters.

If you deploy Milvus with Milvus Operator, add the following setting to `spec.config` of each `Milvus` resource:

```yaml
spec:
  config:
    dataCoord:
      import:
        enableInReplicatingCluster: true
```

If you configure Milvus directly through `milvus.yaml`, add the following setting:

```yaml
dataCoord:
  import:
    enableInReplicatingCluster: true
```

This setting is refreshable, so it can take effect without a full restart.

When this setting is enabled, a replicating cluster accepts only imports with `auto_commit=false`. The following table lists common rejected requests:

| Situation | Error message |
| --- | --- |
| `dataCoord.import.enableInReplicatingCluster` is not enabled | `import in replicating cluster is not supported yet` |
| `auto_commit=true` is submitted | `auto_commit=true import in replicating cluster is not supported` |

## Step 2: Run a 2PC import

Run all import calls against the primary cluster. The imported data and the commit decision are replicated to the standby cluster automatically, so do not submit or commit the import on the standby cluster yourself.

Each cluster reads the import files from its own object storage. Make sure the files to import exist in both the primary and standby object storage. You can upload the files to both clusters, or use object storage that both clusters can read. If the files are missing on the standby cluster, the replicated import fails there with an object-not-found error.

The following example uses the REST-based import helpers from `pymilvus.bulk_writer`. The `url` values are the same Milvus addresses you use for other API calls.

```python
import time

from pymilvus.bulk_writer import bulk_import, commit_import, get_import_progress

primary_url = "http://127.0.0.1:19530"
standby_url = "http://127.0.0.1:19531"

collection_name = "demo_collection"

# Object-storage paths of the files to import. Prepare these files the same
# way as a normal bulk import, for example by using BulkWriter.
files = [
    ["import-data/part-1.parquet"],
]


def wait_for_state(url, job_id, target_state, timeout=600):
    deadline = time.time() + timeout
    while time.time() < deadline:
        resp = get_import_progress(url=url, job_id=job_id)
        data = resp.json().get("data", {})
        state = data.get("state")
        print(f"[{url}] job {job_id} state={state}, progress={data.get('progress')}")

        if state == target_state:
            return
        if state == "Failed":
            raise RuntimeError(
                f"import job {job_id} failed on {url}: {data.get('reason')}"
            )

        time.sleep(3)

    raise TimeoutError(f"job {job_id} did not reach {target_state} on {url}")


# Start a 2PC import on the primary cluster. In a replicating cluster,
# auto_commit=false is required, and the job stops at the Uncommitted state.
resp = bulk_import(
    url=primary_url,
    collection_name=collection_name,
    files=files,
    options={"auto_commit": "false"},
)
job_id = resp.json()["data"]["jobId"]
print(f"started 2PC import job: {job_id}")

# Wait until both clusters report Uncommitted. The same job ID is used on the
# primary and standby clusters because the import is replicated through CDC.
wait_for_state(primary_url, job_id, "Uncommitted")
wait_for_state(standby_url, job_id, "Uncommitted")

# Commit once on the primary cluster. Do not commit on the standby cluster.
commit_import(url=primary_url, job_id=job_id)
print(f"committed import job: {job_id}")

# Wait until the import is completed and visible on both clusters.
wait_for_state(primary_url, job_id, "Completed")
wait_for_state(standby_url, job_id, "Completed")
print("import committed and visible on both clusters")
```

### Why wait for `Uncommitted` on both clusters

Committing before the standby cluster has finished importing does not corrupt data, but the standby cluster is still catching up when the commit is applied. Waiting until both the primary and standby clusters report `Uncommitted` confirms that the imported data has fully replicated and both clusters are ready to make it visible together.

## Step 3: Verify the data

After the job reaches `Completed`, the imported entities are visible on both clusters. Load and query the collection on the primary cluster, then run the same query on the standby cluster without manually loading the collection there and confirm that the imported entities are present on both clusters.

The standby cluster is read-only while it remains a standby. Do not submit imports, commits, or other DDL or DCL operations directly to the standby cluster. Perform these operations on the primary cluster and let CDC replication apply them to the standby cluster.

## FAQ

### Which cluster should I run the import and commit on?

Run the import and commit on the primary cluster. The standby cluster receives both the imported data and the commit through CDC replication.

### Do I need to commit on the standby cluster?

No. Committing on the primary cluster replicates the commit to the standby cluster as a single ordered fence.

### Why does my import fail with `import in replicating cluster is not supported yet`?

`dataCoord.import.enableInReplicatingCluster` is not enabled on that cluster. Set it to `true` on both the primary and standby clusters.

### Why does my import fail with `auto_commit=true import in replicating cluster is not supported`?

In a replicating cluster, only 2PC imports with `auto_commit=false` are accepted. Set `options={"auto_commit": "false"}` on the import request.
