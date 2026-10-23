# RestoreSnapshotJobInfo

Information of a snapshot restore job.

```typescript
export interface RestoreSnapshotJobInfo {
  job_id: string;
  snapshot_name: string;
  db_name: string;
  collection_name: string;
  state: RestoreSnapshotState | keyof typeof RestoreSnapshotState;
  progress: number;
  reason: string;
  start_time: string;
  time_cost: string;
}
```

**FIELDS:**

- **job_id** (*string*) -

    The restore job identifier.

- **snapshot_name** (*string*) -

    The name of the snapshot being restored.

- **db_name** (*string*) -

    The name of the database the snapshot belongs to.

- **collection_name** (*string*) -

    The name of the collection being restored.

- **state** (*RestoreSnapshotState | keyof typeof RestoreSnapshotState*) -

    The restore job state.

- **progress** (*number*) -

    The restore progress percentage.

- **reason** (*string*) -

    The failure reason when the restore failed.

- **start_time** (*string*) -

    The start time of the restore job.

- **time_cost** (*string*) -

    The elapsed time of the restore job.
