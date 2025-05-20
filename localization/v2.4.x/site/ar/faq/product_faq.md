---
id: product_faq.md
summary: >-
  اعثر على إجابات للأسئلة المتداولة حول قاعدة بيانات المتجهات الأكثر تقدماً في
  العالم.
title: الأسئلة الشائعة حول المنتج
---
<h1 id="Product-FAQ" class="common-anchor-header">الأسئلة الشائعة حول المنتج<button data-href="#Product-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-much-does-Milvus-cost" class="common-anchor-header">كم تبلغ تكلفة ميلفوس؟</h4><p>ميلفوس هو مشروع مجاني مفتوح المصدر 100%.</p>
<p>يُرجى الالتزام <a href="http://www.apache.org/licenses/LICENSE-2.0">برخصة أباتشي 2.0</a> عند استخدام ميلفوس لأغراض الإنتاج أو التوزيع.</p>
<p>كما تقدم شركة Zilliz، الشركة التي تقف وراء Milvus، نسخة سحابية مُدارة بالكامل من المنصة لأولئك الذين لا يرغبون في بناء وصيانة مثيلهم الموزع الخاص بهم. تحافظ <a href="https://zilliz.com/cloud">Zilliz Cloud</a> تلقائيًا على موثوقية البيانات وتسمح للمستخدمين بالدفع مقابل ما يستخدمونه فقط.</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">هل يدعم ميلفوس البنى غير x86؟</h4><p>لا يمكن تثبيت Milvus أو تشغيله على منصات غير x86.</p>
<p>يجب أن تدعم وحدة المعالجة المركزية الخاصة بك إحدى مجموعات التعليمات التالية لتشغيل Milvus: SSE4.2، AVX، AVX2، AVX512. هذه كلها مجموعات تعليمات SIMD مخصصة ل x86.</p>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">أين يخزن ميلفوس البيانات؟</h4><p>يتعامل Milvus مع نوعين من البيانات، البيانات المدرجة والبيانات الوصفية.</p>
<p>يتم تخزين البيانات المدرجة، بما في ذلك البيانات المتجهة، والبيانات القياسية، والمخطط الخاص بالمجموعة، في وحدة تخزين ثابتة كسجل تزايدي. يدعم Milvus العديد من خلفيات تخزين الكائنات، بما في ذلك <a href="https://min.io/">MinIO</a> <a href="https://aws.amazon.com/s3/?nc1=h_ls">وAWS S3</a> <a href="https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes">وGoogle Cloud Storage</a> (GCS) <a href="https://azure.microsoft.com/en-us/products/storage/blobs">وAzure Blob Storage</a> <a href="https://www.alibabacloud.com/product/object-storage-service">وAlibaba Cloud OSS</a> <a href="https://www.tencentcloud.com/products/cos">وTencent Cloud Object Storage</a> (COS).</p>
<p>يتم إنشاء البيانات الوصفية داخل Milvus. تحتوي كل وحدة من وحدات Milvus على البيانات الوصفية الخاصة بها والتي يتم تخزينها في إلخd.</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">لماذا لا توجد بيانات متجهة في إلخd؟</h4><p>يخزن إلخd البيانات الوصفية لوحدات Milvus النمطية؛ بينما يخزن MinIO الكيانات.</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">هل يدعم ميلفوس إدراج البيانات والبحث عنها في نفس الوقت؟</h4><p>نعم. يتم التعامل مع عمليات الإدراج وعمليات الاستعلام بواسطة وحدتين منفصلتين مستقلتين عن بعضهما البعض. من وجهة نظر العميل، تكتمل عملية الإدراج عندما تدخل البيانات المدرجة في قائمة انتظار الرسائل. ومع ذلك، تكون البيانات المدرجة غير قابلة للبحث حتى يتم تحميلها إلى عقدة الاستعلام. إذا لم يصل حجم المقطع إلى عتبة بناء الفهرس (512 ميغابايت افتراضيًا)، يلجأ ميلفوس إلى البحث بالقوة الغاشمة وقد يتضاءل أداء الاستعلام.</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">هل يمكن إدراج المتجهات ذات المفاتيح الأساسية المكررة في ملفوس؟</h4><p>نعم. لا يتحقق ميلفوس مما إذا كانت المفاتيح الأساسية للمتجهات مكررة.</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">عندما يتم إدراج متجهات بمفاتيح أساسية مكررة، هل يعاملها ميلفوس كعملية تحديث؟</h4><p>لا. لا يدعم Milvus حالياً عمليات التحديث ولا يتحقق مما إذا كانت المفاتيح الأساسية للكيان مكررة. أنت مسؤول عن التأكد من أن المفاتيح الأساسية للكيان فريدة من نوعها، وإذا لم تكن كذلك فقد يحتوي Milvus على كيانات متعددة بمفاتيح أساسية مكررة.</p>
<p>في حالة حدوث ذلك، تظل نسخة البيانات التي سيتم إرجاعها عند الاستعلام عنها سلوكًا غير معروف. سيتم إصلاح هذا القيد في الإصدارات المستقبلية.</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">ما هو الحد الأقصى لطول المفاتيح الأساسية للكيانات المعرفة ذاتياً؟</h4><p>يجب أن تكون المفاتيح الأساسية للكيان أعداداً صحيحة غير سالبة 64 بت.</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">ما هو الحد الأقصى لكمية البيانات التي يمكن إضافتها لكل عملية إدراج؟</h4><p>يجب ألا يتجاوز حجم عملية الإدراج 1,024 ميغابايت. هذا حد مفروض من قبل gRPC.</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">هل يؤثر حجم المجموعة على أداء الاستعلام عند البحث في قسم معين؟</h4><p>لا، إذا تم تحديد أقسام للبحث، يبحث Milvus في الأقسام المحددة فقط.</p>
<h4 id="Does-Milvus-need-to-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">هل يحتاج Milvus إلى تحميل المجموعة بأكملها عند تحديد أقسام للبحث؟</h4><p>يعتمد ذلك على البيانات المطلوبة للبحث. يجب تحميل جميع الأقسام التي يحتمل أن تظهر في نتيجة البحث قبل البحث.</p>
<ul>
<li>على سبيل المثال، إذا كنت تريد فقط البحث في قسم (أقسام) محددة، فلن تحتاج إلى تحميل الكل. اتصل على <code translate="no">load_partition()</code> لتحميل القسم (الأقسام) المقصودة <em>ثم</em> حدد القسم (الأقسام) في استدعاء الأسلوب <code translate="no">search()</code>.</li>
<li>إذا كنت ترغب في البحث في جميع الأقسام، اتصل على <code translate="no">load_collection()</code> لتحميل المجموعة بأكملها بما في ذلك جميع الأقسام.</li>
<li>إذا فشلت في تحميل المجموعة أو قسم (أقسام) محددة قبل البحث، فسيقوم ميلفوس بإرجاع خطأ.</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">هل يمكن إنشاء فهارس بعد إدراج المتجهات؟</h4><p>نعم، إذا تم إنشاء فهرس للمجموعة من خلال <code translate="no">create_index()</code> من قبل، سيقوم Milvus تلقائيًا بإنشاء فهرس للمتجهات التي تم إدراجها لاحقًا. ومع ذلك، لا ينشئ Milvus فهرسًا حتى تملأ المتجهات المدرجة حديثًا مقطعًا كاملًا ويكون ملف الفهرس الذي تم إنشاؤه حديثًا منفصلًا عن الملف السابق.</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">كيف يختلف الفهرسان FLAT و IVF_FLAT؟</h4><p>يقسم فهرس IVF_FLAT مساحة المتجهات إلى مجموعات قوائم. في قيمة القائمة الافتراضية 16,384 قائمة، يقارن Milvus المسافات بين المتجه الهدف ومراكز جميع المجموعات الـ 16,384 لإرجاع أقرب مجموعات مسبار. ثم يقارن Milvus المسافات بين المتجه الهدف والمتجهات في المجموعات المحددة للحصول على أقرب المتجهات. على عكس IVF_FLAT، يقارن FLAT مباشرةً المسافات بين المتجه الهدف وكل متجه آخر.</p>
<p>عندما يكون العدد الإجمالي للمتجهات يساوي تقريبًا nlist، تكون المسافة بين IVF_FLAT و FLAT قليلة من حيث متطلبات الحساب وأداء البحث. ومع ذلك، عندما يتجاوز عدد المتجهات nlist بمعامل اثنين أو أكثر، يبدأ IVF_FLAT في إظهار مزايا الأداء.</p>
<p>انظر <a href="/docs/ar/v2.4.x/index.md">فهرس المتجهات</a> لمزيد من المعلومات.</p>
<h4 id="How-does-Milvus-flush-data" class="common-anchor-header">كيف يقوم ميلفوس بمسح البيانات؟</h4><p>يُرجع Milvus النجاح عندما يتم إدخال البيانات المدرجة في قائمة انتظار الرسائل. ومع ذلك، لا يتم مسح البيانات بعد إلى القرص. ثم تقوم عقدة بيانات Milvus بكتابة البيانات الموجودة في قائمة انتظار الرسائل إلى التخزين الدائم كسجلات تزايديّة. إذا تم استدعاء <code translate="no">flush()</code> ، يتم إجبار عقدة البيانات على كتابة جميع البيانات في قائمة انتظار الرسائل إلى التخزين الدائم على الفور.</p>
<h4 id="What-is-normalization-Why-is-normalization-needed" class="common-anchor-header">ما هو التطبيع؟ لماذا التطبيع مطلوب؟</h4><p>يشير التطبيع إلى عملية تحويل المتجه بحيث يساوي معياره 1. إذا تم استخدام حاصل الضرب الداخلي لحساب تشابه المتجهات، فيجب تطبيع المتجهات. بعد التطبيع، يساوي حاصل الضرب الداخلي تشابه جيب التمام.</p>
<p>راجع <a href="https://en.wikipedia.org/wiki/Unit_vector">ويكيبيديا</a> لمزيد من المعلومات.</p>
<h4 id="Why-do-Euclidean-distance-L2-and-inner-product-IP-return-different-results" class="common-anchor-header">لماذا تعطي المسافة الإقليدية (L2) والضرب الداخلي (IP) نتائج مختلفة؟</h4><p>بالنسبة للمتجهات المطبعة، تكون المسافة الإقليدية (L2) مكافئة رياضيًا للضرب الداخلي (IP). إذا كانت مقاييس التشابه هذه تعطي نتائج مختلفة، فتحقق مما إذا كانت المتجهات لديك طبيعية</p>
<h4 id="Is-there-a-limit-to-the-total-number-of-collections-and-partitions-in-Milvus" class="common-anchor-header">هل هناك حد للعدد الإجمالي للمجموعات والأقسام في Milvus؟</h4><p>نعم، يمكنك إنشاء ما يصل إلى 65,535 مجموعة في مثيل Milvus. عند حساب عدد المجموعات الموجودة، تحسب Milvus جميع المجموعات التي تحتوي على أجزاء وأقسام فيها.</p>
<p>على سبيل المثال، لنفترض أنك قمت بالفعل بإنشاء 100 مجموعة، مع وجود جزأين و4 أقسام في 60 منها وجزء واحد و12 قسمًا في المجموعات ال 40 المتبقية. يمكن حساب العدد الحالي للمجموعات على النحو التالي:</p>
<pre><code translate="no">60 * 2 * 4 + 40 * 1 * 12 = 960
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors" class="common-anchor-header">لماذا أحصل على أقل من k ناقلات عند البحث عن <code translate="no">topk</code> ناقلات؟</h4><p>من بين الفهارس التي يدعمها Milvus، يقوم IVF_FLAT و IVF_SQ8 بتنفيذ طريقة التجميع k-means. يتم تقسيم مساحة البيانات إلى <code translate="no">nlist</code> مجموعات ويتم توزيع المتجهات المدرجة على هذه المجموعات. ثم تختار Milvus بعد ذلك أقرب <code translate="no">nprobe</code> من المجموعات وتقارن المسافات بين المتجه الهدف وجميع المتجهات في المجموعات المختارة لإرجاع النتائج النهائية.</p>
<p>إذا كانت <code translate="no">nlist</code> و <code translate="no">topk</code> كبيرة و nprobe صغيرة، فقد يكون عدد المتجهات في مجموعات nprobe أقل من <code translate="no">k</code>. لذلك، عند البحث عن <code translate="no">topk</code> أقرب المتجهات ، يكون عدد المتجهات التي تم إرجاعها أقل من <code translate="no">k</code>.</p>
<p>لتجنب ذلك، حاول ضبط <code translate="no">nprobe</code> أكبر و <code translate="no">nlist</code> و <code translate="no">k</code> أصغر.</p>
<p>راجع <a href="/docs/ar/v2.4.x/index.md">فهرس المتجهات</a> لمزيد من المعلومات.</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">ما هو الحد الأقصى للبعد المتجه المدعوم في ملفوس؟</h4><p>يمكن لـ Milvus إدارة متجهات ذات أبعاد تصل إلى 32,768 بُعداً افتراضياً. يمكنك زيادة قيمة <code translate="no">Proxy.maxDimension</code> للسماح بمتجهات ذات أبعاد أكبر.</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">هل يدعم Milvus وحدة المعالجة المركزية Apple M1؟</h4><p>لا يدعم الإصدار الحالي من Milvus وحدة المعالجة المركزية Apple M1 مباشرة. بعد الإصدار Milvus 2.3، يوفر Milvus صور Docker لبنية ARM64.</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">ما هي أنواع البيانات التي يدعمها Milvus في حقل المفتاح الأساسي؟</h4><p>في الإصدار الحالي، يدعم Milvus كلاً من INT64 والسلسلة.</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">هل Milvus قابل للتطوير؟</h4><p>نعم، يمكنك نشر مجموعة Milvus مع عقد متعددة عبر مخطط Helm على Kubernetes. راجع <a href="/docs/ar/v2.4.x/scaleout.md">دليل التوسع</a> لمزيد من التعليمات.</p>
<h4 id="What-are-growing-segment-and-sealed-segment" class="common-anchor-header">ما هو الجزء المتزايد والجزء المختوم؟</h4><p>عندما يأتي طلب بحث، يبحث ميلفوس في كل من البيانات التزايدية والبيانات التاريخية. البيانات التزايدية هي تحديثات حديثة، يتم تخزينها في المقاطع المتزايدة، والتي يتم تخزينها في الذاكرة قبل أن تصل إلى الحد الأدنى ليتم تثبيتها في تخزين الكائنات ويتم إنشاء فهرس أكثر كفاءة لها، بينما البيانات التاريخية هي تحديثات منذ فترة. وهي في المقاطع المختومة التي تم تخزينها باستمرار في مخزن الكائنات. تشكل البيانات التزايدية والبيانات التاريخية معًا مجموعة البيانات الكاملة للبحث. هذا التصميم يجعل أي بيانات يتم إدخالها إلى ميلفوس قابلة للبحث على الفور. بالنسبة لـ Milvus Distributed، هناك عوامل أكثر تعقيدًا تحدد متى يمكن أن يظهر سجل تم تناوله للتو في نتيجة البحث. تعرف على المزيد من الفروق الدقيقة حول ذلك في <a href="https://milvus.io/docs/consistency.md">مستويات الاتساق</a>.</p>
<h4 id="Is-Milvus-available-for-concurrent-search" class="common-anchor-header">هل Milvus متاح للبحث المتزامن؟</h4><p>نعم. بالنسبة للاستعلامات على نفس المجموعة، يبحث Milvus بشكل متزامن في البيانات الإضافية والتاريخية. ومع ذلك، يتم إجراء الاستعلامات على مجموعات مختلفة في سلسلة. في حين أن البيانات التاريخية يمكن أن تكون مجموعة بيانات ضخمة للغاية، فإن عمليات البحث على البيانات التاريخية تستغرق وقتًا أطول نسبيًا ويتم إجراؤها بشكل أساسي في سلسلة.</p>
<h4 id="Why-does-the-data-in-MinIO-remain-after-the-corresponding-collection-is-dropped" class="common-anchor-header">لماذا تبقى البيانات في MinIO بعد إسقاط المجموعة المقابلة؟</h4><p>صُممت البيانات في MinIO لتبقى لفترة زمنية معينة لتسهيل عملية استرجاع البيانات.</p>
<h4 id="Does-Milvus-support-message-engines-other-than-Pulsar" class="common-anchor-header">هل يدعم ميلفوس محركات رسائل أخرى غير بولسار؟</h4><p>نعم. كافكا مدعوم في ميلفوس 2.1.0.</p>
<h4 id="Whats-the-difference-between-a-search-and-a-query" class="common-anchor-header">ما الفرق بين البحث والاستعلام؟</h4><p>في Milvus، يسترجع البحث عن تشابه المتجهات في Milvus المتجهات بناءً على حساب التشابه وتسريع فهرس المتجهات. على عكس البحث عن التشابه المتجه، يسترجع الاستعلام عن المتجهات المتجهات عبر التصفية القياسية بناءً على تعبير منطقي. يقوم التعبير المنطقي بالتصفية على الحقول القياسية أو حقل المفتاح الأساسي، ويسترجع جميع النتائج التي تطابق المرشحات. في الاستعلام، لا يتم تضمين مقاييس التشابه أو فهرس المتجهات.</p>
<h4 id="Why-does-a-float-vector-value-have-a-precision-of-7-decimal-digits-in-Milvus" class="common-anchor-header">لماذا تبلغ دقة قيمة المتجه العائم 7 أرقام عشرية في ملفوس؟</h4><p>يدعم Milvus تخزين المتجهات كمصفوفات Float32. قيمة Float32 لها دقة 7 أرقام عشرية. حتى مع قيمة Float64، مثل 1.3476964684980388، يخزنها Milvus على أنها 1.347696. ولذلك، عند استرداد مثل هذا المتجه من Milvus، تفقد دقة قيمة Float64.</p>
<h4 id="How-does-Milvus-handle-vector-data-types-and-precision" class="common-anchor-header">كيف يتعامل Milvus مع أنواع بيانات المتجهات ودقتها؟</h4><p>يدعم Milvus أنواع المتجهات الثنائية و Float32 و Float16 و BFloat16.</p>
<ul>
<li>المتجهات الثنائية: تخزين البيانات الثنائية كتسلسلات من 0 و1، وتستخدم في معالجة الصور واسترجاع المعلومات.</li>
<li>متجهات Float32: تخزين افتراضي بدقة تبلغ حوالي 7 أرقام عشرية. حتى قيم Float64 يتم تخزينها بدقة Float32، مما يؤدي إلى فقدان محتمل للدقة عند الاسترجاع.</li>
<li>متجهات Float16 و BFloat16: توفر دقة واستخدام أقل للذاكرة. يعد Float16 مناسبًا للتطبيقات ذات النطاق الترددي والتخزين المحدود، بينما يوازن BFloat16 بين النطاق والكفاءة، ويُستخدم عادةً في التعلم العميق لتقليل المتطلبات الحسابية دون التأثير بشكل كبير على الدقة.</li>
</ul>
<h4 id="Does-Milvus-support-specifying-default-values-for-scalar-or-vector-fields" class="common-anchor-header">هل يدعم Milvus تحديد القيم الافتراضية للحقول القياسية أو المتجهة؟</h4><p>لا يدعم Milvus 2.4.x حاليًا تحديد القيم الافتراضية للحقول القياسية أو المتجهة. هذه الميزة مخطط لها في الإصدارات المستقبلية.</p>
<h4 id="Still-have-questions" class="common-anchor-header">هل لا تزال لديك أسئلة؟</h4><p>يمكنك ذلك:</p>
<ul>
<li>تحقق من <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> على GitHub. نرحب بك لطرح الأسئلة ومشاركة الأفكار ومساعدة الآخرين.</li>
<li>انضم إلى <a href="https://discord.com/invite/8uyFbECzPX">خادم Discord Server</a> الخاص بنا للحصول على الدعم والتفاعل مع مجتمعنا مفتوح المصدر.</li>
</ul>
