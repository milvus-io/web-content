---
id: data_processing.md
summary: 了解 Milvus 中的資料處理流程。
title: 資料處理
---
<h1 id="Data-Processing" class="common-anchor-header">資料處理<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>本文詳細說明了 Milvus 中資料插入、索引建立及資料查詢的實作方式。</p>
<h2 id="Data-insertion" class="common-anchor-header">資料插入<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在 Milvus 中選擇集合使用的分片數量——每個分片會映射到一個虛擬通道（<em>vchannel</em>）。如下圖所示，Milvus 隨後會將每個<em>vchannel</em>指派給一個實體通道（<em>pchannel</em>），而每個<em>pchannel</em>則綁定至特定的串流節點。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel、PChannel 與串流節點</span>
  
 </span></p>
<p>在完成資料驗證後，代理程式會根據指定的分片路由規則，將寫入的訊息拆分為各分片的資料封包。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>通道 1</span>
  
 </span></p>
<p>接著，一個分片（<em>vchannel</em>）的寫入資料會被傳送至<em>pchannel</em> 對應的串流節點。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>寫入流程</span>
  
 </span></p>
<p>流式處理節點會為每個資料封包指派一個時間戳記預言機 (TSO)，以建立操作的總順序。它會在將資料寫入底層的預寫日誌 (WAL) 之前，對有效載荷進行一致性檢查。 一旦資料被持久化提交至 WAL，便保證不會遺失——即使發生當機，串流節點也能重播 WAL 以完全恢復所有待處理的操作。</p>
<p>與此同時，串流節點還會以非同步方式將已提交的 WAL 條目分割成獨立的區段。區段分為兩種類型：</p>
<ul>
<li><strong>增長型區段</strong>：任何尚未持久化至物件儲存的資料。</li>
<li><strong>已封存區段</strong>：所有資料均已持久化至物件儲存，已封存區段的資料不可變。</li>
</ul>
<p>增長分段轉變為密封分段的過程稱為「沖洗」。當串流節點已接收並寫入該分段的所有可用 WAL 條目後（即底層預寫日誌中不再有待處理的記錄時），便會立即觸發沖洗；此時，該分段即告完成並轉為讀取優化狀態。</p>
<h2 id="Index-building" class="common-anchor-header">索引建置<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>索引建構由資料節點執行。為避免因資料更新而頻繁建構索引，Milvus 中的集合會進一步劃分為多個區段，每個區段皆擁有專屬的索引。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>索引建立</span>
  
 </span></p>
<p>Milvus 支援針對每個向量欄位、標量欄位及主欄位建立索引。 索引建構的輸入與輸出皆涉及物件儲存：資料節點會將待建立索引的日誌快照（位於物件儲存中）載入記憶體，反序列化對應的資料與元資料以建立索引，並在索引建構完成後將其序列化，最後寫回物件儲存。</p>
<p>索引建構主要涉及向量與矩陣運算，因此屬於運算密集型與記憶體密集型作業。由於向量具有高維度的特性，無法透過傳統的樹狀索引進行高效索引，但可採用該領域中更成熟的技术，例如叢集式或圖式索引。 無論何種類型，針對大規模向量建立索引皆需進行大量迭代計算，例如 K-means 或圖遍歷。</p>
<p>與標量資料的索引建立不同，向量索引的建立必須充分利用 SIMD（單一指令、多資料）加速技術。Milvus 內建對 SIMD 指令集（例如 SSE、AVX2 及 AVX512）的支援。 鑑於向量索引建置過程中的「卡頓」現象及其資源密集型特性，從經濟角度來看，彈性對 Milvus 至關重要。未來的 Milvus 版本將進一步探索異質運算與無伺服器運算，以降低相關成本。</p>
<p>此外，Milvus 亦支援標量篩選與主欄位查詢。其內建多種索引以提升查詢效率，例如布隆濾波器索引、雜湊索引、樹狀索引及倒排索引，並計畫引入更多外部索引，例如位圖索引與粗略索引。</p>
<h2 id="Data-query" class="common-anchor-header">資料查詢<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>資料查詢是指在指定集合中搜尋<em>k</em>個與目標向量最近的向量，或搜尋<em>所有</em>與該向量距離在指定範圍內的向量的過程。查詢結果會一併返回向量及其對應的主鍵與欄位。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>資料查詢</span>
  
 </span></p>
<p>在 Milvus 中，一個集合會被分割成多個分區；串流節點負責載入正在增長的分區並維護即時資料，而查詢節點則負責載入已封存的分區。</p>
<p>當查詢／搜尋請求到達時，代理會將請求廣播至負責相關分片的 所有串流節點，以進行並行搜尋。</p>
<p>當查詢請求到達時，代理會同時向持有對應分片的流式處理節點發出請求，以執行搜尋。</p>
<p>每個串流節點會生成一個查詢計畫，搜尋其本地的增長中資料，並同時聯繫遠端的查詢節點以檢索歷史結果，然後將這些結果彙總為單一分片結果。</p>
<p>最後，代理程式收集所有分片結果，將其合併為最終結果，並將其傳回給客戶端。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>交接</span>
  
 </span></p>
<p>當流式處理節點上的增長區段被沖洗到密封區段中時——或者當資料節點完成緊湊化時——協調器會啟動交接操作，將該增長資料轉換為歷史資料。 接著，協調器會將已封存的分段均勻分發至所有查詢節點，同時平衡記憶體使用量、CPU 開銷及分段數量，並釋放任何冗餘的分段。</p>
<h2 id="Whats-next" class="common-anchor-header">接下來<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>瞭解如何<a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">使用 Milvus 向量資料庫進行即時查詢</a>。</li>
<li>瞭解<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus 中的資料插入與資料持久化</a>。</li>
<li>瞭解<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus 中的資料處理</a>方式。</li>
</ul>
