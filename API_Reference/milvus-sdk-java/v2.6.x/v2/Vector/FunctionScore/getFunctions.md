# getFunctions()

This getter returns the list of functions defined in this FunctionScore object.

```java
public List<CreateCollectionReq.Function> getFunctions()
```

**RETURNS:**

*List\<CreateCollectionReq.Function\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
FunctionScore score = FunctionScore.builder()
    .addFunction(func)
    .build();
List<CreateCollectionReq.Function> functions = score.getFunctions();
```
