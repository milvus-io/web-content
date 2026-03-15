# hybridts_to_unixtime()

This operation converts a hybrid timestamp to a UNIX epoch timestamp

## Request Syntax

```python
hybridts_to_unixtime(
    hybridts: int,
)
```

**PARAMETERS:**

- **hybridts** (*int*) -

    **[REQUIRED]**

    A hybrid timestamp.

    A hybrid timestamp is a non-negative integer ranging from **0** to **18446744073709551615**.

**RETURN TYPE:**

*float*

**RETURNS:**
A UNIX epoch time, which is an integer that represents the time elapsed since January 1, 1970 (midnight UTC/GMT) in seconds.

## **Examples**

```python
import time
from pymilvus import utility

# Get a UNIX epoch timestamp
epoch1 = time.time()

# Make a hybrid timestamp
ts = utility.mkts_from_unixtime(epoch1)

# Converts the hybrid timestamp to a UNIX epoch timestamp
epoch2 = utility.hybridts_to_unixtime(ts)

# Asserts the equation
assert epoch1 == epoch2
```

## Related operations

The following operations are related to `hybridts_to_unixtime()`:

- [mkts_from_datetime()](https://zilliverse.feishu.cn/docx/LCQTdebkConhUqxwnk7c3EbPnWh)

- [hybridts_to_datetime()](https://zilliverse.feishu.cn/docx/EBAFdcmoKoNJISxM8i1cqXzRn9H)

- [mkts_from_hybridts()](https://zilliverse.feishu.cn/docx/GRarduHPSoFY3Yx9EWRcdcTfn1g)

- [mkts_from_unixtime()](https://zilliverse.feishu.cn/docx/ZdKEd2ua6o9AHHxKq25ctNSdncb)

