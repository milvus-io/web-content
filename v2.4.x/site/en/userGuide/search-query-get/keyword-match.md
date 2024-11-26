---
id: keyword-match.md
summary: "Keyword match in Milvus enables precise document retrieval based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.​"
title: Keyword Match​
---

# Keyword Match​

Keyword match in Milvus enables precise document retrieval based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.​

<div class="alert note">

Keyword match focuses on finding exact occurrences of the query terms, without scoring the relevance of the matched documents. If you want to retrieve the most relevant documents based on the semantic meaning and importance of the query terms, we recommend you use [​Full Text Search](full-text-search.md).​

</div>

## Overview

Milvus integrates [Tantivy](https://github.com/quickwit-oss/tantivy) to power its underlying inverted index and keyword search. For each text entry, Milvus indexes it following the procedure:​

1. [Analyzer](analyzer-overview.md): The analyzer processes input text by tokenizing it into individual words, or tokens, and then applying filters as needed. This allows Milvus to build an index based on these tokens.​

2. [Indexing](index-scalar-fields.md): After text analysis, Milvus creates an inverted index that maps each unique token to the documents containing it.​

When a user performs a keyword match, the inverted index is used to quickly retrieve all documents containing the keywords. This is much faster than scanning through each document individually.​

![Keyword Match](../../../assets/keyword-match.png)

## Enable keyword match

Keyword match works on the `VARCHAR` field type, which is essentially the string data type in Milvus. To enable keyword match, set both `enable_analyzer` and `enable_match` to `True` and then optionally configure an analyzer for text analysis when defining your collection schema.​

### Set `enable_analyzer` and `enable_match`​

To enable keyword match for a specific `VARCHAR` field, set both the `enable_analyzer` and `enable_match` parameters to `True` when defining the field schema. This instructs Milvus to tokenize text and create an inverted index for the specified field, allowing fast and efficient keyword matches.​

```python
from pymilvus import MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=True, enable_dynamic_field=False)​
​
schema.add_field(​
    field_name='text', ​
    datatype=DataType.VARCHAR, ​
    max_length=1000, ​
    enable_analyzer=True, # Whether to enable text analysis for this field​
    enable_match=True # Whether to enable text match​
)​

```

### Optional: Configure an analyzer​

The performance and accuracy of keyword matching depend on the selected analyzer. Different analyzers are tailored to various languages and text structures, so choosing the right one can significantly impact search results for your specific use case.​

By default, Milvus uses the `standard` analyzer, which tokenizes text based on whitespace and punctuation, removes tokens longer than 40 characters, and converts text to lowercase. No additional parameters are needed to apply this default setting. For more information, refer to [​Standard](standard-analyzer.md).​

In cases where a different analyzer is required, you can configure one using the `analyzer_params` parameter. For example, to apply the `english` analyzer for processing English text:​

```python
analyzer_params={​
    "type": "english"​
}​
​
schema.add_field(​
    field_name='text', ​
    datatype=DataType.VARCHAR, ​
    max_length=200, ​
    enable_analyzer=True，​
    analyzer_params=analyzer_params,​
    enable_match=True, ​
)​

```

Milvus also provides various other analyzers suited to different languages and scenarios. For more details, refer to [​Overview](analyzer-overview.md).​

## Use keyword match

Once you have enabled keyword match for a VARCHAR field in your collection schema, you can perform keyword matches using the `TEXT_MATCH` expression.​

### TEXT_MATCH expression syntax​

The `TEXT_MATCH` expression is used to specify the field and the keywords to search for. Its syntax is as follows:​

```python
TEXT_MATCH(field_name, text)​

```

- `field_name`: The name of the VARCHAR field to search for.​

- `text`: The keywords to search for. Multiple keywords can be separated by spaces or other appropriate delimiters based on the language and configured analyzer.​

By default, `TEXT_MATCH` uses the **OR** matching logic, meaning it will return documents that contain any of the specified keywords. For example, to search for documents containing the keywords `machine` or `deep` in the `text` field, use the following expression:​

```python
filter = "TEXT_MATCH(text, 'machine deep')"​

```

You can also combine multiple `TEXT_MATCH` expressions using logical operators to perform **AND** matching. For example, to search for documents containing both `machine` and `deep` in the `text` field, use the following expression:​

```python
filter = "TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'deep')"​

```

### Search with keyword match​

Keyword match can be used in combination with vector similarity search to narrow the search scope and improve search performance. By filtering the collection using keyword match before vector similarity search, you can reduce the number of documents that need to be searched, resulting in faster query times.​

In this example, the `filter` expression filters the search results to only include documents that match the specified keywords `keyword1` or `keyword2`. The vector similarity search is then performed on this filtered subset of documents.​

```python
# Match entities with `keyword1` or `keyword2`​
filter = "TEXT_MATCH(text, 'keyword1 keyword2')"​
​
# Assuming 'embeddings' is the vector field and 'text' is the VARCHAR field​
result = MilvusClient.search(​
    collection_name="YOUR_COLLECTION_NAME", # Your collection name​
    anns_field="embeddings", # Vector field name​
    data=[query_vector], # Query vector​
    filter=filter,​
    search_params={"params": {"nprobe": 10}},​
    limit=10, # Max. number of results to return​
    output_fields=["id", "text"] # Fields to return​
)​

```

### Query with keyword match​

Keyword match can also be used for scalar filtering in query operations. By specifying a `TEXT_MATCH` expression in the `expr` parameter of the `query()` method, you can retrieve documents that match the given keywords.​

The example below retrieves documents where the `text` field contains both keywords `keyword1` and `keyword2`.​

```python
# Match entities with both `keyword1` and `keyword2`​
filter = "TEXT_MATCH(text, 'keyword1') and TEXT_MATCH(text, 'keyword2')"​
​
result = MilvusClient.query(​
    collection_name="YOUR_COLLECTION_NAME",​
    filter=filter, ​
    output_fields=["id", "text"]​
)​

```

## Considerations

- Enabling keyword matching for a field triggers the creation of an inverted index, which consumes storage resources. Consider storage impact when deciding to enable this feature, as it varies based on text size, unique tokens, and the analyzer used.​

- Once you've defined an analyzer in your schema, its settings become permanent for that collection. If you decide that a different analyzer would better suit your needs, you may consider dropping the existing collection and creating a new one with the desired analyzer configuration.​