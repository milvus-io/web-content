---
id: resource_group.md
related_key: Manage Resource Groups
summary: リソースグループの管理方法について学びましょう。
title: リソースグループの管理
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">リソースグループの管理<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus では、リソースグループを使用して、特定のクエリノードを他のノードから物理的に分離することができます。このガイドでは、カスタムリソースグループの作成と管理、およびノードのグループ間移動の手順について説明します。</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">リソースグループとは<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>リソースグループには、Milvusクラスタ内のクエリノードの一部またはすべてを含めることができます。 リソースグループ間のクエリノードの割り当て方法は、状況に応じて最適な方法を選択できます。たとえば、複数のコレクションを扱うシナリオでは、各リソースグループに適切な数のクエリノードを割り当て、コレクションを異なるリソースグループにロードすることで、各コレクション内の操作を他のコレクションの操作から物理的に独立させることができます。</p>
<p>なお、Milvus インスタンスは起動時にすべてのクエリノードを格納するためのデフォルトのリソースグループを維持しており、その名前は<strong>__default_resource_group</strong> です。</p>
<p>バージョン 2.4.1 以降、Milvus は宣言型リソースグループ API を提供しており、旧リソースグループ API は非推奨となっています。新しい宣言型 API により、ユーザーは冪等性を実現し、クラウドネイティブ環境での二次開発をより容易に行うことができます。</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">リソースグループの概念<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>リソースグループは、リソースグループ設定によって記述されます：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>requests</strong>属性は、リソースグループが満たすべき条件を指定します。</li>
<li><strong>limits</strong>属性は、リソースグループの最大制限を指定します。</li>
<li><strong>`transfer_from`</strong>および<strong>`transfer_to`</strong>属性は、それぞれ、リソースグループが優先的にリソースを取得すべきリソースグループと、リソースを転送すべきリソースグループを記述します。</li>
</ul>
<p>リソースグループの設定が変更されると、Milvusは新しい設定に従って現在のクエリノードのリソースを可能な限り調整し、最終的にすべてのリソースグループが以下の条件を満たすようにします:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>ただし、以下の場合は例外となります：</p>
<ul>
<li>Milvusクラスタ内のクエリノード数が不足している場合、すなわち<code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> の場合、常に十分なクエリノードを持たないリソースグループが存在することになります。</li>
<li>Milvusクラスタ内のクエリノード数が過剰な場合、すなわち<code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code> の場合、冗長なクエリノードは常にまず<strong>__default_resource_groupに</strong>配置されます。</li>
</ul>
<p>もちろん、クラスタ内のクエリノード数が変化した場合、Milvusは最終的な条件を満たすよう継続的に調整を試みます。したがって、まずリソースグループの設定変更を適用し、その後でクエリノードのスケーリングを実行することができます。</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">宣言型APIを使用したリソースグループの管理<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>このページにあるすべてのコードサンプルは PyMilvus 2.6.16 に基づいています。実行する前に、PyMilvus を最新バージョンにアップグレードしてください。</p>
</div>
<ol>
<li><p>リソースグループを作成します。</p>
<p>リソースグループを作成するには、Milvusインスタンスに接続した後、以下のコマンドを実行します。以下のスニペットでは、<code translate="no">default</code> がMilvus接続のエイリアスであることを前提としています。</p>
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
<li><p>リソースグループの一覧を表示します。</p>
<p>リソースグループを作成すると、リソースグループの一覧に表示されます。</p>
<p>Milvus インスタンス内のリソースグループの一覧を表示するには、次のように操作します。</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>リソースグループの詳細を取得します。</p>
<p>Milvusに、対象のリソースグループの詳細情報を取得させるには、次のようにします：</p>
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
<li><p>リソースグループ間でノードを移動します。</p>
<p>記述されたリソースグループには、まだクエリノードが1つも存在しないことに気づくかもしれません。以下の手順に従って、デフォルトのリソースグループから作成したリソースグループへノードを移動させます：
クラスタの<strong>__default_resource_group</strong>に現在 1 つの QueryNode があり、そのうちの 1 つのノードを作成<strong>したリソースグループ</strong>に移行するとします。<code translate="no">update_resource_groups</code> は複数の設定変更に対して原子性を保証するため、Milvus からは中間状態が認識されることはありません。</p>
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
<li><p>リソースグループにコレクションとパーティションをロードします。</p>
<p>リソースグループにクエリノードが存在するようになれば、そのリソースグループにコレクションをロードできます。以下のスニペットは、<code translate="no">demo</code> という名前のコレクションがすでに存在することを前提としています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>また、パーティションを 1 つのリソースグループにロードするだけで、そのレプリカを複数のリソースグループに分散させることもできます。以下は、<code translate="no">Books</code> という名前のコレクションがすでに存在し、その中に<code translate="no">Novels</code> という名前のパーティションがあることを前提としています。</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>なお、<code translate="no">_resource_groups</code> はオプションのパラメータであり、指定しない場合は、Milvus がデフォルトのリソースグループ内のクエリノードにレプリカをロードします。</p>
<p>Milvus にコレクションの各レプリカを別々のリソースグループにロードさせるには、リソースグループの数がレプリカの数と等しくなるようにしてください。</p></li>
<li><p>リソースグループ間でレプリカを転送します。</p>
<p>Milvus は、複数のクエリノードに分散された<a href="/docs/ja/v2.6.x/glossary.md#Segment">セグメント間で</a>負荷分散を実現するために<a href="/docs/ja/v2.6.x/replica.md">レプリカ</a>を使用します。コレクションの特定のレプリカをあるリソースグループから別のリソースグループに移動するには、次のようにします。</p>
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
<li><p>リソースグループを削除する。</p>
<p>クエリノードを一切保持していないリソースグループ（<code translate="no">limits.node_num = 0</code> ）は、いつでも削除できます。このガイドでは、リソースグループ<code translate="no">rg</code> には現在 1 つのクエリノードがあります。まず、リソースグループの構成<code translate="no">limits.node_num</code> を 0 に変更する必要があります。</p>
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
<p>詳細については、<a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">pymilvusの関連する例</a>を参照してください。</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">クラスタのスケーリングを管理するためのベストプラクティス<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>現在、Milvusはクラウドネイティブ環境において、独自にスケールインおよびスケールアウトを行うことはできません。しかし、<strong>Declarative Resource Group APIを</strong>コンテナオーケストレーションと組み合わせて使用することで、MilvusはQueryNodesのリソース分離と管理を容易に実現できます。
以下に、クラウド環境におけるQueryNodesの管理に関するベストプラクティスを示します：</p>
<ol>
<li><p>デフォルトでは、Milvusは<strong>__default_resource_group</strong>を作成します。このリソースグループは削除できず、すべてのコレクションのデフォルトのロード用リソースグループとしても機能し、冗長なQueryNodeは常にこのリソースグループに割り当てられます。 したがって、未使用のQueryNodeリソースを格納するための保留中のリソースグループを作成することで、QueryNodeリソースが<strong>__default_resource_group</strong>によって占有されるのを防ぐことができます。</p>
<p>さらに、<code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> という制約を厳格に適用することで、クラスタ内のQueryNodeの割り当てを正確に制御できます。現在クラスタ内にQueryNodeが1つしか存在しないと仮定して、クラスタを初期化してみましょう。
設定例は以下の通りです：</p>
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
<p>上記のサンプルコードを使用して、追加のQueryNodeを保持<strong>するための__pending_nodes</strong>という名前のリソースグループを作成します。また、<strong>rg1</strong>および<strong>rg2</strong>という2つのユーザー固有のリソースグループも作成します。さらに、他のリソースグループが、欠落しているQueryNodeや冗長なQueryNode<strong>を__pending_nodes</strong>から優先的に復元するように設定します。</p></li>
<li><p>クラスタのスケールアウト</p>
<p>次のようなスケーリング関数があると仮定します：</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>API を使用して、他のリソースグループに影響を与えることなく、特定のリソースグループを指定された数の QueryNode にスケールアウトできます。</p>
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
<li><p>クラスタのスケールイン</p>
<p>同様に、<strong>__pending_nodesリソースグループ</strong>からQueryNodeを選択することを優先するスケールインルールを設定できます。この情報は、<code translate="no">describe_resource_group</code> APIを通じて取得可能です。これにより、指定されたリソースグループのスケールインという目標を達成できます。</p>
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">リソースグループと複数のレプリカとの相互作用<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>単一のコレクションのレプリカとリソースグループは、N対Nの関係にあります。</li>
<li>単一のコレクションの複数のレプリカが 1 つのリソースグループに読み込まれると、そのリソースグループの QueryNodes はレプリカ間で均等に分散され、各レプリカが持つ QueryNodes の数の差が 1 を超えないように保証されます。</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>マルチテナント Milvus インスタンスをデプロイするには、以下を参照してください：</p>
<ul>
<li><a href="/docs/ja/v2.6.x/rbac.md">RBAC の有効化</a></li>
<li><a href="/docs/ja/v2.6.x/users_and_roles.md">ユーザーとロール</a></li>
</ul>
