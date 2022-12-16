# get_bulk_insert_state()

This method returns the state of the bulk insert task by a given task ID.

## Invocation

```Python
get_bulk_insert_state(task_id, timeout=None, using="default", **kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `task_id` | ID of a running bulk insert task | Integer | True |
| `timetout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Integer | False |
| `using` |  Alias of the Milvus connection to be attached to | String | False |

## Returns

Returns a BulkInsertState object.

## Example

```Python
from pymilvus import connections, utility, BulkInsertState
connections.connect()
state = utility.get_bulk_insert_state(task_id=id) # the id is returned by do_bulk_insert()
if state.state == BulkInsertState.ImportFailed or state.state == BulkInsertState.ImportFailedAndCleaned:
   print("task id:", state.task_id, "failed, reason:", state.failed_reason)
```