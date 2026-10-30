# FieldOpType

Enum alias for field-level partial-update operation types.

```python
class FieldPartialUpdateOp.OpType:
    REPLACE = 0
    ARRAY_APPEND = 1
    ARRAY_REMOVE = 2
```

**Constants:**

- **REPLACE** (0)

    Replaces the current field value.

- **ARRAY_APPEND** (1)

    Appends incoming elements to the current array.

- **ARRAY_REMOVE** (2)

    Removes every matching incoming element from the current array.

## Example

Compares an operation message with the exported enum value.

```python
from pymilvus import FieldOp, FieldOpType

op = FieldOp.array_append()
assert op.op == FieldOpType.ARRAY_APPEND
```
