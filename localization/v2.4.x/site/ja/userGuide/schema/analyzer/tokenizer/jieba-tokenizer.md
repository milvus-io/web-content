---
id: jieba-tokenizer.md
title: Jieba トーケナイザー
summary: jieba`トークナイザーは、中国語のテキストを単語単位に分解して処理する。
---
<h1 id="Jieba​" class="common-anchor-header">Jieba<button data-href="#Jieba​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">jieba</code> トークナイザーは、中国語テキストを単語に分解して処理します。</p>
<h2 id="Configuration​" class="common-anchor-header">構成<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">jieba</code> トークン化器を使用して解析器を構成するには、<code translate="no">analyzer_params</code> で<code translate="no">tokenizer</code> を<code translate="no">jieba</code> に設定します。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義するときに、<code translate="no">VARCHAR</code> フィールドに適用できます。これにより、Milvusは指定された解析器を使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
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
    </button></h2><p><code translate="no">jieba</code> トークン化器がテキストをどのように処理するかの例を示します。</p>
<p><strong>元のテキスト</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong></p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot; &quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;、&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>, <span class="hljs-string">&quot;！&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
