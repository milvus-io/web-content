# FunctionChainStage

This enumeration specifies the execution stage where a function chain runs. Numeric values mirror the gRPC `FunctionChainStage` message.

```java
io.milvus.v2.service.vector.request.FunctionChainStage
```

## Constants

- **UNSPECIFIED**

    An unset stage.

- **INGESTION**

    Runs during data ingestion.

- **PRE_PROCESS**

    Runs before the search.

- **L0_RERANK**

    The first rerank stage applied to search results.

- **L1_RERANK**

    The second rerank stage applied to search results.

- **L2_RERANK**

    The third rerank stage applied to search results.

- **POST_PROCESS**

    Runs after the search.

## Example

```java
FunctionChain chain = FunctionChain.builder()
        .stage(FunctionChainStage.L2_RERANK)
        .name("fresh_popular_rerank")
        .build();
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
