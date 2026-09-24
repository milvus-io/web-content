# AbortImportResponse

This class represents the response returned by the `AbortImport()` package function. It embeds `ResponseBase` for the common `Status` and `Message` fields. Use the embedded `CheckStatus()` method to verify the call succeeded.

```go
type AbortImportResponse struct {
    ResponseBase
}
```

**FIELDS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success; any other value indicates an error.

- **Message** (*string*) -
Inherited from `ResponseBase`. Human-readable error description when `Status` is non-zero.

**METHODS:**

- `CheckStatus()`

    This validates the response status. Returns nil when `Status == 0`; otherwise returns a formatted error containing `Status` and `Message`.
