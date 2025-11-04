# BulkImport()

This operation imports the prepared data files to Milvus. To learn how to prepare your data files, read [Prepare Source Data](https://milvus.io/docs/prepare-source-data.md).

```go
func BulkImport(ctx context.Context, option *BulkImportOption) (*BulkImportResponse, error)
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
     <td><p><a href="./v2-DataImport-BulkImport#bulkimportoption"><code>BulkImportOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## BulkImportOption

This is a struct type. You can use `NewBulkImportOption()` to get its concrete implementation.

### NewBulkImportOption

The signature of `NewBulkImportOption()` is as follows:

```go
func NewBulkImportOption(uri string, collectionName string, files [][]string, ) *BulkImportOption
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
   <tr>
     <td><p><code>files</code></p></td>
     <td><p>The list of string lists, each string list contains a singular row-based file path or multiple column-based file paths.</p></td>
     <td><p><code>&#91;&#93;&#91;&#93;string</code></p></td>
   </tr>
</table>

You can chain the following methods to append more parameters to the `BulkImportOption` struct.

- [WithPartition](BulkImport.md#WithPartition)

- [WithOption](BulkImport.md#WithOption)

### WithPartition

This method specifies the name of the target partition to the `BulkImportOption` struct. The signature of the method is as follows:

```go
func (opt *BulkImportOption) WithPartition(partitionName string) *BulkImportOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>The name of the target partition of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithOption

This method appends extra options in key-value pairs to the `BulkImportOption` struct. The signature of the method is as follows:

```go
func (opt *BulkImportOption) WithOption(key, value string) *BulkImportOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>An extra <code>BulkImportOption</code> key</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>value</code></p></td>
     <td><p>The value of the above extra key.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## BulkImportResponse

The `BulkImportResponse` struct type is as follows:

```go
type BulkImportResponse struct {
    Status  int    `json:"status"`
    Message string `json:"message"`      
    Data struct {
        JobID string `json:"jobId"`
    } `json:"data"`
}
```

## Return

`*[BulkImportResponse`](BulkImport.md#BulkImportResponse)

## Example

```go

```

