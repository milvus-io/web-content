# mkts_from_datetime()

This operation makes a hybrid timestamp from a Python's **datetime.datetime** object.

## Request Syntax

```python
mkts_from_datetime(
    d_time: datetime,
    milliseconds: float = 0.0,
    delta: datetime.timedelta | None,
)
```

**PARAMETERS:**

- **d_time** (*datetime*) -
**&#91;REQUIRED&#93;**
A **datetime.datetime** object.

- **milliseconds** (*float*) -
An incremental time interval in milliseconds.

- **delta** (*Optional&#91;timedelta&#93;*) -

    A **datetime.timedelta** object that represents the duration expressing the difference between two [`date`](https://docs.python.org/3/library/datetime.html#datetime.date), [`time`](https://docs.python.org/3/library/datetime.html#datetime.time), or [`datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime) instances to microsecond resolution.

**RETURN TYPE:**

*int*

**RETURNS:**
A hybrid timestamp, which is a non-negative integer ranging from **0** to **18446744073709551615**.

## Examples

```python
from datetime import datetime, timedelta
from pymilvus import utility

ts = mkts_from_datetime(
    d_time=datetime.now(),
    milliseconds=0.0,
    delta=None,
)
```

## Related operations

The following operations are related to `mkts_from_datetime()`:

- [hybridts_to_datetime()](hybridts_to_datetime.md)

- [hybridts_to_unixtime()](hybridts_to_unixtime.md)

- [mkts_from_hybridts()](mkts_from_hybridts.md)

- [mkts_from_unixtime()](mkts_from_unixtime.md)

