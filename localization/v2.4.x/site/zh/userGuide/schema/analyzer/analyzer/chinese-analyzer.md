---
id: chinese-analyzer.md
title: 中文分析仪
related_key: 'chinese, analyzer'
summary: 中文 "分析器专为处理中文文本而设计，可提供有效的分段和标记化功能。
---
<h1 id="Chinese​" class="common-anchor-header">中文<button data-href="#Chinese​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">chinese</code> 分析器专为处理中文文本而设计，可提供有效的分段和标记化功能。</p>
<h3 id="Definition​" class="common-anchor-header">定义</h3><p><code translate="no">chinese</code> 分析器包括</p>
<ul>
<li><p><strong>标记化器</strong>：使用<code translate="no">jieba</code> 标记化器，根据词汇和上下文将中文文本分割成标记。更多信息，请参阅<a href="/docs/zh/jieba-tokenizer.md">Jieba</a>。</p></li>
<li><p><strong>过滤器</strong>：使用<code translate="no">cnalphanumonly</code> 过滤器删除包含任何非汉字的标记。更多信息，请参阅<a href="/docs/zh/cnalphanumonly-filter.md">Cnalphanumonly</a>。</p></li>
</ul>
<p><code translate="no">chinese</code> 分析器的功能相当于以下自定义分析器配置。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">配置</h3><p>要将<code translate="no">chinese</code> 分析器应用到一个字段，只需在<code translate="no">analyzer_params</code> 中将<code translate="no">type</code> 设置为<code translate="no">chinese</code> 即可。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">chinese</code> 分析器不接受任何可选参数。</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">输出示例</h3><p>下面是<code translate="no">chinese</code> 分析器处理文本的过程。</p>
<p><strong>原始文本</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期输出</strong>。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
