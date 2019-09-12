---
id: traditional_db
title: Traditional Database
sidebar_label: Traditional Database
---

# Traditional Database

Traditional relational databases are designed to organize alphanumeric data into interrelated collections. However, this technology is not well suited to the management of multimedia information. The feature vector data, vector storage and indexing methods, the large size of media objects are entirely foreign to traditional databases. 

Some may argue that there are now some vector indexing plug-ins provided by traditional databases, such as imgsmlr by PostgreSQL and word2vector by Google. However, as the optimizations are only made based on hash-based search and one-dimension alphanumeric data, the performance of these plug-ins are far from satisfying, and can barely meet the needs of large scale high-dimensional vector indexing. 
