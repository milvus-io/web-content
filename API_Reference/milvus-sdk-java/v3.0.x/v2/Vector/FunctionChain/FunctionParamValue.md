# FunctionParamValue

A typed value used for function-chain expression and operation parameters.

```java
io.milvus.v2.service.vector.request.FunctionParamValue
```

## Methods

- `static FunctionParamValue of(boolean value)`

    Creates a boolean parameter value.

- `static FunctionParamValue of(long value)`

    Creates an integer parameter value.

- `static FunctionParamValue of(double value)`

    Creates a floating-point parameter value.

- `static FunctionParamValue of(String value)`

    Creates a string parameter value.

- `static FunctionParamValue of(byte[] value)`

    Creates a binary parameter value from a byte array.

- `static FunctionParamValue of(ByteString value)`

    Creates a binary parameter value from a protobuf `ByteString`.

- `static FunctionParamValue ofArray(List<FunctionParamValue> values)`

    Creates an array parameter value from a list of typed values.

- `static FunctionParamValue ofObject(Map<String, FunctionParamValue> fields)`

    Creates an object parameter value from a map of field values.

- `static FunctionParamValue from(Object value)`

    Creates a parameter value by inferring the type from a Java object.

## Example

```java
FunctionChainExpr expr = FunctionChainExpr.builder()
        .name("num_combine")
        .arg(FunctionChainArg.col("$score"))
        .param("weights", Arrays.asList(FunctionParamValue.of(0.7), FunctionParamValue.of(0.3)))
        .build();
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
