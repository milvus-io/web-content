---
id: rrf-ranker.md
title: Ranker RRF
summary: >-
  Reciprocal Rank Fusion (RRF) Ranker è una strategia di reranking per la
  ricerca ibrida di Milvus che bilancia i risultati di più percorsi di ricerca
  vettoriali in base alla loro posizione in classifica piuttosto che ai punteggi
  di somiglianza grezzi. Come un torneo sportivo che considera le classifiche
  dei giocatori piuttosto che le statistiche individuali, RRF Ranker combina i
  risultati della ricerca in base alla posizione di ciascun elemento nei diversi
  percorsi di ricerca, creando una classifica finale equa ed equilibrata.
---
<h1 id="RRF-Ranker" class="common-anchor-header">Ranker RRF<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Reciprocal Rank Fusion (RRF) Ranker è una strategia di reranking per la ricerca ibrida di Milvus che bilancia i risultati di più percorsi di ricerca vettoriali in base alla loro posizione in classifica piuttosto che ai punteggi di somiglianza grezzi. Come in un torneo sportivo che considera le classifiche dei giocatori piuttosto che le statistiche individuali, RRF Ranker combina i risultati della ricerca in base alla posizione di ciascun elemento nei diversi percorsi di ricerca, creando una classifica finale equa ed equilibrata.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Quando utilizzare RRF Ranker<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF Ranker è stato progettato specificamente per scenari di ricerca ibridi in cui si desidera bilanciare i risultati di più percorsi di ricerca vettoriali senza assegnare pesi di importanza espliciti. È particolarmente efficace per:</p>
<table>
   <tr>
     <th><p>Caso d'uso</p></th>
     <th><p>Esempio</p></th>
     <th><p>Perché RRF Ranker funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Ricerca multimodale con uguale importanza</p></td>
     <td><p>Ricerca immagine-testo in cui entrambe le modalità hanno la stessa importanza</p></td>
     <td><p>Bilancia i risultati senza richiedere assegnazioni di peso arbitrarie</p></td>
   </tr>
   <tr>
     <td><p>Ricerca vettoriale ensemble</p></td>
     <td><p>Combina i risultati di diversi modelli di incorporazione</p></td>
     <td><p>Unisce democraticamente le classifiche senza favorire la distribuzione dei punteggi di un particolare modello</p></td>
   </tr>
   <tr>
     <td><p>Ricerca interlinguistica</p></td>
     <td><p>Ricerca di documenti in più lingue</p></td>
     <td><p>Classifica i risultati in modo equo indipendentemente dalle caratteristiche di incorporazione specifiche della lingua</p></td>
   </tr>
   <tr>
     <td><p>Raccomandazioni di esperti</p></td>
     <td><p>Combina le raccomandazioni di più sistemi esperti</p></td>
     <td><p>Crea classifiche di consenso quando sistemi diversi utilizzano metodi di punteggio incomparabili</p></td>
   </tr>
</table>
<p>Se la vostra applicazione di ricerca ibrida richiede un bilanciamento democratico di più percorsi di ricerca senza assegnare pesi espliciti, RRF Ranker è la scelta ideale.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Meccanismo di RRF Ranker<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di lavoro principale della strategia RRFRanker è il seguente:</p>
<ol>
<li><p><strong>Raccogliere le classifiche di ricerca</strong>: Raccogliere le classifiche dei risultati di ogni percorso di ricerca vettoriale (rank_1, rank_2).</p></li>
<li><p><strong>Unire le classifiche</strong>: Converte le classifiche di ciascun percorso (rank_rrf_1, rank_rrf_2) secondo una formula.</p>
<p>La formula di calcolo prevede <em>N</em>, che rappresenta il numero di recuperi. <em>ranki</em><em>(d</em>) è la posizione di classifica del documento <em>d</em> generata dall'<em>i(th)</em> retriever. <em>k</em> è un parametro di smoothing tipicamente impostato a 60.</p></li>
<li><p><strong>Classifica aggregata</strong>: Ri-classifica i risultati della ricerca in base alle classifiche combinate per produrre i risultati finali.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>Classificatore RRF</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Esempio di RRF Ranker<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Questo esempio mostra una ricerca ibrida (topK=5) su vettori sparsi e densi e illustra come la strategia RRFRanker classifica i risultati di due ricerche ANN.</p>
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
<li>Utilizzare la RRF per riordinare le classifiche dei due gruppi di risultati della ricerca. Si supponga che il parametro di lisciatura <code translate="no">k</code> sia impostato a 60.</li>
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
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Utilizzo di RRF Ranker<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si utilizza la strategia di reranking RRF, è necessario configurare il parametro <code translate="no">k</code>. Si tratta di un parametro di smussamento che può modificare efficacemente i pesi relativi della ricerca full-text rispetto alla ricerca vettoriale. Il valore predefinito di questo parametro è 60 e può essere regolato entro un intervallo di (0, 16384). Il valore deve essere un numero in virgola mobile. Il valore consigliato è compreso tra [10, 100]. Sebbene <code translate="no">k=60</code> sia una scelta comune, il valore ottimale di <code translate="no">k</code> può variare a seconda delle applicazioni e dei set di dati specifici. Si consiglia di testare e regolare questo parametro in base al caso d'uso specifico per ottenere le migliori prestazioni.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Creare un classificatore RRF</h3><p>Dopo aver impostato la raccolta con più campi vettoriali, creare un RRF Ranker con un parametro di smoothing appropriato:</p>
<div class="alert note">
<p>Milvus 2.6.x e successive consentono di configurare le strategie di reranking direttamente tramite l'API <code translate="no">Function</code>. Se si utilizza una versione precedente (prima della v2.6.0), consultare la documentazione sul <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">reranking</a> per le istruzioni di configurazione.</p>
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
     <th><p>Parametro</p></th>
     <th><p>Richiesto?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore/Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore univoco per questa funzione</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco di campi vettoriali a cui applicare la funzione (deve essere vuoto per RRF Ranker)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il tipo di Funzione da invocare; utilizzare <code translate="no">RERANK</code> per specificare una strategia di reranking</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il metodo di reranking da utilizzare. Deve essere impostato su <code translate="no">rrf</code> per utilizzare RRF Ranker.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>No</p></td>
     <td><p>Parametro di attenuazione che controlla l'impatto dei ranghi dei documenti; un valore più alto di <code translate="no">k</code> riduce la sensibilità ai primi posti. Intervallo: (0, 16384); valore predefinito: <code translate="no">60</code>. Per i dettagli, fare riferimento a <a href="/docs/it/rrf-ranker.md#Mechanism-of-RRF-Ranker">Meccanismo di RRF Ranker</a>.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applicazione alla ricerca ibrida</h3><p>RRF Ranker è stato progettato specificamente per le operazioni di ricerca ibrida che combinano più campi vettoriali. Ecco come utilizzarlo in una ricerca ibrida:</p>
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
<p>Per ulteriori informazioni sulla ricerca ibrida, consultare la sezione <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</p>
