# ListRestoreSnapshotJobs()

This operation lists all restore snapshot jobs. Optionally filter by collection name or database name.

```go
func (c *Client) ListRestoreSnapshotJobs(ctx context.Context, opt ListRestoreSnapshotJobsOption, callOptions ...grpc.CallOption) ([]*milvuspb.RestoreSnapshotInfo, error)
```

## Request Syntax

```go
option := client.NewListRestoreSnapshotJobsOption().
    WithCollectionName(collectionName string).
    WithDbName(dbName string)

result, err := client.ListRestoreSnapshotJobs(option)
```

**BUILDER METHODS:**

- `WithCollectionName(collectionName string)`

    This filters restore jobs by target collection name. If not set, all restore jobs are listed.

- `WithDbName(dbName string)`

    This specifies the database name. If not set, the default database is used.

**RETURN TYPE:**

*[]&ast;milvuspb.RestoreSnapshotInfo*, *error*

**RETURNS:**

A list of RestoreSnapshotInfo objects, each recording the details of a restore snapshot job.

```go
type RestoreSnapshotInfo struct {
    JobId          int64
    SnapshotName   string
    DbName         string
    CollectionName string
    State          RestoreSnapshotState
    Progress       int64
    Reason         string
    StartTime      int64
    TimeCost       int64
}
```

**PARAMETERS:**

- **JobId** (*int64*) -

    The restore job ID.

- **SnapshotName** (*string*) -

    The snapshot name being restored.

- **DbName** (*string*) -

    The target database name.

- **CollectionName** (*string*) -

    The target collection name.

- **State** (*RestoreSnapshotState*) -

    Current state. Possible values: *RestoreSnapshotNone*, *RestoreSnapshotPending*, *RestoreSnapshotExecuting*, *RestoreSnapshotCompleted*, *RestoreSnapshotFailed*.

- **Progress** (*int64*) -

    Progress percentage (0-100).

- **Reason** (*string*) -

    Error reason if the job failed.

- **StartTime** (*int64*) -

    Start timestamp in milliseconds.

- **TimeCost** (*int64*) -

    Time cost in milliseconds.

**EXCEPTIONS:**

- **error**

    Check err != nil for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal(err)
}

defer cli.Close(ctx)

option := milvusclient.NewListRestoreSnapshotJobsOption()

jobs, err := cli.ListRestoreSnapshotJobs(ctx, option)
if err != nil {
	// handle error
}

for _, job := range jobs {
	fmt.Printf("Job %d: %s -> %s (%s)\n", job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName(), job.GetState())
}
```
