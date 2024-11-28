# mkts_from_hybridts()

This operation makes a hybrid timestamp from another hybrid timestamp.

## Request Syntax

```python
mkts_from_hybridts(
    hybridts: int,
    milliseconds: float = 0.0,
    delta: datetime.timedelta | None,
)
```

**PARAMETERS:**

- **hybridts** (*float*) -

    **[REQUIRED]**

    A hybrid timestamp.

    A hybrid timestamp is a non-negative integer ranging from **0** to **18446744073709551615**.

- **milliseconds** (*float*) -
An incremental time interval in milliseconds.

- **delta** (*Optional[timedelta]*) -

    A **datetime.timedelta** object that represents the duration expressing the difference between two `date`, `time`, or `datetime` instances to microsecond resolution.

**RETURN TYPE:**

*int*

**RETURNS:**
A hybrid timestamp, which is a non-negative integer ranging from **0** to **18446744073709551615**.

## **Examples**

```python
import time
from datetime import timedelta
from pymilvus import utility

# Get a UNIX epoch timestamp
epoch1 = time.time()

# Make a hybrid timestamp
ts = utility.mkts_from_unixtime(epoch1)

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
mkts_from_hybridts(
    hybridts=ts,
    milliseconds=1000,
    delta=delta,
)
```

## Related operations

The following operations are related to `mkts_from_hybridts()`:

- [mkts_from_datetime()](mkts_from_datetime.md)

- [hybridts_to_datetime()](hybridts_to_datetime.md)

- [hybridts_to_unixtime()](hybridts_to_unixtime.md)

- [mkts_from_unixtime()](mkts_from_unixtime.md)

