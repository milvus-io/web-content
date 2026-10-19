# ConsistencyLevel

The consistency level to be used by a Milvus collection.

```csharp
public enum ConsistencyLevel
{
    Strong = 0,
    Session = 1,
    BoundedStaleness = 2,
    Eventually = 3
}
```

**VALUES:**

- **Strong** (0) - The highest and most strict level of consistency, ensuring that users can read the latest version of data.

- **Session** (1) - Ensures that all data writes can be immediately perceived in reads during the same session.

- **BoundedStaleness** (2) - Allows data inconsistency during a certain period of time, after which data is generally globally consistent.

- **Eventually** (3) - The weakest level; there is no guaranteed order of reads and writes, and replicas eventually converge to the same state.
