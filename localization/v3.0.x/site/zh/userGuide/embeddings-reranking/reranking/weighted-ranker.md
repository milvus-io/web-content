---
id: weighted-ranker.md
title: 加权排序器
summary: >-
  加权排序器通过为每个搜索路径分配不同的权重，智能地整合并优先展示来自多个搜索路径的结果。
  正如技艺精湛的厨师通过平衡多种食材来烹制出完美的菜肴一样，加权排序器通过平衡不同的搜索结果，提供最相关的综合结果。当跨多个向量字段或模态进行搜索时，若某些字段应比其他字段对最终排名产生更显著的影响，这种方法便最为理想。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">加权排序器<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>加权排序器通过为每个搜索路径分配不同的权重，智能地整合并优先展示来自多个搜索路径的结果。 正如技艺精湛的厨师通过平衡多种食材来烹制出完美佳肴一样，加权排序器也能平衡不同的搜索结果，从而提供最相关的综合结果。当跨多个向量字段或模态进行搜索时，若某些字段应比其他字段对最终排名产生更显著的影响，这种方法便最为理想。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">何时使用加权排序器<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>加权排序器专为混合搜索场景设计，适用于需要整合来自多个向量搜索路径的结果的情况。它特别适用于：</p>
<table>
   <tr>
     <th><p>用例</p></th>
     <th><p>示例</p></th>
     <th><p>加权排序器为何效果显著</p></th>
   </tr>
   <tr>
     <td><p>电子商务搜索</p></td>
     <td><p>结合图像相似度与文本描述的商品搜索</p></td>
     <td><p>使零售商能够针对时尚商品优先考虑视觉相似度，同时针对技术类产品强调文本描述</p></td>
   </tr>
   <tr>
     <td><p>媒体内容搜索</p></td>
     <td><p>同时利用视觉特征和音频转录文本进行视频检索</p></td>
     <td><p>根据查询意图，平衡视觉内容与语音对话的重要性</p></td>
   </tr>
   <tr>
     <td><p>文档检索</p></td>
     <td><p>针对不同章节采用多种Embeddings的企业文档搜索</p></td>
     <td><p>在充分考虑全文嵌入的同时，赋予标题和摘要Embeddings更高的权重</p></td>
   </tr>
</table>
<p>如果您的混合搜索应用程序需要结合多种搜索路径并控制它们的相对重要性，那么“加权排序器”是您的理想选择。</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">加权排序器的机制<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>WeightedRanker 策略的主要工作流程如下：</p>
<ol>
<li><p><strong>收集搜索得分</strong>：汇总来自每个向量搜索路径的结果和得分（score_1、score_2）。</p></li>
<li><p><strong>分数归一化</strong>：每次搜索可能使用不同的相似度度量标准，导致分数分布各不相同。 例如，使用内积 (IP) 作为相似度类型可能会产生 [−∞,+∞] 范围内的得分，而使用欧几里得距离 (L2) 则会产生 [0,+∞] 范围内的得分。 由于不同搜索的得分范围各异且无法直接比较，因此有必要对每条搜索路径的得分进行归一化处理。通常，会应用<code translate="no">arctan</code> 函数将得分转换为[0, 1]范围内的值（score_1_normalized, score_2_normalized）。 分数越接近 1，表示相似度越高。</p></li>
<li><p><strong>分配权重</strong>：根据分配给不同向量场的重要性，将权重 (<strong>wi</strong>) 分配给归一化得分 (score_1_normalized, score_2_normalized)。 每条路径的权重应在 [0,1] 范围内。最终的加权分数为 score_1_weighted 和 score_2_weighted。</p></li>
<li><p><strong>合并得分</strong>：将加权得分（score_1_weighted、score_2_weighted）从高到低排序，从而得出最终的得分集（score_final）。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" /> 
   <span>加权排序器</span>
  
 </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">加权排序器的示例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>本示例演示了一项涉及图像和文本的多模态混合搜索（topK=5），并说明了“加权排序器”（WeightedRanker）策略如何对来自两次人工神经网络（ANN）搜索的结果进行重新排序。</p>
<ul>
<li><p>基于图像的ANN搜索结果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>得分（图像）</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.92</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0.88</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0.85</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.83</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.8</p></td>
</tr>
</table></p></li>
<li><p>基于文本的ANN搜索结果（topK=5）：</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>得分（文本）</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.91</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.87</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>0.85</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.82</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>0.78</p></td>
</tr>
</table></p></li>
<li><p>使用WeightedRanker为图像和文本搜索结果分配权重。假设图像ANN搜索的权重为0.6，文本搜索的权重为0.4。</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>得分（图像）</strong></p></th>
<th><p><strong>得分（文本）</strong></p></th>
<th><p><strong>加权得分</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.92</p></td>
<td><p>0.87</p></td>
<td><p>0.6×0.92+0.4×0.87=0.90</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0.88</p></td>
<td><p>不适用</p></td>
<td><p>0.6×0.88+0.4×0=0.528</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0.85</p></td>
<td><p>不适用</p></td>
<td><p>0.6×0.85+0.4×0=0.51</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.83</p></td>
<td><p>0.91</p></td>
<td><p>0.6×0.83+0.4×0.91=0.86</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.80</p></td>
<td><p>0.82</p></td>
<td><p>0.6×0.80+0.4×0.82=0.81</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>图片中未显示</p></td>
<td><p>0.85</p></td>
<td><p>0.6×0+0.4×0.85=0.34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>未出现在图像中</p></td>
<td><p>0.78</p></td>
<td><p>0.6×0+0.4×0.78=0.312</p></td>
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
<td><p>0.90</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0.86</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0.81</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0.528</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0.51</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">加权排序器的使用<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>使用加权排序器（WeightedRanker）策略时，必须输入权重值。输入的权重值数量应与混合搜索中基本人工神经网络（ANN）搜索请求的数量相匹配。输入的权重值应在[0,1]范围内，数值越接近1，表示其重要性越高。</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">创建加权排序器<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>例如，假设混合搜索中包含两个基本 ANN 搜索请求：文本搜索和图像搜索。如果认为文本搜索更为重要，则应为其分配更大的权重。</p>
<div class="alert note">
<p>Milvus 2.6.x 及更高版本允许您通过<code translate="no">Function</code> API 直接配置重新排序策略。如果您使用的是更早的版本（v2.6.0 之前），请参阅<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">重新排序</a>文档以获取设置说明。</p>
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

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>)
                .param(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;weight&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields().
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>).
    WithParam(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weight&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-type">Vec</span>::&lt;<span class="hljs-type">String</span>&gt;::<span class="hljs-title function_ invoke__">new</span>())
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;reranker&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;weighted&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;weights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;norm_score&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;weight&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;

<span class="hljs-comment">// Note: defining a weighted rerank function with FunctionSchema params</span>
<span class="hljs-comment">// (reranker/weights/norm_score) is not yet supported in milvus-sdk-csharp as of v3.0.0</span>
<span class="hljs-comment">// (FunctionSchema.Params cannot be populated externally). Use WeightedReranker instead.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;weight&quot;,
  &quot;inputFieldNames&quot;: [],
  &quot;functionType&quot;: &quot;RERANK&quot;,
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;weighted&quot;,
    &quot;weights&quot;: &quot;[0.1, 0.9]&quot;,
    &quot;norm_score&quot;: &quot;true&quot;
  }
}&#x27;</span>
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
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要应用该函数的向量场列表（对于加权排序器，此处必须为空）</p></td>
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
     <td><p>指定要使用的重新排序方法。</p><p>若要使用加权排序器，必须将其设置为<code translate="no">weighted</code> 。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>是</p></td>
     <td><p>与每个搜索路径对应的权重数组；值 ∈ [0,1]。</p><p>有关详细信息，请参阅<a href="/docs/zh/weighted-ranker.md#Mechanism-of-Weighted-Ranker">“加权排序器的工作原理</a>”。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>否</p></td>
     <td><p>是否在加权前对原始分数进行归一化（使用arctan）。</p><p>详情请参阅<a href="/docs/zh/weighted-ranker.md#Mechanism-of-Weighted-Ranker">“加权排序器”的机制</a>。</p></td>
     <td><p><code translate="no">True</code></p></td>
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
    </button></h3><p>加权排序器专为结合多个向量字段的混合搜索操作而设计。在执行混合搜索时，必须为每个搜索路径指定权重：</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to the Milvus server</span>
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

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
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

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

<span class="hljs-comment">// Define two ANN sub-search requests</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{textEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{imageEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
rerank := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})

hybridResults, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch).
    WithReranker(rerank).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Define two ANN sub-search requests</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[text_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = WeightedRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">weights</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(rerank)
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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;modern dining table&quot;</span> },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(imageEmbedding) },  <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment">// Text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">var</span> hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = <span class="hljs-keyword">new</span>[] { textSearch, imageSearch },  <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank,  <span class="hljs-comment">// Apply the weighted ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> } }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;search\&quot;: [
        {
            \&quot;annsField\&quot;: \&quot;text_vector\&quot;,
            \&quot;data\&quot;: [\&quot;modern dining table\&quot;],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;COSINE\&quot; },
            \&quot;limit\&quot;: 10
        },
        {
            \&quot;annsField\&quot;: \&quot;image_vector\&quot;,
            \&quot;data\&quot;: [<span class="hljs-variable">${IMAGE_EMBEDDING}</span>],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;IP\&quot; },
            \&quot;limit\&quot;: 10
        }
    ],
    \&quot;rerank\&quot;: <span class="hljs-variable">${rerank}</span>,
    \&quot;limit\&quot;: 10,
    \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;category\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关混合搜索的更多信息，请参阅《<a href="/docs/zh/multi-vector-search.md">多向量混合搜索</a>》。</p>
