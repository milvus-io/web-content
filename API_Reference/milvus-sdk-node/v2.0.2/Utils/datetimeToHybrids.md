# datetimeToHybrids()
This method generates a hybrid timestamp based on an existing datetime.

## Invocation 
```javascript
datetimeToHybrids(HybridTimetamp);
```

## Parameters
| Parameter      | Description                                                                      | Type   | Required |
| -------------- | -------------------------------------------------------------------------------- | ------ | -------- |
| HybridTimetamp | The hybrid timestamp, a non-negative integer ranging from 0 to 18446744073709551615. | String | True     |

## Example
```javascript
datetimeToHybrids(new Date(1638957092 * 1000));
```

## Return
```javascript
429642767925248000
```
