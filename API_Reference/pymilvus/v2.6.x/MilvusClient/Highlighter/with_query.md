# with_query()

Adds a query-term definition to a `LexicalHighlighter` configuration for highlighting text matched by filtering expressions (e.g., TEXT_MATCH). This augments `highlight_query` with one entry describing which field and terms to highlight and which filter type produced them. Highlighting runs as post-processing and does not affect retrieval, filtering, ranking, or scoring.

## Request syntax

```python
with_query(
    field: str,
    text: str,
    query_type: str
)
```

**PARAMETERS**:

- **field** (*str*) -
The target text field name whose content should be annotated when matches are found by the filtering expression. Must correspond to a **VARCHAR** text field in the collection schema.

- **text** (*str*) -
The terms or phrase to highlight from the filtering expression. For example, **"my doc"** will highlight matches of **"my"** and **"doc"** in the specified field.

- **query_type** (*str*) -
The filtering type that provides the terms to highlight. For text-based filtering, use **"TextMatch"** to correspond to the **TEXT_MATCH** condition.

**RETURNS**:

*None*

## Examples

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType, LexicalHighlighter

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a collection with a BM25 function and load it
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=512, enable_analyzer=True, enable_match=True)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_function(Function(name="bm25", function_type=FunctionType.BM25, input_field_names=["text"], output_field_names=["sparse_vector"]))
client.create_collection(collection_name="your_collection", schema=schema)
index_params = client.prepare_index_params()
index_params.add_index(field_name="sparse_vector", index_type="SPARSE_INVERTED_INDEX", metric_type="BM25")
client.create_index(collection_name="your_collection", index_params=index_params)
client.insert(collection_name="your_collection", data=[{"id": i, "text": "my doc with important terms"} for i in range(3)])
client.load_collection(collection_name="your_collection")

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
)

highlighter.with_query(field="text", text="my doc", query_type="TextMatch")

results = client.search(
    collection_name="your_collection",
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```
