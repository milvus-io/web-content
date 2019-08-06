---
id: search-vectors-in-milvus
title: Search vectors in Milvus
sidebar_label: Search vectors in Milvus
---

# 用Milvus进行搜索

现在，您已经在创建好的表里成功导入了向量数据，您可以用Milvus搜索你需要的数据了。在此，您不仅可以批量搜索多个数据，还可以指定搜索范围。具体请阅读下列参数：

|参数|描述|类型|参考值|
|---------|-----------|----|-----|
|table_name|要创建的表名|字符串|'表名'|
|top_k| 与所搜索向量相似度最高的k个向量| 整数 | 0 < top_k <= 1000|
|query_records| 一组需要搜索的向量，每条向量数值需为浮点类型（小数），其维度必须和所创建表的维度一致。|二维数组 | [[0.1, 0.2, ...], ...] |
|query_ranges（可选）| 向量搜索的范围，比如你可以只搜索某一段日期内的向量。如果不设置，默认值是'None'（即'无范围'），表示全局搜索。|数组 (数组内建议使用tuple类型数据)|[('2019-01-01', '2019-01-02'), ...]|

> 提示：目前搜索范围仅支持日期范围，格式为'yyyy-mm-dd'，为左闭右闭模式。比如您将范围定为[2019.1.1, 2019.1.5]，则搜索范围为2019.1.1到2019.1.5，并且包含2019.1.1和2019.1.5。

假设您要针对5条256维的向量（在下面代码中用q_records表示），搜索与每条向量相似度最高的前10组结果，您可以：

   ```
   # Search 5 vectors
   >>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=10)
   >>> status
   Status(message='Search vectors successfully!', code=0)
   >>> results # Searched top_k vectors
   [[QueryResult(id=1561709418638204004, score=62.554189514479866), ..., ],
   [QueryResult(id=1561709418638204018, score=59.801433231755965), ..., ],
   ...
   ]
   ```
