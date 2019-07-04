---
id: deleting-table
title: Deleting a table
sidebar_label: Deleting a table
---

# Deleting a table


You may delete a table in Milvus when necessary. For example, to delete Table test01, you only need to: 

```
# Delete table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```
