---
id: mmap.md
summary: MMap 可以在單一節點中提供更多資料。
title: 支援 MMap 的資料儲存
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">支援 MMap 的資料儲存<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，記憶體映射檔案允許直接將檔案內容映射到記憶體中。此功能增強了記憶體效率，特別是在可用記憶體稀少但完整資料載入不可行的情況下。此最佳化機制可增加資料容量，同時在一定限度內確保效能；但當資料量超出記憶體太多時，搜尋和查詢效能可能會嚴重下降，因此請視情況選擇開啟或關閉此功能。</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">配置記憶體映射<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>從 Milvus 2.4 開始，您可以靈活調整靜態配置檔，在部署前為整個集群配置預設的記憶體映射設定。此外，您也可以選擇動態變更參數，在群集和索引層級微調記憶體映射設定。展望未來，未來的更新將擴展記憶體對應功能，以包含欄位層級的設定。</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">群集部署前：全局配置</h3><p>在部署群集之前，<strong>群集層級</strong>設定會在整個群集套用記憶體對應。這可確保所有新物件都會自動遵循這些組態。值得注意的是，修改這些設定需要重新啟動群集才能生效。</p>
<p>若要調整群集的記憶體映射設定，請編輯<code translate="no">configs/milvus.yaml</code> 檔案。在此檔案中，您可以指定是否預設啟用記憶體映射，並決定儲存記憶體映射檔案的目錄路徑。如果未指定路徑 (<code translate="no">mmapDirPath</code>)，系統預設會將記憶體映射檔案儲存於<code translate="no">{localStorage.path}/mmap</code> 。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">本機儲存相關組態</a>。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>在<code translate="no">2.4.10</code> 之後，配置<code translate="no">queryNode.mmap.mmapEnabled</code> 分成下面四個獨立的欄位，所有預設值都是<code translate="no">false</code> ：</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, 控制向量資料是否為 mmap；</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, 控制向量索引是否為 mmap；</li>
<li><code translate="no">queryNode.mmap.scalarField</code>控制標量資料是否為 mmap；</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>控制標量索引是否為 mmap；</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>此外，只有向量索引和向量資料的 mmap 可以單獨為一個集合開啟或關閉，其他集合則無法開啟或關閉。</p>
<p>相容性：如果原始配置<code translate="no">queryNode.mmap.mmapEnabled</code> 設定為<code translate="no">true</code> ，此時新加入的配置將設定為<code translate="no">true</code> 。如果<code translate="no">queryNode.mmap.mmapEnabled</code> 設定為<code translate="no">false</code> ，如果新增的組態設定為<code translate="no">true</code> ，最終值將是<code translate="no">true</code> 。</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">群集運行期間：動態配置</h3><p>在群集運行期間，您可以在集合或索引層級動態調整記憶體映射設定。</p>
<p>在<strong>集合層級</strong>，記憶體對應會套用至集合內所有未索引的原始資料，但不包括主索引鍵、時間戳記和行 ID。這種方法特別適用於大型資料集的全面管理。</p>
<p>若要動態調整資料集中的記憶體映射設定，請使用<code translate="no">set_properties()</code> 方法。在此，您可以根據需要在<code translate="no">True</code> 或<code translate="no">False</code> 之間切換<code translate="no">mmap.enabled</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>在<code translate="no">2.4.10</code> 之後，使用<code translate="no">add_field</code> 方法來調整資料集中的記憶體對應設定。在此，您可以根據需要在<code translate="no">True</code> 或<code translate="no">False</code> 之間切換<code translate="no">mmap_enabled</code> 。</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於<strong>索引層級</strong>設定，記憶體映射可特別套用至向量索引，而不會影響其他資料類型。此功能對於需要優化向量搜尋效能的資料集來說非常寶貴。</p>
<p>若要啟用或停用集合內索引的記憶體映射，請呼叫<code translate="no">alter_index()</code> 方法，在<code translate="no">index_name</code> 中指定目標索引名稱，並將<code translate="no">mmap.enabled</code> 設為<code translate="no">True</code> 或<code translate="no">False</code> 。</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">在不同部署中自訂儲存路徑<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>記憶體映射檔案預設為<code translate="no">localStorage.path</code> 內的<code translate="no">/mmap</code> 目錄。以下是如何在各種部署方法中自訂此設定：</p>
<ul>
<li>對於使用 Helm Chart 安裝的 Milvus：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>使用 Milvus Operator 安裝的 Milvus：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>適用於使用 Docker 安裝的 Milvus：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>記憶體映射無法針對已載入的集合啟用，請在啟用記憶體映射前確認該集合已釋放。</p></li>
<li><p>DiskANN 或 GPU 類索引不支援記憶體映射。</p></li>
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
    </button></h2><ul>
<li><p><strong>建議在哪些情況下啟用記憶體映射？啟用此功能後會有哪些取捨？</strong></p>
<p>當記憶體有限或效能需求適中時，建議啟用記憶體映射。啟用此功能可增加資料載入的容量。例如，在 2 個 CPU 和 8 GB 記憶體的組態下，啟用記憶體映射可讓載入的資料比未啟用多 4 倍。對效能的影響各有不同：</p>
<ul>
<li><p>在記憶體充足的情況下，預期效能與僅使用記憶體的效能相似。</p></li>
<li><p>記憶體不足時，預期效能可能會降低。</p></li>
</ul></li>
<li><p><strong>集合層級和索引層級配置之間的關係是什麼？</strong></p>
<p>集合層級和索引層級不是包含的關係，集合層級控制原始資料是否啟用 mmap，而索引層級只適用於向量索引。</p></li>
<li><p><strong>有沒有任何適用於記憶體映射的推薦索引類型？</strong></p>
<p>有，建議使用 HNSW 來啟用 mmap。我們之前測試過 HNSW、IVF_FLAT、IVF_PQ/SQ 系列索引，IVF 系列索引的效能下降很嚴重，而 HNSW 索引開啟 mmap 後效能下降仍在預期範圍內。</p></li>
<li><p><strong>記憶體映射需要什麼樣的本機儲存空間？</strong></p>
<p>高品質的磁碟可提升效能，NVMe 硬碟是首選。</p></li>
<li><p><strong>標量資料可以進行記憶體映射嗎？</strong></p>
<p>記憶體映射可應用於標量資料，但不適用於建立在標量欄位上的索引。</p></li>
<li><p><strong>不同層級的記憶體映射配置的優先順序如何決定？</strong></p>
<p>在 Milvus 中，當記憶體映射配置在多個層級中明確定義時，索引層級和集合層級配置共享最高優先級，然後是群集層級配置。</p></li>
<li><p><strong>如果我從 Milvus 2.3 升級，並配置了記憶體映射目錄路徑，會發生什麼？</strong></p>
<p>如果您從 Milvus 2.3 升級，並已配置記憶體映射目錄路徑 (<code translate="no">mmapDirPath</code>)，您的配置將被保留，啟用記憶體映射的預設設定 (<code translate="no">mmapEnabled</code>) 將為<code translate="no">true</code> 。遷移元資料以同步您現有記憶體映射檔案的設定是很重要的。如需詳細資訊，請參閱<a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">遷移元資料</a>。</p></li>
</ul>
