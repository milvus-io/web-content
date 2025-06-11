---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Der SPARSE_INVERTED_INDEX-Index ist ein Index-Typ, der von Milvus verwendet
  wird, um spärliche Vektoren effizient zu speichern und zu durchsuchen. Dieser
  Indextyp macht sich die Prinzipien der invertierten Indizierung zunutze, um
  eine hocheffiziente Suchstruktur für spärliche Daten zu schaffen. Für weitere
  Informationen, siehe INVERTED.
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
    </button></h1><p>Der <code translate="no">SPARSE_INVERTED_INDEX</code> Index ist ein Index-Typ, der von Milvus verwendet wird, um spärliche Vektoren effizient zu speichern und zu durchsuchen. Dieser Indextyp nutzt die Prinzipien der invertierten Indizierung, um eine hocheffiziente Suchstruktur für spärliche Daten zu erstellen. Für weitere Informationen, siehe <a href="/docs/de/inverted.md">INVERTED</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">SPARSE_INVERTED_INDEX</code> Index für ein spärliches Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Metrik, die zur Berechnung der Ähnlichkeit zwischen spärlichen Vektoren verwendet wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">IP</code> (Inneres Produkt): Misst die Ähnlichkeit anhand des Punktprodukts.</p></li>
<li><p><code translate="no">BM25</code>: Wird in der Regel für die Volltextsuche verwendet, wobei der Schwerpunkt auf der textuellen Ähnlichkeit liegt.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a> und <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Der Algorithmus, der für den Aufbau und die Abfrage des Indexes verwendet wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (Standard): Optimierte Document-at-a-Time (DAAT)-Abfrageverarbeitung unter Verwendung des MaxScore-Algorithmus. MaxScore bietet eine bessere Leistung für hohe <em>k-Werte</em> oder Abfragen mit vielen Begriffen, indem Begriffe und Dokumente übersprungen werden, die wahrscheinlich nur geringe Auswirkungen haben. Dies wird erreicht, indem Begriffe auf der Grundlage ihrer maximalen Trefferquote in wesentliche und nicht wesentliche Gruppen unterteilt werden, wobei der Schwerpunkt auf Begriffen liegt, die zu den Top-k-Ergebnissen beitragen können.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Optimierte Verarbeitung von DAAT-Anfragen mit dem WAND-Algorithmus. WAND wertet weniger Trefferdokumente aus, indem es die maximalen Impact-Scores nutzt, um nicht konkurrierende Dokumente zu überspringen, aber es hat einen höheren Overhead pro Treffer. Dadurch ist WAND effizienter für Abfragen mit kleinen <em>k-Werten</em> oder kurzen Abfragen, bei denen das Überspringen von Dokumenten praktikabler ist.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Basic Term-at-a-Time (TAAT) Abfrageverarbeitung. Obwohl er im Vergleich zu <code translate="no">DAAT_MAXSCORE</code> und <code translate="no">DAAT_WAND</code> langsamer ist, bietet <code translate="no">TAAT_NAIVE</code> einen einzigartigen Vorteil. Im Gegensatz zu DAAT-Algorithmen, die zwischengespeicherte Maximalwerte verwenden, die unabhängig von Änderungen des globalen Sammelparameters (avgdl) statisch bleiben, passt sich <code translate="no">TAAT_NAIVE</code> dynamisch an solche Änderungen an.</p></li>
</ul>
<p>Weitere Informationen über die für den Index <code translate="no">SPARSE_INVERTED_INDEX</code> verfügbaren Erstellungsparameter finden Sie unter <a href="/docs/de/sparse-inverted-index.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Indexparameter in der Methode <code translate="no">create_collection</code> übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
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
    </button></h2><p>Sobald der Index erstellt und die Entitäten eingefügt sind, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: Feinabstimmung der Suchleistung durch Angabe des Anteils kleiner Vektorwerte, die während des Suchvorgangs ignoriert werden sollen. Bei <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> werden beispielsweise die kleinsten 20% der Werte im Abfragevektor bei der Suche ignoriert.</li>
</ul>
<p>Weitere Suchparameter, die für den Index <code translate="no">SPARSE_INVERTED_INDEX</code> verfügbar sind, finden Sie unter <a href="/docs/de/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">Indexspezifische Suchparameter</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Index-Parameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt gibt einen Überblick über die Parameter, die für den Aufbau eines Index und die Durchführung von Suchen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/sparse-inverted-index.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Der Algorithmus, der für den Aufbau und die Abfrage des Indexes verwendet wird. Er bestimmt, wie der Index Abfragen verarbeitet.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (Voreinstellung), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Verwenden Sie <code translate="no">"DAAT_MAXSCORE"</code> für Szenarien mit hohen k-Werten oder Abfragen mit vielen Begriffen, die vom Überspringen nicht-kompetitiver Dokumente profitieren können. 
 Wählen Sie <code translate="no">"DAAT_WAND"</code> für Abfragen mit kleinen k-Werten oder kurzen Abfragen, um ein effizienteres Überspringen zu ermöglichen.</p>
<p>Verwenden Sie <code translate="no">"TAAT_NAIVE"</code>, wenn eine dynamische Anpassung an Sammlungsänderungen (z. B. avgdl) erforderlich ist.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/sparse-inverted-index.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Der Anteil der kleinsten Werte, der bei der Suche ignoriert wird, um das Rauschen zu reduzieren.</p></td>
     <td><p>Anteil zwischen 0,0 und 1,0 (z. B. werden bei 0,2 die kleinsten 20 % der Werte ignoriert)</p></td>
     <td><p>Stellen Sie diesen Parameter auf der Grundlage der Sparsamkeit und des Rauschpegels Ihrer Abfragevektoren ein. Wenn Sie ihn beispielsweise auf 0,2 einstellen, können Sie sich bei der Suche auf die signifikanteren Werte konzentrieren und so möglicherweise die Genauigkeit verbessern.</p></td>
   </tr>
</table>
