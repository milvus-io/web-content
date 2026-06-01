# waitForCollectionRelease()

This operation halts the process until the collection is released. You can use this method to encapsulate the request for collection release, ensuring the release is fully complete before proceeding with further actions.

```java
public void waitForCollectionRelease(ReleaseCollectionReq request)
```

## Request Syntax

```java
waitForCollectionRelease(ReleaseCollectionReq.builder()
    .collectionName(String collectionName)
    .async(Boolean async)
    .timeout(Long timeout)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

- `async(Boolean async)`

    Whether this operation is asynchronous.

    The value defaults to `Boolean.True`, indicating immediate return while the process may still run in the background.

- `timeout(Long timeout)`

    The timeout duration of the process. The process terminates after the specified duration expires.

    The value defaults to `60000L`, indicating the timeout duration is one minute.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// release collection "test"
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
        .collectionName("test")
        .build();
        
client.releaseCollection(releaseCollectionReq);
client.waitForCollectionRelease(releaseCollectionReq);
```

