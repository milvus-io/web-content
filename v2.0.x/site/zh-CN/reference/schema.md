---
id: schema.md
summary: Learn how to define a schema in Milvus.
---

# Schema

Schema 用于定义 Collection 以及其 Field 的属性。

## Field schema

Field schema 是 Field 的逻辑定义。通常你需要在定义 [Collection schema](#Collection-schema) 和 [创建 collection](create_collection.md) 之前定义 Field schema。

Milvus 2.0 仅支持一个 collection 中包含一个 primary key field。

### Field schema 属性

<table class="properties">
	<thead>
	<tr>
		<th>属性</td>
		<th>描述</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>name</td>
		<td>要创建的 field 名</td>
		<td>数据类型：String<br/>强制</td>
	</tr>
	<tr>
		<td>dtype</td>
		<td>要创建的 field 数据类型</td>
		<td>强制</td>
	</tr>
    <tr>
		<td>description</td>
		<td>要创建的 field 描述</td>
		<td>数据类型：String<br/>可选</td>
	</tr>
    <tr>
		<td>is_primary</td>
		<td>是否设定该 field 为 primary key field</td>
		<td>数据类型：布尔值 (<code>true</code> 或 <code>false</code>)。<br/>对 primary key field 强制</td>
	</tr>
	<tr>
		<td>dim</td>
		<td>向量维度</td>
    <td>数据类型：整数 &isin;[1, 32768]。<br/>对向量 field 强制</td>
	</tr>
	</tbody>
</table>


## 创建 field schema

```python
from pymilvus import FieldSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
```



## 支持的 data type

`DataType` 定义 field 所包含的数据类型。不同 field 支持不同 `DataType`。

- Primary key field 支持:
  - INT8: numpy.int8
  - INT16: numpy.int16
  - INT32: numpy.int32
  - INT64: numpy.int64
- 标亮 field 支持:
  - BOOL: Boolean (`true` 或 `false`)
  - INT8: numpy.int8
  - INT16: numpy.int16
  - INT32: numpy.int32
  - INT64: numpy.int64
  - FLOAT: numpy.float32
  - DOUBLE: numpy.double
- 向量 field 支持:
  - BINARY_VECTOR: Binary vector
  - FLOAT_VECTOR: Float vector

## Collection schema

Collection schema 是 collection 的逻辑定义。通常你需要在定义 collection schema 和 [创建 collection](create_collection.md) 之前定义 [field schema](#Field-schema)。


### Collection schema 属性

<table class="properties">
	<thead>
	<tr>
		<th>属性</td>
		<th>描述</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>field</td>
		<td>要创建的 collection 中的 field</td>
		<td>强制</td>
	</tr>
    <tr>
		<td>description</td>
		<td>collection 描述</td>
		<td>数据类型：String。<br/>可选</td>
	</tr>
    <tr>
		<td>auto_id</td>
		<td>是否启用自动分配 ID (即 primary key）</td>
		<td>数据类型：Boolean (<code>true</code> 或 <code>false</code>)。<br/>可选</td>
	</tr>
	</tbody>
</table>

### 创建 collection schema

<div class="alert note">
  先定义 field schema，再定义 collection schema。
</div>

```python
from pymilvus import FieldSchema, CollectionSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=False, description="desc of a collection")
```

使用指定的 schema 创建 collection：

```python
from pymilvus import Collection
collection_name1 = "tutorial_1"
collection1 = Collection(name=collection_name1, schema=schema, using='default', shards_num=2)
```
<div class="alert note">
  你可以使用 <code>shards_num</code> 参数定义分片编号，并在 <code>using</code> 中指定 alias 来定义在哪个 Milvus server 中创建 collection。
</div>

<br/>


你也可以使用 `Collection.construct_from_dataframe` 自动从 DataFrame 生成一个 collection schema 并创建一个 collection。


```python
import pandas as pd
df = pd.DataFrame({
        "id": [i for i in range(nb)],
        "age": [random.randint(20, 40) for i in range(nb)],
        "embedding": [[random.random() for _ in range(dim)] for _ in range(nb)]
    })
collection, ins_res = Collection.construct_from_dataframe(
                                'my_collection',
                                df,
                                primary_field='id',
                                auto_id=False
                                )
```

