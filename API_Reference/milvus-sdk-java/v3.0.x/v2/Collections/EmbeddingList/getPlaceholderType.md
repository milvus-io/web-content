# getPlaceholderType()

This getter returns the placeholder type of the embedding list, which indicates the vector data format.

```java
public PlaceholderType getPlaceholderType()
```

**RETURNS:**

*PlaceholderType*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
EmbeddingList embeddingList = new EmbeddingList();
PlaceholderType type = embeddingList.getPlaceholderType();
```
