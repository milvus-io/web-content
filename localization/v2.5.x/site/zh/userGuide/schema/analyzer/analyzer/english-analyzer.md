---
id: english-analyzer.md
title: 英语分析器
related_key: 'english, analyzer'
summary: Milvus 中的 "英语 "分析器旨在处理英语文本，应用特定语言规则进行标记化和过滤。
---
<h1 id="English​" class="common-anchor-header">英语<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">english</code> 分析器旨在处理英文文本，应用特定语言规则进行标记化和过滤。</p>
<h3 id="Definition​" class="common-anchor-header">定义</h3><p><code translate="no">english</code> 分析器使用以下组件。</p>
<ul>
<li><p><strong>标记化器</strong>：使用 <a href="/docs/zh/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a>将文本分割成离散的单词单位。</p></li>
<li><p>过滤器：包括多个过滤器，用于综合文本处理。</p>
<ul>
<li><p><a href="/docs/zh/lowercase-filter.md"><code translate="no">lowercase</code></a>:将所有标记转换为小写，实现不区分大小写的搜索。</p></li>
<li><p><a href="/docs/zh/stemmer-filter.md"><code translate="no">stemmer</code></a>:将单词还原为词根形式，以支持更广泛的匹配（例如，"running "变为 "run"）。</p></li>
<li><p><a href="/docs/zh/stop-filter.md"><code translate="no">stop_words</code></a>:删除常见的英文停止词，以便集中搜索文本中的关键词语。</p></li>
</ul></li>
</ul>
<p><code translate="no">english</code> 分析器的功能相当于以下自定义分析器配置。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">配置</h3><p>要将<code translate="no">english</code> 分析器应用到一个字段，只需在<code translate="no">analyzer_params</code> 中将<code translate="no">type</code> 设置为<code translate="no">english</code> ，并根据需要加入可选参数即可。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">english</code> 分析器接受以下可选参数：</p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">参数</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">参数</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">包含停用词列表的数组，停用词将从标记化中删除。默认为<code translate="no">_english_</code> ，这是一组内置的常用英语停止词。</p>
</td></tr></tbody></table>
<p>自定义停止词配置示例。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>定义<code translate="no">analyzer_params</code> 后，可以在定义 Collections Schema 时将其应用到<code translate="no">VARCHAR</code> 字段。这样，Milvus 就能使用指定的分析器处理该字段中的文本，以实现高效的标记化和过滤。有关详情，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">示例使用</a>。</p>
<h3 id="Example-output​" class="common-anchor-header">输出示例</h3><p>下面是<code translate="no">english</code> 分析器处理文本的过程。</p>
<p><strong>原始文本</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期输出</strong>。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
