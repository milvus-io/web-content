---
id: embed-with-bm25.md
order: 5
summary: BM25 is a ranking function used in information retrieval to estimate the relevance of documents to a given search query.
title: BM25
---

# BM25

[BM25](https://en.wikipedia.org/wiki/Okapi_BM25) is a ranking function used in information retrieval to estimate the relevance of documents to a given search query. It enhances the basic term frequency approach by incorporating document length normalization and term frequency saturation. BM25 can generate sparse embeddings by representing documents as vectors of term importance scores, allowing for efficient retrieval and ranking in sparse vector spaces.

Milvus integrates with the BM25 model using the __BM25EmbeddingFunction__ class. This class handles the computation of embeddings and returns them in a format compatible with Milvus for indexing and searching. Essential to this process is building an analyzer for tokenization.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

To easily create a tokenizer, Milvus offers a default analyzer that only requires specifying the language of the text.


__Example__:

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

corpus = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

# analyzer can tokenize the text into tokens
tokens = analyzer(corpus[0])
print("tokens:", tokens)
```

__Parameters__:

- __language__ (_string_)

    The language of the text to be tokenized. Valid options are __en__ (English), __de__ (German), __fr__ (French), __ru__ (Russian), __sp__ (Spanish), __it__ (Italian), __pt__ (Portuguese), __zh__ (Chinese), __jp__ (Japanese), __kr__ (Korean).

The expected output is similar to the following:

```python
tokens: ['artifici', 'intellig', 'found', 'academ', 'disciplin', '1956']
```

The BM25 algorithm processes text by first breaking it into tokens using a built-in analyzer, as shown with English language tokens like __'artifici'__, __'intellig'__, and __'academ'__. It then gathers statistics on these tokens, evaluating their frequency and distribution across documents. The core of BM25 calculates the relevance score of each token based on its importance, with rarer tokens receiving higher scores. This concise process enables effective ranking of documents by relevance to a query.

To gather statistics on the corpus, use the __fit()__ method:

```python
# Use the analyzer to instantiate the BM25EmbeddingFunction
bm25_ef = BM25EmbeddingFunction(analyzer)

# Fit the model on the corpus to get the statstics of the corpus
bm25_ef.fit(corpus)
```

Then, use __encode_documents()__ to create embeddings for documents: 

```python
docs = [
    "The field of artificial intelligence was established as an academic subject in 1956.",
    "Alan Turing was the pioneer in conducting significant research in artificial intelligence.",
    "Originating in Maida Vale, London, Turing grew up in the southern regions of England.",
    "In 1956, artificial intelligence emerged as a scholarly field.",
    "Turing, originally from Maida Vale, London, was brought up in the south of England."
]

# Create embeddings for the documents
docs_embeddings = bm25_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", bm25_ef.dim, list(docs_embeddings)[0].shape)
```

The expected output is similar to the following:

```python
Embeddings:   (0, 0)        1.0208816705336425
  (0, 1)        1.0208816705336425
  (0, 3)        1.0208816705336425
...
  (4, 16)        0.9606986899563318
  (4, 17)        0.9606986899563318
  (4, 20)        0.9606986899563318
Sparse dim: 21 (1, 21)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = bm25_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", bm25_ef.dim, list(query_embeddings)[0].shape)
```

The expected output is similar to the following:

```python
Embeddings:   (0, 0)        0.5108256237659907
  (0, 1)        0.5108256237659907
  (0, 2)        0.5108256237659907
  (1, 6)        0.5108256237659907
  (1, 7)        0.11554389108992644
  (1, 14)        0.5108256237659907
Sparse dim: 21 (1, 21)
```

__Notes:__

When using __BM25EmbeddingFunction__, note that __encoding_queries()__ and __encoding_documents()__ operations cannot be interchanged mathematically. Therefore, there is no implemented __bm25_ef(texts)__ available.