# FunctionChain

A **FunctionChain** instance is a mutable builder for composing and serializing function-chain operations that run at a specified execution stage.

```python
class pymilvus.FunctionChain
```

## Constructor

Constructs a **FunctionChain** instance for the given execution stage.

```python
FunctionChain(
    stage: FunctionChainStage,
    name: str = "",
)
```

**PARAMETERS:**

- **stage** (*[FunctionChainStage](FunctionChainStage.md)*) -

    **[REQUIRED]**

    The execution stage where the chain should run. Accepts a **FunctionChainStage** value or an integer value that can be converted to one.

- **name** (*str*) -

    The optional name of the chain.

**RETURN TYPE:**

*FunctionChain*

**RETURNS:**

A **FunctionChain** instance that can be extended with the fluent methods below and passed to the `function_chains` parameter of a search operation.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    Raised when **stage** is unknown or **name** is not a string.

## Properties

- **name** (*str*)

    The name assigned to this function chain.

- **stage** (*FunctionChainStage*)

    The normalized execution stage of this function chain.

- **ops** (*Sequence[FunctionChainOp]*)

    An immutable tuple of the operations added to this chain, in insertion order.

## Methods

- **merge(strategy, weights=None, norm_score=None, k=None)** -

    Appends a Hybrid Search merge operation. `rrf` accepts `k` and optional per-input `weights`; `weighted` requires `weights`; `max`, `sum`, and `avg` optionally normalize scores. Available in PyMilvus v3.0.3 or later.

- **map(output, expr)** -

    Appends a map operation that writes an expression result to an output field.

- **sort(by, desc=True, tie_break_col=None)** -

    Appends a sort operation by column, optionally with a tie-break column.

- **limit(limit, offset=0)** -

    Appends a limit operation with an optional offset.

- **to_proto()** -

    Serializes this chain into a `schema_pb2.FunctionChain` protobuf message.

## Example

Builds a weighted-merge function chain for the L2 reranking stage.

```python
from pymilvus import FunctionChain, FunctionChainStage

chain = FunctionChain(FunctionChainStage.L2_RERANK).merge(
    "weighted",
    weights=[0.7, 0.3],
)
```
