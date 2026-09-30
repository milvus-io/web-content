---
id: embed-with-instructor.md
order: 10
summary: This article describes how to use the InstructorEmbeddingFunction to encode documents and queries using the Instructor embedding model.
title: Instructor
---

# Instructor

[Instructor](https://instructor-embedding.github.io/) is an instruction-finetuned text embedding model that can generate text embeddings tailored to any task (e.g., classification, retrieval, clustering, text evaluation, etc.) and domains (e.g., science, finance, etc.) by simply providing the task instruction, without any finetuning.

Milvus integrates with Instructor's embedding models via the InstructorEmbeddingFunction class. This class provides methods for encoding documents and queries using the Instructor embedding models and returning the embeddings as dense vectors compatible with Milvus indexing.

To use this feature, install the necessary dependencies:

```python
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the InstructorEmbeddingFunction:

```python
from pymilvus.model.dense import InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-xl", # Defaults to `hkunlp/instructor-xl`
    query_instruction="Represent the question for retrieval:",
    doc_instruction="Represent the document for retrieval:"
)
```

**Parameters**:

- `model_name` (*string*)
  
  The name of the Mistral AI embedding model to use for encoding. The value defaults to `hkunlp/instructor-xl`. For more information, refer to [Model List](https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#model-list).

- `query_instruction` (*string*)
  
  Task-specific instruction that guides the model on how to generate an embedding for a query or question.

- `doc_instruction` (*string*)
  
  Task-specific instruction that guides the model to generate an embedding for a document.

To create embeddings for documents, use the `encode_documents()` method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 1.08575663e-02, 3.87877878e-03, 3.18090729e-02, -8.12458917e-02,
       -4.68971021e-02, -5.85585833e-02, -5.95418774e-02, -8.55880603e-03,
       -5.54775111e-02, -6.08020350e-02, 1.76202394e-02, 1.06648318e-02,
       -5.89960292e-02, -7.46861771e-02, 6.60329172e-03, -4.25189249e-02,
       ...
       -1.26921125e-02, 3.01475357e-02, 8.25323071e-03, -1.88470203e-02,
        6.04814291e-03, -2.81618331e-02, 5.91602828e-03, 7.13866428e-02],
      dtype=float32)]
Dim: 768 (768,)
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded",
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 1.21721877e-02, 1.88485277e-03, 3.01732980e-02, -8.10302645e-02,
       -6.13401756e-02, -3.98149453e-02, -5.18723316e-02, -6.76784338e-03,
       -6.59285188e-02, -5.38365729e-02, -5.13435388e-03, -2.49210224e-02,
       -5.74403182e-02, -7.03031123e-02, 6.63730130e-03, -3.42259370e-02,
       ...
        7.36595877e-03, 2.85532661e-02, -1.55952033e-02, 2.13342719e-02,
        1.51187545e-02, -2.82798670e-02, 2.69396193e-02, 6.16136603e-02],
      dtype=float32)]
Dim 768 (768,)
```
