---
id: integration_with_mindsdb.md
summary: >-
  Dieses Tutorial demonstriert die Integration von Milvus mit MindsDB, so dass
  Sie die KI-Funktionen von MindsDB mit der Vektordatenbankfunktionalität von
  Milvus durch SQL-ähnliche Operationen zur Verwaltung und Abfrage von
  Vektoreinbettungen nutzen können.
title: Integrieren Sie Milvus mit MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Integrieren Sie Milvus mit MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> ist ein leistungsstarkes Tool für die Integration von KI-Anwendungen mit verschiedenen Unternehmensdatenquellen. Es fungiert als föderierte Abfrage-Engine, die Ordnung in den Datenwust bringt und Abfragen über strukturierte und unstrukturierte Daten präzise beantwortet. Ganz gleich, ob Ihre Daten über SaaS-Anwendungen, Datenbanken oder Data Warehouses verstreut sind, MindsDB kann sie alle mit Standard-SQL verbinden und abfragen. Es verfügt über hochmoderne autonome RAG-Systeme durch Knowledge Bases, unterstützt Hunderte von Datenquellen und bietet flexible Bereitstellungsoptionen von der lokalen Entwicklung bis zu Cloud-Umgebungen.</p>
<p>Dieses Tutorial demonstriert die Integration von Milvus mit MindsDB, so dass Sie die KI-Funktionen von MindsDB mit der Vektordatenbankfunktionalität von Milvus durch SQL-ähnliche Operationen zur Verwaltung und Abfrage von Vektoreinbettungen nutzen können.</p>
<div class="alert note">
<p>Dieses Tutorial bezieht sich hauptsächlich auf die offizielle Dokumentation des <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handlers</a>. Wenn Sie veraltete Teile in diesem Tutorial finden, können Sie sich vorrangig an der offiziellen Dokumentation orientieren und ein Issue für uns erstellen.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">MindsDB installieren<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor wir beginnen, installieren Sie MindsDB lokal über <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> oder <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Bevor Sie fortfahren, stellen Sie sicher, dass Sie ein solides Verständnis der grundlegenden Konzepte und Abläufe von MindsDB und Milvus haben.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Einführung in die Argumente<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Die erforderlichen Argumente zum Herstellen einer Verbindung sind:</p>
<ul>
<li><code translate="no">uri</code>uri für die Milvus-Datenbank, kann auf eine lokale ".db"-Datei oder einen Docker- oder Cloud-Dienst gesetzt werden</li>
<li><code translate="no">token</code>: Token zur Unterstützung von Docker oder Cloud Service entsprechend der uri-Option</li>
</ul>
<p>Die optionalen Argumente zum Aufbau einer Verbindung sind:</p>
<p>Diese werden für <code translate="no">SELECT</code> Abfragen verwendet:</p>
<ul>
<li><code translate="no">search_default_limit</code>: Standard-Limit, das in Select-Anweisungen übergeben wird (default=100)</li>
<li><code translate="no">search_metric_type</code>Metrik-Typ, der für die Suche verwendet wird (Standard="L2")</li>
<li><code translate="no">search_ignore_growing</code>ob wachsende Segmente bei der Ähnlichkeitssuche ignoriert werden sollen (default=False)</li>
<li><code translate="no">search_params</code>: spezifisch für die <code translate="no">search_metric_type</code> (default={"nprobe": 10})</li>
</ul>
<p>Diese werden für <code translate="no">CREATE</code> Abfragen verwendet:</p>
<ul>
<li><code translate="no">create_auto_id</code>: ob die ID automatisch generiert werden soll, wenn Datensätze ohne ID eingefügt werden (default=False)</li>
<li><code translate="no">create_id_max_len</code>Maximale Länge des id-Feldes bei der Erstellung einer Tabelle (default=64)</li>
<li><code translate="no">create_embedding_dim</code>Einbettungsdimension für die Tabellenerstellung (default=8)</li>
<li><code translate="no">create_dynamic_field</code>ob die erstellten Tabellen dynamische Felder haben oder nicht (default=True)</li>
<li><code translate="no">create_content_max_len</code>Maximale Länge der Inhaltsspalte (default=200)</li>
<li><code translate="no">create_content_default_value</code>Standardwert der Inhaltsspalte (default='')</li>
<li><code translate="no">create_schema_description</code>Beschreibung der erstellten Schemata (default='')</li>
<li><code translate="no">create_alias</code>Alias des erstellten Schemas (default='default')</li>
<li><code translate="no">create_index_params</code>Index: Parameter des auf der Einbettungsspalte erstellten Index (default={})</li>
<li><code translate="no">create_index_metric_type</code>Metrik, die zur Erstellung des Index verwendet wird (default='L2')</li>
<li><code translate="no">create_index_type</code>Typ des Indexes (default='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Verwendung<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie fortfahren, vergewissern Sie sich, dass die Version von <code translate="no">pymilvus</code> mit dieser <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">angehefteten Version</a> übereinstimmt. Wenn Sie Probleme mit der Versionskompatibilität feststellen, können Sie Ihre Version von pymilvus zurücksetzen oder sie in dieser <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">Anforderungsdatei</a> anpassen.</p>
<h3 id="Creating-connection" class="common-anchor-header">Verbindung erstellen</h3><p>Um diesen Handler zu nutzen und eine Verbindung zu einem Milvus-Server in MindsDB herzustellen, kann die folgende Syntax verwendet werden:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Wenn Sie nur eine lokale Vektordatenbank für kleine Datenmengen oder Prototypen benötigen, ist die Angabe der Uri als lokale Datei, z. B.<code translate="no">./milvus.db</code>, die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> verwendet, um alle Daten in dieser Datei zu speichern.</li>
<li>Für größere Datenmengen und Datenverkehr in der Produktion können Sie einen Milvus-Server auf <a href="https://milvus.io/docs/install-overview.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Serveradresse und den Port als <code translate="no">uri</code>, z. B.<code translate="no">http://localhost:19530</code>. Wenn Sie die Authentifizierungsfunktion auf Milvus aktivieren, stellen Sie <code translate="no">token</code> als <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> ein, andernfalls ist es nicht notwendig, das Token einzustellen.</li>
<li>Sie können auch vollständig verwaltetes Milvus auf <a href="https://zilliz.com/cloud">Zilliz Cloud</a> verwenden. Setzen Sie einfach die <code translate="no">uri</code> und <code translate="no">token</code> auf den <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und den API-Schlüssel</a> Ihrer Zilliz Cloud-Instanz.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Trennen der Verbindung</h3><p>Um die Verbindung zu trennen, verwenden Sie diesen Befehl</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Tabellen erstellen</h3><p>Um Daten aus einer bereits existierenden Tabelle einzufügen, verwenden Sie <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Sammlungen löschen</h3><p>Das Verwerfen einer Sammlung wird nicht unterstützt.</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Abfragen und Auswählen</h3><p>Um eine Datenbank mit einem Suchvektor abzufragen, können Sie <code translate="no">search_vector</code> in der <code translate="no">WHERE</code> Klausel verwenden.</p>
<p>Warnungen:</p>
<ul>
<li>Wenn Sie <code translate="no">LIMIT</code> weglassen, wird <code translate="no">search_default_limit</code> verwendet, da Milvus dies erfordert.</li>
<li>Die Metadaten-Spalte wird nicht unterstützt, aber wenn die Sammlung ein dynamisches Schema hat, können Sie sie wie gewohnt abfragen, siehe das folgende Beispiel</li>
<li>Dynamische Felder können nicht angezeigt werden, können aber abgefragt werden</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie <code translate="no">search_vector</code> weglassen, wird dies zu einer einfachen Suche und <code translate="no">LIMIT</code> oder <code translate="no">search_default_limit</code> Menge der Einträge in der Sammlung werden zurückgegeben</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die <code translate="no">WHERE</code> Klausel für dynamische Felder wie normales SQL verwenden.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Löschen von Einträgen</h3><p>Sie können Einträge mit <code translate="no">DELETE</code> genau wie in SQL löschen.</p>
<p>Warnungen:</p>
<ul>
<li>Milvus unterstützt nur das Löschen von Entitäten mit eindeutig spezifizierten Primärschlüsseln</li>
<li>Sie können nur den Operator <code translate="no">IN</code> verwenden.</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Einfügen von Datensätzen</h3><p>Sie können auch einzelne Zeilen wie folgt einfügen:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Aktualisieren</h3><p>Das Aktualisieren von Datensätzen wird von der Milvus-API nicht unterstützt. Sie können versuchen, eine Kombination aus <code translate="no">DELETE</code> und <code translate="no">INSERT</code></p>
<hr>
<p>Weitere Details und Beispiele finden Sie in der <a href="https://docs.mindsdb.com/what-is-mindsdb">offiziellen MindsDB-Dokumentation</a>.</p>
