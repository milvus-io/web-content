---
id: mempalace_with_milvus.md
summary: >-
  In diesem Tutorial werden wir mithilfe der MemPalace-CLI eine echte Teilmenge
  der öffentlichen Milvus-Dokumentation extrahieren und in Milvus speichern. Der
  Korpus enthält Dokumentationen zu Analysatoren, Tokenisierern und
  Tokenfiltern. Diese eng miteinander verbundenen Seiten bieten genügend
  Ablenkungselemente, um die Beispiele für den Abruf aussagekräftig zu machen.
title: MemPalace mit Milvus
---
<h1 id="MemPalace-with-Milvus" class="common-anchor-header">MemPalace mit Milvus<button data-href="#MemPalace-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MemPalace/mempalace">MemPalace</a> ist eine Speicherschicht für Programmieragenten und lang andauernde Entwicklungsworkflows. Es organisiert Projektwissen in Flügeln, Räumen und Schubladen und macht die ursprünglichen Inhalte dann über mehrere Sitzungen hinweg durchsuchbar.</p>
<p>In diesem Tutorial werden wir die MemPalace-CLI verwenden, um einen echten Teil der öffentlichen <a href="https://github.com/milvus-io/milvus-docs">Milvus-Dokumentation</a> zu extrahieren und in <a href="https://milvus.io/">Milvus</a> zu speichern. Der Korpus enthält Dokumentation zu Analysatoren, Tokenisierern und Tokenfiltern. Diese eng miteinander verbundenen Seiten bieten genügend Ablenkungselemente, um die Beispiele für die Suche aussagekräftig zu machen.</p>
<p>Das Beispiel verwendet Milvus Lite, sodass es lokal ohne Docker oder einen separaten Datenbankserver ausgeführt wird. Die gleiche MemPalace-Konfiguration kann bei gemeinsam genutzten Bereitstellungen auch auf einen Milvus-Server oder die Zilliz Cloud verweisen.</p>
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
    </button></h2><p>Installieren Sie MemPalace mit den optionalen Milvus-Abhängigkeiten von PyPI. Der Befehl legt bewusst keine bestimmte Version fest, sodass bei einer Neuinstallation die aktuellste verfügbare Version verwendet wird.</p>
<pre><code translate="no" class="language-shell">uv tool install &quot;mempalace[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Außerdem benötigen Sie Git, um den Dokumentationskorpus herunterzuladen.</p>
<p>Dieses Tutorial verwendet das lokale MiniLM-Embedding-Modell von MemPalace, sodass kein externer Modell-API-Schlüssel erforderlich ist. Der erste Mining- oder Suchbefehl lädt möglicherweise ein kleines ONNX-Embedding-Modell herunter.</p>
<h2 id="Configure-the-workspace" class="common-anchor-header">Konfigurieren Sie den Arbeitsbereich<button data-href="#Configure-the-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie einen Arbeitsbereich mit separaten Verzeichnissen für die Dokumentation und den „Palace“:</p>
<pre><code translate="no" class="language-shell">mkdir -p mempalace-milvus-demo
cd mempalace-milvus-demo

export PALACE_DIR=&quot;$PWD/palace&quot;
export DOCS_REPO=&quot;$PWD/milvus-docs&quot;
export PROJECT_DIR=&quot;$PWD/milvus-analyzer-docs&quot;
export MEMPALACE_EMBEDDING_MODEL=&quot;minilm&quot;
export MEMPALACE_EMBEDDING_DEVICE=&quot;cpu&quot;
export MEMPALACE_EMBEDDING_THREADS=&quot;2&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Wir übergeben „ <code translate="no">--backend milvus</code> “ an die unten aufgeführten MemPalace-Befehle. Da keine Remote-Milvus-URI konfiguriert ist, erstellt MemPalace eine lokale Milvus-Lite-Datenbank unter „ <code translate="no">$PALACE_DIR/milvus.db</code> “.</p>
<blockquote>
<p>Was das vom Backend verwendete Argument „ <code translate="no">MilvusClient</code> “ betrifft:</p>
<ul>
<li>Die bequemste Option ist es, ` <code translate="no">uri</code> ` auf einen lokalen Pfad wie <code translate="no">./milvus.db</code> zu setzen. Dadurch werden die Daten automatisch lokal mit <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> gespeichert.</li>
<li>Für eine größere Bereitstellung können Sie einen <a href="https://milvus.io/docs/quickstart.md">Milvus-Server</a> verwenden und die URI auf dessen Endpunkt setzen, z. B. <code translate="no">http://localhost:19530</code>.</li>
<li>Um <a href="https://zilliz.com/cloud">die Zilliz Cloud</a> zu nutzen, legen Sie die URI und das Token auf den <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und den API-Schlüssel</a> des Clusters fest.</li>
</ul>
</blockquote>
<h2 id="Download-the-Milvus-documentation-corpus" class="common-anchor-header">Laden Sie den Milvus-Dokumentationskorpus herunter<button data-href="#Download-the-Milvus-documentation-corpus" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Milvus-Dokumentations-Repository ist wesentlich umfangreicher, als für dieses Beispiel erforderlich. Verwenden Sie „Git sparse checkout“, um nur das Verzeichnis mit der Analyzer-Dokumentation aus dem Zweig „ <code translate="no">v3.0.x</code> “ herunterzuladen:</p>
<pre><code translate="no" class="language-shell">git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  --branch v3.0.x \
  https://github.com/milvus-io/milvus-docs.git \
  &quot;$DOCS_REPO&quot;

git -C &quot;$DOCS_REPO&quot; sparse-checkout set \
  site/en/userGuide/schema/analyzer

cp -R \
  &quot;$DOCS_REPO/site/en/userGuide/schema/analyzer&quot; \
  &quot;$PROJECT_DIR&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Zum Zeitpunkt der Erstellung dieses Artikels enthält dieses Verzeichnis 31 Markdown-Seiten. Dazu gehören allgemeine Analyzer-Anleitungen sowie drei Gruppen eng miteinander verbundener Seiten:</p>
<pre><code translate="no" class="language-text">milvus-analyzer-docs/
├── analyzer/       # Built-in language analyzers
├── filter/         # Token filters
├── tokenizer/      # Tokenizers
└── *.md            # Analyzer overviews and selection guides
<button class="copy-code-btn"></button></code></pre>
<p>Überprüfen Sie die Anzahl der Quellseiten:</p>
<pre><code translate="no" class="language-shell">find &quot;$PROJECT_DIR&quot; -type f -name &quot;*.md&quot; | wc -l
<button class="copy-code-btn"></button></code></pre>
<p>Referenzausgabe:</p>
<pre><code translate="no" class="language-text">31
<button class="copy-code-btn"></button></code></pre>
<p>Die genaue Anzahl kann sich ändern, sobald der Milvus-Dokumentationszweig aktualisiert wird.</p>
<h2 id="Define-the-MemPalace-rooms" class="common-anchor-header">Definieren der MemPalace-Räume<button data-href="#Define-the-MemPalace-rooms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace kann Räume während des „ <code translate="no">mempalace init</code> “ erkennen, doch sein Initialisierungsablauf führt auch eine projektweite heuristische Entitätsklassifizierung durch und schreibt die akzeptierten Ergebnisse in ein Entitätsregister. Dieser Klassifizierungsschritt ist für die Definition dieses Dokumentationskorpus nicht erforderlich, daher stellen wir die kleine Taxonomie direkt zur Verfügung. Während des Mining-Vorgangs fügt MemPalace möglicherweise weiterhin deterministische heuristische Entitätsmetadaten hinzu und erstellt interne Verknüpfungen; diese Zuordnungen haben keinen Einfluss darauf, welcher Raum eine Datei erhält, und ändern auch nichts an den unten aufgeführten raumbezogenen Suchvorgängen.</p>
<p>Erstellen Sie die Datei „ <code translate="no">$PROJECT_DIR/mempalace.yaml</code> “ mit folgendem Inhalt:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">wing:</span> <span class="hljs-string">milvus_analyzer_docs</span>
<span class="hljs-attr">rooms:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">analyzer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Built-in</span> <span class="hljs-string">language</span> <span class="hljs-string">analyzers</span> <span class="hljs-string">and</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">selection</span> <span class="hljs-string">guides</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">analyzer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">filter</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Token</span> <span class="hljs-string">filters</span> <span class="hljs-string">used</span> <span class="hljs-string">in</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">pipelines</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">filter</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">tokenizer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Tokenizers</span> <span class="hljs-string">and</span> <span class="hljs-string">language</span> <span class="hljs-string">identification</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">tokenizer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">general</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Analyzer</span> <span class="hljs-string">documentation</span> <span class="hljs-string">that</span> <span class="hljs-string">does</span> <span class="hljs-string">not</span> <span class="hljs-string">fit</span> <span class="hljs-string">another</span> <span class="hljs-string">room</span>
    <span class="hljs-attr">keywords:</span> []
<button class="copy-code-btn"></button></code></pre>
<p>Der „Flügel“ (wing) repräsentiert den gesamten Dokumentationskorpus. Ein „Raum“ (room) repräsentiert einen Themenbereich. MemPalace leitet eine Datei weiter, indem es zunächst das Verzeichnis, dann den Dateinamen und schließlich die Raum-Schlüsselwörter im Inhalt überprüft. Eine Datei unter <code translate="no">filter/</code> gelangt beispielsweise direkt in den Raum „ <code translate="no">filter</code> “.</p>
<p>Jede Datei wird anschließend in überlappende Textblöcke aufgeteilt. Jeder Block wird zu einer Schublade, die den wörtlichen Markdown-Text und Metadaten wie „ <code translate="no">wing</code> “, „ <code translate="no">room</code> “, „ <code translate="no">source_file</code> “, „ <code translate="no">chunk_index</code> “ sowie Quellzeilennummern enthält. Die Räume und Schubladen bleiben logische Metadaten innerhalb der Milvus-Sammlungen von MemPalace; MemPalace erstellt nicht für jeden Raum eine separate Milvus-Sammlung.</p>
<h2 id="Mine-the-documentation-into-Milvus" class="common-anchor-header">Die Dokumentation in Milvus einlesen<button data-href="#Mine-the-documentation-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Projekt mit dem Milvus-Backend extrahieren:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  mine &quot;$PROJECT_DIR&quot; \
  --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>Referenzausgabe aus dem validierten Dokumentations-Snapshot:</p>
<pre><code translate="no" class="language-text">=======================================================
  Done.
  Files processed: 31
  Files skipped (already filed or other): 0
  Drawers filed: 473

  By room:
    filter               16 files
    analyzer              8 files
    tokenizer             7 files
=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>MemPalace liest das Markdown, ohne es zusammenzufassen oder umzuschreiben, berechnet lokale Einbettungen und speichert die „Drawers“ in Milvus. Bei dem getesteten Dokumentations-Snapshot ergaben 31 Dateien 473 „Drawers“.</p>
<p>Überprüfen Sie die resultierenden Räume und die Anzahl der Ordner:</p>
<pre><code translate="no" class="language-shell">mempalace --palace &quot;$PALACE_DIR&quot; status --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>Referenzausgabe:</p>
<pre><code translate="no" class="language-text">=======================================================
  MemPalace Status -- 473 drawers
=======================================================

  WING: milvus_analyzer_docs
    ROOM: analyzer               212 drawers
    ROOM: filter                 156 drawers
    ROOM: tokenizer              105 drawers

=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>Die genaue Anzahl der „Drawer“ kann sich ändern, wenn sich die übergeordnete Dokumentation ändert, da längere Seiten mehr „Chunks“ erzeugen.</p>
<h2 id="Semantic-search" class="common-anchor-header">Semantische Suche<button data-href="#Semantic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">mempalace search</code> “, um Dokumentation nach Bedeutung abzurufen. Die folgende Frage nennt keine bestimmte Datei oder Analyzer-Funktion:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How should I analyze documents that mix several languages?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Referenzausgabe (Ergebnisse können variieren):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How should I analyze documents that mix several languages?&quot;
Wing: milvus_analyzer_docs

[1] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
    Match: cosine_sim=0.334 bm25=2.469
[2] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
[3] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
<button class="copy-code-btn"></button></code></pre>
<p>Im validierten Durchlauf stammten alle drei Ergebnisse von „ <code translate="no">multi-language-analyzers.md</code> “, obwohl der Korpus auch Seiten zu einzelnen Sprachanalysatoren, Tokenizern und Filtern enthielt.</p>
<h2 id="Search-within-a-room" class="common-anchor-header">Suche innerhalb eines Raums<button data-href="#Search-within-a-room" class="anchor-icon" translate="no">
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
    </button></h2><p>Raumfilter sind nützlich, wenn verwandte Konzepte im gesamten Korpus vorkommen. Die folgende Abfrage durchsucht nur den Raum „ <code translate="no">filter</code> “ nach einer Möglichkeit, gleichwertige Begriffe abzugleichen:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How can equivalent terms such as USA and United States match one another?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room filter \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Referenzausgabe (Ergebnisse können variieren):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How can equivalent terms such as USA and United States match one another?&quot;
Wing: milvus_analyzer_docs
Room: filter

[1] milvus_analyzer_docs / filter
    Source: synonym-filter.md
    Match: cosine_sim=0.765 bm25=2.573
[2] milvus_analyzer_docs / filter
    Source: stemmer-filter.md
[3] milvus_analyzer_docs / filter
    Source: stop-filter.md
<button class="copy-code-btn"></button></code></pre>
<p>Das oberste Ergebnis sollte von <code translate="no">synonym-filter.md</code> stammen. Die Raum-Einschränkung wird vor der Vektorsuche über die Metadaten der Schubladen angewendet, sodass Schubladen mit Tokenizern und Sprachanalysatoren von dieser Suche ausgeschlossen sind.</p>
<h2 id="Search-for-exact-terms" class="common-anchor-header">Suche nach exakten Begriffen<button data-href="#Search-for-exact-terms" class="anchor-icon" translate="no">
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
    </button></h2><p>Die MemPalace-CLI kombiniert bei der Rangfolge der Kandidaten der Vektorsuche semantische Ähnlichkeit mit BM25-Signalen. Exakte Konfigurations- und Merkmalsnamen können daher die Rangfolge verbessern, ohne dass in einen separaten CLI-Suchmodus gewechselt werden muss.</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;language_identifier tokenizer&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room tokenizer \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Beispielausgabe (Ergebnisse können variieren):</p>
<pre><code translate="no" class="language-text">Results for: &quot;language_identifier tokenizer&quot;
Wing: milvus_analyzer_docs
Room: tokenizer

[1] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
    Match: cosine_sim=0.420 bm25=0.969
[2] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
[3] milvus_analyzer_docs / tokenizer
    Source: lindera-tokenizer.md
<button class="copy-code-btn"></button></code></pre>
<p>Die Ergebnisse sollten „ <code translate="no">language-identifier.md</code> “ bevorzugen, das den „ <code translate="no">language_identifier</code> “-Tokenizer dokumentiert, der zur Auswahl von Analysatoren auf Basis der erkannten Sprache verwendet wird.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">Überprüfen Sie die Milvus-Sammlungen<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace verwaltet sein Milvus-Schema automatisch. Um zu überprüfen, was gespeichert wurde, speichern Sie das folgende Skript unter <code translate="no">inspect_milvus.py</code>. Es öffnet dieselbe Milvus-Lite-Datenbank, überprüft die Sammlungen und zählt die Schubladen pro Raum:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


client = MilvusClient(uri=os.environ[<span class="hljs-string">&quot;MEMPALACE_MILVUS_LITE_PATH&quot;</span>])

<span class="hljs-keyword">for</span> collection_name <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(client.list_collections()):
    stats = client.get_collection_stats(collection_name)
    schema = client.describe_collection(collection_name)
    fields = [field[<span class="hljs-string">&quot;name&quot;</span>] <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> schema[<span class="hljs-string">&quot;fields&quot;</span>]]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{collection_name}</span>: rows=<span class="hljs-subst">{stats[<span class="hljs-string">&#x27;row_count&#x27;</span>]}</span>, fields=<span class="hljs-subst">{fields}</span>&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;mempalace_drawers&quot;</span>)
rows = client.query(
    collection_name=<span class="hljs-string">&quot;mempalace_drawers&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;metadata[&quot;wing&quot;] == &quot;milvus_analyzer_docs&quot;&#x27;</span>,
    limit=<span class="hljs-number">2000</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
)
room_counts = Counter(row[<span class="hljs-string">&quot;metadata&quot;</span>][<span class="hljs-string">&quot;room&quot;</span>] <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Drawers by room:&quot;</span>, <span class="hljs-built_in">dict</span>(<span class="hljs-built_in">sorted</span>(room_counts.items())))
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie das Skript mit demselben optionalen Abhängigkeitssatz aus, der auch von der CLI verwendet wird:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_LITE_PATH=&quot;$PALACE_DIR/milvus.db&quot;
uv run --with &quot;mempalace[milvus]&quot; inspect_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>Beispielausgabe:</p>
<pre><code translate="no" class="language-text">mempalace_closets: rows=74, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
mempalace_drawers: rows=473, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
Drawers by room: {&#x27;analyzer&#x27;: 212, &#x27;filter&#x27;: 156, &#x27;tokenizer&#x27;: 105}
<button class="copy-code-btn"></button></code></pre>
<p>Für den getesteten Dokumentations-Snapshot enthielt <code translate="no">mempalace_drawers</code> 473 Zeilen und <code translate="no">mempalace_closets</code> 74 interne Navigationsdatensätze. Die Anzahl der Schränke und Schubladen muss nicht übereinstimmen. Die Metadaten zu den Schubladen zeigten 212 Schubladen in <code translate="no">analyzer</code>, 156 in <code translate="no">filter</code> und 105 in <code translate="no">tokenizer</code>.</p>
<p>Diese Überprüfung läuft in einem neuen Prozess ab und öffnet die von der CLI erstellte Datenbank erneut, was ebenfalls bestätigt, dass die Daten über verschiedene Befehle hinweg erhalten bleiben.</p>
<h2 id="Optional-use-Milvus-server-or-Zilliz-Cloud" class="common-anchor-header">Optional: Milvus-Server oder Zilliz Cloud verwenden<button data-href="#Optional-use-Milvus-server-or-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Für eine gemeinsam genutzte Bereitstellung legen Sie die Milvus-Verbindungsumgebungsvariablen fest, bevor Sie dieselben MemPalace-CLI-Befehle ausführen. Lassen Sie sie ungesetzt, um die oben gezeigte lokale Milvus-Lite-Datenbank zu verwenden.</p>
<p>Für den Milvus-Server:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;http://localhost:19530&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Für die Zilliz Cloud:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;https://your-cluster.api.region.zillizcloud.com&quot;
export MEMPALACE_MILVUS_TOKEN=&quot;your-api-key&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Die End-to-End-Befehle in diesem Tutorial wurden mit Milvus Lite validiert. Die oben genannten Server- und Cloud-Einstellungen sind optionale Bereitstellungskonfigurationen und waren für die lokale Validierung nicht erforderlich.</p>
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace bietet Agenten eine strukturierte Möglichkeit, Projektwissen zu bewahren: Ein „Flügel“ unterteilt den Korpus, „Räume“ bieten einen Themenbereich und „Schubladen“ bewahren den ursprünglichen Quelltext. In diesem Beispiel werden 31 eng miteinander verbundene Milvus-Dokumentationsseiten zu Hunderten von durchsuchbaren Schubladen statt zu einigen wenigen handschriftlichen Einträgen. Milvus stellt hinter dieser Struktur eine dauerhafte Speicherung von Vektoren, spärlichen Daten, Text und Metadaten bereit.</p>
