---
id: english-analyzer.md
title: 英語アナライザー
related_key: 'english, analyzer'
summary: >-
  Milvusの `english`
  アナライザーは英語のテキストを処理するために設計されており、トークン化とフィルタリングのために言語固有のルールを適用する。
---
<h1 id="English​" class="common-anchor-header">英語<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの<code translate="no">english</code> アナライザーは英語のテキストを処理するように設計されており、トークン化とフィルタリングのために言語固有のルールを適用します。</p>
<h3 id="Definition​" class="common-anchor-header">定義</h3><p><code translate="no">english</code> アナライザは以下のコンポーネントを使用します。</p>
<ul>
<li><p><strong>トークン化</strong>：トークン化 <a href="/docs/ja/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a>を使用してテキストを個別の単語単位に分割します。</p></li>
<li><p>フィルター：包括的なテキスト処理のための複数のフィルターを含む。</p>
<ul>
<li><p><a href="/docs/ja/lowercase-filter.md"><code translate="no">lowercase</code></a>:すべてのトークンを小文字に変換し、大文字小文字を区別しない検索を可能にします。</p></li>
<li><p><a href="/docs/ja/stemmer-filter.md"><code translate="no">stemmer</code></a>:より広範なマッチングをサポートするため、単語を語根形に変換（例："running "は "run "に）。</p></li>
<li><p><a href="/docs/ja/stop-filter.md"><code translate="no">stop_words</code></a>:一般的な英語のストップワードを削除し、テキスト内の重要な用語に焦点を当てます。</p></li>
</ul></li>
</ul>
<p><code translate="no">english</code> アナライザーの機能は、以下のカスタムアナライザー設定と同等です。</p>
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
<h3 id="Configuration​" class="common-anchor-header">設定</h3><p><code translate="no">english</code> アナライザをフィールドに適用するには、<code translate="no">analyzer_params</code> で<code translate="no">type</code> を<code translate="no">english</code> に設定し、必要に応じてオプションのパラメータを含めます。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">english</code> アナライザーは、以下のオプション・パラメーターを受け付ける：</p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">パラメータ</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">パラメータ 説明</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">トークン化から除去されるストップワードのリストを含む配列。デフォルトは<code translate="no">_english_</code> で、一般的な英語のストップワードの組み込みセットです。</p>
</td></tr></tbody></table>
<p>カスタム・ストップワードを使用した構成例。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義するときに、<code translate="no">VARCHAR</code> フィールドに適用できます。これにより、Milvusは指定されたアナライザを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
<h3 id="Example-output​" class="common-anchor-header">出力例</h3><p>以下は、<code translate="no">english</code> アナライザがテキストをどのように処理するかです。</p>
<p><strong>元のテキスト</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong></p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
