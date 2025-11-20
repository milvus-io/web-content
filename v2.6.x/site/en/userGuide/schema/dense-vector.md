---
id: dense-vector.md
title: "Dense Vector"
summary: "Dense vectors (often called embeddings) are the core technology that enables modern semantic search. While traditional search engines look for matching keywords, dense vectors allow you to search by meaning."
---

# Dense Vector

Dense vectors (often called embeddings) are the core technology that enables modern semantic search. While traditional search engines look for matching keywords, dense vectors allow you to search by meaning.

Consider a user searching for **"laptop for programming"**:

- **Traditional keyword search:** Looks for exact matches. It might miss a result labeled *"workstation for software engineers"* because the words strictly don't match.
- **Dense vector search:** Understands context. It identifies documents about *"developer workstations"*, *"coding"*, or *"high-performance hardware"* as semantically similar, even if the words differ.

Machine learning models (such as BERT, OpenAI embeddings, or image encoders) can convert your raw data into dense vectors:

- **Input (text):** *"Milvus is a vector database"*
- **Model processing:** → neural network layers
- **Output (vector):** [0.23, -0.15, 0.67, 0.12, ..., 0.45] (for example, 768 numbers)

Each number is a learned feature, and together they capture the semantic meaning of the input. Dense vectors are called *dense* because:

- Every dimension has a value (almost no zeros).
- All vectors have the same fixed length (for example, 768 or 1536 dimensions).
- They provide a compact representation of high-level meaning that Milvus can index and search efficiently.

## Understand and choose dense vector formats

Milvus supports these data formats for dense vectors: [FP32](https://en.wikipedia.org/wiki/Single-precision_floating-point_format), [BF16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format), [FP16](https://en.wikipedia.org/wiki/Half-precision_floating-point_format), and INT8. Each maps to different Milvus vector field types:

- `FLOAT_VECTOR` (FP32)
- `FLOAT16_VECTOR` (FP16)
- `BFLOAT16_VECTOR` (BF16)
- `INT8_VECTOR` (INT8)

All four are standard data types in modern ML frameworks. They use different bit layouts to represent numbers, which leads to different trade-offs in precision, numeric range, and memory usage.

### How the formats differ

The illustration below shows how each format allocates bits.

<img src="../../../../assets/dense-vector-formats.png" alt="Dense vector formats" width="700"/>

From this layout:

- **FP32** (single-precision float)
    - Uses 32 bits: **1 sign + 8 exponent + 23 fraction**.
    - Provides a wide numeric range and high precision, and is the traditional default for deep learning.
- **FP16** (half-precision float)
    - Uses 16 bits: **1 sign + 5 exponent + 10 fraction**.
    - Cuts memory and bandwidth in half compared to **FP32**, with a narrower range and slightly lower precision. Widely used for faster training and inference on GPUs.
- **BF16** (bfloat16)
    - Uses 16 bits: **1 sign + 8 exponent + 7 fraction**.
    - Shares the same exponent width as **FP32**, so it has a similar dynamic range but fewer fraction bits. This keeps the range of FP32 while reducing precision and memory usage. It’s now native on many AI accelerators (TPUs, modern NVIDIA GPUs, Intel CPUs).
- **INT8 (8-bit signed integer)**
    - Uses 8 bits: **1 sign + 7 value bits**, representing integers in the range **−128 to +127** (or 0–255 if unsigned).
    - There is no exponent or fraction. INT8 is typically used after quantization to dramatically reduce memory and speed up inference.

### Choose the right dense vector format

When choosing a format, consider:

- **Model output type** – what your embedding model naturally produces
- **Accuracy requirements** – how much quality drop you can tolerate
- **Resource constraints** – memory, storage, and throughput

| **Format** | **Milvus Type** | **Description** | **When to Choose** |
| --- | --- | --- | --- |
| **FP32** | `FLOAT_VECTOR` | 32-bit standard float. Highest precision and widest dynamic range; most stable similarity scores. | Model outputs float32, accuracy is critical, and memory is not a major constraint. |
| **FP16** | `FLOAT16_VECTOR` | 16-bit half float. ~50% memory/storage of FP32; good precision but smaller numeric range. | GPU-accelerated inference, need 50% memory savings, and can tolerate slight quality loss. |
| **BF16** | `BFLOAT16_VECTOR` | 16-bit half float with FP32-like exponent. Same range as FP32, fewer fraction bits → lower precision. | PyTorch/TPU/modern GPU workflows where BF16 is native, and you want FP32-like range with smaller size. |
| **INT8** | `INT8_VECTOR` | 8-bit quantized integers. Smallest footprint; lowest precision; no exponent/fraction. | 100M+ vectors, strict memory or cost budget, and you already have an INT8 quantization pipeline. |

**Note**:

- **No automatic conversion**: Milvus strictly enforces data type matching. If a field is defined as `FLOAT16_VECTOR`, you **cannot** insert FP32 vectors into it.
- **INT8 requires external quantization**: Milvus stores INT8 vectors exactly as provided. To use `INT8_VECTOR`, you must quantize your embeddings (for example, post-training quantization or vector quantization) before insertion.

## Basic operations

Working with dense vectors in Milvus typically follows the same pattern:

1. Define a dense vector field in the collection schema.
2. Insert vector data (in the chosen numeric format).
3. Create an index on the dense vector field.
4. Load the collection into memory and run semantic search on the vectors.
5. Define a dense vector field

Vector fields in Milvus store the embeddings used for similarity search. When defining one:

- Select the correct dense vector type (`FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, or `INT8_VECTOR`).
- Set `dim` to match the vector dimensionality of your model.
- Ensure the type exactly matches the insertion/search data you will use later.

<div class="filter">

<a href="#fp32">FP32</a>

<a href="#fp16">FP16</a>

<a href="#bf16">BF16</a>

<a href="#int8">INT8</a>

</div>

<div class="fp32">

```python
from pymilvus import MilvusClient, DataType
import random

COLLECTION_NAME = "demo_fp32"
DIM = 6
NUM_ENTITIES = 1000

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
# highlight-next-line
schema.add_field(field_name="dense_vector", datatype=DataType.FLOAT_VECTOR, dim=DIM)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

```

</div>

<div class="fp16">

```python
from pymilvus import MilvusClient, DataType
import numpy as np
import random

COLLECTION_NAME = "demo_fp16"
DIM = 6
NUM_ENTITIES = 1000

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
# highlight-next-line
schema.add_field(field_name="dense_vector", datatype=DataType.FLOAT16_VECTOR, dim=DIM)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

```

</div>

<div class="bf16">

```python
from pymilvus import MilvusClient, DataType
import numpy as np
import ml_dtypes
import random

COLLECTION_NAME = "demo_bf16"
DIM = 6
NUM_ENTITIES = 1000

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
# highlight-next-line
schema.add_field(field_name="dense_vector", datatype=DataType.BFLOAT16_VECTOR, dim=DIM)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

```

</div>

<div class="int8">

```python
from pymilvus import MilvusClient, DataType
import numpy as np
import random

COLLECTION_NAME = "demo_int8"
DIM = 6
NUM_ENTITIES = 1000

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
# highlight-next-line
schema.add_field(field_name="dense_vector", datatype=DataType.INT8_VECTOR, dim=DIM)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
)

```

</div>

1. Insert vector data

After creating the collection, insert your vector data into the vector field.

Milvus expects the vectors to:

- Use the same data type as defined in the schema.
- Have the same dimensionality (`dim`).

Below are examples of how to generate and insert sample data for each format.

<div class="filter">

<a href="#fp32">FP32</a>

<a href="#fp16">FP16</a>

<a href="#bf16">BF16</a>

<a href="#int8">INT8</a>

</div>

<div class="fp32">

```python
# Generate random sample data
sample_data = [
    {"dense_vector": [random.uniform(0, 10) for _ in range(DIM)]}
    for _ in range(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
print(f"Inserted {res['insert_count']} entities")

# Expected output:
# Inserted 1000 entities

```

</div>

<div class="fp16">

```python
# Generate random sample data with float16 precision
sample_data = [
    {"dense_vector": np.array([random.uniform(0, 10) for _ in range(DIM)], dtype=np.float16)}
    for _ in range(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
print(f"Inserted {res['insert_count']} entities")

# Expected output:
# Inserted 1000 entities

```

</div>

<div class="bf16">

```python
# Generate random sample data with bfloat16 precision
sample_data = [
    {"dense_vector": np.array([random.uniform(0, 10) for _ in range(DIM)], dtype=ml_dtypes.bfloat16)}
    for _ in range(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
print(f"Inserted {res['insert_count']} entities")

# Expected output:
# Inserted 1000 entities

```

</div>

<div class="int8">

```python
# Generate random sample data with int8 values (range: -128 to 127)
# Note: In practice, these should be generated by your quantization workflow
sample_data = [
    {"dense_vector": np.array([random.randint(-128, 127) for _ in range(DIM)], dtype=np.int8)}
    for _ in range(NUM_ENTITIES)
]

res = client.insert(collection_name=COLLECTION_NAME, data=sample_data)
print(f"Inserted {res['insert_count']} entities")

# Expected output:
# Inserted 1000 entities

```

</div>

1. Create index on dense vector field

To accelerate semantic search, it is mandatory to create a vector index before searches.

In this example, we use **AUTOINDEX**, which lets Milvus automatically choose optimal index parameters based on your collection and workload.

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="dense_vector",
    index_name="dense_vector_index",
    # highlight-next-line
    index_type="AUTOINDEX",
    metric_type="COSINE"
)

client.create_index(
    collection_name=COLLECTION_NAME,
    index_params=index_params,
)

```

<include target="milvus">

Notes

- `INT8_VECTOR` currently supports only the **HNSW** index.
- Alternatively, you can also set a custom index type. For a list of index types available for dense vectors, refer to [Index Explained](index-explained.md).

</include>

1. Semantic search on dense vectors

Before performing vector searches, load your collection:

```python
client.load_collection(collection_name=COLLECTION_NAME)
print(client.get_load_state(collection_name=COLLECTION_NAME))

# Expected output:
# {'state': <LoadState: Loaded>}

```

Then, run a vector search using a query vector of the same type and dimension as your stored vectors.

<div class="filter">

<a href="#fp32">FP32</a>

<a href="#fp16">FP16</a>

<a href="#bf16">BF16</a>

<a href="#int8">INT8</a>

</div>

<div class="fp32">

```python
# Generate a random query vector
query_vector = [random.uniform(0, 10) for _ in range(DIM)]

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field="dense_vector",
    limit=5,
    output_fields=["id", "dense_vector"],
)

print("Search results:")
for hits in results:
    for hit in hits:
        print(f"  ID: {hit['id']}, Distance: {hit['distance']:.4f}, Vector: {hit['entity']['dense_vector']}")

# Expected output:
# Query vector: [0.04829983311732566, 7.242046533136467, 4.749595032784661, 6.538280898507523, 2.927369010676787, 7.130210349120606]

# Search results:
#   ID: 462276891999427419, Distance: 0.9863, Vector: [0.717526912689209, 9.375789642333984, 5.504298210144043, 5.678950786590576, 4.515065670013428, 9.119729042053223]
#   ID: 462276891999428167, Distance: 0.9858, Vector: [0.3835741877555847, 6.094085693359375, 3.7625980377197266, 3.6146297454833984, 1.652050495147705, 4.706247329711914]
#   ID: 462276891999427800, Distance: 0.9810, Vector: [2.6610236167907715, 8.234763145446777, 5.404249668121338, 6.806085586547852, 2.198822259902954, 8.617210388183594]
#   ID: 462276891999428070, Distance: 0.9767, Vector: [0.7160412669181824, 7.404406547546387, 7.226160526275635, 6.292483806610107, 1.1760412454605103, 7.476434230804443]
#   ID: 462276891999427972, Distance: 0.9763, Vector: [0.7996429204940796, 7.207499027252197, 4.7528157234191895, 8.581534385681152, 3.2311313152313232, 5.160025119781494]

```

</div>

<div class="fp16">

```python
# Generate a random query vector
query_vector = np.array([random.uniform(0, 10) for _ in range(DIM)], dtype=np.float16)
print(f"\nQuery vector: {query_vector}\n")

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field="dense_vector",
    limit=5,
    output_fields=["id", "dense_vector"],
)

print("Search results:")
for hits in results:
    for hit in hits:
        print(f"  ID: {hit['id']}, Distance: {hit['distance']:.4f}, Vector: {hit['entity']['dense_vector']}")

# Expected output:
# Query vector: [4.133  0.1598 7.348  3.623  2.727  6.88  ]

# Search results:
#   ID: 462276891999429161, Distance: 0.9921, Vector: b'\xbeD\x874\xabH\x9eEhC0G'
#   ID: 462276891999428326, Distance: 0.9874, Vector: b'\xb9D\x9a=\xd4H\xa2F[D<H'
#   ID: 462276891999428783, Distance: 0.9824, Vector: b'<F\xeb:\x8dG\xacE7A.G'
#   ID: 462276891999428366, Distance: 0.9819, Vector: b'\x15E\xe3?\xecG\xf5D"@\xd2H'
#   ID: 462276891999428808, Distance: 0.9795, Vector: b'RE\xf8>HH\x17Fe>\xe8H'

```

</div>

<div class="bf16">

```python
# Generate a random query vector
query_vector = np.array([random.uniform(0, 10) for _ in range(DIM)], dtype=ml_dtypes.bfloat16)
print(f"\nQuery vector: {query_vector}\n")

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field="dense_vector",
    limit=5,
    output_fields=["id", "dense_vector"],
)

print("Search results:")
for hits in results:
    for hit in hits:
        # Convert bytes back to numpy bfloat16 array for display
        vector_bytes = hit['entity']['dense_vector']
        vector_array = np.frombuffer(vector_bytes, dtype=ml_dtypes.bfloat16)
        print(f"  ID: {hit['id']}, Distance: {hit['distance']:.4f}, Vector: {vector_array}")

# Expected output:
# Query vector: [2.85938 9 0.761719 8 9 10]

# Search results:
#   ID: 462276891999429941, Distance: 0.9969, Vector: [1.78125 8 0.121582 6.78125 7.46875 9.5]
#   ID: 462276891999429646, Distance: 0.9903, Vector: [2.51562 8.5625 0.0224609 7.625 6.875 7.03125]
#   ID: 462276891999429243, Distance: 0.9888, Vector: [0.253906 7.78125 1.17188 7.15625 8.125 8.1875]
#   ID: 462276891999429439, Distance: 0.9833, Vector: [3.78125 6.4375 1.96875 4.9375 7.59375 8.4375]
#   ID: 462276891999429986, Distance: 0.9825, Vector: [1.64062 5.0625 0.0130615 7.15625 8.4375 7.84375]

```

</div>

<div class="int8">

```python
# Generate a random query vector (int8 range: -128 to 127)
query_vector = np.array([random.randint(-128, 127) for _ in range(DIM)], dtype=np.int8)
print(f"\nQuery vector: {query_vector}\n")

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_vector],
    anns_field="dense_vector",
    limit=5,
    output_fields=["id", "dense_vector"],
)

print("Search results:")
for hits in results:
    for hit in hits:
        # Convert bytes back to numpy int8 array for display
        vector_bytes = hit['entity']['dense_vector']
        vector_array = np.frombuffer(vector_bytes, dtype=np.int8)
        print(f"  ID: {hit['id']}, Distance: {hit['distance']:.4f}, Vector: {vector_array}")

# Expected output:
# Query vector: [-72 -76 -35 -44  33 103]

# Search results:
#   ID: 462276891999430363, Distance: 0.9280, Vector: [-118  -84  -14   -6   86  126]
#   ID: 462276891999430447, Distance: 0.9222, Vector: [-101  -83  -37  -85  -31  125]
#   ID: 462276891999430628, Distance: 0.9210, Vector: [-47 -61 -33 -99  40  89]
#   ID: 462276891999430902, Distance: 0.9181, Vector: [-107  -71  -69 -105   62   80]
#   ID: 462276891999431014, Distance: 0.9179, Vector: [-109 -117  -79  -42   96   79]

```

</div>

## Next steps

Once you can store and search dense vectors, you can:

- **Combine vector and scalar filters**
    
    Add filter conditions on other fields along with vector similarity. For details, refer to [Filtered Search](filtered-search.md).
    
- **Run hybrid search**
    
    Combine multiple vector fields (for example, text + image embeddings) or mix sparse and dense vectors. See [Multi-Vector Hybrid Search](multi-vector-search.md) for details.
    

## FAQ

### Can a collection have multiple dense vector fields with different types?

Yes. Each vector field can have its own type (`FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, or `INT8_VECTOR`) and dimension. Define each field explicitly in the schema.

### Can I modify the vector type after collection creation?

No. Field data types are immutable. To change the vector type, create a new field or a new collection and migrate data.

### Does Milvus handle FP32 → FP16 or FP16 → INT8 conversion automatically?

No. Milvus stores vectors as-is. Perform any datatype conversions or quantization in your application code or preprocessing pipeline before insertion.