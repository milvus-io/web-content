---
id: limit_collection_counts.md
title: 設定收集數量限制
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">限制收藏集數量<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>一個 Milvus 實例最多允許 65,536 個集合。但是，過多的收藏集可能會導致性能問題。因此，建議限制在 Milvus 實例中建立的收藏集數量。</p>
<p>本指南說明如何設定 Milvus 範例中的收藏集數量限制。</p>
<p>設定會因您安裝 Milvus 實例的方式而異。</p>
<ul>
<li><p>對於使用 Helm Charts 安裝的 Milvus 實例</p>
<p>將設定加入<code translate="no">values.yaml</code> 檔案的<code translate="no">config</code> 部分。詳情請參閱<a href="/docs/zh-hant/configure-helm.md">使用 Helm Charts 設定 Milvus</a>。</p></li>
<li><p>對於使用 Docker Compose 安裝的 Milvus 實體</p>
<p>將配置新增到您用來啟動 Milvus 實例的<code translate="no">milvus.yaml</code> 檔案。如需詳細資訊，請參閱<a href="/docs/zh-hant/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</p></li>
<li><p>對於使用 Operator 安裝的 Milvus 實例</p>
<p>將配置新增到<code translate="no">Milvus</code> 自訂資源的<code translate="no">spec.components</code> 區段。如需詳細資訊，請參閱<a href="/docs/zh-hant/configure_operator.md">使用 Operator 配置 Milvus</a>。</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">組態選項<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
    <span class="hljs-attr">maxGeneralCapacity:</span> <span class="hljs-number">65536</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">maxGeneralCapacity</code> 參數設定目前 Milvus 實體可持有的最大集合數量。預設值為<code translate="no">65536</code> 。</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">計算收藏集數量<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>在一個集合中，您可以設定多個分片和分區。分片是用於在多個資料節點之間分配資料寫入作業的邏輯單位。分區是邏輯單位，用於透過僅載入集合資料的子集來提高資料擷取效率。計算當前 Milvus 實例中的集合數量時，您還需要計算分片和分區。</p>
<p>例如，假設您已經建立了<strong>100 個</strong>集合，其中<strong>60 個</strong>集合有<strong>2</strong>個分塊和<strong>4 個</strong>分區，其餘<strong>40 個</strong>集合有<strong>1</strong>個分塊和<strong>12 個</strong>分區。集合單元的總數（計算方式為<code translate="no">shards × partitions</code> ）可如下確定：</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中，計算出的 960 個集合單位總數代表目前的使用量。<code translate="no">maxGeneralCapacity</code> 定義了一個實例可支援的最大集合單位數量，預設值為<code translate="no">65536</code> 。這表示該實體最多可容納 65,536 個收集單元。如果總數超過此限制，系統會顯示以下錯誤訊息：</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the max general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>若要避免此錯誤訊息，您可以減少現有或新集合中的分片或分割數量、刪除某些集合，或增加<code translate="no">maxGeneralCapacity</code> 值。</p>
