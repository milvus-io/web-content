# GetServerVersionAsync()

Gets the Milvus server version.

```csharp
public async Task<GetServerVersionResp> GetServerVersionAsync(GetServerVersionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetServerVersionReq
{
    Detail = true
};

GetServerVersionResp version = await client.GetServerVersionAsync(request);
```

**REQUEST PARAMETERS:**

- `Detail` (*bool*) -

    Whether to return detailed version information (build time, git commit, Go version, deploy mode) in addition to the version string. Defaults to `false`.

**RETURN TYPE:**

*Task\<GetServerVersionResp\>*

**RETURNS:**

A **GetServerVersionResp** object that contains the server version information.

```csharp
GetServerVersionResp
    Version     // -> string
    BuildTime   // -> string?
    GitCommit   // -> string?
    GoVersion   // -> string?
    DeployMode  // -> string?
```

**PARAMETERS:**

- **Version** (*string*) -

    The Milvus server version.

- **BuildTime** (*string?*) -

    The build time of the server. Only populated when `Detail` is `true`.

- **GitCommit** (*string?*) -

    The git commit of the server build. Only populated when `Detail` is `true`.

- **GoVersion** (*string?*) -

    The Go version used to build the server. Only populated when `Detail` is `true`.

- **DeployMode** (*string?*) -

    The deploy mode of the server. Only populated when `Detail` is `true`.

**EXCEPTIONS:**

- [MilvusException](MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetServerVersionResp version = await client.GetServerVersionAsync(new GetServerVersionReq { Detail = true });
Console.WriteLine(version.Version);
```
