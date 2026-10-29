# ConsistencyLevelEnum

Defines the consistency guarantee applied to reads and queries.

```typescript
export enum ConsistencyLevelEnum {
  Strong = 0,
  Session = 1, // default in PyMilvus
  Bounded = 2,
  Eventually = 3,
  Customized = 4, // Users pass their own `guarantee_timestamp`. Deprecated
}
```

**Constants:**

- **Strong** (0)

    Strongest guarantee: reads see all data committed before the request starts.

- **Session** (1)

    Read-your-writes consistency via a per-session timestamp (the default in PyMilvus).

- **Bounded** (2)

    Reads tolerate staleness within a bounded time window.

- **Eventually** (3)

    Weakest guarantee: replicas converge eventually; lowest latency.

- **Customized** (4)

    The caller passes its own guarantee timestamp. Deprecated.
