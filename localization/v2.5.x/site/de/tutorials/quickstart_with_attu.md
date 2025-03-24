---
id: quickstart_with_attu.md
summary: >-
  Attu ist ein umfassendes Open-Source-Verwaltungstool für Milvus. Es verfügt
  über eine intuitive grafische Benutzeroberfläche (GUI), die Ihnen eine
  einfache Interaktion mit Ihren Datenbanken ermöglicht. Mit nur wenigen Klicks
  können Sie den Status Ihres Clusters visualisieren, Metadaten verwalten,
  Datenabfragen durchführen und vieles mehr.
title: System zur Beantwortung von Fragen
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Schnellstart mit Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Einführung<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> ist ein umfassendes Open-Source-Verwaltungstool für Milvus. Es verfügt über eine intuitive grafische Benutzeroberfläche (GUI), die Ihnen eine einfache Interaktion mit Ihren Datenbanken ermöglicht. Mit nur wenigen Klicks können Sie den Status Ihres Clusters visualisieren, Metadaten verwalten, Datenabfragen durchführen und vieles mehr.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Desktop-Anwendung installieren<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Laden Sie die Desktop-Version von Attu herunter, indem Sie die <a href="https://github.com/zilliztech/attu/releases">Attu GitHub Releases-Seite</a> besuchen. Wählen Sie die entsprechende Version für Ihr Betriebssystem aus und folgen Sie den Installationsschritten.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Hinweis für macOS (Chip der M-Serie):</h3><p>Wenn Sie auf den Fehler stoßen:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie den folgenden Befehl im Terminal aus, um dieses Problem zu umgehen:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Verbinden mit Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu unterstützt sowohl die Verbindung zu <strong>Milvus Standalone</strong> als auch zu <strong>Zilliz Cloud</strong> und bietet so die Flexibilität, mit lokalen oder in der Cloud gehosteten Datenbanken zu arbeiten.</p>
<p>Um Milvus Standalone lokal zu verwenden:</p>
<ol>
<li>Starten Sie Milvus Standalone, indem Sie der <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus-Installationsanleitung</a> folgen.</li>
<li>Öffnen Sie Attu und geben Sie die Verbindungsinformationen ein:<ul>
<li>Milvus-Adresse: Ihre Milvus Standalone-Server-URI, z. B. http://localhost:19530</li>
<li>Andere optionale Einstellungen: Sie können diese je nach Ihren Milvus-Konfigurationen einstellen oder sie einfach als Standard belassen.</li>
</ul></li>
<li>Klicken Sie auf Verbinden, um auf Ihre Datenbank zuzugreifen.</li>
</ol>
<blockquote>
<p>Sie können auch das vollständig verwaltete Milvus auf der <a href="https://zilliz.com/cloud">Zilliz Cloud</a> verbinden. Setzen Sie einfach <code translate="no">Milvus Address</code> und <code translate="no">token</code> auf den <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und den API-Schlüssel</a> Ihrer Zilliz Cloud-Instanz.</p>
</blockquote>
<ol start="4">
<li>Klicken Sie auf , um auf Ihre Datenbank zuzugreifen.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Daten vorbereiten, Sammlung erstellen und Daten einfügen<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Bereiten Sie die Daten vor</h3><p>Wir verwenden die FAQ-Seiten aus der <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus-Dokumentation 2.4.x</a> als Datensatz für dieses Beispiel.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Daten herunterladen und extrahieren:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Markdown-Dateien verarbeiten:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Einbettungen generieren</h3><p>Definieren Sie ein Einbettungsmodell, um Texteinbettungen unter Verwendung von <code translate="no">milvus_model</code> zu generieren. Wir verwenden das Modell <code translate="no">DefaultEmbeddingFunction</code> als Beispiel, das ein vortrainiertes und leichtgewichtiges Einbettungsmodell ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Ausgabe:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Sammlung erstellen</h3><p>Verbinden Sie sich mit Milvus und erstellen Sie eine Sammlung:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Daten einfügen</h3><p>Iterieren Sie durch die Textzeilen, erstellen Sie Einbettungen und fügen Sie die Daten in Milvus ein:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Daten und Schema visualisieren</h3><p>Nun können wir das Datenschema und die eingefügten Entitäten mit Hilfe der Attu-Schnittstelle visualisieren. Das Schema zeigt definierte Felder an, darunter ein <code translate="no">id</code> Feld vom Typ <code translate="no">Int64</code> und ein <code translate="no">vector</code> Feld vom Typ <code translate="no">FloatVector(768)</code> mit einer <code translate="no">Inner Product (IP)</code> Metrik. Die Sammlung ist mit <strong>72 Entitäten</strong> geladen.</p>
<p>Darüber hinaus können die eingefügten Daten angezeigt werden, einschließlich ID, Vektoreinbettungen und dynamische Felder, die Metadaten wie Textinhalte speichern. Die Schnittstelle unterstützt die Filterung und Abfrage auf der Grundlage bestimmter Bedingungen oder dynamischer Felder.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Visualisierung von Suchergebnissen und Zusammenhängen<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu bietet eine leistungsstarke Schnittstelle zur Visualisierung und Erkundung von Datenbeziehungen. Um die eingefügten Datenpunkte und ihre Ähnlichkeitsbeziehungen zu untersuchen, gehen Sie wie folgt vor:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Durchführen einer Suche</strong></h3><p>Navigieren Sie zur Registerkarte <strong>Vektorsuche</strong> in Attu.</p>
<ol>
<li>Klicken Sie auf die Schaltfläche <strong>Zufallsdaten generieren</strong>, um Testabfragen zu erstellen.</li>
<li>Klicken Sie auf <strong>Suchen</strong>, um die Ergebnisse auf der Grundlage der generierten Daten abzurufen.</li>
</ol>
<p>Die Ergebnisse werden in einer Tabelle mit IDs, Ähnlichkeitswerten und dynamischen Feldern für jede übereinstimmende Entität angezeigt.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Untersuchen von Datenbeziehungen</strong></h3><p>Klicken Sie auf die Schaltfläche <strong>Erkunden</strong> im Ergebnisbereich, um die Beziehungen zwischen dem Suchvektor und den Suchergebnissen in einer <strong>wissensgraphenähnlichen Struktur</strong> zu visualisieren.</p>
<ul>
<li>Der <strong>zentrale Knoten</strong> stellt den Suchvektor dar.</li>
<li>Die <strong>verbundenen Knoten</strong> stellen die Suchergebnisse dar. Wenn Sie auf sie klicken, werden die detaillierten Informationen des entsprechenden Knotens angezeigt.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Erweitern des Graphen</strong></h3><p>Doppelklicken Sie auf einen beliebigen Ergebnisknoten, um seine Verbindungen zu erweitern. Dadurch werden zusätzliche Beziehungen zwischen dem ausgewählten Knoten und anderen Datenpunkten in der Sammlung sichtbar, wodurch ein <strong>größerer, miteinander verbundener Wissensgraph</strong> entsteht.</p>
<p>Diese erweiterte Ansicht ermöglicht eine genauere Untersuchung der Beziehungen zwischen den Datenpunkten auf der Grundlage der Vektorähnlichkeit.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Fazit<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu vereinfacht die Verwaltung und Visualisierung der in Milvus gespeicherten Vektordaten. Von der Dateneingabe über die Ausführung von Abfragen bis hin zur interaktiven Erkundung bietet es eine intuitive Schnittstelle für die Bearbeitung komplexer Vektorsuchaufgaben. Mit Funktionen wie der Unterstützung dynamischer Schemata, grafischen Suchvisualisierungen und flexiblen Abfragefiltern versetzt Attu die Benutzer in die Lage, große Datensätze effektiv zu analysieren.</p>
<p>Mit den visuellen Explorationswerkzeugen von Attu können Benutzer ihre Daten besser verstehen, versteckte Beziehungen erkennen und datengestützte Entscheidungen treffen. Beginnen Sie noch heute damit, Ihre eigenen Daten mit Attu und Milvus zu erforschen!</p>
<hr>
