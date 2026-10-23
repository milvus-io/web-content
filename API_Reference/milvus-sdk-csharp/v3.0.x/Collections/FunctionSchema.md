# FunctionSchema

Describes a function in a collection schema, such as a BM25 full-text-search or text-embedding function.

```csharp
public sealed class FunctionSchema
{
    public FunctionSchema(string name, FunctionType type, IEnumerable<string> inputFieldNames, IEnumerable<string> outputFieldNames, string description = "", long id = 0)

    public static FunctionSchema CreateBm25(string name, string inputFieldName, string outputFieldName, string description = "", IDictionary<string, string>? @params = null)

    public long Id { get; }
    public string Name { get; }
    public FunctionType Type { get; }
    public string Description { get; }
    public IList<string> InputFieldNames { get; }
    public IList<string> OutputFieldNames { get; }
    public IDictionary<string, string>? Params { get; }
}
```

**PARAMETERS:**

- `Id` (*long*) -

    The ID of the function.

- `Name` (*string*) -

    The name of the function.

- `Type` (*FunctionType*) -

    The type of the function. See [FunctionType](FunctionType.md).

- `Description` (*string*) -

    A description of the function.

- `InputFieldNames` (*IList\<string\>*) -

    The names of the input fields.

- `OutputFieldNames` (*IList\<string\>*) -

    The names of the output fields.

- `Params` (*IDictionary\<string, string\>?*) -

    Optional function parameters sent to the server, e.g. BM25 settings. Defaults to `null`.

**METHODS:**

- `FunctionSchema(string name, FunctionType type, IEnumerable<string> inputFieldNames, IEnumerable<string> outputFieldNames, string description = "", long id = 0)` -

    Initializes a new instance of the `FunctionSchema` class.

- `CreateBm25(string name, string inputFieldName, string outputFieldName, string description = "", IDictionary<string, string>? @params = null)` (*static*) -

    Creates a BM25 full-text-search function. `inputFieldName` is the name of the input field and `outputFieldName` is the name of the output field.
