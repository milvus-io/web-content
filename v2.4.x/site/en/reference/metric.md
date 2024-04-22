---
id: metric.md
summary: Milvus supports a variety of similarity metrics, including Euclidean distance, inner product, Jaccard, etc.
title: Similarity Metrics
---

# Similarity Metrics

In Milvus, similarity metrics are used to measure similarities among vectors. Choosing a good distance metric helps improve the classification and clustering performance significantly.

The following table shows how these widely used similarity metrics fit with various input data forms and Milvus indexes.


<div class="filter">
<a href="#floating">Floating point embeddings</a> <a href="#binary">Binary embeddings</a>

</div>

<div class="filter-floating table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Similarity Metrics</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Euclidean distance (L2)</li><li>Inner product (IP)</li><li>Cosine similarity (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-binary table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Distance Metrics</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>

</div>



### Euclidean distance (L2)

Essentially, Euclidean distance measures the length of a segment that connects 2 points.

The formula for Euclidean distance is as follows:

![euclidean](../../../assets/euclidean_metric.png "Euclidean distance.")

where **a** = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>) and **b** = (b<sub>0</sub>, b<sub>0</sub>,..., b<sub>n-1</sub>) are two points in n-dimensional Euclidean space

It's the most commonly used distance metric and is very useful when the data are continuous.

<div class="alert note">
Milvus only caculates the value before applying square root when Euclidean distance is chosen as the distance metric.
</div>

### Inner product (IP)

The IP distance between two embeddings are defined as follows: 

![ip](../../../assets/IP_formula.png "Inner product.")

IP is more useful if you need to compare non-normalized data or when you care about magnitude and angle.

<div class="alert note">

 If you apply the IP distance metric to normalized embeddings, the result will be equivalent to calculating the cosine similarity between the embeddings.

</div>

Suppose X' is normalized from embedding X: 

![normalize](../../../assets/normalize_formula.png "Normalize.")

The correlation between the two embeddings is as follows:

![normalization](../../../assets/normalization_formula.png "Normalization.")

### Cosine Similarity

Cosine similarity uses the cosine of the angle between two sets of vectors to measure how similar they are. You can think of the two sets of vectors as two line segments that start from the same origin ([0,0,...]) but point in different directions.

To calculate the cosine similarity between two sets of vectors **A = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** and **B = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)**, use the following formula:

![cosine_similarity](../../../assets/cosine_similarity.png "Cosine Similarity")

The cosine similarity is always in the interval **[-1, 1]**. For example, two proportional vectors have a cosine similarity of **1**, two orthogonal vectors have a similarity of **0**, and two opposite vectors have a similarity of **-1**. The larger the cosine, the smaller the angle between two vectors, indicating that these two vectors are more similar to each other.

By subtracting their cosine similarity from 1, you can get the cosine distance between two vectors.

### Jaccard distance

Jaccard similarity coefficient measures the similarity between two sample sets and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.

![Jaccard similarity coefficient](../../../assets/jaccard_coeff.png "Jaccard similarity coefficient.")

Jaccard distance measures the dissimilarity between data sets and is obtained by subtracting the Jaccard similarity coefficient from 1. For binary variables, Jaccard distance is equivalent to the Tanimoto coefficient.

![Jaccard distance](../../../assets/jaccard_dist.png "Jaccard distance.")

### Hamming distance

Hamming distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.

For example, suppose there are two strings, 1101 1001 and 1001 1101.

11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the Hamming distance, d (11011001, 10011101) = 2.

### Structural Similarity

When a chemical structure occurs as a part of a larger chemical structure, the former is called a substructure and the latter is called a superstructure. For example, ethanol is a substructure of acetic acid, and acetic acid is a superstructure of ethanol.

Structural similarity is used to determine whether two chemical formulae are similar to each other in that one is the superstructure or substructure of the other.

To determine whether A is a superstructure of B, use the following formula:

![superstructure](../../../assets/superstructure.png "Superstructure")

Where:

- A is the binary representation of a chemical formula to be retrieved
- B is the binary representation of a chemical formula in the database

Once it returns `0`, **A** is not a superstructure of **B**. Otherwise, the result is the other way around.

To determine whether A is a substructure of B, use the following formula:

![substructure](../../../assets/substructure.png "subsctructure")

Where:

- A is the binary representation of a chemical formula to be retrieved
- B is the binary representation of a chemical formula in the database

Once it returns `0`, **A** is not a substructure of **B**. Otherwise, the result is the other way around.

## FAQ

<details>
<summary><font color="#4fc4f9">Why is the top1 result of a vector search not the search vector itself, if the metric type is inner product?</font></summary>
This occurs if you have not normalized the vectors when using inner product as the distance metric.
</details>
<details>
<summary><font color="#4fc4f9">What is normalization? Why is normalization needed?</font></summary>
<p>Normalization refers to the process of converting an embedding (vector) so that its norm equals 1. If you use Inner Product to calculate embeddings similarities, you must normalize your embeddings. After normalization, inner product equals cosine similarity.
</p>
<p>
See <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a> for more information.
</p>
</details>
<details>
<summary><font color="#4fc4f9">Why do I get different results using Euclidean distance (L2) and inner product (IP) as the distance metric?</font></summary>
Check if the vectors are normalized. If not, you need to normalize the vectors first. Theoretically speaking, similarities worked out by L2 are different from similarities worked out by IP, if the vectors are not normalized.
</details>


## What's next

- Learn more about the supported [index types](index.md) in Milvus.
