---
id: schema-hands-on.md
title: Progettazione del modello di dati per la ricerca
summary: >-
  I sistemi di Information Retrieval, noti anche come motori di ricerca, sono
  essenziali per varie applicazioni di IA, come la Retrieval-augmented
  generation (RAG), la ricerca visiva e la raccomandazione di prodotti. Il cuore
  di questi sistemi è un modello di dati accuratamente progettato per
  organizzare, indicizzare e recuperare le informazioni.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Progettazione del modello di dati per la ricerca<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>I sistemi di recupero delle informazioni, noti anche come motori di ricerca, sono essenziali per varie applicazioni di intelligenza artificiale, come la generazione aumentata dal recupero (RAG), la ricerca visiva e la raccomandazione di prodotti. Alla base di questi sistemi c'è un modello di dati accuratamente progettato per organizzare, indicizzare e recuperare le informazioni.</p>
<p>Milvus consente di specificare il modello di dati di ricerca attraverso uno schema di raccolta, organizzando i dati non strutturati, le loro rappresentazioni vettoriali dense o rade e i metadati strutturati. Sia che si lavori con testo, immagini o altri tipi di dati, questa guida pratica vi aiuterà a capire e ad applicare i concetti chiave di schema per progettare un modello di dati di ricerca nella pratica.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomia del modello di dati</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Modello di dati<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>La progettazione del modello di dati di un sistema di ricerca comporta l'analisi delle esigenze aziendali e l'astrazione delle informazioni in un modello di dati espresso in forma di schema. Uno schema ben definito è importante per allineare il modello di dati agli obiettivi aziendali, garantendo la coerenza dei dati e la qualità del servizio.  Inoltre, la scelta di tipi di dati e indici adeguati è importante per raggiungere l'obiettivo aziendale in modo economico.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Analizzare le esigenze aziendali</h3><p>Per rispondere efficacemente alle esigenze aziendali è necessario analizzare i tipi di query che gli utenti eseguiranno e determinare i metodi di ricerca più adatti.</p>
<ul>
<li><p><strong>Query degli utenti:</strong> Identificare i tipi di query che gli utenti dovrebbero eseguire. Questo aiuta a garantire che lo schema supporti i casi d'uso reali e ottimizzi le prestazioni di ricerca. Queste possono includere</p>
<ul>
<li><p>Recupero di documenti che corrispondono a una query in linguaggio naturale.</p></li>
<li><p>Trovare immagini simili a un'immagine di riferimento o corrispondenti a una descrizione testuale</p></li>
<li><p>Ricerca di prodotti in base ad attributi come il nome, la categoria o il marchio</p></li>
<li><p>Filtrare gli articoli in base a metadati strutturati (ad esempio, data di pubblicazione, tag, valutazioni).</p></li>
<li><p>Combinazione di più criteri in query ibride (ad esempio, nella ricerca visiva, considerando la somiglianza semantica delle immagini e delle loro didascalie).</p></li>
</ul></li>
<li><p><strong>Metodi di ricerca:</strong> Scegliere le tecniche di ricerca più adatte ai tipi di query che gli utenti eseguiranno. I diversi metodi hanno scopi diversi e spesso possono essere combinati per ottenere risultati più efficaci:</p>
<ul>
<li><p><strong>Ricerca semantica</strong>: Utilizza la similarità vettoriale densa per trovare elementi con un significato simile, ideale per dati non strutturati come testo o immagini.</p></li>
<li><p><strong>Ricerca full-text</strong>: Completa la ricerca semantica con la corrispondenza delle parole chiave.  La ricerca full-text può utilizzare l'analisi lessicale per evitare di scomporre parole lunghe in token frammentati, cogliendo i termini speciali durante il recupero.</p></li>
<li><p><strong>Filtraggio dei metadati</strong>: In aggiunta alla ricerca vettoriale, applicazione di vincoli come intervalli di date, categorie o tag.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Tradurre i requisiti aziendali in un modello di dati di ricerca</h3><p>Il passo successivo consiste nel tradurre i requisiti aziendali in un modello di dati concreto, identificando i componenti principali delle informazioni e i relativi metodi di ricerca:</p>
<ul>
<li><p>Definire i dati da memorizzare, come i contenuti grezzi (testo, immagini, audio), i metadati associati (titoli, tag, paternità) e gli attributi contestuali (timestamp, comportamento dell'utente, ecc.).</p></li>
<li><p>Determinare i tipi e i formati di dati appropriati per ciascun elemento. Ad esempio:</p>
<ul>
<li><p>Descrizioni di testo → stringa</p></li>
<li><p>Incorporamenti di immagini o documenti → vettori densi o sparsi</p></li>
<li><p>Categorie, tag o flag → stringa, array e bool</p></li>
<li><p>Attributi numerici come il prezzo o la valutazione → integer o float</p></li>
<li><p>Informazioni strutturate come i dettagli dell'autore -&gt; json</p></li>
</ul></li>
</ul>
<p>Una chiara definizione di questi elementi garantisce la coerenza dei dati, l'accuratezza dei risultati di ricerca e la facilità di integrazione con le logiche applicative a valle.</p>
<h2 id="Schema-Design" class="common-anchor-header">Progettazione dello schema<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, il modello dei dati è espresso attraverso uno schema di raccolta. La progettazione dei campi giusti all'interno di uno schema di raccolta è fondamentale per consentire un recupero efficace. Ogni campo definisce un particolare tipo di dati memorizzati nella collezione e svolge un ruolo distinto nel processo di ricerca. Ad alto livello, Milvus supporta due tipi principali di campi: <strong>campi vettoriali</strong> e <strong>campi scalari</strong>.</p>
<p>Ora è possibile mappare il modello di dati in uno schema di campi, compresi i vettori e gli eventuali campi scalari ausiliari. Assicuratevi che ogni campo sia correlato agli attributi del vostro modello di dati, prestando particolare attenzione al tipo di vettore (denso o spase) e alla sua dimensione.</p>
<h3 id="Vector-Field" class="common-anchor-header">Campo vettoriale</h3><p>I campi vettoriali memorizzano le incorporazioni per i tipi di dati non strutturati, come testo, immagini e audio. Queste incorporazioni possono essere dense, rade o binarie, a seconda del tipo di dati e del metodo di recupero utilizzato. In genere, i vettori densi sono utilizzati per la ricerca semantica, mentre i vettori radi sono più adatti per la ricerca full-text o lessicale. I vettori binari sono utili quando le risorse di memoria e di calcolo sono limitate. Una raccolta può contenere diversi campi vettoriali per consentire strategie di recupero multimodali o ibride. Per una guida dettagliata su questo argomento, consultare la <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</p>
<p>Milvus supporta i tipi di dati vettoriali: <code translate="no">FLOAT_VECTOR</code> per <a href="/docs/it/dense-vector.md">Dense Vector</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> per <a href="/docs/it/sparse_vector.md">Sparse Vector</a> e <code translate="no">BINARY_VECTOR</code> per <a href="/docs/it/binary-vector.md">Binary Vector</a>.</p>
<h3 id="Scalar-Field" class="common-anchor-header">Campo scalare</h3><p>I campi scalari memorizzano valori primitivi e strutturati, comunemente chiamati metadati, come numeri, stringhe o date. Questi valori possono essere restituiti insieme ai risultati della ricerca vettoriale e sono essenziali per il filtraggio e l'ordinamento. Permettono di restringere i risultati della ricerca in base ad attributi specifici, come limitare i documenti a una particolare categoria o a un intervallo di tempo definito.</p>
<p>Milvus supporta tipi scalari come <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, e <code translate="no">ARRAY</code> per memorizzare e filtrare dati non vettoriali. Questi tipi migliorano la precisione e la personalizzazione delle operazioni di ricerca.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Sfruttare le funzioni avanzate nella progettazione degli schemi<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si progetta uno schema, non è sufficiente mappare i dati nei campi utilizzando i tipi di dati supportati. È essenziale comprendere a fondo le relazioni tra i campi e le strategie disponibili per la configurazione. Tenere a mente le caratteristiche chiave durante la fase di progettazione assicura che lo schema non solo soddisfi i requisiti immediati di gestione dei dati, ma sia anche scalabile e adattabile alle esigenze future. Integrando attentamente queste caratteristiche, è possibile costruire una solida architettura di dati che massimizza le capacità di Milvus e supporta la strategia e gli obiettivi più ampi in materia di dati. Ecco una panoramica delle caratteristiche principali per la creazione di uno schema di raccolta:</p>
<h3 id="Primary-Key" class="common-anchor-header">Chiave primaria</h3><p>Il campo chiave primaria è un componente fondamentale di uno schema, in quanto identifica in modo univoco ogni entità all'interno di una raccolta. La definizione di una chiave primaria è obbligatoria. Deve essere un campo scalare di tipo intero o stringa e contrassegnato come <code translate="no">is_primary=True</code>. Opzionalmente, è possibile abilitare <code translate="no">auto_id</code> per la chiave primaria, alla quale vengono assegnati automaticamente numeri interi che crescono monoliticamente man mano che vengono inseriti altri dati nella raccolta.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/primary-field.md">Campo primario e AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Partizionamento</h3><p>Per accelerare la ricerca, è possibile attivare il partizionamento. Designando un campo scalare specifico per il partizionamento e specificando i criteri di filtraggio basati su questo campo durante le ricerche, è possibile limitare efficacemente l'ambito di ricerca alle sole partizioni pertinenti. Questo metodo migliora significativamente l'efficienza delle operazioni di recupero, riducendo l'ambito di ricerca.</p>
<p>Per ulteriori dettagli, fare riferimento a <a href="/docs/it/use-partition-key.md">Utilizzare la chiave di partizione</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Analizzatore</h3><p>L'analizzatore è uno strumento essenziale per l'elaborazione e la trasformazione dei dati di testo. La sua funzione principale è quella di convertire il testo grezzo in token e di strutturarli per l'indicizzazione e il recupero. A tal fine, l'analizzatore effettua la tokenizzazione della stringa, l'eliminazione delle stop words e lo stemming delle singole parole in tokens.</p>
<p>Per ulteriori dettagli, consultare la sezione <a href="/docs/it/analyzer-overview.md">Panoramica dell'analizzatore</a>.</p>
<h3 id="Function" class="common-anchor-header">Funzione</h3><p>Milvus consente di definire funzioni integrate nello schema per ricavare automaticamente alcuni campi. Ad esempio, è possibile aggiungere una funzione incorporata BM25 che genera un vettore rado da un campo <code translate="no">VARCHAR</code> per supportare la ricerca full-text. Questi campi derivati da funzioni semplificano la preelaborazione e assicurano che la raccolta rimanga autonoma e pronta per le interrogazioni.</p>
<p>Per ulteriori dettagli, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Un esempio del mondo reale<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione, illustreremo il progetto dello schema e l'esempio di codice per un'applicazione di ricerca di documenti multimediali mostrata nel diagramma precedente. Questo schema è stato progettato per gestire un set di dati contenente articoli con mappatura dei dati nei seguenti campi:</p>
<table>
   <tr>
     <th><p><strong>Campo</strong></p></th>
     <th><p><strong>Fonte dei dati</strong></p></th>
     <th><p><strong>Utilizzato dai metodi di ricerca</strong></p></th>
     <th><p><strong>Chiave primaria</strong></p></th>
     <th><p><strong>Chiave di partizione</strong></p></th>
     <th><p><strong>Analizzatore</strong></p></th>
     <th><p><strong>Funzione Ingresso/Uscita</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>autogenerato con abilitato <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/it/get-and-scalar-query.md">Interrogazione con Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>titolo (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>titolo dell'articolo</p></td>
     <td><p><a href="/docs/it/keyword-match.md">Corrispondenza del testo</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>timestamp (<code translate="no">INT32</code>)</p></td>
     <td><p>data di pubblicazione</p></td>
     <td><p><a href="/docs/it/use-partition-key.md">Filtro per chiave di partizione</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>testo (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>testo grezzo dell'articolo</p></td>
     <td><p><a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>input</p></td>
   </tr>
   <tr>
     <td><p>vettore_testo_denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>vettore denso generato da un modello di incorporazione del testo</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Ricerca vettoriale di base</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>vettore sparse autogenerato da una funzione BM25 integrata</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Ricerca a testo completo</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>output</p></td>
   </tr>
</table>
<p>Per ulteriori informazioni sugli schemi e per una guida dettagliata sull'aggiunta di vari tipi di campi, consultare <a href="/docs/it/schema.md">Schema Explained</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Inizializzare lo schema</h3><p>Per iniziare, è necessario creare uno schema vuoto. Questo passo stabilisce una struttura di base per la definizione del modello dei dati.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Aggiungere campi</h3><p>Una volta creato lo schema, il passo successivo è quello di specificare i campi che comporranno i dati. Ogni campo è associato ai rispettivi tipi di dati e attributi.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, per i campi vengono specificati i seguenti attributi:</p>
<ul>
<li><p>Chiave primaria: <code translate="no">article_id</code> viene utilizzata come chiave primaria, consentendo l'assegnazione automatica delle chiavi primarie per le entità in arrivo.</p></li>
<li><p>Chiave di partizione: <code translate="no">timestamp</code> è assegnata come chiave di partizione, consentendo di filtrare per partizioni. Questa potrebbe essere</p></li>
<li><p>Analizzatore di testo: l'analizzatore di testo viene applicato ai due campi stringa <code translate="no">title</code> e <code translate="no">text</code> per supportare rispettivamente la corrispondenza del testo e la ricerca full-text.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Opzionale) Aggiungere funzioni</h3><p>Per migliorare le capacità di interrogazione dei dati, è possibile incorporare delle funzioni nello schema. Ad esempio, si può creare una funzione per elaborare i dati relativi a campi specifici.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo esempio aggiunge una funzione BM25 integrata nello schema, che utilizza il campo <code translate="no">text</code> come input e memorizza i vettori sparsi risultanti nel campo <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">Passi successivi<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/it/create-collection.md">Creare la raccolta</a></p></li>
<li><p><a href="/docs/it/alter-collection-field.md">Alterare il campo della raccolta</a></p></li>
</ul>
