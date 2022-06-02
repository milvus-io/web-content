---
id: dna_sequence_classification.md
summary: 使用 Milvus 搭建 DNA 序列分类系统。
---

# DNA 序列分类

本教程将介绍如何使用开源向量数据库 Milvus 搭建 DNA 序列分类模型。
- [打开 Jupyter notebook](https://github.com/milvus-io/bootcamp/blob/master/solutions/dna_sequence_classification/dna_sequence_classification.ipynb)
- [快速部署](https://github.com/milvus-io/bootcamp/blob/master/solutions/text_search_engine/quick_deploy)
本教程中使用到的 ML 模型及第三方软件包括：
- CountVectorizer
- MySQL

<br/>

DNA 序列是基因溯源、物种鉴定、疾病诊断等领域内的流行概念。各行各业都渴望发现更智能、更高效的研究方法。因此，人工智能的运用在生物和医学领域内备受关注。越来越多的科学家和研究人员开始做出贡献，努力推动机器学习（machine learning）和深度学习（deep learning）在生物信息学领域内的应用。通常，科学家和研究人员会通过增加样本量来提高实验结果的说服力。将基因组学与大数据相结合能够拓展实际应用场景。然而，传统的序列比对存在局限性，不适用于大型数据集的比对。为解决这一问题，可以选择将大型 DNA 序列数据向量化。

<br/>

通过本教程，你将学习到如何搭建 DNA 序列分类系统。首先，使用 CountVectorizer 模型提取 DNA 序列特征并转化为向量。然后，将向量存储在 Milvus 中，将向量与 DNA 分类信息的对应关系存储在 MySQL 中。使用 Milvus 进行向量相似度搜索，并从 MySQL 中获取对应的 DNA 分类。

<br/>

![dna](../../../assets/dna.png "DNA 序列分类模型流程图。")

