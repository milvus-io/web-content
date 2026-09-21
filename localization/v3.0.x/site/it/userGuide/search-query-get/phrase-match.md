---
id: phrase-match.md
title: Corrispondenza di fraseCompatible with Milvus 2.5.17+
summary: >-
  La ricerca per frase consente di trovare documenti che contengono i termini
  della query come frase esatta. Per impostazione predefinita, le parole devono
  apparire nello stesso ordine e essere direttamente adiacenti l'una all'altra.
  Ad esempio, una query del tipo "robotica machine learning" trova
  corrispondenze con testi come "…modelli tipici di robotica machine learning…",
  in cui le parole "robotica", "machine" e "learning" compaiono in sequenza
  senza altre parole tra di esse.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Corrispondenza di frase<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La corrispondenza di frase consente di cercare documenti che contengano i termini della query come frase esatta. Per impostazione predefinita, le parole devono apparire nello stesso ordine e essere direttamente adiacenti l'una all'altra. Ad esempio, una query come <strong>“robotica machine learning”</strong> trova corrispondenze in testi del tipo <em>“…modelli tipici di robotica e machine learning…”</em>, dove le parole <strong>“robotica”</strong>, <strong>“machine”</strong> e <strong>“learning”</strong> compaiono in sequenza senza altre parole tra di loro.</p>
<p>Tuttavia, in scenari reali, la corrispondenza esatta delle frasi può risultare troppo rigida. Potrebbe essere necessario trovare corrispondenze con testi del tipo <em>“…modelli di machine learning ampiamente adottati nella robotica…”.</em> In questo caso, le stesse parole chiave sono presenti ma non una accanto all’altra né nell’ordine originale. Per gestire questa situazione, la corrispondenza per frase supporta il parametro “ <code translate="no">slop</code> ”, che introduce una maggiore flessibilità. Il valore di " <code translate="no">slop</code> " (spostamento tra i termini) definisce quanti spostamenti posizionali sono consentiti tra i termini della frase. Ad esempio, con un " <code translate="no">slop</code> " pari a 1, una query per <strong>"machine learning"</strong> può trovare corrispondenze con testi come <em>"...machine deep learning..."</em>, dove una parola (<strong>"deep"</strong>) separa i termini originali.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Basata sulla libreria del motore di ricerca <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, la corrispondenza per frase funziona analizzando le informazioni posizionali delle parole all’interno dei documenti. Il diagramma seguente illustra il processo:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>Flusso di lavoro della corrispondenza frasale</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenizzazione del documento</strong>: quando si inseriscono documenti in Milvus, il testo viene suddiviso in token (singole parole o termini) tramite un analizzatore, con la registrazione delle informazioni posizionali per ciascun token. Ad esempio, <strong>doc_1</strong> viene tokenizzato in <strong>[“machine” (pos=0), “learning” (pos=1), “boosts” (pos=2), “efficiency” (pos=3)]</strong>. Per ulteriori informazioni sugli analizzatori, consultare <a href="/docs/it/analyzer-overview.md">la Panoramica sugli analizzatori</a>.</p></li>
<li><p><strong>Creazione dell’indice invertito</strong>: Milvus crea un indice invertito, mappando ogni token ai documenti in cui compare e alle posizioni del token in tali documenti.</p></li>
<li><p><strong>Corrispondenza delle frasi</strong>: quando viene eseguita una query di frase, Milvus cerca ogni token nell’indice invertito e ne verifica le posizioni per determinare se compaiono nell’ordine e nella vicinanza corretti. Il parametro ` <code translate="no">slop</code> ` controlla il numero massimo di posizioni consentite tra i token corrispondenti:</p>
<ul>
<li><p><strong>slop = 0</strong> significa che i token devono apparire <strong>nell’ordine esatto ed essere immediatamente adiacenti</strong> (cioè senza parole extra in mezzo).</p>
<ul>
<li>Nell’esempio, solo <strong>doc_1</strong> (<strong>“machine”</strong> alla <strong>pos=0</strong>, <strong>“learning”</strong> alla <strong>pos=1</strong>) corrisponde esattamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> consente fino a due posizioni di flessibilità o riorganizzazione tra i token corrispondenti.</p>
<ul>
<li><p>Ciò consente l’inversione dell’ordine (<strong>“learning machine”</strong>) o un piccolo spazio tra i token.</p></li>
<li><p>Di conseguenza, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>“learning”</strong> in <strong>pos=0</strong>, <strong>“machine”</strong> in <strong>pos=1</strong>) e <strong>doc_3</strong> (<strong>“learning”</strong> in <strong>pos=1</strong>, <strong>“machine”</strong> in <strong>pos=2</strong>) corrispondono tutti.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Abilitare la corrispondenza di frasi<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza per frase funziona con il tipo di campo ` <code translate="no">VARCHAR</code> `, il tipo di dati stringa in Milvus. Per abilitare la corrispondenza per frase, configurare lo schema della collezione impostando entrambi i parametri ` <code translate="no">enable_analyzer</code> ` e ` <code translate="no">enable_match</code> ` su ` <code translate="no">True</code>`, analogamente alla <a href="/docs/it/keyword-match.md">corrispondenza testuale</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Impostare <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Per abilitare la corrispondenza per frase per un campo specifico <code translate="no">VARCHAR</code>, impostare entrambi i parametri <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> su <code translate="no">True</code> durante la definizione dello schema del campo. Questa configurazione indica a Milvus di tokenizzare il testo e creare un indice invertito con le informazioni posizionali necessarie per una corrispondenza per frase efficiente.</p>
<p>Ecco un esempio di definizione dello schema per abilitare la corrispondenza delle frasi:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Create a schema for a new collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis (tokenization)</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

<span class="hljs-comment">// Create a schema for a new collection</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;embeddings&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/CollectionSchema.h&quot;</span></span>

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-function">milvus::CollectionSchema <span class="hljs-title">schema</span><span class="hljs-params">(<span class="hljs-string">&quot;tech_articles&quot;</span>)</span></span>;
schema.<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>));
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)    <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Enables text analysis (tokenization)</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));    <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embeddings&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                    .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opzionale: configurare un analizzatore<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>La precisione della corrispondenza delle frasi dipende in modo significativo dall'analizzatore utilizzato per tokenizzare i dati di testo. Analizzatori diversi si adattano a lingue e formati di testo diversi, influenzando la tokenizzazione e la precisione posizionale. La selezione di un analizzatore appropriato per il proprio caso d'uso specifico ottimizzerà i risultati della corrispondenza delle frasi.</p>
<p>Per impostazione predefinita, Milvus utilizza l’analizzatore standard, che tokenizza il testo in base agli spazi bianchi e alla punteggiatura, rimuove i token più lunghi di 40 caratteri e converte il testo in minuscolo. Non sono richiesti parametri aggiuntivi per l’utilizzo predefinito. Per i dettagli, consultare <a href="/docs/it/standard-analyzer.md">Analizzatore standard</a>.</p>
<p>Se la propria applicazione richiede un analizzatore specifico, configurarlo utilizzando il parametro ` <code translate="no">analyzer_params</code> `. Ad esempio, ecco come configurare l’analizzatore ` <code translate="no">english</code> ` per la corrispondenza delle frasi in un testo in inglese:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis</span>
        .analyzerParams(analyzerParams) <span class="hljs-comment">// Specifies the analyzer configuration</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis</span>
    WithAnalyzerParams(analyzerParams).    <span class="hljs-comment">// Specifies the analyzer configuration</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">const</span> analyzer_params = { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> };

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis</span>
    <span class="hljs-attr">analyzer_params</span>: analyzer_params, <span class="hljs-comment">// Specifies the analyzer configuration</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;},
                    &quot;enable_match&quot;: true
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
nlohmann::json analyzer_params = {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}};

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)               <span class="hljs-comment">// Enables text analysis</span>
                    .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params) <span class="hljs-comment">// Specifies the analyzer configuration</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));                <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus supporta diversi analizzatori su misura per diverse lingue e casi d’uso. Per informazioni dettagliate, consultare <a href="/docs/it/analyzer-overview.md">la Panoramica degli analizzatori</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utilizzo della corrispondenza delle frasi<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta abilitata la corrispondenza per un campo <code translate="no">VARCHAR</code> nello schema della collezione, è possibile eseguire corrispondenze di frasi utilizzando l’espressione <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>L'espressione <code translate="no">PHRASE_MATCH</code> non fa distinzione tra maiuscole e minuscole. È possibile utilizzare sia <code translate="no">PHRASE_MATCH</code> che <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintassi dell’espressione PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare l’espressione <code translate="no">PHRASE_MATCH</code> per specificare il campo, la frase e la flessibilità facoltativa (<code translate="no">slop</code>) durante la ricerca. La sintassi è la seguente:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-title function_">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-built_in">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Il nome del campo " <code translate="no">VARCHAR</code> " su cui si eseguono le corrispondenze di frase.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> La frase esatta da cercare.</p></li>
<li><p><code translate="no">slop</code> (opzionale)<strong>:</strong> un numero intero che specifica il numero massimo di posizioni consentite nei token corrispondenti.</p>
<ul>
<li><p><code translate="no">0</code> (impostazione predefinita): Effettua corrispondenze solo con frasi esatte. Esempio: un filtro per <strong>“machine learning”</strong> troverà una corrispondenza esatta <strong>con “machine learning”</strong>, ma non con <strong>“machine boosts learning”</strong> o <strong>“learning machine”.</strong></p></li>
<li><p><code translate="no">1</code>: Consente variazioni minori, come un termine in più o un leggero spostamento di posizione. Esempio: un filtro per <strong>“machine learning”</strong> troverà una corrispondenza con <strong>“machine boosts learning”</strong> (un token tra <strong>“machine”</strong> e <strong>“learning”</strong>), ma non con <strong>“learning machine”</strong> (termini invertiti).</p></li>
<li><p><code translate="no">2</code>: Consente maggiore flessibilità, compreso l’ordine inverso dei termini o fino a due token intermedi. Esempio: un filtro per <strong>“machine learning”</strong> troverà corrispondenze con <strong>“learning machine”</strong> (termini invertiti) o <strong>“machine quickly boosts learning”</strong> (due token tra <strong>“machine”</strong> e <strong>“learning”</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Set di dati di esempio<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Supponiamo di avere una raccolta denominata <strong>tech_articles</strong> contenente le seguenti cinque entità:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L’apprendimento automatico migliora l’efficienza nell’analisi dei dati su larga scala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell'IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture di deep learning ottimizzano i carichi computazionali"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"La macchina migliora rapidamente le prestazioni del modello per un apprendimento continuo"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi avanzati espande le capacità dell'IA"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Query con corrispondenza di frase<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando si utilizza il metodo ` <code translate="no">query()</code> `, <strong>`PHRASE_MATCH</strong> ` agisce come un filtro scalare. Vengono restituiti solo i documenti che contengono la frase specificata (entro il margine di tolleranza consentito).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Esempio: slop = 0 (corrispondenza esatta)</h4><p>Questo esempio restituisce i documenti contenenti la frase esatta <strong>“machine learning”</strong> senza alcun token aggiuntivo in mezzo.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(milvus::<span class="hljs-built_in">QueryRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                            response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati di corrispondenza previsti:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L’apprendimento automatico aumenta l’efficienza nell’analisi dei dati su larga scala"</p></td>
   </tr>
</table>
<p>Solo il documento 1 contiene la frase esatta <strong>“machine learning”</strong> nell'ordine specificato senza token aggiuntivi.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Ricerca con corrispondenza di frase<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Nelle operazioni di ricerca, <strong>PHRASE_MATCH</strong> viene utilizzato per filtrare i documenti prima di applicare il ranking di similarità vettoriale. Questo approccio in due fasi restringe innanzitutto l’insieme dei candidati tramite la corrispondenza testuale e poi riorganizza il ranking di tali candidati in base agli embedding vettoriali.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Esempio: slop = 1</h4><p>In questo caso, si consente uno slop pari a 1. Il filtro viene applicato ai documenti che contengono la frase <strong>“learning machine”</strong> con una leggera flessibilità.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .filter(filter)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithFilter(filter).
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>)
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della corrispondenza:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L’apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell’IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture di deep learning ottimizzano i carichi computazionali"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi avanzati espande le capacità dell'IA"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Esempio: slop = 2</h4><p>Questo esempio consente uno slop pari a 2, il che significa che sono ammessi fino a due token aggiuntivi (o termini invertiti) tra le parole <strong>“machine”</strong> e <strong>“learning”.</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della ricerca:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprendimento automatico aumenta l'efficienza nell’analisi dei dati su larga scala"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture di deep learning ottimizzano i carichi computazionali"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Esempio: slop = 3</h4><p>In questo esempio, un valore di slop pari a 3 offre una flessibilità ancora maggiore. Il filtro cerca <strong>"machine learning"</strong> consentendo fino a tre posizioni di token tra le parole.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della corrispondenza:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L’apprendimento automatico migliora l’efficienza nell’analisi dei dati su larga scala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell'IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture di deep learning ottimizzano i carichi computazionali"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi avanzati espande le capacità dell'IA"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerazioni<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>L'abilitazione della corrispondenza delle frasi per un campo comporta la creazione di un indice invertito, che consuma risorse di archiviazione. Quando si decide di abilitare questa funzionalità, è necessario considerare l'impatto sull'archiviazione, poiché varia in base alle dimensioni del testo, ai token univoci e all'analizzatore utilizzato.</p></li>
<li><p>Una volta definito un analizzatore nello schema, le relative impostazioni diventano permanenti per quella raccolta. Se si ritiene che un analizzatore diverso sia più adatto alle proprie esigenze, è possibile eliminare la raccolta esistente e crearne una nuova con la configurazione dell’analizzatore desiderata.</p></li>
<li><p>Le prestazioni della corrispondenza delle frasi dipendono dal modo in cui il testo viene tokenizzato. Prima di applicare un analizzatore all’intera raccolta, utilizzare il metodo ` <code translate="no">run_analyzer</code> ` per esaminare l’output della tokenizzazione. Per ulteriori informazioni, consultare <a href="/docs/it/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">la panoramica sugli analizzatori</a>.</p></li>
<li><p>Regole di escape nelle espressioni di <code translate="no">filter</code>:</p>
<ul>
<li><p>I caratteri racchiusi tra virgolette doppie o singole all’interno delle espressioni vengono interpretati come costanti stringa. Se la costante stringa include caratteri di escape, questi devono essere rappresentati con una sequenza di escape. Ad esempio, utilizzare ` <code translate="no">\\</code> ` per rappresentare <code translate="no">\</code>, <code translate="no">\\t</code> per rappresentare un tabulatore <code translate="no">\t</code> e <code translate="no">\\n</code> per rappresentare un carattere di nuova riga.</p></li>
<li><p>Se una costante stringa è racchiusa tra virgolette singole, una virgoletta singola all’interno della costante deve essere rappresentata come <code translate="no">\\'</code>, mentre una virgoletta doppia può essere rappresentata sia come <code translate="no">&quot;</code> che come <code translate="no">\\&quot;</code>. Esempio: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Se una costante stringa è racchiusa tra virgolette doppie, una virgoletta doppia all’interno della costante deve essere rappresentata come <code translate="no">\\&quot;</code>, mentre una virgoletta singola può essere rappresentata sia come <code translate="no">'</code> che come <code translate="no">\\'</code>. Esempio: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
