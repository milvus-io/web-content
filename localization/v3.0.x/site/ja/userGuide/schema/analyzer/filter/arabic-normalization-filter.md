---
id: arabic-normalization-filter.md
title: アラビア語の正規化Compatible with Milvus 3.0.0+
summary: 「arabic_normalization」フィルターは、アラビア文字の異体字を正規化し、アラビア文字の発音記号やタトウィールを削除します。
beta: Milvus 3.0.0+
---
<h1 id="Arabic-Normalization" class="common-anchor-header">アラビア語の正規化<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic-Normalization" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">arabic_normalization</code> フィルターは、アラビア語テキスト用の組み込みトークンフィルターです。このフィルターは、アラビア語特有の文字の異形を正規化し、テキスト分析の際に同義のアラビア語用語が異なって見える原因となる、省略可能な記号を削除します。</p>
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
    </button></h2><div class="alert note">
<p>アラビア語テキストについては、ほとんどの場合、組み込みの <a href="/docs/ja/arabic-analyzer.md"><code translate="no">arabic</code></a> アナライザーを使用してください。この組み込みアナライザーには、標準的なトークン化、小文字化、小数点桁の正規化、アラビア語のステミング、アラビア語のストップワード除去に加え、このフィルターも含まれています。<code translate="no">arabic_normalization</code> を直接使用するのは、カスタムアナライザーパイプラインを構築する必要がある場合に限ってください。</p>
</div>
<p>カスタムアナライザーで<code translate="no">arabic_normalization</code> フィルターを使用するには、<code translate="no">analyzer_params</code> の<code translate="no">filter</code> セクションに次のように追加します：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">arabic_normalization</code> フィルターには設定可能なパラメータはありません。</p>
<p>このフィルタは、以下の変換を適用します：</p>
<table>
   <tr>
     <th><p>変換</p></th>
     <th><p>元</p></th>
     <th><p>変換後</p></th>
   </tr>
   <tr>
     <td><p>ハムザ＋アレフの異形</p></td>
     <td><p><code translate="no">آ</code>、<code translate="no">أ</code> 、<code translate="no">إ</code></p></td>
     <td><p><code translate="no">ا</code></p></td>
   </tr>
   <tr>
     <td><p>テ・マルブタ</p></td>
     <td><p><code translate="no">ة</code></p></td>
     <td><p><code translate="no">ه</code></p></td>
   </tr>
   <tr>
     <td><p>アレフ・マクスラ</p></td>
     <td><p><code translate="no">ى</code></p></td>
     <td><p><code translate="no">ي</code></p></td>
   </tr>
   <tr>
     <td><p>ハラカート</p></td>
     <td><p><code translate="no">U+064B</code> ～<code translate="no">U+065F</code></p></td>
     <td><p>削除済み</p></td>
   </tr>
   <tr>
     <td><p>タトゥイール／カシダ</p></td>
     <td><p><code translate="no">ـ</code></p></td>
     <td><p>削除済み</p></td>
   </tr>
</table>
<p>このフィルターは、トークナイザーによって生成されたトークンを処理します。上記の設定は、意図的にカスタムアナライザーの例として示されたものであり、アラビア語処理パイプラインの完全な構成は含まれていません。</p>
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
    </button></h2><p>アナライザーの設定をコレクションスキーマに適用する前に、<code translate="no">run_analyzer</code> メソッドを使用してその動作を確認してください。</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">アナライザーの設定<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">xml-ph-0000@deepl.internal を使用した検証<code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;آدم أحمد إسلام مدرسة كبرى كِتَابٌ عـــربي&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">期待される出力<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;ادم&#x27;</span>, <span class="hljs-string">&#x27;احمد&#x27;</span>, <span class="hljs-string">&#x27;اسلام&#x27;</span>, <span class="hljs-string">&#x27;مدرسه&#x27;</span>, <span class="hljs-string">&#x27;كبري&#x27;</span>, <span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عربي&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
