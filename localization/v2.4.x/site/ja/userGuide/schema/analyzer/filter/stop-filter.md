---
id: stop-filter.md
title: ストップフィルター
summary: >-
  stop`
  フィルタはトークン化されたテキストから指定したストップワードを除去し、一般的であまり意味のない単語を取り除くのに役立ちます。stop_words`
  パラメータでストップワードのリストを設定することができる。
---
<h1 id="Stop​" class="common-anchor-header">ストップ<button data-href="#Stop​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">stop</code> フィルタは、トークン化されたテキストから指定されたストップ ワードを除去し、一般的であまり意味のない単語の除去に役立ちます。ストップワードのリストは<code translate="no">stop_words</code> パラメータで設定できます。</p>
<h2 id="Configuration​" class="common-anchor-header">設定方法<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">length</code> フィルタは Milvus のカスタムフィルタです。このフィルタを使用するには、フィルタの設定に<code translate="no">&quot;type&quot;: &quot;stop&quot;</code> 、ストップワードのリストを提供する<code translate="no">stop_words</code> パラメータを指定します。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop​</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">stop</code> フィルタには以下の設定可能なパラメータがあります。</p>
<table data-block-token="RvK3dMx74obnmXxlMe3cz6W1nUf"><thead><tr><th data-block-token="SRJcd5Os3oLiJyxkT6UcDba0nrb" colspan="1" rowspan="1"><p data-block-token="IBSbdC1ByokHmnxDXomccXXJnmh">パラメータ</p>
</th><th data-block-token="V9fZd2VX7oCaeDxy8fKcDnGpnId" colspan="1" rowspan="1"><p data-block-token="FCA5dw1JEoRB2ExZpYwc8O47nld">説明</p>
</th></tr></thead><tbody><tr><td data-block-token="AO5idkJ6pobnMmxcDBjcw4T1ngh" colspan="1" rowspan="1"><p data-block-token="ZnnGd5pOloVEBkxy0ZNcPmxen2g"><code translate="no">stop_words</code></p>
</td><td data-block-token="OaeWdJElZowPJrxzIFccUVoYn22" colspan="1" rowspan="1"><p data-block-token="LWBNdMr8fokmXnxpL5cc9z8Pntd">トークン化から削除する単語のリスト。デフォルトでは、一般的な英語のストップワードを含む、定義済みの<code translate="no">_english_</code> リストが使用されます。<code translate="no">_english_</code> の詳細は<a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">こちらを</a>ご覧ください。</p>
</td></tr></tbody></table>
<p><code translate="no">stop</code> フィルタはトークナイザによって生成された単語に対して動作するため、トークナイザと組み合わせて使用する必要があります。</p>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義する際に、<code translate="no">VARCHAR</code> フィールドに適用することができます。これにより、Milvusは指定されたアナライザを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
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
    </button></h2><p>以下は、<code translate="no">stop</code> フィルタがテキストをどのように処理するかの例です。</p>
<p><strong>元のテキスト</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong>(<code translate="no">stop_words: [&quot;the&quot;, &quot;over&quot;, &quot;_english_&quot;]</code> を使用した場合)。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;allows&quot;</span>, <span class="hljs-string">&quot;control&quot;</span>, <span class="hljs-string">&quot;common&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
