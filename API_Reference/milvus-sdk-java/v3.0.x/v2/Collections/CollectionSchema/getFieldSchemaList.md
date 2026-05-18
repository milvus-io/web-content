# getFieldSchemaList()

This getter returns the list of all field schemas in the collection schema.

```java
public List<CreateCollectionReq.FieldSchema> getFieldSchemaList()
```

**RETURNS:**

*List\<CreateCollectionReq.FieldSchema\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CollectionSchema schema = CollectionSchema.builder().build();
List<CreateCollectionReq.FieldSchema> fields = schema.getFieldSchemaList();
```
