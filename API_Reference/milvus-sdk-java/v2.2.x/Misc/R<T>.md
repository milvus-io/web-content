# R<T>

A template class to hold the status code, error message, and the response returned by each client interface.

```Java
package io.milvus.param;
public class R<T>
```

## R.Status

`R.Status` is an enumeration of the status codes. Each `R<T>` object holds an integer value that can be mapped to the `R.Status`.

<div class="alert note">
Not all status codes are used, some of them are reserved.
</div>

| **Status**              | **Code** | **Description**                                              |
| ----------------------- | -------- | ------------------------------------------------------------ |
| `IllegalResponse`       | -6       | The response returned by the server is incorrect. Parsing the response on the client side fails. |
| `ParamError`            | -5       | The parameter is illegal on the client side.                 |
| `VersionMismatch`       | -4       | **This error is reserved and not used for now.*              |
| `Unknown`               | -3       | General error for an unknown reason.                         |
| `ClientNotConnected`    | -2       | The connection is not ready.                                 |
| `RpcError`              | -1       | **This error is reserved and not used for now.*              |
| `Success`               | 0        | Operation succeeded.                                         |
| `UnexpectedError`       | 1        | Error caused by unexpected reason.                           |
| `ConnectFailed`         | 2        | **This error is reserved and not used for now.*              |
| `PermissionDenied`      | 3        | **This error is reserved and not used for now.*              |
| `CollectionNotExists`   | 4        | **This error is reserved and not used for now.*              |
| `IllegalArgument`       | 5        | The parameter is illegal on the server side.                 |
| `IllegalDimension`      | 7        | **This error is reserved and not used for now.*              |
| `IllegalIndexType`      | 8        | **This error is reserved and not used for now.*              |
| `IllegalCollectionName` | 9        | **This error is reserved and not used for now.*              |
| `IllegalTOPK`           | 10       | **This error is reserved and not used for now.*              |
| `IllegalRowRecord`      | 11       | **This error is reserved and not used for now.*              |
| `IllegalVectorID`       | 12       | **This error is reserved and not used for now.*              |
| `IllegalSearchResult`   | 13       | **This error is reserved and not used for now.*              |
| `FileNotFound`          | 14       | **This error is reserved and not used for now.*              |
| `MetaFailed`            | 15       | Getting metadata fails on the server side.                   |
| `CacheFailed`           | 16       | **This error is reserved and not used for now.*              |
| `CannotCreateFolder`    | 17       | **This error is reserved and not used for now.*              |
| `CannotCreateFile`      | 18       | **This error is reserved and not used for now.*              |
| `CannotDeleteFolder`    | 19       | **This error is reserved and not used for now.*              |
| `CannotDeleteFile`      | 20       | **This error is reserved and not used for now.*              |
| `BuildIndexError`       | 21       | **This error is reserved and not used for now.*              |
| `IllegalNLIST`          | 22       | **This error is reserved and not used for now.*              |
| `IllegalMetricType`     | 23       | **This error is reserved and not used for now.*              |
| `OutOfMemory`           | 24       | **This error is reserved and not used for now.*              |
| `IndexNotExist`         | 25       | **This error is reserved and not used for now.*              |
| `EmptyCollection`       | 26       | **This error is reserved and not used for now.*              |


## Methods

| Method         | Description                                      | Return             |
| -------------- | ------------------------------------------------ | ------------------ |
| `getMessage()` | Gets the error message.                          | String             |
| `getStatus()`  | Gets the status code.                            | Integer            |
| `getData()`    | Gets the response object returned by the server. | RPC response class |

## Example

```Java
import io.milvus.param.*;

R<RpcStatus> response = client.dropCollection(DropCollectionParam.newBuilder()
        .withCollectionName(collectionName)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

