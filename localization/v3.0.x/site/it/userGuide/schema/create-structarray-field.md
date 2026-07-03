---
id: create-structarray-field.md
title: Creare un campo StructArray
summary: >-
  Creare un campo StructArray quando un'entità deve contenere un elenco ordinato
  di elementi strutturati. Un campo StructArray è un campo Array il cui tipo di
  elemento è Struct. Ogni elemento Struct segue lo stesso schema e può contenere
  sottocampi scalari, sottocampi vettoriali o entrambi.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Creare un campo StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Creare un campo StructArray quando un'entità deve contenere un elenco ordinato di elementi strutturati. Un campo StructArray è un campo Array il cui tipo di elemento è Struct. Ogni elemento Struct segue lo stesso schema e può contenere sottocampi scalari, sottocampi vettoriali o entrambi.</p>
<p>Questa pagina illustra come definire uno schema Struct, aggiungerlo come campo StructArray, scegliere i sottocampi per la ricerca e il filtraggio successivi e comprendere le regole dello schema applicabili prima di inserire o indicizzare i dati.</p>
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
    </button></h2><p>Questa pagina utilizza una raccolta denominata <code translate="no">tech_articles</code>. Ogni entità rappresenta un articolo tecnico e il campo <code translate="no">chunks</code> memorizza i dati a livello di blocco come elementi Struct.</p>
<table>
<thead>
<tr><th>Campo</th><th>Tipo</th><th>Scopo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Chiave primaria dell’articolo.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Titolo dell'articolo.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Categoria a livello di articolo.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Campo vettoriale a livello di articolo, utilizzato in seguito negli esempi di ricerca ibrida.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Campo StructArray che memorizza il testo a livello di blocco, i metadati e gli embedding.</td></tr>
</tbody>
</table>
<p>Il campo StructArray " <code translate="no">chunks</code> " contiene i seguenti sottocampi.</p>
<table>
<thead>
<tr><th>Sottocampo</th><th>Tipo</th><th>Scopo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Testo del chunk.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nome della sezione, ad esempio <code translate="no">index</code>, <code translate="no">search</code> o <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Numero di pagina o posizione logica del blocco.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Punteggio a livello di blocco utilizzato negli esempi di filtraggio scalare e di intervallo.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Se il blocco contiene codice.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Sottocampo vettoriale per la ricerca EmbeddingList con metriche <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Sottocampo vettoriale per la ricerca a livello di elemento con metriche vettoriali regolari.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Un campo vettoriale o un sottocampo vettoriale accetta un solo indice. Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, definire due sottocampi vettoriali distinti. In questo esempio, <code translate="no">chunks[emb_list_vector]</code> è destinato alla ricerca EmbeddingList, mentre <code translate="no">chunks[emb]</code> è destinato alla ricerca a livello di elemento.</p>
</div>
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
    </button></h2><p>Un campo StructArray memorizza un valore di array per ogni sottocampo Struct. Quando si definisce uno schema Struct, scegliere i tipi dei sottocampi tra le famiglie scalari e vettoriali supportate.</p>
<table>
<thead>
<tr><th>Tipo fisico dei sottocampi Struct</th><th>Supporto</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Supportato</td><td>Definire il sottocampo come <code translate="no">DataType.BOOL</code>.</td></tr>
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
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> o <code translate="no">ArrayOfStruct</code></td><td>Non supportato</td><td>Un campo StructArray non può contenere array annidati, array vettoriali annidati, campi Struct annidati o campi Array-of-Struct annidati.</td></tr>
</tbody>
</table>
<p>Per informazioni sul supporto specifico per versione, sul comportamento dei valori null e su altre limitazioni, vedere <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Creazione di una raccolta con un campo StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Per creare un campo StructArray, definire innanzitutto lo schema Struct utilizzato da ciascun elemento. Aggiungere quindi un campo Array e impostare il tipo di elemento su Struct.</p>
<ol>
<li><p>Creare lo schema della raccolta.</p></li>
<li><p>Aggiungere campi a livello di raccolta, come la chiave primaria e i campi a livello di articolo.</p></li>
<li><p>Creare uno schema Struct per gli elementi memorizzati all’interno del campo StructArray.</p></li>
<li><p>Aggiungere sottocampi scalari e vettoriali allo schema Struct.</p></li>
<li><p>Aggiungere un campo Array con l'opzione " <code translate="no">element_type=DataType.STRUCT</code>".</p></li>
<li><p>Impostare ` <code translate="no">struct_schema</code> ` sullo schema `Struct`.</p></li>
<li><p>Impostare ` <code translate="no">max_capacity</code> ` per limitare il numero di elementi `Struct` che ciascuna entità può memorizzare nel campo.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Comprendere i percorsi dei campi StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver creato un campo StructArray, fare riferimento ai suoi sottocampi utilizzando la sintassi del percorso <code translate="no">structArray[subfield]</code>. Utilizzare questa sintassi quando si creano indici, si effettuano ricerche nei sottocampi vettoriali, si generano sottocampi di output o si creano filtri scalari.</p>
<table>
<thead>
<tr><th>Percorso</th><th>Significato</th><th>Uso comune</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>Il sottocampo <code translate="no">text</code> all'interno di ciascun elemento Struct.</td><td>Campo di output o filtraggio scalare.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>L'etichetta della sezione per ciascun blocco.</td><td>Filtraggio scalare.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>Il punteggio di qualità a livello di blocco.</td><td>Filtraggio scalare o indice scalare.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>Il sottocampo vettoriale utilizzato come lista di embedding.</td><td>Ricerca EmbeddingList con <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>Il sottocampo vettoriale utilizzato in modo indipendente da ciascun elemento Struct.</td><td>Ricerca vettoriale a livello di elemento.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Rendere un campo StructArray nullabile<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x supporta i campi StructArray nullabili. Un campo StructArray nullabile consente a un'entità di memorizzare valori di tipo ` <code translate="no">null</code> ` per l'intero campo StructArray.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Avviso
I campi StructArray nullabili sono disponibili solo in Milvus v3.0.x. Per un campo StructArray nullabile, un’entità può fornire un valore StructArray valido oppure impostare l’intero campo su <code translate="no">null</code>. Quando si inserisce un valore StructArray valido, tutti i sottocampi devono essere null o avere valori validi. L’inserimento di un’entità con alcuni sottocampi impostati su null e altri su valori validi genera un errore. Per ulteriori dettagli, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Aggiunta di un campo StructArray a una raccolta esistente<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x supporta l’aggiunta di un campo StructArray a una collezione esistente. Il campo StructArray aggiunto deve essere nullabile, poiché le entità già presenti nella collezione non dispongono di valori per il nuovo campo.</p>
<p>Per aggiungere un campo StructArray a una collezione esistente, definire innanzitutto lo schema Struct. Quindi chiamare ` <code translate="no">add_collection_struct_field()</code> ` e impostare ` <code translate="no">nullable=True</code>`.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta aggiunto il campo StructArray, le entità esistenti restituiscono ` <code translate="no">null</code> ` per il nuovo campo in tutti i suoi sottocampi.</p>
<p>Una volta creato un campo StructArray, non è possibile aggiungere nuovi sottocampi a quel campo StructArray esistente. Se in seguito sono necessari ulteriori attributi degli elementi, chiamare ` <code translate="no">drop_collection_field()</code> ` per eliminare il campo StructArray, quindi aggiungere un nuovo campo StructArray con lo schema Struct aggiornato.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Regole dello schema<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Regola</th><th>Spiegazione</th></tr>
</thead>
<tbody>
<tr><td>Struct viene utilizzato come tipo di elemento Array.</td><td>Creare un campo StructArray come campo Array con <code translate="no">element_type=STRUCT</code>. Non creare Struct come campo di raccolta di primo livello.</td></tr>
<tr><td>Tutti gli elementi condividono un unico schema.</td><td>Ogni elemento Struct nello stesso campo StructArray segue lo schema Struct definito per quel campo.</td></tr>
<tr><td><code translate="no">max_capacity</code> è obbligatorio.</td><td>Limita il numero di elementi Struct che ciascuna entità può memorizzare nel campo StructArray.</td></tr>
<tr><td>Sono consentiti solo i tipi di sottocampo supportati.</td><td>Utilizzare tipi di sottocampi scalari e vettoriali supportati da StructArray. Non definire sottocampi JSON, Geometry, Text, Timestamptz, SparseFloatVector o sottocampi Struct / Array annidati.</td></tr>
<tr><td>I sottocampi vettoriali richiedono indici prima della ricerca.</td><td>Creare indici su percorsi come <code translate="no">chunks[emb_list_vector]</code> o <code translate="no">chunks[emb]</code> prima di eseguire la ricerca vettoriale.</td></tr>
<tr><td>Un sottocampo vettoriale ha un solo indice.</td><td>Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, creare due sottocampi vettoriali separati.</td></tr>
<tr><td>I sottocampi StructArray esistenti sono fissi.</td><td>Dopo aver creato un campo StructArray, non è possibile aggiungere ulteriori sottocampi a quello stesso campo StructArray.</td></tr>
<tr><td>Le funzioni non sono supportate all’interno di Struct.</td><td>Non definire funzioni per campi o sottocampi all'interno di un campo StructArray.</td></tr>
<tr><td>I sottocampi scalari dovrebbero soddisfare le esigenze di filtraggio.</td><td>Aggiungere campi quali <code translate="no">section</code>, <code translate="no">quality_score</code> o <code translate="no">has_code</code> solo quando è necessario filtrarli, raggrupparli o visualizzarli in un secondo momento.</td></tr>
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
<li><p>Creare ` <code translate="no">DataType.STRUCT</code> ` come campo di raccolta di primo livello invece di utilizzarlo come tipo di elemento di un campo `Array`.</p></li>
<li><p>Dimenticare di impostare " <code translate="no">max_capacity</code> " sul campo StructArray.</p></li>
<li><p>Definizione di tipi di sottocampo non supportati, come JSON, Geometry, Text, Timestamptz, SparseFloatVector, Array annidato, Struct annidato o Array-of-Struct.</p></li>
<li><p>Utilizzo di ` <code translate="no">String</code> ` come tipo di sottocampo. Utilizzare ` <code translate="no">VARCHAR</code> ` e impostare ` <code translate="no">max_length</code>`.</p></li>
<li><p>Utilizzo di un unico sottocampo vettoriale sia per la ricerca EmbeddingList che per quella a livello di elemento.</p></li>
<li><p>Aggiunta solo di sottocampi vettoriali e omissione dei sottocampi scalari necessari per il filtraggio, come <code translate="no">section</code>, <code translate="no">quality_score</code> o <code translate="no">has_code</code>.</p></li>
<li><p>Trattare i sottocampi vettoriali come input di predicati scalari <code translate="no">$[...]</code>. Utilizzare i sottocampi vettoriali per la ricerca vettoriale e i sottocampi scalari per i predicati scalari.</p></li>
<li><p>Ipotizzare che sia possibile aggiungere nuovi sottocampi a un campo StructArray esistente dopo la creazione del campo stesso.</p></li>
<li><p>Utilizzo di <code translate="no">chunks.emb</code> o <code translate="no">chunks.emb_list_vector</code> invece della sintassi del percorso richiesta <code translate="no">chunks[emb]</code> o <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Considerare il comportamento di StructArray con valori null come disponibile in ogni versione di destinazione.</p></li>
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
<li><p>Per inserire dati annidati nel campo StructArray, consultare <a href="/docs/it/insert-data-into-structarray-fields.md">Inserimento di dati nei campi StructArray</a>.</p></li>
<li><p>Per creare indici vettoriali e scalari, consultare <a href="/docs/it/index-structarray-fields.md">Indice dei campi StructArray</a>.</p></li>
<li><p>Per effettuare ricerche nei sottocampi vettoriali di StructArray, consultare Ricerca vettoriale di base con StructArray.</p></li>
<li><p>Per esaminare i tipi di dati supportati, il comportamento nullable e le limitazioni specifiche per versione, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
