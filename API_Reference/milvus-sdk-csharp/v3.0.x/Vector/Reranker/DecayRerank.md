# DecayRerank

A function-score reranker applying a gaussian/exponential/linear decay to results by a scalar field, mapped to the proto `schema.FunctionScore`.

```csharp
public sealed class DecayRerank : FunctionReranker<DecayRerank>
{
    public DecayRerank(string name) { ... }
    public DecayRerank WithInputField(string field) { ... }
    public DecayRerank WithFunction(string function) { ... }
    public DecayRerank WithOrigin<T>(T origin) { ... }
    public DecayRerank WithOffset<T>(T offset) { ... }
    public DecayRerank WithScale<T>(T scale) { ... }
    public DecayRerank WithDecay(float decay) { ... }
}
```

**METHODS:**

- `DecayRerank(string name)` (*constructor*) -

    Creates a decay reranker.

- `WithInputField(string field)` -

    Sets the field the decay applies to; the server requires exactly one input field for decay functions.

- `WithFunction(string function)` -

    Sets the decay function: `"gauss"`, `"exp"` or `"linear"`.

- `WithOrigin<T>(T origin)` -

    Sets the reference point (origin) of the decay curve.

- `WithOffset<T>(T offset)` -

    Sets the no-decay zone around the origin.

- `WithScale<T>(T scale)` -

    Sets the scale: the position at which relevance drops to the decay value.

- `WithDecay(float decay)` -

    Sets the decay value (the score at the scale position).

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Decay scores of rows far from the origin with a gaussian curve
DecayRerank decay = new DecayRerank("decay_score")
    .WithInputField("price")
    .WithFunction("gauss")
    .WithOrigin(50.0)
    .WithScale(5.0);

FunctionScore? functionScore = decay.ToFunctionScore();
```
