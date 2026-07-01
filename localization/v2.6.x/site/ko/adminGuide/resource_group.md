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
    </button></h1><p>Milvus에서는 리소스 그룹을 사용하여 특정 쿼리 노드를 다른 노드들과 물리적으로 분리할 수 있습니다. 이 가이드에서는 사용자 정의 리소스 그룹을 생성 및 관리하는 방법과 그룹 간에 노드를 이동하는 방법을 단계별로 안내합니다.</p>
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
    </button></h2><p>리소스 그룹은 Milvus 클러스터 내의 여러 쿼리 노드 또는 모든 쿼리 노드를 포함할 수 있습니다. 사용자에게 가장 적합한 방식에 따라 리소스 그룹 간에 쿼리 노드를 어떻게 할당할지 결정할 수 있습니다. 예를 들어, 다중 컬렉션 환경에서는 각 리소스 그룹에 적절한 수의 쿼리 노드를 할당하고 컬렉션을 서로 다른 리소스 그룹에 로드함으로써, 각 컬렉션 내의 작업이 다른 컬렉션의 작업과 물리적으로 독립적으로 처리되도록 할 수 있습니다.</p>
<p>Milvus 인스턴스는 시작 시 모든 쿼리 노드를 포함하는 기본 리소스 그룹을 유지하며, 이를 <strong>__default_resource_group으로</strong> 명명합니다.</p>
<p>버전 2.4.1부터 Milvus는 선언형 리소스 그룹 API를 제공하며, 기존 리소스 그룹 API는 더 이상 사용되지 않습니다. 새로운 선언형 API를 통해 사용자는 항등성을 확보할 수 있어 클라우드 네이티브 환경에서 2차 개발을 보다 쉽게 수행할 수 있습니다.</p>
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
    </button></h2><p>리소스 그룹은 리소스 그룹 구성으로 정의됩니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>requests</strong> 속성은 리소스 그룹이 충족해야 하는 조건을 지정합니다.</li>
<li><strong>limits</strong> 속성은 리소스 그룹의 최대 한도를 지정합니다.</li>
<li><strong>transfer_from</strong> 및 <strong>transfer_to</strong> 속성은 리소스 그룹이 자원을 우선적으로 확보해야 할 리소스 그룹과 자원을 이전해야 할 리소스 그룹을 각각 설명합니다.</li>
</ul>
<p>리소스 그룹의 구성이 변경되면 Milvus는 새로운 구성에 따라 현재 쿼리 노드의 리소스를 최대한 조정하여, 모든 리소스 그룹이 결국 다음 조건을 충족하도록 보장합니다:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>단, 다음의 경우는 예외입니다:</p>
<ul>
<li>Milvus 클러스터의 쿼리 노드(QueryNodes) 수가 부족할 경우, 즉 <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> 인 경우, 항상 쿼리 노드가 충분하지 않은 리소스 그룹이 존재하게 됩니다.</li>
<li>Milvus 클러스터의 쿼리 노드 수가 과도한 경우(즉, <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>), 중복된 쿼리 노드는 항상 <strong>__default_resource_group에</strong> 우선 배치됩니다.</li>
</ul>
<p>물론 클러스터 내 쿼리 노드(QueryNodes)의 수가 변경되면, Milvus는 최종 조건을 충족하도록 지속적으로 조정을 시도합니다. 따라서 먼저 리소스 그룹 구성 변경 사항을 적용한 다음 쿼리 노드(QueryNodes) 스케일링을 수행할 수 있습니다.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">선언형 API를 사용하여 리소스 그룹 관리<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>이 페이지의 모든 코드 예제는 PyMilvus 2.6.14 버전입니다. 코드를 실행하기 전에 PyMilvus를 최신 버전으로 업그레이드하십시오.</p>
</div>
<ol>
<li><p>리소스 그룹 생성</p>
<p>리소스 그룹을 생성하려면 Milvus 인스턴스에 연결한 후 다음 명령을 실행하십시오. 다음 코드 조각은 <code translate="no">default</code> 이 Milvus 연결의 별칭이라고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    milvus_client.create_resource_group(name, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹을 나열합니다.</p>
<p>리소스 그룹을 생성하면 리소스 그룹 목록에서 확인할 수 있습니다.</p>
<p>Milvus 인스턴스의 리소스 그룹 목록을 보려면 다음을 수행하십시오.</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹 설명하기.</p>
<p>다음과 같이 Milvus에 해당 리소스 그룹에 대한 정보를 조회하도록 요청할 수 있습니다:</p>
<pre><code translate="no" class="language-python">info = milvus_client.describe_resource_group(name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment"># ResourceGroupInfo:</span>
<span class="hljs-comment">#   &lt;name:rg1&gt;,     // resource group name</span>
<span class="hljs-comment">#   &lt;capacity:0&gt;,   // resource group capacity</span>
<span class="hljs-comment">#   &lt;num_available_node:1&gt;,  // resource group node num</span>
<span class="hljs-comment">#   &lt;num_loaded_replica:{}&gt;, // collection loaded replica num in resource group</span>
<span class="hljs-comment">#   &lt;num_outgoing_node:{}&gt;, // node num which still in use by replica in other resource group</span>
<span class="hljs-comment">#   &lt;num_incoming_node:{}&gt;, // node num which is in use by replica but belong to other resource group </span>
<span class="hljs-comment">#   &lt;config:{}&gt;,            // resource group config</span>
<span class="hljs-comment">#   &lt;nodes:[]&gt;              // node detail info</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹 간에 노드를 이동합니다.</p>
<p>설명된 리소스 그룹에는 아직 쿼리 노드가 하나도 없다는 것을 알 수 있습니다. 다음과 같이 기본 리소스 그룹에서 생성한 리소스 그룹으로 일부 노드를 이동하십시오:
클러스터의 <strong>__default_resource_group에</strong> 현재 1개의 QueryNode가 있으며, 생성한 <strong>rg로</strong> 노드 하나를 이동한다고 가정합니다.<code translate="no">update_resource_groups</code> 는 여러 구성 변경에 대한 원자성을 보장하므로, Milvus에서는 중간 상태가 표시되지 않습니다.</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    })
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹에 컬렉션과 파티션을 로드합니다.</p>
<p>리소스 그룹에 쿼리 노드가 포함되면, 이 리소스 그룹에 컬렉션을 로드할 수 있습니다. 다음 코드 조각은 <code translate="no">demo</code> 라는 이름의 컬렉션이 이미 존재한다고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>또한, 리소스 그룹에 파티션 하나만 로드하고 그 복제본을 여러 리소스 그룹에 분산시킬 수도 있습니다. 다음 예제는 <code translate="no">Books</code> 라는 이름의 컬렉션이 이미 존재하며, 이 컬렉션에 <code translate="no">Novels</code> 라는 이름의 파티션이 있다고 가정합니다.</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">_resource_groups</code> 는 선택적 매개변수이며, 이를 지정하지 않으면 Milvus가 복제본을 기본 리소스 그룹의 쿼리 노드에 로드합니다.</p>
<p>Milvus가 컬렉션의 각 복제본을 별도의 리소스 그룹에 로드하도록 하려면, 리소스 그룹의 수가 복제본의 수와 동일해야 합니다.</p></li>
<li><p>리소스 그룹 간에 복제본을 이동합니다.</p>
<p>Milvus는 여러 쿼리 노드에 분산된 <a href="/docs/ko/v2.6.x/glossary.md#Segment">세그먼트</a> 간에 부하 분산을 달성하기 위해 <a href="/docs/ko/v2.6.x/replica.md">복제본을</a> 사용합니다. 다음과 같이 컬렉션의 특정 복제본을 한 리소스 그룹에서 다른 리소스 그룹으로 이동할 수 있습니다.</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.transfer_replica(source, target, collection_name, num_replicas)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_replicas}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>리소스 그룹 삭제.</p>
<p>쿼리 노드가 하나도 없는 리소스 그룹(<code translate="no">limits.node_num = 0</code>)은 언제든지 삭제할 수 있습니다. 이 가이드에서 리소스 그룹 <code translate="no">rg</code> 에는 현재 쿼리 노드가 하나 있습니다. 먼저 리소스 그룹의 구성 <code translate="no">limits.node_num</code> 을 0으로 변경해야 합니다.</p>
<pre><code translate="no" class="language-python">resource_group = <span class="hljs-string">&quot;rg
try:
    milvus_client.update_resource_groups({
        resource_group: ResourceGroupConfig(
            requests={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
            limits={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
        ),
    })
    milvus_client.drop_resource_group(resource_group)
    print(f&quot;</span>Succeeded <span class="hljs-keyword">in</span> dropping {resource_group}.<span class="hljs-string">&quot;)
except Exception:
    print(f&quot;</span>Something went wrong <span class="hljs-keyword">while</span> dropping {resource_group}.<span class="hljs-string">&quot;)
</span><button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>자세한 내용은 <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">pymilvus의 관련 예제를</a> 참조하십시오.</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">클러스터 확장 관리를 위한 모범 사례<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 Milvus는 클라우드 네이티브 환경에서 독립적으로 확장 및 축소할 수 없습니다. 그러나 <strong>선언형 리소스 그룹 API를</strong> 컨테이너 오케스트레이션과 함께 사용하면 Milvus는 쿼리 노드에 대한 리소스 격리 및 관리를 쉽게 구현할 수 있습니다.
다음은 클라우드 환경에서 쿼리 노드를 관리하기 위한 모범 사례입니다:</p>
<ol>
<li><p>기본적으로 Milvus는 <strong>__default_resource_group을</strong> 생성합니다. 이 리소스 그룹은 삭제할 수 없으며, 모든 컬렉션에 대한 기본 로딩 리소스 그룹 역할을 하며, 중복 QueryNodes는 항상 이 그룹에 할당됩니다. 따라서 사용되지 않는 쿼리노드 리소스를 보관할 임시 리소스 그룹을 생성하여, 쿼리노드 리소스가 <strong>__default_resource_group에</strong> 의해 점유되는 것을 방지할 수 있습니다.</p>
<p>또한, ` <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code>` 제약 조건을 엄격하게 적용하면 클러스터 내 쿼리 노드의 할당을 정밀하게 제어할 수 있습니다. 현재 클러스터에 쿼리 노드가 단 하나만 있다고 가정하고 클러스터를 초기화해 보겠습니다.
다음은 설정 예시입니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    milvus_client.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    milvus_client.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>위의 예제 코드를 사용하여 추가 QueryNode를 보관할 <strong>__pending_nodes라는</strong> 리소스 그룹을 생성합니다. 또한 <strong>rg1과 rg2라는</strong> 두 개의 사용자 전용 리소스 그룹을 생성합니다. 아울러 다른 리소스 그룹이 누락되거나 중복된 QueryNode를 <strong>__pending_nodes에서</strong> 우선적으로 복구하도록 설정합니다.</p></li>
<li><p>클러스터 스케일 아웃</p>
<p>다음과 같은 확장 기능이 있다고 가정해 봅시다:</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>API를 사용하여 다른 리소스 그룹에 영향을 주지 않으면서 특정 리소스 그룹을 지정된 수의 쿼리 노드로 확장할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
milvus_client.update_resource_groups({
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
<p>마찬가지로, <strong>__pending_nodes</strong> 리소스 그룹에서 쿼리 노드를 우선적으로 선택하도록 스케일 인 규칙을 설정할 수 있습니다. 이 정보는 <code translate="no">describe_resource_group</code> API를 통해 얻을 수 있습니다. 이를 통해 지정된 리소스 그룹의 스케일 인 목표를 달성할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
milvus_client.update_resource_groups({
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">리소스 그룹과 여러 레플리카 간의 상호 작용<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>단일 컬렉션의 복제본과 리소스 그룹은 N대 N 관계를 가집니다.</li>
<li>단일 컬렉션의 여러 레플리카가 하나의 리소스 그룹에 로드되면, 해당 리소스 그룹의 쿼리 노드는 레플리카들 사이에 균등하게 분산되어 각 레플리카가 보유한 쿼리 노드 수의 차이가 1을 초과하지 않도록 보장합니다.</li>
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
    </button></h1><p>다중 테넌트 Milvus 인스턴스를 배포하려면 다음 내용을 참조하십시오:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/rbac.md">RBAC 활성화</a></li>
<li><a href="/docs/ko/v2.6.x/users_and_roles.md">사용자 및 역할</a></li>
</ul>
