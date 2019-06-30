---
id: importing-vectors
title: Importing Vectors
sidebar_label: Importing Vectors
---

# 导入向量数据
## 导入向量数据
成功创建数据表格后，您可以向表格批量导入向量数据。当然，进行此操作的前提是您已经有了多维的向量数据。导入数据前，请先了解数据导入相关参数：

|参数|描述|类型|参考值|
|---------|-----------|----|-----|
|table_name| 要创建的table名| 字符串| 'table名'|
|records| 需要导入table的一组向量，每条向量的数值需为浮点类型（小数），其维度必须和所创建表格的维度一致。|二维数组|[[0.1, 0.2, ...], ...]

紧接着上面的例子，以下展示如何向Table 01导入20条256维的向量数据（在下面的代码中用vectors表示）：

```
# Import vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```
