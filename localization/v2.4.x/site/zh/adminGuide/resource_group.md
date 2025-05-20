---
id: resource_group.md
related_key: Manage Resource Groups
summary: 了解如何管理资源组。
title: 管理资源组
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">管理资源组<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，您可以使用资源组将某些查询节点与其他节点物理隔离。本指南将向您介绍如何创建和管理自定义资源组，以及如何在资源组之间传输节点。</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">什么是资源组<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>一个资源组可以容纳 Milvus 集群中的多个或全部查询节点。如何在资源组之间分配查询节点，由您根据最合理的方式来决定。例如，在多集合场景中，可以为每个资源组分配适当数量的查询节点，并将集合加载到不同的资源组中，这样每个集合中的操作与其他集合中的操作在物理上是独立的。</p>
<p>请注意，Milvus 实例在启动时会维护一个默认资源组来容纳所有查询节点，并将其命名为<strong>__default_resource_group</strong> 。</p>
<p>从 2.4.1 版开始，Milvus 提供了声明式资源组 API，而旧的资源组 API 已被弃用。新的声明式 API 使用户能够实现惰性，从而更轻松地在云原生环境中进行二次开发。</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">资源组的概念<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>资源组由资源组 config 描述：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>requests</strong>属性指定了资源组必须满足的条件。</li>
<li><strong>limits</strong>属性指定资源组的最大限制。</li>
<li><strong>transfer_from</strong>和<strong>transfer_to</strong>属性分别描述了资源组应优先从哪些资源组获取资源，以及应向哪些资源组转移资源。</li>
</ul>
<p>一旦资源组的配置发生变化，Milvus 会根据新的配置尽可能调整当前查询节点的资源，确保所有资源组最终满足以下条件：</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>以下情况除外：</p>
<ul>
<li>当 Milvus 集群中的 QueryNodes 数量不足时，即<code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> ，总会有资源组没有足够的 QueryNodes。</li>
<li>当 Milvus 集群中的 QueryNodes 数量过多时，即<code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code> ，多余的 QueryNodes 总是会先被放置在__default_<strong>resource</strong>_group。</li>
</ul>
<p>当然，如果集群中的 QueryNodes 数量发生变化，Milvus 会不断尝试调整以满足最终条件。因此，可以先应用资源组配置更改，然后再执行 QueryNode 扩展。</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">使用声明式 api 管理资源组<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>本页面上的所有代码示例都在 PyMilvus 2.4.15 中。运行这些示例之前，请升级您的 PyMilvus 安装。</p>
</div>
<ol>
<li><p>创建资源组。</p>
<p>要创建资源组，请在连接到 Milvus 实例后运行以下代码。以下代码段假定<code translate="no">default</code> 是 Milvus 连接的别名。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    utility.create_resource_group(name, config=utility.ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ), using=<span class="hljs-string">&#x27;default&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>列出资源组。</p>
<p>创建资源组后，就可以在资源组列表中看到它。</p>
<p>要查看 Milvus 实例中的资源组列表，请执行以下操作：</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>描述资源组。</p>
<p>您可以让 Milvus 以如下方式描述一个资源组：</p>
<pre><code translate="no" class="language-Python">info = utility.describe_resource_group(name, using=<span class="hljs-string">&quot;default&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment">#        &lt;name:&quot;rg&quot;&gt;,           // string, rg name</span>
<span class="hljs-comment">#        &lt;capacity:1&gt;,            // int, num_node which has been transfer to this rg</span>
<span class="hljs-comment">#        &lt;num_available_node:0&gt;,  // int, available node_num, some node may shutdown</span>
<span class="hljs-comment">#        &lt;num_loaded_replica:{}&gt;, // map[string]int, from collection_name to loaded replica of each collecion in this rg</span>
<span class="hljs-comment">#        &lt;num_outgoing_node:{}&gt;,  // map[string]int, from collection_name to outgoging accessed node num by replica loaded in this rg </span>
<span class="hljs-comment">#        &lt;num_incoming_node:{}&gt;.  // map[string]int, from collection_name to incoming accessed node num by replica loaded in other rg</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>在资源组之间转移节点。</p>
<p>您可能会注意到，所描述的资源组还没有任何查询节点。将一些节点从默认资源组转移到你创建的资源组，如下所示： 假设集群的__default_<strong>resource</strong>_group 中目前有 1 个查询节点，我们想将一个节点转移到创建的<strong>rg</strong> 中。<code translate="no">update_resource_groups</code> ，确保多次配置更改的原子性，因此 Milvus 不会看到中间状态。</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>向资源组加载 Collections 和分区。</p>
<p>一旦资源组中有了查询节点，就可以向该资源组加载 Collections。下面的代码段假定已经存在名为<code translate="no">demo</code> 的 Collections。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>此外，您还可以将一个分区加载到一个资源组中，并将其副本分布到多个资源组中。下面假设已经存在名为<code translate="no">Books</code> 的 Collections，并且它有一个名为<code translate="no">Novels</code> 的分区。</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>请注意，<code translate="no">_resource_groups</code> 是一个可选参数，如果不指定，Milvus 将把副本加载到默认资源组中的查询节点上。</p>
<p>要让 Milus 在单独的资源组中加载 Collections 的每个副本，请确保资源组的数量等于副本的数量。</p></li>
<li><p>在资源组之间传输副本。</p>
<p>Milvus 使用<a href="/docs/zh/v2.4.x/replica.md">副本</a>来实现分布在多个查询节点上的<a href="/docs/zh/v2.4.x/glossary.md#Segment">网段</a>之间的负载平衡。您可以按以下方法将某个 Collection 的某些副本从一个资源组转移到另一个资源组：</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.transfer_replica(source, target, collection_name, num_replicas, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_node}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>删除一个资源组。</p>
<p>您可以随时放弃一个没有查询节点的资源组 (<code translate="no">limits.node_num = 0</code>)。在本指南中，资源组<code translate="no">rg</code> 现在有一个查询节点。您需要先将资源组<code translate="no">limits.node_num</code> 的配置更改为零。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        <span class="hljs-string">&quot;rg&quot;</span>: utility.ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        ),
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    utility.drop_resource_group(<span class="hljs-string">&quot;rg&quot;</span>, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Something went wrong while dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>有关详细信息，请参阅<a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">pymilvus 中的相关示例</a>。</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">管理集群扩展的良好做法<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，Milvus 无法在云原生环境中独立地伸缩。不过，通过将<strong>声明式资源组 API</strong>与容器协调结合使用，Milvus 可以轻松实现 QueryNodes 的资源隔离和管理。 以下是在云环境中管理 QueryNodes 的良好实践：</p>
<ol>
<li><p>默认情况下，Milvus 会创建一个__default_<strong>resource</strong>_group。该资源组不能删除，同时也作为所有 Collections 的默认加载资源组，冗余的 QueryNodes 总是分配给它。因此，我们可以创建一个待定资源组来保存未使用的 QueryNode 资源，防止 QueryNode 资源被__<strong>default</strong>_resource_group 占用。</p>
<p>此外，如果我们严格执行<code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> 这一约束，就能精确控制集群中 QueryNode 的分配。下面是一个设置示例：</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
<span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    utility.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    utility.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>使用上面的示例代码，我们创建了一个名为<strong>__pending_nodes</strong>的资源组，用于容纳更多的 QueryNodes。我们还创建了名为<strong>rg1</strong>和<strong>rg2</strong> 的两个特定于用户的资源组。此外，我们还确保其他资源组优先从<strong>_</strong>_pending_nodes 中恢复丢失或多余的 QueryNodes。</p></li>
<li><p>集群扩展</p>
<p>假设我们有以下缩放功能：</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>我们可以使用 API 将特定资源组的 QueryNodes 扩展到指定数量，而不会影响其他任何资源组。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
utility.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
    <span class="hljs-string">&quot;rg2&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})
scale_to(<span class="hljs-number">5</span>)
<span class="hljs-comment"># rg1 has 3 nodes, rg2 has 1 node, __default_resource_group has 1 node.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>群集向内扩展</p>
<p>同样，我们也可以建立缩放规则，优先从<strong>__pending_nodes</strong>资源组中选择 QueryNodes。这一信息可通过<code translate="no">describe_resource_group</code> API 获取。实现扩展到指定资源组的目标。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
utility.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})

<span class="hljs-comment"># rg1 has 2 nodes, rg2 has 1 node, __default_resource_group has 1 node, __pending_nodes has 1 node.</span>
scale_to(<span class="hljs-number">4</span>)
<span class="hljs-comment"># scale the node in __pending_nodes</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">资源组如何与多个副本交互<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>单个 Collections 的副本和资源组之间是 N 对 N 的关系。</li>
<li>当单个 Collections 的多个副本加载到一个资源组时，该资源组的 QueryNodes 会平均分配给各个副本，确保每个副本拥有的 QueryNodes 数量之差不超过 1。</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>要部署多租户 Milvus 实例，请阅读以下内容：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/rbac.md">启用 RBAC</a></li>
<li><a href="/docs/zh/v2.4.x/users_and_roles.md">用户和角色</a></li>
</ul>
