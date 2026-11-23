---
id: manage-snapshots.md
title: スナップショットの管理Compatible with Milvus 3.0.x
summary: スナップショットの作成、一覧表示、説明の追加、ピン留め、復元、削除の方法、および復元ジョブの監視方法について学びます。
beta: Milvus 3.0.x
---
<h1 id="Manage-Snapshots" class="common-anchor-header">スナップショットの管理<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Manage-Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、スナップショットの作成および管理方法について解説します。具体的には、以下の内容を含みます。</p>
<ul>
<li><a href="#Create-snapshot">スナップショットの作成</a>、</li>
<li><a href="#List-snapshots">スナップショットの一覧表示</a>、</li>
<li><a href="#Describe-snapshot">スナップショットの説明</a>、</li>
<li><a href="#Pinunpin-snapshot-data">スナップショットデータの固定／固定解除</a>、</li>
<li><a href="#Restore-snapshot">スナップショットの復元</a>、</li>
<li><a href="#Drop-snapshot">スナップショットを削除する</a>、</li>
<li><a href="#List-restoration-jobs">復元ジョブの一覧表示</a>、および</li>
<li><a href="#Get-restoration-state">復元状態の取得</a>。</li>
</ul>
<h2 id="Create-snapshot" class="common-anchor-header">スナップショットの作成<button data-href="#Create-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>スナップショットを作成する前に、データ損失を防ぐため、対象コレクションへの書き込みを停止し、<code translate="no">flush()</code> を呼び出すことを推奨します。</p>
<div class="alert note">
<p><code translate="no">flush()</code> の呼び出しは必須ではありませんが、データ損失を防ぐために強く推奨されます。これを省略した場合、スナップショットにはすでにフラッシュ済みのデータのみが含まれます。</p>
</div>
<p>スナップショットに名前を付ける際は、「<code translate="no">&quot;daily_backup_20240101&quot;</code> 」や「<code translate="no">&quot;v2.1_production_release&quot;</code> 」など、明確で説明的な名前を使用し、「<code translate="no">&quot;backup1&quot;</code> 」や「<code translate="no">&quot;test&quot;</code> 」などの一般的な用語は避けてください。バージョン、環境、ステージごとにスナップショットを区別できるよう、スナップショットの名前は慎重に付けてください。</p>
<p>以下のコード例では、<code translate="no">my_collection</code> という名前のコレクションがすでに存在していることを前提としています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.CreateSnapshotReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;

<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
client.flush(FlushReq.builder()
        .collectionNames(Collections.singletonList(<span class="hljs-string">&quot;my_collection&quot;</span>))
        .build());

<span class="hljs-comment">// Create snapshot for entire collection</span>
client.createSnapshot(CreateSnapshotReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .snapshotName(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
        .description(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

client, err := milvusclient.New(context.Background(), &amp;milvusclient.ClientConfig{
    Address:  <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Username: <span class="hljs-string">&quot;root&quot;</span>,
    Password: <span class="hljs-string">&quot;Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(context.Background())

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
flushTask, err := client.Flush(context.Background(), milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = flushTask.Await(context.Background()); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-comment">// Create snapshot</span>
createOpt := milvusclient.NewCreateSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).
    WithDescription(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)

err = client.CreateSnapshot(context.Background(), createOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">flushSync</span>({
    <span class="hljs-attr">collection_names</span>: [<span class="hljs-string">&quot;my_collection&quot;</span>],
});

<span class="hljs-comment">// Create snapshot for entire collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createSnapshot</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">snapshot_name</span>: <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;snapshotName&quot;: &quot;backup_20240101&quot;,
    &quot;description&quot;: &quot;Daily backup for January 1st, 2024&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-snapshots" class="common-anchor-header">スナップショットのリスト表示<button data-href="#List-snapshots" class="anchor-icon" translate="no">
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
    </button></h2><p>既存のスナップショットの名前を一覧表示できます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all snapshots for a collection</span>
snapshots = client.list_snapshots(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.ListSnapshotsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.ListSnapshotsResp;

<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-comment">// List all snapshots for a collection</span>
<span class="hljs-type">ListSnapshotsResp</span> <span class="hljs-variable">listResp</span> <span class="hljs-operator">=</span> client.listSnapshots(ListSnapshotsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
List&lt;String&gt; snapshots = listResp.getSnapshots();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Add this import to the same Go file for the following examples.</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;fmt&quot;</span>

<span class="hljs-comment">// List snapshots for collection</span>
listOpt := milvusclient.NewListSnapshotsOption(<span class="hljs-string">&quot;my_collection&quot;</span>)

snapshots, err := client.ListSnapshots(context.Background(), listOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Println(snapshots)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// List all snapshots for a collection</span>
<span class="hljs-keyword">const</span> { snapshots } = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listSnapshots</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-snapshot" class="common-anchor-header">スナップショットの詳細取得<button data-href="#Describe-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のスナップショットに関する詳細情報を取得できます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Snapshot ID: <span class="hljs-subst">{snapshot_info.<span class="hljs-built_in">id</span>}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection: <span class="hljs-subst">{snapshot_info.collection_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created: <span class="hljs-subst">{snapshot_info.create_ts}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Description: <span class="hljs-subst">{snapshot_info.description}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.DescribeSnapshotReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.DescribeSnapshotResp;

<span class="hljs-type">DescribeSnapshotResp</span> <span class="hljs-variable">snapshotInfo</span> <span class="hljs-operator">=</span> client.describeSnapshot(DescribeSnapshotReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .snapshotName(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
        .build());

System.out.println(<span class="hljs-string">&quot;Snapshot: &quot;</span> + snapshotInfo.getName());
System.out.println(<span class="hljs-string">&quot;Collection: &quot;</span> + snapshotInfo.getCollectionName());
System.out.println(<span class="hljs-string">&quot;Created: &quot;</span> + snapshotInfo.getCreateTs());
System.out.println(<span class="hljs-string">&quot;Description: &quot;</span> + snapshotInfo.getDescription());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">describeOpt := milvusclient.NewDescribeSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>)
resp, err := client.DescribeSnapshot(context.Background(), describeOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

fmt.Printf(<span class="hljs-string">&quot;Snapshot: %s\n&quot;</span>, resp.GetName())
fmt.Printf(<span class="hljs-string">&quot;Collection: %s\n&quot;</span>, resp.GetCollectionName())
fmt.Printf(<span class="hljs-string">&quot;Created at: %d\n&quot;</span>, resp.GetCreateTs())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> snapshotInfo = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeSnapshot</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">snapshot_name</span>: <span class="hljs-string">&quot;backup_20240101&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Snapshot: <span class="hljs-subst">${snapshotInfo.name}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection: <span class="hljs-subst">${snapshotInfo.collection_name}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Created: <span class="hljs-subst">${snapshotInfo.create_ts}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Description: <span class="hljs-subst">${snapshotInfo.description}</span>`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;snapshotName&quot;: &quot;backup_20240101&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pinunpin-snapshot-data" class="common-anchor-header">スナップショットデータの固定/固定解除<button data-href="#Pinunpin-snapshot-data" class="anchor-icon" translate="no">
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
    </button></h2><p>復元中に、スナップショットを固定してその基となるデータを一時的にガベージコレクションから保護したり、固定を解除してデータを解放したりできます。</p>
<p>また、ピン留め操作に有効期限（TTL）を設定することで、期限が切れた時点でピン留めされたデータを解放するようにすることもできます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">pin_id = client.pin_snapshot_data(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ttl_seconds=<span class="hljs-number">3600</span>,
)

client.unpin_snapshot_data(
    pin_id=pin_id
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.PinSnapshotDataReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.UnpinSnapshotDataReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.PinSnapshotDataResp;

<span class="hljs-type">PinSnapshotDataResp</span> <span class="hljs-variable">pinResp</span> <span class="hljs-operator">=</span> client.pinSnapshotData(PinSnapshotDataReq.builder()
        .snapshotName(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ttlSeconds(<span class="hljs-number">3600L</span>)
        .build());

client.unpinSnapshotData(UnpinSnapshotDataReq.builder()
        .pinId(pinResp.getPinId())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pinID, err := client.PinSnapshotData(
    context.Background(),
    milvusclient.NewPinSnapshotDataOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).WithTTL(<span class="hljs-number">3600</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">defer</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> {
    _ = client.UnpinSnapshotData(
        context.Background(),
        milvusclient.NewUnpinSnapshotDataOption(pinID),
    )
}()

<span class="hljs-comment">// Do work with pinned snapshot data.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { pin_id } = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">pinSnapshotData</span>({
    <span class="hljs-attr">snapshot_name</span>: <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">ttl_seconds</span>: <span class="hljs-number">3600</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">unpinSnapshotData</span>({
    <span class="hljs-attr">pin_id</span>: pin_id,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># The pin response carries the pinId that the unpin request needs</span>
PIN_ID=$(curl --silent --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/pin&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;snapshotName&quot;: &quot;backup_20240101&quot;,
    &quot;ttlSeconds&quot;: 3600
}&#x27;</span> | jq -r <span class="hljs-string">&#x27;.data.pinId&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/unpin&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;pinId\&quot;: \&quot;<span class="hljs-variable">${PIN_ID}</span>\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Restore-snapshot" class="common-anchor-header">スナップショットの復元<button data-href="#Restore-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>スナップショットを新しいコレクションに復元できます。この操作は非同期で行われ、復元の進行状況を追跡するためのジョブ ID が返されます。</p>
<p>復元では、データのインポートではなく<strong>セグメントのコピー</strong>方式が使用されます。これは、</p>
<ul>
<li>スナップショットストレージからセグメントファイル（binlog、deltalog、インデックスファイル）を直接コピーする</li>
<li>フィールドIDおよびインデックスIDを保持し、既存のデータファイルとの互換性を確保する</li>
<li>データの書き換えやインデックスの再構築を回避できるため、復元時間が大幅に短縮され、</li>
<li>従来のバックアップおよび復元方法と比較して、10～100倍のパフォーマンス向上を実現します</li>
</ul>
<p>スナップショットを復元するには、次のように操作します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Restore snapshot to new collection</span>
job_id = client.restore_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;restored_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.RestoreSnapshotReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.RestoreSnapshotResp;

<span class="hljs-comment">// Restore snapshot to new collection</span>
<span class="hljs-type">RestoreSnapshotResp</span> <span class="hljs-variable">restoreResp</span> <span class="hljs-operator">=</span> client.restoreSnapshot(RestoreSnapshotReq.builder()
        .snapshotName(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
        .sourceCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .targetCollectionName(<span class="hljs-string">&quot;restored_collection&quot;</span>)
        .build());
<span class="hljs-type">Long</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> restoreResp.getJobId();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">restoreOpt := milvusclient.NewRestoreSnapshotOption(
    <span class="hljs-string">&quot;backup_20240101&quot;</span>,     <span class="hljs-comment">// snapshot name</span>
    <span class="hljs-string">&quot;my_collection&quot;</span>,       <span class="hljs-comment">// source collection holding the snapshot</span>
    <span class="hljs-string">&quot;restored_collection&quot;</span>, <span class="hljs-comment">// target collection</span>
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

fmt.Println(jobID)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Restore snapshot to new collection</span>
<span class="hljs-keyword">const</span> { job_id } = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">restoreSnapshot</span>({
    <span class="hljs-attr">snapshot_name</span>: <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-attr">source_collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">target_collection_name</span>: <span class="hljs-string">&quot;restored_collection&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/restore&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;sourceCollectionName&quot;: &quot;my_collection&quot;,
    &quot;targetCollectionName&quot;: &quot;restored_collection&quot;,
    &quot;snapshotName&quot;: &quot;backup_20240101&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>復元ジョブの進行状況の監視の詳細については、「<a href="#Get-restoration-state">復元状態の取得</a>」を参照してください。</p>
<h2 id="Drop-snapshot" class="common-anchor-header">スナップショットの削除<button data-href="#Drop-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>スナップショットが不要になった場合は、削除することができます。ストレージ容量を節約するため、古いスナップショットは定期的に削除することをお勧めします。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.DropSnapshotReq;

client.dropSnapshot(DropSnapshotReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .snapshotName(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dropOpt := milvusclient.NewDropSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>)
err = client.DropSnapshot(context.Background(), dropOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropSnapshot</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">snapshot_name</span>: <span class="hljs-string">&quot;backup_20240101&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/snapshots/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;snapshotName&quot;: &quot;backup_20240101&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-restoration-jobs" class="common-anchor-header">復元ジョブのリスト取得<button data-href="#List-restoration-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>このAPIを使用すると、対象のコレクションに対してすでに作成されているスナップショットのリストを取得できます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all restore jobs</span>
jobs = client.list_restore_snapshot_jobs()

<span class="hljs-keyword">for</span> job <span class="hljs-keyword">in</span> jobs:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Job <span class="hljs-subst">{job.job_id}</span>: <span class="hljs-subst">{job.snapshot_name}</span> -&gt; Collection <span class="hljs-subst">{job.collection_id}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  State: <span class="hljs-subst">{job.state}</span>, Progress: <span class="hljs-subst">{job.progress}</span>%&quot;</span>)

<span class="hljs-comment"># List restore jobs for a specific collection</span>
jobs = client.list_restore_snapshot_jobs(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.ListRestoreSnapshotJobsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.ListRestoreSnapshotJobsResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.RestoreSnapshotJobInfo;

<span class="hljs-comment">// List all restore jobs</span>
<span class="hljs-type">ListRestoreSnapshotJobsResp</span> <span class="hljs-variable">jobsResp</span> <span class="hljs-operator">=</span> client.listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
        .build());

<span class="hljs-keyword">for</span> (RestoreSnapshotJobInfo job : jobsResp.getJobs()) {
    System.out.printf(<span class="hljs-string">&quot;Job %d: %s -&gt; Collection %s%n&quot;</span>,
            job.getJobId(), job.getSnapshotName(), job.getCollectionName());
    System.out.printf(<span class="hljs-string">&quot;  State: %s, Progress: %d%%%n&quot;</span>, job.getState(), job.getProgress());
}

<span class="hljs-comment">// List restore jobs for a specific collection</span>
jobsResp = client.listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List all restore jobs</span>
jobsOpt := milvusclient.NewListRestoreSnapshotJobsOption()
jobs, err := client.ListRestoreSnapshotJobs(context.Background(), jobsOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

<span class="hljs-keyword">for</span> _, job := <span class="hljs-keyword">range</span> jobs {
    fmt.Printf(<span class="hljs-string">&quot;Job %d: %s -&gt; Collection %s\n&quot;</span>,
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName())
    fmt.Printf(<span class="hljs-string">&quot;  State: %s, Progress: %d%%\n&quot;</span>,
        job.GetState(), job.GetProgress())
}

<span class="hljs-comment">// List restore jobs for a specific collection</span>
jobsOpt = milvusclient.NewListRestoreSnapshotJobsOption().
    WithCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
jobs, err = client.ListRestoreSnapshotJobs(context.Background(), jobsOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">for</span> _, job := <span class="hljs-keyword">range</span> jobs {
    fmt.Printf(<span class="hljs-string">&quot;Job %d: %s -&gt; Collection %s\n&quot;</span>,
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// List all restore jobs</span>
<span class="hljs-keyword">let</span> jobsResp = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listRestoreSnapshotJobs</span>();

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> job <span class="hljs-keyword">of</span> jobsResp.<span class="hljs-property">jobs</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Job <span class="hljs-subst">${job.job_id}</span>: <span class="hljs-subst">${job.snapshot_name}</span> -&gt; Collection <span class="hljs-subst">${job.collection_name}</span>`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`  State: <span class="hljs-subst">${job.state}</span>, Progress: <span class="hljs-subst">${job.progress}</span>%`</span>);
}

<span class="hljs-comment">// List restore jobs for a specific collection</span>
jobsResp = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listRestoreSnapshotJobs</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># List all restore jobs</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/snapshot/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>

<span class="hljs-comment"># List restore jobs for a specific collection</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/snapshot/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-restoration-state" class="common-anchor-header">復元状態の取得<button data-href="#Get-restoration-state" class="anchor-icon" translate="no">
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
    </button></h2><p>復元ジョブ ID を取得したら、それを使用して復元の進捗状況を取得できます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.request.GetRestoreSnapshotStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.GetRestoreSnapshotStateResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.snapshot.response.RestoreSnapshotJobInfo;

<span class="hljs-type">GetRestoreSnapshotStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getRestoreSnapshotState(GetRestoreSnapshotStateReq.builder()
        .jobId(<span class="hljs-number">12345L</span>)
        .build());
<span class="hljs-type">RestoreSnapshotJobInfo</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> stateResp.getJobInfo();

System.out.println(<span class="hljs-string">&quot;Job ID: &quot;</span> + state.getJobId());
System.out.println(<span class="hljs-string">&quot;Snapshot Name: &quot;</span> + state.getSnapshotName());
System.out.println(<span class="hljs-string">&quot;Collection: &quot;</span> + state.getCollectionName());
System.out.println(<span class="hljs-string">&quot;State: &quot;</span> + state.getState());
System.out.println(<span class="hljs-string">&quot;Progress: &quot;</span> + state.getProgress() + <span class="hljs-string">&quot;%&quot;</span>);
<span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RestoreSnapshotFailed&quot;</span>.equals(state.getState())) {
    System.out.println(<span class="hljs-string">&quot;Failure Reason: &quot;</span> + state.getReason());
}
System.out.println(<span class="hljs-string">&quot;Time Cost: &quot;</span> + state.getTimeCost() + <span class="hljs-string">&quot;ms&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">stateOpt := milvusclient.NewGetRestoreSnapshotStateOption(<span class="hljs-number">12345</span>)
state, err := client.GetRestoreSnapshotState(context.Background(), stateOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}

fmt.Printf(<span class="hljs-string">&quot;Job ID: %d\n&quot;</span>, state.GetJobId())
fmt.Printf(<span class="hljs-string">&quot;Snapshot Name: %s\n&quot;</span>, state.GetSnapshotName())
fmt.Printf(<span class="hljs-string">&quot;Collection: %s\n&quot;</span>, state.GetCollectionName())
fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, state.GetState())
fmt.Printf(<span class="hljs-string">&quot;Progress: %d%%\n&quot;</span>, state.GetProgress())
<span class="hljs-keyword">if</span> state.GetState().String() == <span class="hljs-string">&quot;RestoreSnapshotFailed&quot;</span> {
    fmt.Printf(<span class="hljs-string">&quot;Failure Reason: %s\n&quot;</span>, state.GetReason())
}
fmt.Printf(<span class="hljs-string">&quot;Time Cost: %dms\n&quot;</span>, state.GetTimeCost())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> stateResp = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getRestoreSnapshotState</span>({
    <span class="hljs-attr">job_id</span>: <span class="hljs-number">12345</span>,
});
<span class="hljs-keyword">const</span> state = stateResp.<span class="hljs-property">info</span>;

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Job ID: <span class="hljs-subst">${state.job_id}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Snapshot Name: <span class="hljs-subst">${state.snapshot_name}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection: <span class="hljs-subst">${state.collection_name}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`State: <span class="hljs-subst">${state.state}</span>`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Progress: <span class="hljs-subst">${state.progress}</span>%`</span>);
<span class="hljs-keyword">if</span> (state.<span class="hljs-property">state</span> === <span class="hljs-string">&quot;RestoreSnapshotFailed&quot;</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Failure Reason: <span class="hljs-subst">${state.reason}</span>`</span>);
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Time Cost: <span class="hljs-subst">${state.time_cost}</span>ms`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/snapshot/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;jobId&quot;: &quot;12345&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
