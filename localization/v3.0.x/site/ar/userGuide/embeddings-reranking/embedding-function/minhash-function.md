---
id: minhash-function.md
title: دالة MinHashCompatible with Milvus 3.0.x
summary: >-
  استخدم MinHash MinHash لتحويل النص إلى متجهات ثنائية للبحث عن التشابه القائم
  على Jaccard واكتشاف التكرارات القريبة من التكرار.
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">دالة MinHash<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p>تقوم دالة <strong>MinHash</strong> بتحويل النص الخام إلى <strong>متجهات ثنائية</strong> تقارب <a href="https://en.wikipedia.org/wiki/Jaccard_index">تشابه جاكارد</a> بين المستندات. وتطبّق الدالة تجزئة النص ووظائف تجزئة متعددة لإنتاج متجهات توقيع ذات طول ثابت، مما يتيح الكشف السريع عن التكرار شبه المكرر وإلغاء تكرار المستندات على نطاق واسع.</p>
<p>وكدالة مدمجة، تعمل MinHash داخل Milvus ولا تتطلب استدلال نموذج خارجي أو معالجة مسبقة. يمكنك إدراج نص أولي، ويقوم Milvus بإنشاء متجهات توقيع MinHash تلقائيًا.</p>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>يجب أن يكون حقل الإخراج <code translate="no">BINARY_VECTOR</code> ببعد يفي <code translate="no">dim % 32 == 0</code> ، لأن كل توقيع MinHash عبارة عن قيمة تجزئة 32 بت.</p></li>
<li><p>يجب أن يكون <code translate="no">dim</code> لحقل المتجه الثنائي يساوي <code translate="no">32 * num_hashes</code>. يؤدي عدم التطابق إلى حدوث خطأ.</p></li>
<li><p>عند استخدام فهرس <code translate="no">MINHASH_LSH</code> مع مخرجات دالة MinHash، يجب تعيين <code translate="no">mh_element_bit_width</code> على <code translate="no">32</code>.</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">كيف تعمل MinHash<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>توسع لترى كيف تعمل</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> عبارة عن تقنية تجزئة حساسة للمكان تقدر <a href="https://en.wikipedia.org/wiki/Jaccard_index">تشابه جاكارد</a> بين المجموعات. في Milvus، تتبع دالة MinHash في MinHash هذا المسار: أنت تقدم نصًا خامًا كمدخل، وينتج Milvus متجهًا ثنائيًا كمخرجات - مع التعامل مع جميع الخطوات الوسيطة داخليًا.</p>
<p>يتألف سير العمل الكلي من <strong>خط معالجة نص مشترك</strong> يستخدمه كل من استيعاب المستندات ومعالجة الاستعلام، تليها عمليات خاصة بمراحل التخزين والاسترجاع.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" />
   </span> <span class="img-wrapper"> <span>Iaqkkbfefeh8oqggsx6nsocfosondo</span> </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">خط أنابيب معالجة النصوص المشتركة<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>يمرر كل من استيعاب المستندات ومعالجة الاستعلام النص الخام من خلال نفس التحويل المكون من أربع مراحل:</p>
<ol>
<li><p><strong>تحليل النص</strong>: تتم معالجة النص بواسطة <a href="/docs/ar/analyzer-overview.md">محلل</a> (عندما يكون <code translate="no">token_level</code> هو <code translate="no">&quot;word&quot;</code>) أو يستخدم مباشرة (عندما يكون <code translate="no">token_level</code> هو <code translate="no">&quot;char&quot;</code>). يطبق الترميز على مستوى الكلمة المحلل الذي تم تكوينه على حقل الإدخال لتجزئة النص إلى مصطلحات - على سبيل المثال، <code translate="no">&quot;milvus is vector db&quot;</code> يصبح <code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code>.</p></li>
<li><p><strong>التجزئة</strong>: يتم تقسيم الرموز إلى ن-غرامات متداخلة (shingles) بحجم <code translate="no">shingle_size</code>. على سبيل المثال، مع وجود 3 جرامات على مستوى الكلمة، تصبح الرموز <code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> رموزًا متداخلة مثل <code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code>.</p></li>
<li><p><strong>توليد توقيع MinHash</strong>: يتم تطبيق دوال تجزئة متعددة (H1، H2، ...، Hn، حيث n = <code translate="no">num_hashes</code>) على مجموعة التجزئة. بالنسبة لكل دالة تجزئة، يتم تحديد الحد الأدنى لقيمة التجزئة عبر جميع التجزئات. وتشكل مجموعة هذه القيم الدنيا توقيع MinHash - وهو عبارة عن تمثيل ثابت الطول يقارب تشابه جاكارد للمستند الأصلي.</p></li>
<li><p><strong>ترميز المتجه الثنائي</strong>: كل قيمة توقيع هي عبارة عن تجزئة 32 بت، ويتم تعبئة التوقيع الكامل في <code translate="no">BINARY_VECTOR</code> ذات البعد <code translate="no">32 * num_hashes</code>.</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">إدخال المستند<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>أثناء الإدراج، يتم تخزين المتجه الثنائي الناتج عن خط الأنابيب المشترك في فهرس <code translate="no">MINHASH_LSH</code>. ويحتفظ الفهرس بجدول LSH (التجزئة الحساسة للموقع) الذي يجمع التواقيع المتشابهة في نفس الدلاء، مما يتيح استرجاع سريع للمرشحين في وقت الاستعلام.</p>
<h3 id="Query-processing" class="common-anchor-header">معالجة الاستعلام<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>أثناء البحث، يمرّ نص الاستعلام عبر نفس خط الأنابيب المشترك لإنتاج متجه ثنائي. يُستخدم هذا المتجه لإجراء عملية بحث عن LSH في فهرس <code translate="no">MINHASH_LSH</code> ، والذي يحدد بسرعة الأزواج المرشحة التي من المحتمل أن تكون متشابهة. يتم بعد ذلك ترتيب المرشحين حسب تشابه جاكارد المقدر ويتم إرجاع أفضل النتائج.</p>
<p>نظرًا لأن كلا المسارين يشتركان في نفس منطق التحويل، فإن المستندين اللذين يتداخل محتواهما بشكل كبير ينتج عنهما توقيعات MinHash متشابهة. هذا يجعل الدالة فعّالة في العثور على التكرارات شبه المتشابهة حتى عندما تختلف المستندات في ترتيب الكلمات أو التنسيق أو الصياغة الثانوية.</p>
<p></details></p>
<h2 id="Before-you-start" class="common-anchor-header">قبل البدء<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل استخدام الدالة MinHash، قم بتخطيط مخطط المجموعة الخاص بك ليشمل ما يلي:</p>
<ul>
<li><p><strong>حقل نصي للمحتوى الخام</strong></p>
<p>يجب أن تتضمن مجموعتك حقلاً <code translate="no">VARCHAR</code> لتخزين النص الخام. يعمل هذا الحقل كمدخل لدالة MinHash.</p></li>
<li><p><strong>محلل لحقل النص</strong> (عند استخدام الترميز على مستوى الكلمات)</p>
<p>إذا تم تعيين <code translate="no">token_level</code> على <code translate="no">&quot;word&quot;</code> (افتراضي)، يجب أن يحتوي حقل النص على محلل ممكّن. يحدد المُحلل كيفية ترميز النص قبل التجزئة. بشكل افتراضي، يستخدم ميلفوس محلل <code translate="no">standard</code>. لتكوين محلل مختلف، راجع <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md">اختيار المحلل المناسب لحالة الاستخدام الخاصة بك</a>.</p></li>
<li><p><strong>حقل ناقل ثنائي لإخراج MinHash</strong></p>
<p>يجب أن تتضمن مجموعتك حقل <code translate="no">BINARY_VECTOR</code> لتخزين المتجهات الثنائية التي تم إنشاؤها بواسطة دالة MinHash. يجب أن يساوي البعد <code translate="no">32 * num_hashes</code>.</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">الخطوة 1: إنشاء مجموعة مع دالة MinHash MinHash<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام دالة MinHash، قم بتعريفها عند إنشاء المجموعة. تصبح الدالة جزءًا من مخطط المجموعة ويتم تطبيقها تلقائيًا أثناء إدراج البيانات والبحث عنها.</p>
<h3 id="Define-schema-fields" class="common-anchor-header">تحديد حقول المخطط<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب أن يتضمن مخطط مجموعتك ثلاثة حقول على الأقل:</p>
<ul>
<li><p><strong>الحقل الأساسي</strong>: يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p><strong>حقل نصي</strong> (<code translate="no">VARCHAR</code>): يخزن المستندات النصية الخام. قم بتعيين <code translate="no">enable_analyzer=True</code> حتى يتمكن Milvus من معالجة النص لإنشاء توقيع MinHash. بشكل افتراضي، يستخدم Milvus محلل <code translate="no">standard</code> لتحليل النص. لتكوين محلل مختلف، راجع <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md">اختيار المحلل المناسب لحالة الاستخدام الخاصة بك</a>.</p></li>
<li><p><strong>حقل المتجهات الثنائية</strong> (<code translate="no">BINARY_VECTOR</code>): يخزن المتجهات الثنائية التي يتم إنشاؤها تلقائيًا بواسطة دالة MinHash. يجب أن يساوي البعد <code translate="no">32 * num_hashes</code>.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">تعريف دالة MinHash MinHash<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>تقوم الدالة MinHash بتحويل النص الذي تم تحليله إلى متجهات ثنائية تقارب تشابه جاكارد بين المستندات.</p>
<p>عرّف الدالة وأضفها إلى مخططك:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>خيارات التكوين</strong></p>
<p>يقبل قاموس <code translate="no">params</code> الخاص بدالة MinHash المعلمات التالية. جميع أسماء المعلمات <strong>غير حساسة لحالة الأحرف</strong>.</p>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>النوع</strong></p></th>
     <th><p><strong>افتراضي</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>مشتق من <code translate="no">dim / 32</code></p></td>
     <td><p>عدد دوال التجزئة لإنشاء التوقيع. بُعد المتجه الثنائي الناتج يساوي <code translate="no">32 &ast; num_hashes</code>. تقلل القيم الأعلى من التباين في تقدير التشابه ولكنها تزيد من الحساب. موصى به: <code translate="no">256</code> (البعد = 8192).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>حجم N-غرام للتبديل. مستوى الكلمة: 1-3 نموذجي. مستوى الحرف: 2-6 نموذجي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>ش</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>دالة التجزئة المراد استخدامها. خيارات: </p><ul><li><p><code translate="no">"xxhash"</code> (سريع)</p></li><li><p><code translate="no">"sha1"</code> (أبطأ، مقاومة أعلى للتصادم).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>ش</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>مستوى الترميز. خيارات:</p><ul><li><p><code translate="no">"word"</code>:: يستخدم محلل الحقل لترميز الرموز، ثم يطبق التظليل على الرموز.</p></li><li><p><code translate="no">"char"</code> / <code translate="no">"character"</code>: يطبّق تبديل ن-غرام مباشرةً على الأحرف الخام (بدون محلل).</p><p>يوفر مستوى الكلمات دلالات أقوى وكفاءة أعلى ولكنه يعتمد على الترميز الخاص باللغة. أما مستوى الأحرف فهو لا يعتمد على اللغة ولكنه ينتج تشبيكًا ذا أبعاد أعلى مع دلالات أضعف.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>بذرة عشوائية لتهيئة دالة MinHash.</p></td>
   </tr>
</table>
<h3 id="Configure-the-index" class="common-anchor-header">تكوين الفهرس<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>نوع الفهرس الموصى به لمتجهات MinHash الثنائية هو <code translate="no">MINHASH_LSH</code> ، مع نوع القياس <code translate="no">MHJACCARD</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">إنشاء المجموعة<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء المجموعة باستخدام المخطط ومعلمات الفهرس المحددة أعلاه:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">الخطوة 2: إدراج المستندات<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إعداد مجموعتك، أدخل بيانات نصية. تحتاج فقط إلى توفير النص الخام - تقوم الدالة MinHash تلقائيًا بإنشاء المتجه الثنائي لكل مستند.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">الخطوة 3: البحث باستخدام MinHash<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إدخال البيانات، ابحث عن المستندات شبه المكررة من خلال توفير استعلامات نصية أولية. يقوم Milvus تلقائيًا بتحويل نص الاستعلام الخاص بك إلى متجه ثنائي MinHash ويسترجع المستندات الأكثر تشابهًا باستخدام تشابه Jaccard المقدر.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>: استخدم BM25 لترتيب الصلة المعجمية بدلاً من الكشف عن التكرار القريب.</p></li>
<li><p><a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a>: تكوين محللات مخصصة لترميز النص.</p></li>
<li><p><a href="/docs/ar/minhash-lsh.md">فهرس MINHASH_LSH</a>: تعرّف على ضبط معلمات LSH للاستدعاء والأداء.</p></li>
</ul>
