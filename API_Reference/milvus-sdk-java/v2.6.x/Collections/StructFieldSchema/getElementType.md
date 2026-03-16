# getElementType()

This operation returns the data type of the Struct elements within an Array of Structs field.

```java
public DataType getElementType()
```

## Request Syntax

```java
getElementType()
```

**RETURN TYPE:**

*DataType*

**RETURNS:**

The return value will always be `DataType.Array`.

## Examples

```java
// You can get an instance of StructFieldSchema by describing
// a collection containing an Array of Struct field.

structFieldSchema.getElementType();

// DataType.Struct
```

