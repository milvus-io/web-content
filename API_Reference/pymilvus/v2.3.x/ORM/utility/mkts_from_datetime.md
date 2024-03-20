
# mkts_from_datetime()

This operation makes a hybrid timestamp from a Python's __datetime.datetime__ object.

## Request Syntax

```python
mkts_from_datetime(
    d_time: datetime,
    milliseconds: float = 0.0,
    delta: datetime.timedelta | None,
)
```

__PARAMETERS:__

- __d_time__ (_datetime_) -
__[REQUIRED]__
A __datetime.datetime__ object.

- __milliseconds__ (_float_) -
An incremental time interval in milliseconds.

- __delta__ (_Optional[timedelta]_) -

    A __datetime.timedelta__ object that represents the duration expressing the difference between two `date`, `time`, or `datetime` instances to microsecond resolution.

__RETURN TYPE:__

_int_

__RETURNS:__
A hybrid timestamp, which is a non-negative integer ranging from __0__ to __18446744073709551615__.

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

