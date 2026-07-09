---
id: bulk-import-in-cdc-replication.md
summary: 瞭解如何針對使用 CDC 複製的 Milvus 叢集執行批次匯入。
title: CDC 複製中的批次匯入
---
<h1 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">CDC 複製中的批次匯入<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何針對屬於 CDC 複製拓撲結構的 Milvus 叢集執行批次匯入。在進行複製的叢集中，批次匯入必須使用兩階段提交 (2PC)，以確保匯入操作能在主叢集與備援叢集之間作為單一且有序的點被提交。</p>
<p>在本指南中，主叢集即為來源 Milvus 叢集，而備援叢集則為目標 Milvus 叢集。</p>
<p>開始之前，請確保您的叢集之間已設定好 CDC 複製。詳細資訊請參閱《<a href="/docs/zh-hant/set_up_cdc_replication.md">設定 CDC 複製</a>》。</p>
<h2 id="Why-2PC-is-required" class="common-anchor-header">為何需要 2PC<button data-href="#Why-2PC-is-required" class="anchor-icon" translate="no">
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
    </button></h2><p>一般的大批量匯入會在匯入工作完成時自動提交，這會使匯入的資料立即可見。在 CDC 複製拓撲中，此行為是不被允許的，因為主叢集和備用叢集必須在相同的邏輯點上使匯入的資料可見。</p>
<p>因此，請透過設定 `<code translate="no">auto_commit=false</code>`，以兩階段提交模式執行匯入作業：</p>
<ol>
<li><p><strong>匯入階段</strong>：Milvus 會將資料載入主叢集，並將匯入作業複製至備用叢集，但匯入的資料仍處於不可見狀態。匯入作業會停留在「<code translate="no">Uncommitted</code> 」狀態並進入等待狀態。</p></li>
<li><p><strong>提交階段</strong>：您需在主叢集上明確提交匯入工作。該提交會以單一有序柵欄的形式複製至備用叢集，因此兩個叢集皆會在相同的邏輯點上使匯入的資料可見。</p></li>
</ol>
<h2 id="Step-1-Enable-import-in-a-replicating-cluster" class="common-anchor-header">步驟 1：在複製叢集中啟用匯入功能<button data-href="#Step-1-Enable-import-in-a-replicating-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>在複製叢集中，匯入功能預設為停用狀態。請在主叢集和備用叢集上，將 `<code translate="no">dataCoord.import.enableInReplicatingCluster</code> ` 設定為 `<code translate="no">true</code> ` 以啟用此功能。</p>
<p>若您是透過 Milvus Operator 部署 Milvus，請在每個<code translate="no">Milvus</code> 資源的<code translate="no">spec.config</code> 中新增以下設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">import:</span>
        <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>若您是直接透過<code translate="no">milvus.yaml</code> 配置 Milvus，請新增以下設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">import:</span>
    <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>此設定可即時更新，因此無需完全重新啟動即可生效。</p>
<p>當此設定啟用時，複製叢集僅接受包含 `<code translate="no">auto_commit=false</code>` 的匯入請求。下表列出常見的遭拒請求：</p>
<table>
<thead>
<tr><th>情況</th><th>錯誤訊息</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dataCoord.import.enableInReplicatingCluster</code> 未啟用</td><td><code translate="no">import in replicating cluster is not supported yet</code></td></tr>
<tr><td><code translate="no">auto_commit=true</code> 已提交</td><td><code translate="no">auto_commit=true import in replicating cluster is not supported</code></td></tr>
</tbody>
</table>
<h2 id="Step-2-Run-a-2PC-import" class="common-anchor-header">步驟 2：執行 2PC 匯入<button data-href="#Step-2-Run-a-2PC-import" class="anchor-icon" translate="no">
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
    </button></h2><p>請在主叢集上執行所有匯入呼叫。匯入的資料與提交決定會自動複製到備用叢集，因此請勿在備用叢集上自行提交或確認匯入。</p>
<p>每個叢集皆從其自身的物件儲存讀取匯入檔案。請確保待匯入的檔案同時存在於主叢集與備用叢集的物件儲存中。您可以將檔案上傳至兩個叢集，或使用兩個叢集皆可讀取的物件儲存。若備用叢集上缺少檔案，複製的匯入作業將在該處失敗，並顯示「物件未找到」錯誤。</p>
<p>以下範例使用來自<code translate="no">pymilvus.bulk_writer</code> 的基於 REST 的匯入輔助程式。<code translate="no">url</code> 的值即為您用於其他 API 呼叫的相同 Milvus 位址。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import, commit_import, get_import_progress

primary_url = <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
standby_url = <span class="hljs-string">&quot;http://127.0.0.1:19531&quot;</span>

collection_name = <span class="hljs-string">&quot;demo_collection&quot;</span>

<span class="hljs-comment"># Object-storage paths of the files to import. Prepare these files the same</span>
<span class="hljs-comment"># way as a normal bulk import, for example by using BulkWriter.</span>
files = [
    [<span class="hljs-string">&quot;import-data/part-1.parquet&quot;</span>],
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">wait_for_state</span>(<span class="hljs-params">url, job_id, target_state, timeout=<span class="hljs-number">600</span></span>):
    deadline = time.time() + timeout
    <span class="hljs-keyword">while</span> time.time() &lt; deadline:
        resp = get_import_progress(url=url, job_id=job_id)
        data = resp.json().get(<span class="hljs-string">&quot;data&quot;</span>, {})
        state = data.get(<span class="hljs-string">&quot;state&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[<span class="hljs-subst">{url}</span>] job <span class="hljs-subst">{job_id}</span> state=<span class="hljs-subst">{state}</span>, progress=<span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;progress&#x27;</span>)}</span>&quot;</span>)

        <span class="hljs-keyword">if</span> state == target_state:
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">if</span> state == <span class="hljs-string">&quot;Failed&quot;</span>:
            <span class="hljs-keyword">raise</span> RuntimeError(
                <span class="hljs-string">f&quot;import job <span class="hljs-subst">{job_id}</span> failed on <span class="hljs-subst">{url}</span>: <span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;reason&#x27;</span>)}</span>&quot;</span>
            )

        time.sleep(<span class="hljs-number">3</span>)

    <span class="hljs-keyword">raise</span> TimeoutError(<span class="hljs-string">f&quot;job <span class="hljs-subst">{job_id}</span> did not reach <span class="hljs-subst">{target_state}</span> on <span class="hljs-subst">{url}</span>&quot;</span>)


<span class="hljs-comment"># Start a 2PC import on the primary cluster. In a replicating cluster,</span>
<span class="hljs-comment"># auto_commit=false is required, and the job stops at the Uncommitted state.</span>
resp = bulk_import(
    url=primary_url,
    collection_name=collection_name,
    files=files,
    options={<span class="hljs-string">&quot;auto_commit&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>},
)
job_id = resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;started 2PC import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until both clusters report Uncommitted. The same job ID is used on the</span>
<span class="hljs-comment"># primary and standby clusters because the import is replicated through CDC.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)

<span class="hljs-comment"># Commit once on the primary cluster. Do not commit on the standby cluster.</span>
commit_import(url=primary_url, job_id=job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;committed import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until the import is completed and visible on both clusters.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;import committed and visible on both clusters&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-wait-for-Uncommitted-on-both-clusters" class="common-anchor-header">為何要在兩個叢集上都等待<code translate="no">Uncommitted</code> <button data-href="#Why-wait-for-Uncommitted-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>在備用叢集完成匯入前進行提交並不會導致資料損毀，但當提交被套用時，備用叢集仍處於追趕狀態。等待主叢集和備用叢集皆回報<code translate="no">Uncommitted</code> ，可確認匯入的資料已完全複製，且兩個叢集都已準備好共同顯示該資料。</p>
<h2 id="Step-3-Verify-the-data" class="common-anchor-header">步驟 3：驗證資料<button data-href="#Step-3-Verify-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>當工作進度達到「<code translate="no">Completed</code> 」狀態後，匯入的實體將在兩個叢集中皆可見。請先在主叢集上載入並查詢該集合，接著在備用叢集上執行相同的查詢（無需在該處手動載入該集合），並確認匯入的實體確實存在於兩個叢集中。</p>
<p>備援叢集在維持備援狀態期間為唯讀模式。請勿直接在備援叢集上提交匯入、提交或其他 DDL 或 DCL 操作。請在主叢集上執行這些操作，並讓 CDC 複製將其套用至備援叢集。</p>
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
    </button></h2><h3 id="Which-cluster-should-I-run-the-import-and-commit-on" class="common-anchor-header">我應該在哪个叢集上執行匯入和提交操作？<button data-href="#Which-cluster-should-I-run-the-import-and-commit-on" class="anchor-icon" translate="no">
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
    </button></h3><p>請在主叢集上執行匯入與提交。備援叢集會透過 CDC 複製同時接收匯入的資料與提交操作。</p>
<h3 id="Do-I-need-to-commit-on-the-standby-cluster" class="common-anchor-header">我需要在備用叢集上執行提交嗎？<button data-href="#Do-I-need-to-commit-on-the-standby-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>不需要。在主叢集上執行提交後，系統會將該提交作為單一有序柵欄複製到備用叢集。</p>
<h3 id="Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="common-anchor-header">為何我的匯入操作會因「<code translate="no">import in replicating cluster is not supported yet</code> 」而失敗？<button data-href="#Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">dataCoord.import.enableInReplicatingCluster</code> 該叢集未啟用此功能。請將主叢集和備援叢集的設定皆設為「<code translate="no">true</code> 」。</p>
<h3 id="Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="common-anchor-header">為何我的匯入操作在啟用「<code translate="no">auto_commit=true import in replicating cluster is not supported</code> 」時會失敗？<button data-href="#Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="anchor-icon" translate="no">
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
    </button></h3><p>在進行複製的叢集中，僅接受使用<code translate="no">auto_commit=false</code> 的 2PC 匯入操作。請在匯入請求中設定<code translate="no">options={&quot;auto_commit&quot;: &quot;false&quot;}</code> 。</p>
