# GetImportProgress()

This operation gets the progress of the specified bulk-import job.

```go
func GetImportProgress(ctx context.Context, option *GetImportProgressOption) (*GetImportProgressResponse, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>GetImportProgressOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## GetImportProgressOption

This is a struct type. You can use `NewGetImportProgressOption()` to get its concrete implementation.

## NewGetImportProgressOption

The signature of `NewGetImportProgressOption()` is as follows:

```go
func NewGetImportProgressOption(uri string, jobID string) *GetImportProgressOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>uri</code></p></td>
     <td><p>The URI of your Milvus instance.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>jobID</code></p></td>
     <td><p>The ID of the target data import job.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## GetImportProgressResponse

The `GetImportProgressResponse` struct type is as follows:

```go
type GetImportProgressResponse struct {
    Status  int    `json:"status"`
    Message string `json:"message"`     
    Data *ImportProgressData `json:"data"`
}
```

The struct type that appears in the `GetImportProgressResponse` struct type is as follows:

- [ImportProgressData](GetImportProgress.md#ImportProgressData)

## ImportProgressData

The `ImportProgressData` struct type is as follows:

```go
type ImportProgressData struct {
    CollectionName string                  `json:"collectionName"`
    JobID          string                  `json:"jobId"`
    CompleteTime   string                  `json:"completeTime"`
    State          string                  `json:"state"`
    Progress       int64                   `json:"progress"`
    ImportedRows   int64                   `json:"importedRows"`
    TotalRows      int64                   `json:"totalRows"`
    Reason         string                  `json:"reason"`
    FileSize       int64                   `json:"fileSize"`
    Details        []*ImportProgressDetail `json:"details"`
}
```

The struct type that appears in the `ImportProgressData` struct type is as follows:

- [ImportProgressDetail](GetImportProgress.md#ImportProgressDetail)

## ImportProgressDetail

The `ImportProgressDetail` struct type is as follows:

```go
type ImportProgressDetail struct {
    FileName     string `json:"fileName"`
    FileSize     int64  `json:"fileSize"`
    Progress     int64  `json:"progress"`
    CompleteTime string `json:"completeTime"`
    State        string `json:"state"`
    ImportedRows int64  `json:"importedRows"`
    TotalRows    int64  `json:"totalRows"`
}
```

## Return

`*GetImportProgressResponse`

## Example

```go

```

