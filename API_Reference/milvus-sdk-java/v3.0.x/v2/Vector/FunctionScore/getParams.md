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
import io.milvus.v2.service.vector.request.FunctionScore;
import java.util.Collections;
import java.util.Map;

// Build a FunctionScore with parameters
FunctionScore score = FunctionScore.builder()
    .params(Collections.singletonMap("weight", "0.8"))
    .build();
Map<String, String> params = score.getParams();
```
