# ConsistencyLevelEnum

This enum specifies the consistency guarantee applied to reads and queries.

```typescript
export enum ConsistencyLevelEnum {
  Strong = 0,
  Session = 1, // default in PyMilvus
  Bounded = 2,
  Eventually = 3,
  Customized = 4, // Users pass their own `guarantee_timestamp`. Deprecated
}

```

**FIELDS:**

- **Strong** (ConsistencyLevelEnum)

    Strongest guarantee: reads see all data committed before the request starts.

- **Session** (ConsistencyLevelEnum)

    Read-your-writes consistency via a per-session timestamp (the default in PyMilvus).

- **Bounded** (ConsistencyLevelEnum)

    Reads tolerate staleness within a bounded time window.

- **Eventually** (ConsistencyLevelEnum)

    Weakest guarantee: replicas converge eventually, lowest latency.

- **Customized** (ConsistencyLevelEnum)

    The caller passes its own guarantee timestamp. Deprecated.
