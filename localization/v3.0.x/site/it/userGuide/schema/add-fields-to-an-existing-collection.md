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
    </button></h1><p>Quando una raccolta passa dalla fase di sviluppo a quella di produzione, spesso il suo schema subisce delle modifiche. È possibile aggiungere campi scalari come <code translate="no">source_uri</code> o <code translate="no">review_status</code> per il filtraggio e la logica applicativa, aggiungere un nuovo campo vettoriale per gli embedding generati dall'applicazione, aggiungere una funzione BM25 e il relativo campo vettoriale sparso generato per la ricerca lessicale sul testo esistente, oppure rimuovere campi e funzioni che non vengono più utilizzati. La funzione "Modifica schema della raccolta" consente di apportare modifiche supportate a campi e funzioni direttamente sul posto, anziché ricreare la raccolta.</p>
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
</ul>
<ul>
<li>L’aggiunta di campi StructArray è supportata in Milvus 3.0.0 e versioni successive. I campi StructArray aggiunti devono essere nullabili.</li>
</ul>
<ul>
<li>I nomi dei campi devono essere univoci all’interno della collezione.</li>
</ul>
<p><strong>Aggiungere una funzione e il relativo campo vettoriale generato</strong></p>
<ul>
<li><p>Ogni aggiornamento dello schema può aggiungere solo una funzione e un campo vettoriale generato.</p></li>
<li><p>La funzione supportata determina il tipo di campo vettoriale generato: ` <code translate="no">BM25</code> ` genera un campo ` <code translate="no">SPARSE_FLOAT_VECTOR</code> `, mentre ` <code translate="no">MINHASH</code> ` genera un campo ` <code translate="no">BINARY_VECTOR</code> `.</p></li>
<li><p>Il campo vettoriale generato deve essere un nuovo campo. Non può fare riferimento a un campo già esistente nello schema della collezione.</p></li>
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
<li><p>In questo flusso di lavoro di modifica dello schema, l'eliminazione di una funzione comporta la rimozione della funzione stessa, del campo vettoriale da essa generato e dell'indice associato. I campi di input della funzione rimangono nello schema della collezione.</p></li>
<li><p>L'eliminazione di una funzione viene rifiutata se la rimozione del campo vettoriale da essa generato lascerebbe la raccolta senza alcun campo vettoriale.</p></li>
</ul>
<div class="alert note">
<p>Per le modifiche allo schema che esulano dalle operazioni di aggiunta ed eliminazione supportate, ricreare o migrare la collezione.</p>
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
<li><p><a href="#Add-user-defined-scalar-fields--Milvus-26x">Aggiungere campi scalari definiti dall’utente</a> quando sono necessari nuovi metadati per il filtraggio, l’output delle query o la logica dell’applicazione.</p></li>
<li><p><a href="#Add-StructArray-fields--Milvus-300">Aggiungere campi StructArray</a> quando è necessario un campo array i cui elementi condividono lo stesso schema Struct.</p></li>
<li><p><a href="#Add-user-defined-vector-fields--Milvus-2618">Aggiungere campi vettoriali definiti dall'utente</a> quando l'applicazione genera embedding e scrive valori vettoriali in Milvus.</p></li>
<li><p><a href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x">Aggiungere una funzione e il campo vettoriale da essa generato</a> quando Milvus deve generare valori vettoriali da campi esistenti, come i vettori sparsi BM25 o le firme MinHash da testo.</p></li>
</ul>
<p>In tutti i casi, il nome del nuovo campo non deve già esistere nella collezione e il numero totale di campi non può superare il limite di Milvus relativo al numero di campi. Per ulteriori dettagli, consultare <a href="/docs/it/limitations.md#number-of-resources-in-a-collection">Limiti</a> di <a href="/docs/it/limitations.md#number-of-resources-in-a-collection">Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields" class="common-anchor-header">Aggiungere campi scalari definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields" class="anchor-icon" translate="no">
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
<p><strong>Esempio: Aggiunta di un campo scalare nullable</strong></p>
<p>L'esempio seguente aggiunge un campo scalare nullable <code translate="no">source</code> a una raccolta esistente denominata <code translate="no">product_catalog</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFunctionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropFunctionFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;source&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;source&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">128</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;
client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;source&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;source&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;source&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;source&quot;</span>, maxLength: <span class="hljs-number">128</span>, nullable: <span class="hljs-literal">true</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;source&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 128
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l’aggiunta del campo, le entità già presenti nella collezione restituiscono <code translate="no">NULL</code> per <code translate="no">source</code>. Le nuove entità possono impostare <code translate="no">source</code> durante l’inserimento o l’aggiornamento.</p>
<p><strong>Esempio: aggiungere un campo scalare con un valore predefinito</strong></p>
<p>Se le entità esistenti devono restituire un valore concreto anziché <code translate="no">NULL</code>, specificare <code translate="no">default_value</code> quando si aggiunge un campo scalare. L’esempio seguente aggiunge un campo <code translate="no">review_status</code> e utilizza <code translate="no">&quot;unreviewed&quot;</code> come valore predefinito.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;review_status&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">32</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-string">&quot;unreviewed&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;review_status&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">32</span>).
    WithDefaultValueString(<span class="hljs-string">&quot;unreviewed&quot;</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;review_status&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">32</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                    .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;review_status&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">32</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                .<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;review_status&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">32</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default_value</span>: <span class="hljs-string">&quot;unreviewed&quot;</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;review_status&quot;</span>, maxLength: <span class="hljs-number">32</span>, nullable: <span class="hljs-literal">true</span>, defaultValue: <span class="hljs-string">&quot;unreviewed&quot;</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;review_status&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;defaultValue&quot;: &quot;unreviewed&quot;,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 32
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta aggiunto il campo, le entità già presenti nella collezione restituiscono <code translate="no">&quot;unreviewed&quot;</code> per <code translate="no">review_status</code>. Le nuove entità possono impostare un valore diverso oppure utilizzare il valore predefinito quando non viene fornito alcun valore.</p>
<h3 id="Add-StructArray-fields" class="common-anchor-header">Aggiungere campi StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">add_collection_struct_field()</code> per aggiungere un campo StructArray che accetta array di elementi Struct. Per aggiungere un campo StructArray, procedere come segue:</p>
<ol>
<li><p>Creare uno schema Struct contenente i sottocampi necessari dei tipi di dati supportati. Per i tipi di dati applicabili, fare riferimento a <a href="/docs/it/structarray-limits.md#Supported-subfield-data-types">Limiti di StructArray</a>.</p></li>
<li><p>Fare riferimento allo schema Struct creato in precedenza e impostare la capacità massima del campo in <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Impostare ` <code translate="no">nullable=True</code> ` nella richiesta.</p></li>
</ol>
<p><strong>Esempio: aggiungere un campo StructArray nullable</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a struct schema</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># add a scalar field to the struct</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># add a vector field to the struct with mmap enabled</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
Map&lt;String, String&gt; mmapParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
mmapParams.put(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;books&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1024</span>)
        .nullable(<span class="hljs-literal">true</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
structSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxCapacity(<span class="hljs-number">1024</span>).
    WithStructSchema(structSchema)
err = client.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;books&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add struct field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">struct_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1024</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    );
client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;books&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(struct_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
milvus::StructFieldSchema struct_schema = milvus::<span class="hljs-built_in">StructFieldSchema</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
                                              .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1024</span>)
                                              .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(
    milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;books&quot;</span>).<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;Array&quot;</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-string">&quot;Struct&quot;</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1024</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">fields</span>: [
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
        ],
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Create a struct schema</span>
<span class="hljs-keyword">var</span> structSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1024</span>,
    Nullable = <span class="hljs-literal">true</span>
};

<span class="hljs-comment">// add a scalar field to the struct</span>
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">65535</span>));
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;chapter&quot;</span>, maxLength: <span class="hljs-number">512</span>));

<span class="hljs-comment">// add a vector field to the struct with mmap enabled</span>
<span class="hljs-keyword">var</span> textVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;text_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
textVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(textVector);

<span class="hljs-keyword">var</span> chapterVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;chapter_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
chapterVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(chapterVector);

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;books&quot;</span>,
    StructField = structSchema
});
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l’aggiunta del campo StructArray, le entità già presenti nella raccolta restituiscono ` <code translate="no">NULL</code> ` per ` <code translate="no">chunks</code> ` in tutti i suoi sottocampi. Quando si inserisce una nuova entità, assicurarsi che tutti i sottocampi siano ` <code translate="no">NULL</code> ` o abbiano valori validi. L’inserimento di un’entità con alcuni sottocampi impostati su ` <code translate="no">NULL</code> ` e altri su valori validi genera errori.</p>
<h3 id="Add-user-defined-vector-fields" class="common-anchor-header">Aggiungere campi vettoriali definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields" class="anchor-icon" translate="no">
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
<p>Ogni campo vettoriale definito dall’utente aggiunto deve essere nullable. Le entità esistenti dispongono di un valore " <code translate="no">NULL</code> " per il nuovo campo vettoriale fino a quando non si scrivono valori vettoriali tramite upsert o un flusso di lavoro di backfill. Le nuove entità possono includere il campo vettoriale durante l’inserimento. La ricerca vettoriale ignora le entità il cui valore vettoriale è " <code translate="no">NULL</code>". Per ulteriori dettagli, consultare <a href="/docs/it/nullable-and-default.md">Campi nullable</a>.</p>
<p><strong>Esempio: Aggiunta di un campo vettoriale nullabile</strong></p>
<p>L’esempio seguente aggiunge un campo vettoriale denso nullabile denominato <code translate="no">embedding_v2</code> a una raccolta esistente. Impostare <code translate="no">dim</code> in base alla dimensionalità degli embedding generati dall’applicazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding_v2&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithNullable(<span class="hljs-literal">true</span>).
    WithDim(<span class="hljs-number">768</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                                .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> embeddingV2 = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding_v2&quot;</span>, dimension: <span class="hljs-number">768</span>);
embeddingV2.Nullable = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = embeddingV2
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;embedding_v2&quot;,
         &quot;dataType&quot;: &quot;FloatVector&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;dim&quot;: 768
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver aggiunto il campo, creare un indice sul nuovo campo vettoriale prima di effettuare ricerche al suo interno:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java">client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, index.NewAutoIndex(entity.COSINE))
_, err = client.CreateIndex(ctx, indexOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(
    milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_desc)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;indexParams&quot;: [
         {
           &quot;fieldName&quot;: &quot;embedding_v2&quot;,
           &quot;params&quot;: {&quot;index_type&quot;: &quot;AUTOINDEX&quot;},
           &quot;metricType&quot;: &quot;COSINE&quot;
         }
       ]
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le entità esistenti hanno valori vettoriali non nulli ( <code translate="no">NULL</code> ) per il campo " <code translate="no">embedding_v2</code> " e vengono ignorate quando si effettua una ricerca su questo campo. Per rendere le entità esistenti ricercabili tramite " <code translate="no">embedding_v2</code>", inserire valori vettoriali non nulli tramite upsert o un flusso di lavoro di backfill. Le nuove entità possono includere valori vettoriali non nulli ( <code translate="no">embedding_v2</code> ) durante l'inserimento.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field" class="common-anchor-header">Aggiungi una funzione e il campo vettoriale generato<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare questo flusso di lavoro quando Milvus deve generare un nuovo campo vettoriale a partire dai dati già memorizzati in una collezione esistente. L’operazione aggiunge tre elementi di schema correlati:</p>
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
<tr><th>Funzione</th><th>Tipo di campo vettoriale generato</th><th>Campo di input tipico</th><th>Caso d’uso tipico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Un campo " <code translate="no">VARCHAR</code> " con l'analizzatore abilitato</td><td>Ricerca lessicale e rilevanza delle parole chiave</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Un campo " <code translate="no">VARCHAR</code> "</td><td>Rilevamento di quasi-duplicati</td></tr>
</tbody>
</table>
<p>Per i dettagli su come funziona ciascuna funzione, fare riferimento alle sezioni <a href="/docs/it/bm25-function.md">Funzione BM25</a> e <a href="/docs/it/minhash-function.md">Funzione MinHash</a>.</p>
<p>Il campo vettoriale generato non deve già esistere nella raccolta e non può essere impostabile su null. Il campo di input della funzione deve già esistere.</p>
<p><strong>Esempio: Aggiunta di una funzione BM25 e del relativo campo vettoriale sparso generato</strong></p>
<p>L’esempio seguente aggiunge una funzione BM25 denominata <code translate="no">text_bm25</code> e il relativo campo vettoriale sparso generato denominato <code translate="no">text_sparse</code> a una collezione esistente. La collezione deve già contenere un campo <code translate="no">VARCHAR</code> denominato <code translate="no">text</code> con l’analizzatore abilitato.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python">sparse_field = client.create_field_schema(
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client.addFunctionField(AddFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .indexParam(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
                .metricType(IndexParam.MetricType.BM25)
                .build())
        .function(CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                .functionType(FunctionType.BM25)
                .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
                .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
field := entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector)
function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>)
boundIndex := index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>)
err = client.AddFunctionField(ctx, milvusclient.NewAddFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, field, function, boundIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client
    .<span class="hljs-title function_ invoke__">add_function_field</span>(
        AddFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector),
            )
            .<span class="hljs-title function_ invoke__">function</span>(
                Function::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
                    .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
                    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text_sparse&quot;</span>]),
            )
            .<span class="hljs-title function_ invoke__">index</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
<span class="hljs-function">milvus::FieldSchema <span class="hljs-title">sparse_field</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR)</span></span>;
milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
status = client-&gt;<span class="hljs-built_in">AddFunctionField</span>(milvus::<span class="hljs-built_in">AddFunctionFieldRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                      .<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(sparse_field))
                                      .<span class="hljs-built_in">WithFunction</span>(function)
                                      .<span class="hljs-built_in">WithIndex</span>(std::<span class="hljs-built_in">move</span>(index)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;SparseFloatVector&quot;</span>,
    },
    <span class="hljs-attr">function</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
    },
    <span class="hljs-attr">extra_params</span>: {
        <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
            <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>,
            <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span>,
        },
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddFunctionFieldAsync(<span class="hljs-keyword">new</span> AddFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateSparseFloatVector(<span class="hljs-string">&quot;text_sparse&quot;</span>, description: <span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>),
    Function = FunctionSchema.CreateBm25(<span class="hljs-string">&quot;text_bm25&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>),
    IndexParam = <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, [<span class="hljs-string">&quot;bm25_k1&quot;</span>] = <span class="hljs-string">&quot;1.2&quot;</span>, [<span class="hljs-string">&quot;bm25_b&quot;</span>] = <span class="hljs-string">&quot;0.75&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<p>L’oggetto ` <code translate="no">index_params</code> ` deve contenere esattamente una definizione di indice per il nuovo campo di output `Function`. Milvus aggiunge la `Function`, il campo vettoriale generato e la definizione dell’indice associato nella stessa modifica dello schema. Non chiamare ` <code translate="no">create_index()</code> ` separatamente dopo ` <code translate="no">add_function_field()</code>`.</p>
<p>Concettualmente, questa operazione aggiunge la seguente definizione di Function, il campo di output generato e le definizioni di indice associato:</p>
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
    </button></h2><p>È possibile rimuovere direttamente i campi definiti dall’utente quando non fanno più parte del modello della collezione. Per rimuovere una funzione e il campo vettoriale da essa generato, eliminare la funzione; Milvus rimuove il campo generato e il relativo indice nella stessa modifica dello schema.</p>
<h3 id="Drop-user-defined-fields" class="common-anchor-header">Eliminazione di campi definiti dall’utente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields" class="anchor-icon" translate="no">
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
<li><p>Una volta completata con successo l’operazione ` <code translate="no">drop_collection_field()</code> `, lo schema della collezione viene aggiornato: ` <code translate="no">describe_collection()</code> ` non restituisce più il campo eliminato e le query o le ricerche non possono più restituire il campo in ` <code translate="no">output_fields</code> ` né utilizzarlo nelle espressioni.</p></li>
<li><p>Gli indici creati sul campo eliminato vengono rimossi nell’ambito dell’aggiornamento dello schema.</p></li>
</ul>
<p>La pulizia dello spazio di archiviazione viene gestita separatamente dalla pulizia dello schema. Per ulteriori dettagli, consultare <a href="#When-is-storage-space-reclaimed-after-dropping-a-field">Quando viene recuperato lo spazio di archiviazione dopo l’eliminazione di un campo?</a></p>
<p><strong>Esempio: eliminare un campo scalare definito dall’utente</strong></p>
<p>L'esempio seguente presuppone che <code translate="no">experiment_tag</code> sia un campo scalare definito dall'utente in <code translate="no">product_catalog</code> e lo elimina dalla collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;experiment_tag&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;experiment_tag&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;experiment_tag&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver eliminato un campo, è possibile chiamare ` <code translate="no">describe_collection()</code> ` per verificare che il campo non faccia più parte dello schema.</p>
<p><strong>Esempio: eliminare un campo StructArray</strong></p>
<p>L'esempio seguente presuppone che ` <code translate="no">chunks</code> ` sia un campo `StructArray` in ` <code translate="no">my_collection</code>` e lo rimuove dalla collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;chunks&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;chunks&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    FieldName = <span class="hljs-string">&quot;chunks&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p><strong>Esempio: eliminare un campo vettore definito dall'utente</strong></p>
<p>È possibile eliminare un campo vettoriale con lo stesso metodo <code translate="no">drop_collection_field()</code>, ma la collezione deve comunque contenere almeno un campo vettoriale dopo l’eliminazione. Ciò è utile per le collezioni che contengono temporaneamente più rappresentazioni vettoriali e successivamente si standardizzano su una di esse.</p>
<p>L’esempio seguente presuppone che ` <code translate="no">image_vector</code> ` sia un campo vettoriale definito dall’utente in ` <code translate="no">hybrid_catalog</code>` e che la collezione conservi ancora un altro campo vettoriale, ad esempio ` <code translate="no">text_vector</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>, <span class="hljs-string">&quot;image_vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;image_vector&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;image_vector&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">image_vector</code> è l’ultimo campo vettoriale della collezione, l’operazione di rimozione viene rifiutata.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Eliminazione di una funzione e del campo vettoriale da essa generato<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare questa operazione quando non è più necessaria una funzione o il campo vettoriale da essa generato, ad esempio una funzione BM25 e il campo vettoriale sparso da essa generato.</p>
<p>Chiamare ` <code translate="no">drop_function_field()</code> ` specificando il nome della funzione. Milvus rimuove la funzione, il campo vettoriale da essa generato e l’indice associato, conservando al contempo i campi di input della funzione.</p>
<p><strong>Esempio: eliminazione di una funzione BM25 e del campo vettoriale sparso da essa generato</strong></p>
<p>L’esempio seguente presuppone che ` <code translate="no">text_bm25</code> ` sia una funzione BM25 in ` <code translate="no">product_catalog</code> ` e generi un campo di output vettoriale sparso denominato ` <code translate="no">text_sparse</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropFunctionField(DropFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .functionName(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropFunctionField(ctx, milvusclient.NewDropFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;text_bm25&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_function_field</span>(
        DropFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">function_name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropFunctionField</span>(milvus::<span class="hljs-built_in">DropFunctionFieldRequest</span>()
                                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                       .<span class="hljs-built_in">WithFunctionName</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">function_name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropFunctionFieldAsync(<span class="hljs-keyword">new</span> DropFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FunctionName = <span class="hljs-string">&quot;text_bm25&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Una volta completata con successo l’operazione, <code translate="no">describe_collection()</code> non restituisce più la funzione eliminata né il campo vettoriale da essa generato. I campi di input della funzione rimangono nello schema.</p>
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
    </button></h3><p>Utilizza ` <code translate="no">add_collection_field()</code> ` per aggiungere un campo scalare o vettoriale definito dall'utente.</p>
<p>Utilizzare ` <code translate="no">add_collection_struct_field()</code> ` per aggiungere un campo `StructArray` quando è necessario un campo array i cui elementi condividono lo stesso schema `Struct`.</p>
<p>Utilizza ` <code translate="no">add_function_field()</code> ` per aggiungere una funzione, il campo vettoriale da essa generato e la definizione dell’indice associato nella stessa modifica dello schema.</p>
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
    </button></h3><p>Le entità esistenti sono state inserite prima che il nuovo campo esistesse, quindi non dispongono di valori per quel campo. Impostando ` <code translate="no">nullable=True</code> `, Milvus rappresenta il valore mancante come ` <code translate="no">NULL</code> ` finché l’applicazione non scrive un valore o, per i campi scalari, finché non viene applicato un valore predefinito.</p>
<p>Questa regola si applica ai campi scalari definiti dall’utente e ai campi vettoriali definiti dall’utente aggiunti con ` <code translate="no">add_collection_field()</code>`, nonché ai campi `StructArray` aggiunti con ` <code translate="no">add_collection_struct_field()</code>`. Non si applica al campo vettoriale generato da una funzione, che non può essere nullabile.</p>
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
<p>Per un campo vettoriale definito dall’utente, le entità esistenti presentano valori ` <code translate="no">NULL</code> ` per il nuovo campo vettoriale. La ricerca vettoriale sul campo aggiunto salta le entità il cui valore vettoriale è ` <code translate="no">NULL</code>`. Per rendere le entità esistenti ricercabili tramite il nuovo campo vettoriale, è necessario inserire valori vettoriali non NULL tramite un’operazione di upsert o un flusso di lavoro di backfill. Le nuove entità possono includere il nuovo campo vettoriale durante l’inserimento.</p>
<p>Per un campo StructArray, le entità esistenti restituiscono valori ` <code translate="no">NULL</code> ` per il nuovo campo StructArray in tutti i suoi sottocampi. Le nuove entità devono fornire valori ` <code translate="no">NULL</code> ` per tutti i sottocampi oppure valori validi per tutti i sottocampi.</p>
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
    </button></h3><p>Sì. Se la collezione dispone già di un campo ` <code translate="no">VARCHAR</code> ` con l’analizzatore abilitato, è possibile aggiungere una funzione BM25 e il relativo campo vettoriale sparso generato per la ricerca lessicale. In questo flusso di lavoro, Milvus aggiunge la funzione, il nuovo campo di output ` <code translate="no">SPARSE_FLOAT_VECTOR</code> ` e la definizione dell’indice vincolato nella stessa modifica dello schema. In questo flusso di lavoro di modifica dello schema non è possibile utilizzare un campo <code translate="no">TEXT</code> esistente come input per BM25. Per utilizzare un input <code translate="no">TEXT</code>, definire il campo e la funzione BM25 al momento della creazione della collezione.</p>
<p>Quando si chiama ` <code translate="no">add_function_field()</code>`, fornire un oggetto ` <code translate="no">index_params</code> ` contenente un indice ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` con ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` per il nuovo campo di output. Milvus associa la definizione dell’indice al campo generato come parte della stessa modifica dello schema.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Come si elimina una funzione e il campo vettoriale da essa generato?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Chiamare <code translate="no">drop_function_field()</code> specificando il nome della funzione. In questo flusso di lavoro di modifica dello schema, Milvus rimuove contemporaneamente la funzione, il campo vettoriale generato e l’indice associato, conservando i campi di input della funzione.</p>
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
    </button></h3><p>Di norma, non è richiesta alcuna attesa manuale. Se l’operazione successiva dipende dallo schema aggiornato, è possibile chiamare prima ` <code translate="no">describe_collection()</code> ` per verificare lo schema attualmente restituito da Milvus.</p>
<p>In un’implementazione distribuita, può verificarsi un breve intervallo di propagazione mentre i componenti di Milvus aggiornano i metadati della collezione. Se un’operazione eseguita immediatamente dopo la modifica dello schema fallisce a causa di un errore relativo allo schema, aggiornare lo schema e riprovare l’operazione.</p>
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
    </button></h3><p>L'eliminazione di un campo lo rimuove dallo schema corrente e dalla normale visibilità delle query/ricerche, ma i dati storici relativi a quel campo non vengono immediatamente eliminati fisicamente dall’object storage.</p>
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
