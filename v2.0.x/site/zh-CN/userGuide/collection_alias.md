---
id: collection_alias.md
related_key: collection alias
summary: Learn how to manage collection alias in Milvus.
---

# Collection 别名



当前主题介绍如何管理 collection 别名。 Milvus 支持为 collection 指定唯一别名。

<div class="alert note">
Collection 别名是全局唯一的，因此你不能将相同的别名分配给不同的 collection。但是，你可以为一个 collection 分配多个别名。
</div>

以下示例基于别名 `publication`。

## 创建 collection 别名

为 collection 指定别名。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.create_alias(
collection_name = "book",
alias = "publication"
)
```

```javascript
await milvusClient.collectionManager.createAlias({
  collection_name: "book",
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.createAlias(
    CreateAliasParam.newBuilder()
    .withCollectionName("book")
    .withAlias("publication")
    .build());
```

```shell
create alias -c book -a publication
```

<table class="language-python">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>要创建别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>要创建的 collection 别名。</td>
        </tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>要创建别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>要创建的 collection 别名。</td>
        </tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>要创建别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>Alias</code></td>
            <td>要创建的 collection 别名。</td>
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
            <td>要创建别名的 collection 名称。</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>要创建的 collection 别名。</td>
        </tr>
        <tr>
            <td>-A (Optional)</td>
            <td>将别名转移到指定 collection 的标志。</td>
        </tr>
    </tbody>
</table>



## 删除 collection 别名

删除指定的别名。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.drop_alias(
alias = "publication"
)
```

```javascript
await milvusClient.collectionManager.dropAlias({
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.dropAlias(
    DropAliasParam.newBuilder()
    .withAlias("publication")
    .build());
```

```shell
delete alias -c book -a publication
```

<table class="language-python">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>alias</code></td>
            <td>要删除的 collection 别名。</td>
        </tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>alias</code></td>
            <td>要删除的 collection 别名。</td>
        </tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>Alias</code></td>
            <td>要删除的 collection 别名。</td>
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
            <td>要删除别名的 collection 名称。</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>要删除的 collection 别名。</td>
        </tr>
    </tbody>
</table>


## 更改 collection 别名

将现有的别名变更到另一个 collection 上。以下示例基于别名 `publication` 最初是为另一个 collection 创建的情况。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.alter_alias(
collection_name = "book",
alias = "publication"
)
```

```javascript
await milvusClient.collectionManager.alterAlias({
  collection_name: "book",
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.alterAlias(
    AlterAliasParam.newBuilder()
    .withCollectionName("book")
    .withAlias("publication")
    .build());
```

```shell
create alias -c book -A -a publication
```

<table class="language-python">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>要更改别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>要更改的 collection 别名。</td>
        </tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
        <tr>
            <th>参数</th>
            <th描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>要更改别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>要更改的 collection 别名。</td>
        </tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>要更改别名的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>Alias</code></td>
            <td>要更改的 collection 别名。</td>
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
            <td>要更改别名的 collection 名称。</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>要更改的 collection 别名。</td>
        </tr>
        <tr>
            <td>-A</td>
            <td>将别名转移到指定 collection 的标志。</td>
        </tr>
    </tbody>
</table>

## 使用限制

|类型|最大长度（字符）|
|---|---|
|别名长度|255|

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

