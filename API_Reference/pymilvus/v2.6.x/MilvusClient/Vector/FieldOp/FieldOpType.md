# FieldOpType

Enum alias for field-level partial-update operation types.

## Examples

Compares an operation message with the exported enum value.

```python
from pymilvus import FieldOp, FieldOpType

op = FieldOp.array_append()
assert op.op == FieldOpType.ARRAY_APPEND
```

## Notes

- REPLACE replaces the current field value.

- ARRAY_APPEND appends incoming elements to the current array.

- ARRAY_REMOVE removes every matching incoming element from the current array.

