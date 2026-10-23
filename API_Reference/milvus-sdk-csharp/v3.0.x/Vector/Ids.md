# Ids

A wrapper around an array of IDs returned from a query or search. Can contain either long or string IDs.

```csharp
public readonly struct Ids : IEquatable<Ids>
{
    public IReadOnlyList<long>? LongIds { get; }
    public IReadOnlyList<string>? StringIds { get; }
}
```

**PARAMETERS:**

- `LongIds` (*IReadOnlyList\<long\>?*) -

    The long IDs, or `null` when the primary key is a string.

- `StringIds` (*IReadOnlyList\<string\>?*) -

    The string IDs, or `null` when the primary key is an integer.
