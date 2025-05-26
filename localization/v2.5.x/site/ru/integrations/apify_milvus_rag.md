---
id: apify_milvus_rag.md
summary: >-
  В этом руководстве рассказывается о том, как просматривать веб-сайты с помощью
  Apify's Website Content Crawler и сохранять данные в векторной базе
  Milvus/Zilliz, чтобы впоследствии использовать их для ответов на вопросы.
title: >-
  Генерация с дополненным извлечением: Создание веб-сайтов с помощью Apify и
  сохранение данных в Milvus для ответов на вопросы
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Генерация с дополненным извлечением: Создание веб-сайтов с помощью Apify и сохранение данных в Milvus для ответов на вопросы<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
<p>В этом руководстве рассказывается о том, как с помощью Apify's Website Content Crawler просматривать веб-сайты и сохранять данные в векторной базе Milvus/Zilliz, чтобы затем использовать их для ответов на вопросы.</p>
<p><a href="https://apify.com/">Apify</a> - это платформа для веб-скреппинга и извлечения данных, которая предлагает рынок приложений с более чем двумя тысячами готовых облачных инструментов, известных как Actors. Эти инструменты идеально подходят для таких случаев, как извлечение структурированных данных с сайтов электронной коммерции, социальных сетей, поисковых систем, онлайн-карт и т. д.</p>
<p>Например, инструмент <a href="https://apify.com/apify/website-content-crawler">Website Content Crawler</a> Actor может глубоко просмотреть веб-сайты, очистить их HTML, удалив модальные окна cookie, нижний колонтитул или навигацию, а затем преобразовать HTML в Markdown.</p>
<p>Интеграция Apify для Milvus/Zilliz позволяет легко загружать данные из Интернета в векторную базу данных.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Прежде чем приступить к работе с этим блокнотом, убедитесь, что у вас есть следующее:</p>
<ul>
<li><p>учетная запись Apify и <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>учетная запись OpenAI и <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a>.</p></li>
<li><p><a href="https://cloud.zilliz.com">Учетная запись Zilliz Cloud</a> (полностью управляемый облачный сервис для Milvus).</p></li>
<li><p>URI базы данных Zilliz и токен</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Установите зависимости<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Настройка ключей Apify и Open API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Настройка URI, токена и имени коллекции Milvus/Zilliz<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Для настройки клиента вам понадобятся URI и токен вашего Milvus/Zilliz.</p>
<ul>
<li>Если вы самостоятельно развернули сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>, используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "<your_username>:<your_password>" в качестве токена, в противном случае оставьте токен пустой строкой.</li>
<li>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
</ul>
<p>Обратите внимание, что коллекция не обязательно должна существовать заранее. Она будет создана автоматически при загрузке данных в базу.</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

MILVUS_COLLECTION_NAME = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Использование Website Content Crawler для сканирования текстового контента с Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>Далее мы будем использовать Website Content Crawler с Apify Python SDK. Начнем с определения actor_id и run_input, а затем укажем информацию, которая будет сохранена в векторной базе данных.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> - это идентификатор для Website Content Crawler. Поведение краулера можно полностью контролировать с помощью параметров run_input (подробнее см. на <a href="https://apify.com/apify/website-content-crawler/input-schema">странице ввода</a> ). В этом примере мы будем просматривать документацию Milvus, которая не требует отрисовки JavaScript. Поэтому мы зададим <code translate="no">crawlerType=cheerio</code>, определим <code translate="no">startUrls</code> и ограничим количество просматриваемых страниц, задав <code translate="no">maxCrawlPages=10</code>.</p>
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
<p>Website Content Crawler будет тщательно просматривать сайт, пока не достигнет заданного предела, установленного в <code translate="no">maxCrawlPages</code>. Собранные данные будут храниться в <code translate="no">Dataset</code> на платформе Apify. Чтобы получить доступ к этим данным и проанализировать их, вы можете воспользоваться функцией <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>Следующий код получает данные из Apify <code translate="no">Dataset</code> и отображает первый отсканированный сайт.</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(limit=<span class="hljs-number">1</span>).items
item[<span class="hljs-number">0</span>].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Для загрузки данных в базу Milvus мы используем <a href="https://apify.com/apify/milvus-integration">интеграцию Apify Milvus</a>. Сначала нам нужно настроить параметры для базы данных Milvus. Затем мы выбираем поля (<code translate="no">datasetFields</code>), которые хотим сохранить в базе данных. В примере ниже мы сохраняем поле <code translate="no">text</code> и <code translate="no">metadata.title</code>.</p>
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
<p>Теперь вызовем <code translate="no">apify/milvus-integration</code> для сохранения данных.</p>
<pre><code translate="no" class="language-python">actor_call = client.actor(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).call(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Теперь все отсканированные данные хранятся в базе данных Milvus и готовы к поиску и ответам на вопросы.</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Поиск и генеративный конвейер LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Далее мы определим конвейер, дополняющий поиск, используя Langchain. Конвейер работает в два этапа:</p>
<ul>
<li>Векторное хранилище (Milvus): Langchain извлекает релевантные документы из Milvus, сопоставляя вкрапления запроса с вкраплениями хранимых документов.</li>
<li>Ответ LLM: Полученные документы обеспечивают контекст для LLM (например, GPT-4), чтобы сгенерировать обоснованный ответ.</li>
</ul>
<p>Более подробную информацию о цепочке RAG можно найти в <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">документации Langchain</a>.</p>
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
<p>Как только мы получили данные в базе данных, мы можем начать задавать вопросы.</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.invoke(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве мы продемонстрировали, как с помощью Apify можно просматривать содержимое веб-сайтов, хранить данные в векторной базе данных Milvus и использовать конвейер с расширенным поиском для выполнения задач, связанных с ответами на вопросы. Комбинируя возможности Apify по скраппингу веб-сайтов с Milvus/Zilliz для хранения векторов и Langchain для языковых моделей, вы можете создавать высокоэффективные информационно-поисковые системы.</p>
<p>Для улучшения сбора и обновления данных в базе интеграция с Apify предлагает <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">инкрементное обновление</a>, при котором обновляются только новые или измененные данные на основе контрольных сумм. Кроме того, она может автоматически <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">удалять устаревшие</a> данные, которые не были просмотрены в течение определенного времени. Эти функции помогают оптимизировать базу данных векторов и обеспечивают эффективность и актуальность конвейера с расширенным поиском при минимальных затратах ручного труда.</p>
<p>Для получения более подробной информации об интеграции Apify-Milvus обратитесь к <a href="https://docs.apify.com/platform/integrations/milvus">документации Apify Milvus</a> и <a href="https://apify.com/apify/milvus-integration">файлу README интеграции</a>.</p>
