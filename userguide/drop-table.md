---
id: drop-table
title: Drop table
sidebar_label: Drop table
---

# Drop table


If a table is not used any more, you may drop it in Milvus. For example, to drop Table test01, you only need to:

```
# Drop table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```
