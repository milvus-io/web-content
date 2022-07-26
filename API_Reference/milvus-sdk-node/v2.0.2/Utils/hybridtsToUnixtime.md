# hybridtsToUnixtime()
This method converts a hybrid timestamp to UNIX Epoch time despite the timing logic.

## Invocation 
```javascript
hybridtsToUnixtime(unixTime);
```

## Parameter
| Parameter | Description                                                                                              | Type   | Required |
| --------- | -------------------------------------------------------------------------------------------------------- | ------ | -------- |
| unixTime  | Unix Epoch time, the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT). | String | True     |

## Example
```javascript
hybridtsToUnixtime("429642767925248000");
```

## Return
```javascript
// The UNIX Epoch time
1638957092
```
