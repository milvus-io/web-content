---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  في هذا البرنامج التعليمي، سنوضح لك في هذا البرنامج التعليمي كيفية إنشاء خط
  أنابيب RAG (التوليد المعزز للاسترجاع) باستخدام Milvus و Cognee.
title: بناء RAG مع ميلفوس وكوجنيي
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">بناء RAG مع Milvus و Cognee</h3><p><a href="https://www.cognee.ai">Cognee</a> هي عبارة عن منصة للمطورين أولاً تعمل على تبسيط عملية تطوير تطبيقات الذكاء الاصطناعي من خلال خطوط أنابيب ECL (استخلاص، تعرف، تحميل) قابلة للتطوير والتركيب. من خلال التكامل بسلاسة مع Milvus، تتيح Cognee إمكانية الاتصال واسترجاع المحادثات والمستندات والنسخ بكفاءة، مما يقلل من الهلوسة ويحسّن التكاليف التشغيلية.</p>
<p>ومن خلال الدعم القوي لمخازن المتجهات مثل Milvus وقواعد بيانات الرسوم البيانية وLLMs، توفر Cognee إطار عمل مرن وقابل للتخصيص لبناء أنظمة توليد الاسترجاع المعزز (RAG). تضمن بنيتها الجاهزة للإنتاج تحسين الدقة والكفاءة للتطبيقات التي تعمل بالذكاء الاصطناعي.</p>
<p>في هذا البرنامج التعليمي، سنوضح لك في هذا البرنامج التعليمي كيفية بناء خط أنابيب (RAG) للتوليد المعزز للاسترجاع باستخدام Milvus و Cognee.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</blockquote>
<p>بشكل افتراضي، يستخدم OpenAI كـ LLM في هذا المثال. يجب إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح واجهة برمجة التطبيقات،</a> وتعيينه في وظيفة التكوين <code translate="no">set_llm_api_key()</code>.</p>
<p>لتهيئة Milvus كقاعدة بيانات المتجهات، قم بتعيين <code translate="no">VECTOR_DB_PROVIDER</code> إلى <code translate="no">milvus</code> وحدد <code translate="no">VECTOR_DB_URL</code> و <code translate="no">VECTOR_DB_KEY</code>. نظرًا لأننا نستخدم Milvus Lite لتخزين البيانات في هذا العرض التوضيحي، يجب توفير <code translate="no">VECTOR_DB_URL</code> فقط.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>أما بالنسبة لمتغيرات البيئة <code translate="no">VECTOR_DB_URL</code> و <code translate="no">VECTOR_DB_KEY</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">VECTOR_DB_URL</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث أنه يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ملف Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">VECTOR_DB_URL</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">VECTOR_DB_URL</code> و <code translate="no">VECTOR_DB_KEY</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">إعداد البيانات</h3><p>نستخدم صفحات الأسئلة الشائعة من <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">وثائق ميلفوس 2.4.x</a> كمعرفة خاصة في RAG الخاص بنا، وهو مصدر بيانات جيد لخط أنابيب RAG بسيط.</p>
<p>قم بتنزيل الملف المضغوط واستخراج المستندات إلى المجلد <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتحميل جميع ملفات تخفيض السعر من المجلد <code translate="no">milvus_docs/en/faq</code>. بالنسبة لكل مستند، نستخدم ببساطة "# " لفصل المحتوى في الملف، وهو ما يمكن أن يفصل تقريبًا محتوى كل جزء رئيسي من ملف تخفيض السعر.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">بناء RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">إعادة تعيين بيانات كوجني</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>مع وجود قائمة نظيفة جاهزة، يمكننا الآن إضافة مجموعة البيانات الخاصة بنا ومعالجتها في رسم بياني معرفي.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">إضافة البيانات والتعرف على</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>تقوم الطريقة <code translate="no">add</code> بتحميل مجموعة البيانات (الأسئلة الشائعة في ملف Milvus) إلى Cognee وتقوم الطريقة <code translate="no">cognify</code> بمعالجة البيانات لاستخراج الكيانات والعلاقات والملخصات، وبناء رسم بياني معرفي.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">الاستعلام عن الملخصات</h3><p>الآن بعد أن تمت معالجة البيانات، دعونا نستعلم عن الرسم البياني المعرفي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>يقوم هذا الاستعلام بالبحث في الرسم البياني المعرفي عن ملخص مرتبط بنص الاستعلام، ويتم طباعة المرشح الأكثر ارتباطًا.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">الاستعلام عن الأجزاء</h3><p>توفر الملخصات رؤى عالية المستوى، ولكن للحصول على تفاصيل أكثر دقة، يمكننا الاستعلام عن أجزاء محددة من البيانات مباشرةً من مجموعة البيانات المعالجة. يتم اشتقاق هذه الأجزاء من البيانات الأصلية التي تمت إضافتها وتحليلها أثناء إنشاء الرسم البياني المعرفي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>لنقم بتنسيقها وعرضها لسهولة القراءة بشكل أفضل!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>في خطواتنا السابقة، استعلمنا عن مجموعة بيانات الأسئلة الشائعة في ميلفوس عن كل من الملخصات وأجزاء محددة من البيانات. على الرغم من أن ذلك وفّر رؤى مفصّلة ومعلومات دقيقة، إلا أن مجموعة البيانات كانت كبيرة، مما جعل من الصعب تصور التبعيات بوضوح داخل الرسم البياني المعرفي.</p>
<p>لمعالجة ذلك، سنقوم بإعادة ضبط بيئة Cognee والعمل مع مجموعة بيانات أصغر وأكثر تركيزًا. سيسمح لنا ذلك بإظهار العلاقات والتبعيات المستخرجة أثناء عملية Cognify بشكل أفضل. من خلال تبسيط البيانات، يمكننا أن نرى بوضوح كيف تقوم Cognee بتنظيم وهيكلة المعلومات في الرسم البياني المعرفي.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">إعادة تعيين Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">إضافة مجموعة البيانات المركزة</h3><p>هنا، تتم إضافة مجموعة بيانات أصغر تحتوي على سطر واحد فقط من النص ومعالجتها لضمان الحصول على رسم بياني معرفي مركّز وسهل التفسير.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">الاستعلام عن الرؤى</h3><p>من خلال التركيز على مجموعة البيانات الأصغر هذه، يمكننا الآن تحليل العلاقات والبنية داخل الرسم البياني المعرفي بوضوح.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-built_in">print</span>(result_text)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># ({&#x27;id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;natural language processing&#x27;, &#x27;description&#x27;: &#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;}, {&#x27;relationship_name&#x27;: &#x27;is_a_subfield_of&#x27;, &#x27;source_node_id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;target_node_id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {&#x27;id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;computer science&#x27;, &#x27;description&#x27;: &#x27;The study of computation and information processing.&#x27;})</span>
<span class="hljs-comment"># (...)</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># It represents nodes and relationships in the knowledge graph:</span>
<span class="hljs-comment"># - The first element is the source node (e.g., &#x27;natural language processing&#x27;).</span>
<span class="hljs-comment"># - The second element is the relationship between nodes (e.g., &#x27;is_a_subfield_of&#x27;).</span>
<span class="hljs-comment"># - The third element is the target node (e.g., &#x27;computer science&#x27;).</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمثل هذا الناتج نتائج استعلام الرسم البياني المعرفي، ويعرض الكيانات (العُقد) وعلاقاتها (الحواف) كما تم استخراجها من مجموعة البيانات المعالجة. تتضمن كل عقدة كيان مصدر ونوع العلاقة والكيان المستهدف، بالإضافة إلى البيانات الوصفية مثل المعرفات الفريدة والأوصاف والطوابع الزمنية. يسلط الرسم البياني الضوء على المفاهيم الأساسية وروابطها الدلالية، مما يوفر فهمًا منظمًا لمجموعة البيانات.</p>
<p>تهانينا، لقد تعلمت الاستخدام الأساسي لـ cognee مع ميلفوس. إذا كنت ترغب في معرفة المزيد من الاستخدامات المتقدمة لـ cognee، يرجى الرجوع إلى <a href="https://github.com/topoteretes/cognee">صفحته</a> الرسمية .</p>
