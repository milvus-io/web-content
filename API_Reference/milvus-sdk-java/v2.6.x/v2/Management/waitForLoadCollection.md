# waitForLoadCollection()

This operation halts the process until the collection is loaded. You can use this method to check the load status of a collection at an interval of 0.5 seconds until the load process is complete.

```java
private void WaitForLoadCollection(String collectionName, long timeoutMs)
```

## Request Syntax

```java
waitForCollectionRelease(String collectionName, long timeoutMs)
```

**PARAMETERS:**

- **collectionName** (*String*) -

    The name of the target collection.

- **timeoutMs** (*long*) -

    The timeout duration for this operation in milliseconds.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// load collection "test"
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()
        .collectionName("test")
        .build();
client.loadCollection(loadCollectionReq);

// Wait for 10 seconds
client.waitForLoadCollection("test", 10000)
```

