# getStructField()

This getter returns a struct field schema by name from the collection schema.

```java
public CreateCollectionReq.StructFieldSchema getStructField(String fieldName)
```

**PARAMETERS:**

- **fieldName** (*String*) -

    The name of the struct field.

**RETURN TYPE:**

*CreateCollectionReq.StructFieldSchema*

**RETURNS:**

The **StructFieldSchema** with the specified name, or `null` if none is found. See [StructFieldSchema](../StructFieldSchema/StructFieldSchema.md).

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CollectionSchema schema = CollectionSchema.builder().build();
CreateCollectionReq.StructFieldSchema structField = schema.getStructField("metadata");
```
