---
id: manage-collections.md
title: 關於「集合」的說明
summary: >-
  在 Milvus
  上，您可以建立多個集合來管理資料，並將資料以實體的形式插入至這些集合中。集合與實體的概念類似於關聯式資料庫中的資料表與記錄。本頁面將協助您了解集合及相關概念。
---
<h1 id="Collection-Explained" class="common-anchor-header">關於「集合」的說明<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 上，您可以建立多個集合來管理資料，並將資料以實體的形式插入至這些集合中。集合與實體的概念類似於關係型資料庫中的資料表與記錄。本頁面將協助您了解集合及其相關概念。</p>
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
    </button></h2><p>集合是一種具有固定欄位與可變列的二維表格。每個欄位代表一個欄位，每行則代表一個實體。</p>
<p>下圖展示了一個包含八個欄位和六個實體的集合。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   </span>關於<span class="img-wrapper"> <span>集合的說明</span>
  
 </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">資料結構與欄位<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>在描述一個物件時，我們通常會提及其屬性，例如尺寸、重量和位置。您可以將這些屬性用作集合中的欄位。每個欄位都有各種限制性屬性，例如資料類型以及向量欄位的維度。您可以透過建立欄位並定義其順序來建立集合模式。 有關可適用的資料類型，請參閱「<a href="/docs/zh-hant/schema.md">架構說明</a>」。</p>
<p>您應將所有模式定義的欄位包含在待插入的實體中。若要將其中部分欄位設為可選，請考慮啟用「動態欄位」。詳情請參閱《<a href="/docs/zh-hant/enable-dynamic-field.md">動態欄位</a>》。</p>
<ul>
<li><p><strong>設定為可為空或設定預設值</strong></p>
<p>有關如何將欄位設為可為空或設定預設值的詳細資訊，請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為空與預設值</a>》。</p></li>
<li><p><strong>啟用動態欄位</strong></p>
<p>有關如何啟用及使用動態欄位的詳細資訊，請參閱《<a href="/docs/zh-hant/enable-dynamic-field.md">動態欄位</a>》。</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">主鍵與 AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>與關聯式資料庫中的主欄位類似，集合也具有一個主欄位，用以區分實體與其他實體。主欄位中的每個值在全球範圍內皆為唯一，並對應於一個特定的實體。</p>
<p>如上圖所示，名為<strong>id 的</strong>欄位即為主欄位，而第一個 ID<strong>0</strong>對應於標題為<em>《冠狀病毒的死亡率並不重要》</em>的實體。不會有其他實體的主欄位值為 0。</p>
<p>主欄位僅接受整數或字串。插入實體時，預設應包含主欄位值。然而，若您在建立集合時已啟用<strong>AutoId</strong>，Milvus 將在插入資料時自動產生這些值。在此情況下，請勿在待插入的實體中包含主欄位值。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/primary-field.md">主欄位與 AutoId</a>》。</p>
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
    </button></h2><p>針對特定欄位建立索引可提升搜尋效率。建議您為服務所依賴的所有欄位建立索引，其中向量欄位的索引為必備項目。</p>
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
    </button></h2><p>實體是指在集合中擁有相同欄位集的資料記錄。同一行中所有欄位的值共同構成一個實體。</p>
<p>您可以根據需要將任意數量的實體插入集合中。然而，隨著實體數量增加，其佔用的記憶體大小也會隨之增加，進而影響搜尋效能。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/schema.md">架構說明</a>》。</p>
<h2 id="Load-and-Release" class="common-anchor-header">載入與釋放<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>載入集合是進行相似度搜尋及查詢的先決條件。當您載入集合時，Milvus 會將所有索引檔案及各欄位的原始資料載入記憶體中，以快速回應搜尋與查詢。</p>
<p>搜尋與查詢是高度耗用記憶體的操作。為節省資源，建議您釋放目前未使用的集合。</p>
<p>如需更多詳細資訊，請參閱《<a href="/docs/zh-hant/load-and-release.md">載入與釋放</a>》。</p>
<h2 id="Search-and-Query" class="common-anchor-header">搜尋與查詢<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引並載入集合後，您即可透過提供一個或多個查詢向量來啟動相似度搜尋。例如，當收到搜尋請求中傳遞的查詢向量表示時，Milvus 會使用指定的度量類型來衡量查詢向量與目標集合中向量之間的相似度，然後回傳與查詢在語義上相似的結果。</p>
<p>您還可以在搜尋和查詢中加入元資料篩選條件，以提升結果的相關性。請注意，元資料篩選條件在查詢中是強制性的，但在搜尋中則是可選的。</p>
<p>有關適用度量標準類型的詳細資訊，請參閱《<a href="/docs/zh-hant/metric.md">度量標準類型</a>》。</p>
<p>有關搜尋與查詢的更多資訊，請參閱《搜尋與重新排序》章節中的文章，其中基本功能包括：</p>
<ul>
<li><p><a href="/docs/zh-hant/single-vector-search.md">基本人工神經網路搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/filtered-search.md">篩選搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/range-search.md">範圍搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/grouping-search.md">分組搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/with-iterators.md">搜尋迭代器</a></p></li>
<li><p><a href="/docs/zh-hant/get-and-scalar-query.md">查詢</a></p></li>
<li><p><a href="/docs/zh-hant/full-text-search.md">全文搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/keyword-match.md">文字比對</a></p></li>
</ul>
<p>此外，Milvus 還提供多項增強功能，以提升搜尋效能與效率。這些功能預設為停用狀態，您可以根據服務需求啟用並使用它們。這些功能包括</p>
<ul>
<li><p><a href="/docs/zh-hant/use-partition-key.md">使用分區鍵</a></p></li>
<li><p><a href="/docs/zh-hant/mmap.md">使用 mmap</a></p></li>
<li><p><a href="/docs/zh-hant/clustering-compaction.md">叢集化壓縮</a></p></li>
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
    </button></h2><p>分區是集合的子集，與其父集合共享相同的欄位集，每個分區都包含實體的子集。</p>
<p>透過將實體分配至不同的分區，您可以建立實體群組。您可以在特定分區中進行搜尋和查詢，讓 Milvus 忽略其他分區中的實體，從而提升搜尋效率。</p>
<p>詳情請參閱《<a href="/docs/zh-hant/manage-partitions.md">管理分區</a>》。</p>
<h2 id="Shard" class="common-anchor-header">分片<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>分片是集合的水平切片。每個分片對應一個資料輸入通道。每個集合預設皆有一個分片。您可在建立集合時，根據預期的吞吐量以及將插入該集合的資料量，設定適當的分片數量。</p>
<p>有關如何設定分片數的詳細資訊，請參閱《<a href="/docs/zh-hant/create-collection.md">建立集合</a>》。</p>
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
    </button></h2><p>您可以為您的集合建立別名。 一個集合可以擁有多個別名，但不同集合不能共用同一個別名。當 Milvus 接收到針對某個集合的請求時，會根據提供的名稱來定位該集合。若不存在該名稱的集合，Milvus 會繼續將該名稱視為別名進行定位。您可以利用集合別名，讓程式碼能適應不同的情境。</p>
<p>如需更多詳細資訊，請參閱《<a href="/docs/zh-hant/manage-aliases.md">管理別名</a>》。</p>
<h2 id="Function" class="common-anchor-header">函式<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以為 Milvus 設定函式，以便在建立集合時衍生欄位。例如，全文檢索功能會使用使用者自訂函式，從特定的 varchar 欄位衍生出稀疏向量欄位。有關全文檢索的更多資訊，請參閱「<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>」。</p>
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
    </button></h2><p>分散式資料庫系統通常會使用一致性等級來定義資料節點與副本間的資料一致性。您可以在建立集合時，或在集合內進行相似度搜尋時，分別設定不同的一致性等級。適用的一致性等級包括<strong>「強一致性」</strong>、<strong>「有限過時</strong>」、「<strong>會話一致性</strong>」和<strong>「最終一致性</strong>」。</p>
<p>有關這些一致性層級的詳細資訊，請參閱《<a href="/docs/zh-hant/tune_consistency.md">一致性層級</a>》。</p>
