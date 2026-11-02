---
id: milvus_lite.md
summary: >-
  Installieren Sie Milvus Lite und führen Sie eine lokale Vektorsuche mit einem
  persistenten Datenbankpfad durch.
title: Milvus Lite lokal ausführen
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Milvus Lite lokal ausführen<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird beschrieben, wie Sie mit Milvus Lite eine lokale Vektorsuche durchführen. Dabei werden die Installation, die Datenspeicherung, die Filterung sowie der Export von Daten in eine andere Milvus-Installation behandelt.</p>
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
    </button></h2><p>Milvus Lite ist ein schlankes lokales Backend für das <a href="https://github.com/milvus-io/pymilvus">Milvus-Python-SDK</a>. Installieren Sie es mit dem optionalen Zusatz „ <code translate="no">milvus-lite</code> “; durch die Installation von „ <code translate="no">pymilvus</code> “ allein wird dieses Backend in der unten verwendeten SDK-Version nicht installiert.</p>
<p>Milvus Lite eignet sich für die lokale Entwicklung und kleine Workloads in Umgebungen wie:</p>
<ul>
<li>Jupyter Notebook oder Google Colab</li>
<li>Laptops</li>
<li>Edge-Geräte mit kompatiblen Python-Abhängigkeiten</li>
</ul>
<p>Milvus Lite nutzt die „ <code translate="no">MilvusClient</code> “-API für unterstützte Operationen, darunter die Persistenz von Vektordaten, Einfügen und Löschen, Vektorsuche sowie Metadatenfilterung. Um einen unterstützten Anwendungs-Workflow auf eine Remote-Bereitstellung zu verlagern, ändern Sie die Verbindungs-URI und die Anmeldedaten und prüfen Sie die Unterschiede bei den unterstützten Funktionen. Für groß angelegte Produktions-Workloads verwenden Sie <a href="/docs/de/install-overview.md">Milvus Standalone oder Distributed</a> oder das vollständig verwaltete Milvus auf <a href="https://zilliz.com/cloud">der Zilliz Cloud</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>In dieser Anleitung werden PyMilvus <strong>3.0.2</strong> und Milvus Lite <strong>3.2.2</strong> verwendet. Richten Sie folgende Umgebung ein:</p>
<ul>
<li>Python 3.10 oder neuer. Das lokale Lite-Backend erfordert eine höhere Mindestversion von Python als der Remote-PyMilvus-Client.</li>
<li>macOS, Linux oder Windows mit kompatiblen Wheels für Abhängigkeiten wie <code translate="no">faiss-cpu</code> und <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 ist ein reines Python-Paket, daher müssen das Betriebssystem und die Architektur diese Abhängigkeiten erfüllen und nicht das Lite-Paket selbst.</li>
<li>Ein beschreibbares lokales Verzeichnis für die Speicherung der Datenbank.</li>
</ul>
<p>Unter Windows überspringt pip das Extra „ <code translate="no">milvus-lite</code> “ von PyMilvus 3.0.2 aufgrund seines Plattform-Markers, daher muss „ <code translate="no">milvus-lite</code> “ explizit angegeben werden. Der unten stehende Installationsbefehl tut dies bereits. Für andere Paket- und Plattformkombinationen konsultieren Sie bitte die <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite-Release-Anforderungen</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Einrichtung von Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie eine isolierte Python-Umgebung und installieren Sie beide Pakete:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setzen Sie den Ausdruck „extras“ in Anführungszeichen, damit Shells wie zsh die Klammern nicht interpretieren. Aktivieren Sie in Windows PowerShell die Umgebung mit „ <code translate="no">.venv\Scripts\Activate.ps1</code> “ anstelle von „ <code translate="no">source .venv/bin/activate</code> “. Durch die explizite Angabe der Versionen bleiben das SDK und das lokale Backend mit dieser Anleitung synchronisiert.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x verwendet eine andere Speicher-Engine als das ursprüngliche 2.x-Paket. Es kann eine vorhandene 2.x-Datei „ <code translate="no">.db</code> “ nicht direkt öffnen. Behalten Sie die ursprüngliche Datenbank und eine Umgebung bei, in der sie geöffnet werden kann, exportieren Sie die Daten dorthin und importieren Sie sie in eine neue Datenbank. Bei der Installation eines neuen Pakets wird das alte Speicherformat nicht migriert. Siehe <a href="#Migrating-data-from-Milvus-Lite">„Daten aus Milvus Lite migrieren</a>“.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Verbindung zu Milvus Lite herstellen<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Übergeben Sie einen lokalen Pfad, der auf „ <code translate="no">.db</code> “ endet, an „ <code translate="no">MilvusClient</code> “:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Bei Milvus Lite 3.2.2 wird dadurch im Arbeitsverzeichnis ein <strong>Verzeichnis „milvus_demo.db“</strong> erstellt. Das Verzeichnis enthält die Speicherdateien der Datenbank; die Endung „ <code translate="no">.db</code> “ bedeutet nicht, dass es sich um eine einzelne portable Datei handelt. Verwenden Sie denselben Pfad, um die Datenbank nach dem Schließen des Clients oder dem Neustart der Anwendung erneut zu öffnen.</p>
<p>Verwenden Sie für eine neue Datenbank einen anderen Pfad. Um stattdessen eine Verbindung zu einem entfernten Milvus-Server herzustellen, übergeben Sie dessen Endpunkt und Anmeldedaten:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Führen Sie ein lokales Suchbeispiel aus<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel veranschaulicht den API-Workflow mit generierten Vektoren. Diese Vektoren kodieren nicht die Bedeutung des Textes; verwenden Sie ein Einbettungsmodell, wenn Sie eine semantische Suche erstellen. Führen Sie das Beispiel mit einem neuen Datenbankpfad aus oder entfernen Sie die vorhandene Datei „ <code translate="no">demo_collection</code> “, bevor Sie es erneut ausführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Für eine Anwendung, die Einbettungen aus Text generiert, fahren Sie mit <a href="/docs/de/quickstart.md">dem Schnellstart</a> fort. Sie können auch die <a href="https://github.com/milvus-io/bootcamp">Milvus-Bootcamp-Beispiele</a> für RAG, Bildersuche und Framework-Integrationen erkunden.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Unterstützte Funktionen und Einschränkungen<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 implementiert über seinen lokalen PyMilvus-Adapter eine Teilmenge der Milvus-Operationen. Die <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">versionierte Funktionsübersicht</a> beschreibt die folgenden Funktionen:</p>
<table>
<thead>
<tr><th>Bereich</th><th>Unterstützung in dieser Lite-Version</th></tr>
</thead>
<tbody>
<tr><td>Dichte und spärliche Vektoren</td><td><code translate="no">FLOAT_VECTOR</code> sowie <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Vektorindizes</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code> sowie <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>skalare und spärliche Indizes</td><td><code translate="no">INVERTED</code> skalare Indizes und <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Datenoperationen</td><td>Einfügen, Upsert, Abrufen, Abfragen, Vektorsuche und Löschen</td></tr>
<tr><td>Suche</td><td>Dichte und spärliche Suche, Metadatenfilter, mehrere Vektorfelder und hybride Suche</td></tr>
<tr><td>Organisation von Sammlungen</td><td>Sammlungen, benannte Datenbanken, Aliase und Partitionen im Rahmen der vom lokalen Adapter unterstützten Operationen</td></tr>
</tbody>
</table>
<p>Diese Version ist nicht auf „ <code translate="no">FLAT</code> “-Indizes beschränkt. Die Verfügbarkeit und das Verhalten von Indizes hängen von der Lite-Version ab; wenden Sie die Einschränkungen des ursprünglichen 2.x-Backends nicht auf die 3.x-Engine an.</p>
<p>Prüfen Sie diese Einschränkungen, bevor Sie sich für Lite als Lösung für eine Anwendung entscheiden:</p>
<ul>
<li>Es kann jeweils nur ein Prozess Eigentümer eines Datenbank-Speicherverzeichnisses sein. Die Engine schützt das Verzeichnis mit einer Dateisperre.</li>
<li>Serialisieren Sie Schreibvorgänge in dieselbe Sammlung. Gleichzeitige Schreibvorgänge werden nicht sicher unterstützt.</li>
<li>Der lokale Adapter implementiert nicht alle Milvus-RPCs. Nicht unterstützte Operationen geben „ <code translate="no">UNIMPLEMENTED</code> “ zurück; Schemaänderungen sowie das Laden oder Freigeben auf Partitionsebene sind nicht verfügbar.</li>
<li>Authentifizierung, Benutzer, Rollen, RBAC und TLS werden nicht unterstützt. Setzen Sie den lokalen Server keinem nicht vertrauenswürdigen Netzwerk aus.</li>
<li>Vektorfelder vom Typ „Binary“, „float16“, „bfloat16“ und „int8“ sowie Produktquantisierungsindizes werden nicht unterstützt.</li>
<li>Lite ist für lokale Workloads konzipiert. Die Kompatibilität mit der lokalen API bietet weder verteilte Skalierung noch die Produktionsisolierung und Verfügbarkeit einer Remote-Bereitstellung.</li>
</ul>
<p>Lesen Sie die <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">versionierten bekannten Einschränkungen</a>, bevor Sie sich auf eine Serverfunktion verlassen, die im lokalen Beispiel nicht genutzt wird.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migration von Daten aus Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">milvus-lite dump</code> “, um eine Sammlung als Milvus-BulkWriter-JSON-Dateien zu exportieren. Diese Dateien können in eine selbst gehostete Milvus-Bereitstellung oder in die Zilliz Cloud importiert werden.</p>
<p>Installieren Sie die Bulk-Writer-Abhängigkeiten des SDK in der Umgebung, in der die Quelldatenbank geöffnet ist:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Schließen Sie die Python-Anwendung, die die lokale Datenbank verwaltet, bevor Sie den Befehl in einem anderen Prozess ausführen. Exportieren Sie die Sammlung aus dem vorangegangenen Beispiel:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>Der Befehl liest „ <code translate="no">demo_collection</code> “ aus dem <strong>Speicherverzeichnis „milvus_demo.db“</strong> und schreibt die Exportdateien unter <strong>„data_dir</strong>“. Importieren Sie diese Dateien mit <a href="/docs/de/import-data.md">„Bulk Insert</a> “ oder <a href="https://docs.zilliz.com/docs/data-import">dem Zilliz Cloud-Datenimport</a>.</p>
<div class="alert note">
<blockquote>
<p>Um eine ursprüngliche 2.x-Datenbankdatei zu exportieren, führen Sie das Dump-Tool in einer Umgebung mit der ursprünglichen Lite-Version aus, die diese Datei öffnen kann. Das 3.x-Dump-Tool konvertiert das alte Speicherformat nicht, indem es es direkt öffnet. Behalten Sie die Quelldatenbank bei, bis Sie die Anzahl der importierten Zeilen und die Suchergebnisse überprüft haben.</p>
</blockquote>
</div>
<p>Informationen zu unterstützten Dump-Optionen und Einschränkungen des Speicherformats finden Sie in der <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite-Exportreferenz</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Was als Nächstes zu tun ist<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Fahren Sie mit folgenden Aufgaben fort:</p>
<ul>
<li><a href="/docs/de/quickstart.md">Schnellstart</a>: Erstellen Sie Embeddings und führen Sie einen Such-Workflow aus.</li>
<li><a href="/docs/de/single-vector-search.md">Einzelvektor-Suche</a> und <a href="/docs/de/multi-vector-search.md">Hybrid-Suche</a>: Entwerfen Sie Abfragen für Ihre Anwendung.</li>
<li><a href="/docs/de/install-overview.md">Wählen Sie eine Bereitstellungsart</a>: Gehen Sie über die lokale Entwicklung hinaus.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: Entdecken Sie die Milvus-GUI für eine Remote-Bereitstellung.</li>
</ul>
