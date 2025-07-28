---
id: product_faq.md
summary: 尋找關於全球最先進向量資料庫常見問題的答案。
title: 產品常見問題
---
<h1 id="Product-FAQ" class="common-anchor-header">產品常見問題<button data-href="#Product-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-much-does-Milvus-cost" class="common-anchor-header">Milvus 的成本是多少？</h4><p>Milvus 是一個 100% 免費的開源專案。</p>
<p>當使用 Milvus 作生產或發行用途時，請遵守<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>。</p>
<p>Milvus 背後的公司 Zilliz 也提供完全管理雲端版本的平台，給那些不想建立和維護自己的分散式實例的人。<a href="https://zilliz.com/cloud">Zilliz Cloud</a>會自動維護資料的可靠性，並允許使用者只需為他們所使用的付費。</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">Milvus 支援非 x86 架構嗎？</h4><p>Milvus 不能在非 x86 平台上安裝或運行。</p>
<p>您的 CPU 必須支援下列指令集之一才能執行 Milvus：SSE4.2、AVX、AVX2、AVX512。這些都是 x86 專用的 SIMD 指令集。</p>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">Milvus 在哪裡儲存資料？</h4><p>Milvus 處理兩種類型的資料，插入資料和元資料。</p>
<p>插入的資料，包括向量資料、標量資料和特定於集合的模式，會以增量日誌的方式儲存於持久性儲存空間。Milvus 支援多種物件儲存後端，包括<a href="https://min.io/">MinIO</a>、<a href="https://aws.amazon.com/s3/?nc1=h_ls">AWS S3</a>、<a href="https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes">Google Cloud Storage</a>(GCS)、<a href="https://azure.microsoft.com/en-us/products/storage/blobs">Azure Blob Storage</a>、<a href="https://www.alibabacloud.com/product/object-storage-service">阿里雲 OSS</a> <a href="https://www.tencentcloud.com/products/cos">及騰訊 Cloud Object Storage</a>(COS)。</p>
<p>Metadata 在 Milvus 內產生。每個 Milvus 模組都有自己的元資料，並儲存在 etcd 中。</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">為什麼 etcd 中沒有向量資料？</h4><p>etcd 儲存 Milvus 模組元資料；MinIO 儲存實體。</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">Milvus 支援同時插入和查詢資料嗎？</h4><p>是的。插入作業和查詢作業由兩個獨立的模組處理，它們是相互獨立的。從客戶端的角度來看，當插入的資料進入訊息佇列時，插入作業就完成了。但是，插入的資料在載入查詢節點之前是無法查詢的。對於具有增量資料的成長區段，Milvus 會自動建立臨時索引，以確保有效率的搜尋效能，即使區段大小未達到索引建立臨界值 (計算方式為<code translate="no">dataCoord.segment.maxSize</code> ×<code translate="no">dataCoord.segment.sealProportion</code>)。您可以透過<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L440">Milvus 設定檔</a>中的設定參數<code translate="no">queryNode.segcore.interimIndex.enableIndex</code> 控制此行為 - 設定為<code translate="no">true</code> 會啟用臨時索引（預設），而設定為<code translate="no">false</code> 則會停用。</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">主鍵重複的向量可以插入 Milvus 嗎？</h4><p>可以。Milvus 不會檢查向量的主索引鍵是否重複。</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">當插入有重複主鍵的向量時，Milvus 會把它當作更新操作嗎？</h4><p>Milvus 目前不支持更新操作，也不檢查實體主鍵是否重複。您有責任確保實體的主索引鍵是唯一的，如果它們不是唯一的，Milvus 可能包含多個具有重複主索引鍵的實體。</p>
<p>如果發生這種情況，查詢時將返回哪個資料副本仍是未知行為。此限制將在未來的版本中修復。</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">自定義實體主鍵的最大長度是多少？</h4><p>實體主鍵必須是非負 64 位元整數。</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">每次插入操作可新增的最大資料量是多少？</h4><p>插入操作的大小不得超過 1,024 MB。這是 gRPC 施加的限制。</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">在特定分區中搜尋時，集合大小會影響查詢效能嗎？</h4><p>如果指定了搜索的分區，Milvus 只搜索指定的分區。</p>
<h4 id="Does-Milvus-need-to-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">當指定搜尋的分區時，Milvus 是否需要載入整個資料集？</h4><p>這取決於搜尋需要哪些資料。所有可能出現在搜尋結果的磁碟分割都必須在搜尋前載入。</p>
<ul>
<li>例如，如果您只想搜尋特定的分割區，就不需要載入全部。呼叫<code translate="no">load_partition()</code> 載入想要的磁碟分割<em>，然後在</em> <code translate="no">search()</code> 方法呼叫中指定磁碟分割。</li>
<li>如果要搜尋所有磁碟分割，請呼叫<code translate="no">load_collection()</code> 載入整個集合，包括所有磁碟分割。</li>
<li>如果您在搜尋之前沒有載入資料集或特定的分割區，Milvus 會返回錯誤。</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">插入向量後可以建立索引嗎？</h4><p>是的。如果之前<code translate="no">create_index()</code> 已經為一個集合建立了索引，Milvus 會自動為隨後插入的向量建立索引。然而，Milvus 在新插入的向量填滿整個區段之前不會建立索引，而且新建立的索引檔案與之前的檔案是分開的。</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">FLAT 和 IVF_FLAT 索引有什麼不同？</h4><p>IVF_FLAT 索引將向量空間分為列表簇。在預設的列表值為 16,384 時，Milvus 會比較目標向量與所有 16,384 個簇的中心點之間的距離，以回傳探針最近的簇。接著，Milvus 會比較目標向量和選取的叢集中向量之間的距離，以得到最近的向量。與 IVF_FLAT 不同，FLAT 直接比較目標向量與其他向量之間的距離。</p>
<p>當向量的總數大約等於 nlist 時，IVF_FLAT 和 FLAT 在計算需求和搜尋效能上的距離不大。然而，當向量的數量超過 nlist 的兩倍以上時，IVF_FLAT 就開始展現出效能優勢。</p>
<p>更多資訊請參閱<a href="/docs/zh-hant/index.md">向量索引</a>。</p>
<h4 id="How-does-Milvus-flush-data" class="common-anchor-header">Milvus 如何刷新資料？</h4><p>當插入的資料被攝取到訊息佇列時，Milvus 會返回成功。然而，資料尚未刷新到磁碟。然後 Milvus 的資料節點會將訊息佇列中的資料以增量日誌的方式寫入持久性儲存空間。如果呼叫<code translate="no">flush()</code> ，資料節點會被強制立即將訊息佇列中的所有資料寫入持久性儲存空間。</p>
<h4 id="What-is-normalization-Why-is-normalization-needed" class="common-anchor-header">什麼是規範化？為什麼需要規範化？</h4><p>規範化是指轉換向量使其規範等於 1 的過程。如果使用內積來計算向量相似性，向量就必須歸一化。歸一化之後，內積等於余弦相似度。</p>
<p>更多資訊請參閱<a href="https://en.wikipedia.org/wiki/Unit_vector">維基百科</a>。</p>
<h4 id="Why-do-Euclidean-distance-L2-and-inner-product-IP-return-different-results" class="common-anchor-header">為什麼 Euclidean distance (L2) 和 inner product (IP) 會傳回不同的結果？</h4><p>對於規範化向量，歐氏距離 (L2) 在數學上等於內乘積 (IP)。如果這些相似度指標返回不同的結果，請檢查您的向量是否已歸一化</p>
<h4 id="Is-there-a-limit-to-the-total-number-of-collections-and-partitions-in-Milvus" class="common-anchor-header">Milvus 的集合和分區總數有限制嗎？</h4><p>有。您最多可以在一個 Milvus 實例中建立 65,535 個集合。在計算現有集合的數量時，Milvus 會計算所有包含分片和分區的集合。</p>
<p>例如，假設您已經建立了 100 個集合，其中 60 個集合有 2 個分塊和 4 個磁碟分割，其餘 40 個集合有 1 個分塊和 12 個磁碟分割。目前的集合數量可計算為</p>
<pre><code translate="no">60 * 2 * 4 + 40 * 1 * 12 = 960
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors" class="common-anchor-header">搜尋<code translate="no">topk</code> 向量時，為何得到的向量少於 k 個？</h4><p>在 Milvus 支援的索引中，IVF_FLAT 和 IVF_SQ8 實作 k-means 聚類方法。一個資料空間會被分割成<code translate="no">nlist</code> 叢集，而插入的向量會分佈到這些叢集中。然後，Milvus 選擇<code translate="no">nprobe</code> 最近的簇，比較目標向量與所選簇中所有向量的距離，並傳回最後的結果。</p>
<p>如果<code translate="no">nlist</code> 和<code translate="no">topk</code> 較大，而 nprobe 較小，則 nprobe 叢集中的向量數目可能會少於<code translate="no">k</code> 。因此，當您搜尋<code translate="no">topk</code> 最近的向量時，返回的向量數目會少於<code translate="no">k</code> 。</p>
<p>要避免這種情況，請嘗試將<code translate="no">nprobe</code> 設得大一些，將<code translate="no">nlist</code> 和<code translate="no">k</code> 設得小一些。</p>
<p>更多資訊請參閱<a href="/docs/zh-hant/index.md">向量索引</a>。</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">Milvus 支援的最大向量維度是多少？</h4><p>Milvus 預設最多可以管理 32,768 維度的向量。您可以增加<code translate="no">Proxy.maxDimension</code> 的值，以允許更大維度的向量。</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">Milvus 支援 Apple M1 CPU 嗎？</h4><p>目前的 Milvus 版本不直接支援蘋果 M1 CPU。Milvus 2.3 之後，Milvus 提供 ARM64 架構的 Docker 映像檔。</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">Milvus 的主鍵欄位支援哪些資料類型？</h4><p>在目前的版本中，Milvus 支援 INT64 和字串。</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">Milvus 是否可擴充？</h4><p>是的，您可以透過 Kubernetes 上的 Helm Chart 部署多個節點的 Milvus 集群。更多說明，請參考<a href="/docs/zh-hant/scaleout.md">Scale Guide</a>。</p>
<h4 id="What-are-growing-segment-and-sealed-segment" class="common-anchor-header">什麼是 Growing segment 和 sealed segment？</h4><p>當有搜尋要求時，Milvus 會同時搜尋增量資料和歷史資料。增量資料是最近的更新，它們儲存在成長中的區段中，在它們達到要持久化到物件儲存的臨界值之前，這些區段會在記憶體中緩衝，並為它們建立更有效率的索引；而歷史資料是一段時間前的更新。歷史資料則是前一陣子的更新，它們位於已持久化到物件儲存空間的封存區段中。增量資料和歷史資料共同構成搜尋的整個資料集。這樣的設計使得任何輸入到 Milvus 的資料都可以立即搜尋。對於 Milvus Distributed 而言，有更多複雜的因素決定剛擷取的記錄何時可以顯示在搜尋結果中。了解更多關於<a href="https://milvus.io/docs/consistency.md">一致性層級</a>的細節。</p>
<h4 id="Is-Milvus-available-for-concurrent-search" class="common-anchor-header">Milvus 是否可用於並發搜尋？</h4><p>是的。對於同一個資料集的查詢，Milvus 可以同時搜尋增量和歷史資料。但是，對不同集合的查詢是串聯進行的。而歷史資料可能是一個極為龐大的資料集，在歷史資料上的搜尋相對地更耗費時間，基本上是串聯進行的。</p>
<h4 id="Why-does-the-data-in-MinIO-remain-after-the-corresponding-collection-is-dropped" class="common-anchor-header">為什麼 MinIO 中的資料在相對應的資料集被刪除後仍會保留？</h4><p>MinIO 中的資料被設計成保留一段時間，以方便資料回滾。</p>
<h4 id="Does-Milvus-support-message-engines-other-than-Pulsar" class="common-anchor-header">Milvus 支援 Pulsar 以外的訊息引擎嗎？</h4><p>是的。Milvus 2.1.0 支援 Kafka。</p>
<h4 id="Whats-the-difference-between-a-search-and-a-query" class="common-anchor-header">搜尋與查詢有什麼不同？</h4><p>在 Milvus 中，向量相似性搜尋是根據相似性計算和向量索引加速來擷取向量。與向量相似性搜尋不同，向量查詢是透過基於布林表達式的標量篩選來擷取向量。布林表達式會對標量欄位或主要關鍵欄位進行篩選，並擷取符合篩選條件的所有結果。在查詢中，既不涉及相似度指標，也不涉及向量索引。</p>
<h4 id="Why-does-a-float-vector-value-have-a-precision-of-7-decimal-digits-in-Milvus" class="common-anchor-header">為什麼在 Milvus 中，浮點向量值的精確度是小數點後 7 位數？</h4><p>Milvus 支援將向量儲存為 Float32 陣列。Float32 值的精確度是小數點後 7 位數。即使是 Float64 值，例如 1.3476964684980388，Milvus 也會將其儲存為 1.347696。因此，當您從 Milvus 擷取這樣的向量時，Float64 值的精確度就會消失。</p>
<h4 id="How-does-Milvus-handle-vector-data-types-and-precision" class="common-anchor-header">Milvus 如何處理向量資料類型和精確度？</h4><p>Milvus 支援二進位、Float32、Float16 和 BFloat16 向量類型。</p>
<ul>
<li>二進位向量：以 0 和 1 的序列儲存二進位資料，用於影像處理和資訊檢索。</li>
<li>Float32 向量：預設的儲存精確度約為十進位的 7 位數。即使是 Float64 值，也是以 Float32 精度儲存，可能會在檢索時造成精確度的損失。</li>
<li>Float16 和 BFloat16 向量：提供較低的精確度和記憶體使用量。Float16 適用於頻寬和儲存空間有限的應用程式，而 BFloat16 則平衡範圍和效率，常用於深度學習，以降低計算需求，而不會顯著影響精確度。</li>
</ul>
<h4 id="Does-Milvus-support-specifying-default-values-for-scalar-or-vector-fields" class="common-anchor-header">Milvus 是否支援指定標量或向量欄位的預設值？</h4><p>目前，Milvus 2.4.x 不支援指定標量或向量欄位的預設值。此功能將在未來的版本中提供。</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">在 Milvus 中刪除資料後，儲存空間會立即釋放嗎？</h4><p>不，當您在 Milvus 刪除資料時，儲存空間不會立即釋放。雖然刪除資料會將實體標記為 「邏輯上已刪除」，但實際空間可能不會立即釋放。原因如下：</p>
<ul>
<li><strong>壓縮</strong>：Milvus 會在背景自動壓縮資料。此過程會將較小的資料區段合併為較大的區段，並移除邏輯上已刪除的資料 (標示為刪除的實體) 或已超過使用時間 (TTL) 的資料。但是，壓縮會建立新的區段，同時將舊的區段標記為 「已丟棄」。</li>
<li><strong>垃圾回收</strong>：稱為垃圾回收 (GC) 的獨立程序會定期移除這些「已丟棄」的區段，釋放它們所佔用的儲存空間。這可確保儲存空間的有效使用，但可能會在刪除與空間回收之間產生少許延遲。</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">我可以在操作後立即看到插入、刪除或上插的資料而不需要等待刷新嗎？</h4><p>可以，在 Milvus 中，由於其儲存-運算分解架構，資料可讀性與刷新作業沒有直接關聯。您可以使用一致性層級管理資料的可讀性。</p>
<p>選擇一致性等級時，請考慮一致性與效能之間的權衡。對於需要立即可見性的作業，請使用「強」一致性層級。若要加快寫入速度，請優先使用較弱的一致性 (資料可能無法立即可見)。如需詳細資訊，請參閱<a href="/docs/zh-hant/consistency.md">一致性</a>。</p>
<h4 id="After-enabling-the-partition-key-feature-what-is-the-default-value-of-numpartitions-in-Milvus-and-why" class="common-anchor-header">啟用分割區金鑰功能後，Milvus 中<code translate="no">num_partitions</code> 的預設值是多少，為什麼？</h4><p>啟用分割區金鑰功能後，Milvus 中<code translate="no">num_partitions</code> 的預設值設定為<code translate="no">16</code> 。 選擇此預設值是基於穩定性和效能原因。您可以根據需要調整<code translate="no">num_partitions</code> 值，方法是在<code translate="no">create_collection</code> 函式中指定該值。</p>
<h4 id="Is-there-a-maximum-length-limit-for-scalar-filtering-expressions" class="common-anchor-header">標量篩選表達式有最大長度限制嗎？</h4><p>有，標量過濾表達式的最大長度受 RPC 傳輸限制的約束，該限制在<code translate="no">milvus.yaml</code> 配置檔中定義。具體來說，該限制由代理部分下的<code translate="no">serverMaxRecvSize</code> 參數設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">serverMaxRecvSize:</span> <span class="hljs-number">67108864</span> <span class="hljs-comment"># The maximum size of each RPC request that the proxy can receive, unit: byte</span>
<button class="copy-code-btn"></button></code></pre>
<p>預設情況下，每個 RPC 請求的最大大小為 64MB。因此，過濾表達式的長度必須小於此限制，才能確保成功處理。</p>
<h4 id="When-performing-a-bulk-vector-search-how-many-vectors-can-be-specified-at-once-Is-there-a-limit" class="common-anchor-header">執行大量向量搜尋時，一次可以指定多少個向量？有限制嗎？</h4><p>是的，在批量向量搜索中可以指定的向量數量受限於 RPC 傳輸大小，該大小在<code translate="no">milvus.yaml</code> 配置文件中定義。此限制由代理部分下的<code translate="no">serverMaxRecvSize</code> 參數決定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">serverMaxRecvSize:</span> <span class="hljs-number">67108864</span> <span class="hljs-comment"># The maximum size of each RPC request that the proxy can receive, unit: byte</span>
<button class="copy-code-btn"></button></code></pre>
<p>預設情況下，每個 RPC 請求的最大大小為 64MB。因此，輸入向量的總大小（包括其尺寸資料和元資料）必須小於此限制，才能確保成功執行。</p>
<h4 id="How-can-I-get-all-the-unique-value-of-a-given-scalar-field-from-a-collection" class="common-anchor-header">如何從集合中取得指定標量欄位的所有唯一值？</h4><p>目前，沒有直接的方法可以達成此目的。我們建議使用 query_iterator 來擷取特定欄位的所有值，然後再手動執行重複資料刪除。我們計劃在 Milvus 2.6 中增加對這個功能的直接支援。使用 query_iterator 的範例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># set up iterator</span>
iterator = client.query_iterator(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;target&quot;</span>]
)
<span class="hljs-comment"># do iteration and store target values into value_set </span>
value_set = <span class="hljs-built_in">set</span>()
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    res = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(res) == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;query iteration finished, close&quot;</span>)
        iterator.close()
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(res)):
        value_set.add(res[i][<span class="hljs-string">&quot;target&quot;</span>])

<span class="hljs-comment"># value_set will contain unique values for target column    </span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="What-are-the-limitations-of-using-dynamic-fields-For-example-are-there-size-limits-modification-methods-or-indexing-restrictions" class="common-anchor-header">使用動態欄位有什麼限制？例如，是否有大小限制、修改方法或索引限制？</h4><p>動態欄位在內部使用 JSON 欄位表示，大小限制為 65,536 位元組。它們支援 upsert 修改，允許您新增或更新欄位。然而，從 Milvus 2.5.1 開始，動態欄位不支援索引。在未來的版本中，將引入為 JSON 添加索引的支援。</p>
<h4 id="Does-Milvus-support-schema-changes" class="common-anchor-header">Milvus 是否支援模式變更？</h4><p>從 Milvus 2.5.0 版本開始，模式變更只限於特定的修改，例如調整<code translate="no">mmap</code> 參數等屬性。使用者也可以修改 varchar 欄位的<code translate="no">max_length</code> 以及陣列欄位的<code translate="no">max_capacity</code> 。然而，計劃在未來的版本中加入或移除模式中欄位的功能，加強 Milvus 內模式管理的靈活性。</p>
<h4 id="Does-modifying-maxlength-for-VarChar-require-data-reorganization" class="common-anchor-header">修改 VarChar 的 max_length 是否需要重新組織資料？</h4><p>不需要，修改 VarChar 欄位的<code translate="no">max_length</code> 並不需要資料重組，例如壓縮或重組。此調整主要是更新插入欄位的任何新資料的驗證標準，而不影響現有資料。因此，這項變更被認為是輕量級的，不會對系統造成重大的開銷。</p>
<h4 id="Still-have-questions" class="common-anchor-header">仍有疑問？</h4><p>您可以</p>
<ul>
<li>在 GitHub 上查看<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。歡迎您提出問題、分享想法並幫助他人。</li>
<li>加入我們的<a href="https://slack.milvus.io/">Slack 社群</a>，尋找支援並參與我們的開放原始碼社群。</li>
</ul>
