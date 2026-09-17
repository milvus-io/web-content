# FunctionParamValue

A `FunctionParamValue` instance is a typed parameter value used in [FunctionChain](FunctionChain.md) expressions and operations.

```java
io.milvus.v2.service.vector.request.FunctionParamValue
```

## Static Methods

- `of(boolean value)`

    Creates a parameter value from a boolean.

- `of(long value)`

    Creates a parameter value from a long.

- `of(double value)`

    Creates a parameter value from a double.

- `of(String value)`

    Creates a parameter value from a string.

- `of(byte[] value)`

    Creates a parameter value from a byte array.

- `of(ByteString value)`

    Creates a parameter value from a `ByteString`.

- `ofArray(List<FunctionParamValue> values)`

    Creates a parameter value that holds a list of values.

- `ofObject(Map<String, FunctionParamValue> fields)`

    Creates a parameter value that holds a map of named fields.

- `from(Object value)`

    Creates a parameter value from an arbitrary object, converting it to the appropriate typed representation.

## Methods

- `toGrpc()`

    Converts this parameter value into the gRPC `FunctionParamValue` message.
