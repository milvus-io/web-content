---
id: idempotent-import.md
order: 2
title: 幺半抗變性批量匯入
summary: 傳送一個冪等鍵，以便重新嘗試的批次匯入能對應至原始工作，而非建立第二個工作。
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">幺半抗變性批量匯入<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>批量匯入請求可能成功，但其回應卻遺失：可能是呼叫超時、連線中斷，或是您的協調器在儲存回傳的<code translate="no">jobId</code> 之前已停止運作。您無法區分「尚未完成」與「已完成，但回應遺失」這兩種情況。重新嘗試會啟動第二個工作，導致每筆資料行被匯入兩次；若不重新嘗試，則可能導致匯入失敗。</p>
<p>幂等鍵可消除此兩難。若在請求中標記此鍵，則攜帶相同鍵的重試將返回原始的 `<code translate="no">jobId</code> `，而非建立第二個工作。</p>
<p>具冪等性的批次匯入需使用 Milvus 3.0.2 或更新版本，或 2.6 系列中的 2.6.24 或更新版本。較舊的伺服器會忽略該標頭，且無論是否重試，每個請求都會啟動一個新工作。</p>
<h2 id="Sending-the-key" class="common-anchor-header">傳送金鑰<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>該鍵值會以<code translate="no">Idempotency-Key</code> HTTP 標頭的形式傳送，而非置於請求正文中。</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> 格式為<code translate="no">&quot;Idempotency-Key&quot;</code> ；原始字串亦可使用。<code translate="no">headers</code> 參數及<code translate="no">IDEMPOTENCY_KEY_HEADER</code> 需搭配 3.x 系列中的 pymilvus v3.0.3 或更新版本，或 2.6 系列中的 v2.6.18 或更新版本。 在較舊版的 pymilvus 中，上述<code translate="no">import</code> 這行會因在<code translate="no">IDEMPOTENCY_KEY_HEADER</code> 查詢時發生「<code translate="no">ImportError</code> 」錯誤而失敗，且將<code translate="no">headers</code> 傳遞給<code translate="no">bulk_import</code> 會產生未定義的行為——該呼叫可能會出錯，或可能在缺少該鍵的情況下提交匯入。</p>
<p>如常使用回傳的<code translate="no">jobId</code> 來輪詢<code translate="no">/v2/vectordb/jobs/import/describe</code> 。若在原始工作仍在註冊過程中時收到重試請求，系統會等待原始工作完成註冊，因此重試請求絕不會遇到半註冊狀態的工作。</p>
<h2 id="Choosing-a-key" class="common-anchor-header">選擇金鑰<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>每個邏輯請求僅使用一個金鑰。</strong>請為工作單元命名（例如<code translate="no">orders-2026-09-07-batch-3</code> ），或在傳送請求前產生一個 UUID 並將其與工作項目一併儲存。若可能需要重新執行相同的工作，請包含嘗試次數。</li>
<li><strong>重試時請使用相同的金鑰。</strong>在重試時生成新的金鑰會導致資料重複。例外情況請參閱「<a href="#when-to-send-a-new-key">何時應傳送新金鑰</a>」一節。</li>
<li><strong>切勿將同一金鑰用於不同的檔案。</strong>Milvus 不會比較這兩項請求。您將取回原始的<code translate="no">jobId</code> ，而新檔案則不會被匯入。</li>
<li><strong>請保持鍵值簡短且可列印。</strong>預設為可列印的 ASCII 字元，最大 256 位元組（<code translate="no">streaming.idempotency.maxKeyLength</code> ）。其他格式將因錯誤<code translate="no">1100</code> 而遭拒絕。</li>
<li><strong>請勿在其中包含機密資訊。</strong>金鑰會與您的資料一同儲存。</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">金鑰的保留時間<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>金鑰的範圍由其內部 ID 限定於該集合，因此只要重試時使用集合的新名稱，重新命名集合並不會中斷重試。若刪除並以相同名稱重新建立集合，則會中斷重試，此時應啟動新的工作。</p>
<p>Milvus 會將匯入金鑰保留約一天。請將此視為參考值而非保證：大量的 DDL 或匯入流量會縮短保留時間，而協調器重新啟動則會延長保留時間。若在金鑰被遺忘後進行重試，將會啟動一個新的工作。</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">何時應傳送新金鑰<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>僅有兩種情況，且僅此兩種：</p>
<ul>
<li><strong>原始工作失敗或被中止。</strong>Describe 會傳回<code translate="no">state: Failed</code> 並附上原因。只要該金鑰仍被記住，重新嘗試該金鑰都會傳回相同的<code translate="no">jobId</code> 。解決問題後，再傳送新的金鑰。</li>
<li><strong>原始工作已遭清理。</strong>Milvus 會將已完成的工作保留<code translate="no">dataCoord.import.taskRetention</code> （預設為 48 小時）。若在此期間過期，而金鑰仍被記住，則重試會返回舊的<code translate="no">jobId</code> ，且 `describe` 會回傳錯誤<code translate="no">import job does not exist</code> 而非工作狀態。該工作可能已成功執行。請在傳送新金鑰前，先確認資料確實遺失。</li>
</ul>
<p>若重試因進口工作配額已滿等原因遭拒，則不屬於上述情況。請稍後使用相同的金鑰再次嘗試。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>本頁面的運作行為由四個參數所決定。這些參數均無需變更，金鑰即可正常運作。</p>
<table>
<thead>
<tr><th>參數</th><th>預設值</th><th>功能說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>系統會保留匯入金鑰多長時間。此參數未包含在預設的 `<code translate="no">milvus.yaml</code>` 中；若要變更，請明確新增此參數。同一儲存庫也會拒絕重複提交的 DDL 指令，因此請勿僅為了縮短匯入時段而降低此數值。</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>同一儲存庫在刪除最舊的鍵之前，最多可保留多少個鍵和 DDL 記錄（無論其存放時間長短）。此設定可讓高負載的 DDL 或匯入流量在<code translate="no">maxLifetime</code> 之前忘記該鍵。此參數未包含在預設的<code translate="no">milvus.yaml</code> 中。</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> （48 小時）自 2.6.24 及 3.0.2 起；此前的版本為<code translate="no">10800</code> </td><td>已完成的匯入工作可被查詢的時間長度。請將此值設定為至少<code translate="no">maxLifetime</code> 的兩倍。</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>鍵的最大長度（以位元組為單位）。若鍵長超過此限制，系統將以錯誤<code translate="no">1100</code> 拒絕該鍵。<code translate="no">0</code> 會停用此限制。此參數未包含在預設的<code translate="no">milvus.yaml</code> 中。</td></tr>
</tbody>
</table>
<p>在 2.6.24 及 3.0.2 之前發佈的<code translate="no">milvus.yaml</code> 會明確設定<code translate="no">taskRetention: 10800</code> ，且升級過程不會覆寫您檔案中的數值。若您使用該檔案進行升級，請將<code translate="no">taskRetention</code> 提高至至少<code translate="no">maxLifetime</code> 的兩倍。新數值僅適用於變更後才完成的作業。</p>
