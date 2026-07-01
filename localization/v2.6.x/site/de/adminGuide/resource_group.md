---
id: resource_group.md
related_key: Manage Resource Groups
summary: 'Erfahren Sie, wie Sie Ressourcengruppen verwalten.'
title: Ressourcengruppen verwalten
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">Ressourcengruppen verwalten<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus können Sie mithilfe einer Ressourcengruppe bestimmte Abfrageknoten physisch von anderen isolieren. Diese Anleitung führt Sie durch die Erstellung und Verwaltung benutzerdefinierter Ressourcengruppen sowie durch die Verschiebung von Knoten zwischen diesen Gruppen.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">Was ist eine Ressourcengruppe?<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Ressourcengruppe kann mehrere oder alle Abfrageknoten eines Milvus-Clusters enthalten. Sie entscheiden selbst, wie Sie die Abfrageknoten auf die Ressourcengruppen verteilen möchten, je nachdem, was für Sie am sinnvollsten ist. In einem Szenario mit mehreren Sammlungen können Sie beispielsweise jeder Ressourcengruppe eine angemessene Anzahl von Abfrageknoten zuweisen und Sammlungen in verschiedene Ressourcengruppen laden, sodass die Vorgänge innerhalb jeder Sammlung physisch unabhängig von denen in anderen Sammlungen sind.</p>
<p>Beachten Sie, dass eine Milvus-Instanz beim Start eine Standard-Ressourcengruppe unterhält, die alle Abfrageknoten enthält, und diese als <strong>__default_resource_group</strong> bezeichnet.</p>
<p>Ab Version 2.4.1 bietet Milvus eine deklarative Ressourcengruppen-API an, während die alte Ressourcengruppen-API veraltet ist. Die neue deklarative API ermöglicht es Benutzern, Idempotenz zu erreichen und die sekundäre Entwicklung in Cloud-nativen Umgebungen einfacher durchzuführen.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">Konzepte der Ressourcengruppe<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Ressourcengruppe wird durch eine Ressourcengruppenkonfiguration beschrieben:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Das Attribut <strong>„requests“</strong> legt die Bedingungen fest, die eine Ressourcengruppe erfüllen muss.</li>
<li>Das Attribut <strong>„limits“</strong> legt die maximalen Grenzwerte für eine Ressourcengruppe fest.</li>
<li>Die Attribute <strong>„transfer_from“</strong> und <strong>„transfer_to“</strong> beschreiben, aus welchen Ressourcengruppen eine Ressourcengruppe vorzugsweise Ressourcen beziehen sollte und an welche Ressourcengruppen sie Ressourcen übertragen sollte.</li>
</ul>
<p>Sobald sich die Konfiguration einer Ressourcengruppe ändert, passt Milvus die aktuellen Ressourcen der Abfrageknoten so weit wie möglich an die neue Konfiguration an und stellt sicher, dass alle Ressourcengruppen letztendlich die folgende Bedingung erfüllen:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>Ausgenommen sind die folgenden Fälle:</p>
<ul>
<li>Wenn die Anzahl der QueryNodes im Milvus-Cluster nicht ausreicht, d. h. <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, wird es immer Ressourcengruppen ohne genügend QueryNodes geben.</li>
<li>Wenn die Anzahl der QueryNodes im Milvus-Cluster zu hoch ist, d. h. <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>, werden die redundanten QueryNodes immer zuerst in der <strong>__default_resource_group</strong> platziert.</li>
</ul>
<p>Sollte sich die Anzahl der QueryNodes im Cluster ändern, wird Milvus natürlich kontinuierlich versuchen, sich an die aktuellen Bedingungen anzupassen. Daher können Sie zunächst die Änderungen an der Konfiguration der Ressourcengruppen vornehmen und anschließend die Skalierung der QueryNodes durchführen.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">Verwenden Sie die deklarative API zur Verwaltung von Ressourcengruppen<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>Alle Code-Beispiele auf dieser Seite basieren auf PyMilvus 2.6.14. Aktualisieren Sie Ihre PyMilvus-Installation, bevor Sie sie ausführen.</p>
</div>
<ol>
<li><p>Erstellen Sie eine Ressourcengruppe.</p>
<p>Um eine Ressourcengruppe zu erstellen, führen Sie nach dem Herstellen einer Verbindung zu einer Milvus-Instanz den folgenden Befehl aus. Der folgende Codeausschnitt geht davon aus, dass „ <code translate="no">default</code> “ der Alias Ihrer Milvus-Verbindung ist.</p>
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
<li><p>Ressourcengruppen auflisten.</p>
<p>Sobald Sie eine Ressourcengruppe erstellt haben, wird diese in der Liste der Ressourcengruppen angezeigt.</p>
<p>Gehen Sie wie folgt vor, um die Liste der Ressourcengruppen in einer Milvus-Instanz anzuzeigen:</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Beschreiben Sie eine Ressourcengruppe.</p>
<p>Sie können Milvus wie folgt anweisen, eine bestimmte Ressourcengruppe zu beschreiben:</p>
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
<li><p>Verschieben Sie Knoten zwischen Ressourcengruppen.</p>
<p>Möglicherweise stellen Sie fest, dass die beschriebene Ressourcengruppe noch keine Abfrageknoten enthält. Verschieben Sie einige Knoten wie folgt aus der Standard-Ressourcengruppe in die von Ihnen erstellte:
Angenommen, es gibt derzeit 1 QueryNode in der <strong>__default_resource_group</strong> des Clusters, und wir möchten einen Knoten in <strong>die</strong> erstellte <strong>Ressourcengruppe</strong> verschieben.
 <code translate="no">update_resource_groups</code> gewährleistet die Atomizität bei mehreren Konfigurationsänderungen, sodass für Milvus keine Zwischenzustände sichtbar sind.</p>
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
<li><p>Laden Sie Sammlungen und Partitionen in eine Ressourcengruppe.</p>
<p>Sobald sich Abfrageknoten in einer Ressourcengruppe befinden, können Sie Sammlungen in diese Ressourcengruppe laden. Der folgende Codeausschnitt geht davon aus, dass bereits eine Sammlung namens „ <code translate="no">demo</code> “ existiert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>Außerdem können Sie einfach eine Partition in eine Ressourcengruppe laden und deren Replikate auf mehrere Ressourcengruppen verteilen lassen. Im Folgenden wird davon ausgegangen, dass bereits eine Sammlung namens „ <code translate="no">Books</code> “ existiert und diese eine Partition namens „ <code translate="no">Novels</code> “ enthält.</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass „ <code translate="no">_resource_groups</code> “ ein optionaler Parameter ist; wenn Sie ihn nicht angeben, lädt Milvus die Replikate auf die Abfrageknoten in der Standard-Ressourcengruppe.</p>
<p>Damit Milvus jede Replik einer Sammlung in eine separate Ressourcengruppe lädt, muss die Anzahl der Ressourcengruppen der Anzahl der Repliken entsprechen.</p></li>
<li><p>Replikate zwischen Ressourcengruppen verschieben.</p>
<p>Milvus nutzt <a href="/docs/de/v2.6.x/replica.md">Replikate</a>, um einen Lastausgleich zwischen <a href="/docs/de/v2.6.x/glossary.md#Segment">Segmenten</a> zu erreichen, die auf mehrere Abfrageknoten verteilt sind. Sie können bestimmte Replikate einer Sammlung wie folgt von einer Ressourcengruppe in eine andere verschieben:</p>
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
<li><p>Eine Ressourcengruppe löschen.</p>
<p>Sie können eine Ressourcengruppe, die keinen Abfrageknoten enthält (<code translate="no">limits.node_num = 0</code>), jederzeit löschen. In dieser Anleitung verfügt die Ressourcengruppe „ <code translate="no">rg</code> “ derzeit über einen Abfrageknoten. Sie müssen zunächst die Konfiguration „ <code translate="no">limits.node_num</code> “ der Ressourcengruppe auf Null setzen.</p>
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
<p>Weitere Details finden Sie in den <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">entsprechenden Beispielen in pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">Bewährte Vorgehensweise zur Verwaltung der Cluster-Skalierung<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Derzeit kann Milvus in Cloud-nativen Umgebungen nicht eigenständig skalieren. Durch die Verwendung der <strong>deklarativen Ressourcengruppen-API</strong> in Verbindung mit Container-Orchestrierung kann Milvus jedoch auf einfache Weise die Ressourcenisolierung und -verwaltung für QueryNodes erreichen.
Hier ist eine bewährte Vorgehensweise für die Verwaltung von QueryNodes in einer Cloud-Umgebung:</p>
<ol>
<li><p>Standardmäßig erstellt Milvus eine <strong>__default_resource_group</strong>. Diese Ressourcengruppe kann nicht gelöscht werden und dient zudem als Standard-Ladegruppe für alle Sammlungen; redundante QueryNodes werden ihr stets zugewiesen. Daher können wir eine „pending“-Ressourcengruppe erstellen, um nicht genutzte QueryNode-Ressourcen aufzunehmen, und so verhindern, dass diese Ressourcen von der <strong>`__default_resource_group`</strong> belegt werden.</p>
<p>Wenn wir darüber hinaus die Einschränkung „ <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> “ strikt durchsetzen, können wir die Zuweisung von QueryNodes im Cluster präzise steuern. Nehmen wir an, es befindet sich derzeit nur ein QueryNode im Cluster, und initialisieren wir den Cluster.
Hier ist ein Beispiel für eine Konfiguration:</p>
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
<p>Anhand des obigen Beispielcodes erstellen wir eine Ressourcengruppe namens <strong>__pending_nodes</strong>, um zusätzliche QueryNodes aufzunehmen. Außerdem erstellen wir zwei benutzerspezifische Ressourcengruppen namens <strong>rg1</strong> und <strong>rg2</strong>. Darüber hinaus stellen wir sicher, dass die andere Ressourcengruppe der Wiederherstellung fehlender oder redundanter QueryNodes aus <strong>__pending_nodes</strong> Vorrang einräumt.</p></li>
<li><p>Horizontale Skalierung des Clusters</p>
<p>Angenommen, wir haben die folgende Skalierungsfunktion:</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wir können die API nutzen, um eine bestimmte Ressourcengruppe auf eine festgelegte Anzahl von QueryNodes zu skalieren, ohne dass andere Ressourcengruppen davon betroffen sind.</p>
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
<li><p>Cluster-Scale-in</p>
<p>Ebenso können wir Regeln für die Skalierung nach unten festlegen, die der Auswahl von QueryNodes aus der Ressourcengruppe <strong> „__pending_nodes“</strong> Vorrang einräumen. Diese Informationen lassen sich über die API „ <code translate="no">describe_resource_group</code> “ abrufen. Damit wird das Ziel der Skalierung einer bestimmten Ressourcengruppe nach unten erreicht.</p>
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">Wie Ressourcengruppen mit mehreren Replikaten interagieren<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>Die Replikate einer einzelnen Sammlung und die Ressourcengruppen stehen in einer N-zu-N-Beziehung zueinander.</li>
<li>Wenn mehrere Replikate einer einzelnen Sammlung in eine Ressourcengruppe geladen werden, werden die QueryNodes dieser Ressourcengruppe gleichmäßig auf die Replikate verteilt, wodurch sichergestellt wird, dass der Unterschied in der Anzahl der QueryNodes, über die jedes Replikat verfügt, 1 nicht überschreitet.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>Um eine mandantenfähige Milvus-Instanz bereitzustellen, lesen Sie Folgendes:</p>
<ul>
<li><a href="/docs/de/v2.6.x/rbac.md">RBAC aktivieren</a></li>
<li><a href="/docs/de/v2.6.x/users_and_roles.md">Benutzer und Rollen</a></li>
</ul>
