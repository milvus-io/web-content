---
id: consistency.md
summary: 了解 Milvus 的四个一致性级别。
title: 一致性
---
<h1 id="Consistency-Level​" class="common-anchor-header">一致性级别<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>作为一个分布式向量数据库，Milvus 提供了多种一致性级别，以确保每个节点或副本在读写操作期间都能访问相同的数据。目前，支持的一致性级别包括<strong>强</strong>、<strong>有限制</strong>、<strong>最终</strong>和<strong>会话</strong>，其中<strong>有限制</strong>是默认使用的一致性级别。</p>
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一个存储和计算分离的系统。在这个系统中，<strong>数据节点</strong>负责数据的持久性，并最终将其存储在 MinIO/S3 等分布式对象存储中。<strong>查询节点</strong>负责处理搜索等计算任务。这些任务涉及<strong>批量数据</strong>和<strong>流数据的</strong>处理。简单地说，批量数据可以理解为已经存储在对象存储中的数据，而流式数据指的是尚未存储在对象存储中的数据。由于网络延迟，查询节点通常无法保存最新的流数据。如果没有额外的保障措施，直接在流数据上执行搜索可能会导致丢失许多未提交的数据点，从而影响搜索结果的准确性。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>批数据和流数据</span> </span></p>
<p>如上图所示，在收到搜索请求后，查询节点可以同时接收流数据和批量数据。但是，由于网络延迟，查询节点获得的流数据可能不完整。</p>
<p>为了解决这个问题，Milvus 对数据队列中的每条记录都打上时间戳，并不断向数据队列中插入同步时间戳。每当收到同步时间戳（syncTs），QueryNodes 就会将其设置为服务时间，这意味着 QueryNodes 可以查看该服务时间之前的所有数据。基于 ServiceTime，Milvus 可以提供保证时间戳（GuaranteeTs），以满足用户对一致性和可用性的不同要求。用户可以通过在搜索请求中指定 GuaranteeTs，告知查询节点需要在搜索范围中包含指定时间点之前的数据。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>服务时间和保证时间</span> </span></p>
<p>如上图所示，如果 GuaranteeTs 小于 ServiceTime，则表示指定时间点之前的所有数据已全部写入磁盘，允许查询节点立即执行搜索操作。当 GuaranteeTs 大于 ServiceTime 时，查询节点必须等到 ServiceTime 超过 GuaranteeTs 后才能执行搜索操作。</p>
<p>用户需要在查询准确性和查询延迟之间做出权衡。如果用户对一致性要求较高，对查询延迟不敏感，可以将 GuaranteeTs 设置为尽可能大的值；如果用户希望快速获得搜索结果，对查询准确性的容忍度较高，则可以将 GuaranteeTs 设置为较小的值。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>一致性级别图解</span> </span></p>
<p>Milvus 提供四种不同 GuaranteeTs 的一致性级别。</p>
<ul>
<li><p><strong>强</strong></p>
<p>使用最新的时间戳作为 GuaranteeTs，查询节点必须等到服务时间满足 GuaranteeTs 后才能执行搜索请求。</p></li>
<li><p><strong>最终</strong></p>
<p>GuaranteeTs 设置为极小值（如 1），以避免一致性检查，这样查询节点就可以立即对所有批次数据执行搜索请求。</p></li>
<li><p><strong>有限制</strong>（默认）</p>
<p>GuranteeTs 设置为比最新时间戳更早的时间点，以使查询节点在执行搜索时能够容忍一定的数据丢失。</p></li>
<li><p><strong>会话</strong></p>
<p>客户端插入数据的最新时间点被用作 GuaranteeTs，以便查询节点能对客户端插入的所有数据执行搜索。</p></li>
</ul>
<p>Milvus 使用 "有界滞后 "作为默认的一致性级别。如果未指定保证时间，则使用最新的服务时间作为保证时间。</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">设置一致性级别<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>创建 Collections 以及执行搜索和查询时，可以设置不同的一致性级别。</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">创建 Collections 时设置一致性级别</h3><p>创建 Collections 时，可以为集合内的搜索和查询设置一致性级别。以下代码示例将一致性级别设置为<strong>"有界</strong>"。</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">consistency_level</code> 参数的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">在搜索中设置一致性级别</h3><p>您可以随时更改特定搜索的一致性级别。下面的代码示例将一致性级别设置为 "有界"。此更改仅适用于当前搜索请求。</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>该参数也可用于混合搜索和搜索迭代器。<code translate="no">consistency_level</code> 参数的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">在查询中设置一致性级别</h3><p>您可以随时更改特定搜索的一致性级别。以下代码示例将一致性级别设置为<strong>最终</strong>。该设置仅适用于当前查询请求。</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>该参数在查询迭代器中也可用。<code translate="no">consistency_level</code> 参数的可能值是<code translate="no">Strong</code>,<code translate="no">Bounded</code>,<code translate="no">Eventually</code>, 和<code translate="no">Session</code> 。</p>
