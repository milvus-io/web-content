# FunctionChainStage

An enum that specifies the execution stages where a function chain can run.

```java
io.milvus.v2.service.vector.request.FunctionChainStage
```

## Constants

- **UNSPECIFIED**

    The stage is not specified.

- **INGESTION**

    The chain runs during ingestion.

- **PRE_PROCESS**

    The chain runs during pre-processing.

- **L0_RERANK**

    The chain runs during L0 reranking.

- **L1_RERANK**

    The chain runs during L1 reranking.

- **L2_RERANK**

    The chain runs during L2 reranking.

- **POST_PROCESS**

    The chain runs during post-processing.
