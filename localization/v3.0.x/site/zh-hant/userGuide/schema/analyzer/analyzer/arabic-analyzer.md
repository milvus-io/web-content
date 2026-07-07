---
id: arabic-analyzer.md
title: 阿拉伯文Compatible with Milvus 3.0.0+
summary: 內建的阿拉伯語分析器會透過將字母變體和數字標準化、進行詞幹提取，以及移除阿拉伯語停用詞，來處理阿拉伯語文本。
beta: Milvus 3.0.0+
---
<h1 id="Arabic" class="common-anchor-header">阿拉伯文<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">arabic</code> 分析器是專為阿拉伯文設計的內建分析器。當您需要 Milvus 對阿拉伯字母變體進行標準化、移除標點符號與 Tatweel、轉換阿拉伯-印度數字、套用阿拉伯語詞幹化，以及移除阿拉伯語停用詞時，請使用此分析器。</p>
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
    </button></h2><p>內建分析器是 Milvus 提供的分析器範本。若要使用內建分析器，請將 `<code translate="no">type</code> ` 設定為 `<code translate="no">analyzer_params</code>` 中預先定義的分析器名稱。</p>
<p>若要使用內建的阿拉伯語分析器，請將 `<code translate="no">type</code> ` 設定為 `<code translate="no">arabic</code>`：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">arabic</code> 分析器接受以下選填參數：</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>類型</p></th>
     <th><p>預設值</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p><code translate="no">list[str]</code></p></td>
     <td><p><code translate="no">_arabic_</code></p></td>
     <td><p>一組需從分詞過程中移除的額外停用詞清單。預設情況下，<code translate="no">arabic</code> 分析器會使用內建的<code translate="no">_arabic_</code> 字典。如需檢視預設字典，請參閱 Milvus<a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">阿拉伯語停用詞清單</a>。該清單來源為 Apache Lucene<a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ar/stopwords.txt">阿拉伯語停用詞檔案</a>。</p></td>
   </tr>
</table>
<p>若要新增自訂停用詞，請加入<code translate="no">stop_words</code> ：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;ميلفوس&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 會在內建的<code translate="no">_arabic_</code> 詞典之外，額外套用自訂停用詞。</p>
<p>內建的 `<code translate="no">arabic</code> ` 分析器等同於以下自訂分析器設定：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
        <span class="hljs-string">&quot;arabic_normalization&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_arabic_&quot;</span>,
        },
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>此分析器會執行以下處理步驟：</p>
<ul>
<li><strong>分詞</strong>：使用<code translate="no">standard</code> 分詞器將文字分割為詞元。</li>
<li><strong>數字正規化</strong>：使用<code translate="no">decimaldigit</code> 過濾器，將阿拉伯-印度數字及其他 Unicode 十進位數字轉換為 ASCII 數字。</li>
<li><strong>阿拉伯文正規化</strong>：使用<code translate="no">arabic_normalization</code> 篩選器，對Alef變體、Teh Marbuta及Alef Maksura進行正規化，並移除Harakat和Tatweel。</li>
<li><strong>詞幹提取</strong>：使用<code translate="no">stemmer</code> 篩選器，並將<code translate="no">language</code> 設定為<code translate="no">arabic</code> 。</li>
<li><strong>停用詞移除</strong>：使用<code translate="no">stop</code> 篩選器，並搭配內建的<code translate="no">_arabic_</code> 字典。</li>
</ul>
<p>定義<code translate="no">analyzer_params</code> 後，您可在定義集合架構時，將此分析器套用至<code translate="no">VARCHAR</code> 欄位。詳細資訊請參閱「<a href="/docs/zh-hant/analyzer-overview.md#Example-use">使用範例</a>」。</p>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>在將分析器設定套用至您的集合架構之前，請先使用<code translate="no">run_analyzer</code> 方法驗證其行為。</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">分析器設定<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">使用<code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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

sample_text = <span class="hljs-string">&quot;كِتَابٌ عـــربي ١٢٣&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">預期輸出<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عرب&#x27;</span>, <span class="hljs-string">&#x27;123&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
