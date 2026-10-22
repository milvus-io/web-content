# RefreshExternalCollectionJobInfo

This class holds the information of an external collection refresh job, as returned by `ListRefreshExternalCollectionJobs()` and `GetRefreshExternalCollectionProgress()`. Each field has a corresponding `Set*()` setter.

**METHODS:**

- `int64_t JobID() const`

    The refresh job identifier.

- `const std::string& CollectionName() const`

    The name of the collection being refreshed.

- `RefreshExternalCollectionStateCode State() const`

    The current state of the refresh job. See [RefreshExternalCollectionStateCode](RefreshExternalCollectionStateCode.md).

- `int32_t Progress() const`

    The refresh progress in percent (0 to 100).

- `const std::string& Reason() const`

    The failure reason of the refresh job, empty when the job has not failed.

- `const std::string& ExternalSource() const`

    The external data source, e.g. an S3 path.

- `uint64_t StartTime() const`

    The start timestamp of the refresh job.

- `uint64_t EndTime() const`

    The end timestamp of the refresh job.

- `const nlohmann::json& ExternalSpec() const`

    The external specification of the collection.
