---
id: json-shredding.md
title: JSON 列式化Compatible with Milvus 2.6.2+
summary: >-
  JSON 拆分技術透過將傳統的行式儲存轉換為優化的欄式儲存，從而加速 JSON 查詢。在維持 JSON 資料建模靈活性的同時，Milvus
  會在後台執行欄式優化，大幅提升存取與查詢效率。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 列式化<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 拆分透過將傳統的行式儲存轉換為優化的欄式儲存，從而加速 JSON 查詢。在維持 JSON 資料建模靈活性的同時，Milvus 會在後台執行欄式優化，大幅提升存取與查詢效率。</p>
<p>JSON 拆分技術對大多數 JSON 查詢情境皆十分有效。在以下情況下，其效能優勢將更加顯著：</p>
<ul>
<li><p><strong>規模更大、更複雜的 JSON 文件</strong>— 隨著文件大小增加，效能提升幅度越大</p></li>
<li><p><strong>讀取密集型工作負載</strong>— 頻繁針對 JSON 鍵進行篩選、排序或搜尋</p></li>
<li><p><strong>混合查詢模式</strong>— 跨不同 JSON 鍵的查詢可從混合儲存方式中受益</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">運作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 分片流程分為三個明確的階段，以優化資料並實現快速檢索。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">第一階段：資料導入與鍵值分類<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>當新的 JSON 文件被寫入時，Milvus 會持續對其進行採樣與分析，以建立每個 JSON 鍵的統計資料。此分析包含該鍵的出現比率與類型穩定性（即其資料類型在各文件間是否一致）。</p>
<p>根據這些統計資料，JSON 鍵會被歸類為以下幾類，以實現最佳儲存效果。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON 鍵的分類</h4><table>
   <tr>
     <th><p>鍵值類型</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p>具型別的鍵</p></td>
     <td><p>存在於大多數文件中，且資料類型始終相同的鍵（例如：全為整數或全為字串）。</p></td>
   </tr>
   <tr>
     <td><p>動態鍵</p></td>
     <td><p>頻繁出現但資料類型混雜的鍵（例如：有時是字串，有時是整數）。</p></td>
   </tr>
   <tr>
     <td><p>共用鍵</p></td>
     <td><p>出現頻率較低或呈嵌套結構，且低於可配置頻率閾值的鍵<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分類範例</h4><p>請參閱包含以下 JSON 鍵的範例 JSON 資料：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>根據此資料，這些鍵將被分類如下：</p>
<ul>
<li><p><strong>有類型鍵</strong>：<code translate="no">a</code> 及<code translate="no">f</code> （始終為整數）</p></li>
<li><p><strong>動態鍵值</strong>：<code translate="no">b</code> （字串與整數混合）</p></li>
<li><p><strong>共享鍵</strong>：<code translate="no">e</code> （出現頻率較低的鍵）</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">第二階段：儲存優化<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh-hant/json-shredding.md#Phase-1-Ingestion--key-classification">第一階段</a>的分類結果決定了儲存佈局。Milvus 採用針對查詢進行優化的列式格式。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>JSON 分欄流程</span>
  
 </span></p>
<ul>
<li><p><strong>拆分欄位</strong>：針對<strong>類型化</strong>與<strong>動態</strong> <strong>鍵，</strong>資料會寫入專用的欄位中。這種欄位式儲存方式能在查詢時實現快速、直接的掃描，因為 Milvus 只需讀取特定鍵所需的資料，無需處理整個文件。</p></li>
<li><p><strong>共用欄位</strong>：所有<strong>共用鍵</strong>皆儲存於單一、緊湊的二進位 JSON 欄位中。系統會在此欄位上建立共用鍵<strong>倒排索引</strong>。此索引對於加速低頻率鍵的查詢至關重要，它能讓 Milvus 快速篩除資料，有效將搜尋範圍縮小至僅包含指定鍵的資料列。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">第三階段：查詢執行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最後階段利用優化的儲存佈局，為每個查詢謂詞智慧地選擇最快的執行路徑。</p>
<ul>
<li><p><strong>快速路徑</strong>：針對類型化／動態鍵的查詢（例如<code translate="no">json['a'] &lt; 100</code> ）會直接存取專用欄位</p></li>
<li><p><strong>優化路徑</strong>：針對共用鍵（例如<code translate="no">json['e'] = 'rare'</code> ）的查詢，會使用倒排索引來快速定位相關文件</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">啟用 JSON 拆分<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>若要啟用此功能，請在您的<code translate="no">milvus.yaml</code> 配置檔案中將<code translate="no">common.enabledJSONShredding</code> 設定為<code translate="no">true</code> 。新資料將自動觸發拆分流程。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>啟用後，Milvus 將在資料導入時立即開始分析並重組您的 JSON 資料，無需任何進一步的手動干預。</p>
<h2 id="Parameter-tuning" class="common-anchor-header">參數調整<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>對大多數使用者而言，啟用 JSON 拆解功能後，其他參數的預設設定已足夠。不過，您仍可透過<code translate="no">milvus.yaml</code> 中的這些參數，對 JSON 拆解的運作行為進行微調。</p>
<table>
   <tr>
     <th><p>參數名稱</p></th>
     <th><p>說明</p></th>
     <th><p>預設值</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>控制是否啟用 JSON 拆解的建置與載入流程。</p></td>
     <td><p>false</p></td>
     <td><p>必須設定為<strong>true</strong>才能啟用此功能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>控制 Milvus 是否使用拆分後的資料來進行加速。</p></td>
     <td><p>true</p></td>
     <td><p>若查詢失敗，可將此設定設為<strong>false</strong>作為恢復措施，以回退至原始查詢路徑。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>決定 Milvus 在載入分片資料時是否使用 mmap。</p><p>有關詳細資訊，請參閱「<a href="/docs/zh-hant/mmap.md">使用 mmap</a>」。</p></td>
     <td><p>true</p></td>
     <td><p>此設定通常已針對效能進行優化。僅當您的系統有特定的記憶體管理需求或限制時，才應調整此設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>將儲存於分片欄位中的 JSON 鍵的最大數量。 </p><p>如果頻繁出現的鍵數量超過此限制，Milvus 將優先對最頻繁出現的鍵進行分片，其餘的鍵則會儲存於共用欄位中。</p></td>
     <td><p>1024</p></td>
     <td><p>此數值對大多數情境而言已足夠。若 JSON 包含數千個頻繁出現的鍵，您可能需要增加此數值，但請同時監控儲存空間的使用狀況。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>JSON 鍵必須達到此最低出現比率，才會被納入拆分至拆分欄位的考量範圍。</p><p>若某個鍵的出現比率高於此閾值，則被視為頻繁出現。</p></td>
     <td><p>0.3</p></td>
     <td><p>若符合拆分標準的鍵數量超過 `<code translate="no">dataCoord.jsonShreddingMaxColumns</code> ` 限制<strong>，請提高此數值</strong>（例如調整為 0.5）。這會使閾值更嚴格，從而減少符合拆分條件的鍵數量。</p><p>若您希望將出現頻率低於預設 30% 閾值的鍵進行拆分，<strong>請降低此數值</strong>（例如，降至 0.1）。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">效能基準測試<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我們的測試顯示，在各種 JSON 鍵類型和查詢模式下，效能均有顯著提升。</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">測試環境與方法<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>硬體</strong>：1 核心／8GB 叢集</p></li>
<li><p><strong>資料集</strong>：來自<a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>的 100 萬份文件</p></li>
<li><p><strong>平均文件大小</strong>：478.89 位元組</p></li>
<li><p><strong>測試時長</strong>：100 秒，用於測量 QPS 與延遲</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">結果：具類型標記的鍵<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>此測試測量查詢在大多數文件中皆存在的鍵時的效能。</p>
<table>
   <tr>
     <th><p>查詢表達式</p></th>
     <th><p>鍵值類型</p></th>
     <th><p>QPS（未進行分片）</p></th>
     <th><p>QPS（啟用分片）</p></th>
     <th><p>效能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整數</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33 倍</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>字串</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">結果：共用鍵<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>此測試著重於查詢屬於「共用」類別的稀疏、嵌套鍵。</p>
<table>
   <tr>
     <th><p>查詢表達式</p></th>
     <th><p>鍵值類型</p></th>
     <th><p>每秒查詢數 (QPS)（未進行分片）</p></th>
     <th><p>QPS（啟用分片）</p></th>
     <th><p>效能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>嵌套整數</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9 倍</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>嵌套字串</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">關鍵洞察<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>共享鍵查詢</strong>展現出最顯著的效能提升（最快可達 89 倍）</p></li>
<li><p><strong>帶類型鍵的查詢</strong>可提供 15 至 30 倍的穩定效能提升</p></li>
<li><p><strong>所有查詢類型</strong>皆能從 JSON 拆分中受益，且不會造成效能退化</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>如何驗證 JSON 分片是否運作正常？</strong></p>
<ol>
<li><p>首先，請使用<a href="/docs/zh-hant/birdwatcher_usage_guides.md">Birdwatcher</a>工具中的 `<code translate="no">show segment --format table</code> ` 指令，檢查資料是否已建立。若成功，輸出結果的「<strong>Json Key Stats</strong>」欄位下將包含 `<code translate="no">shredding_data/</code> ` 和 `<code translate="no">shared_key_index/</code> `。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Birdwatcher 輸出</span>
  
 </span></p></li>
<li><p>接著，請在查詢節點上執行<code translate="no">show loaded-json-stats</code> 指令，以確認資料是否已載入。輸出結果將顯示每個查詢節點所載入的切片資料詳細資訊。</p></li>
</ol></li>
<li><p><strong>若遇到錯誤該怎麼辦？</strong></p>
<p>若建置或載入程序失敗，您可以透過設定 `<code translate="no">common.enabledJSONShredding=false</code>` 快速停用此功能。若要清除任何剩餘的任務，請在<a href="/docs/zh-hant/birdwatcher_usage_guides.md">Birdwatcher</a> 中使用 `<code translate="no">remove stats-task &lt;task_id&gt;</code> ` 指令。若查詢失敗，請設定 `<code translate="no">common.usingjsonShreddingForQuery=false</code> ` 以還原至原始查詢路徑，並繞過分割後的資料。</p></li>
</ul>
<ul>
<li><p><strong>如何在 JSON 分片與 JSON 索引之間進行選擇？</strong></p>
<ul>
<li><p><strong>JSON 分片</strong>非常適合在文件中頻繁出現的鍵，特別是針對複雜的 JSON 結構。它結合了欄位式儲存與倒排索引的優勢，非常適合需要查詢許多不同鍵的讀取密集型情境。然而，對於非常小的 JSON 文件，則不建議使用此功能，因為性能提升極為有限。 鍵的值佔 JSON 文件總大小的比例越小，拆分所帶來的效能優化效果就越好。</p></li>
<li><p><strong>JSON 索引則</strong>更適合針對特定基於金鑰的查詢進行精準優化，且儲存開銷較低。它適用於較簡單的 JSON 結構。請注意，JSON 分片無法涵蓋針對陣列內金鑰的查詢，因此您需要建立 JSON 索引來加速此類查詢。</p></li>
</ul>
<p>有關詳細資訊，請參閱《<a href="/docs/zh-hant/json-field-overview.md#Next-Accelerate-JSON-queries">JSON 欄位概覽</a>》。</p></li>
</ul>
