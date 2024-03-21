---
id: with-iterators.md
order: 4
summary: Milvus provides search and query iterators for iterating results with a large volume of entities.
---

# With Iterators

Milvus provides search and query iterators for iterating results with a large volume of entities.

## Overview

Iterators are powerful tools that help you navigate through large datasets by using primary key values and Boolean expressions. This can significantly improve the way you retrieve data. Unlike the traditional use of __offset__ and __limit__ parameters, which may become less efficient over time, iterators offer a more scalable solution.

### Benefits of using iterators

- __Simplicity__: Eliminates the complex __offset__ and __limit__ settings.

- __Efficiency__: Provides scalable data retrieval by fetching only the data in need.

- __Consistency__: Ensures a consistent dataset size with boolean filters.

<div class="admonition note">

<p><b>notes</b></p>

<ul>

<li>This feature is available for Milvus 2.3.x or later.</li>

<li>The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.</li>

</ul>

</div>

## Preparations

The following steps repurpose the code to connect to Milvus, quickly set up a collection, and insert over 10,000 randomly generated entities into the collection.

### Step 1: Create a collection

```python
from pymilvus import MilvusClient

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)
```

### Step 2: Insert randomly generated entities

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = [ {
        "id": i, 
        "vector": [ random.uniform(-1, 1) for _ in range(5) ], 
        "color": random.choice(colors), 
        "tag": random.randint(1000, 9999) 
    } for i in range(10000) ]

for i in data:
    i["color_tag"] = "{}_{}".format(i["color"], i["tag"])

print(data[0])

# Output
#
# {
#     "id": 0,
#     "vector": [
#         0.5913205104316952,
#         -0.5474675922381218,
#         0.9433357315736743,
#         0.22479148416151284,
#         0.28294612647978834
#     ],
#     "color": "grey",
#     "tag": 5024,
#     "color_tag": "grey_5024"
# }

# 4. Insert entities to the collection
res = client.insert(
    collection_name="quick_setup",
    data=data
)

print(res)

# Output
#
# {
#     "insert_count": 10000
# }
```

## Search with iterator

Iterators make similarity searches more scalable. To search with an iterator, do as follows:

1. Initialize the search iterator to define the search parameters and output fields.

1. Use the __next()__ method within a loop to paginate through the search results.

    - If the method returns an empty array, the loop ends, and no more pages are available.

    - All results carry the specified output fields.

1. Manually call the __close()__ method to close the iterator once all data has been retrieved.

```python
from pymilvus import Collection

# 1. Get the prepared collection
collection = Collection("quick_setup")

# 2. Set up the search parameters
search_params = {
    "metric_type": "IP",
    "params": {}
}

# 3. Initialize a search iterator
iterator = collection.search_iterator(
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    anns_field="vector",
    batch_size=10, # Controls the size of the return each time you call next()
    param=search_params,
    output_fields=["color_tag"]
)

# 4. Iterate the search results
results = []

while True:
    result = iterator.next()
    if len(result) == 0:
        iterator.close()
        break;
        
    results.extend(result)
    
# 5. Check the search results
print(len(results))

print(results[:3])
```

## Query with an iterator

```python
# 6. Initialize a query iterator
iterator = collection.query_iterator(
    batch_size=10, # Controls the size of the return each time you call next()
    expr="color_tag like \"brown_8\""
    output_fields=["color_tag"]
)

# 7. Iterator the query results
results = []

while True:
    result = iterator.next()
    if len(result) == 0:
        iterator.close()
        break;
        
    results.extend(result)
    
# 8. Check the search results
print(len(results))

print(results[:3])
```
