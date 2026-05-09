---
id: reranking.md
summary: >-
  Dieses Thema behandelt den Reranking-Prozess, erklärt seine Bedeutung und die
  Implementierung von zwei Reranking-Methoden.
title: Reranking
---
<h1 id="Reranking" class="common-anchor-header">Reranking<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ermöglicht hybride Suchfunktionen unter Verwendung der <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()-API</a>, die ausgeklügelte Reranking-Strategien zur Verfeinerung von Suchergebnissen aus mehreren <code translate="no">AnnSearchRequest</code> -Instanzen beinhaltet. Dieses Thema behandelt den Reranking-Prozess, erklärt seine Bedeutung und die Implementierung verschiedener Reranking-Strategien in Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Abbildung veranschaulicht die Ausführung einer hybriden Suche in Milvus und verdeutlicht die Rolle des Rerankings in diesem Prozess.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Das Reranking in der hybriden Suche ist ein entscheidender Schritt, der die Ergebnisse aus mehreren Vektorfeldern konsolidiert und damit sicherstellt, dass die endgültige Ausgabe relevant und genau priorisiert ist. Gegenwärtig bietet Milvus die folgenden Strategien für das Reranking:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Bei diesem Ansatz werden die Ergebnisse zusammengeführt, indem ein gewichteter Durchschnitt der Punktzahlen (oder Vektorabstände) aus verschiedenen Vektorsuchen berechnet wird. Die Gewichtung erfolgt auf der Grundlage der Bedeutung der einzelnen Vektorfelder.</p></li>
<li><p><code translate="no">RRFRanker</code>: Bei dieser Strategie werden die Ergebnisse auf der Grundlage ihrer Ränge in den verschiedenen Vektorsäulen kombiniert.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Gewichtete Wertung (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Strategie <code translate="no">WeightedRanker</code> gewichtet die Ergebnisse der einzelnen Vektorabrufe je nach Bedeutung der einzelnen Vektorfelder unterschiedlich. Diese Reranking-Strategie wird angewendet, wenn die Signifikanz der einzelnen Vektorfelder variiert, so dass Sie bestimmte Vektorfelder gegenüber anderen hervorheben können, indem Sie ihnen eine höhere Gewichtung zuweisen. Zum Beispiel könnte bei einer multimodalen Suche die Textbeschreibung wichtiger sein als die Farbverteilung in Bildern.</p>
<p>Der grundlegende Prozess von WeightedRanker ist wie folgt:</p>
<ul>
<li><p><strong>Sammeln von Bewertungen während des Retrievals</strong>: Sammeln von Ergebnissen und deren Punktzahlen aus verschiedenen Vektorabfragen.</p></li>
<li><p><strong>Normalisierung der Punktzahl</strong>: Normalisierung der Punktzahlen von jeder Route auf einen Bereich von [0,1], wobei Werte, die näher an 1 liegen, eine höhere Relevanz anzeigen. Diese Normalisierung ist von entscheidender Bedeutung, da die Punkteverteilungen je nach Art der Metrik variieren. Zum Beispiel reicht der Abstand für IP von [-∞,+∞], während der Abstand für L2 von [0,+∞] reicht. Milvus verwendet die Funktion <code translate="no">arctan</code>, die Werte in den Bereich [0,1] transformiert, um eine standardisierte Basis für verschiedene Metrik-Typen zu schaffen.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Gewichtszuweisung</strong>: Weisen Sie jedem Vektorabrufweg ein Gewicht <code translate="no">w𝑖</code> zu. Die Benutzer legen die Gewichte fest, die die Zuverlässigkeit, Genauigkeit oder andere relevante Metriken der Datenquelle widerspiegeln. Jede Gewichtung reicht von [0,1].</p></li>
<li><p><strong>Punkte-Fusion</strong>: Berechnet einen gewichteten Durchschnitt der normalisierten Ergebnisse, um das endgültige Ergebnis zu ermitteln. Die Ergebnisse werden dann auf der Grundlage dieser höchsten bis niedrigsten Punktzahl geordnet, um die endgültigen sortierten Ergebnisse zu erhalten.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>gewichteter-Reranker</span> </span></p>
<p>Um diese Strategie zu verwenden, wenden Sie eine Instanz von <code translate="no">WeightedRanker</code> an und legen die Gewichtungswerte fest, indem Sie eine variable Anzahl von numerischen Argumenten übergeben.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie dies:</p>
<ul>
<li><p>Jeder Gewichtungswert reicht von 0 (am wenigsten wichtig) bis 1 (am wichtigsten) und beeinflusst die endgültige aggregierte Punktzahl.</p></li>
<li><p>Die Gesamtzahl der in <code translate="no">WeightedRanker</code> angegebenen Gewichtungswerte sollte der Anzahl der <code translate="no">AnnSearchRequest</code> Instanzen entsprechen, die Sie zuvor erstellt haben.</p></li>
<li><p>Es ist erwähnenswert, dass wir aufgrund der unterschiedlichen Messungen der verschiedenen Metrik-Typen die Abstände der Recall-Ergebnisse so normalisieren, dass sie im Intervall [0,1] liegen, wobei 0 für unterschiedlich und 1 für ähnlich steht. Die endgültige Punktzahl ergibt sich aus der Summe der Gewichtungswerte und Abstände.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Reciprocal Rank Fusion (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF ist eine Datenfusionsmethode, die Ranglisten auf der Grundlage des Kehrwerts ihrer Ränge kombiniert. Es ist eine wirksame Methode, um den Einfluss der einzelnen Vektorfelder auszugleichen, insbesondere wenn es keine eindeutige Rangfolge der Wichtigkeit gibt. Diese Strategie wird in der Regel angewandt, wenn alle Vektorfelder gleichwertig berücksichtigt werden sollen oder wenn Unsicherheit über die relative Bedeutung der einzelnen Felder besteht.</p>
<p>Der grundlegende Prozess der RRF ist wie folgt:</p>
<ul>
<li><p><strong>Sammeln von Rankings während des Retrievals</strong>: Abrufer über mehrere Vektorfelder hinweg rufen die Ergebnisse ab und sortieren sie.</p></li>
<li><p><strong>Rangfusion</strong>: Der RRF-Algorithmus gewichtet und kombiniert die Ränge der einzelnen Abrufer. Die Formel lautet wie folgt:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Dabei steht 𝑁 für die Anzahl der verschiedenen Abrufwege, rank𝑖(𝑑) ist die Rangposition des abgerufenen Dokuments 𝑑 durch den 𝑖-ten Retriever und 𝑘 ist ein Glättungsparameter, der normalerweise auf 60 gesetzt wird.</p></li>
<li><p><strong>Umfassendes Ranking</strong>: Neueinstufung der abgerufenen Ergebnisse auf der Grundlage der kombinierten Punktzahlen, um die endgültigen Ergebnisse zu erhalten.</p></li>
</ul>
<p>Um diese Strategie zu verwenden, wenden Sie eine <code translate="no">RRFRanker</code> Instanz an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF ermöglicht den Ausgleich des Einflusses zwischen den Feldern, ohne dass explizite Gewichtungen angegeben werden müssen. Die besten Übereinstimmungen, auf die sich mehrere Bereiche geeinigt haben, werden in der endgültigen Rangliste priorisiert.</p>
