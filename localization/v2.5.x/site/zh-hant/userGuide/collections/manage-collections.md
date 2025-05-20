---
id: manage-collections.md
title: 集合說明
summary: >-
  在 Milvus
  上，您可以建立多個集合來管理您的資料，並將您的資料作為實體插入到集合中。集合和實體類似於關係數據庫中的表格和記錄。本頁可協助您了解集合及相關概念。
---
<h1 id="Collection-Explained" class="common-anchor-header">集合說明<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 上，您可以創建多個集合來管理您的資料，並將您的資料作為實體插入到集合中。集合和實體類似於關係數據庫中的表格和記錄。本頁幫助你了解集合和相關概念。</p>
<h2 id="Collection" class="common-anchor-header">集合<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>集合是具有固定欄位和變異行的二維表。每列代表一個欄位，每行代表一個實體。</p>
<p>下圖顯示一個有八列和六個實體的集合。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>集合說明</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">模式與欄位<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>描述物件時，我們通常會提到物件的屬性，例如大小、重量和位置。您可以在集合中使用這些屬性作為欄位。每個欄位都有各種限制屬性，例如向量欄位的資料類型和維度。您可以透過建立欄位和定義其順序來形成集合模式。有關可能適用的資料類型，請參閱<a href="/docs/zh-hant/schema.md">Schema Explained</a>。</p>
<p>您應該在要插入的實體中包含所有模式定義的欄位。若要使其中某些欄位成為選項，請考慮啟用動態欄位。如需詳細資訊，請參閱<a href="/docs/zh-hant/enable-dynamic-field.md">動態欄位</a>。</p>
<ul>
<li><p><strong>使其為空或設定預設值</strong></p>
<p>有關如何使欄位為空或設定預設值的詳細資訊，請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p></li>
<li><p><strong>啟用動態欄位</strong></p>
<p>有關如何啟用和使用動態欄位的詳細資訊，請參閱動態<a href="/docs/zh-hant/enable-dynamic-field.md">欄位</a>。</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">主鍵和 AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>類似於關聯式資料庫中的主欄位，一個集合有一個主欄位，用來區分一個實體與其他實體。主欄位中的每個值都是全局唯一的，並對應一個特定的實體。</p>
<p>如上圖所示，名為<strong>id</strong>的欄位為主要欄位，第一個 ID<strong>0</strong>對應一個名為<em>The Mortality Rate of Coronavirus is Not Important 的</em>實體。不會有任何其他實體的主要欄位為 0。</p>
<p>主欄位只接受整數或字串。插入實體時，預設應包含主要欄位值。但是，如果您在創建集合時啟用了<strong>AutoId</strong>，Milvus 會在插入資料時產生這些值。在這種情況下，從要插入的實體中排除主字段值。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/primary-field.md">Primary Field &amp; AutoId</a>。</p>
<h2 id="Index" class="common-anchor-header">索引<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>在特定欄位上建立索引可提高搜尋效率。建議您為服務所依賴的所有欄位建立索引，其中向量欄位的索引是強制性的。</p>
<h2 id="Entity" class="common-anchor-header">實體<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>實體是在集合中共用相同欄位集的資料記錄。同一行中所有欄位的值組成一個實體。</p>
<p>您可以根據需要在集合中插入任意數量的實體。但是，隨著實體數量的增加，其所佔用的記憶體大小也會增加，從而影響搜尋效能。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/schema.md">Schema Explained</a>。</p>
<h2 id="Load-and-Release" class="common-anchor-header">載入和釋放<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>載入一個集合是在集合中進行相似性搜索和查詢的先決條件。當你載入一個資料集時，Milvus 會將所有索引檔案和每個欄位的原始資料載入記憶體，以便快速回應搜尋和查詢。</p>
<p>搜尋和查詢是需要大量記憶體的作業。為了節省成本，建議您釋放目前不使用的資料集。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/load-and-release.md">載入與釋放</a>。</p>
<h2 id="Search-and-Query" class="common-anchor-header">搜尋和查詢<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引並載入資料庫後，您可以輸入一個或多個查詢向量，開始相似性搜尋。舉例來說，當接收到搜尋要求中攜帶的查詢向量表達時，Milvus 會使用指定的度量類型來測量查詢向量與目標資料集中的相似度，然後再回傳那些與查詢語意相似的向量。</p>
<p>您也可以在搜尋與查詢中加入 metadata 過濾，以改善結果的相關性。請注意，元資料篩選條件在查詢中是強制性的，但在搜尋中是選擇性的。</p>
<p>如需適用公制類型的詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p>
<p>有關搜尋和查詢的詳細資訊，請參閱「搜尋與重新排名」章節中的文章，其中的基本功能如下：</p>
<ul>
<li><p><a href="/docs/zh-hant/single-vector-search.md">基本 ANN 搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/filtered-search.md">篩選搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/range-search.md">範圍搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/grouping-search.md">群組搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/with-iterators.md">搜索迭代器</a></p></li>
<li><p><a href="/docs/zh-hant/get-and-scalar-query.md">查詢</a></p></li>
<li><p><a href="/docs/zh-hant/full-text-search.md">全文檢索</a></p></li>
<li><p><a href="/docs/zh-hant/keyword-match.md">文字匹配</a></p></li>
</ul>
<p>此外，Milvus 也提供增強功能以改善搜尋效能與效率。這些功能預設為停用，您可以依據您的服務需求啟用和使用它們。它們是</p>
<ul>
<li><p><a href="/docs/zh-hant/use-partition-key.md">使用分割區金鑰</a></p></li>
<li><p><a href="/docs/zh-hant/mmap.md">使用 mmap</a></p></li>
<li><p><a href="/docs/zh-hant/clustering-compaction.md">集群壓縮</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">分區<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>分區是集合的子集，與其父集合共用相同的欄位集，每個分區包含一個實體子集。</p>
<p>透過將實體分配到不同的分區，您可以建立實體群組。您可以在特定分區中進行搜尋和查詢，讓 Milvus 忽略其他分區中的實體，並提高搜尋效率。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/manage-partitions.md">管理分區</a>。</p>
<h2 id="Shard" class="common-anchor-header">分區<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>分片是一個集合的水平切片。每個分片對應一個資料輸入通道。每個集合預設都有一個分區。您可以根據預期的吞吐量和要插入到資料集中的資料量，在建立資料集中時設定適當的分片數量。</p>
<p>有關如何設定分片數量的詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
<h2 id="Alias" class="common-anchor-header">別名<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以為集合建立別名。一個資料集可以有多個別名，但資料集不能共用一個別名。當收到針對集合的請求時，Milvus 會根據所提供的名稱找到集合。如果所提供名稱的集合不存在，Milvus 會繼續定位所提供名稱的別名。您可以使用集合別名來使您的程式碼適應不同的情況。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/manage-aliases.md">管理別名</a>。</p>
<h2 id="Function" class="common-anchor-header">函數<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以為 Milvus 設定函式，以便在建立集合時衍生欄位。例如，全文檢索函式使用使用者定義的函式，從特定的 varchar 欄位推導出稀疏向量欄位。如需全文檢索的詳細資訊，請參閱全文<a href="/docs/zh-hant/full-text-search.md">檢索</a>。</p>
<h2 id="Consistency-Level" class="common-anchor-header">一致性層級<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>分散式資料庫系統通常使用一致性層級來定義資料節點和複製本之間的資料相同性。您可以在建立資料集或在資料集中進行相似性搜尋時，設定不同的一致性層級。適用的一致性層級包括<strong>強</strong>、<strong>有限制的僵化</strong>、<strong>會話</strong>和<strong>最終</strong>。</p>
<p>有關這些一致性層級的詳細資訊，請參閱<a href="/docs/zh-hant/tune_consistency.md">一致性</a>層級。</p>
