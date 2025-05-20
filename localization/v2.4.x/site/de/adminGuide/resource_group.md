---
id: resource_group.md
related_key: Manage Resource Groups
summary: 'Lernen Sie, wie man Ressourcengruppen verwaltet.'
title: Verwalten von Ressourcengruppen
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">Verwalten von Ressourcengruppen<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus können Sie eine Ressourcengruppe verwenden, um bestimmte Abfrageknoten physisch von anderen zu isolieren. Dieser Leitfaden zeigt Ihnen, wie Sie benutzerdefinierte Ressourcengruppen erstellen und verwalten sowie Knoten zwischen ihnen übertragen können.</p>
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
    </button></h2><p>Eine Ressourcengruppe kann mehrere oder alle Abfrageknoten in einem Milvus-Cluster enthalten. Sie entscheiden, wie Sie die Abfrageknoten zwischen den Ressourcengruppen zuweisen möchten, je nachdem, was für Sie am sinnvollsten ist. In einem Szenario mit mehreren Sammlungen können Sie zum Beispiel jeder Ressourcengruppe eine angemessene Anzahl von Abfrageknoten zuweisen und Sammlungen in verschiedene Ressourcengruppen laden, so dass die Operationen innerhalb jeder Sammlung physisch unabhängig von denen in anderen Sammlungen sind.</p>
<p>Beachten Sie, dass eine Milvus-Instanz eine Standard-Ressourcengruppe unterhält, um alle Abfrageknoten beim Start zu halten und sie <strong>__default_resource_group</strong> nennt.</p>
<p>Ab Version 2.4.1 bietet Milvus eine deklarative Ressourcengruppen-API, während die alte Ressourcengruppen-API veraltet ist. Die neue deklarative API ermöglicht es den Benutzern, Idempotenz zu erreichen, um sekundäre Entwicklung in Cloud-nativen Umgebungen einfacher zu machen.</p>
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
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Das Attribut <strong>requests</strong> gibt die Bedingungen an, die eine Ressourcengruppe erfüllen muss.</li>
<li>Das <strong>limits-Attribut</strong> legt die Höchstgrenzen für eine Ressourcengruppe fest.</li>
<li>Die Attribute <strong>transfer_from</strong> und <strong>transfer_to</strong> beschreiben, von welchen Ressourcengruppen eine Ressourcengruppe vorzugsweise Ressourcen beziehen bzw. an welche Ressourcengruppen sie Ressourcen übertragen soll.</li>
</ul>
<p>Sobald sich die Konfiguration einer Ressourcengruppe ändert, passt der Milvus die aktuellen Ressourcen des Abfrageknotens so weit wie möglich an die neue Konfiguration an, um sicherzustellen, dass alle Ressourcengruppen schließlich die folgende Bedingung erfüllen:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>Außer in den folgenden Fällen:</p>
<ul>
<li>Wenn die Anzahl der QueryNodes im Milvus-Cluster unzureichend ist, d. h. <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, wird es immer Ressourcengruppen ohne genügend QueryNodes geben.</li>
<li>Wenn die Anzahl der QueryNodes im Milvus-Cluster zu hoch ist, d.h. <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>, werden die redundanten QueryNodes immer zuerst in der <strong>__default_resource_group</strong> platziert.</li>
</ul>
<p>Wenn sich die Anzahl der QueryNodes im Cluster ändert, wird Milvus natürlich ständig versuchen, die endgültigen Bedingungen zu erfüllen. Daher können Sie zuerst die Konfigurationsänderungen der Ressourcengruppe anwenden und dann die Skalierung der QueryNodes durchführen.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">Verwendung der deklarativen API zur Verwaltung der Ressourcengruppe<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>Alle Codebeispiele auf dieser Seite sind in PyMilvus 2.4.15. Aktualisieren Sie Ihre PyMilvus-Installation, bevor Sie sie ausführen.</p>
</div>
<ol>
<li><p>Erstellen Sie eine Ressourcengruppe.</p>
<p>Um eine Ressourcengruppe zu erstellen, führen Sie das Folgende aus, nachdem Sie sich mit einer Milvus-Instanz verbunden haben. Das folgende Snippet geht davon aus, dass <code translate="no">default</code> der Alias Ihrer Milvus-Verbindung ist.</p>
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
<li><p>Ressourcengruppen auflisten.</p>
<p>Sobald Sie eine Ressourcengruppe erstellt haben, können Sie sie in der Ressourcengruppenliste sehen.</p>
<p>Um die Liste der Ressourcengruppen in einer Milvus-Instanz zu sehen, gehen Sie wie folgt vor:</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Beschreiben Sie eine Ressourcengruppe.</p>
<p>Sie können Milvus eine Ressourcengruppe wie folgt beschreiben lassen:</p>
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
<li><p>Übertragen Sie Knoten zwischen Ressourcengruppen.</p>
<p>Sie werden feststellen, dass die beschriebene Ressourcengruppe noch keine Abfrageknoten hat. Verschieben Sie einige Knoten von der Standard-Ressourcengruppe in die von Ihnen erstellte wie folgt: Angenommen, es gibt derzeit 1 QueryNodes in der <strong>__default_resource_group</strong> des Clusters, und wir wollen einen Knoten in die erstellte <strong>rg</strong> übertragen.<code translate="no">update_resource_groups</code> gewährleistet Atomarität für mehrere Konfigurationsänderungen, so dass keine Zwischenzustände für Milvus sichtbar sind.</p>
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
<li><p>Sammlungen und Partitionen in eine Ressourcengruppe laden.</p>
<p>Sobald Abfrageknoten in einer Ressourcengruppe vorhanden sind, können Sie Sammlungen in diese Ressourcengruppe laden. Der folgende Ausschnitt geht davon aus, dass eine Sammlung namens <code translate="no">demo</code> bereits existiert.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch einfach eine Partition in eine Ressourcengruppe laden und ihre Replikate auf mehrere Ressourcengruppen verteilen lassen. Im Folgenden wird davon ausgegangen, dass eine Sammlung mit dem Namen <code translate="no">Books</code> bereits vorhanden ist und eine Partition mit dem Namen <code translate="no">Novels</code> enthält.</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass <code translate="no">_resource_groups</code> ein optionaler Parameter ist, und wenn Sie ihn nicht angeben, lädt Milvus die Replikate auf die Abfrageknoten in der Standard-Ressourcengruppe.</p>
<p>Damit Milus jedes Replikat einer Sammlung in eine separate Ressourcengruppe lädt, stellen Sie sicher, dass die Anzahl der Ressourcengruppen gleich der Anzahl der Replikate ist.</p></li>
<li><p>Übertragen Sie Replikate zwischen Ressourcengruppen.</p>
<p>Milvus verwendet <a href="/docs/de/v2.4.x/replica.md">Replikate</a>, um einen Lastausgleich zwischen <a href="/docs/de/v2.4.x/glossary.md#Segment">Segmenten</a> zu erreichen, die über mehrere Abfrageknoten verteilt sind. Sie können bestimmte Replikate einer Sammlung wie folgt von einer Ressourcengruppe in eine andere verschieben:</p>
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
<li><p>Verwerfen einer Ressourcengruppe.</p>
<p>Sie können eine Ressourcengruppe, die keinen Abfrageknoten enthält (<code translate="no">limits.node_num = 0</code>), jederzeit auflösen. In dieser Anleitung hat die Ressourcengruppe <code translate="no">rg</code> jetzt einen Abfrageknoten. Sie müssen zuerst die Konfiguration <code translate="no">limits.node_num</code> der Ressourcengruppe auf Null ändern.</p>
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
<p>Für weitere Details lesen Sie bitte die <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">entsprechenden Beispiele in pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">Eine gute Praxis zur Verwaltung der Clusterskalierung<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Derzeit kann Milvus in Cloud-nativen Umgebungen nicht unabhängig ein- und ausskaliert werden. Durch die Verwendung der <strong>deklarativen Ressourcengruppen-API</strong> in Verbindung mit der Container-Orchestrierung kann Milvus jedoch auf einfache Weise eine Ressourcenisolierung und -verwaltung für QueryNodes erreichen. Hier ist eine gute Praxis für die Verwaltung von QueryNodes in einer Cloud-Umgebung:</p>
<ol>
<li><p>Standardmäßig erstellt Milvus eine <strong>__default_resource_group</strong>. Diese Ressourcengruppe kann nicht gelöscht werden und dient auch als Standard-Laderessourcengruppe für alle Sammlungen, und redundante QueryNodes werden ihr immer zugewiesen. Daher können wir eine schwebende Ressourcengruppe erstellen, die unbenutzte QueryNode-Ressourcen aufnimmt und verhindert, dass QueryNode-Ressourcen von der <strong>__default_resource_group</strong> belegt werden.</p>
<p>Wenn wir außerdem die Einschränkung <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> strikt durchsetzen, können wir die Zuweisung von QueryNodes im Cluster genau kontrollieren. Nehmen wir an, dass es derzeit nur einen QueryNode im Cluster gibt und initialisieren wir den Cluster. Hier ist ein Beispiel-Setup:</p>
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
<p>Unter Verwendung des obigen Beispielcodes erstellen wir eine Ressourcengruppe namens <strong>__pending_nodes</strong>, um weitere QueryNodes aufzunehmen. Außerdem erstellen wir zwei benutzerspezifische Ressourcengruppen mit den Namen <strong>rg1</strong> und <strong>rg2</strong>. Außerdem stellen wir sicher, dass die andere Ressourcengruppe der Wiederherstellung fehlender oder redundanter QueryNodes aus <strong>__pending_nodes</strong> Priorität einräumt.</p></li>
<li><p>Skalierung des Clusters</p>
<p>Angenommen, wir haben die folgende Skalierungsfunktion:</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wir können die API verwenden, um eine bestimmte Ressourcengruppe auf eine bestimmte Anzahl von QueryNodes zu skalieren, ohne andere Ressourcengruppen zu beeinträchtigen.</p>
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
<li><p>Cluster skalieren in</p>
<p>In ähnlicher Weise können wir Regeln für die Skalierung festlegen, die die Auswahl von QueryNodes aus der Ressourcengruppe <strong>__pending_nodes</strong> priorisieren. Diese Informationen können über die <code translate="no">describe_resource_group</code> API abgerufen werden. Erreichen des Ziels der Skalierung in einer bestimmten Ressourcengruppe.</p>
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
<li>Die Replikate einer einzelnen Sammlung und Ressourcengruppen stehen in einer N-zu-N-Beziehung.</li>
<li>Wenn mehrere Replikate einer einzelnen Sammlung in eine Ressourcengruppe geladen werden, werden die QueryNodes dieser Ressourcengruppe gleichmäßig auf die Replikate verteilt, um sicherzustellen, dass der Unterschied in der Anzahl der QueryNodes jedes Replikats 1 nicht überschreitet.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>Um eine mandantenfähige Milvus-Instanz einzurichten, lesen Sie das Folgende:</p>
<ul>
<li><a href="/docs/de/v2.4.x/rbac.md">RBAC aktivieren</a></li>
<li><a href="/docs/de/v2.4.x/users_and_roles.md">Benutzer und Rollen</a></li>
</ul>
