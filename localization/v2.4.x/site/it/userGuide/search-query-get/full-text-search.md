---
id: full-text-search.md
title: Ricerca a testo completo
related_key: 'full, text, search'
summary: >-
  La ricerca full text è una funzione che recupera i documenti contenenti
  termini o frasi specifiche in insiemi di dati testuali, classificando poi i
  risultati in base alla rilevanza.
---
<h1 id="Full-Text-Search​" class="common-anchor-header">Ricerca a testo completo<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca full text è una funzione che recupera i documenti contenenti termini o frasi specifiche nei dataset di testo, classificando poi i risultati in base alla rilevanza. Questa funzione supera le limitazioni della ricerca semantica, che potrebbe trascurare termini precisi, garantendo la ricezione dei risultati più accurati e contestualmente rilevanti. Inoltre, semplifica le ricerche vettoriali accettando input di testo grezzo, convertendo automaticamente i dati testuali in embedding sparsi senza la necessità di generare manualmente embedding vettoriali.</p>
<p>Utilizzando l'algoritmo BM25 per il punteggio di rilevanza, questa funzione è particolarmente preziosa negli scenari di retrieval-augmented generation (RAG), dove dà priorità ai documenti che corrispondono strettamente a termini di ricerca specifici.</p>
<div class="alert note">
<p>Integrando la ricerca full text con la ricerca vettoriale densa basata sulla semantica, è possibile migliorare l'accuratezza e la pertinenza dei risultati della ricerca. Per ulteriori informazioni, consultare <a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a>.</p>
</div>
<h2 id="Overview​" class="common-anchor-header">Panoramica<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>La ricerca full text semplifica il processo di ricerca basato sul testo, eliminando la necessità di incorporare manualmente i dati. Questa funzione funziona attraverso il seguente flusso di lavoro.</p>
<ol>
<li><p><strong>Inserimento del testo</strong>: L'utente inserisce documenti di testo grezzi o fornisce un testo di query senza necessità di incorporazione manuale.</p></li>
<li><p><strong>Analisi del testo</strong>: Milvus utilizza un analizzatore per tokenizzare il testo in ingresso in singoli termini ricercabili.</p></li>
<li><p><strong>Elaborazione della funzione</strong>: La funzione incorporata riceve i termini tokenizzati e li converte in rappresentazioni vettoriali rade.</p></li>
<li><p><strong>Memorizzazione delle collezioni</strong>: Milvus memorizza queste rappresentazioni rade in una raccolta per un recupero efficiente.</p></li>
<li><p><strong>Punteggio BM25</strong>: Durante la ricerca, Milvus applica l'algoritmo BM25 per calcolare i punteggi dei documenti memorizzati e classifica i risultati corrispondenti in base alla pertinenza con il testo dell'interrogazione.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>Ricerca a testo completo</span> </span></p>
<p>Per utilizzare la ricerca full text, seguire i seguenti passaggi principali.</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">Creare una raccolta</a>: Impostare una raccolta con i campi necessari e definire una funzione per convertire il testo grezzo in embedding sparsi.</p></li>
<li><p><a href="#Insert-text-data">Inserire i dati</a>: Inserire i documenti di testo grezzo nella raccolta.</p></li>
<li><p><a href="#Perform-full-text-search">Eseguire ricerche</a>: Utilizzare testi di interrogazione per cercare nella raccolta e recuperare i risultati pertinenti.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">Creare una raccolta per la ricerca full text<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Per abilitare la ricerca full text, creare una raccolta con uno schema specifico. Questo schema deve includere tre campi necessari.</p>
<ul>
<li><p>Il campo primario che identifica in modo univoco ogni entità della raccolta.</p></li>
<li><p>Un campo <code translate="no">VARCHAR</code> che memorizza documenti di testo grezzo, con l'attributo <code translate="no">enable_analyzer</code> impostato su <code translate="no">True</code>. Questo permette a Milvus di tokenizzare il testo in termini specifici per l'elaborazione delle funzioni.</p></li>
<li><p>Un campo <code translate="no">SPARSE_FLOAT_VECTOR</code> riservato alla memorizzazione di incorporazioni rade che Milvus genererà automaticamente per il campo <code translate="no">VARCHAR</code>.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">Definire lo schema della raccolta</h3><p>Per prima cosa, creare lo schema e aggiungere i campi necessari.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione.</p>
<ul>
<li><p><code translate="no">id</code>: serve come chiave primaria ed è generato automaticamente con <code translate="no">auto_id=True</code>.</p></li>
<li><p><code translate="no">text</code>: memorizza i dati di testo grezzo per le operazioni di ricerca full text. Il tipo di dati deve essere <code translate="no">VARCHAR</code>, poiché <code translate="no">VARCHAR</code> è il tipo di dati stringa di Milvus per la memorizzazione del testo. Impostare <code translate="no">enable_analyzer=True</code> per consentire a Milvus di tokenizzare il testo. Per impostazione predefinita, Milvus utilizza l'<a href="/docs/it/standard-analyzer.md">analizzatore standard</a> per l'analisi del testo. Per configurare un analizzatore diverso, fare riferimento a <a href="/docs/it/analyzer-overview.md">Panoramica</a>.</p></li>
<li><p><code translate="no">sparse</code>: un campo vettoriale riservato alla memorizzazione delle incorporazioni sparse generate internamente per le operazioni di ricerca full text. Il tipo di dati deve essere <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
</ul>
<p>Ora, definire una funzione che converta il testo in rappresentazioni vettoriali rade e aggiungerla allo schema.</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">Parametro</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">Descrizione</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">Il nome della funzione. Questa funzione converte il testo grezzo dal campo <code translate="no">text</code> in vettori ricercabili che verranno memorizzati nel campo <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">Il nome del campo <code translate="no">VARCHAR</code> che richiede la conversione del testo in vettori sparsi. Per <code translate="no">FunctionType.BM25</code>, questo parametro accetta solo un nome di campo.</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">Il nome del campo in cui verranno memorizzati i vettori sparsi generati internamente. Per <code translate="no">FunctionType.BM25</code>, questo parametro accetta solo un nome di campo.</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">Il tipo di funzione da utilizzare. Impostare il valore su <code translate="no">FunctionType.BM25</code>.</p>
</td></tr></tbody></table>
<div class="alert note">
<p>Per collezioni con più campi <code translate="no">VARCHAR</code> che richiedono la conversione da testo a vettore sparso, aggiungere funzioni separate allo schema della collezione, assicurandosi che ogni funzione abbia un nome e un valore <code translate="no">output_field_names</code> unici.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">Configurare l'indice</h3><p>Dopo aver definito lo schema con i campi necessari e la funzione incorporata, configurare l'indice per la raccolta. Per semplificare questo processo, utilizzare <code translate="no">AUTOINDEX</code> come <code translate="no">index_type</code>, un'opzione che consente a Milvus di scegliere e configurare il tipo di indice più adatto in base alla struttura dei dati.</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">Parametro</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">Descrizione</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">Il nome del campo vettoriale da indicizzare. Per la ricerca full text, questo dovrebbe essere il campo che memorizza i vettori sparsi generati. In questo esempio, impostare il valore su <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">Il tipo di indice da creare. <code translate="no">AUTOINDEX</code> permette a Milvus di ottimizzare automaticamente le impostazioni dell'indice. Se si desidera un maggiore controllo sulle impostazioni degli indici, è possibile scegliere tra i vari tipi di indice disponibili per i vettori sparsi in Milvus. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">Il valore di questo parametro deve essere impostato su <code translate="no">BM25</code> per la funzionalità di ricerca full text.</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">Creare la collezione</h3><p>Creare ora la collezione utilizzando i parametri di schema e di indice definiti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">Inserire i dati di testo<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver impostato la raccolta e l'indice, si è pronti a inserire i dati di testo. In questo processo, è sufficiente fornire il testo grezzo. La funzione integrata definita in precedenza genera automaticamente il vettore sparse corrispondente per ogni voce di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">Eseguire la ricerca di testo completo<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta inseriti i dati nella collezione, è possibile eseguire ricerche full text utilizzando query di testo grezzo. Milvus converte automaticamente la query in un vettore rado e classifica i risultati della ricerca utilizzando l'algoritmo BM25, per poi restituire i risultati topK (<code translate="no">limit</code>).</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">Parametro</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">Descrizione</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">Un dizionario contenente i parametri di ricerca.</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">Percentuale di termini a bassa frequenza da ignorare durante la ricerca. Per i dettagli, fare riferimento a <a href="/docs/it/sparse_vector.md">Vettore sparso</a>.</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">Il testo grezzo della query.</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">Il nome del campo che contiene i vettori sparsi generati internamente.</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">Numero massimo di top match da restituire.</p>
</td></tr></tbody></table>
<p></p>
