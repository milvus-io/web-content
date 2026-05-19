# getStructFields()

This getter returns all struct field schemas in the collection schema.

```java
public List<CreateCollectionReq.StructFieldSchema> getStructFields()
```

**RETURNS:**

*List\<CreateCollectionReq.StructFieldSchema\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CollectionSchema schema = CollectionSchema.builder().build();
List<CreateCollectionReq.StructFieldSchema> fields = schema.getStructFields();
```
