# RestoreSnapshotJobInfo

Information of a snapshot restore job, as returned by `listRestoreSnapshotJobs()` and `getRestoreSnapshotState()`.

**METHODS:**

- `get_job_id()` (*i64*) - The restore job identifier.

- `get_snapshot_name()` (*&str*) - The name of the snapshot being restored.

- `get_database_name()` (*&str*) - The name of the database the snapshot belongs to.

- `get_collection_name()` (*&str*) - The name of the collection being restored.

- `get_state()` (*RestoreSnapshotStateCode*) - The current state of the restore job. See [RestoreSnapshotStateCode](RestoreSnapshotStateCode.md).

- `get_progress()` (*i32*) - The restore progress in percent (0 to 100).

- `get_reason()` (*&str*) - The failure reason of the restore job, empty when the job has not failed.

- `get_start_time()` (*u64*) - The start timestamp of the restore job.

- `get_time_cost()` (*u64*) - The elapsed time of the restore job.
