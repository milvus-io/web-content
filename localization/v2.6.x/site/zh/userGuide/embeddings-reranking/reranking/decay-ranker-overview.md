---
id: decay-ranker-overview.md
title: 衰减排名器概述Compatible with Milvus 2.6.x
summary: 在传统的向量搜索中，搜索结果的排序完全取决于向量的相似性--向量在数学空间中的匹配程度。但在实际应用中，内容的真正相关性往往不仅仅取决于语义相似性。
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">衰减排名器概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在传统的向量搜索中，搜索结果的排名完全取决于向量的相似性--向量在数学空间中的匹配程度。但在实际应用中，内容是否真正相关往往不仅仅取决于语义相似性。</p>
<p>考虑一下这些日常场景：</p>
<ul>
<li><p>在新闻搜索中，昨天的文章应该比三年前的类似文章排名靠前</p></li>
<li><p>餐厅搜索器，优先考虑 5 分钟车程内的餐厅，而不是需要 30 分钟车程的餐厅</p></li>
<li><p>一个电子商务平台，即使流行产品与搜索查询的相似度稍低，也能提升它们的排名</p></li>
</ul>
<p>这些场景都有一个共同的需求：平衡向量相似性与时间、距离或流行度等其他数字因素。</p>
<p>Milvus 中的衰减排名器可根据数值字段值调整搜索排名，从而满足这一需求。它们允许您平衡向量相似性与数据的 "新鲜度"、"接近度 "或其他数值属性，从而创建更直观、与上下文更相关的搜索体验。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>衰减排名不能与分组搜索一起使用。</p></li>
<li><p>用于衰减排名的字段必须是数字（<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code> 或<code translate="no">DOUBLE</code> ）。</p></li>
<li><p>每个衰减排名器只能使用一个数字字段。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>衰减排序将时间或地理距离等数值因素纳入排序过程，从而增强了传统的向量搜索。整个过程分为以下几个阶段：</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">阶段 1：计算归一化的相似性得分</h3><p>首先，Milvus 计算并归一化向量相似性得分，以确保比较的一致性：</p>
<ul>
<li><p>对于<strong>L2</strong>和<strong>JACCARD</strong>距离指标（数值越小，表示相似度越高）：</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>这将距离转化为 0-1 之间的相似性分数，越高越好。</p></li>
<li><p>对于<strong>IP</strong>、<strong>COSINE</strong> 和<strong>BM25</strong>指标（分数越高表示匹配度越高）：直接使用分数，无需进行归一化处理。</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">第二阶段：计算衰减分数</h3><p>接下来，Milvus 根据数值字段值（如时间戳或距离），使用您选择的衰减排名器计算衰减分数：</p>
<ul>
<li><p>每个衰减排名器都会将原始数值转化为 0-1 之间的归一化相关性分数。</p></li>
<li><p>衰减分数表示一个项目与理想点的 "距离 "相关程度</p></li>
</ul>
<p>具体计算公式因衰减排名器类型而异。有关如何计算衰减分数的详情，请参阅<a href="/docs/zh/gaussian-decay.md#Formula">高斯衰减</a>、<a href="/docs/zh/exponential-decay.md#Formula">指数衰减</a>和<a href="/docs/zh/linear-decay.md#Formula">线性衰减的</a>专门页面。</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">第三阶段：计算最终得分</h3><p>最后，Milvus 将归一化的相似度得分和衰减得分结合起来，得出最终排名得分：</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>在混合搜索（结合多个向量场）的情况下，Milvus 取搜索请求中最大的归一化相似度得分：</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>例如，在混合搜索中，如果一篇研究论文的向量相似度得分是 0.82，而基于 BM25 的文本检索得分是 0.91，那么 Milvus 在应用衰减因子之前，会先使用 0.91 作为基本相似度得分。</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">实际的衰减排名</h3><p>让我们看看在实际场景中的衰减排名--基于时间的衰减搜索<strong>"人工智能研究论文"：</strong></p>
<div class="alert note">
<p>在这个例子中，衰减得分反映了相关性随时间的推移而降低的情况--较新的论文得分接近 1.0，较老的论文得分较低。这些值是使用特定的衰减排序器计算得出的。有关详情，请参阅 "<a href="/docs/zh/decay-ranker-overview.md#Choose-the-right-decay-ranker">选择合适的衰减排名器</a>"。</p>
</div>
<table>
   <tr>
     <th><p>论文</p></th>
     <th><p>向量相似度</p></th>
     <th><p>归一化相似度得分</p></th>
     <th><p>发表日期</p></th>
     <th><p>衰减得分</p></th>
     <th><p>最终得分</p></th>
     <th><p>最终排名</p></th>
   </tr>
   <tr>
     <td><p>论文 A</p></td>
     <td><p>高分</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 周前</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>纸张 B</p></td>
     <td><p>非常高</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 个月前</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>纸张 C</p></td>
     <td><p>中</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 天前</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>纸张 D</p></td>
     <td><p>中-高</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 周之前</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>如果不进行衰减重排，根据纯向量相似度（0.92），论文 B 的排名最高。然而，在应用了衰减重排后：</p>
<ul>
<li><p>尽管相似度中等，论文 C 还是跃居第一，因为它是最近发表的（昨天发表的）。</p></li>
<li><p>论文 B 因发表时间较早，尽管相似度很高，但排名却降至第 3 位</p></li>
<li><p>论文 D 使用的是 L2 距离（越低越好），因此在应用衰减排序之前，其得分从 1.2 降为 0.76。</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">选择正确的衰减排序器<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供不同的衰减排名器 -<code translate="no">gauss</code>,<code translate="no">exp</code>,<code translate="no">linear</code> ，每个排名器都是针对特定的使用情况而设计的：</p>
<table>
   <tr>
     <th><p>衰减排名器</p></th>
     <th><p>特征</p></th>
     <th><p>理想的使用案例</p></th>
     <th><p>示例场景</p></th>
   </tr>
   <tr>
     <td><p>高斯 (<code translate="no">gauss</code>)</p></td>
     <td><p>自然的渐进式下降，延伸适度</p></td>
     <td><ul>
<li><p>需要平衡结果的一般搜索</p></li>
<li><p>用户对距离有直观感觉的应用</p></li>
<li><p>当距离适中时，结果不应受到严重影响</p></li>
</ul></td>
     <td><p>在餐厅搜索中，3 公里以外的优质餐厅仍然可以被发现，尽管排名低于附近的选择</p></td>
   </tr>
   <tr>
     <td><p>指数 (<code translate="no">exp</code>)</p></td>
     <td><p>起初迅速减少，但保持长尾效应</p></td>
     <td><ul>
<li><p>新闻馈送，时效性至关重要</p></li>
<li><p>社交媒体，新鲜内容应占主导地位</p></li>
<li><p>当强烈偏好近距离但特殊的远距离项目应保持可见时</p></li>
</ul></td>
     <td><p>在新闻应用程序中，昨天的新闻比一周前的内容排名要高得多，但高度相关的旧文章仍会出现</p></td>
   </tr>
   <tr>
     <td><p>线性 (<code translate="no">linear</code>)</p></td>
     <td><p>持续、可预测的下降，有明确的分界线</p></td>
     <td><ul>
<li><p>有自然边界的应用</p></li>
<li><p>有距离限制的服务</p></li>
<li><p>有过期日期或明确阈值的内容</p></li>
</ul></td>
     <td><p>在事件查找器中，超过两周未来窗口的事件根本不会出现</p></td>
   </tr>
</table>
<p>有关每个衰减排名器如何计算分数和具体衰减模式的详细信息，请参阅专用文档：</p>
<ul>
<li><p><a href="/docs/zh/gaussian-decay.md">高斯衰减</a></p></li>
<li><p><a href="/docs/zh/exponential-decay.md">指数衰减</a></p></li>
<li><p><a href="/docs/zh/exponential-decay.md">指数衰减</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">实施示例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>衰减排名器可应用于 Milvus 中的标准向量搜索和混合搜索操作。以下是实现这一功能的关键代码片段。</p>
<div class="alert note">
<p>在使用衰减函数之前，必须先创建一个带有适当数值字段（如时间戳、距离等）的 Collections，这些数值字段将用于衰减计算。有关包括集合设置、Schema 定义和数据插入在内的完整工作示例，请参阅<a href="/docs/zh/tutorial-implement-a-time-based-ranking-in-milvus.md">教程：在 Milvus 中实施基于时间的排名</a>。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">创建衰减排名器</h3><p>要实施衰减排名，首先要定义一个具有适当配置的<code translate="no">Function</code> 对象：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>是否需要？</p></th>
     <th><p>说明</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>执行搜索时使用的函数标识符。选择一个与您的用例相关的描述性名称。</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用于计算衰减分数的数字字段。确定用于计算衰减的数据属性（例如，基于时间的衰减使用时间戳，基于位置的衰减使用坐标）。 
 必须是 Collections 中包含相关数值的字段。支持 INT8/16/32/64、FLOAT、DOUBLE。</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定正在创建的函数类型。对于所有衰减排序器，必须设置为<code translate="no">RERANK</code> 。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的 Reranker 排名方法。必须设置为<code translate="no">"decay"</code> 才能启用衰减排名功能。</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要应用的数学衰减排名器。确定相关性下降的曲线形状。 请参阅 "<a href="/docs/zh/decay-ranker-overview.md#Choose-the-right-decay-ranker">选择合适的衰减排名器</a>"部分，了解如何选择合适的函数。</p></td>
     <td><p><code translate="no">"gauss"</code>,<code translate="no">"exp"</code>, 或<code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>是</p></td>
     <td><p>计算衰减分数的参考点。处于此值的项目会获得最大相关性分数。</p></td>
     <td><ul>
<li>对于时间戳：当前时间（如<code translate="no">int(time.time())</code>)</li>
<li>地理位置：用户当前坐标</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>是</p></td>
     <td><p>相关性下降到<code translate="no">decay</code> 值的距离或时间。该值越大，相关性下降越快；该值越小，相关性下降越快。</p></td>
     <td><ul>
<li>时间：以秒为单位的周期（例如，<code translate="no">7 * 24 * 60 * 60</code> ，7 天）</li>
<li>距离：米（例如，<code translate="no">5000</code> 表示 5 千米）</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>无</p></td>
     <td><p>在<code translate="no">origin</code> 周围创建一个 "无衰减区"，在该区域内，项目将保持满分（衰减分数 = 1.0）。在<code translate="no">origin</code> 范围内的项目将保持最大相关性。</p></td>
     <td><ul>
<li>时间：以秒为单位的时间段（例如，<code translate="no">24 * 60 * 60</code> 为 1 天）</li>
<li>距离：米（例如，<code translate="no">500</code> 代表 500 米）</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>无</p></td>
     <td><p><code translate="no">scale</code> 距离上的分数值，控制曲线陡度。数值越小，下降曲线越陡峭；数值越大，下降曲线越平缓。 必须介于 0 和 1 之间。</p></td>
     <td><p><code translate="no">0.5</code> (默认值）</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">应用于标准向量搜索</h3><p>定义衰减排序器后，可以通过将其传递给<code translate="no">ranker</code> 参数，在搜索操作过程中应用它：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">应用于混合搜索</h3><p>衰减排序器也可以应用于结合多个向量场的混合搜索操作符：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>在混合搜索中，Milvus 首先从所有向量场中找出最大相似度得分，然后将衰减因子应用于该得分。</p>
