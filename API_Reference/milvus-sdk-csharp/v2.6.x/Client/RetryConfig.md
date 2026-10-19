# RetryConfig

The retry policy for RPC calls.

```csharp
public sealed class RetryConfig
{
    public int MaxRetryTimes { get; set; } = 75;
    public TimeSpan InitialBackOff { get; set; } = TimeSpan.FromMilliseconds(10);
    public TimeSpan MaxBackOff { get; set; } = TimeSpan.FromSeconds(3);
    public int BackOffMultiplier { get; set; } = 3;
    public bool RetryOnRateLimit { get; set; } = true;
    public TimeSpan? MaxRetryTimeout { get; set; }
}
```

**PARAMETERS:**

- `MaxRetryTimes` (*int*) -

    The maximum number of total attempts (the initial call plus its retries). A value of 1 disables retrying.

- `InitialBackOff` (*TimeSpan*) -

    The initial backoff before the first retry.

- `MaxBackOff` (*TimeSpan*) -

    The maximum backoff between retries.

- `BackOffMultiplier` (*int*) -

    The multiplier applied to the backoff after each attempt (exponential backoff).

- `RetryOnRateLimit` (*bool*) -

    Whether to retry on `RateLimit` server errors. Defaults to `true`.

- `MaxRetryTimeout` (*TimeSpan?*) -

    An optional overall timeout for the whole retry loop. `null` (or `TimeSpan.Zero`) means no overall cap; only `MaxRetryTimes` applies.
