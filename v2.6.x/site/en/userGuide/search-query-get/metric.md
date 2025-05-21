---
id: metric.md
title: "Metric Types"
summary: "Similarity metrics are used to measure similarities among vectors. Choosing an appropriate distance metric helps improve classification and clustering performance significantly."
---

# Metric Types

Similarity metrics are used to measure similarities among vectors. Choosing an appropriate distance metric helps improve classification and clustering performance significantly.

Currently, Milvus supports these types of similarity Metrics: Euclidean distance (`L2`), Inner Product (`IP`), Cosine Similarity (`COSINE`), `JACCARD`, `HAMMING`, and `BM25` (specifically designed for full text search on sparse vectors).

The table below summarizes the mapping between different field types and their corresponding metric types.

<table>
   <tr>
     <th><p>Field Type</p></th>
     <th><p>Dimension Range</p></th>
     <th><p>Supported Metric Types</p></th>
     <th><p>Default Metric Type</p></th>
   </tr>
   <tr>
     <td><p><code>FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
     <td><p><code>COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
     <td><p><code>COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code>BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
     <td><p><code>COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code>SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>No need to specify the dimension.</p></td>
     <td><p><code>IP</code>, <code>BM25</code> (used only for full text search)</p></td>
     <td><p><code>IP</code></p></td>
   </tr>
   <tr>
     <td><p><code>BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code>HAMMING</code>, <code>JACCARD</code></p></td>
     <td><p><code>HAMMING</code></p></td>
   </tr>
</table>

<div class="alert note">

- For vector fields of the `SPARSE\_FLOAT\_VECTOR` type, use the `BM25` metric type only when performing full text search. For more information, refer to [Full Text Search](full-text-search.md).

- For vector fields of the `BINARY_VECTOR` type, the dimension value (`dim`) must be a multiple of 8.

</div>

The table below summarizes the characteristics of the similarity distance values of all supported metric types and their value range.

<table>
   <tr>
     <th><p>Metric Type</p></th>
     <th><p>Characteristics of the Similarity Distance Values</p></th>
     <th><p>Similarity Distance Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>L2</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code>IP</code></p></td>
     <td><p>A greater value indicates a greater similarity.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>COSINE</code></p></td>
     <td><p>A greater value indicates a greater similarity.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>JACCARD</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code>HAMMING</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code>BM25</code></p></td>
     <td><p>Score the relevance based on the term frequency, inverted document frequency, and document normalization.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>

## Euclidean distance (L2)

Essentially, Euclidean distance measures the length of a segment that connects 2 points.

The formula for Euclidean distance is as follows:

![Euclidean Metric](../../../../assets/euclidean-metric.png)

where **a = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** and **b = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)** are two points in n-dimensional Euclidean space.

It's the most commonly used distance metric and is very useful when the data are continuous.

<div class="alert note">

Milvus only calculates the value before applying the square root when Euclidean distance is chosen as the distance metric.

</div>

## Inner product (IP)

The IP distance between two embeddings is defined as follows:

![IP Formula](../../../../assets/IP-formula.png)

IP is more useful if you need to compare non-normalized data or when you care about magnitude and angle.

<div class="alert note">

If you use IP to calculate similarities between embeddings, you must normalize your embeddings. After normalization, the inner product equals cosine similarity.

</div>

Suppose X' is normalized from embedding X:

![Normalize Formula](../../../../assets/normalize-formula.png)

The correlation between the two embeddings is as follows:

![Correlation Between Embeddings](../../../../assets/correlation-between-embeddings.png)

## Cosine similarity

Cosine similarity uses the cosine of the angle between two sets of vectors to measure how similar they are. You can think of the two sets of vectors as line segments starting from the same point, such as [0,0,...], but pointing in different directions.

To calculate the cosine similarity between two sets of vectors **A = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** and **B = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)**, use the following formula:

![Cosine Similarity](../../../../assets/cosine-similarity.png)

The cosine similarity is always in the interval **[-1, 1]**. For example, two proportional vectors have a cosine similarity of **1**, two orthogonal vectors have a similarity of **0**, and two opposite vectors have a similarity of **-1**. The larger the cosine, the smaller the angle between the two vectors, indicating that these two vectors are more similar to each other.

By subtracting their cosine similarity from 1, you can get the cosine distance between two vectors.

## JACCARD distance

JACCARD similarity coefficient measures the similarity between two sample sets and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.

![JACCARD Similarity Coefficient Formula](../../../../assets/JACCARD-similarity-coefficient-formula.png)

JACCARD distance measures the dissimilarity between data sets and is obtained by subtracting the JACCARD similarity coefficient from 1. For binary variables, JACCARD distance is equivalent to the Tanimoto coefficient.

![JACCARD Distance Formula](../../../../assets/JACCARD-distance-formula.png)

## HAMMING distance

HAMMING distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.

For example, suppose there are two strings, 1101 1001 and 1001 1101.

11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the HAMMING distance, d (11011001, 10011101) = 2.

## BM25 similarity

BM25 is a widely used text relevance measurement method, specifically designed for [full text search](full-text-search.md). It combines the following three key factors:

- **Term Frequency (TF):** Measures how frequently a term appears in a document. While higher frequencies often indicate greater importance, BM25 uses the saturation parameter $k_1$ to prevent overly frequent terms from dominating the relevance score.

- **Inverse Document Frequency (IDF):** Reflects the importance of a term across the entire corpus. Terms appearing in fewer documents receive a higher IDF value, indicating greater contribution to relevance.

- **Document Length Normalization:** Longer documents tend to score higher due to containing more terms. BM25 mitigates this bias by normalizing document lengths, with parameter $b$ controlling the strength of this normalization.

The BM25 scoring is calculated as follows:

$$
score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}
$$

Parameter description:

- $Q$: The query text provided by the user.

- $D$: The document being evaluated.

- $TF(q_i, D)$: Term frequency, representing how often term $q_i$appears in document $D$.

- $IDF(q_i)$: Inverse document frequency, calculated as:

    $$
    IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)
    $$

    where $N$ is the total number of documents in the corpus, and$n(q_i)$ is the number of documents containing term $q_i$.

- $|D|$: Length of document $D$ (total number of terms).

- $avgdl$: Average length of all documents in the corpus.

- $k_1$: Controls the influence of term frequency on the score. Higher values increase the importance of term frequency. The typical range is [1.2, 2.0], while Milvus allows a range of [0, 3].

- $b$: Controls the degree of length normalization, ranging from 0 to 1. When the value is 0, no normalization is applied; when the value is 1, full normalization is applied.

