---
id: set-collection-ttl.md
title: Sammlung TTL einstellen
summary: >-
  Konfigurieren Sie TTL-Richtlinien auf Sammlungs- oder Entitätsebene, um
  veraltete Daten in Milvus automatisch ablaufen zu lassen.
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">Sammlung TTL einstellen<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus kann Entitäten automatisch durch eine <strong>Time-to-Live (TTL)</strong> Richtlinie ablaufen lassen. Abgelaufene Entitäten erscheinen sofort nicht mehr in den Abfrage- und Suchergebnissen und werden beim nächsten Verdichtungszyklus - normalerweise innerhalb von 24 Stunden - physisch aus dem Speicher entfernt.</p>
<p>Es gibt zwei TTL-Modi:</p>
<ul>
<li><p><strong>TTL auf Sammlungsebene</strong> - ein gemeinsames Aufbewahrungsfenster für jede Entität, das über die Eigenschaft <code translate="no">collection.ttl.seconds</code> festgelegt wird.</p></li>
<li><p><strong>TTL auf Entitätsebene</strong> - jede Entität hat ihre eigene absolute Verfallszeit in einem eigenen <code translate="no">TIMESTAMPTZ</code> Feld, das über die Eigenschaft <code translate="no">ttl_field</code> als TTL-Feld gekennzeichnet ist.</p></li>
</ul>
<div class="alert note">
<p>Diese Funktion gilt nur für verwaltete Sammlungen.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Die beiden TTL-Modi schließen sich gegenseitig aus. Für eine Sammlung können nicht gleichzeitig <code translate="no">collection.ttl.seconds</code> und <code translate="no">ttl_field</code> eingestellt sein. Informationen zum Umschalten finden Sie unter <a href="/docs/de/set-collection-ttl.md#Migrate-between-the-two-modes">Migrieren zwischen den beiden Modi</a>.</p></li>
<li><p>TTL auf Sammlungsebene wendet ein Fenster auf die gesamte Sammlung an. Wenn eine einzelne Zeile eine andere Lebensdauer benötigt, verwenden Sie TTL auf Entitätsebene.</p></li>
<li><p>Das Feld für TTL auf Entitätsebene muss <code translate="no">TIMESTAMPTZ</code> lauten. Andere Typen werden abgelehnt.</p></li>
<li><p>Ein TTL-Feld pro Sammlung. Das Schema kann mehrere <code translate="no">TIMESTAMPTZ</code> Felder enthalten, aber nur eines kann in <code translate="no">ttl_field</code> benannt werden.</p></li>
<li><p>Durch das Löschen von <code translate="no">ttl_field</code> werden abgelaufene Entitäten nicht wiederhergestellt. Um eine abgelaufene Entität wiederherzustellen, fügen Sie sie mit einem <code translate="no">NULL</code> oder einem zukünftigen Ablaufzeitstempel wieder ein.</p></li>
</ul>
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
    </button></h2><p><details></p>
<p><summary>Erweitern Sie</summary></p>
<h3 id="When-to-use-TTL" class="common-anchor-header">Wann sollte TTL verwendet werden?<button data-href="#When-to-use-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>TTL ist das richtige Werkzeug, wenn die Aufbewahrung eine <strong>Richtlinie</strong> ist - Sie wissen im Voraus, dass bestimmte Entitäten irgendwann verschwinden sollen, und Sie möchten, dass der Cluster dies durchsetzt, ohne dass Sie einen Cron-Job schreiben müssen.</p>
<p>Typische Szenarien:</p>
<ul>
<li><p><strong>Datensätze mit Zeitfenstern.</strong> Behalten Sie nur die letzten N Tage von Protokollen, Metriken, Ereignissen oder kurzlebigen Feature-Caches.</p></li>
<li><p><strong>Mandantenübergreifende Sammlungen.</strong> Verschiedene Mandanten haben unterschiedliche Aufbewahrungszeitfenster in derselben Sammlung.</p></li>
<li><p><strong>Aufbewahrungsrichtlinien pro Datensatz.</strong> Pro-Dokumente-Lebensdauer in IoT-Pipelines, Dokumentenspeichern oder MLOps-Feature-Speichern.</p></li>
<li><p><strong>Mix aus heißen und kalten Daten.</strong> Kurzlebige Entitäten koexistieren mit langfristigen Entitäten in derselben Sammlung.</p></li>
<li><p><strong>Compliance-gesteuertes Verfallsdatum.</strong> Datenminimierung im Stil der GDPR, bei der jeder Datensatz ein eigenes Löschdatum hat.</p></li>
<li><p><strong>Geschäftszeitabhängiges Verfallsdatum.</strong> Eine Entität stellt einen Datensatz dar, der nur bis zu einem bestimmten Zeitpunkt gültig ist (eine Kampagne endet, eine Sitzung läuft ab).</p></li>
</ul>
<div class="alert note">
<p>Abgelaufene Entitäten werden nicht in Such- oder Abfrageergebnissen angezeigt. Sie können jedoch bis zur anschließenden Datenverdichtung, die innerhalb der nächsten 24 Stunden durchgeführt werden sollte, im Speicher verbleiben.</p>
<p>Sie können steuern, wann die Datenverdichtung ausgelöst werden soll, indem Sie den Konfigurationspunkt <code translate="no">dataCoord.compaction.expiry.tolerance</code> in Ihrer Milvus-Konfigurationsdatei setzen.</p>
<p>Der Standardwert für dieses Konfigurationselement ist <code translate="no">-1</code>, was bedeutet, dass das bestehende Datenverdichtungsintervall gilt. Wenn Sie den Wert jedoch auf eine positive ganze Zahl wie <code translate="no">12</code> ändern, wird die Datenverdichtung die angegebene Anzahl von Stunden nach Ablauf der Entitäten ausgelöst.</p>
</div>
<h3 id="TTL-modes" class="common-anchor-header">TTL-Modi<button data-href="#TTL-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>Die beiden Modi beantworten unterschiedliche Fragen zur Aufbewahrung:</p>
<ul>
<li><p><strong>TTL auf Sammlungsebene</strong> wendet eine einzige Aufbewahrungsdauer auf jede Entität an. Jede Entität läuft unter <code translate="no">insert_ts + ttl_seconds</code> ab.</p></li>
<li><p>Bei<strong>der TTL auf Entitätsebene</strong> kann jede Entität ihre eigene absolute Verfallszeit in einem Feld <code translate="no">TIMESTAMPTZ</code> speichern. Ein <code translate="no">NULL</code> in diesem Feld bedeutet, dass die Entität nie abläuft.</p></li>
</ul>
<p>Eine Sammlung verwendet immer <strong>nur einen</strong> Modus - die beiden schließen sich gegenseitig aus. Der Wechsel zwischen ihnen ist ein mehrstufiger Vorgang; siehe Migration zwischen den beiden Modi.</p>
<p>Verwenden Sie diese Tabelle, um einen Modus auszuwählen:</p>
<table>
   <tr>
     <th><p><strong>Wenn Ihre Situation so ist...</strong></p></th>
     <th><p><strong>Verwenden Sie</strong></p></th>
   </tr>
   <tr>
     <td><p>Jede Entität in der Sammlung sollte demselben Aufbewahrungsfenster folgen</p></td>
     <td><p>TTL auf Sammlungsebene</p></td>
   </tr>
   <tr>
     <td><p>Aufbewahrung ist "ab dem Zeitpunkt der Einfügung, N Sekunden aufbewahren".</p></td>
     <td><p>TTL auf Sammlungsebene</p></td>
   </tr>
   <tr>
     <td><p>Verschiedene Entitäten benötigen unterschiedliche Lebenszeiten in derselben Sammlung (pro Mandant, heiß/kalt, pro Dokument)</p></td>
     <td><p>TTL auf Entitätsebene</p></td>
   </tr>
   <tr>
     <td><p>Die Aufbewahrung ist eine absolute Wanduhrzeit (z.B. 2027-01-01T00:00:00Z)</p></td>
     <td><p>TTL auf Entitätsebene</p></td>
   </tr>
   <tr>
     <td><p>Die Aufbewahrung wird durch einen Geschäftszeitstempel gesteuert, nicht durch den Einfügezeitstempel.</p></td>
     <td><p>TTL auf Entitätsebene</p></td>
   </tr>
   <tr>
     <td><p>Sie möchten die Lebensdauer einer Entität nach dem Einfügen aktualisieren oder verlängern</p></td>
     <td><p>TTL auf Entitätsebene</p></td>
   </tr>
   <tr>
     <td><p>Einige Entitäten sollen nie ablaufen, andere schon</p></td>
     <td><p>TTL auf Entitätsebene (für unsterbliche Entitäten NULL verwenden)</p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Set-collection-level-TTL" class="common-anchor-header">TTL auf Sammlungsebene festlegen<button data-href="#Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie TTL auf Sammlungsebene, wenn jede Entität in der Sammlung dem gleichen Aufbewahrungszeitraum folgen soll.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Aktivieren bei einer neuen Sammlung<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Übergeben Sie <code translate="no">collection.ttl.seconds</code> (Integer, in Sekunden) durch die <code translate="no">properties</code> Map zur Erstellungszeit.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.createCollection(CreateCollectionReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .collectionSchema(schema)</span>
<span class="highlighted-comment-line">        .indexParams(Collections.singletonList(indexParam))</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>, <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">  },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Aktivieren für eine bestehende Sammlung<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Rufen Sie <code translate="no">alter_collection_properties</code> mit <code translate="no">collection.ttl.seconds</code> in der <code translate="no">properties</code> -Map auf, um die TTL auf eine bereits verwendete Sammlung anzuwenden.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier without TTL</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
        schema=schema,
        index_params=index_params,
    )

<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>

<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier without TTL.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span> },</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Die TTL-Einstellung aufheben<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie beschließen, die Daten in einer Sammlung auf unbestimmte Zeit aufzubewahren, können Sie die TTL-Einstellung für diese Sammlung einfach löschen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;propertyKeys\&quot;: [
        \&quot;collection.ttl.seconds\&quot;
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-entity-level-TTL--Milvus-30x" class="common-anchor-header">TTL auf Entitätsebene einstellen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Set-entity-level-TTL--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit der TTL auf Entitätsebene kann jede Entität ihre eigene absolute Verfallszeit haben. Die Zeit wird in einer dedizierten <code translate="no">TIMESTAMPTZ</code> Spalte gespeichert, die Sie im Schema deklarieren, und Sie markieren diese Spalte als das TTL-Feld über die <code translate="no">ttl_field</code> collection property.</p>
<h3 id="Enable-on-a-new-collection" class="common-anchor-header">Aktivieren für eine neue Sammlung<button data-href="#Enable-on-a-new-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Um TTL auf Entity-Ebene zur Erstellungszeit zu aktivieren, sind zwei Ergänzungen im selben <code translate="no">create_collection</code> -Aufruf erforderlich: ein <code translate="no">TIMESTAMPTZ</code> -Feld im Schema und die <code translate="no">ttl_field</code> -Eigenschaft, die auf dieses Feld zeigt.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;expire_at&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
                       metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>).dataType(DataType.Timestamptz)</span>
        .isNullable(<span class="hljs-literal">true</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>).dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">128</span>).build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder().fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE).build();

<span class="highlighted-wrapper-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-wrapper-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .properties(properties)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span> },
  ],
  <span class="hljs-attr">index_params</span>: [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  ],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Sammlung existiert, fügen Sie Entitäten mit <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> Zeitstempel-Strings ein.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;</span>
<span class="highlighted-comment-line">rows = [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Never expires</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-literal">None</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)]},</span>
<span class="highlighted-comment-line">]</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(<span class="hljs-string">&quot;my_collection&quot;</span>, rows)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();

List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line">List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;expire_at&quot;</span>, JsonNull.INSTANCE);</span>
<span class="highlighted-comment-line">r1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r1);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">r2.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line">r2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r2);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">r3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);</span>
<span class="highlighted-comment-line">r3.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>);</span>
<span class="highlighted-comment-line">r3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">rows.add(r3);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.insert(InsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(rows)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; was created earlier with `ttl_field`: &quot;expire_at&quot;.</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Never expires</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-literal">null</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Expires at 2026-12-31 UTC midnight</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>, vector },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// Shanghai local time — normalized to UTC internally</span></span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2027-01-01T00:00:00+08:00&quot;</span>, vector },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Bei jeder Abfrage und Vektorsuche fügt der Server automatisch den TTL-Filter ein - Sie müssen nie selbst einen schreiben, und abgelaufene Entitäten erscheinen nie in den Ergebnissen:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line">results = client.query(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"><span class="hljs-built_in">print</span>(results)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .filter(<span class="hljs-string">&quot;id &gt;= 0&quot;</span>)</span>
<span class="highlighted-comment-line">        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))</span>
<span class="highlighted-comment-line">        .limit(<span class="hljs-number">10L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">System.out.println(results.getQueryResults());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-comment">// Expired rows are filtered out automatically</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id &gt;= 0&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>],</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>);</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der gleiche Autofilter gilt für <code translate="no">client.search()</code>.</p>
<p>Um die Lebensdauer einer Entität zu verlängern, bevor sie durch die Verdichtung physisch entfernt wird, kann man sie mit einem späteren Verfallszeitstempel einfügen - oder <code translate="no">None</code> - um die Entität wieder in die abfragbare Menge aufzunehmen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());

<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2028-01-01T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-on-an-existing-collection" class="common-anchor-header">Aktivieren in einer bestehenden Sammlung<button data-href="#Enable-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn die Sammlung bereits existiert und nicht auf <code translate="no">collection.ttl.seconds</code> gesetzt ist, fügen Sie mit <code translate="no">add_collection_field</code> eine Spalte <code translate="no">TIMESTAMPTZ</code> hinzu und markieren Sie sie mit <code translate="no">alter_collection_properties</code> als TTL-Feld. Fügen Sie optional historische Zeilen ein, um ihre Verfallszeitstempel aufzufüllen - Zeilen, die Sie nicht auffüllen, behalten <code translate="no">NULL</code> und laufen nie ab.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> vector = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">128</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>());

<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">field</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — mark the new column as the TTL field</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">ttl_field</span>: <span class="hljs-string">&quot;expire_at&quot;</span> },</span>
<span class="highlighted-comment-line">});</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 (optional) — backfill expiration timestamps for historical rows</span></span>
<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">data</span>: [</span>
<span class="highlighted-comment-line">    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, vector, <span class="hljs-attr">expire_at</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span> },</span>
<span class="highlighted-comment-line">  ],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-the-TTL-setting" class="common-anchor-header">Verwerfen Sie die TTL-Einstellung<button data-href="#Drop-the-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h3><p>Rufen Sie <code translate="no">drop_collection_properties</code> mit <code translate="no">ttl_field</code> in <code translate="no">property_keys</code> auf, um das Verfallsdatum pro Einheit zu stoppen. Die Spalte <code translate="no">TIMESTAMPTZ</code> selbst verbleibt im Schema - Sie können sie weiterhin als reguläres Feld abfragen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="highlighted-comment-line"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Durch das Löschen von <code translate="no">ttl_field</code> wird der automatische Filter für zukünftige Abfragen deaktiviert, aber Entitäten, die bereits abgelaufen sind, werden nicht automatisch wieder angezeigt. Um eine bereits abgelaufene Entität sichtbar zu machen, fügen Sie sie mit einem <code translate="no">None</code> oder einem zukünftigen Ablaufzeitstempel ein - das ist der einzige Weg, um den Zugriff auf abgelaufene Zeilen innerhalb der gleichen Ladesitzung wiederherzustellen.</p>
<h2 id="Migrate-between-the-two-modes" class="common-anchor-header">Umstellung zwischen den beiden Modi<button data-href="#Migrate-between-the-two-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Die beiden TTL-Modi schließen sich gegenseitig aus, daher ist der Wechsel zwischen ihnen ein mehrstufiger Vorgang.</p>
<h3 id="Switch-from-collection-level-to-entity-level-TTL" class="common-anchor-header">Wechsel von TTL auf Sammlungsebene zu TTL auf Entitätsebene<button data-href="#Switch-from-collection-level-to-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Ihre Sammlung mit <code translate="no">collection.ttl.seconds</code> erstellt wurde und Sie zur Ablauffrist pro Entität wechseln möchten, führen Sie diese vier Schritte aus. Das Überspringen von Schritt 1 führt dazu, dass Schritt 3 mit <code translate="no">collection TTL is already set, cannot be set ttl field</code> fehlschlägt.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;expire_at&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.TIMESTAMPTZ,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>},</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line">client.upsert(<span class="hljs-string">&quot;my_collection&quot;</span>, [</span>
<span class="highlighted-comment-line">    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;vector&quot;</span>: [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)],</span>
<span class="highlighted-comment-line">     <span class="hljs-string">&quot;expire_at&quot;</span>: <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>},</span>
<span class="highlighted-comment-line">])</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.Random;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `collection.ttl.seconds` set.</span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 1 — disable collection-level TTL (mandatory; the two modes are mutually exclusive)</span></span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 2 — add a TIMESTAMPTZ column to the schema</span></span>
<span class="highlighted-comment-line">client.addCollectionField(AddCollectionFieldReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;expire_at&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Timestamptz)</span>
<span class="highlighted-comment-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 3 — set the ttl_field property on the column you just added</span></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; ttlField = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">ttlField.put(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>);</span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(ttlField)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment">// Step 4 (optional) — backfill expiration timestamps for historical entities</span></span>
<span class="highlighted-comment-line"><span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();</span>
<span class="highlighted-comment-line"><span class="hljs-type">Random</span> <span class="hljs-variable">rng</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();</span>
<span class="highlighted-comment-line">List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();</span>
<span class="highlighted-comment-line"><span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">128</span>; i++) vector.add(rng.nextFloat());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);</span>
<span class="highlighted-comment-line">row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(vector));</span>
<span class="highlighted-comment-line">row.addProperty(<span class="hljs-string">&quot;expire_at&quot;</span>, <span class="hljs-string">&quot;2026-12-31T00:00:00Z&quot;</span>);</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">client.upsert(UpsertReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .data(Collections.singletonList(row))</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Historische Entitäten, für die Sie kein Backfill <code translate="no">expire_at</code> durchführen, haben <code translate="no">NULL</code> in dieser Spalte, was bedeutet, dass sie nie ablaufen. Füllen Sie nur die Zeilen zurück, die eine endliche Lebensdauer haben sollten.</p>
<h3 id="Switch-from-entity-level-to-collection-level-TTL" class="common-anchor-header">Wechsel von Entitätsebene zu Sammlungsebene TTL<button data-href="#Switch-from-entity-level-to-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Um in die andere Richtung zu gehen, lassen Sie <code translate="no">ttl_field</code> fallen und setzen Sie <code translate="no">collection.ttl.seconds</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.drop_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    property_keys=[<span class="hljs-string">&quot;ttl_field&quot;</span>],</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">client.alter_collection_properties(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>},  <span class="hljs-comment"># 14 days</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Assumes &quot;my_collection&quot; already exists with `ttl_field` set.</span>
<span class="highlighted-comment-line">client.dropCollectionProperties(DropCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;ttl_field&quot;</span>))</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">properties.put(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>); <span class="hljs-comment">// 14 days</span></span>
<span class="highlighted-comment-line">client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()</span>
<span class="highlighted-comment-line">        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)</span>
<span class="highlighted-comment-line">        .properties(properties)</span>
<span class="highlighted-comment-line">        .build());</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQs" class="common-anchor-header">Häufig gestellte Fragen<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-does-data-expire-due-to-TTL-settings" class="common-anchor-header">Wann laufen die Daten aufgrund der TTL-Einstellungen ab?<button data-href="#When-does-data-expire-due-to-TTL-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Derzeit laufen die Daten zu dem Zeitpunkt ab, zu dem sie eingefügt oder hochgeladen wurden. Abgelaufene Daten werden nicht in den Suchergebnissen angezeigt. Einzelheiten finden Sie unter <a href="/docs/de/set-collection-ttl.md#Dyq9dQUmwoAk9WxwEuEcSDkPnoc">Beispiele</a>.</p>
<h3 id="When-will-the-expired-data-be-physically-deleted" class="common-anchor-header">Wann werden die abgelaufenen Daten physisch gelöscht?<button data-href="#When-will-the-expired-data-be-physically-deleted" class="anchor-icon" translate="no">
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
    </button></h3><p>Sobald die Daten abgelaufen sind, werden sie nicht mehr in den Suchergebnissen angezeigt. Sie werden jedoch erst nach der anschließenden Systemverdichtung gemäß den Verdichtungsrichtlinien Ihres Clusters physisch gelöscht.</p>
