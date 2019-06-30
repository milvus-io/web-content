---
id: vectordb
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

> Information: O (Time complexity)= N (Vector scale) * D (Vector dimension)


### Similarity search
Similarity search is a mechanism for comparing spaces of objects where the only available comparator is the similarity between any pair of objects. This is becoming increasingly important in an age of large multimedia information where the objects do not possess any natural order, for example large collections of images, sounds and other sophisticated digital objects.

In contrast to linear seach, similarity search generally relies on metric space, which allows the construction of efficient index structures in order to achieve scalability. By employing a range of mechanisms such as clustering, dimensionality reduction or coding, this search methods generally has a much smaller time complexity compared to linear search. 

The following indexing algorithms are mainly used in current similarity search:

- **Tree-based**
  Tree-based similarity search divides high-dimension spaces into multiple subspaces, by employing a range of hyperplane constructed based on vector distribution. It got its name because it uses tree structure to maintain the space hierarchy. 
  
  Each non-leaf nopde in the tree corresponds to a subspace and a list of hyperplane, which furhter partitions the subspace to smaller subspaces. Each subspace corresponds to a child node. Thus, the tree root represents the whole vector space, and contains a group of parent nodes, while each child node represents a subspace of its parent node. Each leaf node represents a smallest unit of subspace that can no longer be divided. According to this structure, each vector can be represented by a leaf node in the tree. 
  
  In real cases of similarity search, the most simiar/close vectors are searched by locating several leaf nodes whose distances are nearest to target node. 
  
  Tree-based search is efficient for its ability to quickly locating most simiar leaf nodes, much time is saved of comparing to large number of vectors with low similarity. However, tree structure construction of high-dimensional vectors takes much time. And if the target vector is too close to a particular hyperplane, the search preciseness might be lowered for possible loss of similar vectors in other hyperlanes.
 
 

- **Hash-based**
   locality-sensitive hashing (LSH) is an algorithmic technique that hashes similar vectors into the same "buckets" with high probability. Since similar items end up in the same buckets, this technique can be used for data clustering and nearest neighbor search. 
  
   This method is efficient because it substantially reduced the computing times as the computation is done only in the "buckets" with highly similar vectors. However, one limitation is that according to this method, each "bucket" contains the same number of vectors, while in real-life situations, vectors distributions are ununiform/skew, thus affecting the search efficiency and precision.

- **Vector quantization** 
  Vector quantization (VQ) is a classical quantization technique from signal processing that allows the modeling of probability density functions by the distribution of prototype vectors. It works by dividing a large set of points (vectors) into groups having approximately the same number of points closest to them. Each group is represented by its centroid point, as in k-means and some other clustering algorithms.
  
  The density matching property of vector quantization is powerful, especially for identifying the density of large and high-dimensional data. 


- **Graph-based** 
Different from the above-mentioned search methods, graph-based search makes no partition of vector spaces. The graph relates the data items in the store to a collection of nodes and edges, the edges representing the relationships between the nodes. Graph-based method holds the relationships between data as a priority. 

It works by searching a node and all its neighbor nodes, checking their similarity with the target vector, to find most similar nodes and check again, until a group of closest match is identified.

Graph-based method is usually efficient and precise in the similary search. However, if new vectors are to be added to vector space, the graph construction needs to be restructured, and this large computation of vector distances requires much time.



## Feature vector database
We have agreed that feature vectors are the basic elements to precisely represent multimedia objects. But are there any ideal database that allows the efficient storing and indexing of feature vectors? Let's start by looking at some competent tools of feature vector indexing available in the market:

### FAISS

Designed by Facebook AI, and written in C++, FAISS (Facebook AI Similarity Search) is a library that allows developers to quickly search for embeddings of multimedia documents that are similar to each other. 

FAISS provides various customization options about indexing speed, search speed, CPU usage and search precision. Howevery, it is only but an algorithm library. In addition, users need much expertise knowledge to be able to add customizations of algorithms and parameters               

### SPTAG

SPTAG, open sourced in May, 2019 by Microsoft, is a distributed approximate nearest neighborhood search (ANN) library which provides a high quality vector index build, search and distributed online serving toolkits for large scale vector search scenario.

SPTAG has excellent performance in search speed and search precision. However, it is still subject to common limitaions of graph-based search - graph construction takes a long time, especially when new vectors are to be added.

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




