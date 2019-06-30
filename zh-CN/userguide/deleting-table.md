---
id: deleting-table
title: Deleting A Table
sidebar_label: Deleting A Table
---

# 删除表格
## 删除表格
你可以根据需要，删除数据库中已创建的表格。仍然以表格test01为例，若要删除表格test01，你可以：

```
# Delete table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```
