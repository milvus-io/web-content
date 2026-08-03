---
id: insert-data-into-structarray-fields.md
title: "Insert Data into StructArray Fields"
summary: "Insert data into a StructArray field when each entity contains an ordered list of structured elements. In the insert payload, a StructArray field is represented as an array of objects. Each object represents one Struct element and uses the Struct subfield names defined in the collection schema."
---
# Insert Data into StructArray Fields

Insert data into a StructArray field when each entity contains an ordered list of structured elements. In the insert payload, a StructArray field is represented as an array of objects. Each object represents one Struct element and uses the Struct subfield names defined in the collection schema.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). Each entity is a technical article, and the `chunks` field stores article chunks as Struct elements.

## Before you begin

Make sure the collection schema already contains the `chunks` StructArray field.

| Field | Type | Insert value |
| --- | --- | --- |
| `doc_id` | `INT64` | Article ID. |
| `title` | `VARCHAR` | Article title. |
| `category` | `VARCHAR` | Article category. |
| `title_vector` | `FLOAT_VECTOR` | Article-level embedding. |
| `chunks` | `ARRAY` | A list of chunk objects. |

Each object in `chunks` must follow the Struct schema.

| Subfield | Type | Insert value |
| --- | --- | --- |
| `text` | `VARCHAR` | Chunk text. |
| `section` | `VARCHAR` | Section name, such as `index`, `search`, or `filter`. |
| `page` | `INT64` | Page number or logical position. |
| `quality_score` | `FLOAT` | Chunk-level score. |
| `has_code` | `BOOL` | Whether the chunk contains code. |
| `emb_list_vector` | `FLOAT_VECTOR` | Vector written for EmbeddingList search. |
| `emb` | `FLOAT_VECTOR` | Vector written for element-level search. |

<div class="alert note">

In an insert payload, `chunks` is a regular field whose value is an array of Struct objects. Inside each object, use subfield names such as `text` and `emb`. Use path syntax, such as `chunks[text]` or `chunks[emb]`, only after insertion when you create indexes, run searches, build filters, or specify output fields.

</div>

## Understand the insert payload shape

The `chunks` value is an array of Struct elements. Each element is an object whose keys are subfield names.

```json
{
  "doc_id": 1,
  "title": "StructArray indexing patterns",
  "category": "index",
  "title_vector": [0.12, 0.08, 0.32, 0.48],
  "chunks": [
    {
      "text": "Create one index for each vector subfield.",
      "section": "index",
      "page": 1,
      "quality_score": 0.96,
      "has_code": false,
      "emb_list_vector": [0.10, 0.20, 0.30, 0.40],
      "emb": [0.10, 0.20, 0.30, 0.40]
    },
    {
      "text": "Use MAX_SIM metrics for EmbeddingList search.",
      "section": "index",
      "page": 2,
      "quality_score": 0.91,
      "has_code": true,
      "emb_list_vector": [0.16, 0.24, 0.35, 0.45],
      "emb": [0.16, 0.24, 0.35, 0.45]
    }
  ]
}
```

`emb_list_vector` and `emb` are separate vector subfields because they support different search modes. EmbeddingList search treats all vectors in a StructArray field as one embedding list and returns entity-level results with `MAX_SIM*` metrics. Element-level search searches each Struct element independently and can return the matched element offset. This example stores the same vector values in both fields for simplicity. In a production application, you can store the same embeddings in both subfields when both search modes use the same chunk embedding, or store different embeddings when the two search modes use different representations.

## Insert rows

Use `client.insert()` to insert rows that contain StructArray values.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

data = [
    {
        "doc_id": 1,
        "title": "StructArray indexing patterns",
        "category": "index",
        "title_vector": [0.12, 0.08, 0.32, 0.48],
        "chunks": [
            {
                "text": "Create one index for each vector subfield.",
                "section": "index",
                "page": 1,
                "quality_score": 0.96,
                "has_code": False,
                "emb_list_vector": [0.10, 0.20, 0.30, 0.40],
                "emb": [0.10, 0.20, 0.30, 0.40],
            },
            {
                "text": "Use MAX_SIM metrics for EmbeddingList search.",
                "section": "index",
                "page": 2,
                "quality_score": 0.91,
                "has_code": True,
                "emb_list_vector": [0.16, 0.24, 0.35, 0.45],
                "emb": [0.16, 0.24, 0.35, 0.45],
            },
        ],
    },
    {
        "doc_id": 2,
        "title": "Filtered StructArray search",
        "category": "filter",
        "title_vector": [0.20, 0.18, 0.22, 0.40],
        "chunks": [
            {
                "text": "Use element_filter to match scalar conditions within the same Struct element.",
                "section": "filter",
                "page": 1,
                "quality_score": 0.93,
                "has_code": True,
                "emb_list_vector": [0.21, 0.18, 0.33, 0.44],
                "emb": [0.21, 0.18, 0.33, 0.44],
            },
            {
                "text": "MATCH_LEAST checks how many elements satisfy a predicate.",
                "section": "filter",
                "page": 2,
                "quality_score": 0.88,
                "has_code": False,
                "emb_list_vector": [0.24, 0.22, 0.31, 0.39],
                "emb": [0.24, 0.22, 0.31, 0.39],
            },
        ],
    },
    {
        "doc_id": 3,
        "title": "Element-level search with offsets",
        "category": "search",
        "title_vector": [0.33, 0.11, 0.29, 0.37],
        "chunks": [
            {
                "text": "Element-level search can return the offset of the matched Struct element.",
                "section": "search",
                "page": 1,
                "quality_score": 0.95,
                "has_code": False,
                "emb_list_vector": [0.32, 0.14, 0.28, 0.41],
                "emb": [0.32, 0.14, 0.28, 0.41],
            }
        ],
    },
]

result = client.insert(
    collection_name="tech_articles",
    data=data,
)

print(result)
```

## Insert into nullable StructArray fields

If the `chunks` field is nullable, an entity can set the entire `chunks` field to null. In Python, use `None` to represent a null value.

```python
client.insert(
    collection_name="tech_articles",
    data=[
        {
            "doc_id": 10,
            "title": "Article without chunks yet",
            "category": "draft",
            "title_vector": [0.05, 0.10, 0.15, 0.20],
            "chunks": None,
        }
    ],
)
```

When a nullable StructArray field contains a valid StructArray value, all subfields in that value should either be null or have valid values. Inserting an entity with some subfields set to null and others set to valid values results in an error.

<div class="alert note">

Warning
Nullable StructArray fields are available only in Milvus v3.0.x. If you dynamically add a StructArray field to an existing collection, the added field must be nullable, and existing entities return `null` for the new field across all its subfields.

</div>

## Validate inserted data

You can query the collection and return the StructArray field or selected subfields.

```python
rows = client.query(
    collection_name="tech_articles",
    filter="doc_id in [1, 2, 3]",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)

for row in rows:
    print(row)
```

Use StructArray field paths, such as `chunks[text]`, only when you query, search, filter, or create indexes. Insert payloads should still use nested objects under `chunks`.

## Insert rules

| Rule | Explanation |
| --- | --- |
| Use an array of objects for a StructArray field. | The value of `chunks` is a list, and each item in the list is a Struct element. |
| Use subfield names inside each Struct element. | Insert `{"text": "...", "emb": [...]}` inside `chunks`, not `{"chunks[text]": "..."}`. |
| Match the Struct schema. | Each Struct element must use the subfields defined in the Struct schema. |
| Match vector dimensions. | Vector values must match the `dim` configured for their vector subfields. |
| Respect `max_capacity`. | The number of Struct elements in one entity must not exceed the `max_capacity` of the StructArray field. |
| Use separate vector subfields for separate search modes. | If both EmbeddingList search and element-level search are required, write vector values to both vector subfields. |
| Use `null` only when the field is nullable. | Non-nullable StructArray fields require valid StructArray values. |

## Common mistakes

- Using field paths such as `chunks[text]` in insert payloads.

- Omitting required subfields from a Struct element.

- Inserting vectors with the wrong dimension.

- Inserting more Struct elements than `max_capacity` allows.

- Setting only one subfield to `null` while other subfields in the same StructArray value are valid.

- Writing vectors only to `emb_list_vector` and then trying to run element-level search on `chunks[emb]`.

- Writing vectors only to `emb` and then trying to run EmbeddingList search on `chunks[emb_list_vector]`.

## Next steps

1. To create indexes for `chunks[emb_list_vector]`, `chunks[emb]`, and scalar subfields, read [Index StructArray Fields](index-structarray-fields.md).

2. To search StructArray vector subfields, read Basic Vector Search with StructArray.

3. To review nullable behavior and version-specific limitations, read [StructArray Limits](structarray-limits.md).
