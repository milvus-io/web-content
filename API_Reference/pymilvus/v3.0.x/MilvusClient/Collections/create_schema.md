# create_schema()

This operation creates a collection schema.

## Request syntax

```python
MilvusClient.create_schema(**kwargs) -> CollectionSchema
```

<div class="alert note">

This is a class method. You should call this method like this: `MilvusClient.create_schema()`.

</div>

**PARAMETERS:**

- **kwargs** -

    - **auto_id** (*bool*)

        Whether allows the primary field to automatically increment.

        Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    - **enable_dynamic_field** (*bool*)

        Whether allows Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.

        When you set this to **True**, Milvus  will create a field called **&#36;meta** to store any undefined fields and their values from the data that is inserted.

        <div class="alert note">
        
        If the data being inserted into the target collection includes fields that are not defined in the collection's schema, those fields will be saved in a reserved dynamic field named **&#36;meta** as key-value pairs.

        </div>

    - **primary_field** (*str*)

        The name of the primary field.

    - **partition_key_field** (*str*)

        The name of the field that serves as the partition key.

        Setting this makes Milvus manage all partitions in the current collection.

        This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

        <div class="alert note">
        
        Once a field is designated as the partition key, Milvus calculates a hash based on the partition key value of each inserted entity and saves entities in the partitions of the target collection accordingly.
        
        This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.

        </div>

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

**RETURN TYPE:**

*[CollectionSchema](../CollectionSchema/CollectionSchema.md)*

**RETURNS:**

A **[CollectionSchema](../CollectionSchema/CollectionSchema.md)** object.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

- Schema for managed collection

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create a schema
    schema = MilvusClient.create_schema(
        auto_id=False,
        enable_dynamic_field=False,
    )
    
    # 2. Add fields to schema
    schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
    
    # {
    #     'auto_id': False, 
    #     'description': '', 
    #     'fields': [
    #         {
    #             'name': 'my_id', 
    #             'description': '', 
    #             'type': <DataType.INT64: 5>, 
    #             'is_primary': True, 
    #             'auto_id': False
    #         }
    #     ]
    # }
    
    schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
    
    # {
    #     'auto_id': False, 
    #     'description': '', 
    #     'fields': [
    #         {
    #             'name': 'my_id', 
    #             'description': '', 
    #             'type': <DataType.INT64: 5>, 
    #             'is_primary': True, 
    #             'auto_id': False
    #         }, 
    #         {
    #             'name': 'my_vector', 
    #             'description': '', 
    #             'type': <DataType.FLOAT_VECTOR: 101>, 
    #             'params': {
    #                 'dim': 5
    #             }
    #         }        
    #     ]
    # }
    ```

- Schema for external collection

    ```python
    schema = MilvusClient.create_schema(
        external_source='s3://my_bucket/path/to/a/folder/',
        external_spec='{"format": "parquet"}'
    )
    
    schema.add_field(
        field_name="product_id",
        datatype=DataType.INT64,
        # highlight-next
        external_field="id" # field name in the external data file
    )
    schema.add_field(
        field_name="product_name",
        datatype=DataType.VARCHAR,
        max_length=512,
        # highlight-next
        external_field="name"
    )
    schema.add_field(
        field_name="embedding",
        datatype=DataType.FLOAT_VECTOR,
        dim=768,
        # highlight-next
        external_field="vector"
    )
    ```

    