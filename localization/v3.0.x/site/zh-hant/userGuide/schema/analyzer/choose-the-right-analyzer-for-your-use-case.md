---
id: choose-the-right-analyzer-for-your-use-case.md
title: 為您的使用個案選擇正確的分析儀
summary: 注意事項
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">為您的使用個案選擇正確的分析儀<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>本指南著重於選擇分析儀的實際決策。有關分析儀組件的技術細節以及如何新增分析儀參數，請參閱分析<a href="/docs/zh-hant/analyzer-overview.md">儀總覽</a>。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">在 2 分鐘內瞭解分析儀<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，分析器會處理儲存在此欄位中的文字，使其可搜尋<a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>(BM25)、<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>或<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>等功能。把它想像成一個文字處理器，將您的原始內容轉換成可搜尋的符號。</p>
<p>分析器以簡單的兩階段管道運作：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>分析器工作流程</span> </span></p>
<ol>
<li><p><strong>標記化 (必要)：</strong>這個初始階段會套用<strong>標記化程式</strong>，將連續的文字串分割成離散、有意義的單位，稱為標記。標記化方法會因語言和內容類型的不同而有很大的差異。</p></li>
<li><p><strong>標記篩選 (選用)：</strong>在標記化之後，會套用<strong>篩選器</strong>來修改、移除或精細化標記。這些作業可包括將所有標記轉換為小寫，移除常見的無意義的字詞 (例如停止字)，或將字詞還原為其字根形式 (字幹化)。</p></li>
</ol>
<p><strong>範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">為何分析器的選擇很重要<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇錯誤的分析器可能會使相關的文件無法搜尋或傳回不相關的結果。</p>
<p>下表總結了分析器選擇不當所導致的常見問題，並提供診斷搜尋問題的可行解決方案。</p>
<table>
   <tr>
     <th><p>問題</p></th>
     <th><p>症狀</p></th>
     <th><p>範例 (輸入與輸出)</p></th>
     <th><p>原因 (不良分析器)</p></th>
     <th><p>解決方案 (好的分析器)</p></th>
   </tr>
   <tr>
     <td><p>過度漢字化</p></td>
     <td><p>技術術語、識別符或 URL 的文字查詢無法找到相關文件。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a>分析器</p></td>
     <td><p>使用 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>標記器；結合 <a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>過濾器。</p></td>
   </tr>
   <tr>
     <td><p>標記化不足</p></td>
     <td><p>搜尋多字詞組的元件時，無法返回包含完整詞組的文件。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>帶有 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>標記器</p></td>
     <td><p>使用 <a href="/docs/zh-hant/standard-tokenizer.md"><code translate="no">standard</code></a>tokenizer 來分割標點符號和空格；使用自訂<a href="/docs/zh-hant/regex-filter.md">regex</a>過濾器。</p></td>
   </tr>
   <tr>
     <td><p>語言不匹配</p></td>
     <td><p>特定語言的搜尋結果不合理或不存在。</p></td>
     <td><p>中文文本： <code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> (一個符號)</p></td>
     <td><p><a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a>分析器</p></td>
     <td><p>使用特定語言的分析器，例如 <a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">第一個問題您需要選擇分析器嗎？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>對於許多用例，您不需要做任何特別的事情。讓我們來判斷您是否是其中之一。</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">預設行為：<code translate="no">standard</code> 分析器<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您在使用全文檢索等文字檢索功能時沒有指定分析器，Milvus 會自動使用 <a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a>分析器。</p>
<p><code translate="no">standard</code> 分析器：</p>
<ul>
<li><p>在空格和標點符號上分割文字</p></li>
<li><p>將所有字元轉換為小寫</p></li>
<li><p>移除一套內建的常見英文停止詞和大部分標點符號</p></li>
</ul>
<p><strong>轉換範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">判定標準：快速檢查<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>使用此表快速判斷預設的<code translate="no">standard</code> 分析器是否符合您的需求。如果不符合，您就需要選擇不同的路徑。</p>
<table>
   <tr>
     <th><p>您的內容</p></th>
     <th><p>標準分析器可以嗎？</p></th>
     <th><p>為什麼</p></th>
     <th><p>您的需求</p></th>
   </tr>
   <tr>
     <td><p>英文部落格文章</p></td>
     <td><p>✅ 是</p></td>
     <td><p>預設行為已足夠。</p></td>
     <td><p>使用預設 (不需要設定)。</p></td>
   </tr>
   <tr>
     <td><p>中文文件</p></td>
     <td><p>❌ 否</p></td>
     <td><p>中文單字沒有空格，會視為一個符記。</p></td>
     <td><p>使用內建的 <a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a>分析器。</p></td>
   </tr>
   <tr>
     <td><p>技術文件</p></td>
     <td><p>❌否</p></td>
     <td><p>標點符號會從詞彙中刪除，例如<code translate="no">C++</code> 。</p></td>
     <td><p>使用 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>tokenizer 和 <a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>過濾器。</p></td>
   </tr>
   <tr>
     <td><p>空格分隔的語言，如法語/西班牙語文字</p></td>
     <td><p>⚠️ 可能</p></td>
     <td><p>重音字元 (<code translate="no">café</code> vs.<code translate="no">cafe</code>) 可能不匹配。</p></td>
     <td><p>建議使用具有 <a href="/docs/zh-hant/ascii-folding-filter.md"><code translate="no">asciifolding</code></a>建議使用自訂的分析器，以獲得更好的結果。</p></td>
   </tr>
   <tr>
     <td><p>多語言或未知語言</p></td>
     <td><p>❌否</p></td>
     <td><p><code translate="no">standard</code> 分析器缺乏處理不同字元集和標記化規則所需的特定語言邏輯。</p></td>
     <td><p>使用自訂分析器與 <a href="/docs/zh-hant/icu-tokenizer.md"><code translate="no">icu</code></a>tokenizer 進行單一碼感知 tokenization。 </p><p>或者，考慮設定<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>或<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>，以更精確地處理多語言內容。</p></td>
   </tr>
</table>
<p>如果預設的<code translate="no">standard</code> 分析器無法滿足您的需求，您需要實作一個不同的分析器。您有兩種途徑：</p>
<ul>
<li><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">使用內建分析器</a>或</p></li>
<li><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">建立自訂分析器</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">路徑 A：使用內建分析器<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>內建分析器是針對一般語言預先設定的解決方案。當預設標準分析器不適合時，它們是最簡單的入門方法。</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">可用的內建分析器<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>分析器</p></th>
     <th><p>語言支援</p></th>
     <th><p>元件</p></th>
     <th><p>備註</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>多數以空格分隔的語言 (英文、法文、德文、西班牙文等)</p></td>
     <td><ul><li><p>Tokenizer：<code translate="no">standard</code></p></li><li><p>過濾器：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>用於初始文字處理的通用分析器。對於單一語言的情況，特定語言的分析器 (如<code translate="no">english</code>) 可提供更好的效能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>專用於英語，可應用詞幹處理和停止詞移除，以達到更好的英語語意匹配。</p></td>
     <td><ul><li><p>標記器：<code translate="no">standard</code></p></li><li><p>過濾器：<code translate="no">lowercase</code>,<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>建議使用於純英文內容，超過<code translate="no">standard</code> 。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中文</p></td>
     <td><ul><li><p>Tokenizer：<code translate="no">jieba</code></p></li><li><p>篩選器：<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>目前預設使用簡體中文字典。</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">實作範例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用內建分析器，只需在定義欄位模式時，在<code translate="no">analyzer_params</code> 中指定其類型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>詳細用法請參閱<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>、<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>或<a href="/docs/zh-hant/phrase-match.md">片語匹配</a>。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">路徑 B：建立自訂分析器<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">當內建的選項</a>無法滿足您的需求時，您可以結合 tokenizer 與一組過濾器來建立自訂分析器。這可讓您完全控制文字處理管道。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">步驟 1：根據語言選擇標記器<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>根據內容的主要語言選擇您的標記器：</p>
<h4 id="Western-languages" class="common-anchor-header">西方語言</h4><p>對於空格分隔的語言，您有這些選項：</p>
<table>
   <tr>
     <th><p>標記器</p></th>
     <th><p>如何運作</p></th>
     <th><p>最適用於</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>根據空格和標點符號分割文字</p></td>
     <td><p>一般文字、混合標點符號</p></td>
     <td><ul><li><p>輸入：<code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>輸出：<code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>僅根據空白字元分割</p></td>
     <td><p>預先處理的內容、使用者格式化的文字</p></td>
     <td><ul><li><p>輸入：<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>輸出：<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">東亞語言</h4><p>以字典為基礎的語言需要專門的 tokenizer 來進行適當的單字分割：</p>
<h5 id="Chinese" class="common-anchor-header">中文</h5><table>
   <tr>
     <th><p>標記器</p></th>
     <th><p>如何運作</p></th>
     <th><p>最適用於</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>以中文字典為基礎，搭配智慧型演算法進行分割</p></td>
     <td><p><strong>建議用於中文內容</strong>- 結合字典與智慧型演算法，專為中文設計</p></td>
     <td><ul><li><p>輸入：<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>輸出：<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>以中文字典為基礎的純字典形態分析<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>與<code translate="no">jieba</code> 相比，以更通用的方式處理中文文本</p></td>
     <td><ul><li><p>輸入：<code translate="no">"机器学习算法"</code></p></li><li><p>輸出：<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日語和韓語</h5><table>
   <tr>
     <th><p>語言</p></th>
     <th><p>代碼器</p></th>
     <th><p>字典選項</p></th>
     <th><p>最適合</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p>日語</p></td>
     <td><p><a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>(通用)、ipadic-<a href="https://github.com/neologd/mecab-ipadic-neologd">neologd</a>(現代術語)、<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>(學術)</p></td>
     <td><p>搭配專有名詞處理的語法分析</p></td>
     <td><ul><li><p>輸入：<code translate="no">"東京都渋谷区"</code></p></li><li><p>輸出：<code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>韓語</p></td>
     <td><p><a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>韓語形態分析</p></td>
     <td><ul><li><p>輸入：<code translate="no">"안녕하세요"</code></p></li><li><p>輸出：<code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多語言或未知語言</h4><p>適用於文件中語言不可預測或混合的內容：</p>
<table>
   <tr>
     <th><p>標記器</p></th>
     <th><p>如何運作</p></th>
     <th><p>最適用於</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>統一碼感知標記化 (統一碼國際元件)</p></td>
     <td><p>混合腳本、未知語言，或簡單的標記化已經足夠時</p></td>
     <td><ul><li><p>輸入：<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>輸出：<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>何時使用 icu</strong>：</p>
<ul>
<li><p>混合語言，語言識別不切實際。</p></li>
<li><p>您不需要<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>或<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>的開銷。</p></li>
<li><p>內容以一種主要語言為主，偶爾會出現一些對整體意義的貢獻不大的外文字詞 (例如，英文文本中會出現零星的日文或法文品牌名稱或技術術語)。</p></li>
</ul>
<p><strong>替代方法</strong>：若要更精確地處理多語言內容，可考慮使用多語言分析器或語言識別器。如需詳細資訊，請參閱<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>或<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">步驟 2：新增精確度過濾器<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">選擇您的標記器</a>後，請根據您的特定搜尋需求和內容特徵套用篩選器。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">常用篩選器</h4><p>這些篩選器對於大多數空格分隔的語言配置 (英文、法文、德文、西班牙文等) 來說是不可或缺的，並可大幅改善搜尋品質：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>如何運作</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>將所有字元轉換為小寫</p></td>
     <td><p>通用 - 適用於所有有大小寫區分的語言</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>輸出：<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>將單字還原為字根形式</p></td>
     <td><p>有詞彙轉折的語言 (英文、法文、德文等)</p></td>
     <td><p>適用於英文：</p><ul><li><p>輸入：<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>輸出：<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>移除常見的無意義的單字</p></td>
     <td><p>大多數語言 - 對於空格分隔的語言尤其有效</p></td>
     <td><ul><li><p>輸入：<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>輸出：<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>對於東亞語言 (中文、日文、韓文等)，請改用<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">特定語言的篩選器</a>。這些語言通常使用不同的方法來處理文字，可能無法從字幹處理中獲得顯著的效益。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">文字規範化篩選器</h4><p>這些篩選器會將文字變化標準化，以改善匹配的一致性：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>如何運作</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>將重音字元轉換為 ASCII 對應字元</p></td>
     <td><p>國際內容、使用者產生的內容</p></td>
     <td><ul><li><p>輸入：<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>輸出：<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">符號篩選</h4><p>根據字元內容或長度控制哪些字元會被保留：</p>
<table>
   <tr>
     <th><p>過濾</p></th>
     <th><p>如何運作</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>移除獨立的標點符記</p></td>
     <td><p>清除<code translate="no">jieba</code>,<code translate="no">lindera</code>,<code translate="no">icu</code> tokenizers 的輸出，這些 tokenizers 會將標點符號作為單一符號返回</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>輸出：<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>只保留字母和數字</p></td>
     <td><p>技術內容，乾淨的文字處理</p></td>
     <td><ul><li><p>輸入：<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>輸出：<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>移除指定長度範圍以外的標記</p></td>
     <td><p>過濾雜訊 (過長的文字)</p></td>
     <td><ul><li><p>輸入：<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>輸出： <code translate="no">[['a'], ['very'], []]</code> (如果<strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>自訂模式篩選</p></td>
     <td><p>特定領域的符記要求</p></td>
     <td><ul><li><p>輸入：<code translate="no">["test123", "prod456"]</code></p></li><li><p>輸出： <code translate="no">[[], ['prod456']]</code> (if<strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">特定語言過濾器</h4><p>這些篩選器處理特定的語言特性：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>語言</p></th>
     <th><p>如何運作</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>德語</p></td>
     <td><p>將複合詞分割成可搜尋的元件</p></td>
     <td><ul><li><p>輸入：<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>輸出：<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>中文</p></td>
     <td><p>保留中文字 + 字母數字</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>輸出：<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>只保留中文字元</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>輸出：中文<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">步驟 3：合併並執行<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>要建立您的自訂分析器，您必須在<code translate="no">analyzer_params</code> 字典中定義 tokenizer 和篩選器清單。篩選器會依列出的順序套用。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最後：使用測試<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>在套用到集合之前，請務必先驗證您的設定：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>要檢查的常見問題：</p>
<ul>
<li><p><strong>過度標示</strong>：技術術語分割不正確</p></li>
<li><p><strong>標示不足</strong>：詞組未適當分隔</p></li>
<li><p><strong>遺漏標記</strong>：重要詞彙被篩選出來</p></li>
</ul>
<p>詳細用法請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>。</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">按用例推薦的配置<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>本節針對在 Milvus 中使用分析器時的常見用例，提供推薦的標記器和過濾器配置。請選擇最符合您的內容類型和搜尋需求的組合。</p>
<div class="alert note">
<p>在將分析器套用到您的收集之前，我們建議您使用 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a>來測試和驗證文字分析效能。</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">有重音符號的語言 (法文、西班牙文、德文等)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">standard</code> 記錄器並搭配小寫轉換、特定語言的詞彙縮寫和停止字移除。透過修改<code translate="no">language</code> 和<code translate="no">stop_words</code> 參數，此設定也適用於其他歐洲語言。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">英文內容<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>適用於具有全面過濾功能的英文文字處理。您也可以使用內建的 <a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a>分析器：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">中文內容<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">jieba</code> tokenizer 並套用字元過濾器，僅保留中文字元、拉丁字母和數字。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>對於簡體中文，<code translate="no">cnalphanumonly</code> ，除中文字元、字母數字文字和數字外，移除所有標記。這可防止標點符號影響搜尋品質。</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">日文內容<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">lindera</code> tokenizer 與日文字典和過濾器來清除標點符號和控制符號長度：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">韓文內容<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>與日文類似，使用<code translate="no">lindera</code> tokenizer 與韓文字典：</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">混合或多語內容<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>當處理跨越多種語言或使用腳本難以預測的內容時，請從<code translate="no">icu</code> 分析器開始。此 Unicode 感知分析器可有效處理混合腳本和符號。</p>
<p><strong>基本多語言配置 (無詞幹)：</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>進階多語言處理</strong>：</p>
<p>為了更好地控制不同語言的符號行為：</p>
<ul>
<li><p>使用<strong>多語言分析器</strong>配置。詳情請參閱<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>。</p></li>
<li><p>在您的內容上實作<strong>語言識別碼</strong>。如需詳細資訊，請參閱<a href="/docs/zh-hant/language-identifier.md">語言識別碼</a>。</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">與文字檢索功能整合<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇您的分析器後，您可以將它與 Milvus 提供的文字檢索功能整合。</p>
<ul>
<li><p><strong>全文檢索</strong></p>
<p>分析器透過稀疏向量的產生，直接影響以 BM25 為基礎的全文檢索。索引和查詢使用相同的分析器，以確保標記化的一致性。特定語言的分析器通常比一般的分析器提供更好的 BM25 評分。有關實施的詳細資訊，請參閱<a href="/docs/zh-hant/full-text-search.md">全文</a>檢索。</p></li>
<li><p><strong>文字匹配</strong></p>
<p>文字匹配作業會根據您的分析器輸出，在查詢和索引內容之間執行精確的符號匹配。如需實施細節，請參閱<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>。</p></li>
<li><p><strong>短語匹配</strong></p>
<p>短語匹配需要在多字表述中進行一致的標記化，以維持短語邊界和意義。如需實施細節，請參閱<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>。</p></li>
</ul>
