---
id: structarray-limits.md
title: StructArray 的限制
summary: >-
  StructArray 的支援範圍涵蓋模式定義、插入資料、索引建立、搜尋模式，以及 StructArray 專屬的篩選器。在生產環境中依賴
  StructArray 的運作行為之前，請將此頁面作為限制參照。
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray 的限制<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 的支援範圍涵蓋模式定義、插入資料、索引建立、搜尋模式，以及 StructArray 專屬的篩選器。在生產環境中依賴 StructArray 的運作行為之前，請將此頁面作為限制參考。</p>
<p>大多數 StructArray 限制源自以下三個方面之一：StructArray 模式模型、您為向量子欄位選擇的搜尋模式，以及您的集合所運行的 Milvus 版本。</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">限制一覽<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>範疇</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>模式結構</td><td>Struct 僅可作為 Array 欄位的元素類型使用。Struct 不支援作為頂層集合欄位。</td></tr>
<tr><td>子欄位模式</td><td>同一 StructArray 字段中的所有 Struct 元素共用一個預定義的 Struct 模式。</td></tr>
<tr><td>容量</td><td><code translate="no">max_capacity</code> 此屬性為必填，並限制單一實體可在 StructArray 欄位中儲存的 Struct 元素數量。</td></tr>
<tr><td>子欄位變更</td><td>StructArray 欄位建立後，您無法向該現有的 StructArray 欄位新增子欄位。</td></tr>
<tr><td>子欄位路徑請在索引、搜尋目標、輸出欄位和篩選器中使用 xml-ph-0000@deepl.internal 路徑，例如 xml-ph-0001@deepl.internal。</td><td>請使用<code translate="no">structArray[subfield]</code> 路徑（例如<code translate="no">chunks[emb]</code> ），作為索引、搜尋目標、輸出欄位及篩選條件。請勿使用<code translate="no">chunks.emb</code> 。</td></tr>
<tr><td>插入結構</td><td>請將 StructArray 欄位插入為物件陣列。請勿在插入載入資料中使用路徑語法。</td></tr>
<tr><td>向量索引</td><td>向量欄位或向量子欄位僅接受一個索引。請分別使用獨立的向量子欄位進行 EmbeddingList 搜尋與元素層級搜尋。</td></tr>
<tr><td>函式</td><td>StructArray 欄位內的欄位或子欄位不支援欄位函式。</td></tr>
<tr><td>可為空的欄位</td><td>可為空的 StructArray 欄位受版本限制。當支援此功能時，空值適用於整個 StructArray 欄位，而非獨立地適用於個別的 Struct 元素。</td></tr>
<tr><td>動態新增欄位</td><td>將 StructArray 欄位新增至現有集合的功能受版本限制，且新增的欄位必須為可為空欄位。</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">架構限制<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>限制</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>Struct 並非頂層欄位類型。</td><td>建立一個 StructArray 欄位，其結構為<code translate="no">datatype=DataType.ARRAY</code> ，並使用<code translate="no">element_type=DataType.STRUCT</code> 及<code translate="no">struct_schema</code> 。</td></tr>
<tr><td>所有元素共用一個架構。</td><td>StructArray 欄位中的每個 Struct 元素均遵循相同的子欄位清單和子欄位資料類型。</td></tr>
<tr><td><code translate="no">max_capacity</code> 此欄位為必填。</td><td>一個實體中的 Struct 元素數量不得超過為 StructArray 欄位所設定的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>現有的子欄位是固定的。</td><td>您無法將新的子欄位附加到現有的 StructArray 欄位上。若要變更子欄位架構，請刪除 StructArray 欄位，然後使用更新的架構重新新增該欄位。</td></tr>
<tr><td>不支援嵌套的 StructArray。</td><td>StructArray 欄位不能包含嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code> 子欄位。</td></tr>
<tr><td>StructArray 內部不支援函式。</td><td>請勿為 StructArray 欄位或其子欄位定義欄位函式。</td></tr>
</tbody>
</table>
<p>有關模式建立範例，請參閱「<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位」</a>。</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">受支援的子欄位資料類型<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 子欄位會映射至實體陣列式的儲存空間。下表列出了受支援與不受支援的實體類型。</p>
<table>
<thead>
<tr><th>Struct 子欄位的實體類型</th><th>支援</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BOOL</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.VARCHAR</code> ，並設定<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BFLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BINARY_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>不支援</td><td>StructArray 欄位不支援稀疏向量子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>請使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援 JSON 子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援幾何子欄位及 GIS 函式。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援文字子欄位。</td></tr>
<tr><td><code translate="no">Array</code></td><td>不支援</td><td>StructArray 欄位不支援 Timestamptz 子欄位及時間特定表達式。</td></tr>
<tr><td>嵌套的<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 或<code translate="no">ArrayOfStruct</code></td><td>不支援</td><td>StructArray 欄位不支援嵌套的陣列、向量陣列、Struct 或 Array-of-Struct 子欄位。</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">可為空與動態模式限制<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>可為空的 StructArray 行為以及動態 StructArray 欄位的新增功能，受版本限制。</p>
<table>
<thead>
<tr><th>功能</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>可為空的 StructArray 欄位</td><td>僅在包含可為空 StructArray 及可為空向量陣列支援的版本中提供。</td></tr>
<tr><td>Python 中的空值</td><td>請使用 `<code translate="no">None</code> ` 在 Python 中插入空的 StructArray 值。請勿使用 `<code translate="no">Null</code> ` 或 `<code translate="no">null</code>`。</td></tr>
<tr><td>空值作用域</td><td>空值適用於整個 StructArray 欄位。例如，<code translate="no">chunks=None</code> 僅在<code translate="no">chunks</code> 為可為空時才有效。</td></tr>
<tr><td>部分可為空的 StructArray 值</td><td>當 StructArray 欄位包含有效的陣列值時，請勿在同一個值中將可為 null 的子欄位陣列與有效的子欄位陣列混合使用。</td></tr>
<tr><td>動態新增 StructArray 欄位</td><td>僅在包含動態 StructArray 欄位支援的版本中，才支援將 StructArray 欄位新增至現有集合。</td></tr>
<tr><td>動態新增的空值要求</td><td>新增至現有集合的 StructArray 欄位必須為可為空，因為現有實體對於新欄位尚無值。</td></tr>
<tr><td>動態新增後的既有實體</td><td>現有實體針對新增的 StructArray 欄位及其所有子欄位，均會傳回 `<code translate="no">null</code> `。</td></tr>
</tbody>
</table>
<p>在 Milvus v3.0.x 中，支援可為空的 StructArray 欄位、可為空的向量陣列，以及動態新增 StructArray 欄位。</p>
<p>有關可為空 StructArray 欄位的插入範例，請參閱<a href="/docs/zh-hant/insert-data-into-structarray-fields.md">《將資料插入 StructArray 欄位》</a>。</p>
<h2 id="Insert-limits" class="common-anchor-header">插入限制<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>限制</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>有效載荷形狀</td><td>將 StructArray 欄位插入為 Struct 物件的陣列，例如<code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 。</td></tr>
<tr><td>子欄位名稱</td><td>在每個 Struct 物件內部，請使用子欄位名稱（例如<code translate="no">text</code> 和<code translate="no">emb</code> ），而非路徑（例如<code translate="no">chunks[text]</code> ）。</td></tr>
<tr><td>架構對齊</td><td>每個 Struct 元素都必須符合 Struct 模式。</td></tr>
<tr><td>容量</td><td>單一實體中的 Struct 元素數量不得超過<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>向量維度</td><td>向量值必須符合其向量子欄位所設定的<code translate="no">dim</code> 。</td></tr>
<tr><td>搜尋模式重複</td><td>若您同時需要 EmbeddingList 搜尋與元素層級搜尋，請將向量寫入兩個獨立的向量子欄位中。</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">索引與度量限制<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 向量子欄位可針對「嵌入清單 (EmbeddingList)」搜尋或「元素層級」搜尋進行索引。同一個向量子欄位無法同時使用這兩種度量家族，因為每個向量欄位或向量子欄位僅能接受一種索引。</p>
<table>
<thead>
<tr><th>搜尋模式</th><th>度量族</th><th>結果層級</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 搜尋</td><td><code translate="no">MAX_SIM</code>、<code translate="no">MAX_SIM_COSINE</code> 、<code translate="no">MAX_SIM_IP</code> 、<code translate="no">MAX_SIM_L2</code> 或二進位<code translate="no">MAX_SIM_*</code> 度量</td><td>實體層級的結果。</td></tr>
<tr><td>元素層級搜尋</td><td>常規向量指標，例如<code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">COSINE</code> 、<code translate="no">HAMMING</code> ，或<code translate="no">JACCARD</code></td><td>可包含匹配元素偏移量的元素層級結果。</td></tr>
</tbody>
</table>
<p>若需同時使用這兩種模式，請使用獨立的向量子欄位。例如，使用<code translate="no">chunks[emb_list_vector]</code> 進行 EmbeddingList 搜尋，並使用<code translate="no">chunks[emb]</code> 進行元素層級搜尋。</p>
<p>在規劃集合架構時，StructArray 的向量子欄位會被視為向量子欄位。請確保向量欄位與向量子欄位的總數符合目標版本及服務層級的限制。</p>
<p>有關受支援的索引類型和指標類型的矩陣，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p>
<h2 id="Search-limits" class="common-anchor-header">搜尋限制<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>搜尋行為</th><th>支援與限制</th></tr>
</thead>
<tbody>
<tr><td>基本 EmbeddingList 搜尋</td><td>支援以<code translate="no">MAX_SIM*</code> 度量進行索引的StructArray向量子欄位。回傳實體層級的結果。</td></tr>
<tr><td>基本元素層級搜尋</td><td>支援以常規向量指標索引的 StructArray 向量子欄位。可回傳匹配元素的偏移量。</td></tr>
<tr><td>範圍搜尋</td><td>支援情況取決於搜尋模式以及目標版本對索引/度量的支援狀況。若要了解針對元素層級 StructArray 請求的混合搜尋範圍行為，請查閱您的目標版本。</td></tr>
<tr><td>分組搜尋</td><td>元素層級的分組搜尋可回傳偏移量。針對元素層級 StructArray 請求的混合搜尋分組行為，取決於目標版本。</td></tr>
<tr><td>混合搜尋</td><td>混合搜尋請求僅在目標版本支援該搜尋組合時，才可包含 StructArray 向量子欄位請求。每個請求仍遵循已建立索引之向量子欄位的指標家族。</td></tr>
<tr><td>偏移量輸出</td><td>元素層級的搜尋結果可提供偏移量。EmbeddingList 搜尋會返回實體層級的結果，且不會將元素偏移量作為主要結果單位。</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">篩選與運算子限制<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 的標量篩選由 StructArray 運算子處理，例如 `<code translate="no">element_filter</code> ` 以及 `<code translate="no">MATCH_*</code> ` 系列。詳細的謂詞支援對照表請參閱<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>。</p>
<p>總體而言：</p>
<ul>
<li><p>請僅在 StructArray 運算子內部使用 `<code translate="no">$[subfield]</code> `。</p></li>
<li><p>請使用標量子字段作為標量判據。</p></li>
<li><p>請勿將向量子欄位用作<code translate="no">$[...]</code> 標量判別式的輸入。</p></li>
<li><p>StructArray 元素層級的判別式不支援 JSON 路徑語法、JSON 函式、陣列容器函式、文字比對函式、幾何／GIS 函式，以及 Timestamptz 運算式。</p></li>
<li><p>請優先使用顯式的布林比較（例如<code translate="no">$[has_code] == true</code> ），而非未包裹的布林運算式。</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">相關頁面<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>若要建立 StructArray 欄位，請參閱《<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>》。</p></li>
<li><p>若要插入資料，請參閱<a href="/docs/zh-hant/insert-data-into-structarray-fields.md">《將資料插入 StructArray 欄位</a>》。</p></li>
<li><p>若要建立向量和標量索引，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p></li>
<li><p>若要複習 StructArray 篩選語法，請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》。</p></li>
</ol>
