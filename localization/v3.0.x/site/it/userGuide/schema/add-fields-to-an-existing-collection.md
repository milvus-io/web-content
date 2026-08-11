---
id: add-fields-to-an-existing-collection.md
title: Modifica dello schema della collezione
summary: >-
  Modifica uno schema di raccolta esistente aggiungendo o eliminando campi
  definiti dall'utente o funzioni con i relativi campi vettoriali generati.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Modifica dello schema della collezione<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando una raccolta passa dalla fase di sviluppo a quella di produzione, spesso il suo schema subisce delle modifiche. È possibile aggiungere campi scalari come <code translate="no">source_uri</code> o <code translate="no">review_status</code> per il filtraggio e la logica applicativa, aggiungere un nuovo campo vettoriale per gli embedding generati dall'applicazione, aggiungere una funzione BM25 e il relativo campo vettoriale sparso generato per la ricerca lessicale sul testo esistente, oppure rimuovere campi e funzioni che non vengono più utilizzati. La funzione "Modifica schema della raccolta" consente di apportare le modifiche supportate ai campi e alle funzioni direttamente sul posto, anziché ricreare la raccolta.</p>
<div class="alert note">
<p>Questa guida tratta le modifiche allo schema per i campi definiti dall’utente e per le funzioni con i relativi campi vettoriali generati nelle collezioni gestite. Per aggiungere un campo a una collezione esterna, consultare <a href="/docs/it/alter-external-collection-schema.md">Modifica dello schema della collezione esterna</a>. Per le modifiche alle proprietà dei campi, come la modifica dell’attributo " <code translate="no">max_length</code> " su un campo " <code translate="no">VARCHAR</code> " o dell’attributo " <code translate="no">max_capacity</code> " su un campo " <code translate="no">ARRAY</code> ", consultare <a href="/docs/it/alter-collection-field.md">Modifica del campo della collezione</a>. Per il comportamento dinamico dei campi, consultare " <a href="/docs/it/enable-dynamic-field.md">Campo dinamico</a> " e " <a href="/docs/it/modify-collection.md">Modifica della raccolta</a>".</p>
</div>
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
    </button></h2><p><strong>Aggiunta di campi definiti dall’utente</strong></p>
<ul>
<li><p>I campi definiti dall’utente aggiunti devono essere nullabili. Impostare <code translate="no">nullable=True</code> quando si chiama <code translate="no">add_collection_field()</code>. Per le entità esistenti, il campo aggiunto è di tipo <code translate="no">NULL</code> a meno che non si aggiunga un campo scalare con <code translate="no">default_value</code>.</p></li>
<li><p>L'aggiunta di campi scalari definiti dall'utente è supportata in Milvus 2.6.x e versioni successive. L'aggiunta di campi vettoriali definiti dall'utente è supportata in Milvus 2.6.18 e versioni successive.</p></li>
<li><p>L'aggiunta di campi StructArray è supportata in Milvus 3.0.0 e versioni successive. I campi StructArray aggiunti devono essere nullabili.</p></li>
<li><p>I nomi dei campi devono essere univoci all’interno della collezione.</p></li>
</ul>
<p><strong>Aggiungere una funzione e il relativo campo vettoriale generato</strong></p>
<ul>
<li><p>Ogni aggiornamento dello schema può aggiungere solo una funzione e un campo vettoriale generato.</p></li>
<li><p>La funzione supportata determina il tipo di campo vettoriale generato: ` <code translate="no">BM25</code> ` genera un campo ` <code translate="no">SPARSE_FLOAT_VECTOR</code> `, mentre ` <code translate="no">MINHASH</code> ` genera un campo ` <code translate="no">BINARY_VECTOR</code> `.</p></li>
<li><p>Il campo vettoriale generato deve essere un campo nuovo. Non può fare riferimento a un campo già esistente nello schema della collezione.</p></li>
<li><p>Il campo vettoriale generato non può essere nullabile.</p></li>
<li><p>I campi di input utilizzati dalla funzione devono già esistere nella collezione.</p></li>
<li><p>Quando si aggiunge una funzione BM25 o MinHash a una collezione esistente, l’input della funzione deve essere un campo di tipo “ <code translate="no">VARCHAR</code> ”. Un input di tipo “ <code translate="no">TEXT</code> ” non è supportato in questo flusso di lavoro perché Milvus non può compilare retroattivamente l’output generato per le entità esistenti a partire da quel tipo di input.</p></li>
</ul>
<p><strong>Eliminazione dei campi definiti dall’utente</strong></p>
<ul>
<li><p>Non è possibile eliminare il campo della chiave primaria, il campo della chiave di partizione, il campo della chiave di clustering o l’ultimo campo vettoriale in una collezione.</p></li>
<li><p>È possibile eliminare un intero campo " <code translate="no">ARRAY&lt;STRUCT&gt;</code> ", ma non è possibile eliminare un singolo sottocampo all'interno di un campo " <code translate="no">ARRAY&lt;STRUCT&gt;</code> ".</p></li>
<li><p>Non è possibile eliminare direttamente un campo utilizzato come campo di input di una funzione o generato come campo di output di una funzione. Per rimuovere un campo di output di una funzione, eliminare la funzione che lo genera.</p></li>
</ul>
<p><strong>Eliminazione di una funzione e del campo vettoriale da essa generato</strong></p>
<ul>
<li><p>In questo flusso di lavoro di modifica dello schema, l’eliminazione di una funzione comporta la rimozione della funzione stessa, del campo vettoriale da essa generato e dell’indice associato. I campi di input della funzione rimangono nello schema della collezione.</p></li>
<li><p>L'eliminazione di una funzione viene rifiutata se la rimozione del campo vettoriale da essa generato lascerebbe la raccolta senza alcun campo vettoriale.</p></li>
</ul>
<div class="alert note">
<p>Per le modifiche allo schema che esulano dalle operazioni di aggiunta e rimozione supportate, ricreare o migrare la collezione.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Aggiungere campi e funzioni a una raccolta esistente<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegliere il flusso di lavoro in base al fatto che si stia aggiungendo un campo definito dall’utente o una funzione che genera un campo vettoriale:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Aggiungere campi scalari definiti dall’utente</a> quando sono necessari nuovi metadati per il filtraggio, l’output delle query o la logica dell’applicazione.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Aggiungere campi StructArray</a> quando è necessario un campo array i cui elementi condividono lo stesso schema Struct.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Aggiungere campi vettoriali definiti dall'utente</a> quando l'applicazione genera embedding e scrive valori vettoriali in Milvus.</p></li>
<li><p><a href="#add-a-function-and-its-generated-vector-field--milvus-30x">Aggiungere una funzione e il campo vettoriale da essa generato</a> quando Milvus deve generare valori vettoriali da campi esistenti, come i vettori sparsi BM25 o le firme MinHash ricavate dal testo.</p></li>
</ul>
<p>In tutti i casi, il nome del nuovo campo non deve già esistere nella raccolta e il numero totale di campi non può superare il limite di conteggio dei campi di Milvus. Per i dettagli, consultare <a href="/docs/it/limitations.md#number-of-resources-in-a-collection">Limiti</a> di <a href="/docs/it/limitations.md#number-of-resources-in-a-collection">Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Aggiungere campi scalari definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza l'<code translate="no">add_collection_field()</code> per aggiungere un campo scalare definito dall'utente a una collezione esistente.</p>
<p>Ciò differisce dall’archiviazione di chiavi arbitrarie nel campo dinamico: una volta reso disponibile l’aggiornamento dello schema, il nuovo campo scalare diventa parte integrante dello schema della collezione. È possibile inserirvi o aggiornare valori, creare indici su di esso dove supportato, utilizzarlo nelle query e nei filtri di ricerca e restituirlo nell’output delle query o delle ricerche.</p>
<p>Poiché le entità esistenti sono state inserite prima che il nuovo campo fosse disponibile, ogni campo scalare definito dall’utente aggiunto deve essere nullable:</p>
<ul>
<li><p>Se si aggiunge un campo scalare con ` <code translate="no">nullable=True</code> ` e senza ` <code translate="no">default_value</code>`, le entità esistenti restituiscono ` <code translate="no">NULL</code> ` per il nuovo campo.</p></li>
<li><p>Se si aggiunge un campo scalare con l'attributo ` <code translate="no">nullable=True</code> ` e l'attributo ` <code translate="no">default_value</code>`, le entità esistenti restituiscono il valore predefinito anziché ` <code translate="no">NULL</code>`.</p></li>
</ul>
<p>Le espressioni di filtro scalari non corrispondono ai valori scalari di tipo <code translate="no">NULL</code>. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/nullable-and-default.md">Campi nullabili</a>.</p>
<p><strong>Esempio: Aggiunta di un campo scalare nullabile</strong></p>
<p>L'esempio seguente aggiunge un campo scalare nullable <code translate="no">source</code> a una raccolta esistente denominata <code translate="no">product_catalog</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l’aggiunta del campo, le entità già presenti nella raccolta restituiscono il valore “ <code translate="no">NULL</code> ” per “ <code translate="no">source</code> ”. Le nuove entità possono impostare “ <code translate="no">source</code> ” durante l’inserimento o l’aggiornamento.</p>
<p><strong>Esempio: aggiungere un campo scalare con un valore predefinito</strong></p>
<p>Se le entità esistenti devono restituire un valore concreto anziché <code translate="no">NULL</code>, specificare <code translate="no">default_value</code> al momento dell’aggiunta di un campo scalare. L’esempio seguente aggiunge un campo <code translate="no">review_status</code> e utilizza <code translate="no">&quot;unreviewed&quot;</code> come valore predefinito.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta aggiunto il campo, le entità già presenti nella collezione restituiscono <code translate="no">&quot;unreviewed&quot;</code> per <code translate="no">review_status</code>. Le nuove entità possono impostare un valore diverso oppure utilizzare il valore predefinito quando non viene fornito alcun valore.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">Aggiunta di campi StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare ` <code translate="no">add_collection_struct_field()</code> ` per aggiungere un campo `StructArray` che accetta array di elementi `Struct`. Per aggiungere un campo `StructArray`, procedere come segue:</p>
<ol>
<li><p>Creare uno schema Struct che contenga i sottocampi necessari dei tipi di dati supportati. Per i tipi di dati applicabili, fare riferimento a <a href="/docs/it/array-of-structs.md#Data-types">StructArray</a>.</p></li>
<li><p>Fare riferimento allo schema Struct creato in precedenza e impostare la capacità massima del campo in <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Impostare ` <code translate="no">nullable=True</code> ` nella richiesta.</p></li>
</ol>
<p><strong>Esempio: aggiungere un campo StructArray nullable</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l'aggiunta del campo StructArray, le entità già presenti nella raccolta restituiscono " <code translate="no">NULL</code> " per " <code translate="no">chunks</code> " in tutti i suoi sottocampi. Quando si inserisce una nuova entità, assicurarsi che tutti i sottocampi siano " <code translate="no">NULL</code> " o abbiano valori validi. L'inserimento di un'entità con alcuni sottocampi impostati su " <code translate="no">NULL</code> " e altri su valori validi genera errori.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Aggiunta di campi vettoriali definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">add_collection_field()</code> per aggiungere un campo vettoriale definito dall’utente quando l’applicazione genera embedding e scrive valori vettoriali in Milvus.</p>
<p>Ogni campo vettoriale definito dall’utente aggiunto deve essere nullable. Le entità esistenti dispongono di <code translate="no">NULL</code> per il nuovo campo vettoriale fino a quando non si scrivono valori vettoriali tramite upsert o un flusso di lavoro di backfill. Le nuove entità possono includere il campo vettoriale durante l’inserimento. La ricerca vettoriale salta le entità il cui valore vettoriale è <code translate="no">NULL</code>. Per i dettagli, fare riferimento a <a href="/docs/it/nullable-and-default.md">Campi nullable</a>.</p>
<p><strong>Esempio: Aggiunta di un campo vettoriale nullabile</strong></p>
<p>L'esempio seguente aggiunge un campo vettoriale denso nullabile denominato <code translate="no">embedding_v2</code> a una raccolta esistente. Impostare <code translate="no">dim</code> in base alla dimensionalità degli embedding generati dall'applicazione.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver aggiunto il campo, creare un indice sul nuovo campo vettoriale prima di effettuare ricerche su di esso:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Le entità esistenti hanno <code translate="no">NULL</code> per <code translate="no">embedding_v2</code> e vengono ignorate quando si esegue una ricerca su questo campo. Per rendere le entità esistenti ricercabili tramite <code translate="no">embedding_v2</code>, scrivere valori vettoriali non NULL tramite upsert o un flusso di lavoro di backfill. Le nuove entità possono includere <code translate="no">embedding_v2</code> durante l’inserimento.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Aggiungi una funzione e il campo vettoriale generato<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare questo flusso di lavoro quando Milvus deve generare un nuovo campo vettoriale a partire da dati già memorizzati in una raccolta esistente. L’operazione aggiunge tre elementi di schema correlati:</p>
<ul>
<li><p>Una definizione di funzione che legge da uno o più campi di input esistenti.</p></li>
<li><p>Un nuovo campo vettoriale che memorizza l’output della funzione.</p></li>
<li><p>Una definizione di indice associata al nuovo campo vettoriale.</p></li>
</ul>
<p>Ad esempio, una funzione BM25 legge un campo esistente denominato " <code translate="no">VARCHAR</code> " e genera un campo denominato " <code translate="no">SPARSE_FLOAT_VECTOR</code> " per la ricerca lessicale. Una funzione MinHash genera un campo denominato " <code translate="no">BINARY_VECTOR</code> " per il rilevamento di quasi-duplicati. Questo flusso di lavoro non aggiunge né sostituisce il campo di input della funzione.</p>
<div class="alert note">
<p>Questa funzionalità richiede Storage V3. Per le istruzioni di abilitazione e le considerazioni sulla compatibilità, consultare <a href="/docs/it/storage-v3.md">Storage V3</a>.</p>
</div>
<p>L’aggiunta di una funzione e del relativo campo vettoriale generato a una raccolta esistente richiede inoltre la compattazione della versione dello schema e la compattazione della versione di archiviazione. Milvus rifiuta la richiesta se una delle due impostazioni è disabilitata. Questi prerequisiti aggiuntivi si applicano solo quando si modifica una raccolta esistente; la definizione della funzione nello schema iniziale della raccolta non utilizza questo flusso di lavoro di backfill dei dati esistenti.</p>
<p>La funzione supportata determina il tipo di campo vettoriale generato:</p>
<table>
<thead>
<tr><th>Funzione</th><th>Tipo di campo vettoriale generato</th><th>Campo di input tipico</th><th>Caso d'uso tipico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Un campo " <code translate="no">VARCHAR</code> " con l'analizzatore abilitato</td><td>Ricerca lessicale e rilevanza delle parole chiave</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Un campo " <code translate="no">VARCHAR</code> "</td><td>Rilevamento di quasi-duplicati</td></tr>
</tbody>
</table>
<p>Per i dettagli su come funziona ciascuna funzione, fare riferimento alle sezioni <a href="/docs/it/bm25-function.md">Funzione BM25</a> e <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<p>Il campo vettoriale generato non deve già esistere nella raccolta e non può essere impostabile a null. Il campo di input della funzione deve già esistere.</p>
<p><strong>Esempio: Aggiunta di una funzione BM25 e del relativo campo vettoriale spars</strong></p>
<p>L'esempio seguente aggiunge una funzione BM25 denominata " <code translate="no">text_bm25</code> " e il relativo campo vettoriale sparso generato denominato " <code translate="no">text_sparse</code> " a una collezione esistente. La collezione deve già disporre di un campo " <code translate="no">VARCHAR</code> " denominato " <code translate="no">text</code> " con l'analizzatore abilitato.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>L’oggetto <code translate="no">index_params</code> deve contenere esattamente una definizione di indice per il nuovo campo di output della funzione. Milvus aggiunge la funzione, il campo vettoriale generato e la definizione dell’indice associato nella stessa modifica dello schema. Non chiamare <code translate="no">create_index()</code> separatamente dopo <code translate="no">add_function_field()</code>.</p>
<p>Concettualmente, questa operazione aggiunge le seguenti definizioni di Function, campo di output generato e indice associato:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che la richiesta va a buon fine, ` <code translate="no">describe_collection()</code> ` restituisce sia la nuova funzione ` <code translate="no">text_bm25</code> ` sia il campo vettoriale generato ` <code translate="no">text_sparse</code> ` nello schema della collezione. Milvus genera l’output della funzione per le nuove entità man mano che vengono scritte. Per le entità esistenti, Milvus popola il campo vettoriale generato in modo asincrono tramite la compattazione in background. La visibilità dello schema conferma che l’aggiornamento dello schema è andato a buon fine, ma non indica che il backfill sia stato completato per ogni entità esistente. Per il flusso di lavoro completo della ricerca BM25, fare riferimento alla <a href="/docs/it/full-text-search.md">sezione Ricerca full-text</a>.</p>
<p>Milvus supporta anche le funzioni MinHash e i relativi campi vettoriali binari generati per il rilevamento dei quasi-duplicati. Una funzione MinHash utilizza <code translate="no">FunctionType.MINHASH</code> e scrive in un nuovo campo di output <code translate="no">BINARY_VECTOR</code>. Per i dettagli sulla configurazione, consultare <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Rimuovere campi e funzioni da una collezione esistente<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile rimuovere direttamente i campi definiti dall’utente quando non fanno più parte del modello della raccolta. Per rimuovere una funzione e il campo vettoriale da essa generato, eliminare la funzione; Milvus rimuove il campo generato e il relativo indice nella stessa modifica dello schema.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Eliminazione di campi definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare ` <code translate="no">drop_collection_field()</code> ` per rimuovere un campo scalare, vettoriale o StructArray definito dall’utente che non fa più parte del modello della collezione.</p>
<p>L'eliminazione di un campo modifica innanzitutto lo schema della collezione e la visibilità del campo:</p>
<ul>
<li><p>Una volta completata con successo l’operazione « <code translate="no">drop_collection_field()</code> », lo schema della collezione viene aggiornato: ` <code translate="no">describe_collection()</code> ` non restituisce più il campo eliminato e le query o le ricerche non possono più restituire il campo in ` <code translate="no">output_fields</code> ` né utilizzarlo nelle espressioni.</p></li>
<li><p>Gli indici creati sul campo eliminato vengono rimossi nell’ambito dell’aggiornamento dello schema.</p></li>
</ul>
<p>La pulizia dello spazio di archiviazione viene gestita separatamente dalla pulizia dello schema. Per ulteriori dettagli, consultare la sezione <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">Quando viene recuperato lo spazio di archiviazione dopo l’eliminazione di un campo?</a></p>
<p><strong>Esempio: eliminazione di un campo scalare definito dall’utente</strong></p>
<p>L'esempio seguente presuppone che <code translate="no">experiment_tag</code> sia un campo scalare definito dall'utente in <code translate="no">product_catalog</code> e lo elimina dalla raccolta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver eliminato un campo, è possibile chiamare ` <code translate="no">describe_collection()</code> ` per verificare che il campo non faccia più parte dello schema.</p>
<p><strong>Esempio: Eliminazione di un campo StructArray</strong></p>
<p>L'esempio seguente presuppone che ` <code translate="no">chunks</code> ` sia un campo StructArray in ` <code translate="no">my_collection</code>` e lo elimina dalla raccolta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Esempio: eliminare un campo vettoriale definito dall’utente</strong></p>
<p>È possibile eliminare un campo vettoriale con lo stesso metodo ` <code translate="no">drop_collection_field()</code> `, ma la collezione deve comunque contenere almeno un campo vettoriale dopo l’eliminazione. Ciò è utile per le collezioni che temporaneamente contengono più rappresentazioni vettoriali e successivamente si standardizzano su una di esse.</p>
<p>L’esempio seguente presuppone che ` <code translate="no">image_vector</code> ` sia un campo vettoriale definito dall’utente in ` <code translate="no">hybrid_catalog</code>` e che la collezione conservi ancora un altro campo vettoriale, ad esempio ` <code translate="no">text_vector</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">image_vector</code> è l’ultimo campo vettoriale della collezione, l’operazione di eliminazione viene rifiutata.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Elimina una funzione e il campo vettoriale da essa generato<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare questa operazione quando non è più necessaria una funzione o il campo vettoriale da essa generato, come ad esempio una funzione BM25 e il campo vettoriale sparso da essa generato.</p>
<p>Chiamare ` <code translate="no">drop_function_field()</code> ` specificando il nome della funzione. Milvus rimuove la funzione, il campo vettoriale da essa generato e l’indice associato, conservando al contempo i campi di input della funzione.</p>
<p><strong>Esempio: eliminazione di una funzione BM25 e del campo vettoriale sparso da essa generato</strong></p>
<p>L'esempio seguente presuppone che ` <code translate="no">text_bm25</code> ` sia una funzione BM25 in ` <code translate="no">product_catalog</code> ` e generi un campo di output vettoriale sparso denominato ` <code translate="no">text_sparse</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta completata con successo l’operazione, <code translate="no">describe_collection()</code> non restituisce più la funzione rimossa né il campo vettoriale da essa generato. I campi di input della funzione rimangono nello schema.</p>
<p>Se la rimozione del campo di output della funzione lasciasse la collezione priva di qualsiasi campo vettoriale, l’operazione viene rifiutata.</p>
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">Quale metodo devo utilizzare per aggiungere un campo o una funzione?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">add_collection_field()</code> per aggiungere un campo scalare o vettoriale definito dall’utente.</p>
<p>Utilizzare ` <code translate="no">add_collection_struct_field()</code> ` per aggiungere un campo `StructArray` quando è necessario un campo array i cui elementi condividono lo stesso schema `Struct`.</p>
<p>Utilizza ` <code translate="no">add_function_field()</code> ` per aggiungere una funzione, il campo vettoriale generato da essa e la definizione dell’indice associato nella stessa modifica dello schema.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Perché i campi definiti dall’utente aggiunti devono essere nullabili?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Le entità esistenti sono state inserite prima che il nuovo campo esistesse, quindi non dispongono di valori per quel campo. Impostando ` <code translate="no">nullable=True</code> `, Milvus rappresenta il valore mancante come ` <code translate="no">NULL</code> ` fino a quando l’applicazione non scrive un valore o, per i campi scalari, fino a quando non viene applicato un valore predefinito.</p>
<p>Questa regola si applica ai campi scalari definiti dall’utente e ai campi vettoriali definiti dall’utente aggiunti con l’ <code translate="no">add_collection_field()</code>, nonché ai campi StructArray aggiunti con l’ <code translate="no">add_collection_struct_field()</code>. Non si applica al campo vettoriale generato da una funzione, che non può essere nullabile.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">Cosa succede alle entità esistenti dopo l’aggiunta di un campo definito dall’utente?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Per un campo scalare definito dall’utente, le entità esistenti restituiscono <code translate="no">NULL</code> a meno che non si imposti un <code translate="no">default_value</code>. Se si imposta un <code translate="no">default_value</code>, le entità esistenti restituiscono quel valore predefinito.</p>
<p>Per un campo vettoriale definito dall’utente, le entità esistenti presentano valori ` <code translate="no">NULL</code> ` per il nuovo campo vettoriale. La ricerca vettoriale sul campo aggiunto ignora le entità il cui valore vettoriale è ` <code translate="no">NULL</code>`. Per rendere le entità esistenti ricercabili tramite il nuovo campo vettoriale, è necessario inserire valori vettoriali non NULL tramite un’operazione di upsert o un flusso di lavoro di backfill. Le nuove entità possono includere il nuovo campo vettoriale durante l’inserimento.</p>
<p>Per un campo StructArray, le entità esistenti restituiscono <code translate="no">NULL</code> per il nuovo campo StructArray in tutti i suoi sottocampi. Le nuove entità devono fornire <code translate="no">NULL</code> per tutti i sottocampi oppure valori validi per tutti i sottocampi.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">È possibile aggiungere la ricerca lessicale BM25 a una collezione esistente?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Sì. Se la collezione dispone già di un campo « <code translate="no">VARCHAR</code> » con l’analizzatore abilitato, è possibile aggiungere una funzione BM25 e il relativo campo vettoriale sparso generato per la ricerca lessicale. In questo flusso di lavoro, Milvus aggiunge la funzione, il nuovo campo di output « <code translate="no">SPARSE_FLOAT_VECTOR</code> » e la definizione dell’indice vincolato nella stessa modifica dello schema. In questo flusso di lavoro di modifica dello schema non è possibile utilizzare un campo « <code translate="no">TEXT</code> » esistente come input per BM25. Per utilizzare un input « <code translate="no">TEXT</code> », definire il campo e la funzione BM25 al momento della creazione della collezione.</p>
<p>Quando si chiama ` <code translate="no">add_function_field()</code>`, fornire un oggetto ` <code translate="no">index_params</code> ` che contenga un indice ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` con ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` per il nuovo campo di output. Milvus associa la definizione dell’indice al campo generato nell’ambito della stessa modifica dello schema.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Come si elimina una funzione e il relativo campo vettoriale generato?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Chiamare ` <code translate="no">drop_function_field()</code> ` specificando il nome della funzione. In questo flusso di lavoro di modifica dello schema, Milvus rimuove contemporaneamente la funzione, il campo vettoriale generato e l’indice associato, conservando i campi di input della funzione.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">Devo attendere dopo aver modificato lo schema di una collezione?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Di solito non è necessaria alcuna attesa manuale. Se l’operazione successiva dipende dallo schema aggiornato, è possibile chiamare prima ` <code translate="no">describe_collection()</code> ` per verificare lo schema attualmente restituito da Milvus.</p>
<p>In un'implementazione distribuita, può verificarsi un breve intervallo di propagazione mentre i componenti di Milvus aggiornano i metadati della collezione. Se un'operazione eseguita immediatamente dopo la modifica dello schema fallisce a causa di un errore relativo allo schema, aggiornare lo schema e riprovare l'operazione.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Quando viene recuperato lo spazio di archiviazione dopo l’eliminazione di un campo?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>L'eliminazione di un campo lo rimuove dallo schema corrente e dalla visibilità normale delle query/ricerche, ma i dati storici relativi a quel campo non vengono immediatamente eliminati fisicamente dall'object storage.</p>
<p>Lo spazio di archiviazione può essere recuperato in un secondo momento durante la compattazione. La compattazione è un processo in background che riorganizza i file di dati esistenti in file nuovi e più compatti. Dopo l’eliminazione di un campo, i file appena compattati seguono lo schema corrente e omettono il campo eliminato. Milvus non garantisce una riduzione immediata o in un tempo prestabilito dello spazio di archiviazione dopo l’eliminazione di un campo.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Cosa succede se aggiungo un campo scalare con lo stesso nome di una chiave di campo dinamico?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Se il campo dinamico è abilitato, è possibile aggiungere un campo scalare con lo stesso nome di una chiave di campo dinamico esistente. Il nuovo campo scalare maschera la chiave del campo dinamico nell’output normale della query, ma i dati dinamici originali vengono conservati in <code translate="no">$meta</code>.</p>
<p>Ad esempio, se le entità esistenti memorizzano una chiave dinamica denominata <code translate="no">source</code> e in seguito si aggiunge un campo scalare denominato <code translate="no">source</code>, l’output normale per <code translate="no">source</code> fa riferimento al campo scalare. Per accedere al valore dinamico originale, utilizzare la sintassi del percorso <code translate="no">$meta</code>, ad esempio <code translate="no">$meta[&quot;source&quot;]</code>.</p>
