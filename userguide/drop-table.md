---
id: deleting-table
title: Drop table
sidebar_label: Drop table
---

# Drop table


You may drop a table in Milvus when necessary. For example, to drop Table test01, you only need to:

```
# Drop table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```
