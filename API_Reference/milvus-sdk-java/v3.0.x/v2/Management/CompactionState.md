# CompactionState

Represents the state of a compaction job returned by `getCompactionState()` and `getCompactionPlans()`.

```java
public enum CompactionState
```

**METHODS:**

- `getCode()` (*int*) -

    Returns the numeric compaction-state code.

- `forNumber(int code)` (*CompactionState*) -

    Returns the canonical compaction state for the given numeric code. The proto enum historically spells the undefined value `UndefiedState`; this lookup maps it to `UndefinedState` so consumers comparing against the corrected constant always match. Throws an `IllegalArgumentException` if the code is unknown.

**Constants:**

- **UndefinedState** (0)

    The compaction state is undefined.

- **UndefiedState** (0)

    **Deprecated.** A backward-compatible alias of `UndefinedState`. Use `UndefinedState` instead.

- **Executing** (1)

    The compaction job is currently running.

- **Completed** (2)

    The compaction job has completed.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.CompactionState;
import io.milvus.v2.service.utility.request.GetCompactionStateReq;
import io.milvus.v2.service.utility.response.GetCompactionStateResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetCompactionStateResp resp = client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactionID)
        .build());
if (resp.getState() == CompactionState.Completed) {
    System.out.println("Compaction completed");
}
```
