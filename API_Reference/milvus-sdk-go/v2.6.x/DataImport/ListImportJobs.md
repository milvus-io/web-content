# ListImportJobs()

This operation lists all bulk-import jobs of a specific cluster.

```go
func ListImportJobs(ctx context.Context, option *ListImportJobsOption) (*ListImportJobsResponse, error)
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
     <td><p><code>ListImportJobsOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## ListImportJobsOption

This is a struct type. You can use `NewListImportJobsOption` to get its concrete implementation.

### NewListImportJobsOption

The signature of `NewListImportJobsOption()` is as follows:

```go
func NewListImportJobsOption(uri string, collectionName string) *ListImportJobsOption
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
     <td><p><code>collectionName</code></p></td>
     <td><p>The name of a collection in the target cluster of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

You can chain the following methods to append more parameters to the `ListImportJobsOption` struct.

- [WithCurrentPage](ListImportJobs.md#WithCurrentPage)

- [WithPageSize](ListImportJobs.md#WithPageSize)

### WithCurrentPage

This method sets the current page number of the import job list. The signature of the method is as follows:

```go
func (opt *ListImportJobsOption) WithCurrentPage(currentPage int) *ListImportJobsOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>currentPage</code></p></td>
     <td><p>The current page of the import job list. You can combine this parameter and <code>pageSize</code> to offset certain import jobs.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### WithPageSize

This method sets the number of import jobs to return each time. The signature of the method is as follows:

```go
func (opt *ListImportJobsOption) WithPageSize(pageSize int) *ListImportJobsOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>pageSize</code></p></td>
     <td><p>The number of import jobs to return each time.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## ListImportJobsResponse

The `ListImportJobsResponse` struct type is as follows:

```go
type ListImportJobsResponse struct {
    Status  int    `json:"status"`
    Message string `json:"message"`     
    Data *ListImportJobData `json:"data"`
}
```

## ListImportJobData

The `ListImportJobData` struct type is as follows:

```go
type ListImportJobsOption struct {
    URL            string `json:"-"`
    CollectionName string `json:"collectionName"`
    ClusterID      string `json:"clusterId,omitempty"`
    APIKey         string `json:"-"`
    PageSize       int    `json:"pageSize,omitempty"`
    CurrentPage    int    `json:"currentPage,omitempty"`
}
```

## Return

`*ListImportJobsResponse`

## Example

## Example

```go

```

