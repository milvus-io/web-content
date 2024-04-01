---
id: sparse_vector.md
summary: Learn how to use sparse vectors in Milvus.
title: Sparse Vector
---

# Sparse Vector

Sparse vectors represent words or phrases using vector embeddings where most elements are zero, with only one non-zero element indicating the presence of a specific word. Sparse vector models, such as [SPLADEv2](https://arxiv.org/abs/2109.10086), outperform dense models in out-of-domain knowledge search, keyword-awareness, and interpretability. They are particularly useful in information retrieval, natural language processing, and recommendation systems, where combining sparse vectors for recall with a large model for ranking can significantly improve retrieval results.

In Milvus, the use of sparse vectors follows a similar workflow to that of dense vectors. It involves creating a collection with a sparse vector column, inserting data, creating an index, and conducting similarity searches and scalar queries.

This topic provides a step-by-step guide to using sparse vectors in Milvus. To see sparse vectors in action, refer  to [hello_sparse](https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py).

<div class="admonition note">

<p><b>notes</b></p>

<p>Currently, the support for sparse vectors is a beta feature in 2.4.0, with plans to make it generally available in 3.0.0.</p>

</div>

## Prepare sparse vector embeddings

To use sparse vectors in Milvus, prepare vector embeddings in one of the supported formats:

- __Sparse Matrices__: Utilize the [scipy.sparse](https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse) class family to represent your sparse embeddings. This method is efficient for handling large-scale, high-dimensional data.

- __List of Dictionaries__: Represent each sparse embedding as a dictionary, structured as `{dimension_index: value, ...}`, where each key-value pair represents the dimension index and its corresponding value.

    Example:

    ```python
    {2: 0.33, 98: 0.72, ...}
    ```

- __List of Iterables of Tuples__: Similar to the list of dictionaries, but use an iterable of tuples, `(dimension_index, value)]`, to specify only the non-zero dimensions and their values.

    Example:

    ```python
    [(2, 0.33), (98, 0.72), ...]
    ```

<div class="admonition note">

<p><b>notes</b></p>

<p>The vector dimensions must be of Python <code>int</code> or <code>numpy.integer</code> type, and the values must be of Python <code>float</code> or <code>numpy.floating</code> type.</p>

</div>

To generate embeddings, the pymilvus library provides a built-in `model` package, which offers a range of functionalities for embedding generation. For details, refer to [Embeddings](embeddings.md).

## Create a collection with a sparse vector field

To create a collection with a sparse vector field in Milvus, set the __datatype__ of the sparse vector field to __DataType.SPARSE_FLOAT_VECTOR__. Unlike dense vectors, there is no need to specify a dimension for sparse vectors.

```python
import numpy as np
import random
from pymilvus import MilvusClient, DataType

# Create a MilvusClient instance
client = MilvusClient(uri="http://localhost:19530")

# Create a collection with a sparse vector field
schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="scalar_field", datatype=DataType.DOUBLE)
# For sparse vector, no need to specify dimension
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)

client.create_collection(collection_name="test_sparse_vector", schema=schema)
```

For details on common collection parameters, refer to [create_collection()
](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md).

## Insert entities with sparse vector embeddings

The following example inserts sparse embeddings into a collection by generating a random sparse matrix for 10,000 entities, each with 10,000 dimensions and a sparsity density of 0.005.

```python
# Prepare entities with sparse vector representation
rng = np.random.default_rng()

num_entities, dim = 10000, 10000

# Generate random sparse rows with an average of 25 non-zero elements per row
entities = [
    {
        "scalar_field": rng.random(),
        # To represent a single sparse vector row, you can use:
        # - Any of the scipy.sparse sparse matrices class family with shape[0] == 1
        # - Dict[int, float]
        # - Iterable[Tuple[int, float]]
        "sparse_vector": {
            d: rng.random() for d in random.sample(range(dim), random.randint(20, 30))
        },
    }
    for _ in range(num_entities)
]

# Insert entities
client.insert(collection_name="test_sparse_vector", data=entities)
```

## Index the collection

Before performing similarity searches, create an index for the collection.

```python
# Index the collection

# Prepare index params
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse_vector",
    index_name="sparse_inverted_index",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="IP",
    params={"drop_ratio_build": 0.2},
)

# Create index
client.create_index(collection_name="test_sparse_vector", index_params=index_params)
```

__Index Parameters for Sparse Vectors:__

- __index_type__: Two specific types of indexes are supported for sparse vector fields:

    - __SPARSE_INVERTED_INDEX__: An inverted index that maps each dimension to its non-zero vectors, facilitating direct access to relevant data during searches. Ideal for datasets with sparse but high-dimensional data.

    - __SPARSE_WAND__: Utilizes the Weak-AND (WAND) algorithm to quickly bypass unlikely candidates, focusing evaluation on those with higher ranking potential. Treats dimensions as terms and vectors as documents, speeding up searches in large, sparse datasets.

- __metric_type__: Only the inner product (IP) distance metric is supported for sparse vectors.

- __params__: Includes the __drop_ratio_build__ option to fine-tune the balance between efficiency and accuracy by ignoring small values during the index-building process.

For information about common index parameters, refer to [create_index()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md).

## Perform ANN search

To perform ANN searches on collections containing sparse vectors, configure parameters specific to sparse data:

- __drop_ratio_search__: fine-tunes the search process by specifying the percentage of smallest values to ignore in the query vector, balancing between search precision and performance.

```python
# Load the collection into memory
client.load_collection(collection_name="test_sparse_vector")

# Perform ANN search on sparse vectors

# for demo purpose we search for the last inserted vector
query_vector = entities[-1]["sparse_vector"]

search_params = {
    "metric_type": "IP",
    "params": {"drop_ratio_search": 0.2},
}

search_res = client.search(
    collection_name="test_sparse_vector",
    data=[query_vector],
    limit=3,
    output_fields=["pk", "scalar_field"],
    search_params=search_params,
)

for hits in search_res:
    for hit in hits:
        print(f"hit: {hit}")
        
# Output:
# hit: {'id': '448458373272710786', 'distance': 7.220192909240723, 'entity': {'pk': '448458373272710786', 'scalar_field': 0.46767865218233806}}
# hit: {'id': '448458373272708317', 'distance': 1.2287548780441284, 'entity': {'pk': '448458373272708317', 'scalar_field': 0.7315987515699472}}
# hit: {'id': '448458373272702005', 'distance': 0.9848432540893555, 'entity': {'pk': '448458373272702005', 'scalar_field': 0.9871869181562156}}
```

## Perform scalar queries

Filter entities with __scalar_field__ greater than 3:

```python
# Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name="test_sparse_vector",
    filter="scalar_field > 0.999",
)

print(filter_query_res[:2])

# Output:
# [{'pk': '448458373272701862', 'scalar_field': 0.9994093623822689, 'sparse_vector': {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {'pk': '448458373272702421', 'scalar_field': 0.9990218525410719, 'sparse_vector': {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]
```

Filter entities by primary key:

```python
# primary keys of entities that satisfy the filter
pks = [ret["pk"] for ret in filter_query_res]

# Perform a query by primary key
pk_query_res = client.query(
    collection_name="test_sparse_vector", filter=f"pk == '{pks[0]}'"
)

print(pk_query_res)

# Output:
# [{'scalar_field': 0.9994093623822689, 'sparse_vector': {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, 'pk': '448458373272701862'}]
```

## Limits

When using sparse vectors in Milvus, consider the following limits:

- Currently, only the __IP__ distance metric is supported for sparse vectors.

- For sparse vector fields, only the __SPARSE_INVERTED_INDEX__ and __SPARSE_WAND__ index types are supported.

- Currently, [range search](https://milvus.io/docs/single-vector-search.md#Range-search), [grouping search](https://milvus.io/docs/single-vector-search.md#Grouping-search), and [search iterator](https://milvus.io/docs/with-iterators.md#Search-with-iterator) are not supported for sparse vectors.

## FAQ

- __What distance metric is supported for sparse vectors?__

    Sparse vectors only support the Inner Product (IP) distance metric due to the high dimensionality of sparse vectors, which makes L2 distance and cosine distance impractical.

- __Can you explain the difference between SPARSE_INVERTED_INDEX and SPARSE_WAND, and how do I choose between them?__

    __SPARSE_INVERTED_INDEX__ is a traditional inverted index, while __SPARSE_WAND__ uses the [Weak-AND](https://dl.acm.org/doi/10.1145/956863.956944) algorithm to reduce the number of full IP distance evaluations during search. __SPARSE_WAND__ is typically faster, but its performance can decline with increasing vector density. To choose between them, conduct experiments and benchmarks based on your specific dataset and use case.

- __How should I choose the drop_ratio_build and drop_ratio_search parameters?__

    The choice of __drop_ratio_build__ and __drop_ratio_search__ depends on the characteristics of your data and your requirements for search latency/throughput and accuracy.

- __What data types are supported for sparse embeddings?__

    The dimension part must be an unsigned 32-bit integer, and the value part can be any 32-bit float.

- __Can the dimension of a sparse embedding be any discrete value within the uint32 space?__

    Yes, the dimension of a sparse embedding can be any value from 0 to 4.2 billion (maximum of __uint32__ - 1).

- __Are searches on growing segments conducted through an index or by brute force?__

    Searches on growing segments are conducted through an index of the same type as the sealed segment index. For new growing segments before the index is built, a brute force search is used.

- __Is it possible to have both sparse and dense vectors in a single collection?__

    Yes, with multiple vector type support, you can create collections with both sparse and dense vector columns and perform hybrid searches on them.

- __What are the requirements for sparse embeddings to be inserted or searched?__

    Sparse embeddings must have at least one non-zero value, and vector indices must be non-negative.

