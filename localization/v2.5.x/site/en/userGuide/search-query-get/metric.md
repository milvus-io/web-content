---
id: metric.md
title: Metric Types
summary: >-
  Similarity metrics are used to measure similarities among vectors. Choosing an
  appropriate distance metric helps improve classification and clustering
  performance significantly.
---
<h1 id="Metric-Types" class="common-anchor-header">Metric Types<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Similarity metrics are used to measure similarities among vectors. Choosing an appropriate distance metric helps improve classification and clustering performance significantly.</p>
<p>Currently, Milvus supports these types of similarity Metrics: Euclidean distance (<code translate="no">L2</code>), Inner Product (<code translate="no">IP</code>), Cosine Similarity (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, and <code translate="no">BM25</code> (specifically designed for full text search on sparse vectors).</p>
<p>The table below summarizes the mapping between different field types and their corresponding metric types.</p>
<table>
   <tr>
     <th><p>Field Type</p></th>
     <th><p>Dimension Range</p></th>
     <th><p>Supported Metric Types</p></th>
     <th><p>Default Metric Type</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>No need to specify the dimension.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (used only for full text search)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>For vector fields of the <code translate="no">SPARSE\_FLOAT\_VECTOR</code> type, use the <code translate="no">BM25</code> metric type only when performing full text search. For more information, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p></li>
<li><p>For vector fields of the <code translate="no">BINARY_VECTOR</code> type, the dimension value (<code translate="no">dim</code>) must be a multiple of 8.</p></li>
</ul>
</div>
<p>The table below summarizes the characteristics of the similarity distance values of all supported metric types and their value range.</p>
<table>
   <tr>
     <th><p>Metric Type</p></th>
     <th><p>Characteristics of the Similarity Distance Values</p></th>
     <th><p>Similarity Distance Value Range</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>A greater value indicates a greater similarity.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>A greater value indicates a greater similarity.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>A smaller value indicates a greater similarity.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Score the relevance based on the term frequency, inverted document frequency, and document normalization.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Euclidean distance (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Essentially, Euclidean distance measures the length of a segment that connects 2 points.</p>
<p>The formula for Euclidean distance is as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
    <span>Euclidean Metric</span>
  </span>
</p>
<p>where <strong>a = (a<sub>0</sub>, a<sub>1</sub>,…, a<sub>n-1</sub>)</strong> and <strong>b = (b<sub>0</sub>, b<sub>1</sub>,…, b<sub>n-1</sub>)</strong> are two points in n-dimensional Euclidean space.</p>
<p>It’s the most commonly used distance metric and is very useful when the data are continuous.</p>
<div class="alert note">
<p>Milvus only calculates the value before applying the square root when Euclidean distance is chosen as the distance metric.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Inner product (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>The IP distance between two embeddings is defined as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
    <span>IP Formula</span>
  </span>
</p>
<p>IP is more useful if you need to compare non-normalized data or when you care about magnitude and angle.</p>
<div class="alert note">
<p>If you use IP to calculate similarities between embeddings, you must normalize your embeddings. After normalization, the inner product equals cosine similarity.</p>
</div>
<p>Suppose X’ is normalized from embedding X:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
    <span>Normalize Formula</span>
  </span>
</p>
<p>The correlation between the two embeddings is as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
    <span>Correlation Between Embeddings</span>
  </span>
</p>
<h2 id="Cosine-similarity" class="common-anchor-header">Cosine similarity<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>Cosine similarity uses the cosine of the angle between two sets of vectors to measure how similar they are. You can think of the two sets of vectors as line segments starting from the same point, such as [0,0,…], but pointing in different directions.</p>
<p>To calculate the cosine similarity between two sets of vectors <strong>A = (a<sub>0</sub>, a<sub>1</sub>,…, a<sub>n-1</sub>)</strong> and <strong>B = (b<sub>0</sub>, b<sub>1</sub>,…, b<sub>n-1</sub>)</strong>, use the following formula:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
    <span>Cosine Similarity</span>
  </span>
</p>
<p>The cosine similarity is always in the interval <strong>[-1, 1]</strong>. For example, two proportional vectors have a cosine similarity of <strong>1</strong>, two orthogonal vectors have a similarity of <strong>0</strong>, and two opposite vectors have a similarity of <strong>-1</strong>. The larger the cosine, the smaller the angle between the two vectors, indicating that these two vectors are more similar to each other.</p>
<p>By subtracting their cosine similarity from 1, you can get the cosine distance between two vectors.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">JACCARD distance<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD similarity coefficient measures the similarity between two sample sets and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
    <span>JACCARD Similarity Coefficient Formula</span>
  </span>
</p>
<p>JACCARD distance measures the dissimilarity between data sets and is obtained by subtracting the JACCARD similarity coefficient from 1. For binary variables, JACCARD distance is equivalent to the Tanimoto coefficient.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
    <span>JACCARD Distance Formula</span>
  </span>
</p>
<h2 id="HAMMING-distance" class="common-anchor-header">HAMMING distance<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>HAMMING distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.</p>
<p>For example, suppose there are two strings, 1101 1001 and 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the HAMMING distance, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">BM25 similarity<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 is a widely used text relevance measurement method, specifically designed for <a href="/docs/full-text-search.md">full text search</a>. It combines the following three key factors:</p>
<ul>
<li><p><strong>Term Frequency (TF):</strong> Measures how frequently a term appears in a document. While higher frequencies often indicate greater importance, BM25 uses the saturation parameter k_1 to prevent overly frequent terms from dominating the relevance score.</p></li>
<li><p><strong>Inverse Document Frequency (IDF):</strong> Reflects the importance of a term across the entire corpus. Terms appearing in fewer documents receive a higher IDF value, indicating greater contribution to relevance.</p></li>
<li><p><strong>Document Length Normalization:</strong> Longer documents tend to score higher due to containing more terms. BM25 mitigates this bias by normalizing document lengths, with parameter b controlling the strength of this normalization.</p></li>
</ul>
<p>The BM25 scoring is calculated as follows:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Parameter description:</p>
<ul>
<li><p>Q: The query text provided by the user.</p></li>
<li><p>D: The document being evaluated.</p></li>
<li><p>TF(q_i, D): Term frequency, representing how often term q_iappears in document D.</p></li>
<li><p>IDF(q_i): Inverse document frequency, calculated as:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>where N is the total number of documents in the corpus, andn(q_i) is the number of documents containing term q_i.</p></li>
<li><p>|D|: Length of document D (total number of terms).</p></li>
<li><p>avgdl: Average length of all documents in the corpus.</p></li>
<li><p>k_1: Controls the influence of term frequency on the score. Higher values increase the importance of term frequency. The typical range is [1.2, 2.0], while Milvus allows a range of [0, 3].</p></li>
<li><p>b: Controls the degree of length normalization, ranging from 0 to 1. When the value is 0, no normalization is applied; when the value is 1, full normalization is applied.</p></li>
</ul>
