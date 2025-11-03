# getFields()

This operation returns the fields of the Struct elements in an Array of Structs.

```java
public List<CreateCollectionReq.FieldSchema> getFields()
```

## Request Syntax

```java
getFields()
```

**RETURN TYPE:**

*List&lt;CreateCollectionReq.FieldSchema&gt;*

**RETURNS:**

The return value will be the fields of the Struct elements in an Array of Structs.

## Examples

```java
// You can get an instance of StructFieldSchema by describing
// a collection containing an Array of Struct field.

structFieldSchema.getFields();
```

