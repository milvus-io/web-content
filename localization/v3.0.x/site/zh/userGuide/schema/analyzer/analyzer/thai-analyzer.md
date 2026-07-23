---
id: thai-analyzer.md
title: 泰语Compatible with Milvus 3.0.0+
summary: 内置的泰语分析器会将泰语文本分割为单词，对Unicode十进制数字进行规范化处理，并移除泰语停用词。
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">泰语<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">thai</code> 分析器是用于泰语文本的内置分析器。当您需要 Milvus 将泰语文本分割为单词、规范化泰语数字、将混杂拉丁字母的文本转换为小写以及移除泰语停用词时，请使用此分析器。</p>
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
    </button></h2><p>内置分析器是 Milvus 提供的分析器模板。要使用内置分析器，请将 `<code translate="no">type</code> ` 设置为 `<code translate="no">analyzer_params</code>` 中预定义的分析器名称。</p>
<p>要使用内置的泰语分析器，请将 `<code translate="no">type</code> ` 设置为 `<code translate="no">thai</code>`：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">thai</code> 分析器支持以下可选参数：</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>类型</p></th>
     <th><p>默认值</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p><code translate="no">list[str]</code></p></td>
     <td><p><code translate="no">_thai_</code></p></td>
     <td><p>要从分词过程中剔除的额外停用词列表。默认情况下，<code translate="no">thai</code> 分析器使用内置的<code translate="no">_thai_</code> 词典。如需查看默认词典，请参阅 Milvus<a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/thai.txt">泰语停用词列表</a>。该列表源自 Apache Lucene<a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/th/stopwords.txt">泰语停用词文件</a>。</p></td>
   </tr>
</table>
<p>要添加自定义停用词，请包含<code translate="no">stop_words</code> ：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;มิลวัส&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 会在内置的<code translate="no">_thai_</code> 词典基础上应用自定义停用词。</p>
<p>内置的<code translate="no">thai</code> 分析器等同于以下自定义分析器配置：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_thai_&quot;</span>],
        },
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>该分析器执行以下处理步骤：</p>
<ul>
<li><strong>分词</strong>：使用 <a href="/docs/zh/thai-tokenizer.md"><code translate="no">thai</code></a> 分词器将泰语文本分割为单词词素，且不依赖空格。该分词器会过滤掉仅包含空格和标点符号的片段。</li>
<li><strong>大小写规范化</strong>：使用<code translate="no">lowercase</code> 过滤器，该过滤器对泰语/英语混合文本中的拉丁字母起作用。</li>
<li><strong>数字规范化</strong>：使用<code translate="no">decimaldigit</code> 过滤器，将泰语数字和其他Unicode十进制数字转换为ASCII数字。</li>
<li><strong>停用词去除</strong>：使用<code translate="no">stop</code> 过滤器，并结合内置的<code translate="no">_thai_</code> 词典。</li>
<li><strong>不进行词干提取</strong>：内置的<code translate="no">thai</code> 分析器不应用<code translate="no">stemmer</code> 过滤器。</li>
</ul>
<p>定义<code translate="no">analyzer_params</code> 后，您可以在定义Collection Schema时将该分析器应用于<code translate="no">VARCHAR</code> 字段。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">“使用示例”</a>。</p>
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
    </button></h2><p>在将分析器配置应用于 Collection Schema 之前，请使用 `<code translate="no">run_analyzer</code> ` 方法验证其行为。</p>
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">使用<code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;ฉันรักการค้นหาข้อความใน Milvus ๑๒๓&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;ฉัน&#x27;</span>, <span class="hljs-string">&#x27;รัก&#x27;</span>, <span class="hljs-string">&#x27;ค้นหา&#x27;</span>, <span class="hljs-string">&#x27;ข้อความ&#x27;</span>, <span class="hljs-string">&#x27;milvus&#x27;</span>, <span class="hljs-string">&#x27;123&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
