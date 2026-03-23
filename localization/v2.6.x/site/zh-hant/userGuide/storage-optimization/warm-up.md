---
id: warm-up.md
title: 預熱Compatible with Milvus 2.6.4+
summary: >-
  預熱功能可在區段變為可查詢之前，將選定欄位或索引預先載入快取記憶體，以補充分層式儲存。您可以在群集、集合或個別欄位/索引層級設定預熱，允許對首次查詢延遲和資源使用進行精細控制。
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">預熱<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>預熱</strong>功能可在區段變為可查詢之前，預先將選取的欄位或索引載入快取記憶體，以補充分層式儲存。您可以在群集、集合或個別欄位/索引層級設定預熱，允許對首次查詢延遲和資源使用進行精細控制。</p>
<h2 id="Why-warm-up" class="common-anchor-header">為什麼要預熱<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>分層儲存中的<a href="/docs/zh-hant/tiered-storage-overview.md#Phase-1-Lazy-load">懶散</a>載入透過最初僅載入元資料來提高效率。但是，這可能會在首次查詢冷資料時造成延遲，因為所需的資料塊或索引必須從遠端儲存取得。</p>
<p><strong>Warm Up</strong>可在區段初始化期間主動快取關鍵資料，從而解決這個問題。</p>
<p>它在下列情況下特別有用</p>
<ul>
<li><p>某些標量索引經常用於篩選條件。</p></li>
<li><p>向量索引對搜尋效能非常重要，必須立即就緒。</p></li>
<li><p>QueryNode 重新啟動或新區段載入後的冷啟動延遲是不可接受的。</p></li>
</ul>
<p>相反地，對於不常被查詢的欄位或索引，<strong>不建議</strong>使用「預熱」功能。停用「預熱」功能可縮短區段載入時間，並節省快取記憶體空間，非常適合大型向量欄位或非關鍵的標量欄位。</p>
<h2 id="Configuration-levels" class="common-anchor-header">設定等級<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
   <tr>
     <th><p><strong>層級</strong></p></th>
     <th><p><strong>範圍</strong></p></th>
     <th><p><strong>設定方法</strong></p></th>
     <th><p><strong>優先順序</strong></p></th>
   </tr>
   <tr>
     <td><p>欄位/索引</p></td>
     <td><p>單一欄位或索引</p></td>
     <td><p>SDK 方法： </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>最高</p></td>
   </tr>
   <tr>
     <td><p>集合</p></td>
     <td><p>集合中的所有欄位/索引</p></td>
     <td><p>SDK 方法：</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p>群集</p></td>
     <td><p>群集中的所有集合</p></td>
     <td><p><code translate="no">milvus.yaml</code> 配置檔案</p></td>
     <td><p>最低 (預設)</p></td>
   </tr>
</table>
<p><strong>覆寫行為：</strong></p>
<ul>
<li><p>如果欄位有自己的暖機設定，則該設定優先於集合層級和群集層級設定。</p></li>
<li><p>如果沒有欄位或索引層級設定，則集合層級設定適用。</p></li>
<li><p>如果欄位或索引層級或集合層級設定都不存在，則群組層級設定適用。</p></li>
<li><p>使用變更作業時，最新的變更值會生效。</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">在群集層級設定暖機<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>群集層級的暖機是在 Milvus 配置檔案<code translate="no">milvus.yaml</code> 中設定，並適用於群集中的所有集合。這是基線預設值。</p>
<p>每個目標類型支援兩種設定：</p>
<table>
   <tr>
     <th><p>暖機設定</p></th>
     <th><p>說明</p></th>
     <th><p>典型情況</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>在區段可查詢之前預先載入。載入時間會稍微增加，但第一次查詢不會產生延遲。</p></td>
     <td><p>用於必須立即可用的效能關鍵資料，例如搜尋中使用的高頻標量索引或關鍵向量索引。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>跳過預載。區段變得更快可供查詢，但第一次查詢可能會觸發依需求載入。</p></td>
     <td><p>適用於不常存取或大型資料，例如原始向量欄位或非關鍵的標量欄位。</p></td>
   </tr>
</table>
<p><strong>範例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>預熱設定</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入標量欄位資料。</p></td>
     <td><p>僅當標量字段較小且在篩選器中經常被存取時，才使用<code translate="no">sync</code> 。否則，<code translate="no">disable</code> ，以減少載入時間。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入標量索引。</p></td>
     <td><p>對於涉及頻繁篩選條件或範圍查詢的標量索引，請使用<code translate="no">sync</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入向量欄位資料。</p></td>
     <td><p>一般<code translate="no">disable</code> ，以避免大量使用快取記憶體。僅在搜尋後必須立即擷取原始向量時，才啟用<code translate="no">sync</code> (例如，具有向量召回功能的相似性結果)。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入向量索引。</p></td>
     <td><p>對於對搜尋延遲非常重要的向量索引，請使用<code translate="no">sync</code> 。在批次或低頻率的工作負載中，<code translate="no">disable</code> ，以獲得更快的分段準備。</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">在資料集層級設定暖機<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>集合層級預熱可讓您覆寫特定集合的群集預設值。當某個資料集的存取模式與群集範圍基準不同時，這將非常有用。</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">建立資料集時設定暖機<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">更改現有資料集中的暖機設定<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>您必須在呼叫<code translate="no">load()</code> 前變更集合屬性。更改已載入的集合會返回錯誤。對暖機設定的變更會在下次載入集合時生效。</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>屬性參考</strong>：</p>
<table>
   <tr>
     <th><p><strong>屬性</strong></p></th>
     <th><p><strong>預熱設定</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>集合中所有標量欄位的預熱設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>集合中所有標量索引的預熱設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>集合中所有向量欄位的預熱設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>集合中所有向量索引的暖機設定。</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">在欄位層級設定暖機<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>欄位層級熱身提供最細緻的粒度，讓您可以控制個別欄位的熱身行為。這在特定欄位具有獨特存取模式時非常有用。</p>
<p>欄位層級暖<strong>機僅</strong>適用於<strong>欄位原始資料</strong>，而不適用於該欄位上的索引。若要為索引設定暖機，請使用索引<a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">層級設定</a>。</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">建立欄位時設定預熱<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">更改現有欄位的預熱設定<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p>您必須在呼叫<code translate="no">load()</code> 之前更改欄位設定。更改已載入集合上的欄位會返回錯誤。對暖機設定的變更會在下次載入集合時生效。</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">在索引層級設定暖機<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>索引層級的預熱可讓您控制個別索引的預載，而不受底層欄位的預熱設定影響。</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">在建立索引時設定預熱<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">更改現有索引的預熱設定<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p>您必須在呼叫<code translate="no">load()</code> 之前更改索引設定。更改已載入集合上的索引會返回錯誤。暖身設定的變更會在下次載入集合時生效。</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">熱身行為參考<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>下表總結段生命週期不同階段的暖機行為。</p>
<table>
   <tr>
     <th><p><strong>暖機設定</strong></p></th>
     <th><p><strong>載入階段</strong></p></th>
     <th><p><strong>搜尋/查詢階段</strong></p></th>
     <th><p><strong>釋放階段</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>資料載入本機儲存。目的地 (磁碟或記憶體) 取決於 mmap 設定。</p></td>
     <td><p>查詢直接命中本機快取記憶體。</p></td>
     <td><p>本地快取資料被清除。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>資料未載入本機儲存。</p></td>
     <td><p>根據需求從物件儲存取得資料，然後根據 mmap 設定在本機快取。</p></td>
     <td><p>本機快取資料會被清除。</p></td>
   </tr>
</table>
<p><strong>與 mmap 互動：</strong></p>
<table>
   <tr>
     <th><p><strong>預熱設定</strong></p></th>
     <th><p><strong>啟用 mmap</strong></p></th>
     <th><p><strong>資料位置</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>本機磁碟 (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>本機記憶體</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>首次存取時取至本機磁碟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>首次存取時取至本機記憶體</p></td>
   </tr>
</table>
<p><strong>本地快取目錄結構 (當 mmap 已啟用)：</strong></p>
<table>
   <tr>
     <th><p><strong>資料類型</strong></p></th>
     <th><p><strong>目錄路徑</strong></p></th>
   </tr>
   <tr>
     <td><p>標量/向量欄位資料</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>標量/向量索引檔案</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">最佳做法<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>預熱只會影響初始載入。如果快取資料之後被驅逐，下一次查詢會依需求重新載入。</p>
<ul>
<li><p>避免過度使用<code translate="no">sync</code> 。預載太多欄位會增加載入時間和快取記憶體壓力。</p></li>
<li><p>以保守的方式開始 - 只對經常存取的欄位和索引啟用「預熱」功能。</p></li>
<li><p>監控查詢延遲和快取記憶體指標，然後視需要擴大預載。</p></li>
<li><p>對於混合工作負載，將<code translate="no">sync</code> 應用於對效能敏感的集合，將<code translate="no">disable</code> 應用於以容量為導向的集合。</p></li>
</ul>
