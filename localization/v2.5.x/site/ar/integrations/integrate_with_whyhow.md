---
id: integrate_with_whyhow.md
summary: >-
  يوضّح هذا الدليل كيفية استخدام Whyhow.ai وMilvus Lite لإجراء الاسترجاع المستند
  إلى القواعد.
title: دمج Milvus مع WhyHow
---
<h1 id="Integrate-Milvus-with-WhyHow" class="common-anchor-header">دمج Milvus مع WhyHow<button data-href="#Integrate-Milvus-with-WhyHow" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضّح هذا الدليل كيفية استخدام Whyhow.ai وMilvus Lite لإجراء الاسترجاع القائم على القواعد.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>WhyHow عبارة عن منصة توفر للمطورين اللبنات الأساسية التي يحتاجونها لتنظيم البيانات غير المهيكلة ووضعها في سياقها واسترجاعها بشكل موثوق لإجراء الاسترجاع القائم على القواعد المعقدة. حزمة الاسترجاع المستند إلى القواعد هي حزمة Python تم تطويرها بواسطة WhyHow والتي تمكّن الأشخاص من إنشاء وإدارة تطبيقات الاسترجاع المعزز (RAG) مع إمكانات تصفية متقدمة.</p>
<h2 id="Installation" class="common-anchor-header">التثبيت<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل البدء، يرجى تثبيت جميع حزم بايثون الضرورية لاستخدامها لاحقًا.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus, whyhow_rbr
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، نحتاج إلى تهيئة عميل Milvus لتنفيذ الاسترجاع القائم على القواعد باستخدام Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite local path</span>
path=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span> <span class="hljs-comment"># random name for local milvus lite db path</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(path)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا تهيئة عميل Milvus من خلال Milvus Cloud</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Cloud credentials</span>
YOUR_MILVUS_CLOUD_END_POINT = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_END_POINT&quot;</span>
YOUR_MILVUS_CLOUD_TOKEN = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_TOKEN&quot;</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">إنشاء مجموعة<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-necessary-variables" class="common-anchor-header">تحديد المتغيرات الضرورية</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define collection name</span>
COLLECTION_NAME=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span> <span class="hljs-comment"># take your own collection name</span>

<span class="hljs-comment"># Define vector dimension size</span>
DIMENSION=<span class="hljs-number">1536</span> <span class="hljs-comment"># decide by the model you use</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-schema" class="common-anchor-header">إضافة مخطط</h3><p>قبل إدراج أي بيانات في قاعدة بيانات Milvus Lite، نحتاج أولاً إلى تحديد حقل البيانات، والذي يسمى المخطط هنا. من خلال إنشاء كائن <code translate="no">CollectionSchema</code> وإضافة حقل بيانات من خلال <code translate="no">add_field()</code> ، يمكننا التحكم في نوع البيانات وخصائصها. هذه الخطوة إلزامية قبل إدراج أي بيانات في ميلفوس.</p>
<pre><code translate="no" class="language-python">schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Enable id matching</span>

schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">إنشاء فهرس</h3><p>لكل مخطط، من الأفضل أن يكون لدينا فهرس حتى يكون الاستعلام أكثر كفاءة. لإنشاء فهرس، نحتاج أولاً إلى <code translate="no">index_params</code> ثم نضيف لاحقًا المزيد من بيانات الفهرس على هذا الكائن <code translate="no">IndexParams</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Start to indexing data field</span>
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  <span class="hljs-comment"># pass in index_params object</span>
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>هذه الطريقة عبارة عن غلاف رفيع حول تطبيق Milvus الرسمي<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">(المستندات الرسمية</a>).</p>
<h3 id="Create-collection" class="common-anchor-header">إنشاء مجموعة</h3><p>بعد تحديد جميع حقول البيانات وفهرستها، نحتاج الآن إلى إنشاء مجموعة قاعدة البيانات الخاصة بنا حتى نتمكن من الوصول إلى بياناتنا بسرعة ودقة. ما يجب ذكره هو أننا قمنا بتهيئة <code translate="no">enable_dynamic_field</code> ليكون صحيحًا حتى تتمكن من تحميل أي بيانات بحرية. التكلفة هي أن الاستعلام عن البيانات قد يكون غير فعال.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upload-documents" class="common-anchor-header">تحميل المستندات<button data-href="#Upload-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء مجموعة، نكون مستعدين لتعبئتها بالمستندات. في <code translate="no">whyhow_rbr</code> يتم ذلك باستخدام طريقة <code translate="no">upload_documents</code> من <code translate="no">MilvusClient</code>. يقوم بتنفيذ الخطوات التالية تحت الغطاء:</p>
<ul>
<li><strong>المعالجة المسبقة</strong>: قراءة ملفات PDF المتوفرة وتقسيمها إلى أجزاء</li>
<li><strong>التضمين</strong>: تضمين جميع الأجزاء باستخدام نموذج OpenAI</li>
<li><strong>التضمين</strong>: تحميل كل من التضمينات والبيانات الوصفية إلى Milvus Lite</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># get pdfs</span>
pdfs = [<span class="hljs-string">&quot;harry-potter.pdf&quot;</span>, <span class="hljs-string">&quot;game-of-thrones.pdf&quot;</span>] <span class="hljs-comment"># replace to your pdfs path</span>

<span class="hljs-comment"># Uploading the PDF document</span>
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Question-answering" class="common-anchor-header">الإجابة عن الأسئلة<button data-href="#Question-answering" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكننا الآن الانتقال أخيرًا إلى التوليد المعزز للاسترجاع.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search data and implement RAG!</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;What food does Harry Potter like to eat?&#x27;</span>,
    collection_name=COLLECTION_NAME,
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Rules" class="common-anchor-header">القواعد</h3><p>في المثال السابق، تم النظر في كل مستند في فهرسنا. ومع ذلك، قد يكون من المفيد أحيانًا استرداد المستندات التي تستوفي بعض الشروط المحددة مسبقًا فقط (على سبيل المثال <code translate="no">filename=harry-potter.pdf</code>). في <code translate="no">whyhow_rbr</code> من خلال ميلفوس لايت، يمكن القيام بذلك من خلال ضبط معلمات البحث.</p>
<p>يمكن أن تتحكم القاعدة في سمات البيانات الوصفية التالية</p>
<ul>
<li><code translate="no">filename</code> اسم الملف</li>
<li><code translate="no">page_numbers</code> قائمة الأعداد الصحيحة المقابلة لأرقام الصفحات (فهرسة 0)</li>
<li><code translate="no">id</code> المعرف الفريد للقطعة (هذا هو المرشح الأكثر "تطرفًا")</li>
<li>قواعد أخرى تستند إلى <a href="https://milvus.io/docs/boolean.md">تعبيرات منطقية</a></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># RULES(search on book harry-potter on page 8):</span>
PARTITION_NAME=<span class="hljs-string">&#x27;harry-potter&#x27;</span> <span class="hljs-comment"># search on books</span>
page_number=<span class="hljs-string">&#x27;page_number == 8&#x27;</span>

<span class="hljs-comment"># first create a partitions to store the book and later search on this specific partition:</span>
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME <span class="hljs-comment"># separate base on your pdfs type</span>
)

<span class="hljs-comment"># search with rules</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;Tell me about the greedy method&#x27;</span>,
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    <span class="hljs-built_in">filter</span>=page_number, <span class="hljs-comment"># append any rules follow the Boolean Expression Rule</span>
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، نقوم أولاً بإنشاء قسم لتخزين ملفات PDF ذات الصلة بـ harry-potter، ومن خلال البحث داخل هذا القسم، يمكننا الحصول على المعلومات الأكثر مباشرة. أيضًا، نطبّق أرقام الصفحات كمرشح لتحديد الصفحة التي نرغب في البحث عنها بالضبط. تذكّر، يجب أن تتبع معلمة عامل التصفية <a href="https://milvus.io/docs/boolean.md">القاعدة المنطقية</a>.</p>
<h3 id="Clean-up" class="common-anchor-header">التنظيف</h3><p>أخيرًا، بعد تنفيذ جميع التعليمات، يمكنك تنظيف قاعدة البيانات عن طريق الاتصال بـ <code translate="no">drop_collection()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Clean up</span>
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
<button class="copy-code-btn"></button></code></pre>
