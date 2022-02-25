---
id: recommendation_system.md
title: 推荐系统
---

# 推荐系统

本教程将介绍如何使用开源向量数据库 Milvus 搭建推荐系统。

- [打开 Jupyter notebook](https://github.com/milvus-io/bootcamp/blob/master/solutions/recommender_system/recommender_system.ipynb)
- [快速部署](https://github.com/milvus-io/bootcamp/blob/master/solutions/recommender_system/quick_deploy)

本教程中使用到的 ML 模型及第三方软件包括:
- PaddlePaddle
- Redis or MySQL

</br>

推荐系统是一种信息过滤系统，可用于推荐个性化电影、音乐、产品、订阅消息等各种应用场景。与搜索引擎不同，推荐系统不需要用户准确地描述他们的需求，可以通过分析用户行为来发现用户的需求和兴趣。

</br>

通过本教程，你将学会如何搭建一个电影推荐系统，可以根据用户的兴趣来推荐电影。要构建这样的推荐系统，首先下载一个与电影相关的数据集。本教程使用 MovieLens 1M。或者你也可以准备自己的数据集，里面应包括用户对电影的评分，用户的特征统计和电影的描述。使用 PaddlePaddle 组合用户 ID 和特征，并将它们转换为 256 维向量。 以类似的方式将电影 ID 和特征转换为向量。 将电影向量存储在 Milvus 中，并使用用户向量进行相似度搜索。 如果用户向量与电影向量相似，Milvus 将返回电影向量及其 ID 作为推荐结果。 然后使用存储在 Redis 或 MySQL 中的电影向量 ID 查询电影信息。

</br>

![recommender_system](../../../assets/recommendation_system.png "Workflow of a recommender system.")
