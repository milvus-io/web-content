---
id: pinyin-filter.md
title: 拼音Compatible with Milvus 3.0.x
summary: 在文字分析過程中，拼音過濾器會將中文字元片段轉換為拼音片段，從而實現基於拼音的中文文字比對。
beta: Milvus 3.0.x
---
<h1 id="Pinyin" class="common-anchor-header">拼音<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Pinyin" class="anchor-icon" translate="no">
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
    </button></h1><p>中文文字搜尋通常需要使用者精確輸入與索引文字中完全相同的漢字。在名稱查詢、自動完成及邊打字邊搜尋的工作流程中，使用者經常會輸入拼音而非漢字。 例如，使用者可能會輸入「<code translate="no">zuqiu</code> 」來搜尋「<code translate="no">足球</code> 」。<code translate="no">pinyin</code> 過濾器會在分析器輸出中加入拼音標記，使中文文字能與拼音輸入進行比對，而無需維護獨立的拼音欄位。</p>
<p><code translate="no">pinyin</code> 篩選器通常與<a href="/docs/zh-hant/jieba-tokenizer.md">Jieba</a>分詞器搭配使用於中文文本。它可在自訂分析器篩選器管線中運作，並能針對同一個中文詞元輸出多種拼音詞元形式。</p>
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
    </button></h2><p>若要使用預設選項，請在<code translate="no">analyzer_params</code> 的<code translate="no">filter</code> 區段中指定<code translate="no">&quot;pinyin&quot;</code> 。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>此簡寫設定會保留原始的中文詞元，並輸出字元級的拼音詞元。除非您明確啟用相關選項，否則它不會輸出連音拼音或拼音首字母。</p>
<p>若要完全掌控，請將篩選器指定為物件，並配置 Milvus 產出的拼音標記形式。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;filter&quot;</span>: [</span>
<span class="highlighted-comment-line">        {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    ],</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>此篩選器接受以下參數。</p>
<table>
<thead>
<tr><th>參數</th><th>類型</th><th>預設值</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">keep_original</code></td><td>布林值</td><td><code translate="no">true</code></td><td>在分析器的輸出中保留原始的中文標記。</td></tr>
<tr><td><code translate="no">keep_full_pinyin</code></td><td>布林值</td><td><code translate="no">true</code></td><td>輸出字元層級的拼音標記。例如，<code translate="no">中文</code> 會產生<code translate="no">zhong</code> 和<code translate="no">wen</code> 。</td></tr>
<tr><td><code translate="no">keep_joined_full_pinyin</code></td><td>布林值</td><td><code translate="no">false</code></td><td>針對每個來源詞元，輸出一個組合後的拼音詞元。例如，<code translate="no">中文</code> 會產生<code translate="no">zhongwen</code> 。</td></tr>
<tr><td><code translate="no">keep_separate_first_letter</code></td><td>布林值</td><td><code translate="no">false</code></td><td>針對每個來源詞元，輸出一個拼音首字母詞元。例如，<code translate="no">中文</code> 會產生<code translate="no">zw</code> 。</td></tr>
</tbody>
</table>
<p>此篩選器針對分詞器產生的詞元進行處理。對於中文文本，請搭配如<code translate="no">jieba</code> 之類的分詞器使用。</p>
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
    </button></h2><p>在將分析器設定套用至您的集合架構之前，請先使用<code translate="no">run_analyzer</code> 驗證其運作行為。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-text-with-character-level-Pinyin" class="common-anchor-header">將中文文字與字元級別的拼音進行配對<button data-href="#Match-Chinese-text-with-character-level-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>預設的<code translate="no">pinyin</code> 篩選器會保留原始的中文詞元，並輸出字元級的拼音詞元。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhong&#x27;, &#x27;wen&#x27;, &#x27;测试&#x27;, &#x27;ce&#x27;, &#x27;shi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-joined-Pinyin" class="common-anchor-header">將中文詞彙與拼寫連字形式進行匹配<button data-href="#Match-Chinese-terms-with-joined-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>若需讓中文詞彙與其完整的拼讀形式進行比對，請啟用<code translate="no">keep_joined_full_pinyin</code> 。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhongwen&#x27;, &#x27;测试&#x27;, &#x27;ceshi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-Pinyin-initials" class="common-anchor-header">將中文詞彙與拼音首字母進行配對<button data-href="#Match-Chinese-terms-with-Pinyin-initials" class="anchor-icon" translate="no">
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
    </button></h3><p>若需讓中文詞彙與其拼音首字母形式進行配對，請啟用<code translate="no">keep_separate_first_letter</code> 。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zw&#x27;, &#x27;测试&#x27;, &#x27;cs&#x27;]
<button class="copy-code-btn"></button></code></pre>
