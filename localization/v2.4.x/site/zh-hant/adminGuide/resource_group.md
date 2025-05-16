---
id: resource_group.md
related_key: Manage Resource Groups
summary: 學習如何管理資源群組。
title: 管理資源群組
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">管理資源群組<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，您可以使用資源群組，將某些查詢節點與其他節點實體隔離。本指南將教您如何建立和管理自訂資源群組，以及在資源群組之間轉移節點。</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">什麼是資源群組<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>一个资源组可以容纳 Milvus 集群中的几个或所有查询节点。您可以根据对您最有意义的方式来决定如何在资源组之间分配查询节点。例如，在多集合場景中，您可以為每個資源群組分配適當數量的查詢節點，並將集合載入不同的資源群組，以便每個集合中的作業與其他集合中的作業在物理上獨立。</p>
<p>請注意，一個 Milvus 實例會維護一個預設的資源群組，以在啟動時存放所有查詢節點，並將其命名為<strong>__default_resource_group</strong> 。</p>
<p>從版本 2.4.1 開始，Milvus 提供了宣告式的資源群組 API，而舊的資源群組 API 已經被廢棄。新的宣告式 API 能讓使用者達到idempotency，更容易在雲原生環境中進行二次開發。</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">資源群組的概念<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>資源群組由資源群組 config 描述：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>requests 屬性</strong>指定資源群組必須符合的條件。</li>
<li><strong>limits</strong>屬性指定資源群組的最大限制。</li>
<li><strong>transfer_from</strong>和<strong>transfer_to 屬性</strong>分別描述資源群組最好從哪些資源群組取得資源，以及將資源轉移到哪些資源群組。</li>
</ul>
<p>一旦資源群組的配置發生變化，Milvus 會根據新的配置盡可能調整當前查詢節點的資源，確保所有資源群組最終都能滿足以下條件：</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>下列情況除外：</p>
<ul>
<li>當 Milvus 集群中的 QueryNodes 數量不足時，即<code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> ，總會有資源群組沒有足夠的 QueryNodes。</li>
<li>當 Milvus 叢集中的 QueryNodes 數量過多時，即<code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code> ，多餘的 QueryNodes 總會先被放置在<strong>__default_resource_group</strong>中。</li>
</ul>
<p>當然，如果群集中的 QueryNodes 數量發生變化，Milvus 會不斷嘗試調整以滿足最終條件。因此，您可以先套用資源群組組態變更，然後再執行 QueryNode 擴充。</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">使用宣告式 api 管理資源群組<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>本頁面的所有程式碼範例都在 PyMilvus 2.4.15 中。在執行它們之前，請先升級您的 PyMilvus 安裝。</p>
</div>
<ol>
<li><p>建立資源群組</p>
<p>要建立一個資源群組，請在連線到 Milvus 實例後執行下列步驟。以下片段假設<code translate="no">default</code> 是您 Milvus 連線的別名。</p>
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
<li><p>列出資源群組。</p>
<p>建立資源群組後，您可以在資源群組清單中看到它。</p>
<p>要查看 Milvus 实例中的资源组列表，请执行以下操作：</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>描述資源群組。</p>
<p>您可以讓 Milvus 以下列方式描述資源群組：</p>
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
<li><p>在資源群組之間轉移節點。</p>
<p>您可能會注意到所描述的資源群組還沒有任何查詢節點。從預設資源群組移動一些節點到您建立的資源群組，如下所示：假設目前群組的<strong>__default_resource_group</strong>中有 1 個 QueryNodes，而我們想要將一個節點轉移到建立的<strong>rg</strong> 中。<code translate="no">update_resource_groups</code> 確保多重組態變更的原子性，因此 Milvus 看不到任何中間狀態。</p>
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
<li><p>將集合和分割載入資源群組。</p>
<p>一旦資源群組中有查詢節點，您就可以載入集合到這個資源群組。以下片段假定已經存在一個名為<code translate="no">demo</code> 的集合。</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>此外，您也可以直接將分割載入資源群組，並將其複本分佈在多個資源群組中。以下假設一個名為<code translate="no">Books</code> 的集合已經存在，而且它有一個名為<code translate="no">Novels</code> 的分割區。</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>請注意，<code translate="no">_resource_groups</code> 是一個可選參數，不指定它會讓 Milvus 將複製本載入預設資源群組中的查詢節點。</p>
<p>若要 Milus 在單獨的資源群組中載入集合的每個複製本，請確保資源群組的數量等於複製本的數量。</p></li>
<li><p>在資源群組之間轉移副本。</p>
<p>Milvus 使用<a href="/docs/zh-hant/v2.4.x/replica.md">副本</a>实现分布在多个查询节点上的<a href="/docs/zh-hant/v2.4.x/glossary.md#Segment">段</a>之间的负载平衡。您可以按以下方式將資料集中的某些複製品從一個資源群組移到另一個資源群組：</p>
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
<li><p>刪除資源群組。</p>
<p>您可以隨時刪除沒有查詢節點的資源群組 (<code translate="no">limits.node_num = 0</code>)。在本指南中，資源群組<code translate="no">rg</code> 現在有一個查詢節點。您需要先將資源群組<code translate="no">limits.node_num</code> 的配置變更為零。</p>
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
<p>如需詳細資訊，請參閱<a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">pymilvus 中的相關範例</a>。</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">管理集群擴充的好方法<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，在雲原生環境中，Milvus 無法獨立進行擴充。但是，通過使用<strong>Declarative Resource Group API</strong>與容器協調，Milvus 可以輕鬆實現 QueryNodes 的資源隔離和管理。 以下是在雲環境中管理 QueryNodes 的良好實踐：</p>
<ol>
<li><p>預設情況下，Milvus 會建立一個<strong>__default_resource_group</strong> 。此資源群組無法刪除，同時也是所有集合的預設載入資源群組，多餘的 QueryNodes 總是會被指派給它。因此，我們可以建立一個待定資源群組，來存放未使用的 QueryNode 資源，防止 QueryNode 資源被<strong>__default_resource_group</strong> 所佔用。</p>
<p>此外，如果我們嚴格執行約束<code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> ，就可以精確地控制群集中 QueryNode 的分配。讓我們假設目前叢集中只有一個 QueryNode，並初始化叢集。 以下是一個設定範例：</p>
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
<p>使用上面的範例程式碼，我們建立一個名為<strong>__pending_nodes</strong>的資源群組，以存放額外的 QueryNodes。我們也建立兩個使用者特定的資源群組，分別命名為<strong>rg1</strong>和<strong>rg2</strong>。此外，我們確保另一個資源群組優先從<strong>__pending_nodes</strong> 恢復遺失或多餘的 QueryNodes。</p></li>
<li><p>叢集縮放</p>
<p>假設我們有以下的縮放功能：</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>我們可以使用 API 將特定資源群組的 QueryNodes 擴充到指定的數量，而不影響任何其他資源群組。</p>
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
<li><p>群集縮放</p>
<p>同樣地，我們可以建立 Scaling-in 規則，優先從<strong>__pending_nodes</strong>資源群組中選擇 QueryNodes。此資訊可透過<code translate="no">describe_resource_group</code> API 取得。達到擴充到指定資源群組的目標。</p>
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">資源群組如何與多個複製品互動<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>單一集合的複製本與資源群組有 N 對 N 的關係。</li>
<li>當單一集合的多個複製本載入一個資源群組時，該資源群組的 QueryNodes 會平均分配給各個複製本，確保每個複製本的 QueryNodes 數目差異不超過 1。</li>
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
<li><a href="/docs/zh-hant/v2.4.x/rbac.md">啟用 RBAC</a></li>
<li><a href="/docs/zh-hant/v2.4.x/users_and_roles.md">使用者與角色</a></li>
</ul>
