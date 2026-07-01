---
id: hybrid-search-with-structarray.md
title: Ricerca ibrida con StructArray
summary: >-
  Utilizza questa pagina per combinare la ricerca vettoriale StructArray con
  altre ricerche vettoriali in un'unica richiesta di ricerca ibrida. La ricerca
  ibrida StructArray può produrre risultati a livello di entità o a livello di
  elemento, a seconda degli oggetti AnnSearchRequest che si combinano.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Ricerca ibrida con StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizza questa pagina per combinare la ricerca vettoriale StructArray con altre ricerche vettoriali in un'unica richiesta di ricerca ibrida. La ricerca ibrida StructArray può produrre risultati a livello di entità o a livello di elemento, a seconda degli oggetti <code translate="no">AnnSearchRequest</code> che si combinano.</p>
<p>Questa pagina utilizza la raccolta <code translate="no">tech_articles</code> tratta da <a href="/docs/it/create-structarray-field.md">"Creare un campo StructArray</a>". La raccolta presenta un campo vettoriale di primo livello denominato <code translate="no">title_vector</code> e un campo StructArray denominato <code translate="no">chunks</code>. Il sottocampo <code translate="no">chunks[emb_list_vector]</code> è indicizzato per la ricerca EmbeddingList, mentre <code translate="no">chunks[emb]</code> è indicizzato per la ricerca a livello di elemento.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Come si applica la ricerca ibrida a StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> combinazione</th><th>Ambito dei candidati finali</th><th>Comportamento del risultato</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Campo vettoriale a livello di collezione + sottocampo EmbeddingList di StructArray</td><td>Livello entità</td><td>I candidati finali sono indicizzati in base alla chiave primaria.</td><td>Da non utilizzare.</td></tr>
<tr><td>Campo vettoriale a livello di collezione + sottocampo a livello di elemento di StructArray</td><td>Livello entità</td><td>I risultati a livello di elemento vengono raggruppati in candidati a livello di entità prima del riordino ibrido.</td><td>Configurazione opzionale di raggruppamento a livello di elemento StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Più sottocampi a livello di elemento all’interno dello stesso campo StructArray</td><td>Livello dell’elemento</td><td>I candidati finali sono identificati dalla chiave primaria più l'offset dell'elemento Struct.</td><td>Non utilizzare.</td></tr>
<tr><td>Sottocampi a livello di elemento sotto diversi campi StructArray</td><td>Livello dell’entità</td><td>Gli offset degli elementi non condividono l’identità, pertanto ogni <code translate="no">AnnSearchRequest</code> a livello di elemento di StructArray viene compresso prima della riclassificazione.</td><td>Configurazione facoltativa di compressione per ogni <code translate="no">AnnSearchRequest</code> e a livello di elemento di StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Avviso</p>
<p>Utilizzare <code translate="no">element_scope</code> solo per configurare il raggruppamento per oggetti <code translate="no">AnnSearchRequest</code> a livello di elemento di StructArray in una ricerca ibrida a livello di elemento non della stessa struttura. Non utilizzarlo per richieste EmbeddingList, richieste vettoriali a livello di raccolta o ricerche ibride a livello di elemento dello stesso StructArray.</p>
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
    </button></h2><p>Preparare la collezione, i dati e gli indici prima di eseguire la ricerca ibrida.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray</td><td>La collezione contiene un campo StructArray, ad esempio <code translate="no">chunks</code>.</td></tr>
<tr><td>Sottocampi vettoriali</td><td>Utilizzare sottocampi vettoriali separati per la ricerca EmbeddingList e la ricerca a livello di elemento.</td></tr>
<tr><td>Indici</td><td><code translate="no">chunks[emb_list_vector]</code> utilizza una metrica di tipo <code translate="no">MAX_SIM*</code>. <code translate="no">chunks[emb]</code> utilizza una metrica vettoriale regolare, come <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Reranker</td><td>Scegliere un reranker ibrido come <code translate="no">RRFRanker</code> o un altro reranker supportato dall’applicazione.</td></tr>
</tbody>
</table>
<p>Per la configurazione dell’indice, consultare <a href="/docs/it/index-structarray-fields.md">i campi StructArray dell’indice</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Eseguire una ricerca ibrida con una richiesta EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca EmbeddingList su un sottocampo vettoriale StructArray è a livello di entità nella ricerca ibrida. Si comporta come una richiesta di ricerca vettoriale a livello di entità e non restituisce un unico offset dell’elemento Struct corrispondente.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, entrambi gli oggetti ` <code translate="no">AnnSearchRequest</code> ` producono candidati a livello di entità. Il risultato finale è indicizzato in base alla chiave primaria dell’entità padre. Non aggiungere ` <code translate="no">element_scope</code> ` alla richiesta `EmbeddingList`.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Eseguire una ricerca ibrida a livello di elemento con lo stesso `StructArray`<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando tutti gli oggetti ` <code translate="no">AnnSearchRequest</code> ` hanno come target sottocampi vettoriali a livello di elemento all’interno dello stesso campo `StructArray`, la ricerca ibrida può mantenere i candidati a livello di elemento tramite un nuovo ordinamento. Questa è l’unica modalità ibrida di `StructArray` in cui i risultati finali rimangono a livello di elemento.</p>
<p>L’esempio seguente presuppone che il campo StructArray <code translate="no">chunks</code> abbia due sottocampi vettoriali a livello di elemento, <code translate="no">chunks[emb]</code> e <code translate="no">chunks[code_emb]</code>, ed entrambi utilizzino metriche vettoriali regolari.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Entrambi gli oggetti <code translate="no">AnnSearchRequest</code> effettuano la ricerca nei sottocampi vettoriali presenti in <code translate="no">chunks</code>. Lo stesso offset con base zero fa riferimento allo stesso elemento Struct, pertanto il sistema di riclassificazione ibrido può classificare direttamente i candidati a livello di elemento. Non impostare <code translate="no">element_scope</code> in questa modalità poiché non viene eseguito alcun raggruppamento a livello di entità.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Comprimere i risultati a livello di elemento per la ricerca ibrida a livello di entità<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Se una ricerca ibrida combina un <code translate="no">AnnSearchRequest</code> a livello di elemento StructArray con una richiesta vettoriale a livello di collezione, una richiesta EmbeddingList o una richiesta a livello di elemento in un campo StructArray diverso, l’ambito finale dei candidati è a livello di entità. In questo caso, ogni <code translate="no">AnnSearchRequest</code> a livello di elemento StructArray viene raggruppato in candidati a livello di entità prima del riordino ibrido.</p>
<p>Utilizzare ` <code translate="no">element_scope</code> ` all’interno di ` <code translate="no">params</code> ` dell’` <code translate="no">AnnSearchRequest</code> ` a livello di elemento di StructArray quando è necessario controllare il modo in cui vengono raggruppati più elementi corrispondenti della stessa entità.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>In questo esempio, ` <code translate="no">title_req</code> ` è a livello di entità, quindi anche il risultato ibrido finale è a livello di entità. La richiesta ` <code translate="no">chunk_req</code> ` restituisce innanzitutto i risultati a livello di elemento da ` <code translate="no">chunks[emb]</code>`, quindi raggruppa gli elementi restituiti provenienti dalla stessa entità sommando i punteggi dei tre migliori elementi. Se ` <code translate="no">element_scope</code> ` viene omesso quando è necessario un raggruppamento a livello di entità, la strategia di raggruppamento predefinita è ` <code translate="no">max</code>`.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Scegliere una strategia di raggruppamento<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Strategia</th><th>Comportamento</th><th><code translate="no">topk</code></th><th>Requisito metrico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Mantenere il punteggio migliore tra gli elementi restituiti per l’entità.</td><td>Non consentito.</td><td>Qualsiasi metrica vettoriale regolare supportata.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Sommare tutti i punteggi degli elementi restituiti per l'entità.</td><td>Non consentito.</td><td>Solo metriche a correlazione positiva, come <code translate="no">IP</code> o <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Calcola la media di tutti i punteggi degli elementi restituiti per l’entità.</td><td>Non consentito.</td><td>Qualsiasi metrica vettoriale regolare supportata.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Somma i migliori punteggi degli elementi restituiti da <code translate="no">K</code> per l'entità.</td><td>Obbligatorio e deve essere positivo.</td><td>Solo metriche a correlazione positiva, come <code translate="no">IP</code> o <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Calcola la media dei punteggi degli elementi migliori restituiti dall'<code translate="no">K</code> per l'entità.</td><td>Obbligatorio e deve essere positivo.</td><td>Qualsiasi metrica vettoriale regolare supportata.</td></tr>
</tbody>
</table>
<p>Il collasso utilizza solo i risultati degli elementi restituiti da quell’ <code translate="no">AnnSearchRequest</code> a livello di elemento di StructArray. Non esegue la scansione di ogni elemento Struct nell’entità dopo la ricerca ANN. Impostare l’ <code translate="no">limit</code> della richiesta a un valore sufficientemente alto da fornire gli elementi che si desidera siano disponibili per il collasso.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Aggiungere filtri, ricerca per intervallo e raggruppamento<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile associare un'<code translate="no">element_filter</code> a un <code translate="no">AnnSearchRequest</code> a livello di elemento di StructArray quando le condizioni scalari devono essere applicate agli stessi elementi Struct che partecipano alla ricerca vettoriale. È inoltre possibile utilizzare un <code translate="no">filter</code> di primo livello su <code translate="no">hybrid_search()</code> per le condizioni relative all'entità padre.</p>
<p>I campi vettoriali a livello di elemento di StructArray supportano la ricerca per intervallo nella ricerca ibrida. Aggiungere <code translate="no">radius</code> e, facoltativamente, <code translate="no">range_filter</code> all’ <code translate="no">AnnSearchRequest</code> a livello di elemento. Le richieste StructArray a livello di EmbeddingList non supportano la ricerca per intervallo.</p>
<p>Il raggruppamento ibrido a livello di elemento è supportato solo quando tutti gli oggetti ` <code translate="no">AnnSearchRequest</code> ` hanno come destinazione campi vettoriali a livello di elemento all’interno dello stesso campo `StructArray`, e ` <code translate="no">group_by_field</code> ` deve essere la chiave primaria. Il raggruppamento ibrido non è supportato quando la richiesta combina campi vettoriali a livello di collezione, campi `StructArray` diversi o richieste a livello di `EmbeddingList`. Non combinare la ricerca per intervallo con il raggruppamento.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Interpretazione dei risultati ibridi<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Ambito dei candidati finali</th><th>Chiave del risultato</th><th>Comportamento dell’offset</th><th>Quando si verifica</th></tr>
</thead>
<tbody>
<tr><td>A livello di entità</td><td>Chiave primaria.</td><td>Nessun offset degli elementi nel risultato finale.</td><td>La richiesta ibrida include un campo vettoriale a livello di collezione, una richiesta EmbeddingList o richieste a livello di elemento in diversi campi StructArray.</td></tr>
<tr><td>Livello dell’elemento</td><td>Chiave primaria più campo StructArray padre più offset dell’elemento.</td><td>L'offset dell'elemento selezionato può essere restituito quando esposto dall'API o dall'SDK.</td><td>Tutti gli oggetti " <code translate="no">AnnSearchRequest</code> " sono a livello di elemento e si trovano all'interno dello stesso campo StructArray.</td></tr>
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
<li><p>Utilizzare <code translate="no">element_scope</code> solo per oggetti " <code translate="no">AnnSearchRequest</code> " a livello di elemento di StructArray che devono essere ridotti a candidati a livello di entità nella ricerca ibrida.</p></li>
<li><p>Non utilizzare <code translate="no">element_scope</code> per le richieste EmbeddingList, le richieste vettoriali a livello di raccolta o la ricerca ibrida a livello di elemento dello stesso StructArray.</p></li>
<li><p><code translate="no">sum</code> e le strategie di raggruppamento <code translate="no">topk_sum</code> richiedono metriche di correlazione positiva, come <code translate="no">IP</code> o <code translate="no">COSINE</code>. Non utilizzarle con <code translate="no">L2</code>.</p></li>
<li><p><code translate="no">topk_sum</code> e <code translate="no">topk_avg</code> richiedono un valore positivo di <code translate="no">topk</code>. Altre strategie di raggruppamento non devono includere <code translate="no">topk</code>.</p></li>
<li><p>Le richieste StructArray a livello di EmbeddingList non supportano la ricerca per intervallo né il raggruppamento.</p></li>
<li><p>Il raggruppamento ibrido è supportato solo per la ricerca ibrida a livello di elemento dello stesso StructArray e solo tramite chiave primaria.</p></li>
<li><p>Non combinare la ricerca per intervallo con il raggruppamento.</p></li>
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
<li><p>Aggiungere ` <code translate="no">element_scope</code> ` a una richiesta ibrida a livello di elemento dello stesso `StructArray`. Tale richiesta rimane a livello di elemento e non esegue il raggruppamento a livello di entità.</p></li>
<li><p>Aggiunta di un’ <code translate="no">element_scope</code> a un’ <code translate="no">chunks[emb_list_vector]</code>. La ricerca EmbeddingList è già a livello di entità.</p></li>
<li><p>Supporre che due campi StructArray condividano gli offset degli elementi. L’offset <code translate="no">3</code> in <code translate="no">chunks</code> e l’offset <code translate="no">3</code> in un altro campo StructArray corrispondono a elementi diversi, pertanto la richiesta ibrida diventa a livello di entità.</p></li>
<li><p>Utilizzo di <code translate="no">topk_sum</code> con <code translate="no">L2</code>. Utilizzare <code translate="no">max</code>, <code translate="no">avg</code> o <code translate="no">topk_avg</code> per metriche di distanza negative.</p></li>
<li><p>Ci si aspetta che i risultati ibridi a livello di entità includano l’offset dell’elemento Struct selezionato dopo il collasso.</p></li>
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
<li><p>Per aggiungere filtri scalari alla ricerca ibrida, consultare <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p></li>
<li><p>Per utilizzare i limiti di punteggio o di distanza nella ricerca ibrida, consultare <a href="/docs/it/range-search-with-structarray.md">Ricerca per intervallo con StructArray</a>.</p></li>
<li><p>Per raggruppare i risultati ibridi a livello di elemento in base all’entità padre, consultare <a href="/docs/it/grouping-search-with-structarray.md">Ricerca raggruppata con StructArray</a>.</p></li>
<li><p>Per verificare i limiti di ricerca di StructArray, leggi " <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>".</p></li>
</ol>
