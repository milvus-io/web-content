---
id: collection_schema.md
summary: 学习如何在 Milvus 中定义 collection schema。
---

# Collection Schema

Collection schema 是 collection 的逻辑定义。通常你需要在定义 collection schema 和 [创建 collection](create.md) 之前定义 [field schema](field_schema.md)。


## Collection schema 属性

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
		<td>是否启用自动分配 ID</td>
		<td>数据类型：Boolean (<code>true</code> 或 <code>false</code>)。<br/>可选</td>
	</tr>
	</tbody>
</table>

## 创建 collection schema

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

