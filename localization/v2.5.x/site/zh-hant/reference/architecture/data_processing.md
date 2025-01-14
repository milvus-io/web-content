---
id: data_processing.md
summary: 瞭解 Milvus 的資料處理程序。
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
    </button></h1><p>本文將詳細介紹 Milvus 中資料插入、索引建立和資料查詢的實作。</p>
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
    </button></h2><p>您可以在 Milvus 中為每個集合指定若干個分片，每個分片對應一個虛擬通道<em>(vchannel</em>)。如下圖所示，Milvus 會為記錄中介中的每個 vchannel 指定一個實體通道<em>(pchannel</em>)。任何傳入的插入/刪除請求都會根據主鍵的哈希值路由到分片。</p>
<p>由於 Milvus 沒有複雜的交易，因此 DML 請求的驗證會轉移到代理。Proxy 會向 TSO（Timestamp Oracle）請求每次插入/刪除請求的時間戳記，TSO 是與根協調器共置的計時模組。隨著較舊的時間戳被較新的時間戳覆蓋，時間戳就被用來決定資料請求的處理順序。Proxy 從資料協調器分批擷取資訊，包括實體的區段和主鍵，以增加整體吞吐量，避免中央節點負擔過重。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>通道 1</span> </span></p>
<p>DML (資料處理語言) 作業和 DDL (資料定義語言) 作業都會寫入記錄順序，但 DDL 作業因為發生頻率低，所以只分配一個通道。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>通道 2</span> </span></p>
<p><em>V 通道</em>維護在底層的日誌中介節點中。每個通道在物理上是不可分割的，而且只供一個節點使用。當資料擷取率達到瓶頸時，請考慮兩件事：日誌中介節點是否負載過重而需要擴充，以及是否有足夠的分片來確保每個節點的負載平衡。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>寫入日誌順序</span> </span></p>
<p>上圖概括了寫入日誌順序過程中涉及的四個元件：代理、日誌經紀人、資料節點和物件儲存。此流程涉及四個任務：DML 請求的驗證、日誌順序的發佈-訂閱、從串流日誌轉換為日誌快照，以及日誌快照的持久化。這四項任務彼此解耦，以確保每項任務都由其對應的節點類型處理。相同類型的節點是平等的，可以彈性獨立擴充，以適應各種資料負載，尤其是大量且高度波動的串流資料。</p>
<h2 id="Index-building" class="common-anchor-header">索引建立<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>索引建立由索引節點執行。為了避免因資料更新而頻繁建立索引，Milvus 會將資料集進一步分割成區段，每個區段都有自己的索引。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>索引建立</span> </span></p>
<p>Milvus 支援為每個向量欄位、標量欄位和主要欄位建立索引。索引建立的輸入和輸出都與物件儲存有關：索引節點會將要建立索引的日誌快照從區段（位於物件儲存空間）載入記憶體，再將對應的資料和元資料反序列化以建立索引，當索引建立完成時，再將索引序列化，並將其寫回物件儲存空間。</p>
<p>索引建立主要涉及向量和矩陣操作，因此需要大量的運算和記憶體。向量因其高維度的特性，無法使用傳統的樹狀索引有效率地建立索引，但可以使用此領域較成熟的技術建立索引，例如群集或圖表索引。無論是哪種類型，建立索引都會涉及大規模向量的大量反覆計算，例如 Kmeans 或圖形遍歷。</p>
<p>與標量資料的索引不同，建立向量索引必須充分利用 SIMD (單指令、多資料) 加速。Milvus 天生就支援 SIMD 指令集，例如 SSE、AVX2 和 AVX512。鑑於向量索引建立的「打嗝」與資源密集性質，彈性對 Milvus 的經濟效益而言變得極為重要。未來的 Milvus 版本將進一步探索異質運算與無伺服器運算，以降低相關成本。</p>
<p>此外，Milvus 也支援標量篩選與主要欄位查詢。它有內建索引來提高查詢效率，例如 Bloom 過濾索引、hash 索引、樹狀索引和倒置索引，並計劃引入更多外部索引，例如位圖索引和粗略索引。</p>
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
    </button></h2><p>資料查詢是指在指定的集合中搜尋與目標向量最接近的<em>k 個</em>向量或與向量在指定距離範圍內的<em>所有</em>向量的過程。向量會連同其對應的主索引鍵及欄位一起傳回。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>資料查詢</span> </span></p>
<p>Milvus 中的一個集合被分割成多個區段，查詢節點按區段載入索引。當搜尋請求到達時，會廣播給所有查詢節點，以進行同步搜尋。然後，每個節點會修剪本機區段，搜尋符合條件的向量，並將搜尋結果還原和傳回。</p>
<p>在資料查詢中，查詢節點彼此獨立。每個節點只負責兩項任務：依照查詢協調器的指示載入或釋放區段；在本區段內進行搜尋。而代理則負責減少每個查詢節點的搜尋結果，並將最終結果傳回給用戶端。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>遞送</span> </span></p>
<p>區段有兩種類型，一種是成長中的區段 (用於增量資料)，另一種是封存的區段 (用於歷史資料)。查詢節點訂閱 vchannel，以接收最近的更新 (增量資料) 作為成長中的區段。當成長區段達到預先定義的臨界值時，資料協調器就會封鎖該區段，並開始建立索引。然後由查詢協調器啟動<em>交接</em>作業，將遞增資料轉換為歷史資料。查詢協調器會根據記憶體使用量、CPU 開銷和區段數量，將封存的區段平均分配給所有查詢節點。</p>
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
    </button></h2><ul>
<li>了解如何<a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">使用 Milvus 向量資料庫進行即時查詢</a>。</li>
<li>了解<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus 中的資料插入和資料持久化</a>。</li>
<li>瞭解<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus</a> 如何<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">處理資料</a>。</li>
</ul>
