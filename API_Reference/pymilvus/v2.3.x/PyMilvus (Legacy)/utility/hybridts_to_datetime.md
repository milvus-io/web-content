
# hybridts_to_datetime()

This operation converts a hybrid timestamp to a Python's datetime object.

## Request Syntax

```python
hybridts_to_datetime(
    hybridts: int,
    tz: datetime.timezone | None,
)
```

__PARAMETERS:__

- __hybridts__ (_int_) -

    __[REQUIRED]__

    A hybrid timestamp.

- __tz__ (_datetime.timezone_) -

    A __datetime.timezone__ object.

__RETURNS:__
A __datetime.datetime__ object.

__EXCEPTIONS:__

N/A

__EXAMPLE:__

```python
import time
from pymilvus import utility

epoch_t = time.time()

ts = utility.mkts_from_unixtime(epoch_t)

d = utility.hybridts_to_datetime(ts)
```

