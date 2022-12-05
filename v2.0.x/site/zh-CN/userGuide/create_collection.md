---
id: create_collection.md
related_key: create collection
summary: Learn how to create a collection in Milvus.

---

# 创建 Collection

本主题介绍如何在 Milvus 创建 collection

一个 collection 包含一个或者多个分区，在创建新的 collection 时，Milvus 会创建一个默认分区，更多信息请查看[Glossary - Collection](glossary.md#Collection)

下面的示例将构建一个名为 book 的两[分片](glossary.md#Sharding) collection ，其中一个名为 `book_id` 的主键字段、一个名为 `word_count` 的 INT64 标量字段和一个名为 `book_intro` 的二维浮点向量字段。实际应用程序可能会使用比示例更高维数的向量。

Milvus 支持在创建集合时设置一致性级别(当前只支持 PyMilvus)，例如，collection 的一致性级别设置为Strong，这意味着 Milvus 会在搜索或查询请求到来的确切时间点读取最新的数据视图。默认情况下，未指定一致性级别而创建的 collection 将使用有界一致性级别设置，在该级别下，当搜索或查询请求到来时，Milvus 会读取到较少被更新的数据视图（通常提前几秒）。除了在创建 collection 时，你也可以在[搜索](search.md)或[查询](query.md)时指定一致性级别(当前只支持 PyMilvus)，Milvus 支持的其它一致性级别请看[Guarantee Timestamp in Search Requests](https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md)

## 准备 Schema

<div class="alert note">
    <ul>
        <li>任何操作都需要先<a href="manage_connection.md">连接到 Milvus 服务</a></li>
        <li>创建的 collection 必须包含一个主键字段和一个向量字段。当前 Milvus 版本主键字段的数据类型只支持 INT64。</li>
    </ul>
</div>
首先，准备必要的参数，包括 field schema、collection schema 和 collection 名称

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import CollectionSchema, FieldSchema, DataType
book_id = FieldSchema(
    name="book_id", 
    dtype=DataType.INT64, 
    is_primary=True, 
    )
word_count = FieldSchema(
    name="word_count", 
    dtype=DataType.INT64,  
    )
book_intro = FieldSchema(
    name="book_intro", 
    dtype=DataType.FLOAT_VECTOR, 
    dim=2
    )
schema = CollectionSchema(
    fields=[book_id, word_count, book_intro], 
    description="Test book search"
    )
collection_name = "book"
```

```javascript
const params = {
  collection_name: "book",
  description: "Test book search"
  fields: [
    {
      name: "book_intro",
      description: "",
      data_type: 101,  // DataType.FloatVector
      type_params: {
        dim: "2",
      },
    },
	{
      name: "book_id",
      data_type: 5,   //DataType.Int64
      is_primary_key: true,
      description: "",
    },
    {
      name: "word_count",
      data_type: 5,    //DataType.Int64
      description: "",
    },
  ],
};
```

```go
var (
		collectionName = "book"
	)
schema := &entity.Schema{
    CollectionName: collectionName,
    Description:    "Test book search",
    Fields: []*entity.Field{
        {
            Name:       "book_id",
            DataType:   entity.FieldTypeInt64,
            PrimaryKey: true,
            AutoID:     false,
        },
        {
            Name:       "word_count",
            DataType:   entity.FieldTypeInt64,
            PrimaryKey: false,
            AutoID:     false,
        },
        {
            Name:     "book_intro",
            DataType: entity.FieldTypeFloatVector,
            TypeParams: map[string]string{
                "dim": "2",
            },
        },
    },
}
```

```java
FieldType fieldType1 = FieldType.newBuilder()
        .withName("book_id")
        .withDataType(DataType.Int64)
        .withPrimaryKey(true)
        .withAutoID(false)
        .build();
FieldType fieldType2 = FieldType.newBuilder()
        .withName("word_count")
        .withDataType(DataType.Int64)
        .build();
FieldType fieldType3 = FieldType.newBuilder()
        .withName("book_intro")
        .withDataType(DataType.FloatVector)
        .withDimension(2)
        .build();
CreateCollectionParam createCollectionReq = CreateCollectionParam.newBuilder()
        .withCollectionName("book")
        .withDescription("Test book search")
        .withShardsNum(2)
        .addFieldType(fieldType1)
        .addFieldType(fieldType2)
        .addFieldType(fieldType3)
        .build();
```

```shell
create collection -c book -f book_id:INT64 -f word_count:INT64 -f book_intro:FLOAT_VECTOR:2 -p book_id
```

<table class="language-python">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>FieldSchema</code></td>
            <td>需要在集合中创建的字段 schema。点击 <a href="schema.md">Schema</a> 查看更多信息</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>要创建的字段名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>dtype</code></td>
            <td>需要创建字段的数据类型</td>
            <td>对于主键字段:
                <ul>
                    <li><code>DataType.INT64</code> (numpy.int64)</li>
                </ul>
                对于标量字段:
                <ul>
                    <li><code>DataType.BOOL</code> (Boolean)</li>
                    <li><code>DataType.INT64</code> (numpy.int64)</li>
                    <li><code>DataType.FLOAT</code> (numpy.float32)</li>
                    <li><code>DataType.DOUBLE</code> (numpy.double)</li>
                </ul>
                对于向量字段:
                <ul>
                    <li><code>BINARY_VECTOR</code> (二进制向量)</li>
                    <li><code>FLOAT_VECTOR</code> (浮点型向量)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>is_primary</code> (主键字段必填)</td>
            <td>控制字段是否为主键字段</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>auto_id</code> (主键字段必填)</td>
            <td>控制是否启动自动分配 ID（主键）</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>dim</code> (向量字段必填)</td>
            <td>向量的维度</td>
            <td>[1, 32,768]</td>
        </tr>
        <tr>
            <td><code>描述</code> (可选)</td>
            <td>字段描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>CollectionSchema</code></td>
        <td>需要创建的 collection schema. 点击 <a href="schema.md">Schema</a> 查看更多</td>
        <td>N/A</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>需要创建的 collection 字段</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>描述</code> (可选)</td>
            <td>需要创建的 collection 描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>collection_name</code></td>
            <td>需要创建的 collection 名称</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>



<table class="language-go">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collectionName</code></td>
            <td>需要创建的 collection 名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>描述</code></td>
            <td>需要创建的 collection 描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>Fields</code></td>
            <td>需要在集合中创建的字段 schema。点击 <a href="schema.md">Schema</a> 查看更多信息</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>Name</code></td>
            <td>要创建的字段名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>DataType</code></td>
            <td>需要创建字段的数据类型</td>
            <td>对于主键字段:
                <ul>
                    <li><code>entity.FieldTypeInt64</code> (numpy.int64)</li>
                </ul>
                对于标量字段:
                <ul>
                    <li><code>entity.FieldTypeBool</code> (Boolean)</li>
                    <li><code>entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code>entity.FieldTypeFloat</code> (numpy.float32)</li>
                    <li><code>entity.FieldTypeDouble</code> (numpy.double)</li>
                </ul>
                对于向量字段:
                <ul>
                    <li><code>entity.FieldTypeBinaryVector</code> (二进制向量)</li>
                    <li><code>entity.FieldTypeFloatVector</code> (浮点型向量)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>PrimaryKey</code> (主键字段必填)</td>
            <td>控制字段是否为主键字段</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>AutoID</code> (主键字段必填)</td>
            <td>控制是否启动自动分配 ID（主键）</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>dim</code> (向量字段必填)</td>
            <td>向量的维度</td>
            <td>[1, 32768]</td>
        </tr>
	</tbody>
</table>



<table class="language-javascript">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>需要创建的 collection 名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>描述</code></td>
            <td>需要创建的 collection 描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Schema of the filed and the collection to create.</td>
            <td>点击 <a href="schema.md">Schema</a> 查看更多信息</td>
        </tr>
        <tr>
            <td><code>data_type</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/types/Common.ts">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code>is_primary</code> (主键字段必填)</td>
            <td>控制字段是否为主键字段</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>auto_id</code></td>
            <td>控制是否启动自动分配 ID（主键）</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>dim</code> (向量字段必填)</td>
            <td>向量的维度</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code>描述</code> (可选)</td>
            <td>字段描述</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>


<table class="language-java">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>Name</code></td>
            <td>要创建的字段名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>描述</code></td>
            <td>需要创建的字段描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>DataType</code></td>
            <td>需要创建的字段类型</td>
            <td>对于主键字段:
                <ul>
                    <li><code>entity.FieldTypeInt64</code> (numpy.int64)</li>
                </ul>
                对于标量字段:
                <ul>
                    <li><code>entity.FieldTypeBool</code> (Boolean)</li>
                    <li><code>entity.FieldTypeInt64</code> (numpy.int64)</li>
                    <li><code>entity.FieldTypeFloat</code> (numpy.float32)</li>
                    <li><code>entity.FieldTypeDouble</code> (numpy.double)</li>
                </ul>
                对于向量字段:
                <ul>
                    <li><code>entity.FieldTypeBinaryVector</code> (Binary vector)</li>
                    <li><code>entity.FieldTypeFloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>PrimaryKey</code> (主键字段必填)</td>
            <td>控制字段是否为主键字段</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>AutoID</code></td>
            <td>控制是否启动自动分配 ID（主键）</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>Dimension</code> (向量字段必填)</td>
            <td>向量的维度</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>需要创建的 collection 名称</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>描述</code> (可选)</td>
            <td>需要创建的 collection 描述</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>ShardsNum</code></td>
            <td>需要创建的 collection 的分片数量</td>
            <td>[1,256]</td>
        </tr>
	</tbody>
</table>


<table class="language-shell">
    <thead>
        <tr>
            <th>选项</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>collection 名称</td>
        </tr>
        <tr>
            <td>-f (可指定多个)</td>
            <td>字段 schema，格式：<code>&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code></td>
        </tr>
        <tr>
            <td>-p</td>
            <td>主键字段名称</td>
        </tr>
        <tr>
            <td>-a (可选)</td>
            <td>自动生成 ID 的标志</td>
        </tr>
        <tr>
            <td>-d (可选)</td>
            <td>collection 描述</td>
        </tr>
    </tbody>
</table>
## 创建带有 schema 的 collection

然后创建一个带有强一致性级别和指定 schema 的 collection

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection(
    name=collection_name, 
    schema=schema, 
    using='default', 
    shards_num=2,
    consistency_level="Strong"
    )
```

```javascript
await milvusClient.collectionManager.createCollection(params);
```

```go
err = milvusClient.CreateCollection(
    context.Background(), // ctx
    schema,
    2, // shardNum
)
if err != nil {
    log.Fatal("failed to create collection:", err.Error())
}
```

```java
milvusClient.createCollection(createCollectionReq);
```

```shell
# 同上
```

<table class="language-python">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>using</code> (可选)</td>
            <td>通过 using 指定服务器别名，您可以选择在哪个 Milvus 服务器上创建集合。</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>shards_num</code> (可选)</td>
            <td>需要创建的 collection 的分片数量</td>
            <td>[1,256]</td>
        </tr>
        <tr>
            <td><code>consistency_level</code> (可选)</td>
            <td>要创建的集合的一致性级别。</td>
            <td>
                <ul>
                    <li><code>Strong</code></li>
                    <li><code>Bounded</code></li>
                    <li><code>Session</code></li>
                    <li><code>Eventually</code></li>
                    <li><code>Customized</code></li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>



<table class="language-go">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
            <th>选项</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>shardNum</code></td>
            <td>需要创建的 collection 的分片数量</td>
            <td>[1,256]</td>
        </tr>
    </tbody>
</table>



## 使用限制

| 类型                | 最大限制 |
| ------------------- | -------- |
| collection 名称长度 | 255 字符 |
| collection 的分区数 | 4,096    |
| 集合的字段数        | 256      |
| 集合的分片数        | 256      |



## 更多内容

- 了解更多 Milvus 的基本操作：
  - [插入数据](insert_data.md)
  - [创建 partition](create_partition.md)
  - [创建索引](build_index.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)
- 探索 Milvus SDK 的 API 参考：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)


