---
id: clustering-compaction.md
title: Clustering-Verdichtung
summary: >-
  Die Clustering-Kompaktierung wurde entwickelt, um die Suchleistung zu
  verbessern und die Kosten in großen Sammlungen zu senken. In diesem Leitfaden
  erfahren Sie, wie die Clustering-Kompaktierung die Suchleistung verbessern
  kann.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Clustering Compaction wurde entwickelt, um die Suchleistung zu verbessern und die Kosten in großen Sammlungen zu reduzieren. In diesem Handbuch erfahren Sie, wie Sie die Clustering-Verdichtung nutzen können, um die Suchleistung zu verbessern.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus speichert eingehende Entitäten in Segmenten innerhalb einer Sammlung und versiegelt ein Segment, wenn es voll ist. Wenn dies der Fall ist, wird ein neues Segment erstellt, um zusätzliche Entitäten unterzubringen. Infolgedessen sind die Entitäten willkürlich über die Segmente verteilt. Diese Verteilung erfordert, dass Milvus mehrere Segmente durchsucht, um die nächsten Nachbarn für einen bestimmten Abfragevektor zu finden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Ohne Clustering-Verdichtung</span> </span></p>
<p>Wenn Milvus die Entitäten auf der Grundlage der Werte in einem bestimmten Feld auf die Segmente verteilen kann, lässt sich der Suchbereich innerhalb eines Segments einschränken, wodurch die Suchleistung verbessert wird.</p>
<p><strong>Clustering Compaction</strong> ist eine Funktion in Milvus, die Entitäten zwischen Segmenten in einer Sammlung basierend auf den Werten in einem skalaren Feld umverteilt. Um diese Funktion zu aktivieren, müssen Sie zunächst ein skalares Feld als <strong>Clustering-Schlüssel</strong> auswählen. Dies ermöglicht Milvus, Entitäten in ein Segment umzuverteilen, wenn ihre Clustering-Schlüsselwerte in einen bestimmten Bereich fallen. Wenn Sie eine Clustering Compaction auslösen, generiert/aktualisiert Milvus einen globalen Index namens <strong>PartitionStats</strong>, der die Zuordnungsbeziehung zwischen Segmenten und Clustering-Schlüsselwerten aufzeichnet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Clustering-Verdichtung</span> </span></p>
<p>Unter Verwendung von <strong>PartitionStats</strong> als Referenz kann Milvus beim Empfang einer Such-/Abfrageanfrage, die einen Clustering-Schlüsselwert enthält, irrelevante Daten entfernen und den Suchbereich innerhalb der Segmente, die dem Wert zugeordnet sind, einschränken, wodurch die Suchleistung verbessert wird. Einzelheiten zur Leistungsverbesserung finden Sie unter <a href="/docs/de/clustering-compaction.md#Benchmark-Test">Benchmark-Tests</a>.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung verwenden<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Clustering Compaction Funktion in Milvus ist in hohem Maße konfigurierbar. Sie können sie manuell auslösen oder sie so einstellen, dass sie automatisch in bestimmten Abständen von Milvus ausgelöst wird. Um die Clustering Compaction zu aktivieren, gehen Sie wie folgt vor:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Globale Konfiguration</h3><p>Sie müssen Ihre Milvus-Konfigurationsdatei wie unten gezeigt ändern.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Konfigurieren Element</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>Gibt an, ob die Clustering-Verdichtung aktiviert werden soll. Setzen Sie dies auf <code translate="no">true</code>, wenn Sie diese Funktion für jede Sammlung mit einem Clustering-Schlüssel aktivieren müssen.</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>Legt fest, ob die automatisch ausgelöste Verdichtung aktiviert werden soll. Wenn Sie diesen Wert auf <code translate="no">true</code> setzen, verdichtet Milvus die Sammlungen mit einem Clustering-Schlüssel in den angegebenen Intervallen.</p></td>
     <td><p>false</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>Gibt das Intervall in Millisekunden an, in dem Milvus die Clustering-Kompaktierung startet. Dies gilt nur, wenn Sie <code translate="no">autoEnable</code> auf <code translate="no">true</code> setzen.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>Legt das Mindestintervall in Millisekunden fest. Dies gilt nur, wenn Sie <code translate="no">autoEnable</code> auf <code translate="no">true</code> setzen.</p><p>Wenn Sie diesen Wert auf eine ganze Zahl größer als <code translate="no">triggerInterval</code> setzen, können Sie wiederholte Verdichtungen innerhalb eines kurzen Zeitraums vermeiden.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>Legt das maximale Intervall in Millisekunden fest. Dies gilt nur, wenn Sie <code translate="no">autoEnable</code> auf <code translate="no">true</code> setzen.</p><p>Sobald Milvus feststellt, dass eine Sammlung länger als diesen Wert nicht verdichtet wurde, erzwingt es eine Clusterverdichtung.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>Gibt den oberen Schwellenwert für die Auslösung einer Clustering-Kompaktierung an. Dies gilt nur, wenn Sie <code translate="no">autoEnable</code> auf <code translate="no">true</code> setzen.</p><p>Sobald Milvus feststellt, dass das Datenvolumen in einer Sammlung diesen Wert überschreitet, wird ein Clustering-Compaction-Prozess eingeleitet.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>Gibt die Timeout-Dauer für eine Clustering-Compaction an. Eine Clustering-Compaction schlägt fehl, wenn ihre Ausführungszeit diesen Wert überschreitet.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>Gibt an, ob Milvus beim Empfang von Such-/Abfrageanfragen Daten durch Verweis auf PartitionStats bereinigt. Setzen Sie diesen Wert auf <code translate="no">true</code>, damit Milvus beim Empfang von Such-/Abfrageanfragen durch Verweis auf PartitionStats Daten beschneiden kann.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>Legt das Speicherpufferverhältnis für Clustering-Verdichtungsaufgaben fest.  Milvus löscht Daten, wenn die Datengröße die zugewiesene Puffergröße überschreitet, die mit diesem Verhältnis berechnet wurde.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>Legt die Größe des Worker-Pools für eine Clustering-Compaction-Task fest.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>Legt fest, ob der Partitionsschlüssel in Sammlungen als Clustering-Schlüssel verwendet werden soll. Wenn Sie dies auf true setzen, behandelt Milvus die Partitionsschlüssel in Sammlungen als Clustering-Schlüssel. </p><p>Sie können diese Einstellung in einer Sammlung jederzeit außer Kraft setzen, indem Sie explizit einen Clustering-Schlüssel festlegen.</p></td>
     <td></td>
   </tr>
</table>
<p>Um die oben genannten Änderungen auf Ihren Milvus-Cluster anzuwenden, folgen Sie bitte den Schritten in <a href="/docs/de/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurieren von Milvus mit Helm</a> und <a href="/docs/de/configure_operator.md">Konfigurieren von Milvus mit Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Konfiguration der Sammlung</h3><p>Für die Clusterverdichtung in einer bestimmten Sammlung sollten Sie ein skalares Feld aus der Sammlung als Clustering-Schlüssel auswählen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sie können die Skalarfelder der folgenden Datentypen als Clustering-Schlüssel verwenden: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, und <code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung auslösen</h3><p>Wenn Sie die automatische Clustering-Verdichtung aktiviert haben, löst Milvus die Verdichtung automatisch in dem angegebenen Intervall aus. Alternativ dazu können Sie die Verdichtung wie folgt manuell auslösen:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">Benchmark-Test<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Datenvolumen und die Abfragemuster zusammen bestimmen die Leistungsverbesserung, die die Clusterverdichtung bringen kann. Ein interner Benchmark-Test zeigt, dass die Clustering-Kompaktierung eine bis zu 25-fache Verbesserung der Abfragen pro Sekunde (QPS) ermöglicht.</p>
<p>Der Benchmark-Test wird mit einer Sammlung von Entitäten aus einem 20 Millionen, 768-dimensionalen LAION-Datensatz durchgeführt, wobei das Feld <code translate="no">key</code> als Clustering-Schlüssel dient. Nachdem die Clustering-Verdichtung in der Sammlung ausgelöst wurde, werden gleichzeitige Suchanfragen gesendet, bis die CPU-Auslastung einen hohen Pegel erreicht.</p>
<table>
   <tr>
     <th rowspan="2"><p>Suchfilter</p></th>
     <th rowspan="2"><p>Prune-Verhältnis</p></th>
     <th colspan="5"><p>Latenz</p></th>
     <th rowspan="2"><p>Anfragen/s</p></th>
   </tr>
   <tr>
     <td><p>Avg</p></td>
     <td><p>Min</p></td>
     <td><p>Max</p></td>
     <td><p>Median</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>N/A</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>Schlüssel&gt;200 und Schlüssel &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>Schlüssel&gt;200 und Schlüssel &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>Schlüssel&gt;200 und Schlüssel &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>Schlüssel==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>Je enger der Suchbereich in den Suchfiltern ist, desto höher ist die Prune-Rate. Das bedeutet, dass mehr Entitäten während des Suchvorgangs übersprungen werden. Ein Vergleich der Statistiken in der ersten und letzten Zeile zeigt, dass bei einer Suche ohne Clustering-Verdichtung die gesamte Sammlung durchsucht werden muss. Andererseits kann eine Suche mit Clustering-Verdichtung unter Verwendung eines bestimmten Schlüssels eine bis zu 25-fache Verbesserung erzielen.</p>
<h2 id="Best-Practices" class="common-anchor-header">Beste Praktiken<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden finden Sie einige Tipps zur effizienten Nutzung der Clustering-Kompaktierung:</p>
<ul>
<li><p>Aktivieren Sie diese Funktion für Sammlungen mit großen Datenmengen.</p>
<p>Die Suchleistung verbessert sich mit größeren Datenmengen in einer Sammlung. Es ist eine gute Wahl, diese Funktion für Sammlungen mit mehr als 1 Million Entitäten zu aktivieren.</p></li>
<li><p>Wählen Sie einen geeigneten Clustering-Schlüssel.</p>
<p>Sie können skalare Felder, die üblicherweise als Filterbedingungen verwendet werden, als Clustering-Schlüssel verwenden. Für eine Sammlung, die Daten von mehreren Tenants enthält, können Sie das Feld, das einen Tenant von einem anderen unterscheidet, als Clustering-Schlüssel verwenden.</p></li>
<li><p>Verwenden Sie den Partitionsschlüssel als Clustering-Schlüssel.</p>
<p>Sie können <code translate="no">common.usePartitionKeyAsClusteringKey</code> auf <code translate="no">true</code> setzen, wenn Sie diese Funktion für alle Sammlungen in Ihrer Milvus-Instanz aktivieren möchten oder wenn Sie in einer großen Sammlung mit einem Partitionsschlüssel immer noch Leistungsprobleme haben. Auf diese Weise haben Sie einen Clustering-Schlüssel und einen Partitionsschlüssel, wenn Sie ein skalares Feld in einer Sammlung als Partitionsschlüssel wählen.</p>
<p>Beachten Sie, dass diese Einstellung Sie nicht daran hindert, ein anderes skalares Feld als Clustering-Schlüssel zu wählen. Der explizit angegebene Clustering-Schlüssel hat immer Vorrang.</p></li>
</ul>
