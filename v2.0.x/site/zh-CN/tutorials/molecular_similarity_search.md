---
id: molecular_similarity_search.md
title: 分子式检索系统 
---

# 分子式检索系统

本教程将介绍如何使用开源向量数据库 Milvus 搭建分子式检索系统。

- [打开 Jupyter notebook](https://github.com/milvus-io/bootcamp/blob/master/solutions/molecular_similarity_search/molecular_search.ipynb)
- [快速部署](https://github.com/milvus-io/bootcamp/blob/master/solutions/molecular_similarity_search/quick_deploy)
- [在线体验](http://35.166.123.214:8002/)
本教程中使用到的 ML 模型及第三方软件包括：
- RDKit
- MySQL

<br/>

药物发现是新药研发中的重要一环。药物发现过程包括了靶点选择和确认。当发现片段或先导化合物时，研究人员通常会在内部或商业化合物库中搜索类似的化合物，以发现构效关系 (SAR) 和化合物的可用性。最终，他们将评估先导化合物成为候选化合物的潜力。 为了从十亿规模的化合物库中发现可用的化合物，通常检索化学指纹以进行子结构搜索和分子相似性搜索。

<br/>

通过本教程，你将学习到如何搭建分子式检索系统，该系统可以检索特定分子的子结构，超结构，和相似结构。RDKit 是一个开源化学信息学软件，可以将分子结构转换为向量。 然后，向量存储在 Milvus 中，Milvus 可以对向量进行相似度搜索。 Milvus 还会自动为每个向量生成一个唯一的 ID。 向量 ID 和分子结构的映射存储在 MySQL 中。

<br/>

![molecular](../../../assets/molecular.png "Workflow of a molecular similarity search system.")
![molecular](../../../assets/molecular_demo.jpeg "Demo of a molecular similarity search system.")
