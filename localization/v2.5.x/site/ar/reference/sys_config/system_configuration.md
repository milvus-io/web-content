---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: تعرف على تكوين نظام ميلفوس.
---

<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">قائمة مراجعة تكوينات نظام ميلفوس<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع الأقسام العامة لتكوينات النظام في ملفوس.</p>
<p>يحتفظ ميلفوس بعدد كبير من المعلمات التي تقوم بتكوين النظام. لكل تكوين قيمة افتراضية يمكن استخدامها مباشرة. يمكنك تعديل هذه المعلمات بمرونة حتى يتمكن ملفوس من خدمة تطبيقك بشكل أفضل. راجع <a href="/docs/ar/v2.5.x/configure-docker.md">تكوين Milvus</a> لمزيد من المعلومات.</p>
<div class="alert note">
في الإصدار الحالي، لا تدخل جميع المعلمات حيز التنفيذ إلا بعد تهيئتها عند بدء تشغيل ملفوس.</div>
<h2 id="Sections" class="common-anchor-header">الأقسام<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>لتسهيل عملية الصيانة، يصنف Milvus تكويناته إلى أقسام %s استناداً إلى مكوناته وتوابعه واستخدامه العام.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>التكوينات ذات الصلة بـ etcd، وتستخدم لتخزين البيانات الوصفية لـ Milvus واكتشاف الخدمة.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_etcd.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_etcd.md">etcd</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_metastore.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_metastore.md">metastore</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>التكوين المتعلق بـ tikv، المستخدم لتخزين البيانات الوصفية لـ Milvus.</p>
<p>لاحظ أنه عند تمكين TiKV لـ metastore، لا تزال بحاجة إلى وجود إلخd لاكتشاف الخدمة.</p>
<p>يعد TiKV خيارًا جيدًا عندما يتطلب حجم البيانات الوصفية قابلية توسع أفقي أفضل.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_tikv.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_tikv.md">tikv</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_localstorage.md">التكوينات المتعلقة بالتخزين المحلي</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>التكوينات ذات الصلة بـ MinIO/S3/GCS أو أي خدمة أخرى تدعم واجهة برمجة تطبيقات S3، وهي المسؤولة عن ثبات البيانات لـ Milvus.</p>
<p>نشير إلى خدمة التخزين باسم MinIO/S3 في الوصف التالي للتبسيط.</p>
<p>انظر <a href="/docs/ar/v2.5.x/configure_minio.md">التكوينات المتعلقة بـ Minio</a> للحصول على وصف تفصيلي لكل معلمة تحت هذا القسم.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>يدعم Milvus أربعة من MQ: rocksmq (استنادًا إلى RockDB)، و natsmq (خادم nats-server المدمج)، وPulsar وKafka.</p>
<p>يمكنك تغيير mq الخاص بك عن طريق تعيين حقل mq.type.</p>
<p>إذا لم تقم بتعيين الحقل mq.type كإعداد افتراضي، فهناك ملاحظة حول تمكين الأولوية إذا قمنا بتكوين عدة mq في هذا الملف.</p>
<ol>
<li><p>الوضع المستقل (المحلي): وضع مستقل (محلي): rocksmq (افتراضي) &gt; natsmq &gt; بولسار &gt; كافكا</p></li>
<li><p>الوضع العنقودي:  بولسار(افتراضي) &gt; كافكا (روكسمك و ناتسمك غير مدعوم في وضع المجموعة)</p></li>
</ol>
<p>انظر <a href="/docs/ar/v2.5.x/configure_mq.md">التكوينات المتعلقة بـ mq</a> للحصول على وصف تفصيلي لكل معلمة تحت هذا القسم.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>التكوينات ذات الصلة بـ pulsar، وتستخدم لإدارة سجلات ميلفوس لعمليات الطفرات الأخيرة، وسجل تدفق الإخراج، وتوفير خدمات نشر-اشتراك السجل.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_pulsar.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_pulsar.md">pulsar</a> للحصول على وصف مفصل لكل معلمة تحت هذا القسم.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>إذا كنت ترغب في تمكين كافكا، تحتاج إلى التعليق على تكوينات النابض</p>
<p>كافكا</p>
<p>الوسيط: المضيف المحلي: 9092</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>بروتوكول الأمان:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert: # path to client's public key (PEM) used for authentication

tlsKey: # path to client's private key (PEM) used for authentication

tlsCaCert: # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword: # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>

<p>readTimeTimeout: 10</p>
<p>انظر <a href="/docs/ar/v2.5.x/configure_rocksmq.md">التكوينات المتعلقة بـ rocksmq</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>تكوين natsmq.</p>
<p>مزيد من التفاصيل: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>انظر <a href="/docs/ar/v2.5.x/configure_natsmq.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_natsmq.md">natsmq</a> للحصول على وصف تفصيلي لكل معلمة تحت هذا القسم.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>التكوينات ذات الصلة بـ rootCoord، المستخدمة للتعامل مع طلبات لغة تعريف البيانات (DDL) ولغة التحكم في البيانات (DCL)</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_rootcoord.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_rootcoord.md">rootCoord</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>التكوينات ذات الصلة بالوكيل، وتستخدم للتحقق من صحة طلبات العميل وتقليل النتائج التي تم إرجاعها.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_proxy.md">التكوينات المتعلقة بالوكيل</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>التكوين المرتبط بـ queryCoord، المستخدم لإدارة الطوبولوجيا وموازنة التحميل لعقد الاستعلام، والتسليم من المقاطع المتنامية إلى المقاطع المغلقة.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_querycoord.md">التكوينات المتعلقة بالاستعلام ذات الصلة</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>التكوينات ذات الصلة بـ queryNode، وتستخدم لتشغيل البحث المختلط بين البيانات المتجهة والقياسية.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_querynode.md">التكوينات المتعلقة بالاستعلامNode</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_indexcoord.md">التكوينات المرتبطة بالفهرس</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_indexnode.md">التكوينات المتعلقة بعقدة الفهرس</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_datacoord.md">التكوينات المتعلقة بعقدة البيانات</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_datanode.md">التكوينات المتعلقة بعقدة البيانات</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>يقدم هذا الموضوع التكوينات المتعلقة بقناة الرسائل في Milvus.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_msgchannel.md">التكوينات المتعلقة بقناة الرسائل</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>تكوين إخراج سجل النظام.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_log.md">التكوينات المتعلقة بالسجل</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_grpc.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_grpc.md">grpc</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>تكوين tls الخارجي.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_tls.md">التكوينات المتعلقة بـ tls</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="internaltls" class="common-anchor-header"><code translate="no">internaltls</code></h3><p>تكوين tls الداخلي.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_internaltls.md">التكوينات المرتبطة بـ tls الداخلية</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_common.md">التكوينات المرتبطة</a> بـ tls للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig، تكوينات الحصة والحدود الخاصة بـ Milvus.</p>
<p>بشكل افتراضي، نقوم بتمكين:</p>
<ol>
<li><p>حماية TT;</p></li>
<li><p>حماية الذاكرة.</p></li>
<li><p>حماية الحصة النسبية للقرص.</p></li>
</ol>
<p>يمكنك تمكين:</p>
<ol>
<li><p>الحد من إنتاجية DML;</p></li>
<li><p>حدود DDL و DQL qps/ثانية DQL;</p></li>
<li><p>حماية طول/زمن انتظار DQL;</p></li>
<li><p>حماية معدل نتائج DQL;</p></li>
</ol>
<p>إذا لزم الأمر، يمكنك أيضًا فرض رفض طلبات RW يدويًا.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_quotaandlimits.md">التكوينات المتعلقة بالحصص والحدود</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>راجع <a href="/docs/ar/v2.5.x/configure_trace.md">التكوينات المتعلقة بالتتبع</a> للحصول على وصف تفصيلي لكل معلمة تحت هذا القسم.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#عند استخدام فهرسة وحدة معالجة الرسومات، ستستخدم Milvus مخزن ذاكرة لتجنب التخصيص المتكرر للذاكرة وإلغاء التخصيص.</p>
<p>#هنا، يمكنك تعيين حجم الذاكرة التي يشغلها تجمع الذاكرة، على أن تكون الوحدة ميغابايت.</p>
<p># لاحظ أن هناك احتمال تعطل Milvus عندما يتجاوز الطلب الفعلي على الذاكرة القيمة التي تم تعيينها بواسطة maxMemSize.</p>
<p>#إذا تم تعيين كل من initMemSize و MaxMemSize على صفر,</p>
<p>سيقوم #milvus تلقائيًا بتهيئة نصف ذاكرة وحدة معالجة الرسومات المتاحة,</p>
<p>سيقوم #maxMemSemSize بتهيئة كامل ذاكرة وحدة معالجة الرسومات المتوفرة.</p>
<p>انظر <a href="/docs/ar/v2.5.x/configure_gpu.md">التكوينات المتعلقة بوحدة معالجة الرسومات</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="streamingNode" class="common-anchor-header"><code translate="no">streamingNode</code></h3><p>أي تكوين متعلق بخادم عقدة التدفق.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_streamingnode.md">التكوينات المتعلقة بعقدة البث</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="streaming" class="common-anchor-header"><code translate="no">streaming</code></h3><p>أي تكوين متعلق بخدمة البث.</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_streaming.md">التكوينات المتعلقة بالبث</a> للحصول على وصف تفصيلي لكل معلمة ضمن هذا القسم.</p>
<h3 id="knowhere" class="common-anchor-header"><code translate="no">knowhere</code></h3><p>أي تكوين متعلق بمحرك البحث الناقل لـ knowhere</p>
<p>راجع <a href="/docs/ar/v2.5.x/configure_knowhere.md">التكوينات المتعلقة</a> بـ <a href="/docs/ar/v2.5.x/configure_knowhere.md">knowhere</a> للحصول على وصف تفصيلي لكل معلمة تحت هذا القسم.</p>
