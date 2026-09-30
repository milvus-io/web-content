# getName()

This operation returns the name of an Array of Structs field.

```java
public String getName()
```

## Request Syntax

```java
getName()
```

**RETURN TYPE:**

*String*

**RETURNS:**

The return value will be the name of the specified Array of Struct field.

## Examples

```java
// You can get an instance of StructFieldSchema by describing
// a collection containing an Array of Struct field.

structFieldSchema.getName();

// "array_of_structs"
```

