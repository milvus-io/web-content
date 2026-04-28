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
    </button></h2><p>在 Milvus 中，您可以選擇一個集合使用多少個分片 - 每個分片映射到一個虛擬通道<em>(vchannel</em>)。如下圖所示，Milvus 會將每個<em>vchannel</em>指派給一個實體通道<em>(pchannel</em>)，而每個<em>pchannel</em>都會綁定到特定的 Streaming Node。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VChannel PChannel 和 StreamingNode</span> </span></p>
<p>資料驗證完成後，proxy 會依照指定的分片路由規則，將寫入的訊息分割成不同的資料包分片。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>通道 1</span> </span></p>
<p>然後將其中一個分片<em>(vchannel</em>) 的寫入資料傳送至<em>pchannel</em> 對應的 Streaming Node。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>寫入流程</span> </span></p>
<p>Streaming Node 會為每個資料封包指定一個 Timestamp Oracle (TSO)，以建立總的作業順序。在將資料寫入底層的預先寫入日誌 (WAL) 之前，它會對有效負載執行一致性檢查。一旦資料持久地承諾到 WAL，就保證不會遺失 - 即使發生當機，Streaming Node 也能重播 WAL，以完全恢復所有待執行的作業。</p>
<p>與此同時，StreamingNode 也會以非同步的方式，將已提交的 WAL 項目切成不連續的區段。有兩種區段類型：</p>
<ul>
<li><strong>Growing segment (成長中</strong>的<strong>區段</strong>)：任何尚未預先存入物件儲存空間的資料。</li>
<li><strong>密封區段</strong>：所有資料都已持久化到物件儲存空間，密封區段的資料是不可變的。</li>
</ul>
<p>成長區段轉換為封閉區段稱為 flush。當 Streaming Node 攝取並寫入該區段的所有可用 WAL 紀錄（即底層寫入日誌中沒有更多待寫紀錄）後，它會立即觸發 flush。</p>
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
    </button></h2><p>索引建立由資料節點執行。為了避免因資料更新而頻繁建立索引，Milvus 會將資料集進一步分割成區段，每個區段都有自己的索引。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>索引建立</span> </span></p>
<p>Milvus 支援為每個向量欄位、標量欄位和主要欄位建立索引。索引建立的輸入和輸出都與物件儲存有關：資料節點會將要建立索引的日誌快照從區段（位於物件儲存空間）載入記憶體，再將對應的資料和元資料反序列化以建立索引，當索引建立完成時，再將索引序列化，並將其寫回物件儲存空間。</p>
<p>索引建立主要涉及向量和矩陣運算，因此需要大量的運算和記憶體。向量因其高維度的特性，無法使用傳統的樹狀索引有效率地建立索引，但可以使用此領域較成熟的技術建立索引，例如群集或圖表索引。無論是哪一種類型，建立索引都會涉及到大規模向量的大量反覆計算，例如 Kmeans 或圖形遍歷。</p>
<p>與標量資料的索引不同，建立向量索引必須充分利用 SIMD (單指令、多資料) 加速。Milvus 天生就支援 SIMD 指令集，例如 SSE、AVX2 和 AVX512。鑑於向量索引建立的「打嗝」和資源密集性質，彈性對 Milvus 的經濟效益而言變得非常重要。未來的 Milvus 版本將進一步探索異質運算與無伺服器運算，以降低相關成本。</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>資料查詢</span> </span></p>
<p>Milvus 中的一個集合被分割成多個區段；Streaming Node 負載成長中的區段並維護即時資料，而 Query Nodes 負載封存的區段。</p>
<p>當查詢/搜尋請求到達時，代理會將請求廣播到所有負責相關分片的 Streaming 節點，以進行並行搜尋。</p>
<p>當查詢請求到達時，代理會同時請求持有相對應分片的串流節點執行搜尋。</p>
<p>每個 Streaming 節點會產生查詢計畫、搜尋其本機成長中的資料，並同時聯繫遠端查詢節點以擷取歷史結果，然後將這些結果彙總成單一分片結果。</p>
<p>最後，代理收集所有分片結果，將它們合併為最後的結果，並傳回給用戶端。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>移交</span> </span></p>
<p>當串流節點上的成長區段刷新成密封區段時，或資料節點完成壓縮時，協調器啟動交接作業，將成長中的資料轉換成歷史資料。然後，協調器將封閉區段平均分配到所有查詢節點，平衡記憶體使用量、CPU 開銷和區段數量，並釋放任何多餘的區段。</p>
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
