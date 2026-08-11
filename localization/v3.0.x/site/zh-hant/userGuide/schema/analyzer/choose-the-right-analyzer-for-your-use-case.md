---
id: choose-the-right-analyzer-for-your-use-case.md
title: 根據您的使用情境選擇合適的分析器
summary: 註釋
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">根據您的使用情境選擇合適的分析器<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>本指南著重於分析儀選型的實務決策。有關分析儀元件的技術細節以及如何新增分析儀參數，請參閱《<a href="/docs/zh-hant/analyzer-overview.md">分析儀概覽</a>》。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2 分鐘了解分析器<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，分析器會處理儲存於此欄位中的文字，使其可針對<a href="/docs/zh-hant/full-text-search.md">全文字搜尋</a>（BM25）、<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>或<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>等功能進行搜尋。您可以將其視為一種文字處理器，能將原始內容轉換為可搜尋的標記。</p>
<p>分析器的運作遵循簡單的兩階段流程：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>分析器工作流程</span>
  
 </span></p>
<ol>
<li><p><strong>分詞（必經步驟）：</strong>此初始階段會套<strong>用分詞器，</strong>將連續的文字字串分割成稱為「詞元」的離散且有意義的單位。分詞方法會因語言和內容類型而有顯著差異。</p></li>
<li><p><strong>標記過濾（可選）：</strong>分詞後，會套用<strong>過濾器</strong>來修改、移除或精煉標記。這些操作可能包括將所有標記轉換為小寫、移除常見的無意義詞彙（例如停用詞），或將單字還原為其詞幹形式（詞幹化）。</p></li>
</ol>
<p><strong>範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">為何分析器的選擇至關重要<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>若選擇錯誤的分析器，可能會導致相關文件無法被搜尋到，或返回不相關的結果。</p>
<p>下表彙整了因分析器選取不當所導致的常見問題，並針對診斷搜尋問題提供可執行的解決方案。</p>
<table>
   <tr>
     <th><p>問題</p></th>
     <th><p>症狀</p></th>
     <th><p>範例（輸入與輸出）</p></th>
     <th><p>原因（不當的分析器）</p></th>
     <th><p>解決方案（合適的分析器）</p></th>
   </tr>
   <tr>
     <td><p>過度分詞</p></td>
     <td><p>針對技術術語、識別碼或網址的文字查詢無法找到相關文件。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a> 分析器</p></td>
     <td><p>使用 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分詞器；並搭配 <a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 過濾器。</p></td>
   </tr>
   <tr>
     <td><p>分詞不足</p></td>
     <td><p>搜尋多詞短語中的某個組成部分時，無法回傳包含完整短語的文件。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>搭配 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分詞器</p></td>
     <td><p>請使用 <a href="/docs/zh-hant/standard-tokenizer.md"><code translate="no">standard</code></a> 分詞器」進行標點符號與空格分割；使用自訂<a href="/docs/zh-hant/regex-filter.md">正規</a>表達式篩選器。</p></td>
   </tr>
   <tr>
     <td><p>語言不匹配</p></td>
     <td><p>特定語言的搜尋結果毫無意義或根本不存在。</p></td>
     <td><p>中文文本：<code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> （一個詞元）</p></td>
     <td><p><a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a> 分析器</p></td>
     <td><p>請使用特定語言的分析器，例如 <a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a>。</p></td>
   </tr>
   <tr>
     <td><p>輸入法不匹配</p></td>
     <td><p>使用者輸入拼音，但索引文字使用的是中文字。</p></td>
     <td><p>中文文本：<code translate="no">"足球"</code> ；查詢文本：<code translate="no">"zuqiu"</code></p></td>
     <td><p>僅產生漢字詞元（token）的分析器</p></td>
     <td><p>請使用自訂分析器，並搭配 <a href="/docs/zh-hant/jieba-tokenizer.md"><code translate="no">jieba</code></a> 分詞器與 <a href="/docs/zh-hant/pinyin-filter.md"><code translate="no">pinyin</code></a> 篩選器。</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">第一個問題：您需要選擇分析器嗎？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>在許多使用情境下，您無需進行任何特殊設定。讓我們來確認您的情況是否屬於其中之一。</p>
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
    </button></h3><p>若在使用全文檢索等文字檢索功能時未指定分析器，Milvus 會自動使用 <a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a> 分析器。</p>
<p><code translate="no">standard</code> 分析器：</p>
<ul>
<li><p>根據空格和標點符號分割文字</p></li>
<li><p>將所有詞元轉換為小寫</p></li>
<li><p>移除一組內建的常見英文停用詞及大部分標點符號</p></li>
</ul>
<p><strong>轉換範例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">決策準則：快速檢查<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>請參閱此表格，快速判斷預設的<code translate="no">standard</code> 分析器是否符合您的需求。若不符合，您將需要選擇其他方案。</p>
<table>
   <tr>
     <th><p>您的內容</p></th>
     <th><p>標準分析器適用嗎？</p></th>
     <th><p>原因</p></th>
     <th><p>您的需求</p></th>
   </tr>
   <tr>
     <td><p>英文部落格文章</p></td>
     <td><p>✅ 是</p></td>
     <td><p>預設行為已足夠。</p></td>
     <td><p>使用預設設定（無需配置）。</p></td>
   </tr>
   <tr>
     <td><p>中文文件</p></td>
     <td><p>❌ 否</p></td>
     <td><p>中文單詞沒有空格，將被視為一個詞元。</p></td>
     <td><p>請使用內建的 <a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a> 分析器。</p></td>
   </tr>
   <tr>
     <td><p>阿拉伯文文件</p></td>
     <td><p>❌ 否</p></td>
     <td><p>阿拉伯文可能包含字母變體、標點符號、Tatweel、阿拉伯-印度數字，以及常見的阿拉伯語停用詞，這些都需要針對該語言進行特殊處理。</p></td>
     <td><p>請使用內建的 <a href="/docs/zh-hant/arabic-analyzer.md"><code translate="no">arabic</code></a> 分析器。</p></td>
   </tr>
   <tr>
     <td><p>泰文文件</p></td>
     <td><p>❌ 否</p></td>
     <td><p>泰文通常不在單詞之間使用空格，因此需要針對該語言的單詞分詞處理。</p></td>
     <td><p>請使用內建的 <a href="/docs/zh-hant/thai-analyzer.md"><code translate="no">thai</code></a> 分析器。</p></td>
   </tr>
   <tr>
     <td><p>技術文件</p></td>
     <td><p>❌ 否</p></td>
     <td><p>像「<code translate="no">C++</code> 」這類詞彙中的標點符號會被移除。</p></td>
     <td><p>使用 <a href="/docs/zh-hant/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分詞器與 <a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 篩選器。</p></td>
   </tr>
   <tr>
     <td><p>以空格分隔的語言，例如法語／西班牙語文本</p></td>
     <td><p>⚠️ 可能</p></td>
     <td><p>帶有重音符號的字元（<code translate="no">café</code> 對比<code translate="no">cafe</code> ）可能無法正確匹配。</p></td>
     <td><p>建議使用帶有 <a href="/docs/zh-hant/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> 以獲得更佳結果。</p></td>
   </tr>
   <tr>
     <td><p>多語言或未知語言</p></td>
     <td><p>❌ 不</p></td>
     <td><p><code translate="no">standard</code> 分析器缺乏處理不同字元集和分詞規則所需的語言特定邏輯。</p></td>
     <td><p>請使用具備 <a href="/docs/zh-hant/icu-tokenizer.md"><code translate="no">icu</code></a> ，以進行支援 Unicode 的分詞。 </p><p>此外，亦可考慮配置<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>或<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>，以更精確地處理多語言內容。</p></td>
   </tr>
</table>
<p>若預設的<code translate="no">standard</code> 分析器無法滿足您的需求，您需要實作另一個分析器。您有兩種途徑：</p>
<ul>
<li><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">使用內建分析器</a>，或</p></li>
<li><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">建立自訂分析器</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">途徑 A：使用內建分析器<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>內建分析器是針對常見語言預先配置的解決方案。當預設標準分析器無法完全符合需求時，這是最簡單的入門方式。</p>
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
     <th><p>支援的語言</p></th>
     <th><p>元件</p></th>
     <th><p>備註</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>大多數以空格分隔的語言（英語、法語、德語、西班牙語等）</p></td>
     <td><ul><li><p>分詞器：<code translate="no">standard</code></p></li><li><p>篩選器：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>用於初始文字處理的通用分析器。在單一語言情境下，語言專用的分析器（如<code translate="no">english</code> ）能提供更佳的效能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>專為英語設計，會進行詞幹提取與停用詞移除，以提升英語語義匹配效果</p></td>
     <td><ul><li><p>分詞器：<code translate="no">standard</code></p></li><li><p>篩選器：<code translate="no">lowercase</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>相較於<code translate="no">standard</code> ，此設定更推薦用於純英文內容。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中文</p></td>
     <td><ul><li><p>分詞器：<code translate="no">jieba</code></p></li><li><p>篩選器：<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>目前預設使用簡體中文詞典。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>阿拉伯文</p></td>
     <td><ul><li><p>分詞器：<code translate="no">standard</code></p></li><li><p>篩選器：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">arabic_normalization</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>相較於<code translate="no">standard</code> ，更推薦用於阿拉伯語文本。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>泰語</p></td>
     <td><ul><li><p>分詞器：<code translate="no">thai</code></p></li><li><p>篩選器：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>相較於<code translate="no">standard</code> 或基於空白字元的分詞，更推薦用於泰文。</p></td>
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
    </button></h3><p>若要使用內建分析器，只需在定義欄位架構時，於 `<code translate="no">analyzer_params</code> ` 中指定其類型即可。</p>
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
<p>有關詳細用法，請參閱「<a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>」、「<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>」或「<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>」。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">方法 B：建立自訂分析器<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>當<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">內建選項</a>無法滿足您的需求時，您可以透過將分詞器與一組篩選器結合，來建立自訂分析器。這讓您能完全掌控文字處理流程。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">步驟 1：根據語言選擇分詞器<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>請根據內容的主要語言選擇分詞器：</p>
<h4 id="Western-languages" class="common-anchor-header">西方語言</h4><p>對於以空格分隔的語言，您有以下選項：</p>
<table>
   <tr>
     <th><p>分詞器</p></th>
     <th><p>運作原理</p></th>
     <th><p>最適合</p></th>
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
     <td><p>僅根據空白字元進行分割</p></td>
     <td><p>預處理過的內容、使用者格式化的文字</p></td>
     <td><ul><li><p>輸入：<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>輸出：<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">東亞語言</h4><p>在詞與詞之間未一致使用空格的語言，需要專用的分詞器才能進行正確的詞語分割：</p>
<h5 id="Chinese" class="common-anchor-header">中文</h5><table>
   <tr>
     <th><p>分詞器</p></th>
     <th><p>運作原理</p></th>
     <th><p>最適合</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>基於中文詞典並結合智慧演算法的分詞</p></td>
     <td><p><strong>推薦用於中文內容</strong>——結合詞典與智能演算法，專為中文設計</p></td>
     <td><ul><li><p>輸入：<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>輸出：<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>純字典式形態分析，採用中文字典（<a href="https://cc-cedict.org/wiki/">cc-cedict</a>）</p></td>
     <td><p>相較於<code translate="no">jieba</code> ，以更通用方式處理中文文本</p></td>
     <td><ul><li><p>輸入：<code translate="no">"机器学习算法"</code></p></li><li><p>輸出：<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">泰語</h5><p>對於大多數泰文文本，請使用內建的 <a href="/docs/zh-hant/thai-analyzer.md"><code translate="no">thai</code></a> 分析器。僅在需要建立自訂分析器管線時，才使用獨立的 <a href="/docs/zh-hant/thai-tokenizer.md"><code translate="no">thai</code></a> 分詞器，僅限於需要建立自訂分析器管線時使用。</p>
<table>
   <tr>
     <th><p>分詞器</p></th>
     <th><p>運作原理</p></th>
     <th><p>最適合</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>將泰文分割為單詞標記，並過濾掉僅含空白字元及標點符號的片段</p></td>
     <td><p>適用於泰語或泰英混合文本的自訂分析器流程</p></td>
     <td><ul><li><p>輸入：<code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>輸出：<code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日語與韓語</h5><table>
   <tr>
     <th><p>語言</p></th>
     <th><p>分詞器</p></th>
     <th><p>詞典選項</p></th>
     <th><p>最適合</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p>日語</p></td>
     <td><p><a href="/docs/zh-hant/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>（通用型）、<a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a>（現代術語）、<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>（學術型）</p></td>
     <td><p>具專有名詞處理功能的形態學分析</p></td>
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
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多語言或未知語言</h4><p>針對文件內語言難以預測或混雜的情況：</p>
<table>
   <tr>
     <th><p>分詞器</p></th>
     <th><p>運作原理</p></th>
     <th><p>最適合</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>支援 Unicode 的分詞（國際 Unicode 元件）</p></td>
     <td><p>混合文字系統、未知語言，或僅需簡單分詞的情境</p></td>
     <td><ul><li><p>輸入：<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>輸出：<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>何時應使用 icu</strong>：</p>
<ul>
<li><p>在無法實際進行語言識別的混合語言情境中。</p></li>
<li><p>您希望避免<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>或<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>所帶來的額外負擔。</p></li>
<li><p>內容雖以某種主要語言為主，但偶爾會出現對整體意義影響甚微的外來詞（例如：英文文本中零星出現日文或法文的品牌名稱或技術術語）。</p></li>
</ul>
<p><strong>替代方案</strong>：若需更精確地處理多語言內容，請考慮使用多語言分析器或語言識別器。詳細資訊請參閱《<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>》或《<a href="/docs/zh-hant/language-identifier.md">語言識別器</a>》。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">步驟 2：新增篩選器以提升精準度<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">選定分詞器</a>後，請根據您的具體搜尋需求和內容特性套用篩選器。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">常用篩選器</h4><p>這些篩選器對於大多數以空格分隔的語言配置（英語、法語、德語、西班牙語等）至關重要，並能顯著提升搜尋品質：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>運作原理</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>將所有詞元轉換為小寫</p></td>
     <td><p>通用型 — 適用於所有區分大小寫的語言</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>輸出：<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>將單詞還原為其詞根形式</p></td>
     <td><p>具有詞形變化的語言（英語、法語、德語等）</p></td>
     <td><p>以英語為例：</p><ul><li><p>輸入：<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>輸出：<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>移除常見的無意義詞彙</p></td>
     <td><p>多數語言——對於以空格分隔的語言特別有效</p></td>
     <td><ul><li><p>輸入：<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>輸出：<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>對於東亞語言（中文、日文、韓文等），應著重採用<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">特定語言的過濾器</a>。這些語言通常採用不同的文字處理方法，因此詞幹提取可能無法帶來顯著效益。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">文字標準化篩選器</h4><p>這些篩選器可將文字變體標準化，以提升匹配的一致性：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>運作原理</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>將帶有重音符號的字元轉換為 ASCII 等效字元</p></td>
     <td><p>國際內容、使用者生成內容</p></td>
     <td><ul><li><p>輸入：<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>輸出：<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">標記過濾</h4><p>根據字元內容或長度控制保留哪些詞元：</p>
<table>
   <tr>
     <th><p>篩選</p></th>
     <th><p>運作原理</p></th>
     <th><p>何時使用</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>移除獨立的標點符號詞元</p></td>
     <td><p>清理由<code translate="no">jieba</code> 、<code translate="no">lindera</code> 、<code translate="no">icu</code> 等標記器產生的輸出結果，這些標記器會將標點符號視為單一標記</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>輸出：<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>僅保留字母和數字</p></td>
     <td><p>技術內容、乾淨的文字處理</p></td>
     <td><ul><li><p>輸入：<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>輸出：<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>移除超出指定長度範圍的標記</p></td>
     <td><p>過濾雜訊（過長的語素）</p></td>
     <td><ul><li><p>輸入：<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>輸出：<code translate="no">[['a'], ['very'], []]</code> （若<strong>max=10</strong>）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>基於自訂模式的過濾</p></td>
     <td><p>特定領域的標記要求</p></td>
     <td><ul><li><p>輸入：<code translate="no">["test123", "prod456"]</code></p></li><li><p>輸出：<code translate="no">[[], ['prod456']]</code> （若<strong>expr="^prod"</strong>）</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">特定語言的篩選器</h4><p>這些篩選器可處理特定語言的特性：</p>
<table>
   <tr>
     <th><p>篩選器</p></th>
     <th><p>語言</p></th>
     <th><p>運作原理</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>德語</p></td>
     <td><p>將複合詞拆分為可搜尋的組成部分</p></td>
     <td><ul><li><p>輸入：<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>輸出：<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>中文</p></td>
     <td><p>保留中文字元 + 字母數字</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>輸出：<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>僅保留中文字元</p></td>
     <td><ul><li><p>輸入：<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>輸出：<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>針對中文標記產生拼音標記形式</p></td>
     <td><ul><li><p>輸入：<code translate="no">["中文"]</code></p></li><li><p>輸出：<code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">步驟 3：組合與實作<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>要建立自訂分析器，您需在 `<code translate="no">analyzer_params</code> ` 字典中定義分詞器及一組篩選器。篩選器將依照其列出的順序進行套用。</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最後：使用<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>在將設定套用至集合之前，請務必驗證您的設定：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>常見需檢查的問題：</p>
<ul>
<li><p><strong>過度分詞</strong>：技術術語被錯誤分割</p></li>
<li><p><strong>分詞不足</strong>：短語未被正確分割</p></li>
<li><p><strong>遺漏標記</strong>：重要術語被過濾掉</p></li>
</ul>
<p>有關詳細用法，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>。</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">依使用情境建議的設定<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>本節針對在 Milvus 中使用分析器時常見的使用情境，提供建議的分詞器與篩選器設定。請選擇最符合您的內容類型與搜尋需求的組合。</p>
<div class="alert note">
<p>在將分析器套用至您的資料集之前，我們建議您使用 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> 來測試並驗證文字分析的效能。</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">帶有重音符號的語言（法語、西班牙語、德語等）<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>請使用具備小寫轉換、語言專屬詞幹化及停用詞移除功能的<code translate="no">standard</code> 分詞器。此設定亦適用於其他歐洲語言，只需修改<code translate="no">language</code> 和<code translate="no">stop_words</code> 參數即可。</p>
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
    </button></h3><p>適用於需進行全面過濾的英文文本處理。您亦可使用內建的 <a href="/docs/zh-hant/english-analyzer.md"><code translate="no">english</code></a> 分析器：</p>
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
    </button></h3><p>請使用<code translate="no">jieba</code> 分詞器，並套用字元篩選器，僅保留中文字元、拉丁字母及數字。</p>
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
<p>針對簡體中文，<code translate="no">cnalphanumonly</code> 會移除除中文字、英文字母及數字以外的所有詞元。此舉可避免標點符號影響搜尋品質。</p>
</div>
<p>若使用者可能透過輸入拼音來搜尋中文內容，請使用自訂分析器，搭配<code translate="no">jieba</code> 分詞器以及 <a href="/docs/zh-hant/pinyin-filter.md"><code translate="no">pinyin</code></a> 篩選器，而非內建的<code translate="no">chinese</code> 分析器。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>請搭配日文辭典和篩選器使用<code translate="no">lindera</code> 分詞器，以清除標點符號並控制詞元長度：</p>
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
    </button></h3><p>與日文類似，請搭配韓語詞典使用<code translate="no">lindera</code> 分詞器：</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">混合或多語言內容<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>當處理涵蓋多種語言或以不可預測方式使用字元的內容時，請先使用<code translate="no">icu</code> 分析器。此支援 Unicode 的分析器能有效處理混合字元與符號。</p>
<p><strong>基本多語言設定（不進行詞幹提取）</strong>：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>進階多語言處理</strong>：</p>
<p>若需更精確地控制不同語言間的詞元行為：</p>
<ul>
<li><p>請<strong>使用多語言分析器</strong>配置。詳細資訊請參閱《<a href="/docs/zh-hant/multi-language-analyzers.md">多語言分析器</a>》。</p></li>
<li><p>在您的內容中實作<strong>語言識別碼</strong>。詳細資訊請參閱《<a href="/docs/zh-hant/language-identifier.md">語言識別碼</a>》。</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">與文本檢索功能整合<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>選取分析器後，即可將其與 Milvus 提供的文字檢索功能整合。</p>
<ul>
<li><p><strong>全文檢索</strong></p>
<p>分析器會透過稀疏向量生成，直接影響基於 BM25 的全文搜尋。請在索引與查詢時使用相同的分析器，以確保分詞結果的一致性。特定語言的分析器通常能提供比通用分析器更佳的 BM25 評分。有關實作細節，請參閱「<a href="/docs/zh-hant/full-text-search.md">全文搜尋」</a>。</p></li>
<li><p><strong>文字比對</strong></p>
<p>文字比對操作會根據分析器的輸出結果，對查詢內容與索引內容進行精確的詞元比對。有關實作細節，請參閱<a href="/docs/zh-hant/keyword-match.md">「文字比對」</a>。</p></li>
<li><p><strong>短語匹配</strong></p>
<p>短語匹配需要對多詞表達式進行一致的詞元分割，以維持短語的邊界與語意。有關實作細節，請參閱《<a href="/docs/zh-hant/phrase-match.md">短語匹配》</a>。</p></li>
</ul>
