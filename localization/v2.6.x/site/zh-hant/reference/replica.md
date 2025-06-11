---
id: replica.md
summary: 瞭解 Milvus 中的記憶體內複製。
title: 記憶體內複製
---
<h1 id="In-Memory-Replica" class="common-anchor-header">記憶體內複製<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 的記憶體內複製（複製）機制，可在工作記憶體中實現多段複製，以提高性能和可用性。</p>
<p>有關如何配置記憶體內複製的資訊，請參閱<a href="/docs/zh-hant/configure_querynode.md#queryNodereplicas">查詢節點相關配置</a>。</p>
<h2 id="Overview" class="common-anchor-header">概觀<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>複製可用性</span> </span></p>
<p>使用記憶體內複製，Milvus 可以在多個查詢節點上載入相同的資料段。如果一個查詢節點失敗或忙於處理目前的搜尋請求，當另一個查詢節點到達時，系統可以將新的請求傳送到擁有相同網段複製的閒置查詢節點。</p>
<h3 id="Performance" class="common-anchor-header">效能</h3><p>內存複製可讓您充分利用額外的 CPU 和記憶體資源。如果您的資料集相對較小，但希望利用額外的硬體資源增加讀取吞吐量，這將非常有用。整體 QPS（每秒查詢次 數）和吞吐量可大幅提升。</p>
<h3 id="Availability" class="common-anchor-header">可用性</h3><p>如果查詢節點崩潰，記憶體內複製可幫助 Milvus 更快地恢復。當一個查詢節點失敗時，資料段不需要重新載入另一個查詢節點。相反地，搜尋要求可立即重新載入新的查詢節點，而無需再次重新載入資料。由於同時維護多個網段複本，系統在面臨故障轉移時會更有彈性。</p>
<h2 id="Key-Concepts" class="common-anchor-header">關鍵概念<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>記憶體複製以複製群組的方式組織。每個複製群組包含<a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">分片</a>複製。每個 shard 複製本都有一個串流複製本和一個歷史複製本，這兩個複製本對應於 shard（即 DML 通道）中成長和封閉的<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">區段</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>記憶體內複製如何運作的說明</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">複製群組</h3><p>複製群組由負責處理歷史資料和複製的多個<a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">查詢節點</a>組成。</p>
<h3 id="Shard-replica" class="common-anchor-header">分片複製</h3><p>一個分片複製本由一個串流複製本和一個歷史複製本組成，兩者都屬於同一<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">個分片</a>。複製群組中的分片複製品數量由指定集合中的分片數量決定。</p>
<h3 id="Streaming-replica" class="common-anchor-header">串流複製本</h3><p>串流複製包含來自相同 DML 通道的所有<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">成長區段</a>。技術上來說，一個串流複製應該只由一個複製中的一個查詢節點提供服務。</p>
<h3 id="Historical-replica" class="common-anchor-header">歷史副本</h3><p>歷史副本包含來自相同 DML 通道的所有封存區段。一個歷史副本的封存區段可以分佈在同一個副本群組內的多個查詢節點上。</p>
<h3 id="Shard-leader" class="common-anchor-header">分片領導者</h3><p>分片領導者是為分片複製中的串流複製提供服務的查詢節點。</p>
<h2 id="Design-Details" class="common-anchor-header">設計細節<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">平衡</h3><p>需要載入的新區段將分配給多個不同的查詢節點。只要成功載入至少一個副本，就可以處理搜尋要求。</p>
<h3 id="Search" class="common-anchor-header">搜尋</h3><h4 id="Cache" class="common-anchor-header">快取記憶體</h4><p>代理維護一個快取記憶體，將區段對應到查詢節點，並定期更新。當代理收到請求時，Milvus 會從快取記憶體取得所有需要搜尋的封存區段，並嘗試平均分配給查詢節點。</p>
<p>對於成長中的網段，proxy 也會維護通道到查詢節點的快取記憶體，並將要求傳送至對應的查詢節點。</p>
<h4 id="Failover" class="common-anchor-header">故障轉換</h4><p>代理伺服器上的快取記憶體並非總是最新的。當請求傳入時，有些網段或頻道可能已移到其他查詢節點。在這種情況下，代理伺服器會收到錯誤回應，更新快取記憶體，並嘗試將其指派給其他查詢節點。</p>
<p>如果代理在更新快取記憶體後仍然找不到某個區段，該區段就會被忽略。如果網段已被壓縮，就可能發生這種情況。</p>
<p>如果快取記憶體不精確，代理可能會遺漏某些區段。具備 DML 通道 (成長中的區段) 的查詢節點會傳回搜尋回應以及可靠的區段清單，讓代理可以比較和更新快取記憶體。</p>
<h3 id="Enhancement" class="common-anchor-header">增強</h3><p>代理無法完全平均分配搜尋要求給查詢節點，而且查詢節點可能有不同的資源來提供搜尋要求。為了避免資源的長尾分派，proxy 會將其他查詢節點上的有效網段分派給同樣擁有這些網段的閒置查詢節點。</p>
