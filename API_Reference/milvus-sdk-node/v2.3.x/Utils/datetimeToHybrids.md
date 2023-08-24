# datetimeToHybrids()

This method generates a hybrid timestamp based on an existing datetime.

## Example

```javascript
import { datetimeToHybrids } from "@zilliz/milvus2-sdk-node";

datetimeToHybrids(new Date(1638957092 * 1000));
```

### Response

```javascript
//The hybrid timestamp
429642767925248000;
```

### Parameters

| Parameters      | Description                                                                          | Type   |
| --------------- | ------------------------------------------------------------------------------------ | ------ |
| HybridTimestamp | The hybrid timestamp, a non-negative integer ranging from 0 to 18446744073709551615. | String |
