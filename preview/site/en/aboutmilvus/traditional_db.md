---
id: traditional_db.md
title: Traditional Database
sidebar_label: Traditional Database
---

# Traditional Database

Traditional relational databases are designed to organize alphanumeric data items into interrelated collections. They do not support massive-scale, high-dimensional feature vectors because of the following reasons:
- Feature vectors are not part of the built-in data type. Thus, methods for managing and indexing feature vectors are not available. 
- The supported number of table columns is limited.

Currently, some vector indexing plugins are provided for traditional relational databases, such as imgsmlr, a plugin to search for similar images, by PostgreSQL and word2vector, a plugin to compute word vectors, by Google. However, because these plugins perform optimization based on algorithms such as hash search and one-dimensional discrete data search, their performance is relatively poor for high-dimensional vector search.
