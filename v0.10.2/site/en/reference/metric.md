---
id: metric.md
---

# Distance Metrics

In Milvus, distance metrics are used to measure similarities among vectors. Choosing a good distance metric helps improve the classification and clustering performance significantly.

Below table shows how these widely used distance metrics fit with various input data forms and Milvus indexes.

| Input Data | Distance Metrics                                             | Index Types                                                    |
| ---------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| Float      | Euclidean distance (L2) and inner product (IP)              | `FLAT`, `IVF_FLAT`, `IVF_SQ8`, `IVF_SQ8H`, `IVF_PQ`, `RNSG`, `HNSW` |
| Binary     | Jaccard, Tanimoto, Hamming, superstructure(FLAT only), and substructure(FLAT only) | `FLAT`, `IVF_FLAT`                                               |

### Euclidean distance (L2)

Essentially, Euclidean distance measures the length of a segment that connects 2 points.

The formula for Euclidean distance is as follows:

![euclidean](../../../assets/euclidean_metric.png)

where **a** = (a1, a2,..., an) and **b** = (b1, b2,..., bn) are two points in n-dimensional Euclidean space

It's the most commonly used distance metric, and is very useful when the data is continuous.

### Inner product (IP)

IP measures the cosine of the angle between 2 vectors, and returns the normalized dot product of them.

So the formula for IP is:

![ip](../../../assets/ip_metric.png)

where A and B are vectors, `||A||` and `||B||` are the norms of A and B, and cosθ is the cosine of the angle between A and B.

IP is more useful if you are more interested in measuring the orientation but not the magnitude of the vectors.

<div class="alert note">
If the vectors are normalized, IP is equivalent to cosine similarity. Thus, Milvus does not provide a metric for cosine similarity.
</div>

### Jaccard distance

Jaccard similarity coefficient measures the similarity between two sample sets, and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.

![Jaccard similarity coefficient](../../../assets/jaccard_coeff.png)

Jaccard distance measures the dissimilarity between data sets, and is obtained by subtracting the Jaccard similarity coefficient from 1. For binary variables, Jaccard distance is equivalent to Tanimoto coefficient.

![Jaccard distance](../../../assets/jaccard_dist.png)

### Tanimoto distance

For binary variables, the Tanimoto coefficient is equivalent to Jaccard distance:

![tanimoto coefficient](../../../assets/tanimoto_coeff.png)

In Milvus, the Tanimoto coefficient is only applicable for a binary variable, and for binary variables the Tanimoto coefficient ranges from 0 to +1 (where +1 is the highest similarity).

For binary variables, the formula of Tanimoto distance is:

![tanimoto distance](../../../assets/tanimoto_dist.png)

The value ranges from 0 to +infinity.

### Hamming distance

Hamming distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.

For example, suppose there are two strings 1101 1001 and 1001 1101.

11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the Hamming distance, d (11011001, 10011101) = 2.

### Superstructure

Superstructure is used to measure the similarity of a chemical structure and its superstructure. The less the value, the more similar the structure is to its superstructure. Only the vectors whose distance equals to 0 can be found now.

Superstructure similarity can be measured by:

![superstructure](../../../assets/superstructure.png)

Where

- B is the superstructure of A
- N<sub>A</sub> specifies the number of bits in the fingerprint of molecular A.
- N<sub>B</sub> specifies the number of bits in the fingerprint of molecular B.
- N<sub>AB</sub> specifies the number of shared bits in the fingerprint of molecular A and B.

### Substructure

Substructure is used to measure the similarity of a chemical structure and its substructure. The less the value, the more similar the structure is to its substructure. Only the vectors whose distance equals to 0 can be found now.

Substructure similarity can be measured by:

![substructure](../../../assets/substructure.png)

Where

- B is the substructure of A
- N<sub>A</sub> specifies the number of bits in the fingerprint of molecular A.
- N<sub>B</sub> specifies the number of bits in the fingerprint of molecular B.
- N<sub>AB</sub> specifies the number of shared bits in the fingerprint of molecular A and B.


## FAQ

<details>
<summary><font color="#3ab7f8">Why is the top1 result of a vector search not the search vector itself, if the metric type is inner product?</font></summary>
This occurs if you have not normalized the vectors when using inner product as the distance metric.
</details>
<details>
<summary><font color="#3ab7f8">What is normalization? Why is normalization needed?</font></summary>
To normalize a vector is to uniformly set the length of all vectors to 1. If you have normalized the vectors in the same space, then the top k nearest vectors returned using Euclidean distance (L2) are identical to the the nearest vectors returned using inner product (IP).

See [Wikipedia](https://en.wikipedia.org/wiki/Unit_vector) for more information.
</details>
<details>
<summary><font color="#3ab7f8">Why do I get different results using Euclidean distance (L2) and inner product (IP) as the distance metric?</font></summary>
Check if the vectors are normalized. If not, you need to normalize the vectors first. Theoretically speaking, similarities worked out by L2 are different from similarities worked out by IP, if the vectors are not normalized.
</details>
