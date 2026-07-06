---
id: resource_group.md
related_key: Manage Resource Groups
summary: Scopri come gestire i gruppi di risorse.
title: Gestione dei gruppi di risorse
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">Gestione dei gruppi di risorse<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, è possibile utilizzare un gruppo di risorse per isolare fisicamente determinati nodi di query dagli altri. Questa guida illustra come creare e gestire gruppi di risorse personalizzati, nonché come trasferire i nodi da un gruppo all'altro.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">Che cos’è un gruppo di risorse<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Un gruppo di risorse può contenere alcuni o tutti i nodi di query presenti in un cluster Milvus. Spetta a te decidere come allocare i nodi di query tra i gruppi di risorse in base a ciò che ritieni più opportuno. Ad esempio, in uno scenario con più collezioni, puoi allocare un numero appropriato di nodi di query a ciascun gruppo di risorse e caricare le collezioni in gruppi di risorse diversi, in modo che le operazioni all’interno di ciascuna collezione siano fisicamente indipendenti da quelle delle altre collezioni.</p>
<p>Si noti che un'istanza di Milvus mantiene un gruppo di risorse predefinito per contenere tutti i nodi di query all'avvio e lo chiama <strong>__default_resource_group</strong>.</p>
<p>A partire dalla versione 2.4.1, Milvus fornisce un’API dichiarativa per i gruppi di risorse, mentre la vecchia API è stata deprecata. La nuova API dichiarativa consente agli utenti di ottenere l’idempotenza, facilitando lo sviluppo secondario in ambienti cloud-native.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">Concetti relativi ai gruppi di risorse<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Un gruppo di risorse è descritto da una configurazione del gruppo di risorse:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>L’attributo <strong>`requests</strong> ` specifica le condizioni che un gruppo di risorse deve soddisfare.</li>
<li>L’attributo ` <strong>limits</strong> ` specifica i limiti massimi per un gruppo di risorse.</li>
<li>Gli attributi <strong>`transfer_from</strong> ` e <strong>`transfer_to`</strong> descrivono, rispettivamente, da quali gruppi di risorse un gruppo di risorse dovrebbe preferibilmente acquisire risorse e a quali gruppi di risorse dovrebbe trasferire risorse.</li>
</ul>
<p>Una volta modificata la configurazione di un gruppo di risorse, Milvus adeguerà il più possibile le risorse attuali del nodo di query in base alla nuova configurazione, assicurando che tutti i gruppi di risorse soddisfino alla fine la seguente condizione:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>Tranne nei seguenti casi:</p>
<ul>
<li>Quando il numero di QueryNode nel cluster Milvus è insufficiente, ovvero <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, ci saranno sempre gruppi di risorse senza un numero sufficiente di QueryNode.</li>
<li>Quando il numero di QueryNode nel cluster Milvus è eccessivo, ovvero <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>, i QueryNode ridondanti verranno sempre collocati per primi nel <strong>__default_resource_group</strong>.</li>
</ul>
<p>Naturalmente, se il numero di QueryNode nel cluster cambia, Milvus tenterà continuamente di adattarsi per soddisfare le condizioni finali. Pertanto, è possibile applicare prima le modifiche alla configurazione dei gruppi di risorse e poi eseguire il ridimensionamento dei QueryNode.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">Utilizzo dell’API dichiarativa per la gestione dei gruppi di risorse<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>Tutti gli esempi di codice presenti in questa pagina sono in PyMilvus 2.6.16. Aggiornare l’installazione di PyMilvus prima di eseguirli.</p>
</div>
<ol>
<li><p>Creare un gruppo di risorse.</p>
<p>Per creare un gruppo di risorse, eseguire quanto segue dopo essersi connessi a un'istanza di Milvus. Il frammento di codice seguente presuppone che <code translate="no">default</code> sia l'alias della connessione a Milvus.</p>
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
<li><p>Elencare i gruppi di risorse.</p>
<p>Una volta creato un gruppo di risorse, è possibile visualizzarlo nell'elenco dei gruppi di risorse.</p>
<p>Per visualizzare l’elenco dei gruppi di risorse in un’istanza di Milvus, procedere come segue:</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Descrivere un gruppo di risorse.</p>
<p>È possibile chiedere a Milvus di descrivere un gruppo di risorse specifico come segue:</p>
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
<li><p>Spostare i nodi tra i gruppi di risorse.</p>
<p>Si noterà che il gruppo di risorse descritto non ha ancora alcun nodo di query. Spostare alcuni nodi dal gruppo di risorse predefinito a quello appena creato come segue:
Supponendo che attualmente ci sia 1 QueryNode nel <strong>__default_resource_group</strong> del cluster e che si voglia trasferire un nodo nel <strong>gruppo di risorse</strong> creato.<code translate="no">update_resource_groups</code> garantisce l'atomicità per più modifiche di configurazione, quindi Milvus non vedrà alcuno stato intermedio.</p>
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
<li><p>Caricare le collezioni e le partizioni in un gruppo di risorse.</p>
<p>Una volta che in un gruppo di risorse sono presenti dei nodi di query, è possibile caricare le collezioni in tale gruppo di risorse. Il frammento di codice seguente presuppone che esista già una collezione denominata <code translate="no">demo</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>Inoltre, è possibile caricare semplicemente una partizione in un gruppo di risorse e distribuire le sue repliche tra diversi gruppi di risorse. Quanto segue presuppone che esista già una collezione denominata <code translate="no">Books</code> e che questa abbia una partizione denominata <code translate="no">Novels</code>.</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>Si noti che <code translate="no">_resource_groups</code> è un parametro facoltativo; se non viene specificato, Milvus caricherà le repliche sui nodi di query nel gruppo di risorse predefinito.</p>
<p>Per fare in modo che Milvus carichi ciascuna replica di una collezione in un gruppo di risorse separato, assicurarsi che il numero di gruppi di risorse sia uguale al numero di repliche.</p></li>
<li><p>Trasferimento delle repliche tra gruppi di risorse.</p>
<p>Milvus utilizza <a href="/docs/it/v2.6.x/replica.md">le repliche</a> per ottenere il bilanciamento del carico tra <a href="/docs/it/v2.6.x/glossary.md#Segment">i segmenti</a> distribuiti su diversi nodi di query. È possibile spostare determinate repliche di una collezione da un gruppo di risorse a un altro come segue:</p>
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
<li><p>Eliminare un gruppo di risorse.</p>
<p>È possibile eliminare in qualsiasi momento un gruppo di risorse che non contiene alcun nodo di query (<code translate="no">limits.node_num = 0</code>). In questa guida, il gruppo di risorse <code translate="no">rg</code> ora contiene un nodo di query. È necessario prima modificare la configurazione <code translate="no">limits.node_num</code> del gruppo di risorse impostando il valore su zero.</p>
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
<p>Per ulteriori dettagli, fare riferimento agli <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">esempi pertinenti in pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">Una buona pratica per gestire il ridimensionamento del cluster<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Attualmente, Milvus non è in grado di scalare autonomamente in up o in down in ambienti cloud-native. Tuttavia, utilizzando <strong>l’API Declarative Resource Group</strong> in combinazione con l’orchestrazione dei container, Milvus può facilmente ottenere l’isolamento e la gestione delle risorse per i QueryNodes.
Ecco una buona pratica per la gestione dei QueryNodes in un ambiente cloud:</p>
<ol>
<li><p>Per impostazione predefinita, Milvus crea un <strong>__default_resource_group</strong>. Questo gruppo di risorse non può essere eliminato e funge anche da gruppo di risorse di caricamento predefinito per tutte le collezioni; inoltre, i QueryNode ridondanti vengono sempre assegnati ad esso. Pertanto, è possibile creare un gruppo di risorse in sospeso per contenere le risorse dei QueryNode inutilizzate, impedendo che tali risorse vengano occupate dal gruppo <strong>__default_resource_group</strong>.</p>
<p>Inoltre, se applichiamo rigorosamente il vincolo <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code>, possiamo controllare con precisione l’assegnazione dei QueryNode nel cluster. Supponiamo che al momento ci sia un solo QueryNode nel cluster e inizializziamo il cluster.
Ecco un esempio di configurazione:</p>
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
<p>Utilizzando il codice di esempio sopra riportato, creiamo un gruppo di risorse denominato <strong>__pending_nodes</strong> per contenere ulteriori QueryNode. Creiamo inoltre due gruppi di risorse specifici per l’utente denominati <strong>rg1</strong> e <strong>rg2</strong>. Inoltre, ci assicuriamo che l’altro gruppo di risorse dia priorità al recupero dei QueryNode mancanti o ridondanti da <strong>__pending_nodes</strong>.</p></li>
<li><p>Scalabilità orizzontale del cluster</p>
<p>Supponiamo di disporre della seguente funzione di scalabilità:</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>Possiamo utilizzare l’API per scalare un gruppo di risorse specifico a un numero prestabilito di QueryNodes senza influire su nessun altro gruppo di risorse.</p>
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
<li><p>Ridimensionamento del cluster</p>
<p>Analogamente, possiamo stabilire regole di riduzione che diano priorità alla selezione dei QueryNodes dal gruppo di risorse <strong>__pending_nodes</strong>. Queste informazioni possono essere ottenute tramite l’API <code translate="no">describe_resource_group</code>. Raggiungere l’obiettivo di ridurre un gruppo di risorse specificato.</p>
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">Come i gruppi di risorse interagiscono con più repliche<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>Le repliche di una singola collezione e i gruppi di risorse hanno una relazione N-a-N.</li>
<li>Quando più repliche di una singola collezione vengono caricate in un unico gruppo di risorse, i QueryNode di quel gruppo di risorse vengono distribuiti uniformemente tra le repliche, garantendo che la differenza nel numero di QueryNode di ciascuna replica non superi 1.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>Per distribuire un'istanza Milvus multi-tenant, consultare quanto segue:</p>
<ul>
<li><a href="/docs/it/v2.6.x/rbac.md">Abilitare RBAC</a></li>
<li><a href="/docs/it/v2.6.x/users_and_roles.md">Utenti e ruoli</a></li>
</ul>
