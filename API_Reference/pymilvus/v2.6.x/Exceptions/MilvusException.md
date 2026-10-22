# MilvusException

A **MilvusException** instance represents an error raised by an operation, such as a failed request or a server-side failure. Each exception carries a numeric error code and a message, so you can handle failures programmatically.

```python
class pymilvus.MilvusException
```

## Constructor

Constructs a **MilvusException** instance.

```python
MilvusException(
    code: int = ErrorCode.UNEXPECTED_ERROR,
    message: str = "",
    compatible_code: int = common_pb2.UnexpectedError,
)
```

**PARAMETERS:**

- **code** (*int*) -

    The numeric error code of this exception.

    The value defaults to **ErrorCode.UNEXPECTED_ERROR**.

- **message** (*str*) -

    A description of the error.

    The value defaults to an empty string.

- **compatible_code** (*int*) -

    A legacy-compatible error code.

    This parameter is kept for compatibility with versions before v2.4.0.

## Properties

- **code** (*int*) -

    The numeric error code of this exception.

- **message** (*str*) -

    The description of the error.

- **compatible_code** (*int*) -

    A legacy-compatible error code.

    This property is kept for compatibility with versions before v2.4.0.

## Error Codes

A **MilvusException** uses the following client-side error codes. When the error originates from the server, the **code** property carries the error code defined in the Milvus server's common proto.

| Constant | Value |
|---|---|
| **SUCCESS** | 0 |
| **UNEXPECTED_ERROR** | 1 |
| **RATE_LIMIT** | 8 |
| **FORCE_DENY** | 9 |
| **COLLECTION_NOT_FOUND** | 100 |
| **INDEX_NOT_FOUND** | 700 |

## Subclasses

The following exception classes derive from **MilvusException**:

- **ParamError** -

    Raised when parameters are incorrect.

- **ConnectError** -

    Raised when the client fails to connect to the server.

- **MilvusUnavailableException** -

    Raised when the server is unavailable.

- **CollectionNotExistException** -

    Raised when the collection does not exist.

- **DescribeCollectionException** -

    Raised when the client fails to describe a collection.

- **PartitionAlreadyExistException** -

    Raised when creating an existing partition.

- **IndexNotExistException** -

    Raised when the index does not exist.

- **AmbiguousIndexName** -

    Raised when multiple indexes exist and an index name must be specified.

- **CannotInferSchemaException** -

    Raised when the client cannot convert a dataframe to a schema.

- **SchemaNotReadyException** -

    Raised when the schema is invalid.

- **DataTypeNotMatchException** -

    Raised when data types do not match.

- **DataTypeNotSupportException** -

    Raised when a data type is not supported.

- **DataNotMatchException** -

    Raised when the inserted data does not match the schema.

- **SchemaMismatchRetryableException** -

    Raised when the server returns a schema-mismatch error, indicating that the cached schema is stale and needs to be refreshed.

- **ConnectionNotExistException** -

    Raised when the connection does not exist.

- **ConnectionConfigException** -

    Raised when the connection configuration is invalid.

- **PrimaryKeyException** -

    Raised when a primary key is invalid.

- **PartitionKeyException** -

    Raised when a partition key is invalid.

- **ClusteringKeyException** -

    Raised when a clustering key is invalid.

- **FieldsTypeException** -

    Raised when the fields are invalid.

- **FunctionsTypeException** -

    Raised when the functions are invalid.

- **FieldTypeException** -

    Raised when a field is invalid.

- **AutoIDException** -

    Raised when the autoID setting is invalid.

- **InvalidConsistencyLevel** -

    Raised when the consistency level is invalid.

- **ServerVersionIncompatibleException** -

    Raised when the server version is incompatible.
