---
id: operational_faq.md
summary: 尋找有關 Milvus 營運的常見問題的答案。
title: 操作常見問題
---
<h1 id="Operational-FAQ" class="common-anchor-header">操作常見問題<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">如果我從 Docker Hub 拉取 Milvus Docker 映像失敗怎麼辦？</h4><p>如果您從 Docker Hub 拉取 Milvus Docker image 失敗，請嘗試加入其他註冊表鏡像。</p>
<p>中國大陸的使用者可以在<strong>/etc.docker/daemon.json</strong> 的 registry-mirrors array 中加入網址 "https://registry.docker-cn.com"。</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Docker 是安裝和執行 Milvus 的唯一方法嗎？</h4><p>Docker 是部署 Milvus 的有效方法，但不是唯一的方法。您也可以從原始碼部署 Milvus。這需要 Ubuntu (18.04 或更高版本) 或 CentOS (7 或更高版本)。更多資訊請參閱<a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">從原始碼建立 Milvus</a>。</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">影響召回率的主要因素是什麼？</h4><p>召回率主要受索引類型和搜尋參數影響。</p>
<p>對於 FLAT 索引，Milvus 採取集合內的窮盡掃描，100% 回復。</p>
<p>對於 IVF 索引，nprobe 參數決定在資料集中的搜尋範圍。增加 nprobe 會增加搜尋向量的比例和召回率，但會降低查詢效能。</p>
<p>對於 HNSW 索引，ef 參數決定圖搜尋的寬度。增加 ef 會增加在圖表上搜尋的點數量和召回率，但會降低查詢效能。</p>
<p>如需詳細資訊，請參閱<a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">向量索引</a>。</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">為什麼我對配置檔案的變更沒有生效？</h4><p>Milvus 不支援在執行時修改組態檔案。您必須重新啟動 Milvus Docker，配置檔案的變更才會生效。</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">我如何知道 Milvus 是否成功啟動？</h4><p>如果 Milvus 是使用 Docker Compose 啟動的，請執行<code translate="no">docker ps</code> 觀察有多少 Docker 容器正在執行，並檢查 Milvus 服務是否正確啟動。</p>
<p>對於 Milvus 獨立版本，您應該至少可以觀察到三個執行中的 Docker 容器，其中一個是 Milvus 服務，另外兩個是 etcd 管理和儲存服務。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/install_standalone-docker.md">安裝 Milvus standalone</a>。</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">為什麼日誌檔中的時間與系統時間不同？</h4><p>時間不同通常是因為主機不使用 Coordinated Universal Time (UTC)。</p>
<p>Docker 映像中的日誌檔案預設使用 UTC。如果您的主機不使用 UTC，可能會發生這個問題。</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">我如何知道我的 CPU 是否支援 Milvus？</h4><p>Milvus 的運算操作取決於 CPU 對 SIMD (Single Instruction, Multiple Data) 延伸指令集的支援。您的 CPU 是否支援 SIMD 延伸指令集，對 Milvus 的索引建立和向量相似性搜尋至關重要。確保您的 CPU 至少支援下列其中一種 SIMD 指令集：</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>執行 lscpu 指令檢查您的 CPU 是否支援上述 SIMD 指令集：</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">為什麼 Milvus 在啟動時返回<code translate="no">illegal instruction</code> ？</h4><p>Milvus 要求您的 CPU 支援 SIMD 指令集：SSE4.2、AVX、AVX2 或 AVX512。CPU 必須至少支援其中之一，以確保 Milvus 正常運作。在啟動時返回<code translate="no">illegal instruction</code> 錯誤，表示您的 CPU 不支援上述四種指令集中的任何一種。</p>
<p>請參閱<a href="/docs/zh-hant/v2.4.x/prerequisite-docker.md">CPU 對 SIMD 指令集的支援</a>。</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">我可以在 Windows 上安裝 Milvus 嗎？</h4><p>可以，您可以從原始碼或二進位套件編譯在 Windows 上安裝 Milvus。</p>
<p>請參閱<a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">在 Windows 上執行 Milvus</a>了解如何在 Windows 上安裝 Milvus。</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">我在 Windows 上安裝 pymilvus 時出錯。我該怎麼做？</h4><p>不建議在 Windows 上安裝 PyMilvus。但如果您必須在 Windows 上安裝 PyMilvus 但卻發生錯誤，請嘗試在<a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>環境中安裝。更多關於如何在 Conda 環境中安裝 PyMilvus 的資訊，請參閱安裝 Milvus<a href="/docs/zh-hant/v2.4.x/install-pymilvus.md">SDK</a>。</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">我可以在斷線時部署 Milvus 嗎？</h4><p>可以。您可以在離線環境中安裝 Milvus。更多資訊請參閱<a href="/docs/zh-hant/v2.4.x/install_offline-helm.md">離線安裝 Milvus</a>。</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">我在哪裡可以找到 Milvus 產生的日誌？</h4><p>Milvus 日誌預設列印到 stout (標準輸出) 和 stderr (標準錯誤)，然而我們強烈建議在生產中重定向您的日誌到一個持久卷。要這樣做，請更新<strong>milvus.yaml</strong> 中的<code translate="no">log.file.rootPath</code> 。如果您使用<code translate="no">milvus-helm</code> 圖表部署 Milvus，您也需要先透過<code translate="no">--set log.persistence.enabled=true</code> 啟用日誌持久化。</p>
<p>如果您沒有變更設定，使用 kubectl logs &lt;pod-name&gt; 或 docker logs CONTAINER 也可以幫助您找到日誌。</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">在插入資料之前，我可以為一個區段建立索引嗎？</h4><p>可以。但我們建議您在為每個區段建立索引之前，先分批插入資料，每批不應超過 256 MB。</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">我可以在多個 Milvus 實體中共用一個 etcd 實體嗎？</h4><p>是的，您可以在多個 Milvus 實例中共用一個 etcd 實例。要做到這一點，您需要在啟動每個 Milvus 實例之前，將<code translate="no">etcd.rootPath</code> 改為每個實例配置文件中的單獨值。</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">我可以在多個 Milvus 實例中共用一個 Pulsar 實例嗎？</h4><p>是的，您可以在多個 Milvus 實例之間共享一個 Pulsar 實例。要這樣做，你可以</p>
<ul>
<li>如果在你的 Pulsar 实例上启用了多租户，考虑为每个 Milvus 实例分配一个单独的租户或命名空间。要做到這一點，您需要在啟動 Milvus 實例之前，將其配置檔中的<code translate="no">pulsar.tenant</code> 或<code translate="no">pulsar.namespace</code> 改為每個實例的唯一值。</li>
<li>如果您不打算在 Pulsar 實例上啟用多租戶功能，請考慮在啟動 Milvus 實例之前，將配置檔案中的<code translate="no">msgChannel.chanNamePrefix.cluster</code> 變更為每個實例的唯一值。</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">我可以在多個 Milvus 實例中共用一個 MinIO 實例嗎？</h4><p>是的，您可以在多個 Milvus 實體之間共用一個 MinIO 實體。要做到這一點，您需要在啟動每個 Milvus 實例之前，將<code translate="no">minio.rootPath</code> 改為每個 Milvus 實例配置文件中的唯一值。</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">如何處理<code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code> 錯誤訊息？</h4><p>錯誤訊息<code translate="no">Illegal uri [example.db]</code> 表示您嘗試使用早期版本的 PyMilvus 連線到 Milvus Lite，而早期版本的 PyMilvus 並不支援此連線類型。要解決這個問題，請將你的 PyMilvus 安裝升級到至少 2.4.2 版，它包含了對連線到 Milvus Lite 的支援。</p>
<p>您可以使用下列指令升級 PyMilvus：</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">為什麼我得到的結果少於我在搜尋/查詢中設定的<code translate="no">limit</code> ？</h4><p>有幾個原因可能會導致您收到的結果比您指定的<code translate="no">limit</code> 少：</p>
<ul>
<li><p><strong>資料有限</strong>：資料集中可能沒有足夠的實體來滿足您所要求的限制。如果集合中的實體總數少於限制，您自然會收到較少的結果。</p></li>
<li><p><strong>重複的主鍵</strong>：Milvus 在搜尋期間遇到重複的主索引鍵時，會優先處理特定的實體。此行為依據搜尋類型而有所不同：</p></li>
<li><p><strong>查詢 (完全匹配)：</strong>Milvus 選擇具有匹配 PK 的最新實體。 ANN 搜尋：Milvus 選擇相似度得分最高的實體，即使實體共享相同的 PK。 如果您的集合有許多重複的主索引鍵，此優先順序可能會導致比限制更少的唯一結果。</p></li>
<li><p><strong>匹配不足</strong>：您的搜尋篩選表達式可能過於嚴格，導致符合相似性臨界值的實體較少。如果為搜尋設定的條件限制性過高，就不會有足夠的實體符合，導致結果比預期的少。</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>.這是什麼原因造成的，該如何解決？</h4><p>當您嘗試在 Windows 平台上使用 Milvus Lite 時，會發生此錯誤。Milvus Lite主要是為Linux環境設計，對Windows可能沒有本機支援。</p>
<p>解決方法是使用 Linux 環境：</p>
<ul>
<li>使用 Linux 作業系統或虛擬機器來執行 Milvus Lite。</li>
<li>此方法可確保與函式庫的相依性及功能相容。</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Milvus 中的 "Length exceeds max length" 錯誤是什麼？</h4><p>Milvus 中的 "Length exceeds max length "錯誤發生在資料元素的大小超過集合或欄位的最大允許大小時。以下是一些範例和解釋：</p>
<ul>
<li><p>JSON 欄位錯誤：<code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>字串長度錯誤：<code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>VarChar 欄位錯誤：<code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>要了解並處理這些錯誤：</p>
<ul>
<li>瞭解<code translate="no">len(str)</code> 在 Python 中代表字元數，而不是以位元組表示的大小。</li>
<li>對於以字串為基礎的資料類型，例如 VARCHAR 和 JSON，使用<code translate="no">len(bytes(str, encoding='utf-8'))</code> 來決定實際大小 (位元組)，這也是 Milvus 使用 &quot;max-length&quot; 的原因。</li>
</ul>
<p>Python 中的範例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">還有問題嗎？</h4><p>您可以</p>
<ul>
<li>在 GitHub 上查看<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。隨時提出問題、分享想法並幫助他人。</li>
<li>加入我們的<a href="https://discord.com/invite/8uyFbECzPX">Discord 伺服器</a>，尋找支援並參與我們的開放原始碼社群。</li>
</ul>
