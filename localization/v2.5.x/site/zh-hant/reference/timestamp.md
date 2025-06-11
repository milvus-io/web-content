---
id: timestamp.md
title: 在 Milvus 的時間戳
summary: 了解時間戳的概念以及 Milvus 向量資料庫中四個主要的時間戳相關參數。
---

<h1 id="Timestamp" class="common-anchor-header">時間戳<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題解釋時間戳的概念，並介紹 Milvus 向量資料庫中四個主要的時間戳相關參數。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一個向量資料庫，可以搜尋和查詢從非結構化資料轉換過來的向量。當進行資料處理語言 (DML) 作業時，包括<a href="https://milvus.io/docs/v2.1.x/data_processing.md">資料插入和刪除</a>，Milvus 會為作業所涉及的實體指定時間戳。因此，Milvus 中的所有實體都有時間戳屬性。而在同一 DML 操作中的實體批次共享相同的時間戳值。</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">時間戳參數<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中進行向量相似性搜尋或查詢時，會涉及數個與時間戳相關的參數。</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> 是一種時間戳，用來確保在進行向量相似性搜尋或查詢時，在 之前由 DML 作業更新的所有資料都是可見的。例如，如果您在下午 3 點插入一批資料，在下午 5 點插入另一批資料，而在向量相似性搜尋時， 的值設定為下午 6 點。這表示分別在下午 3 點和下午 5 點插入的兩批資料應參與搜尋。<code translate="no">Guarantee_timestamp</code> <code translate="no">Guarantee_timestamp</code> </p>
<p>如果沒有設定<code translate="no">Guarantee_timestamp</code> ，Milvus 會自動以提出搜尋請求的時間點。因此，搜尋是在資料檢視上進行，所有資料更新都是在搜尋之前透過 DML 作業進行。</p>
<p>為了省去您在 Milvus 內理解<a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a>的麻煩，作為用戶，您不需要直接配置<code translate="no">Guarantee_timestamp</code> 參數。您只需要選擇<a href="https://milvus.io/docs/v2.1.x/consistency.md">一致性等級</a>，Milvus 會自動為您處理<code translate="no">Guarantee_timestamp</code> 參數。每個一致性等級對應某個<code translate="no">Guarantee_timestamp</code> 值。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">範例</h4><p>如上圖所示，<code translate="no">Guarantee_timestamp</code> 的值設定為<code translate="no">2021-08-26T18:15:00</code> (為簡單起見，此範例中的時間戳以實體時間表示)。當您進行搜尋或查詢時，2021-08-26T18:15:00 之前的所有資料都會被搜尋或查詢。</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> 是由 Milvus 中的查詢節點自動產生和管理的時間戳類型。它用於指示查詢節點執行哪些 DML 作業。</p>
<p>查詢節點管理的資料可分為兩種類型：</p>
<ul>
<li><p>歷史資料 (或也稱為批次資料)</p></li>
<li><p>增量資料（或稱為串流資料）。</p></li>
</ul>
<p>在 Milvus 中，您需要在進行搜尋或查詢之前載入資料。因此，在進行搜尋或查詢請求之前，集合中的批次資料會由查詢節點載入。但是，流式資料是即時插入 Milvus 或從 Milvus 刪除的，這需要查詢節點保持 DML 作業和搜尋或查詢請求的時間線。因此，查詢節點使用<code translate="no">Service_timestamp</code> 來保持這樣的時間線。<code translate="no">Service_timestamp</code> 可以被視為某些資料可見的時間點，因為查詢節點可以確保<code translate="no">Service_timestamp</code> 之前的所有 DML 作業都已完成。</p>
<p>當有搜尋或查詢請求傳入時，查詢節點會比較<code translate="no">Service_timestamp</code> 和<code translate="no">Guarantee_timestamp</code> 的值。主要有兩種情況。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>服務_時間戳</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">情況 1：<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>如圖 1 所示，<code translate="no">Guarantee_timestamp</code> 的值設定為<code translate="no">2021-08-26T18:15:00</code> 。當<code translate="no">Service_timestamp</code> 的值長大為<code translate="no">2021-08-26T18:15:01</code> 時，表示查詢節點執行並完成此時點之前的所有 DML 作業，包括<code translate="no">Guarantee_timestamp</code> 所指示時間之前的 DML 作業。因此，搜尋或查詢請求可以立即執行。</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">情況 2：<code translate="no">Service_timestamp</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>如圖 2 所示，<code translate="no">Guarantee_timestamp</code> 的值設定為<code translate="no">2021-08-26T18:15:00</code> ，而<code translate="no">Service_timestamp</code> 的目前值只有<code translate="no">2021-08-26T18:14:55</code> 。這表示只有在<code translate="no">2021-08-26T18:14:55</code> 之前的 DML 作業才會被執行並完成，剩下在這個時間點之後但在<code translate="no">Guarantee_timestamp</code> 之前的部分 DML 作業尚未完成。如果在這個時間點執行搜尋或查詢，有些所需的資料是不可見的，還無法取得，嚴重影響搜尋或查詢結果的準確性。因此，查詢節點需要推遲搜尋或查詢請求，直到<code translate="no">guarantee_timestamp</code> 之前的 DML 作業完成為止 (也就是當<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code>)。</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>技術上來說，<code translate="no">Graceful_time</code> 並不是時間戳記，而是一個時間段（例如 100 毫秒）。不過，<code translate="no">Graceful_time</code> 值得一提，因為它與<code translate="no">Guarantee_timestamp</code> 和<code translate="no">Service_timestamp</code> 有密切關係。<code translate="no">Graceful_time</code> 是 Milvus 設定檔中一個可設定的參數。它用來指出在某些資料變得可見之前可以容忍的時間。簡而言之，在<code translate="no">Graceful_time</code> 期間未完成的 DML 作業是可以容忍的。</p>
<p>當有輸入的搜尋或查詢請求時，可能有兩種情況。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">情況 1：<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>如圖 1 所示，<code translate="no">Guarantee_timestamp</code> 的值設定為<code translate="no">2021-08-26T18:15:01</code> ，<code translate="no">Graceful_time</code> 設定為<code translate="no">2s</code> 。<code translate="no">Service_timestamp</code> <code translate="no">2021-08-26T18:15:00</code>雖然<code translate="no">Service_timestamp</code> 的值仍小於<code translate="no">Guarantee_timestamp</code> 的值，且<code translate="no">2021-08-26T18:15:01</code> 之前的 DML 作業尚未全部完成，但如<code translate="no">Graceful_time</code> 的值所示，可容忍 2 秒的資料隱藏時間。因此，傳入的搜尋或查詢請求可立即執行。</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">情況 2：<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>如圖 2 所示，<code translate="no">Guarantee_timestamp</code> 的值設定為<code translate="no">2021-08-26T18:15:01</code> ，<code translate="no">Graceful_time</code> 設定為<code translate="no">2s</code> 。<code translate="no">Service_timestamp</code> 目前的值只有<code translate="no">2021-08-26T18:14:54</code> 。這表示預期的 DML 作業尚未完成，即使有 2 秒的優化時間，資料隱藏仍然是無法忍受的。因此，查詢節點需要擱置搜尋或查詢請求，直到某些 DML 請求完成為止 (即當<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code>)。</p>
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
<li>了解<a href="/docs/zh-hant/v2.5.x/consistency.md">保證時間戳</a>如何<a href="/docs/zh-hant/v2.5.x/consistency.md">在 Milvus 中實現可調整的一致性</a></li>
</ul>
