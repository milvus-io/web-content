---
id: apify_milvus_rag.md
summary: >-
  Questa esercitazione spiega come effettuare il crawling di siti web
  utilizzando Website Content Crawler di Apify e salvare i dati nel database
  vettoriale Milvus/Zilliz per utilizzarli successivamente per la risposta alle
  domande.
title: >-
  Generazione aumentata di recupero: Crawling di siti web con Apify e
  salvataggio dei dati in Milvus per la risposta alle domande
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Generazione aumentata di recupero: Crawling di siti web con Apify e salvataggio dei dati in Milvus per la risposta alle domande<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/apify_milvus_rag.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>Questa esercitazione spiega come effettuare il crawling di siti web utilizzando Website Content Crawler di Apify e salvare i dati nel database vettoriale Milvus/Zilliz per utilizzarli successivamente per rispondere alle domande.</p>
<p><a href="https://apify.com/">Apify</a> è una piattaforma di scraping e di estrazione di dati dal web che offre un mercato di app con oltre duemila strumenti cloud già pronti, noti come Attori. Questi strumenti sono ideali per casi d'uso come l'estrazione di dati strutturati da siti web di e-commerce, social media, motori di ricerca, mappe online e altro ancora.</p>
<p>Ad esempio, l'Attore <a href="https://apify.com/apify/website-content-crawler">Website Content Crawler</a> è in grado di effettuare una scansione profonda dei siti web, di ripulire il loro HTML rimuovendo i cookie modali, il piè di pagina o la navigazione e di trasformare l'HTML in Markdown.</p>
<p>L'integrazione Apify per Milvus/Zilliz semplifica il caricamento dei dati dal web al database vettoriale.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Prima di eseguire questo quaderno, assicuratevi di disporre di quanto segue:</p>
<ul>
<li><p>un account Apify e <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>un account OpenAI e <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p>un <a href="https://cloud.zilliz.com">account Zilliz Cloud</a> (un servizio cloud completamente gestito per Milvus).</p></li>
<li><p>L'URI e il Token del database Zilliz.</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Installare le dipendenze<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">$ pip install --upgrade --quiet  apify==1.7.2 langchain-core==0.3.5 langchain-milvus==0.1.5 langchain-openai==0.2.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Impostare le chiavi Apify e Open API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> getpass <span class="hljs-keyword">import</span> getpass

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR APIFY_API_TOKEN&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR OPENAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR APIFY_API_TOKEN··········
Enter YOUR OPENAI_API_KEY··········
</code></pre>
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Impostazione dell'URI, del token e del nome della raccolta di Milvus/Zilliz<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Per configurare il client sono necessari l'URI e il Token di Milvus/Zilliz.</p>
<ul>
<li>Se si dispone di un server Milvus distribuito autonomamente su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>, utilizzare l'indirizzo e la porta del server come URI, ad esempio<code translate="no">http://localhost:19530</code>. Se si abilita la funzione di autenticazione su Milvus, utilizzare "&lt;nome_utente&gt;:&lt;password&gt;" come token, altrimenti lasciare il token come stringa vuota.</li>
<li>Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">endpoint pubblico e alla chiave API</a> di Zilliz Cloud.</li>
</ul>
<p>Si noti che non è necessario che la raccolta esista in anticipo. Verrà creata automaticamente quando i dati verranno caricati nel database.</p>
<pre><code translate="no" class="language-python">os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

<span class="hljs-variable constant_">MILVUS_COLLECTION_NAME</span> = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Utilizzo di Website Content Crawler per raschiare i contenuti testuali da Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzeremo poi Website Content Crawler con l'SDK Apify Python. Inizieremo definendo l'actor_id e il run_input, quindi specificheremo le informazioni che saranno salvate nel database vettoriale.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> è l'identificatore di Website Content Crawler. Il comportamento del crawler può essere controllato completamente tramite i parametri run_input (vedere la <a href="https://apify.com/apify/website-content-crawler/input-schema">pagina</a> degli <a href="https://apify.com/apify/website-content-crawler/input-schema">input</a> per maggiori dettagli). In questo esempio, verrà effettuata la scansione della documentazione di Milvus, che non richiede il rendering in JavaScript. Per questo motivo, si imposta <code translate="no">crawlerType=cheerio</code>, si definisce <code translate="no">startUrls</code> e si limita il numero di pagine strisciate impostando <code translate="no">maxCrawlPages=10</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> apify_client <span class="hljs-keyword">import</span> <span class="hljs-title class_">ApifyClient</span>

client = <span class="hljs-title class_">ApifyClient</span>(os.<span class="hljs-title function_">getenv</span>(<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>))

actor_id = <span class="hljs-string">&quot;apify/website-content-crawler&quot;</span>
run_input = {
    <span class="hljs-string">&quot;crawlerType&quot;</span>: <span class="hljs-string">&quot;cheerio&quot;</span>,
    <span class="hljs-string">&quot;maxCrawlPages&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;startUrls&quot;</span>: [{<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://milvus.io/&quot;</span>}, {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://zilliz.com/&quot;</span>}],
}

actor_call = client.<span class="hljs-title function_">actor</span>(actor_id).<span class="hljs-title function_">call</span>(run_input=run_input)
<button class="copy-code-btn"></button></code></pre>
<p>Il Website Content Crawler effettuerà una scansione completa del sito fino a raggiungere il limite predefinito impostato da <code translate="no">maxCrawlPages</code>. I dati raccolti saranno archiviati in <code translate="no">Dataset</code> sulla piattaforma Apify. Per accedere a questi dati e analizzarli, è possibile utilizzare il codice <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>Il codice seguente recupera i dati di scraping da Apify <code translate="no">Dataset</code> e visualizza il primo sito web scraped</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(<span class="hljs-built_in">limit</span>=1).items
item[0].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Per caricare i dati nel database Milvus, utilizziamo l'<a href="https://apify.com/apify/milvus-integration">integrazione Apify Milvus</a>. Per prima cosa, dobbiamo impostare i parametri per il database Milvus. Quindi, si selezionano i campi (<code translate="no">datasetFields</code>) che si desidera memorizzare nel database. Nell'esempio seguente, salviamo il campo <code translate="no">text</code> e <code translate="no">metadata.title</code>.</p>
<pre><code translate="no" class="language-python">milvus_integration_inputs = {
    <span class="hljs-string">&quot;milvusUri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
    <span class="hljs-string">&quot;milvusToken&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    <span class="hljs-string">&quot;milvusCollectionName&quot;</span>: MILVUS_COLLECTION_NAME,
    <span class="hljs-string">&quot;datasetFields&quot;</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;metadata.title&quot;</span>],
    <span class="hljs-string">&quot;datasetId&quot;</span>: actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>],
    <span class="hljs-string">&quot;performChunking&quot;</span>: <span class="hljs-literal">True</span>,
    <span class="hljs-string">&quot;embeddingsApiKey&quot;</span>: os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    <span class="hljs-string">&quot;embeddingsProvider&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Ora chiamiamo <code translate="no">apify/milvus-integration</code> per memorizzare i dati.</p>
<pre><code translate="no" class="language-python">actor_call = client.<span class="hljs-title function_">actor</span>(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).<span class="hljs-title function_">call</span>(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Tutti i dati raccolti sono ora memorizzati nel database Milvus e sono pronti per essere recuperati e rispondere alle domande.</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Recupero e pipeline generativa LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Successivamente, definiremo la pipeline di recupero e di arricchimento utilizzando Langchain. La pipeline funziona in due fasi:</p>
<ul>
<li>Vectorstore (Milvus): Langchain recupera i documenti rilevanti da Milvus facendo corrispondere gli embedding della query con gli embedding dei documenti memorizzati.</li>
<li>Risposta LLM: I documenti recuperati forniscono un contesto al LLM (ad esempio, GPT-4) per generare una risposta informata.</li>
</ul>
<p>Per maggiori dettagli sulla catena RAG, consultare la <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">documentazione di Langchain</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_milvus.vectorstores <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI, OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

vectorstore = Milvus(
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
        <span class="hljs-string">&quot;token&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    },
    embedding_function=embeddings,
    collection_name=MILVUS_COLLECTION_NAME,
)

prompt = PromptTemplate(
    input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>],
    template=<span class="hljs-string">&quot;Use the following pieces of retrieved context to answer the question. If you don&#x27;t know the answer, &quot;</span>
    <span class="hljs-string">&quot;just say that you don&#x27;t know. \nQuestion: {question} \nContext: {context} \nAnswer:&quot;</span>,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)


rag_chain = (
    {
        <span class="hljs-string">&quot;context&quot;</span>: vectorstore.as_retriever() | format_docs,
        <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough(),
    }
    | prompt
    | ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>)
    | StrOutputParser()
)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che abbiamo i dati nel database, possiamo iniziare a fare domande.</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.<span class="hljs-title function_">invoke</span>(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa esercitazione abbiamo dimostrato come effettuare il crawling dei contenuti di un sito web con Apify, memorizzare i dati in un database vettoriale Milvus e utilizzare una pipeline di retrieval-augmented per eseguire operazioni di risposta alle domande. Combinando le capacità di web scraping di Apify con Milvus/Zilliz per l'archiviazione vettoriale e Langchain per i modelli linguistici, è possibile costruire sistemi di recupero delle informazioni estremamente efficaci.</p>
<p>Per migliorare la raccolta e l'aggiornamento dei dati nel database, l'integrazione di Apify offre <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">aggiornamenti incrementali</a>, che aggiornano solo i dati nuovi o modificati in base alle checksum. Inoltre, può <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">rimuovere</a> automaticamente i dati <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">obsoleti</a> che non sono stati sottoposti a crawling entro un determinato periodo di tempo. Queste funzioni contribuiscono a mantenere ottimizzato il database dei vettori e a garantire che la pipeline di recupero sia efficiente e aggiornata con il minimo sforzo manuale.</p>
<p>Per ulteriori dettagli sull'integrazione Apify-Milvus, consultare la <a href="https://docs.apify.com/platform/integrations/milvus">documentazione di Apify Milvus</a> e il <a href="https://apify.com/apify/milvus-integration">file README</a> dell'<a href="https://apify.com/apify/milvus-integration">integrazione</a>.</p>
