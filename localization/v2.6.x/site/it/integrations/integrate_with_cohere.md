---
id: integrate_with_cohere.md
summary: >-
  Questa pagina illustra come creare un sistema di risposta alle domande basato
  sul set di dati SQuAD, utilizzando Milvus come database vettoriale e Cohere
  come sistema di incorporamento.
title: Risposta alle domande con Milvus e Cohere
---
<h1 id="Question-Answering-Using-Milvus-and-Cohere" class="common-anchor-header">Risposta alle domande con Milvus e Cohere<button data-href="#Question-Answering-Using-Milvus-and-Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come creare un sistema di risposta alle domande basato sul set di dati SQuAD, utilizzando Milvus come database vettoriale e Cohere come sistema di incorporamento.</p>
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
    </button></h2><p>I frammenti di codice di questa pagina richiedono l'installazione di <strong>pymilvus</strong>, <strong>cohere</strong>, <strong>pandas</strong>, <strong>numpy</strong> e <strong>tqdm</strong>. Tra questi pacchetti, <strong>pymilvus</strong> è il client per Milvus. Se non sono presenti sul vostro sistema, eseguite i seguenti comandi per installarli:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus cohere pandas numpy tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Quindi è necessario caricare i moduli da utilizzare in questa guida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> cohere
<span class="hljs-keyword">import</span> pandas
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, FieldSchema, CollectionSchema, DataType, Collection, utility
<button class="copy-code-btn"></button></code></pre>
<h2 id="Parameters" class="common-anchor-header">Parametri<button data-href="#Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Qui si trovano i parametri utilizzati nei seguenti snippet. Alcuni di essi devono essere modificati per adattarsi al proprio ambiente. Accanto a ciascuno di essi è riportata una descrizione.</p>
<pre><code translate="no" class="language-python">FILE = <span class="hljs-string">&#x27;https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json&#x27;</span>  <span class="hljs-comment"># The SQuAD dataset url</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;question_answering_db&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># Embeddings size, cohere embeddings default to 4096 with the large model</span>
COUNT = <span class="hljs-number">5000</span>  <span class="hljs-comment"># How many questions to embed and insert into Milvus</span>
BATCH_SIZE = <span class="hljs-number">96</span> <span class="hljs-comment"># How large of batches to use for embedding and insertion</span>
MILVUS_HOST = <span class="hljs-string">&#x27;localhost&#x27;</span>  <span class="hljs-comment"># Milvus server URI</span>
MILVUS_PORT = <span class="hljs-string">&#x27;19530&#x27;</span>
COHERE_API_KEY = <span class="hljs-string">&#x27;replace-this-with-the-cohere-api-key&#x27;</span>  <span class="hljs-comment"># API key obtained from Cohere</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per saperne di più sul modello e sul set di dati utilizzati in questa pagina, consultare <a href="https://cohere.ai/">co:here</a> e <a href="https://rajpurkar.github.io/SQuAD-explorer/">SQuAD</a>.</p>
<h2 id="Prepare-the-dataset" class="common-anchor-header">Preparare il set di dati<button data-href="#Prepare-the-dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>In questo esempio, utilizzeremo lo Stanford Question Answering Dataset (SQuAD) come fonte di verità per la risposta alle domande. Questo set di dati è disponibile sotto forma di file JSON e useremo <strong>pandas</strong> per caricarlo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Download the dataset</span>
dataset = pandas.read_json(FILE)

<span class="hljs-comment"># Clean up the dataset by grabbing all the question answer pairs</span>
simplified_records = []
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset[<span class="hljs-string">&#x27;data&#x27;</span>]:
    <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> x[<span class="hljs-string">&#x27;paragraphs&#x27;</span>]:
        <span class="hljs-keyword">for</span> z <span class="hljs-keyword">in</span> y[<span class="hljs-string">&#x27;qas&#x27;</span>]:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(z[<span class="hljs-string">&#x27;answers&#x27;</span>]) != <span class="hljs-number">0</span>:
                simplified_records.append({<span class="hljs-string">&#x27;question&#x27;</span>: z[<span class="hljs-string">&#x27;question&#x27;</span>], <span class="hljs-string">&#x27;answer&#x27;</span>: z[<span class="hljs-string">&#x27;answers&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;text&#x27;</span>]})

<span class="hljs-comment"># Grab the amount of records based on COUNT</span>
simplified_records = pandas.DataFrame.from_records(simplified_records)
simplified_records = simplified_records.sample(n=<span class="hljs-built_in">min</span>(COUNT, <span class="hljs-built_in">len</span>(simplified_records)), random_state = <span class="hljs-number">42</span>)

<span class="hljs-comment"># Check the length of the cleaned dataset matches count</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(simplified_records))
<button class="copy-code-btn"></button></code></pre>
<p>L'output dovrebbe essere il numero di record presenti nel dataset.</p>
<pre><code translate="no" class="language-shell">5000
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">Creare una raccolta<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione si occupa di Milvus e dell'impostazione del database per questo caso d'uso. All'interno di Milvus, dobbiamo creare una collezione e indicizzarla.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus Database</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)

<span class="hljs-comment"># Remove collection if it already exists</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;original_question&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;answer&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;original_question_embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)

<span class="hljs-comment"># Create an IVF_FLAT index for collection.</span>
index_params = {
    <span class="hljs-string">&#x27;metric_type&#x27;</span>:<span class="hljs-string">&#x27;IP&#x27;</span>,
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>:{<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;original_question_embedding&quot;</span>, index_params=index_params)
collection.load()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Inserire i dati<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta impostata la raccolta, dobbiamo iniziare a inserire i dati. Questo avviene in tre fasi</p>
<ul>
<li>lettura dei dati</li>
<li>incorporare le domande originali e</li>
<li>inserire i dati nella raccolta appena creata su Milvus.</li>
</ul>
<p>In questo esempio, i dati comprendono la domanda originale, l'incorporamento della domanda originale e la risposta alla domanda originale.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up a co:here client.</span>
cohere_client = cohere.Client(COHERE_API_KEY)

<span class="hljs-comment"># Extract embeddings from questions using Cohere</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">texts, input_type</span>):
    res = cohere_client.embed(texts, model=<span class="hljs-string">&#x27;embed-multilingual-v3.0&#x27;</span>, input_type=input_type)
    <span class="hljs-keyword">return</span> res.embeddings

<span class="hljs-comment"># Insert each question, answer, and qustion embedding</span>
total = pandas.DataFrame()
<span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(np.array_split(simplified_records, (COUNT/BATCH_SIZE) + <span class="hljs-number">1</span>)):
    questions = batch[<span class="hljs-string">&#x27;question&#x27;</span>].tolist()
    embeddings = embed(questions, <span class="hljs-string">&quot;search_document&quot;</span>)
    
    data = [
        {
            <span class="hljs-string">&#x27;original_question&#x27;</span>: x,
            <span class="hljs-string">&#x27;answer&#x27;</span>: batch[<span class="hljs-string">&#x27;answer&#x27;</span>].tolist()[i],
            <span class="hljs-string">&#x27;original_question_embedding&#x27;</span>: embeddings[i]
        } <span class="hljs-keyword">for</span> i, x <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(questions)
    ]

    collection.insert(data=data)

time.sleep(<span class="hljs-number">10</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Ask-questions" class="common-anchor-header">Chiedere le domande<button data-href="#Ask-questions" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che tutti i dati sono stati inseriti nella raccolta Milvus, possiamo porre domande al sistema prendendo la nostra frase di domanda, incorporandola con Cohere e cercando nella raccolta.</p>
<div class="alert note">
<p>Le ricerche eseguite sui dati subito dopo l'inserimento potrebbero essere un po' più lente, poiché la ricerca dei dati non indicizzati viene eseguita in modo brutale. Una volta che i nuovi dati sono indicizzati automaticamente, le ricerche saranno più veloci.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search the cluster for an answer to a question text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">text, top_k = <span class="hljs-number">5</span></span>):

    <span class="hljs-comment"># AUTOINDEX does not require any search params </span>
    search_params = {}

    results = collection.search(
        data = embed([text], <span class="hljs-string">&quot;search_query&quot;</span>),  <span class="hljs-comment"># Embeded the question</span>
        anns_field=<span class="hljs-string">&#x27;original_question_embedding&#x27;</span>,
        param=search_params,
        limit = top_k,  <span class="hljs-comment"># Limit to top_k results per search</span>
        output_fields=[<span class="hljs-string">&#x27;original_question&#x27;</span>, <span class="hljs-string">&#x27;answer&#x27;</span>]  <span class="hljs-comment"># Include the original question and answer in the result</span>
    )

    distances = results[<span class="hljs-number">0</span>].distances
    entities = [ x.entity.to_dict()[<span class="hljs-string">&#x27;entity&#x27;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>] ]

    ret = [ {
        <span class="hljs-string">&quot;answer&quot;</span>: x[<span class="hljs-number">1</span>][<span class="hljs-string">&quot;answer&quot;</span>],
        <span class="hljs-string">&quot;distance&quot;</span>: x[<span class="hljs-number">0</span>],
        <span class="hljs-string">&quot;original_question&quot;</span>: x[<span class="hljs-number">1</span>][<span class="hljs-string">&#x27;original_question&#x27;</span>]
    } <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(distances, entities)]

    <span class="hljs-keyword">return</span> ret

<span class="hljs-comment"># Ask these questions</span>
search_questions = [<span class="hljs-string">&#x27;What kills bacteria?&#x27;</span>, <span class="hljs-string">&#x27;What\&#x27;s the biggest dog?&#x27;</span>]

<span class="hljs-comment"># Print out the results in order of [answer, similarity score, original question]</span>

ret = [ { <span class="hljs-string">&quot;question&quot;</span>: x, <span class="hljs-string">&quot;candidates&quot;</span>: search(x) } <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_questions ]
<button class="copy-code-btn"></button></code></pre>
<p>L'output dovrebbe essere simile al seguente:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># [</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;question&quot;</span>: <span class="hljs-string">&quot;What kills bacteria?&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;candidates&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;farming&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.6261022090911865,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;What makes bacteria resistant to antibiotic treatment?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;Phage therapy&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.6093736886978149,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;What has been talked about to treat resistant bacteria?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;oral contraceptives&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5902313590049744,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;In therapy, what does the antibacterial interact with?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;slowing down the multiplication of bacteria or killing the bacteria&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5874154567718506,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;How do antibiotics work?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;in intensive farming to promote animal growth&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5667208433151245,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;Besides in treating human disease where else are antibiotics used?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        ]</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;question&quot;</span>: <span class="hljs-string">&quot;What&#x27;s the biggest dog?&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;candidates&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;English Mastiff&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.7875324487686157,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;What breed was the largest dog known to have lived?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;forest elephants&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5886962413787842,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;What large animals reside in the national park?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;Rico&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5634892582893372,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;What is the name of the dog that could ID over 200 things?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;Iditarod Trail Sled Dog Race&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.546872615814209,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;Which dog-sled race in Alaska is the most famous?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;part of the family&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;distance&quot;</span>: 0.5387814044952393,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;original_question&quot;</span>: <span class="hljs-string">&quot;Most people today describe their dogs as what?&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        ]</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">]</span>

<button class="copy-code-btn"></button></code></pre>
