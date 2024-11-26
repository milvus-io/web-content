---
id: manage-partitions.md
title: 管理分区
---
<h1 id="Manage-Partitions​" class="common-anchor-header">管理分区<button data-href="#Manage-Partitions​" class="anchor-icon" translate="no">
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
    </button></h1><p>分区是一个 Collection 的子集。每个分区与其父集合共享相同的数据结构，但只包含集合中的一个数据子集。本页将帮助你了解如何管理分区。</p>
<h2 id="Overview​" class="common-anchor-header">概览<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 Collection 时，Zilliz Cloud 也会在 Collection 中创建名为<strong>_default 的</strong>分区。如果您不打算添加任何其他分区，所有插入到 Collections 中的实体都会进入默认分区，所有搜索和查询也都在默认分区中进行。</p>
<p>您可以添加更多分区，并根据特定条件将实体插入其中。这样就可以限制在某些分区内进行搜索和查询，从而提高搜索性能。</p>
<p>一个 Collections 最多可以有 1,024 个分区。</p>
<div class="alert note">
<p><strong>Partition Key</strong>功能是基于分区的搜索优化，允许 Zilliz Cloud 根据特定标量字段中的值将实体分配到不同的分区中。该功能有助于实现面向分区的多租户，并提高搜索性能。</p>
<p>本页将不讨论此功能。要了解更多信息，请参阅<a href="/docs/zh/use-partition-key.md">使用 Partition Key</a>。</p>
</div>
<h2 id="List-Partitions​" class="common-anchor-header">列出分区<button data-href="#List-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 Collections 时，Zilliz Cloud 也会在该 Collections 中创建名为<strong>_default 的</strong>分区。您可以按如下方式列出 Collections 中的分区。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    ​
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvucclient&quot;</span>​
)​
​
ctx, cancel := context.WithCancel(context.Background())​
<span class="hljs-keyword">defer</span> cancel()​
​
milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
cli, err := client.New(ctx, &amp;client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
<span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(partitionNames)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Partition​" class="common-anchor-header">创建分区<button data-href="#Create-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以向集合中添加更多分区，并根据特定条件向这些分区中插入实体。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;​
​
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
client.createPartition(createPartitionReq);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default, partitionA]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    ​
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>​
)​
​
err = cli.CreatePartition(ctx, client.NewCreatePartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
partitionNames, err := cli.ListPartitions(ctx, client.NewListPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(partitionNames)​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;,​</span>
<span class="hljs-comment">#         &quot;partitionA&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-for-a-Specific-Partition​" class="common-anchor-header">检查特定分区<button data-href="#Check-for-a-Specific-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>以下代码片段演示了如何检查特定 Collections 中是否存在分区。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.has_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># True​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;​
​
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">hasPartitionRes</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);​
System.out.println(hasPartitionRes);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    ​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>​
)​
​
result, err := cli.HasPartition(ctx, milvusclient.NewHasPartitionOption(<span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))​
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
    <span class="hljs-comment">// handle error​</span>
}​
​
fmt.Println(result)​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/has&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#        &quot;has&quot;: true​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-and-Release-Partitions​" class="common-anchor-header">加载和释放分区<button data-href="#Load-and-Release-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以分别加载或释放一个或多个分区。</p>
<h3 id="Load-Partitions​" class="common-anchor-header">加载分区</h3><p>可以分别加载某个 Collection 中的特定分区。值得注意的是，如果集合中有未加载的分区，则集合的加载状态会保持未加载状态。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
​
​
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.loadPartitions(loadPartitionsReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
<span class="hljs-comment">// True​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/load&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,​</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;,​</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Release-Partitions​" class="common-anchor-header">释放分区</h3><p>您还可以释放特定分区。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.release_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
​
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);​
System.out.println(getLoadStateRes);​
​
<span class="hljs-comment">// False​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateNotLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {​</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 0,​</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;,​</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;​</span>
<span class="hljs-comment">#     }​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-Operations-Within-Partitions​" class="common-anchor-header">分区内的数据操作符<button data-href="#Data-Operations-Within-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Insert-and-Delete-Entities​" class="common-anchor-header">插入和删除实体</h3><p>您可以在特定操作符中执行插入、向上插入和删除操作。有关详情，请参阅</p>
<ul>
<li><p>将实体插入分区</p></li>
<li><p>将实体倒插入分区</p></li>
<li><p>从分区删除实体</p></li>
</ul>
<h3 id="Search-and-Query​" class="common-anchor-header">搜索和查询</h3><p>可以在特定分区内进行搜索和查询。详情请参阅</p>
<ul>
<li><p>在分区内进行 ANN 搜索</p></li>
<li><p>在分区内进行元数据过滤</p></li>
</ul>
<h2 id="Drop-Partition​" class="common-anchor-header">删除分区<button data-href="#Drop-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以丢弃不再需要的分区。在丢弃分区之前，请确保该分区已被释放。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.release_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]​
)​
​
client.drop_partition(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
res = client.list_partitions(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.DropPartitionReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;​
​
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .build();​
​
client.releasePartitions(releasePartitionsReq);​
​
<span class="hljs-type">DropPartitionReq</span> <span class="hljs-variable">dropPartitionReq</span> <span class="hljs-operator">=</span> DropPartitionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build();​
​
client.dropPartition(dropPartitionReq);​
​
<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);​
System.out.println(partitionNames);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// [_default]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]​
})​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropPartition</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [&quot;_default&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/drop&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         &quot;_default&quot;​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
