# addField()

This operation adds a sub-field to a struct field schema. Use this to define the inner fields of a struct-type column.

```java
public StructFieldSchema addField(AddFieldReq addFieldReq)
```

**PARAMETERS:**

- **addFieldReq** (*AddFieldReq*) -

    An AddFieldReq object defining the sub-field properties.

**RETURNS:**

*[StructFieldSchema](StructFieldSchema.md)*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CreateCollectionReq.StructFieldSchema structField = CreateCollectionReq.StructFieldSchema.builder()
    .name("metadata")
    .build();
structField.addField(AddFieldReq.builder()
    .fieldName("key")
    .dataType(DataType.VarChar)
    .maxLength(128)
    .build());
```
