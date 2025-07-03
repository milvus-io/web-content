---
id: random-sampling.md
title: 隨機抽樣Compatible with Milvus 2.6.x
summary: >-
  在處理大規模資料集時，您通常不需要處理所有資料來獲得洞察力或測試篩選邏輯。隨機抽樣提供了一個解決方案，讓您可以處理具有統計代表性的資料子集，大幅減少查詢時間和資源消耗。
beta: Milvus 2.6.x
---
<h1 id="Random-Sampling" class="common-anchor-header">隨機抽樣<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-Sampling" class="anchor-icon" translate="no">
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
    </button></h1><p>在處理大規模資料集時，您通常不需要處理所有資料來獲得洞察力或測試篩選邏輯。隨機抽樣提供了一個解決方案，讓您可以處理具有統計代表性的資料子集，大幅減少查詢時間和資源消耗。</p>
<p>隨機抽樣在區段層級運作，可確保高效的效能，同時在您的集合資料分佈中維持抽樣的隨機性。</p>
<p><strong>主要用例：</strong></p>
<ul>
<li><p><strong>資料探索</strong>：以最少的資源使用量快速預覽資料集結構和內容</p></li>
<li><p><strong>開發測試</strong>：在全面部署之前，在可管理的資料樣本上測試複雜的篩選邏輯</p></li>
<li><p><strong>資源最佳化</strong>：降低探索性查詢和統計分析的計算成本</p></li>
</ul>
<h2 id="Syntax" class="common-anchor-header">語法<button data-href="#Syntax" class="anchor-icon" translate="no">
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
    </button></h2><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>參數：</strong></p>
<ul>
<li><code translate="no">sampling_factor</code>:取樣係數，範圍為 (0，1)，不包括邊界。例如，<code translate="no">RANDOM_SAMPLE(0.001)</code> 會選取約 0.1% 的結果。</li>
</ul>
<p><strong>重要規則：</strong></p>
<ul>
<li><p>表達式不區分大小寫 (<code translate="no">RANDOM_SAMPLE</code> 或<code translate="no">random_sample</code>)</p></li>
<li><p>取樣係數必須在 (0, 1) 的範圍內，不包括邊界</p></li>
</ul>
<h2 id="Combine-with-other-filters" class="common-anchor-header">與其他篩選器結合<button data-href="#Combine-with-other-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>隨機抽樣運算符號必須使用邏輯<code translate="no">AND</code> 與其他篩選表達式結合。結合篩選器時，Milvus 會先套用其他條件，然後在結果集上執行隨機抽樣。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct: Filter first, then sample</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>
<span class="hljs-comment"># Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment"># Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&#x27;</span>  <span class="hljs-comment"># ❌ Invalid logic</span>
<span class="hljs-comment"># This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Data-exploration" class="common-anchor-header">範例 1：資料探索</h3><p>快速預覽您的集合結構：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample approximately 1% of the entire collection</span>
result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sampled <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> products from collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Combined-filtering-with-random-sampling" class="common-anchor-header">範例 2：結合篩選與隨機抽樣</h3><p>在可管理的子集中測試篩選邏輯：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># First filter by category and price, then sample 0.5% of results</span>
filter_expression = <span class="hljs-string">&#x27;category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> electronics products in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Quick-analytics" class="common-anchor-header">範例 3：快速分析</h3><p>在篩選過的資料上執行快速統計分析：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get insights from ~0.1% of premium customer data</span>
filter_expression = <span class="hljs-string">&#x27;customer_tier == &quot;premium&quot; AND region == &#x27;</span>North America<span class="hljs-string">&#x27; AND RANDOM_SAMPLE(0.001)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;customer_profiles&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Analyze sample for quick insights</span>
<span class="hljs-keyword">if</span> result:
    average_purchase = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;purchase_amount&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)
    average_satisfaction = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;satisfaction_score&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)
    
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sample size: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average purchase amount: $<span class="hljs-subst">{average_purchase:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average satisfaction score: <span class="hljs-subst">{average_satisfaction:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Combined-with-vector-search" class="common-anchor-header">範例 4：結合向量搜尋</h3><p>在篩選搜尋情境中使用隨機抽樣：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for similar products within a sampled subset</span>
search_results = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># query vector</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;books&quot; AND RANDOM_SAMPLE(0.01)&#x27;</span>,</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(search_results[<span class="hljs-number">0</span>])}</span> similar books in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">最佳實務<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>從小處開始</strong>：從較小的採樣因子 (0.001-0.01)<strong>開始</strong>進行初步探索</p></li>
<li><p><strong>開發工作流程</strong>：在開發過程中使用取樣，在生產查詢中移除取樣</p></li>
<li><p><strong>統計有效性</strong>：較大的樣本可提供更精確的統計表現</p></li>
<li><p><strong>效能測試</strong>：監控查詢效能，並視需要調整取樣因子</p></li>
</ul>
