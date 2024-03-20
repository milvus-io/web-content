
# construct_from_dict()

This operation constructs a FieldSchema object from a dictionary representation.

## Request Syntax

```python
construct_from_dict(
    raw: dict
)
```

<div class="admonition note">

<p><b>notes</b></p>

<p>This is a class method. You should call it from the class instead of an instance of the class as follows:</p>
<p><code>FieldSchema.construct_from_dict()</code></p>

</div>

__PARAMETERS:__

- __raw__ (_dict_)

    A dictionary containing the raw data to construct the field schema.

__RETURN TYPE:__

_FieldSchema_

__RETURNS:__

A FieldSchema object.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import FieldSchema, DataType  

# Create a dictionary to pass to construct_from_dict 
field_dict = {   
    "name": "primary_key",    
    "type": DataType.INT64,   
    "description": "test_field_schema"
}  

# Construct a FieldSchema object from the dictionary
field = FieldSchema.construct_from_dict(field_dict)  

print(field)

# Output
# {'name': 'primary_key', 'description': 'test_field_schema', 'type': <DataType.INT64: 5>}
```

