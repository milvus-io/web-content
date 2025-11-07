---
id: weighted-ranker.md
title: 加权排名器
summary: >-
  加权排名器通过为每个搜索路径分配不同的重要性权重，智能地组合来自多个搜索路径的结果并确定其优先级。与技艺高超的厨师平衡多种配料以制作完美菜肴的方式类似，加权排名器也会平衡不同的搜索结果，以提供最相关的综合结果。这种方法非常适合在多个向量领域或模式中进行搜索，因为某些领域对最终排名的贡献应该比其他领域更大。
---
<h1 id="Weighted-Ranker" class="common-anchor-header">加权排名器<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>加权排名器通过为每个搜索路径分配不同的重要性权重，智能地组合来自多个搜索路径的结果并确定其优先级。与技艺高超的厨师平衡多种配料以制作完美菜肴的方式类似，加权排名器也会平衡不同的搜索结果，以提供最相关的综合结果。这种方法非常适合在多个向量场或模式中进行搜索，其中某些场对最终排名的贡献应比其他场更大。</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">何时使用加权排名器<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>加权排名器是专门为混合搜索方案设计的，在这种方案中，您需要将来自多个 矢量搜索路径的结果进行组合。它对以下情况特别有效</p>
<table>
   <tr>
     <th><p>使用案例</p></th>
     <th><p>实例</p></th>
     <th><p>为什么加权排名器效果好</p></th>
   </tr>
   <tr>
     <td><p>电子商务搜索</p></td>
     <td><p>结合图片相似度和文字描述的产品搜索</p></td>
     <td><p>允许零售商优先考虑时尚产品的视觉相似性，同时强调技术产品的文字描述</p></td>
   </tr>
   <tr>
     <td><p>媒体内容搜索</p></td>
     <td><p>使用视觉特征和音频转录进行视频检索</p></td>
     <td><p>根据查询意图平衡视觉内容和语音对话的重要性</p></td>
   </tr>
   <tr>
     <td><p>文档检索</p></td>
     <td><p>针对不同部分使用多种 Embeddings 的企业文档搜索</p></td>
     <td><p>在考虑全文嵌入的同时，赋予标题和摘要嵌入更高的权重</p></td>
   </tr>
</table>
<p>如果您的混合搜索应用需要结合多种搜索路径，同时控制其相对重要性，那么加权排名器就是您的理想选择。</p>
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
    </button></h2><p>加权排名策略的主要工作流程如下：</p>
<ol>
<li><p><strong>Collections 搜索得分</strong>：收集向量搜索各路径的结果和分数（score_1、score_2）。</p></li>
<li><p><strong>分数归一化</strong>：每次搜索可能会使用不同的相似度指标，从而导致不同的分数分布。例如，使用 "内积"（IP）作为相似度类型可能会产生[-∞,+∞]的分数，而使用 "欧氏距离"（L2）则会产生[0,+∞]的分数。由于不同搜索的得分范围各不相同，无法直接比较，因此有必要对每条搜索路径的得分进行归一化处理。通常，<code translate="no">arctan</code> 函数用于将分数转换为 [0, 1] 之间的范围（score_1_normalized, score_2_normalized）。分数越接近 1 表示相似度越高。</p></li>
<li><p><strong>分配权重</strong>：根据分配给不同向量场的重要性，为归一化分数（score_1_normalized，score_2_normalized）分配权重（<strong>wi</strong>）。每条路径的权重范围应在 [0,1] 之间。由此得出的加权分数为 score_1_weighted 和 score_2_weighted。</p></li>
<li><p><strong>合并分数</strong>：将加权得分（score_1_weighted、score_2_weighted）从高到低排序，得出一组最终得分（score_final）。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>加权排名器</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">加权排序器示例<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>本例演示了涉及图像和文本的多模态混合搜索（topK=5），并说明了加权 Ranker 策略如何对两次 ANN 搜索的结果进行重新排序。</p>
<ul>
<li><p>图像的 ANN 搜索结果（topK=5）： ID</p>
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
<li><p>文本的 ANN 搜索结果（topK=5）： ID</p>
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
<li><p>使用 WeightedRanker 为图像和文本搜索结果分配权重。假设图像 ANN 搜索的权重为 0.6，文本搜索的权重为 0.4。</p>
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
<td><p>不在图像中</p></td>
<td><p>0.85</p></td>
<td><p>0.6×0+0.4×0.85=0.34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>不在图像中</p></td>
<td><p>0.78</p></td>
<td><p>0.6×0+0.4×0.78=0.312</p></td>
</tr>
</table></p></li>
<li><p>重新排序后的最终结果（topK=5）： 0.6×0+0.4×0.85=0.34</p>
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
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">加权排名器的使用<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>使用加权排名策略时，需要输入权重值。输入权重值的数量应与混合搜索中基本 ANN 搜索请求的数量一致。输入的权重值范围应为 [0,1]，数值越接近 1 表示重要性越高。</p>
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
    </button></h3><p>例如，假设混合搜索中有两个基本 ANN 搜索请求：文本搜索和图像搜索。如果认为文本搜索更重要，就应该赋予它更大的权重。</p>
<div class="alert note">
<p>Milvus 2.6.x 及更高版本可让您直接通过<code translate="no">Function</code> API 配置 Reranker 策略。如果您使用的是早期版本（v2.6.0 之前），请参考<a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">Rerankers</a>文档中的设置说明。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
                .param(<span class="hljs-string">&quot;strategy&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;params&quot;</span>, <span class="hljs-string">&quot;{\&quot;weights\&quot;: [0.1, 0.6], \&quot;norm_score\&quot;: true}&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
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
     <td><p>此功能的唯一标识符</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要应用该函数的向量场列表（对于加权排序器必须为空）</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>要调用的函数类型；使用<code translate="no">RERANK</code> 指定重排策略</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定要使用的排序方法。</p><p>必须设置为<code translate="no">weighted</code> 才能使用加权排名器。</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>是</p></td>
     <td><p>每个搜索路径对应的权重数组；值∈ [0,1]。</p><p>有关详情，请参阅<a href="/docs/zh/weighted-ranker.md#Mechanism-of-Weighted-Ranker">加权排序器机制</a>。</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>是否</p></td>
     <td><p>是否在加权前对原始分数进行归一化处理（使用 arctan）。</p><p>详情请参阅<a href="/docs/zh/weighted-ranker.md#Mechanism-of-Weighted-Ranker">加权排序器机制</a>。</p></td>
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
    </button></h3><p>加权排名器是专门为结合多个向量场的混合搜索操作而设计的。执行混合搜索时，必须为每条搜索路径指定权重：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

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

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;\&quot;modern dining table\&quot;&quot;</span>)))
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
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  output_fields = [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关混合搜索的更多信息，请参阅<a href="/docs/zh/multi-vector-search.md">多向量混合搜索</a>。</p>
