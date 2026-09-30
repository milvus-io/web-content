---
id: roadmap.md
title: خريطة طريق Milvus
related_key: Milvus roadmap
summary: >-
  Milvus هي قاعدة بيانات متجهة مفتوحة المصدر صُممت لدعم تطبيقات الذكاء
  الاصطناعي. وإليكم خارطة الطريق الخاصة بنا لتوجيه مسار التطوير.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">خريطة طريق Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 نحو قاعدة البيانات متعددة الوسائط من الجيل التالي و Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>خريطة طريق منتجات Milvus</strong></p>
<p>مرحبًا بكم في خارطة طريق Milvus!</p>
<p>نحن ندخل Milvus في عصر جديد — قاعدة البيانات متعددة الوسائط من الجيل التالي — <strong>التي تشمل البيانات المنظمة وغير المنظمة، والاسترجاع في الوقت الفعلي والتحليلات غير المتصلة بالإنترنت، وأداء المجموعة الواحدة إلى</strong> <strong>بنية Vector Lakebase</strong> <strong>العالمية</strong> <strong>.</strong></p>
<p>تحدد خارطة الطريق هذه الأهداف الأساسية لـ <strong>Milvus v3.0 (الإصدار التجريبي العام)</strong>، و <strong>Milvus v3.1 (التطوير طويل الأجل)</strong>، إلى جانب خطة تطوير <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (الإصدار التجريبي العام)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>الإصدار التجريبي العام: مايو 2026</strong></p>
<p>التركيز: بناء <strong>محرك استعلام أصلي دلالي</strong> مع ميزات الفرز والتجميع والاسترجاع متعدد المتجهات داخل المحرك، <strong>والأساس الأصلي لـ Zilliz Vector Lakebase</strong> بحيث تصل عمليات الحوسبة إلى البيانات دون الحاجة إلى الترحيل.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 أبرز الميزات<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>تطور المخطط وأنواع البيانات</strong></h4><ul>
<li>دعم أوامر ALTER COLLECTION ADD COLUMN و DROP COLUMN أثناء التشغيل دون الحاجة إلى إعادة بناء الفهارس أو مقاطعة الخدمة.</li>
<li>توفير <strong>مسارين للتعبئة اللاحقة</strong> للأعمدة الجديدة: <strong>مسار</strong> خارجي عبر Spark Connector، <strong>ومسار</strong> داخلي باستخدام متجهات BM25 المتفرقة التي يتم إنشاؤها تلقائيًا عند الكتابة.</li>
<li>إدخال <strong>TEXT</strong> كنوع بيانات من الدرجة الأولى يخزن النص الأصلي جنبًا إلى جنب مع المتجهات مع دعم BM25 ومطابقة النص.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>إصلاح شامل لتنفيذ</strong> <strong>الاستعلامات</strong> </h4><ul>
<li>دمج <strong>الأمر Order By</strong> في المحرك مع الفرز لكل مقطع والفرز بالدمج عبر عقد الاستعلام.</li>
<li>إضافة <strong>تجميع</strong> <strong>الاستعلامات</strong> بنمط SQL (GROUP BY مع COUNT و SUM و AVG و MIN و MAX) الذي يتم حسابه في النواة.</li>
<li>إدخال <strong>جوانب البحث</strong> على نتائج الشبكات العصبية الاصطناعية (ANN) مع إحصائيات لكل مجموعة وجوانب فرعية متداخلة من جانب الخادم.</li>
<li>دعم <strong>القواميس المخصصة</strong> وجداول المرادفات المسجلة على مستوى المجموعة لتحسين استرجاع نتائج CJK والمجالات المحددة.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>دعم المتجهات المتعددة والتفاعل المتأخر</strong></h4><ul>
<li>إدخال <strong>StructList</strong> لتمثيل كيان واحد كصف واحد يحتوي على العديد من المتجهات، مع دعم أصلي للتفاعل المتأخر (ColBERT، ColPali) عبر MAX_SIM.</li>
<li>دعم <strong>البحث على مستوى العناصر وعلى مستوى الكيانات</strong> في حقول StructList، مع سياسات مطابقة قابلة للتكوين للنتائج على مستوى الكيانات.</li>
<li>إضافة ثلاث <strong>استراتيجيات استرجاع متعددة المتجهات</strong>: TokenANN (شاملة)، وMuvera (قائمة على الإسقاط، بدون تدريب)، وLemur (ضغط مُكتسب).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>إصلاح عملية الاسترجاع والفهرسة</strong></h4><ul>
<li>إجراء إصلاح شامل <strong>للفهرس المقلوب المتفرق</strong> باستخدام ضغط الكتل، وتكمية الأوزان، وتنسيق دائم؛ وإدخال <strong>SINDI</strong> كخوارزمية IP المتفرقة الافتراضية.</li>
<li>توسيع تغطية الفهرس باستخدام <strong>عائلة Faiss</strong> الكاملة (SVS، Panorama، PQ، IVFPQ، ScaNN) و <strong>MinHash DIDO</strong> للكشف عن التكرارات شبه المتطابقة.</li>
<li>دعم <strong>الحقول المتجهة القابلة للإلغاء</strong> للتضمينات غير المتزامنة والطرائق المفقودة، مع التصفية التلقائية في وقت البحث.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>بنية التخزين والحوسبة Vector Lakebase</strong></h4><ul>
<li>تقديم <strong>External Collection</strong> لفهرسة البيانات والاستعلام عنها في S3 / GCS / Azure في مكانها، مع دعم تنسيقات الجداول Lance وParquet وIceberg وVortex.</li>
<li>إضافة <strong>Vortex،</strong> وهو تنسيق عمودي مفتوح، و <strong>Loon (Storage V3)</strong>، وهي طبقة تخزين ذات تنسيق مختلط لقراءة النقاط بكفاءة من تخزين الكائنات.</li>
<li>دعم <strong>اللقطات في وقت محدد</strong> مع عزل على غرار MVCC للمعالجة الدفعية بينما يستمر الخدمة في الكتابة.</li>
<li>التكامل كمصدر بيانات <strong>Spark DataSource v2</strong> للقراءة من Milvus والكتابة إليه مباشرةً في خطوط أنابيب Spark / Databricks / EMR.</li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (رؤية طويلة المدى)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>الجدول الزمني: أواخر عام 2026 وما بعده</strong></p>
<p>التركيز: <strong>ذكاء التخزين</strong>، <strong>وسلامة مسار الكتابة</strong>، <strong>وقابلية التوسع الحاسوبي</strong>، <strong>وتوسيع</strong> <strong>قابلية التشغيل البيني لـ</strong> <strong>Vector Lakebase</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 أبرز الميزات<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>التخزين ومسار الكتابة</strong></h4><ul>
<li>إضافة <strong>دفع المسند</strong> مع تقليم فهرس الصفحة وفلتر بلوم في طبقة التخزين.</li>
<li>تنفيذ <strong>إزالة التكرار للمفتاح الأساسي</strong> عند الاستيعاب لمنع التكرارات في وقت الكتابة.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>الحوسبة والمرونة</strong></h4><ul>
<li>دعم <strong>الوظائف المعرفة من قبل المستخدم (UDFs)</strong> لتشغيل المنطق المخصص في المحرك، على مستوى البيانات.</li>
<li>تمكين <strong>تقسيم الشرائح</strong> لإعادة تقسيم الشرائح مع نمو البيانات، مع دعم مفتاح التقسيم المخصص.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>توسيع نطاق</strong> <strong>Spark و</strong> <strong>Vector Lakebase</strong> </h4><ul>
<li>توسيع موصل Spark بمكتبة أكثر ثراءً من <strong>مشغلات الدُفعات الأصلية</strong>.</li>
<li>إضافة إمكانيات <strong>تنسيق الجداول</strong> بما في ذلك السفر عبر الزمن، وتطور المخطط، والتراجع عن اللقطات.</li>
<li>توسيع قابلية التشغيل البيني لـ Vector Lakebase من خلال <strong>الفهارس الخارجية المحدثة بواسطة CDC،</strong> ودعم Apache Paimon، وتنسيقات البيانات الإضافية.</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 البناء المشترك لمستقبل Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus هو مشروع مفتوح المصدر يقوده مجتمع عالمي من المطورين. ندعو جميع أعضاء المجتمع للمساعدة في تشكيل الجيل القادم من قواعد البيانات متعددة الوسائط:</p>
<ul>
<li><p>💬 <strong>مشاركة الملاحظات</strong>: اقترح ميزات جديدة أو أفكارًا للتحسين على <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>.</p></li>
<li><p>🐛 <strong>الإبلاغ عن المشكلات</strong>: أبلغ عن الأخطاء عبر <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>المساهمة بالكود</strong>: أرسل طلبات سحب (PRs) وساعد في بناء الميزات الأساسية.</p>
<ul>
<li><strong>طلبات السحب (Pull Requests</strong>): ساهم مباشرةً في <a href="https://github.com/milvus-io/milvus/pulls">قاعدة الكود</a> الخاصة بنا. سواء كنت تعمل على إصلاح الأخطاء البرمجية أو إضافة ميزات أو تحسين الوثائق، فإن مساهماتك مرحب بها.</li>
<li><strong>دليل التطوير</strong>: راجع <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">دليل المساهمين</a> للحصول على إرشادات حول المساهمة في الكود.</li>
</ul></li>
<li><p>🗣️ <strong>انضم إلى المحادثة</strong>: اطرح أسئلة وتعرف على القائمين على الصيانة على <a href="https://milvus.io/discord">Discord،</a> أو خلال <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">ساعات العمل في Milvus،</a> أو عبر <a href="https://milvus.io/community">جميع قنوات المجتمع</a>.</p></li>
<li><p>⭐ <strong>انشر الخبر</strong>: شارك أفضل الممارسات وقصص النجاح، وتابع Milvus على <a href="https://twitter.com/milvusio">X</a> و <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> و <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
