# getDataType()

This operation returns the data type of an Array of Structs field.

```java
public DataType getDataType()
```

## Request Syntax

```java
getDataType()
```

**RETURN TYPE:**

*DataType*

**RETURNS:**

The return value will always be `DataType.Array`.

## Examples

```java
// You can get an instance of StructFieldSchema by describing
// a collection containing an Array of Struct field.

structFieldSchema.getDataType();

// DataType.Array
```
