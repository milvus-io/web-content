---
id: decompounder-filter.md
title: 減圧フィルター
summary: >-
  逆コンパウンダー（decompounder）`フィルターは、指定した辞書に基づいて複合語を個々の要素に分割し、複合語の一部を検索しやすくする。このフィルタは、ドイツ語のように複合語を頻繁に使う言語で特に有用である。
---
<h1 id="Decompounder​" class="common-anchor-header">逆コンパウンダー<button data-href="#Decompounder​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">decompounder</code> フィルタは、指定された辞書に基づいて複合語を個々の要素に分割し、複合語の一部の検索を容 易にする。このフィルタは、ドイツ語など、複合語を頻繁に使用する言語で特に便利です。</p>
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
    </button></h2><p><code translate="no">decompounder</code> フィルタはMilvusのカスタムフィルタです。このフィルタを使用するには、<code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> と、認識する単語の構成要素の辞書を指定する<code translate="no">word_list</code> パラメータをフィルタの設定に指定します。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder​</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],​
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">decompounder</code> フィルタでは以下のパラメータが設定可能です。</p>
<table data-block-token="O4ZcdyoEToqP22xm5ELcYyIhnEh"><thead><tr><th data-block-token="MW4TdhfD2oe0KTx9qwGcP5XEnIh" colspan="1" rowspan="1"><p data-block-token="Y5tddmngjoAyd1xtaDzc7It5nRf">パラメータ</p>
</th><th data-block-token="Vk8Id7BMRoJMIkxN0YPc4lJgn2f" colspan="1" rowspan="1"><p data-block-token="D4v9dtQ53oCx6ExVKhxcPj1EnWg">説明</p>
</th></tr></thead><tbody><tr><td data-block-token="CDQldJSkAonYPIxTkiWcWpqPnOd" colspan="1" rowspan="1"><p data-block-token="TX4ndGkwkogWybxIfZocILJOnbd"><code translate="no">word_list</code></p>
</td><td data-block-token="VrxtdsWnZon6oPxMmbQcCgclnUg" colspan="1" rowspan="1"><p data-block-token="BXP4dHimoocoozxbHAecJOA6nTe">複合語の分割に使用される単語コンポーネントのリスト。この辞書によって、複合語が個々の用語にどのように分解されるかが決定される。</p>
</td></tr></tbody></table>
<p><code translate="no">decompounder</code> フィルタは、トークナイザによって生成された用語に対して動作するため、トークナイザと組み合わせて使用する 必要があります。</p>
<p><code translate="no">analyzer_params</code> を定義した後、コレクション・スキーマを定義するときに、それらを<code translate="no">VARCHAR</code> フィールドに適用できます。これにより、Milvusは指定されたアナライザを使用してそのフィールドのテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
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
    </button></h2><p>以下は、<code translate="no">decompounder</code> フィルタがテキストをどのように処理するかの例です。</p>
<p><strong>元のテキスト</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong>(<code translate="no">word_list: [&quot;dampf&quot;, &quot;schiff&quot;, &quot;fahrt&quot;, &quot;brot&quot;, &quot;backen&quot;, &quot;automat&quot;]</code> を使用した場合)。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brotbackautomat&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
