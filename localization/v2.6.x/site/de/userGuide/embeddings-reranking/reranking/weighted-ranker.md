---
id: weighted-ranker.md
title: Gewichteter Ranker
summary: >-
  Der Weighted Ranker kombiniert und priorisiert auf intelligente Weise
  Ergebnisse aus mehreren Suchpfaden, indem er ihnen eine unterschiedliche
  Gewichtung zuweist. Ähnlich wie ein geschickter Koch mehrere Zutaten zu einem
  perfekten Gericht kombiniert, gleicht Weighted Ranker verschiedene
  Suchergebnisse aus, um die relevantesten kombinierten Ergebnisse zu liefern.
  Dieser Ansatz ist ideal für die Suche in mehreren Vektorfeldern oder
  Modalitäten, bei denen bestimmte Felder einen größeren Beitrag zum endgültigen
  Ranking leisten sollten als andere.
---
<h1 id="Weighted-Ranker" class="common-anchor-header">Gewichteter Ranker<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Weighted Ranker kombiniert und priorisiert auf intelligente Weise Ergebnisse aus mehreren Suchpfaden, indem er ihnen eine unterschiedliche Gewichtung zuweist. Ähnlich wie ein geschickter Koch mehrere Zutaten zu einem perfekten Gericht kombiniert, gleicht Weighted Ranker verschiedene Suchergebnisse aus, um die relevantesten kombinierten Ergebnisse zu liefern. Dieser Ansatz ist ideal für die Suche in mehreren Vektorfeldern oder Modalitäten, bei denen bestimmte Felder einen größeren Beitrag zum endgültigen Ranking leisten sollten als andere.</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">Wann wird der Weighted Ranker verwendet?<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Weighted Ranker wurde speziell für hybride Suchszenarien entwickelt, bei denen Sie Ergebnisse aus mehreren Vektorsuchpfaden kombinieren müssen. Er ist besonders effektiv für:</p>
<table>
   <tr>
     <th><p>Anwendungsfall</p></th>
     <th><p>Beispiel</p></th>
     <th><p>Warum Weighted Ranker gut funktioniert</p></th>
   </tr>
   <tr>
     <td><p>E-Commerce-Suche</p></td>
     <td><p>Produktsuche, die Bildähnlichkeit und Textbeschreibung kombiniert</p></td>
     <td><p>Ermöglicht Einzelhändlern, bei Modeartikeln die visuelle Ähnlichkeit zu priorisieren, während bei technischen Produkten die Textbeschreibungen im Vordergrund stehen</p></td>
   </tr>
   <tr>
     <td><p>Suche nach Medieninhalten</p></td>
     <td><p>Videosuche mit visuellen Merkmalen und Audiotranskripten</p></td>
     <td><p>Gewichtet die Wichtigkeit von visuellen Inhalten gegenüber gesprochenen Dialogen je nach Suchabsicht</p></td>
   </tr>
   <tr>
     <td><p>Abrufen von Dokumenten</p></td>
     <td><p>Unternehmensweite Dokumentensuche mit mehreren Einbettungen für verschiedene Abschnitte</p></td>
     <td><p>Höhere Gewichtung von Titel- und Zusammenfassungseinbettungen bei gleichzeitiger Berücksichtigung von Volltexteinbettungen</p></td>
   </tr>
</table>
<p>Wenn Ihre hybride Suchanwendung die Kombination mehrerer Suchpfade bei gleichzeitiger Kontrolle ihrer relativen Bedeutung erfordert, ist Weighted Ranker die ideale Wahl.</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Mechanismus des Weighted Ranker<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Hauptarbeitsablauf der WeightedRanker-Strategie ist wie folgt:</p>
<ol>
<li><p><strong>Sammeln von Suchergebnissen</strong>: Sammeln der Ergebnisse und Scores von jedem Pfad der Vektorsuche (score_1, score_2).</p></li>
<li><p><strong>Normalisierung der Ergebnisse</strong>: Jede Suche kann unterschiedliche Ähnlichkeitsmetriken verwenden, was zu unterschiedlichen Punkteverteilungen führt. Beispielsweise kann die Verwendung des Inneren Produkts (IP) als Ähnlichkeitstyp zu Ergebnissen im Bereich von [-∞,+∞] führen, während die Verwendung des Euklidischen Abstands (L2) zu Ergebnissen im Bereich von [0,+∞] führt. Da die Wertebereiche der verschiedenen Suchvorgänge unterschiedlich sind und nicht direkt miteinander verglichen werden können, müssen die Werte der einzelnen Suchpfade normalisiert werden. In der Regel wird die Funktion <code translate="no">arctan</code> angewendet, um die Punktzahlen in einen Bereich zwischen [0, 1] zu transformieren (Punktzahl_1_normalisiert, Punktzahl_2_normalisiert). Werte, die näher bei 1 liegen, zeigen eine höhere Ähnlichkeit an.</p></li>
<li><p><strong>Gewichte zuweisen</strong>: Auf der Grundlage der Bedeutung, die den verschiedenen Vektorfeldern zugewiesen wird, werden den normalisierten Punktzahlen (score_1_normalisiert, score_2_normalisiert) Gewichte<strong>(wi</strong>) zugewiesen. Die Gewichte der einzelnen Pfade sollten zwischen [0,1] liegen. Die resultierenden gewichteten Scores sind score_1_weighted und score_2_weighted.</p></li>
<li><p><strong>Scores zusammenführen</strong>: Die gewichteten Punktzahlen (score_1_weighted, score_2_weighted) werden vom höchsten zum niedrigsten Wert geordnet, um einen endgültigen Satz von Punktzahlen (score_final) zu erhalten.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>Gewichteter Ranker</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">Beispiel für Weighted Ranker<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieses Beispiel zeigt eine multimodale Hybrid-Suche (topK=5) mit Bildern und Text und veranschaulicht, wie die WeightedRanker-Strategie die Ergebnisse von zwei ANN-Suchen neu ordnet.</p>
<ul>
<li>Ergebnisse der ANN-Suche nach Bildern （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punktzahl (Bild)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Ergebnisse der ANN-Suche nach Texten （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punktzahl (Text)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>Verwenden Sie WeightedRanker, um den Bild- und Textsuchergebnissen Gewichte zuzuweisen. Angenommen, die Gewichtung für die ANN-Bildersuche ist 0,6 und die Gewichtung für die Textsuche ist 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punktzahl (Bild)</strong></p></th>
     <th><p><strong>Punktzahl (Text)</strong></p></th>
     <th><p><strong>Gewichtetes Ergebnis</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>NICHT ZUTREFFEND</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Nicht im Bild</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Nicht im Bild</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
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
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">Verwendung des Weighted Rankers<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Verwendung der WeightedRanker-Strategie ist es erforderlich, Gewichtungswerte einzugeben. Die Anzahl der einzugebenden Gewichtungswerte sollte der Anzahl der grundlegenden ANN-Suchanfragen in der Hybrid Search entsprechen. Die eingegebenen Gewichtungswerte sollten im Bereich von [0,1] liegen, wobei Werte näher an 1 eine größere Bedeutung anzeigen.</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">Einen gewichteten Ranker erstellen</h3><p>Angenommen, es gibt zwei grundlegende ANN-Suchanfragen in einer hybriden Suche: Textsuche und Bildsuche. Wenn die Textsuche als wichtiger angesehen wird, sollte ihr ein höheres Gewicht zugewiesen werden.</p>
<div class="alert note">
<p>Ab Milvus 2.6.x können Sie Reranking-Strategien direkt über die <code translate="no">Function</code> API konfigurieren. Wenn Sie eine frühere Version (vor v2.6.0) verwenden, finden Sie in der <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">Reranking-Dokumentation</a> Anweisungen zur Einrichtung.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
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
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Vektorfelder, auf die die Funktion angewendet werden soll (muss bei Weighted Ranker leer sein)</p></td>
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
     <td><p>Gibt die zu verwendende Ranglistenmethode an. Muss auf <code translate="no">weighted</code> gesetzt werden, um Weighted Ranker zu verwenden.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Array von Gewichten, die jedem Suchpfad entsprechen; Werte ∈ [0,1]. Einzelheiten siehe <a href="/docs/de/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mechanismus des Weighted Ranker</a>.</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Ob die Rohwerte vor der Gewichtung normalisiert werden sollen (mit arctan); Einzelheiten siehe <a href="/docs/de/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mechanismus des Weighted Ranker</a>.</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Auf hybride Suche anwenden</h3><p>Weighted Ranker ist speziell für hybride Suchoperationen konzipiert, die mehrere Vektorfelder kombinieren. Bei der Durchführung einer hybriden Suche müssen Sie die Gewichte für jeden Suchpfad angeben:</p>
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

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
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
