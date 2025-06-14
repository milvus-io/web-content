---
id: reranking.md
title: Riclassificazione
summary: >-
  La ricerca ibrida consente di ottenere risultati di ricerca più precisi grazie
  a più ricerche ANN simultanee. Le ricerche multiple restituiscono diverse
  serie di risultati, che richiedono una strategia di reranking per aiutare a
  unire e riordinare i risultati e restituire un'unica serie di risultati.
  Questa guida introduce le strategie di reranking supportate da Milvus e
  fornisce suggerimenti per la scelta della strategia di reranking più
  appropriata.
---

<h1 id="Reranking" class="common-anchor-header">Riclassificazione<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca ibrida consente di ottenere risultati di ricerca più precisi grazie a più ricerche simultanee di RNA. Le ricerche multiple restituiscono diverse serie di risultati, che richiedono una strategia di reranking per aiutare a unire e riordinare i risultati e restituire un'unica serie di risultati. Questa guida introduce le strategie di reranking supportate da Milvus e fornisce suggerimenti per la scelta della strategia di reranking più appropriata.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma seguente mostra il flusso di lavoro principale per condurre una ricerca ibrida in un'applicazione di ricerca multimodale. Nel diagramma, un percorso è la ricerca ANN di base sui testi e l'altro percorso è la ricerca ANN di base sulle immagini. Ogni percorso genera una serie di risultati basati rispettivamente sul punteggio di similarità del testo e dell'immagine<strong>(Limite 1</strong> e <strong>Limite 2</strong>). Quindi viene applicata una strategia di reranking per classificare due serie di risultati in base a uno standard unificato, unendo infine le due serie di risultati in una serie finale di risultati di ricerca, <strong>Limit(final)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Rerank multivettoriale</span> </span></p>
<p>Nella ricerca ibrida, il reranking è una fase cruciale che integra i risultati di più ricerche vettoriali per garantire che il risultato finale sia il più pertinente e accurato. Attualmente, Milvus supporta le due seguenti strategie di reranking:</p>
<ul>
<li><p><strong><a href="/docs/it/v2.5.x/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Questa strategia unisce i risultati calcolando un punteggio ponderato di punteggi (o distanze) provenienti da diverse ricerche vettoriali. I pesi sono assegnati in base all'importanza di ciascun campo vettoriale, consentendo la personalizzazione in base alle priorità di casi d'uso specifici.</p></li>
<li><p><strong><a href="/docs/it/v2.5.x/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Questa strategia combina i risultati in base al ranking. Utilizza un metodo che bilancia i ranghi dei risultati di ricerche diverse, spesso portando a un'integrazione più equa ed efficace di diversi tipi o modalità di dati.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">Cursore ponderato<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La strategia WeightedRanker assegna pesi diversi ai risultati di ogni percorso di ricerca vettoriale in base alla loro importanza.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Meccanismo di WeightedRanker</h3><p>Il flusso di lavoro principale della strategia WeightedRanker è il seguente:</p>
<ol>
<li><p><strong>Raccogliere i punteggi della ricerca</strong>: Raccogliere i risultati e i punteggi di ogni percorso di ricerca vettoriale (score_1, score_2).</p></li>
<li><p><strong>Normalizzazione dei punteggi</strong>: Ogni ricerca può utilizzare metriche di somiglianza diverse, con conseguenti distribuzioni di punteggio diverse. Ad esempio, l'uso del prodotto interno (IP) come tipo di somiglianza può produrre punteggi che vanno da [-∞,+∞], mentre l'uso della distanza euclidea (L2) produce punteggi che vanno da [0,+∞]. Poiché i punteggi delle diverse ricerche variano e non possono essere direttamente confrontati, è necessario normalizzare i punteggi di ogni percorso di ricerca. In genere si applica la funzione <code translate="no">arctan</code> per trasformare i punteggi in un intervallo compreso tra [0, 1] (score_1_normalizzato, score_2_normalizzato). I punteggi più vicini a 1 indicano una maggiore somiglianza.</p></li>
<li><p><strong>Assegnazione dei pesi</strong>: In base all'importanza assegnata ai diversi campi vettoriali, vengono assegnati dei pesi<strong>(wi</strong>) ai punteggi normalizzati (score_1_normalizzato, score_2_normalizzato). I pesi di ogni percorso devono essere compresi tra [0,1]. I punteggi ponderati risultanti sono score_1_pesato e score_2_pesato.</p></li>
<li><p><strong>Unire i punteggi</strong>: I punteggi ponderati (score_1_pesato, score_2_pesato) vengono classificati dal più alto al più basso per produrre un insieme finale di punteggi (score_finale).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Reranker ponderato</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Esempio di WeightedRanker</h3><p>Questo esempio mostra una ricerca ibrida multimodale (topK=5) che coinvolge immagini e testo e illustra come la strategia WeightedRanker classifica i risultati di due ricerche ANN.</p>
<ul>
<li>Risultati della ricerca ANN sulle immagini (topK=5): ID</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio (immagine)</strong></p></th>
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
<li>Risultati della ricerca della RNA sui testi (topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio (testo)</strong></p></th>
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
<li>Utilizzare WeightedRanker per assegnare pesi ai risultati della ricerca per immagini e per testo. Supponiamo che il peso per la ricerca RNA di immagini sia 0,6 e il peso per la ricerca di testo sia 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio (immagine)</strong></p></th>
     <th><p><strong>Punteggio (testo)</strong></p></th>
     <th><p><strong>Punteggio ponderato</strong></p></th>
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
     <td><p>N/D</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
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
     <td><p>Non nell'immagine</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Non nell'immagine</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>I risultati finali dopo la riclassificazione (topK=5)</li>
</ul>
<table>
   <tr>
     <th><p><strong>Classifica</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio finale</strong></p></th>
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
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Utilizzo di WeightedRanker</h3><p>Quando si utilizza la strategia WeightedRanker, è necessario inserire i valori dei pesi. Il numero di valori di peso da inserire deve corrispondere al numero di richieste di ricerca della RNA di base nella Ricerca ibrida. I valori dei pesi da inserire devono rientrare nell'intervallo [0,1], con valori più vicini a 1 che indicano una maggiore importanza.</p>
<p>Ad esempio, supponiamo che in una ricerca ibrida vi siano due richieste di ricerca ANN di base: la ricerca di testo e la ricerca di immagini. Se la ricerca di testo è considerata più importante, ad essa dovrebbe essere assegnato un peso maggiore.</p>
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
    </button></h2><p>Reciprocal Rank Fusion (RRF) è un metodo di fusione dei dati che combina elenchi classificati in base al reciproco delle loro classifiche. Questa strategia di reranking bilancia efficacemente l'importanza di ogni percorso di ricerca vettoriale.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Meccanismo di RRFRanker</h3><p>Il flusso di lavoro principale della strategia RRFRanker è il seguente:</p>
<ol>
<li><p><strong>Raccogliere le classifiche di ricerca</strong>: Raccogliere le classifiche dei risultati di ogni percorso di ricerca vettoriale (rank_1, rank_2).</p></li>
<li><p><strong>Unire le classifiche</strong>: Converte le classifiche di ciascun percorso (rank_rrf_1, rank_rrf_2) secondo una formula.</p>
<p>La formula di calcolo prevede <em>N</em>, che rappresenta il numero di recuperi. <em>ranki</em><em>(d</em>) è la posizione di classifica del documento <em>d</em> generata dall'<em>i(th)</em> retriever. <em>k</em> è un parametro di smussamento tipicamente impostato a 60.</p></li>
<li><p><strong>Classifica aggregata</strong>: Riclassifica i risultati della ricerca in base alle classifiche combinate per produrre i risultati finali.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Esempio di RRFRanker</h3><p>Questo esempio mostra una ricerca ibrida (topK=5) su vettori sparsi e densi e illustra come la strategia RRFRanker classifica i risultati di due ricerche ANN.</p>
<ul>
<li>Risultati della ricerca RNA su vettori di testi sparsi (topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Classifica (rada)</strong></p></th>
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
<li>Risultati della ricerca della RNA su vettori densi di testi （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Classifica (densa)</strong></p></th>
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
<li>Utilizzate l'RRF per riordinare le classifiche dei due gruppi di risultati della ricerca. Si supponga che il parametro di lisciatura <code translate="no">k</code> sia impostato a 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio (sparso)</strong></p></th>
     <th><p><strong>Punteggio (denso)</strong></p></th>
     <th><p><strong>Punteggio finale</strong></p></th>
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
     <td><p>N/D</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>I risultati finali dopo la riclassificazione (TopK=5)</li>
</ul>
<table>
   <tr>
     <th><p><strong>Classifica</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Punteggio finale</strong></p></th>
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
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Utilizzo di RRFRanker</h3><p>Quando si utilizza la strategia di reranking RRF, è necessario configurare il parametro <code translate="no">k</code>. Si tratta di un parametro di attenuazione che può modificare efficacemente i pesi relativi della ricerca full-text rispetto alla ricerca vettoriale. Il valore predefinito di questo parametro è 60 e può essere regolato entro un intervallo di (0, 16384). Il valore deve essere un numero in virgola mobile. Il valore consigliato è compreso tra [10, 100]. Mentre <code translate="no">k=60</code> è una scelta comune, il valore ottimale di <code translate="no">k</code> può variare a seconda delle applicazioni e dei set di dati specifici. Si consiglia di testare e regolare questo parametro in base al caso d'uso specifico per ottenere le migliori prestazioni.</p>
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
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Selezionare la giusta strategia di reranking<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si sceglie una strategia di reranking, una cosa da considerare è se c'è un'enfasi per una o più ricerche ANN di base sui campi vettoriali.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Questa strategia è consigliata se si desidera che i risultati enfatizzino un particolare campo vettoriale. Il WeightedRanker consente di assegnare pesi maggiori a determinati campi vettoriali, enfatizzandoli maggiormente. Ad esempio, nelle ricerche multimodali, le descrizioni testuali di un'immagine potrebbero essere considerate più importanti dei colori presenti nell'immagine.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Questa strategia è consigliata quando non c'è un'enfasi specifica. L'RRF può bilanciare efficacemente l'importanza di ciascun campo vettoriale.</p></li>
</ul>
