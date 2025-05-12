---
id: consistency.md
summary: Erfahren Sie mehr über die vier Konsistenzstufen in Milvus.
title: Konsistenz
---
<h1 id="Consistency-Level​" class="common-anchor-header">Konsistenz-Ebene<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>Als verteilte Vektordatenbank bietet Milvus mehrere Konsistenzstufen, um sicherzustellen, dass jeder Knoten oder jede Replik bei Lese- und Schreibvorgängen auf dieselben Daten zugreifen kann. Derzeit werden die Konsistenzstufen <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> und <strong>Session</strong> unterstützt, wobei <strong>Bounded</strong> die standardmäßig verwendete Konsistenzstufe ist.</p>
<h2 id="Overview​" class="common-anchor-header">Überblick<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ist ein System, das Speicherung und Berechnung voneinander trennt. In diesem System sind <strong>DataNodes</strong> für die Persistenz der Daten verantwortlich und speichern sie schließlich in einem verteilten Objektspeicher wie MinIO/S3. <strong>QueryNodes</strong> übernehmen Berechnungsaufgaben wie die Suche. Diese Aufgaben umfassen sowohl die Verarbeitung von <strong>Stapeldaten</strong> als auch von <strong>Streaming-Daten</strong>. Einfach ausgedrückt, kann man unter Stapeldaten Daten verstehen, die bereits im Objektspeicher gespeichert wurden, während sich Streaming-Daten auf Daten beziehen, die noch nicht im Objektspeicher gespeichert wurden. Aufgrund der Netzwerklatenz verfügen die QueryNodes oft nicht über die aktuellsten Streaming-Daten. Ohne zusätzliche Sicherheitsvorkehrungen kann die direkte Durchführung einer Suche auf Streaming-Daten zum Verlust vieler unbestätigter Datenpunkte führen, was die Genauigkeit der Suchergebnisse beeinträchtigt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Batch-Daten und Streaming-Daten</span> </span></p>
<p>Wie in der obigen Abbildung dargestellt, können QueryNodes nach dem Empfang einer Suchanfrage sowohl Streaming-Daten als auch Batch-Daten gleichzeitig empfangen. Aufgrund der Netzwerklatenz können die von QueryNodes erhaltenen Streaming-Daten jedoch unvollständig sein.</p>
<p>Um dieses Problem zu lösen, versieht Milvus jeden Datensatz in der Datenwarteschlange mit einem Zeitstempel und fügt kontinuierlich Synchronisationszeitstempel in die Datenwarteschlange ein. Wann immer ein Synchronisationszeitstempel (syncTs) empfangen wird, setzt QueryNodes diesen als ServiceTime, was bedeutet, dass QueryNodes alle Daten vor dieser ServiceTime sehen kann. Auf der Grundlage der ServiceTime kann Milvus Garantiezeitstempel (GuaranteeTs) bereitstellen, um verschiedene Benutzeranforderungen an Konsistenz und Verfügbarkeit zu erfüllen. Benutzer können QueryNodes über die Notwendigkeit informieren, Daten vor einem bestimmten Zeitpunkt in den Suchbereich aufzunehmen, indem sie GuaranteeTs in ihren Suchanfragen angeben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>ServiceTime und GuaranteeTs</span> </span></p>
<p>Wie in der obigen Abbildung dargestellt, bedeutet GuaranteeTs, wenn es kleiner als ServiceTime ist, dass alle Daten vor dem angegebenen Zeitpunkt vollständig auf die Festplatte geschrieben wurden, so dass QueryNodes den Suchvorgang sofort durchführen können. Wenn GuaranteeTs größer als ServiceTime ist, müssen QueryNodes warten, bis ServiceTime GuaranteeTs überschreitet, bevor sie den Suchvorgang ausführen können.</p>
<p>Die Benutzer müssen einen Kompromiss zwischen Abfragegenauigkeit und Abfragelatenz eingehen. Wenn Benutzer hohe Anforderungen an die Konsistenz stellen und nicht auf die Abfragelatenz achten, können sie GuaranteeTs auf einen möglichst großen Wert setzen; wenn Benutzer Suchergebnisse schnell erhalten möchten und toleranter gegenüber der Abfragegenauigkeit sind, kann GuaranteeTs auf einen kleineren Wert gesetzt werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>Veranschaulichung der Konsistenzstufen</span> </span></p>
<p>Milvus bietet vier Arten von Konsistenzstufen mit unterschiedlichen GuaranteeTs.</p>
<ul>
<li><p><strong>Stark</strong></p>
<p>Der letzte Zeitstempel wird als GuaranteeTs verwendet, und QueryNodes müssen warten, bis die ServiceTime den GuaranteeTs entspricht, bevor sie Suchanfragen ausführen.</p></li>
<li><p><strong>Eventuell</strong></p>
<p>Die GuaranteeTs wird auf einen extrem kleinen Wert, z. B. 1, gesetzt, um Konsistenzprüfungen zu vermeiden, so dass QueryNodes sofort Suchanfragen für alle Batch-Daten ausführen können.</p></li>
<li><p><strong>Bounded</strong>(Voreinstellung)</p>
<p>GuranteeTs wird auf einen Zeitpunkt vor dem letzten Zeitstempel gesetzt, damit QueryNodes Suchanfragen mit einer Toleranz für bestimmte Datenverluste durchführen können.</p></li>
<li><p><strong>Sitzung</strong></p>
<p>Der letzte Zeitpunkt, zu dem der Client Daten einfügt, wird als GuaranteeTs verwendet, so dass QueryNodes Suchen nach allen vom Client eingefügten Daten durchführen kann.</p></li>
</ul>
<p>Milvus verwendet Bounded Staleness als Standard-Konsistenzstufe. Wenn die GuaranteeTs nicht angegeben werden, wird die letzte ServiceTime als GuaranteeTs verwendet.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">Konsistenzlevel festlegen<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können verschiedene Konsistenzstufen festlegen, wenn Sie eine Sammlung erstellen sowie Suchen und Abfragen durchführen.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">Festlegen der Konsistenzstufe bei der Erstellung einer Sammlung</h3><p>Beim Erstellen einer Sammlung können Sie die Konsistenzstufe für die Suchen und Abfragen innerhalb der Sammlung festlegen. Im folgenden Codebeispiel wird die Konsistenzstufe auf <strong>Bounded</strong> gesetzt.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Mögliche Werte für den Parameter <code translate="no">consistency_level</code> sind <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, und <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">Konsistenzlevel in der Suche festlegen</h3><p>Sie können jederzeit die Konsistenzstufe für eine bestimmte Suche ändern. Das folgende Codebeispiel setzt die Konsistenzstufe zurück auf "Bounded". Die Änderung gilt nur für die aktuelle Suchanfrage.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dieser Parameter ist auch bei hybriden Suchen und dem Such-Iterator verfügbar. Mögliche Werte für den Parameter <code translate="no">consistency_level</code> sind <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, und <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">Konsistenzstufe in der Abfrage festlegen</h3><p>Sie können jederzeit die Konsistenzstufe für eine bestimmte Suche ändern. Das folgende Codebeispiel setzt die Konsistenzstufe auf den Wert <strong>Eventually</strong>. Die Einstellung gilt nur für die aktuelle Suchanfrage.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>Dieser Parameter ist auch im Abfrage-Iterator verfügbar. Mögliche Werte für den Parameter <code translate="no">consistency_level</code> sind <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, und <code translate="no">Session</code>.</p>
