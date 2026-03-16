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

**PARAMETERS:**

- **epoch** (*float*) -

    **[REQUIRED]**

    A UNIX epoch timestamp.

    A UNIX epoch timestamp is an integer that represents the time elapsed since January 1, 1970 (midnight UTC/GMT) in seconds.

- **milliseconds** (*float*) -
An incremental time interval in milliseconds.

- **delta** (*Optional[timedelta]*) -

    A **datetime.timedelta** object that represents the duration expressing the difference between two [`date`](https://docs.python.org/3/library/datetime.html#datetime.date), [`time`](https://docs.python.org/3/library/datetime.html#datetime.time), or [`datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime) instances to microsecond resolution.

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

- [mkts_from_datetime()](https://zilliverse.feishu.cn/docx/LCQTdebkConhUqxwnk7c3EbPnWh)

- [hybridts_to_datetime()](https://zilliverse.feishu.cn/docx/EBAFdcmoKoNJISxM8i1cqXzRn9H)

- [hybridts_to_unixtime()](https://zilliverse.feishu.cn/docx/HbMMdqtQGoQqwixsyrjcTTh0nu5)

- [mkts_from_hybridts()](https://zilliverse.feishu.cn/docx/GRarduHPSoFY3Yx9EWRcdcTfn1g)

