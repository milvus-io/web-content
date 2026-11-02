---
id: lindera-tokenizer.md
title: Lindera
summary: >-
  lindera
  トークナイザーは、辞書ベースの形態素解析を行います。これは、単語がスペースで区切られず、文法標識（助詞）が単語に直接付く日本語や韓国語向けに設計されています。
---
<h1 id="Lindera" class="common-anchor-header">Lindera<button data-href="#Lindera" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">lindera</code> トークナイザーは、辞書ベースの形態素解析を行います。このトークナイザーは、単語がスペースで区切られず、文法標識（助詞）が単語に直接付加される日本語および韓国語向けに設計されています。</p>
<div class="alert note">
<p><strong>中国語のテキストの場合</strong>：<code translate="no">lindera</code> は<code translate="no">cc-cedict</code> 辞書を通じて中国語に対応していますが、代わりに <a href="/docs/ja/jieba-tokenizer.md"><code translate="no">jieba</code></a> トークナイザーの使用をお勧めします。Jiebaは中国語の単語分割に特化して設計されており、より優れた結果が得られます。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>日本語と韓国語は膠着語です。助詞と呼ばれる文法標識が名詞に直接付加され、数多くの組み合わせを形成します。例：</p>
<table>
   <tr>
     <th><p>言語</p></th>
     <th><p>語幹</p></th>
     <th><p>+ 助詞</p></th>
     <th><p>= 複合形</p></th>
     <th><p>뜻</p></th>
   </tr>
   <tr>
     <td><p>韓国語</p></td>
     <td><p>ソウル (Seoul)</p></td>
     <td><p>から</p></td>
     <td><p>ソウルで</p></td>
     <td><p>ソウルで</p></td>
   </tr>
   <tr>
     <td><p>日本語</p></td>
     <td><p>東京 (Tokyo)</p></td>
     <td><p>に</p></td>
     <td><p>東京に</p></td>
     <td><p>to Tokyo</p></td>
   </tr>
</table>
<p><code translate="no">lindera</code> トークナイザー：</p>
<ol>
<li><p><strong>テキストを</strong>個々の形態素（単語や助詞）<strong>に分割します</strong></p></li>
<li><p>辞書に基づいて、<strong>各トークンに</strong>品詞（POS）情報を<strong>付与する</strong></p></li>
<li><p><strong>フィルタを適用して</strong>、不要なトークン（助詞や句読点など）を除去する</p></li>
</ol>
<p>この2段階のプロセス（セグメンテーションと、それに続く品詞（POS）に基づくフィルタリング）により、検索用にインデックス化されるトークンを正確に制御できます。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6 以降には、公式リリースにすべての辞書がプリコンパイルされて含まれています。</p>
<p><details>
<summary>Milvus 2.5.x：辞書を含めて Milvus をコンパイルする</summary></p>
<p>Milvus 2.5.x の場合、特定の辞書を有効にして Milvus をコンパイルする必要があります。すべての辞書は、コンパイル時に明示的に含める必要があります。</p>
<p>特定の辞書を有効にするには、コンパイルコマンドにそれらを含めます：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>利用可能な辞書の完全なリスト：</p>
<table>
   <tr>
     <th><p><strong>辞書</strong></p></th>
     <th><p><strong>言語</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>韓国語</p></td>
     <td><p>韓国語形態素辞書 (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>日本語</p></td>
     <td><p>標準形態素辞書 (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic-neologd</p></td>
     <td><p>日本語</p></td>
     <td><p>新語や固有名詞を追加した拡張辞書 (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-unidic</p></td>
     <td><p>日本語</p></td>
     <td><p>学術標準辞書 (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>中国語</p></td>
     <td><p>コミュニティが管理する中国語-英語辞書 (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></td>
   </tr>
</table>
<p>たとえば、すべての辞書を有効にするには：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lindera</code> トークナイザーを使用してアナライザーを設定するには、<code translate="no">tokenizer.type</code> を<code translate="no">lindera</code> に設定し、<code translate="no">dict_kind</code> で辞書を選択し、必要に応じてフィルターを適用します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
  analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
      put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
      put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);
      put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
              put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
              put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
              ));
          }}
      ));
  }});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
          <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
          <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
                  <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                  <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                      <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                      <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                      <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
                  },
              },
          },
      },
  }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>トークナイザーの型。これは<code translate="no">"lindera"</code> に固定されています。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>語彙を定義するために使用される辞書。取り得る値：</p><ul><li><p><code translate="no">ko-dic</code>: Korean - 韓国語形態素辞書 (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></li><li><p><code translate="no">ipadic</code>: 日本語 - 標準形態素辞書 (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></li><li><p><code translate="no">ipadic-neologd</code>: 新語を含む日本語辞書（拡張版） - 新語や固有名詞を含む（<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>）</p></li><li><p><code translate="no">unidic</code>: 日本語 UniDic（拡張版） - 詳細な言語情報を含む学術標準辞書（<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>）</p></li><li><p><code translate="no">cc-cedict</code>: 標準中国語（繁体字／簡体字） - コミュニティが維持管理する中国語-英語辞書（<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">filter</code></p></td>
     <td><p>分節処理後に適用するトークナイザーレベルのフィルターの一覧。各フィルターは、以下の要素を持つオブジェクトです：</p><ul><li><p><code translate="no">kind</code>: フィルターの種類。サポートされる値：</p><ul><li><p><code translate="no">korean_stop_tags</code>: 指定された韓国語の品詞タグに一致するトークンを削除します。</p></li><li><p><code translate="no">japanese_stop_tags</code>: 指定された日本語の品詞タグに一致するトークンを削除します。</p></li></ul></li><li><p><code translate="no">tags</code>: 除外する品詞タグのリスト。利用可能なタグは、<code translate="no">kind</code> によって異なります：</p><ul><li><p><code translate="no">korean_stop_tags</code> の場合：正確なタグコードを使用します（例：<code translate="no">JKS</code> 、<code translate="no">JKO</code> 、<code translate="no">SF</code> ）。韓国語のタグは完全一致が必要です。世宗（Sejong）タグセットに基づく完全なリストについては、<a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">Linderaの韓国語ストップタグのソースを</a>参照してください。</p></li><li><p><code translate="no">japanese_stop_tags</code> の場合：正確なタグコード（例：<code translate="no">助詞,格助詞</code> 、<code translate="no">助詞,係助詞</code> 、<code translate="no">助動詞</code> ）を使用してください。日本語のタグは完全一致が必要です。完全なリスト（IPADIC）については、<a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">日本語のPOSタグリファレンスを</a>参照してください。</p></li></ul></li></ul></td>
   </tr>
</table>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義する際に、それらを<code translate="no">VARCHAR</code> フィールドに適用できます。これにより、Milvusはそのフィールド内のテキストを指定されたアナライザーを使用して処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">「使用例」</a>を参照してください。</p>
<h2 id="Examples" class="common-anchor-header">例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>アナライザの設定をコレクションスキーマに適用する前に、<code translate="no">run_analyzer</code> メソッドを使用してその動作を確認してください。</p>
<h3 id="Korean-example" class="common-anchor-header">韓国語の例<button data-href="#Korean-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
              <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
              <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
              },
          },
      },
  },
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [
          <span class="hljs-string">&quot;SP&quot;</span>,
          <span class="hljs-string">&quot;SSC&quot;</span>,
          <span class="hljs-string">&quot;SSO&quot;</span>,
          <span class="hljs-string">&quot;SC&quot;</span>,
          <span class="hljs-string">&quot;SE&quot;</span>,
          <span class="hljs-string">&quot;SF&quot;</span>,
          <span class="hljs-string">&quot;JKS&quot;</span>,
          <span class="hljs-string">&quot;JKC&quot;</span>,
          <span class="hljs-string">&quot;JKG&quot;</span>,
          <span class="hljs-string">&quot;JKO&quot;</span>,
          <span class="hljs-string">&quot;JKB&quot;</span>,
          <span class="hljs-string">&quot;JKV&quot;</span>,
          <span class="hljs-string">&quot;JKQ&quot;</span>,
          <span class="hljs-string">&quot;JX&quot;</span>,
          <span class="hljs-string">&quot;JC&quot;</span>,
          <span class="hljs-string">&quot;UNK&quot;</span>,
          <span class="hljs-string">&quot;EP&quot;</span>,
          <span class="hljs-string">&quot;ETM&quot;</span>,
        ],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力</strong>：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;서울&#x27;, &#x27;맛있&#x27;, &#x27;음식&#x27;, &#x27;먹&#x27;, &#x27;습니다&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">korean_stop_tags</code> を使用しない場合、出力には<code translate="no">에서</code> (in)、<code translate="no">는</code> (トピックマーカー)、<code translate="no">을</code> (オブジェクトマーカー) といった粒子が含まれますが、これらは通常、検索には役立ちません。</p>
<h3 id="Japanese-example" class="common-anchor-header">日本語の例<button data-href="#Japanese-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>);
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>,
              },
          },
      },
  },
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ipadic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ipadic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;japanese_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;接続詞\&quot;,\&quot;助詞,格助詞\&quot;,\&quot;助詞,格助詞,一般\&quot;,\&quot;助詞,格助詞,引用\&quot;,\&quot;助詞,格助詞,連語\&quot;,\&quot;助詞,係助詞\&quot;,\&quot;助詞,終助詞\&quot;,\&quot;助詞,接続助詞\&quot;,\&quot;助詞,特殊\&quot;,\&quot;助詞,副助詞\&quot;,\&quot;助詞,副助詞／並立助詞／終助詞\&quot;,\&quot;助詞,連体化\&quot;,\&quot;助詞,副詞化\&quot;,\&quot;助詞,並立助詞\&quot;,\&quot;助動詞\&quot;,\&quot;記号,一般\&quot;,\&quot;記号,読点\&quot;,\&quot;記号,句点\&quot;,\&quot;記号,空白\&quot;,\&quot;記号,括弧閉\&quot;,\&quot;記号,括弧開\&quot;,\&quot;その他,間投\&quot;,\&quot;フィラー\&quot;,\&quot;非言語音\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>期待される出力：</strong></p>
<pre><code translate="no" class="language-plaintext">[&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;最寄り駅&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">japanese_stop_tags</code> を指定しない場合、出力には<code translate="no">の</code> （所有格）、<code translate="no">は</code> （トピックマーカー）、<code translate="no">です</code> （助動詞）などの助詞が含まれてしまいます。</p>
