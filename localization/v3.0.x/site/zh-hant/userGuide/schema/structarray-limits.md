---
id: structarray-limits.md
title: StructArray 限制
summary: >-
  StructArray 的支援範圍涵蓋模式定義、插入資料、索引建立、搜尋模式，以及 StructArray 專屬的篩選器。在生產環境中依賴
  StructArray 的行為之前，請將此頁面作為限制參照。
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray 限制<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 的主要限制如下：</p>
<table>
<thead>
<tr><th>範疇</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>模式結構</td><td>Struct 僅可作為 Array 欄位的元素類型使用。不支援將 Struct 作為頂層集合欄位。</td></tr>
<tr><td>子欄位架構</td><td>同一 StructArray 字段中的所有 Struct 元素共用一個預先定義的 Struct 模式。</td></tr>
<tr><td>嵌套子欄位</td><td>自 Milvus 3.0.6 起，Struct 可包含單一嵌套層級的標量型<code translate="no">ARRAY</code> 子欄位。任何版本均不支援嵌套的<code translate="no">Struct</code> 、<code translate="no">ArrayOfStruct</code> 及 JSON 子欄位。</td></tr>
<tr><td>容量</td><td><code translate="no">max_capacity</code> 為必填欄位，並限制單一實體可在 StructArray 欄位中儲存的 Struct 元素數量。</td></tr>
<tr><td>子欄位變更</td><td>自 Milvus 3.0.6 起，您可以向現有的 StructArray 欄位新增一個元素可為 null 的子欄位，或從中移除子欄位。較早版本則需要先移除整個 StructArray 欄位，再重新新增。</td></tr>
<tr><td>子欄位路徑</td><td>請使用<code translate="no">structArray[subfield]</code> 路徑（例如<code translate="no">chunks[emb]</code> ），作為索引、搜尋目標、輸出欄位及篩選條件。請勿使用<code translate="no">chunks.emb</code> 。</td></tr>
<tr><td>插入形狀</td><td>將 StructArray 欄位插入為物件陣列。請勿在插入載荷中使用路徑語法。</td></tr>
<tr><td>向量索引</td><td>向量欄位或向量子欄位僅接受一個索引。請分別使用獨立的向量子欄位進行 EmbeddingList 搜尋與元素層級搜尋。</td></tr>
<tr><td>函式</td><td>StructArray 欄位內的欄位或子欄位不支援欄位函式。</td></tr>
<tr><td>可為空的欄位</td><td>可為空的 StructArray 欄位受版本限制。行層級的空值會套用至整個 StructArray 欄位。自 Milvus 3.0.6 起，子欄位可額外允許個別 Struct 元素為空值：針對標量或向量子欄位使用 `<code translate="no">nullable=True</code> `，針對陣列子欄位使用 `<code translate="no">element_nullable=True</code> `。Struct 元素本身不得為空。</td></tr>
<tr><td>動態新增欄位</td><td>將 StructArray 欄位新增至現有集合的功能受版本限制，且新增的欄位必須為可為空的。</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">模式限制<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 模式有以下限制：</p>
<table>
<thead>
<tr><th>限制</th><th>詳細說明</th></tr>
</thead>
<tbody>
<tr><td>Struct 不能作為頂層欄位類型。</td><td>建立一個 StructArray 欄位，其結構定義為 `<code translate="no">datatype=DataType.ARRAY</code> `，並包含 `<code translate="no">element_type=DataType.STRUCT</code> ` 及 `<code translate="no">struct_schema</code>`。</td></tr>
<tr><td>所有元素共用一個架構。</td><td>StructArray 欄位中的每個 Struct 元素均遵循相同的子欄位清單和子欄位資料類型。</td></tr>
<tr><td><code translate="no">max_capacity</code> 此欄位為必填。</td><td>一個實體中的 Struct 元素數量不得超過為 StructArray 欄位所設定的<code translate="no">max_capacity</code> 。</td></tr>
<tr><td>標量<code translate="no">ARRAY</code> 子欄位具有每個子欄位的<code translate="no">max_capacity</code> 。</td><td>標量<code translate="no">ARRAY</code> 子欄位會為其內部陣列宣告<code translate="no">max_capacity</code> ，若某個Struct元素的內部陣列超過該子欄位宣告的容量，Milvus將拒絕該Struct元素。各子欄位的值無需一致。該值必須大於0，且不得超過<code translate="no">proxy.maxArrayCapacity</code> ，其預設值為4096。</td></tr>
<tr><td>在 Milvus 3.0.6 及後續版本中，子欄位可進行演進。</td><td>可新增一個元素可為 null 的子欄位，或透過其路徑（例如<code translate="no">chunks[lang]</code> ）移除子欄位。您無法移除 StructArray 欄位的最後一個子欄位、集合中的最後一個向量欄位，或函式所使用的子欄位。在較早版本中，請先移除 StructArray 欄位，然後使用更新的架構重新新增該欄位。</td></tr>
<tr><td>不支援嵌套 Struct。</td><td>Struct 無法包含嵌套的<code translate="no">Struct</code> 、<code translate="no">ArrayOfStruct</code> 或 JSON 子欄位。自 Milvus 3.0.6 起，Struct 可包含單一嵌套層級的標量<code translate="no">ARRAY</code> 子欄位。<code translate="no">ARRAY</code> 子欄位無法包含向量。</td></tr>
<tr><td>StructArray 內部不支援函式。</td><td>請勿為 StructArray 欄位或其子欄位定義欄位函式。</td></tr>
<tr><td>StructArray 欄位的欄位屬性受到限制。</td><td>自 Milvus 3.0.6 起，對 StructArray 欄位或子欄位路徑執行<code translate="no">alter_collection_field()</code> 時，僅接受<code translate="no">mmap.enabled</code> 、<code translate="no">field.description</code> 及<code translate="no">warmup</code> 。其他屬性（例如<code translate="no">max_capacity</code> 和<code translate="no">max_length</code> ）將被拒絕。</td></tr>
<tr><td>子欄位不支援文字分析。</td><td>若在 Struct 子欄位上設定<code translate="no">enable_match</code> 或<code translate="no">enable_analyzer</code> ，系統將拒絕該設定。文字索引僅針對頂層欄位建立。</td></tr>
</tbody>
</table>
<p>有關架構建立的範例，請參閱「<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位」</a>。</p>
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
    </button></h2><p>StructArray 子欄位會映射至實體陣列式的儲存方式。下表列出受支援與不受支援的實體類型：</p>
<table>
<thead>
<tr><th>Struct 子欄位的實體類型</th><th>支援</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>受支援</td><td>將子欄位定義為 `<code translate="no">DataType.BOOL</code>`。</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 或<code translate="no">DataType.INT64</code> 。</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT</code> 或<code translate="no">DataType.DOUBLE</code> 。</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.VARCHAR</code> ，並設定<code translate="no">max_length</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.FLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BFLOAT16_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.INT8_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>受支援</td><td>將子欄位定義為<code translate="no">DataType.BINARY_VECTOR</code> ，並設定<code translate="no">dim</code> 。</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>不支援</td><td>StructArray 欄位不支援稀疏向量子欄位。</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>不支援</td><td>請使用 `<code translate="no">VARCHAR</code>`，而非 `<code translate="no">String</code>`。</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>不支援</td><td>StructArray 欄位不支援 JSON 子欄位。</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>不支援</td><td>StructArray 欄位不支援幾何子欄位和 GIS 函式。</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>不支援</td><td>StructArray 欄位不支援文字子欄位。</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>不支援</td><td>StructArray 欄位不支援 Timestamptz 子欄位及時間特定運算式。</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>在 Milvus 3.0.6 及後續版本中受支援</td><td>將子欄位定義為<code translate="no">DataType.ARRAY</code> ，其中包含標量<code translate="no">element_type</code> ，並以<code translate="no">max_capacity</code> 作為內層陣列。如此一來，每個 Struct 元素便會包含一個內層陣列。請將子欄位的<code translate="no">nullable=True</code> 設定為允許內層陣列為 null，並將<code translate="no">element_nullable=True</code> 設定為允許其內部包含 null 值。</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code> 、 、 、vectors、 ，或<code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>不支援</td><td>結構體內的陣列嵌套僅限於一級，內層陣列不能包含向量，且不支援嵌套的結構體或「陣列中的結構體」子欄位。</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">可為空與動態模式的限制<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>下表說明可為空的 StructArray 行為以及動態 StructArray 欄位的新增，但須受以下可用性聲明所限：</p>
<table>
<thead>
<tr><th>功能</th><th>限制</th></tr>
</thead>
<tbody>
<tr><td>可為空的 StructArray 欄位</td><td>在符合以下可用性聲明的前提下，請在 StructArray 父元素上設定 `<code translate="no">nullable=True</code> `；請勿獨立將 Struct 子欄位設定為可為空。</td></tr>
<tr><td>Python 中的 NULL 值</td><td>請使用 `<code translate="no">None</code> ` 在 Python 中插入空的 StructArray 值。請勿使用 `<code translate="no">Null</code> ` 或 `<code translate="no">null</code>`。</td></tr>
<tr><td>NULL 的作用範圍</td><td>NULL 適用於整個 StructArray 欄位。例如，<code translate="no">chunks=None</code> 僅在<code translate="no">chunks</code> 可設為 null 時才有效。</td></tr>
<tr><td>部分可為空的 StructArray 值</td><td>當 StructArray 欄位包含有效的陣列值時，請勿在同一個值中混合使用可為 null 的子欄位陣列與有效的子欄位陣列。</td></tr>
<tr><td>元素層級的 null</td><td>此功能於 Milvus 3.0.6 及後續版本中支援。標量、向量或 `<code translate="no">ARRAY</code> ` 子欄位可允許個別 Struct 元素具有空值：標量或向量子欄位設定為 `<code translate="no">nullable=True</code> `，<code translate="no">ARRAY</code> 子欄位設定為 `<code translate="no">element_nullable=True</code> `。行層級的 `<code translate="no">nullable</code> ` 設定仍來自 StructArray 父元素；若在子欄位上設定 `<code translate="no">nullable=True</code> `，則啟用元素層級的空值，而非行層級的空值。</td></tr>
<tr><td>Struct 元素的 null 值</td><td>Struct 元素本身不能為 null，例如<code translate="no">[null, {...}]</code> 。請改為將該元素的子欄位值設為 null。</td></tr>
<tr><td>省略的子欄位</td><td>自 Milvus 3.0.6 起，您可以省略 Struct 元素中可為 null 的子欄位，Milvus 會為其儲存 null 值。不可為 null 的子欄位必須出現在每個 Struct 元素中。在較早版本中，每個 Struct 元素都必須提供所有子欄位。</td></tr>
<tr><td>動態新增 StructArray 欄位</td><td>須受下文所述的可用性聲明限制。</td></tr>
<tr><td>動態新增的空值要求</td><td>新增至現有集合的 StructArray 欄位必須為可為空，因為現有實體對於新欄位尚無值。</td></tr>
<tr><td>動態新增後的現有實體</td><td>現有實體針對新增的 StructArray 欄位會傳回 `<code translate="no">null</code> `。</td></tr>
<tr><td>動態新增子欄位</td><td>此功能自 Milvus 3.0.6 及後續版本起支援。新增的子欄位必須以 `<code translate="no">nullable=True</code>` 建立；若新增的是 `<code translate="no">ARRAY</code> ` 子欄位，則需額外使用 `<code translate="no">element_nullable=True</code> ` 來表示內層陣列中的空值。現有實體在其每個 `Struct` 元素中，針對新子欄位會返回 `null`；而 `StructArray` 欄位原本為 `null` 的實體，其值仍維持為 `null`。</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 及後續版本在獨立執行和分散式部署中，皆支援可為 null 的 StructArray 欄位、可為 null 的向量陣列，以及動態新增 StructArray 欄位。較早版本的 Milvus 不支援這些功能。</p>
<p>Milvus 3.0.6 及後續版本還額外支援元素層級的 null 值、標量型<code translate="no">ARRAY</code> 子欄位，以及新增或刪除現有 StructArray 欄位的子欄位。這些功能需要 Storage V2 才能運作，且在外部集合中不可用。</p>
<p>在 Zilliz Cloud 中，這些功能僅適用於運行 Milvus 3.0.0 或更新版本的隨需叢集（On-Demand Clusters）。服務叢集（Serving Clusters）不支援這些功能。</p>
<p>有關可為 null 的 StructArray 欄位的插入範例，請參閱<a href="/docs/zh-hant/insert-data-into-structarray-fields.md">《將資料插入 StructArray 欄位》</a>。</p>
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
    </button></h2><p>StructArray 插入資料包有以下限制：</p>
<table>
<thead>
<tr><th>限制</th><th>詳細資訊</th></tr>
</thead>
<tbody>
<tr><td>資料包形狀</td><td>請將 StructArray 欄位插入為 Struct 物件的陣列，例如<code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 。</td></tr>
<tr><td>子欄位名稱</td><td>在每個 Struct 物件內部，請使用子欄位名稱（例如<code translate="no">text</code> 和<code translate="no">emb</code> ），而非路徑（例如<code translate="no">chunks[text]</code> ）。</td></tr>
<tr><td>模式對齊</td><td>每個 Struct 元素必須符合 Struct 模式。自 Milvus 3.0.6 起，Struct 元素中的可為空子欄位可省略，或設定為<code translate="no">null</code> 。</td></tr>
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
    </button></h2><p>StructArray 向量子欄位可針對「嵌入清單 (EmbeddingList)」搜尋或「元素層級」搜尋進行索引。同一個向量子欄位無法同時使用這兩種度量族，因為每個向量欄位或向量子欄位僅能接受一種索引。各搜尋模式使用以下度量族：</p>
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
<p>StructArray 向量子欄位會計入集合層級限制<code translate="no">proxy.maxVectorFieldNum</code> 的向量欄位總數中，該限制預設為 10。若某個 StructArray 欄位的向量子欄位是該集合中唯一的向量欄位，則該欄位為有效；若刪除此類欄位會導致集合中沒有向量欄位，則刪除操作將被拒絕。 請確保向量欄位與向量子欄位的總數符合目標版本及服務層級的限制。</p>
<p>自 Milvus 3.0.6 起，元素可為空的向量子欄位僅支援使用常規向量指標進行元素層級搜尋。針對元素可為空的向量子欄位，<code translate="no">MAX_SIM*</code> 指標、EmbeddingList 索引及 EmbeddingList 搜尋均會遭拒，且<code translate="no">AUTOINDEX</code> 不會為其選取<code translate="no">MAX_SIM*</code> 指標。 空向量不會參與搜尋。在元素可為空的子欄位或標量<code translate="no">ARRAY</code> 子欄位上，不支援標量索引。</p>
<p>有關受支援的索引類型與度量類型組合，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">Index StructArray Fields</a>》。</p>
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
    </button></h2><p>StructArray 的搜尋行為有以下限制：</p>
<table>
<thead>
<tr><th>搜尋行為</th><th>支援與限制</th></tr>
</thead>
<tbody>
<tr><td>基本 EmbeddingList 搜尋</td><td>支援以<code translate="no">MAX_SIM*</code> 度量進行索引的 StructArray 向量子欄位。回傳實體層級的結果。</td></tr>
<tr><td>基本元素層級搜尋</td><td>支援以常規向量指標索引的 StructArray 向量子欄位。可回傳匹配元素的偏移量。</td></tr>
<tr><td>範圍搜尋</td><td>支援情況取決於搜尋模式以及目標版本對索引/度量的支援。若要了解針對元素層級 StructArray 請求的混合搜尋範圍行為，請查閱您的目標版本。</td></tr>
<tr><td>分組搜尋</td><td>元素層級的分組搜尋可返回偏移量。針對元素層級 StructArray 請求的混合搜尋分組行為，取決於目標版本。</td></tr>
<tr><td>混合搜尋</td><td>混合搜尋請求僅能在目標版本支援該搜尋組合的情況下，包含 StructArray 向量子欄位請求。每個請求仍遵循已建立索引之向量子欄位的指標家族。</td></tr>
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
<li><p>行級篩選表達式亦可直接參照 StructArray 路徑：<code translate="no">chunks[0][section]</code> 用於單一元素位置、<code translate="no">array_length(chunks)</code> 用於元素計數、<code translate="no">array_contains(chunks[section], ...)</code> 用於跨元素的子欄位值，以及<code translate="no">chunks is null</code> 用於可為空的 StructArray 欄位。</p></li>
<li><p>請使用標量子欄位來處理標量判別式。</p></li>
<li><p>請勿將向量子欄位用作<code translate="no">$[...]</code> 的標量判別式輸入。</p></li>
</ul>
<ul>
<li>StructArray 元素層級的謂詞不支援 JSON 路徑語法、JSON 函數、文字比對函數、幾何／GIS 函數以及 Timestamptz 表達式。自 Milvus 3.0.6 起，在<code translate="no">$[subfield]</code> 上，<code translate="no">array_contains</code> 、<code translate="no">array_contains_any</code> 、<code translate="no">array_contains_all</code> 以及<code translate="no">array_length</code> 皆適用於標量<code translate="no">ARRAY</code> 子欄位，而<code translate="no">$[subfield] is null</code> ／<code translate="no">is not null</code> 則適用於所有子欄位類型。</li>
</ul>
<ul>
<li>自 Milvus 3.0.6 起，若 Struct 元素中的子欄位值為 null，該元素的謂詞將被視為「未知」而非「false」。<code translate="no">element_filter</code> 僅保留謂詞為 true 的元素，而<code translate="no">MATCH_*</code> 則將「未知」元素計為未命中。詳情請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》。</li>
</ul>
<ul>
<li>請優先使用顯式的布林比較（例如 `<code translate="no">$[has_code] == true</code> `），而非直接使用布林運算式。</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">匯入與儲存限制<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>來源檔案格式</td><td>JSON、JSONL、CSV 和 Parquet 檔案可包含 StructArray 欄位。NumPy 檔案會針對每個頂層欄位各存儲一個檔案，且無法提供 StructArray 資料；若集合包含 StructArray 欄位，請使用 JSON、CSV 或 Parquet 檔案。關於檔案形狀，請參閱「<a href="/docs/zh-hant/prepare-source-data.md#StructArray-fields-in-source-files">準備來源資料</a>」。</td></tr>
<tr><td>儲存格式</td><td>元素可為空的子欄位以及標量<code translate="no">ARRAY</code> 子欄位需要 Storage V2。對於使用這些子欄位的集合，無法存取 Storage V1：建立集合和插入資料時看似成功，但在寫入時資料會失敗，這並非受支援的狀態。 若 Storage V3 的 `<code translate="no">common.storage.enableGrowingSourceFlush</code> ` 設定為 `<code translate="no">true</code> `，則會拒絕使用元素可為空子欄位或標量 `<code translate="no">ARRAY</code> ` 子欄位的請求。</td></tr>
<tr><td>外部集合</td><td><code translate="no">ARRAY</code> 外部集合不支援元素可為空的子欄位以及標量 子欄位。</td></tr>
<tr><td>備份與快照匯入</td><td>對於包含元素可為空子欄位或標量<code translate="no">ARRAY</code> 子欄位的集合，將拒絕執行二進位日誌匯入（例如備份還原）及快照來源匯入。</td></tr>
<tr><td>降級</td><td>包含元素可為空子欄位或標量<code translate="no">ARRAY</code> 子欄位的集合，無法在 Milvus 3.0.6 之前的版本上運行。若在較舊的版本上重播預寫日誌（Binlog），系統將發生異常終止。重新升級至 Milvus 3.0.6 或更新版本可恢復資料。</td></tr>
</tbody>
</table>
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
<li><p>若要檢視 StructArray 篩選器語法，請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》。</p></li>
</ol>
