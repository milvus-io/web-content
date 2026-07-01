# getServerVersionV2()

This operation gets server version information. Use `detail(true)` when you need build time, Git commit, Go version, and deploy mode in addition to the version string.

```java
public GetServerVersionResp getServerVersionV2(GetServerVersionReq request)
```

## Request Syntax

```java
getServerVersionV2(GetServerVersionReq.builder()
    .detail(Boolean detail)
    .build());
```

**BUILDER METHODS:**

- `detail(Boolean detail)`

    Whether to fetch detailed server build information. Defaults to `Boolean.FALSE`.

**RETURNS:**

*GetServerVersionResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

GetServerVersionResp version = client.getServerVersionV2(GetServerVersionReq.builder()
    .detail(true)
    .build());
System.out.println(version.getVersion());
System.out.println(version.getGitCommit());
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
