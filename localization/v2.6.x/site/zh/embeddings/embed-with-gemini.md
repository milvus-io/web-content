---
id: embed-with-gemini.md
order: 2
summary: Milvus 通过 GeminiEmbeddingFunction 类与 OpenAI 的模型集成。
title: 双子座
---
<h1 id="Gemini" class="common-anchor-header">双子座<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 通过<strong>GeminiEmbeddingFunction</strong>类与<strong>Gemini</strong>的模型集成。该类提供使用预训练的 Gemini 模型对文档和查询进行编码的方法，并将嵌入作为与 Milvus 索引兼容的密集向量返回。要使用该功能，请通过在<a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>平台上创建账户从<a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>获取 API 密钥。</p>
<p>要使用此功能，请安装必要的依赖项：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后，实例化<strong>GeminiEmbeddingFunction</strong>：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>参数</strong>：</p>
<ul>
<li><p><strong>model_name</strong><em>（字符串）</em></p>
<p>用于编码的 Gemini 模型名称。有效选项为<strong>gemini-embedding-exp-03-07</strong>（默认）、<strong>models/</strong> <strong>embedding-001</strong> 和<strong>models/text-embedding-004</strong>。</p></li>
<li><p><strong>api_key</strong><em>（字符串）</em></p>
<p>访问 Gemini API 的 API 密钥。</p></li>
<li><p><strong>config</strong><em>（type.EmbedContentConfig</em>）嵌入模型的可选配置。</p>
<ul>
<li><strong>output_dimensionality</strong>可以指定输出嵌入的数量。</li>
<li>可以指定<strong>task_type</strong>，以便为特定任务生成优化的嵌入模型，从而节省时间和成本并提高性能。仅支持<strong>gemini-embedding-exp-03-07</strong>模型。</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>模型名称</th><th>尺寸</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>模型/嵌入式-001</td><td>768</td></tr>
<tr><td>模型/文本嵌入-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>任务类型</th><th>任务类型</th></tr>
</thead>
<tbody>
<tr><td>语义相似性</td><td>用于生成为评估文本相似性而优化的 Embeddings。</td></tr>
<tr><td>分类</td><td>用于生成经过优化的嵌入信息，以便根据预设标签对文本进行分类。</td></tr>
<tr><td>聚类</td><td>用于生成经过优化的嵌入信息，以便根据文本的相似性对文本进行聚类。</td></tr>
<tr><td>返回文档（RETRIEVAL_DOCUMENT）、返回查询（RETRIEVAL_QUERY）、问题解答（QUESTION_ANSWERING）和事实验证（FACT_VERIFICATION</td><td>用于生成针对文档搜索或信息检索进行优化的嵌入。</td></tr>
<tr><td>代码检索查询</td><td>用于根据自然语言查询检索代码块，如数组排序或反向链接列表。代码块的嵌入使用 RETRIEVAL_DOCUMENT 计算。</td></tr>
</tbody>
</table>
<p>要为文档创建 Embeddings，请使用<strong>encode_documents()</strong>方法：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>要为查询创建嵌入<strong>代码</strong>，请使用<strong>encode_queries()</strong>方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下面的内容：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
