---
id: apify_milvus_rag.md
summary: >-
  يشرح هذا البرنامج التعليمي كيفية الزحف إلى مواقع الويب باستخدام أداة زحف محتوى
  الموقع الإلكتروني من Apify وحفظ البيانات في قاعدة بيانات Milvus/Zilliz المتجهة
  لاستخدامها لاحقًا في الإجابة عن الأسئلة.
title: >-
  التوليد المعزز للاسترجاع: الزحف إلى مواقع الويب باستخدام Apify وحفظ البيانات
  في ملفوس للإجابة على الأسئلة
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">التوليد المعزز للاسترجاع: الزحف إلى مواقع الويب باستخدام Apify وحفظ البيانات في ملفوس للإجابة على الأسئلة<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
<p>يشرح هذا البرنامج التعليمي كيفية الزحف إلى مواقع الويب باستخدام برنامج Apify لزحف محتوى مواقع الويب وحفظ البيانات في قاعدة بيانات Milvus/Zilliz المتجهة لاستخدامها لاحقًا للإجابة عن الأسئلة.</p>
<p><a href="https://apify.com/">Apify</a> عبارة عن منصة تجريف واستخراج البيانات من الويب تقدم سوقًا للتطبيقات مع أكثر من ألفي أداة سحابية جاهزة، تُعرف باسم Actors. هذه الأدوات مثالية لحالات الاستخدام مثل استخراج البيانات المهيكلة من مواقع التجارة الإلكترونية، ووسائل التواصل الاجتماعي، ومحركات البحث، والخرائط على الإنترنت، وغيرها.</p>
<p>على سبيل المثال، يمكن لـ "ممثل <a href="https://apify.com/apify/website-content-crawler">زاحف محتوى الموقع الإلكتروني</a> " الزحف بعمق إلى مواقع الويب، وتنظيف HTML الخاص بها عن طريق إزالة ملفات تعريف الارتباط أو التذييل أو التنقل، ثم تحويل HTML إلى Markdown.</p>
<p>يسهّل تكامل Apify لـ Milvus/Zilliz تحميل البيانات من الويب إلى قاعدة بيانات المتجهات.</p>
<h1 id="Before-you-begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>قبل تشغيل هذا الدفتر، تأكد من أن لديك ما يلي:</p>
<ul>
<li><p>حساب Apify و <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>حساب OpenAI وحساب <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_API_KEY</a></p></li>
<li><p>حساب <a href="https://cloud.zilliz.com">Zilliz Cloud</a> (خدمة سحابية مُدارة بالكامل لـ Milvus).</p></li>
<li><p>URI قاعدة بيانات Zilliz URI والرمز المميز</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">تثبيت التبعيات<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">إعداد مفاتيح Apify وOPENAI_API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">إعداد URI ورمز URI لقاعدة بيانات ميلفوس/زيلز والرمز المميز واسم المجموعة<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>تحتاج إلى URI والرمز المميز لـ Milvus/Zilliz لإعداد العميل.</p>
<ul>
<li>إذا كان لديك خادم Milvus منشور ذاتيًا على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes،</a> استخدم عنوان الخادم والمنفذ كـ URI الخاص بك، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين ميزة المصادقة على Milvus، استخدم "<your_username>:<your_password>" كرمز مميز، وإلا فاترك الرمز المميز كسلسلة فارغة.</li>
<li>إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</li>
</ul>
<p>لاحظ أن المجموعة لا تحتاج إلى أن تكون موجودة مسبقًا. سيتم إنشاؤها تلقائيًا عند تحميل البيانات إلى قاعدة البيانات.</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

MILVUS_COLLECTION_NAME = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">استخدام زاحف محتوى الموقع الإلكتروني لكشط المحتوى النصي من Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد ذلك، سنستخدم زاحف محتوى الموقع الإلكتروني مع Apify Python SDK. سنبدأ بتعريف actor_id و run_input، ثم نحدد المعلومات التي سيتم حفظها في قاعدة بيانات المتجه.</p>
<p><code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> هو معرّف زاحف محتوى الموقع الإلكتروني. يمكن التحكم بسلوك الزاحف بشكل كامل من خلال معلمات run_input (انظر <a href="https://apify.com/apify/website-content-crawler/input-schema">صفحة الإدخال</a> لمزيد من التفاصيل). في هذا المثال، سنقوم في هذا المثال بالزحف إلى وثائق ميلفوس، والتي لا تتطلب عرض جافا سكريبت. لذلك، نقوم بتعيين <code translate="no">crawlerType=cheerio</code> ، وتحديد <code translate="no">startUrls</code> ، والحد من عدد الصفحات التي يتم الزحف إليها عن طريق تعيين <code translate="no">maxCrawlPages=10</code>.</p>
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
<p>سيقوم زاحف محتوى الموقع الإلكتروني بالزحف إلى الموقع بشكل كامل حتى يصل إلى الحد المحدد مسبقًا الذي تم تعيينه بواسطة <code translate="no">maxCrawlPages</code>. سيتم تخزين البيانات التي تم كشطها في <code translate="no">Dataset</code> على منصة Apify. للوصول إلى هذه البيانات وتحليلها، يمكنك استخدام <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>يقوم الكود التالي بجلب البيانات التي تم كشطها من Apify <code translate="no">Dataset</code> ويعرض أول موقع تم كشطه</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(limit=<span class="hljs-number">1</span>).items
item[<span class="hljs-number">0</span>].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>لتحميل البيانات إلى قاعدة بيانات Milvus، نستخدم <a href="https://apify.com/apify/milvus-integration">تكامل Apify Milvus</a>. أولاً، نحتاج إلى إعداد المعلمة لقاعدة بيانات Milvus. بعد ذلك، نحدد الحقول (<code translate="no">datasetFields</code>) التي نريد تخزينها في قاعدة البيانات. في المثال أدناه، نقوم بحفظ الحقل <code translate="no">text</code> و <code translate="no">metadata.title</code>.</p>
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
<p>الآن، سنستدعي <code translate="no">apify/milvus-integration</code> لتخزين البيانات</p>
<pre><code translate="no" class="language-python">actor_call = client.actor(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).call(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>يتم الآن تخزين جميع البيانات التي تم كشطها في قاعدة بيانات ميلفوس وهي جاهزة للاسترجاع والإجابة عن الأسئلة</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">الاسترجاع وخط أنابيب توليد LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>بعد ذلك، سنقوم بتعريف خط أنابيب الاسترجاع المعزز باستخدام لانجشين. يعمل خط الأنابيب على مرحلتين:</p>
<ul>
<li>مخزن المتجهات (ميلفوس): تسترجع Langchain المستندات ذات الصلة من Milvus من خلال مطابقة تضمينات الاستعلام مع تضمينات المستندات المخزنة.</li>
<li>استجابة LLM: توفر المستندات المسترجعة سياقًا لـ LLM (على سبيل المثال، GPT-4) لتوليد إجابة مستنيرة.</li>
</ul>
<p>للمزيد من التفاصيل حول سلسلة RAG، يُرجى الرجوع إلى <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">وثائق لانغشين</a>.</p>
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
<p>بمجرد حصولنا على البيانات في قاعدة البيانات، يمكننا البدء في طرح الأسئلة</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.invoke(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">الخاتمة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>أوضحنا في هذا البرنامج التعليمي كيفية الزحف إلى محتوى موقع الويب باستخدام Apify، وتخزين البيانات في قاعدة بيانات Milvus vector، واستخدام خط أنابيب معزز للاسترجاع لأداء مهام الإجابة عن الأسئلة. من خلال الجمع بين إمكانات Apify في كشط الويب مع Milvus/Zilliz لتخزين المتجهات وLangchain لنماذج اللغة، يمكنك بناء أنظمة استرجاع معلومات فعالة للغاية.</p>
<p>ولتحسين جمع البيانات وتحديثها في قاعدة البيانات، يوفر تكامل Apify <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">تحديثات تدريجية،</a> والتي تقوم بتحديث البيانات الجديدة أو المعدلة فقط بناءً على المجموع الاختباري. بالإضافة إلى ذلك، يمكنه <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">إزالة</a> البيانات <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">القديمة</a> التي لم يتم الزحف إليها خلال وقت محدد تلقائيًا. تساعد هذه الميزات في الحفاظ على تحسين قاعدة بياناتك المتجهة وضمان بقاء خط أنابيب الاسترجاع المعزز فعالاً ومحدثاً بأقل جهد يدوي ممكن.</p>
<p>للمزيد من التفاصيل حول تكامل Apify-Milvus، يُرجى الرجوع إلى <a href="https://docs.apify.com/platform/integrations/milvus">وثائق Apify Milvus</a> <a href="https://apify.com/apify/milvus-integration">وملف README للتكامل</a>.</p>
