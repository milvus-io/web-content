# getCompactionState()

This operation gets the state of a specific compact operation.

```java
public GetCompactionStateResp getCompactionState(GetCompactionStateReq request)
```

## Request Syntax

```java
getCompactionState(GetCompactionStateReq.builder()
    .compactionID(Long compactionID)
    .build();
)
```

**BUILDER METHODS:**

- `compactionID(Long compactionID)`

    The ID of a compact operation, which is returned by a `compact()` call.

**RETURN TYPE:**

*GetCompactionStateResp*

**RETURNS:**

A **GetCompactionStateResp** instance, which comprises the following parameters:

- `getState()` (*CompactState*) -

    The current state of the specified compact operation. Possible values are:

    - UndefinedState(0)

    - Executing(1)

    - Completed(2)

- `getExecutingPlanNo()` (*Long*) -

    The ID of the corresponding execution plan.

- `getTimeoutPlanNo()` (*Long*) -

    The ID of the timeout plan.

- `getCompletedPlanNo()` (*Long*) -

    The ID of the completed plan.

## Example