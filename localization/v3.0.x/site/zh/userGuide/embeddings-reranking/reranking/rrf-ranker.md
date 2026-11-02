---
id: rrf-ranker.md
title: RRF 排序器
summary: >-
  互惠排名融合（RRF）排序器是 Milvus 混合搜索的一种重新排序策略，它根据结果的排名位置（而非原始相似度得分）来平衡来自多个向量搜索路径的结果。
  就像体育锦标赛更看重选手的排名而非个人数据一样，RRF 排序器根据每个项目在不同搜索路径中的排名高低来整合搜索结果，从而生成一个公平且均衡的最终排名。
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF 排序器<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>互逆排名融合（RRF）排名器是 Milvus 混合搜索的一种重新排序策略，它根据结果在不同搜索路径中的排名位置（而非原始相似度得分）来平衡来自多个向量搜索路径的结果。 就像体育锦标赛更看重选手的排名而非个人数据一样，RRF 排名器根据每个项目在不同搜索路径中的排名高低来整合搜索结果，从而生成一个公平且均衡的最终排名。</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">何时使用 RRF 排名器<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF 排名器专为混合搜索场景设计，适用于您希望平衡来自多个向量搜索路径的结果，但又不希望分配明确权重的情况。它特别适用于：</p>
<table>
   <tr>
     <th><p>用例</p></th>
     <th><p>示例</p></th>
     <th><p>RRF Ranker 为何效果显著</p></th>
   </tr>
   <tr>
     <td><p>各模态权重相等的模态混合搜索</p></td>
     <td><p>图像与文本均等重要的搜索</p></td>
     <td><p>无需任意设置权重即可平衡搜索结果</p></td>
   </tr>
   <tr>
     <td><p>集成向量搜索</p></td>
     <td><p>整合来自不同Embeddings模型的搜索结果</p></td>
     <td><p>以公平的方式合并排名，不偏袒任何特定模型的评分分布</p></td>
   </tr>
   <tr>
     <td><p>跨语言搜索</p></td>
     <td><p>跨多种语言检索文档</p></td>
     <td><p>无论语言特有的Embeddings特征如何，均能公平地对结果进行排序</p></td>
   </tr>
   <tr>
     <td><p>专家推荐</p></td>
     <td><p>整合来自多个专家系统的推荐</p></td>
     <td><p>当不同系统采用无法直接比较的评分方法时，生成共识排名</p></td>
   </tr>
</table>
<p>如果您的混合搜索应用程序需要在不分配显式权重的情况下，公平地平衡多条搜索路径，那么RRF Ranker是您的理想选择。</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">RRF Ranker 的工作机制<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜索排名</strong>：收集向量搜索各路径的结果排名（rank_1、rank_2）。</p></li>
<li><p><strong>合并排名</strong>：根据公式将各路径的排名（rank_rrf_1, rank_rrf_2）进行转换。</p>
<p>计算公式中涉及<em>变量 N</em>，它代表检索器的数量。<em>ranki</em>(<em>d</em>) 表示<em>第 i 个</em>检索器生成的文档<em>d</em>的排名位置。<em>k</em>是平滑参数，通常设为 60。</p></li>
<li><p><strong>聚合排名</strong>：根据组合排名对搜索结果进行重新排序，以生成最终结果。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" /> 
   <span>RRF 排名器</span>
  
 </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">RRF 排序器的示例<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>本例演示了针对稀疏-稠密向量的混合搜索（topK=5），并说明了RRFRanker策略如何对两次ANN搜索的结果进行重新排序。</p>
<ul>
<li><p>基于稀疏文本向量的 ANN 搜索结果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>排名（稀疏）</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>1</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>2</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>3</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>4</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>5</p></td>
</tr>
</table></p></li>
<li><p>基于文本密集向量的神经网络搜索结果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>排名（密集）</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>1</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>2</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>3</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>4</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>5</p></td>
</tr>
</table></p></li>
<li><p>使用RRF重新排列两组搜索结果的排名。假设平滑参数<code translate="no">k</code> 设置为60。</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>得分（稀疏）</strong></p></th>
<th><p><strong>得分（稠密）</strong></p></th>
<th><p><strong>最终得分</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>1</p></td>
<td><p>2</p></td>
<td><p>1/(60+1)+1/(60+2) = 0.03252247</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>4</p></td>
<td><p>1</p></td>
<td><p>1/(60+4)+1/(60+1) = 0.03201844</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>5</p></td>
<td><p>4</p></td>
<td><p>1/(60+5)+1/(60+4) = 0.03100962</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>2</p></td>
<td><p>不适用</p></td>
<td><p>1/(60+2) = 0.01612903</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>3</p></td>
<td><p>不适用</p></td>
<td><p>1/(60+3) = 0.01587302</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>不适用</p></td>
<td><p>3</p></td>
<td><p>1/(60+3) = 0.01587302</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>不适用</p></td>
<td><p>5</p></td>
<td><p>1/(60+5) = 0.01538462</p></td>
</tr>
</table></p></li>
<li><p>重新排序后的最终结果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>排名</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>最终得分</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0.03252247</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0.03201844</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0.03100962</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0.01612903</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0.01587302</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>110</p></td>
<td><p>0.01587302</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">RRF 排序器的使用<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>在使用 RRF 重新排序策略时，您需要配置参数<code translate="no">k</code> 。这是一个平滑参数，可有效调整全文搜索与向量搜索之间的相对权重。该参数的默认值为 60，可在 (0, 16384) 范围内进行调整。 该值应为浮点数。建议的取值范围为 [10, 100]。虽然<code translate="no">k=60</code> 是常见的选择，但最佳的<code translate="no">k</code> 值会因您的具体应用和数据集而异。我们建议根据您的具体用例测试并调整此参数，以获得最佳性能。</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">创建 RRF 排序器<button data-href="#Create-an-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>在为 Collection 配置了多个向量字段后，请使用适当的平滑参数创建 RRF 排序器：</p>
<div class="alert note">
<p>Milvus 2.6.x 及更高版本允许您通过<code translate="no">Function</code> API 直接配置重新排序策略。如果您使用的是更早的版本（v2.6.0 之前），请参阅<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-RRFRanker">重新排序</a>文档以获取设置说明。</p>
</div>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

rerank := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;rrf&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;rrf&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">functions</span>=<span class="hljs-string">&#x27;[
  {
    &quot;name&quot;: &quot;rrf&quot;,
    &quot;type&quot;: &quot;RERANK&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;params&quot;: {
      &quot;reranker&quot;: &quot;rrf&quot;,
      &quot;k&quot;: 100
    }
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必填？</p></th>
     <th><p>描述</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>此函数的唯一标识符</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要应用该函数的向量场列表（对于 RRF 排序器，此处必须为空）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>要调用的函数类型；使用<code translate="no">RERANK</code> 指定重新排序策略</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的重新排序方法。</p><p>若要使用 RRF Ranker，必须将其设置为<code translate="no">rrf</code> 。</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>否</p></td>
     <td><p>平滑参数，用于控制文档排名的影响；较高的“<code translate="no">k</code> ”值可降低对前几名排名的敏感度。范围：(0, 16384)；默认值：<code translate="no">60</code> 。</p><p>有关详细信息，请参阅<a href="/docs/zh/rrf-ranker.md#Mechanism-of-RRF-Ranker">RRF Ranker 的工作原理</a>。</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">应用于混合搜索<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>RRF Ranker 专为结合多个向量字段的混合搜索操作而设计。以下是在混合搜索中使用它的方法：</p>
<p>示例假设存在一个已有的 Collection，其中包含用于<code translate="no">text_vector</code> 的文本嵌入函数，以及与<code translate="no">image_vector</code> 维度匹配的预先准备好的图像嵌入。请将 Collection 名称和图像嵌入替换为您自己的值。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest, RRFRanker

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Create an RRF ranker with smoothing parameter k</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> RRFRanker.builder()
                .k(<span class="hljs-number">100</span>)
                .build();

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

<span class="hljs-comment">// Define text vector search request</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, entity.Text(<span class="hljs-string">&quot;modern dining table&quot;</span>))

<span class="hljs-comment">// Define image vector search request</span>
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, entity.FloatVector(imageEmbedding))

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
rerank := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch,
).WithReranker(rerank).WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
    .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;modern dining table&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">hybrid_results</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">100</span>))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> connect_status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::ConnectParam{
    <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>});
<span class="hljs-keyword">if</span> (!connect_status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; connect_status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
    <span class="hljs-attr">params</span>: {},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Connect to Milvus server</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Assume you have a collection setup</span>

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = [imageEmbedding], <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">100</span>);

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment">// The smoothing parameter k controls the balance</span>
SearchResp hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = [textSearch, imageSearch], <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank, <span class="hljs-comment">// Apply the RRF ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Set IMAGE_EMBEDDING to your image vector as a JSON array before running this request.</span>
: <span class="hljs-string">&quot;<span class="hljs-variable">${IMAGE_EMBEDDING:?Set IMAGE_EMBEDDING to a JSON array of embedding values}</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-binary @- &lt;&lt;<span class="hljs-string">EOF
{
    &quot;collectionName&quot;: &quot;collection_name&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [&quot;modern dining table&quot;],
            &quot;annsField&quot;: &quot;text_vector&quot;,
            &quot;limit&quot;: 10
        },
        {
            &quot;data&quot;: [${IMAGE_EMBEDDING}],
            &quot;annsField&quot;: &quot;image_vector&quot;,
            &quot;limit&quot;: 10
        }
    ],
    &quot;rerank&quot;: {
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {
            &quot;k&quot;: 100
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;product_name&quot;, &quot;price&quot;, &quot;category&quot;]
}
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关混合搜索的更多信息，请参阅《<a href="/docs/zh/multi-vector-search.md">多向量混合搜索</a>》。</p>
