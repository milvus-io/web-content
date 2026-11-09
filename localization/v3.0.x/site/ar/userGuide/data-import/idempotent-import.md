---
id: idempotent-import.md
order: 2
title: الاستيراد الجماعي المتكرر
summary: >-
  أرسل مفتاحًا للتكرار حتى تؤدي إعادة محاولة الاستيراد الجماعي إلى استئناف
  المهمة الأصلية بدلاً من إنشاء مهمة ثانية.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">الاستيراد الجماعي المتكرر<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>قد ينجح طلب الاستيراد المجمّع في حين تُفقد استجابته: قد تنتهي مهلة الاستدعاء، أو ينقطع الاتصال، أو يتوقف المنسق عن العمل قبل أن يحفظ <code translate="no">jobId</code> المُرجع. لا يمكنك التمييز بين "لم يكتمل" و"اكتمل، لكن الاستجابة فُقدت". تؤدي إعادة المحاولة إلى بدء مهمة ثانية، ويُدرج كل صف مرتين؛ أما عدم إعادة المحاولة فقد يؤدي إلى فقدان عملية الاستيراد.</p>
<p>مفتاح التكرار يزيل هذا الاختيار. قم بوضع علامة على الطلب بمفتاح، وستؤدي إعادة المحاولة التي تحمل نفس المفتاح إلى إرجاع <code translate="no">jobId</code> الأصلي بدلاً من إنشاء مهمة ثانية.</p>
<p>يتطلب الاستيراد المجمع المتكافئ إصدار Milvus 3.0.2 أو أحدث، أو 2.6.24 أو أحدث في سلسلة الإصدارات 2.6. يتجاهل الخادم الأقدم الرأس، ويبدأ كل طلب، سواء تمت إعادة المحاولة أم لا، مهمة جديدة.</p>
<h2 id="Sending-the-key" class="common-anchor-header">إرسال المفتاح<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم إرسال المفتاح كرأس HTTP <code translate="no">Idempotency-Key</code> ، وليس في نص الطلب.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">&quot;Idempotency-Key&quot;</code> ؛ كما أن السلسلة النصية الأولية تعمل أيضًا. تتطلب المعلمة و إصدار pymilvus v3.0.3 أو أحدث في سلسلة الإصدارات 3.x، أو v2.6.18 أو أحدث في سلسلة الإصدارات 2.6. في إصدارات pymilvus الأقدم، يفشل السطر أعلاه مع ظهور خطأ « » عند البحث عن ، كما أن تمرير إلى يؤدي إلى سلوك غير محدد — فقد ينتج عن الاستدعاء خطأ، أو قد يتم إرسال الاستيراد بدون المفتاح. <code translate="no">headers</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">import</code> <code translate="no">ImportError</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">headers</code> <code translate="no">bulk_import</code> </p>
<p>قم باستقصاء <code translate="no">/v2/vectordb/jobs/import/describe</code> باستخدام <code translate="no">jobId</code> الذي تم إرجاعه كالمعتاد. أي محاولة إعادة تصل بينما لا تزال المحاولة الأصلية قيد التسجيل تنتظرها، لذا لا تلاحظ محاولة إعادة أبدًا مهمة نصف مسجلة.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">اختيار مفتاح<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>مفتاح واحد لكل طلب منطقي.</strong> قم بتسمية وحدة العمل، مثل <code translate="no">orders-2026-09-07-batch-3</code> ، أو قم بإنشاء معرّف فريد (UUID) وقم بتخزينه مع عنصر العمل قبل إرسال الطلب. قم بتضمين رقم المحاولة إذا كنت قد تحتاج إلى إعادة تشغيل نفس العمل.</li>
<li><strong>أعد المحاولة باستخدام نفس المفتاح.</strong> إن إنشاء مفتاح جديد عند إعادة المحاولة هو ما يؤدي إلى تكرار البيانات. الاستثناءات مذكورة في قسم <a href="#when-to-send-a-new-key">«متى ترسل مفتاحًا جديدًا</a>».</li>
<li><strong>لا تقم أبدًا بإعادة استخدام مفتاح لملفات مختلفة.</strong> لا يقارن Milvus بين الطلبين. ستسترد <code translate="no">jobId</code> الأصلي، ولن يتم استيراد الملفات الجديدة.</li>
<li><strong>اجعله قصيرًا وقابلًا للطباعة.</strong> ASCII قابل للطباعة، بحد أقصى 256 بايت افتراضيًا (<code translate="no">streaming.idempotency.maxKeyLength</code>). يتم رفض أي شيء آخر مع ظهور الخطأ <code translate="no">1100</code>.</li>
<li><strong>لا تضع أي أسرار فيه.</strong> يتم تخزين المفتاح مع بياناتك.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">مدة الاحتفاظ بالمفتاح في الذاكرة<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>يقتصر نطاق المفتاح على المجموعة من خلال معرفها الداخلي، لذا فإن إعادة تسمية المجموعة لا تؤدي إلى فشل إعادة المحاولة، طالما أن إعادة المحاولة تسمي المجموعة باسمها الجديد. يؤدي حذف المجموعة وإعادة إنشائها تحت نفس الاسم إلى فشلها، والحل الصحيح في هذه الحالة هو إنشاء مهمة جديدة.</p>
<p>يحتفظ Milvus بمفتاح الاستيراد لمدة يوم تقريبًا. اعتبر ذلك تقديرًا تقريبيًا وليس مضمونًا: فحركة DDL أو الاستيراد الكثيفة تقصر هذه المدة، بينما تؤدي إعادة تشغيل المنسق إلى إطالة هذه المدة. تؤدي إعادة المحاولة بعد نسيان المفتاح إلى بدء مهمة جديدة.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">متى يتم إرسال مفتاح جديد<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>حالتان، وحالتان فقط:</p>
<ul>
<li><strong>فشل المهمة الأصلية أو تم إيقافها.</strong> تُرجع الدالة Describe قيمة « <code translate="no">state: Failed</code> » مع سبب. تؤدي إعادة المحاولة باستخدام المفتاح نفسه إلى إرجاع نفس قيمة « <code translate="no">jobId</code> » طالما أن المفتاح لا يزال محفوظًا. قم بإصلاح السبب، ثم أرسل مفتاحًا جديدًا.</li>
<li><strong>تم مسح المهمة الأصلية.</strong> يحتفظ Milvus بالمهام المنتهية لمدة <code translate="no">dataCoord.import.taskRetention</code> (48 ساعة بشكل افتراضي). إذا انتهت هذه المدة بينما لا يزال المفتاح محفوظًا، فإن إعادة المحاولة تُرجع <code translate="no">jobId</code> القديم، وتُجيب ديسكرايب بالخطأ <code translate="no">import job does not exist</code> بدلاً من حالة المهمة. قد تكون تلك المهمة قد نجحت. تأكد من فقدان البيانات قبل إرسال مفتاح جديد.</li>
</ul>
<p>لا تُعد المحاولة المُرفوضة، على سبيل المثال بسبب بلوغ الحد الأقصى لمهام الاستيراد، إحدى هذه الحالات. أعد المحاولة لاحقًا باستخدام نفس المفتاح.</p>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>هناك أربع معلمات تحدد سلوك هذه الصفحة. ولا تحتاج أي منها إلى تغيير حتى يعمل المفتاح.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>القيمة الافتراضية</th><th>وظيفتها</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>مدة الاحتفاظ بمفتاح الاستيراد في الذاكرة. غير موجود في الإعداد الافتراضي <code translate="no">milvus.yaml</code> ؛ أضفه صراحةً لتغييره. كما يرفض نفس المخزن عمليات إرسال DDL المكررة، لذا لا تقم بتخفيض هذه القيمة لمجرد تقصير فترة الاستيراد.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>عدد المفاتيح وسجلات DDL التي يحتفظ بها نفس المخزن قبل حذف الأقدم منها، بغض النظر عن عمرها. وهذا هو ما يسمح لحركة مرور DDL أو الاستيراد الكثيفة بنسيان مفتاح قبل <code translate="no">maxLifetime</code>. غير موجود في الإعداد الافتراضي <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 ساعة) منذ الإصدارين 2.6.24 و3.0.2؛ <code translate="no">10800</code> قبل ذلك</td><td>المدة التي تظل خلالها مهمة الاستيراد المكتملة قابلة للاستعلام. اجعلها على الأقل ضعف <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>الحد الأقصى لطول المفتاح بالبايت. يتم رفض المفتاح الأطول مع ظهور الخطأ <code translate="no">1100</code>. <code translate="no">0</code> يعطل هذا الحد. غير موجود في الإعداد الافتراضي <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p>يُعيّن ملف <code translate="no">milvus.yaml</code> الذي تم توزيعه قبل الإصدارين 2.6.24 و3.0.2 القيمة <code translate="no">taskRetention: 10800</code> بشكل صريح، ولا تتجاوز عملية الترقية القيمة الموجودة في ملفك. إذا قمت بالترقية باستخدام هذا الملف، فقم بزيادة القيمة <code translate="no">taskRetention</code> إلى ضعف القيمة <code translate="no">maxLifetime</code> على الأقل. لا تنطبق القيمة الجديدة إلا على المهام التي تنتهي بعد التغيير.</p>
