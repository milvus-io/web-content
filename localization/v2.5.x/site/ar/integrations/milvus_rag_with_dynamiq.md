---
id: milvus_rag_with_dynamiq.md
summary: >-
  في هذا البرنامج التعليمي، سنستكشف كيفية استخدام Dynamiq بسلاسة مع Milvus،
  قاعدة البيانات المتجهة عالية الأداء المصممة خصيصًا لسير عمل RAG. يتفوق Milvus
  في تخزين وفهرسة واسترجاع التضمينات المتجهة بكفاءة، مما يجعله مكونًا لا غنى عنه
  لأنظمة الذكاء الاصطناعي التي تتطلب وصولًا سريعًا ودقيقًا للبيانات السياقية.
title: الشروع في العمل مع Dynamiq وMilvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_rag_with_dynamiq.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_rag_with_dynamiq.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Getting-Started-with-Dynamiq-and-Milvus" class="common-anchor-header">الشروع في العمل مع Dynamiq وMilvus<button data-href="#Getting-Started-with-Dynamiq-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.getdynamiq.ai/">Dynamiq</a> هو إطار عمل قوي للذكاء الاصطناعي العام يعمل على تبسيط عملية تطوير التطبيقات المدعومة بالذكاء الاصطناعي. وبفضل الدعم القوي للجيل المعزز للاسترجاع (RAG) وعوامل النموذج اللغوي الكبير (LLM)، يمكّن Dynamiq المطورين من إنشاء أنظمة ذكية وديناميكية بسهولة وكفاءة.</p>
<p>في هذا البرنامج التعليمي، سنستكشف كيفية استخدام Dynamiq بسلاسة مع <a href="https://milvus.io/">Milvus،</a> قاعدة البيانات المتجهة عالية الأداء المصممة خصيصًا لسير عمل RAG. يتفوق Milvus في تخزين وفهرسة واسترجاع التضمينات المتجهة بكفاءة، مما يجعله مكونًا لا غنى عنه لأنظمة الذكاء الاصطناعي التي تتطلب وصولًا سريعًا ودقيقًا للبيانات السياقية.</p>
<p>سيغطي هذا الدليل المفصّل خطوة بخطوة مسارين أساسيين لسير عمل RAG:</p>
<ul>
<li><p><strong>تدفق فهرسة المستندات</strong>: تعرف على كيفية معالجة ملفات الإدخال (مثل ملفات PDF)، وتحويل محتواها إلى تضمينات متجهة، وتخزينها في Milvus. تضمن الاستفادة من قدرات الفهرسة عالية الأداء في Milvus أن تكون بياناتك جاهزة للاسترجاع السريع.</p></li>
<li><p><strong>تدفق استرجاع المستندات</strong>: اكتشف كيفية الاستعلام عن تضمينات مستندات Milvus ذات الصلة واستخدامها لإنشاء استجابات ثاقبة مدركة للسياق مع وكلاء LLM من Dynamiq، مما يخلق تجربة مستخدم سلسة مدعومة بالذكاء الاصطناعي.</p></li>
</ul>
<p>بنهاية هذا البرنامج التعليمي، ستكتسب فهمًا قويًا لكيفية عمل Milvus وDynamiq معًا لبناء أنظمة ذكاء اصطناعي قابلة للتطوير ومدركة للسياق ومصممة خصيصًا لتلبية احتياجاتك.</p>
<h2 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">قم بتنزيل المكتبات المطلوبة</h3><pre><code translate="no" class="language-shell">$ pip install dynamiq pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h3 id="Configure-the-LLM-agent" class="common-anchor-header">تكوين وكيل LLM</h3><p>سنستخدم OpenAI كعامل LLM في هذا المثال. يجب عليك إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح api</a> <code translate="no">OPENAI_API_KEY</code> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RAG---Document-Indexing-Flow" class="common-anchor-header">RAG - تدفق فهرسة المستندات<button data-href="#RAG---Document-Indexing-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضّح هذا البرنامج التعليمي سير عمل استرجاع - توليد معزز (RAG) لفهرسة المستندات باستخدام Milvus كقاعدة بيانات المتجهات. يأخذ سير العمل ملفات PDF المدخلة، ويعالجها إلى أجزاء أصغر، ويُنشئ تضمينات متجهة باستخدام نموذج تضمين OpenAI، ويخزن التضمينات في مجموعة Milvus لاسترجاعها بكفاءة.</p>
<p>بحلول نهاية سير العمل هذا، سيكون لديك نظام فهرسة مستندات قابل للتطوير وفعال يدعم مهام RAG المستقبلية مثل البحث الدلالي والإجابة عن الأسئلة.</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">استيراد المكتبات المطلوبة وتهيئة سير العمل</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Importing necessary libraries for the workflow</span>
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO
<span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.nodes <span class="hljs-keyword">import</span> InputTransformer
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.converters <span class="hljs-keyword">import</span> PyPDFConverter
<span class="hljs-keyword">from</span> dynamiq.nodes.splitters.document <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.writers <span class="hljs-keyword">import</span> MilvusDocumentWriter

<span class="hljs-comment"># Initialize the workflow</span>
rag_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-PDF-Converter-Node" class="common-anchor-header">تعريف عقدة محول PDF</h3><pre><code translate="no" class="language-python">converter = PyPDFConverter(document_creation_mode=<span class="hljs-string">&quot;one-doc-per-page&quot;</span>)
converter_added = rag_wf.flow.add_nodes(
    converter
)  <span class="hljs-comment"># Add node to the DAG (Directed Acyclic Graph)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Document-Splitter-Node" class="common-anchor-header">تعريف عقدة تقسيم المستند</h3><pre><code translate="no" class="language-python">document_splitter = DocumentSplitter(
    split_by=<span class="hljs-string">&quot;sentence&quot;</span>,  <span class="hljs-comment"># Splits documents into sentences</span>
    split_length=<span class="hljs-number">10</span>,
    split_overlap=<span class="hljs-number">1</span>,
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[converter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    converter
)  <span class="hljs-comment"># Set dependency on the PDF converter</span>
splitter_added = rag_wf.flow.add_nodes(document_splitter)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Embedding-Node" class="common-anchor-header">تعريف عقدة التضمين</h3><pre><code translate="no" class="language-python">embedder = OpenAIDocumentEmbedder(
    connection=OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>]),
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[document_splitter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    document_splitter
)  <span class="hljs-comment"># Set dependency on the splitter</span>
document_embedder_added = rag_wf.flow.add_nodes(embedder)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Vector-Store-Node" class="common-anchor-header">تعريف عقدة مخزن متجه ميلفوس الناقل</h3><pre><code translate="no" class="language-python">vector_store = (
    MilvusDocumentWriter(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        create_if_not_exist=<span class="hljs-literal">True</span>,
        metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    )
    .inputs(documents=embedder.outputs.documents)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Set dependency on the embedder</span>
)
milvus_writer_added = rag_wf.flow.add_nodes(vector_store)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:03 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:03 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:04 - DEBUG - Created new connection using: 0bef2849fdb1458a85df8bb9dd27f51d
2024-11-19 22:14:04 - INFO - Collection my_milvus_collection does not exist. Creating a new collection.
2024-11-19 22:14:04 - DEBUG - Successfully created collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
</code></pre>
<div class="alert note">
<p>يقدم Milvus نوعين من النشر، يلبيان حالات استخدام مختلفة:</p>
<ol>
<li><strong>نوع النشر MilvusDeploymentType.FILE</strong></li>
</ol>
<ul>
<li>مثالي <strong>للنماذج الأولية المحلية</strong> أو تخزين <strong>البيانات على نطاق صغير</strong>.</li>
<li>قم بتعيين <code translate="no">uri</code> إلى مسار ملف محلي (على سبيل المثال، <code translate="no">./milvus.db</code>) للاستفادة من <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite،</a> والذي يقوم تلقائيًا بتخزين جميع البيانات في الملف المحدد.</li>
<li>هذا خيار مناسب <strong>للإعداد</strong> <strong>والتجريب</strong> <strong>السريع</strong>.</li>
</ul>
<ol start="2">
<li><strong>MilvusDeploymentType.HOST</strong></li>
</ol>
<ul>
<li><p>مصمم لسيناريوهات <strong>البيانات واسعة النطاق،</strong> مثل إدارة أكثر من مليون ناقل.</p>
<p><strong>خادم مستضاف ذاتياً</strong></p>
<ul>
<li>نشر خادم Milvus عالي الأداء باستخدام <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>.</li>
<li>قم بتكوين عنوان الخادم والمنفذ كعنوان <code translate="no">uri</code> (على سبيل المثال، <code translate="no">http://localhost:19530</code>).</li>
<li>إذا تم تمكين المصادقة:</li>
<li>قم بتوفير <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> كـ <code translate="no">token</code>.</li>
<li>إذا تم تعطيل المصادقة:</li>
<li>اترك <code translate="no">token</code> غير مضبوط.</li>
</ul>
<p><strong>زيليز كلاود (خدمة مُدارة)</strong></p>
<ul>
<li>للحصول على تجربة Milvus مُدارة بالكامل ومستندة إلى السحابة، استخدم <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</li>
<li>قم بتعيين <code translate="no">uri</code> و <code translate="no">token</code> وفقًا <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">لنقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> المتوفرة في وحدة تحكم Zilliz Cloud.</li>
</ul></li>
</ul>
</div>
<h3 id="Define-Input-Data-and-Run-the-Workflow" class="common-anchor-header">تحديد بيانات الإدخال وتشغيل سير العمل</h3><pre><code translate="no" class="language-python">file_paths = [<span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>]
input_data = {
    <span class="hljs-string">&quot;files&quot;</span>: [BytesIO(<span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;rb&quot;</span>).read()) <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
    <span class="hljs-string">&quot;metadata&quot;</span>: [{<span class="hljs-string">&quot;filename&quot;</span>: path} <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
}

<span class="hljs-comment"># Run the workflow with the prepared input data</span>
inserted_data = rag_wf.run(input_data=input_data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/var/folders/09/d0hx80nj35sb5hxb5cpc1q180000gn/T/ipykernel_31319/3145804345.py:4: ResourceWarning: unclosed file &lt;_io.BufferedReader name='./pdf_files/WhatisMilvus.pdf'&gt;
  BytesIO(open(path, &quot;rb&quot;).read()) for path in file_paths
ResourceWarning: Enable tracemalloc to get the object allocation traceback
2024-11-19 22:14:09 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution started.
2024-11-19 22:14:09 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution succeeded in 58ms.
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution started.
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/websockets/legacy/__init__.py:6: DeprecationWarning: websockets.legacy is deprecated; see https://websockets.readthedocs.io/en/stable/howto/upgrade.html for upgrade instructions
  warnings.warn(  # deprecated in 14.0 - 2024-11-09
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/pydantic/fields.py:804: PydanticDeprecatedSince20: Using extra keyword arguments on `Field` is deprecated and will be removed. Use `json_schema_extra` instead. (Extra keys: 'is_accessible_to_agent'). Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.7/migration/
  warn(
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution succeeded in 104ms.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution started.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution succeeded in 724ms.
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution succeeded in 66ms.
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution succeeded in 961ms.
2024-11-19 22:14:10 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 1.3s.
2024-11-19 22:14:10 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution succeeded in 1.3s.
</code></pre>
<p>من خلال سير العمل هذا، قمنا بنجاح بتنفيذ خط أنابيب لفهرسة المستندات باستخدام Milvus كقاعدة بيانات المتجهات ونموذج التضمين OpenAI للتمثيل الدلالي. يتيح هذا الإعداد استرجاعًا سريعًا ودقيقًا قائمًا على المتجهات، مما يشكل الأساس لسير عمل RAG مثل البحث الدلالي واسترجاع المستندات والتفاعلات السياقية القائمة على الذكاء الاصطناعي.</p>
<p>بفضل إمكانات التخزين القابلة للتطوير في Milvus وتنسيق Dynamiq، أصبح هذا الحل جاهزًا لكل من النماذج الأولية وعمليات النشر على نطاق واسع. يمكنك الآن توسيع خط الأنابيب هذا ليشمل مهام إضافية مثل الإجابة عن الأسئلة المستندة إلى الاسترجاع أو إنشاء محتوى يعتمد على الذكاء الاصطناعي.</p>
<h2 id="RAG-Document-Retrieval-Flow" class="common-anchor-header">تدفق استرجاع مستندات RAG<button data-href="#RAG-Document-Retrieval-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا البرنامج التعليمي، ننفذ في هذا البرنامج التعليمي سير عمل استرجاع المستندات المعزز للاسترجاع (RAG). يأخذ سير العمل هذا استعلام المستخدم، ويُنشئ تضمينًا متجهًا له، ويسترجع المستندات الأكثر صلة من قاعدة بيانات Milvus vector، ويستخدم نموذجًا لغويًا كبيرًا (LLM) لإنشاء إجابة مفصلة ومدركة للسياق استنادًا إلى المستندات المسترجعة.</p>
<p>من خلال اتباع سير العمل هذا، ستنشئ حلاً متكاملاً للبحث الدلالي والإجابة عن الأسئلة، يجمع بين قوة استرجاع المستندات المستند إلى المتجهات وإمكانيات نماذج اللغة الكبيرة (LLM) المتقدمة من OpenAI. يتيح هذا النهج استجابات فعالة وذكية لاستعلامات المستخدم من خلال الاستفادة من المعرفة المخزنة في قاعدة بيانات المستندات.</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">استيراد المكتبات المطلوبة وتهيئة سير العمل</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAITextEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.retrievers <span class="hljs-keyword">import</span> MilvusDocumentRetriever
<span class="hljs-keyword">from</span> dynamiq.nodes.llms <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> dynamiq.prompts <span class="hljs-keyword">import</span> Message, Prompt

<span class="hljs-comment"># Initialize the workflow</span>
retrieval_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-OpenAI-Connection-and-Text-Embedder" class="common-anchor-header">تعريف اتصال OpenAI وتضمين النص</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Establish OpenAI connection</span>
openai_connection = OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>])

<span class="hljs-comment"># Define the text embedder node</span>
embedder = OpenAITextEmbedder(
    connection=openai_connection,
    model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
)

<span class="hljs-comment"># Add the embedder node to the workflow</span>
embedder_added = retrieval_wf.flow.add_nodes(embedder)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Document-Retriever" class="common-anchor-header">تعريف مسترجع مستندات Milvus</h3><pre><code translate="no" class="language-python">document_retriever = (
    MilvusDocumentRetriever(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        top_k=<span class="hljs-number">5</span>,
    )
    .inputs(embedding=embedder.outputs.embedding)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Dependency on the embedder node</span>
)

<span class="hljs-comment"># Add the retriever node to the workflow</span>
milvus_retriever_added = retrieval_wf.flow.add_nodes(document_retriever)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:19 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:19 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:19 - DEBUG - Created new connection using: 98d1132773af4298a894ad5925845fd2
2024-11-19 22:14:19 - INFO - Collection my_milvus_collection already exists. Skipping creation.
</code></pre>
<h3 id="Define-the-Prompt-Template" class="common-anchor-header">تعريف قالب الموجه</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the prompt template for the LLM</span>
prompt_template = <span class="hljs-string">&quot;&quot;&quot;
Please answer the question based on the provided context.

Question: {{ query }}

Context:
{% for document in documents %}
- {{ document.content }}
{% endfor %}
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create the prompt object</span>
prompt = Prompt(messages=[Message(content=prompt_template, role=<span class="hljs-string">&quot;user&quot;</span>)])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-Answer-Generator" class="common-anchor-header">تعريف مولد الإجابة</h3><pre><code translate="no" class="language-python">answer_generator = (
    OpenAI(
        connection=openai_connection,
        model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
        prompt=prompt,
    )
    .inputs(
        documents=document_retriever.outputs.documents,
        query=embedder.outputs.query,
    )
    .depends_on(
        [document_retriever, embedder]
    )  <span class="hljs-comment"># Dependencies on retriever and embedder</span>
)

<span class="hljs-comment"># Add the answer generator node to the workflow</span>
answer_generator_added = retrieval_wf.flow.add_nodes(answer_generator)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-Workflow" class="common-anchor-header">تشغيل سير العمل</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Run the workflow with a sample query</span>
sample_query = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>

result = retrieval_wf.run(input_data={<span class="hljs-string">&quot;query&quot;</span>: sample_query})

answer = result.output.get(answer_generator.<span class="hljs-built_in">id</span>).get(<span class="hljs-string">&quot;output&quot;</span>, {}).get(<span class="hljs-string">&quot;content&quot;</span>)
<span class="hljs-built_in">print</span>(answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:22 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution started.
2024-11-19 22:14:22 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:22 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution started.
2024-11-19 22:14:23 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:23 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution succeeded in 474ms.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution started.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution succeeded in 23ms.
2024-11-19 22:14:23 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution started.
2024-11-19 22:14:24 - INFO - HTTP Request: POST https://api.openai.com/v1/chat/completions &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:24 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution succeeded in 1.8s.
2024-11-19 22:14:25 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 2.4s.
2024-11-19 22:14:25 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution succeeded in 2.4s.


The advanced search algorithms in Milvus include a variety of in-memory and on-disk indexing/search algorithms such as IVF (Inverted File), HNSW (Hierarchical Navigable Small World), and DiskANN. These algorithms have been deeply optimized to enhance performance, delivering 30%-70% better performance compared to popular implementations like FAISS and HNSWLib. These optimizations are part of Milvus's design to ensure high efficiency and scalability in handling vector data.
</code></pre>
