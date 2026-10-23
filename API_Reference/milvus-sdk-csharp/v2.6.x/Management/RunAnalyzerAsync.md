# RunAnalyzerAsync()

Runs the text analyzer on the given strings, returning the analyzed tokens.

```csharp
public async Task<RunAnalyzerResp> RunAnalyzerAsync(
    RunAnalyzerReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RunAnalyzerReq
{
    Texts = ["Hello Milvus"],
    AnalyzerParams = new Dictionary<string, object> { ["type"] = "english" },
    WithDetail = true
};

RunAnalyzerResp result = await client.RunAnalyzerAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `AnalyzerParams` (*IReadOnlyDictionary\<string, object\>?*) -

    The analyzer configuration as a JSON object, e.g. `new Dictionary<string, object> { ["type"] = "english" }`. Serialized to JSON before sending. Mutually exclusive with `CollectionName`/`FieldName`.

- `Texts` (*IReadOnlyList\<string\>*) -

    The texts to analyze.

- `WithDetail` (*bool*) -

    Whether to return the detailed token offsets and positions.

- `WithHash` (*bool*) -

    Whether to return the token hashes.

- `CollectionName` (*string?*) -

    The collection whose analyzer configuration is used. Required when `FieldName` is set.

- `FieldName` (*string?*) -

    The field whose analyzer configuration is used.

- `AnalyzerNames` (*IReadOnlyList\<string\>?*) -

    The names of predefined analyzers to apply, when not using `AnalyzerParams`.

**RETURN TYPE:**

*Task\<RunAnalyzerResp\>*

**RETURNS:**

A **RunAnalyzerResp** object that contains the analyzed tokens for each input text.

```csharp
RunAnalyzerResp
    Results  // -> IReadOnlyList<AnalyzerResult>
```

**PARAMETERS:**

- **Results** (*IReadOnlyList\<AnalyzerResult\>*) -

    The analysis results, one per analyzed text. Each **AnalyzerResult** has the following members:

    - **Tokens** (*IReadOnlyList\<AnalyzerToken\>*) -

        The tokens produced by analyzing the text. Each **AnalyzerToken** has the following members:

        - **Token** (*string*) -

            The token text.

        - **StartOffset** (*long*) -

            The zero-based start offset of the token in the analyzed text.

        - **EndOffset** (*long*) -

            The zero-based end offset of the token in the analyzed text.

        - **Position** (*long*) -

            The position of the token within the analyzed text.

        - **PositionLength** (*long*) -

            The length of the token's position range.

        - **Hash** (*uint*) -

            The hash of the token, populated when the analyzer was run with hash output requested.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    Texts = ["Hello Milvus"],
    AnalyzerParams = new Dictionary<string, object> { ["type"] = "english" },
    WithDetail = true
});

foreach (AnalyzerResult analyzerResult in result.Results)
{
    foreach (AnalyzerToken token in analyzerResult.Tokens)
    {
        Console.WriteLine(token.Token);
    }
}
```
