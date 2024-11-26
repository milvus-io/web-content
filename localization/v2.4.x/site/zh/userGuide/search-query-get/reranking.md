---
id: reranking.md
summary: 本专题涉及 Rerankers 流程，解释其意义和两种 Reranking 方法的实施。
title: 重新排名
---
<h1 id="Reranking" class="common-anchor-header">重新排名<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>API 实现了混合搜索功能，并结合了复杂的重排策略，以完善来自多个<code translate="no">AnnSearchRequest</code> 实例的搜索结果。本主题将介绍重排过程，解释其意义以及 Milvus 中不同重排策略的实施。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>下图展示了在 Milvus 中执行混合搜索的过程，并强调了重排在此过程中的作用。</p>
<p><img translate="no" src="/docs/v2.4.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>混合搜索中的重新排序是一个关键步骤，它可以整合来自多个向量场的结果，确保最终输出结果具有相关性并能准确排出优先级。目前，Milvus 提供以下重新排序策略：</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>:这种方法通过计算来自不同向量搜索的得分（或向量距离）的加权平均值来合并结果。它根据每个向量场的重要性分配权重。</p></li>
<li><p><code translate="no">RRFRanker</code>:这种策略根据结果在不同向量列中的排名来合并结果。</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">加权评分（WeightedRanker）<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">WeightedRanker</code> 策略根据每个向量字段的重要性，为每个向量检索路径的结果分配不同的权重。当每个向量字段的重要性不同时，就会应用这种 Rerankers 策略，这样就可以通过给某些向量字段分配更高的权重，使其比其他向量字段更受重视。例如，在多模态搜索中，文本描述可能比图像中的颜色分布更重要。</p>
<p>WeightedRanker 的基本流程如下：</p>
<ul>
<li><p><strong>在检索过程中收集分数</strong>：收集来自不同向量检索路径的结果及其分数。</p></li>
<li><p><strong>分数归一化</strong>：将每条路径的得分归一化为 [0,1] 范围，其中接近 1 的值表示相关性更高。这种归一化非常重要，因为分数分布会随不同的度量类型而变化。例如，IP 的距离范围为 [-∞,+∞]，而 L2 的距离范围为 [0,+∞]。Milvus 采用<code translate="no">arctan</code> 函数，将数值转换为 [0,1] 范围，为不同度量类型提供标准化基础。</p>
<p><img translate="no" src="/docs/v2.4.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>权重分配</strong>：为每个向量检索路径分配一个权重<code translate="no">w𝑖</code> 。用户指定的权重反映了数据源的可靠性、准确性或其他相关指标。每个权重的范围为 [0,1]。</p></li>
<li><p><strong>分数融合</strong>：计算归一化分数的加权平均值，得出最终分数。然后根据这些从高到低的分数对结果进行排序，生成最终的排序结果。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>加权 Reranker</span> </span></p>
<p>要使用此策略，请应用<code translate="no">WeightedRanker</code> 实例，并通过传递可变数量的数字参数来设置权重值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>请注意</p>
<ul>
<li><p>每个权重值的范围从 0（最不重要）到 1（最重要），影响最终的综合得分。</p></li>
<li><p><code translate="no">WeightedRanker</code> 中提供的权重值总数应等于您之前创建的<code translate="no">AnnSearchRequest</code> 实例数。</p></li>
<li><p>值得注意的是，由于不同度量类型的测量方法不同，我们对召回结果的距离进行了归一化处理，使其位于区间 [0,1]，其中 0 表示不同，1 表示相似。最终得分将是权重值和距离的总和。</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">互易等级融合（RRFRanker）<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF 是一种数据融合方法，它根据排名的倒数来组合排名列表。它是一种平衡各向量场影响的有效方法，尤其是在没有明确的重要性优先顺序时。这种策略通常用于想要对所有向量场给予同等考虑，或对每个场的相对重要性存在不确定性时。</p>
<p>RRF 的基本流程如下：</p>
<ul>
<li><p><strong>在检索过程中收集排名</strong>：检索器跨多个向量字段检索并对结果进行排序。</p></li>
<li><p><strong>排名融合</strong>：RRF 算法对每个检索器的排名进行权衡和合并。计算公式如下</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRF-ranker</span> </span></p>
<p>这里，𝑁 表示不同检索路径的数量，rank𝑖(𝑑) 是第 𝑖 个检索器检索到的文档𝑑 的排名位置，𝑘 是平滑参数，通常设置为 60。</p></li>
<li><p><strong>综合排名</strong>：根据综合得分对检索结果重新排序，得出最终结果。</p></li>
</ul>
<p>要使用这一策略，请应用<code translate="no">RRFRanker</code> 实例。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF 允许在不指定明确权重的情况下平衡各领域的影响。在最终排名中，多个字段一致同意的最匹配结果将被优先排序。</p>
