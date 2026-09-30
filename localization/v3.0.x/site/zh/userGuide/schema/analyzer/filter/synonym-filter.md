---
id: synonym-filter.md
title: 同义词
summary: 在文本分析过程中，使用同义词过滤器用同义词词典重写标记。
---
<h1 id="Synonym" class="common-anchor-header">同义词<button data-href="#Synonym" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">synonym</code> 过滤器根据同义词词典重写词块，以便在搜索时匹配相关术语。它支持两种操作符和两种提供词典的方式：</p>
<ul>
<li><p><strong>操作模式</strong>-<code translate="no">expand</code> 模式保留原始标记，并在旁边发出附加同义词；规范化模式 (<code translate="no">expand: false</code>) 将标记改写为规范形式。</p></li>
<li><p><strong>字典来源</strong>--小型字典可通过<code translate="no">synonyms</code> 数组内联到过滤器配置中；大型字典应存储为<a href="/docs/zh/manage-file-resources.md">文件资源</a>，并通过<code translate="no">synonyms_file</code> 引用。</p></li>
</ul>
<h2 id="Dictionary-format" class="common-anchor-header">词典格式<button data-href="#Dictionary-format" class="anchor-icon" translate="no">
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
    </button></h2><p>同义词词典是纯文本文档（或内联数组），其中每行定义一条规则。支持两种规则形式。</p>
<h3 id="Mapping-rule" class="common-anchor-header">映射规则<button data-href="#Mapping-rule" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">fast, quick =&gt; speedy
<button class="copy-code-btn"></button></code></pre>
<p>左边的标记 (<code translate="no">fast</code>,<code translate="no">quick</code>) 重写为右边的标记 (<code translate="no">speedy</code>)。允许多个目标：</p>
<pre><code translate="no" class="language-plaintext">small, little =&gt; tiny, compact
<button class="copy-code-btn"></button></code></pre>
<p>使用<code translate="no">expand: true</code> 时，原始标记与目标标记一起保留：</p>
<ul>
<li><p>输入<code translate="no">fast</code> ，<code translate="no">expand: true</code> →<code translate="no">fast</code> 、<code translate="no">speedy</code></p></li>
<li><p>输入<code translate="no">fast</code> ，<code translate="no">expand: false</code> → 。<code translate="no">speedy</code></p></li>
</ul>
<h3 id="Equivalence-group" class="common-anchor-header">等价组<button data-href="#Equivalence-group" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">happy, joyful, cheerful
<button class="copy-code-btn"></button></code></pre>
<p>所有列出的标记都被认为是等价的：</p>
<ul>
<li><p>有了<code translate="no">expand: true</code> ，该组中任何标记的任何出现都会发射该组中的每个标记。输入<code translate="no">happy</code> →<code translate="no">happy</code>,<code translate="no">joyful</code>,<code translate="no">cheerful</code> 。</p></li>
<li><p>使用<code translate="no">expand: false</code> 时，每个出现的标记都会被改写为组中的第一个标记。输入<code translate="no">joyful</code> →<code translate="no">happy</code> ；输入<code translate="no">happy</code> 已是第一个标记，保持不变。</p></li>
</ul>
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
    </button></h2><p><code translate="no">synonym</code> 过滤器是一个自定义过滤器。指定<code translate="no">&quot;type&quot;: &quot;synonym&quot;</code> 以及<code translate="no">synonyms</code> （内联）或<code translate="no">synonyms_file</code> （外部）中的至少一个，再加上<code translate="no">expand</code> 标志。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
            <span class="hljs-string">&quot;synonyms&quot;</span>: [                       <span class="hljs-comment"># inline rules (optional)</span>
                <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
                <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
            ],
            <span class="hljs-string">&quot;synonyms_file&quot;</span>: {                  <span class="hljs-comment"># external rules (optional)</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
                <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
                <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
            },
            <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">synonym</code> 过滤器接受以下参数。</p>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>说明</strong></p></th>
     <th><p><strong>默认值</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms</code></p></td>
     <td><p>规则字符串的内联数组。每个字符串都使用上述字典格式。适用于小型字典（最多几十条规则）。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms_file</code></p></td>
     <td><p>对存储同义词规则的<a href="/docs/zh/manage-file-resources.md">文件资源</a>的引用，每行一条。适用于较大的字典。请参阅下面的<a href="/docs/zh/synonym-filter.md#External-dictionary-file">外部字典文件</a>。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">expand</code></p></td>
     <td><p>true：保留原始标记并在其旁边发出同义词；false：将标记改写为其规范形式（映射的右侧或等价组的第一个标记）。</p></td>
     <td><p>假</p></td>
   </tr>
</table>
<p>您可以指定<code translate="no">synonyms</code> 、<code translate="no">synonyms_file</code> 或两者。当两者都出现时，过滤器会合并两个来源。该过滤器对标记符生成器产生的标记进行操作；因此必须与<a href="/docs/zh/standard-tokenizer.md">标准</a>标记符等标记符生成器结合使用。</p>
<h3 id="External-dictionary-file" class="common-anchor-header">外部字典文件<button data-href="#External-dictionary-file" class="anchor-icon" translate="no">
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
    </button></h3><p>对于生产规模的字典，将文件注册为远程文件资源，并从<code translate="no">synonyms_file</code> 引用。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the file once, then reference it from any analyzer that needs it.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_synonyms&quot;</span>,
    path=<span class="hljs-string">&quot;file/synonyms.txt&quot;</span>,     <span class="hljs-comment"># full S3 object key, including rootPath</span>
)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
        },
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p>有关完整的工作流程（上传、注册、列表、删除）和其他<code translate="no">&quot;type&quot;: &quot;local&quot;</code> 表格，请参阅管理文件资源。</p>
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
    </button></h2><p>在将分析器应用于 Collections Schema 之前，请使用<code translate="no">run_analyzer</code> 验证其行为。为简洁起见，以下示例使用内联<code translate="no">synonyms</code> 数组；如果字典较大，请用<code translate="no">synonyms_file</code> 代替。</p>
<h3 id="expand-true--keep-the-original-add-synonyms" class="common-anchor-header"><code translate="no">expand: true</code> - 保留原文，添加同义词<button data-href="#expand-true--keep-the-original-add-synonyms" class="anchor-icon" translate="no">
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

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;fast&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;joyful&#x27;, &#x27;cheerful&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">fast</code> 和<code translate="no">happy</code> 都将保留；它们的同义词也将同时发布。</p>
<h3 id="expand-false--rewrite-to-canonical-form" class="common-anchor-header"><code translate="no">expand: false</code> - 重写为规范格式<button data-href="#expand-false--rewrite-to-canonical-form" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params_norm = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">False</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>映射规则将<code translate="no">fast</code> 改写为<code translate="no">speedy</code> 。等价组将<code translate="no">happy</code> 保留不变，因为它是该组的第一个标记；包含<code translate="no">joyful</code> 或<code translate="no">cheerful</code> 的输入将被改写为<code translate="no">happy</code> 。</p>
