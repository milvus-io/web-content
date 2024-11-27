---
id: schema-hands-on.md
title: Progettazione di schemi Hands-On
summary: >-
  Milvus supporta la definizione del modello di dati attraverso uno schema di
  raccolta. Una collezione organizza dati non strutturati come testo e immagini,
  insieme alle loro rappresentazioni vettoriali, compresi vettori densi e radi
  in varie precisioni utilizzate per la ricerca semantica. Inoltre, Milvus
  supporta la memorizzazione e il filtraggio di tipi di dati non vettoriali
  chiamati "Scalar". I tipi di scalare includono BOOL, INT8/16/32/64,
  FLOAT/DOUBLE, VARCHAR, JSON e Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Progettazione di schemi Hands-On<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>I sistemi di Information Retrieval (IR), noti anche come ricerca, sono essenziali per varie applicazioni di intelligenza artificiale, come la Retrieval-augmented generation (RAG), la ricerca di immagini e la raccomandazione di prodotti. Il primo passo nello sviluppo di un sistema IR è la progettazione del modello di dati, che comporta l'analisi dei requisiti aziendali, la determinazione di come organizzare le informazioni e l'indicizzazione dei dati per renderli semanticamente ricercabili.</p>
<p>Milvus supporta la definizione del modello di dati attraverso uno schema di raccolta. Una raccolta organizza i dati non strutturati come testo e immagini, insieme alle loro rappresentazioni vettoriali, compresi i vettori densi e radi in varie precisioni utilizzate per la ricerca semantica. Inoltre, Milvus supporta la memorizzazione e il filtraggio di tipi di dati non vettoriali chiamati &quot;Scalar&quot;. I tipi di scalare includono BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON e Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Esempio di schema di dati progettato per la ricerca di articoli di giornale</span> </span></p>
<p>La progettazione del modello di dati di un sistema di ricerca comporta l'analisi delle esigenze aziendali e l'astrazione delle informazioni in un modello di dati espresso in forma di schema. Ad esempio, per cercare un testo, è necessario &quot;indicizzarlo&quot; convertendo la stringa letterale in un vettore attraverso l'&quot;embedding&quot;, che consente la ricerca vettoriale. Oltre a questo requisito di base, può essere necessario memorizzare altre proprietà, come la data di pubblicazione e l'autore. Questi metadati consentono di affinare le ricerche semantiche attraverso il filtraggio, restituendo solo i testi pubblicati dopo una data specifica o da un particolare autore. Può anche essere necessario recuperarli insieme al testo principale, per rendere il risultato della ricerca nell'applicazione. Per organizzare questi pezzi di testo, a ciascuno di essi deve essere assegnato un identificatore univoco, espresso come un numero intero o una stringa. Questi elementi sono essenziali per ottenere una logica di ricerca sofisticata.</p>
<p>Uno schema ben progettato è importante perché astrae il modello dei dati e decide se gli obiettivi aziendali possono essere raggiunti attraverso la ricerca. Inoltre, dal momento che ogni riga di dati inserita nella raccolta deve seguire lo schema, esso aiuta notevolmente a mantenere la coerenza dei dati e la qualità a lungo termine. Da un punto di vista tecnico, uno schema ben definito porta a una memorizzazione ben organizzata dei dati delle colonne e a una struttura dell'indice più pulita, che può aumentare le prestazioni di ricerca.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Un esempio: Ricerca di notizie<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Supponiamo di voler creare una ricerca per un sito web di notizie e di avere un corpus di notizie con testo, immagini in miniatura e altri metadati. Per prima cosa, dobbiamo analizzare come vogliamo utilizzare i dati per supportare i requisiti aziendali della ricerca. Immaginiamo che il requisito sia recuperare le notizie in base all'immagine in miniatura e al sommario del contenuto, e che i metadati come le informazioni sull'autore e l'ora di pubblicazione siano criteri per filtrare i risultati della ricerca. Questi requisiti possono essere ulteriormente suddivisi in.</p>
<ul>
<li><p>Per cercare le immagini tramite il testo, possiamo incorporare le immagini nei vettori tramite un modello di incorporazione multimodale che può mappare i dati di testo e immagine nello stesso spazio latente.</p></li>
<li><p>Il testo riassuntivo di un articolo viene incorporato nei vettori tramite un modello di incorporazione del testo.</p></li>
<li><p>Per filtrare in base all'ora di pubblicazione, le date sono memorizzate come campo scalare e per il campo scalare è necessario un indice per un filtraggio efficiente. Altre strutture di dati più complesse, come JSON, possono essere memorizzate in uno scalare e la ricerca filtrata può essere eseguita sul loro contenuto (l'indicizzazione di JSON è una funzione in arrivo).</p></li>
<li><p>Per recuperare i byte delle miniature delle immagini e renderle nella pagina dei risultati della ricerca, viene memorizzato anche l'url dell'immagine. Allo stesso modo, per il testo di riepilogo e il titolo. (In alternativa, si possono memorizzare i dati del testo grezzo e del file immagine come campi scalari, se necessario).</p></li>
<li><p>Per migliorare i risultati della ricerca sul testo riassuntivo, progettiamo un approccio di ricerca ibrido. Per un percorso di recupero, utilizziamo un modello di incorporazione regolare per generare un vettore denso dal testo, come <code translate="no">text-embedding-3-large</code> di OpenAI o il modello open-source <code translate="no">bge-large-en-v1.5</code>. Questi modelli sono in grado di rappresentare la semantica complessiva del testo. L'altra strada è quella di utilizzare modelli di incorporazione sparsi, come BM25 o SPLADE, per generare un vettore rado, simile alla ricerca full-text, che è in grado di cogliere i dettagli e i singoli concetti del testo. Milvus supporta l'uso di entrambi nella stessa raccolta di dati grazie alla sua funzione multivettore. La ricerca su più vettori può essere effettuata con un'unica operazione <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Infine, abbiamo bisogno di un campo ID per identificare ogni singola pagina di notizie, formalmente chiamata "entità" nella terminologia di Milvus. Questo campo è usato come chiave primaria (o "pk" in breve).</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Nome del campo</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (chiave primaria)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">titolo</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">autore_info</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">pubblicare_t</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">url_immagine</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">vettore_immagine</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">sommario</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">vettore_riassunto_denso</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">vettore_riassuntivo_sparso</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Tipo</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">VETTORE_FIORITO</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">VETTORE_FIORITO</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">SPARSE_FLOAT_VECTOR</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Necessità di indice</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (supporto in arrivo)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">Come implementare lo schema di esempio<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Creare lo schema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Per prima cosa, creiamo un'istanza client di Milvus, che può essere usata per connettersi al server Milvus e gestire collezioni e dati. </p>
<p>Per impostare uno schema, si usa <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> per creare un oggetto schema e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> per aggiungere campi allo schema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Si può notare l'argomento <code translate="no">uri</code> in <code translate="no">MilvusClient</code>, che viene usato per connettersi al server Milvus. È possibile impostare gli argomenti come segue.</p>
<ul>
<li><p>Se si ha bisogno di un database vettoriale locale solo per dati su piccola scala o per la creazione di prototipi, l'impostazione dell'uri come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</p></li>
<li><p>Se si dispone di una grande quantità di dati, ad esempio più di un milione di vettori, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come uri, ad esempio<code translate="no">http://localhost:19530</code>. Se si attiva la funzione di autenticazione su Milvus, utilizzare "&lt;nome_utente&gt;:&lt;password&gt;" come token, altrimenti non impostare il token.</p></li>
<li><p>Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave API</a> di Zilliz Cloud.</p></li>
</ul>
<p>Come per <code translate="no">auto_id</code> in <code translate="no">MilvusClient.create_schema</code>, AutoID è un attributo del campo primario che determina se abilitare l'incremento automatico per il campo primario.  Poiché abbiamo impostato il campo<code translate="no">article_id</code> come chiave primaria e vogliamo aggiungere manualmente l'id dell'articolo, impostiamo <code translate="no">auto_id</code> False per disabilitare questa funzione.</p>
<p>Dopo aver aggiunto tutti i campi all'oggetto schema, il nostro oggetto schema corrisponde alle voci della tabella precedente.</p>
<h2 id="Define-Index​" class="common-anchor-header">Definire l'indice<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver definito lo schema con i vari campi, compresi i metadati e i campi vettoriali per le immagini e i dati di riepilogo, il passo successivo consiste nel preparare i parametri dell'indice. L'indicizzazione è fondamentale per ottimizzare la ricerca e il recupero dei vettori, garantendo prestazioni efficienti delle query. Nella sezione seguente verranno definiti i parametri dell'indice per i campi vettoriali e scalari specificati nella collezione.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Una volta impostati e applicati i parametri dell'indice, Milvus è ottimizzato per gestire query complesse su dati vettoriali e scalari. Questa indicizzazione migliora le prestazioni e l'accuratezza delle ricerche di similarità all'interno della collezione, consentendo di recuperare in modo efficiente gli articoli basati su vettori di immagini e vettori di sintesi. Sfruttando l'opzione <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> per i vettori densi, il <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> per i vettori sparsi e l'opzione <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> per gli scalari, Milvus è in grado di identificare e restituire rapidamente i risultati più rilevanti, migliorando significativamente l'esperienza complessiva dell'utente e l'efficacia del processo di recupero dei dati.</p>
<p>Esistono molti tipi di indici e metriche. Per ulteriori informazioni su di essi, si può fare riferimento a <a href="https://milvus.io/docs/overview.md#Index-types">Milvus index type</a> e <a href="https://milvus.io/docs/glossary.md#Metric-type">Milvus metric type</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Creare la raccolta<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta definiti lo schema e gli indici, si crea una "collezione" con questi parametri. La collezione per Milvus è come una tabella in un DB relazionale.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Possiamo verificare che la collezione sia stata creata con successo descrivendo la collezione.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Altre considerazioni<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Caricamento dell'indice<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si crea una collezione in Milvus, si può scegliere di caricare l'indice immediatamente o di rimandarlo a dopo l'ingestione di alcuni dati. In genere non è necessario fare una scelta esplicita, poiché gli esempi precedenti mostrano che l'indice viene creato automaticamente per tutti i dati ingeriti subito dopo la creazione della raccolta. Ciò consente di ricercare immediatamente i dati ingeriti. Tuttavia, se si ha un grande inserimento di massa dopo la creazione della raccolta e non si ha bisogno di cercare alcun dato fino a un certo punto, si può rimandare la costruzione dell'indice omettendo index_params nella creazione della raccolta e costruire l'indice chiamando esplicitamente load dopo aver ingerito tutti i dati. Questo metodo è più efficiente per costruire l'indice su un insieme di grandi dimensioni, ma non è possibile effettuare ricerche fino a quando non si chiama load().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Come definire il modello dei dati per la multi-tendenza<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>Il concetto di più tenancy è comunemente usato in scenari in cui una singola applicazione o servizio software deve servire più utenti o organizzazioni indipendenti, ciascuno con il proprio ambiente isolato. Ciò si verifica spesso nel cloud computing, nelle applicazioni SaaS (Software as a Service) e nei sistemi di database. Ad esempio, un servizio di cloud storage può utilizzare la multi-tenancy per consentire a diverse aziende di archiviare e gestire i propri dati separatamente, pur condividendo la stessa infrastruttura sottostante. Questo approccio massimizza l'utilizzo delle risorse e l'efficienza, garantendo al tempo stesso la sicurezza e la privacy dei dati per ciascun tenant.</p>
<p>Il modo più semplice per differenziare i tenant è isolare i loro dati e le loro risorse gli uni dagli altri. Ogni tenant ha accesso esclusivo a risorse specifiche o condivide risorse con altri per gestire entità Milvus come database, collezioni e partizioni. Esistono metodi specifici allineati a queste entità per implementare la multi-tenancy di Milvus. Per ulteriori informazioni, consultare la <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">pagina Milvus multi-tenancy</a>.</p>
