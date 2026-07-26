# replace()

Creates an explicit replacement operation for a field during an upsert.

## Request Syntax

```python
FieldOp.replace() -> FieldPartialUpdateOp
```

**RETURN TYPE:**

*FieldPartialUpdateOp*

**RETURNS:**

Operation message that selects replacement behavior. Replacement is also the default when no field operation is supplied.

## Examples

Creates the explicit replacement operation value.

```python
from pymilvus import FieldOp

op = FieldOp.replace()
print(op)
```
