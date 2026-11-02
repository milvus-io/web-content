---
id: filtered-search.md
title: 过滤搜索
summary: >-
  人工神经网络（ANN）搜索可找到与指定向量嵌入最相似的向量嵌入。不过，搜索结果未必总是正确的。您可以在搜索请求中添加过滤条件，以便 Milvus 在进行
  ANN 搜索之前先执行元数据过滤，将搜索范围从整个 Collection 缩小到仅包含符合指定过滤条件的实体。
---
<h1 id="Filtered-Search" class="common-anchor-header">过滤搜索<button data-href="#Filtered-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>人工神经网络（ANN）搜索会查找与指定向量嵌入最相似的向量嵌入。然而，搜索结果未必总是正确的。您可以在搜索请求中添加过滤条件，以便 Milvus 在执行 ANN 搜索之前先进行元数据过滤，将搜索范围从整个 Collection 缩小到仅包含符合指定过滤条件的实体。</p>
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
    </button></h2><p>在 Milvus 中，过滤搜索根据过滤操作的执行阶段分为两类：<strong>标准过滤</strong>和<strong>迭代过滤</strong>。</p>
<h3 id="Standard-filtering" class="common-anchor-header">标准过滤<button data-href="#Standard-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>如果 Collection 同时包含向量嵌入及其元数据，您可以在进行 ANN 搜索前对元数据进行过滤，以提高搜索结果的相关性。一旦 Milvus 收到包含过滤条件的搜索请求，它就会将搜索范围限制在符合指定过滤条件的实体内。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/filtered-search.png" alt="Filtered Search" class="doc-image" id="filtered-search" /> 
   <span>带过滤条件的搜索</span>
  
 </span></p>
<p>如上图所示，搜索请求携带<code translate="no">chunk like &quot;%red%&quot;</code> 作为过滤条件，这表明Milvus应在所有<code translate="no">chunk</code> 字段中包含“<code translate="no">red</code> ”一词的实体范围内进行ANN搜索。具体而言，Milvus将执行以下操作：</p>
<ul>
<li><p>筛选出符合搜索请求中携带的筛选条件的实体。</p></li>
<li><p>在筛选后的实体中进行 ANN 搜索。</p></li>
<li><p>返回前 K 个实体。</p></li>
</ul>
<h3 id="Iterative-filtering" class="common-anchor-header">迭代过滤<button data-href="#Iterative-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>标准过滤过程能有效地将搜索范围缩小到一个较小的范围。然而，过于复杂的过滤表达式可能会导致搜索延迟过高。在这种情况下，迭代过滤可以作为一种替代方案，有助于减轻标量过滤的工作负载。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/iterative-filtering.png" alt="Iterative Filtering" class="doc-image" id="iterative-filtering" /> 
   <span>迭代过滤</span>
  
 </span></p>
<p>如上图所示，采用迭代过滤的搜索会分迭代地执行向量搜索。迭代器返回的每个实体都会经过标量过滤，该过程将持续进行，直至获得指定的前K个结果。</p>
<p>该方法显著减少了需要进行标量过滤的实体数量，因此对于处理高度复杂的过滤表达式尤为有益。</p>
<p>但需要注意的是，迭代器每次仅处理一个实体。这种顺序处理方式可能会导致处理时间延长或引发潜在的性能问题，特别是在大量实体需要进行标量过滤时。</p>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>本节演示如何进行过滤搜索。本节中的代码片段假设您的集合中已包含以下实体。每个实体有四个字段，即<strong>id</strong>、<strong>向量</strong>、<strong>color</strong> 和<strong>likes</strong>。示例使用了一个名为<code translate="no">my_collection</code> 的已加载集合，其中包含一个五维的<code translate="no">vector</code> 字段，该字段使用<code translate="no">COSINE</code> 度量进行了索引。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3580376395471989</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6023495712049978</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.18414012509913835</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.26286205330961354</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9029438446296592</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pink_8682&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">165</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19886812562848388</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.06023560599112088</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6976963061752597</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2614474506242501</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.838729485096104</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_7025&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.43742130801983836</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.5597502546264526</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6457887650909682</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7894058910881185</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20785793220625592</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;orange_6781&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">764</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3172005263489739</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9719044792798428</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.36981146090600725</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.4860894583077995</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.95791889146345</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pink_9298&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">234</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.4452349528804562</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8757026943054742</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8220779437047674</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.46406290649483184</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30337481143159106</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_4794&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">122</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.985825131989184</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8144651566660419</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.6299267002202009</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.1206906911183383</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.1446277761879955</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;yellow_4222&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.8371977790571115</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.015764369584852833</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.31062937026679327</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.562666951622192</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8984947637863987</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_9392&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">58</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">-0.33445148015177995</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.2567135004164067</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8987539745369246</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.9402995886420709</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5378064918413052</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;grey_8510&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">775</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">8</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.39524717779832685</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4000257286739164</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.5890507376891594</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.8650502298996872</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6140360785406336</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white_9381&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">876</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">9</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.5718280481994695</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24070317428066512</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.3737913482606834</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.06726932177492717</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.6980531615588608</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;purple_4976&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">765</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果查询向量已在目标 Collection 中存在，请考虑直接使用<code translate="no">ids</code> ，而非在搜索前重新检索它们。有关详细信息，请参阅<a href="/docs/zh/primary-key-search.md">“主键搜索”</a>。</p>
</div>
<p>示例使用 PyMilvus 3.0.2、Java SDK 3.0.10、Go SDK 3.0.0（<code translate="no">client/v3</code> ）、Rust SDK 3.0.2、C++ SDK 3.0.4、NodeJS SDK 3.0.6 以及 C# SDK 3.0.0。</p>
<h3 id="Search-with-standard-filtering" class="common-anchor-header">使用标准过滤条件进行搜索<button data-href="#Search-with-standard-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>以下代码片段演示了带标准过滤条件的搜索，其中请求包含一个过滤条件和多个输出字段。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">5</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_4794, likes=122}, score=0.5975797, id=4)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_9392, likes=58}, score=-0.24996188, id=6)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like &#x27;red%&#x27; and likes &gt; 50&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3580376395471989f32</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;color&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;likes&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[]
{
    <span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>
});

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = <span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span> }
    }
});
<span class="hljs-keyword">if</span> (res.SingleResults <span class="hljs-keyword">is</span> { } results)
{
    Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, results.SelectMany(r =&gt; r.Scores)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;]
}&#x27;</span>
<span class="hljs-comment"># Illustrative response; scores and cost can vary.</span>
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_4794&quot;,&quot;distance&quot;:0.5975796,&quot;id&quot;:4,&quot;likes&quot;:122},{&quot;color&quot;:&quot;red_9392&quot;,&quot;distance&quot;:-0.2499619,&quot;id&quot;:6,&quot;likes&quot;:58}],&quot;topks&quot;:[2]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>搜索请求中携带的筛选条件为<code translate="no">color like &quot;red%&quot; and likes &gt; 50</code> 。该条件使用“and”操作符包含两项条件：第一项要求实体的<code translate="no">color</code> 字段值以<code translate="no">red</code> 开头，另一项要求实体的<code translate="no">likes</code> 字段值大于<code translate="no">50</code> 。 只有两个实体符合这些要求。当 top-K 设置为<code translate="no">5</code> 时，Milvus 将计算这两个实体与查询向量之间的距离，并将其作为搜索结果返回。</p>
<p>以下示例展示了 Python 结果的结构，并附有示例余弦得分。得分可能会因浮点精度而有所差异。<code translate="no">entity</code> 中仅显示请求的输出字段；REST 示例会在每个命中结果的顶层返回这些字段。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;distance&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.5975796</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;entity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_4794&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">122</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;distance&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">-0.2499619</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;entity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red_9392&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;likes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">58</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关元数据过滤中可使用的操作符的更多信息，请参阅《<a href="/docs/zh/boolean.md">过滤原理说明</a>》。</p>
<h3 id="Search-with-iterative-filtering" class="common-anchor-header">使用迭代过滤进行搜索<button data-href="#Search-with-iterative-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用迭代过滤进行过滤搜索，可以按照以下步骤操作：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
<span class="highlighted-comment-line">    search_params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hints&quot;</span>: <span class="hljs-string">&quot;iterative_filter&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .limit(<span class="hljs-number">5</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .searchParams(Collections.&lt;String, Object&gt;singletonMap(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_4794, likes=122}, score=0.5975797, id=4)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_9392, likes=58}, score=-0.24996188, id=6)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like &#x27;red%&#x27; and likes &gt; 50&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3580376395471989f32</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>])
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;hints&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;iterative_filter&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())]))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)
                   .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;hints&quot;</span>, <span class="hljs-string">&quot;iterative_filter&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;color&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;likes&quot;</span>);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;TopK results:&quot;</span> &lt;&lt; std::endl;
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">hints</span>: <span class="hljs-string">&quot;iterative_filter&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>]</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[]
{
    <span class="hljs-number">0.3580376395471989f</span>, <span class="hljs-number">-0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, <span class="hljs-number">-0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>
});

<span class="hljs-keyword">var</span> searchParams = <span class="hljs-keyword">new</span> SearchParameters
{
    Expression = <span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>,
    Hints = <span class="hljs-string">&quot;iterative_filter&quot;</span>,
    OutputFields = { <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span> }
};

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = searchParams
});
<span class="hljs-keyword">if</span> (res.SingleResults <span class="hljs-keyword">is</span> { } results)
{
    Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, results.SelectMany(r =&gt; r.Scores)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;,
    &quot;searchParams&quot;: {&quot;hints&quot;: &quot;iterative_filter&quot;},
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;]
}&#x27;</span>
<span class="hljs-comment"># Illustrative response; scores and cost can vary.</span>
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_4794&quot;,&quot;distance&quot;:0.5975796,&quot;id&quot;:4,&quot;likes&quot;:122},{&quot;color&quot;:&quot;red_9392&quot;,&quot;distance&quot;:-0.2499619,&quot;id&quot;:6,&quot;likes&quot;:58}],&quot;topks&quot;:[2]}</span>
<button class="copy-code-btn"></button></code></pre>
