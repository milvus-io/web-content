---
id: chinese-analyzer.md
title: 中国語アナライザー
related_key: 'chinese, analyzer'
summary: chinese`アナライザーは中国語テキストを扱うために特別に設計されており、効果的なセグメンテーションとトークン化を提供する。
---
<h1 id="Chinese​" class="common-anchor-header">中国語<button data-href="#Chinese​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">chinese</code> アナライザーは中国語テキストを処理するために特別に設計されており、効果的なセグメンテーションとトークン化を提供します。</p>
<h3 id="Definition​" class="common-anchor-header">定義</h3><p><code translate="no">chinese</code> アナライザーは次のように構成されています。</p>
<ul>
<li><p><strong>トークン化</strong>：<code translate="no">jieba</code> トークナイザを使用して、語彙と文脈に基づいて中国語テキストをトークンにセグメンテーションする。詳細は<a href="/docs/ja/jieba-tokenizer.md">Jieba</a> を参照。</p></li>
<li><p><strong>フィルタ</strong>：<code translate="no">cnalphanumonly</code> フィルタを使用して、中国語以外の文字を含むトークンを削除します。詳細については、<a href="/docs/ja/cnalphanumonly-filter.md">Cnalphanumonlyを</a>参照してください。</p></li>
</ul>
<p><code translate="no">chinese</code> アナライザーの機能は、以下のカスタム アナライザー設定と同等です。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">設定</h3><p><code translate="no">chinese</code> 解析器をフィールドに適用するには、<code translate="no">analyzer_params</code> で<code translate="no">type</code> を<code translate="no">chinese</code> に設定するだけでよい。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">chinese</code> アナライザーは、オプションのパラメーターを受け付けない。</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">出力例</h3><p>以下は、<code translate="no">chinese</code> アナライザがテキストをどのように処理するかです。</p>
<p><strong>元のテキスト</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong>。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
