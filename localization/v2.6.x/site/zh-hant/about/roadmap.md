---
id: roadmap.md
title: Milvus 路線圖
related_key: Milvus roadmap
summary: Milvus 是一個開放原始碼的向量資料庫，專為人工智能應用程式打造。以下是我們的發展路線圖。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路線圖<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>歡迎來到 Milvus 路線圖！加入我們不斷提升和發展 Milvus 的旅程。我們很高興與您分享我們的成就、未來計畫，以及我們對未來的願景。我們的路線圖不只是一張即將推出的功能清單，它反映了我們對創新的承諾，以及我們與社群合作的決心。我們邀請您深入了解我們的路線圖、提供您的意見，並協助塑造 Milvus 的未來！</p>
<h2 id="Roadmap" class="common-anchor-header">路線圖<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><table>
    <thead>
        <tr>
            <th>類別</th>
            <th>Milvus 2.5.x (在最近的版本中實現)</th>
            <th>下一個版本 - Milvus 2.6 (CY25 中期)</th>
            <th>未來路線圖 - Milvus 3.0 (1年內)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI 驅動的非結構化資料處理</strong><br/><i>利用 AI 模型和先進技術強化處理和分析非結構化資料的能力</i></td>
            <td><strong>全文檢索</strong><br/><i>支援 Sparse-BM25 的全文檢索。新的 API 接受文本作為輸入，並在 Milvus 內自動生成稀疏向量</i><br/><br/><strong>Sparse Vector (GA)</strong><br/><i>支援稀疏向量的高效儲存和索引方法</i><br/></td>
            <td><strong>資料輸入與資料輸出</strong><br/><i>支援主要的模型服務以擷取原始文字</i><br/><br/><strong>進階重排器</strong><br/><i>支援基於模型的重排器以及使用者自訂的評分函數</i><br/><br/><strong>迭代搜尋</strong><br/><i>根據使用者標籤修改查詢向量</i></td>
            <td><strong>支援 Tensors</strong><br/><i>支援向量清單，典型用法如 Colbert、Copali 和視訊表示</i><br/><br/><strong>支援更多的資料類型</strong><br/> 例如<i>：Datetime、Map、GIS</i></td>
        </tr>
        <tr>
            <td><strong>搜尋品質與效能</strong><br/><i>透過最佳化架構、演算法與 API，提供精確、相關且快速的搜尋結果</i></td>
            <td><strong>文字匹配功能</strong><br/><i>在文字/varchar 中快速篩選關鍵字/</i><i>標籤</i><br/><br/><strong>增強群組搜尋</strong><br/><i>在混合搜尋中引入 group_size 並新增群組支援</i><br/><br/> 位圖<strong>索引與反向索引</strong><br/><i>加速標籤篩選</i></td>
            <td><strong>進階匹配</strong><br/><i>， </i>例如<i>phrase_match、multi_match </i><br/><br/><strong>分析器增強</strong><br/><i>增強分析器，擴大 tokenizer 支援，並改善可觀察性</i><br/><br/><strong>JSON 過濾</strong><br/><i>優化 JSON 索引和解析，以加快處理速度</i></td>
            <td><strong>排序能力</strong><br/><i>在執行過程中依標量欄位</i>排序<br/><br/><strong>支援資料群集</strong><br/><i>資料共址性</i></td>
        </tr>
        <tr>
            <td><strong>豐富的功能與管理</strong><br/><i>開發人員友善且強大的資料管理功能</i></td>
            <td><strong>在資料匯入中支援 csv 檔案</strong><br/><i>Bulkinsert 支援 csv 格式</i><br/><br/><strong>支援 Null 和 Default 值</strong><br/> Null<i>和 Default 類型使從其他 DBMS 匯入資料更容易</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>為 DBA 提供可視化管理工具</i></td>
            <td><strong>Schema Change</strong><br/> 例如<i>：新增/刪除欄位、修改 varchar 長度</i><br/><br/> Aggregations<br/><i>Scalar 欄位聚合，例如：count、distinct value、min、max</i><br/><br/><strong>支援 UDF</strong><br/><i>使用者自訂函式</i></td>
            <td><strong>批量更新</strong><br/><i>支援對特定欄位值的批量更新</i><br/><br/><strong>主</strong><i>索引</i><strong>鍵重複刪除</strong><br/><i>使用全局 pk 索引</i><br/><br/><strong>資料版本管理與還原</strong><br/><i>支援透過快照進行資料版本管理</i></td>
        </tr>
        <tr>
            <td><strong>成本效益與架構</strong><br/><i>具有穩定性、成本效益和簡化部署的最先進系統。</i></td>
            <td><strong>記憶體最佳化</strong><br/><i>減少 OOM 及增強負載</i><br/><br/><strong>集群壓縮</strong><br/><i>根據配置重新分配資料，以加速讀取效能</i><br/><br/><strong>儲存格式 V2 (Beta)</strong><br/><i>通用格式設計，為磁碟</i><strong>式</strong><i>資料存取奠定基礎</i></td>
            <td><strong>分層儲存</strong><br/><i>支援冷熱儲存以優化成本</i><br/><br/><strong>Stream Node</strong><br/><i>處理串流資料並簡化增量寫入流程</i><br/><br/><strong>MixCoord</strong><br/><i>將 Coord 邏輯合二為一</i></td>
            <td><strong>Vector Lake</strong><br/><i>具成本效益的離線解決方案，spark connector 並與 iceberg 整合</i><br/><br/><strong>Logstore Component</strong><br/><i>減少對 pulsar 等外部元件的依賴</i><br/><br/><strong>Data Evict Policy</strong><br/><i>使用者可自行定義驅逐</i><strong>政策</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>我們的路線圖通常分為三個部分：最近的版本、即將推出的下一個版本，以及未來一年內的中長期願景。</li>
<li>隨著我們的進展，我們會不斷學習並偶爾調整重點，視需要增加或移除項目。</li>
<li>這些計劃僅供參考，隨時可能變更，也可能因訂閱服務的不同而有所差異。</li>
<li>我們會堅定不移地遵循我們的路線圖，並以我們的<a href="/docs/zh-hant/release_notes.md">發行說明</a>做為參考。</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">如何貢獻<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>作為一個開源專案，Milvus依靠社區的貢獻而茁壯成長。以下是您如何參與我們的旅程。</p>
<h3 id="Share-feedback" class="common-anchor-header">分享回饋</h3><ul>
<li><p>問題報告：遇到錯誤或有建議？在我們的<a href="https://github.com/milvus-io/milvus/issues">GitHub 頁面上</a>開啟一個問題。</p></li>
<li><p>功能建議：對新功能或改進有想法？請加入<a href="https://github.com/milvus-io/milvus/discussions/40263">我們的討論主題</a>。</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">程式碼貢獻</h3><ul>
<li><p>拉取請求：直接向我們的<a href="https://github.com/milvus-io/milvus/pulls">程式碼庫貢獻</a>。無論是修正錯誤、新增功能或改善文件，我們都歡迎您的貢獻。</p></li>
<li><p>開發指南：查看我們的「<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">貢獻者指南」</a>，瞭解有關代碼<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">貢獻</a>的指引。</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">傳播</h3><ul>
<li><p>社群分享：喜歡 Milvus 嗎？在社交媒體和技術博客上分享您的使用案例和經驗。</p></li>
<li><p>在 GitHub 上星級我們：在我們的<a href="https://github.com/milvus-io/milvus">GitHub 儲存庫</a>上賦予星級來表示您的支持。</p></li>
</ul>
