# FunctionChainStage

This is an enumeration that provides the following constants.

```python
class FunctionChainStage(IntEnum):
    UNSPECIFIED = 0
    INGESTION = 1
    PRE_PROCESS = 2
    L0_RERANK = 3
    L1_RERANK = 4
    L2_RERANK = 5
    POST_PROCESS = 6
```

**Constants:**

- **UNSPECIFIED** (0)

    The stage is not specified.

- **INGESTION** (1)

    Runs during data ingestion.

- **PRE_PROCESS** (2)

    Runs before the main query/search process.

- **L0_RERANK** (3)

    Runs at the first reranking stage.

- **L1_RERANK** (4)

    Runs at the second reranking stage.

- **L2_RERANK** (5)

    Runs at the third reranking stage.

- **POST_PROCESS** (6)

    Runs after the main query/search process.

## Example

Creates a function chain for the L2 reranking stage.

```python
from pymilvus import FunctionChain, FunctionChainStage

chain = FunctionChain(FunctionChainStage.L2_RERANK)
```
