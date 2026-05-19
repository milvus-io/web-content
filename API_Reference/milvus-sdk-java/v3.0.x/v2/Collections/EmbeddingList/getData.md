# getData()

This getter returns the raw embedding data contained in this embedding list.

```java
public Object getData()
```

**RETURNS:**

*Object*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
EmbeddingList embeddingList = new EmbeddingList();
Object data = embeddingList.getData();
```
