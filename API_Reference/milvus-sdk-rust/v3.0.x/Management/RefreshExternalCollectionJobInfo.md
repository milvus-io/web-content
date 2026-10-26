# RefreshExternalCollectionJobInfo

Information of an external collection refresh job, as returned by `listRefreshExternalCollectionJobs()` and `getRefreshExternalCollectionProgress()`.

**METHODS:**

- `get_job_id()` (*i64*) -

    The refresh job identifier.

- `get_collection_name()` (*&str*) -

    The name of the collection being refreshed.

- `get_state()` (*RefreshExternalCollectionStateCode*) -

    The current state of the refresh job. See [RefreshExternalCollectionStateCode](RefreshExternalCollectionStateCode.md).

- `get_progress()` (*i32*) -

    The refresh progress in percent (0 to 100).

- `get_reason()` (*&str*) -

    The failure reason of the refresh job, empty when the job has not failed.

- `get_external_source()` (*&str*) -

    The external data source, e.g. an S3 path.

- `get_external_spec()` (*&str*) -

    The detailed external specification reported by the server.

- `get_start_time()` (*u64*) -

    The start timestamp of the refresh job.

- `get_end_time()` (*u64*) -

    The end timestamp of the refresh job.
