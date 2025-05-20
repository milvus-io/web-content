---
id: comparison.md
title: 比較
summary: 本文將比較 Milvus 與其他向量搜尋解決方案。
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">比較 Milvus 與其他選擇<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>在探索各種向量資料庫選項時，這份全面的指南將協助您瞭解 Milvus 的獨特功能，確保您選擇最適合您特定需求的資料庫。值得注意的是，Milvus 是領先的開放原始碼向量資料庫，<a href="https://zilliz.com/cloud">Zilliz Cloud</a>提供全面管理的 Milvus 服務。若要客觀評估 Milvus 與其競爭對手的差異，請考慮使用<a href="https://github.com/zilliztech/VectorDBBench#quick-start">基準工具</a>來分析效能指標。</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Milvus 的重點<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>功能性</strong>：Milvus 支援<a href="https://milvus.io/docs/sparse_vector.md">稀疏</a>向量、<a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">大量</a>向量、<a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">篩選搜尋</a>和<a href="https://milvus.io/docs/multi-vector-search.md">混合搜尋</a>功能等進階功能，超越了基本向量相似性搜尋的範圍。</p></li>
<li><p><strong>彈性</strong>：Milvus 適合各種部署模式和多種 SDK，所有這些都在一個強大、整合的生態系統中。</p></li>
<li><p><strong>效能</strong>：Milvus 透過<a href="https://milvus.io/docs/index.md#HNSW">HNSW</a>和<a href="https://milvus.io/docs/disk_index.md">DiskANN</a> 等最佳化索引演算法，以及先進的<a href="https://milvus.io/docs/gpu_index.md">GPU 加速</a>，保證以高吞吐量和低延遲進行即時處理。</p></li>
<li><p><strong>可擴充性</strong>：其訂製的分散式架構可輕鬆擴充，從小型資料集到超過 100 億向量的資料集合，皆可應付自如。</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">整體比較<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>為了比較 Milvus 和 Pinecone 這兩種向量資料庫解決方案，以下表格的結構突顯了各種功能的差異。</p>
<table>
<thead>
<tr><th>特徵</th><th>Pinecone</th><th>Milvus</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>部署模式</td><td>僅 SaaS</td><td>Milvus Lite、On-prem Standalone &amp; Cluster、Zilliz Cloud Saas &amp; BYOC</td><td>Milvus 提供更靈活的部署模式。</td></tr>
<tr><td>支援的 SDK</td><td>Python、JavaScript/TypeScript</td><td>Python, Java, NodeJS, Go, Restful API, C#, Rust</td><td>Milvus 支援更多的程式語言。</td></tr>
<tr><td>開源狀態</td><td>關閉</td><td>開放源碼</td><td>Milvus 是一個廣受歡迎的開放原始碼向量資料庫。</td></tr>
<tr><td>擴充性</td><td>僅向上/向下擴充</td><td>縮放/縮入與放大/縮小</td><td>Milvus 採用分散式架構以增強擴充能力。</td></tr>
<tr><td>可用性</td><td>可用區域內的 Pod 架構</td><td>可用區域故障移轉和跨區域 HA</td><td>Milvus CDC (變更資料擷取) 可實現主用/備用模式，以提高可用性。</td></tr>
<tr><td>效能成本 (每百萬次查詢)</td><td>中型資料集 0.178 美元起，大型資料集 1.222 美元起</td><td>Zilliz Cloud 中型資料集起價為 0.148 美元，大型資料集起價為 0.635 美元；提供免費版本。</td><td>請參閱<a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">成本排名報告</a>。</td></tr>
<tr><td>GPU 加速</td><td>不支援</td><td>支援 NVIDIA GPU</td><td>GPU 加速可大幅提升效能，通常可提升幾個數量級。</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">術語比較<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>雖然兩者的向量資料庫功能類似，但 Milvus 與 Pinecone 在特定領域的術語上略有不同。詳細的術語比較如下。</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>索引</td><td><a href="https://zilliz.com/comparison">收集</a></td><td>在 Pinecone 中，索引是儲存和管理相同大小向量的組織單位，這個索引與硬體（稱為 Pods）緊密結合。相比之下，Milvus 的集合具有類似的目的，但可以在單一實例中處理多個集合。</td></tr>
<tr><td>集合</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">備份</a></td><td>在 Pinecone 中，集合基本上是索引的靜態快照，主要用於備份目的，且無法查詢。在 Milvus 中，建立備份的等效功能更透明，命名也更直接。</td></tr>
<tr><td>命名空間</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">分割鍵</a></td><td>命名空間允許把索引中的向量分割成子集。Milvus 提供多種方法，如分割或分割鍵，以確保在一個集合內有效的資料隔離。</td></tr>
<tr><td>元資料</td><td><a href="https://milvus.io/docs/boolean.md">標量欄位</a></td><td>Pinecone 的元資料處理依賴於 key-value 對，而 Milvus 則允許複雜的標量欄位，包括標準資料類型和動態 JSON 欄位。</td></tr>
<tr><td>查詢</td><td><a href="https://milvus.io/docs/single-vector-search.md">搜尋</a></td><td>用來尋找指定向量最近鄰的方法名稱，可能還會在上面套用一些額外的篩選條件。</td></tr>
<tr><td>不可用</td><td><a href="https://milvus.io/docs/with-iterators.md">迭代器</a></td><td>Pinecone 缺乏迭代索引中所有向量的功能。Milvus 引入了 Search Iterator 和 Query Iterator 方法，增強了跨資料集的資料檢索能力。</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">能力比較<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
<tr><th>能力比較</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>部署模式</td><td>僅 SaaS</td><td>Milvus Lite、On-prem Standalone &amp; Cluster、Zilliz Cloud Saas &amp; BYOC</td></tr>
<tr><td>嵌入功能</td><td>不可用</td><td>支援<a href="https://github.com/milvus-io/milvus-model">pymilvus[model］</a></td></tr>
<tr><td>資料類型</td><td>字串、數字、Bool、字串清單</td><td>字串、VarChar、Number (Int、Float、Double)、Bool、陣列、JSON、浮點向量、二進制向量、BFloat16、Float16、稀疏向量</td></tr>
<tr><td>度量與索引類型</td><td>Cos, Dot, Euclidean<br/>P-family, S-family</td><td>Cosine, IP (Dot), L2 (Euclidean), Hamming, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, GPU 索引</td></tr>
<tr><td>模式設計</td><td>彈性模式</td><td>彈性模式、嚴格模式</td></tr>
<tr><td>多重向量欄位</td><td>不適用</td><td>多向量與混合搜尋</td></tr>
<tr><td>工具</td><td>資料集、文字工具、Spark 連接器</td><td>Attu、Birdwatcher、Backup、CLI、CDC、Spark 和 Kafka 連結器</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">主要觀點</h3><ul>
<li><p><strong>部署模式</strong>：Milvus 提供多種部署選項，包括本機部署、Docker、Kubernetes on-premises、雲端 SaaS，以及針對企業的自帶雲端 (BYOC)，而 Pinecone 則僅限於 SaaS 部署。</p></li>
<li><p><strong>嵌入功能</strong>：Milvus 支援額外的嵌入函式庫，可直接使用嵌入模型將源資料轉換為向量。</p></li>
<li><p><strong>資料類型</strong>：Milvus 支援的資料類型比 Pinecone 更廣泛，包括陣列和 JSON。Pinecone 只支援以字串、數字、布林值或字串清單為值的平面元資料結構，而 Milvus 可以處理 JSON 欄位內的任何 JSON 物件，包括巢狀結構。Pinecone 限制每個向量的元資料大小為 40KB。</p></li>
<li><p><strong>度量和索引類型</strong>：Milvus 支援多種公制和索引類型，以滿足各種使用情況，而 Pinecone 的選擇則較為有限。在 Milvus 中，向量的索引是強制性的，而 AUTO_INDEX 選項則可簡化設定流程。</p></li>
<li><p><strong>模式設計</strong>：Milvus 為模式設計提供彈性的<code translate="no">create_collection</code> 模式，包括快速設定動態模式，提供類似 Pinecone 的無模式體驗，以及自訂設定預定義的模式欄位和索引，類似關聯式資料庫管理系統 (RDBMS)。</p></li>
<li><p><strong>多重向量欄位</strong>：Milvus 可在單一集合中儲存多個向量欄位，這些欄位可以是稀疏或密集的，而且維度可能會有所不同。Pinecone 並未提供類似的功能。</p></li>
<li><p><strong>工具</strong>：Milvus 為資料庫管理和使用提供了更廣泛的工具選擇，例如 Attu、Birdwatcher、Backup、CLI、CDC 以及 Spark 和 Kafka Connector。</p></li>
</ul>
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
<li><p><strong>試用</strong>：從 Milvus<a href="https://milvus.io/docs/quickstart.md">quickstart</a>或<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">註冊 Zilliz Cloud</a> 開始，親身體驗 Milvus。</p></li>
<li><p><strong>瞭解更多</strong>：透過我們全面的<a href="/docs/zh-hant/glossary.md">術語及</a> <a href="https://milvus.io/docs/manage-collections.md">使用者指南</a>，深入瞭解 Milvus 的功能。</p></li>
<li><p><strong>探索替代方案</strong>：如需對向量資料庫選項進行更廣泛的比較，請探索<a href="https://zilliz.com/comparison">此頁面上</a>的其他資源。</p></li>
</ul>
