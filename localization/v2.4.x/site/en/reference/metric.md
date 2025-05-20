---
id: metric.md
summary: >-
  Milvus supports a variety of similarity metrics, including Euclidean distance,
  inner product, Jaccard, etc.
title: Similarity Metrics
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Similarity Metrics<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>In Milvus, similarity metrics are used to measure similarities among vectors. Choosing a good distance metric helps improve the classification and clustering performance significantly.</p>
<p>The following table shows how these widely used similarity metrics fit with various input data forms and Milvus indexes. Currently, Milvus supports various types of data, including floating point embeddings (often known as floating point vectors or dense vectors), binary embeddings (also known as binary vectors), and sparse embeddings (also known as sparse vectors).</p>
<div class="filter">
  <a href="#floating">Floating point embeddings</a>
  <a href="#binary">Binary embeddings</a>
  <a href="#sparse">Sparse embeddings</a>
</div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
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
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
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
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metric Types</th>
    <th class="tg-0pky">Index Types</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Euclidean distance (L2)</h3><p>Essentially, Euclidean distance measures the length of a segment that connects 2 points.</p>
<p>The formula for Euclidean distance is as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
    <span>euclidean</span>
  </span>
</p>
<p>where <strong>a</strong> = (a<sub>0</sub>, a<sub>1</sub>,…, a<sub>n-1</sub>) and <strong>b</strong> = (b<sub>0</sub>, b<sub>0</sub>,…, b<sub>n-1</sub>) are two points in n-dimensional Euclidean space</p>
<p>It’s the most commonly used distance metric and is very useful when the data are continuous.</p>
<div class="alert note">
Milvus only caculates the value before applying square root when Euclidean distance is chosen as the distance metric.
</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Inner product (IP)</h3><p>The IP distance between two vector embeddings are defined as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
    <span>ip</span>
  </span>
</p>
<p>IP is more useful if you need to compare non-normalized data or when you care about magnitude and angle.</p>
<div class="alert note">
<p>If you apply the IP distance metric to normalized embeddings, the result will be equivalent to calculating the cosine similarity between the embeddings.</p>
</div>
<p>Suppose X’ is normalized from embedding X:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
    <span>normalize</span>
  </span>
</p>
<p>The correlation between the two embeddings is as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
    <span>normalization</span>
  </span>
</p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Cosine Similarity</h3><p>Cosine similarity uses the cosine of the angle between two sets of vectors to measure how similar they are. You can think of the two sets of vectors as two line segments that start from the same origin ([0,0,…]) but point in different directions.</p>
<p>To calculate the cosine similarity between two sets of vectors <strong>A = (a<sub>0</sub>, a<sub>1</sub>,…, a<sub>n-1</sub>)</strong> and <strong>B = (b<sub>0</sub>, b<sub>1</sub>,…, b<sub>n-1</sub>)</strong>, use the following formula:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
    <span>cosine_similarity</span>
  </span>
</p>
<p>The cosine similarity is always in the interval <strong>[-1, 1]</strong>. For example, two proportional vectors have a cosine similarity of <strong>1</strong>, two orthogonal vectors have a similarity of <strong>0</strong>, and two opposite vectors have a similarity of <strong>-1</strong>. The larger the cosine, the smaller the angle between two vectors, indicating that these two vectors are more similar to each other.</p>
<p>By subtracting their cosine similarity from 1, you can get the cosine distance between two vectors.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Jaccard distance</h3><p>Jaccard similarity coefficient measures the similarity between two sample sets and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
    <span>Jaccard similarity coefficient</span>
  </span>
</p>
<p>Jaccard distance measures the dissimilarity between data sets and is obtained by subtracting the Jaccard similarity coefficient from 1. For binary variables, Jaccard distance is equivalent to the Tanimoto coefficient.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
    <span>Jaccard distance</span>
  </span>
</p>
<h3 id="Hamming-distance" class="common-anchor-header">Hamming distance</h3><p>Hamming distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.</p>
<p>For example, suppose there are two strings, 1101 1001 and 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the Hamming distance, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Structural Similarity</h3><p>When a chemical structure occurs as a part of a larger chemical structure, the former is called a substructure and the latter is called a superstructure. For example, ethanol is a substructure of acetic acid, and acetic acid is a superstructure of ethanol.</p>
<p>Structural similarity is used to determine whether two chemical formulae are similar to each other in that one is the superstructure or substructure of the other.</p>
<p>To determine whether A is a superstructure of B, use the following formula:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
    <span>superstructure</span>
  </span>
</p>
<p>Where:</p>
<ul>
<li>A is the binary representation of a chemical formula to be retrieved</li>
<li>B is the binary representation of a chemical formula in the database</li>
</ul>
<p>Once it returns <code translate="no">0</code>, <strong>A</strong> is not a superstructure of <strong>B</strong>. Otherwise, the result is the other way around.</p>
<p>To determine whether A is a substructure of B, use the following formula:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
    <span>substructure</span>
  </span>
</p>
<p>Where:</p>
<ul>
<li>A is the binary representation of a chemical formula to be retrieved</li>
<li>B is the binary representation of a chemical formula in the database</li>
</ul>
<p>Once it returns <code translate="no">0</code>, <strong>A</strong> is not a substructure of <strong>B</strong>. Otherwise, the result is the other way around.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><details>
<summary><font color="#4fc4f9">Why is the top1 result of a vector search not the search vector itself, if the metric type is inner product?</font></summary>
This occurs if you have not normalized the vectors when using inner product as the distance metric.
</details>
<details>
<summary><font color="#4fc4f9">What is normalization? Why is normalization needed?</font></summary></p>
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
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li>Learn more about the supported <a href="/docs/v2.4.x/index.md">index types</a> in Milvus.</li>
</ul>
