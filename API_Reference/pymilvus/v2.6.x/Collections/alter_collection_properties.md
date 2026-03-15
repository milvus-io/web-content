# alter_collection_properties()

This operation alters the specified collection properties.

## Request Syntax

```python
alter_collection_properties(
    self, 
    collection_name: str, 
    properties: dict, 
    timeout: Optional[float] = None, 
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **properties** (*dict*) -

    The properties and their new values in a dictionary. Possible dictionary keys are as follows:

    - **collection.ttl.seconds** (*int*) -

        The time-to-live (TTL) of a collection in seconds.

    - **mmap.enabled** (*bool*) -

        Whether to enable mmap for the raw data and indexes of all fields in the collection. For details, refer to [Mmap-enabled Data Storage](https://milvus.io/docs/mmap.md).

    - **partitionkey.isolation** (bool) -

        Whether to enable partition key isolation. For details, refer to [Use Partition Key](https://milvus.io/docs/use-partition-key.md).

    - **dynamicfield.enabled** (bool) -

        Whether to enable the dynamic field. For details, refer to [Dynamic Field](https://milvus.io/docs/enable-dynamic-field.md).

    - **allow_insert_auto_id** (*str*) -

        Whether to allow a collection to accept user-provided primary key values when AutoID has been enabled for the collection.

        - When set to **"true"**: Inserts, upserts, and bulk imports use the user-provided primary key if present; otherwise, primary key values are auto-generated.

        - When set to **"false"**: User-provided primary key values are rejected or ignored and primary key values are always auto-generated. The default is **"false"**.

    - **timezone** (*str*) -

        Sets a default time zone for your collection. The value must be a valid [IANA time zone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (for example, **Asia/Shanghai**, **America/Chicago**, or **UTC**). For more information, refer to [TIMESTAMPZ Field](https://milvus.io/docs/timestamptz-field.md) and [Query](https://milvus.io/docs/get-and-scalar-query.md).

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# upsert properties
properties = {"collection.ttl.seconds": 500, "mmap.enabled": true}

client.alter_collection_properties(
    collection_name="collection_name", 
    properties = properties
)
```

