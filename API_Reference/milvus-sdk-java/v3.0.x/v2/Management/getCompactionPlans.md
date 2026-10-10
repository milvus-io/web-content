# getCompactionPlans()

This operation returns the compaction plans for a specific compaction job, including the merge plans showing which segments will be combined.

```java
public GetCompactionPlansResp getCompactionPlans(GetCompactionPlansReq request)
```

## Request Syntax

```java
getCompactionPlans(GetCompactionPlansReq.builder()
    .compactionID(Long compactionID)
    .build()
);
```

**BUILDER METHODS:**

- `compactionID(Long compactionID)` -

    **[REQUIRED]**

    The ID of the compaction job returned by `compact()`.

**RETURN TYPE:**

*GetCompactionPlansResp*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the compaction state and merge plans.

- `getCompactionId()` (*Long*) -

    The ID of the compaction.

- `getState()` (*CompactionState*) -

    The state of the compaction.

- `getPlans()` (*List\<CompactionPlan\>*) -

    The merge plans of the compaction. Each **CompactionPlan** has the following getters:

    - `getTarget()` (*Long*) -

        The ID of the target segment.

    - `getSources()` (*List\<Long\>*) -

        The IDs of the source segments.

**EXCEPTIONS