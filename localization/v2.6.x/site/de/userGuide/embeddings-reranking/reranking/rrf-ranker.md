---
id: rrf-ranker.md
title: RRF-Rangierer
summary: >-
  Reciprocal Rank Fusion (RRF) Ranker ist eine Reranking-Strategie für die
  Milvus-Hybridsuche, die die Ergebnisse aus mehreren Vektorsuchpfaden auf der
  Grundlage ihrer Rangpositionen und nicht ihrer rohen Ähnlichkeitswerte
  ausgleicht. Wie bei einem Sportturnier, bei dem die Rangfolge der Spieler und
  nicht die individuellen Statistiken berücksichtigt werden, kombiniert RRF
  Ranker die Suchergebnisse auf der Grundlage der Rangfolge der einzelnen
  Elemente in den verschiedenen Suchpfaden und erstellt so eine faire und
  ausgewogene endgültige Rangfolge.
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF-Rangierer<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Reciprocal Rank Fusion (RRF) Ranker ist eine Reranking-Strategie für die Milvus-Hybridsuche, die Ergebnisse aus mehreren Vektorsuchpfaden auf der Grundlage ihrer Rangpositionen und nicht ihrer rohen Ähnlichkeitswerte ausbalanciert. Wie bei einem Sportturnier, bei dem die Rangfolge der Spieler und nicht die individuellen Statistiken berücksichtigt werden, kombiniert RRF Ranker die Suchergebnisse auf der Grundlage der Rangfolge der einzelnen Elemente in den verschiedenen Suchpfaden und erstellt so eine faire und ausgewogene endgültige Rangfolge.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Wann sollte RRF Ranker verwendet werden?<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker wurde speziell für hybride Suchszenarien entwickelt, in denen Sie Ergebnisse aus mehreren Vektorsuchpfaden ohne explizite Wichtigkeitsgewichtung abgleichen möchten. Er ist besonders effektiv für:</p>
<table>
   <tr>
     <th><p>Anwendungsfall</p></th>
     <th><p>Beispiel</p></th>
     <th><p>Warum RRF Ranker gut funktioniert</p></th>
   </tr>
   <tr>
     <td><p>Multimodale Suche mit gleicher Wichtigkeit</p></td>
     <td><p>Bild-Text-Suche, bei der beide Modalitäten gleich wichtig sind</p></td>
     <td><p>Ausgewogene Ergebnisse, ohne dass willkürliche Gewichtungszuweisungen erforderlich sind</p></td>
   </tr>
   <tr>
     <td><p>Ensemble-Vektor-Suche</p></td>
     <td><p>Kombiniert Ergebnisse aus verschiedenen Einbettungsmodellen</p></td>
     <td><p>Führt Rankings demokratisch zusammen, ohne die Punkteverteilung eines bestimmten Modells zu bevorzugen</p></td>
   </tr>
   <tr>
     <td><p>Sprachübergreifende Suche</p></td>
     <td><p>Auffinden von Dokumenten in mehreren Sprachen</p></td>
     <td><p>Gleiche Rangfolge der Ergebnisse unabhängig von sprachspezifischen Einbettungsmerkmalen</p></td>
   </tr>
   <tr>
     <td><p>Empfehlungen von Experten</p></td>
     <td><p>Kombiniert Empfehlungen von mehreren Expertensystemen</p></td>
     <td><p>Erzeugt konsensfähige Rankings, wenn verschiedene Systeme unvergleichbare Bewertungsmethoden verwenden</p></td>
   </tr>
</table>
<p>Wenn Ihre hybride Suchanwendung einen demokratischen Ausgleich mehrerer Suchpfade erfordert, ohne explizite Gewichtungen zu vergeben, ist RRF Ranker die ideale Wahl.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Mechanismus des RRF Ranker<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Hauptarbeitsablauf der RRFRanker-Strategie ist wie folgt:</p>
<ol>
<li><p><strong>Sammeln von Suchrankings</strong>: Sammeln der Rangfolgen der Ergebnisse aus jedem Pfad der Vektorsuche (Rang_1, Rang_2).</p></li>
<li><p><strong>Ranglisten zusammenführen</strong>: Konvertieren Sie die Rankings aus jedem Pfad (rank_rrf_1, rank_rrf_2) gemäß einer Formel.</p>
<p>Die Berechnungsformel beinhaltet <em>N</em>, das die Anzahl der Abrufe darstellt. <em>ranki</em><em>(d</em>) ist die Rangposition des Dokuments <em>d</em>, die durch den <em>i(ten)</em> Abrufer erzeugt wurde. <em>k</em> ist ein Glättungsparameter, der normalerweise auf 60 gesetzt wird.</p></li>
<li><p><strong>Aggregierte Rankings</strong>: Neueinstufung der Suchergebnisse auf der Grundlage der kombinierten Rankings, um die endgültigen Ergebnisse zu erhalten.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>Rrf-Rangierer</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Beispiel für RRF Ranker<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieses Beispiel demonstriert eine hybride Suche (topK=5) auf sparse-dense Vektoren und veranschaulicht, wie die RRFRanker-Strategie die Ergebnisse von zwei ANN-Suchen neu ordnet.</p>
<ul>
<li>Ergebnisse der ANN-Suche auf spärlichen Textvektoren （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rang (spärlich)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Ergebnisse der ANN-Suche auf dichten Textvektoren （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rang (dicht)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Verwenden Sie RRF, um die Rangfolge der beiden Gruppen von Suchergebnissen neu zu ordnen. Nehmen Sie an, dass der Glättungsparameter <code translate="no">k</code> auf 60 eingestellt ist.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punktzahl (spärlich)</strong></p></th>
     <th><p><strong>Punktzahl (dicht)</strong></p></th>
     <th><p><strong>Endgültige Punktzahl</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>NICHT ZUTREFFEND</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>K.A.</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>K.A.</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Die endgültigen Ergebnisse nach der Neuordnung（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Rang</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Endgültige Punktzahl</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Verwendung von RRF Ranker<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie die RRF-Ranglistenstrategie verwenden, müssen Sie den Parameter <code translate="no">k</code> konfigurieren. Es handelt sich dabei um einen Glättungsparameter, der die relative Gewichtung der Volltextsuche gegenüber der Vektorsuche effektiv verändern kann. Der Standardwert dieses Parameters ist 60, und er kann in einem Bereich von (0, 16384) eingestellt werden. Der Wert sollte eine Fließkommazahl sein. Der empfohlene Wert liegt zwischen [10, 100]. Während <code translate="no">k=60</code> eine gängige Wahl ist, kann der optimale <code translate="no">k</code> Wert je nach Ihren spezifischen Anwendungen und Datensätzen variieren. Wir empfehlen, diesen Parameter auf der Grundlage Ihres spezifischen Anwendungsfalls zu testen und anzupassen, um die beste Leistung zu erzielen.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Erstellen eines RRF Rankers</h3><p>Nachdem Ihre Sammlung mit mehreren Vektorfeldern eingerichtet ist, erstellen Sie einen RRF Ranker mit einem geeigneten Glättungsparameter:</p>
<div class="alert note">
<p>Ab Milvus 2.6.x können Sie Ranking-Strategien direkt über die API <code translate="no">Function</code> konfigurieren. Wenn Sie eine frühere Version (vor v2.6.0) verwenden, finden Sie Anweisungen zur Einrichtung in der <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Reranking-Dokumentation</a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert/Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Eindeutiger Bezeichner für diese Funktion</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Vektorfelder, auf die die Funktion angewendet werden soll (muss für RRF Ranker leer sein)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Typ der aufzurufenden Funktion; verwenden Sie <code translate="no">RERANK</code>, um eine Rangordnungsstrategie anzugeben.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Gibt die zu verwendende Ranglistenmethode an; muss auf <code translate="no">rrf</code> gesetzt werden, um RRF Ranker zu verwenden.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Glättungsparameter, der die Auswirkung von Dokumentenrängen steuert; ein höherer <code translate="no">k</code> verringert die Empfindlichkeit gegenüber Spitzenrängen. Bereich: (0, 16384); Standardwert: <code translate="no">60</code>. Einzelheiten finden Sie unter <a href="/docs/de/rrf-ranker.md#Mechanism-of-RRF-Ranker">Mechanismus von RRF Ranker</a>.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Auf hybride Suche anwenden</h3><p>RRF Ranker wurde speziell für hybride Suchoperationen entwickelt, die mehrere Vektorfelder kombinieren. Hier wird beschrieben, wie man ihn in einer hybriden Suche einsetzt:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zur hybriden Suche finden Sie unter <a href="/docs/de/multi-vector-search.md">Hybride Suche mit mehreren Vektoren</a>.</p>
