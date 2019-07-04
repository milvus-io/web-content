---
id: deleting-table
title: Deleting a table
sidebar_label: Deleting a table
---

# 删除表

你可以根据需要，删除数据库中已创建的表。仍然以表test01为例，若要删除表test01，你可以：

```
# Delete table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```
