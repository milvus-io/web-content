# Partition

A __Partition__ instance represents a partition within a collection.

```python
class pymilvus.Partition
```

## Constructor

Constructs a partition in a collection by name, description, and other parameters. 

<div class="admonition note">

<p><b>notes</b></p>

<p>When using partitions, ensure that <strong>enable<em>partition</em>key</strong> is not set to <strong>True</strong> in the collection schema. Otherwise, an error will occur.</p>

</div>

```python
Partition(
    collection=collection, 
    name="string",
    description="string",
)
```

__PARAMETERS:__

- __collection__ (_Collection_ | _str_) - 

    __[REQUIRED]__

    The collection in which to create a partition. 

    You can either reference a __Collection__ object or its name.

    <div class="admonition note">

    <p><b>what is a collection?</b></p>

    <p>A collection collects data in a two-dimensional table with a fixed number of columns and a variable number of rows. In the table, each column corresponds to a field, and each row represents an entity.</p>
    <p>A collection can support up to 64 partitions.</p>

    </div>

- __name__ (_string_) - 

    __[REQUIRED]__

    The name of the partition to create.

- __description__ (_string_) - 

    The description of the partition to create.

__RETURN TYPE:__

_Partition_

__RETURNS:__

A __Partition__ object.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, Partition

# Get an existing collection
collection = Collection("book")

# Create a partition object in the current collection
partition = Partition(collection, "novel", "")
```
