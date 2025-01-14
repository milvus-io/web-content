---
id: stemmer-filter.md
title: 濾波器
summary: 詞幹」篩選器可將詞彙還原為其基礎或字根形式 (稱為詞幹)，使不同轉折中具有類似涵義的詞彙更容易匹配。
---
<h1 id="Stemmer​" class="common-anchor-header">詞幹<button data-href="#Stemmer​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">stemmer</code> 篩選器可將字彙還原為其基本或字根形式 (稱為詞幹)，使不同轉折中具有類似涵義的字彙更容易匹配。<code translate="no">stemmer</code> 過濾器支援多種語言，可在各種語言環境中進行有效的搜尋與索引。</p>
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
    </button></h2><p><code translate="no">stemmer</code> 篩選器是 Milvus 的自訂篩選器。若要使用它，請在篩選器設定中指定<code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> ，以及<code translate="no">language</code> 參數，以選擇所需的語言進行詞幹處理。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer​</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">stemmer</code> 過濾器接受下列可設定的參數。</p>
<table data-block-token="CnsXd9Ej7ozbQixt3lzcMqoanUf"><thead><tr><th data-block-token="ASZldv4hso4KpYxws1LcIE6fnSb" colspan="1" rowspan="1"><p data-block-token="FgIodsPFMoIlfDxk0GLcnf6Cn3c">參數</p>
</th><th data-block-token="UwUpdXmE2oaLOjxYKpac4U4enUb" colspan="1" rowspan="1"><p data-block-token="S3g4d2pl3o1QfOxDrrCc0bHwn6l">說明</p>
</th></tr></thead><tbody><tr><td data-block-token="Qlg7d56pCo2leCxk3rkcZswhngb" colspan="1" rowspan="1"><p data-block-token="V7Ajd2RyToVjNTxbGEEcVHdYnxb"><code translate="no">language</code></p>
</td><td data-block-token="NTbNd7XeuoBsfsxzQ1Kc0jKonKb" colspan="1" rowspan="1"><p data-block-token="J4nPdCcSToFTGYx6Huhc7kpqnRd">指定詞幹處理的語言。支援的語言包括<code translate="no">"arabic"</code>,<code translate="no">"danish"</code>,<code translate="no">"dutch"</code>,<code translate="no">"english"</code>,<code translate="no">"finnish"</code>,<code translate="no">"french"</code>,<code translate="no">"german"</code>,<code translate="no">"greek"</code>,<code translate="no">"hungarian"</code>,<code translate="no">"italian"</code>,<code translate="no">"norwegian"</code>,<code translate="no">"portuguese"</code>,<code translate="no">"romanian"</code>,<code translate="no">"russian"</code>,<code translate="no">"spanish"</code>,<code translate="no">"swedish"</code>,<code translate="no">"tamil"</code>,<code translate="no">"turkish"</code></p>
</td></tr></tbody></table>
<p><code translate="no">stemmer</code> 過濾器會對 tokenizer 產生的詞彙進行操作，因此必須與 tokenizer 結合使用。</p>
<p>定義<code translate="no">analyzer_params</code> 之後，您可以在定義集合模式時，將它們套用到<code translate="no">VARCHAR</code> 欄位。這可讓 Milvus 使用指定的分析器來處理該欄位中的文字，以進行有效率的標記化和過濾。詳情請參閱<a href="/docs/zh-hant/analyzer-overview.md#Example-use">範例使用</a>。</p>
<h2 id="Example-output​" class="common-anchor-header">輸出範例<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是<code translate="no">stemmer</code> 過濾器處理文字的範例。</p>
<p><strong>原始文字</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;running runs looked ran runner&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>預期輸出</strong>(含<code translate="no">language: &quot;english&quot;</code>)。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;look&quot;</span>, <span class="hljs-string">&quot;ran&quot;</span>, <span class="hljs-string">&quot;runner&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
