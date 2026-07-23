---
id: basic-vector-search-with-structarray.md
title: Ricerca vettoriale di base con StructArray
summary: >-
  Utilizza questa pagina per eseguire una ricerca vettoriale sui sottocampi
  vettoriali all'interno di un campo StructArray. StructArray supporta due
  modalità di ricerca vettoriale di base: la ricerca EmbeddingList, che valuta
  un elenco di embedding memorizzato in ciascuna entità, e la ricerca a livello
  di elemento, che effettua la ricerca su ciascun elemento Struct in modo
  indipendente.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Ricerca vettoriale di base con StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizza questa pagina per eseguire una ricerca vettoriale sui sottocampi vettoriali all'interno di un campo StructArray. StructArray supporta due modalità di ricerca vettoriale di base: la ricerca EmbeddingList, che valuta un elenco di embedding memorizzato in ciascuna entità, e la ricerca a livello di elemento, che effettua la ricerca su ciascun elemento Struct in modo indipendente.</p>
<p>Questa pagina utilizza la raccolta " <code translate="no">tech_articles</code> " descritta nella sezione <a href="/docs/it/create-structarray-field.md">"Creazione di un campo StructArray</a>". La raccolta presenta un campo StructArray denominato " <code translate="no">chunks</code>". Ogni chunk contiene testo, metadati scalari, un sottocampo vettoriale denominato " <code translate="no">emb_list_vector</code> " con un indice per la ricerca EmbeddingList e un sottocampo vettoriale denominato " <code translate="no">emb</code> " con un indice per la ricerca a livello di elemento.</p>
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
    </button></h2><p>Assicurarsi che lo schema della raccolta, i dati e gli indici siano già stati preparati.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Dove prepararlo</th></tr>
</thead>
<tbody>
<tr><td>Creare un campo StructArray, ad esempio <code translate="no">chunks</code>.</td><td><a href="/docs/it/create-structarray-field.md">Creazione di un campo StructArray</a></td></tr>
<tr><td>Inserire entità il cui campo ` <code translate="no">chunks</code> ` contenga oggetti Struct.</td><td><a href="/docs/it/insert-data-into-structarray-fields.md">Inserire dati nei campi StructArray</a></td></tr>
<tr><td>Creare un indice ` <code translate="no">MAX_SIM*</code> ` su ` <code translate="no">chunks[emb_list_vector]</code> ` per la ricerca in `EmbeddingList`.</td><td><a href="/docs/it/index-structarray-fields.md">Indicizzare i campi StructArray</a></td></tr>
<tr><td>Creare un indice vettoriale-metrico regolare su <code translate="no">chunks[emb]</code> per la ricerca a livello di elemento.</td><td><a href="/docs/it/index-structarray-fields.md">Indicizzazione dei campi StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Avviso</p>
<p>Un campo vettoriale o un sottocampo vettoriale accetta un solo indice. Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, creare due sottocampi vettoriali separati. In questa pagina, <code translate="no">chunks[emb_list_vector]</code> è indicizzato per la ricerca EmbeddingList, mentre <code translate="no">chunks[emb]</code> è indicizzato per la ricerca a livello di elemento.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Scegliere una modalità di ricerca<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspetto</th><th>Ricerca EmbeddingList</th><th>Ricerca a livello di elemento</th></tr>
</thead>
<tbody>
<tr><td>Sottocampo di destinazione</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Dati di query</td><td>Un elenco di embedding contenente uno o più vettori.</td><td>Un vettore regolare.</td></tr>
<tr><td>Famiglia di metriche</td><td><code translate="no">MAX_SIM*</code>, come ad esempio <code translate="no">MAX_SIM_COSINE</code>.</td><td>Metriche vettoriali regolari, come <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Cosa rappresenta un risultato</td><td>Un'entità corrispondente il cui sottocampo vettoriale StructArray è simile all'elenco di embedding della query.</td><td>Un elemento Struct corrispondente all’interno del campo StructArray.</td></tr>
<tr><td>Granularità dei risultati</td><td>A livello di entità.</td><td>A livello di elemento Struct.</td></tr>
<tr><td>Offset</td><td>Non applicabile.</td><td>Identifica la posizione, a partire da zero, dell’elemento Struct corrispondente al momento della restituzione.</td></tr>
<tr><td>Uso tipico</td><td>ColBERT, ColPali e altri modelli di recupero a interazione tardiva.</td><td>Recupero a livello di chunk, di passaggio, di clip, di patch o di fatto.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Esegui la ricerca EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare la ricerca EmbeddingList quando la query stessa contiene più vettori e il sottocampo vettoriale StructArray di destinazione è indicizzato con una metrica <code translate="no">MAX_SIM*</code>. Il risultato è una corrispondenza a livello di entità.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>In questa modalità di ricerca, l’ <code translate="no">limit</code> controlla il numero di entità restituite per ciascuna query. L’output può includere sottocampi StructArray, ma il risultato stesso rappresenta l’entità padre corrispondente piuttosto che un singolo elemento Struct specifico.</p>
<div class="alert note">
<p>Per una guida completa in stile ColBERT o ColPali, consultare <a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi di embedding</a>. Questa pagina tratta solo il comportamento di base della ricerca su StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Eseguire una ricerca a livello di elemento<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare la ricerca a livello di elemento quando ogni elemento Struct deve partecipare alla ricerca vettoriale in modo indipendente. La query è un vettore regolare e il sottocampo vettoriale di destinazione deve essere indicizzato con una metrica vettoriale regolare.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>Nella ricerca a livello di elemento, ogni risultato rappresenta un elemento Struct corrispondente. Il valore " <code translate="no">offset</code> " è la posizione, a partire da zero, di quell’elemento nel campo StructArray. La stessa entità può comparire più di una volta se più di un elemento Struct corrisponde alla query. Il valore " <code translate="no">limit</code> " si applica ai risultati a livello di elemento, non alle entità padre univoche.</p>
<h2 id="Interpret-results" class="common-anchor-header">Interpretazione dei risultati<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Elemento del risultato</th><th>Ricerca EmbeddingList</th><th>Ricerca a livello di elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Chiave primaria dell’entità corrispondente.</td><td>Chiave primaria dell'entità che contiene l'elemento Struct corrispondente.</td></tr>
<tr><td><code translate="no">distance</code> o punteggio</td><td>Punteggio o distanza tra l'elenco di embedding della query e l'elenco di embedding memorizzato.</td><td>Punteggio o distanza tra il vettore della query e il vettore dell’elemento Struct corrispondente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Non applicabile.</td><td>Posizione a partire da zero dell'elemento Struct corrispondente al momento della restituzione.</td></tr>
<tr><td>Chiavi primarie ripetute</td><td>Non previsto per una singola query poiché i risultati sono a livello di entità.</td><td>Possibile, poiché più elementi Struct nella stessa entità possono corrispondere.</td></tr>
<tr><td>Campi di output StructArray richiesti</td><td>Restituiti dall’entità corrispondente.</td><td>Restituiti con la forma di corrispondenza a livello di elemento supportata dall’API e dall’SDK di destinazione.</td></tr>
</tbody>
</table>
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
<li><p>Utilizzo di " <code translate="no">chunks.emb</code> " anziché della sintassi richiesta per il percorso del sottocampo " <code translate="no">chunks[emb]</code>".</p></li>
<li><p>Utilizzo di una query EmbeddingList su un sottocampo vettoriale indicizzato con una metrica vettoriale regolare.</p></li>
<li><p>Utilizzo di una query vettoriale regolare su un sottocampo vettoriale indicizzato con una metrica <code translate="no">MAX_SIM*</code>.</p></li>
<li><p>Aspettarsi che la ricerca a livello di elemento <code translate="no">limit</code> restituisca altrettante entità padre univoche. Restituisce invece i risultati a livello di elemento.</p></li>
<li><p>Aspettarsi che la ricerca EmbeddingList restituisca un offset specifico dell’elemento. Restituisce invece corrispondenze a livello di entità.</p></li>
<li><p>Riutilizzo di un unico sottocampo vettoriale per entrambe le modalità di ricerca. Utilizzare sottocampi vettoriali separati poiché ogni sottocampo vettoriale accetta un solo indice.</p></li>
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
<li><p>Per limitare la ricerca a livello di elemento in base a condizioni scalari, consultare <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p></li>
<li><p>Per effettuare ricerche in base a punteggi o limiti di distanza, consultare <a href="/docs/it/range-search-with-structarray.md">Ricerca per intervallo con StructArray</a>.</p></li>
<li><p>Per restituire al massimo un risultato per entità padre dopo una ricerca a livello di elemento, consultare <a href="/docs/it/grouping-search-with-structarray.md">Ricerca raggruppata con StructArray</a>.</p></li>
<li><p>Per combinare la ricerca StructArray con altre ricerche vettoriali, consultare <a href="/docs/it/hybrid-search-with-structarray.md">Ricerca ibrida con StructArray</a>.</p></li>
<li><p>Per esaminare i tipi di dati, le metriche, i filtri e i limiti specifici della versione supportati, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
