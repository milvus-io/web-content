---
id: milvus_cdc_overview.md
summary: Milvus CDC 將資料變更從一個 Milvus 叢集複製到另一個叢集，用於主備災難恢復。
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC（變更資料擷取）將資料變更從一個 Milvus 集群複製到另一個。您可以使用 CDC 為 Milvus 建立主備災難復原拓樸。</p>
<p>在主備災難復原拓樸中，一個群集作為主群集並接受寫入。一個或多個備用群集持續接收主群集的變更，並可提供讀取流量。當主叢集不可用或需要維護時，您可以將服務流量切換到備用叢集。</p>
<h2 id="Architecture" class="common-anchor-header">架構<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>典型的拓樸結構包含</p>
<ul>
<li><strong>主要群集</strong>：複製的來源群集。它接受讀取和寫入。</li>
<li><strong>備用群集</strong>：複製的目標群集。它從主要群集接收變更，並在保持為備用時為唯讀。</li>
<li><strong>CDC 節點</strong>：一個 Milvus 元件，可將 WAL 變更從目前的主要群集轉送至備用群集。在切換或故障移轉後可能成為主機的每個群集上部署 CDC。</li>
<li><strong>複製拓樸</strong>：配置的來源到目標關係，例如群集-a -&gt; 群集-b。<span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>CDC 工作流程</span> </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">支援的拓樸<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>最常見的 CDC 部署是一主一備：</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC 也支援單主多備拓樸：</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC 不支援多主或主動-主動部署，即兩個或更多集群同時接受寫入流量。</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">主用與備用行為<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>角色</th><th>讀取</th><th>寫入</th><th>複製行為</th></tr>
</thead>
<tbody>
<tr><td>主用</td><td>是</td><td>是</td><td>將變更傳送至備用群集</td></tr>
<tr><td>備用</td><td>是</td><td>是</td><td>從主群組接收複製的變更</td></tr>
</tbody>
</table>
<p>備用群集拒絕直接寫入請求。這可防止腦分裂，並保持複製拓樸一致。</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">計劃中的切換與故障移轉<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 提供兩種方式將服務流量從目前的主要群集移到備用群集。</p>
<table>
<thead>
<tr><th>操作</th><th>使用時</th><th>資料遺失</th><th>預期行為</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/zh-hant/cdc_switchover.md">切換</a></strong></td><td>目前的主機仍可連線，或您正在進行計劃中的維護</td><td>RPO = 0</td><td>角色轉換前等待剩餘的複製資料</td></tr>
<tr><td><strong><a href="/docs/zh-hant/cdc_failover.md">故障轉換</a></strong></td><td>目前的主機不可用，無法快速復原</td><td>可能</td><td>立即升級備用，以便恢復寫入</td></tr>
</tbody>
</table>
<p>只要目前的主機仍能回應，就使用切換。只有在恢復可用性比等待原始主機更重要時，才使用故障移轉。</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDC 滯後及重要原因<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 滯後是指已寫入主要群集但尚未套用至備用群集的資料量。</p>
<p>CDC 滯後會影響兩種復原選項：</p>
<ul>
<li>在切換期間，較低的 CDC 滯後時間通常表示作業完成得較快。</li>
<li>在故障移轉期間，CDC 滯後時間代表如果原始主集群不可用時可能遺失的資料視窗。</li>
</ul>
<p>您應持續監控 CDC 滯後並盡可能將其保持在較低水平。<a href="/docs/zh-hant/set_up_cdc_replication.md">Set Up CDC Replication（設定 CDC 複製</a>）頁面包含估算 CDC 滯後時間的 PromQL 示例。</p>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 目前有以下限制：</p>
<ul>
<li>僅支援<strong>單主拓樸</strong>。</li>
<li>它<strong>不</strong>支援主動-主動或多主寫入。</li>
<li>備用群集可提供讀取流量，但它們在備用時會拒絕直接寫入。</li>
<li>故障移轉可能會遺失寫入舊主機但尚未複製到備用機的資料。</li>
<li>配置的<code translate="no">pchannels</code> 必須符合每個群集的實際通道配置。</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">備用群集可以提供查詢服務嗎？<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>可以。備用群集可以提供讀取流量。它不能接受寫入，直到它成為主要集群。</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDC 是否支援主動寫入？<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus CDC 是為單主拓樸設計的。同時寫入到多個群集可能會造成腦分裂和資料分歧。</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">切換會丟失資料嗎？<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>不會。切換等待剩餘資料複製完畢後，備用才會成為主用。</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">故障移轉會遺失資料嗎？<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>會。任何寫入舊主機但尚未複製到備用機的資料都可能遺失。</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">故障移轉期間可能遺失多少資料？<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>潛在的資料遺失受主機不可用時的 CDC 滯後所限。</p>
