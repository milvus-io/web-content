---
id: analyzer-overview.md
title: 分析器概述
summary: >-
  在文字處理中，分析器是將原始文字轉換為結構化且可搜尋格式的關鍵組件。每個分析器通常由兩個核心元件組成：分詞器與過濾器。這兩者共同將輸入文字轉換為詞元、對這些詞元進行精煉，並為其進行高效索引與檢索做好準備。
---
<h1 id="Analyzer-Overview" class="common-anchor-header">分析器概述<button data-href="#Analyzer-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在文字處理中<strong>，分析器</strong>是將原始文字轉換為結構化且可搜尋格式的關鍵元件。每個分析器通常由兩個核心元件組成：<strong>分詞器</strong>與<strong>過濾器</strong>。兩者共同將輸入文字轉換為詞元、對這些詞元進行精煉，並為高效的索引建立與檢索做好準備。</p>
<p>在 Milvus 中，分析器是在建立集合時進行配置的，具體是在將 `<code translate="no">VARCHAR</code> ` 欄位新增至集合架構時設定。分析器產生的詞元可用於建立關鍵字比對索引，或轉換為稀疏嵌入向量以進行全文檢索。如需更多資訊，請參閱<a href="/docs/zh-hant/full-text-search.md">《全文檢索》</a>、《<a href="/docs/zh-hant/phrase-match.md">短語比對</a>》或《<a href="/docs/zh-hant/keyword-match.md">文字比對</a>》。</p>
<div class="alert note">
<p>使用分析器的做法可能會影響效能：</p>
<ul>
<li><p><strong>全文搜尋：</strong>進行全文搜尋時<strong>，DataNode</strong>和<strong>QueryNode</strong>通道的資料處理速度會變慢，因為它們必須等待分詞完成。因此，新導入的資料需要更長的時間才能供搜尋使用。</p></li>
<li><p><strong>關鍵字匹配：</strong>對於關鍵字匹配，索引建立速度也會較慢，因為必須待分詞完成後才能建立索引。</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer" class="common-anchor-header">分析器的結構<button data-href="#Anatomy-of-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 中的分析器由一個<strong>分詞器</strong>及<strong>零個或多個</strong>篩選器組成。</p>
<ul>
<li><p><strong>分詞器</strong>：分詞器將輸入文字分割成稱為「詞元」的離散單位。這些詞元可能是單字或短語，具體取決於分詞器的類型。</p></li>
<li><p><strong>篩選器</strong>：可對分詞結果套用篩選器以進一步精煉，例如將其轉為小寫或移除常見詞彙。</p></li>
</ul>
<div class="alert note">
<p>分詞器目前僅支援 UTF-8 格式。未來版本將新增對其他格式的支援。</p>
</div>
<p>以下工作流程圖展示了解析器如何處理文字。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-process-workflow.png" alt="Analyzer Process Workflow" class="doc-image" id="analyzer-process-workflow" /> 
   <span>分析器處理工作流程</span>
  
 </span></p>
<h2 id="Analyzer-types" class="common-anchor-header">分析器類型<button data-href="#Analyzer-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供兩種類型的分析器，以滿足不同的文字處理需求：</p>
<ul>
<li><p><strong>內建分析器</strong>：這些是預先定義的配置，只需最少的設定即可處理常見的文字處理任務。由於無需複雜的設定，內建分析器非常適合用於一般用途的搜尋。</p></li>
<li><p><strong>自訂分析器</strong>：針對更進階的需求，自訂分析器允許您透過指定分詞器以及零個或多個篩選器，來定義自己的設定。此程度的自訂功能對於需要精確控制文字處理的特殊應用情境特別有用。</p></li>
</ul>
<div class="alert note">
<ul>
<li>若在建立資料集時省略分析器設定，Milvus 預設會使用「<code translate="no">standard</code> 」分析器進行所有文字處理。詳細資訊請參閱《<a href="/docs/zh-hant/standard-analyzer.md">標準分析器</a>》。</li>
<li>為獲得最佳的搜尋與查詢效能，請選擇與您的文字資料語言相符的分析器。例如，雖然「<code translate="no">standard</code> 」分析器用途廣泛，但對於具有獨特語法結構的語言（如中文、阿拉伯文、泰文、日文或韓文），它可能並非最佳選擇。在這種情況下，建議使用特定語言的分析器，例如 <a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a>、 <a href="/docs/zh-hant/arabic-analyzer.md"><code translate="no">arabic</code></a>、 <a href="/docs/zh-hant/thai-analyzer.md"><code translate="no">thai</code></a>，或是配備專用分詞器的自訂分析器（例如 <a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a>、 <a href="/docs/zh-hant/icu-tokenizer.md"><code translate="no">icu</code></a>）及篩選器，以確保精確的詞元化並獲得更佳的搜尋結果。</li>
</ul>
</div>
<h3 id="Built-in-analyzer" class="common-anchor-header">內建分析器<button data-href="#Built-in-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 中的內建分析器已預先配置了特定的分詞器和過濾器，讓您無需自行定義這些元件即可立即使用。每個內建分析器皆作為一個範本，包含預設的分詞器和過濾器，並提供可自訂的選項參數。</p>
<p>例如，若要使用內建分析器「<code translate="no">standard</code> 」，只需將其名稱<code translate="no">standard</code> 指定為<code translate="no">type</code> ，並可選擇性地加入此分析器類型專屬的額外設定，例如<code translate="no">stop_words</code> ：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要檢查分析器的執行結果，請使用<code translate="no">run_analyzer</code> 方法：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment"># Run analyzer</span>
result = client.run_analyzer(
    text,
    analyzer_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascrip# Sample text to analyze</span>
<span class="hljs-keyword">const</span> text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment">// Run analyzer</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    text,
    analyzer_params
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>輸出結果將為：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;efficient&#x27;, &#x27;system&#x27;, &#x27;relies&#x27;, &#x27;on&#x27;, &#x27;robust&#x27;, &#x27;analyzer&#x27;, &#x27;to&#x27;, &#x27;correctly&#x27;, &#x27;process&#x27;, &#x27;text&#x27;, &#x27;various&#x27;, &#x27;applications&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>這顯示該分析器已正確地將輸入文字進行分詞，篩除了停用詞<code translate="no">&quot;a&quot;</code> 、<code translate="no">&quot;an&quot;</code> 以及<code translate="no">&quot;for&quot;</code> ，同時回傳剩餘的有意義詞元。</p>
<p>上述<code translate="no">standard</code> 內建分析器的設定，相當於使用以下參數<a href="/docs/zh-hant/analyzer-overview.md#Custom-analyzer">設定自訂分析器，</a>其中<code translate="no">tokenizer</code> 和<code translate="no">filter</code> 選項是明確定義以實現類似功能：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
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
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
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
<p>Milvus 提供以下內建分析器，每個分析器皆針對特定的文字處理需求而設計：</p>
<ul>
<li><p><code translate="no">standard</code>: 適用於通用文字處理，會套用標準的詞元分割與小寫過濾。</p></li>
<li><p><code translate="no">english</code>: 針對英文文本進行優化，支援英文停用詞。</p></li>
<li><p><code translate="no">chinese</code>: 專為處理中文文本而設計，包含針對中文語言結構進行調整的詞元化處理。</p></li>
<li><p><code translate="no">arabic</code>: 專為阿拉伯語文本設計，具備阿拉伯語正規化、小數位數正規化、阿拉伯語詞幹提取及阿拉伯語停用詞移除功能。</p></li>
<li><p><code translate="no">thai</code>: 專為泰文處理設計，具備泰文詞分割、小數位數正規化及泰文停用詞移除功能。</p></li>
</ul>
<h3 id="Custom-analyzer" class="common-anchor-header">自訂分析器<button data-href="#Custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>若需進行更進階的文本處理，Milvus 中的自訂分析器可讓您透過指定<strong>分詞器</strong>與<strong>篩選器，</strong>建立量身打造的文本處理管線。此設定非常適合需要精確控制的特殊應用情境。</p>
<h4 id="Tokenizer" class="common-anchor-header">分詞器</h4><p><strong>分詞器是</strong> <strong>自訂分析器的必備組件</strong>，它會將輸入文字拆解為獨立單位（<strong>即詞元</strong>），從而啟動分析器處理流程。分詞過程遵循特定規則，例如依據空格或標點符號進行分割，具體取決於分詞器的類型。此流程可讓每個單字或短語獲得更精確且獨立的處理。</p>
<p>例如，分詞器會將文字「<code translate="no">&quot;Vector Database Built for Scale&quot;</code> 」轉換為獨立的詞元：</p>
<pre><code translate="no" class="language-plaintext">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p><strong>指定分詞器的範例</strong>：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter" class="common-anchor-header">篩選器</h4><p><strong>篩選器</strong>是<strong>可選的</strong>組件，用於處理分詞器產生的詞元，並根據需要對其進行轉換或精煉。例如，在對已分詞的詞元<code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> 套用<code translate="no">lowercase</code> 篩選器後，結果可能如下：</p>
<pre><code translate="no" class="language-sql">[&quot;vector&quot;, &quot;database&quot;, &quot;built&quot;, &quot;for&quot;, &quot;scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>自訂分析器中的篩選器可依配置需求選用<strong>內建</strong>或<strong>自訂</strong>類型。</p>
<ul>
<li><p><strong>內建篩選器</strong>：由 Milvus 預先設定，僅需最少的設定即可使用。您只需指定其名稱，即可直接使用這些篩選器。以下篩選器為內建功能，可直接使用：</p>
<ul>
<li><p><code translate="no">lowercase</code>: 將文字轉換為小寫，確保不區分大小寫的比對。詳細資訊請參閱「<a href="/docs/zh-hant/lowercase-filter.md">小寫轉換</a>」。</p></li>
<li><p><code translate="no">asciifolding</code>: 將非 ASCII 字元轉換為 ASCII 對應字元，簡化多語言文字的處理。詳情請參閱「<a href="/docs/zh-hant/ascii-folding-filter.md">ASCII 摺疊</a>」。</p></li>
<li><p><code translate="no">alphanumonly</code>：移除非字母數字字元，僅保留字母數字字元。詳情請參閱「<a href="/docs/zh-hant/alphanumonly-filter.md">Alphanumonly</a>」。</p></li>
<li><p><code translate="no">cnalphanumonly</code>: 移除包含中文字元、英文字母或數字以外任何字元的詞元。詳情請參閱<a href="/docs/zh-hant/cnalphanumonly-filter.md">Cnalphanumonly</a>。</p></li>
<li><p><code translate="no">cncharonly</code>: 移除包含任何非中文字元的詞元。詳情請參閱<a href="/docs/zh-hant/cncharonly-filter.md">Cncharonly</a>。</p></li>
<li><p><code translate="no">pinyin</code>: 為中文詞元新增拼音詞元形式，使中文文字能進行基於拼音的比對。詳情請參閱「<a href="/docs/zh-hant/pinyin-filter.md">拼音</a>」。</p></li>
</ul>
<p><strong>使用內建篩選器的範例：</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [&quot;lowercase&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>自訂篩選器</strong>：自訂篩選器可進行特殊設定。您可以透過選擇有效的篩選器類型（<code translate="no">filter.type</code> ）並為每種篩選器類型新增特定設定，來定義自訂篩選器。支援自訂的篩選器類型範例：</p>
<ul>
<li><p><code translate="no">stop</code>：透過設定停用詞清單（例如<code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code> ）來移除指定的常見詞彙。詳情請參閱「<a href="/docs/zh-hant/stop-filter.md">停用詞」</a>。</p></li>
<li><p><code translate="no">length</code>：根據長度標準排除詞元，例如設定詞元最大長度。詳情請參閱<a href="/docs/zh-hant/length-filter.md">「Length」</a>。</p></li>
<li><p><code translate="no">stemmer</code>: 將單詞還原為詞幹形式，以實現更靈活的匹配。詳情請參閱「<a href="/docs/zh-hant/stemmer-filter.md">詞幹化 (Stemmer)</a>」。</p></li>
</ul>
<p><strong>自訂篩選器的設定範例：</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
            put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment">// Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment">// Customizes stop words for this filter type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
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
<h2 id="Example-use" class="common-anchor-header">使用範例<button data-href="#Example-use" class="anchor-icon" translate="no">
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
    </button></h2><p>在此範例中，您將建立一個包含以下內容的集合架構：</p>
<ul>
<li><p>一個用於嵌入向量的向量欄位。</p></li>
<li><p>兩個用於文字處理的<code translate="no">VARCHAR</code> 欄位：</p>
<ul>
<li><p>其中一個欄位使用內建分析器。</p></li>
<li><p>另一個則使用自訂分析器。</p></li>
</ul></li>
</ul>
<p>在將這些設定整合至您的集合之前，您將使用 `<code translate="no">run_analyzer</code> ` 方法驗證每個分析器。</p>
<h3 id="Step-1-Initialize-MilvusClient-and-create-schema" class="common-anchor-header">步驟 1：初始化 MilvusClient 並建立資料結構<button data-href="#Step-1-Initialize-MilvusClient-and-create-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>首先設定 Milvus 客戶端並建立新的模式。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a new schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)  

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">true</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-and-verify-analyzer-configurations" class="common-anchor-header">步驟 2：定義並驗證分析器設定<button data-href="#Step-2-Define-and-verify-analyzer-configurations" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>設定並驗證內建分析器</strong>（<code translate="no">english</code> ）<strong>：</strong></p>
<ul>
<li><p><strong>設定：</strong>定義內建英文分析器的參數。</p></li>
<li><p><strong>驗證：</strong>使用<code translate="no">run_analyzer</code> 確認該設定能否產生預期的分詞結果。</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Built-in analyzer configuration for English text processing</span>
analyzer_params_built_in = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Verify built-in analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_built_in)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Built-in analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Built-in analyzer output: [&#x27;milvus&#x27;, &#x27;simplifi&#x27;, &#x27;text&#x27;, &#x27;analysi&#x27;, &#x27;search&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus simplifies text ana

lysis for search.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>設定並驗證自訂分析器：</strong></p>
<ul>
<li><p><strong>設定：</strong>定義一個自訂分析器，該分析器使用標準分詞器，並搭配內建的小寫轉換濾波器，以及針對詞元長度和停用詞的自訂濾波器。</p></li>
<li><p><strong>驗證：</strong>使用<code translate="no">run_analyzer</code> 確保自訂設定能如預期般處理文字。</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom analyzer configuration with a standard tokenizer and custom filters</span>
analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter: convert tokens to lowercase</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,  <span class="hljs-comment"># Custom filter: restrict token length</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,  <span class="hljs-comment"># Custom filter: remove specified stop words</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Verify custom analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_custom)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Custom analyzer output: [&#x27;milvus&#x27;, &#x27;provides&#x27;, &#x27;flexible&#x27;, &#x27;customizable&#x27;, &#x27;analyzers&#x27;, &#x27;robust&#x27;, &#x27;text&#x27;, &#x27;processing&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Configure a custom analyzer</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
  <span class="hljs-attr">filter</span>: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      <span class="hljs-attr">max</span>: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      <span class="hljs-attr">stop_words</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};
<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, 
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">40</span>,
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
    
bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-3-Add-fields-to-the-schema" class="common-anchor-header">步驟 3：將欄位新增至模式<button data-href="#Step-3-Add-fields-to-the-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>既然您已驗證分析器的設定，請將其新增至模式欄位中：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add VARCHAR field &#x27;title_en&#x27; using the built-in analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_built_in,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add VARCHAR field &#x27;title&#x27; using the custom analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_custom,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a vector field for embeddings</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .analyzerParams(analyzerParams)
        .enableMatch(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .build());

<span class="hljs-comment">// Add vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<span class="hljs-comment">// Add primary field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
      <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_en&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsBuiltIn,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsCustom,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
    },
  ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithAnalyzerParams(analyzerParams).
    WithEnableMatch(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Prepare-index-parameters-and-create-the-collection" class="common-anchor-header">步驟 4：準備索引參數並建立集合<button data-href="#Step-4-Prepare-index-parameters-and-create-the-collection" class="anchor-icon" translate="no">
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
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up index parameters for the vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)

<span class="hljs-comment"># Create the collection with the defined schema and index parameters</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Set up index params for vector field</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.COSINE))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, idx)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>配置完分析器後，您可以整合 Milvus 提供的文字檢索功能。詳細資訊請參閱：</p>
<ul>
<li><p><a href="/docs/zh-hant/full-text-search.md">全文檢索</a></p></li>
<li><p><a href="/docs/zh-hant/keyword-match.md">文字比對</a></p></li>
<li><p><a href="/docs/zh-hant/phrase-match.md">短語匹配</a></p></li>
</ul>
