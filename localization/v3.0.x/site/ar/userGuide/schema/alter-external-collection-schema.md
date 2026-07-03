---
id: alter-external-collection-schema.md
title: تعديل مخطط المجموعة الخارجيةCompatible with Milvus 3.0.x
summary: >-
  تعرف على كيفية عرض حقل إضافي من مصدر بيانات خارجي في مجموعة خارجية موجودة
  بالفعل.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">تعديل مخطط المجموعة الخارجية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>غالبًا ما تتطور مصادر البيانات الخارجية بعد إنشاء مجموعة خارجية. على سبيل المثال، قد تتضمن جدول Lakehouse الذي يخزن بالفعل التضمينات في وقت لاحق حقلًا عدديًا جديدًا، مثل النتيجة أو الفئة أو الطابع الزمني، الذي تريد إرجاعه في نتائج الاستعلام أو استخدامه في عوامل التصفية.</p>
<p>بدلاً من إعادة إنشاء المجموعة الخارجية أو نسخ البيانات المصدر إلى Milvus، أضف حقل Milvus يرتبط بالحقل الموجود في مصدر البيانات الخارجي. بعد إضافة الحقل، قم بتحديث المجموعة الخارجية حتى يمكن استخدام الحقل الجديد في الاستعلامات وعمليات البحث.</p>
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
    </button></h2><ul>
<li><p>تدعم المجموعات الخارجية حاليًا إضافة الحقول بعد إنشائها. ولا يتم دعم التغييرات الأخرى في المخطط، مثل حذف الحقول، أو إعادة تسمية الحقول، أو تغيير أنواع بيانات الحقول، أو تغيير أبعاد المتجهات، أو إعادة تعيين <code translate="no">external_field</code>.</p></li>
<li><p>يمكنك فقط إضافة حقل موجود بالفعل في مصدر البيانات الخارجي. تعمل هذه العملية على ربط حقل خارجي موجود بحقل في Milvus. ولا تؤدي إلى إنشاء حقل جديد في مصدر البيانات الخارجي أو ملء البيانات المصدر بأثر رجعي.</p></li>
<li><p>لا يتم دعم إضافة حقول <code translate="no">SPARSE_FLOAT_VECTOR</code> إلى مجموعة خارجية موجودة.</p></li>
<li><p>لا يتم دعم إضافة حقول StructArray إلى مجموعة خارجية موجودة. إذا كانت مجموعتك الخارجية تحتاج إلى حقل StructArray، فقم بتعريفه في مخطط المجموعة عند إنشاء المجموعة.</p></li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">إضافة حقل<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل إضافة حقل إلى مجموعة خارجية، تحقق من أن الحقل موجود بالفعل في مصدر البيانات الخارجي. ثم استدعِ ` <code translate="no">add_collection_field()</code> ` لعرض هذا الحقل في Milvus عن طريق تعيين ` <code translate="no">external_field</code> ` إلى اسم الحقل في مصدر البيانات الخارجي. عيّن ` <code translate="no">data_type</code> ` إلى نوع بيانات Milvus الذي يطابق الحقل في مصدر البيانات الخارجي. على سبيل المثال، إذا كان الحقل المُعيّن يخزن قيمًا ذات دقة مزدوجة، فاستخدم ` <code translate="no">DataType.DOUBLE</code>`.</p>
<p>على عكس المجموعات المُدارة، تُقرأ قيم الحقل المضاف من مصدر البيانات الخارجي بعد تحديث المجموعة الخارجية.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">إضافة حقل قياسي<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">add_collection_field()</code> لإضافة حقل قياسي عندما تريد إرجاع الحقل في نتائج الاستعلام أو استخدامه في عوامل التصفية. يضيف المثال التالي حقل <code translate="no">score</code> الذي يتم تعيينه إلى الحقل <code translate="no">score</code> في مصدر البيانات الخارجي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يُعد « <code translate="no">score</code> » اسم الحقل في Milvus، ويقوم « <code translate="no">external_field=&quot;score&quot;</code> » بربطه بحقل « <code translate="no">score</code> » في مصدر البيانات الخارجي. قم بتعيين « <code translate="no">nullable=True</code> » لأن الحقل يُضاف بعد إنشاء المجموعة بالفعل.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">إضافة حقل متجه<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك أيضًا إضافة حقل متجه إذا كان مصدر البيانات الخارجي يحتوي بالفعل على قيم متجهة. قم بتعيين المتجه <code translate="no">data_type</code> و <code translate="no">dim</code> بحيث يتطابقان مع الحقل المتجه في مصدر البيانات الخارجي.</p>
<p>يضيف المثال التالي حقل متجه كثيفًا باسم <code translate="no">image_embedding_v2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت تخطط لتشغيل البحث المتجه على الحقل المتجه المضاف، فأنشئ فهرسًا للحقل قبل تحديث المجموعة الخارجية.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">تحديث المجموعة الخارجية<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تعديل مخطط المجموعة الخارجية، قم بتحديث المجموعة الخارجية حتى يقوم Milvus بتحديث بيانات تعريف المجموعة الخارجية وتفعيل تغيير المخطط في نتائج الاستعلام والبحث والتصفية.</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
