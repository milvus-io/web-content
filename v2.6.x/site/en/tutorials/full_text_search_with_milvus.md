---
id: full_text_search_with_milvus.md
summary: With the release of Milvus 2.5, Full Text Search enables users to efficiently search for text based on keywords or phrases, providing powerful text retrieval capabilities. This feature enhances search accuracy and can be seamlessly combined with embedding-based retrieval for hybrid search, allowing for both semantic and keyword-based results in a single query. In this notebook, we will show basic usage of full text search in Milvus.
title: Full Text Search with Milvus
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Full Text Search with Milvus

With the release of Milvus 2.5, Full Text Search enables users to efficiently search for text based on keywords or phrases, providing powerful text retrieval capabilities. This feature enhances search accuracy and can be seamlessly combined with embedding-based retrieval for hybrid search, allowing for both semantic and keyword-based results in a single query. In this notebook, we will show basic usage of full text search in Milvus.

## Preparation

### Download the dataset
The following command will download the example data used in original Anthropic [demo](https://github.com/anthropics/anthropic-cookbook/blob/main/skills/contextual-embeddings/guide.ipynb).


```shell
$ wget https://raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/codebase_chunks.json
$ wget https://raw.githubusercontent.com/anthropics/anthropic-cookbook/refs/heads/main/skills/contextual-embeddings/data/evaluation_set.jsonl
```

### Install Milvus 2.5
Check the [official installation guide](https://milvus.io/docs/install_standalone-docker-compose.md) for more details.

### Install PyMilvus
Run the following command to install PyMilvus:


```python
pip install "pymilvus[model]" -U 
```

### Define the Retriever


```python
import json

from pymilvus import (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
    RRFRanker,
)

from pymilvus.model.hybrid import BGEM3EmbeddingFunction


class HybridRetriever:
    def __init__(self, uri, collection_name="hybrid", dense_embedding_function=None):
        self.uri = uri
        self.collection_name = collection_name
        self.embedding_function = dense_embedding_function
        self.use_reranker = True
        self.use_sparse = True
        self.client = MilvusClient(uri=uri)

    def build_collection(self):
        if isinstance(self.embedding_function.dim, dict):
            dense_dim = self.embedding_function.dim["dense"]
        else:
            dense_dim = self.embedding_function.dim

        tokenizer_params = {
            "tokenizer": "standard",
            "filter": [
                "lowercase",
                {
                    "type": "length",
                    "max": 200,
                },
                {"type": "stemmer", "language": "english"},
                {
                    "type": "stop",
                    "stop_words": [
                        "a",
                        "an",
                        "and",
                        "are",
                        "as",
                        "at",
                        "be",
                        "but",
                        "by",
                        "for",
                        "if",
                        "in",
                        "into",
                        "is",
                        "it",
                        "no",
                        "not",
                        "of",
                        "on",
                        "or",
                        "such",
                        "that",
                        "the",
                        "their",
                        "then",
                        "there",
                        "these",
                        "they",
                        "this",
                        "to",
                        "was",
                        "will",
                        "with",
                    ],
                },
            ],
        }

        schema = MilvusClient.create_schema()
        schema.add_field(
            field_name="pk",
            datatype=DataType.VARCHAR,
            is_primary=True,
            auto_id=True,
            max_length=100,
        )
        schema.add_field(
            field_name="content",
            datatype=DataType.VARCHAR,
            max_length=65535,
            analyzer_params=tokenizer_params,
            enable_match=True,
            enable_analyzer=True,
        )
        schema.add_field(
            field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR
        )
        schema.add_field(
            field_name="dense_vector", datatype=DataType.FLOAT_VECTOR, dim=dense_dim
        )
        schema.add_field(
            field_name="original_uuid", datatype=DataType.VARCHAR, max_length=128
        )
        schema.add_field(field_name="doc_id", datatype=DataType.VARCHAR, max_length=64)
        schema.add_field(
            field_name="chunk_id", datatype=DataType.VARCHAR, max_length=64
        ),
        schema.add_field(field_name="original_index", datatype=DataType.INT32)

        functions = Function(
            name="bm25",
            function_type=FunctionType.BM25,
            input_field_names=["content"],
            output_field_names="sparse_vector",
        )

        schema.add_function(functions)

        index_params = MilvusClient.prepare_index_params()
        index_params.add_index(
            field_name="sparse_vector",
            index_type="SPARSE_INVERTED_INDEX",
            metric_type="BM25",
        )
        index_params.add_index(
            field_name="dense_vector", index_type="FLAT", metric_type="IP"
        )

        self.client.create_collection(
            collection_name=self.collection_name,
            schema=schema,
            index_params=index_params,
        )

    def insert_data(self, chunk, metadata):
        embedding = self.embedding_function([chunk])
        if isinstance(embedding, dict) and "dense" in embedding:
            dense_vec = embedding["dense"][0]
        else:
            dense_vec = embedding[0]
        self.client.insert(
            self.collection_name, {"dense_vector": dense_vec, **metadata}
        )

    def search(self, query: str, k: int = 20, mode="hybrid"):

        output_fields = [
            "content",
            "original_uuid",
            "doc_id",
            "chunk_id",
            "original_index",
        ]
        if mode in ["dense", "hybrid"]:
            embedding = self.embedding_function([query])
            if isinstance(embedding, dict) and "dense" in embedding:
                dense_vec = embedding["dense"][0]
            else:
                dense_vec = embedding[0]

        if mode == "sparse":
            results = self.client.search(
                collection_name=self.collection_name,
                data=[query],
                anns_field="sparse_vector",
                limit=k,
                output_fields=output_fields,
            )
        elif mode == "dense":
            results = self.client.search(
                collection_name=self.collection_name,
                data=[dense_vec],
                anns_field="dense_vector",
                limit=k,
                output_fields=output_fields,
            )
        elif mode == "hybrid":
            full_text_search_params = {"metric_type": "BM25"}
            full_text_search_req = AnnSearchRequest(
                [query], "sparse_vector", full_text_search_params, limit=k
            )

            dense_search_params = {"metric_type": "IP"}
            dense_req = AnnSearchRequest(
                [dense_vec], "dense_vector", dense_search_params, limit=k
            )

            results = self.client.hybrid_search(
                self.collection_name,
                [full_text_search_req, dense_req],
                ranker=RRFRanker(),
                limit=k,
                output_fields=output_fields,
            )
        else:
            raise ValueError("Invalid mode")
        return [
            {
                "doc_id": doc["entity"]["doc_id"],
                "chunk_id": doc["entity"]["chunk_id"],
                "content": doc["entity"]["content"],
                "score": doc["distance"],
            }
            for doc in results[0]
        ]
```


```python
dense_ef = BGEM3EmbeddingFunction()
standard_retriever = HybridRetriever(
    uri="http://localhost:19530",
    collection_name="milvus_hybrid",
    dense_embedding_function=dense_ef,
)
```

    Fetching 30 files: 100%|██████████| 30/30 [00:00<00:00, 108848.72it/s]


### Insert the data


```python
path = "codebase_chunks.json"
with open(path, "r") as f:
    dataset = json.load(f)

is_insert = True
if is_insert:
    standard_retriever.build_collection()
    for doc in dataset:
        doc_content = doc["content"]
        for chunk in doc["chunks"]:
            metadata = {
                "doc_id": doc["doc_id"],
                "original_uuid": doc["original_uuid"],
                "chunk_id": chunk["chunk_id"],
                "original_index": chunk["original_index"],
                "content": chunk["content"],
            }
            chunk_content = chunk["content"]
            standard_retriever.insert_data(chunk_content, metadata)
```

### Test Sparse Search


```python
results = standard_retriever.search("create a logger?", mode="sparse", k=3)
print(results)
```

    [{'doc_id': 'doc_10', 'chunk_id': 'doc_10_chunk_0', 'content': 'use {\n    crate::args::LogArgs,\n    anyhow::{anyhow, Result},\n    simplelog::{Config, LevelFilter, WriteLogger},\n    std::fs::File,\n};\n\npub struct Logger;\n\nimpl Logger {\n    pub fn init(args: &impl LogArgs) -> Result<()> {\n        let filter: LevelFilter = args.log_level().into();\n        if filter != LevelFilter::Off {\n            let logfile = File::create(args.log_file())\n                .map_err(|e| anyhow!("Failed to open log file: {e:}"))?;\n            WriteLogger::init(filter, Config::default(), logfile)\n                .map_err(|e| anyhow!("Failed to initalize logger: {e:}"))?;\n        }\n        Ok(())\n    }\n}\n', 'score': 9.12518310546875}, {'doc_id': 'doc_87', 'chunk_id': 'doc_87_chunk_3', 'content': '\t\tLoggerPtr INF = Logger::getLogger(LOG4CXX_TEST_STR("INF"));\n\t\tINF->setLevel(Level::getInfo());\n\n\t\tLoggerPtr INF_ERR = Logger::getLogger(LOG4CXX_TEST_STR("INF.ERR"));\n\t\tINF_ERR->setLevel(Level::getError());\n\n\t\tLoggerPtr DEB = Logger::getLogger(LOG4CXX_TEST_STR("DEB"));\n\t\tDEB->setLevel(Level::getDebug());\n\n\t\t// Note: categories with undefined level\n\t\tLoggerPtr INF_UNDEF = Logger::getLogger(LOG4CXX_TEST_STR("INF.UNDEF"));\n\t\tLoggerPtr INF_ERR_UNDEF = Logger::getLogger(LOG4CXX_TEST_STR("INF.ERR.UNDEF"));\n\t\tLoggerPtr UNDEF = Logger::getLogger(LOG4CXX_TEST_STR("UNDEF"));\n\n', 'score': 7.0077056884765625}, {'doc_id': 'doc_89', 'chunk_id': 'doc_89_chunk_3', 'content': 'using namespace log4cxx;\nusing namespace log4cxx::helpers;\n\nLOGUNIT_CLASS(FMTTestCase)\n{\n\tLOGUNIT_TEST_SUITE(FMTTestCase);\n\tLOGUNIT_TEST(test1);\n\tLOGUNIT_TEST(test1_expanded);\n\tLOGUNIT_TEST(test10);\n//\tLOGUNIT_TEST(test_date);\n\tLOGUNIT_TEST_SUITE_END();\n\n\tLoggerPtr root;\n\tLoggerPtr logger;\n\npublic:\n\tvoid setUp()\n\t{\n\t\troot = Logger::getRootLogger();\n\t\tMDC::clear();\n\t\tlogger = Logger::getLogger(LOG4CXX_TEST_STR("java.org.apache.log4j.PatternLayoutTest"));\n\t}\n\n', 'score': 6.750633716583252}]


## Evaluation
Now that we have inserted the dataset into Milvus, we can use dense, sparse, or hybrid search to retrieve the top 5 results. You can change the `mode` and evaluate each one. We present the Pass@5 metric, which involves retrieving the top 5 results for each query and calculating the Recall.


```python
def load_jsonl(file_path: str):
    """Load JSONL file and return a list of dictionaries."""
    with open(file_path, "r") as file:
        return [json.loads(line) for line in file]


dataset = load_jsonl("evaluation_set.jsonl")
k = 5

# mode can be "dense", "sparse" or "hybrid".
mode = "hybrid"

total_query_score = 0
num_queries = 0

for query_item in dataset:

    query = query_item["query"]

    golden_chunk_uuids = query_item["golden_chunk_uuids"]

    chunks_found = 0
    golden_contents = []
    for doc_uuid, chunk_index in golden_chunk_uuids:
        golden_doc = next(
            (doc for doc in query_item["golden_documents"] if doc["uuid"] == doc_uuid),
            None,
        )
        if golden_doc:
            golden_chunk = next(
                (
                    chunk
                    for chunk in golden_doc["chunks"]
                    if chunk["index"] == chunk_index
                ),
                None,
            )
            if golden_chunk:
                golden_contents.append(golden_chunk["content"].strip())

    results = standard_retriever.search(query, mode=mode, k=5)

    for golden_content in golden_contents:
        for doc in results[:k]:
            retrieved_content = doc["content"].strip()
            if retrieved_content == golden_content:
                chunks_found += 1
                break

    query_score = chunks_found / len(golden_contents)

    total_query_score += query_score
    num_queries += 1
```


```python
print("Pass@5: ", total_query_score / num_queries)
```

    Pass@5:  0.7911386328725037

