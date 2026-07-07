---
id: grouping-search-with-structarray.md
title: Raggruppamento dei risultati di ricerca con StructArray
summary: >-
  Utilizza questa pagina per raggruppare i risultati della ricerca a livello di
  elemento di StructArray in base all'entità padre. La ricerca a livello di
  elemento può restituire più risultati provenienti dalla stessa entità quando
  diversi elementi di Struct corrispondono alla query. Il raggruppamento
  raggruppa tali risultati a livello di elemento in modo che ogni entità padre
  compaia al massimo una volta.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Raggruppamento dei risultati di ricerca con StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare questa pagina per raggruppare i risultati della ricerca a livello di elemento StructArray in base all'entità padre. La ricerca a livello di elemento può restituire più risultati provenienti dalla stessa entità quando diversi elementi Struct corrispondono alla query. Il raggruppamento comprime tali risultati a livello di elemento in modo che ogni entità padre appaia al massimo una volta.</p>
<p>Questa pagina utilizza la raccolta « <code translate="no">tech_articles</code> » descritta in <a href="/docs/it/create-structarray-field.md">«Creazione di un campo StructArray</a>». La raccolta presenta un campo StructArray denominato « <code translate="no">chunks</code> ». Il sottocampo vettoriale « <code translate="no">chunks[emb]</code> » è indicizzato per la ricerca a livello di elemento con una metrica vettoriale regolare.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Come si applica il raggruppamento a StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Modalità di ricerca</th><th>Comportamento del raggruppamento</th><th>Comportamento dei risultati</th></tr>
</thead>
<tbody>
<tr><td>Ricerca EmbeddingList</td><td>Non supportata.</td><td>Non applicabile.</td></tr>
<tr><td>Ricerca a livello di elemento</td><td>Supportata tramite raggruppamento sulla chiave primaria.</td><td>Restituisce al massimo un risultato per entità padre. I metadati a livello di elemento vengono conservati, pertanto l'indice o l'offset dell'elemento selezionato può essere restituito quando esposto dall'API o dall'SDK.</td></tr>
<tr><td>Ricerca ibrida</td><td>Supportata solo quando tutte le sotto-ricerche hanno come obiettivo campi vettoriali a livello di elemento all'interno dello stesso campo StructArray.</td><td>Le sotto-ricerche a livello di elemento vengono raggruppate in base alla chiave primaria prima della gestione del risultato finale.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Utilizzare il raggruppamento quando la ricerca a livello di elemento non raggruppata restituisce troppe entità padre duplicate. Se si desidera che ogni elemento Struct corrispondente venga considerato come un singolo risultato, utilizzare <a href="/docs/it/basic-vector-search-with-structarray.md">la ricerca vettoriale di base con StructArray</a> senza l'opzione ` <code translate="no">group_by_field</code>`.</p>
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
    </button></h2><p>Preparare la raccolta, i dati e gli indici prima di eseguire la ricerca con raggruppamento.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Sottocampo vettoriale a livello di elemento</td><td>Utilizzare un sottocampo vettoriale StructArray, ad esempio <code translate="no">chunks[emb]</code>, indicizzato con una metrica vettoriale regolare.</td></tr>
<tr><td>Query vettoriale regolare</td><td>Utilizzare un vettore di query regolare, non un <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>Raggruppamento per chiave primaria</td><td>Utilizzare la chiave primaria della collezione come <code translate="no">group_by_field</code>, ad esempio <code translate="no">doc_id</code>.</td></tr>
<tr><td>Nessun parametro di intervallo</td><td>Non combinare la ricerca per raggruppamento con parametri di ricerca per intervallo come <code translate="no">radius</code> o <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Per la configurazione dell’indice, consultare <a href="/docs/it/index-structarray-fields.md">i campi StructArray dell’indice</a>.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Eseguire una ricerca raggruppata a livello di elemento<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente effettua prima la ricerca nei singoli chunk, quindi raggruppa i risultati a livello di elemento in base alla chiave primaria dell'entità padre.</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Senza raggruppamento, lo stesso <code translate="no">doc_id</code> può apparire più volte se diversi chunk corrispondono alla query. Con <code translate="no">group_by_field=&quot;doc_id&quot;</code>, ogni entità padre appare al massimo una volta. Il raggruppamento preserva i metadati a livello di elemento, quindi il risultato raggruppato può comunque includere l’indice o l’offset dell’elemento Struct selezionato quando l’API o l’SDK lo espongono.</p>
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
    </button></h2><p>È possibile combinare la ricerca con raggruppamento con il filtraggio scalare di StructArray. Utilizzare <code translate="no">element_filter</code> quando la condizione scalare deve limitare quali elementi Struct partecipano alla ricerca vettoriale a livello di elemento.</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Il predicato di primo livello seleziona le entità candidate. Il predicato ` <code translate="no">element_filter</code> ` limita la ricerca vettoriale a livello di elemento agli elementi Struct corrispondenti. Il raggruppamento raggruppa quindi i risultati corrispondenti in base alla chiave primaria.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Utilizzo del raggruppamento nella ricerca ibrida<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Il raggruppamento ibrido con StructArray è una funzionalità a livello di elemento. È supportato solo quando tutte le sotto-ricerche hanno come obiettivo campi vettoriali a livello di elemento all’interno dello stesso campo StructArray. Non utilizzare richieste a livello di EmbeddingList in una ricerca ibrida raggruppata su StructArray.</p>
<p>L'esempio seguente presuppone che il campo StructArray <code translate="no">chunks</code> abbia due sottocampi vettoriali a livello di elemento, <code translate="no">chunks[emb]</code> e <code translate="no">chunks[code_emb]</code>, ed entrambi siano indicizzati con metriche vettoriali regolari.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, entrambe le sotto-richieste hanno come obiettivo campi vettoriali a livello di elemento all’interno dello stesso campo StructArray, <code translate="no">chunks</code>. Una ricerca ibrida non supporta il raggruppamento a livello di elemento se mescola campi vettoriali normali, campi StructArray diversi o richieste a livello di EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Interpretazione dei risultati raggruppati<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Chiave primaria dell’entità padre raggruppata.</td></tr>
<tr><td><code translate="no">distance</code> o punteggio</td><td>Punteggio o distanza dell'elemento Struct selezionato per quell'entità padre.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posizione a partire da zero dell’elemento Struct selezionato al momento della restituzione.</td></tr>
<tr><td>Chiavi primarie ripetute</td><td>Non previsto in caso di raggruppamento in base alla chiave primaria.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Si applica ai risultati raggruppati dell’entità padre.</td></tr>
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
<li><p>La ricerca con raggruppamento si applica solo alla ricerca vettoriale StructArray a livello di elemento. La ricerca EmbeddingList e la ricerca ibrida a livello di EmbeddingList non supportano il raggruppamento.</p></li>
<li><p>Utilizzare la chiave primaria come <code translate="no">group_by_field</code>. Il raggruppamento a livello di elemento StructArray non è un raggruppamento generico su campi scalari arbitrari.</p></li>
<li><p>Non combinare la ricerca con raggruppamento con la ricerca per intervallo.</p></li>
<li><p>Non utilizzare una query di tipo " <code translate="no">EmbeddingList</code> " o una metrica " <code translate="no">MAX_SIM*</code> " per la ricerca raggruppata.</p></li>
<li><p>Il raggruppamento ibrido è supportato solo quando tutte le sotto-ricerche hanno come obiettivo campi vettoriali a livello di elemento all’interno dello stesso campo StructArray.</p></li>
<li><p>Il raggruppamento ibrido non è supportato quando la ricerca ibrida combina un campo vettoriale normale, un campo StructArray diverso o una richiesta a livello di EmbeddingList.</p></li>
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
<li><p>Utilizzo del raggruppamento con ` <code translate="no">chunks[emb_list_vector]</code>`, destinato alla ricerca su `EmbeddingList`.</p></li>
<li><p>Raggruppamento in base a un campo scalare non chiave primaria.</p></li>
<li><p>Raggruppamento in base a più campi. Il raggruppamento StructArray a livello di elemento supporta solo il raggruppamento in base alla chiave primaria.</p></li>
<li><p>Aspettarsi che i risultati raggruppati rappresentino ogni elemento Struct corrispondente. Il raggruppamento restituisce al massimo un risultato per entità padre.</p></li>
<li><p>Presumere che la ricerca raggruppata a livello di elemento ricalcoli un punteggio di tipo " <code translate="no">MAX_SIM*</code> " in stile EmbeddingList. Il raggruppamento comprime i risultati a livello di elemento; non modifica il modello di punteggio.</p></li>
<li><p>Combinazione dell’ <code translate="no">group_by_field</code> con <code translate="no">radius</code> o <code translate="no">range_filter</code>.</p></li>
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
<li><p>Per imparare prima la ricerca a livello di elemento non raggruppata, leggi <a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a>.</p></li>
<li><p>Per aggiungere filtri scalari alla ricerca raggruppata, leggi <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p></li>
<li><p>Per utilizzare limiti di punteggio o di distanza al posto del raggruppamento, leggi <a href="/docs/it/range-search-with-structarray.md">Ricerca per intervallo con StructArray</a>.</p></li>
<li><p>Per verificare i limiti di ricerca di StructArray, leggi <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
