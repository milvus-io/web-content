---
id: video_similarity_search.md
title: 视频相似度检索
---

# 视频相似度检索

本教程将介绍如何使用开源向量数据库 Milvus 搭建视频相似度检索系统。

- [打开 Jupyter notebook](https://github.com/milvus-io/bootcamp/blob/master/solutions/video_similarity_search/video_similarity_search.ipynb)
- [快速部署](https://github.com/milvus-io/bootcamp/blob/master/solutions/video_similarity_search/quick_deploy)
本教程中使用到的 ML 模型及第三方软件包括：
- OpenCV
- ResNet-50
- MySQL

<br/>

如今，看完了自己喜欢的电影或者视频后，人们喜欢在各种社交网络平台上发帖，通过截图分享他们的想法。当粉丝看到截图之后，如果帖子上没有明确指出电影名称，他们很难分辨出是哪部电影。为了找出电影的名称，人们可以利用视频相似度搜索系统。 通过使用该系统，用户可以上传图像并获取包含与上传图像相似的关键帧的视频或电影。

<br/>

在本教程中，你将学会如何搭建一个视频相似度检索系统。本教程使用的数据集为来自 Tumblr 的约100个 gif 动图。当然，你也可以准备自己的视频数据集。该系统首先使用 OpenCV 提取视频中的关键帧，然后使用 ResNet-50 获取每个关键帧的特征向量。 使用 Milvus 存储向量并进行向量相似性检索。Milvus 会返回相似向量的 ID。 然后通过 MySQL 中存储的映射关系，找到向量 ID 所对应的视频。

<br/>

![video_search](../../../assets/video_search.png "Workflow of a video similarity search system.")
![video_search_demo](../../../assets/video_search_demo.gif "Demo of a video similarity search system.")
