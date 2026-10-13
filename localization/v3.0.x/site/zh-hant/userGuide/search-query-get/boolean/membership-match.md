---
id: membership-match.md
title: 會員配對Compatible with Milvus v3.0.2+
summary: 使用緊湊型布隆過濾器或精確的 Roaring 位圖，針對大型成員集過濾實體，並包含語法、SDK 請求模式、刪除語義及操作限制。
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">會員配對<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>成員資格比對會透過檢測標量欄位值是否屬於呼叫方提供的集合，來篩選實體。客戶端會建立一個緊湊的二進位成員資格篩選器資料塊，並將其作為表達式範本值傳遞。</p>
<p>此機制取代了龐大的 `<code translate="no">IN [...]</code> ` 清單。<code translate="no">IN</code> 篩選器會將每個成員序列化至請求中，因此若成員集規模過大，可能會超過代理伺服器的 gRPC 接收限制。透過 `<code translate="no">membership_match</code>`，代理伺服器會驗證該 blob 並將其嵌入查詢計畫中，而無需重新建立成員清單。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>成員匹配工作流程：客戶端建立可重複使用的 blob，代理伺服器進行驗證，而 QueryNodes 則負責評估。</span>
  
 </span></p>
<p>此圖示說明了固定的分工模式：客戶端僅需建立一次 blob 並在各請求間重複使用；代理伺服器會驗證封套與大小限制，並將 blob 原樣嵌入查詢計畫中；而 QueryNodes 則根據原始資料或索引來評估該計畫。</p>
<p>該運算子具有兩種編碼方式，其正確性保證各不相同：</p>
<ul>
<li><strong>布魯姆</strong>(<code translate="no">type=bloom</code>)：近似成員資格。可能出現假陽性；若篩選器有效，則不預期出現假陰性。典型用途：針對大量受眾或排除篩選器，且可接受偶發的假陽性。</li>
<li><strong>Roaring</strong>（<code translate="no">type=roaring</code> ）：針對整數值的精確成員資格。典型用途：存取控制清單（ACL）、租戶可見性、合規性篩選器，以及依 ID 集合刪除的操作。</li>
</ul>
<p>請<strong>勿將布隆（Bloom）</strong>成員資格用於授權決策或具破壞性的刪除操作。誤判（false positive）可能導致未包含在目標集合中的實體被暴露，或被誤刪除。</p>
<h3 id="Operational-checklist" class="common-anchor-header">運作檢查清單<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
<li>確認目標欄位類型，並根據該值域建構 BLOB。</li>
<li>僅在可接受誤報的情況下才選擇布隆演算法。</li>
<li>針對 ACL、合規性、租戶隔離及刪除操作，請選用 Roaring 演算法。</li>
<li>大型 BLOB 應僅建立一次並重複使用；請勿在每次請求中重新建立。</li>
<li>以序列化位元組為單位估算 Blob 大小，而非成員數量。</li>
<li>在混合版本叢集中，請先完成滾動升級（優先處理代理），再啟用<code translate="no">membership_match</code> 。</li>
<li>在啟用破壞性工作流程之前，請先在非生產環境的集合上測試該表達式。</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">表達式語法<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>第二個參數是範本佔位符。SDK 會將佔位符值以 protobuf<code translate="no">bytes</code> 的形式提供，其中包含由客戶端建置的篩選器 Blob。請在生產環境的表達式中明確保留<code translate="no">type</code> ，以便在程式碼和日誌中清晰顯示預期的正確性契約。</p>
<p><code translate="no">type</code> 參數為可選項。每個 blob 皆攜帶自描述的魔術標頭（Bloom 為<code translate="no">MBF1</code> ，Roaring 為<code translate="no">MRB1</code> ），當省略<code translate="no">type</code> 時，伺服器會偵測該標頭。若明確指定的<code translate="no">type</code> 與 blob 標頭衝突，將被視為請求錯誤而遭拒絕；未知或截斷的標頭則會導致「失敗即關閉」狀態。</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">選擇編碼<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>當可接受誤報時，請使用 Bloom。Bloom 支援有號整數欄位（<strong>INT8/16/32/64</strong>）、<strong>VARCHAR</strong>欄位以及<strong>JSON</strong>路徑。Bloom 篩選器並非精確的允許清單。</p>
<p><code translate="no">fpr</code> （誤報率）是指當某個值從未被插入時，布隆濾波器仍將該值報告為成員的機率：<code translate="no">fpr=0.005</code> 表示大約每 200 個非成員值中，就有 1 個被錯誤地報告為存在。較低的誤報率會產生較大的二進位大塊資料。</p>
<p>當每個匹配都必須完全精確時，請使用<strong>Roaring</strong>。<strong>Roaring</strong>僅接受有符號整數欄位；成員在序列化前會被符號擴展為<strong>INT64</strong>，因此 INT8 的 -1 與 INT64 的 -1 屬於同一個成員。請勿將其用於 UUID 或其他字串欄位。</p>
<table>
<thead>
<tr><th>維度</th><th>Bloom（type=bloom）</th><th>Roaring（type=roaring）</th></tr>
</thead>
<tbody>
<tr><td>精確度</td><td>近似；可能出現假陽性；無假陰性</td><td>精確；無假陽性且無假陰性</td></tr>
<tr><td>欄位</td><td>INT8/16/32/64、VARCHAR、JSON 路徑</td><td>僅限有符號的 INT8/16/32/64</td></tr>
<tr><td>Blob 大小</td><td>成員數與 FPR；當 FPR 為 0.005 時，每個成員約佔 11 位元；二的冪次結構</td><td>值分佈；密集集合可壓縮至更小的尺寸；隨機 64 位元值會觸及 262,144 的高容器上限</td></tr>
<tr><td>刪除</td><td>在解析階段被拒絕</td><td>允許</td></tr>
<tr><td>典型用途</td><td>受眾與排除篩選器</td><td>存取控制清單 (ACL)、合規性、租戶隔離、依 ID 集合刪除</td></tr>
</tbody>
</table>
<p><strong>JSON</strong>路徑是嚴格類型化的，且逐行處理：<strong>JSON</strong>字串會被視為<strong>VARCHAR</strong>值，<strong>JSON</strong>整數會被視為<strong>INT64</strong>值，而<strong>JSON</strong>雙精度數值絕不會與整數成員匹配，這與精確的<code translate="no">IN</code> 不同，在後者中 5.0 等於 5. 如果您的寫入程式將整數以浮點數編碼，請在寫入時將其正規化，或使用帶有資料型的標量欄位。</p>
<p>無論採用何種編碼方式，都應根據與目標欄位相同的值域來建立成員集。 請勿根據字串<code translate="no">&quot;10086&quot;</code> 建立布隆篩選器，並將其套用至<code translate="no">INT64</code> 欄位。BLOB 標頭會記錄插入的值域，若 BLOB 的值域不正確，代理伺服器會以參數錯誤拒絕該 BLOB，而非默默地不進行任何比對。請在不同請求間重複使用已建立的 BLOB，而非針對每個查詢重新建立。</p>
<p>對於成員數在數千個或更少的集合，純粹的<code translate="no">IN</code> 仍是最簡單的選項。伺服器不會在<strong>IN</strong>、<strong>Bloom</strong> 和<strong>Roaring</strong> 之間進行選擇。選擇編碼是呼叫方的責任。</p>
<p>選擇編碼時：</p>
<ol>
<li>確定工作負載是否能容忍誤報。若無法容忍，則絕不能選用<strong>Bloom</strong>編碼。</li>
<li>若需精確成員資格，請使用帶有有符號整數欄位的<strong>Roaring</strong>。密集或聚類的值壓縮後可產生最小的 blob。</li>
<li>檢查大小限制。均勻隨機的 64 位元值可能會超過 262,144 的高容器上限或大小限制。若確實超過，請使用符合請求限制的傳統<strong>IN</strong>清單。</li>
<li>若需對非整數欄位進行精確成員資格比對，請使用<strong>IN</strong>。此類欄位目前沒有專用的精確成員資格編碼。</li>
</ol>
<p>RESTful HTTP API 不支援成員資格比對。HTTP 表達式範本參數僅接受 bool、number、string 和 array 值；不存在用於 blob 的二進位<code translate="no">bytes</code> 類型。請使用基於 gRPC 的 SDK 來傳遞成員資格 blob。</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDK 請求模式<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>以下程式碼片段著重於建立成員資格 blob 並將其作為篩選模板參數傳遞。這些範例假設集合與欄位已存在且已載入、SDK 客戶端已連線，且查詢向量、成員清單及其他被引用的變數均已定義。本文省略了集合設定與完整的應用程式骨架。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">使用 Roaring 進行刪除<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>在刪除由外部整數 ID 集合選中的實體時，請使用精確的<strong>Roaring</strong>Blob。在發出刪除指令前，請先檢視成員集合與集合欄位類型。請勿使用 Bloom：近似成員關係並非安全的刪除謂詞，且 Bloom 形式會在解析階段被刪除表達式所拒絕。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>刪除語義遵循精確的三值匹配：</p>
<table>
<thead>
<tr><th>欄位值</th><th>membership_match(…)</th><th>非 membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>無匹配 (NULL)</td><td>無匹配 (NULL)</td></tr>
<tr><td>在成員集中</td><td>匹配</td><td>無匹配</td></tr>
<tr><td>不在集合內</td><td>無匹配</td><td>匹配</td></tr>
</tbody>
</table>
<p>此表格按行解讀：使用 `<code translate="no">membership_match</code> ` 的刪除操作會移除集合內的實體，使用 `<code translate="no">not membership_match</code> ` 的刪除操作會移除集合外的實體，而 `NULL` 實體在兩種極性下均會保留。</p>
<ul>
<li>無論採用何種極性，字段值為 NULL 的實體絕不會被刪除。</li>
<li>空位圖不會刪除任何內容。<code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> 會刪除所有欄位值非 NULL 的實體，即精確的補集，這在設計上可能是一個很大的集合。</li>
<li><code translate="no">not membership_match</code> 這是針對非 NULL 實體的成員集合的精確補集，而非近似值。</li>
</ul>
<p>對於以索引專用方式載入且不含原始標量資料的封閉區段，當索引支援時，評估會使用有界反向查詢。當既無原始欄位資料也無符合條件的索引時，請求會以「<code translate="no">FieldNotLoaded</code> 」失敗，而非返回未過濾的實體。</p>
<h2 id="Operational-limits" class="common-anchor-header">運作限制<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>設定</th><th>預設值</th><th>可配置</th><th>所限制的範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>一個 Blob 內容體</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>每次請求的聚合值</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 代理</td><td>整個請求</td></tr>
<tr><td>Roaring 高容器上限</td><td>262,144</td><td>在程式碼中修正</td><td>每個過濾器</td></tr>
<tr><td>Roaring 解碼記憶體估算值</td><td>64 MiB</td><td>在程式碼中固定</td><td>每個濾波器</td></tr>
<tr><td>MBF1 格式上限</td><td>128 MiB</td><td>在程式碼中固定</td><td>blob 格式上限</td></tr>
<tr><td>Bloom<code translate="no">fpr</code></td><td>0.005</td><td>客戶端建構器</td><td>假陽性目標</td></tr>
</tbody>
</table>
<p><code translate="no">proxy.*</code> 設定屬於 Milvus 伺服器配置：這些設定由叢集管理員在<code translate="no">milvus.yaml</code> 的<code translate="no">proxy</code> 區段中設定，且無法在過濾時針對個別請求或表達式進行調整。<strong>Roaring</strong>准入機制與 MBF1 格式上限在實作中已固定，無法在任何處進行配置。<code translate="no">fpr</code> 列是唯一的客戶端控制項：其值在建構 blob 時選定，有效範圍為 0.0001 至 0.05。</p>
<p>在預設的 fpr 值下，blob 主體最多可容納約 4,860 萬個 INT64 成員，且允許在頂層附加固定的 32 位元組封套標頭。 請求層級的總配額涵蓋了包含成員的計畫之總序列化大小，加上 Roaring 篩選器的總預估解碼大小，而 HybridSearch 子請求與評分篩選器則共享此配額。Bloom 本體的大小為 2 的冪次：當成員數剛超過某個層級的界限時，Blob 大小會加倍；而稍高的 fpr 通常能讓 Blob 大小符合下一級層級的限制。 當代理伺服器拒絕過大的布魯姆資料塊時，錯誤訊息會建議一個符合要求的<code translate="no">fpr</code> 。</p>
<ul>
<li>成員資格表達式的結果不會在不同請求之間進行快取。</li>
<li>混合版本叢集會以「失敗」狀態關閉：執行舊版程式碼的 QueryNodes 會拒絕包含成員資格計畫節點的計畫。請先升級代理伺服器，待滾動升級完成後，再啟用該運算子。</li>
<li>伺服器日誌會對 Blob 位元組進行遮蔽處理。表達式文字僅包含範本名稱；二進位有效載荷則透過範本值以帶外方式傳輸。</li>
</ul>
