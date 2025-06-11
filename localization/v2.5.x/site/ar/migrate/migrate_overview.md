---
id: migrate_overview.md
summary: >-
  تقدم هذه المقالة نظرة عامة على أداة Milvus-migration، بما في ذلك عمليات
  الترحيل المدعومة والميزات والبنية.
title: نظرة عامة على ترحيل ميلفوس
---

<h1 id="Milvus-Migration-Overview" class="common-anchor-header">نظرة عامة على ترحيل ميلفوس<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>إدراكًا للاحتياجات المتنوعة لقاعدة المستخدمين، قامت ميلفوس بتوسيع أدوات الترحيل الخاصة بها ليس فقط لتسهيل الترقيات من إصدارات ميلفوس 1.x السابقة ولكن أيضًا لتمكين التكامل السلس للبيانات من أنظمة أخرى مثل <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> <a href="https://github.com/facebookresearch/faiss">وFaiss</a>. تم تصميم مشروع <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> لسد الفجوة بين بيئات البيانات المتنوعة هذه وأحدث التطورات في تقنية Milvus، مما يضمن لك الاستفادة من الميزات المحسنة والأداء المحسن بسلاسة.</p>
<h2 id="Supported-migrations" class="common-anchor-header">عمليات الترحيل المدعومة<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>تدعم أداة <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> مجموعة متنوعة من مسارات الترحيل لاستيعاب احتياجات المستخدمين المختلفة:</p>
<ul>
<li><a href="/docs/ar/v2.5.x/es2m.md">Elasticsearch إلى Milvus 2.x</a>: تمكين المستخدمين من ترحيل البيانات من بيئات Elasticsearch للاستفادة من إمكانيات البحث المتجه المحسّنة في Milvus.</li>
<li><a href="/docs/ar/v2.5.x/f2m.md">فايس إلى ميلفوس 2.x</a>: توفير دعم تجريبي لنقل البيانات من Faiss، وهي مكتبة شائعة للبحث الفعال عن التشابه.</li>
<li><a href="/docs/ar/v2.5.x/m2m.md">Milvus 1.x إلى Milvus 2.x</a>: ضمان نقل البيانات من الإصدارات السابقة بسلاسة إلى الإطار الأحدث.</li>
<li><a href="/docs/ar/v2.5.x/from-m2x.md">Milvus 2.3.x إلى Milvus 2.3.x أو أعلى</a>: توفير مسار ترحيل لمرة واحدة للمستخدمين الذين قاموا بالترحيل بالفعل إلى 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>تم تصميم Milvus-migration بميزات قوية للتعامل مع سيناريوهات الترحيل المتنوعة:</p>
<ul>
<li>طرق تفاعل متعددة: يمكنك إجراء عمليات الترحيل عبر واجهة سطر الأوامر أو من خلال واجهة برمجة التطبيقات المريحة، مع مرونة في كيفية تنفيذ عمليات الترحيل.</li>
<li>دعم مختلف تنسيقات الملفات والتخزين السحابي: يمكن لأداة <a href="https://github.com/zilliztech/milvus-migration">الترحيل Milvus-migration</a> التعامل مع البيانات المخزنة في الملفات المحلية وكذلك في حلول التخزين السحابية مثل S3 و OSS و GCP، مما يضمن توافقًا واسعًا.</li>
<li>معالجة نوع البيانات: أداة <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> قادرة على التعامل مع كل من البيانات المتجهة والحقول القياسية، مما يجعلها خيارًا متعدد الاستخدامات لتلبية احتياجات ترحيل البيانات المختلفة.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">البنية<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>صُممت بنية برنامج <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> بشكل استراتيجي لتسهيل عمليات تدفق البيانات وتحليلها وكتابتها بكفاءة، مما يتيح قدرات ترحيل قوية عبر مصادر البيانات المختلفة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>بنية Milvus-migration</span> </span></p>
<p>في الشكل السابق:</p>
<ul>
<li><strong>مصدر البيانات</strong>: يدعم <a href="https://github.com/zilliztech/milvus-migration">ترحيل</a> Milvus-migration مصادر بيانات متعددة بما في ذلك Elasticsearch عبر <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">واجهة برمجة تطبيقات التمرير</a> وملفات بيانات التخزين المحلي أو السحابي وقواعد بيانات Milvus 1.x. يتم الوصول إليها وقراءتها بطريقة مبسطة لبدء عملية الترحيل.</li>
<li><strong>خط أنابيب التدفق</strong>:<ul>
<li><strong>عملية التحليل</strong>: يتم تحليل البيانات من المصادر وفقًا لتنسيقها. على سبيل المثال، بالنسبة لمصدر البيانات من Elasticsearch، يتم استخدام محلل تنسيق Elasticsearch، بينما تستخدم التنسيقات الأخرى محللون معنيون. هذه الخطوة ضرورية لتحويل البيانات الأولية إلى تنسيق منظم يمكن معالجته بشكل أكبر.</li>
<li><strong>عملية التحويل</strong>: بعد التحليل، تخضع البيانات لعملية تحويل حيث تتم تصفية الحقول، وتحويل أنواع البيانات، وتعديل أسماء الجداول وفقًا لمخطط Milvus 2.x المستهدف. هذا يضمن توافق البيانات مع البنية والأنواع المتوقعة في ملفوس.</li>
</ul></li>
<li><strong>كتابة البيانات وتحميلها</strong>:<ul>
<li><strong>كتابة البيانات</strong>: تتم كتابة البيانات المعالجة في ملفات JSON أو NumPy الوسيطة، وتكون جاهزة للتحميل في Milvus 2.x.</li>
<li><strong>تحميل البيانات</strong>: يتم تحميل البيانات أخيرًا إلى Milvus 2.x باستخدام عملية <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert،</a> والتي تكتب بكفاءة كميات كبيرة من البيانات في أنظمة تخزين Milvus، سواءً كانت سحابية أو مخزن ملفات.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">الخطط المستقبلية<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>يلتزم فريق التطوير بتعزيز <a href="https://github.com/zilliztech/milvus-migration">ترحيل Milvus</a> بميزات مثل:</p>
<ul>
<li><strong>دعم المزيد من مصادر البيانات</strong>: خطط لتوسيع الدعم ليشمل قواعد بيانات وأنظمة ملفات إضافية، مثل Pinecone و Chroma و Qdrant. إذا كنت بحاجة إلى دعم مصدر بيانات معين، يرجى إرسال طلبك من خلال <a href="https://github.com/zilliztech/milvus-migration/issues">رابط مشكلة GitHub</a> هذا.</li>
<li><strong>تبسيط</strong> الأوامر: جهود لتبسيط عملية الأوامر لتسهيل التنفيذ.</li>
<li><strong>محلل</strong> / <strong>تحويل</strong><strong>SPI</strong>: من المتوقع أن تتضمن البنية أدوات واجهة مزود الخدمة (SPI) لكل من التحليل والتحويل. تسمح هذه الأدوات بالتطبيقات المخصصة التي يمكن للمستخدمين توصيلها في عملية الترحيل للتعامل مع تنسيقات بيانات أو قواعد تحويل محددة.</li>
<li><strong>استئناف نقطة التدقيق</strong>: تمكين عمليات الترحيل من استئناف الترحيل من آخر نقطة تدقيق لتعزيز الموثوقية والكفاءة في حالة الانقطاعات. سيتم إنشاء نقاط حفظ لضمان تكامل البيانات وتخزينها في قواعد بيانات مثل SQLite أو MySQL لتتبع تقدم عملية الترحيل.</li>
</ul>
