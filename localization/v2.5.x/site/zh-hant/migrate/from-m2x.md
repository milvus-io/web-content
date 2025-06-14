---
id: from-m2x.md
summary: 本指南提供從 Milvus 2.3.x 遷移資料至 Milvus 2.3.x 或更高版本的全面、逐步過程。
title: 從 Milvus 2.3.x
---

<h1 id="From-Milvus-23x" class="common-anchor-header">從 Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供從 Milvus 2.3.x 遷移資料到 Milvus 2.3.x 或更高版本的全面、逐步過程。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>軟體版本</strong>：<ul>
<li>源 Milvus: 2.3.0+ (工具使用迭代器來取得源收集資料，要求源 Milvus 為 2.3.0 或以上版本。)</li>
<li>目標 Milvus: 2.3.0+</li>
</ul></li>
<li><strong>所需的工具</strong>：<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具。安裝細節請參考<a href="/docs/zh-hant/v2.5.x/milvusdm_install.md">安裝遷移工具</a>。</li>
</ul></li>
<li><strong>資料準備</strong>：<ul>
<li>確保源 Milvus 套件已載入，並為資料匯出做好準備。</li>
<li>如果目標 Milvus 沒有包含與源集合相對應的集合，<a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a>工具會自動建立它。請注意，在遷移之後，目標資料集將不會被編制索引，您必須在之後手動編制資料集索引。</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">設定遷移檔案<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>將範例的遷移設定檔儲存為<code translate="no">migration.yaml</code> ，並根據您的實際情況修改設定。您可以自由地將設定檔放在任何本機目錄中。</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
mode: config
version: 2.3.0
collection: src_table_name

<span class="hljs-built_in">source</span>:
milvus2x:
endpoint: {milvus2x_domain}:{milvus2x_port}
username: xxxx
password: xxxxx

target:
milvus2x:
endpoint: {milvus2x_domain}:{milvus2x_port}
username: xxxx
password: xxxxx
<button class="copy-code-btn"></button></code></pre>

<p>下表描述了示例配置文件中的參數。如需更多資訊，請參考<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration：Milvus2.x 到 Milvus2.x</a>。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>遷移工作的作業模式。從 Milvus 2.x 遷移時設定為 milvus2x。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>每批從 Milvus 2.x 讀取的緩衝區大小。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>指定讀取元檔案的位置。設定為 config，表示可以從這個 migration.yaml 檔案取得 meta config。</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>來源 Milvus 版本。設定為 2.3.0 或以上。</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>來源集合名稱。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>來源 Milvus 伺服器的位址。</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>來源 Milvus 伺服器的使用者名稱。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/authenticate.md">啟用驗證</a>。</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>來源 Milvus 伺服器的密碼。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/authenticate.md">啟用驗證</a>。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>參數</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>目標 Milvus 伺服器的位址。</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>目標 Milvus 伺服器的使用者名稱。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/authenticate.md">啟用驗證</a>。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>目標 Milvus 伺服器的密碼。如果您的 Milvus 伺服器啟用使用者驗證，則必須使用此參數。如需更多資訊，請參閱<a href="/docs/zh-hant/v2.5.x/authenticate.md">啟用驗證</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">開始遷移工作<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>您有兩個選項來啟動遷移工作 - 使用 CLI 或提出 API 請求。選擇最適合您需求的一個。</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">選項 1：使用 CLI</h3><p>使用下列指令啟動轉移工作。將<code translate="no">{YourConfigFilePath}</code> 改為配置檔案<code translate="no">migration.yaml</code> 所在的本機目錄。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>監控日誌的進度更新。成功的遷移記錄應包括以下項目：</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">選項 2：提出 API 請求</h3><p>您也可以使用 Restful API 來執行遷移。啟動 API 伺服器：</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>伺服器成功啟動後，將<code translate="no">migration.yaml</code> 檔案放置在專案的<code translate="no">configs/</code> 目錄中，並使用： 開始遷移：</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">驗證結果<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>遷移任務完成後，使用 Attu 檢視已遷移的實體數量。此外，您可以在 Attu 中建立索引和載入集合。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/attu">Attu</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>。</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">其他配置選項<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>除了上述的基本設定外，您也可以根據您的特定需求，新增額外的設定。</p>
<ul>
<li><p><strong>選擇性欄位遷移</strong>：如果您需要僅遷移集合中的特定欄位，而非所有欄位，請在<code translate="no">migration.yaml</code> 檔案的<code translate="no">meta</code> 部分指定要遷移的欄位。</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>自訂目標集合</strong>：若要自訂目標集合的屬性，請在<code translate="no">migration.yaml</code> 檔案的<code translate="no">meta</code> 區段中加入相關設定。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>詳細資訊請參考<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration：Milvus2.x 至 Milvus2.x</a>。</p>
