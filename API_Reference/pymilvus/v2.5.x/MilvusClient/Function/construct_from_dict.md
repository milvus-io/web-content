# construct_from_dict()

This operation constructs a `Function` object from a dictionary representation.

## Request Syntax

```python
construct_from_dict(
    raw: dict
)
```

**PARAMETERS:**

- `raw` (*dict*)

    A dictionary containing the raw data to construct the collection schema.

**RETURN TYPE:**

*Function*

**RETURNS:**

A `Function` object.

**EXCEPTIONS:**

- `MilvusException`

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Function  

function_dict = {  
    "name": "bm25",  
    "type": "BM25",  
    "input_field_names": ["text"],  
    "output_field_names": ["score"],  
    "description": "BM25 text search function",  
}  

function = Function.construct_from_dict(function_dict)  

print(function)
```

