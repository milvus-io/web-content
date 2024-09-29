---
id: apify_milvus_rag.md
summary: >-
  Dieses Tutorial erklärt, wie man mit Apify's Website Content Crawler Webseiten
  crawlt und die Daten in der Milvus/Zilliz Vektor-Datenbank speichert, um sie
  später zur Beantwortung von Fragen zu verwenden.
title: >-
  Retrieval-erweiterte Generierung: Crawlen von Websites mit Apify und Speichern
  der Daten in Milvus zur Beantwortung von Fragen
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Retrieval-erweiterte Generierung: Crawlen von Websites mit Apify und Speichern der Daten in Milvus zur Beantwortung von Fragen<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
<p>In diesem Tutorial wird erklärt, wie man Websites mit dem Website Content Crawler von Apify crawlt und die Daten in der Vektordatenbank Milvus/Zilliz speichert, um sie später zur Beantwortung von Fragen zu verwenden.</p>
<p><a href="https://apify.com/">Apify</a> ist eine Plattform für Web-Scraping und Datenextraktion, die einen App-Marktplatz mit über zweitausend vorgefertigten Cloud-Tools, den so genannten Actors, bietet. Diese Tools sind ideal für Anwendungsfälle wie die Extraktion strukturierter Daten aus E-Commerce-Websites, sozialen Medien, Suchmaschinen, Online-Karten und mehr.</p>
<p>Der <a href="https://apify.com/apify/website-content-crawler">Website Content Crawler</a> Actor kann beispielsweise Websites tiefgehend crawlen, ihr HTML bereinigen, indem er ein Cookie-Modal, eine Fußzeile oder die Navigation entfernt, und dann das HTML in Markdown umwandeln.</p>
<p>Die Apify-Integration für Milvus/Zilliz macht es einfach, Daten aus dem Web in die Vektordatenbank hochzuladen.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Bevor Sie dieses Notebook ausführen, stellen Sie sicher, dass Sie Folgendes haben:</p>
<ul>
<li><p>ein Apify-Konto und <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>ein OpenAI-Konto und den <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p>Ein <a href="https://cloud.zilliz.com">Zilliz Cloud-Konto</a> (ein vollständig verwalteter Cloud-Service für Milvus).</p></li>
<li><p>Die Zilliz-Datenbank URI und Token</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Abhängigkeiten installieren<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Apify und Open API Schlüssel einrichten<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Einrichten von Milvus/Zilliz URI, Token und Sammlungsname<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie benötigen die URI und das Token Ihres Milvus/Zilliz, um den Client einzurichten.</p>
<ul>
<li>Wenn Sie den Milvus-Server selbst auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> installiert haben, verwenden Sie die Serveradresse und den Port als URI, z. B.<code translate="no">http://localhost:19530</code>. Wenn Sie die Authentifizierungsfunktion auf Milvus aktivieren, verwenden Sie "&lt;Ihr_Benutzername&gt;:&lt;Ihr_Passwort&gt;" als Token, andernfalls lassen Sie das Token als leere Zeichenfolge.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Dienst für Milvus, verwenden, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul>
<p>Beachten Sie, dass die Sammlung nicht vorher existieren muss. Sie wird automatisch erstellt, wenn die Daten in die Datenbank hochgeladen werden.</p>
<pre><code translate="no" class="language-python">os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

<span class="hljs-variable constant_">MILVUS_COLLECTION_NAME</span> = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Verwendung des Website Content Crawlers zum Scrapen von Textinhalten von Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>Als nächstes werden wir den Website Content Crawler mit dem Apify Python SDK verwenden. Wir beginnen mit der Definition von actor_id und run_input und geben dann die Informationen an, die in der Vektordatenbank gespeichert werden sollen.</p>
<p>Die <code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> ist der Bezeichner für den Website Content Crawler. Das Verhalten des Crawlers kann vollständig über die run_input-Parameter gesteuert werden (weitere Einzelheiten finden Sie auf der <a href="https://apify.com/apify/website-content-crawler/input-schema">Input-Seite</a> ). In diesem Beispiel wird die Milvus-Dokumentation gecrawlt, für die kein JavaScript-Rendering erforderlich ist. Daher setzen wir <code translate="no">crawlerType=cheerio</code>, definieren <code translate="no">startUrls</code>, und begrenzen die Anzahl der gecrawlten Seiten durch die Einstellung <code translate="no">maxCrawlPages=10</code>.</p>
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
<p>Der Website Content Crawler wird die Website gründlich crawlen, bis er die vordefinierte Grenze erreicht, die durch <code translate="no">maxCrawlPages</code> festgelegt wurde. Die gecrawlten Daten werden in einem <code translate="no">Dataset</code> auf der Apify-Plattform gespeichert. Um auf diese Daten zuzugreifen und sie zu analysieren, können Sie den <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>Der folgende Code holt die gescrapten Daten von der Apify-Plattform <code translate="no">Dataset</code> und zeigt die erste gescrapte Website an</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(<span class="hljs-built_in">limit</span>=1).items
item[0].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Um Daten in die Milvus-Datenbank hochzuladen, verwenden wir die <a href="https://apify.com/apify/milvus-integration">Apify Milvus-Integration</a>. Zunächst müssen wir die Parameter für die Milvus-Datenbank einrichten. Anschließend wählen wir die Felder (<code translate="no">datasetFields</code>) aus, die wir in der Datenbank speichern möchten. Im folgenden Beispiel speichern wir das Feld <code translate="no">text</code> und <code translate="no">metadata.title</code>.</p>
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
<p>Nun rufen wir die <code translate="no">apify/milvus-integration</code> auf, um die Daten zu speichern.</p>
<pre><code translate="no" class="language-python">actor_call = client.<span class="hljs-title function_">actor</span>(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).<span class="hljs-title function_">call</span>(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Alle gescrapten Daten sind nun in der Milvus-Datenbank gespeichert und stehen zum Abruf und zur Beantwortung von Fragen bereit</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Abfrage und generative LLM-Pipeline<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Als Nächstes definieren wir die Pipeline für die Datenabfrage mit Hilfe von Langchain. Die Pipeline arbeitet in zwei Stufen:</p>
<ul>
<li>Vectorstore (Milvus): Langchain ruft relevante Dokumente aus Milvus ab, indem es die Einbettungen der Anfrage mit den gespeicherten Dokumenteneinbettungen abgleicht.</li>
<li>LLM-Antwort: Die abgerufenen Dokumente liefern den Kontext für den LLM (z. B. GPT-4), um eine fundierte Antwort zu generieren.</li>
</ul>
<p>Weitere Einzelheiten über die RAG-Kette finden Sie in der <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">Langchain-Dokumentation</a>.</p>
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
<p>Sobald wir die Daten in der Datenbank haben, können wir anfangen, Fragen zu stellen</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.<span class="hljs-title function_">invoke</span>(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Tutorial haben wir gezeigt, wie man Website-Inhalte mit Apify crawlt, die Daten in einer Milvus-Vektor-Datenbank speichert und eine Retrieval-erweiterte Pipeline zur Durchführung von Frage-Antwort-Aufgaben verwendet. Durch die Kombination der Web-Scraping-Fähigkeiten von Apify mit Milvus/Zilliz für die Vektorspeicherung und Langchain für Sprachmodelle können Sie hocheffektive Information-Retrieval-Systeme aufbauen.</p>
<p>Um die Datenerfassung und -aktualisierung in der Datenbank zu verbessern, bietet die Apify-Integration <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">inkrementelle Updates</a>, bei denen nur neue oder geänderte Daten auf Basis von Prüfsummen aktualisiert werden. Außerdem können <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">veraltete</a> Daten, die nicht innerhalb eines bestimmten Zeitraums gecrawlt wurden, automatisch <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">entfernt werden</a>. Diese Funktionen tragen dazu bei, Ihre Vektordatenbank zu optimieren und sicherzustellen, dass Ihre Retrieval-erweiterte Pipeline mit minimalem manuellen Aufwand effizient und aktuell bleibt.</p>
<p>Weitere Details zur Apify-Milvus-Integration finden Sie in der <a href="https://docs.apify.com/platform/integrations/milvus">Apify-Milvus-Dokumentation</a> und in der <a href="https://apify.com/apify/milvus-integration">README-Datei zur Integration</a>.</p>
