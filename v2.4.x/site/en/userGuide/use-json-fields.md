---
id: use-json-fields.md
title: Use JSON Fields
---

# Use JSON Fields

This guide explains how to use the JSON fields, such as inserting JSON values as well as searching and querying in JSON fields with basic and advanced operators.

<div class="admonition note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Overview

JSON is an acronym for Javascript Object Notation. It is a simple and lightweight text-based data format. The data in JSON is structured in key-value pairs. Every key is a string and it corresponds to a value that can be a number, string, boolean, list, or array. In Milvus, you can store dictionaries as a field value in collections.

For instance, the following is an example of a JSON field that stores the metadata of a published article.

```python
{
    'title': 'The Reported Mortality Rate of Coronavirus Is Not Important', 
    'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486], 
    'article_meta': {
        'link': 'https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912', 
        'reading_time': 13, 
        'publication': 'The Startup', 
        'claps': 1100, 
        'responses': 18,
        'tag_1': [4, 15, 6, 7, 9],
        'tag_2': [[2, 3, 4], [7, 8, 9], [5, 6, 1]]
    }
}
```

<div class="admonition note">

<p><b>notes</b></p>

<ul>
<li><p>Ensure that all values in a list or array are of the same data type.</p></li>
<li><p>Any nested dictionaries in a JSON field value will be considered strings.</p></li>
<li><p>Use only alphanumeric characters and underscores to name JSON keys, as other characters may cause problems with filtering or searching.</p></li>
<li>Currently, indexing JSON fields is not available, which can make filtering time-consuming. However, this limitation will be addressed in upcoming releases.</li>
</ul>

</div>

## Define JSON field

To define a JSON field, simply follow the same procedure as defining fields of other types.

```python
import os, json, time
from pymilvus import MilvusClient, DataType

COLLECTION_NAME="medium_articles_2020" # Set your collection name
DATASET_PATH="{}/../medium_articles_2020_dpr.json".format(os.path.dirname(__file__)) # Set your dataset path

# 1. Connect to cluster
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Define collection schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="title_vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="article_meta", datatype=DataType.JSON)

# 3. Define index parameters
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="title_vector",
    index_type="AUTOINDEX",
    metric_type="L2"
)

# 4. Create a collection
client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
```

## Insert field values

After creating a collection from the `CollectionSchema` object, dictionaries such as the one above can be inserted into it.

```python
# 6. Prepare data
import random

with open(DATASET_PATH) as f:
    data = json.load(f)
    list_of_rows = data['rows']

    data_rows = []
    for row in list_of_rows:
        # Remove the id field because auto-id is enabled for the primary key
        del row['id']
        # Create the article_meta field and 
        row['article_meta'] = {}
        # Move the following keys into the article_meta field
        row['article_meta']['link'] = row.pop('link')
        row['article_meta']['reading_time'] = row.pop('reading_time')
        row['article_meta']['publication'] = row.pop('publication')
        row['article_meta']['claps'] = row.pop('claps')
        row['article_meta']['responses'] = row.pop('responses')
        row['article_meta']['tag_1'] = [ random.randint(0, 40) for _ in range(5)],
        row['article_meta']['tag_2'] = [ [ random.randint(0, 10) for _ in range(3) ] for _ in range(3)]
        # Append this row to the data_rows list
        data_rows.append(row)

# 7. Insert data

res = client.insert(
    collection_name=COLLECTION_NAME,
    data=data_rows
)

print(res)

# Output
#
# Data inserted successfully! Inserted counts: 5979
```

## Search within JSON field

Once all of your data has been added, you can conduct searches using the keys in the JSON field in the same manner as you would with a standard scalar field. Simply follow these steps:

```python
# 8. Search data
result = collection.search(
    data=[data_rows[0]['title_vector']],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    # Access the keys in the JSON field
    expr='article_meta["claps"] > 30 and article_meta["reading_time"] < 10',
    # Include the JSON field in the output to return
    output_fields=["title", "article_meta"],
)

print([ list(map(lambda y: y.entity.to_dict(),  x)) for x in result ])

# Output
#
# [
#     [
#         {
#             "id": 443943328732940369,
#             "distance": 0.36103835701942444,
#             "entity": {
#                 "title": "The Hidden Side Effect of the Coronavirus",
#                 "article_meta": {
#                     "link": "https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586",
#                     "reading_time": 8,
#                     "publication": "The Startup",
#                     "claps": 83,
#                     "responses": 0
#                 }
#             }
#         },
#         {
#             "id": 443943328732940403,
#             "distance": 0.37674015760421753,
#             "entity": {
#                 "title": "Why The Coronavirus Mortality Rate is Misleading",
#                 "article_meta": {
#                     "link": "https://towardsdatascience.com/why-the-coronavirus-mortality-rate-is-misleading-cc63f571b6a6",
#                     "reading_time": 9,
#                     "publication": "Towards Data Science",
#                     "claps": 2900,
#                     "responses": 47
#                 }
#             }
#         },
#         {
#             "id": 443943328732938203,
#             "distance": 0.4162980318069458,
#             "entity": {
#                 "title": "Coronavirus shows what ethical Amazon could look like",
#                 "article_meta": {
#                     "link": "https://medium.com/swlh/coronavirus-shows-what-ethical-amazon-could-look-like-7c80baf2c663",
#                     "reading_time": 4,
#                     "publication": "The Startup",
#                     "claps": 51,
#                     "responses": 0
#                 }
#             }
#         }
#     ]
# ]

# get collection info
print("Entity counts: ", collection.num_entities)

# Output
#
# Entity counts:  5979
```

## Query with JSON keys

To access a particular key within a JSON field, you can reference the key name by including the JSON field name (such as `article_meta["claps"]`) in `expr` and include the name of the JSON field in `output_fields`. Then you can access the keys in the returned JSON value as normal dictionaries.

- Filters articles whose `tag_1` contains `4` and `14`.

    ```python
    # Solution 1
    res = client.query(
        collection_name="medium_articles_2020",
        # highlight-start
        filter='json_contains(tag_1, 4) and json_contains(tag_1, 14)',
        output_fields=["title", "tag_1"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    
    # Solution 2
    res = client.query(
        collection_name="medium_articles_2020",
        # highlight-start
        filter='json_contains_all(tag_1, [4, 14])',
        output_fields=["title", "tag_1"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filters articles whose `tag_2` contains `[2, 12]`.

    ```python
    res = client.query(
        collection_name="medium_articles_2020",
        # highlight-start
        filter='json_contains(tag_2, [2, 12])',
        output_fields=["title", "tag_2"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filters articles whose `tag_1` contains any of `5`, `7`, and `9`.

    ```python
    res = client.query(
        collection_name="medium_articles_2020",
        # highlight-start
        filter='json_contains_any(tag_1, [5, 7, 9])',
        output_fields=["title", "tag_1"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

## Reference on JSON filters

When working with JSON fields, you can either use the JSON fields as filters or some of its specific keys.

<div class="admonition note">

<p><b>notes</b></p>

<ul>
<li>Milvus stores string values in the JSON field as is without performing semantic escape or conversion. </li>
</ul>
<p>For instance, <code>'a"b'</code>, <code>"a'b"</code>, <code>'a\\\\'b'</code>, and <code>"a\\\\"b"</code> will be saved as is, while <code>'a'b'</code> and <code>"a"b"</code> will be treated as invalid values.</p>
<ul>
<li><p>To build filter expressions using a JSON field, you can utilize the keys within the field. </p></li>
<li><p>If a key's value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field.</p></li>
<li><p>If a key's value is a string, you can compare it only with another string key or a VARCHAR field.</p></li>
</ul>

</div>

### Basic Operators in JSON Fields

The following table assumes that the value of a JSON field named `json_key` has a key named `A`. Use it as a reference when constructing boolean expressions using JSON field keys.

|  __Operator__  |  __Examples__                                   |  __Remarks__                                                                                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  __<__         |  `'json_field["A"] < 3'`                        |  This expression evaluates to true if the value of `json_field["A"]` is less than `3`.                                                                                                                                                                                                                           |
|  __>__         |  `'json_field["A"] > 1'`                        |  This expression evaluates to true if the value of `json_field["A"]` is greater than `1`.                                                                                                                                                                                                                        |
|  __==__        |  `'json_field["A"] == 1'`                       |  This expression evaluates to true if the value of `json_field["A"]` is equal to `1`.                                                                                                                                                                                                                            |
|  __!=__        |  `'json_field["A"][0]' != "abc"'`               |  This expression evaluates to true if<br/> - `json_field` does not have a key named `A`.<br/> - `json_field` has a key named `A` but `json_field["A"]` is not an array.<br/> - `json_field["A"]` is an empty array.<br/> - `json_field["A"]` is an array but the first element is not `abc`.<br/> |
|  __<=__        |  `'json_field["A"] <= 5'`                       |  This expression evaluates to true if the value of `json_field["A"]` is less than or equal to `5`.                                                                                                                                                                                                               |
|  __>=__        |  `'json_field["A"] >= 1'`                       |  This expression evaluates to true if the value of `json_field["A"]` is greater than or equal to `1`.                                                                                                                                                                                                            |
|  __not__       |  `'not json_field["A"] == 1'`                   |  This expression evaluates to true if<br/> - `json_field` does not have a key named `A`.<br/> - `json_field["A"]` is not equal to `1`.<br/>                                                                                                                                                             |
|  __in__        |  `'json_field["A"] in [1, 2, 3]'`               |  This expression evaluates to true if the value of `json_field["A"]` is `1`, `2`, or `3`.                                                                                                                                                                                                                        |
|  __and (&&)__  |  `'json_field["A"] > 1 && json_field["A"] < 3'` |  This expression evaluates to true if the value of `json_field["A"]` is greater than 1 and less than `3`.                                                                                                                                                                                                        |
|  __or (\|\|)__ |  `'json_field["A"] > 1 \|\| json_field["A"] < 3'` |  This expression evaluates to true if the value of `json_field["A"]` is greater than `1` or less than `3`.                                                                                                                                                                                                       |
|  __exists__    |  `'exists json_field["A"]'`                     |  This expression evaluates to true if `json_field` does not have a key named `A`.                                                                                                                                                                                                                                |

### Advanced Operators

The following operators are specific to JSON fields:

- `json_contains(identifier, jsonExpr)`

    This operator filters entities whose identifier contains the specified JSON expression. 

    - Example 1: `{"x": [1,2,3]}`

        ```python
        json_contains(x, 1) # => True (x contains 1.)
        json_contains(x, "a") # => False (x does not contain a member "a".)
        ```

    - Example 2: `{"x", [[1,2,3], [4,5,6], [7,8,9]]}`

        ```python
        json_contains(x, [1,2,3]) # => True (x contains [1,2,3].)
        json_contains(x, [3,2,1]) # => False (x does contain a member [3,2,1].)
        ```

- `json_contains_all(identifier, jsonExpr)`

    This operator filters entities whose identifier contains all the members of the JSON expression.

    Example: `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_all(x, [1,2,8]) # => True (x contains 1, 2, and 8.)
    json_contains_all(x, [4,5,6]) # => False (x does not has a member 6.)
    ```

- `json_contains_any(identifier, jsonExpr)`

    This operator filters entities whose identifier contains any members of the JSON expression.

    Example: `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_any(x, [1,2,8]) # => True (x contains 1, 2, and 8.)
    json_contains_any(x, [4,5,6]) # => True (x contains 4 and 5.)
    json_contains_any(x, [6,9]) # => False (x contains none of 6 and 9.)
    ```
