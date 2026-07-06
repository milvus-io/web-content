---
id: filtered-search-with-structarray.md
title: Ricerca filtrata con StructArray
summary: >-
  Utilizza questa pagina per aggiungere il filtraggio scalare alla ricerca
  vettoriale sui campi StructArray. Il filtraggio StructArray prevede due
  livelli: i filtri a livello di riga selezionano le entità padre, mentre i
  filtri a livello di elemento limitano quali elementi Struct partecipano alla
  ricerca vettoriale a livello di elemento.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Ricerca filtrata con StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare questa pagina per aggiungere filtri scalari alla ricerca vettoriale sui campi StructArray. Il filtraggio StructArray prevede due livelli: i filtri a livello di riga selezionano le entità padre, mentre i filtri a livello di elemento limitano quali elementi Struct partecipano alla ricerca vettoriale a livello di elemento.</p>
<p>Questa pagina utilizza la raccolta " <code translate="no">tech_articles</code> " descritta in <a href="/docs/it/create-structarray-field.md">"Creazione di un campo StructArray</a>". La raccolta presenta un campo StructArray denominato " <code translate="no">chunks</code>", con sottocampi scalari quali " <code translate="no">section</code>", " <code translate="no">page</code>", " <code translate="no">quality_score</code>" e " <code translate="no">has_code</code>", oltre a sottocampi vettoriali per la ricerca.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Scegli un tipo di filtro<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Obiettivo</th><th>Utilizzo</th><th>Comportamento del risultato</th></tr>
</thead>
<tbody>
<tr><td>Filtra in base a un campo scalare di primo livello, come <code translate="no">category</code>.</td><td>Espressione di filtro regolare.</td><td>Seleziona le entità padre prima o durante la ricerca.</td></tr>
<tr><td>Limita la ricerca vettoriale a livello di elemento agli elementi Struct che soddisfano le condizioni scalari.</td><td><code translate="no">element_filter</code>.</td><td>Cerca solo gli elementi Struct corrispondenti e può restituire gli offset degli elementi trovati.</td></tr>
<tr><td>Seleziona le entità in base al fatto che uno, tutti o un numero specifico di elementi Struct soddisfino un predicato.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, o <code translate="no">MATCH_EXACT</code>.</td><td>Filtraggio a livello di riga. Questi operatori non restituiscono offset di per sé.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Questa pagina spiega come utilizzare i filtri StructArray nei flussi di lavoro di ricerca. Per le regole sintattiche complete, i tipi di predicato supportati e la matrice dei predicati non supportati, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Filtraggio in base ai campi di primo livello<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare espressioni di filtro regolari quando la condizione riguarda l’entità padre, non un singolo elemento Struct. Ciò funziona sia con la ricerca EmbeddingList che con la ricerca a livello di elemento.</p>
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
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Il filtro sopra riportato seleziona solo le entità il cui campo di primo livello <code translate="no">category</code> è <code translate="no">&quot;search&quot;</code>. Non identifica un singolo elemento Struct corrispondente.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Filtraggio della ricerca vettoriale a livello di elemento<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare ` <code translate="no">element_filter(structArrayField, predicate)</code> ` quando le condizioni scalari devono applicarsi allo stesso elemento Struct che partecipa alla ricerca vettoriale a livello di elemento. All’interno del predicato, utilizzare ` <code translate="no">$[subfield]</code> ` per fare riferimento ai sottocampi scalari dell’elemento Struct corrente.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>In questo esempio, il predicato di primo livello ` <code translate="no">category == &quot;search&quot;</code> ` seleziona le entità candidate, mentre ` <code translate="no">element_filter</code> ` limita la ricerca vettoriale a livello di elemento ai blocchi in cui ` <code translate="no">section</code>`, ` <code translate="no">quality_score</code>` e ` <code translate="no">has_code</code> ` corrispondono tutti nello stesso elemento Struct.</p>
<div class="alert note">
<p>Avviso</p>
<p>Quando si combina un predicato di primo livello con <code translate="no">element_filter</code>, posizionare <code translate="no">element_filter</code> alla fine dell’espressione. Un’espressione di filtro può contenere un solo <code translate="no">element_filter</code> e non è possibile annidare <code translate="no">element_filter</code> o <code translate="no">MATCH_*</code> all’interno di un altro operatore StructArray.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Filtrare le entità con gli operatori MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare gli operatori <code translate="no">MATCH_*</code> quando il filtro deve decidere se un’entità padre soddisfa i requisiti in base ai propri elementi Struct. Questi operatori sono filtri a livello di riga: selezionano le entità, ma non restituiscono di per sé gli offset degli elementi.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Utilizzarlo quando</th><th>Esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Almeno un elemento Struct deve soddisfare il predicato.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Tutti gli elementi Struct devono soddisfare il predicato.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Almeno <code translate="no">N</code> elementi della struttura devono soddisfare il predicato.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Al massimo <code translate="no">N</code> elementi della struttura devono soddisfare il predicato.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Esattament <code translate="no">N</code> i elementi Struct devono soddisfare il predicato.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>Utilizzare " <code translate="no">MATCH_ANY</code> " in questo caso poiché il risultato della ricerca EmbeddingList è a livello di entità. Il filtro richiede che almeno un chunk nell'entità sia un chunk " <code translate="no">&quot;index&quot;</code> " di alta qualità, ma il risultato della ricerca stesso rappresenta comunque l'entità padre.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Utilizzo dei filtri nella ricerca ibrida<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nella ricerca ibrida, applicare i filtri StructArray dove la condizione deve avere effetto. Un filtro di primo livello può essere condiviso dall’intera ricerca ibrida. Un <code translate="no">element_filter</code> dovrebbe essere associato alla richiesta a livello di elemento StructArray che necessita di vincoli a livello di elemento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>L'argomento <code translate="no">filter</code> applica la condizione a livello di entità di primo livello, mentre l'<code translate="no">expr</code> e su <code translate="no">chunk_req</code> limita solo la richiesta vettoriale a livello di elemento di StructArray. Per le combinazioni di ricerca ibrida supportate e i limiti specifici per versione, consultare <a href="/docs/it/hybrid-search-with-structarray.md">Ricerca ibrida con StructArray</a> e <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Riepilogo del supporto dei predicati<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare sottocampi scalari nei predicati StructArray. I sottocampi vettoriali non sono input per i predicati scalari.</p>
<table>
<thead>
<tr><th>Tipo di sottocampo</th><th>Esempi tipici di predicati</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Tipi interi</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Sottocampi vettoriali</td><td>Non supportati come input per i predicati scalari di <code translate="no">$[...]</code>. Utilizzare invece i sottocampi vettoriali tramite la ricerca vettoriale.</td></tr>
</tbody>
</table>
<p>Per i casi non supportati, quali percorsi JSON, funzioni relative ai contenitori array, funzioni di corrispondenza testuale, predicati null su <code translate="no">$[...]</code>, funzioni geometriche, espressioni Timestamptz e chiamate a funzioni generiche, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
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
<li><p>Utilizzo di ` <code translate="no">$[subfield]</code> ` al di fuori di ` <code translate="no">element_filter</code> ` o ` <code translate="no">MATCH_*</code>`.</p></li>
<li><p>Utilizzo di ` <code translate="no">chunks.section</code> ` al posto della sintassi degli operatori StructArray, come ad esempio ` <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>`.</p></li>
<li><p>Utilizzo di ` <code translate="no">element_filter</code> ` quando è necessario solo un filtro a livello di riga. Utilizzare invece ` <code translate="no">MATCH_ANY</code> ` se è necessario selezionare solo le entità.</p></li>
<li><p>Aspettarsi che ` <code translate="no">MATCH_*</code> ` restituisca gli offset degli elementi. Questi operatori selezionano le entità e non identificano di per sé un singolo elemento corrispondente.</p></li>
<li><p>Scrivere predicati booleani semplici come <code translate="no">$[has_code]</code>. Utilizzare confronti espliciti come <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>Inserire ` <code translate="no">element_filter</code> ` prima di un predicato di primo livello nella stessa espressione di filtro.</p></li>
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
<li><p>Per consultare la sintassi completa dei filtri StructArray, leggere <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p></li>
<li><p>Per eseguire prima ricerche vettoriali non filtrate, leggere <a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a>.</p></li>
<li><p>Per creare indici scalari per i filtri StructArray utilizzati di frequente, leggere " <a href="/docs/it/index-structarray-fields.md">Indice dei campi StructArray</a>".</p></li>
<li><p>Per verificare i limiti di filtro e ricerca specifici per versione, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
