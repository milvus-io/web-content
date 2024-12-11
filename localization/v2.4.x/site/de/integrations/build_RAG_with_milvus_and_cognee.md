---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie mit Milvus und Cognee eine
  RAG-Pipeline (Retrieval-Augmented Generation) aufbauen können.
title: RAG mit Milvus und Cognee aufbauen
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">RAG mit Milvus und Cognee entwickeln</h3><p><a href="https://www.cognee.ai">Cognee</a> ist eine auf Entwickler ausgerichtete Plattform, die die Entwicklung von KI-Anwendungen mit skalierbaren, modularen ECL-Pipelines (Extract, Cognify, Load) rationalisiert. Durch die nahtlose Integration mit Milvus ermöglicht Cognee eine effiziente Verbindung und Abfrage von Gesprächen, Dokumenten und Transkriptionen, wodurch Halluzinationen reduziert und Betriebskosten optimiert werden.</p>
<p>Durch die Unterstützung von Vektorspeichern wie Milvus, Graphdatenbanken und LLMs bietet Cognee ein flexibles und anpassbares Framework für den Aufbau von RAG-Systemen (Retrieval-Augmented Generation). Seine produktionsreife Architektur gewährleistet eine verbesserte Genauigkeit und Effizienz für KI-gestützte Anwendungen.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie eine RAG-Pipeline (Retrieval-Augmented Generation) mit Milvus und Cognee erstellen.</p>
<pre><code translate="no" class="language-shell">$ pip install pymilvus git+<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Bildschirmrand und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</blockquote>
<p>Standardmäßig wird in diesem Beispiel OpenAI als LLM verwendet. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">Api-Schlüssel</a> vorbereiten und ihn in der Funktion config <code translate="no">set_llm_api_key()</code> einstellen.</p>
<p>Um Milvus als Vektordatenbank zu konfigurieren, setzen Sie <code translate="no">VECTOR_DB_PROVIDER</code> auf <code translate="no">milvus</code> und geben Sie <code translate="no">VECTOR_DB_URL</code> und <code translate="no">VECTOR_DB_KEY</code> an. Da wir in dieser Demo Milvus Lite zum Speichern von Daten verwenden, muss nur die <code translate="no">VECTOR_DB_URL</code> angegeben werden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.<span class="hljs-property">config</span>.<span class="hljs-title function_">set_llm_api_key</span>(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Was die Umgebungsvariablen <code translate="no">VECTOR_DB_URL</code> und <code translate="no">VECTOR_DB_KEY</code> betrifft:</p>
<ul>
<li>Die Einstellung von <code translate="no">VECTOR_DB_URL</code> als lokale Datei, z. B.<code translate="no">./milvus.db</code>, ist die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> nutzt, um alle Daten in dieser Datei zu speichern.</li>
<li>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-Uri, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">VECTOR_DB_URL</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, nutzen möchten, passen Sie <code translate="no">VECTOR_DB_URL</code> und <code translate="no">VECTOR_DB_KEY</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Bereiten Sie die Daten vor</h3><p>Wir verwenden die FAQ-Seiten aus der <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus-Dokumentation 2.4.x</a> als privates Wissen in unserer RAG, was eine gute Datenquelle für eine einfache RAG-Pipeline ist.</p>
<p>Laden Sie die Zip-Datei herunter und entpacken Sie die Dokumente in den Ordner <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>Wir laden alle Markdown-Dateien aus dem Ordner <code translate="no">milvus_docs/en/faq</code>. Für jedes Dokument verwenden wir einfach &quot;# &quot;, um den Inhalt in der Datei zu trennen, wodurch der Inhalt jedes Hauptteils der Markdown-Datei grob getrennt werden kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAG erstellen<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Zurücksetzen der Cognee-Daten</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Jetzt können wir unseren Datensatz hinzufügen und ihn zu einem Wissensgraphen verarbeiten.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">Hinzufügen von Daten und Erkennen</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Methode <code translate="no">add</code> lädt den Datensatz (Milvus FAQs) in Cognee und die Methode <code translate="no">cognify</code> verarbeitet die Daten, um Entitäten, Beziehungen und Zusammenfassungen zu extrahieren und einen Wissensgraphen zu erstellen.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">Abfrage nach Zusammenfassungen</h3><p>Nun, da die Daten verarbeitet wurden, können wir den Wissensgraphen abfragen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>Diese Abfrage durchsucht den Wissensgraphen nach einer Zusammenfassung, die mit dem Abfragetext in Beziehung steht, und der am meisten in Beziehung stehende Kandidat wird gedruckt.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">Abfrage nach Chunks</h3><p>Zusammenfassungen bieten Einblicke auf hoher Ebene, aber für detailliertere Informationen können wir bestimmte Datenpakete direkt aus dem verarbeiteten Datensatz abfragen. Diese Chunks werden aus den ursprünglichen Daten abgeleitet, die während der Erstellung des Wissensgraphen hinzugefügt und analysiert wurden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.<span class="hljs-property">api</span>.<span class="hljs-property">v1</span>.<span class="hljs-property">search</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">SearchType</span>

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchType</span>.<span class="hljs-property">CHUNKS</span>, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>Formatieren und zeigen wir sie zur besseren Lesbarkeit an!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>In den vorangegangenen Schritten haben wir den Milvus-FAQ-Datensatz sowohl nach Zusammenfassungen als auch nach bestimmten Datenpaketen abgefragt. Dies lieferte zwar detaillierte Einblicke und granulare Informationen, aber der Datensatz war groß, so dass es schwierig war, die Abhängigkeiten innerhalb des Wissensgraphen klar zu visualisieren.</p>
<p>Um dieses Problem zu lösen, werden wir die Cognee-Umgebung zurücksetzen und mit einem kleineren, gezielteren Datensatz arbeiten. Dadurch können wir die Beziehungen und Abhängigkeiten, die während des Cognify-Prozesses extrahiert wurden, besser darstellen. Durch die Vereinfachung der Daten können wir klar erkennen, wie Cognee die Informationen im Wissensgraphen organisiert und strukturiert.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Cognee zurücksetzen</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">Hinzufügen des fokussierten Datensatzes</h3><p>Hier wird ein kleinerer Datensatz mit nur einer Textzeile hinzugefügt und verarbeitet, um einen fokussierten und leicht interpretierbaren Wissensgraphen zu erhalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">Abfrage nach Einblicken</h3><p>Durch die Fokussierung auf diesen kleineren Datensatz können wir nun die Beziehungen und Strukturen innerhalb des Wissensgraphen klar analysieren.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = await cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text in search_results:
    <span class="hljs-built_in">print</span>(result_text)

# Example output:
# ({<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;natural language processing&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;</span>}, {<span class="hljs-string">&#x27;relationship_name&#x27;</span>: <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>, <span class="hljs-string">&#x27;source_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;target_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">15</span>, <span class="hljs-number">473137</span>, tzinfo=datetime.timezone.utc)}, {<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;computer science&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;The study of computation and information processing.&#x27;</span>})
# (...)
#
# It represents nodes and relationships in the knowledge graph:
# - The first element is the source node (e.g., <span class="hljs-string">&#x27;natural language processing&#x27;</span>).
# - The second element is the relationship between nodes (e.g., <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>).
# - The third element is the target node (e.g., <span class="hljs-string">&#x27;computer science&#x27;</span>).
<button class="copy-code-btn"></button></code></pre>
<p>Diese Ausgabe stellt die Ergebnisse einer Wissensgraphenabfrage dar und zeigt die Entitäten (Knoten) und ihre Beziehungen (Kanten), wie sie aus dem verarbeiteten Datensatz extrahiert wurden. Jedes Tupel enthält eine Quell-Entität, einen Beziehungstyp und eine Ziel-Entität, zusammen mit Metadaten wie eindeutigen IDs, Beschreibungen und Zeitstempeln. Der Graph hebt die wichtigsten Konzepte und ihre semantischen Verbindungen hervor und bietet ein strukturiertes Verständnis des Datensatzes.</p>
<p>Herzlichen Glückwunsch, Sie haben die grundlegende Verwendung von cognee mit Milvus gelernt. Wenn Sie mehr über die fortgeschrittene Nutzung von cognee erfahren möchten, besuchen Sie bitte die offizielle <a href="https://github.com/topoteretes/cognee">Seite</a>.</p>
