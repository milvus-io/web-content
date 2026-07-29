---
id: storage-v3.md
title: التخزين V3Compatible with Milvus 3.0.x
summary: >-
  تعرف على ميزات Milvus 3.0 التي تتطلب استخدام Storage V3، وكيفية تفعيلها،
  والقيود المتعلقة بالتوافق التي تنطبق عليها.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">التخزين V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>غالبًا ما تتطور مجموعات بيانات الذكاء الاصطناعي بعد إنشاء المجموعة. مع تغير النماذج وسير العمل، قد تحتاج الفرق إلى إضافة نص، أو إنشاء حقول متجهة جديدة للكيانات الموجودة، أو استخدام البيانات المخزنة خارج Milvus. يتطلب دعم سير العمل هذا نموذج تخزين يمكنه التطور مع مجموعة البيانات.</p>
<p>يوفر التخزين V3 هذا النموذج في Milvus 3.0. ويستخدم تخطيط تخزين مُصنف حسب الإصدار لدمج البيانات المضافة أو المعاد كتابتها بمرور الوقت، بينما تستمر التطبيقات في الوصول إلى المجموعات من خلال واجهات برمجة تطبيقات Milvus نفسها.</p>
<p>يتم تعطيل التخزين V3 افتراضيًا. بعد تفعيل « <code translate="no">common.storage.useLoonFFI</code> »، تستخدم عمليات الكتابة الجديدة ومخرجات الضغط التخزين V3. تظل البيانات الموجودة في تخطيطها الحالي حتى تتم إعادة كتابة البيانات المؤهلة بواسطة عملية الضغط في الخلفية. يمكن لـ Milvus قراءة كلا التخطيطين خلال هذه المرحلة الانتقالية. قم بتمكين التخزين V3 لاستخدام الميزات التي تعتمد عليه، وليس كتحسين عام للأداء.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">الميزات التي تتطلب Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>الميزة</th><th>الوصف</th><th>التكوين المطلوب</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ar/text.md"><code translate="no">TEXT</code> الحقل</a></td><td>تخزين نصوص مصدر طويلة، مثل المقاطع أو المستندات أو التذاكر أو السجلات، دون تعيين طول أقصى ثابت في مخطط المجموعة.</td><td><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ar/add-fields-to-an-existing-collection.md">الحقول المتجهة التي تم إنشاؤها بواسطة الدالة</a></td><td>أضف دالة BM25 أو MinHash إلى مجموعة موجودة حتى يقوم Milvus بإنشاء حقل متجه جديد من حقل " <code translate="no">VARCHAR</code> " الموجود. يقوم Milvus بتعبئة القيم التي تم إنشاؤها للكيانات الموجودة بشكل غير متزامن من خلال عملية الضغط في الخلفية.</td><td><ul><li><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ar/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ar/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/ar/create-an-external-collection.md">المجموعات الخارجية</a></td><td>استعلام البيانات المخزنة خارج Milvus دون نسخها إلى مجموعة مُدارة. قم بتحديث المجموعة الخارجية عند تغيير البيانات المصدر. لعرض حقول مصدر إضافية، راجع <a href="/docs/ar/alter-external-collection-schema.md">«تعديل مخطط المجموعة الخارجية</a>».</td><td><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">قبل تمكين Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>بمجرد أن يقوم Milvus بكتابة البيانات في Storage V3، لا يُدعم الرجوع إلى إصدار Milvus لا يمكنه قراءة Storage V3. ولا يؤدي تعطيل Storage V3 لاحقًا إلى تحويل جميع بيانات Storage V3 الموجودة على الفور أو استعادة التوافق مع الإصدار الأقدم.</p>
</div>
<p>قبل تمكين Storage V3، ضع في اعتبارك سلوك البيانات التالي:</p>
<ul>
<li>نظرًا لأن ميزة « <code translate="no">dataCoord.compaction.storageVersion.enabled</code> » (التضغط التلقائي) ممكّنة افتراضيًا، يمكن للبيانات الحالية المؤهلة الانتقال إلى «Storage V3» تدريجيًا من خلال عملية التضغط في الخلفية.</li>
<li>يؤدي تعطيل Storage V3 إلى تغيير إصدار التخزين المستهدف لعمليات الكتابة المستقبلية ومخرجات الضغط المؤهلة. ولا يؤدي ذلك إلى تحويل جميع بيانات Storage V3 الحالية بشكل متزامن أو جعل الرجوع إلى إصدار أقدم آمنًا.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">تمكين التخزين V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>اضبط " <code translate="no">common.storage.useLoonFFI</code> " على " <code translate="no">true</code> " في تكوين Milvus الخاص بك:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>يعامل Milvus هذا الإعداد على أنه قابل للتحديث. قم بتطبيق التغيير من خلال سير عمل تحديث التكوين الذي يدعمه النشر الخاص بك. لا يضمن تحرير ملف التكوين الثابت وحده أن النشر قيد التشغيل قد تلقى القيمة الجديدة.</p>
<p>إذا كنت تخطط لإضافة دالة (Function) وحقل متجه تم إنشاؤه إلى مجموعة موجودة، فقم أيضًا بتمكين إعدادَي الضغط المطلوبين لملء الفجوات في البيانات الموجودة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم إنشاء مخرجات الدالة للكيانات الموجودة بشكل غير متزامن من خلال الضغط في الخلفية. ولا يشير نجاح تحديث المخطط إلى اكتمال عملية ملء الفجوات لكل كيان موجود.</p>
<h2 id="Related-documentation" class="common-anchor-header">الوثائق ذات الصلة<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/ar/text.md">حقل النص</a></li>
<li><a href="/docs/ar/add-fields-to-an-existing-collection.md">تعديل مخطط المجموعة</a></li>
<li><a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a></li>
<li><a href="/docs/ar/install-overview.md">نظرة عامة على خيارات نشر Milvus</a></li>
<li><a href="/docs/ar/upgrade_milvus_standalone-helm.md">ترقية Milvus المستقل باستخدام مخطط Helm</a></li>
<li><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية مجموعة Milvus باستخدام مخطط Helm</a></li>
<li><a href="/docs/ar/configure_common.md">التكوينات المتعلقة بـ common</a></li>
<li><a href="/docs/ar/configure_datacoord.md">التكوينات المتعلقة بـ dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">لماذا أنشأنا Loon: محرك تخزين لبيانات الذكاء الاصطناعي التي لا تتوقف عن التغير</a> — خلفية هندسية حول دوافع التصميم وراء Storage V3.</li>
</ul>
