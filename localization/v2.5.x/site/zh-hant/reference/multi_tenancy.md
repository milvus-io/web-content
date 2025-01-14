---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Milvus 中的多租戶。
title: 多租户策略
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">多租户策略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>在許多用例中，開發人員希望運行一個 Milvus 集群並為多個租戶提供服務，例如幾個產品團隊或數百萬最終用戶。本指南說明在 Milvus 上實現多租戶的幾種不同策略。</p>
<p>Milvus 的設計支援資料庫、集合或分割層級的多重租用。多租用的目的是將資料和資源彼此分開。在不同的層級實施多租用可以達到不同程度的隔離，但也涉及不同的開銷。在此，我們將解釋它們之間的權衡。</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">面向資料庫的多租戶<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 版本 2.2.9 起，您可以在單一 Milvus 集群中創建多個資料庫。此功能可實現面向資料庫的多租戶，為每個租戶分配一個資料庫，以便他們可以創建自己的集合。這種方法可為租戶提供最佳的資料和資源隔離，但一個叢集中最多只能有 64 個資料庫。</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">面向集合的多租戶<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>有兩種可能的方式來實現面向集合的多租戶。</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">所有租戶使用一個集合</h3><p>使用單一集合來實現多租戶，方法是加入租戶欄位來區分租戶，這是一個簡單的選項。在針對特定租戶進行 ANN 搜尋時，可加入過濾表達式，過濾掉所有屬於其他租戶的實體。這是實現多租戶的最簡單方法。不過，請注意過濾器的效能可能會成為 ANN 搜尋的瓶頸。為了改善搜尋效能，您可以使用以下面向分割的多租戶方式進行最佳化。</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">每個租戶一個集合</h3><p>另一種方法是為每個租戶建立一個集合來儲存自己的資料，而不是將所有租戶的資料儲存在單一集合中。這可提供更好的資料隔離和查詢效能。不過，請記住這種方法在排程上需要較多資源，而且一個群集中最多只能有 10,000 個集合。</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">面向分區的多租戶<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>有兩種方法可以實現面向分區的多租戶：</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">每個租戶一個分割區</h3><p>管理單一集合比管理多個集合容易得多。與其建立多個集合，不如考慮為每個租戶指派一個分割區，以達到彈性的資料隔離和記憶體管理。面向分区的多租户的搜索性能比面向集合的多租户要好得多。但請注意，集合的租戶數目不應超過集合所能容納的最大分割數目。</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">基於分區鑰匙的多重租用</h3><p>Milvus 2.2.9 引入了一個名為分區鑰匙的新功能。在建立集合時，指定一個租戶欄位，並使其成為分區關鍵欄位。Milvus 會根據分區 key 欄位的哈希值，將實體儲存於分區中。在進行 ANN 搜尋時，Milvus 只會搜尋包含分割區金鑰的分割區。這將大幅縮小搜尋的範圍，從而達到比沒有分割區金鑰更好的效能。</p>
</div>
<p>此策略解除了 Milvus 集合可支援的最大租戶數限制，並大大簡化了資源管理，因為 Milvus 會自動為您管理磁碟分割。</p>
<p>總括而言，您可以使用上述任一種或多種多租戶策略來形成您自己的解決方案。下表對這些策略在資料隔離、搜尋效能和最大租戶數方面進行了比較。</p>
<table>
<thead>
<tr><th></th><th>資料隔離</th><th>搜尋效能</th><th>最大租戶數</th><th>推薦方案</th></tr>
</thead>
<tbody>
<tr><td>資料庫導向</td><td>強大</td><td>強</td><td>64</td><td>適用於需要集合隨專案而異的情況，特別適合組織內各部門間的資料隔離。</td></tr>
<tr><td>一個集合適用於所有</td><td>弱</td><td>中等</td><td>不適用</td><td>適用於資源有限且對資料隔離並不敏感的企業。</td></tr>
<tr><td>每個租戶一個集合</td><td>強</td><td>強</td><td>少於 10,000</td><td>適用於每個群集只有少於 10,000 個租戶的情況。</td></tr>
<tr><td>每個租戶一個分割區</td><td>中</td><td>強</td><td>4,096</td><td>適用於每個群集只有少於 4,096 位租用者的情況。</td></tr>
<tr><td>基於分割區金鑰</td><td>中</td><td>強</td><td>10,000,000+</td><td>適用於預測租戶會快速增加到數百萬的情況。</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">下一步是什麼<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a><a href="/docs/zh-hant/schema.md">模式</a></p>
