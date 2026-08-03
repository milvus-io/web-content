---
id: search-aggregation.md
title: Aggregazione dei risultati di ricercaCompatible with Milvus 3.0.x
summary: >-
  Raggruppare i risultati della ricerca vettoriale in bucket, calcolare le
  metriche per ciascun bucket, ordinare i bucket e restituire i risultati
  rappresentativi.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Aggregazione dei risultati di ricerca<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando un acquirente cerca "scarpe da corsa nere per l'allenamento quotidiano", la ricerca per vicino più prossimo approssimativo (ANN) classifica i prodotti in base alla somiglianza vettoriale e restituisce un elenco piatto Top-K. I risultati possono essere pertinenti ma ripetitivi: nell'esempio riportato di seguito, quattro dei primi sei risultati sono prodotti del marchio A, mentre il marchio B e il marchio C compaiono una volta ciascuno.</p>
<p>Un elenco piatto non può fornire direttamente un riepilogo orientato ai bucket. Un’applicazione potrebbe dover confrontare i marchi in base al numero di candidati selezionati o al prezzo medio, esaminare un numero limitato di prodotti rappresentativi di ciascun marchio oppure organizzare i risultati in più livelli di bucket.</p>
<p>L’aggregazione della ricerca organizza i candidati ANN selezionati in bucket in base a campi scalari selezionati. In questo esempio, ogni marchio diventa un bucket separato. Milvus può calcolare le statistiche per ciascun bucket, ordinare i bucket e associarvi prodotti rappresentativi. L’applicazione utilizza questa risposta “bucket-first” tramite <code translate="no">result.agg_buckets</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Un risultato di ricerca piatto relativo alle scarpe da corsa diventa un insieme di bucket di marchi comparabili</span>
  
 </span></p>
<p>L’aggregazione della ricerca non esegue un’aggregazione esatta dell’intera collezione. L’esistenza dei bucket, i conteggi, le metriche, l’ordinamento e i risultati rappresentativi dipendono dai candidati selezionati dalla rete neurale artificiale (ANN) e dalle fasi di raggruppamento.</p>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Candidati ANN raggruppati in base alle chiavi dei bucket e restituiti con conteggi, metriche e risultati rappresentativi</span>
  
 </span></p>
<ol>
<li><p><strong>Recupero dei candidati.</strong> Milvus esegue una ricerca ANN per individuare le entità più vicine al vettore di query. La fase di raggruppamento trattiene quindi un numero limitato di candidati per ciascuna chiave composita completa. Questo limite di candidati per chiave corrisponde al valore più grande di ` <code translate="no">TopHits.size</code> ` in qualsiasi punto dell’albero di aggregazione, oppure a ` <code translate="no">1</code> ` quando nessun livello configura ` <code translate="no">top_hits</code>`.</p></li>
<li><p><strong>Creazione dei bucket.</strong> <code translate="no">SearchAggregation.fields</code> definisce la chiave del bucket. Ogni combinazione univoca di valori dei campi crea una chiave separata. Nella figura, <code translate="no">fields=[&quot;brand&quot;]</code> crea le chiavi dei bucket <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> e <code translate="no">(Brand C)</code>. I candidati conservati con la stessa chiave appartengono allo stesso bucket e contribuiscono al suo <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> limita il numero di bucket restituiti da Milvus.</p></li>
<li><p><strong>Calcolo e restituzione dei risultati.</strong> Ogni bucket restituito contiene la propria chiave e il conteggio dei candidati conservati. Milvus può anche calcolare le metriche configurate, ordinare i bucket, restituire entità rappresentative e creare bucket secondari. Ogni <code translate="no">AggregationBucket</code> in <code translate="no">result.agg_buckets</code> espone <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> e <code translate="no">sub_groups</code>. Quando l’aggregazione della ricerca è abilitata, il normale elenco dei risultati di ricerca è vuoto.</p></li>
</ol>
<p>Nel diagramma, <code translate="no">TopHits.size=4</code> fornisce un budget di candidati per chiave pari a quattro, quindi i quattro candidati del Marchio A conservati generano <code translate="no">count: 4</code>. La scheda completa del Marchio A mostra solo due dei quattro risultati rappresentativi restituiti per mantenere la figura compatta.</p>
<p>Con « <code translate="no">sub_aggregation</code> », Milvus ripete i passaggi 2 e 3 all’interno di ciascun bucket padre. Le variazioni nel richiamo della rete neurale artificiale (ANN) o nel budget di candidati per chiave possono modificare il numero di bucket, le metriche, l’ordinamento, i risultati e i risultati annidati.</p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di utilizzare l’aggregazione di ricerca, tenere presente i seguenti limiti:</p>
<ul>
<li><p><strong>Aggregazioni annidate:</strong> una richiesta può contenere un’aggregazione di ricerca radice ( <code translate="no">SearchAggregation</code> ) e fino a tre livelli di aggregazione di ricerca secondaria ( <code translate="no">sub_aggregation</code> ) annidati, per un massimo di quattro livelli in totale.</p></li>
<li><p><strong>Campi utilizzati per creare le chiavi dei bucket:</strong> <code translate="no">SearchAggregation.fields</code> supporta campi booleani, interi, <code translate="no">VARCHAR</code> e <code translate="no">TIMESTAMPTZ</code>. Non supporta campi <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, <code translate="no">TEXT</code>, vettoriali o dinamici.</p></li>
<li><p><strong>Campi metrici:</strong> <code translate="no">count</code> accetta <code translate="no">&quot;*&quot;</code> o qualsiasi campo non<code translate="no">JSON</code> e non dinamico, e ignora i valori <code translate="no">NULL</code> quando viene specificato un campo. <code translate="no">sum</code> e <code translate="no">avg</code> accettano campi interi e in virgola mobile. <code translate="no">min</code> e <code translate="no">max</code> accettano inoltre campi stringa e <code translate="no">TIMESTAMPTZ</code>.</p></li>
<li><p><strong>Campi di ordinamento dei Top Hits:</strong> <code translate="no">TopHits.sort</code> accetta campi comparabili di tipo booleano, intero, a virgola mobile, stringa e <code translate="no">TIMESTAMPTZ</code>, oltre a <code translate="no">_score</code>. Non supporta <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, né campi vettoriali o dinamici.</p></li>
<li><p><strong>Budget dei candidati:</strong> il valore più grande di ` <code translate="no">TopHits.size</code> ` in qualsiasi punto dell’albero di aggregazione corrisponde anche al numero di candidati conservati per ogni chiave composita completa. Se nessun livello configura ` <code translate="no">top_hits</code>`, Milvus conserva un candidato per ogni chiave. Il ` <code translate="no">count</code> ` del bucket e le metriche vengono calcolati a partire da questi candidati conservati, pertanto la modifica di ` <code translate="no">TopHits.size</code> ` può alterarli.</p></li>
<li><p><strong>Campi del bucket nullabili:</strong> un valore <code translate="no">NULL</code> costituisce una chiave di bucket a sé stante. Per escludere il bucket nullo, aggiungere un filtro come <code translate="no">brand is not null</code> alla richiesta di ricerca.</p></li>
<li><p><strong>Campi ripetuti:</strong> lo stesso campo non può comparire in più di un elenco di " <code translate="no">SearchAggregation.fields</code> ". Ad esempio, se l’aggregazione radice utilizza <code translate="no">fields=[&quot;category&quot;]</code>, un <code translate="no">sub_aggregation</code> annidato non può utilizzare anche <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Combinazioni non supportate:</strong> l’aggregazione di ricerca non può essere combinata con <code translate="no">offset</code>, iteratori di ricerca, ricerca ibrida, un evidenziatore o ricerca raggruppata.</p></li>
<li><p><strong>Voci restituite:</strong> mantenere il numero massimo configurato di voci di risultato pari o inferiore a 10.000. Calcolare questo valore massimo come segue:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Utilizzare <code translate="no">1</code> come ultimo fattore quando nessun livello configura <code translate="no">TopHits</code>. Ad esempio, un vettore di query, 10 bucket radice, cinque bucket figlio per ogni bucket radice e due risultati per ogni bucket figlio producono un massimo configurato pari a:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Utilizzare l’aggregazione di ricerca<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegli un esempio in base a ciò che desideri ottenere:</p>
<table>
<thead>
<tr><th>Vai a</th><th>Descrizione</th><th>Impostazioni chiave</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Confronta e ordina i bucket</a></td><td>Calcola le statistiche per ogni bucket per confrontarli, quindi ordina i bucket restituiti in base a metriche, conteggi o chiavi.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Mostra risultati rappresentativi da ciascun bucket</a></td><td>Restituisci un numero limitato di entità da ciascun bucket e ordina tali entità in modo indipendente in base ai campi scalari o al punteggio vettoriale.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Raggruppare i risultati su più livelli</a></td><td>Organizza i risultati in livelli di bucket padre e figlio per analizzare più dimensioni in sequenza.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Gli esempi riportati di seguito utilizzano una raccolta di prodotti con campi relativi a marchio, categoria, colore, prezzo e valutazione. Tutti i nomi dei marchi, i nomi dei prodotti, i prezzi, le valutazioni e i risultati di ricerca sono dati di esempio sintetici. Espandi la sezione seguente per creare la raccolta e definire le variabili di ricerca condivise.</p>
<p><details></p>
<p><summary>Configurazione della collezione di esempio</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>La configurazione sopra riportata imposta <code translate="no">COSINE</code> sia per l’indice vettoriale che per i parametri di ricerca. Pertanto, gli esempi successivi utilizzano <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> per posizionare per prime le somiglianze coseno più elevate. Per una metrica di distanza come <code translate="no">L2</code>, utilizzare <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Confronto e ordinamento dei bucket<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza questo modello quando devi confrontare gruppi di entità recuperate utilizzando statistiche calcolate e controllare l’ordine in cui vengono restituiti i bucket. In questo esempio, Milvus raggruppa i prodotti recuperati in base a <code translate="no">brand</code>, calcola le metriche di prezzo per ciascun bucket di marca e ordina i bucket in base al prezzo medio.</p>
<p>Se il tuo obiettivo è solo quello di migliorare la diversità dei risultati restituendo una o più entità per ogni valore di campo, utilizza invece <a href="/docs/it/grouping-search.md">la ricerca raggruppata</a>.</p>
<p>La seguente configurazione crea fino a tre bucket per marchio, calcola le metriche per ciascun bucket e ordina i bucket in base al prezzo medio:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Passa l’oggetto al parametro ` <code translate="no">search_aggregation</code> ` di ` <code translate="no">MilvusClient.search()</code>`:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Quando <code translate="no">search_aggregation</code> è impostato, PyMilvus non restituisce risultati di entità ordinari in <code translate="no">result[0]</code>. Leggi invece la risposta del bucket da <code translate="no">result.agg_buckets[0]</code>. Il parametro <code translate="no">output_fields</code> controlla quali campi scalari compaiono in ciascuna mappatura <code translate="no">AggregationHit.fields</code> restituita; Milvus può comunque utilizzare campi di origine delle metriche e di ordinamento che non sono elencati in <code translate="no">output_fields</code>.</p>
<p><details></p>
<p><summary>Visualizza l’output di esempio del bucket</summary></p>
<p>L'output seguente è stato acquisito dalla richiesta sopra riportata e serializzato in formato JSON per facilitarne la lettura. PyMilvus restituisce oggetti ` <code translate="no">AggregationBucket</code> ` anziché JSON. Il valore ` <code translate="no">key</code> ` è sempre un elenco ordinato di componenti chiave, anche quando ` <code translate="no">fields</code> ` contiene un solo campo. Ciò preserva l'ordine dei campi per le chiavi composte.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Per il singolo vettore di query in questa guida, leggere i bucket di primo livello restituiti da <code translate="no">result.agg_buckets[0]</code>. Ogni bucket espone i propri componenti chiave ordinati, i candidati conservati <code translate="no">count</code>, i valori calcolati <code translate="no">metrics</code>, i valori rappresentativi <code translate="no">hits</code> e i bucket nidificati in <code translate="no">sub_groups</code>.</p>
<p>Leggere la configurazione come segue:</p>
<table>
<thead>
<tr><th>Impostazione</th><th>Cosa controlla</th><th>In questo esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Come Milvus crea le chiavi dei bucket</td><td>Crea un bucket per ogni valore distinto di <code translate="no">brand</code>.</td></tr>
<tr><td><code translate="no">size</code></td><td>Il numero massimo di bucket restituiti</td><td>Restituisce fino a tre bucket di marca.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Le statistiche calcolate per ciascun bucket</td><td>Calcola il numero di prodotti, il prezzo medio e il prezzo minimo.</td></tr>
<tr><td><code translate="no">order</code></td><td>Come Milvus ordina i bucket restituiti</td><td>Ordina in base al prezzo medio, quindi utilizza la chiave del bucket per risolvere i casi di parità.</td></tr>
</tbody>
</table>
<p>Milvus ignora l'<code translate="no">limit</code> quando è impostato <code translate="no">search_aggregation</code>. Utilizza il valore di root <code translate="no">SearchAggregation.size</code> per controllare il numero di bucket di primo livello.</p>
<p>Con queste impostazioni, Milvus restituisce i bucket del Marchio B, del Marchio A e del Marchio C in ordine decrescente di <code translate="no">avg_price</code>. Il criterio <code translate="no">_key</code> si applica solo quando i bucket hanno lo stesso prezzo medio. Poiché questa configurazione non definisce <code translate="no">top_hits</code>, l’elenco <code translate="no">hits</code> di ogni bucket è vuoto e il budget candidato per chiave è <code translate="no">1</code>. I conteggi e le metriche visualizzati descrivono quindi un candidato conservato per ogni marchio. Configurare <code translate="no">top_hits</code> con un valore maggiore di <code translate="no">TopHits.size</code> quando l’aggregazione richiede una finestra di metriche per chiave più ampia.</p>
<p><details></p>
<p><summary>Metriche e regole di ordinamento</summary></p>
<p>Ogni voce di <code translate="no">SearchAggregation.metrics</code> associa un alias definito dall’utente a <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Origine</th><th>Operazioni supportate</th><th>Comportamento</th></tr>
</thead>
<tbody>
<tr><td>Qualsiasi campo non<code translate="no">JSON</code> e non dinamico</td><td><code translate="no">count</code></td><td>Conta i candidati mantenuti il cui campo di origine non è di tipo <code translate="no">NULL</code>.</td></tr>
<tr><td>Campo intero o in virgola mobile</td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Esegue il calcolo sui valori conservati non nulli.</td></tr>
<tr><td>Campo stringa o <code translate="no">TIMESTAMPTZ</code> </td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Seleziona il valore conservato non nullo minimo o massimo.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Conta ogni candidato conservato nel bucket. Il risultato corrisponde a <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Aggrega i valori di similarità o distanza ANN per i candidati conservati.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Accetta le seguenti chiavi:</p>
<table>
<thead>
<tr><th>Chiave di ordinamento</th><th>Significato</th></tr>
</thead>
<tbody>
<tr><td>Alias di una metrica</td><td>Ordina in base a un valore calcolato in <code translate="no">metrics</code> allo stesso livello di aggregazione, ad esempio <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Ordina in base al numero di candidati conservati in ciascun bucket.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Ordina in base alla chiave del bucket anziché a un campo della collezione denominato <code translate="no">_key</code>.</td></tr>
</tbody>
</table>
<p>Ogni voce di ` <code translate="no">order</code> ` associa una chiave a ` <code translate="no">&quot;asc&quot;</code> ` o ` <code translate="no">&quot;desc&quot;</code>`. Milvus valuta più voci dalla prima all’ultima. Se si omette ` <code translate="no">order</code>`, Milvus mantiene l’ordine di individuazione dei bucket dall’insieme dei candidati conservati.</p>
<p>Per ordinare i bucket in base alla qualità della corrispondenza vettoriale, calcolare innanzitutto una metrica a livello di bucket da <code translate="no">_score</code>, quindi utilizzare l’alias della metrica in <code translate="no">order</code>. Non è possibile utilizzare direttamente <code translate="no">_score</code> come chiave di ordinamento dei bucket poiché ogni bucket può contenere più punteggi di entità. Ad esempio, con <code translate="no">COSINE</code> o <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Con <code translate="no">L2</code>, calcolare il valore minimo di <code translate="no">_score</code> e ordinare l’alias della metrica in ordine crescente, in modo che i bucket con la distanza minima vengano visualizzati per primi.</p>
<p></details></p>
<p><details></p>
<p><summary>Creazione di chiavi di bucket composte</summary></p>
<p>Per creare una chiave di bucket composita, passare più nomi di campo nello stesso elenco:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Questa configurazione può produrre chiavi come <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code> e <code translate="no">(Brand B, white)</code>. Due entità condividono un bucket solo quando entrambi i valori corrispondono. Milvus mantiene l’ordine dell’elenco, quindi <code translate="no">brand</code> è il primo componente della chiave e <code translate="no">color</code> è il secondo. Quando si utilizza <code translate="no">_key</code> in <code translate="no">order</code>, Milvus confronta i componenti della chiave composita nello stesso ordine. Passare più stringhe in un unico elenco piatto; gli elenchi annidati non sono supportati.</p>
<p><code translate="no">size=6</code> è il numero massimo di bucket compositi restituiti a questo livello di aggregazione. I dati di esempio contengono cinque combinazioni distinte di marca e colore, quindi è possibile restituirle tutte e cinque. Nel <a href="#Limits">limite delle voci restituite</a>, questa richiesta contribuisce con <code translate="no">1 query vector × 6 buckets × 1 = 6</code> voci di risultato configurate.</p>
<p>Più campi in un unico elenco <code translate="no">SearchAggregation.fields</code> creano una chiave di bucket composita a quel livello di aggregazione. Per creare una gerarchia di bucket padre-figlio, utilizzare <a href="#Group-results-at-multiple-levels">un'aggregazione annidata</a>.</p>
<p></details></p>
<p>Gli esempi che seguono ridefinisc <code translate="no">aggregation</code>. Passare l’oggetto aggiornato allo stesso parametro <code translate="no">search_aggregation</code> ed eseguire nuovamente la chiamata di ricerca.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Mostra risultati rappresentativi da ciascun bucket<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Includere entità rappresentative quando l’applicazione deve mostrare prodotti effettivi da ciascun bucket. In questo esempio, Milvus restituisce fino a due prodotti da ciascun bucket di marca, ordinati per valutazione e poi per punteggio vettoriale.</p>
<p>Configurare <code translate="no">TopHits</code> come segue:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Visualizza un bucket con risultati rappresentativi</summary></p>
<p>Il seguente bucket del marchio A è stato estratto dalla richiesta sopra riportata e serializzato in formato JSON per facilitarne la lettura.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parametro</th><th>Scopo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Opzionale. Configura le entità rappresentative per questo livello di aggregazione. Se omesso, " <code translate="no">bucket.hits</code> " risulta vuoto e il budget candidato per chiave viene impostato di default a uno.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Restituisce fino a due entità rappresentative da ciascun bucket selezionato e imposta il budget candidato per chiave a due per l’intero albero di aggregazione.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Ordina le entità all’interno di ciascun bucket utilizzando i criteri elencati.</td></tr>
</tbody>
</table>
<p>Configurare ` <code translate="no">top_hits</code> ` quando l’applicazione necessita di entità rappresentative o quando i conteggi e le metriche richiedono una finestra di candidati per chiave più ampia. Un valore maggiore di ` <code translate="no">TopHits.size</code> ` aumenta sia il budget dei candidati sia il calcolo del numero massimo di voci restituite in <a href="#Limits">`Limits`</a>.</p>
<p><code translate="no">SearchAggregation.order</code> Ordina i bucket, mentre l’opzione « <code translate="no">TopHits.sort</code> » ordina le entità conservate all’interno di ciascun bucket. L’ordine di ordinamento non modifica quali candidati sono stati conservati per l’ <code translate="no">count</code> e le metriche. L’opzione « <code translate="no">TopHits.sort</code> » accetta nomi di campi scalari comparabili supportati e il campo integrato « <code translate="no">_score</code> », che rappresenta la somiglianza o la distanza ANN. Milvus valuta le voci « <code translate="no">sort</code> » dalla prima all’ultima. In questo esempio, ordina i prodotti in base a <code translate="no">rating</code> dal valore più alto a quello più basso e utilizza <code translate="no">_score</code> solo quando due valutazioni sono uguali. Poiché la configurazione utilizza <code translate="no">COSINE</code>, l’ordinamento discendente <code translate="no">_score</code> posiziona per primo il prodotto più simile.</p>
<p>I campi utilizzati da <code translate="no">metrics</code> o <code translate="no">TopHits.sort</code> non devono necessariamente comparire in <code translate="no">output_fields</code>. Milvus recupera tali campi internamente, ma solo i campi esplicitamente elencati in <code translate="no">output_fields</code> vengono inclusi nella mappatura <code translate="no">fields</code> di ciascun risultato restituito. Le chiavi primarie e i punteggi vettoriali rimangono disponibili tramite <code translate="no">AggregationHit.pk</code> e <code translate="no">AggregationHit.score</code>.</p>
<p>Ogni <code translate="no">AggregationHit</code> restituito espone la propria chiave primaria in <code translate="no">pk</code>, il punteggio vettoriale in <code translate="no">score</code> e i campi di output richiesti in <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Raggruppamento dei risultati su più livelli<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare l’aggregazione annidata quando è necessario un livello di bucket all’interno di un altro. In questo esempio, Milvus crea prima i bucket di categoria, quindi crea i bucket di marca all’interno di ciascuna categoria.</p>
<p>L’aggregazione figlia riceve solo le entità assegnate al proprio bucket padre. <code translate="no">fields</code> controlla la chiave del bucket a ciascun livello di aggregazione, mentre <code translate="no">sub_aggregation</code> crea la gerarchia padre-figlio.</p>
<p>La configurazione riportata di seguito crea un bucket di categoria con la chiave <code translate="no">(running_shoes)</code>. All’interno di quel bucket padre, l’aggregazione figlia crea bucket di marchio separati con chiavi quali <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> e <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Ogni livello può utilizzare più campi in modo indipendente. Ad esempio, l’utilizzo di <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> nell’aggregazione figlia creerebbe chiavi figlie composte come <code translate="no">(Brand A, black)</code>.</p>
<p>La seguente configurazione implementa questa gerarchia:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Visualizzazione del risultato di un bucket annidato</summary></p>
<p>Il seguente estratto serializzato mostra il bucket padre <code translate="no">running_shoes</code> e il suo bucket figlio Brand B. I bucket figli Brand A e Brand C sono stati omessi per brevità.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Il risultato visualizzato rappresenta il percorso del bucket <code translate="no">(running_shoes) → (Brand B)</code>, non una singola chiave composita del bucket <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Milvus seleziona innanzitutto fino a due bucket di categoria, ordinati in base a <code translate="no">product_count</code>. Successivamente esegue <code translate="no">sub_aggregation</code> in modo indipendente all’interno di ciascuna categoria selezionata e restituisce fino a tre bucket di marchio, ordinati in base a <code translate="no">avg_rating</code>.</p>
<p>Nell’output sopra riportato:</p>
<ul>
<li>Il bucket radice <code translate="no">running_shoes</code> contiene quattro candidati mantenuti distribuiti tra le sue chiavi composite figlie. I suoi <code translate="no">metrics</code> contengono i valori di livello radice <code translate="no">avg_price</code> e <code translate="no">product_count</code>.</li>
<li>L'elenco <code translate="no">sub_groups</code> del bucket radice contiene i bucket secondari relativi ai marchi. Il bucket "Brand B" visualizzato contiene un candidato conservato e i propri valori <code translate="no">avg_rating</code> e <code translate="no">brand_count</code>.</li>
<li>L’elenco <code translate="no">hits</code> del bucket radice è vuoto perché l’aggregazione radice non configura <code translate="no">top_hits</code>. Il bucket figlio del marchio B contiene un risultato rappresentativo perché <code translate="no">top_hits</code> è configurato in <code translate="no">sub_aggregation</code>.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Domande frequenti<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Quanto sono accurati i conteggi e le metriche dei bucket?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>L’aggregazione di ricerca riassume i candidati ANN conservati. Non esegue un’aggregazione completa della raccolta.</p>
<p>La conservazione dei candidati prevede due fasi di approssimazione. La ricerca ANN può omettere entità rilevanti della collezione, mentre la fase di raggruppamento conserva al massimo i candidati più grandi <code translate="no">TopHits.size</code> per ciascuna chiave composita completa. Se nessun livello configura <code translate="no">top_hits</code>, questo limite per chiave è pari a uno.</p>
<p>Ad esempio, supponiamo che una collezione contenga 5.000 prodotti del Marchio A e che molti siano rilevanti per la query vettoriale. Se l’aggregazione utilizza ` <code translate="no">TopHits(size=4)</code>`, il bucket del Marchio A può conservare al massimo quattro candidati per una chiave composita completa. Il suo ` <code translate="no">count</code> ` e le metriche descrivono quei candidati conservati, non tutti i prodotti rilevanti del Marchio A e non tutte le 5.000 entità della collezione.</p>
<p>L’approssimazione è particolarmente rilevante quando l’ <code translate="no">order</code> utilizza un alias di metrica. Le variazioni nel recall della ricerca possono modificare i valori delle metriche e, di conseguenza, determinare quali bucket rientrano nell’ <code translate="no">SearchAggregation.size</code>. L’aggregazione annidata può amplificare questo effetto poiché ogni livello figlio opera sulle entità disponibili nel proprio bucket padre.</p>
<p>Se sono necessarie statistiche esatte su ogni entità corrispondente, utilizzare un flusso di lavoro di aggregazione con query esatta anziché l’aggregazione di ricerca.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">In che modo l’aggregazione di ricerca differisce dalla ricerca per raggruppamento?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Scegli in base alla forma principale dei risultati dell’applicazione:</p>
<table>
<thead>
<tr><th>Esigenza primaria</th><th>Preferire</th><th>Risposta da utilizzare</th></tr>
</thead>
<tbody>
<tr><td>Restituisce un elenco standard di entità ordinato per rilevanza con un minor numero di valori ripetuti in un campo di raggruppamento</td><td><a href="/docs/it/grouping-search.md">Ricerca raggruppata</a></td><td>Risultati di ricerca piatti per ciascun vettore di query</td></tr>
<tr><td>Esamina o confronta i gruppi come bucket, con chiavi, conteggi, metriche, ordinamento, risultati rappresentativi o bucket secondari</td><td>Aggregazione della ricerca</td><td><code translate="no">AggregationBucket</code> oggetti in <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Anche quando l’aggregazione della ricerca configura <code translate="no">top_hits</code>, la sua risposta principale rimane un albero di bucket. La ricerca raggruppata rimane utile quando l’applicazione elabora già risultati di ricerca ordinari e mira principalmente alla diversità dei risultati.</p>
<p>Le API si escludono a vicenda. PyMilvus genera un'eccezione « <code translate="no">ParamError</code> » quando « <code translate="no">search_aggregation</code> » viene combinata con « <code translate="no">group_by_field</code> » o « <code translate="no">group_by_fields</code> » nella stessa richiesta.</p>
