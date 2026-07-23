---
id: bulk-import-in-cdc-replication.md
summary: CDC 복제를 사용하는 Milvus 클러스터에서 일괄 가져오기를 실행하는 방법을 알아보세요.
title: CDC 복제에서의 대량 가져오기
---
<h1 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">CDC 복제에서의 대량 가져오기<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 CDC 복제 토폴로지의 일부인 Milvus 클러스터에 대해 대량 가져오기를 실행하는 방법을 설명합니다. 복제 클러스터에서 대량 가져오기를 수행할 때는 2단계 커밋(2PC)을 사용해야 하며, 이를 통해 가져오기 작업이 주 클러스터와 대기 클러스터 전반에 걸쳐 단일하고 순서대로 정렬된 시점으로 커밋됩니다.</p>
<p>이 가이드에서 주 클러스터는 소스 Milvus 클러스터이며, 대기 클러스터는 대상 Milvus 클러스터입니다.</p>
<p>시작하기 전에 클러스터 간에 CDC 복제가 이미 구성되어 있는지 확인하십시오. 자세한 내용은 <a href="/docs/ko/set_up_cdc_replication.md">‘CDC 복제 설정’을</a> 참조하십시오.</p>
<h2 id="Why-2PC-is-required" class="common-anchor-header">2PC가 필요한 이유<button data-href="#Why-2PC-is-required" class="anchor-icon" translate="no">
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
    </button></h2><p>일반적인 대량 가져오기는 가져오기 작업이 완료되면 자동으로 커밋되어, 가져온 데이터를 즉시 확인할 수 있습니다. 그러나 CDC 복제 토폴로지에서는 주 클러스터와 대기 클러스터가 가져온 데이터를 동일한 논리적 시점에서 노출해야 하므로 이러한 동작이 허용되지 않습니다.</p>
<p>대신, ` <code translate="no">auto_commit=false</code>`를 설정하여 2단계 커밋(two-phase commit) 모드로 가져오기를 실행하십시오:</p>
<ol>
<li><p><strong>가져오기 단계</strong>: Milvus는 프라이머리 클러스터에 데이터를 로드하고 가져오기 작업을 스탠바이 클러스터로 복제하지만, 가져온 데이터는 여전히 표시되지 않습니다. 가져오기 작업은 ‘ <code translate="no">Uncommitted</code> ’ 상태에서 중지되고 대기합니다.</p></li>
<li><p><strong>커밋 단계</strong>: 프라이머리 클러스터에서 가져오기 작업을 명시적으로 커밋합니다. 커밋은 단일 순차적 펜스(fence)로 스탠바이 클러스터에 복제되므로, 두 클러스터 모두 동일한 논리적 시점에서 가져온 데이터를 표시하게 됩니다.</p></li>
</ol>
<h2 id="Step-1-Enable-import-in-a-replicating-cluster" class="common-anchor-header">1단계: 복제 클러스터에서 가져오기 활성화<button data-href="#Step-1-Enable-import-in-a-replicating-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>복제 클러스터의 가져오기 기능은 기본적으로 비활성화되어 있습니다. 주 클러스터와 대기 클러스터 모두에서 ` <code translate="no">dataCoord.import.enableInReplicatingCluster</code> `를 ` <code translate="no">true</code> `로 설정하여 이 기능을 활성화하십시오.</p>
<p>Milvus Operator를 사용하여 Milvus를 배포하는 경우, 각 <code translate="no">Milvus</code> 리소스의 <code translate="no">spec.config</code> 에 다음 설정을 추가하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">import:</span>
        <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.yaml</code> 을 통해 Milvus를 직접 구성하는 경우 다음 설정을 추가하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">import:</span>
    <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 설정은 새로 고침이 가능하므로, 클러스터를 완전히 재시작하지 않아도 적용될 수 있습니다.</p>
<p>이 설정이 활성화되면 복제 클러스터는 ` <code translate="no">auto_commit=false</code>`가 포함된 가져오기 요청만 수락합니다. 다음 표에는 일반적으로 거부되는 요청이 나열되어 있습니다:</p>
<table>
<thead>
<tr><th>상황</th><th>오류 메시지</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dataCoord.import.enableInReplicatingCluster</code> 이 활성화되지 않은 경우</td><td><code translate="no">import in replicating cluster is not supported yet</code></td></tr>
<tr><td><code translate="no">auto_commit=true</code> 이 제출됨</td><td><code translate="no">auto_commit=true import in replicating cluster is not supported</code></td></tr>
</tbody>
</table>
<h2 id="Step-2-Run-a-2PC-import" class="common-anchor-header">2단계: 2PC 가져오기 실행<button data-href="#Step-2-Run-a-2PC-import" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 가져오기 호출을 주 클러스터에서 실행하십시오. 가져온 데이터와 커밋 결정은 스탠바이 클러스터로 자동으로 복제되므로, 스탠바이 클러스터에서 직접 가져오기를 제출하거나 커밋하지 마십시오.</p>
<p>각 클러스터는 자체 오브젝트 스토리지에서 가져오기 파일을 읽습니다. 가져올 파일이 주 클러스터와 대기 클러스터의 오브젝트 스토리지 모두에 존재하는지 확인하십시오. 파일을 두 클러스터 모두에 업로드하거나, 두 클러스터가 모두 읽을 수 있는 오브젝트 스토리지를 사용할 수 있습니다. 대기 클러스터에 파일이 없는 경우, 복제된 가져오기 작업은 ‘오브젝트 없음(object-not-found)’ 오류와 함께 실패합니다.</p>
<p>다음 예제에서는 <code translate="no">pymilvus.bulk_writer</code> 의 REST 기반 가져오기 헬퍼를 사용합니다. <code translate="no">url</code> 값은 다른 API 호출에 사용하는 것과 동일한 Milvus 주소입니다.</p>
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
<h3 id="Why-wait-for-Uncommitted-on-both-clusters" class="common-anchor-header">두 클러스터 모두에서 <code translate="no">Uncommitted</code> 를 기다려야 하는 이유<button data-href="#Why-wait-for-Uncommitted-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>대기 클러스터의 가져오기가 완료되기 전에 커밋을 수행해도 데이터가 손상되지는 않지만, 커밋이 적용될 때 대기 클러스터는 여전히 데이터를 따라잡는 중입니다. 주 클러스터와 대기 클러스터 모두 <code translate="no">Uncommitted</code> 를 반환할 때까지 기다리면, 가져온 데이터가 완전히 복제되었으며 두 클러스터 모두 데이터를 함께 표시할 준비가 되었음을 확인할 수 있습니다.</p>
<h2 id="Step-3-Verify-the-data" class="common-anchor-header">3단계: 데이터 확인<button data-href="#Step-3-Verify-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>작업이 ' <code translate="no">Completed</code>' 상태에 도달하면, 가져온 엔티티가 두 클러스터 모두에서 표시됩니다. 프라이어리 클러스터에서 컬렉션을 로드하고 쿼리한 다음, 스탠바이 클러스터에서는 컬렉션을 수동으로 로드하지 않은 상태에서 동일한 쿼리를 실행하여 가져온 엔티티가 두 클러스터 모두에 존재하는지 확인하십시오.</p>
<p>스탠바이 클러스터는 스탠바이 상태로 유지되는 동안 읽기 전용입니다. 스탠바이 클러스터에 직접 가져오기, 커밋 또는 기타 DDL/DCL 작업을 제출하지 마십시오. 이러한 작업은 주 클러스터에서 수행하고, CDC 복제를 통해 스탠바이 클러스터에 적용되도록 하십시오.</p>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-cluster-should-I-run-the-import-and-commit-on" class="common-anchor-header">가져오기 및 커밋은 어느 클러스터에서 실행해야 합니까?<button data-href="#Which-cluster-should-I-run-the-import-and-commit-on" class="anchor-icon" translate="no">
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
    </button></h3><p>가져오기 및 커밋은 주 클러스터에서 실행하십시오. 대기 클러스터는 CDC 복제를 통해 가져온 데이터와 커밋을 모두 수신합니다.</p>
<h3 id="Do-I-need-to-commit-on-the-standby-cluster" class="common-anchor-header">스탠바이 클러스터에서 커밋을 수행해야 합니까?<button data-href="#Do-I-need-to-commit-on-the-standby-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 프라이머리 클러스터에서 커밋을 수행하면 해당 커밋이 단일 순서 지정 펜스(fence)로 스탠바이 클러스터에 복제됩니다.</p>
<h3 id="Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="common-anchor-header">왜 ' <code translate="no">import in replicating cluster is not supported yet</code>' 오류로 인해 임포트가 실패하나요?<button data-href="#Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">dataCoord.import.enableInReplicatingCluster</code> 해당 클러스터에서 이 기능이 활성화되어 있지 않습니다. 주 클러스터와 대기 클러스터 모두에서 이 기능을 ‘ <code translate="no">true</code> ’로 설정하십시오.</p>
<h3 id="Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="common-anchor-header"><code translate="no">auto_commit=true import in replicating cluster is not supported</code> 가 설정된 상태에서 가져오기가 실패하는 이유는 무엇입니까?<button data-href="#Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="anchor-icon" translate="no">
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
    </button></h3><p>복제 클러스터에서는 <code translate="no">auto_commit=false</code> 을 사용하는 2PC 가져오기만 허용됩니다. 가져오기 요청에서 <code translate="no">options={&quot;auto_commit&quot;: &quot;false&quot;}</code> 를 설정하십시오.</p>
