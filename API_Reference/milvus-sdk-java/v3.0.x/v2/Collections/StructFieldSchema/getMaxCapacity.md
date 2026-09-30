# getMaxCapacity()

This operation returns the maximum capacity of an Array of Structs field.

```java
public Integer getMaxCapacity()
```

## Request Syntax

```java
getMaxCapacity()
```

**RETURN TYPE:**

*Integer*

**RETURNS:**

The return value will be the maximum capacity of the specified Array of Struct field.

## Examples

```java
// You can get an instance of StructFieldSchema by describing
// a collection containing an Array of Struct field.

structFieldSchema.getMaxCapacity();

// 600
```

