# hybridts_to_datetime()

This operation converts a hybrid timestamp to a Python's datetime object.

## Request Syntax

```python
hybridts_to_datetime(
    hybridts: int,
    tz: datetime.timezone | None,
)
```

**PARAMETERS:**

- **hybridts** (*int*) -

    **[REQUIRED]**

    A hybrid timestamp.

- **tz** (*datetime.timezone*) -

    A **datetime.timezone** object.

**RETURNS:**
A **datetime.datetime** object.

**EXCEPTIONS:**

N/A

**EXAMPLE:**

```python
import time
from pymilvus import utility

epoch_t = time.time()

ts = utility.mkts_from_unixtime(epoch_t)

d = utility.hybridts_to_datetime(ts)
```

## Related operations

The following operations are related to `hybridts_to_datetime()`:

- [mkts_from_datetime()](mkts_from_datetime.md)

- [hybridts_to_unixtime()](hybridts_to_unixtime.md)

- [mkts_from_hybridts()](mkts_from_hybridts.md)

- [mkts_from_unixtime()](mkts_from_unixtime.md)

