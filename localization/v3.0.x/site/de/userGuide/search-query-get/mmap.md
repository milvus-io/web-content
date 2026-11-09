---
id: mmap.md
title: Verwendung von mmap
summary: >-
  Memory Mapping (Mmap) ermöglicht den direkten Speicherzugriff auf große
  Dateien auf der Festplatte, sodass Milvus Indizes und Daten sowohl im
  Arbeitsspeicher als auch auf Festplatten speichern kann. Dieser Ansatz trägt
  dazu bei, die Datenplatzierungsrichtlinie auf der Grundlage der
  Zugriffshäufigkeit zu optimieren und die Speicherkapazität für Sammlungen zu
  erweitern, ohne die Suchleistung wesentlich zu beeinträchtigen. Auf dieser
  Seite erfahren Sie, wie Milvus mmap nutzt, um eine schnelle und effiziente
  Speicherung und Abfrage von Daten zu ermöglichen.
---
<h1 id="Use-mmap" class="common-anchor-header">Verwendung von mmap<button data-href="#Use-mmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Memory Mapping (mmap) ermöglicht den direkten Speicherzugriff auf große Dateien auf der Festplatte, sodass Milvus Indizes und Daten sowohl im Arbeitsspeicher als auch auf Festplatten speichern kann. Dieser Ansatz trägt dazu bei, die Datenplatzierungsrichtlinie auf der Grundlage der Zugriffshäufigkeit zu optimieren und die Speicherkapazität für Sammlungen zu erweitern, ohne die Suchleistung wesentlich zu beeinträchtigen. Auf dieser Seite erfahren Sie, wie Milvus mmap nutzt, um eine schnelle und effiziente Datenspeicherung und -abfrage zu ermöglichen.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus verwendet Sammlungen, um Vektor-Embeddings und deren Metadaten zu organisieren, wobei jede Zeile in der Sammlung eine Entität darstellt. Wie in der Abbildung links unten dargestellt, speichert das Vektorfeld die Vektor-Embeddings, während die Skalarfelder deren Metadaten enthalten. Wenn Sie Indizes für bestimmte Felder erstellt und die Sammlung geladen haben, lädt Milvus die erstellten Indizes und die Rohdaten der Felder in den Arbeitsspeicher.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/mmap-illustrated.png" alt="Mmap Illustrated" class="doc-image" id="mmap-illustrated" /> 
   <span>mmap veranschaulicht</span>
  
 </span></p>
<p>Milvus ist ein speicherintensives Datenbanksystem, und die verfügbare Speichergröße bestimmt die Kapazität einer Sammlung. Das Laden von Feldern mit großem Datenvolumen in den Arbeitsspeicher ist unmöglich, wenn die Datengröße die Speicherkapazität übersteigt – was bei KI-gesteuerten Anwendungen häufig der Fall ist.</p>
<p>Um solche Probleme zu lösen, führt Milvus „mmap“ ein, um das Laden von „heißen“ und „kalten“ Daten in Sammlungen auszugleichen. Wie in der Abbildung oben rechts dargestellt, können Sie Milvus so konfigurieren, dass die Rohdaten bestimmter Felder in den Speicher gemappt werden, anstatt sie vollständig in den Speicher zu laden. Auf diese Weise erhalten Sie direkten Speicherzugriff auf die Felder, ohne sich um Speicherprobleme sorgen zu müssen, und können die Kapazität der Sammlung erweitern.</p>
<p>Wenn man die Verfahren zur Datenplatzierung in der linken und der rechten Abbildung vergleicht, lässt sich feststellen, dass die Speicherauslastung in der linken Abbildung deutlich höher ist als in der rechten. Bei aktiviertem mmap werden die Daten, die eigentlich in den Arbeitsspeicher geladen worden wären, auf die Festplatte ausgelagert und im Seiten-Cache des Betriebssystems zwischengespeichert, wodurch der Speicherbedarf reduziert wird. Cache-Fehltreffer können jedoch zu Leistungseinbußen führen. Weitere Details finden Sie in <a href="https://en.wikipedia.org/wiki/Mmap">diesem Artikel</a>.</p>
<p>Bei der Konfiguration von mmap in Milvus gilt stets folgender Grundsatz: Halten Sie häufig abgerufene Daten und Indizes stets vollständig im Arbeitsspeicher geladen und nutzen Sie mmap für die übrigen Bereiche.</p>
<h2 id="Use-mmap-in-Milvus" class="common-anchor-header">Verwendung von mmap in Milvus<button data-href="#Use-mmap-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet hierarchische mmap-Einstellungen auf globaler Ebene, auf Feld-, Index- und Sammlungsebene, wobei die Index- und Feldebene Vorrang vor der Sammlungsebene und die Sammlungsebene Vorrang vor der globalen Ebene haben.</p>
<h3 id="Global-mmap-settings" class="common-anchor-header">Globale mmap-Einstellungen<button data-href="#Global-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Einstellung auf Cluster-Ebene ist die globale Einstellung und hat die niedrigste Priorität. Milvus bietet unter „ <code translate="no">milvus.yaml</code> “ mehrere mmap-bezogene Einstellungen an. Diese Einstellungen gelten für alle Sammlungen im Cluster.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">mmap:</span>
    <span class="hljs-attr">scalarField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">scalarIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-comment"># The following should be a path on a high-performance disk</span>
    <span class="hljs-attr">mmapDirPath:</span> <span class="hljs-string">any/valid/path</span> 
<span class="hljs-string">....</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Konfigurationselement</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarField</code></p></td>
     <td><p>Legt fest, ob die Rohdaten aller Skalarfelder in den Arbeitsspeicher gemappt werden sollen. Bei der Einstellung „ <code translate="no">true</code> “ mappt Milvus die Rohdaten der Skalarfelder einer Sammlung in den Arbeitsspeicher, anstatt sie bei Erhalt einer Ladeanforderung für diese Sammlung vollständig zu laden.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarIndex</code></p></td>
     <td><p>Legt fest, ob alle Indizes von Skalarfeldern in den Arbeitsspeicher geladen werden sollen. Bei der Einstellung „ <code translate="no">true</code> “ lädt Milvus die Indizes der Skalarfelder einer Sammlung in den Arbeitsspeicher, anstatt sie beim Empfang einer Ladeanforderung für diese Sammlung vollständig zu laden.</p><p>Derzeit wird nur das Skalarfeld mit dem folgenden Indextyp unterstützt:</p><ul><li>INVERTED</li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorField</code></p></td>
     <td><p>Legt fest, ob die Rohdaten aller Vektorfelder in den Arbeitsspeicher abgebildet werden sollen. Bei der Einstellung „ <code translate="no">true</code> “ bildet Milvus die Rohdaten der Vektorfelder einer Sammlung in den Arbeitsspeicher ab, anstatt sie beim Empfang einer Ladeanforderung für diese Sammlung vollständig zu laden.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorIndex</code></p></td>
     <td><p>Gibt an, ob alle Vektorfeldindizes in den Arbeitsspeicher abgebildet werden sollen. Bei der Einstellung „ <code translate="no">true</code> “ bildet Milvus die Vektorfeldindizes einer Sammlung in den Arbeitsspeicher ab, anstatt sie beim Empfang einer Ladeanforderung für diese Sammlung vollständig zu laden.</p><p>Derzeit werden nur Vektorfelder unterstützt, die die folgenden Indextypen verwenden:</p><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>HNSW</p></li><li><p>SCANN</p></li><li><p>SPARSE_INVERTED_INDEX</p></li><li><p>SPARSE_WAND</p></li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.mmapDirPath</code></p></td>
     <td><p>Gibt den Pfad zu den speicherabgebildeten Dateien an. Wird dieser nicht angegeben, gilt der Standardwert. </p><p>Der Platzhalter „ <code translate="no">localStorage.path</code> “ im Standardwert steht für die Festplatte der Milvus-QueryNodes. Stellen Sie sicher, dass Ihre QueryNodes über eine leistungsstarke Festplatte verfügen, um die Vorteile von mmap optimal nutzen zu können.</p></td>
     <td><p><code translate="no">{localStorage.path}/mmap</code></p></td>
   </tr>
</table>
<p>Um die oben genannten Einstellungen auf Ihren Milvus-Cluster anzuwenden, befolgen Sie bitte die Schritte unter <a href="/docs/de/configure-helm.md#Configure-Milvus-via-configuration-file">„Milvus mit Helm konfigurieren</a> “ und <a href="/docs/de/configure_operator.md">„Milvus mit Milvus-Operatoren konfigurieren</a>“.</p>
<p>Manchmal sind globale mmap-Einstellungen für bestimmte Anwendungsfälle nicht flexibel genug. Um alternative Einstellungen auf eine bestimmte Sammlung oder deren Indizes anzuwenden, sollten Sie erwägen, mmap spezifisch für eine Sammlung, ein Feld oder einen Index zu konfigurieren. Sie müssen eine Sammlung freigeben und neu laden, bevor die Änderungen an den mmap-Einstellungen wirksam werden.</p>
<h3 id="Field-specific-mmap-settings" class="common-anchor-header">Feldspezifische mmap-Einstellungen<button data-href="#Field-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Um feldspezifisches „mmap“ zu konfigurieren, müssen Sie beim Hinzufügen eines Feldes den Parameter „ <code translate="no">mmap_enabled</code> “ angeben. Sie können „mmap“ für dieses bestimmte Feld aktivieren, indem Sie diesen Parameter auf „ <code translate="no">True</code> “ setzen.</p>
<p>Das folgende Beispiel zeigt, wie Sie feldspezifisches mmap beim Hinzufügen eines Feldes konfigurieren.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

schema = MilvusClient.create_schema()

<span class="hljs-comment"># Add a scalar field and enable mmap</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    mmap_enabled=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Alter mmap settings on a specific field</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; typeParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, String&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>);
}};
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .typeParams(typeParams)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(req);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span>=<span class="hljs-string">&quot;YOUR_TOKEN&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">await</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>
});

<span class="hljs-keyword">const</span> schema = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>
},
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
}
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;mmap_enable&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment">#restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    },
    &quot;isPrimary&quot;: true,
    &quot;autoId&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> docChunkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512,
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$docChunkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;fieldParams&quot;:{
        &quot;mmap.enabled&quot;: true
    }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Erwägen Sie, mmap für Felder zu aktivieren, in denen große Datenmengen gespeichert werden. Es werden sowohl Skalarfelder als auch Vektorfelder unterstützt.</p>
</div>
<p>Anschließend können Sie mithilfe des oben erstellten Schemas eine Sammlung erstellen. Beim Empfang einer Anfrage zum Laden der Sammlung bildet Milvus die Rohdaten des Felds <strong>„doc_chunk“</strong> per Memory-Mapping im Arbeitsspeicher ab.</p>
<h3 id="Index-specific-mmap-settings" class="common-anchor-header">Indexspezifische mmap-Einstellungen<button data-href="#Index-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Um indexspezifisches mmap zu konfigurieren, müssen Sie beim Hinzufügen des Indexes die Eigenschaft „ <code translate="no">mmap.enable</code> “ in die Indexparameter aufnehmen. Sie können mmap für diesen spezifischen Index aktivieren, indem Sie die Eigenschaft auf „ <code translate="no">true</code> “ setzen.</p>
<p>Das folgende Beispiel zeigt, wie Sie indexspezifisches mmap beim Hinzufügen eines Indexes konfigurieren.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a varchar field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>   
)

index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create index on the varchar field with mmap settings</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
<span class="highlighted-wrapper-line">    params={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;false&quot;</span> }</span>
)

<span class="hljs-comment"># Change mmap settings for an index</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;title&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
        
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-literal">false</span>);
}};
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
        
client.alterIndexProperties(AlterIndexPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;title&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on the varchar field with mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});

<span class="hljs-comment">// Change mmap settings for an index</span>
<span class="hljs-comment">// The following assumes that you have a collection named `my_collection`</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterIndexProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">properties</span>:{<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_chunk&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
                &quot;mmap.enabled&quot;: true
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;doc_chunk&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dies gilt sowohl für Indizes von Vektor- als auch von Skalarfeldern.</p>
</div>
<p>Anschließend können Sie in einer Sammlung auf die Indexparameter verweisen. Beim Empfang einer Anfrage zum Laden der Sammlung bildet Milvus den Index des <strong>Titelfeldes</strong> im Speicher ab.</p>
<h3 id="Collection-specific-mmap-settings" class="common-anchor-header">Sammlungsspezifische mmap-Einstellungen<button data-href="#Collection-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Um eine sammlungsweite „mmap“-Strategie zu konfigurieren, müssen Sie die Eigenschaft „ <code translate="no">mmap.enabled</code> “ in die Anfrage zum Erstellen einer Sammlung aufnehmen. Sie können „mmap“ für eine Sammlung aktivieren, indem Sie diese Eigenschaft auf „ <code translate="no">true</code> “ setzen.</p>
<p>Das folgende Beispiel zeigt, wie mmap in einer Sammlung namens <strong>„my_collection“</strong> bei deren Erstellung aktiviert wird. Beim Empfang einer Anfrage zum Laden der Sammlung bildet Milvus die Rohdaten aller Felder im Speicher ab.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Enable mmap when creating a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    properties={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;true&quot;</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">scheme</span>: schema,
    <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: {
        \&quot;mmap.enabled\&quot;: \&quot;false\&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die mmap-Einstellungen einer bestehenden Sammlung auch ändern.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release collection before change mmap settings</span>
client.release_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Ensure that the collection has already been released </span>
<span class="hljs-comment"># and run the following</span>
client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: false
    }
)

<span class="hljs-comment"># Load the collection to make the above change take effect</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.releaseCollection(ReleaseCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
        
client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Release collection before change mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});

<span class="hljs-comment">// Ensure that the collection has already been released </span>
<span class="hljs-comment">// and run the following</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span>
    }
});

<span class="hljs-comment">// Load the collection to make the above change take effect</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmmap.enabled&quot;: false
    }
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen die Sammlung freigeben, um Änderungen an ihren Eigenschaften vornehmen zu können, und die Sammlung neu laden, damit die Änderungen wirksam werden.</p>
