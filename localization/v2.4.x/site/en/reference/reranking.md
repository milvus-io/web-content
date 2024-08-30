---
id: reranking.md
summary: >-
  This topic covers the reranking process, explaining its significance and
  implementation of two reranking methods.
title: Reranking
---
<h1 id="Reranking" class="common-anchor-header">Reranking<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus enables hybrid search capabilities using the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a> API, incorporating sophisticated reranking strategies to refine search results from multiple <code translate="no">AnnSearchRequest</code> instances. This topic covers the reranking process, explaining its significance and implementation of different reranking strategies in Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>The following figure illustrates the execution of a hybrid search in Milvus and highlights the role of reranking in the process.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Reranking in hybrid search is a crucial step that consolidates results from several vector fields, ensuring the final output is relevant and accurately prioritized. Currently, Milvus offers these reranking strategies:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: This approach merges results by calculating a weighted average of scores (or vector distances) from different vector searches. It assigns weights based on the significance of each vector field.</p></li>
<li><p><code translate="no">RRFRanker</code>: This strategy combines results based on their ranks across different vector columns.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Weighted Scoring (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>The <code translate="no">WeightedRanker</code> strategy assigns different weights to results from each vector retrieval route based on the significance of each vector field. This reranking strategy is applied when the significance of each vector field varies, allowing you to emphasize certain vector fields over others by assigning them higher weights. For example, in a multimodal search, the text description might be considered more important than the color distribution in images.</p>
<p>WeightedRanker’s basic process is as follows:</p>
<ul>
<li><p><strong>Collect Scores During Retrieval</strong>: Gather results and their scores from different vector retrieval routes.</p></li>
<li><p><strong>Score Normalization</strong>: Normalize the scores from each route to a [0,1] range, where values closer to 1 indicate higher relevance. This normalization is crucial due to score distributions varying with different metric types. For instance, the distance for IP ranges from [-∞,+∞], while the distance for L2 ranges from [0,+∞]. Milvus employs the <code translate="no">arctan</code> function, transforming values to the [0,1] range to provide a standardized basis for different metric types.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Weight Allocation</strong>: Assign a weight <code translate="no">w𝑖</code> to each vector retrieval route. Users specify the weights, which reflect the data source’s reliability, accuracy, or other pertinent metrics. Each weight ranges from [0,1].</p></li>
<li><p><strong>Score Fusion</strong>: Calculate a weighted average of the normalized scores to derive the final score. The results are then ranked based on these highest to lowest scores to generate the final sorted results.</p></li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
    <span>weighted-reranker</span>
  </span>
</p>
<p>To use this strategy, apply a <code translate="no">WeightedRanker</code> instance and set weight values by passing in a variable number of numeric arguments.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Note that:</p>
<ul>
<li><p>Each weight value ranges from 0 (least important) to 1 (most important), influencing the final aggregated score.</p></li>
<li><p>The total number of weight values provided in <code translate="no">WeightedRanker</code> should equal the number of <code translate="no">AnnSearchRequest</code> instances you have created earlier.</p></li>
<li><p>It is worth noting that due to the different measurements of the different metric types, we normalize the distances of the recall results so that they lie in the interval [0,1], where 0 means different and 1 means similar. The final score will be the sum of the weight values and distances.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Reciprocal Rank Fusion (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF is a data fusion method that combines ranking lists based on the reciprocal of their ranks. It is an effective way to balance the influence of each vector field, especially when there is no clear precedence of importance. This strategy is typically used when you want to give equal consideration to all vector fields or when there is uncertainty about the relative importance of each field.</p>
<p>RRF’s basic process is as follows:</p>
<ul>
<li><p><strong>Collect Rankings During Retrieval</strong>: Retrievers across multiple vector fields retrieve and sort results.</p></li>
<li><p><strong>Rank Fusion</strong>: The RRF algorithm weighs and combines the ranks from each retriever. The formula is as follows:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
    <span>rrf-ranker</span>
  </span>
</p>
<p>Here, 𝑁 represents the number of different retrieval routes, rank𝑖(𝑑) is the rank position of retrieved document 𝑑 by the 𝑖th retriever, and 𝑘 is a smoothing parameter, typically set to 60.</p></li>
<li><p><strong>Comprehensive Ranking</strong>: Re-rank the retrieved results based on the combined scores to produce the final results.</p></li>
</ul>
<p>To use this strategy, apply an <code translate="no">RRFRanker</code> instance.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF allows balancing influence across fields without specifying explicit weights. The top matches agreed upon by multiple fields will be prioritized in the final ranking.</p>
