# FunctionChainStage

A `FunctionChainStage` instance is an enumeration of the execution stages where a [FunctionChain](FunctionChain.md) runs.

```java
io.milvus.v2.service.vector.request.FunctionChainStage
```

## Constants

- **UNSPECIFIED**

    An unspecified stage.

- **INGESTION**

    The ingestion stage.

- **PRE_PROCESS**

    The pre-processing stage.

- **L0_RERANK**

    The L0 rerank stage.

- **L1_RERANK**

    The L1 rerank stage.

- **L2_RERANK**

    The L2 rerank stage.

- **POST_PROCESS**

    The post-processing stage.

## Methods

- `toGrpc()`

    Converts this stage into the gRPC `FunctionChainStage` message.
