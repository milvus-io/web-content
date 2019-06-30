---
id: vector-indexing-methods
title: Vector indexing methods
sidebar_label: Vector indexing methods
---

# Vector indexing methods

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
 
  | Pros  |  Cons   |
  |-------|---------|
  | High effecient search. By quickly locating most simiar leaf nodes, much time is saved of comparing to large number of vectors with low similarity. |  1. Tree structure construction of high-dimensional vectors takes much time; 2. If target vector is too close to a particular hyperplane, the search preciseness might be lowered for possible loss of similar vectors in other hyperlanes.|

- **Hash-based**
   locality-sensitive hashing (LSH) is an algorithmic technique that hashes similar vectors into the same "buckets" with high probability. Since similar items end up in the same buckets, this technique can be used for data clustering and nearest neighbor search. 
  
   This method is efficient because it substantially reduced the computing times as the computation is done only in the "buckets" with highly similar vectors. However, one limitation is that only该方法通常只能对向量空间进行均匀划分，而实际应用中向量在空间中的分布通常是不均匀(ununiform/skew)的，从而导致各个分类中向量的数量相差巨大，并进一步影响搜索的效率和准确度。

- **Vector quantization** 
  Vector quantization (VQ) is a classical quantization technique from signal processing that allows the modeling of probability density functions by the distribution of prototype vectors. It works by dividing a large set of points (vectors) into groups having approximately the same number of points closest to them. Each group is represented by its centroid point, as in k-means and some other clustering algorithms.
  
  The density matching property of vector quantization is powerful, especially for identifying the density of large and high-dimensional data. 


- **Graph-based** 
Different from the above-mentioned search methods, graph-based search makes no partition of vector spaces. The graph relates the data items in the store to a collection of nodes and edges, the edges representing the relationships between the nodes. Graph-based method holds the relationships between data as a priority. 

It works by searching a node and all its neighbor nodes, checking their similarity with the target vector, to find most similar nodes and check again, until a group of closest match is identified.

Graph-based method is usually efficient and precise in the similary search. However, if new vectors are to be added to vector space, the graph construction needs to be restructured, and this large computation of vector distances requires much time.

