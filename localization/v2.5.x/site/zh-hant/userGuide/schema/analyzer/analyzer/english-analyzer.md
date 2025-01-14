---
id: english-analyzer.md
title: 英文分析器
related_key: 'english, analyzer'
summary: Milvus 中的「english」分析器是設計用來處理英文文字，並應用特定語言的規則進行標記化和過濾。
---
<h1 id="English​" class="common-anchor-header">英文<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">english</code> 分析器專為處理英文文字而設計，並應用特定語言的符號化和過濾規則。</p>
<h3 id="Definition​" class="common-anchor-header">定義</h3><p><code translate="no">english</code> 分析器使用下列元件。</p>
<ul>
<li><p><strong>標記化器</strong>：使用 <a href="/docs/zh-hant/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a>將文字分割為離散的單字單位。</p></li>
<li><p>篩選器：包含多種篩選器，可進行全面的文字處理。</p>
<ul>
<li><p><a href="/docs/zh-hant/lowercase-filter.md"><code translate="no">lowercase</code></a>:將所有字元轉換為小寫，以便進行不區分大小寫的搜尋。</p></li>
<li><p><a href="/docs/zh-hant/stemmer-filter.md"><code translate="no">stemmer</code></a>:將字詞縮減為字根形式，以支援更廣泛的匹配 (例如，「running」變為「run」)。</p></li>
<li><p><a href="/docs/zh-hant/stop-filter.md"><code translate="no">stop_words</code></a>:移除常見的英文停止詞，以聚焦於文字中的關鍵詞。</p></li>
</ul></li>
</ul>
<p><code translate="no">english</code> 分析器的功能等同於下列自訂分析器設定。</p>
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
<h3 id="Configuration​" class="common-anchor-header">配置</h3><p>要將<code translate="no">english</code> 分析器套用到欄位，只要在<code translate="no">analyzer_params</code> 中將<code translate="no">type</code> 設定為<code translate="no">english</code> ，並視需要加入可選參數即可。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">english</code> 分析器接受下列可選參數：</p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">參數</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">說明</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">包含停止詞清單的陣列，這些停止詞將從標記化中移除。預設為<code translate="no">_english_</code> ，內建的常見英文停止詞集。</p>
</td></tr></tbody></table>
<p>自訂停止詞配置範例。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>定義<code translate="no">analyzer_params</code> 之後，您可以在定義集合模式時，將它們套用到<code translate="no">VARCHAR</code> 欄位。這可讓 Milvus 使用指定的分析器處理該欄位中的文字，以進行有效的標記化和過濾。詳情請參閱<a href="/docs/zh-hant/analyzer-overview.md#Example-use">使用範例</a>。</p>
<h3 id="Example-output​" class="common-anchor-header">輸出範例</h3><p>以下是<code translate="no">english</code> 分析器如何處理文字。</p>
<p><strong>原始文字</strong>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>預期輸出</strong>。</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
