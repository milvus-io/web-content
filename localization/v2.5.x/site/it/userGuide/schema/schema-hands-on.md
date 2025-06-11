---
id: schema-hands-on.md
title: Progettazione di schemi Hands-On
summary: >-
  I sistemi di Information Retrieval (IR), noti anche come motori di ricerca,
  sono essenziali per varie applicazioni di intelligenza artificiale, come la
  generazione aumentata dal recupero (RAG), la ricerca di immagini e la
  raccomandazione di prodotti. Il primo passo nello sviluppo di un sistema IR è
  la progettazione del modello di dati, che comporta l'analisi dei requisiti
  aziendali, la determinazione di come organizzare le informazioni e
  l'indicizzazione dei dati per renderli semanticamente ricercabili.
---

<h1 id="Schema-Design-Hands-On" class="common-anchor-header">Progettazione di schemi Hands-On<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>I sistemi di Information Retrieval (IR), noti anche come motori di ricerca, sono essenziali per varie applicazioni di intelligenza artificiale, come la generazione aumentata dal recupero (RAG), la ricerca di immagini e la raccomandazione di prodotti. Il primo passo nello sviluppo di un sistema IR è la progettazione del modello di dati, che comporta l'analisi dei requisiti aziendali, la determinazione di come organizzare le informazioni e l'indicizzazione dei dati per renderli semanticamente ricercabili.</p>
<p>Milvus supporta la definizione del modello di dati attraverso uno schema di raccolta. Una raccolta organizza i dati non strutturati come testo e immagini, insieme alle loro rappresentazioni vettoriali, compresi i vettori densi e radi in varie precisioni utilizzate per la ricerca semantica. Inoltre, Milvus supporta la memorizzazione e il filtraggio di tipi di dati non vettoriali chiamati "Scalar". I tipi di scalare includono BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON e Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Schema Hands On" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>Schema Hands On</span> </span></p>
<p>La progettazione del modello di dati di un sistema di ricerca comporta l'analisi delle esigenze aziendali e l'astrazione delle informazioni in un modello di dati espresso in forma di schema. Per esempio, per cercare un testo, è necessario "indicizzarlo" convertendo la stringa letterale in un vettore attraverso l'"embedding", che consente la ricerca vettoriale. Oltre a questo requisito di base, può essere necessario memorizzare altre proprietà, come la data di pubblicazione e l'autore. Questi metadati consentono di affinare le ricerche semantiche attraverso il filtraggio, restituendo solo i testi pubblicati dopo una data specifica o da un particolare autore. Può anche essere necessario recuperarli insieme al testo principale, per rendere il risultato della ricerca nell'applicazione. Per organizzare questi pezzi di testo, a ciascuno di essi deve essere assegnato un identificatore univoco, espresso come un numero intero o una stringa. Questi elementi sono essenziali per ottenere una logica di ricerca sofisticata.</p>
<p>Uno schema ben progettato è importante perché astrae il modello dei dati e decide se gli obiettivi aziendali possono essere raggiunti attraverso la ricerca. Inoltre, dal momento che ogni riga di dati inserita nella raccolta deve seguire lo schema, esso aiuta notevolmente a mantenere la coerenza dei dati e la qualità a lungo termine. Da un punto di vista tecnico, uno schema ben definito porta a una memorizzazione ben organizzata dei dati delle colonne e a una struttura dell'indice più pulita, che può aumentare le prestazioni di ricerca.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">Un esempio: Ricerca di notizie<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Supponiamo di voler creare una ricerca per un sito web di notizie e di avere un corpus di notizie con testo, immagini in miniatura e altri metadati. Per prima cosa, dobbiamo analizzare come vogliamo utilizzare i dati per supportare i requisiti aziendali della ricerca. Immaginiamo che il requisito sia recuperare le notizie in base all'immagine in miniatura e al sommario del contenuto, e che i metadati come le informazioni sull'autore e l'ora di pubblicazione siano criteri per filtrare i risultati della ricerca. Questi requisiti possono essere ulteriormente suddivisi in:</p>
<ul>
<li><p>Per cercare le immagini tramite il testo, possiamo incorporare le immagini nei vettori tramite un modello di incorporazione multimodale che può mappare i dati di testo e immagine nello stesso spazio latente.</p></li>
<li><p>Il testo riassuntivo di un articolo viene incorporato nei vettori tramite un modello di incorporazione del testo.</p></li>
<li><p>Per filtrare in base all'ora di pubblicazione, le date sono memorizzate come campo scalare e per il campo scalare è necessario un indice per un filtraggio efficiente. Altre strutture di dati più complesse, come JSON, possono essere memorizzate in uno scalare e la ricerca filtrata può essere eseguita sul loro contenuto (l'indicizzazione di JSON è una funzione in arrivo).</p></li>
<li><p>Per recuperare i byte delle miniature delle immagini e renderle nella pagina dei risultati della ricerca, viene memorizzato anche l'url dell'immagine. Allo stesso modo, per il testo di riepilogo e il titolo. (In alternativa, si possono memorizzare i dati del testo grezzo e del file immagine come campi scalari, se necessario).</p></li>
<li><p>Per migliorare il risultato della ricerca sul testo riassuntivo, progettiamo un approccio di ricerca ibrido. Per un percorso di recupero, utilizziamo un modello di incorporazione regolare per generare un vettore denso dal testo, come <code translate="no">text-embedding-3-large</code> di OpenAI o il modello open-source <code translate="no">bge-large-en-v1.5</code>. Questi modelli sono in grado di rappresentare la semantica complessiva del testo. L'altra strada è quella di utilizzare modelli di incorporazione sparsi, come BM25 o SPLADE, per generare un vettore rado, simile alla ricerca full-text, che è in grado di cogliere i dettagli e i singoli concetti del testo. Milvus supporta l'uso di entrambi nella stessa raccolta di dati grazie alla sua funzione multivettore. La ricerca su più vettori può essere effettuata con un'unica operazione <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Infine, abbiamo bisogno di un campo ID per identificare ogni singola pagina di notizie, formalmente chiamata "entità" nella terminologia di Milvus. Questo campo è usato come chiave primaria (o "pk" in breve).</p></li>
</ul>
<table>
   <tr>
     <th><p>Nome del campo</p></th>
     <th><p>article_id (chiave primaria)</p></th>
     <th><p>titolo</p></th>
     <th><p>autore_info</p></th>
     <th><p>pubblicare_t</p></th>
     <th><p>url_immagine</p></th>
     <th><p>vettore_immagine</p></th>
     <th><p>sommario</p></th>
     <th><p>vettore_riassunto_denso</p></th>
     <th><p>vettore_riassuntivo_sparso</p></th>
   </tr>
   <tr>
     <td><p>Tipo</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>VETTORE_FIORITO</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>VETTORE_FIORITO</p></td>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
   </tr>
   <tr>
     <td><p>Necessità di indice</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (supporto in arrivo)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">Come implementare lo schema di esempio<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">Creare lo schema</h3><p>Per prima cosa, creiamo un'istanza di Milvus client, che può essere usata per connettersi al server Milvus e gestire collezioni e dati.</p>
<p>Per impostare uno schema, utilizziamo <code translate="no">create_schema()</code> per creare un oggetto schema e <code translate="no">add_field()</code> per aggiungere campi allo schema.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

collectionName := <span class="hljs-string">&quot;my_collection&quot;</span>
schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;author_info&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithDescription(<span class="hljs-string">&quot;author information&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;publish_ts&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish timestamp&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_url&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">500</span>).
    WithDescription(<span class="hljs-string">&quot;image url&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;image vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithDescription(<span class="hljs-string">&quot;article summary&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;summary dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;summary sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si può notare l'argomento <code translate="no">uri</code> in <code translate="no">MilvusClient</code>, che viene usato per connettersi al server Milvus. È possibile impostare gli argomenti come segue:</p>
<ul>
<li><p>Se si ha bisogno di un database vettoriale locale solo per i dati su piccola scala o per i prototipi, impostare l'uri come un file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, in quanto utilizza automaticamente <a href="/docs/it/v2.5.x/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</p></li>
<li><p>Se si dispone di una grande quantità di dati, ad esempio più di un milione di vettori, è possibile configurare un server Milvus più performante su <a href="/docs/it/v2.5.x/quickstart.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come uri, ad esempio<code translate="no">http://localhost:19530</code>. Se si attiva la funzione di autenticazione su Milvus, utilizzare "<your_username>:<your_password>" come token, altrimenti non impostare il token.</p></li>
<li><p>Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'endpoint pubblico e alla chiave API di Zilliz Cloud.</p></li>
</ul>
<p>Come per <code translate="no">auto_id</code> in <code translate="no">MilvusClient.create_schema</code>, AutoID è un attributo del campo primario che determina se abilitare l'incremento automatico per il campo primario.  Poiché abbiamo impostato il campo<code translate="no">article_id</code> come chiave primaria e vogliamo aggiungere manualmente l'id dell'articolo, impostiamo <code translate="no">auto_id</code> False per disabilitare questa funzione.</p>
<p>Dopo aver aggiunto tutti i campi all'oggetto schema, il nostro oggetto schema corrisponde alle voci della tabella precedente.</p>
<h3 id="Define-Index" class="common-anchor-header">Definire l'indice</h3><p>Dopo aver definito lo schema con i vari campi, compresi i metadati e i campi vettoriali per le immagini e i dati di riepilogo, il passo successivo consiste nel preparare i parametri dell'indice. L'indicizzazione è fondamentale per ottimizzare la ricerca e il recupero dei vettori, garantendo prestazioni efficienti delle query. Nella sezione seguente, definiremo i parametri dell'indice per i campi vettoriali e scalari specificati nella collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;image_vector&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption3 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index.NewSparseInvertedIndex(index.MetricType(entity.IP), <span class="hljs-number">0.2</span>))
indexOption4 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;publish_ts&quot;</span>,
    index.NewInvertedIndex())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Una volta impostati e applicati i parametri dell'indice, Milvus è ottimizzato per gestire query complesse su dati vettoriali e scalari. Questa indicizzazione migliora le prestazioni e l'accuratezza delle ricerche di similarità all'interno della collezione, consentendo di recuperare in modo efficiente gli articoli basati su vettori di immagini e vettori di sintesi. Sfruttando <code translate="no">AUTOINDEX</code> per i vettori densi, <code translate="no">SPARSE_INVERTED_INDEX</code> per i vettori radi e <code translate="no">INVERTED_INDEX</code> per gli scalari, Milvus è in grado di identificare e restituire rapidamente i risultati più rilevanti, migliorando significativamente l'esperienza complessiva dell'utente e l'efficacia del processo di recupero dei dati.</p>
<p>Esistono molti tipi di indici e metriche. Per ulteriori informazioni su di essi, si può fare riferimento a <a href="/docs/it/v2.5.x/overview.md#Index-types">Milvus index type</a> e <a href="/docs/it/v2.5.x/glossary.md#Metric-type">Milvus metric type</a>.</p>
<h3 id="Create-Collection" class="common-anchor-header">Creare la raccolta</h3><p>Una volta definiti lo schema e gli indici, si crea una "collezione" con questi parametri. La collezione per Milvus è come una tabella in un DB relazionale.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption1, indexOption2, indexOption3, indexOption4))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>

<p>Possiamo verificare che la collezione sia stata creata con successo descrivendo la collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">desc, err := client.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(desc.Schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">Altre considerazioni<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">Caricamento dell'indice</h3><p>Quando si crea una collezione in Milvus, si può scegliere di caricare l'indice immediatamente o di rimandarlo a dopo l'ingestione di alcuni dati. In genere non è necessario fare una scelta esplicita, poiché gli esempi precedenti mostrano che l'indice viene creato automaticamente per tutti i dati ingeriti subito dopo la creazione della raccolta. Ciò consente di ricercare immediatamente i dati ingeriti. Tuttavia, se si ha un grande inserimento di massa dopo la creazione della raccolta e non si ha bisogno di cercare alcun dato fino a un certo punto, si può rimandare la costruzione dell'indice omettendo index_params nella creazione della raccolta e costruire l'indice chiamando esplicitamente load dopo aver ingerito tutti i dati. Questo metodo è più efficiente per costruire l'indice su un insieme di grandi dimensioni, ma non è possibile effettuare ricerche fino a quando non si chiama load().</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">Come definire il modello dei dati per la multi-tendenza</h3><p>Il concetto di più tenancy è comunemente usato in scenari in cui una singola applicazione o servizio software deve servire più utenti o organizzazioni indipendenti, ciascuno con il proprio ambiente isolato. Ciò si verifica spesso nel cloud computing, nelle applicazioni SaaS (Software as a Service) e nei sistemi di database. Ad esempio, un servizio di cloud storage può utilizzare la multi-tenancy per consentire a diverse aziende di archiviare e gestire i propri dati separatamente, pur condividendo la stessa infrastruttura sottostante. Questo approccio massimizza l'utilizzo delle risorse e l'efficienza, garantendo al tempo stesso la sicurezza e la privacy dei dati per ciascun tenant.</p>
<p>Il modo più semplice per differenziare i tenant è isolare i loro dati e le loro risorse gli uni dagli altri. Ogni tenant ha accesso esclusivo a risorse specifiche o condivide risorse con altri per gestire entità Milvus come database, collezioni e partizioni. Esistono metodi specifici allineati a queste entità per implementare la multi-tenancy. Per ulteriori informazioni, consultare la <a href="/docs/it/v2.5.x/multi_tenancy.md#Multi-tenancy-strategies">pagina Milvus multi-tenancy</a>.</p>
