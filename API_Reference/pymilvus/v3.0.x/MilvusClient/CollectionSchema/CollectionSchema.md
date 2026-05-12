# CollectionSchema

A **CollectionSchema** instance represents the schema of a collection. A schema sketches the structure of a collection.

```python
class pymilvus.CollectionSchema
```

## Constructor

Constructs the schema of a collection by defining fields, data types, and other parameters.

```python
CollectionSchema(
    fields: list,
    description: str
)
```

**PARAMETERS:**

- **fields** (*list*) -

    **[REQUIRED]**

    A list of **[FieldSchema](../../ORM/FieldSchema/FieldSchema.md)** objects that define the fields in the collection schema.

    <div class="alert note">
    
    A field schema represents and contains metadata for a single field, while **CollectionSchema** ties together a list of FieldSchema objects to define the full schema.

    </div>

- **description** (*string*) -

    The description of the schema.

    If a description is not provided, it will be set to an empty string.

- **external_source** (*str*) -

    The external source URI, which is similar to an AWS S3 object path.

- **external_spec** (*str*) -

    The external source specifications, which are a set of secondary parameters:

    - **format** (*str*) - 

        The format of the target source data files.

        Possible values are `parquet`, `vortex`, `lance-table`, and `iceberg-table`.

    - **snapshot_id** (*str*) -

        The ID of an Iceberg table. This applies only when `format` is `iceberg-table`.

    - **extfs** (*string*) -  

        External file system settings in a stringified JSON structure.

        Possible options are as follows:

        - **access_key_id** (*string*) -

            The access key ID of your object storage service.

        - **access_key_val** (*string*) -

            The access key value of your object storage service.

        - **cloud_provider** (*string*) -

            The cloud provider of your object storage service.

        - **region** (*string*) -

            The region of your object storage service.

        - **use_iam** (*string*) -

            Whether to use AWS IAM for bucket access authentication. 

            Possible values are `"true"` or `"false"`.

        - **iam_endpoint** (*string*) -

            The AWS IAM STS endpoint.

        - **use_ssl** (*string*) -

            Whether to use SSL to access your object storage bucket.

            Possible values are `"true"` or `"false"`.

        - **use_virtual_host** (*string*) -

            Whether to use virtual hosting for bucket access. 

            For details, refer to [this article](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html).

        - **storage_type** (*string*) -

            The storage type. Possible values is `remote`.

        - **role_arn** (*string*) -

            The AWS IAM Role ARN that is obtained from the bucket owner.

        - **external_id** (*string*) -

            The external ID obtained from the bucket owner.

        - **load_frequency** (*string*) -

            The interval at which Milvus retrieves temporary authentication credentials in seconds.

- **kwargs** -

    - **auto_id** (*bool*) -

        Whether allows the primary field to automatically increment.

        Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

        This parameter does not apply to external collections.

    - **enable_dynamic_field** (*bool*) -

        Whether allows Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.

        When you set this to **True**, Milvus and  will create a field called **&#36;meta** to store any undefined fields and their values from the data that is inserted.

        This parameter does not apply to external collections.

        <div class="alert note">
        
        If the data being inserted into the target collection includes fields that are not defined in the collection's schema, those fields will be saved in a dynamic field as key-value pairs.

        </div>

    - **primary_field** (*str*) -

        The name of the primary field.

        The value should be the name of a field listed in **fields**.

        As an alternative, you can set **is_primary** when creating a **[FieldSchema](../../ORM/FieldSchema/FieldSchema.md)** object.

        This parameter does not apply to external collections.

    - **partition_key_field** (*str*) -

        The name of the field that serves as the partition key.

        The value should be the name of a field listed in **fields**.

        Setting this makes Milvus manage all partitions in the current collection.

        As an alternative, you can set **is_partition_key** when creating a **[FieldSchema](../../ORM/FieldSchema/FieldSchema.md)** object.

        This parameter does not apply to external collections.

        <div class="alert note">
        
        Once a field is designated as the partition key, Milvus automatically creates a partition for each unique value in this field and saves entities in these partitions accordingly.
        
        This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.
        
        As an alternative, you can set **partition_key_field** when creating a **CollectionSchema** object.

        </div>

    - **partition_key_isolation** (*bool*) -

        Whether to enable partition key isolation to improve further search performance in scalar filtering on the partition key. For details, refer to [Use Partition Key Isolation](https://milvus.io/docs/use-partition-key.md#Use-Partition-Key-Isolation).

        This parameter does not apply to external collections.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

A **CollectionSchema** object.

**EXCEPTIONS:**

- **FieldsTypeException**: 

    This exception will be raised when the **fields** parameter is not a list.

- **FieldTypeException**: 

    This exception will be raised when a field in the **fields** list is not a **[FieldSchema](../../ORM/FieldSchema/FieldSchema.md)** object.

- **PrimaryKeyException:**

    This exception will be raised if

    - The **primary_field** parameter has been set but the value is not a string.

    - The **primary_field** parameter has been set but the value is not the name of any listed fields.

- **PartitionKeyException:**

    This exception will be raised if 

    - The **partition_key_field** parameter has been set but the value is not a string.

    - The **partition_key_field** parameter has been set but the value is not the name of any listed fields.

- **AutoIDException:**

    - This exception will be raised if the **auto_id** parameter has been set but the value is not a boolean.

## Examples

```python
from pymilvus import CollectionSchema, FieldSchema, DataType

# Define fields in a schema
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768
)

# Construct a schema with the predefined fields
schema = CollectionSchema(
    fields=[primary_key, vector],
    description="example_schema"
)
```

## Methods

The following are the methods of the `CollectionSchema` class:

