# Connections

A **Connections** instance represents a pool of connections to your Milvus instances.

```python
class pymilvus.Connections
```

## Constructor

Constructs a singleton instance to manage all connections. 

<div class="admonition note">

<p><b>notes</b></p>

<p>Instead of creating a new instance of this class on your own, import the existing singleton instance as shown in the following example.</p>

</div>

## Examples

```python
from pymilvus import connections    

# Establish a connection
connections.connect(
    uri="http://localhost:19530", 
    token="root:Milvus"
)  
```

## Methods

The following are the methods of the `connections` singleton instance: