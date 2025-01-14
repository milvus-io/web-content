---
id: chinese-analyzer.md
title: 中文分析儀
related_key: 'chinese, analyzer'
summary: 中文」分析器是專為處理中文文字而設計，提供有效的分割和標記化。
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
    </button></h1><p><code translate="no">chinese</code> 分析器專為處理中文文字而設計，提供有效的分割和標記化。</p>
<h3 id="Definition​" class="common-anchor-header">定義</h3><p><code translate="no">chinese</code> 分析器包括</p>
<ul>
<li><p><strong>標記器</strong>：使用<code translate="no">jieba</code> tokenizer 根據詞彙和上下文將中文文字分割成 token。如需更多資訊，請參考<a href="/docs/zh-hant/jieba-tokenizer.md">Jieba</a>。</p></li>
<li><p><strong>過濾器</strong>：使用<code translate="no">cnalphanumonly</code> 過濾器移除包含任何非中文字元的字元。如需詳細資訊，請參閱<a href="/docs/zh-hant/cnalphanumonly-filter.md">Cnalphanumonly</a>。</p></li>
</ul>
<p><code translate="no">chinese</code> 分析器的功能等同於下列自訂分析器配置。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">配置</h3><p>要將<code translate="no">chinese</code> 分析器套用到欄位，只要在<code translate="no">analyzer_params</code> 中將<code translate="no">type</code> 設為<code translate="no">chinese</code> 即可。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">chinese</code> 分析器不接受任何可選參數。</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">輸出範例</h3><p>以下是<code translate="no">chinese</code> 分析器如何處理文字。</p>
<p><strong>原始文字</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>預期輸出</strong>。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
