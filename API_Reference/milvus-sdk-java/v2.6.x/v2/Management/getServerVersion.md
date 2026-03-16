# getServerVersion()

This operation returns the version string of the connected Milvus serverZilliz Cloud cluster.

```java
public String getServerVersion()
```

**RETURNS:**

*String*

The version string of the server (e.g., `"2.6.13"`).

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
String version = client.getServerVersion();
System.out.println(version); // "2.6.13"
```
