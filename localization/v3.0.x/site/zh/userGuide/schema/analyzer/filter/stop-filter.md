---
id: stop-filter.md
title: 停止
summary: 在分析过程中，使用停用词过滤器从分词后的文本中移除已配置的停用词。
---
<h1 id="Stop" class="common-anchor-header">停止<button data-href="#Stop" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">stop</code> 过滤器可从分词后的文本中移除指定的停用词，从而帮助剔除常见且意义较小的词汇。您可以通过<code translate="no">stop_words</code> 参数配置停用词列表。</p>
<h2 id="Configuration" class="common-anchor-header">配置<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">stop</code> 过滤器支持通过<code translate="no">stop_words</code> 参数内联指定停用词列表，或通过<code translate="no">stop_words_file</code> 参数从已注册的文件资源中加载停用词列表。</p>
<h3 id="Inline-stop-words-list" class="common-anchor-header">内联停用词列表<button data-href="#Inline-stop-words-list" class="anchor-icon" translate="no">
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
    </button></h3><p>若要使用内联列表配置<code translate="no">stop</code> 过滤器，请在过滤器配置中指定<code translate="no">&quot;type&quot;: &quot;stop&quot;</code> ，并配合<code translate="no">stop_words</code> 参数提供停用词列表。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, # <span class="hljs-title class_">Specifies</span> the filter type <span class="hljs-keyword">as</span> stop
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], # <span class="hljs-title class_">Defines</span> custom stop words and includes the <span class="hljs-title class_">English</span> stop word list
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;stop&quot;,
      &quot;stop_words&quot;: [
        &quot;of&quot;,
        &quot;to&quot;,
        &quot;_english_&quot;
      ]
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">stop</code> 过滤器支持以下可配置参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p>要从分词过程中移除的词汇列表。默认情况下，该过滤器使用内置的<code translate="no">_english_</code> 词典。您可以通过以下三种方式覆盖或扩展该词典：</p><ul><li><p><strong>内置词典</strong>——提供以下语言别名之一以使用预定义词典：</p><p><code translate="no">"_arabic_"</code>,<code translate="no">"_english_"</code>,<code translate="no">"_danish_"</code>,<code translate="no">"_dutch_"</code>,<code translate="no">"_finnish_"</code>,<code translate="no">"_french_"</code>,<code translate="no">"_german_"</code>,<code translate="no">"_hungarian_"</code>,<code translate="no">"_italian_"</code>,<code translate="no">"_norwegian_"</code>,<code translate="no">"_portuguese_"</code>,<code translate="no">"_russian_"</code>,<code translate="no">"_spanish_"</code>,<code translate="no">"_swedish_"</code>,<code translate="no">"_thai_"</code></p></li><li><p><strong>自定义列表</strong>——传入您自己的术语数组，例如<code translate="no">["foo", "bar", "baz"]</code> 。</p></li><li><p><strong>混合列表</strong>——结合别名和自定义词条，例如<code translate="no">["of", "to", "_english_"]</code> 。</p><p>有关每个预定义词典确切内容的详细信息，请参阅<a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words.rs">stop_words</a>。如需查看阿拉伯语或泰语词典，请参阅<a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">阿拉伯语停用词列表</a>或<a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/thai.txt">泰语停用词列表</a>。</p></li></ul></td>
   </tr>
</table>
<p><code translate="no">stop</code> 过滤器作用于分词器生成的术语，因此必须与分词器配合使用。有关 Milvus 中可用分词器的列表，请参阅<a href="/docs/zh/standard-tokenizer.md">“标准分词器”</a>及其相关页面。</p>
<p>定义<code translate="no">analyzer_params</code> 后，您可以在定义Collection Schema时将其应用于<code translate="no">VARCHAR</code> 字段。这使Milvus能够使用指定的分析器处理该字段中的文本，从而实现高效的分词和过滤。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">“使用示例”</a>。</p>
<h3 id="Load-stop-words-from-a-file-resource--Milvus-30x" class="common-anchor-header">从文件资源加载停用词<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Load-stop-words-from-a-file-resource--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>对于大型自定义停用词列表（如特定语言的列表、领域词汇表，或您希望在多个Collection间共享的列表），请将词汇存储在文件中并将其注册为远程文件资源，然后通过<code translate="no">stop_words_file</code> 参数在过滤器中引用该文件。 您可以单独使用<code translate="no">stop_words_file</code> ，也可以与内联的<code translate="no">stop_words</code> 配合使用；当两者均设置时，过滤器会将这两个来源合并为一个停用词列表。</p>
<p>该文件应为纯UTF‑8文本，<strong>每行</strong>包含<strong>一个停用词</strong>。例如：</p>
<pre><code translate="no" class="language-plaintext">the
of
for
<button class="copy-code-btn"></button></code></pre>
<p>将该文件上传至您的 Milvus 集群配置中指定的对象存储，然后进行注册：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the uploaded file under a name you&#x27;ll reference from analyzer configs.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_stop_words&quot;</span>,
    path=<span class="hljs-string">&quot;file/stop_words.txt&quot;</span>,    <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>通过 `<code translate="no">stop_words_file</code>` 在过滤器中引用已注册的资源：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_stop_words&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;stop_words.txt&quot;</span>,
        },
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">stop_words_file</code> 参数接受包含以下字段的对象：</p>
<table>
   <tr>
     <th><p><strong>字段</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>资源类型。对于通过<code translate="no">add_file_resource</code> 注册的文件，请使用<code translate="no">"remote"</code> 。对于自托管部署中使用的<code translate="no">"local"</code> 变体，请参阅<a href="/docs/zh/manage-file-resources.md">《管理文件资源》</a>。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">resource_name</code></p></td>
     <td><p>该名称是在将文件注册到<code translate="no">add_file_resource</code> 时使用的名称。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">file_name</code></p></td>
     <td><p>已注册资源的对象存储路径中的文件名部分（例如，如果资源是在<code translate="no">path="file/stop_words.txt"</code> 上注册的，则为<code translate="no">"stop_words.txt"</code> ）。</p></td>
   </tr>
</table>
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
    </button></h2><p>在将分析器配置应用到 Collection Schema 之前，请使用<code translate="no">run_analyzer</code> 方法验证其行为。</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">分析器配置<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">使用以下方式进行验证<code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>

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
texts.add(<span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">预期输出<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;The&#x27;</span>, <span class="hljs-string">&#x27;stop&#x27;</span>, <span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-string">&#x27;allows&#x27;</span>, <span class="hljs-string">&#x27;control&#x27;</span>, <span class="hljs-string">&#x27;over&#x27;</span>, <span class="hljs-string">&#x27;common&#x27;</span>, <span class="hljs-string">&#x27;stop&#x27;</span>, <span class="hljs-string">&#x27;words&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;processing&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
