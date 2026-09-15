# FunctionParamValue

A `FunctionParamValue` instance represents a single typed parameter value used by [FunctionChainExpr](FunctionChainExpr.md) and [FunctionChainOp](FunctionChainOp.md).

```java
io.milvus.v2.service.vector.request.FunctionParamValue
```

## Constructor

A `FunctionParamValue` is not constructed directly. Use the static factory methods `of()`, `ofArray()`, `ofObject()`, or `from()` to wrap a value.

```java
FunctionParamValue.of(boolean value)
FunctionParamValue.of(long value)
FunctionParamValue.of(double value)
FunctionParamValue.of(String value)
FunctionParamValue.of(byte[] value)
FunctionParamValue.of(ByteString value)
FunctionParamValue.ofArray(List<FunctionParamValue> values)
FunctionParamValue.ofObject(Map<String, FunctionParamValue> fields)
FunctionParamValue.from(Object value)
```

**FACTORY METHODS:**

- `of(boolean value)`

    Wraps a Boolean value.

- `of(long value)`

    Wraps an int64 value.

- `of(double value)`

    Wraps a double value.

- `of(String value)`

    Wraps a string value.

- `of(byte[] value)`

    Wraps a byte-array value.

- `of(ByteString value)`

    Wraps a byte-string value.

- `ofArray(List<FunctionParamValue> values)`

    Wraps a list of `FunctionParamValue` instances as an array.

- `ofObject(Map<String, FunctionParamValue> fields)`

    Wraps a map of `FunctionParamValue` instances as an object.

- `from(Object value)`

    Wraps a plain Java value into a `FunctionParamValue`. Supports `Boolean`, integral and floating-point numbers, `String`, `Character`, `byte[]`, `char[]`, `ByteString`, `List`, and `Map`. Returns the value unchanged if it is already a `FunctionParamValue`.

**RETURN TYPE:**

*FunctionParamValue*

**RETURNS:**

A **FunctionParamValue** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when the value is `null`, an integer exceeds the int64 range, or the value type is unsupported.

## Example

```java
FunctionParamValue w = FunctionParamValue.of(0.7);
FunctionParamValue mode = FunctionParamValue.of("weighted");
FunctionParamValue weights = FunctionParamValue.from(Arrays.asList(0.7, 0.2, 0.1));
```
