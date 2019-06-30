---
id: VectorDBIntro
title: Vector DB Introducation
sidebar_label: Vector Database Introducation
---

# Introduction of Feature Vector Database

## Feature vector

### What is a feature vector
A vector is a series of numbers. It is like a matrix with only one row but multiple columns (or only one column but multiple rows), for example [2,0,1,9,0,6,3,0].

A feature vector is a vector that contains information describing an object's important characteristics. An example of a feature vector you might be familiar with is RGB (red-green-blue) color descriptions. A color can be described by how much red, blue, and green there is in it. A feature vector for this would be color = [R, G, B].

### Why feature vector
Advances in modern computer and machine learning technologies have led to huge archieves of multimedia data in diverse application areas such as security, medicine, education and online information services. A multimedia object cannot be simply described by alphanumeric data, the basic data type in traditional databases, as they have generally multiple dimentions of properties. For example, an image of a human face cannot be described in just a few numeric data or text strings. 

Instead, feature vectors describe an object from a multidimentional, easily analyzable way, and are suitable to represent numeric or symbolic characteristics of multimedia content. In the human face image example, feature vector of hundreds of dimensions is used to represent the face for 

They are important for many different areas of machine learning and pattern processing. Machine learning algorithms typically require a numerical representation of objects in order for the algorithms to do processing and statistical analysis.

### Use cases
As already mentioned, feature vectors, with its effectiveness and practicality of representing objects in a numerical way to help with may kinds of analyses, are used widely in machine learning. 

- Image processing

  Features can be gradient magnitude, color, grayscale intensity, edges, areas, and more. Feature vectors are particularly popular for analyses in image processing because of the convenient way attributes about an image, like the RGB color example listed, can be compared numerically once put into feature vectors.

- Speech recognition

  Features can be sound lengths, noise level, noise ratios, and more.

- Spam-fighting initiatives

  Features are abundant. They can be IP location, text structure, frequency of certain words, or certain email headers.


## Traditional database & feature vector indexing
Traditional relational database are designed to organize alphanumeric data into interrelated collections. However, this technology is not well suited to the management of multimedia information. The feature vector data, vector storing and indexing methods, the large size of media objects are entirely foreign to traditional databases. 

Some may argue and request call our attention to some vector indexing plug-ins by traditional databases, such as imgsmlr by PostgreSQL and word2vector by Google. However, as the optimizations are only made based on hash-based search and one-dimention alphanumeirc data, the performance of these plug-ins are far from satisfying, and can barely meet the needs of huge high-dimentional vector indexing. 


## Vector indexing methods
Feature vectors are good for analysis because there are many techniques for comparing feature vectors. To summarize, these techniques can be categorized into 2 main kinds: linear search and similarity search.

### Linear search

A linear search or sequential search is a method for finding an element within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched. In vector search, the general method is to compare the Euclidean distance.

Linear search is relatively easier to use as it requires no additonal building of index structures or storage spaces. For example, you can use parallel computation libraries such as MKL for Intel processors and cuBLAS for NVIDIA GPUs. However, this methods is more suited to similarity search for vectors of small and medium scales, because for linear search, the amount of time it takes to run an algorithm becomes longer as the number and dimension of vectors get larger. 

> Information: O(Time complexity)= N(Vector scale)D(Vector dimension)


### Similarity search
Similarity search is a mechanism for comparing spaces of objects where the only available comparator is the similarity between any pair of objects. This is becoming increasingly important in an age of large multimedia information where the objects do not possess any natural order, for example large collections of images, sounds and other sophisticated digital objects.

In contrast to linear seach, similarity search generally relies on metric space, which allows the construction of efficient index structures in order to achieve scalability. By employing a range of mechanisms such as clustering, dimension reduction or coding, this search methods generally has a much smaller time complexity compared to linear search. 

The following indexing algorithms are mainly used in current similarity search:

- **Tree-based search**
  Tree-based similarity search divides high-dimension spaces into multiple subspaces, by employing a range of hyperplane constructed based on vector distribution. It got its name because it uses tree structure to maintain the space hierarchy. 
  
  Each non-leaf nopde in the tree corresponds to a subspace and a list of hyperplane, which furhter partitions the subspace to smaller subspaces. Each subspace corresponds to a child node. Thus, the tree root represents the whole vector space, and contains a group of parent nodes, while each child node represents a subspace of its parent node. Each leaf node represents a smallest unit of subspace that can no longer be divided. According to this structure, each vector can be represented by a leaf node in the tree. 
  
  In real cases of similarity search, the most simiar/close vectors are searched by locating several leaf nodes whose distances are nearest to target node. 
 
  | Pros  |  Cons   |
  |-------|---------|
  | High effecient search. By quickly locating most simiar leaf nodes, much time is saved of comparing to large number of vectors with low similarity. |  1. Tree structure construction takes much more time as the dimension of vectors get higher; 2. If target vector is too close to a particular hyperplane, the search preciseness might be lowered for possible loss of similar vectors in other hyperlanes.|
  
采用基于树的搜索方法可以快速的定位到与目标向量最为相似的若干个叶子节点，从而有效的避免了目标向量与其他大量相似度较低向量的依次比对，从而提高搜索效率。然而，随着向量维度的提高，计算用于划分空间的超平面的开销将显著增大，从而影响树型结构的构建效率。此外，如果目标向量与某一超平面距离较近，该方法的搜索结果可能会丢失大量的与目标相似的向量，从而影响查询的准确度。

- **Hash-based space partition**

  基于哈希(Hash)的搜索方法采用一组局部敏感哈希(Locality-Sensitive Hash, LSH)函数对向量集合进行划分。通过采用局部敏感哈希函数可以对每一个向量计算出一个与之相对应的哈希值(hash value)。对于距离较接近的向量，其哈希值也较为接近。该方法将各局部敏感哈希函数的值域(domain)划分为若干个区间(interval)，从而每个向量相应于特定的局部敏感哈希函数，均有一个区间与之对应。该方法通过哈希值的区间对向量进行划分，若两向量对于任一哈希函数其哈希值所在的区间均相同，则这两个向量属于同一分类。在搜索时，通过相同的局部敏感哈希函数和区间划分方法可以计算得到目标向量所属分类。然后可依次计算该分类以及该分类的邻近分类中所有向量与目标向量的距离获取距离最小的向量。
基于哈希的方法，通过计算目标向量所在分类以及邻近的分类可以有效的排除掉大量与目标向量相似度较低的向量，减少了向量相似度的计算次数。但是，该方法通常只能对向量空间进行均匀划分，而实际应用中向量在空间中的分布通常是不均匀(ununiform/skew)的，从而导致各个分类中向量的数量相差巨大，并进一步影响搜索的效率和准确度。

- **Vector quantization** 向量量化的编码算法

  基于向量量化的方法通常采用聚类(clustering)的方式对向量集合中的向量进行划分。该方法通过k-means等聚类方法将向量集合划分为多个聚类(cluster)，并记录各个聚类的中心点(center point/centroid)的坐标。在向量搜索时，首先依次比对目标向量与各个聚类中心的距离，选择出与目标向量最为接近的若干个聚类中心。接下来获取这些聚类中心所对应聚类中的所有向量，依次计算各向量与目标向量的距离，选择出距离最为接近的若干个向量。
该方法采用聚类的方法将数据集合划分，从而在搜索过程中排除掉与目标向量相似度较低的向量。然而，该方法在高维向量的搜索中容易遗漏部分潜在的与目标向量距离较近的向量，从而难以达到较高的准确度。


- **Graph-based search** 基于图的搜索方法

  与以上方法不同，基于图(Graph)的搜索方法通常不对向量空间进行划分。该方法预先计算向量集合中各向量间的相似度，并以图的形式维护向量之间的相似关系。具体而言，在图中每个向量是一个节点(node)，距离较近的节点之间通过边(edge)相互连接。在搜索时，从一个或者多个起始节点出发进行探索。每次探索一个节点时，计算该节点的所有邻居节点(neighbor)与目标向量的相似度，并基于当前探索的结果，选择与目标向量最为相似且未被探索的节点作为下一次需要探索的节点并开始下一次探索。以上过程在无法找到新的探索节点时结束，并将探索过程中所有被访问的节点中与目标向量最为相似的节点作为搜索结果。
基于图的方法通常有较高的搜索效率和准确度，但是构建搜索图的过程中需要进行大量的向量距离计算，从而导致极大的计算开销。除此之外，在需要向向量集合中增加新的向量时，通常需要对搜索图进行重新构建，从而严重的影响了向量的插入效率。



## Feature vector database
We have agreed that feature vectors are the basic elements to precisely represent multimedia objects. But are there any ideal database that allows the efficient storing and indexing of feature vectors? Let's start by looking at some competent tools of feature vector indexing available in the market:

### FAISS

Designed by Facebook AI, and written in C++, FAISS (Facebook AI Similarity Search) is a library that allows developers to quickly search for embeddings of multimedia documents that are similar to each other. 

|  Pros                     |      Cons                           |
|---------------------------| ------------------------------------|
| Distributed, multi-GPU    | Only a algorithm library            |
| Customizable algorithms   | Users need much expertise knowledge to be able to add customizations of algorithms and parameters  |                       

- 多线程以充分利用多核性能并在多路 GPU 上进行并行搜索。
- BLAS 算法库通过 matrix/matrix 乘法进行高效、精确的距离计算。没有 BLAS，高效的强力执行很难达到最优状态。 BLAS/LAPACK 是唯一一个 Faiss 必须的前提软件。
- 机器 SIMD 矢量化和 popcount 被用于加速孤立矢量的距离计算。

FAISS包含了多种向量检索算法，提供不同精度，查询速度和存储空间占用率。它还包含用于评估和参数调整的支持代码。 FAISS的出现也打破了过去向量检索库的一个限制：只能提供某个方面的优化。FAISS允许开发人员，在建立索引的速度、查询速度、内存使用量和查询精度等多个方面做取舍。


### SPTAG

SPTAG, open sourced in May, 2019 by Microsoft, is a distributed approximate nearest neighborhood search (ANN) library which provides a high quality vector index build, search and distributed online serving toolkits for large scale vector search scenario.

| Pros                        |    Cons                   |
|-----------------------------| --------------------------|
| 


SPTAG是由Microsoft于2019年5月发布的，基于最近邻搜索的向量检索算法。开发人员称该算法：允许用户充分利用学习模型在以毫秒为单位时间内智能搜索数十亿条向量。该算法在查询速度、查询精确度以及内存占用上也都有非常好的表现。和NSG类似，SPTAG建图的过程非常漫长，所以在需要大量插入新向量的同时进行查询的场景下，SPTAG也并不合适。

Although FAISS and SPTAG allow developers to build vector index and search, they are still libraries, not full-winged, ready-to-use vector indexing database system. 

So is there such an ideal vector indexing database system available for use? Yes.


## Milvus database

Milvus is a distributed feature vector indexing database management system which provides high quality similarity search and analysis of feature vectors and irrelational data. By extracting object features and taking the Euclidean distance between two feature vectors, the similarity of two objects is compared. Here is an comparison of Milvus with FAISS and SPTAG:

|                    |Milvus                 |  FAISS               |   SPTAG   |
|--------------------|-----------------------|----------------------|-----------|
| CPU/GPU heterogeneous computing capability |:heavy_check_mark:     | :heavy_check_mark:    |:x: |
| Quantization index            | :heavy_check_mark:     | :heavy_check_mark:   |    :x:    |
| Hash index                    | :heavy_check_mark:     | :heavy_check_mark:   |    :x:    |
| Graph index                   | :heavy_check_mark:     | :x:                  |   :heavy_check_mark:|
| Distributed architecture      | :heavy_check_mark:     |  :x:                 |   :x:     |
| High availability             | :heavy_check_mark:     |  :x:                 |    :x:    |
| Easy-to-use user interface    | :heavy_check_mark:     |  :x:                 |   :x:     |
| GUI monitoring dashboard      | :heavy_check_mark:    |   :x:                 |    :x:   |
| Simple deployment             | :heavy_check_mark:    |   :x:                 |  :x:     |
| C++/Python SDK                | :heavy_check_mark:    |   :heavy_check_mark:  |  :heavy_check_mark:     |
| RESTful API                   | :heavy_check_mark:    |   :x:                 |    :x:    |
| Enterprise user support       | :heavy_check_mark:    |   :x:                 |    :x:   |




