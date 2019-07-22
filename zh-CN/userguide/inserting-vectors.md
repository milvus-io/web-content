---
id: inserting-vectors
title: Inserting vectors
sidebar_label: Inserting vectors
---

# 插入向量数据

成功创建数据表后，您可以向表批量插入向量数据。当然，进行此操作的前提是您已经有了多维的向量数据。插入数据前，请先了解相关参数：

|参数|描述|类型|参考值|
|---------|-----------|----|-----|
|table_name| 要创建的表的名字| 字符串| '表名'|
|records| 需要插入表的一组向量，每条向量的数值需为浮点类型（小数），其维度必须和所创建表格的维度一致。|二维数组|[[0.1, 0.2, ...], ...]

紧接着上面的例子，以下展示如何向表test01插入20条256维的向量数据（在下面的代码中用vectors表示）：

```
# Insert vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```
