---
id: range-search-with-structarray.md
title: Ricerca per intervallo con StructArray
summary: >-
  Utilizza questa pagina per eseguire una ricerca per intervallo sui sottocampi
  vettoriali di StructArray. La ricerca per intervallo restituisce i risultati
  vettoriali il cui punteggio o distanza rientra in un intervallo specificato.
  Per i campi StructArray, utilizza la ricerca per intervallo insieme alla
  ricerca vettoriale a livello di elemento, in cui ogni elemento Struct viene
  cercato in modo indipendente.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Ricerca per intervallo con StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare questa pagina per eseguire una ricerca per intervallo sui sottocampi vettoriali di StructArray. La ricerca per intervallo restituisce i risultati vettoriali il cui punteggio o distanza rientra in un intervallo specificato. Per i campi StructArray, utilizzare la ricerca per intervallo con la ricerca vettoriale a livello di elemento, in cui ogni elemento Struct viene cercato in modo indipendente.</p>
<p>Questa pagina utilizza la raccolta « <code translate="no">tech_articles</code> » ( <a href="/docs/it/create-structarray-field.md">Creazione di un campo StructArray</a>) tratta da <a href="/docs/it/create-structarray-field.md">«Create a StructArray Field»</a>(Creazione di un campo StructArray). La raccolta presenta un campo StructArray denominato « <code translate="no">chunks</code> ». Il sottocampo vettoriale « <code translate="no">chunks[emb]</code> » è indicizzato per la ricerca a livello di elemento con una metrica vettoriale regolare, come « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » o « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Come si applica la ricerca per intervallo a StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Modalità di ricerca</th><th>Comportamento della ricerca per intervallo</th><th>Granularità dei risultati</th></tr>
</thead>
<tbody>
<tr><td>Ricerca EmbeddingList</td><td>Non supportata.</td><td>Non applicabile.</td></tr>
<tr><td>Ricerca a livello di elemento</td><td>Utilizzare una query vettoriale standard con <code translate="no">radius</code> e, facoltativamente, <code translate="no">range_filter</code>.</td><td>Livello degli elementi della struttura.</td></tr>
<tr><td>Ricerca ibrida</td><td>Supportata quando la richiesta StructArray ha come destinazione un campo vettoriale a livello di elemento. Le richieste a livello di EmbeddingList non supportano la ricerca per intervallo.</td><td>Ricerca secondaria a livello di elemento, seguita da un nuovo ordinamento ibrido.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Se ti servono solo gli elementi Struct più vicini, inizia con <a href="/docs/it/basic-vector-search-with-structarray.md">la ricerca vettoriale di base con StructArray</a>. Usa la ricerca per intervallo quando il risultato deve soddisfare un limite di punteggio o di distanza invece di limitarsi a una classifica top-K.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Preparare la raccolta, i dati e gli indici prima di eseguire la ricerca per intervallo.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>La collezione contiene un campo StructArray, ad esempio <code translate="no">chunks</code>.</td></tr>
<tr><td>Sottocampo vettoriale a livello di elemento</td><td>Il sottocampo vettoriale di destinazione è <code translate="no">chunks[emb]</code>, non <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Metrica di indicizzazione</td><td>Il sottocampo vettoriale è indicizzato con una metrica vettoriale regolare, come <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Dati della query</td><td>La query è un vettore regolare, non un <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Per la configurazione dell’indice, consultare la sezione <a href="/docs/it/index-structarray-fields.md">«Campi StructArray dell’indice</a>».</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Utilizzare radius e range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Impostare ` <code translate="no">radius</code> ` per definire il limite di ricerca. Impostare ` <code translate="no">range_filter</code> ` quando è necessario anche un limite interno. La direzione dipende dal fatto che sia preferibile una distanza minore o un punteggio di similarità maggiore.</p>
<table>
<thead>
<tr><th>Tipo di metrica</th><th>È preferibile un punteggio più alto?</th><th>Condizione di intervallo quando si utilizza ` <code translate="no">range_filter</code> `</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>No. È preferibile una distanza minore.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Sì. Un punteggio più alto è preferibile.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Quando è impostato solo " <code translate="no">radius</code> ", la ricerca per intervallo restituisce i risultati che soddisfano il limite esterno della metrica. Scegli i valori in base alla scala di punteggio o di distanza dei tuoi embedding.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Eseguire una ricerca per intervallo a livello di elemento<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente cerca singoli chunk i cui vettori di <code translate="no">chunks[emb]</code> siano sufficientemente simili al vettore di query. Ogni risultato trovato rappresenta un elemento Struct corrispondente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, <code translate="no">COSINE</code> è una metrica di tipo "similarity", quindi l'intervallo dei risultati è maggiore di <code translate="no">radius</code> e minore o uguale a <code translate="no">range_filter</code>. Il valore <code translate="no">offset</code> identifica l'elemento Struct corrispondente nell'array <code translate="no">chunks</code> al momento della restituzione.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Aggiungere filtri scalari<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile combinare la ricerca per intervallo a livello di elemento con il filtraggio scalare di StructArray. Utilizzare un predicato di primo livello per i campi dell’entità padre e utilizzare <code translate="no">element_filter</code> per limitare quali elementi Struct partecipano alla ricerca per intervallo vettoriale.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Il predicato di primo livello seleziona le entità candidate. Il predicato ` <code translate="no">element_filter</code> ` limita la ricerca per intervallo vettoriale agli elementi Struct corrispondenti. Per ulteriori esempi di filtraggio, vedere <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Utilizzo della ricerca per intervallo nella ricerca ibrida<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>I campi vettoriali a livello di elemento di StructArray supportano la ricerca per intervallo nella ricerca ibrida. Aggiungere ` <code translate="no">radius</code> ` e, facoltativamente, ` <code translate="no">range_filter</code> ` alla richiesta ` <code translate="no">AnnSearchRequest</code> ` che ha come destinazione il campo vettoriale a livello di elemento di StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, solo la sotto-richiesta <code translate="no">chunks[emb]</code> utilizza i parametri di ricerca per intervallo. La richiesta StructArray segue comunque la semantica a livello di elemento: il limite dell’intervallo si applica ai risultati corrispondenti agli elementi Struct prima che la ricerca ibrida combini e riclassifichi i risultati.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Interpretazione dei risultati dell’intervallo<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Elemento del risultato</th><th>Significato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Chiave primaria dell’entità che contiene l’elemento Struct corrispondente.</td></tr>
<tr><td><code translate="no">distance</code> o punteggio</td><td>Il punteggio o la distanza tra il vettore di query e il vettore dell'elemento Struct corrispondente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posizione, a partire da zero, dell’elemento Struct corrispondente nel campo StructArray al momento della restituzione.</td></tr>
<tr><td>Chiavi primarie ripetute</td><td>Possibile. Più di un elemento Struct nella stessa entità può rientrare nell'intervallo specificato.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Si applica ai risultati relativi agli elementi, non alle entità padre univoche.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitazioni<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Non utilizzare una query di tipo " <code translate="no">EmbeddingList</code> " o una metrica " <code translate="no">MAX_SIM*</code> " per la ricerca per intervallo sui sottocampi vettoriali di StructArray. La ricerca a livello di EmbeddingList non supporta la ricerca per intervallo.</p></li>
<li><p>Non combinare la ricerca per intervallo con la ricerca raggruppata. Se è necessario un risultato per ogni entità padre, eseguire una ricerca a livello di elemento senza parametri di intervallo e utilizzare il raggruppamento dove supportato.</p></li>
<li><p>La ricerca per intervallo ibrida è supportata per i campi vettoriali a livello di elemento di StructArray. Non è supportata per le richieste StructArray a livello di EmbeddingList.</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">Errori comuni<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Eseguire la ricerca per intervallo su <code translate="no">chunks[emb_list_vector]</code>, che è destinato alla ricerca a livello di EmbeddingList.</p></li>
<li><p>Utilizzo di <code translate="no">MAX_SIM_COSINE</code> al posto di una metrica standard come <code translate="no">COSINE</code> per la ricerca per intervallo a livello di elemento.</p></li>
<li><p>Utilizzo di una query <code translate="no">EmbeddingList</code> al posto di una normale query vettoriale.</p></li>
<li><p>Aspettarsi che i risultati della ricerca per intervallo siano univoci per entità padre. La ricerca per intervallo restituisce risultati corrispondenti a elementi Struct.</p></li>
<li><p>Utilizzo di <code translate="no">chunks.emb</code> al posto della sintassi richiesta per il percorso del sottocampo <code translate="no">chunks[emb]</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Prossimi passi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Per conoscere le due modalità di ricerca vettoriale di base con StructArray, leggere <a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a>.</p></li>
<li><p>Per aggiungere filtri scalari alla ricerca per intervallo, consultare <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p></li>
<li><p>Per restituire al massimo un risultato per entità padre, ove supportato, leggere <a href="/docs/it/grouping-search-with-structarray.md">Ricerca raggruppata con StructArray</a>.</p></li>
<li><p>Per verificare i limiti di ricerca specifici per versione, leggere <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
