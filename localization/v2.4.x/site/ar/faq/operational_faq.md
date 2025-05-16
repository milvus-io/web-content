---
id: operational_faq.md
summary: اعثر على إجابات للأسئلة الشائعة حول العمليات في ميلفوس.
title: الأسئلة الشائعة التشغيلية
---
<h1 id="Operational-FAQ" class="common-anchor-header">الأسئلة الشائعة التشغيلية<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">ماذا لو فشلت في سحب صورة Milvus Docker من Docker Hub؟</h4><p>في حال فشلت في سحب صورة Milvus Docker من Docker Hub، حاول إضافة مرايا سجل أخرى.</p>
<p>يمكن للمستخدمين من البر الرئيسي للصين إضافة عنوان URL "https://registry.docker-cn.com" إلى مصفوفة مرايا السجل في <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">هل Docker هو الطريقة الوحيدة لتثبيت وتشغيل Milvus؟</h4><p>Docker هي طريقة فعالة لنشر Milvus، ولكنها ليست الطريقة الوحيدة. يمكنك أيضاً نشر ميلفوس من التعليمات البرمجية المصدرية. يتطلب ذلك Ubuntu (18.04 أو أعلى) أو CentOS (7 أو أعلى). انظر <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">بناء ميلفوس من التعليمات البرمجية المصدرية</a> لمزيد من المعلومات.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">ما هي العوامل الرئيسية التي تؤثر على الاستدعاء؟</h4><p>يتأثر الاستدعاء بشكل رئيسي بنوع الفهرس ومعلمات البحث.</p>
<p>بالنسبة للفهرس المسطح، يأخذ Milvus مسحًا شاملًا داخل المجموعة، مع إرجاع 100%.</p>
<p>بالنسبة لفهارس IVF، تحدد معلمة nprobe نطاق البحث داخل المجموعة. تؤدي زيادة nprobe إلى زيادة نسبة المتجهات التي يتم البحث عنها واسترجاعها، ولكنها تقلل من أداء الاستعلام.</p>
<p>بالنسبة لفهرس HNSW، تحدد المعلمة ef نطاق البحث في الرسم البياني. تؤدي زيادة ef إلى زيادة عدد النقاط التي يتم البحث عنها في الرسم البياني والاستدعاء، ولكنها تقلل من أداء الاستعلام.</p>
<p>لمزيد من المعلومات، راجع <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">فهرسة المتجهات</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">لماذا لم تدخل التغييرات التي أجريتها على ملفات التكوين حيز التنفيذ؟</h4><p>لا يدعم Milvus التعديل على ملفات التكوين أثناء وقت التشغيل. يجب إعادة تشغيل Milvus Docker حتى تدخل تغييرات ملفات التكوين حيز التنفيذ.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">كيف أعرف ما إذا كان Milvus قد بدأ بنجاح؟</h4><p>إذا تم بدء تشغيل Milvus باستخدام Docker Compose، قم بتشغيل <code translate="no">docker ps</code> لمراقبة عدد حاويات Docker قيد التشغيل والتحقق مما إذا كانت خدمات Milvus قد بدأت بشكل صحيح.</p>
<p>بالنسبة لـ Milvus المستقلة، يجب أن تكون قادرًا على مراقبة ثلاث حاويات Docker قيد التشغيل على الأقل، إحداها خدمة Milvus والاثنتان الأخريان هما خدمة إدارة وتخزين إلخd. لمزيد من المعلومات، راجع <a href="/docs/ar/v2.4.x/install_standalone-docker.md">تثبيت ميلفوس Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">لماذا يختلف الوقت في ملفات السجل عن وقت النظام؟</h4><p>يرجع اختلاف الوقت عادةً إلى حقيقة أن الجهاز المضيف لا يستخدم التوقيت العالمي المنسق (UTC).</p>
<p>تستخدم ملفات السجل داخل صورة Docker التوقيت العالمي المنسق (UTC) بشكل افتراضي. إذا كان جهازك المضيف لا يستخدم التوقيت العالمي المنسق، فقد تحدث هذه المشكلة.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">كيف أعرف ما إذا كانت وحدة المعالجة المركزية الخاصة بي تدعم Milvus؟</h4><p>تعتمد عمليات الحوسبة الخاصة ب Milvus على دعم وحدة المعالجة المركزية لمجموعة تعليمات تمديد SIMD (تعليمات أحادية التعليمات ومتعددة البيانات). يعد دعم وحدة المعالجة المركزية الخاصة بك لمجموعة تعليمات تمديد SIMD أمرًا حاسمًا لبناء الفهرس والبحث عن تشابه المتجهات داخل Milvus. تأكد من أن وحدة المعالجة المركزية لديك تدعم واحدة على الأقل من مجموعات تعليمات SIMD التالية:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>قم بتشغيل الأمر lscpu للتحقق مما إذا كانت وحدة المعالجة المركزية لديك تدعم مجموعات تعليمات SIMD المذكورة أعلاه:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">لماذا يقوم Milvus بإرجاع <code translate="no">illegal instruction</code> أثناء بدء التشغيل؟</h4><p>يتطلب Milvus أن تدعم وحدة المعالجة المركزية الخاصة بك مجموعة تعليمات SIMD: SSE4.2، أو AVX، أو AVX2، أو AVX512. يجب أن تدعم وحدة المعالجة المركزية واحدة منها على الأقل لضمان عمل Milvus بشكل طبيعي. يشير الخطأ <code translate="no">illegal instruction</code> الذي تم إرجاعه أثناء بدء التشغيل إلى أن وحدة المعالجة المركزية لديك لا تدعم أياً من مجموعات التعليمات الأربع المذكورة أعلاه.</p>
<p>راجع <a href="/docs/ar/v2.4.x/prerequisite-docker.md">دعم وحدة المعالجة المركزية لمجموعة تعليمات SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">هل يمكنني تثبيت Milvus على نظام ويندوز؟</h4><p>نعم، يمكنك تثبيت Milvus على نظام ويندوز إما عن طريق التحويل البرمجي من التعليمات البرمجية المصدرية أو من حزمة ثنائية.</p>
<p>راجع <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">تشغيل Milvus على ويندوز</a> لمعرفة كيفية تثبيت Milvus على ويندوز.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">حصلت على خطأ عند تثبيت pymilvus على ويندوز. ماذا أفعل؟</h4><p>لا يوصى بتثبيت PyMilvus على ويندوز. ولكن إذا كان عليك تثبيت PyMilvus على نظام ويندوز ولكن حدث خطأ، حاول تثبيته في بيئة <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">كوندا</a>. راجع <a href="/docs/ar/v2.4.x/install-pymilvus.md">تثبيت Milvus SDK</a> للمزيد من المعلومات حول كيفية تثبيت PyMilvus في بيئة كوندا.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">هل يمكنني نشر ميلفوس عند قطع الاتصال بالإنترنت؟</h4><p>نعم، يمكنك تثبيت ميلفوس في بيئة غير متصلة بالإنترنت. انظر <a href="/docs/ar/v2.4.x/install_offline-helm.md">تثبيت ميلفوس دون اتصال</a> لمزيد من المعلومات.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">أين يمكنني العثور على السجلات التي تم إنشاؤها بواسطة ميلفوس؟</h4><p>تتم طباعة سجل ميلفوس إلى ستاوت (الإخراج القياسي) وستدرر (الخطأ القياسي) بشكل افتراضي، ولكننا نوصي بشدة بإعادة توجيه السجل إلى وحدة تخزين ثابتة في الإنتاج. للقيام بذلك، قم بتحديث <code translate="no">log.file.rootPath</code> في <strong>milvus.yaml.</strong> وإذا قمت بنشر Milvus مع مخطط <code translate="no">milvus-helm</code> ، فإنك تحتاج أيضًا إلى تمكين ثبات السجل أولاً عبر <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>إذا لم تقم بتغيير التهيئة، يمكن أن يساعدك استخدام سجلات kubectl logs &lt;pod-name&gt; أو سجلات docker logs CONTAINER أيضًا في العثور على السجل.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">هل يمكنني إنشاء فهرس لمقطع قبل إدراج البيانات فيه؟</h4><p>نعم، يمكنك ذلك. ولكننا نوصي بإدراج البيانات على دفعات، على ألا يتجاوز حجم كل منها 256 ميجابايت، قبل فهرسة كل مقطع.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">هل يمكنني مشاركة مثيل إلخd بين عدة مثيلات ميلفوس؟</h4><p>نعم، يمكنك مشاركة مثيل إلخd بين عدة مثيلات Milvus. للقيام بذلك، تحتاج إلى تغيير <code translate="no">etcd.rootPath</code> إلى قيمة منفصلة لكل مثيل من مثيلات Milvus في ملفات التكوين لكل منها قبل بدء تشغيلها.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">هل يمكنني مشاركة مثيل Pulsar بين مثيلات Milvus متعددة؟</h4><p>نعم، يمكنك مشاركة مثيل Pulsar بين مثيلات Milvus متعددة. للقيام بذلك، يمكنك</p>
<ul>
<li>إذا تم تمكين الإيجارات المتعددة على مثيل Pulsar الخاص بك، ففكر في تخصيص مستأجر منفصل أو مساحة اسم منفصلة لكل مثيل Milvus. وللقيام بذلك، تحتاج إلى تغيير <code translate="no">pulsar.tenant</code> أو <code translate="no">pulsar.namespace</code> في ملفات التكوين الخاصة بمثيلات Milvus الخاصة بك إلى قيمة فريدة لكل منها قبل بدء تشغيلها.</li>
<li>إذا كنت لا تخطط لتمكين الإيجار المتعدد على مثيل Pulsar الخاص بك، ففكر في تغيير <code translate="no">msgChannel.chanNamePrefix.cluster</code> في ملفات التكوين الخاصة بمثيلات Milvus إلى قيمة فريدة لكل منها قبل بدء تشغيلها.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">هل يمكنني مشاركة مثيل MinIO بين مثيلات Milvus متعددة؟</h4><p>نعم، يمكنك مشاركة مثيل MinIO بين مثيلات Milvus متعددة. للقيام بذلك، تحتاج إلى تغيير <code translate="no">minio.rootPath</code> إلى قيمة فريدة لكل مثيل من مثيلات Milvus في ملفات التكوين لكل منها قبل بدء تشغيلها.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">كيف يمكنني التعامل مع رسالة الخطأ <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code> ؟</h4><p>تشير رسالة الخطأ <code translate="no">Illegal uri [example.db]</code> إلى أنك تحاول الاتصال بـ Milvus Lite باستخدام إصدار سابق من PyMilvus لا يدعم هذا النوع من الاتصال. لحل هذه المشكلة، قم بترقية تثبيت PyMilvus إلى الإصدار 2.4.2 على الأقل، والذي يتضمن دعم الاتصال بـ Milvus Lite.</p>
<p>يمكنك ترقية PyMilvus باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">لماذا أحصل على نتائج أقل من <code translate="no">limit</code> التي قمت بتعيينها في البحث/الاستعلام الخاص بي؟</h4><p>هناك عدة أسباب قد تجعلك تتلقى نتائج أقل من <code translate="no">limit</code> الذي حددته:</p>
<ul>
<li><p><strong>بيانات محدودة</strong>: قد لا تحتوي المجموعة على كيانات كافية لاستيفاء الحد الذي طلبته. إذا كان العدد الإجمالي للكيانات في المجموعة أقل من الحد، فستتلقى بطبيعة الحال نتائج أقل.</p></li>
<li><p><strong>تكرار المفاتيح الأساسية</strong>: يعطي ميلفوس الأولوية لكيانات محددة عند مواجهة مفاتيح أساسية مكررة أثناء البحث. يختلف هذا السلوك بناءً على نوع البحث:</p></li>
<li><p><strong>استعلام (مطابقة تامة)</strong>: يقوم Milvus بتحديد أحدث كيان بمفتاح PK المطابق. البحث عن المفاتيح الأساسية: يقوم Milvus بتحديد الكيان الذي يتمتع بأعلى درجة تشابه، حتى إذا كانت الكيانات تشترك في نفس PK. يمكن أن يؤدي هذا التحديد للأولويات إلى نتائج فريدة أقل من الحد الأقصى إذا كانت مجموعتك تحتوي على العديد من المفاتيح الأساسية المكررة.</p></li>
<li><p><strong>عدم كفاية التطابقات</strong>: قد تكون تعبيرات تصفية البحث الخاصة بك صارمة للغاية، مما يؤدي إلى عدد أقل من الكيانات التي تستوفي حد التشابه. إذا كانت الشروط التي تم تعيينها للبحث مقيدة للغاية، فلن يتطابق عدد كافٍ من الكيانات، مما يؤدي إلى نتائج أقل من المتوقع.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. ما سبب هذا الخطأ وكيف يمكن حله؟</h4><p>يحدث هذا الخطأ عند محاولة استخدام برنامج Milvus Lite على نظام أساسي يعمل بنظام ويندوز. تم تصميم Milvus Lite بشكل أساسي لبيئات Linux وقد لا يكون لديه دعم أصلي لنظام Windows.</p>
<p>الحل هو استخدام بيئة Linux:</p>
<ul>
<li>استخدم نظام تشغيل يستند إلى لينكس أو جهاز افتراضي لتشغيل ميلفوس لايت.</li>
<li>سيضمن هذا النهج التوافق مع تبعيات المكتبة ووظائفها.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">ما هي أخطاء "الطول يتجاوز الحد الأقصى للطول" في Milvus، وكيف يمكن فهمها ومعالجتها؟</h4><p>تحدث أخطاء "الطول يتجاوز الحد الأقصى للطول" في Milvus عندما يتجاوز حجم عنصر البيانات الحد الأقصى للحجم المسموح به للمجموعة أو الحقل. فيما يلي بعض الأمثلة والتفسيرات:</p>
<ul>
<li><p>خطأ في حقل JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>خطأ في طول السلسلة: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>خطأ في حقل VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>لفهم هذه الأخطاء ومعالجتها:</p>
<ul>
<li>افهم أن <code translate="no">len(str)</code> في بايثون يمثل عدد الأحرف، وليس الحجم بالبايت.</li>
<li>بالنسبة لأنواع البيانات المستندة إلى السلسلة مثل VARCHAR و JSON، استخدم <code translate="no">len(bytes(str, encoding='utf-8'))</code> لتحديد الحجم الفعلي بالبايت، وهو ما يستخدمه Milvus لـ &quot;الطول الأقصى&quot;.</li>
</ul>
<p>مثال في بايثون:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">هل لا تزال لديك أسئلة؟</h4><p>يمكنك ذلك:</p>
<ul>
<li>تحقق من <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> على GitHub. لا تتردد في طرح الأسئلة ومشاركة الأفكار ومساعدة الآخرين.</li>
<li>انضم إلى <a href="https://discord.com/invite/8uyFbECzPX">خادم Discord Server</a> الخاص بنا للحصول على الدعم والتفاعل مع مجتمعنا مفتوح المصدر.</li>
</ul>
