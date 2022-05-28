---
id: audio_similarity_search.md
title: 音频相似度检索
---

# 音频相似度检索

本教程将介绍如何使用开源向量数据库 Milvus 搭建音频相似度检索系统。

- [打开 Jupyter notebook](https://github.com/milvus-io/bootcamp/blob/master/solutions/audio_similarity_search/audio_similarity_search.ipynb)
- [快速部署](https://github.com/milvus-io/bootcamp/blob/master/solutions/audio_similarity_search/quick_deploy)
本教程中使用到的 ML 模型及第三方软件包括：
- PANNs (大规模预训练音频神经网络)
- MySQL

</br>

音频检索（如演讲、音乐、音效等检索）实现了在海量音频数据中查询并找出相似声音片段。音频相似性检索系统可用于识别相似的音效、最大限度减少知识产权侵权等。音频检索还可以用于实时网络媒体的搜索和监控，来打击侵犯知识产权的行为。在音频数据的分类和统计分析中，音频检索也发挥着重要作用。

</br>

在本教程中，你将学会如何构建一个音频检索系统，用来检索相似的声音片段。使用 PANNs 将上传的音频片段转换为向量数据，并存储在 Milvus 中。Milvus 自动为每个向量生成唯一的 ID。然后用户就可以在 Milvus 中进行向量相似度搜索，Milvus 返回的检索结果为向量 ID，每个 ID 对应音频片段数据的路径。

<br/>

![Audio_search](../../../assets/audio_search.png "Workflow of an audio similarity search system.")
![Audio_search_demo](../../../assets/audio_search_demo.png "Demo of an audio similarity search system.")
