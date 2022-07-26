# datetimeToHybrids()
Generate a hybrid timestamp based on datetime。

## Invocation 
```javascript
datetimeToHybrids(HybridTimetamp);
```

## Parameter
| Parameter      | Description                                                                      | type   | required |
| -------------- | -------------------------------------------------------------------------------- | ------ | -------- |
| HybridTimetamp | Hybrid timetamp is a non-negative interger range from 0 to 18446744073709551615. | String | true     |

## Example
```javascript
datetimeToHybrids(new Date(1638957092 * 1000));
```

## Return
```javascript
429642767925248000
```