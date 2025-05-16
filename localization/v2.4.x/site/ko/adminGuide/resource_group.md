---
id: resource_group.md
related_key: Manage Resource Groups
summary: 리소스 그룹을 관리하는 방법을 알아보세요.
title: 리소스 그룹 관리
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">리소스 그룹 관리<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서는 리소스 그룹을 사용하여 특정 쿼리 노드를 다른 쿼리 노드로부터 물리적으로 격리할 수 있습니다. 이 가이드에서는 사용자 정의 리소스 그룹을 생성하고 관리하는 방법과 그룹 간에 노드를 전송하는 방법을 안내합니다.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">리소스 그룹이란?<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>리소스 그룹은 Milvus 클러스터의 쿼리 노드 중 일부 또는 전부를 보유할 수 있습니다. 리소스 그룹 간에 쿼리 노드를 할당하는 방법은 가장 적합한 것을 기준으로 결정합니다. 예를 들어, 다중 컬렉션 시나리오에서는 각 리소스 그룹에 적절한 수의 쿼리 노드를 할당하고 컬렉션을 다른 리소스 그룹에 로드하여 각 컬렉션 내의 작업이 다른 컬렉션의 작업과 물리적으로 독립적으로 이루어지도록 할 수 있습니다.</p>
<p>Milvus 인스턴스는 시작할 때 모든 쿼리 노드를 보유하기 위해 기본 리소스 그룹을 유지하며, 그 이름은 <strong>__default_resource_group입니다</strong>.</p>
<p>버전 2.4.1부터 Milvus는 선언적 리소스 그룹 API를 제공하며, 이전 리소스 그룹 API는 더 이상 사용되지 않습니다. 새로운 선언적 API를 통해 사용자는 클라우드 네이티브 환경에서 더 쉽게 보조 개발을 수행할 수 있습니다.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">리소스 그룹의 개념<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>리소스 그룹은 리소스 그룹 구성으로 설명됩니다:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>요청</strong> 속성은 리소스 그룹이 충족해야 하는 조건을 지정합니다.</li>
<li><strong>제한</strong> 속성은 리소스 그룹의 최대 제한을 지정합니다.</li>
<li><strong>transfer_from</strong> 및 <strong>transfer_to</strong> 속성은 각각 리소스 그룹이 어떤 리소스 그룹으로부터 리소스를 획득하고 어떤 리소스 그룹으로 리소스를 전송해야 하는지를 설명합니다.</li>
</ul>
<p>리소스 그룹의 구성이 변경되면 Milvus는 새 구성에 따라 현재 쿼리 노드 리소스를 가능한 한 많이 조정하여 모든 리소스 그룹이 결국 다음 조건을 충족하도록 합니다:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>단, 다음의 경우는 예외입니다:</p>
<ul>
<li>밀버스 클러스터의 쿼리 노드 수가 부족한 경우(예: <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, 항상 충분한 쿼리 노드가 없는 리소스 그룹이 존재합니다.</li>
<li>Milvus 클러스터의 쿼리 노드 수가 과다한 경우(예: <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>)에는 항상 여분의 쿼리 노드가 <strong>__default_resource_group에</strong> 먼저 배치됩니다.</li>
</ul>
<p>물론 클러스터의 쿼리 노드 수가 변경되면 Milvus는 최종 조건을 충족하기 위해 지속적으로 조정을 시도합니다. 따라서 먼저 리소스 그룹 구성 변경 사항을 적용한 다음 쿼리 노드 스케일링을 수행할 수 있습니다.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">선언적 API를 사용하여 리소스 그룹 관리하기<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>이 페이지의 모든 코드 샘플은 PyMilvus 2.4.15 버전입니다. 실행하기 전에 PyMilvus 설치를 업그레이드하세요.</p>
</div>
<ol>
<li><p>리소스 그룹을 생성합니다.</p>
<p>리소스 그룹을 생성하려면 Milvus 인스턴스에 연결한 후 다음을 실행합니다. 다음 스니펫은 <code translate="no">default</code> 가 Milvus 연결의 별칭이라고 가정합니다.</p>
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
<li><p>리소스 그룹을 나열합니다.</p>
<p>리소스 그룹을 만들면 리소스 그룹 목록에서 리소스 그룹을 볼 수 있습니다.</p>
<p>Milvus 인스턴스에서 리소스 그룹 목록을 보려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹을 설명합니다.</p>
<p>Milvus가 다음과 같이 해당 리소스 그룹을 설명하도록 할 수 있습니다:</p>
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
<li><p>리소스 그룹 간에 노드 전송.</p>
<p>설명된 리소스 그룹에 아직 쿼리 노드가 없는 것을 확인할 수 있습니다. 다음과 같이 기본 리소스 그룹에서 생성한 리소스 그룹으로 일부 노드를 이동합니다. 현재 클러스터의 <strong>__default_resource_group에</strong> 1개의 쿼리 노드가 있고 하나의 노드를 생성한 <strong>rg로</strong> 이전하고자 한다고 가정합니다.<code translate="no">update_resource_groups</code> 은 여러 구성 변경에 대해 원자성을 보장하므로 Milvus에 중간 상태가 표시되지 않습니다.</p>
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
<li><p>컬렉션과 파티션을 리소스 그룹에 로드합니다.</p>
<p>리소스 그룹에 쿼리 노드가 있으면 이 리소스 그룹에 컬렉션을 로드할 수 있습니다. 다음 코드 조각은 <code translate="no">demo</code> 이라는 이름의 컬렉션이 이미 존재한다고 가정합니다.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>또한 리소스 그룹에 파티션을 로드하고 그 복제본을 여러 리소스 그룹에 분산시킬 수도 있습니다. 다음은 <code translate="no">Books</code> 이라는 이름의 컬렉션이 이미 존재하고 <code translate="no">Novels</code> 이라는 이름의 파티션이 있다고 가정합니다.</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">_resource_groups</code> 은 선택적 매개변수이며, 이 매개변수를 지정하지 않으면 Milvus가 기본 리소스 그룹의 쿼리 노드에 복제본을 로드하도록 합니다.</p>
<p>Milus가 컬렉션의 각 복제본을 별도의 리소스 그룹에 로드하도록 하려면 리소스 그룹의 수가 복제본 수와 같은지 확인하세요.</p></li>
<li><p>리소스 그룹 간에 복제본을 전송합니다.</p>
<p>Milus는 <a href="/docs/ko/v2.4.x/replica.md">복제본을</a> 사용하여 여러 쿼리 노드에 분산된 <a href="/docs/ko/v2.4.x/glossary.md#Segment">세그먼트</a> 간에 로드 밸런싱을 달성합니다. 다음과 같이 컬렉션의 특정 복제본을 한 리소스 그룹에서 다른 리소스 그룹으로 이동할 수 있습니다:</p>
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
<li><p>리소스 그룹 삭제.</p>
<p>쿼리 노드가 없는 리소스 그룹(<code translate="no">limits.node_num = 0</code>)은 언제든지 삭제할 수 있습니다. 이 가이드에서 리소스 그룹 <code translate="no">rg</code> 에는 이제 하나의 쿼리 노드가 있습니다. 먼저 리소스 그룹의 <code translate="no">limits.node_num</code> 구성을 0으로 변경해야 합니다.</p>
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
<p>자세한 내용은 <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">pymilvus의 관련 예제를</a> 참조하세요.</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">클러스터 확장을 관리하는 좋은 방법<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 Milvus는 클라우드 네이티브 환경에서 독립적으로 스케일 인/아웃이 불가능합니다. 그러나 컨테이너 오케스트레이션과 함께 <strong>선언적 리소스 그룹 API를</strong> 사용하면 Milvus는 쉽게 리소스 격리를 달성하고 쿼리 노드를 관리할 수 있습니다. 다음은 클라우드 환경에서 쿼리 노드를 관리하기 위한 모범 사례입니다:</p>
<ol>
<li><p>기본적으로 Milvus는 <strong>__default_resource_group을</strong> 생성합니다. 이 리소스 그룹은 삭제할 수 없으며 모든 컬렉션의 기본 로딩 리소스 그룹으로도 사용되며 항상 중복 쿼리 노드가 할당됩니다. 따라서 보류 중인 리소스 그룹을 생성하여 사용하지 않는 쿼리 노드 리소스를 보관하여 <strong>__default_resource_group이</strong> 쿼리 노드 리소스를 점유하지 못하도록 할 수 있습니다.</p>
<p>또한 <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> 이라는 제약 조건을 엄격하게 적용하면 클러스터에서 쿼리 노드 할당을 정밀하게 제어할 수 있습니다. 현재 클러스터에 쿼리 노드가 하나만 있다고 가정하고 클러스터를 초기화해 보겠습니다. 다음은 설정 예제입니다:</p>
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
<p>위의 예제 코드를 사용하여 추가 쿼리 노드를 보유하기 위해 <strong>__pending_nodes라는</strong> 리소스 그룹을 만듭니다. 또한 <strong>rg1과</strong> <strong>rg2라는</strong> 두 개의 사용자별 리소스 그룹을 만듭니다. 또한 다른 리소스 그룹이 <strong>__pending_nodes에서</strong> 누락되거나 중복된 쿼리 노드를 복구하는 데 우선순위를 두도록 합니다.</p></li>
<li><p>클러스터 스케일 아웃</p>
<p>다음과 같은 스케일링 함수가 있다고 가정합니다:</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>API를 사용하여 다른 리소스 그룹에 영향을 주지 않고 특정 리소스 그룹을 지정된 수의 쿼리 노드로 확장할 수 있습니다.</p>
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
<li><p>클러스터 스케일 인</p>
<p>마찬가지로 <strong>__pending_nodes</strong> 리소스 그룹에서 쿼리 노드를 우선적으로 선택하는 스케일 인 규칙을 설정할 수 있습니다. 이 정보는 <code translate="no">describe_resource_group</code> API를 통해 얻을 수 있습니다. 지정된 리소스 그룹 스케일인 목표 달성하기.</p>
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">리소스 그룹이 여러 복제본과 상호 작용하는 방식<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>단일 컬렉션의 복제본과 리소스 그룹은 N 대 N 관계를 갖습니다.</li>
<li>단일 컬렉션의 여러 복제본이 하나의 리소스 그룹에 로드되면 해당 리소스 그룹의 쿼리 노드가 복제본 간에 균등하게 분산되어 각 복제본의 쿼리 노드 수의 차이가 1을 초과하지 않도록 합니다.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>멀티테넌트 Milvus 인스턴스를 배포하려면 다음을 따르세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/rbac.md">RBAC 활성화</a></li>
<li><a href="/docs/ko/v2.4.x/users_and_roles.md">사용자 및 역할</a></li>
</ul>
