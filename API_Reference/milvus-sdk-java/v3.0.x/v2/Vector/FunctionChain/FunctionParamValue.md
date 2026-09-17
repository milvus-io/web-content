# FunctionParamValue

A `FunctionParamValue` instance wraps a typed value used as a function-chain parameter.

```java
io.milvus.v2.service.vector.request.FunctionParamValue
```

## Static Factories

A `FunctionParamValue` has no public builder. Create an instance with one of the following static factories:

```java
FunctionParamValue.of(boolean value);
FunctionParamValue.of(long value);
FunctionParamValue.of(double value);
FunctionParamValue.of(String value);
FunctionParamValue.of(byte[] value);
FunctionParamValue.of(ByteString value);
FunctionParamValue.ofArray(List<FunctionParamValue> values);
FunctionParamValue.ofObject(Map<String, FunctionParamValue> fields);
FunctionParamValue.from(Object value);
```

- `of(...)` — Creates a scalar parameter value of the given type.
- `ofArray(List<FunctionParamValue> values)` — Creates an array parameter value.
- `ofObject(Map<String, FunctionParamValue> fields)` — Creates an object parameter value.
- `from(Object value)` — Wraps an arbitrary Java object as a parameter value.
