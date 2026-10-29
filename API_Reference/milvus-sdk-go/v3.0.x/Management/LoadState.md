# LoadState

Represents the load state of a collection or partition, including progress percentage.

```go
type LoadState struct {
    State LoadStateCode
    Progress int64
}
```

**PARAMETERS:**

- **State** (*LoadStateCode*)

    The current state.

- **Progress** (*int64*)

    The progress percentage.