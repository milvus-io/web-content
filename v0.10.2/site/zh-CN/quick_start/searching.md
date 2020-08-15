---
id: searching.md
---

# 向量搜索

向量查询的请求路径为 `collections/<collection_name>/vectors`，其中 `<collection_name>` 为目标集合。

```shell script
$ curl -X PUT 'http://localhost:19121/collections/test/vectors' -d \
'{
  "search": {
    "top_k": 2,
    "vectors": [
      [0.72, 0.26, 0.43, 0.73, 0.79, 0.56, 0.45, 0.34]
    ],
    "params": {
      "nprobe": 1
    }
  }
}'
```
所有的搜索参数放在 `search` 中：

* `top_k`：每次向量查询期望返回的结果数量。
* `vectors`：待查询的向量。
* `params`：查询参数。

Milvus 执行成功后，返回结果：

```shell script
{
  "num":1,
  "result":[
    [
      {"distance":"0.024200","id":"1591324710861000000"},
      {"distance":"0.370400","id":"1591324710861000006"}
    ]
  ]
}
```

`result` 中存放搜索的结果，每条向量包含 2 个结果，每个结果中记录了匹配向量的 ID 和相似度距离 `distance`。
