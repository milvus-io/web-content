---
id: jieba-tokenizer.md
title: Jieba
summary: >-
  The jieba tokenizer processes Chinese text by breaking it down into its
  component words.
---
<h1 id="Jieba" class="common-anchor-header">Jieba<button data-href="#Jieba" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">jieba</code> tokenizer processes Chinese text by breaking it down into its component words.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports two configuration approaches for the <code translate="no">jieba</code> tokenizer: a simple configuration and a custom configuration.</p>
<h3 id="Simple-configuration" class="common-anchor-header">Simple configuration</h3><p>With the simple configuration, you only need to set the tokenizer to <code translate="no">&quot;jieba&quot;</code>. For example:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Simple configuration: only specifying the tokenizer name</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,  <span class="hljs-comment"># Use the default settings: dict=[&quot;_default_&quot;], mode=&quot;search&quot;, hmm=true</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>This simple configuration is equivalent to the following custom configuration:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration equivalent to the simple configuration above</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,          <span class="hljs-comment"># Tokenizer type, fixed as &quot;jieba&quot;</span>
    <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;_default_&quot;</span>],     <span class="hljs-comment"># Use the default dictionary</span>
    <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,          <span class="hljs-comment"># Use search mode for improved recall (see mode details below)</span>
    <span class="hljs-string">&quot;hmm&quot;</span>: true                <span class="hljs-comment"># Enable HMM for probabilistic segmentation</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;dict&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;_default_&quot;</span>));
analyzerParams.put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">true</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>, <span class="hljs-string">&quot;dict&quot;</span>: []any{<span class="hljs-string">&quot;_default_&quot;</span>}, <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>, <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">true</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>For details on parameters, refer to <a href="/docs/jieba-tokenizer.md#Custom-configuration">Custom configuration</a>.</p>
<h3 id="Custom-configuration" class="common-anchor-header">Custom configuration</h3><p>For more control, you can provide a custom configuration that allows you to specify a custom dictionary, select the segmentation mode, and enable or disable the Hidden Markov Model (HMM). For example:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom configuration with user-defined settings</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,           <span class="hljs-comment"># Fixed tokenizer type</span>
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;customDictionary&quot;</span>],  <span class="hljs-comment"># Custom dictionary list; replace with your own terms</span>
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,           <span class="hljs-comment"># Use exact mode (non-overlapping tokens)</span>
        <span class="hljs-string">&quot;hmm&quot;</span>: false               <span class="hljs-comment"># Disable HMM; unmatched text will be split into individual characters</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;dict&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;customDictionary&quot;</span>));
analyzerParams.put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>, <span class="hljs-string">&quot;dict&quot;</span>: []any{<span class="hljs-string">&quot;customDictionary&quot;</span>}, <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>, <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">false</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>The type of tokenizer. This is fixed to <code translate="no">"jieba"</code>.</p></td>
     <td><p><code translate="no">"jieba"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict</code></p></td>
     <td><p>A list of dictionaries that the analyzer will load as its vocabulary source. Built-in options:</p>
<ul>
<li><p><code translate="no">"_default_"</code>: Loads the engine's built‑in Simplified‑Chinese dictionary. For details, refer to <a href="https://github.com/messense/jieba-rs/blob/v0.6.8/src/data/dict.txt">dict.txt</a>.</p></li>
<li><p><code translate="no">"_extend_default_"</code>: Loads everything in <code translate="no">"_default_"</code> plus an additional Traditional‑Chinese supplement. For details, refer to <a href="https://github.com/milvus-io/milvus/blob/v2.5.11/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/data/jieba/dict.txt.big">dict.txt.big</a>.</p>
<p>You can also mix the built‑in dictionary with any number of custom dictionaries. Example: <code translate="no">["_default_", "结巴分词器"]</code>.</p></li>
</ul></td>
     <td><p><code translate="no">["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mode</code></p></td>
     <td><p>The segmentation mode. Possible values:</p>
<ul>
<li><p><code translate="no">"exact"</code>: Tries to segment the sentence in the most precise manner, making it ideal for text analysis.</p></li>
<li><p><code translate="no">"search"</code>: Builds on exact mode by further breaking down long words to improve recall, making it suitable for search engine tokenization.</p>
<p>For more information, refer to <a href="https://github.com/fxsjy/jieba">Jieba GitHub Project</a>.</p></li>
</ul></td>
     <td><p><code translate="no">"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hmm</code></p></td>
     <td><p>A boolean flag indicating whether to enable the Hidden Markov Model (HMM) for probabilistic segmentation of words not found in the dictionary.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<p>After defining <code translate="no">analyzer_params</code>, you can apply them to a <code translate="no">VARCHAR</code> field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to <a href="/docs/analyzer-overview.md#Example-use">Example use</a>.</p>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Before applying the analyzer configuration to your collection schema, verify its behavior using the <code translate="no">run_analyzer</code> method.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Analyzer configuration</h3><div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: [<span class="hljs-string">&quot;结巴分词器&quot;</span>],
        <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>,
        <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">False</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;dict&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;结巴分词器&quot;</span>));
analyzerParams.put(<span class="hljs-string">&quot;mode&quot;</span>, <span class="hljs-string">&quot;exact&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;hmm&quot;</span>, <span class="hljs-literal">false</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>, <span class="hljs-string">&quot;dict&quot;</span>: []any{<span class="hljs-string">&quot;结巴分词器&quot;</span>}, <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;exact&quot;</span>, <span class="hljs-string">&quot;hmm&quot;</span>: <span class="hljs-literal">false</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer--Milvus-2511+" class="common-anchor-header">Verification using <code translate="no">run_analyzer</code><span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span></h3><div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Standard analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;milvus结巴分词器中文测试&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Expected output</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;milvus&#x27;</span>, <span class="hljs-string">&#x27;结巴分词器&#x27;</span>, <span class="hljs-string">&#x27;中&#x27;</span>, <span class="hljs-string">&#x27;文&#x27;</span>, <span class="hljs-string">&#x27;测&#x27;</span>, <span class="hljs-string">&#x27;试&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
