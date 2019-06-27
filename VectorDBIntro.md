# Introduction of Characteristic Vector Database

## Feature vector

### What is a feature vector
A vector is a series of numbers. It is like a matrix with only one row but multiple columns (or only one column but multiple rows), for example [2,0,1,9,0,6,3,0].

A feature vector is a vector that contains information describing an object's important characteristics. An example of a feature vector you might be familiar with is RGB (red-green-blue) color descriptions. A color can be described by how much red, blue, and green there is in it. A feature vector for this would be color = [R, G, B].

### Why feature vector
Advances in modern computer and machine learning technologies have led to huge archieves of multimedia data in diverse application areas such as security, medicine, education and online information services. A multimedia object cannot be simply described by alphanumeric data, the basic data type in traditional databases, as they have generally multiple dimentions of properties.

Instead, feature vectors describe an object from a multidimentional, easily analyzable way, and are suitable to represent numeric or symbolic characteristics of multimedia content.

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
Feature vectors are good for analysis because there are many techniques for comparing feature vectors. One simple way to compare the feature vectors of two objects is to take the Euclidean distance.

## Feature vector database
We have agreed that feature vectors are the basic elements to precisely represent multimedia objects. But are there any ideal database that allows the efficient storing and indexing of feature vectors? Let's start by looking at some competent tools of feature vector indexing available in the market:

### FAISS

Designed by Facebook AI, and written in C++, FAISS (Facebook AI Similarity Search) is a library that allows developers to quickly search for embeddings of multimedia documents that are similar to each other. 

|  Pros                     |      Cons                           |
|---------------------------| ------------------------------------|
| Distributed, multi-GPU    | Only a algorithm library            |
| Customizable algorithms   | High entrance standards for users   |                       

FAISS 是 Facebook AI 研究团队开源的针对聚类和相似性搜索库。FAISS 是用 C++ 编写的，带有 Python / numpy 的完整封装。FAISS大量利用了：

- 多线程以充分利用多核性能并在多路 GPU 上进行并行搜索。
- BLAS 算法库通过 matrix/matrix 乘法进行高效、精确的距离计算。没有 BLAS，高效的强力执行很难达到最优状态。 BLAS/LAPACK 是唯一一个 Faiss 必须的前提软件。
- 机器 SIMD 矢量化和 popcount 被用于加速孤立矢量的距离计算。

FAISS包含了多种向量检索算法，提供不同精度，查询速度和存储空间占用率。它还包含用于评估和参数调整的支持代码。 FAISS的出现也打破了过去向量检索库的一个限制：只能提供某个方面的优化。FAISS允许开发人员，在建立索引的速度、查询速度、内存使用量和查询精度等多个方面做取舍。

FAISS虽然有上述的种种优点，但是依然只是一个算法库；虽然提供了多种算法和参数以供调优，但是对于开发人员而言，想用好FAISS依然有很高的门槛。

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






