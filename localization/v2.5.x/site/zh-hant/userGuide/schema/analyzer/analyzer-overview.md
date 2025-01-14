---
id: analyzer-overview.md
title: 分析器概述
summary: >-
  在文字處理中，分析器是將原始文字轉換成結構化、可搜尋格式的重要元件。每個分析器通常由兩個核心元件組成：標記器和過濾器。它們共同將輸入文字轉換為標記、精煉這些標記，並為有效的索引和檢索做好準備。
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">分析器概述<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>在文字處理中，<strong>分析器</strong>是將原始文字轉換成結構化、可搜尋格式的重要元件。每個分析器通常包含兩個核心元件：<strong>標記器</strong>和<strong>過濾</strong> <strong>器</strong>。它們共同將輸入文字轉換為標記，精煉這些標記，並為有效的索引和檢索做好準備。</p>
<p>Milvus 的分析器由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 提供，當您將<code translate="no">VARCHAR</code> 欄位新增至集合模式時，分析器會在集合建立時設定。分析器產生的標記可用於建立文字比對索引，或轉換成稀疏內嵌以進行全文檢索。如需詳細資訊，請參閱<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>或<a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>。</p>
<div class="alert note">
<p>使用分析器可能會影響效能。</p>
<ul>
<li><p><strong>全文本搜尋：</strong>對於全文本搜尋，DataNode 和<strong>QueryNode</strong>通道消耗資料的速度較慢，因為它們必須等待標記化完成。因此，新擷取的資料需要較長時間才能可供搜尋。</p></li>
<li><p><strong>文字匹配：</strong>對於文字匹配，索引建立的速度也較慢，因為標記化需要在建立索引之前完成。</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">分析器剖析<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的分析器包含一個<strong>標記器</strong>和<strong>零個或多個</strong>過濾器。</p>
<ul>
<li><p><strong>標記器</strong>：標記器將輸入文字分割成稱為標記的獨立單位。這些標記可以是單字或短語，取決於標記器類型。</p></li>
<li><p><strong>篩選器</strong>：篩選器可套用至標記，以進一步精細標記，例如將標記改成小寫或移除常用字。</p></li>
</ul>
<p>以下的工作流程顯示分析器如何處理文字。</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">分析器類型<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供兩種類型的分析器，以滿足不同的文字處理需求。</p>
<ul>
<li><p><strong>內建分析器</strong>：這些是預先定義的配置，只需最少的設定即可涵蓋常見的文字處理工作。內建分析器不需要複雜的設定，是一般用途搜尋的理想選擇。</p></li>
<li><p><strong>自訂分析器</strong>：對於更進階的需求，自訂分析器可讓您透過指定標記器和零個或多個過濾器來定義您自己的組態。這種層級的自訂對於需要精確控制文字處理的專門用例特別有用。</p></li>
</ul>
<div class="alert note">
<p>如果您在建立集合時省略了分析器設定，Milvus 預設會使用<code translate="no">standard</code> 分析器來處理所有文字。詳情請參閱<a href="/docs/zh-hant/standard-analyzer.md">標準</a>。</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">內建分析器</h3><p>Milvus 的內建分析器預先設定了特定的 tokenizer 和過濾器，讓您可以立即使用，而不需要自己定義這些元件。每個內建分析器都是一個範本，包含預設的標記器和篩選器，以及可選的自訂參數。</p>
<p>例如，若要使用<code translate="no">standard</code> 內建分析器，只需指定其名稱<code translate="no">standard</code> 為<code translate="no">type</code> ，並可選擇包含此分析器類型特有的額外配置，例如<code translate="no">stop_words</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>上述<code translate="no">standard</code> 內建分析器的配置等同於使用下列參數設定自訂分析器，其中<code translate="no">tokenizer</code> 與<code translate="no">filter</code> 選項是明確定義，以達到相同的功能：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       &quot;lowercase&quot;,
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
   ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 提供下列內建分析器，每個分析器都可以直接使用，只要指定其名稱為<code translate="no">type</code> 參數即可。</p>
<ul>
<li><p><code translate="no">standard</code>:適用於一般用途的文字處理，應用標準的標記化和小寫過濾。</p></li>
<li><p><code translate="no">english</code>:針對英文文字最佳化，支援英文停止詞。</p></li>
<li><p><code translate="no">chinese</code>:專門處理中文文字，包括針對中文語言結構的標記化。</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">自訂分析器</h3><p>對於更進階的文字處理，Milvus 的自訂分析器可讓您透過指定<strong>標記器</strong>和過濾器，建立量身打造的文字處理管道。此設定非常適合需要精確控制的特殊使用個案。</p>
<h4 id="Tokenizer​" class="common-anchor-header">標記器</h4><p><strong>標記器</strong>是自訂分析器的<strong>必備</strong>元件，可將輸入文字分解為離散的單位或<strong>標記</strong>，從而啟動分析器管道。記號化遵循特定規則，例如依據記號化類型以空白或標點分割。此過程能更精確、獨立地處理每個字或詞組。</p>
<p>例如，令牌化器會將文字<code translate="no">&quot;Vector Database Built for Scale&quot;</code> 轉換成獨立的令牌。</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>指定 tokenizer 的範例</strong>。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">過濾器</h4><p><strong>過濾器</strong>是<strong>可選的</strong>元件，用來處理 tokenizer 產生的 token，並視需要轉換或精煉它們。例如，將<code translate="no">lowercase</code> 過濾器套用到標記化的詞彙<code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> 之後，結果可能是。</p>
<pre><code translate="no">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>自訂分析器中的篩選器可以是<strong>內建</strong>或<strong>自訂的</strong>，視配置需求而定。</p>
<ul>
<li><p><strong>內建過濾器</strong>：由 Milvus 預先設定，只需最少的設定。您只要指定這些篩選器的名稱，就能立即使用這些篩選器。以下篩選器為內建篩選器，可直接使用。</p>
<ul>
<li><p><code translate="no">lowercase</code>:將文字轉換為小寫，確保大小寫不敏感的匹配。如需詳細資訊，請參閱<a href="/docs/zh-hant/lowercase-filter.md">小寫</a>。</p></li>
<li><p><code translate="no">asciifolding</code>:將非 ASCII 字元轉換為 ASCII 對應字元，簡化多語言文字處理。詳情請參閱<a href="/docs/zh-hant/ascii-folding-filter.md">ASCII 折疊</a>。</p></li>
<li><p><code translate="no">alphanumonly</code>:只保留字母數字字符，移除其他字符。詳情請參閱<a href="/docs/zh-hant/alphanumonly-filter.md">Alphanumonly</a>。</p></li>
<li><p><code translate="no">cnalphanumonly</code>:移除包含任何非中文字元、英文字母或數位字元的標記。詳情請參閱<a href="/docs/zh-hant/cnalphanumonly-filter.md">Cnalphanumonly</a>。</p></li>
<li><p><code translate="no">cncharonly</code>:移除包含任何非中文字元的標記。詳情請參閱<a href="/docs/zh-hant/cncharonly-filter.md">Cncharonly</a>。</p></li>
</ul>
<p><strong>使用內建過濾器的範例</strong>：</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
   &quot;type&quot;: &quot;standard&quot;,
   &quot;filter&quot;:  [&quot;lowercase&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>自訂篩選器</strong>：自訂篩選器允許專門的配置。您可以透過選擇有效的篩選器類型 (<code translate="no">filter.type</code>) 並為每個篩選器類型加入特定設定，來定義自訂篩選器。支援自訂的篩選器類型範例。</p>
<ul>
<li><p><code translate="no">stop</code>:透過設定停止詞清單 (例如<code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>)，移除指定的常用字。詳情請參閱<a href="/docs/zh-hant/stop-filter.md">停止</a>。</p></li>
<li><p><code translate="no">length</code>:根據長度標準排除標記，例如設定最大標記長度。詳情請參閱<a href="/docs/zh-hant/length-filter.md">Length</a>。</p></li>
<li><p><code translate="no">stemmer</code>:將字詞縮減為字根形式，以便進行更靈活的匹配。詳情請參閱<a href="/docs/zh-hant/stemmer-filter.md">Stemmer</a>。</p></li>
</ul>
<p><strong>設定自訂篩選器的範例</strong>：</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
    <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
        <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
        <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
    }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, // Mandatory: Specifies tokenizer
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, // Specifies <span class="hljs-string">&#x27;stop&#x27;</span> <span class="hljs-keyword">as</span> the <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], // Customizes stop words <span class="hljs-keyword">for</span> this <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
    &quot;type&quot;: &quot;standard&quot;,
    &quot;filter&quot;:  [
    {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">使用範例<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>在這個範例中，我們定義了一個集合模式，其中有一個向量欄位用於嵌入，兩個<code translate="no">VARCHAR</code> 欄位用於文字處理功能。每個<code translate="no">VARCHAR</code> 欄位都配置了自己的分析器設定，以處理不同的處理需求。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">ConnectConfig</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">MilvusClientV2</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">CreateCollectionReq</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-title class_">ConnectConfig</span> config = <span class="hljs-title class_">ConnectConfig</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_">build</span>();
<span class="hljs-title class_">MilvusClientV2</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
<span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span> schema = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">enableDynamicField</span>(<span class="hljs-literal">false</span>)
        .<span class="hljs-title function_">build</span>();

<span class="hljs-comment">// Add fields to schema</span>
<span class="hljs-comment">// Use a built-in analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
<span class="hljs-comment">// Add VARCHAR field `title_en`</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title_en&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParamsBuiltin)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Configure a custom analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Add vector field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_">build</span>());
<span class="hljs-comment">// Add primary field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;id&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>)
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">COSINE</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-title class_">CreateCollectionReq</span> requestCreate = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-title function_">collectionSchema</span>(schema)
        .<span class="hljs-title function_">indexParams</span>(indexes)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createCollection</span>(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { MilvusClient, DataType } from <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-built_in">new</span> MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  tokenizer: <span class="hljs-string">&quot;standard&quot;</span>,
  filter: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      max: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      stop_words: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};

<span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  auto_id: <span class="hljs-literal">true</span>,
  fields: [
    {
      name: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-keyword">type</span>: DataType.INT64,
      is_primary: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title_en&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsBuiltIn,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsCustom,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;embedding&quot;</span>,
      data_type: DataType.FLOAT_VECTOR,
      dim: <span class="hljs-number">4</span>,
    },
  ],
};

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    name: <span class="hljs-string">&quot;embedding&quot;</span>,
    metric_type: <span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
await client.createCollection({
  collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
  schema: schema,
  index_params: indexParams,
});

console.log(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;title_en&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;title&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {
                        &quot;tokenizer&quot;: &quot;standard&quot;,
                        &quot;filter&quot;:[
                            &quot;lowercase&quot;,
                            {
                                &quot;type&quot;:&quot;length&quot;,
                                &quot;max&quot;:40
                            },
                            {
                                &quot;type&quot;:&quot;stop&quot;,
                                &quot;stop_words&quot;:[&quot;of&quot;,&quot;to&quot;]
                            }
                        ]
                    }
                }
            },
            {
                &quot;fieldName&quot;: &quot;embedding&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;:3
                }
            }
        ]
    }&#x27;</span>
    
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;YOUR_COLLECTION_NAME\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
