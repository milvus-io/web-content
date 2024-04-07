---
id: array_data_type.md
related_key: array_data_type
summary: Array data type in Milvus.
title: Array
---

# Array

The array data type in Milvus is an ordered collection of elements, where each element can be of a specific data type: INT, VARCHAR, BOOL, FLOAT, or DOUBLE. An array is particularly useful when you need to store multiple values in a single field.

<div class="alert note">

All elements within a single array must be of the same data type.

</div>

To demonstrate the use of array fields, we have prepared [a dataset from Kaggle](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset) containing the articles published on Medium.com from Jan 2020 to August 2020.

In this topic, we load the first 100 entities in the dataset, and organize the values of `link` and `publication` fields into an array field named `var_array` and values of `reading_time`, `claps`, and `responses` into an array field named `int_array`.

The data structure is similar as follows:

```json
{

		'title': 'The Reported Mortality Rate of Coronavirus Is Not Important',
		'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486],
		'var_array': ['https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912', 'The Startup'],
		'int_array': [13, 1100, 18]

}
```

For your reference, the code that can be used to process the example dataset is as follows:

```python
import pandas as pd

# Load the first 100 entities of the downloaded dataset
df = pd.read_csv('New_Medium_Data.csv', nrows=100)
for i in range(100):
	df['title_vector'][i] = eval(df['title_vector'][i])

# Convert the specified fields into arrays
df['var_array'] = df[['link', 'publication']].values.tolist()
df['int_array'] = df[['reading_time', 'claps', 'responses']].values.tolist()

# Drop the original columns
df = df.drop(columns=['link', 'publication', 'reading_time', 'claps', 'responses'])

# Convert the DataFrame to a list of dictionaries
data = df.to_dict('records')
```

## Define array fields

When defining an array field, specify the following arguments for elements in the array field:

- `element_type`: (Required) Data type of elements in an array. Valid values: `DataType.Int8`, `DataType.Int16`, `DataType.Int32`, `DataType.Int64`, `DataType.VARCHAR`, `DataType.BOOL`, `DataType.FLOAT`, and `DataType.DOUBLE`.
- `max_capacity`: (Required) Maximum number of elements that an array field can contain. Value range: [1, 4,096].
- `max_length`: Maximum length of strings for each VARCHAR element in an array field. This argument is required when `element_type` is set to `DataType.VARCHAR`. Value range: [1, 65,535].

```python
# Define array fields

from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType

connections.connect(host='localhost', port='19530')

# 1. define fields
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=False, max_length=100),
    FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name='title_vector', dtype=DataType.FLOAT_VECTOR, dim=768),
    # define ARRAY field with VARCHAR elements
    FieldSchema(name='var_array', dtype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=900, max_length=1000),
    # define ARRAY field with INT64 elements
    FieldSchema(name='int_array', dtype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=900)
]

# 2. enable dynamic schema in schema definition
schema = CollectionSchema(
        fields, 
        "The schema for a medium news collection", 
        enable_dynamic_field=True # Optional, defaults to 'False'.
)

# 3. reference the schema in a collection
collection = Collection("medium_articles_with_array", schema)

# 4. index the vector field
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

collection.create_index(
  field_name="title_vector", 
  index_params=index_params
)

# 5. load the collection
collection.load()
```

## Insert field values

Once the collection is created, you can insert the processed data into it.

<div class="alert note">

If `auto_id` is set to `True` for a collection, insert data without the primary key field. Otherwise, an error can occur during data insert.

</div>

```python
# Insert field values

# 1. insert data
collection.insert(data)

# 2. call the flush API to make inserted data immediately available for search
collection.flush()

print("Entity counts: ", collection.num_entities)

# Output
# Entity counts:  100
```

## Search or query with array fields

Then, you can search or query with array fields in the same manner as you would with a standard scalar field.

Search data with `int_array` to filter entities whose `reading_time` is between 10 and 20 (exclusive).

```python
# 1. search data with `int_array`
result = collection.search(
    data=data[0]['title_vector'],
    anns_field='title_vector',
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    expr='10 < int_array[0] < 20',
    output_fields=['title','int_array']
)

for hits in result:
    print("Matched IDs: ", hits.ids)
    print("Distance to the query vector: ", hits.distances)
    print("Matched articles: ")
    for hit in hits:
        print(
            "Title: ", 
            hit.entity.get("title"), 
            ", Reading time: ", 
            hit.entity.get("int_array")[0]
        )
```

Query data with `var_array` to filter entities whose `publication` is `'The Startup'`.

```python
# 2. query data with `var_array`
result = collection.query(
    expr='var_array[1] == "The Startup"',
    output_fields=['title','var_array']
)

for hits in result:
    print("Matched IDs: ", hits.id)
    print("Matched articles: ")
    for hit in hits:
        print(
            "Title: ",
            hit.entity.get("title"),
            ", Publication: ",
            hit.entity.get("var_array")[1]
        )
```

Check whether `int_array` contains element `10`.

```python
# 3. use array_contains to check whether an array contains a specific element

collection.query(
    expr='array_contains(int_array, 10)',
    output_fields=['title','int_array']
)
```

## Limits

When working with array fields, you can enclose a string value with either double quotation marks ("") or single quotation marks (''). It's important to note that Milvus stores string values in the array field as is without performing semantic escape or conversion. For instance, **'a"b'**, **"a'b"**, **'a\'b'**, and **"a\"b"** will be saved as is, while **'a'b'** and **"a"b"** will be treated as invalid values.

Assume that two array fields `int_array` and `var_array` have been defined. The following table describes the supported boolean expressions that you can use in `expr` when searching with array fields.

| Operator          | Examples                                                          | Remarks                                                                                                                                                                           |
|-------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <                 | <code>'int_array[0] < 3'</code>                                   | This expression evaluates to true if the value of <code>int_array[0]</code> is less than 3.                                                                                                    |
| >                 | <code>'int_array[0] > 5'</code>                                   | This expression evaluates to true if the value of <code>int_array[0]</code> is greater than 5.                                                                                                 |
| ==                | <code>'int_array[0] == 0'</code>                                  | This expression evaluates to true if the value of <code>int_array[0]</code> is equal to 0.                                                                                                     |
| !=                | <code>'var_array[0] != "a"'</code>                                | This expression evaluates to true if the value of <code>var_array[0]</code> is not equal to <code>"a"</code>.                                                                                                   |
| <=                | <code>'int_array[0] <= 3'</code>                                  | This expression evaluates to true if the value of <code>int_array[0]</code> is smaller than or equal to 3.                                                                                     |
| >=                | <code>'int_array[0] >= 10'</code>                                 | This expression evaluates to true if the value of <code>int_array[0]</code> is greater than or equal to 10.                                                                                    |
| in                | <code>'var_array[0] in ["str1", "str2"]'</code>                   | This expression evaluates to true if the value of <code>var_array[0]</code> is <code>"str1"</code> or <code>"str2"</code>.                                                                                               |
| not in            | <code>'int_array[0] not in [1, 2, 3]'</code>                      | This expression evaluates to true if the value of <code>int_array[0]</code> is not 1, 2, or 3.                                                                                                 |
| +, -, *, /, %, ** | <code>'int_array[0] + 100 > 200'</code>                           | This expression evaluates to true if the value of <code>int_array[0] + 100</code> is greater than 200.                                                                                         |
| like (LIKE)       | <code>'var_array[0] like "prefix%"'</code>                        | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>.                                                                                         |
| and (&&)          | <code>'var_array[0] like "prefix%" && int_array[0] <= 100'</code> | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>, and the value of <code>int_array[0]</code> is smaller than or equal to 100. |
| or (&#124;&#124;) | <code>'var_array[0] like "prefix%" &#124;&#124; int_array[0] <= 100'</code> | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>, or the value of <code>int_array[0]</code> is smaller than or equal to 100. |
| array_contains (ARRAY_CONTAINS) | <code>'array_contains(int_array, 100)'</code> | This expression evaluates to true if <code>int_array</code> contains element <code>100</code>. |
| array_contains_all (ARRAY_CONTAINS_ALL) | <code>'array_contains_all(int_array, [1, 2, 3])'</code> | This expression evaluates to true if <code>int_array</code> contains all elements <code>1</code>, <code>2</code>, and <code>3</code>. |
| array_contains_any (ARRAY_CONTAINS_ANY) | <code>'array_contains_any(var_array, ["a", "b", "c"])'</code> | This expression evaluates to true if <code>var_array</code> contains any element of <code>"a"</code>, <code>"b"</code>, and <code>"c"</code>. |
| array_length | <code>'array_length(int_array) == 10'</code> | This expression evaluates to true if <code>int_array</code> contains exactly 10 elements. |

## What’s next

- [Dynamic Schema](dynamic_schema.md)
- [JSON](json_data_type.md)
