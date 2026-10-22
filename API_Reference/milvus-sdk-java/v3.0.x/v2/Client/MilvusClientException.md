# MilvusClientException

A **MilvusClientException** instance represents a runtime exception thrown by the Milvus Java SDK v2 when a client- or server-side error occurs. The exception carries an **ErrorCode** describing the failure category and, optionally, the raw error codes returned by the Milvus server.

```java
class io.milvus.v2.exception.MilvusClientException extends RuntimeException
```

## Constructors

Constructs a **MilvusClientException** instance.

```java
MilvusClientException(ErrorCode errorCode, String message)
MilvusClientException(ErrorCode errorCode, Throwable e)
MilvusClientException(ErrorCode errorCode, String message, int serverErrCode, int legacyServerCode)
```

**PARAMETERS:**

- **errorCode** (*ErrorCode*) -

    The error code of this exception. Possible values are `SUCCESS`, `COLLECTION_NOT_FOUND`, `SERVER_ERROR`, `INVALID_PARAMS`, `CLIENT_ERROR`, `RPC_ERROR`, and `TIMEOUT`.

- **message** (*String*) -

    The detail message of this exception.

- **e** (*Throwable*) -

    The underlying cause of this exception.

- **serverErrCode** (*int*) -

    The error code returned by the Milvus server.

- **legacyServerCode** (*int*) -

    The legacy error code returned by older Milvus server versions.

## Methods

- **getErrorCode()** (*ErrorCode*) -

    Returns the error code of this exception.

- **getServerErrCode()** (*int*) -

    Returns the error code returned by the Milvus server, or `0` if not set.

- **getLegacyServerCode()** (*int*) -

    Returns the legacy error code returned by older Milvus server versions, or `0` if not set.

- **toString()** (*String*) -

    Returns a string representation of this exception, which includes the error code name and the server error code when one is set.

## ErrorCode

The **ErrorCode** enumeration classifies the failure category of a **MilvusClientException**.

| Constant | Value |
|---|---|
| **SUCCESS** | 0 |
| **COLLECTION_NOT_FOUND** | 1 |
| **SERVER_ERROR** | 2 |
| **INVALID_PARAMS** | 3 |
| **CLIENT_ERROR** | 4 |
| **RPC_ERROR** | 5 |
| **TIMEOUT** | 6 |
