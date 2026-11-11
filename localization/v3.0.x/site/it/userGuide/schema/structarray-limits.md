---
id: structarray-limits.md
title: Limiti di StructArray
summary: >-
  Il supporto per StructArray comprende la definizione dello schema,
  l'inserimento dei payload, l'indicizzazione, le modalità di ricerca e i filtri
  specifici di StructArray. Utilizza questa pagina come riferimento sui limiti
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
    </button></h2><p>I principali limiti di StructArray sono:</p>
<table>
<thead>
<tr><th>Area</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Forma dello schema</td><td>Una Struct può essere utilizzata solo come tipo di elemento di un campo Array. La Struct non è supportata come campo di raccolta di primo livello.</td></tr>
<tr><td>Schema dei sottocampi</td><td>Tutti gli elementi Struct presenti nello stesso campo StructArray condividono un unico schema Struct predefinito.</td></tr>
<tr><td>Sottocampi annidati</td><td>A partire da Milvus 3.0.6, una Struct può contenere sottocampi scalari di tipo ` <code translate="no">ARRAY</code> ` con un unico livello di nidificazione. I sottocampi nidificati di tipo ` <code translate="no">Struct</code>`, ` <code translate="no">ArrayOfStruct</code>` e `JSON` non sono supportati in nessuna versione.</td></tr>
<tr><td>Il campo "Capacity"</td><td><code translate="no">max_capacity</code> è obbligatorio e limita il numero di elementi Struct che un'entità può memorizzare nel campo StructArray.</td></tr>
<tr><td>Modifiche ai sottocampi</td><td>A partire da Milvus 3.0.6, è possibile aggiungere un sottocampo con elementi nullabili a un campo StructArray esistente oppure rimuovere un sottocampo da esso. Le versioni precedenti richiedono la rimozione e la riaggiunta dell’intero campo StructArray.</td></tr>
<tr><td>Percorso del sottocampo</td><td>Utilizzare percorsi <code translate="no">structArray[subfield]</code>, come ad esempio <code translate="no">chunks[emb]</code>, per indici, obiettivi di ricerca, campi di output e filtri. Non utilizzare <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Inserimento della forma</td><td>Inserire un campo StructArray come array di oggetti. Non utilizzare la sintassi dei percorsi all’interno dei payload di inserimento.</td></tr>
<tr><td>Indici vettoriali</td><td>Un campo vettoriale o un sottocampo vettoriale accetta un solo indice. Utilizzare sottocampi vettoriali separati per la ricerca EmbeddingList e la ricerca a livello di elemento.</td></tr>
<tr><td>Funzioni</td><td>Le funzioni di campo non sono supportate per i campi o i sottocampi all'interno di un campo StructArray.</td></tr>
<tr><td>Campi nullabili</td><td>I campi StructArray nullabili sono soggetti a restrizioni di versione. Il valore null a livello di riga si applica all’intero campo StructArray. A partire da Milvus 3.0.6, un sottocampo può inoltre consentire un valore null in un singolo elemento Struct: <code translate="no">nullable=True</code> su un sottocampo scalare o vettoriale, <code translate="no">element_nullable=True</code> su un sottocampo array. Un elemento Struct non può essere null.</td></tr>
<tr><td>Aggiunta dinamica di un campo</td><td>L’aggiunta di un campo StructArray a una collezione esistente è soggetta a restrizioni di versione e richiede che il campo aggiunto sia nullabile.</td></tr>
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
    </button></h2><p>Gli schemi StructArray presentano i seguenti limiti:</p>
<table>
<thead>
<tr><th>Limite</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Struct non è un tipo di campo di primo livello.</td><td>Creare un campo StructArray come <code translate="no">datatype=DataType.ARRAY</code> con <code translate="no">element_type=DataType.STRUCT</code> e un <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Tutti gli elementi condividono un unico schema.</td><td>Ogni elemento Struct in un campo StructArray segue lo stesso elenco di sottocampi e gli stessi tipi di dati dei sottocampi.</td></tr>
<tr><td><code translate="no">max_capacity</code> è obbligatorio.</td><td>Il numero di elementi Struct in un’entità non deve superare l’ <code translate="no">max_capacity</code> e configurata per il campo StructArray.</td></tr>
<tr><td>I sottocampi scalari di " <code translate="no">ARRAY</code> " hanno " <code translate="no">max_capacity</code>" per ogni sottocampo.</td><td>Un sottocampo di tipo " <code translate="no">ARRAY</code> " scalare dichiara una " <code translate="no">max_capacity</code> " per il proprio array interno, e Milvus rifiuta un elemento Struct il cui array interno superi la capacità dichiarata di quel sottocampo. I valori non devono necessariamente corrispondere tra i vari sottocampi. Il valore deve essere maggiore di 0 e non deve superare " <code translate="no">proxy.maxArrayCapacity</code>", il cui valore predefinito è 4096.</td></tr>
<tr><td>I sottocampi possono subire modifiche a partire da Milvus 3.0.6.</td><td>Aggiungere un sottocampo con elemento nullabile oppure eliminare un sottocampo in base al suo percorso, ad esempio <code translate="no">chunks[lang]</code>. Non è possibile eliminare l’ultimo sottocampo di un campo StructArray, l’ultimo campo vettoriale della raccolta o un sottocampo utilizzato da una funzione. Nelle versioni precedenti, eliminare il campo StructArray e aggiungerlo nuovamente con lo schema aggiornato.</td></tr>
<tr><td>Le Struct annidate non sono supportate.</td><td>Una Struct non può contenere sottocampi annidati di tipo <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code> o JSON. A partire da Milvus 3.0.6, una Struct può contenere sottocampi scalari di tipo <code translate="no">ARRAY</code> con un unico livello di annidamento. Un sottocampo di tipo <code translate="no">ARRAY</code> non può contenere vettori.</td></tr>
<tr><td>Le funzioni non sono supportate all’interno di StructArray.</td><td>Non definire funzioni di campo per i campi di StructArray o i loro sottocampi.</td></tr>
<tr><td>Le proprietà dei campi sono limitate per i campi di StructArray.</td><td>A partire da Milvus 3.0.6, l'operazione " <code translate="no">alter_collection_field()</code> " su un campo StructArray o su un percorso di sottocampo accetta solo " <code translate="no">mmap.enabled</code>", " <code translate="no">field.description</code>" e " <code translate="no">warmup</code>". Altre proprietà, come " <code translate="no">max_capacity</code> " e " <code translate="no">max_length</code>", vengono rifiutate.</td></tr>
<tr><td>L’analisi testuale non è supportata sui sottocampi.</td><td>L'impostazione di <code translate="no">enable_match</code> o <code translate="no">enable_analyzer</code> su un sottocampo Struct viene rifiutata. Gli indici di testo vengono creati solo per i campi di primo livello.</td></tr>
</tbody>
</table>
<p>Per esempi sulla creazione di schemi, vedere <a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a>.</p>
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
    </button></h2><p>I sottocampi StructArray corrispondono a una memorizzazione fisica di tipo array. La tabella seguente elenca i tipi fisici supportati e non supportati:</p>
<table>
<thead>
<tr><th>Tipo fisico del sottocampo Struct</th><th>Supporto</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> o <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT</code> o <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.VARCHAR</code> e impostare <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.FLOAT16_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.BFLOAT16_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.INT8_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.BINARY_VECTOR</code> e impostare <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Non supportato</td><td>I sottocampi vettoriali sparsi non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Non supportato</td><td>Utilizzare <code translate="no">VARCHAR</code>, non <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Non supportato</td><td>I sottocampi JSON non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Non supportato</td><td>I sottocampi di geometria e le funzioni GIS non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Non supportato</td><td>I sottocampi di tipo testo non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Non supportato</td><td>I sottocampi timestamptz e le espressioni relative al tempo non sono supportati nei campi StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Supportato in Milvus 3.0.6 e versioni successive</td><td>Definire il sottocampo come <code translate="no">DataType.ARRAY</code> con uno scalar <code translate="no">element_type</code> e un <code translate="no">max_capacity</code> per l'array interno. Ogni elemento Struct conterrà quindi un array interno. Impostare <code translate="no">nullable=True</code> sul sottocampo per consentire un array interno nullo e <code translate="no">element_nullable=True</code> per consentire valori nulli al suo interno.</td></tr>
<tr><td><code translate="no">Array</code> di <code translate="no">Array</code> di <code translate="no">Array</code>, <code translate="no">Array</code> di vettori, <code translate="no">Struct</code>, oppure <code translate="no">ArrayOfStruct</code></td><td>Non supportato</td><td>Il nesting degli array all’interno di una Struct è limitato a un livello, l’array interno non può contenere vettori e i sottocampi annidati di tipo Struct o Array-of-Struct non sono supportati.</td></tr>
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
    </button></h2><p>La tabella seguente descrive il comportamento degli StructArray nullabili e l’aggiunta dinamica di campi StructArray, fatte salve le condizioni di disponibilità riportate di seguito:</p>
<table>
<thead>
<tr><th>Funzionalità</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nullabile</td><td>Fatta salva la dichiarazione di disponibilità riportata di seguito, impostare ` <code translate="no">nullable=True</code> ` sul StructArray padre; non configurare i sottocampi Struct come nullabili in modo indipendente.</td></tr>
<tr><td>Valore NULL in Python</td><td>Utilizzare ` <code translate="no">None</code> ` per inserire un valore `StructArray` nullo in Python. Non utilizzare ` <code translate="no">Null</code> ` o ` <code translate="no">null</code>`.</td></tr>
<tr><td>Ambito del valore NULL</td><td>Il valore NULL si applica all'intero campo StructArray. Ad esempio, <code translate="no">chunks=None</code> è valido solo quando <code translate="no">chunks</code> è nullabile.</td></tr>
<tr><td>Valore StructArray parzialmente nullo</td><td>Quando un campo StructArray contiene un valore array valido, non mescolare array di sottocampi null con array di sottocampi validi nello stesso valore.</td></tr>
<tr><td>Null a livello di elemento</td><td>Supportato in Milvus 3.0.6 e versioni successive. Un sottocampo scalare, vettoriale o di tipo ` <code translate="no">ARRAY</code> ` può consentire un valore nullo nei singoli elementi della struttura: ` <code translate="no">nullable=True</code> ` su un sottocampo scalare o vettoriale, ` <code translate="no">element_nullable=True</code> ` su un sottocampo di tipo ` <code translate="no">ARRAY</code> `. L'impostazione ` <code translate="no">nullable</code> ` a livello di riga deriva comunque dal genitore StructArray; impostare ` <code translate="no">nullable=True</code> ` su un sottocampo abilita il valore nullo a livello di elemento, non a livello di riga.</td></tr>
<tr><td>Elemento Struct nullo</td><td>Un elemento Struct di per sé non può essere nullo, come nel caso di <code translate="no">[null, {...}]</code>. Impostare invece i valori dei sottocampi dell’elemento su nullo.</td></tr>
<tr><td>Sottocampi omessi</td><td>A partire da Milvus 3.0.6, è possibile omettere un sottocampo con elemento nullabile da un elemento Struct e Milvus memorizzerà il valore null al suo posto. Un sottocampo che non è nullabile a livello di elemento deve essere presente in ogni elemento Struct. Nelle versioni precedenti, ogni elemento Struct doveva fornire tutti i sottocampi.</td></tr>
<tr><td>Aggiunta dinamica di un campo StructArray</td><td>Fatta salva la dichiarazione di disponibilità riportata di seguito.</td></tr>
<tr><td>Requisito di nullabilità per l’aggiunta dinamica</td><td>Un campo StructArray aggiunto a una collezione esistente deve essere nullabile poiché le entità esistenti non dispongono di alcun valore per il nuovo campo.</td></tr>
<tr><td>Entità esistenti dopo l’aggiunta dinamica</td><td>Le entità esistenti restituiscono un valore " <code translate="no">null</code> " per il campo StructArray aggiunto.</td></tr>
<tr><td>Aggiunta dinamica di un sottocampo</td><td>Supportato in Milvus 3.0.6 e versioni successive. Un sottocampo aggiunto deve essere creato con ` <code translate="no">nullable=True</code>`; un sottocampo ` <code translate="no">ARRAY</code> ` aggiunto accetta inoltre ` <code translate="no">element_nullable=True</code> ` per i valori null all'interno dell'array interno. Le entità esistenti restituiscono `null` per il nuovo sottocampo in ciascuno dei loro elementi `Struct`, mentre le entità il cui campo `StructArray` è `null` rimangono `null`.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 e le versioni successive supportano campi StructArray nullabili, array vettoriali nullabili e l’aggiunta dinamica di campi StructArray sia nelle distribuzioni Standalone che in quelle Distributed. Le versioni precedenti di Milvus non supportano queste funzionalità.</p>
<p>Milvus 3.0.6 e le versioni successive supportano inoltre valori null a livello di elemento, sottocampi scalari dell’ <code translate="no">ARRAY</code> e e l’aggiunta o l’eliminazione di sottocampi di un campo StructArray esistente. Queste funzionalità richiedono Storage V2 e non sono disponibili nelle collezioni esterne.</p>
<p>In Zilliz Cloud, queste funzionalità sono disponibili sui cluster On-Demand che eseguono Milvus 3.0.0 o versioni successive. I cluster di servizio non le supportano.</p>
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
    </button></h2><p>I payload di inserimento StructArray hanno i seguenti limiti:</p>
<table>
<thead>
<tr><th>Limite</th><th>Dettagli</th></tr>
</thead>
<tbody>
<tr><td>Struttura del payload</td><td>Inserire il campo StructArray come array di oggetti Struct, ad esempio <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nomi dei sottocampi</td><td>All'interno di ciascun oggetto Struct, utilizzare nomi di sottocampi come <code translate="no">text</code> e <code translate="no">emb</code>, non percorsi come <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Allineamento allo schema</td><td>Ogni elemento Struct deve corrispondere allo schema Struct. A partire da Milvus 3.0.6, un sottocampo nullabile di un elemento può essere omesso o impostato su <code translate="no">null</code> in un elemento Struct.</td></tr>
<tr><td>Capacità</td><td>Il numero di elementi Struct in un’entità non deve superare <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensioni del vettore</td><td>I valori dei vettori devono corrispondere all’ <code translate="no">dim</code> configurato per i relativi sottocampi vettoriali.</td></tr>
<tr><td>Duplicazione in modalità di ricerca</td><td>Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, scrivere i vettori in due sottocampi vettoriali distinti.</td></tr>
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
    </button></h2><p>Un sottocampo vettoriale StructArray può essere indicizzato sia per la ricerca EmbeddingList che per la ricerca a livello di elemento. Lo stesso sottocampo vettoriale non può utilizzare entrambe le famiglie di metriche, poiché ogni campo vettoriale o sottocampo vettoriale accetta un solo indice. Le modalità di ricerca utilizzano le seguenti famiglie di metriche:</p>
<table>
<thead>
<tr><th>Modalità di ricerca</th><th>Famiglia di metriche</th><th>Livello dei risultati</th></tr>
</thead>
<tbody>
<tr><td>Ricerca EmbeddingList</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code> o metriche binarie <code translate="no">MAX_SIM_*</code> </td><td>Risultati a livello di entità.</td></tr>
<tr><td>Ricerca a livello di elemento</td><td>Metriche vettoriali regolari quali <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> o <code translate="no">JACCARD</code></td><td>Risultati a livello di elemento che possono includere l’offset dell’elemento corrispondente.</td></tr>
</tbody>
</table>
<p>Utilizzare sottocampi vettoriali separati quando sono richieste entrambe le modalità. Ad esempio, utilizzare <code translate="no">chunks[emb_list_vector]</code> per la ricerca EmbeddingList e <code translate="no">chunks[emb]</code> per la ricerca a livello di elemento.</p>
<p>I sottocampi vettoriali StructArray contano come campi vettoriali ai fini del limite a livello di raccolta <code translate="no">proxy.maxVectorFieldNum</code>, il cui valore predefinito è 10. Un campo StructArray i cui sottocampi vettoriali sono gli unici campi vettoriali della raccolta è valido e l’eliminazione di tale campo viene rifiutata qualora ciò lasciasse la raccolta senza alcun campo vettoriale. Mantenere il numero totale di campi vettoriali e sottocampi vettoriali entro i limiti della versione di destinazione e del livello di servizio.</p>
<p>A partire da Milvus 3.0.6, un sottocampo vettoriale con elementi nullabili supporta solo la ricerca a livello di elemento con metriche vettoriali regolari. Le metriche <code translate="no">MAX_SIM*</code>, gli indici EmbeddingList e la ricerca EmbeddingList vengono rifiutati sui sottocampi vettoriali con elementi nullabili, e <code translate="no">AUTOINDEX</code> non seleziona una metrica <code translate="no">MAX_SIM*</code> per essi. I vettori nulli non partecipano alla ricerca. Gli indici scalari non sono supportati sui sottocampi con elementi nullabili né sui sottocampi scalari di tipo ` <code translate="no">ARRAY</code> `.</p>
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
    </button></h2><p>Il comportamento di ricerca di StructArray presenta i seguenti limiti:</p>
<table>
<thead>
<tr><th>Comportamento di ricerca</th><th>Supporto e limiti</th></tr>
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
<li><p>Le espressioni di filtro a livello di riga possono anche fare riferimento direttamente ai percorsi StructArray: <code translate="no">chunks[0][section]</code> per la posizione di un elemento, <code translate="no">array_length(chunks)</code> per il numero di elementi, <code translate="no">array_contains(chunks[section], ...)</code> per i valori dei sottocampi tra gli elementi e <code translate="no">chunks is null</code> su un campo StructArray nullabile.</p></li>
<li><p>Utilizzare i sottocampi scalari per i predicati scalari.</p></li>
<li><p>Non utilizzare sottocampi vettoriali come input per predicati scalari di tipo " <code translate="no">$[...]</code> ".</p></li>
</ul>
<ul>
<li>La sintassi JSON path, le funzioni JSON, le funzioni di corrispondenza testuale, le funzioni geometriche/GIS e le espressioni Timestamptz non sono supportate per i predicati a livello di elemento di StructArray. A partire da Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> e <code translate="no">array_length</code> sono supportati su <code translate="no">$[subfield]</code> per i sottocampi scalari di <code translate="no">ARRAY</code>, mentre <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> è supportato per ogni tipo di sottocampo.</li>
</ul>
<ul>
<li>A partire da Milvus 3.0.6, un valore nullo di un sottocampo in un elemento Struct rende il predicato dell’elemento “unknown” anziché “false”. <code translate="no">element_filter</code> conserva solo gli elementi il cui predicato è “true”, mentre <code translate="no">MATCH_*</code> considera un elemento “unknown” come un’assenza. Per ulteriori dettagli, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</li>
</ul>
<ul>
<li>È preferibile utilizzare confronti booleani espliciti come ` <code translate="no">$[has_code] == true</code> ` anziché semplici espressioni booleane.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Limiti di importazione e archiviazione<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Formati dei file sorgente</td><td>I file JSON, JSONL, CSV e Parquet possono contenere campi StructArray. I file NumPy contengono un file per ogni campo di primo livello e non possono fornire dati StructArray; utilizzare file JSON, CSV o Parquet per le raccolte che presentano un campo StructArray. Per le forme dei file, consultare <a href="/docs/it/prepare-source-data.md#StructArray-fields-in-source-files">Preparazione dei dati di origine</a>.</td></tr>
<tr><td>Formato di archiviazione</td><td>I sottocampi con elementi nullabili e i sottocampi scalari di tipo " <code translate="no">ARRAY</code> " richiedono Storage V2. Storage V1 non è accessibile per le collezioni che utilizzano questi sottocampi: la creazione della collezione e l'inserimento dei dati possono sembrare riusciti, ma i dati falliscono al momento del flush, il che non è uno stato supportato. Storage V3 con l’opzione « <code translate="no">common.storage.enableGrowingSourceFlush</code> » impostata su « <code translate="no">true</code> » rifiuta le richieste che utilizzano sottocampi con elementi nullabili o sottocampi scalari di tipo « <code translate="no">ARRAY</code> ».</td></tr>
<tr><td>Collezioni esterne</td><td>I sottocampi con elementi nullabili e i sottocampi scalari <code translate="no">ARRAY</code> non sono supportati nelle collezioni esterne.</td></tr>
<tr><td>Importazione da backup e snapshot</td><td>L'importazione da binlog, come il ripristino di un backup, e l'importazione da snapshot come origine vengono rifiutate per le raccolte che presentano sottocampi con elementi nullabili o sottocampi scalari <code translate="no">ARRAY</code>.</td></tr>
<tr><td>Downgrade</td><td>Le collezioni che contengono sottocampi con elementi nullabili o sottocampi scalari di tipo " <code translate="no">ARRAY</code> " non possono essere eseguite su una versione precedente alla 3.0.6 di Milvus. La riproduzione del log di scrittura anticipata (write-ahead log) su una versione precedente causa un errore di panico. L'aggiornamento a Milvus 3.0.6 o versioni successive consente di recuperare i dati.</td></tr>
</tbody>
</table>
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
<li><p>Per creare un campo StructArray, consultare <a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a>.</p></li>
<li><p>Per inserire dati, consultare <a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a>.</p></li>
<li><p>Per creare indici vettoriali e scalari, consultare " <a href="/docs/it/index-structarray-fields.md">Indici dei campi StructArray</a>".</p></li>
<li><p>Per esaminare la sintassi dei filtri StructArray, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p></li>
</ol>
