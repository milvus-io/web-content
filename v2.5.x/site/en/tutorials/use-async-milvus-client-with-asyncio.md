---
id: use-async-milvus-client-with-asyncio.md
summary: AsyncMilvusClient is an asynchronous MilvusClient that offers a coroutine-based API for non-blocking access to Milvus via asyncio. In this article, you will learn about the process for calling the APIs that AsyncMilvusClient provides and the aspects to which you need to pay attention to.​
title: Question Answering System
---

# Tutorial: Use AsyncMilvusClient with asyncio​

**AsyncMilvusClient** is an asynchronous MilvusClient that offers a coroutine-based API for non-blocking access to Milvus via [asyncio](https://docs.python.org/3/library/asyncio.html). In this article, you will learn about the process for calling the APIs that AsyncMilvusClient provides and the aspects to which you need to pay attention to.​

## Overview​

Asyncio is a library for writing concurrent code using **async**/**await** syntax and serves as the foundation for Milvus' high-performance asynchronous client, which will fit into your code library running on top of asyncio.​

The methods that AsyncMilvusClient provides have identical parameter sets and behaviors as those of MilvusClient. The only difference lies in the way you call them. The following table lists the methods available in AsyncMilvusClient.​

<table data-block-token="AmGWdYXaCoByJcxxpgzcoYSjnNf"><thead><tr><th data-block-token="GZbYdgPAio7eBxxEbPlc1kJkn9e" colspan="3" rowspan="1"><p data-block-token="DU3WdeUs2owNHkxXd3HcHrb3npe"><strong><b>Client<b></strong>​</p>

</th></tr></thead><tbody><tr><td data-block-token="ZjAddjzbuoCklzx3mmUc0Dnmn0d" colspan="1" rowspan="1"><p data-block-token="JeePdGlYxoQcIIx8ayfcAmkFnHh"><code>close()</code>​</p>

</td><td data-block-token="JkDHd7rfcoPAEuxisyBcKSrgnCf" colspan="1" rowspan="1"><p data-block-token="PII3dwAJdo0a40xGJVjcuL6anNf">​</p>

</td><td data-block-token="SeINdpcGxoWVGQxzpync265fn6I" colspan="1" rowspan="1"><p data-block-token="AaltdQ77BoREKixVliCctZmJnJh">​</p>

</td></tr><tr><td data-block-token="RrQxdSQlZonGBDxjGMPcOJ6bnBd" colspan="3" rowspan="1"><p data-block-token="FtZVdDFPLo13VYxJnRFcGIUmnkg"><strong><b>Collection & Partition<b></strong>​</p>

</td></tr><tr><td data-block-token="XbaRdSsXzoR2G1xbGGYc1hH8n4b" colspan="1" rowspan="1"><p data-block-token="OLxLdEtSToewHlxf1KncPl6uncf"><code>create_collection()</code>​</p>

</td><td data-block-token="Z5OxdePrOo8VSkx53KMcz9w1nsg" colspan="1" rowspan="1"><p data-block-token="XFTRd8VEeo2i94x3BVvcoemGnOg"><code>drop_collection()</code>​</p>

</td><td data-block-token="Nw1kd6178oNWPNxxvMCcCvOhnpe" colspan="1" rowspan="1"><p data-block-token="WL22dPVKLoeAS0xQm2Iceksintc"><code>create_partition()</code>​</p>

</td></tr><tr><td data-block-token="MpDBdoG1Fow5JJxV5c5c7gtrnOc" colspan="1" rowspan="1"><p data-block-token="A3eUdKub8oXwp3xwwmncShhvnzg"><code>drop_partition()</code>​</p>

</td><td data-block-token="WlSOdmrtto3ig3xOnbacdjKznbv" colspan="1" rowspan="1"><p data-block-token="BkkEdI83eoflxkxMJ4qckUzIngb">​</p>

</td><td data-block-token="I8FOddE1Ro1ghhxP3LacLS6hn9e" colspan="1" rowspan="1"><p data-block-token="SVpidqiI7o81PZx7yD9cPE36nre">​</p>

</td></tr><tr><td data-block-token="TVWjdOxjBoc4EmxAzZxcRGmxnyt" colspan="3" rowspan="1"><p data-block-token="F3B1d3MIBoPuarxE0i8cJyMvn0d"><strong><b>Index<b></strong>​</p>

</td></tr><tr><td data-block-token="WsNvdM3pOoyiKnxiyEPcTYUvn8b" colspan="1" rowspan="1"><p data-block-token="Fcx4dfhJeoDu1JxZynvcrHokn6d"><code>create_index()</code>​</p>

</td><td data-block-token="SC0zdZ47GoBautxjbabcRbl1ncb" colspan="1" rowspan="1"><p data-block-token="CNfUdy6paojcNwxn7cMcKVljn3b"><code>drop_index()</code>​</p>

</td><td data-block-token="ZhGIdmHFRo0hyFx3Fjrc9op3n4e" colspan="1" rowspan="1"><p data-block-token="TfC1dMUo0oaNvKxHt1CcG6iSnJc"><code>load_collection()</code>​</p>

</td></tr><tr><td data-block-token="Uwa8dBg07ohd6mxjQOscCDZen5g" colspan="1" rowspan="1"><p data-block-token="E9FcdTOa1oJpIVxgAswcaWNInOh"><code>release_collection()</code>​</p>

</td><td data-block-token="X6thdNsAnoHwWbxERWqcdjUtnqh" colspan="1" rowspan="1"><p data-block-token="PtQ1dYjTLocFdrxrWNkclEnYnFi"><code>load_partitions()</code>​</p>

</td><td data-block-token="WeRkdxm1eodWWbx6eSpcvQUNn5b" colspan="1" rowspan="1"><p data-block-token="TyaLdoyHaosjAux4g0LcM6YUnAf"><code>release_partitions()</code>​</p>

</td></tr><tr><td data-block-token="VA6IdtVgWorBylxn0bLcGTJxnof" colspan="3" rowspan="1"><p data-block-token="NCuldtuz1ougMbx0g0LchQJynWd"><strong><b>Vector<b></strong>​</p>

</td></tr><tr><td data-block-token="GSiLdOmmLoj25OxLJSPcviRGnag" colspan="1" rowspan="1"><p data-block-token="TFTIdKQG2oMv5oxeflGcczbInxd"><code>insert()</code>​</p>

</td><td data-block-token="PCEHdmmB0od4yexgNEVc4vQznOe" colspan="1" rowspan="1"><p data-block-token="Ms4Nd2zRkoT3arxON9ncJRI6nQf"><code>upsert()</code>​</p>

</td><td data-block-token="LJTOd8Xg1ot97HxAwQ1cJoi2nYe" colspan="1" rowspan="1"><p data-block-token="SMzddgkAJo0etNx5PxVcWQeSnNb"><code>delete()</code>​</p>

</td></tr><tr><td data-block-token="RM7Yd67daodZ2Zx1ZyccDwjZn1g" colspan="1" rowspan="1"><p data-block-token="MM6pddY3Lo3ntkxeZIOcKXlDn5d"><code>search()</code>​</p>

</td><td data-block-token="P9GLd0lyBoWjLyxOJ8ccXWnlnHe" colspan="1" rowspan="1"><p data-block-token="LOTPdBJ4wo2lAgxnqrXcSTOunmh"><code>query()</code>​</p>

</td><td data-block-token="Sl7jddi4OoxyV9xSGgJcQ7dBnpr" colspan="1" rowspan="1"><p data-block-token="XmSodCDkNoyF76x33EFctf80nyb"><code>hybrid_search()</code>​</p>

</td></tr><tr><td data-block-token="Yd4gdN5mooupZExoLOccNnvon5e" colspan="1" rowspan="1"><p data-block-token="L1KHdF5lHoppBpxNUmrcp2JWnO6"><code>get()</code>​</p>

</td><td data-block-token="AnTkddRRLo0lC8xDi1dcUMh6nhl" colspan="1" rowspan="1"><p data-block-token="XXNjdPdcFoDnd8xIyw0cdjLLn1f">​</p>

</td><td data-block-token="HeWvd9Bqlo7kVyxIgmZcljXcnHb" colspan="1" rowspan="1"><p data-block-token="QBfhdolleoZF3rxoTzEcPhNanjd">​</p>

</td></tr></tbody></table>

If you still need the asynchronous version of any other MilvusClient method, you can submit a feature request in the [pymilvus](https://github.com/milvus-io/pymilvus) repo. Code contribution is also welcome.​

## Create an event loop​

Applications using asyncio typically use the event loop as the orchestrator for managing asynchronous tasks and I/O operations. In this tutorial, we will get an event loop from asyncio and use it as the orchestrator.​

```python
import asyncio​
import numpy as np​
from scipy.sparse import csr_matrix​
from pymilvus import MilvusClient, AsyncMilvusClient, DataType, RRFRanker, AnnSearchRequest​
​
loop = asyncio.get_event_loop()​

```

## Connect with AsyncMilvusClient​

The following example demonstrates how to connect Milvus in an asynchronous manner.​

```python
# Connect to Milvus server using AsyncMilvusClient​
async_client = AsyncMilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​

```

## Create schema​

Currently, `create_schema()` is not available in AsyncMilvusClient. Instead, we will use MilvusClient to create the schema for the collection.​

```python
schema = async_client.create_schema(​
    auto_id=False,​
    description="This is a sample schema",​
)​
​
schema.add_field("id", DataType.INT64, is_primary=True)​
schema.add_field("dense_vector", DataType.FLOAT_VECTOR, dim=5)​
schema.add_field("sparse_vector", DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field("text", DataType.VARCHAR, max_length=512)​

```

<div class="alert note">

AsyncMilvusClient calls the `create_schema()` method synchronously; therefore, you do not need to orchestrate the call using the event loop.​

</div>

## Create collection​

Now we will use the schema to create a collection. Note that you need to prefix the `await` keyword to any call to the `AsyncMilvusClient` methods and place the call inside an `async` function as follows:​

```python
async def create_my_collection(collection_name, schema):​
    if (client.has_collection(collection_name)):​
        await async_client.drop_collection(collection_name)​
​
    await async_client.create_collection(​
        collection_name=collection_name,​
        schema=schema​
    )​
​
    if (client.has_collection(collection_name)):​
        print("Collection created successfully")​
    else:​
        print("Failed to create collection")​
        ​
# Call the above function asynchronously ​
loop.run_until_complete(create_my_collection("my_collection", schema))​
​
# Output​
#​
# Collection created successfully​

```

## Create index​

You also need to create indexes for all vector fields and optional scalar fields. According to the schema defined above, there are two vector fields in the collection, and you will create indexes for them as follows:​

```python
async def create_indexes(collection_name):​
    index_params = client.prepare_index_params()​
​
    index_params.add_index(field_name="dense_vector", index_type="AUTOINDEX", metric_type="IP")​
    index_params.add_index(field_name="sparse_vector", index_type="AUTOINDEX", metric_type="IP")​
    index_params.add_index(field_name="text", index_type="AUTOINDEX")​
​
    await async_client.create_index(collection_name, index_params)​
​
# Call the above function asynchronously ​
loop.run_until_complete(create_indexes("my_collection"))​

```

## Load collection​

A collection can be loaded after the necessary fields are indexed. The following code demonstrates how to load the collection asynchronously.​

```python
async def load_my_collection(collection_name):​
    await async_client.load_collection(collection_name)​
    print(client.get_load_state(collection_name))​
    ​
# Call the above function asynchronously ​
loop.run_until_complete(load_my_collection("my_collection"))​
​
# Output​
#​
# {'state': <LoadState: Loaded>}​

```

## Insert data​

You can use the embedding models available in pymilvus to generate vector embeddings for your  texts. For details, refer to [Embedding Overview](https://milvus.io/docs/embeddings.md). In this section, we will insert randomly generated data into the collection.​

```python
async def insert_sample_data(collection_name):​
    # Randomly generated data will be used here​
    rng = np.random.default_rng(42)​
​
    def generate_random_text(length):​
        seed = "this is a seed paragraph to generate random text, which is used for testing purposes. Specifically, a random text is generated by randomly selecting words from this sentence."​
        words = seed.split()​
        return " ".join(rng.choice(words, length))​
    ​
    data = [{​
        'id': i, ​
        'dense_vector': rng.random(5).tolist(), ​
        'sparse_vector': csr_matrix(rng.random(5)), ​
        'text': generate_random_text(10)​
    } for i in range(10000)]​
​
    res = await async_client.insert(collection_name, data)​
​
    print(res)​
​
# Call the above function asynchronously ​
loop.run_until_complete(insert_sample_data("my_collection"))​
​
# Output​
#​
# {'insert_count': 10000, 'ids': [0, 1, 2, 3, ..., 9999]}​

```

## Query​

After the collection is loaded and filled with data, you can conduct searches and queries in it. In this section, you are going to find the number of entities in the `text` field starting with the word `random` in the collection named `my_collection`.​

```python
async def query_my_collection(collection_name):​
    # Find the number of entities with the `text` fields starting with the word "random" in the `my_collection` collection.​
​
    res = await async_client.query(​
        collection_name="my_collection",​
        filter='text like "%random%"',​
        output_fields=["count(*)"]​
    )​
​
    print(res) ​
    ​
# Call the above function asynchronously   ​
loop.run_until_complete(query_my_collection("my_collection"))​
​
# Output​
#​
# data: ["{'count(*)': 6802}"] ​

```

## Search​

In this section, you will conduct vector searches on the target collection's dense and sparse vector fields.​

```python
async def conduct_vector_search(collection_name, type, field):​
    # Generate a set of three random query vectors​
    query_vectors = []​
    if type == "dense":​
        query_vectors = [ rng.random(5) for _ in range(3) ]​
    ​
    if type == "sparse":​
        query_vectors = [ csr_matrix(rng.random(5)) for _ in range(3) ]​
​
    print(query_vectors)​
​
    res = await async_client.search(​
        collection_name="my_collection",​
        data=query_vectors,​
        anns_field=field,​
        output_fields=["text", field]​
    )​
​
    print(res)​
    ​
# To search against the dense vector field asynchronously ​
loop.run_until_complete(conduct_vector_search("my_collection", "dense", "dense_vector"))​
​
# To search against the sparse vector field asynchronously ​
loop.run_until_complete(conduct_vector_search("my_collection", "sparse", "sparse_vector"))​

```

The search output should list three sets of results corresponding to the specified query vectors.​

## Hybrid Search​

A hybrid search combines the results of multiple searches and reranks them to get a better recall. In this section, you are going to conduct a hybrid search using the dense and sparse vector fields.​

```python
async def conduct_hybrid_search(collection_name):​
    req_dense = AnnSearchRequest(​
        data=[ rng.random(5) for _ in range(3) ],​
        anns_field="dense_vector",​
        param={"metric_type": "IP"},​
        limit=10​
    )​
​
    req_sparse = AnnSearchRequest(​
        data=[ csr_matrix(rng.random(5)) for _ in range(3) ],​
        anns_field="sparse_vector",​
        param={"metric_type": "IP"},​
        limit=10​
    )​
​
    reqs = [req_dense, req_sparse]​
​
    ranker = RRFRanker()​
​
    res = await async_client.hybrid_search(​
        collection_name="my_collection",​
        reqs=reqs,​
        ranker=ranker,​
        output_fields=["text", "dense_vector", "sparse_vector"]​
    )​
​
    print(res)​
    ​
# Call the above function asynchronously  ​
loop.run_until_complete(conduct_hybrid_search("my_collection"))​

```

​

