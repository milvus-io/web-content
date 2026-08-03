---
id: add-fields-to-an-existing-collection.md
title: تعديل مخطط المجموعة
summary: >-
  قم بتعديل مخطط مجموعة موجود عن طريق إضافة أو حذف الحقول القياسية، والحقول
  المتجهة، والحقول المتجهة التي تم إنشاؤها بواسطة الدوال، دون الحاجة إلى إعادة
  إنشاء المجموعة.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">تعديل مخطط المجموعة<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>عندما تنتقل المجموعة من مرحلة التطوير إلى مرحلة الإنتاج، غالبًا ما تتغير الحقول المرتبطة بكل كيان. قد تضيف حقولًا قياسية مثل <code translate="no">source_uri</code> أو <code translate="no">review_status</code> للتصفية ومنطق التطبيق، أو تضيف حقل متجه جديدًا للتضمينات التي أنشأها تطبيقك، أو تضيف حقل متجه متفرقًا أنشأه BM25 للبحث المعجمي في النص الموجود، أو تزيل الحقول التي لم تعد مستخدمة. تتيح لك ميزة "تعديل مخطط المجموعة" إجراء تغييرات مدعومة على الحقول في مكانها بدلاً من إعادة إنشاء المجموعة.</p>
<div class="alert note">
<p>يغطي هذا الدليل تغييرات مخطط البيانات على مستوى الحقول في المجموعات المُدارة، بما في ذلك الحقول المُعرَّفة من قِبل المستخدم والحقول المتجهة التي تم إنشاؤها بواسطة الدوال. لإضافة حقل إلى مجموعة خارجية، راجع <a href="/docs/ar/alter-external-collection-schema.md">«تعديل مخطط المجموعة الخارجية</a>» ( <a href="/docs/ar/alter-external-collection-schema.md">Alter External Collection Schema)</a>. بالنسبة لتغييرات خصائص الحقول، مثل تغيير «التصنيف» ( <code translate="no">max_length</code> ) في حقل «التصنيف» ( <code translate="no">VARCHAR</code> ) أو «التصنيف» ( <code translate="no">max_capacity</code> ) في حقل «التصنيف» ( <code translate="no">ARRAY</code> )، راجع <a href="/docs/ar/alter-collection-field.md">«تعديل حقل المجموعة</a>» ( <a href="/docs/ar/alter-collection-field.md">Alter Collection Field</a>). للحصول على معلومات حول سلوك الحقول الديناميكي، راجع <a href="/docs/ar/enable-dynamic-field.md">«الحقل الديناميكي</a> » و <a href="/docs/ar/modify-collection.md">«تعديل المجموعة</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>إضافة حقول محددة من قبل المستخدم</strong></p>
<ul>
<li><p>يجب أن تكون الحقول المحددة من قبل المستخدم قابلة للقيمة الفارغة. قم بتعيين <code translate="no">nullable=True</code> عند استدعاء <code translate="no">add_collection_field()</code>. بالنسبة للكيانات الموجودة، يكون الحقل المضاف <code translate="no">NULL</code> ما لم تقم بإضافة حقل قياسي باستخدام <code translate="no">default_value</code>.</p></li>
<li><p>يتم دعم إضافة الحقول القياسية المحددة من قبل المستخدم في Milvus 2.6.x والإصدارات الأحدث. يتم دعم إضافة الحقول المتجهة المحددة من قبل المستخدم في Milvus 2.6.18 والإصدارات الأحدث.</p></li>
<li><p>يتم دعم إضافة حقول StructArray في Milvus 3.0.0 والإصدارات الأحدث. يجب أن تكون حقول StructArray المضافة قابلة للقيمة الفارغة.</p></li>
<li><p>يجب أن تكون أسماء الحقول فريدة بين الحقول الموجودة في المجموعة.</p></li>
</ul>
<p><strong>إضافة حقول متجهة تم إنشاؤها بواسطة الدوال</strong></p>
<ul>
<li><p>يمكن لكل تحديث للمخطط إضافة دالة واحدة وحقل متجه واحد تم إنشاؤه فقط.</p></li>
<li><p>تحدد الدالة المدعومة نوع الحقل المتجه الذي تم إنشاؤه: تُنشئ الدالة ` <code translate="no">BM25</code> ` حقلًا من نوع ` <code translate="no">SPARSE_FLOAT_VECTOR</code> `، بينما تُنشئ الدالة ` <code translate="no">MINHASH</code> ` حقلًا من نوع ` <code translate="no">BINARY_VECTOR</code> `.</p></li>
<li><p>يجب أن يكون الحقل المتجه الذي تم إنشاؤه حقلًا جديدًا. ولا يمكن أن يشير إلى حقل موجود بالفعل في مخطط المجموعة.</p></li>
<li><p>لا يمكن أن يكون حقل المتجه الذي تم إنشاؤه قابلاً للقيمة الفارغة.</p></li>
<li><p>يجب أن تكون حقول الإدخال التي تستخدمها الدالة موجودة بالفعل في المجموعة.</p></li>
<li><p>عند إضافة دالة BM25 أو MinHash إلى مجموعة موجودة، يجب أن يكون مدخل الدالة حقلًا من نوع " <code translate="no">VARCHAR</code> ". لا يُدعم مدخل من نوع " <code translate="no">TEXT</code> " في سير العمل هذا لأن Milvus لا يمكنه ملء المخرجات التي تم إنشاؤها للكيانات الموجودة من هذا النوع من المدخلات.</p></li>
</ul>
<p><strong>إزالة الحقول المحددة من قبل المستخدم</strong></p>
<ul>
<li><p>لا يمكنك حذف حقل المفتاح الأساسي أو حقل مفتاح التقسيم أو حقل مفتاح التجميع أو حقل المتجه الأخير في المجموعة.</p></li>
<li><p>يمكنك حذف حقل « <code translate="no">ARRAY&lt;STRUCT&gt;</code> » بالكامل، ولكن لا يمكنك حذف حقل فرعي فردي داخل حقل « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>لا يمكنك حذف حقل يُستخدم كحقل إدخال دالة أو تم إنشاؤه كحقل إخراج دالة بشكل مباشر. لإزالة حقل إخراج دالة، قم بحذف الدالة التي تولده.</p></li>
</ul>
<p><strong>إزالة الحقول المتجهة التي تم إنشاؤها بواسطة الدوال</strong></p>
<ul>
<li><p>في سير عمل تغيير المخطط هذا، يؤدي حذف دالة إلى إزالة الدالة وحقول الإخراج التي تم إنشاؤها. تظل حقول إدخال الدالة موجودة في مخطط المجموعة.</p></li>
<li><p>يتم رفض حذف الدالة إذا كانت إزالة حقول الإخراج الخاصة بها ستترك المجموعة بدون أي حقل متجه.</p></li>
</ul>
<div class="alert note">
<p>لتغييرات المخطط خارج نطاق عمليات الإضافة والحذف المدعومة، قم بإعادة إنشاء المجموعة أو ترحيلها.</p>
</div>
<h2 id="Add-fields-to-an-existing-collection" class="common-anchor-header">إضافة حقول إلى مجموعة موجودة<button data-href="#Add-fields-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر مسار إضافة الحقل بناءً على كيفية إنتاج قيم الحقل:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">أضف حقولًا قياسية محددة من قبل المستخدم</a> عندما تحتاج إلى بيانات وصفية جديدة للتصفية أو إخراج الاستعلام أو منطق التطبيق.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">أضف حقول StructArray</a> عندما تحتاج إلى حقل مصفوفة تشترك عناصره في نفس مخطط Struct.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">أضف حقول متجهة محددة من قبل المستخدم</a> عندما يقوم تطبيقك بإنشاء تضمينات وكتابة قيم متجهة إلى Milvus.</p></li>
<li><p><a href="#add-vector-fields-generated-by-functions--milvus-30x">أضف حقول متجهة تم إنشاؤها بواسطة الدوال</a> عندما يتعين على Milvus إنشاء قيم متجهة من الحقول الموجودة، مثل المتجهات المتفرقة BM25 أو توقيعات MinHash من النص.</p></li>
</ul>
<p>في جميع الحالات، يجب ألا يكون اسم الحقل الجديد موجودًا بالفعل في المجموعة، ولا يمكن أن يتجاوز العدد الإجمالي للحقول حد عدد الحقول في Milvus. لمزيد من التفاصيل، راجع <a href="/docs/ar/limitations.md#number-of-resources-in-a-collection">حدود Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">إضافة حقول قياسية محددة من قبل المستخدم<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم الأمر " <code translate="no">add_collection_field()</code> " لإضافة حقل قياسي محدد من قبل المستخدم إلى مجموعة موجودة.</p>
<p>ويختلف هذا عن تخزين مفاتيح عشوائية في الحقل الديناميكي: بعد توفر تحديث المخطط، يصبح الحقل القياسي الجديد جزءًا عاديًا من مخطط المجموعة. يمكنك إدراج القيم أو تحديثها فيه، وإنشاء فهارس عليه حيثما كان ذلك مدعومًا، واستخدامه في الاستعلامات وفلاتر البحث، وإرجاعه في ناتج الاستعلام أو البحث.</p>
<p>نظرًا لأن الكيانات الموجودة تم إدراجها قبل وجود الحقل الجديد، يجب أن يكون كل حقل عددي محدد من قبل المستخدم قابلًا للقيمة الفارغة:</p>
<ul>
<li><p>إذا أضفت حقلًا عدديًا باستخدام <code translate="no">nullable=True</code> دون <code translate="no">default_value</code> ، فستُرجع الكيانات الموجودة <code translate="no">NULL</code> للحقل الجديد.</p></li>
<li><p>إذا أضفت حقلًا عدديًا مع <code translate="no">nullable=True</code> و <code translate="no">default_value</code> ، فستُرجع الكيانات الموجودة القيمة الافتراضية بدلاً من <code translate="no">NULL</code>.</p></li>
</ul>
<p>لا تتطابق تعبيرات التصفية العددية مع القيم العددية <code translate="no">NULL</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">الحقول القابلة للقيمة الفارغة</a>.</p>
<p><strong>مثال: إضافة حقل عددي قابل للقيمة الفارغة</strong></p>
<p>يضيف المثال التالي حقلًا عدديًا قابلًا للقيمة الفارغة <code translate="no">source</code> إلى مجموعة موجودة باسم <code translate="no">product_catalog</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة الحقل، تُرجع الكيانات الموجودة بالفعل في المجموعة القيمة " <code translate="no">NULL</code> " لـ <code translate="no">source</code>. يمكن للكيانات الجديدة تعيين القيمة " <code translate="no">source</code> " أثناء الإدراج أو التحديث.</p>
<p><strong>مثال: إضافة حقل قياسي بقيمة افتراضية</strong></p>
<p>إذا كان من المفترض أن تُرجع الكيانات الموجودة قيمة محددة بدلاً من <code translate="no">NULL</code> ، فحدد <code translate="no">default_value</code> عند إضافة حقل عددي. يضيف المثال التالي حقل <code translate="no">review_status</code> ويستخدم <code translate="no">&quot;unreviewed&quot;</code> كقيمة افتراضية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة الحقل، تُرجع الكيانات الموجودة مسبقًا في المجموعة القيمة <code translate="no">&quot;unreviewed&quot;</code> بدلاً من <code translate="no">review_status</code>. يمكن للكيانات الجديدة تعيين قيمة مختلفة أو استخدام القيمة الافتراضية في حالة عدم توفير أي قيمة.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">إضافة حقول StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">add_collection_struct_field()</code> لإضافة حقل StructArray يقبل مصفوفات من عناصر Struct. لإضافة حقل StructArray، اتبع الخطوات التالية:</p>
<ol>
<li><p>قم بإنشاء مخطط Struct يحتوي على الحقول الفرعية الضرورية من أنواع البيانات المدعومة. لمعرفة أنواع البيانات القابلة للتطبيق، راجع <a href="/docs/ar/structarray-limits.md#Supported-subfield-data-types">حدود StructArray</a>.</p></li>
<li><p>أشر إلى مخطط Struct الذي تم إنشاؤه أعلاه وقم بتعيين السعة القصوى للحقل في <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>اضبط " <code translate="no">nullable=True</code> " في الطلب.</p></li>
</ol>
<p><strong>مثال: إضافة حقل StructArray قابل للقيمة الفارغة</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة حقل StructArray، تُرجع الكيانات الموجودة بالفعل في المجموعة قيمة " <code translate="no">NULL</code> " لـ " <code translate="no">chunks</code> " عبر جميع حقولها الفرعية. عند إدراج كيان جديد، تأكد من أن جميع الحقول الفرعية إما " <code translate="no">NULL</code> " أو تحتوي على قيم صالحة. يؤدي إدراج كيان تحتوي بعض حقوله الفرعية على قيمة " <code translate="no">NULL</code> " بينما تحتوي حقول أخرى على قيم صالحة إلى حدوث أخطاء.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">إضافة حقول متجهة محددة من قبل المستخدم<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">add_collection_field()</code> لإضافة حقل متجه محدد من قبل المستخدم عندما يقوم تطبيقك بإنشاء التضمينات وكتابة قيم المتجهات إلى Milvus.</p>
<p>يجب أن يكون كل حقل متجه محدد من قبل المستخدم مضافًا قابلاً للقيمة الفارغة. تحتوي الكيانات الموجودة على <code translate="no">NULL</code> للحقل المتجه الجديد حتى تقوم بكتابة قيم متجهة من خلال عملية upsert أو سير عمل backfill. يمكن للكيانات الجديدة تضمين الحقل المتجه أثناء الإدراج. يتخطى البحث المتجه الكيانات التي تكون قيمة متجهها <code translate="no">NULL</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">الحقول القابلة للقيمة الفارغة</a>.</p>
<p><strong>مثال: إضافة حقل متجه قابل للقيمة الفارغة</strong></p>
<p>يضيف المثال التالي حقل متجه كثيف قابل للقيمة الفارغة باسم <code translate="no">embedding_v2</code> إلى مجموعة موجودة. اضبط <code translate="no">dim</code> على أبعاد التضمينات التي أنشأها تطبيقك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة الحقل، قم بإنشاء فهرس على حقل المتجه الجديد قبل البحث فيه:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>تحتوي الكيانات الموجودة على القيمة « <code translate="no">NULL</code> » لقيمة « <code translate="no">embedding_v2</code> » ويتم تخطيها عند البحث في هذا الحقل. لجعل الكيانات الموجودة قابلة للبحث من خلال « <code translate="no">embedding_v2</code> »، اكتب قيم متجهة غير فارغة (non-NULL) من خلال عملية «upsert» أو سير عمل «backfill». يمكن أن تتضمن الكيانات الجديدة القيمة « <code translate="no">embedding_v2</code> » أثناء الإدراج.</p>
<h3 id="Add-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">إضافة حقول متجهة تم إنشاؤها بواسطة الدوال<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم سير العمل هذا عندما يتعين على Milvus إنشاء حقل متجه جديد من البيانات المخزنة بالفعل في مجموعة موجودة. تضيف العملية عنصرين مرتبطين من المخطط:</p>
<ul>
<li><p>دالة تقرأ حقل إدخال واحد أو أكثر من الحقول الموجودة.</p></li>
<li><p>حقل إخراج متجه جديد يخزن القيم التي تم إنشاؤها بواسطة الدالة.</p></li>
</ul>
<p>على سبيل المثال، تقرأ دالة BM25 حقل « <code translate="no">VARCHAR</code> » (التصنيف) الموجود وتُنشئ حقل « <code translate="no">SPARSE_FLOAT_VECTOR</code> » (التصنيف) للبحث المعجمي. تُنشئ دالة MinHash حقل « <code translate="no">BINARY_VECTOR</code> » (التصنيف) للكشف عن التكرارات شبه المتطابقة. لا يضيف سير العمل هذا حقل إدخال الدالة أو يستبدله.</p>
<div class="alert note">
<p>تتطلب هذه الميزة Storage V3. للاطلاع على إرشادات التمكين واعتبارات التوافق، راجع <a href="/docs/ar/storage-v3.md">Storage V3</a>.</p>
</div>
<p>تتطلب إضافة دالة وحقل المتجه الذي تم إنشاؤه إلى مجموعة موجودة أيضًا ضغط إصدار المخطط وضغط إصدار التخزين. يرفض Milvus الطلب إذا تم تعطيل أي من الإعدادين. تنطبق هذه المتطلبات الأساسية الإضافية فقط عند تعديل مجموعة موجودة؛ ولا يستخدم تعريف الدالة في مخطط المجموعة الأولي سير العمل هذا الخاص بملء البيانات الموجودة.</p>
<p>تحدد الدالة المدعومة نوع حقل المتجهات الذي تم إنشاؤه:</p>
<table>
<thead>
<tr><th>الدالة</th><th>نوع الحقل المتجه الناتج</th><th>حقل الإدخال النموذجي</th><th>حالة الاستخدام النموذجية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>مجال " <code translate="no">VARCHAR</code> " مع تمكين المحلل</td><td>البحث اللغوي وملاءمة الكلمات المفتاحية</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>حقل " <code translate="no">VARCHAR</code> "</td><td>الكشف عن التكرارات شبه المتطابقة</td></tr>
</tbody>
</table>
<p>للحصول على تفاصيل حول كيفية عمل كل دالة، راجع <a href="/docs/ar/bm25-function.md">دالة BM25</a> <a href="/docs/ar/minhash-function.md">ودالة MinHash</a>.</p>
<p>يجب ألا يكون حقل المتجه الذي تم إنشاؤه موجودًا بالفعل في المجموعة، ولا يمكن أن يكون قابلاً للقيمة الفارغة. يجب أن يكون حقل إدخال الوظيفة موجودًا بالفعل.</p>
<p><strong>مثال: إضافة حقل متجه متفرق تم إنشاؤه بواسطة BM25 للبحث المعجمي</strong></p>
<p>يضيف المثال التالي دالة BM25 باسم <code translate="no">text_bm25</code> وحقل متجه متفرق تم إنشاؤه باسم <code translate="no">text_sparse</code> إلى مجموعة موجودة بالفعل. يجب أن تحتوي المجموعة بالفعل على حقل <code translate="no">VARCHAR</code> باسم <code translate="no">text</code> مع تمكين المحلل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة دالة BM25 والحقل الذي تم إنشاؤه، قم بإنشاء فهرس على حقل المتجهات المتفرقة قبل استخدامه للبحث باستخدام BM25:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>من الناحية النظرية، تضيف هذه العملية تعريفات الحقول والدوال التالية:</p>
<pre><code translate="no" class="language-plaintext">New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

New function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>بعد نجاح الطلب، تُرجع <code translate="no">describe_collection()</code> كلاً من حقل المتجه الجديد <code translate="no">text_sparse</code> ووظيفة <code translate="no">text_bm25</code> في مخطط المجموعة. يقوم Milvus بإنشاء مخرجات الوظيفة للكيانات الجديدة فور كتابتها. بالنسبة للكيانات الموجودة، يقوم Milvus بتعبئة حقل المتجهات الذي تم إنشاؤه بشكل غير متزامن من خلال عملية الضغط في الخلفية. تؤكد رؤية المخطط نجاح تحديث المخطط، ولكنها لا تشير إلى اكتمال عملية التعبئة لكل كيان موجود. للاطلاع على سير عمل البحث BM25 الكامل، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p>
<p>يدعم Milvus أيضًا حقول المتجهات الثنائية التي تم إنشاؤها بواسطة MinHash للكشف عن التكرارات شبه المتطابقة. تستخدم دالة MinHash دالة " <code translate="no">FunctionType.MINHASH</code> " وتكتب إلى حقل إخراج جديد " <code translate="no">BINARY_VECTOR</code> ". للحصول على تفاصيل التكوين، راجع <a href="/docs/ar/minhash-function.md">دالة MinHash</a>.</p>
<h2 id="Drop-fields-from-an-existing-collection" class="common-anchor-header">إزالة الحقول من مجموعة موجودة<button data-href="#Drop-fields-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إزالة الحقول من مجموعة موجودة بطريقتين. قم بإزالة الحقول القياسية أو المتجهة المعرفة من قبل المستخدم مباشرةً عندما لا تكون جزءًا من نموذج مجموعتك بعد الآن. قم بإزالة الحقول المتجهة التي تم إنشاؤها بواسطة الدوال عن طريق إزالة الدالة التي أنشأتها.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">إزالة الحقول المعرفة من قبل المستخدم<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم الأمر « <code translate="no">drop_collection_field()</code> » لإزالة حقل سكالي أو متجه أو StructArray محدد من قبل المستخدم لم يعد جزءًا من نموذج المجموعة الخاص بك.</p>
<p>يؤدي حذف الحقل أولاً إلى تغيير مخطط المجموعة ووضوح الحقل:</p>
<ul>
<li><p>بعد نجاح الأمر ` <code translate="no">drop_collection_field()</code> `، يتم تحديث مخطط المجموعة: لم يعد الأمر ` <code translate="no">describe_collection()</code> ` يُرجع الحقل الذي تم حذفه، ولم يعد بإمكان الاستعلامات أو عمليات البحث إرجاع الحقل في ` <code translate="no">output_fields</code> ` أو استخدامه في التعبيرات.</p></li>
<li><p>يتم تنظيف الفهارس التي تم إنشاؤها على الحقل الذي تم حذفه كجزء من تحديث المخطط.</p></li>
</ul>
<p>تتم معالجة تنظيف مساحة التخزين بشكل منفصل عن تنظيف المخطط. للحصول على التفاصيل، راجع <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">متى يتم استرداد مساحة التخزين بعد حذف حقل؟</a>.</p>
<p><strong>مثال: حذف حقل قياسي محدد من قبل المستخدم</strong></p>
<p>يفترض المثال التالي أن « <code translate="no">experiment_tag</code> » هو حقل سكالي معرّف من قبل المستخدم في « <code translate="no">product_catalog</code> »، ويقوم بإزالته من المجموعة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حذف الحقل، يمكنك استدعاء <code translate="no">describe_collection()</code> للتحقق من أن الحقل لم يعد جزءًا من المخطط.</p>
<p><strong>مثال: حذف حقل StructArray</strong></p>
<p>يفترض المثال التالي أن <code translate="no">chunks</code> هو حقل StructArray في <code translate="no">my_collection</code> ، ويقوم بحذفه من المجموعة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>مثال: حذف حقل متجه محدد من قبل المستخدم</strong></p>
<p>يمكنك حذف حقل متجه باستخدام نفس طريقة <code translate="no">drop_collection_field()</code> ، ولكن يجب أن تظل المجموعة تحتوي على حقل متجه واحد على الأقل بعد الحذف. وهذا مفيد للمجموعات التي تحمل مؤقتًا تمثيلات متجهة متعددة ثم يتم توحيدها لاحقًا على أحدها.</p>
<p>يفترض المثال التالي أن <code translate="no">image_vector</code> هو حقل متجه محدد من قبل المستخدم في <code translate="no">hybrid_catalog</code> ، وأن المجموعة لا تزال تحتفظ بحقل متجه آخر، مثل <code translate="no">text_vector</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>إذا كان <code translate="no">image_vector</code> هو الحقل المتجه الأخير في المجموعة، فسيتم رفض عملية الحذف.</p>
<h3 id="Drop-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">إزالة الحقول المتجهة التي تم إنشاؤها بواسطة الدوال<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم هذه العملية عندما لا تعود بحاجة إلى حقل متجه تم إنشاؤه بواسطة دالة، مثل حقل متجه متفرق تم إنشاؤه بواسطة BM25.</p>
<p>لإزالة حقل متجه تم إنشاؤه، استدعِ <code translate="no">drop_collection_function()</code> على الدالة التي أنشأته. في سير العمل هذا، يقوم Milvus بإزالة الدالة من مخطط المجموعة كما يزيل حقول الإخراج المتجهة التي أنشأتها.</p>
<p>لا تستدعِ ` <code translate="no">drop_collection_field()</code> ` على حقل إدخال الدالة أو حقل إخراج الدالة. إذا كان الحقل المستهدف هو حقل إخراج الدالة، فاستدعِ ` <code translate="no">drop_collection_function()</code> ` بدلاً من ذلك. يتم الاحتفاظ بحقول إدخال الدالة بعد حذف الدالة.</p>
<p><strong>مثال: حذف دالة BM25 والحقل الذي أنشأته</strong></p>
<p>يفترض المثال التالي أن الدالة <code translate="no">text_bm25</code> هي دالة BM25 في <code translate="no">product_catalog</code> وتُنشئ حقل إخراج متجه متفرق يُسمى <code translate="no">text_sparse</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_function(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد نجاح العملية، لا تعود <code translate="no">describe_collection()</code> تُرجع الدالة التي تم حذفها أو حقول الإخراج التي تم إنشاؤها. تظل حقول إدخال الدالة موجودة في المخطط.</p>
<p>إذا كانت إزالة حقول إخراج الدالة ستؤدي إلى ترك المجموعة بدون أي حقل متجه، فسيتم رفض العملية.</p>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-add-field-method-should-I-use" class="common-anchor-header">ما هي طريقة إضافة الحقل التي يجب أن أستخدمها؟<button data-href="#Which-add-field-method-should-I-use" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">add_collection_field()</code> لإضافة حقل قياسي محدد من قبل المستخدم عندما يوفر تطبيقك قيمًا قياسية للتصفية أو إخراج الاستعلام أو منطق التطبيق.</p>
<p>استخدم <code translate="no">add_collection_struct_field()</code> لإضافة حقل StructArray عندما تحتاج إلى حقل مصفوفة تشترك عناصره في نفس مخطط Struct.</p>
<p>استخدم <code translate="no">add_collection_field()</code> لإضافة حقل متجه محدد من قبل المستخدم عندما يقوم تطبيقك بإنشاء تضمينات وكتابة قيم متجهة إلى Milvus.</p>
<p>استخدم سير عمل «generated-vector-field» عندما يتعين على Milvus إنتاج قيم متجهة من الحقول الموجودة. يوضح هذا الدليل مسار BM25 باستخدام « <code translate="no">add_function_field()</code> » للبحث اللغوي. يدعم Milvus أيضًا الحقول المتجهة الثنائية التي تم إنشاؤها بواسطة MinHash للكشف عن التكرارات شبه المتطابقة.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">لماذا يجب أن تكون الحقول المحددة من قبل المستخدم قابلة للقيمة الفارغة؟<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>تم إدراج الكيانات الموجودة قبل وجود الحقل الجديد، لذا فهي لا تحتوي على قيم لهذا الحقل. يتيح تعيين <code translate="no">nullable=True</code> لـ Milvus تمثيل القيمة المفقودة على أنها <code translate="no">NULL</code> حتى يقوم تطبيقك بكتابة قيمة أو، بالنسبة للحقول القياسية، حتى يتم تطبيق قيمة افتراضية.</p>
<p>تنطبق هذه القاعدة على الحقول القياسية المحددة من قبل المستخدم والحقول المتجهة المحددة من قبل المستخدم التي تمت إضافتها باستخدام <code translate="no">add_collection_field()</code> ، وعلى حقول StructArray التي تمت إضافتها باستخدام <code translate="no">add_collection_struct_field()</code>. ولا تنطبق على الحقول المتجهة التي تم إنشاؤها بواسطة الدوال، والتي لا يمكن أن تكون قابلة للقيمة الفارغة.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">ماذا يحدث للكيانات الموجودة بعد إضافة حقل محدد من قبل المستخدم؟<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للحقل القياسي المحدد من قبل المستخدم، تُرجع الكيانات الموجودة القيمة <code translate="no">NULL</code> ما لم تقم بتعيين <code translate="no">default_value</code>. إذا قمت بتعيين <code translate="no">default_value</code> ، فإن الكيانات الموجودة تُرجع تلك القيمة الافتراضية.</p>
<p>بالنسبة لحقل متجه محدد من قبل المستخدم، فإن الكيانات الموجودة تحتوي على القيمة " <code translate="no">NULL</code> " للحقل المتجه الجديد. يتخطى البحث المتجه في الحقل المضاف الكيانات التي تكون قيمة متجهها " <code translate="no">NULL</code>". لجعل الكيانات الموجودة قابلة للبحث من خلال الحقل المتجه الجديد، اكتب قيم متجهة غير فارغة (non-NULL) من خلال عملية upsert أو سير عمل backfill. يمكن للكيانات الجديدة تضمين الحقل المتجه الجديد أثناء الإدراج.</p>
<p>بالنسبة لحقل StructArray، تُرجع الكيانات الموجودة القيمة <code translate="no">NULL</code> للحقل StructArray الجديد عبر جميع حقوله الفرعية. يجب أن توفر الكيانات الجديدة إما القيمة <code translate="no">NULL</code> لجميع الحقول الفرعية أو قيمًا صالحة لجميع الحقول الفرعية.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">هل يمكنني إضافة البحث اللغوي BM25 إلى مجموعة موجودة؟<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. إذا كانت المجموعة تحتوي بالفعل على حقل <code translate="no">VARCHAR</code> مع تمكين المحلل، فيمكنك إضافة حقل متجه متفرق تم إنشاؤه بواسطة BM25 للبحث اللغوي. في سير العمل هذا، يضيف Milvus حقل الإخراج الجديد <code translate="no">SPARSE_FLOAT_VECTOR</code> ووظيفة BM25 التي تولد قيمًا له. لا يمكنك استخدام حقل « <code translate="no">TEXT</code> » موجود مسبقًا كمدخل لـ BM25 في سير العمل هذا الذي يتضمن تغيير المخطط. لاستخدام مدخل « <code translate="no">TEXT</code> »، قم بتعريف الحقل ووظيفة BM25 عند إنشاء المجموعة.</p>
<p>بعد إضافة حقل المتجه المتفرق الذي تم إنشاؤه بواسطة BM25، قم بإنشاء فهرس <code translate="no">SPARSE_INVERTED_INDEX</code> باستخدام <code translate="no">metric_type=&quot;BM25&quot;</code> قبل استخدام الحقل للبحث باستخدام BM25.</p>
<h3 id="Can-I-drop-a-vector-field-generated-by-a-function-directly" class="common-anchor-header">هل يمكنني حذف حقل متجه تم إنشاؤه بواسطة دالة مباشرةً؟<button data-href="#Can-I-drop-a-vector-field-generated-by-a-function-directly" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. يُعد الحقل المتجه الذي تم إنشاؤه بواسطة دالة جزءًا من عقد مخطط تلك الدالة. استخدم " <code translate="no">drop_collection_function()</code> " بدلاً من ذلك. في سير عمل تغيير المخطط هذا، يقوم Milvus بإزالة الدالة وحقول الإخراج المتجهة التي تم إنشاؤها معها، مع الاحتفاظ بحقول الإدخال.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">هل أحتاج إلى الانتظار بعد تعديل مخطط المجموعة؟<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>عادةً، لا يلزم الانتظار يدويًّا. إذا كانت العملية التالية تعتمد على المخطط المحدَّث، فيمكنك استدعاء <code translate="no">describe_collection()</code> أولاً للتأكد من المخطط الذي يعرضه Milvus حاليًّا.</p>
<p>في النشر الموزع، قد تكون هناك فترة انتشار قصيرة أثناء قيام مكونات Milvus بتحديث بيانات تعريف المجموعة. إذا فشلت عملية تتم مباشرة بعد تغيير المخطط بسبب خطأ متعلق بالمخطط، فقم بتحديث المخطط وأعد محاولة العملية.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">متى يتم استرداد مساحة التخزين بعد حذف حقل؟<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>يؤدي حذف حقل ما إلى إزالته من المخطط الحالي وإخفائه عن الاستعلامات/عمليات البحث العادية، ولكن البيانات التاريخية لهذا الحقل لا تُحذف فعليًّا من تخزين الكائنات على الفور.</p>
<p>يمكن استعادة مساحة التخزين لاحقًا أثناء عملية الضغط. عملية الضغط هي عملية تتم في الخلفية تعيد تنظيم ملفات البيانات الموجودة إلى ملفات جديدة أكثر إحكامًا. بعد حذف حقل ما، تتبع الملفات المضغوطة حديثًا المخطط الحالي وتستبعد الحقل المحذوف. لا يضمن Milvus تقليل مساحة التخزين فورًا أو في وقت محدد بعد حذف حقل ما.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">ماذا يحدث إذا أضفت حقلًا عدديًا يحمل نفس اسم مفتاح حقل ديناميكي؟<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا تم تمكين الحقل الديناميكي، فيمكنك إضافة حقل قياسي يحمل نفس اسم مفتاح حقل ديناميكي موجود. يقوم الحقل القياسي الجديد بإخفاء مفتاح الحقل الديناميكي في ناتج الاستعلام العادي، ولكن يتم الاحتفاظ بالبيانات الديناميكية الأصلية في <code translate="no">$meta</code>.</p>
<p>على سبيل المثال، إذا كانت الكيانات الموجودة تخزن مفتاحًا ديناميكيًا باسم <code translate="no">source</code> ، وقمت لاحقًا بإضافة حقل قياسي باسم <code translate="no">source</code> ، فإن الناتج العادي لـ <code translate="no">source</code> يشير إلى الحقل القياسي. للوصول إلى القيمة الديناميكية الأصلية، استخدم صيغة المسار <code translate="no">$meta</code> ، مثل <code translate="no">$meta[&quot;source&quot;]</code>.</p>
