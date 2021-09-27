---
id: search_vector_python.md
---

# 查询向量

Milvus 支持在集合或分区中查询向量。

## 在集合中查询向量

1. 创建搜索参数。搜索参数是一个 JSON 字符串，在 Python SDK 中以字典来表示。

   ```python
   >>> search_param = {'nprobe': 16}
   ```

   <div class="alert note">
   对于不同的索引类型，搜索所需参数也有区别。所有的搜索参数都<b>必须赋值</b>。详细信息请参考 <a href="index.md">Milvus 索引类型</a>。
   </div>

2. 创建随机向量作为 `query_records` 进行搜索：

   ```python
   # Create 5 vectors of 256 dimensions.
   >>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
   >>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
   ```

   <div class="alert note">
   <ul>
   <li><code>top_k</code> 指的是向量空间中距离目标向量最近的 k 个向量。</li><li><code>top_k</code> 的范围为：[1, 1048576]。</li>
   </ul>
   </div>

## 在分区中查询向量

```python
# Create 5 vectors of 256 dimensions.
>>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=1, partition_tags=['tag01'], params=search_param)
```

<div class="alert note">
如果你不指定 <code>partition_tags</code>， Milvus 会在整个集合中搜索。
</div>


## 常见问题

<details>
<summary><font color="#4fc4f9">为什么 Milvus 查询召回率一直不理想？</font></summary>
在调用 SDK 进行向量搜索时，可以增大函数中 <code>nprobe</code> 参数的值。值越大，结果越精确，但耗时也越久。详见 <a href="https://www.milvus.io/cn/blog/2020-2-16-api-setting.md">如何设置 Milvus 客户端参数</a>。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 是否支持 “边插入边查询” ？</font></summary>
支持。
</details>
<details>
<summary><font color="#4fc4f9">对集合分区的查询是否会受到集合大小的影响，尤其在集合数据量高达一亿数据量时？</font></summary>
不会。如果你在搜索时指定了分区，Milvus 只会在相应分区进行搜索。
</details>
<details>
<summary><font color="#4fc4f9">如果只是搜索集合中的部分分区，整个集合的数据会全部加载到内存吗？</font></summary>
不会，只加载指定的分区里的数据。
</details>
<details>
<summary><font color="#4fc4f9">各个数据段的检索是并行处理的吗？</font></summary>
<p>一般而言，Milvus 对单个数据段内的查询是并行的，多个数据段的处理根据发行版本略有不同。</p>
<p>
假设一个集合存在多个数据段，当查询请求到达时：
<ul>
<li>CPU 版 Milvus 会对数据段读取任务和段内查询任务进行流水线处理。</li>
<li>GPU 版 Milvus 会在 CPU 版的基础上，将多个数据段分配给各个 GPU 处理。</li>
</ul>
</p>
<p>
可参阅文章：<a href="https://zhuanlan.zhihu.com/p/110332250">Milvus 开源向量数据库 ANNS</a>。
</p>
</details>
<details>
<summary><font color="#4fc4f9">批量搜索时，用多线程的收益大吗？</font></summary>
多线程查询，如果是小批量（<code>nq</code> < 64）的话，后台会合并查询请求。如果是大批量查询的话，就不会有什么优势。
</details>
<details>
<summary><font color="#4fc4f9">为什么搜索的速度非常慢？</font></summary>
请首先检查 <strong>server_config.yaml</strong> 的 <code>cache.cache_size</code> 参数是否大于集合中的数据量。
</details>
<details>
<summary><font color="#4fc4f9">创建索引立即查询，为什么内存会突然增长？</font></summary>
这是因为 Milvus 在进行搜索时会将新生成的索引文件加载到内存，由于加载的索引文件和用于生成索引文件的原始向量文件总和小于 <code>cache.cache_size</code> 的上限，原始向量数据暂未被系统从内存释放。
</details>
<details>
<summary><font color="#4fc4f9">为什么重启 Milvus 服务端之后，第一次搜索时间非常长？</font></summary>
重启后第一次搜索时，会将数据从磁盘加载到内存，所以这个时间会比较长。可以在 <strong>server_config.yaml</strong> 中开启 <code>preload_collection</code>，在内存允许的情况下尽可能多地加载集合。这样在每次重启服务端之后，数据都会先载入到内存中，可以解决第一次搜索耗时很长的问题。或者在查询前，调用方法 <code>load_collection()</code> 将该集合加载到内存。
</details>
