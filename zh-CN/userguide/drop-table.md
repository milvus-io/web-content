---
id: drop-table
title: Drop a table
sidebar_label: Drop a table
---

# 删除表

如果某张表已经不再使用，您可以在数据库中将其删除。仍然以表test01为例，若要删除表test01，您可以：

```
# Delete table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```

