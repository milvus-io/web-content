# FieldOpType

Enum alias for field-level partial-update operation types.

```python
class FieldPartialUpdateOp.OpType:
    REPLACE = 0
    ARRAY_APPEND = 1
    ARRAY_REMOVE = 2
    PATH_REPLACE = 3
```

**Constants:**

- **REPLACE** (0)

    Replaces the current field value.

- **ARRAY_APPEND** (1)

    Appends incoming elements to the current array.

- **ARRAY_REMOVE** (2)

    Removes every matching incoming element from the current array.

- **PATH_REPLACE** (3)

    Replaces a value selected by a path relative to the parent field. For a struct, use `[index]` to replace one complete element or `[index][child]` to replace one child.

## Example

Compares an operation message with the exported enum value.

```python
from pymilvus import FieldOp, FieldOpType

op = FieldOp.array_append()
assert op.op == FieldOpType.ARRAY_APPEND
```
