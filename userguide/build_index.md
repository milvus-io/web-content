---
id: build-index
title: Build index
sidebar_label: Build index
---

# Build index

The reason why you need to manually build index is as follows:

Suppose you have a total of 3.5 GB vector data to be inserted into Milvus for similarity search. To improve the search efficiency, these vectors will be distributed into several files. The size of each file is decided by the index_building_threshold you set in Configure Milvus. If the index_building_threshold=1 GB, it indicates that each file can contain up to 1 GB of data. In this case, the 3.5 GB data will be stored in 4 files. Each of the 3 files contains 1 GB data, while 1 file contains only 0.5 GB. As the index building process will only be automatically triggered when the file reached 1 GB data, the file containing 0.5 GB data will not have index automatically built for it. And that's why you need to manually build index for the file with 0.5 GB data. 

Follow this command to build index for the table:

```
# Build index
>>> milvus.build_index(table_name='test01')
Status(code='0', message='OK!')
```

