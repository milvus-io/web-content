---
id: woodpecker_architecture.md
title: 啄木鳥
summary: >-
  Woodpecker 是 Milvus 2.6 中的雲原生 WAL
  系統。憑藉零磁碟架構和兩種部署模式，它可在物件儲存上提供高吞吐量、低操作開銷和無縫擴充能力。
---
<h1 id="Woodpecker" class="common-anchor-header">啄木鳥<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 2.6 中，Woodpecker 取代 Kafka 和 Pulsar，成為專為雲端原生的先寫日誌 (WAL) 系統。Woodpecker 專為物件儲存而設計，可簡化作業、最大化吞吐量，並輕鬆擴充。</p>
<p>Woodpecker 的設計目標：</p>
<ul>
<li><p>雲端環境中的最高吞吐量</p></li>
<li><p>可靠復原的持久、僅附加記錄</p></li>
<li><p>無需本機磁碟或外部經紀人，可將作業開銷降至最低</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">零磁碟架構<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 的核心創新是其零磁碟架構：</p>
<ul>
<li>所有日誌資料都儲存在雲端物件儲存（例如 Amazon S3、Google Cloud Storage 或 Alibaba OS）</li>
<li>透過分散式鍵值儲存<strong>（</strong>如<strong>etcd）</strong>管理元資料</li>
<li>核心作業不需依賴本機磁碟</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>啄木鳥層級</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">架構元件<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>標準的 Woodpecker 部署包括以下元件：</p>
<ul>
<li><strong>用戶端</strong>：用於發出讀寫請求的介面層</li>
<li><strong>LogStore</strong>：管理高速寫入緩衝、異步上傳存儲和日誌壓縮</li>
<li><strong>儲存後端</strong>：支援可擴充、低成本的儲存服務，例如 S3、GCS 及檔案系統 (例如 EFS)</li>
<li><strong>Etcd</strong>：在分散式節點間儲存元資料並協調日誌狀態</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">部署模式<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 提供兩種部署模式，以符合您的特定需求：</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 輕量且免於維護</h3><p>MemoryBuffer 模式提供了一個簡單、輕量的部署選項，Woodpecker 的嵌入式用戶端會在記憶體中暫時緩衝寫入的內容，並定期將其刷新至雲端物件儲存服務。在此模式下，記憶體緩衝直接嵌入客戶端，在刷新到 S3 之前實現了高效的批次處理。元資料使用<strong>etcd</strong>管理，以確保一致性和協調性。此模式最適合用於較小規模部署中的批次繁重工作負載，或將簡單性置於效能之上的生產環境，尤其是在低寫入延遲並非關鍵的情況下。此模式的寫入延遲一般在 200-500 毫秒之間。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鳥記憶體模式部署</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - 優化為低延遲、高耐用性</h3><p>QuorumBuffer 模式專為對延遲敏感的高頻率讀/寫工作負載而設計，這些工作負載同時需要實時的回應能力和強大的容錯能力。在此模式下，Woodpecker 的用戶端會與三個副本的 quorum 系統互動，以提供高速寫入緩衝，並透過分散式共識確保強大的一致性和高可用性。</p>
<p>一旦用戶端成功將資料複製到三個法定節點中的至少兩個，即視為寫入成功，通常在個位數毫秒內完成，之後，資料會以非同步方式刷新到雲端物件儲存空間，以獲得長期耐用性。此架構可將節點上的狀態降至最低，不需要大型本機磁碟區，並避免傳統法定人數系統常見的複雜反熵修復。</p>
<p>結果是一個簡化、穩健的 WAL 層，非常適合對一致性、可用性和快速復原要求極高的關鍵任務生產環境。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鸟法定人数模式部署</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能基準<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我們執行了全面的基準來評估 Woodpecker 在單結點、單用戶端、單記錄流設定中的效能。與 Kafka 和 Pulsar 相比，結果令人印象深刻：</p>
<table>
<thead>
<tr><th>系統</th><th>卡夫卡</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>吞吐量</td><td>129.96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>延遲</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1.8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>為了說明情況，我們在測試機器上測量了不同儲存後端的理論吞吐量限制：</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>本機檔案系統：600-750 MB/s</li>
<li>Amazon S3（單個 EC2 實例）：高達 1.1 GB/秒</li>
</ul>
<p>值得注意的是，Woodpecker 對於每個後端都持續達到最大可能吞吐量的 60-80%，對於中介軟體來說，這是一個非凡的效率水準。</p>
<h3 id="Key-performance-insights" class="common-anchor-header">關鍵性能洞察</h3><ul>
<li>本地檔案系統模式：Woodpecker 的速度達到 450 MB/s，比 Kafka 快 3.5 倍，比 Pulsar 快 4.2 倍，超低延遲僅為 1.8 ms，非常適合高效能單節點部署。</li>
<li>雲端儲存模式 (S3)：直接寫入 S3 時，Woodpecker 達到 750 MB/s（約為 S3 理論極限的 68%），比 Kafka 高 5.8 倍，比 Pulsar 高 7 倍。雖然延遲較高 (166 毫秒)，但此設定可為面向批次的工作負載提供優異的吞吐量。</li>
<li>物件儲存模式 (MinIO)：即使使用 MinIO，Woodpecker 也能達到 71 MB/s，約為 MinIO 容量的 65%。此性能可與 Kafka 和 Pulsar 媲美，但對資源的需求明顯較低。</li>
</ul>
<p>Woodpecker 特別針對並發、大容量寫入進行了優化，在這種情況下，維持順序至關重要。而這些結果只反映出開發的早期階段 - 在 I/O 合併、智慧緩衝和預取方面持續進行的最佳化，可望讓效能更接近理論極限。</p>
<h2 id="Operational-benefits" class="common-anchor-header">營運效益<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 的雲原生架構提供了顯著的營運優勢：</p>
<ul>
<li><strong>零本機儲存管理</strong>：消除磁碟卷管理、RAID 配置和硬體故障</li>
<li><strong>自動擴充</strong>：儲存空間可隨雲端物件儲存擴充，無需容量規劃</li>
<li><strong>成本效益</strong>：隨用隨付的儲存空間，可自動分層與壓縮</li>
<li><strong>高可用性</strong>：利用雲端供應商的 11-nines 耐用性與快速復原</li>
<li><strong>簡化部署</strong>：兩種部署模式 (MemoryBuffer/QuorumBuffer) 符合不同的作業需求</li>
<li><strong>開發人員友善</strong>：更快的環境設定，所有環境的架構一致</li>
</ul>
<p>這些優勢讓 Woodpecker 對於關鍵任務的 RAG、AI 代理和低延遲搜尋工作負載特別有價值，在這些工作負載中，作業簡單性與效能同樣重要。</p>
