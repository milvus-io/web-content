---
id: alter-external-collection-schema.md
title: "Alter External Collection Schema"
summary: "Learn how to expose an additional field from an external data source in an existing external collection."
beta: Milvus 3.0.x
---

# Alter External Collection Schema

External data sources often evolve after you create an external collection. For example, a lakehouse table that already stores embeddings might later include a new scalar field, such as a score, category, or timestamp, that you want to return in query results or use in filters.

Instead of recreating the external collection or copying the source data into Milvus, add a Milvus field that maps to the existing field in the external data source. After adding the field, refresh the external collection so the new field can be used in queries and searches.

## Limits

- External collections currently support adding fields after creation. Other schema changes, such as dropping fields, renaming fields, changing field data types, changing vector dimensions, or remapping `external_field`, are not supported.

- You can only add a field that already exists in the external data source. This operation maps an existing external field to a Milvus field. It does not create a new field in the external data source or backfill source data.

- Adding `SPARSE_FLOAT_VECTOR` fields to an existing external collection is not supported.

- Adding StructArray fields to an existing external collection is not supported. If your external collection needs a StructArray field, define it in the collection schema when you create the collection.

## Add a field

Before adding a field to an external collection, verify that the field already exists in the external data source. Then call `add_collection_field()` to expose that field in Milvus by setting `external_field` to the field name in the external data source. Set `data_type` to the Milvus data type that matches the field in the external data source. For example, if the mapped field stores double-precision values, use `DataType.DOUBLE`.

Unlike managed collections, values for the added field are read from the external data source after you refresh the external collection.

### Add a scalar field

Use `add_collection_field()` to add a scalar field when you want to return the field in query results or use it in filters. The following example adds a `score` field that maps to the `score` field in the external data source.

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

client.add_collection_field(
    collection_name="product_embeddings",
    field_name="score",
    data_type=DataType.DOUBLE,
    nullable=True,
    # highlight-next-line
    external_field="score",
)
```

In this example, `score` is the Milvus field name and `external_field="score"` maps it to the `score` field in the external data source. Set `nullable=True` because the field is added after the collection has already been created.

### Add a vector field

You can also add a vector field if the external data source already contains the vector values. Set the vector `data_type` and `dim` to match the vector field in the external data source.

The following example adds a dense vector field named `image_embedding_v2`.

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

client.add_collection_field(
    collection_name="product_embeddings",
    field_name="image_embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    # highlight-next-line
    dim=768,
    nullable=True,
    # highlight-next-line
    external_field="image_embedding_v2",
)
```

If you plan to run vector search on the added vector field, create an index for the field before refreshing the external collection.

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="image_embedding_v2",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_index(
    collection_name="product_embeddings",
    index_params=index_params,
)
```

## Refresh the external collection

After altering an external collection schema, refresh the external collection so Milvus updates the external collection metadata and makes the schema change effective in query, search, and filter results.

```python
client.refresh_external_collection(
    collection_name="product_embeddings"
)
```
