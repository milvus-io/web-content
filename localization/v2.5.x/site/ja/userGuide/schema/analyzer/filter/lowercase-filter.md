---
id: lowercase-filter.md
title: 小文字フィルター
summary: lowercase`フィルターはトークナイザーによって生成された用語を小文字に変換し、大文字と小文字を区別せずに検索できるようにする。
---
<h1 id="Lowercase​" class="common-anchor-header">小文字<button data-href="#Lowercase​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">lowercase</code> フィルタは、トークナイザによって生成された用語を小文字に変換し、大文字と小文字を区別せずに検索できるようにします。例えば、<code translate="no">[&quot;High&quot;, &quot;Performance&quot;, &quot;Vector&quot;, &quot;Database&quot;]</code> を<code translate="no">[&quot;high&quot;, &quot;performance&quot;, &quot;vector&quot;, &quot;database&quot;]</code> に変換することができます。</p>
<h2 id="Configuration​" class="common-anchor-header">設定<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lowercase</code> フィルタはMilvusに組み込まれています。このフィルタを使うには、<code translate="no">analyzer_params</code> の<code translate="no">filter</code> セクションで名前を指定するだけです。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">lowercase</code> フィルタはトークナイザによって生成された用語に対して動作するため、トークナイザと組み合わせて使用する必要があります。</p>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義するときに、それらを<code translate="no">VARCHAR</code> フィールドに適用することができます。これにより、Milvusは指定されたアナライザを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
<h2 id="Example-output​" class="common-anchor-header">出力例<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>以下は、<code translate="no">lowercase</code> フィルタがテキストをどのように処理するかの例です。</p>
<p><strong>元のテキスト</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Lowercase Filter Ensures Uniformity In Text Processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong></p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;ensures&quot;</span>, <span class="hljs-string">&quot;uniformity&quot;</span>, <span class="hljs-string">&quot;in&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
