---
id: structarray-limits.md
title: Limiti di StructArray
summary: >-
  Il supporto per StructArray comprende la definizione dello schema,
  l'inserimento dei payload, l'indicizzazione, le modalità di ricerca e i filtri
  specifici di StructArray. Utilizza questa pagina come riferimento per i limiti
  prima di fare affidamento sul comportamento di StructArray in produzione.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Limiti di StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Il supporto di StructArray comprende la definizione dello schema, l'inserimento dei payload, l'indicizzazione, le modalità di ricerca e i filtri specifici di StructArray. Utilizza questa pagina come riferimento per i limiti prima di affidarti al comportamento di StructArray in produzione.</p>
<p>La maggior parte dei limiti di StructArray deriva da una delle tre fonti seguenti: il modello di schema di StructArray, la modalità di ricerca scelta per i sottocampi vettoriali e la versione di Milvus su cui viene eseguita la collezione.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Panoramica dei limiti<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Area</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Struttura dello schema</td><td>Una Struct può essere utilizzata solo come tipo di elemento di un campo Array. La Struct non è supportata come campo di raccolta di primo livello.</td></tr>
<tr><td>Schema dei sottocampi</td><td>Tutti gli elementi Struct presenti nello stesso campo StructArray condividono un unico schema Struct predefinito.</td></tr>
<tr><td>Capacità</td><td><code translate="no">max_capacity</code> è obbligatorio e limita il numero di elementi Struct che un'entità può memorizzare nel campo StructArray.</td></tr>
<tr><td>Modifiche ai sottocampi</td><td>Una volta creato un campo StructArray, non è possibile aggiungere sottocampi a quel campo StructArray esistente.</td></tr>
<tr><td>Percorso del sottocampo</td><td>Utilizzare percorsi <code translate="no">structArray[subfield]</code>, come ad esempio <code translate="no">chunks[emb]</code>, per indici, obiettivi di ricerca, campi di output e filtri. Non utilizzare <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Inserimento della forma</td><td>Inserire un campo StructArray come array di oggetti. Non utilizzare la sintassi dei percorsi all'interno dei payload di inserimento.</td></tr>
<tr><td>Indici vettoriali</td><td>Un campo vettoriale o un sottocampo vettoriale accetta un solo indice. Utilizzare sottocampi vettoriali separati per la ricerca EmbeddingList e la ricerca a livello di elemento.</td></tr>
<tr><td>Funzioni</td><td>Le funzioni di campo non sono supportate per i campi o i sottocampi all'interno di un campo StructArray.</td></tr>
<tr><td>Campi nullabili</td><td>I campi StructArray nullabili sono soggetti a restrizioni di versione. Quando supportati, il valore null si applica all'intero campo StructArray, non a un singolo elemento Struct in modo indipendente.</td></tr>
<tr><td>Aggiunta dinamica di un campo</td><td>L'aggiunta di un campo StructArray a una collezione esistente dipende dalla versione e richiede che il campo aggiunto sia nullabile.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Limiti dello schema<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Limite</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Struct non è un tipo di campo di primo livello.</td><td>Creare un campo StructArray come <code translate="no">datatype=DataType.ARRAY</code> con <code translate="no">element_type=DataType.STRUCT</code> e un <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Tutti gli elementi condividono un unico schema.</td><td>Ogni elemento Struct in un campo StructArray segue lo stesso elenco di sottocampi e gli stessi tipi di dati dei sottocampi.</td></tr>
<tr><td><code translate="no">max_capacity</code> è obbligatorio.</td><td>Il numero di elementi Struct in un'entità non deve superare l'<code translate="no">max_capacity</code> e configurata per il campo StructArray.</td></tr>
<tr><td>I sottocampi esistenti sono fissi.</td><td>Non è possibile aggiungere nuovi sottocampi a un campo StructArray esistente. Per modificare lo schema dei sottocampi, eliminare il campo StructArray e aggiungerlo nuovamente con lo schema aggiornato.</td></tr>
<tr><td>Gli StructArray annidati non sono supportati.</td><td>Un campo StructArray non può contenere sottocampi annidati di tipo <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> o <code translate="no">ArrayOfStruct</code>.</td></tr>
<tr><td>Le funzioni non sono supportate all'interno di StructArray.</td><td>Non definire funzioni di campo per i campi StructArray o i relativi sottocampi.</td></tr>
</tbody>
</table>
<p>Per esempi sulla creazione di schemi, vedere <a href="/docs/it/create-structarray-field.md">Creazione di un campo StructArray</a>.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Tipi di dati supportati per i sottocampi<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>I sottocampi di StructArray corrispondono a una memorizzazione fisica in stile array. La tabella seguente elenca i tipi fisici supportati e quelli non supportati.</p>
<table>
<thead>
<tr><th>Tipo fisico del sottocampo Struct</th><th>Supporto</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Supportato</td><td>Definire il sottocampo come ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> o <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT</code> o <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.VARCHAR</code> e impostare <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT16_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.BFLOAT16_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.INT8_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.BINARY_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Non supportato</td><td>I sottocampi vettoriali sparsi non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non supportato</td><td>Utilizzare <code translate="no">VARCHAR</code>, non <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non supportato</td><td>I sottocampi JSON non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non supportato</td><td>I sottocampi di geometria e le funzioni GIS non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non supportato</td><td>I sottocampi di tipo testo non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non supportato</td><td>I sottocampi "timestamptz" e le espressioni relative al tempo non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> o <code translate="no">ArrayOfStruct</code></td><td>Non supportato</td><td>I campi StructArray non supportano sottocampi annidati di tipo array, array vettoriale, Struct o Array-of-Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Limiti relativi agli schemi dinamici e ai valori null<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Il comportamento di StructArray con valori null e l’aggiunta dinamica di campi StructArray dipendono dalla versione.</p>
<table>
<thead>
<tr><th>Funzionalità</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nullabile</td><td>Supportato solo nelle versioni che includono il supporto per StructArray nullabili e array vettoriali nullabili.</td></tr>
<tr><td>Valore nullo in Python</td><td>Utilizzare ` <code translate="no">None</code> ` per inserire un valore StructArray nullo in Python. Non utilizzare ` <code translate="no">Null</code> ` o ` <code translate="no">null</code>`.</td></tr>
<tr><td>Ambito del valore nullo</td><td>Il valore nullo si applica all'intero campo StructArray. Ad esempio, <code translate="no">chunks=None</code> è valido solo quando <code translate="no">chunks</code> è nullabile.</td></tr>
<tr><td>Valore StructArray parzialmente nullo</td><td>Quando un campo StructArray contiene un valore array valido, non mescolare array di sottocampi null con array di sottocampi validi nello stesso valore.</td></tr>
<tr><td>Aggiunta dinamica di un campo StructArray</td><td>L'aggiunta di un campo StructArray a una raccolta esistente è supportata solo nelle versioni che includono il supporto per i campi StructArray dinamici.</td></tr>
<tr><td>Requisito di nullabilità per l'aggiunta dinamica</td><td>Un campo StructArray aggiunto a una collezione esistente deve essere nullabile, poiché le entità esistenti non dispongono di alcun valore per il nuovo campo.</td></tr>
<tr><td>Entità esistenti dopo l'aggiunta dinamica</td><td>Le entità esistenti restituiscono il valore " <code translate="no">null</code> " per il campo StructArray aggiunto in tutti i suoi sottocampi.</td></tr>
</tbody>
</table>
<p>In Milvus v3.0.x sono disponibili campi StructArray nullabili, array vettoriali nullabili e l'aggiunta dinamica di campi StructArray.</p>
<p>Per esempi di inserimento con campi StructArray nullabili, consultare <a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">Limiti di inserimento<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Limite</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Struttura del payload</td><td>Inserire il campo StructArray come array di oggetti Struct, ad esempio <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nomi dei sottocampi</td><td>All'interno di ciascun oggetto Struct, utilizzare nomi di sottocampi come <code translate="no">text</code> e <code translate="no">emb</code>, non percorsi come <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Allineamento allo schema</td><td>Ogni elemento Struct deve corrispondere allo schema Struct.</td></tr>
<tr><td>Capacità</td><td>Il numero di elementi Struct in un'entità non deve superare <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensioni del vettore</td><td>I valori vettoriali devono corrispondere all'<code translate="no">dim</code> e configurata per i relativi sottocampi vettoriali.</td></tr>
<tr><td>Duplicazione in modalità di ricerca</td><td>Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, scrivere i vettori in due sottocampi vettoriali separati.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Limiti di indice e metrica<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Un sottocampo vettoriale StructArray può essere indicizzato sia per la ricerca EmbeddingList che per la ricerca a livello di elemento. Lo stesso sottocampo vettoriale non può utilizzare entrambe le famiglie di metriche, poiché ogni campo vettoriale o sottocampo vettoriale accetta un solo indice.</p>
<table>
<thead>
<tr><th>Modalità di ricerca</th><th>Famiglia di metriche</th><th>Livello dei risultati</th></tr>
</thead>
<tbody>
<tr><td>Ricerca EmbeddingList</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code>, o metriche binarie <code translate="no">MAX_SIM_*</code> </td><td>Risultati a livello di entità.</td></tr>
<tr><td>Ricerca a livello di elemento</td><td>Metriche vettoriali regolari quali <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> o <code translate="no">JACCARD</code></td><td>Risultati a livello di elemento che possono includere l’offset dell’elemento corrispondente.</td></tr>
</tbody>
</table>
<p>Utilizzare sottocampi vettoriali separati quando sono richieste entrambe le modalità. Ad esempio, utilizzare <code translate="no">chunks[emb_list_vector]</code> per la ricerca EmbeddingList e <code translate="no">chunks[emb]</code> per la ricerca a livello di elemento.</p>
<p>I sottocampi vettoriali StructArray vengono considerati come sottocampi vettoriali quando si progetta lo schema della raccolta. Mantenere il numero totale di campi vettoriali e sottocampi vettoriali entro i limiti della versione di destinazione e del livello di servizio.</p>
<p>Per la matrice dei tipi di indice e dei tipi di metrica supportati, vedere <a href="/docs/it/index-structarray-fields.md">Campi StructArray dell’indice</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Limiti di ricerca<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Comportamento della ricerca</th><th>Supporto e limiti</th></tr>
</thead>
<tbody>
<tr><td>Ricerca di base in EmbeddingList</td><td>Supportata sui sottocampi vettoriali di StructArray indicizzati con metriche di tipo " <code translate="no">MAX_SIM*</code> ". Restituisce risultati a livello di entità.</td></tr>
<tr><td>Ricerca di base a livello di elemento</td><td>Supportata sui sottocampi vettoriali di StructArray indicizzati con metriche vettoriali regolari. Può restituire gli offset degli elementi corrispondenti.</td></tr>
<tr><td>Ricerca per intervallo</td><td>Supportata in base alla modalità di ricerca e al supporto di indici/metriche della versione di destinazione. Per il comportamento dell’intervallo di ricerca ibrido nelle richieste StructArray a livello di elemento, verificare la versione di destinazione.</td></tr>
<tr><td>Ricerca raggruppata</td><td>La ricerca raggruppata a livello di elemento può restituire gli offset. Il comportamento del raggruppamento nella ricerca ibrida per le richieste StructArray a livello di elemento dipende dalla versione.</td></tr>
<tr><td>Ricerca ibrida</td><td>Una richiesta di ricerca ibrida può includere richieste relative ai sottocampi vettoriali di StructArray solo se la versione di destinazione supporta tale combinazione di ricerca. Ogni richiesta segue comunque la famiglia di metriche del sottocampo vettoriale indicizzato.</td></tr>
<tr><td>Output dell’offset</td><td>L'offset è disponibile per i risultati di ricerca a livello di elemento. La ricerca EmbeddingList restituisce risultati a livello di entità e non utilizza gli offset degli elementi come unità di risultato primaria.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Limiti dei filtri e degli operatori<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Il filtraggio scalare di StructArray è gestito dagli operatori StructArray, quali <code translate="no">element_filter</code> e la famiglia <code translate="no">MATCH_*</code>. La matrice dettagliata di supporto dei predicati è riportata nella sezione <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
<p>A livello generale:</p>
<ul>
<li><p>Utilizzare ` <code translate="no">$[subfield]</code> ` solo all’interno degli operatori StructArray.</p></li>
<li><p>Utilizzare i sottocampi scalari per i predicati scalari.</p></li>
<li><p>Non utilizzare sottocampi vettoriali come input per i predicati scalari di tipo " <code translate="no">$[...]</code> ".</p></li>
<li><p>La sintassi JSON path, le funzioni JSON, le funzioni dei contenitori array, le funzioni di corrispondenza del testo, le funzioni di geometria/GIS e le espressioni Timestamptz non sono supportate per i predicati a livello di elemento di StructArray.</p></li>
<li><p>Preferire confronti booleani espliciti, come ` <code translate="no">$[has_code] == true</code> `, anziché semplici espressioni booleane.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Pagine correlate<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>Per creare un campo StructArray, consultare la sezione <a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a>.</p></li>
<li><p>Per inserire dati, consultare <a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a>.</p></li>
<li><p>Per creare indici vettoriali e scalari, consultare " <a href="/docs/it/index-structarray-fields.md">Indice dei campi StructArray</a>".</p></li>
<li><p>Per rivedere la sintassi dei filtri StructArray, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p></li>
</ol>
