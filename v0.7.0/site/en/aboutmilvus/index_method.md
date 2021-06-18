---
id: index_method.md
title: Vector Search Methods
sidebar_label: Vector Search Methods
---

# Vector Search Methods

Similarity search methods for vectors can be generally categorized into exact search and approximate search.

## Exact search

Exact search can be implemented by linear search. Linear search traverses all vectors in a vector space and computes the dot product or Euclidean distance between vectors in the vector space and the target vector. The vector that has the closest Euclidean distance from the target vector or the largest dot product with the target vector has the highest similarity. Linear search is easy to use because you do not need to create extra data structures or storage spaces.

For example, you can use parallel computation libraries such as MKL for Intel processors and cuBLAS for NVIDIA GPUs for small-sized or middle-sized vector datasets. However, because the time complexity of linear search is O\(Nd\), where N is the size of the vector dataset and d is the vector dimension, the performance of linear search deteriorates as the size of the vector dataset or the vector dimension increases.

## Approximate search

Approximate search converts searches in high-dimensional vector spaces to searches in vector spaces with reduced size or dimensions through clustering, dimension reduction, and encoding. The time complexity is less than O(Nd). However, you need to use a training dataset with similar vector distribution to train a model with appropriate data distribution or encoding. You can then use this model to create indexes for all high-dimensional vectors.

Currently, approximate search use the following algorithms:

### Tree-based search

Tree-based similarity search divides high-dimensional vector spaces into multiple subspaces by a series of hyperplanes. Space hierarchy is maintained by tree structure. Each non-leaf node in the tree corresponds to a subspace and a group of hyperplanes, which further partitions the subspace to smaller subspaces. Each subspace corresponds to a child node. Thus, the tree root represents the whole vector space, and contains a group of parent nodes, while each child node represents a subspace of its parent node. Each leaf node represents a smallest unit of subspace that can no longer be divided. According to this structure, each vector can be represented by a leaf node in the tree. During the search, leaf nodes that are the most similar to the target vector can be located through the tree structure in a short time. The vector with the highest similarity can be located by computing the distance between these leaf nodes and the target vector.

Tree-based search is efficient by quickly locating the most similar leaf nodes without traversing all nodes. However, as the dimension increases, if the target vector is too close to a particular hyperplane, the search accuracy might deteriorate because of possible loss of similar vectors in other hyperplanes.

### Hash-based space division

Hash-based space division uses a group of locality-sensitive hashing (LSH) algorithms to divide the vector space. LSH can be used to compute the hash value for each vector. For vectors that are closer to each other, the hash values are also similar. The algorithm divides the value range of LSH algorithms into parts so that each vector and its hash value have a corresponding part. Vectors are then divided by the parts of corresponding hash values. If the hash values of two vectors are within the same part, these vectors are in the same category. During the search, the algorithm uses the same LSH and part division rules to acquire the category of the target vector. Then the algorithm computes the distance between all vectors that are in the same category or nearby categories and the target vector to acquire the most similar vector.
   
Hash-based space division computes the category and nearly categories of the target vector to exclude vectors that are less similar, thus reducing the number of computations for vector similarity. However, this algorithm can only evenly divide the vector space. In real-world scenarios, the distribution of vectors in a vector space is often uneven. Thus, the number of vectors differ greatly among different categories, which results in decreased efficiency and precision.


### Vector quantization encoding

Vector quantization (VQ) divides the vector space by using clustering methods, such as k-means, to divide the vector space into multiple clusters and record the coordinates of the centroids of each cluster. During the search, the algorithm compares the distance between the centroids and the target vector and locates the centroids that are closest to the target vector. Then the algorithm computes the distance between all vectors in the clusters and the target vector to acquire the most similar vectors.
  
VQ uses clustering to divide the vector space and exclude vectors that are less similar. However, this algorithm is likely to miss potential vectors that are closer to the target vector, which results in decreased precision.
  
### Graph-based search

Different from other search methods, graph-based search does not divide a vector space. Graph-based search computes the similarity of all vectors in advance and maintains the similarity relationships in a graph structure. To be exact, in a graph, each vector is represented as a node and nodes that are close to each other are connected by edges. During the search, the algorithm explores from one or multiple starting nodes. Each time a node is explored, the algorithm computes the similarity between all neighboring nodes and the target node and selects the unexplored node with the highest similarity as the new starting node. The process completes when there are no unexplored nodes available and returns the node that has the highest similarity in all explored nodes.
  
Graph-based searches are usually efficient and accurate. However, the process to build a search graph requires a lot of computations for distances between vectors, which results in high computation costs. Moreover, when adding new vectors to the vector space, the search graph usually needs to be rebuilt, which results in decreased insertion efficiency of vectors.
