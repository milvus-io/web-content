---
id: traditional_db.md
title: Traditional Database
sidebar_label: Traditional Database
---

# 传统数据库与特征向量检索


传统关系型数据库针对字母数字类数据而设计，把不同数据整理归纳为相互关联的集合。但是，由于以下原因，传统数据库无法支持处理海量的高维特征向量：
- 内建数据类型并不包括特征向量，也没有针对特征向量的管理和索引方式
- 仅支持有限的表列数

现在一些传统数据库系统也提供了针对特征向量检索的插件，比如PostgreSQL 的以图搜图插件 imgsmlr，和 Google 的词向量计算插件 word2vector。但是由于这些插件的优化主要基于哈希搜索和一维离散数据搜索，因此处理高维向量数据的性能并不理想。
