---
id: apify_milvus_rag.md
summary: >-
  Este tutorial explica cómo rastrear sitios web utilizando el rastreador de
  contenido de sitios web de Apify y guardar los datos en la base de datos
  vectorial Milvus/Zilliz para utilizarlos posteriormente para responder
  preguntas.
title: >-
  Retrieval-Augmented Generation: Rastrear sitios web con Apify y guardar datos
  en Milvus para responder preguntas
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Retrieval-Augmented Generation: Rastrear sitios web con Apify y guardar datos en Milvus para responder preguntas<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/apify_milvus_rag.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>Este tutorial explica cómo rastrear sitios web utilizando el Website Content Crawler de Apify y guardar los datos en la base de datos vectorial Milvus/Zilliz para utilizarlos posteriormente en la respuesta a preguntas.</p>
<p><a href="https://apify.com/">Apify</a> es una plataforma de web scraping y extracción de datos que ofrece un mercado de aplicaciones con más de dos mil herramientas en la nube listas para usar, conocidas como Actores. Estas herramientas son ideales para casos de uso como la extracción de datos estructurados de sitios web de comercio electrónico, redes sociales, motores de búsqueda, mapas en línea, etc.</p>
<p>Por ejemplo, el actor <a href="https://apify.com/apify/website-content-crawler">Website Content Crawler</a> puede rastrear sitios web en profundidad, limpiar su HTML eliminando un modal de cookies, el pie de página o la navegación y, a continuación, transformar el HTML en Markdown.</p>
<p>La integración de Apify para Milvus/Zilliz facilita la carga de datos desde la web a la base de datos vectorial.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Antes de ejecutar este cuaderno, asegúrate de que tienes lo siguiente</p>
<ul>
<li><p>una cuenta Apify y <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>una cuenta OpenAI y <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p>Una <a href="https://cloud.zilliz.com">cuenta de Zilliz Cloud</a> (un servicio en la nube totalmente gestionado para Milvus).</p></li>
<li><p>El URI y el Token de la base de datos de Zilliz</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Instalar dependencias<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">$ pip install --upgrade --quiet  apify==<span class="hljs-number">1.7</span><span class="hljs-number">.2</span> langchain-core==<span class="hljs-number">0.3</span><span class="hljs-number">.5</span> langchain-milvus==<span class="hljs-number">0.1</span><span class="hljs-number">.5</span> langchain-openai==<span class="hljs-number">0.2</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Configurar las claves Apify y Open API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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

os.environ[<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR APIFY_API_TOKEN&quot;</span>)
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR OPENAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR APIFY_API_TOKEN··········
Enter YOUR OPENAI_API_KEY··········
</code></pre>
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Configurar el URI de Milvus/Zilliz, el token y el nombre de la colección<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Necesitas el URI y el Token de tu Milvus/Zilliz para configurar el cliente.</p>
<ul>
<li>Si tiene un servidor Milvus autodesplegado en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>, utilice la dirección del servidor y el puerto como su uri, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, utilice "<your_username>:<your_password>" como token, de lo contrario deje el token como cadena vacía.</li>
<li>Si utiliza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">punto final público y a la clave API</a> en Zilliz Cloud.</li>
</ul>
<p>Tenga en cuenta que no es necesario que la colección exista de antemano. Se creará automáticamente cuando los datos se carguen en la base de datos.</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

MILVUS_COLLECTION_NAME = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Uso de Website Content Crawler para extraer contenido de texto de Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación, utilizaremos el Website Content Crawler con el Apify Python SDK. Comenzaremos definiendo el actor_id y run_input, y luego especificaremos la información que se guardará en la base de datos vectorial.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> es el identificador del rastreador de contenido web. El comportamiento del rastreador puede controlarse completamente mediante los parámetros run_input (consulte la <a href="https://apify.com/apify/website-content-crawler/input-schema">página input</a> para obtener más detalles). En este ejemplo, rastrearemos la documentación de Milvus, que no requiere la renderización de JavaScript. Por lo tanto, configuramos <code translate="no">crawlerType=cheerio</code>, definimos <code translate="no">startUrls</code>, y limitamos el número de páginas rastreadas configurando <code translate="no">maxCrawlPages=10</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> apify_client <span class="hljs-keyword">import</span> ApifyClient

client = ApifyClient(os.getenv(<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>))

actor_id = <span class="hljs-string">&quot;apify/website-content-crawler&quot;</span>
run_input = {
    <span class="hljs-string">&quot;crawlerType&quot;</span>: <span class="hljs-string">&quot;cheerio&quot;</span>,
    <span class="hljs-string">&quot;maxCrawlPages&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;startUrls&quot;</span>: [{<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://milvus.io/&quot;</span>}, {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://zilliz.com/&quot;</span>}],
}

actor_call = client.actor(actor_id).call(run_input=run_input)
<button class="copy-code-btn"></button></code></pre>
<p>El rastreador de contenido del sitio web rastreará minuciosamente el sitio hasta alcanzar el límite predefinido en <code translate="no">maxCrawlPages</code>. Los datos rastreados se almacenarán en <code translate="no">Dataset</code> en la plataforma Apify. Para acceder a estos datos y analizarlos, puede utilizar el código <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>El siguiente código obtiene los datos raspados de Apify <code translate="no">Dataset</code> y muestra el primer sitio web raspado.</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(limit=<span class="hljs-number">1</span>).items
item[<span class="hljs-number">0</span>].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Para cargar los datos en la base de datos Milvus, utilizamos la <a href="https://apify.com/apify/milvus-integration">integración Milvus de Apify</a>. En primer lugar, tenemos que configurar el parámetro para la base de datos Milvus. A continuación, seleccionamos los campos (<code translate="no">datasetFields</code>) que queremos almacenar en la base de datos. En el siguiente ejemplo, estamos guardando el campo <code translate="no">text</code> y <code translate="no">metadata.title</code>.</p>
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
<p>Ahora, llamaremos a <code translate="no">apify/milvus-integration</code> para almacenar los datos.</p>
<pre><code translate="no" class="language-python">actor_call = client.actor(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).call(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Todos los datos raspados están ahora almacenados en la base de datos Milvus y están listos para su recuperación y para responder a las preguntas.</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Recuperación y proceso generativo LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>A continuación, definiremos la canalización de la recuperación mediante Langchain. La cadena funciona en dos etapas:</p>
<ul>
<li>Vectorstore (Milvus): Langchain recupera los documentos relevantes de Milvus comparando las incrustaciones de la consulta con las incrustaciones de los documentos almacenados.</li>
<li>Respuesta LLM: Los documentos recuperados proporcionan contexto para que el LLM (por ejemplo, GPT-4) genere una respuesta fundamentada.</li>
</ul>
<p>Para más detalles sobre la cadena RAG, consulte la <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">documentación de Langchain</a>.</p>
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
<p>Una vez que tenemos los datos en la base de datos, podemos empezar a hacer preguntas</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.invoke(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tutorial, hemos demostrado cómo rastrear el contenido de un sitio web utilizando Apify, almacenar los datos en una base de datos vectorial Milvus y utilizar una cadena de recuperación aumentada para realizar tareas de respuesta a preguntas. Combinando las capacidades de rastreo web de Apify con Milvus/Zilliz para el almacenamiento vectorial y Langchain para los modelos lingüísticos, se pueden construir sistemas de recuperación de información altamente eficaces.</p>
<p>Para mejorar la recopilación de datos y las actualizaciones en la base de datos, la integración de Apify ofrece <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">actualizaciones incrementales</a>, que actualizan sólo los datos nuevos o modificados basándose en sumas de comprobación. Además, puede <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">eliminar</a> automáticamente los datos <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">obsoletos</a> que no se hayan rastreado en un tiempo determinado. Estas funciones ayudan a mantener optimizada su base de datos vectorial y garantizan que su canalización aumentada de recuperación siga siendo eficiente y esté actualizada con un esfuerzo manual mínimo.</p>
<p>Para más detalles sobre la integración <a href="https://docs.apify.com/platform/integrations/milvus">Apify-Milvus</a>, consulte la <a href="https://docs.apify.com/platform/integrations/milvus">documentación de Apify Milvus</a> y el <a href="https://apify.com/apify/milvus-integration">archivo README de integración</a>.</p>
