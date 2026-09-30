---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Der SPARSE_INVERTED_INDEX-Index ist ein von Milvus verwendeter Indextyp, der
  der effizienten Speicherung und Suche von spärlichen Vektoren dient. Dieser
  Indextyp nutzt die Prinzipien der invertierten Indizierung, um eine
  hocheffiziente Suchstruktur für spärliche Daten zu schaffen.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>Der „ <code translate="no">SPARSE_INVERTED_INDEX</code> “-Index ist ein von Milvus verwendeter Indextyp zum effizienten Speichern und Durchsuchen spärlicher Vektoren. Er erstellt eine invertierte Struktur aus den von Null verschiedenen Dimensionen in spärlichen Vektoren. Sie können diesen Index für die BM25-Volltextsuche und für die Suche nach spärlichen Einbettungen auf Basis des Skalarprodukts verwenden.</p>
<p>Weitere Informationen zu spärlichen Vektorfeldern, Metriktypen und der Volltextsuche finden Sie unter <a href="/docs/de/sparse_vector.md">„Spärliche Vektoren</a>“, <a href="/docs/de/metric.md">„Metriktypen</a>“ und <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p>
<h2 id="Build-index" class="common-anchor-header">Index erstellen<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Um in Milvus einen „ <code translate="no">SPARSE_INVERTED_INDEX</code> “-Index für ein spärliches Vektorfeld zu erstellen, verwenden Sie die Methode „ <code translate="no">add_index()</code> “ und geben Sie die Parameter „ <code translate="no">index_type</code> “, „ <code translate="no">metric_type</code> “ und „index“ an.</p>
<p>Für die BM25-Volltextsuche erstellen Sie den Index auf dem spärlichen Vektorfeld, das von einer BM25-Funktion generiert wurde. Setzen Sie „ <code translate="no">metric_type</code> “ auf „ <code translate="no">BM25</code> “.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Für die Suche in spärlichen Einbettungen erstellen Sie den Index auf einem spärlichen Vektorfeld, das extern generierte spärliche Vektoren speichert. Setzen Sie „ <code translate="no">metric_type</code> “ auf „ <code translate="no">IP</code> “.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>In den vorstehenden Konfigurationen:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie diesen Wert auf „ <code translate="no">SPARSE_INVERTED_INDEX</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Metrik, die zur Berechnung der Ähnlichkeit zwischen spärlichen Vektoren verwendet wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">BM25</code>: Verwendet die BM25-Relevanzbewertung für die Volltextsuche.</p></li>
<li><p><code translate="no">IP</code> (Skalarprodukt): Misst die Ähnlichkeit von spärlichen Vektoren mithilfe des Skalarprodukts.</p></li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a> “ und <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Der Algorithmus, der zum Erstellen und Abfragen des Indexes verwendet wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: „Document-at-a-Time“-MaxScore-Abfrageverarbeitung. Dies ist die Standardeinstellung für „ <code translate="no">BM25</code> “. Hintergrundinformationen finden Sie unter <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">„Abfrageauswertung: Strategien und Optimierungen</a>“.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: „Document-at-a-Time“-WAND-Abfrageverarbeitung. Dieser Algorithmus eignet sich für kleinere „topK“-Werte oder kürzere Abfragen. Hintergrundinformationen finden Sie unter <a href="https://dl.acm.org/doi/10.1145/956863.956944">„Effiziente Abfrageauswertung mithilfe eines zweistufigen Abrufprozesses</a>“.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Einfache „Term-at-a-Time“-Abfrageverarbeitung. Verwenden Sie diese Option als Ausgangsbasis oder wenn sich die Bewertung dynamisch an globale Sammlungsstatistiken wie die durchschnittliche Dokumentlänge anpassen soll.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: „MaxScore“-Abfrageverarbeitung mit Max-Score-Metadaten auf Blockebene. Hintergrundinformationen finden Sie unter <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">„Schnellere Top-k-Dokumentenabfrage mithilfe von Block-Max-Indizes</a>“.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: WAND-Abfrageverarbeitung mit Max-Score-Metadaten auf Blockebene. Hintergrundinformationen finden Sie unter <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">„Schnellere Top-k-Dokumentenabfrage mithilfe von Block-Max-Indizes</a>“.</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Ein spärlicher invertierter Index auf Basis fester Dokument-ID-Fenster mit SIMD-Beschleunigung für die Suche. Dies ist die Standardeinstellung für „ <code translate="no">IP</code> “. Weitere Informationen finden Sie im <a href="https://arxiv.org/abs/2509.08395">SINDI-Artikel</a>.</p></li>
</ul>
<p>Wenn Sie „ <code translate="no">inverted_index_algo</code> “ nicht angeben, wählt Milvus den Standardalgorithmus basierend auf „ <code translate="no">metric_type</code> “ aus: „ <code translate="no">DAAT_MAXSCORE</code> “ für „ <code translate="no">BM25</code> “ und „ <code translate="no">SINDI</code> “ für „ <code translate="no">IP</code> “.</p>
<p>Weitere Informationen zu den für den Index „ <code translate="no">SPARSE_INVERTED_INDEX</code> “ verfügbaren Erstellungsparametern finden Sie unter <a href="/docs/de/sparse-inverted-index.md#Index-building-params">„Index-Erstellungsparameter</a>“.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode „ <code translate="no">create_index()</code> “ direkt aufrufen oder die Indexparameter an die Methode „ <code translate="no">create_collection</code> “ übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">„Sammlung erstellen</a>“.</p>
<h2 id="Search-on-index" class="common-anchor-header">Suche im Index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald der Index erstellt und die Entitäten eingefügt wurden, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<p>Für die BM25-Volltextsuche verwenden Sie den Rohtext als Abfrage. Milvus wandelt den Abfragetext mithilfe der BM25-Funktion in einen spärlichen Vektor um.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Für die Suche mit spärlichen Einbettungen verwenden Sie ein spärliches Vektorwörterbuch als Abfragevektor.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Standardmäßig verwendet Milvus den für den Index konfigurierten Suchalgorithmus.</p>
<p>Weitere Informationen zu den für den „ <code translate="no">SPARSE_INVERTED_INDEX</code> “-Index verfügbaren Suchparametern finden Sie unter <a href="/docs/de/sparse-inverted-index.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</p>
<h2 id="Index-params" class="common-anchor-header">Indexparameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt bietet einen Überblick über die Parameter, die zum Erstellen eines Indexes und zum Durchführen von Suchvorgängen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter zum Erstellen eines Index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">params</code> “ beim <a href="/docs/de/sparse-inverted-index.md#Build-index">Erstellen eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsempfehlung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Der für die Erstellung und Abfrage des Index verwendete Algorithmus. Er bestimmt, wie der Index Abfragen verarbeitet.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Standardwert: „ <code translate="no">"DAAT_MAXSCORE"</code> “ für „ <code translate="no">BM25</code> “; „ <code translate="no">"SINDI"</code> “ für „ <code translate="no">IP</code> “.</p></td>
     <td><p>Verwenden Sie „ <code translate="no">"DAAT_MAXSCORE"</code> “ für BM25-Volltextsuch-Workloads mit hohen k-Werten oder Abfragen mit vielen Suchbegriffen.</p><p>Verwenden Sie „ <code translate="no">"DAAT_WAND"</code> “ für BM25-Workloads mit kleinen k-Werten oder kurzen Suchanfragen.</p><p>Verwenden Sie „ <code translate="no">"TAAT_NAIVE"</code> “ als Basis oder wenn sich die Bewertung dynamisch an globale Sammlungsstatistiken wie die durchschnittliche Dokumentlänge anpassen soll.</p><p>Verwenden Sie „ <code translate="no">"BLOCK_MAX_MAXSCORE"</code> “ oder „ <code translate="no">"BLOCK_MAX_WAND"</code> “, um Metadaten zum Maximalwert auf Blockebene für das Abfrage-Pruning zu nutzen.</p><p>Verwenden Sie „ <code translate="no">"SINDI"</code> “ für die Suche mit spärlichen Einbettungen in Verbindung mit „ <code translate="no">IP</code> “.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Steuert die Sättigung der Termhäufigkeit für die BM25-Bewertung. Dieser Parameter gilt nur, wenn „ <code translate="no">metric_type</code> “ auf „ <code translate="no">BM25</code> “ gesetzt ist.</p></td>
     <td><p>Empfohlener Bereich: [1,2; 2,0]</p><p>Standardwert: 1,2</p></td>
     <td><p>Erhöhen Sie diesen Wert, um der Termhäufigkeit beim Dokument-Ranking mehr Gewicht zu verleihen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Steuert die Stärke der Normalisierung der Dokumentlänge für die BM25-Bewertung. Dieser Parameter gilt nur, wenn „ <code translate="no">metric_type</code> “ auf „ <code translate="no">BM25</code> “ gesetzt ist.</p></td>
     <td><p>Bereich: [0, 1]</p><p>Standardwert: 0,75</p></td>
     <td><p>Verwenden Sie einen höheren Wert, um eine stärkere Längennormalisierung anzuwenden. Verwenden Sie einen niedrigeren Wert, um den Einfluss der Dokumentlänge auf das Ranking zu verringern.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">search_params.params</code> “ bei <a href="/docs/de/sparse-inverted-index.md#Search-on-index">der Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsvorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Der Anteil der kleinsten Werte, die bei der Suche ignoriert werden sollen, um Störsignale zu reduzieren.</p></td>
     <td><p>Bereich: [0,0; 1,0) (beispielsweise werden bei einem Wert von 0,2 die kleinsten 20 % der Werte ignoriert)</p></td>
     <td><p>Passen Sie diesen Parameter entsprechend der Sparsität und dem Rauschpegel Ihrer Abfragevektoren an.</p><p>Dieser Parameter steuert den Anteil der Werte mit geringer Größe, die bei der Suche verworfen werden. Eine Erhöhung dieses Werts (beispielsweise auf <code translate="no">0.2</code>) kann das Rauschen reduzieren und die Suche auf bedeutendere Komponenten konzentrieren, was die Präzision und Effizienz verbessern kann. Das Verwerfen weiterer Werte kann jedoch auch den Recall verringern, da potenziell relevante Signale ausgeschlossen werden. Wählen Sie einen Wert, der für Ihre Arbeitslast ein ausgewogenes Verhältnis zwischen Recall und Genauigkeit gewährleistet.</p></td>
   </tr>
</table>
