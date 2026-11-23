---
id: rrf-ranker.md
title: RRF Ranker
summary: >-
  Il Ranker RRF (Reciprocal Rank Fusion) è una strategia di riordino dei
  risultati per la ricerca ibrida Milvus che bilancia i risultati provenienti da
  più percorsi di ricerca vettoriale in base alle loro posizioni in classifica
  piuttosto che ai punteggi di somiglianza grezzi. Proprio come in un torneo
  sportivo in cui si tiene conto delle classifiche dei giocatori anziché delle
  statistiche individuali, RRF Ranker combina i risultati di ricerca in base
  alla posizione occupata da ciascun elemento nei diversi percorsi di ricerca,
  creando una classifica finale equa ed equilibrata.
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF Ranker<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Il Ranker RRF (Reciprocal Rank Fusion) è una strategia di riclassificazione per la ricerca ibrida Milvus che bilancia i risultati provenienti da più percorsi di ricerca vettoriale in base alle loro posizioni in classifica piuttosto che ai loro punteggi di similarità grezzi. Proprio come un torneo sportivo che tiene conto delle classifiche dei giocatori anziché delle statistiche individuali, RRF Ranker combina i risultati di ricerca in base alla posizione di ciascun elemento nelle diverse vie di ricerca, creando una classifica finale equa ed equilibrata.</p>
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
    </button></h2><p>RRF Ranker è progettato specificamente per scenari di ricerca ibrida in cui si desidera bilanciare i risultati provenienti da più percorsi di ricerca vettoriale senza assegnare pesi di importanza espliciti. È particolarmente efficace per:</p>
<table>
   <tr>
     <th><p>Caso d’uso</p></th>
     <th><p>Esempio</p></th>
     <th><p>Perché RRF Ranker funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Ricerca multimodale con uguale importanza</p></td>
     <td><p>Ricerca immagine-testo in cui entrambe le modalità hanno la stessa importanza</p></td>
     <td><p>Bilancia i risultati senza richiedere assegnazioni arbitrarie di pesi</p></td>
   </tr>
   <tr>
     <td><p>Ricerca vettoriale ensemble</p></td>
     <td><p>Combinazione dei risultati provenienti da diversi modelli di embedding</p></td>
     <td><p>Unisce in modo democratico le classifiche senza privilegiare la distribuzione dei punteggi di alcun modello in particolare</p></td>
   </tr>
   <tr>
     <td><p>Ricerca multilingue</p></td>
     <td><p>Ricerca di documenti in più lingue</p></td>
     <td><p>Ordina i risultati in modo equo, indipendentemente dalle caratteristiche di embedding specifiche di ciascuna lingua</p></td>
   </tr>
   <tr>
     <td><p>Raccomandazioni degli esperti</p></td>
     <td><p>Combina i consigli provenienti da più sistemi di esperti</p></td>
     <td><p>Crea classifiche di consenso quando sistemi diversi utilizzano metodi di valutazione non comparabili</p></td>
   </tr>
</table>
<p>Se la vostra applicazione di ricerca ibrida richiede di bilanciare più percorsi di ricerca in modo democratico senza assegnare pesi espliciti, RRF Ranker è la scelta ideale.</p>
<p>Se alcuni percorsi di ricerca sono più affidabili di altri ma i loro punteggi grezzi non sono comparabili, è comunque possibile fondere i risultati in base alla posizione in classifica e assegnare a ciascun percorso un proprio peso. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/v2.6.x/rrf-ranker.md#Assign-weights-to-search-paths">Assegnazione dei pesi ai percorsi di ricerca</a>. Per combinare i punteggi dei percorsi anziché le loro posizioni in classifica, utilizzare <a href="/docs/it/v2.6.x/weighted-ranker.md">Weighted Ranker</a>.</p>
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
<li><p><strong>Raccolta delle classifiche di ricerca</strong>: raccogli le classifiche dei risultati da ciascun percorso di ricerca vettoriale (rank_1, rank_2).</p></li>
<li><p><strong>Unire le classifiche</strong>: convertire le classifiche di ciascun percorso (rank_rrf_1, rank_rrf_2) secondo una formula.</p>
<p>La formula di calcolo coinvolge <em>N</em>, che rappresenta il numero di recuperi. <em>ranki</em>(<em>d</em>) è la posizione in classifica del documento <em>d</em> generata <em>dall’i-esimo</em> recuperatore. <em>k</em> è un parametro di smussamento tipicamente impostato a 60.</p></li>
<li><p><strong>Aggregazione delle classifiche</strong>: riorganizza i risultati della ricerca in base alle classifiche combinate per produrre i risultati finali.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" /> 
   <span>Rrf Ranker</span>
  
 </span></p>
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
    </button></h2><p>Questo esempio mostra una ricerca ibrida (topK=5) su vettori sparsi-densi e illustra come la strategia RRFRanker riorganizzi i risultati di due ricerche ANN.</p>
<ul>
<li><p>Risultati della ricerca ANN su vettori di testo sparsi (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Posizione (sparsa)</strong></p></th>
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
</table></p></li>
<li><p>Risultati della ricerca ANN su vettori di testi densi (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Posizione (densa)</strong></p></th>
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
</table></p></li>
<li><p>Utilizza RRF per riorganizzare la classifica dei due insiemi di risultati di ricerca. Supponiamo che il parametro di smussamento <code translate="no">k</code> sia impostato su 60.</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio (sparso)</strong></p></th>
<th><p><strong>Punteggio (Denso)</strong></p></th>
<th><p><strong>Punteggio finale</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>1</p></td>
<td><p>2</p></td>
<td><p>1/(60+1)+1/(60+2) = 0,03252247</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>4</p></td>
<td><p>1</p></td>
<td><p>1/(60+4)+1/(60+1) = 0,03201844</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>5</p></td>
<td><p>4</p></td>
<td><p>1/(60+5)+1/(60+4) = 0,03100962</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>2</p></td>
<td><p>N/A</p></td>
<td><p>1/(60+2) = 0,01612903</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>3</p></td>
<td><p>N/A</p></td>
<td><p>1/(60+3) = 0,01587302</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>N/A</p></td>
<td><p>3</p></td>
<td><p>1/(60+3) = 0,01587302</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>N/A</p></td>
<td><p>5</p></td>
<td><p>1/(60+5) = 0,01538462</p></td>
</tr>
</table></p></li>
<li><p>Risultati finali dopo la riclassificazione (topK=5):</p>
<p><table>
<tr>
<th><p><strong>Posizione</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio finale</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0,03252247</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0,03201844</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0,03100962</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0,01612903</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0,01587302</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>110</p></td>
<td><p>0,01587302</p></td>
</tr>
</table></p></li>
</ul>
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
    </button></h2><p>Quando si utilizza la strategia di riclassificazione RRF, è necessario configurare il parametro <code translate="no">k</code>. Si tratta di un parametro di livellamento in grado di modificare efficacemente i pesi relativi della ricerca full-text rispetto alla ricerca vettoriale. Il valore predefinito di questo parametro è 60 e può essere regolato in un intervallo compreso tra (0, 16384). Il valore deve essere un numero in virgola mobile. Il valore consigliato è compreso tra [10, 100]. Sebbene <code translate="no">k=60</code> sia una scelta comune, il valore ottimale di <code translate="no">k</code> può variare a seconda delle applicazioni e dei set di dati specifici. Si consiglia di testare e regolare questo parametro in base al proprio caso d’uso specifico per ottenere le migliori prestazioni.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Creare un RRF Ranker<button data-href="#Create-an-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver configurato la propria raccolta con più campi vettoriali, creare un RRF Ranker con un parametro di smussamento appropriato:</p>
<div class="alert note">
<p>Milvus 2.6.x e versioni successive consentono di configurare le strategie di reranking direttamente tramite l’API <code translate="no">Function</code>. Se si utilizza una versione precedente (anteriore alla v2.6.0), consultare la documentazione <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-RRFRanker">sul reranking</a> per le istruzioni di configurazione.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Obbligatorio?</p></th>
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
     <td><p>Elenco dei campi vettoriali a cui applicare la funzione (deve essere vuoto per RRF Ranker)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il tipo di funzione da richiamare; utilizzare <code translate="no">RERANK</code> per specificare una strategia di riclassificazione</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il metodo di riclassificazione da utilizzare.</p><p>Deve essere impostato su <code translate="no">rrf</code> per utilizzare RRF Ranker.</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>No</p></td>
     <td><p>Parametro di livellamento che controlla l’impatto delle classifiche dei documenti; un valore più alto di " <code translate="no">k</code> " riduce la sensibilità alle prime posizioni. Intervallo: (0, 16384); valore predefinito: <code translate="no">60</code>.</p><p>Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/v2.6.x/rrf-ranker.md#Mechanism-of-RRF-Ranker">Meccanismo di RRF Ranker</a>".</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Assign-weights-to-search-paths" class="common-anchor-header">Assegnare pesi ai percorsi di ricerca<button data-href="#Assign-weights-to-search-paths" class="anchor-icon" translate="no">
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
    </button></h3><p>Impostare <code translate="no">params.weights</code> per attribuire a ciascun percorso di ricerca un'influenza diversa sul ranking fuso. Il punteggio di ciascun documento diventa <code translate="no">score(d) = Σ weights[i] / (k + rank_i(d))</code>. Il valore nella posizione <em>i</em> si applica alla <em>i-esima</em> richiesta di ricerca nella chiamata di ricerca ibrida, nell'ordine in cui vengono passate le richieste. Ogni peso deve essere compreso tra 0 e 1 inclusi ed è necessario fornire esattamente un peso per ogni richiesta di ricerca; in caso contrario, la richiesta fallisce con un errore di parametro. I pesi non sono normalizzati e non è necessario che la loro somma sia pari a 1. Un peso pari a <code translate="no">0</code> elimina il contributo di quel percorso al punteggio, ma i relativi risultati possono comunque comparire nei risultati unificati. Se si omette <code translate="no">weights</code>, ogni percorso ha un peso pari a 1, il che corrisponde al classico RRF.</p>
<div class="alert note">
<p>L’RRF ponderato richiede Milvus 2.6.23 o versioni successive. Le versioni precedenti ignorano il parametro <code translate="no">weights</code> senza restituire un errore e classificano i risultati con l’RRF classico.</p>
</div>
<p>Ad esempio, applica i pesi ` <code translate="no">[0.3, 0.7]</code> ` <a href="/docs/it/v2.6.x/rrf-ranker.md#Example-of-RRF-Ranker">all’esempio sparse-dense</a> sopra riportato con ` <code translate="no">k</code> ` impostato su 60. La richiesta sparse viene elaborata per prima, quindi ` <code translate="no">0.3</code> ` si applica alla ricerca sparse e ` <code translate="no">0.7</code> ` alla ricerca dense:</p>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Posizione (sparsa)</strong></p></th>
     <th><p><strong>Posizione (densa)</strong></p></th>
     <th><p><strong>Punteggio finale</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>0,3/(60+1)+0,7/(60+2) = 0,01620836</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>0,3/(60+4)+0,7/(60+1) = 0,01616291</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>0,3/(60+5)+0,7/(60+4) = 0,01555288</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>0,7/(60+3) = 0,01111111</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>0,7/(60+5) = 0,01076923</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>0,3/(60+2) = 0,00483871</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>0,3/(60+3) = 0,00476190</p></td>
   </tr>
</table>
<p>Con topK=5, gli ID 110 e 250, che compaiono solo nei risultati densi, sostituiscono gli ID 203 e 150 nei risultati finali.</p>
<p>Per creare un RRF Ranker ponderato, aggiungere ` <code translate="no">weights</code> ` ai parametri del ranker, quindi passare il ranker alla ricerca ibrida come mostrato in <a href="/docs/it/v2.6.x/rrf-ranker.md#Apply-to-hybrid-search">"Applica alla ricerca ibrida"</a>. Per cURL, utilizzare l'oggetto come valore ` <code translate="no">rerank</code> ` di una richiesta di ricerca ibrida; per una richiesta completa, fare riferimento a <a href="/docs/it/v2.6.x/multi-vector-search.md">"Ricerca ibrida multivettoriale</a>":</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]  <span class="hljs-comment"># One weight per search request, in request order</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.3, 0.7]&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>],
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;rrf&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>).
    WithParam(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-number">100</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.3, 0.7]&quot;</span>)
<span class="hljs-comment">// Pass it with milvusclient.NewHybridSearchOption(...).WithFunctionRerankers(rerank)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100,
        <span class="hljs-string">&quot;weights&quot;</span>: [0.3, 0.7]
    }
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Passare i pesi nei formati indicati sopra. Le classi di supporto RRF degli SDK non dispongono di un’opzione per i pesi e i pesi aggiunti tramite un metodo di parametro generico vengono ignorati senza generare alcun errore.</p>
</div>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applicazione alla ricerca ibrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>RRF Ranker è progettato specificamente per operazioni di ricerca ibrida che combinano più campi vettoriali. Ecco come utilizzarlo in una ricerca ibrida:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest, RRFRanker

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

<span class="hljs-comment"># Create an RRF ranker with smoothing parameter k</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;\&quot;modern dining table\&quot;&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> RRFRanker.builder()
                .k(<span class="hljs-number">100</span>)
                .build();
        
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> text_search = {
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
    <span class="hljs-attr">param</span>: {},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulla ricerca ibrida, consultare <a href="/docs/it/v2.6.x/multi-vector-search.md">Ricerca ibrida multiveettoriale</a>.</p>
