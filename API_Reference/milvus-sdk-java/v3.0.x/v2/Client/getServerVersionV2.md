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

**RETURN TYPE:**

*GetServerVersionResp*

**RETURNS:**

A **GetServerVersionResp** object that contains the version information of the connected Milvus server.

- `getVersion()` (*String*) -

    The version of the Milvus server.

- `getBuildTime()` (*String*) -

    The build time of the server.

- `getGitCommit()` (*String*) -

    The git commit of the server build.

- `getGoVersion()` (*String*) -

    The Go version used to build the server.

- `getDeployMode()` (*String*) -

    The deployment mode of the server.

**EXCEPTIONS