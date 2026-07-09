---
id: thai-tokenizer.md
title: タイ語Compatible with Milvus 3.0.0+
summary: タイ語トークナイザーは、タイ語のテキストを単語トークンに分割し、空白や句読点のみからなるセグメントを除外します。
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">タイ語<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">thai</code> トークナイザーは、スペースに依存することなく、タイ語のテキストを単語トークンに分割します。タイ語、またはタイ語と英語が混在するテキスト用のカスタムアナライザーパイプラインを構築する必要がある場合は、このトークナイザーを使用してください。</p>
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
<p>タイ語テキストの場合は、ほとんどの場合、組み込みの <a href="/docs/ja/thai-analyzer.md"><code translate="no">thai</code></a> アナライザーを使用してください。この組み込みアナライザーには、このトークナイザーに加え、小文字変換、小数点桁の正規化、およびタイ語のストップワード除去機能が含まれています。<code translate="no">thai</code> トークナイザーを直接使用するのは、カスタムアナライザーパイプラインを構築する必要がある場合に限ってください。</p>
</div>
<p><code translate="no">thai</code> トークナイザーを使用してアナライザーを設定するには、<code translate="no">analyzer_params</code> で<code translate="no">tokenizer</code> を<code translate="no">thai</code> に設定します。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">thai</code> トークナイザーには、設定可能なパラメータはありません。</p>
<p>このトークナイザーは、1つまたは複数のフィルターと組み合わせて使用できます。たとえば、以下の設定では、<code translate="no">thai</code> トークナイザーを <a href="/docs/ja/lowercase-filter.md"><code translate="no">lowercase</code></a> および <a href="/docs/ja/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> フィルターと組み合わせて使用しています：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>このカスタムパイプラインは、組み込みの<code translate="no">_thai_</code> ストップワード辞書が含まれていないため、組み込みの<code translate="no">thai</code> アナライザとは同等ではありません。完全な事前定義済みパイプラインについては、<code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code> を使用してください。</p>
<p>このトークナイザーは、以下の動作を行います：</p>
<ul>
<li><strong>タイ語のセグメンテーション</strong>：空白に依存せずに、タイ語のテキストを単語トークンに分割します。</li>
<li><strong>空白および句読点のフィルタリング</strong>：空白や句読点のみで構成されるセグメントを除外します。これは、 <a href="/docs/ja/icu-tokenizer.md"><code translate="no">icu</code></a> トークナイザーとは異なり、後者は句読点やスペースをトークンとして保持することができます。</li>
<li><strong>混合スクリプトのテキスト</strong>：タイ語と英語が混在するテキストにおいて、ラテン文字の単語トークンを出力します。</li>
<li><strong>トークナイザーのみ</strong>：トークンの小文字化、Unicode 数字の正規化、ストップワードの除去は行いません。これらの処理には、フィルタを追加するか、組み込みの <a href="/docs/ja/thai-analyzer.md"><code translate="no">thai</code></a> アナライザーを使用してください。</li>
<li><strong>位置セマンティクス</strong>：スキップされた空白や句読点を含む、文字ベースのトークン位置を使用します。これにより、フレーズマッチングや近接マッチングの挙動が、他の非ラテン文字用トークナイザーと一貫性を保つようになります。</li>
</ul>
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義する際に、<code translate="no">VARCHAR</code> フィールドにこのアナライザーを適用できます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">「使用例</a>」を参照してください。</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
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

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
