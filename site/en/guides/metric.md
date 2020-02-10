id: metric.md
title: Metric Types
sidebar_label: Metric Types

# Distance Metrics

In Milvus, distance metrics are used to measure similarities among vectors. Choosing a good distance metric helps improve the classification and clustering performance significantly. 

Below table shows how these widely used distance metrics fit with various input data forms and Milvus indexes.

| Input Data | Distance Metrics              | Index Types                                            |
| ---------- | ----------------------------- | ------------------------------------------------------ |
| Float      | L2 and IP                     | `FLAT`, `IVFLAT`, `IVFSQ8`, `IVFSQ8H`, `IVFPQ`, `RNSG` |
| Binary     | Tanimoto, Jaccard and Hamming | `FLAT`, `IVFLAT`                                       |

### Euclidean distance (L2)

Essentially, Euclidean distance measures the length of a segment that connects 2 points.

The formula for Euclidean distance is as follows:

![euclidean formula]

It's the most commonly used distance metric, and is very useful when the data is continuous.

### Cosine/Inner product (IP)

Cosine/Inner product measures the cosine of the angle between 2 vectors, and returns the normalized dot product of them.

So the formula for the cosine/IP is:

![cosine formula]

where A and B are vectors, ∥ A∥ and ∥ B∥ are the norm of A and B, and cosθ is the cosine of the angle between A and B.

Cosine/IP is more useful if you are more interested in measuring the orientation but not the magnitude of the vectors.

### Tanimoto

The Tanimoto coefficient between two points, **a** and **b**, with **k** dimensions is calculated as:

![tanimoto coefficient]

The Tanimoto similarity is only applicable for a binary variable, and for binary variables the Tanimoto coefficient ranges from 0 to +1 (where +1 is the highest similarity).

The Tanimoto distance ranges from 0 to +infinity.

![tanimoto distance]

### Jaccard

Jaccard distance measures the dissimilarity between data sets, and is obtained by subtracting the Jaccard similarity coefficient from 1. 

Jaccard similarity coefficient measures the similarity between two sample sets, and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.

Jaccard similarity = |A ∩ B| / |A ∪ B|

### Hamming

Hamming distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different. 

For example, suppose there are two strings 1101 1001 and 1001 1101.

11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the Hamming distance, d (11011001, 10011101) = 2.

