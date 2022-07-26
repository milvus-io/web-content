# datetimeToHybrids()
This method generates a hybrid timestamp based on an existing datetime.

## Invocation 
```javascript
datetimeToHybrids(HybridTimestamp);
```

## Parameters
| Parameter      | Description                                                                      | Type   | Required |
| -------------- | -------------------------------------------------------------------------------- | ------ | -------- |
| HybridTimestamp | The hybrid timestamp, a non-negative integer ranging from 0 to 18446744073709551615. | String | True     |

## Example
```javascript
datetimeToHybrids(new Date(1638957092 * 1000));
```

## Return
```javascript
//The hybrid timestamp
429642767925248000 
```
