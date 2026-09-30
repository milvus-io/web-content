# getParams()

This getter returns the parameters map of this FunctionScore object.

```java
public Map<String, String> getParams()
```

**RETURNS:**

*Map\<String, String\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
FunctionScore score = FunctionScore.builder()
    .params(Map.of("weight", "0.8"))
    .build();
Map<String, String> params = score.getParams();
```
