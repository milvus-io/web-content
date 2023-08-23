# hybridtsToUnixtime()

This method converts a hybrid timestamp to UNIX Epoch time despite the timing logic.

## Invocation

```javascript
import { hybridtsToUnixtime } from "@zilliz/milvus2-sdk-node";

hybridtsToUnixtime("429642767925248000");
```

### Response

```javascript
// The UNIX Epoch time
1638957092;
```

### Parameters

| Parameters | Description                                                                                        | Type   |
| ---------- | -------------------------------------------------------------------------------------------------- | ------ |
| unixTime   | Unix Epoch time, the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT). | String |
