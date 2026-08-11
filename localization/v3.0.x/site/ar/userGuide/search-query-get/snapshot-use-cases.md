---
id: snapshot-use-cases.md
title: حالات استخدام اللقطاتCompatible with Milvus 3.0.x
summary: في هذا الدليل، ستجد حالات الاستخدام الشائعة للقطات.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">حالات استخدام اللقطات<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>ستجد في هذا الدليل حالات الاستخدام الشائعة للقطات.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">النسخ الاحتياطي للبيانات واستعادتها<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>اللقطات هي صور سريعة للبيانات في وقت معين، وهي مناسبة للرجوع السريع إلى حالة سابقة أو للاختبار (من أيام إلى أسابيع). وفي الوقت نفسه، فإن النسخ الاحتياطية هي نسخ مستقلة وكاملة يتم تخزينها بشكل منفصل من أجل الاستعادة بعد الكوارث على المدى الطويل (من أسابيع إلى سنوات) ولتوفير حماية أفضل ضد الفشل الكامل للتخزين.</p>
<p>يقارن الجدول التالي بين اللقطات والنسخ الاحتياطية.</p>
<table>
   <tr>
     <th></th>
     <th><p>النسخ الاحتياطي</p></th>
     <th><p>اللقطة</p></th>
   </tr>
   <tr>
     <td><p>إنشاء النسخة الاحتياطية</p></td>
     <td><p>نسخ جميع ملفات البيانات (يستغرق وقتًا طويلاً)</p></td>
     <td><p>يُنشئ البيانات الوصفية فقط (في أجزاء من الألف من الثانية)</p></td>
   </tr>
   <tr>
     <td><p>الاستعادة</p></td>
     <td><p>يستورد البيانات ويعيد بناء الفهارس</p></td>
     <td><p>نسخ ملفات البيانات والفهارس الموجودة فقط</p></td>
   </tr>
   <tr>
     <td><p>الأداء</p></td>
     <td><p>بطيء ويستهلك موارد كثيرة</p></td>
     <td><p>سريع وخفيف (يستغرق من ثوانٍ إلى دقائق)</p></td>
   </tr>
   <tr>
     <td><p>التأثير على النظام</p></td>
     <td><p>استخدام مرتفع لوحدة الإدخال/الإخراج ووحدة المعالجة المركزية</p></td>
     <td><p>تأثير ضئيل</p></td>
   </tr>
</table>
<p>عادةً ما يستغرق إنشاء لقطة بضع ميلي ثوانٍ، بينما تستغرق استعادتها من ثوانٍ إلى دقائق، اعتمادًا على حجم البيانات.</p>
<p>لمزيد من التفاصيل حول حدود اللقطات والقيود وتأثيراتها على النظام، راجع " <a href="/docs/ar/snapshots.md">اللقطات</a>".</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">معالجة البيانات باستخدام المجموعات الخارجية<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن أن توفر اللقطات مصادر مستقرة في وقت محدد لأحمال العمل التحليلية أو الخاصة بالتحقق من الصحة. بالنسبة للقطات Milvus، استخدم تنسيق المجموعة الخارجية " <code translate="no">milvus-table</code> " بدلاً من قراءة ملفات اللقطات مباشرةً كمدخلات Spark عامة. تخزن اللقطة من Milvus بيانات تعريف المجموعة، وقوائم الشرائح، وسجلات الحذف، وإحصائيات المفتاح الأساسي، لذا يحتاج Milvus إلى بيانات تعريف اللقطة بتنسيق JSON وقارئ <code translate="no">milvus-table</code> للحفاظ على المخطط الصحيح ودلالات الحذف.</p>
<p>ينشئ سير العمل هذا مجموعة خارجية قابلة للاستعلام عنها على بيانات اللقطة. تظل بيانات العمود الرئيسي مرجعية من مصدر اللقطة، ويقوم التحديث بتعيين قوائم بيانات StorageV3 المصدر إلى المقاطع الخارجية المستهدفة.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">الخطوة 1: الحصول على مسار بيانات تعريف اللقطة<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء لقطة أو اختيارها من مجموعة Milvus عادية، ثم قم بوصفها للحصول على موقع تخزين الكائنات الخاص بها.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">الخطوة 2: إنشاء مجموعة خارجية من نوع « <code translate="no">milvus-table</code> » وتحديثها<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء مجموعة خارجية يتطابق مخططها مع مجموعة مصدر اللقطة. اضبط « <code translate="no">external_spec.format</code> » على « <code translate="no">&quot;milvus-table&quot;</code> »، واضبط « <code translate="no">external_field</code> » لكل حقل بيانات هدف على اسم الحقل المصدر المقابل.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>بعد اكتمال التحديث، يمكنك إنشاء فهارس، وتحميل المجموعة الخارجية، وتشغيل عمليات البحث أو الاستعلام على طريقة العرض المدعومة باللقطة.</p>
