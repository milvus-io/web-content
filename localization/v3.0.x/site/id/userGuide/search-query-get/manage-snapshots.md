---
id: manage-snapshots.md
title: Mengelola SnapshotCompatible with Milvus 3.0.x
summary: >-
  Pelajari cara membuat, mencantumkan, mendeskripsikan, menandai, memulihkan,
  dan menghapus snapshot, serta memantau tugas pemulihan.
beta: Milvus 3.0.x
---
<h1 id="Manage-Snapshots" class="common-anchor-header">Mengelola Snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Manage-Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam panduan ini, Anda akan mempelajari cara membuat dan mengelola snapshot, termasuk</p>
<ul>
<li><a href="#Create-snapshot">Membuat snapshot</a>,</li>
<li><a href="#List-snapshots">Menampilkan daftar snapshot</a>,</li>
<li><a href="#Describe-snapshot">Menjelaskan snapshot</a>,</li>
<li><a href="#Pinunpin-snapshot-data">Menandai/menghapus penandaan data snapshot</a>,</li>
<li><a href="#Restore-snapshot">Memulihkan snapshot</a>,</li>
<li><a href="#Drop-snapshot">Hapus snapshot</a>,</li>
<li><a href="#List-restoration-jobs">Tampilkan daftar tugas pemulihan</a>, dan</li>
<li><a href="#Get-restoration-state">Mendapatkan status pemulihan</a>.</li>
</ul>
<h2 id="Create-snapshot" class="common-anchor-header">Membuat snapshot<button data-href="#Create-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum membuat snapshot, Anda disarankan untuk menghentikan penulisan data ke koleksi tujuan dan memanggil ` <code translate="no">flush()</code> ` untuk menghindari kemungkinan kehilangan data.</p>
<div class="alert note">
<p>Memanggil ` <code translate="no">flush()</code> ` tidak wajib, tetapi sangat disarankan untuk menghindari kehilangan data. Jika Anda melewati langkah ini, snapshot hanya akan berisi data yang telah disimpan (flushed).</p>
</div>
<p>Saat memberi nama snapshot, gunakan nama yang jelas dan deskriptif, seperti <code translate="no">&quot;daily_backup_20240101&quot;</code> atau <code translate="no">&quot;v2.1_production_release&quot;</code>, dan hindari istilah umum, seperti <code translate="no">&quot;backup1&quot;</code> dan <code translate="no">&quot;test&quot;</code>. Gunakan nama snapshot dengan bijak untuk membedakan snapshot di berbagai versi, lingkungan, dan tahap.</p>
<p>Contoh kode di bawah ini mengasumsikan bahwa Anda sudah memiliki koleksi bernama <code translate="no">my_collection</code>.</p>
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
<h2 id="List-snapshots" class="common-anchor-header">Menampilkan daftar snapshot<button data-href="#List-snapshots" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menampilkan daftar nama snapshot yang ada.</p>
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
<h2 id="Describe-snapshot" class="common-anchor-header">Menampilkan deskripsi snapshot<button data-href="#Describe-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat memperoleh informasi terperinci mengenai snapshot tertentu.</p>
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
<h2 id="Pinunpin-snapshot-data" class="common-anchor-header">Menandai/membatalkan penandaan data snapshot<button data-href="#Pinunpin-snapshot-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Selama proses pemulihan, Anda dapat menandai snapshot untuk sementara melindungi data dasarnya dari pengumpulan sampah, dan membatalkan penandaan untuk melepaskan data tersebut.</p>
<p>Anda juga dapat menetapkan durasi time-to-live (TTL) untuk operasi penandaan tersebut sehingga data yang ditandai akan dilepaskan saat durasi tersebut berakhir.</p>
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
<h2 id="Restore-snapshot" class="common-anchor-header">Memulihkan snapshot<button data-href="#Restore-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat memulihkan snapshot ke koleksi baru. Operasi ini bersifat asinkron dan mengembalikan ID pekerjaan untuk melacak kemajuan pemulihan.</p>
<p>Pemulihan ini menggunakan mekanisme <strong>penyalinan segmen</strong> alih-alih impor data, yang lebih efisien karena</p>
<ul>
<li>menyalin file segmen (binlog, deltalog, file indeks) secara langsung dari penyimpanan snapshot</li>
<li>mempertahankan ID bidang dan ID indeks untuk memastikan kompatibilitas dengan berkas data yang sudah ada</li>
<li>menghindari penulisan ulang data dan pembangunan ulang indeks, sehingga waktu pemulihan menjadi jauh lebih cepat, dan</li>
<li>memastikan peningkatan kinerja 10 hingga 100 kali lipat dibandingkan dengan metode pencadangan dan pemulihan tradisional</li>
</ul>
<p>Untuk memulihkan snapshot, lakukan langkah-langkah berikut:</p>
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
<p>Untuk detail mengenai pemantauan kemajuan pekerjaan pemulihan, lihat <a href="#Get-restoration-state">Mendapatkan status pemulihan</a>.</p>
<h2 id="Drop-snapshot" class="common-anchor-header">Hapus snapshot<button data-href="#Drop-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menghapus snapshot jika sudah tidak diperlukan lagi. Disarankan untuk menghapus snapshot lama secara berkala guna menghemat ruang penyimpanan.</p>
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
<h2 id="List-restoration-jobs" class="common-anchor-header">Daftar pekerjaan pemulihan<button data-href="#List-restoration-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menggunakan API ini untuk mendapatkan daftar snapshot yang telah dibuat untuk koleksi target.</p>
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
<h2 id="Get-restoration-state" class="common-anchor-header">Mendapatkan status pemulihan<button data-href="#Get-restoration-state" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda memiliki ID pekerjaan pemulihan, Anda dapat menggunakannya untuk memeriksa kemajuan pemulihan.</p>
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
