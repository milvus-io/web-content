# mkts_from_unixtime()

This operation converts a hybrid timestamp from a UNIX epoch timestamp.

## Request Syntax

```python
mkts_from_unixtime(
    epoch: float,
    milliseconds: float = 0.0,
    delta: Optional[timedelta] = None,
)
```

```python
from pymilvus import utility

utility.mkts_from_unixtime(
    epoch=1704550236
    milliseconds=0.0
    delta=None
)
```

__PARAMETERS:__

- __epoch__ (_float_) -

    __[REQUIRED]__

    A UNIX epoch timestamp.

    A UNIX epoch timestamp is an integer that represents the time elapsed since January 1, 1970 (midnight UTC/GMT) in seconds.

- __milliseconds__ (_float_) -
An incremental time interval in milliseconds.

- __delta__ (_Optional[timedelta]_) -

    A __datetime.timedelta__ object that represents the duration expressing the difference between two `date`, `time`, or `datetime` instances to microsecond resolution.

__RETURN TYPE:__

_int_

__RETURNS:__
A hybrid timestamp, which is a non-negative integer ranging from __0__ to __18446744073709551615__.

## __Examples__

```python
import time
from datetime import timedelta
from pymilvus import utility

# Get a UNIX epoch timestamp
epoch1 = time.time()

# Set up a timedelta object
delta = timedelta(
    days=50,
    seconds=27,
    microseconds=10,
    milliseconds=29000,
    minutes=5,
    hours=8,
    weeks=2
)

# Get a hybrid timestamp
mkts_from_unixtime(
    epoch=epoch1,
    milliseconds=1000,
    delta=delta,
)
```

## Related operations

The following operations are related to `mkts_from_unixtime()`:

- [mkts_from_datetime()](./mkts_from_datetime.md)

- [hybridts_to_datetime()](./hybridts_to_datetime.md)

- [hybridts_to_unixtime()](./hybridts_to_unixtime.md)

- [mkts_from_hybridts()](./mkts_from_hybridts.md)

