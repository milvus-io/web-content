---
id: array-of-structs.md
title: Panoramica su StructArray
summary: >-
  Utilizza StructArray quando un'entità deve memorizzare un elenco ordinato di
  elementi strutturati, come ad esempio un documento composto da più blocchi,
  una pagina con più elementi visivi o un video composto da più clip.
  StructArray conserva questi elementi all'interno dell'entità padre,
  consentendo al contempo la ricerca vettoriale e il filtraggio scalare sui
  campi all'interno di ciascun elemento.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Panoramica su StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare StructArray quando un'entità deve memorizzare un elenco ordinato di elementi strutturati, come ad esempio un documento con molti segmenti, una pagina con molte aree visive o un video con molte clip. StructArray conserva questi elementi all'interno dell'entità principale, consentendo al contempo la ricerca vettoriale e il filtraggio scalare sui campi all'interno di ciascun elemento.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">Che cos’è StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Uno <strong>StructArray</strong>, noto anche come array di Struct, memorizza un insieme ordinato di elementi Struct in ciascuna entità. Ogni elemento Struct nell’array segue lo stesso schema. Un elemento Struct può contenere sottocampi scalari, sottocampi vettoriali o entrambi.</p>
<p>Ad esempio, una raccolta può memorizzare un articolo come entità e memorizzarne i segmenti in un campo StructArray denominato <code translate="no">chunks</code>. Ogni segmento può includere testo, metadati della sezione, punteggi di qualità e uno o più embedding vettoriali.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>I due sottocampi vettoriali in questo esempio rappresentano lo stesso blocco da due prospettive di ricerca. ` <code translate="no">chunks[emb_list_vector]</code> ` è destinato alla ricerca EmbeddingList con metriche ` <code translate="no">MAX_SIM*</code> `, mentre ` <code translate="no">chunks[emb]</code> ` è destinato alla ricerca a livello di elemento con metriche vettoriali standard quali ` <code translate="no">COSINE</code>`, ` <code translate="no">IP</code>` o ` <code translate="no">L2</code>`.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Quando utilizzare StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare StructArray quando l’unità naturale che si desidera restituire è più grande dell’unità naturale che si desidera cercare o filtrare.</p>
<table>
<thead>
<tr><th>Caso d'uso</th><th>Perché StructArray è utile</th><th>Campo StructArray tipico</th></tr>
</thead>
<tbody>
<tr><td>Recupero di documenti</td><td>Memorizza un documento come entità mentre si effettua la ricerca nei suoi blocchi.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Recupero con interazione ritardata</td><td>Memorizza un documento o una pagina come elenco di embedding e assegnagli un punteggio con <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> oppure <code translate="no">patches[emb]</code></td></tr>
<tr><td>Recupero a livello di elemento</td><td>Restituisci il frammento, il clip, la patch o l’osservazione più rilevante, compreso il relativo offset nell’array.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Filtraggio strutturato</td><td>Filtra in base ai sottocampi scalari all'interno degli elementi Struct, quali sezione, punteggio, pagina o flag.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Riduzione dei risultati duplicati a livello di entità padre</td><td>Mantiene gli elementi figli sotto la stessa entità padre invece di memorizzare ciascun figlio come riga separata.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Matrice decisionale<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare la seguente matrice per scegliere il percorso StructArray corretto.</p>
<table>
<thead>
<tr><th>Obiettivo</th><th>Percorso consigliato</th><th>Granularità del risultato</th><th>Inizia da qui</th></tr>
</thead>
<tbody>
<tr><td>Modellare un oggetto padre con molti figli strutturati.</td><td>Crea un campo StructArray.</td><td>L'entità contiene elementi Struct ordinati.</td><td><a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a></td></tr>
<tr><td>Inserisci record padre con dati figlio annidati.</td><td>Inserire entità il cui campo StructArray sia un elenco di oggetti Struct.</td><td>Inserimento a livello di entità.</td><td><a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a></td></tr>
<tr><td>Eseguire ColBERT, ColPali o il recupero a interazione tardiva a livello di documento.</td><td>Utilizzare la ricerca EmbeddingList con un indice <code translate="no">MAX_SIM*</code>.</td><td>A livello di entità.</td><td><a href="/docs/it/search-with-embedding-lists.md">Ricerca con Embedding List</a></td></tr>
<tr><td>Cerca singoli chunk, clip o patch.</td><td>Utilizza la ricerca a livello di elemento con una metrica vettoriale regolare.</td><td>Livello di elemento Struct, con offset quando disponibile.</td><td>Ricerca vettoriale di base con StructArray</td></tr>
<tr><td>Limita la ricerca vettoriale a livello di elemento agli elementi che soddisfano condizioni scalari.</td><td>Utilizza ` <code translate="no">element_filter</code>`.</td><td>Filtraggio a livello di elemento; la forma del risultato dipende dal tipo di ricerca.</td><td>Ricerca filtrata con StructArray</td></tr>
<tr><td>Selezionare le entità in base al numero di elementi Struct che soddisfano una condizione.</td><td>Utilizzare <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code>.</td><td>Livello entità.</td><td><a href="/docs/it/struct-array-operators.md">Operatori StructArray</a></td></tr>
<tr><td>Utilizzare limiti di punteggio o di distanza sui sottocampi vettoriali di StructArray.</td><td>Utilizzare la ricerca per intervallo a livello di elemento.</td><td>Livello degli elementi di Struct.</td><td>Ricerca per intervallo con StructArray</td></tr>
<tr><td>Restituisce al massimo un risultato per entità padre dopo la ricerca a livello di elemento.</td><td>Utilizzare la ricerca raggruppata per chiave primaria.</td><td>Livello entità dopo il raggruppamento.</td><td>Ricerca raggruppata con StructArray</td></tr>
<tr><td>Combina la ricerca sugli elementi di StructArray con un altro campo vettoriale.</td><td>Utilizzare la ricerca ibrida con un AnnSearchRequest mirato a un sottocampo vettoriale di StructArray.</td><td>Ricerca secondaria a livello di elemento, riordino dei risultati a livello di entità.</td><td>Ricerca ibrida con StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Comprendere i due modelli di ricerca<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### Ricerca EmbeddingList La ricerca EmbeddingList tratta i vettori all’interno di un sottocampo vettoriale di StructArray come un unico elenco di embedding per l’entità padre. Anche la query è un elenco di embedding. Milvus confronta l’elenco di embedding della query con quello memorizzato utilizzando una metrica <code translate="no">MAX_SIM*</code> e restituisce le entità corrispondenti. - Dati della query: elenco di embedding. - Famiglia di metriche: <code translate="no">MAX_SIM*</code>. - Granularità dei risultati: livello di entità. - Ideale per: recupero con interazione tardiva a livello di documento o di pagina.</th><th>### Ricerca a livello di elemento La ricerca a livello di elemento tratta ogni elemento Struct come un candidato indipendente per la ricerca vettoriale. Ogni risultato positivo rappresenta un elemento corrispondente all’interno del campo StructArray, e i risultati non raggruppati possono rivelare l’offset dell’elemento. - Dati della query: vettore regolare. - Famiglia di metriche: metriche vettoriali regolari. - Granularità dei risultati: livello di elemento Struct. - Ideale per: recupero a livello di blocco, clip o patch.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Avviso</p>
<p>Se la tua raccolta richiede sia la ricerca EmbeddingList che quella a livello di elemento, utilizza due sottocampi vettoriali separati. Un campo vettoriale o un sottocampo vettoriale accetta un solo indice, e le due modalità di ricerca richiedono famiglie di metriche diverse.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Mappa della documentazione<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>La documentazione di StructArray è suddivisa in pagine dedicate alla modellazione e pagine dedicate alla ricerca. Utilizza le pagine di modellazione per definire e preparare i dati. Utilizza le pagine di ricerca per scegliere il comportamento di recupero e filtraggio più adatto.</p>
<table>
<thead>
<tr><th>Area</th><th>Pagina</th><th>Utilizzala per</th></tr>
</thead>
<tbody>
<tr><td>Modellazione</td><td><a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a></td><td>Definire lo schema Struct e aggiungere un campo StructArray.</td></tr>
<tr><td>Modellazione</td><td><a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento dei dati nei campi StructArray</a></td><td>Preparare e inserire dati StructArray annidati.</td></tr>
<tr><td>Modellazione</td><td><a href="/docs/it/index-structarray-fields.md">Indice dei campi StructArray</a></td><td>Creare indici vettoriali e scalari sui sottocampi di StructArray.</td></tr>
<tr><td>Riferimento</td><td><a href="/docs/it/structarray-limits.md">Limiti di StructArray</a></td><td>Verifica i limiti relativi a schema, tipo di dati, indice, ricerca, filtro e versione.</td></tr>
<tr><td>Ricerca</td><td>Ricerca vettoriale di base con StructArray</td><td>Confronta la ricerca EmbeddingList con la ricerca vettoriale a livello di elemento.</td></tr>
<tr><td>Ricerca</td><td>Ricerca per intervallo con StructArray</td><td>Utilizza i vincoli di intervallo con i sottocampi vettoriali di StructArray.</td></tr>
<tr><td>Ricerca</td><td>Ricerca raggruppata con StructArray</td><td>Raggruppa i risultati della ricerca a livello di elemento in base alla chiave primaria.</td></tr>
<tr><td>Ricerca</td><td>Ricerca ibrida con StructArray</td><td>Combina la ricerca a livello di elemento con StructArray con altre ricerche vettoriali.</td></tr>
<tr><td>Ricerca</td><td>Ricerca filtrata con StructArray</td><td>Utilizza i filtri di StructArray nella ricerca, nella query e nella ricerca ibrida.</td></tr>
<tr><td>Ricerca</td><td><a href="/docs/it/search-with-embedding-lists.md">Ricerca con elenchi di embedding</a></td><td>Crea sistemi di recupero in stile ColBERT e ColPali con StructArray.</td></tr>
<tr><td>Filtro</td><td><a href="/docs/it/struct-array-operators.md">Operatori StructArray</a></td><td>Sintassi di riferimento per gli operatori <code translate="no">element_filter</code> e <code translate="no">MATCH_*</code>.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Limiti chiave da verificare per primi<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct può essere utilizzato come tipo di elemento di un campo Array. Non viene utilizzato come campo di raccolta di primo livello.</p></li>
<li><p>Tutti gli elementi Struct presenti nello stesso campo StructArray condividono uno schema predefinito.</p></li>
<li><p>I sottocampi vettoriali richiedono indici. La ricerca EmbeddingList utilizza le metriche di <code translate="no">MAX_SIM*</code>, mentre la ricerca a livello di elemento utilizza le normali metriche vettoriali.</p></li>
<li><p><code translate="no">element_filter</code> e <code translate="no">MATCH_*</code> sono destinati ai sottocampi scalari all’interno dei campi StructArray. Utilizzare <code translate="no">$[subfield]</code> solo all’interno di questi operatori.</p></li>
<li><p>Alcune combinazioni di ricerca sono limitate alla versione o specifiche della modalità. Verificare <a href="/docs/it/structarray-limits.md">i limiti di StructArray</a> prima di fare affidamento sulla ricerca per intervallo, sulla ricerca per raggruppamento, sulla ricerca ibrida, sui campi nullabili o sui campi aggiunti dinamicamente.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Passi successivi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Per progettare uno schema, leggere <a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a>.</p></li>
<li><p>Per preparare i dati, leggere <a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a>.</p></li>
<li><p>Per scegliere gli indici, leggere " <a href="/docs/it/index-structarray-fields.md">Indicizzazione dei campi StructArray</a>".</p></li>
<li><p>Per effettuare ricerche nei sottocampi vettoriali di StructArray, iniziare con Ricerca vettoriale di base con StructArray.</p></li>
<li><p>Per filtrare i sottocampi scalari di StructArray, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a> e Ricerca filtrata con StructArray.</p></li>
</ol>
