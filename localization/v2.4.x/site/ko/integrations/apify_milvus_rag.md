---
id: apify_milvus_rag.md
summary: >-
  이 튜토리얼에서는 Apify의 웹사이트 콘텐츠 크롤러를 사용하여 웹사이트를 크롤링하고 나중에 질문 답변에 사용할 수 있도록 데이터를
  Milvus/Zilliz 벡터 데이터베이스에 저장하는 방법을 설명합니다.
title: '검색 증강 세대: Apify로 웹 사이트 크롤링 및 질문 답변을 위해 Milvus에 데이터 저장하기'
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">검색 증강 세대: Apify로 웹 사이트 크롤링 및 질문 답변을 위해 Milvus에 데이터 저장하기<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
<p>이 튜토리얼에서는 Apify의 웹사이트 콘텐츠 크롤러를 사용하여 웹사이트를 크롤링하고 나중에 질문 답변에 사용할 수 있도록 데이터를 Milvus/Zilliz 벡터 데이터베이스에 저장하는 방법에 대해 설명합니다.</p>
<p><a href="https://apify.com/">Apify는</a> 웹 스크래핑 및 데이터 추출 플랫폼으로, 액터라고 하는 2,000개 이상의 기성 클라우드 도구가 포함된 앱 마켓플레이스를 제공합니다. 이러한 도구는 전자상거래 웹사이트, 소셜 미디어, 검색 엔진, 온라인 지도 등에서 구조화된 데이터를 추출하는 등의 사용 사례에 이상적입니다.</p>
<p>예를 들어 <a href="https://apify.com/apify/website-content-crawler">웹사이트 콘텐츠 크롤러</a> 액터는 웹사이트를 심층적으로 크롤링하고 쿠키 모달, 푸터 또는 탐색을 제거하여 HTML을 정리한 다음 HTML을 마크다운으로 변환할 수 있습니다.</p>
<p>밀버스/질리즈용 Apify 통합을 사용하면 웹에서 벡터 데이터베이스로 데이터를 쉽게 업로드할 수 있습니다.</p>
<h1 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>이 노트북을 실행하기 전에 다음이 준비되어 있는지 확인하세요:</p>
<ul>
<li><p>Apify 계정 및 <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>OpenAI 계정 및 <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a></p></li>
<li><p><a href="https://cloud.zilliz.com">질리즈 클라우드 계정</a> (밀버스의 완전 관리형 클라우드 서비스).</p></li>
<li><p>질리즈 데이터베이스 URI 및 토큰</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">설치 종속성<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Apify 및 Open API 키 설정<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">밀버스/질리즈 URI, 토큰 및 컬렉션 이름 설정<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>클라이언트를 설정하려면 Milvus/Zilliz의 URI와 토큰이 필요합니다.</p>
<ul>
<li><a href="https://milvus.io/docs/quickstart.md">도커 또는 쿠버네티스에</a> Milvus 서버를 자체 배포한 경우, 서버 주소와 포트를 URI로 사용합니다(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화한 경우 토큰으로 "&lt;사용자_이름&gt;:&lt;사용자_비밀번호&gt;"를 사용하고, 그렇지 않으면 빈 문자열로 남겨둡니다.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하는 경우, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 및 <code translate="no">token</code> 을 조정합니다.</li>
</ul>
<p>컬렉션이 미리 존재할 필요는 없습니다. 데이터가 데이터베이스에 업로드되면 자동으로 생성됩니다.</p>
<pre><code translate="no" class="language-python">os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = <span class="hljs-title function_">getpass</span>(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

<span class="hljs-variable constant_">MILVUS_COLLECTION_NAME</span> = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">웹사이트 콘텐츠 크롤러를 사용하여 Milvus.io에서 텍스트 콘텐츠 스크랩하기<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>다음으로, 웹사이트 콘텐츠 크롤러를 Apify Python SDK와 함께 사용하겠습니다. 먼저 actor_id와 run_input을 정의한 다음 벡터 데이터베이스에 저장할 정보를 지정합니다.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> 은 웹사이트 콘텐츠 크롤러의 식별자입니다. 크롤러의 동작은 run_input 매개변수를 통해 완전히 제어할 수 있습니다(자세한 내용은 <a href="https://apify.com/apify/website-content-crawler/input-schema">입력 페이지</a> 참조). 이 예에서는 자바스크립트 렌더링이 필요 없는 Milvus 문서를 크롤링하겠습니다. 따라서 <code translate="no">crawlerType=cheerio</code> 을 설정하고 <code translate="no">startUrls</code> 을 정의하며 <code translate="no">maxCrawlPages=10</code> 을 설정하여 크롤링되는 페이지 수를 제한합니다.</p>
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
<p>웹사이트 콘텐츠 크롤러는 <code translate="no">maxCrawlPages</code> 에 설정된 사전 정의된 제한에 도달할 때까지 사이트를 철저히 크롤링합니다. 스크랩된 데이터는 Apify 플랫폼의 <code translate="no">Dataset</code> 에 저장됩니다. 이 데이터에 액세스하고 분석하려면 다음을 사용할 수 있습니다. <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>다음 코드는 Apify <code translate="no">Dataset</code> 에서 스크랩된 데이터를 가져와 첫 번째 스크랩된 웹사이트를 표시합니다.</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(<span class="hljs-built_in">limit</span>=1).items
item[0].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Milvus 데이터베이스에 데이터를 업로드하기 위해 <a href="https://apify.com/apify/milvus-integration">Apify Milvus 통합을</a> 사용합니다. 먼저 Milvus 데이터베이스에 대한 파라미터를 설정해야 합니다. 다음으로 데이터베이스에 저장할 필드(<code translate="no">datasetFields</code>)를 선택합니다. 아래 예에서는 <code translate="no">text</code> 필드와 <code translate="no">metadata.title</code> 을 저장하고 있습니다.</p>
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
<p>이제 <code translate="no">apify/milvus-integration</code> 을 호출하여 데이터를 저장합니다.</p>
<pre><code translate="no" class="language-python">actor_call = client.<span class="hljs-title function_">actor</span>(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).<span class="hljs-title function_">call</span>(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>이제 모든 스크랩된 데이터가 Milvus 데이터베이스에 저장되어 검색 및 질문에 답변할 준비가 되었습니다.</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">검색 및 LLM 생성 파이프라인<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>다음으로, Langchain을 사용하여 검색 증강 파이프라인을 정의하겠습니다. 파이프라인은 두 단계로 작동합니다:</p>
<ul>
<li>벡터스토어(Milvus): Langchain은 쿼리 임베딩과 저장된 문서 임베딩을 일치시켜 Milvus에서 관련 문서를 검색합니다.</li>
<li>LLM 응답: 검색된 문서는 LLM(예: GPT-4)이 정보에 입각한 답변을 생성할 수 있도록 컨텍스트를 제공합니다.</li>
</ul>
<p>RAG 체인에 대한 자세한 내용은 <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">Langchain 설명서를</a> 참조하세요.</p>
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
<p>데이터베이스에 데이터가 있으면 질문을 시작할 수 있습니다.</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.<span class="hljs-title function_">invoke</span>(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 Apify를 사용하여 웹사이트 콘텐츠를 크롤링하고, 데이터를 Milvus 벡터 데이터베이스에 저장하고, 검색 증강 파이프라인을 사용하여 질문 답변 작업을 수행하는 방법을 보여드렸습니다. Apify의 웹 스크래핑 기능을 벡터 스토리지용 Milvus/Zilliz 및 언어 모델용 Langchain과 결합하면 매우 효과적인 정보 검색 시스템을 구축할 수 있습니다.</p>
<p>데이터베이스의 데이터 수집 및 업데이트를 개선하기 위해 Apify 통합은 체크섬에 따라 새 데이터 또는 수정된 데이터만 업데이트하는 <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">증분 업데이트를</a> 제공합니다. 또한 지정된 시간 내에 크롤링되지 않은 <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">오래된</a> 데이터를 자동으로 <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">제거할</a> 수 있습니다. 이러한 기능을 통해 벡터 데이터베이스를 최적화하고 검색 증강 파이프라인을 최소한의 수작업으로 효율적이고 최신 상태로 유지할 수 있습니다.</p>
<p>Apify-Milvus 통합에 대한 자세한 내용은 <a href="https://docs.apify.com/platform/integrations/milvus">Apify Milvus 설명서</a> 및 <a href="https://apify.com/apify/milvus-integration">통합 README 파일을</a> 참조하세요.</p>
