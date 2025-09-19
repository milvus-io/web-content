---
id: json-shredding.md
title: JSON 切碎Compatible with Milvus 2.6.2+
summary: >-
  JSON 切碎可將傳統的基於行的儲存轉換為最佳化的列式儲存，從而加速 JSON 查詢。在維持 JSON 資料建模彈性的同時，Milvus
  執行幕後列式最佳化，大幅提升存取與查詢效率。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 切碎<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 切碎可將傳統的基於行的存儲轉換為優化的列存儲，從而加速 JSON 查詢。在維持 JSON 資料建模彈性的同時，Milvus 執行幕後列式最佳化，大幅改善存取與查詢效率。</p>
<p>JSON 切碎對大多數 JSON 查詢場景都很有效。在下列情況下，性能優勢會更加明顯</p>
<ul>
<li><p><strong>更大、更複雜的 JSON 文件</strong>- 隨著文件大小的增加，性能提升也更大</p></li>
<li><p><strong>讀取繁重的工作負載</strong>- 經常對 JSON 鍵進行篩選、排序或搜尋</p></li>
<li><p><strong>混合查詢模式</strong>- 跨不同 JSON 鍵的查詢可從混合儲存方法中獲益</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">如何運作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 切碎過程分為三個不同階段，以優化資料，方便快速檢索。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">階段 1：擷取與關鍵分類<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>當有新的 JSON 文件寫入時，Milvus 會持續取樣並進行分析，以建立每個 JSON key 的統計資料。這項分析包括關鍵字的出現比率和類型穩定性（其資料類型在各文件中是否一致）。</p>
<p>根據這些統計資料，JSON 金鑰會被分類為下列類別，以便進行最佳儲存。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON 金鑰類別</h4><table>
   <tr>
     <th><p>關鍵類型</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p>類型鍵</p></td>
     <td><p>存在於大多數文件中，且總是具有相同資料類型的關鍵（例如，所有整數或所有字串）。</p></td>
   </tr>
   <tr>
     <td><p>動態鍵值</p></td>
     <td><p>經常出現但具有混合資料類型的鍵 (例如：有時是字串，有時是整數)。</p></td>
   </tr>
   <tr>
     <td><p>共用鍵</p></td>
     <td><p>出現頻率低於可設定頻率臨界值的不常出現或巢狀的鍵<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分類範例</h4><p>考慮包含以下 JSON 鍵的 JSON 資料樣本：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>基於此資料，鍵將分類如下：</p>
<ul>
<li><p><strong>類型鍵</strong>：<code translate="no">a</code> 和<code translate="no">f</code> (總是整數)</p></li>
<li><p><strong>動態鍵</strong>：<code translate="no">b</code> (混合字串/整數)</p></li>
<li><p><strong>共用鍵</strong>：<code translate="no">e</code> (不常出現的鍵)</p></li>
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
    </button></h3><p><a href="/docs/zh-hant/json-shredding.md#Phase-1-Ingestion--key-classification">第 1 階段</a>的分類決定了儲存配置。Milvus 使用針對查詢最佳化的列式格式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Json 切碎流程</span> </span></p>
<ul>
<li><p><strong>切碎列</strong>：對於<strong>鍵入</strong>和<strong>動態鍵</strong>，資料會寫入專用列。這種列式儲存可在查詢時進行快速、直接的掃描，因為 Milvus 可以只讀取給定鍵所需的資料，而無需處理整個文件。</p></li>
<li><p><strong>共用列</strong>：所有<strong>共用鍵</strong>都一起儲存在單一精簡的二進位 JSON 列中。在此列上會建立一個共享鑰匙<strong>反向索引</strong>。此索引對於加速低頻關鍵值的查詢非常重要，它允許 Milvus 快速剪裁資料，有效地將搜尋空間縮小到只包含指定關鍵值的行。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">第 3 階段：查詢執行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最後階段利用最佳化的儲存配置，為每個查詢謂語智慧地選擇最快的路徑。</p>
<ul>
<li><p><strong>快速路徑</strong>：對於類型化/動態鍵 (例如<code translate="no">json['a'] &lt; 100</code>) 的查詢會直接存取專用欄位。</p></li>
<li><p><strong>最佳化路徑</strong>：對共用鍵 (例如：<code translate="no">json['e'] = 'rare'</code>)進行查詢時，可使用倒置索引快速找到相關文件</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">啟用 JSON 切碎<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>若要啟用此功能，請在<code translate="no">milvus.yaml</code> 配置檔案中設定<code translate="no">common.enabledJSONKeyStats</code> 為<code translate="no">true</code> 。新資料將自動觸發粉碎程序。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>一旦啟用，Milvus 將會在輸入時開始分析和重組您的 JSON 資料，而無需任何進一步的手動介入。</p>
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
    </button></h2><p>對大多數用戶而言，一旦啟用 JSON 切碎，其他參數的預設值就足夠了。但是，您可以使用<code translate="no">milvus.yaml</code> 中的這些參數微調 JSON 切碎的行為。</p>
<table>
   <tr>
     <th><p>參數名稱</p></th>
     <th><p>說明</p></th>
     <th><p>預設值</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>控制是否啟用 JSON 切碎的建立和載入程序。</p></td>
     <td><p>假</p></td>
     <td><p>必須設定為<strong>true</strong>才能啟用該功能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>控制 Milvus 是否使用切碎資料加速。</p></td>
     <td><p>true</p></td>
     <td><p>設定為<strong>false</strong>，作為查詢失敗時的恢復措施，回復原始查詢路徑。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>決定 Milvus 在載入切碎資料時是否使用 mmap。</p><p>詳情請參閱<a href="/docs/zh-hant/mmap.md">使用 mmap</a>。</p></td>
     <td><p>true</p></td>
     <td><p>此設定一般為效能最佳化。只有在您的系統有特定記憶體管理需求或限制時，才調整它。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>將儲存在切碎列中的 JSON 金鑰的最大數量。 </p><p>如果經常出現的金鑰數量超過此限制，Milvus 會優先將最常出現的金鑰粉碎，其餘的金鑰會儲存在共用列中。</p></td>
     <td><p>1024</p></td>
     <td><p>這對大多數情況來說已經足夠。對於有上千個常見鑰匙的 JSON，您可能需要增加這個限制，但請監控儲存空間的使用。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>JSON 金鑰必須具備的最小出現比率，才會被考慮粉碎到粉碎列中。</p><p>如果鍵的出現比率高於此臨界值，則該鍵被視為經常出現。</p></td>
     <td><p>0.3</p></td>
     <td><p>如果符合粉碎條件的鑰匙數量超過<code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code> 限制，則<strong>增加</strong>（例如增加到 0.5）。這會使臨界值更嚴格，減少符合粉碎條件的鑰匙數量。</p><p>如果您想要粉碎更多出現次數少於預設 30% 閾值的金鑰，請<strong>降低</strong>(例如，至 0.1)。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">效能基準<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我們的測試顯示，不同的 JSON 金鑰類型和查詢模式都有顯著的效能改善。</p>
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
<li><p><strong>硬體</strong>：1 核心/8GB 集群</p></li>
<li><p><strong>資料集</strong>：來自<a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>的 100 萬個文件</p></li>
<li><p><strong>平均文件大小</strong>：478.89 位元組</p></li>
<li><p><strong>測試持續時間</strong>：100 秒測量 QPS 與延遲</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">結果：鍵入<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>此測試測量查詢大多數文件中存在的鍵時的效能。</p>
<table>
   <tr>
     <th><p>查詢表達</p></th>
     <th><p>鍵值類型</p></th>
     <th><p>QPS (未粉碎)</p></th>
     <th><p>QPS (有切碎)</p></th>
     <th><p>效能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整數</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
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
    </button></h3><p>此測試的重點在於查詢屬於 「共用」 類的稀疏嵌套鍵。</p>
<table>
   <tr>
     <th><p>查詢表達</p></th>
     <th><p>鍵值類型</p></th>
     <th><p>QPS (未粉碎)</p></th>
     <th><p>QPS (有切碎)</p></th>
     <th><p>效能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>嵌套整數</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>巢狀字串</p></td>
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
<li><p><strong>共用關鍵查詢</strong>顯示出最顯著的改進 (快達 89 倍)</p></li>
<li><p><strong>類型化關鍵查詢</strong>提供一致的 15-30 倍效能提升</p></li>
<li><p><strong>所有查詢類型都</strong>能從 JSON Shredding 中獲益，而不會造成效能退步</p></li>
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
<li><p><strong>如何驗證 JSON 破碎處理是否正常運作？</strong></p>
<ol>
<li><p>首先，使用<a href="/docs/zh-hant/birdwatcher_usage_guides.md">Birdwatcher</a>工具中的<code translate="no">show segment --format table</code> 指令檢查資料是否已建立。如果成功，輸出將在<strong>Json Key Stats</strong>欄位下包含<code translate="no">shredding_data/</code> 和<code translate="no">shared_key_index/</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Birdwatcher 輸出</span> </span></p></li>
<li><p>接下來，在查詢節點上執行<code translate="no">show loaded-json-stats</code> ，驗證資料是否已載入。輸出將顯示每個查詢節點已載入切碎資料的詳細資訊。</p></li>
</ol></li>
<li><p><strong>如何在 JSON 切碎和 JSON 索引之間進行選擇？</strong></p>
<ul>
<li><p><strong>JSON 切碎</strong>非常適合在您的文件中經常出現的鍵，尤其是複雜的 JSON 結構。它結合了列式儲存和倒轉索引的優點，非常適合您查詢許多不同鍵的重讀情境。但是，不建議用於非常小的 JSON 文件，因為性能增益微乎其微。關鍵值佔 JSON 文件總大小的比例越小，粉碎的性能優化效果就越好。</p></li>
<li><p><strong>JSON 索引</strong>更適合針對特定的基於關鍵值的查詢進行有針對性的優化，並且具有較低的存儲開銷。它適用於較簡單的 JSON 結構。請注意，JSON 切碎並不涵蓋對陣列內部鍵的查詢，因此您需要 JSON 索引來加速這些查詢。</p></li>
</ul></li>
<li><p><strong>如果遇到錯誤怎麼辦？</strong></p>
<p>如果建立或載入過程失敗，您可以透過設定<code translate="no">common.enabledJSONKeyStats=false</code> 快速停用該功能。若要清除任何剩餘任務，請使用<a href="/docs/zh-hant/birdwatcher_usage_guides.md">Birdwatcher</a> 中的<code translate="no">remove stats-task &lt;task_id&gt;</code> 指令。如果查詢失敗，請設定<code translate="no">common.usingJsonStatsForQuery=false</code> 以恢復原始查詢路徑，繞過粉碎的資料。</p></li>
</ul>
