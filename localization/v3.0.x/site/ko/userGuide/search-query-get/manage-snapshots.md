---
id: manage-snapshots.md
title: 스냅샷 관리Compatible with Milvus 3.0.x
summary: 이 가이드에서는 다음을 포함하여 스냅샷을 만들고 관리하는 방법에 대해 설명합니다.
beta: Milvus 3.0.x
---
<h1 id="Manage-Snapshots" class="common-anchor-header">스냅샷 관리<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Manage-Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 스냅샷을 만들고 관리하는 방법에 대해 설명합니다.</p>
<h3 id="Create-snapshot" class="common-anchor-header">스냅샷 만들기<button data-href="#Create-snapshot" class="anchor-icon" translate="no">
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
    </button></h3><p>스냅샷을 만들기 전에 데이터 손실을 방지하기 위해 대상 컬렉션에 대한 데이터 쓰기를 중지하고 <code translate="no">flush()</code> 으로 전화하는 것이 좋습니다.</p>
<div class="alert note">
<p><code translate="no">flush()</code> 으로 전화하는 것은 필수는 아니지만 데이터 손실을 방지하기 위해 적극 권장됩니다. 이 단계를 건너뛰면 스냅샷에는 이미 플러시된 데이터만 포함됩니다.</p>
</div>
<p>스냅샷 이름을 지정할 때는 <code translate="no">&quot;daily_backup_20240101&quot;</code> 또는 <code translate="no">&quot;v2.1_production_release&quot;</code> 과 같이 명확하고 설명이 포함된 이름을 사용하고 <code translate="no">&quot;backup1&quot;</code> 및 <code translate="no">&quot;test&quot;</code> 과 같은 일반적인 용어는 피하세요. 스냅샷 이름을 현명하게 사용하여 버전, 환경, 단계별로 스냅샷을 구분하세요.</p>
<p>아래 코드 예제에서는 <code translate="no">my_collection</code> 이라는 이름의 컬렉션이 이미 있다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Recommended: Flush data before creating snapshot to ensure all data is included</span>
client.flush(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Create snapshot for entire collection</span>
client.create_snapshot(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    description=<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(context.Background(), &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Token: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
err = client.Flush(context.Background(), milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Create snapshot</span>
createOpt := milvusclient.NewCreateSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).
    WithDescription(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)

err = client.CreateSnapshot(context.Background(), createOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-snapshots" class="common-anchor-header">스냅샷 나열<button data-href="#List-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>기존 스냅샷의 이름을 나열할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all snapshots for a collection</span>
snapshots = client.list_snapshots(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List snapshots for collection</span>
listOpt := milvusclient.NewListSnapshotsOption().
    WithCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)

snapshots, err := client.ListSnapshots(context.Background(), listOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># bash</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Describe-snapshot" class="common-anchor-header">스냅샷 설명<button data-href="#Describe-snapshot" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 스냅샷에 대한 상세 정보를 확인할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Snapshot ID: <span class="hljs-subst">{snapshot_info.<span class="hljs-built_in">id</span>}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection: <span class="hljs-subst">{snapshot_info.collection_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created: <span class="hljs-subst">{snapshot_info.create_ts}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Description: <span class="hljs-subst">{snapshot_info.description}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">describeOpt := milvusclient.NewDescribeSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
resp, err := client.DescribeSnapshot(context.Background(), describeOpt)

fmt.Printf(<span class="hljs-string">&quot;Snapshot ID: %d\n&quot;</span>, resp.GetSnapshotInfo().GetId())
fmt.Printf(<span class="hljs-string">&quot;Collection: %s\n&quot;</span>, resp.GetSnapshotInfo().GetCollectionName())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Restore-snapshot" class="common-anchor-header">스냅샷 복원<button data-href="#Restore-snapshot" class="anchor-icon" translate="no">
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
    </button></h3><p>스냅샷을 새 컬렉션으로 복원할 수 있습니다. 이 작업은 비동기식이며 복원 진행 상황을 추적하기 위한 작업 ID를 반환합니다.</p>
<p>이 복원은 데이터 가져오기 대신 <strong>세그먼트 복사</strong> 메커니즘을 사용하므로 다음과 같이 더 효율적입니다.</p>
<ul>
<li><p>스냅샷 스토리지에서 세그먼트 파일(binlog, deltalog, 인덱스 파일)을 직접 복사합니다.</p></li>
<li><p>기존 데이터 파일과의 호환성을 보장하기 위해 필드 ID와 인덱스 ID를 보존합니다.</p></li>
<li><p>데이터 재작성 및 인덱스 재구축을 방지하여 복원 시간이 훨씬 빨라집니다.</p></li>
<li><p>기존 백업 및 복원 방법에 비해 10~100배의 성능 향상을 보장합니다.</p></li>
</ul>
<p>스냅샷을 복원하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Restore snapshot to new collection</span>
job_id = client.restore_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;restored_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">restoreOpt := milvusclient.NewRestoreSnapshotOption(
    <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-string">&quot;restored_collection&quot;</span>
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>복원 작업의 진행 상황 모니터링에 대한 자세한 내용은 <a href="/docs/ko/snapshots.md#CvhSd7amkog20mxHid6cvTyknVb">복원 진행 상황 모니터링을</a> 참조하세요.</p>
<h3 id="Drop-snapshot" class="common-anchor-header">스냅샷 삭제<button data-href="#Drop-snapshot" class="anchor-icon" translate="no">
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
    </button></h3><p>스냅샷이 더 이상 필요하지 않은 경우 삭제할 수 있습니다. 저장 공간을 절약하려면 오래된 스냅샷을 정기적으로 삭제하는 것이 좋습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.drop_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dropOpt := milvusclient.NewDropSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
err := client.DropSnapshot(context.Background(), dropOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-restoration-jobs" class="common-anchor-header">복원 작업 목록<button data-href="#List-restoration-jobs" class="anchor-icon" translate="no">
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
    </button></h3><p>이 API를 사용하여 대상 컬렉션에 대해 이미 생성된 스냅샷 목록을 가져올 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all restore jobs</span>
jobs = client.list_restore_snapshot_jobs()

<span class="hljs-keyword">for</span> job <span class="hljs-keyword">in</span> jobs:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Job <span class="hljs-subst">{job.job_id}</span>: <span class="hljs-subst">{job.snapshot_name}</span> -&gt; Collection <span class="hljs-subst">{job.collection_id}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  State: <span class="hljs-subst">{job.state}</span>, Progress: <span class="hljs-subst">{job.progress}</span>%&quot;</span>)

<span class="hljs-comment"># List restore jobs for a specific collection</span>
jobs = client.list_restore_snapshot_jobs(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List all restore jobs</span>
listOpt := milvusclient.NewListRestoreSnapshotJobsOption()
jobs, err := client.ListRestoreSnapshotJobs(context.Background(), listOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, job := <span class="hljs-keyword">range</span> jobs {
    fmt.Printf(<span class="hljs-string">&quot;Job %d: %s -&gt; Collection %d\n&quot;</span>,
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionId())
    fmt.Printf(<span class="hljs-string">&quot;  State: %s, Progress: %d%%\n&quot;</span>,
        job.GetState(), job.GetProgress())
}

<span class="hljs-comment">// List restore jobs for a specific collection</span>
listOpt = milvusclient.NewListRestoreSnapshotJobsOption().
    WithCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
jobs, err = client.ListRestoreSnapshotJobs(context.Background(), listOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Get-restoration-state" class="common-anchor-header">복원 상태 가져오기<button data-href="#Get-restoration-state" class="anchor-icon" translate="no">
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
    </button></h3><p>복원 작업 ID가 있으면 이를 사용하여 복원 진행 상황을 검색할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">state = client.get_restore_snapshot_state(job_id=<span class="hljs-number">12345</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Job ID: <span class="hljs-subst">{state.job_id}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Snapshot Name: <span class="hljs-subst">{state.snapshot_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection ID: <span class="hljs-subst">{state.collection_id}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state.state}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Progress: <span class="hljs-subst">{state.progress}</span>%&quot;</span>)
<span class="hljs-keyword">if</span> state.state == <span class="hljs-string">&quot;RestoreSnapshotFailed&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Failure Reason: <span class="hljs-subst">{state.reason}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Time Cost: <span class="hljs-subst">{state.time_cost}</span>ms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">stateOpt := milvusclient.NewGetRestoreSnapshotStateOption(<span class="hljs-number">12345</span>)
state, err := client.GetRestoreSnapshotState(context.Background(), stateOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

fmt.Printf(<span class="hljs-string">&quot;Job ID: %d\n&quot;</span>, state.GetJobId())
fmt.Printf(<span class="hljs-string">&quot;Snapshot Name: %s\n&quot;</span>, state.GetSnapshotName())
fmt.Printf(<span class="hljs-string">&quot;Collection ID: %d\n&quot;</span>, state.GetCollectionId())
fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, state.GetState())
fmt.Printf(<span class="hljs-string">&quot;Progress: %d%%\n&quot;</span>, state.GetProgress())
<span class="hljs-keyword">if</span> state.GetState() == milvuspb.RestoreSnapshotState_RestoreSnapshotFailed {
    fmt.Printf(<span class="hljs-string">&quot;Failure Reason: %s\n&quot;</span>, state.GetReason())
}
fmt.Printf(<span class="hljs-string">&quot;Time Cost: %dms\n&quot;</span>, state.GetTimeCost())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
