---
id: mmap.md
summary: MMap ermöglicht mehr Daten in einem einzigen Knoten.
title: MMap-aktivierte Datenspeicherung
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">MMap-aktivierte Datenspeicherung<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus ermöglichen memory-mapped Dateien die direkte Zuordnung von Dateiinhalten zum Speicher. Diese Funktion erhöht die Speichereffizienz, insbesondere in Situationen, in denen der verfügbare Speicher knapp, das vollständige Laden von Daten aber nicht möglich ist. Dieser Optimierungsmechanismus kann die Datenkapazität erhöhen und gleichzeitig die Leistung bis zu einer gewissen Grenze sicherstellen; wenn die Datenmenge jedoch den Speicherplatz zu sehr übersteigt, kann die Such- und Abfrageleistung ernsthaft beeinträchtigt werden, weshalb Sie diese Funktion je nach Bedarf ein- oder ausschalten sollten.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Konfigurieren Sie die Speicherzuordnung<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Ab Milvus 2.4 haben Sie die Möglichkeit, die statische Konfigurationsdatei anzupassen, um die Standardeinstellungen für die Speicherzuordnung des gesamten Clusters vor der Bereitstellung zu konfigurieren. Darüber hinaus haben Sie die Möglichkeit, Parameter dynamisch zu ändern, um die Speicherzuordnungseinstellungen sowohl auf Cluster- als auch auf Indexebene fein abzustimmen. Zukünftige Updates werden die Speichermapping-Funktionen um Konfigurationen auf Feldebene erweitern.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Vor dem Cluster-Einsatz: globale Konfiguration</h3><p>Bevor Sie einen Cluster bereitstellen, wird mit den Einstellungen <strong>auf Clusterebene</strong> das Memory Mapping auf Ihren gesamten Cluster angewendet. Dadurch wird sichergestellt, dass alle neuen Objekte automatisch mit diesen Konfigurationen übereinstimmen. Es ist wichtig zu beachten, dass eine Änderung dieser Einstellungen einen Neustart des Clusters erfordert, um wirksam zu werden.</p>
<p>Um die Einstellungen für das Memory Mapping Ihres Clusters anzupassen, bearbeiten Sie die Datei <code translate="no">configs/milvus.yaml</code>. In dieser Datei können Sie angeben, ob das Memory Mapping standardmäßig aktiviert werden soll, und den Verzeichnispfad für die Speicherung der Memory-Mapping-Dateien festlegen. Wenn der Pfad (<code translate="no">mmapDirPath</code>) nicht angegeben wird, speichert das System speicherzugeordnete Dateien standardmäßig in <code translate="no">{localStorage.path}/mmap</code>. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Konfigurationen für den lokalen Speicher</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Nach <code translate="no">2.4.10</code> teilt sich die Konfiguration <code translate="no">queryNode.mmap.mmapEnabled</code> in die folgenden vier separaten Felder auf, und alle Voreinstellungen sind <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, steuert, ob Vektordaten mmap sind;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, steuert, ob der Vektorindex mmap ist;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, steuert, ob Skalardaten mmap sind;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, steuert, ob der Skalarindex mmap ist;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Darüber hinaus können nur Vektorindex und Vektordaten mmap für eine einzelne Sammlung ein- und ausgeschaltet werden, nicht aber für andere.</p>
<p>Kompatibilität: Wenn die ursprüngliche Konfiguration <code translate="no">queryNode.mmap.mmapEnabled</code> auf <code translate="no">true</code> eingestellt ist, wird die neu hinzugefügte Konfiguration zu diesem Zeitpunkt auf <code translate="no">true</code> eingestellt. Wenn <code translate="no">queryNode.mmap.mmapEnabled</code> auf <code translate="no">false</code> eingestellt ist, wird die neue Konfiguration auf <code translate="no">true</code> eingestellt, der endgültige Wert ist <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Während des Clusterbetriebs: dynamische Konfiguration</h3><p>Während der Cluster-Laufzeit können Sie die Einstellungen für das Memory Mapping entweder auf der Ebene der Sammlung oder des Index dynamisch anpassen.</p>
<p>Auf der <strong>Sammlungsebene</strong> wird das Memory Mapping auf alle nicht indizierten Rohdaten innerhalb einer Sammlung angewendet, mit Ausnahme von Primärschlüsseln, Zeitstempeln und Zeilen-IDs. Dieser Ansatz eignet sich besonders für die umfassende Verwaltung großer Datensätze.</p>
<p>Für dynamische Anpassungen der Speicherzuordnungseinstellungen innerhalb einer Sammlung verwenden Sie die Methode <code translate="no">set_properties()</code>. Hier können Sie <code translate="no">mmap.enabled</code> je nach Bedarf zwischen <code translate="no">True</code> oder <code translate="no">False</code> hin- und herschalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Nach <code translate="no">2.4.10</code> verwenden Sie für die Speicherzuordnungseinstellungen innerhalb einer Sammlung die Methode <code translate="no">add_field</code>. Hier können Sie <code translate="no">mmap_enabled</code> je nach Bedarf zwischen <code translate="no">True</code> oder <code translate="no">False</code> hin- und herschalten.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Bei Einstellungen <strong>auf Indexebene</strong> kann die Speicherzuordnung speziell auf Vektorindizes angewendet werden, ohne andere Datentypen zu beeinträchtigen. Diese Funktion ist von unschätzbarem Wert für Sammlungen, die eine optimierte Leistung für Vektorsuchen erfordern.</p>
<p>Um das Memory Mapping für einen Index innerhalb einer Sammlung zu aktivieren oder zu deaktivieren, rufen Sie die Methode <code translate="no">alter_index()</code> auf, geben den Namen des Zielindex in <code translate="no">index_name</code> an und setzen <code translate="no">mmap.enabled</code> auf <code translate="no">True</code> oder <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Anpassen des Speicherpfads in verschiedenen Bereitstellungen<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Memory-mapped Dateien werden standardmäßig im Verzeichnis <code translate="no">/mmap</code> innerhalb von <code translate="no">localStorage.path</code> abgelegt. Hier erfahren Sie, wie Sie diese Einstellung für verschiedene Bereitstellungsmethoden anpassen können:</p>
<ul>
<li>Für Milvus, das mit Helm Chart installiert wurde:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Für Milvus, das mit Milvus Operator installiert wurde:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Für Milvus, das mit Docker installiert wurde:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Memory Mapping kann nicht für eine geladene Sammlung aktiviert werden. Stellen Sie sicher, dass die Sammlung freigegeben wurde, bevor Sie Memory Mapping aktivieren.</p></li>
<li><p>Memory Mapping wird für DiskANN- oder GPU-Klasse-Indizes nicht unterstützt.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>In welchen Szenarien ist es empfehlenswert, Memory Mapping zu aktivieren? Was sind die Nachteile nach der Aktivierung dieser Funktion?</strong></p>
<p>Memory Mapping wird empfohlen, wenn der Speicher begrenzt ist oder wenn die Leistungsanforderungen moderat sind. Die Aktivierung dieser Funktion erhöht die Kapazität für das Laden von Daten. Bei einer Konfiguration mit 2 CPUs und 8 GB Arbeitsspeicher können durch die Aktivierung des Memory Mappings beispielsweise bis zu viermal mehr Daten geladen werden, als wenn die Funktion nicht aktiviert wird. Die Auswirkungen auf die Leistung sind unterschiedlich:</p>
<ul>
<li><p>Bei ausreichendem Arbeitsspeicher ist die erwartete Leistung ähnlich wie bei der Verwendung von reinem Arbeitsspeicher.</p></li>
<li><p>Bei unzureichendem Speicher kann sich die erwartete Leistung verschlechtern.</p></li>
</ul></li>
<li><p><strong>Welche Beziehung besteht zwischen Konfigurationen auf Sammlungs- und Indexebene?</strong></p>
<p>Collection-Level und Index-Level sind keine allumfassenden Beziehungen. Collection-Level steuert, ob die Originaldaten mmap-fähig sind oder nicht, während Index-Level nur für Vektorindizes gilt.</p></li>
<li><p><strong>Gibt es einen empfohlenen Indextyp für Memory Mapping?</strong></p>
<p>Ja, HNSW wird für die Aktivierung von mmap empfohlen. Wir haben HNSW-, IVF_FLAT- und IVF_PQ/SQ-Indizes getestet. Die Leistung der IVF-Indizes ist stark gesunken, während der Leistungsabfall durch die Aktivierung von mmap für HNSW-Indizes noch im Rahmen der Erwartungen liegt.</p></li>
<li><p><strong>Welche Art von lokalem Speicher ist für das Memory Mapping erforderlich?</strong></p>
<p>Eine hochwertige Festplatte erhöht die Leistung, wobei NVMe-Laufwerke die bevorzugte Option sind.</p></li>
<li><p><strong>Können skalare Daten einem Speicher-Mapping unterzogen werden?</strong></p>
<p>Memory Mapping kann auf skalare Daten angewendet werden, nicht aber auf Indizes, die auf skalaren Feldern aufbauen.</p></li>
<li><p><strong>Wie wird die Priorität für Speicherzuordnungskonfigurationen über verschiedene Ebenen hinweg bestimmt?</strong></p>
<p>Wenn in Milvus explizit Speicher-Mapping-Konfigurationen über mehrere Ebenen hinweg definiert werden, haben Konfigurationen auf Index- und Sammlungsebene die höchste Priorität, gefolgt von Konfigurationen auf Clusterebene.</p></li>
<li><p><strong>Was passiert, wenn ich ein Upgrade von Milvus 2.3 durchführe und den Verzeichnispfad für das Memory Mapping konfiguriert habe?</strong></p>
<p>Wenn Sie ein Upgrade von Milvus 2.3 durchführen und den Speicherabbildungsverzeichnispfad (<code translate="no">mmapDirPath</code>) konfiguriert haben, wird Ihre Konfiguration beibehalten, und die Standardeinstellung für das aktivierte Speicherabbild (<code translate="no">mmapEnabled</code>) lautet <code translate="no">true</code>. Es ist wichtig, die Metadaten zu migrieren, um die Konfiguration Ihrer bestehenden Memory-Mapping-Dateien zu synchronisieren. Weitere Einzelheiten finden Sie unter <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrieren der Metadaten</a>.</p></li>
</ul>
