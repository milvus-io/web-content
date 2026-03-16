# isEnableDynamicField()

This getter returns whether the dynamic field is enabled for the collection schema.

```java
public boolean isEnableDynamicField()
```

**RETURNS:**

*boolean*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CollectionSchema schema = CollectionSchema.builder()
    .enableDynamicField(true)
    .build();
boolean enabled = schema.isEnableDynamicField(); // true
```
