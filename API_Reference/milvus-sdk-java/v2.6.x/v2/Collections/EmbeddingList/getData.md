# getData()

This getter returns the raw embedding data contained in this embedding list.

```java
public Object getData()
```

**RETURN TYPE:**

*Object*

**RETURNS:**

The raw embedding data contained in this embedding list.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
EmbeddingList embeddingList = new EmbeddingList();
Object data = embeddingList.getData();
```
