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

| **Status**              | **Code** | **Description** |
| ----------------------- | -------- | --------------- |
| `IllegalResponse`       | -6       |                 |
| `ParamError`            | -5       |                 |
| `VersionMismatch`       | -4       |                 |
| `Unknown`               | -3       |                 |
| `ClientNotConnected`    | -2       |                 |
| `RpcError`              | -1       |                 |
| `Success`               | 0        |                 |
| `UnexpectedError`       | 1        |                 |
| `ConnectFailed`         | 2        |                 |
| `PermissionDenied`      | 3        |                 |
| `CollectionNotExists`   | 4        |                 |
| `IllegalArgument`       | 5        |                 |
| `IllegalDimension`      | 7        |                 |
| `IllegalIndexType`      | 8        |                 |
| `IllegalCollectionName` | 9        |                 |
| `IllegalTOPK`           | 10       |                 |
| `IllegalRowRecord`      | 11       |                 |
| `IllegalVectorID`       | 12       |                 |
| `IllegalSearchResult`   | 13       |                 |
| `FileNotFound`          | 14       |                 |
| `MetaFailed`            | 15       |                 |
| `CacheFailed`           | 16       |                 |
| `CannotCreateFolder`    | 17       |                 |
| `CannotCreateFile`      | 18       |                 |
| `CannotDeleteFolder`    | 19       |                 |
| `CannotDeleteFile`      | 20       |                 |
| `BuildIndexError`       | 21       |                 |
| `IllegalNLIST`          | 22       |                 |
| `IllegalMetricType`     | 23       |                 |
| `OutOfMemory`           | 24       |                 |
| `IndexNotExist`         | 25       |                 |
| `EmptyCollection`       | 26       |                 |

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

