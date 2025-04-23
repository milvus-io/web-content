---
id: reranking.md
title: Neueinstufung
summary: >-
  Die hybride Suche erzielt präzisere Suchergebnisse durch mehrere gleichzeitige
  ANN-Suchen. Mehrere Suchvorgänge liefern mehrere Ergebnissätze, die eine
  Reranking-Strategie erfordern, um die Ergebnisse zusammenzuführen und neu zu
  ordnen und einen einzigen Ergebnissatz zu liefern. In diesem Leitfaden werden
  die von Milvus unterstützten Reranking-Strategien vorgestellt und Tipps für
  die Auswahl der geeigneten Reranking-Strategie gegeben.
---
<h1 id="Reranking" class="common-anchor-header">Neueinstufung<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Die hybride Suche erzielt präzisere Suchergebnisse durch mehrere gleichzeitige ANN-Suchen. Mehrere Suchvorgänge liefern mehrere Ergebnissätze, die eine Reranking-Strategie erfordern, um die Ergebnisse zusammenzuführen und neu zu ordnen und einen einzigen Ergebnissatz zu liefern. In diesem Leitfaden werden die von Milvus unterstützten Reranking-Strategien vorgestellt und Tipps für die Auswahl der geeigneten Reranking-Strategie gegeben.</p>
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
    </button></h2><p>Das folgende Diagramm zeigt den Hauptarbeitsablauf bei der Durchführung einer hybriden Suche in einer multimodalen Suchanwendung. Im Diagramm ist ein Pfad die einfache ANN-Suche in Texten und der andere Pfad die einfache ANN-Suche in Bildern. Jeder Pfad erzeugt eine Reihe von Ergebnissen auf der Grundlage der Text- bzw. Bildähnlichkeitsbewertung<strong>(Limit 1</strong> und <strong>Limit 2</strong>). Dann wird eine Reranking-Strategie angewandt, um die beiden Ergebnismengen auf der Grundlage eines einheitlichen Standards neu zu bewerten und schließlich die beiden Ergebnismengen zu einer endgültigen Menge von Suchergebnissen, <strong>Limit(final),</strong> zusammenzuführen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Multi-Vektor-Ranking</span> </span></p>
<p>Bei der hybriden Suche ist das Reranking ein entscheidender Schritt, der die Ergebnisse aus mehreren Vektorsuchen integriert, um sicherzustellen, dass die endgültige Ausgabe die relevanteste und genaueste ist. Derzeit unterstützt Milvus die folgenden zwei Reranking-Strategien:</p>
<ul>
<li><p><strong><a href="/docs/de/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Bei dieser Strategie werden die Ergebnisse zusammengeführt, indem eine gewichtete Punktzahl der Ergebnisse (oder Abstände) aus verschiedenen Vektorsuchen berechnet wird. Die Gewichtung erfolgt auf der Grundlage der Wichtigkeit der einzelnen Vektorfelder, so dass eine Anpassung an die Prioritäten des jeweiligen Anwendungsfalls möglich ist.</p></li>
<li><p><strong><a href="/docs/de/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Diese Strategie kombiniert die Ergebnisse auf der Grundlage der Rangfolge. Sie verwendet eine Methode, die die Ränge der Ergebnisse aus verschiedenen Suchvorgängen ausgleicht, was oft zu einer faireren und effektiveren Integration verschiedener Datentypen oder Modalitäten führt.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">WeightedRanker<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der WeightedRanker-Strategie werden die Ergebnisse der einzelnen Pfade der Vektorsuche je nach ihrer Bedeutung unterschiedlich gewichtet.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Mechanismus von WeightedRanker</h3><p>Der Hauptarbeitsablauf der WeightedRanker-Strategie ist wie folgt:</p>
<ol>
<li><p><strong>Sammeln von Suchergebnissen</strong>: Sammeln der Ergebnisse und Punktzahlen aus jedem Pfad der Vektorsuche (score_1, score_2).</p></li>
<li><p><strong>Normalisierung der Ergebnisse</strong>: Jede Suche kann unterschiedliche Ähnlichkeitsmetriken verwenden, was zu unterschiedlichen Punkteverteilungen führt. Beispielsweise kann die Verwendung des Inneren Produkts (IP) als Ähnlichkeitstyp zu Ergebnissen im Bereich von [-∞,+∞] führen, während die Verwendung des Euklidischen Abstands (L2) zu Ergebnissen im Bereich von [0,+∞] führt. Da die Wertebereiche der verschiedenen Suchvorgänge unterschiedlich sind und nicht direkt miteinander verglichen werden können, müssen die Werte der einzelnen Suchpfade normalisiert werden. In der Regel wird die Funktion <code translate="no">arctan</code> angewendet, um die Punktzahlen in einen Bereich zwischen [0, 1] umzuwandeln (score_1_normalisiert, score_2_normalisiert). Werte, die näher bei 1 liegen, weisen auf eine höhere Ähnlichkeit hin.</p></li>
<li><p><strong>Gewichte zuweisen</strong>: Auf der Grundlage der Bedeutung, die den verschiedenen Vektorfeldern zugewiesen wird, werden den normalisierten Punktzahlen (score_1_normalisiert, score_2_normalisiert) Gewichte<strong>(wi</strong>) zugewiesen. Die Gewichte der einzelnen Pfade sollten zwischen [0,1] liegen. Die resultierenden gewichteten Scores sind score_1_weighted und score_2_weighted.</p></li>
<li><p><strong>Scores zusammenführen</strong>: Die gewichteten Punktzahlen (score_1_weighted, score_2_weighted) werden vom höchsten zum niedrigsten Wert geordnet, um einen endgültigen Satz von Punktzahlen (score_final) zu erhalten.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Gewichteter Reranker</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Beispiel für WeightedRanker</h3><p>Dieses Beispiel zeigt eine multimodale Hybrid-Suche (topK=5) mit Bildern und Text und veranschaulicht, wie die WeightedRanker-Strategie die Ergebnisse von zwei ANN-Suchen neu ordnet.</p>
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
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Verwendung von WeightedRanker</h3><p>Bei der Verwendung der WeightedRanker-Strategie ist es erforderlich, Gewichtungswerte einzugeben. Die Anzahl der einzugebenden Gewichtungswerte sollte der Anzahl der ANN-Basissuchanfragen in der Hybrid Search entsprechen. Die eingegebenen Gewichtungswerte sollten in den Bereich [0,1] fallen, wobei Werte, die näher an 1 liegen, eine größere Bedeutung anzeigen.</p>
<p>Nehmen wir zum Beispiel an, es gibt zwei grundlegende ANN-Suchanfragen in einer Hybridsuche: Textsuche und Bildsuche. Wenn die Textsuche als wichtiger angesehen wird, sollte ihr ein höheres Gewicht zugewiesen werden.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Reciprocal Rank Fusion (RRF) ist eine Datenfusionsmethode, die Ranglisten auf der Basis des Kehrwerts ihrer Rankings kombiniert. Diese Reranking-Strategie gleicht die Bedeutung der einzelnen Pfade der Vektorsuche effektiv aus.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Mechanismus von RRFRanker</h3><p>Der Hauptarbeitsablauf der RRFRanker-Strategie sieht wie folgt aus:</p>
<ol>
<li><p><strong>Sammeln der Suchrankings</strong>: Sammeln der Rangfolgen der Ergebnisse aus jedem Pfad der Vektorsuche (Rang_1, Rang_2).</p></li>
<li><p><strong>Rankings zusammenführen</strong>: Konvertieren Sie die Rankings aus jedem Pfad (rank_rrf_1, rank_rrf_2) gemäß einer Formel.</p>
<p>Die Berechnungsformel beinhaltet <em>N</em>, das die Anzahl der Abrufe darstellt. <em>ranki</em><em>(d</em>) ist die Rangposition des Dokuments <em>d</em>, die durch den <em>i(ten)</em> Abrufer erzeugt wurde. <em>k</em> ist ein Glättungsparameter, der normalerweise auf 60 gesetzt wird.</p></li>
<li><p><strong>Aggregierte Rankings</strong>: Neueinstufung der Suchergebnisse auf der Grundlage der kombinierten Rankings, um die endgültigen Ergebnisse zu erhalten.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Beispiel für RRFRanker</h3><p>Dieses Beispiel zeigt eine hybride Suche (topK=5) auf sparse-dense Vektoren und veranschaulicht, wie die RRFRanker-Strategie die Ergebnisse von zwei ANN-Suchen neu ordnet.</p>
<ul>
<li>Ergebnisse der ANN-Suche auf spärlichen Vektoren von Texten （topK=5)：</li>
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
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Verwendung von RRFRanker</h3><p>Wenn Sie die RRF-Reranking-Strategie verwenden, müssen Sie den Parameter <code translate="no">k</code> konfigurieren. Es handelt sich dabei um einen Glättungsparameter, der die relative Gewichtung von Volltextsuche und Vektorsuche effektiv verändern kann. Der Standardwert dieses Parameters ist 60, und er kann in einem Bereich von (0, 16384) eingestellt werden. Der Wert sollte eine Fließkommazahl sein. Der empfohlene Wert liegt zwischen [10, 100]. Während <code translate="no">k=60</code> eine gängige Wahl ist, kann der optimale <code translate="no">k</code> Wert je nach Ihren spezifischen Anwendungen und Datensätzen variieren. Wir empfehlen, diesen Parameter auf der Grundlage Ihres spezifischen Anwendungsfalls zu testen und anzupassen, um die beste Leistung zu erzielen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Auswahl der richtigen Reranking-Strategie<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Auswahl einer Reranking-Strategie ist zu berücksichtigen, ob ein Schwerpunkt auf einer oder mehreren ANN-Basissuchen auf den Vektorfeldern liegt.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Diese Strategie ist zu empfehlen, wenn die Ergebnisse ein bestimmtes Vektorfeld betonen sollen. Mit dem WeightedRanker können Sie bestimmten Vektorfeldern eine höhere Gewichtung zuweisen und sie damit stärker hervorheben. Bei einer multimodalen Suche könnten beispielsweise Textbeschreibungen eines Bildes als wichtiger angesehen werden als die Farben dieses Bildes.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Diese Strategie wird empfohlen, wenn es keine besondere Gewichtung gibt. Der RRF kann die Bedeutung der einzelnen Vektorfelder effektiv ausgleichen.</p></li>
</ul>
