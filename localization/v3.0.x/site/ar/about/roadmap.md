---
id: roadmap.md
title: خريطة طريق Milvus
related_key: Milvus roadmap
summary: >-
  Milvus هي قاعدة بيانات متجهة مفتوحة المصدر صُممت لدعم تطبيقات الذكاء
  الاصطناعي. وفيما يلي خارطة الطريق الخاصة بنا لتوجيه عملية التطوير.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 نحو قاعدة البيانات متعددة الوسائط وبحيرة البيانات من الجيل التالي<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>خريطة طريق منتج Milvus</strong></p>
<p>مرحبًا بكم في خارطة طريق Milvus!</p>
<p>نحن ندخل Milvus في عصر جديد — قاعدة البيانات متعددة الوسائط من الجيل التالي — التي تشمل <strong>البيانات المنظمة وغير المنظمة،</strong> <strong>والاسترجاع في الوقت الفعلي والتحليلات غير المتصلة بالإنترنت،</strong> <strong>وأداء المجموعة الواحدة إلى بنية بحيرة البيانات العالمية</strong>.</p>
<p>تحدد خارطة الطريق هذه الأهداف الأساسية لـ <strong>Milvus v2.6 (قيد التطوير)</strong>، <strong>وMilvus v3.0 (المستهدف إطلاقها في أواخر عام 2026)</strong>، <strong>وMilvus v3.1 (التطوير طويل الأجل)</strong>، إلى جانب خطة تطوير <strong>Vector Lake (بحيرة البيانات / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (قيد التطوير)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>الجدول الزمني: منتصف عام 2025 – نهاية عام 2025</strong></p>
<p>التركيز: <strong>ترقية نموذج البيانات</strong>، <strong>وإعادة هيكلة بنية البث</strong>، <strong>وبناء قدرات التصنيف إلى مستويات «ساخنة» و«باردة</strong>»، وإطلاق <strong>النموذج الأولي لـ Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 النقاط البارزة<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>ترقية نموذج البيانات</strong></h4><ul>
<li><p>إدخال نوع بيانات موحد <strong>Tensor / StructList</strong> لدعم هياكل التضمين متعددة المتجهات، مما يتيح التوافق مع <em>ColBERT</em> <em>وCoLQwen</em> <em>والفيديو</em> <em>والمتجهات متعددة الوسائط</em>.</p></li>
<li><p>إضافة دعم <strong>البيانات الجغرافية،</strong> بما في ذلك النقاط والمناطق والفهرسة المكانية (استنادًا إلى <em>libspatial</em>)، لتوسيع حالات الاستخدام في خدمات المواقع (LBS) ونظم المعلومات الجغرافية (GIS).</p></li>
<li><p>دعم نوع البيانات " <strong>الطابع الزمني مع المنطقة الزمنية</strong> ".</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>إعادة هيكلة بنية StreamNode</strong></h4><ul>
<li><p>إعادة كتابة مسار استيعاب التدفق لتحسين عمليات الكتابة التزايدية والحساب في الوقت الفعلي.</p></li>
<li><p>تحسين أداء التزامن والاستقرار بشكل كبير، مما يضع الأساس للمعالجة الموحدة في الوقت الفعلي وبدون اتصال بالإنترنت.</p></li>
<li><p>تقديم محرك جديد لقائمة انتظار الرسائل: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>التصنيف إلى مستويات "الساخنة" و"الباردة" وبنية التخزين (StorageV2)</strong></h4><ul>
<li><p>دعم تنسيقات التخزين المزدوجة: <strong>Parquet</strong> و <strong>Vortex،</strong> مما يعزز التزامن وكفاءة الذاكرة.</p></li>
<li><p>تنفيذ التخزين المتدرج مع الفصل التلقائي بين البيانات الساخنة والباردة والجدولة الذكية.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>نموذج Vector Lake (v0.1)</strong></h4><ul>
<li><p>التكامل مع <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> عبر FFI، مما يتيح تطوير المخطط في وضع عدم الاتصال واستعلامات KNN.</p></li>
<li><p>توفير تصور متعدد الوسائط للبيانات وعرض توضيحي لـ Spark ETL، مما يؤسس لبنية بحيرة البيانات الأساسية.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (المقرر إطلاقه في أوائل عام 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>الجدول الزمني: أواخر عام 2025 – أوائل عام 2026</strong></p>
<p>التركيز: تحسينات شاملة <strong>لتجربة البحث</strong> <strong>ومرونة المخطط</strong> <strong>ودعم البيانات غير المنظمة</strong>، إلى جانب إصدار <strong>Vector Lake (v0.2)</strong>.</p>
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>إصلاح شامل لتجربة البحث</strong></h4><ul>
<li><p>تقديم ميزة البحث عن التشابه <strong>"More Like This" (MLT)</strong> مع دعم عمليات البحث باستخدام الموضع أو الأمثلة السلبية.</p></li>
<li><p>إضافة قدرات البحث الدلالي مثل <strong>التمييز</strong> <strong>والتعزيز</strong>.</p></li>
<li><p>دعم <strong>القواميس المخصصة</strong> <strong>وجداول المرادفات</strong>، مما يتيح تعريف القواعد المعجمية والدلالية في طبقة المحلل.</p></li>
<li><p>تقديم قدرات <strong>التجميع</strong> للاستعلامات.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>الاستخدام المتعدد وإدارة الموارد</strong></h4><ul>
<li><p>تمكين الحذف متعدد المستأجرين، والإحصاءات، والتصنيف إلى مستويات ساخنة/باردة.</p></li>
<li><p>تحسين عزل الموارد واستراتيجيات الجدولة لدعم ملايين الجداول في مجموعة واحدة.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>تحسينات المخطط والمفتاح الأساسي</strong></h4><ul>
<li><p>تنفيذ <strong>إزالة التكرار الشاملة للمفاتيح الأساسية (Global PK Dedup)</strong> لضمان اتساق البيانات وتفردها.</p></li>
<li><p>دعم <strong>إدارة المخطط المرنة</strong> (إضافة/حذف الأعمدة، وملء النسخ الاحتياطي).</p></li>
<li><p>السماح <strong>بقيم NULL</strong> في الحقول المتجهة.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>أنواع البيانات غير المنظمة الموسعة (BLOB / النص)</strong></h4><ul>
<li><p>إدخال <strong>نوع BLOB،</strong> الذي يوفر تخزينًا مرجعيًا أصليًا للبيانات الثنائية مثل الملفات والصور ومقاطع الفيديو.</p></li>
<li><p>إدخال <strong>نوع TEXT،</strong> الذي يوفر إمكانيات بحث محسّنة للنص الكامل والمستندة إلى المحتوى.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>إمكانيات على مستوى المؤسسات</strong></h4><ul>
<li><p>دعم <strong>النسخ الاحتياطي والاستعادة المستندة إلى اللقطات</strong>.</p></li>
<li><p>توفير <strong>التتبع الشامل</strong> <strong>وتسجيل عمليات التدقيق</strong>.</p></li>
<li><p>تنفيذ <strong>التوافر العالي (HA) بنظام النشط-الاحتياطي</strong> عبر عمليات النشر متعددة المجموعات.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>دعم <strong>تخزين TEXT / BLOB</strong> <strong>وإدارة اللقطات متعددة الإصدارات</strong>.</p></li>
<li><p>دمج Spark لمهام الفهرسة دون اتصال بالإنترنت، والتجميع، وإزالة التكرار، وتقليل الأبعاد.</p></li>
<li><p>تقديم <strong>عروض توضيحية لـ ChatPDF للاستعلامات الباردة والمعايير المرجعية دون اتصال بالإنترنت</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (رؤية طويلة الأجل)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>الجدول الزمني: منتصف عام 2026</strong></p>
<p>التركيز: <strong>الوظائف المحددة من قبل المستخدم (UDF)</strong>، <strong>وتكامل الحوسبة الموزعة،</strong> <strong>وتحسين الاستعلامات القياسية،</strong> <strong>والتجزئة الديناميكية،</strong> والإصدار الرسمي لـ <strong>Vector Lake (v1.0)</strong>.</p>
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>الوظائف المحددة من قبل المستخدم (UDF) ونظام الحوسبة الموزعة</strong></h4><ul>
<li><p>دعم <strong>الوظائف المحددة من قبل المستخدم (UDFs)</strong>، مما يسمح للمطورين بإدخال منطق مخصص في سير عمل الاسترجاع والحساب.</p></li>
<li><p>تكامل عميق مع <strong>Ray Dataset / Daft</strong> لتنفيذ الوظائف المحددة من قبل المستخدم (UDF) بشكل موزع ومعالجة البيانات متعددة الوسائط.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>الاستعلامات العددية وتطور التنسيق المحلي</strong></h4><ul>
<li><p>تحسين أداء التصفية والتجميع للحقول العددية.</p></li>
<li><p>تحسين تقييم التعبيرات والتنفيذ المعجل بالفهرس.</p></li>
<li><p>دعم <strong>التحديثات في المكان نفسه</strong> لتنسيقات الملفات المحلية.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>إمكانيات البحث المتقدمة</strong></h4><ul>
<li><p>إضافة الميزات التالية: استعلامات <strong>RankBy</strong> و <strong>OrderBy</strong> و <strong>Facet</strong> <strong>والمطابقة التقريبية</strong>.</p></li>
<li><p>تحسين استرجاع النصوص من خلال دعم:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>التجزئة الديناميكية وقابلية التوسع</strong></h4><ul>
<li><p>تمكين <strong>التقسيم التلقائي للأجزاء</strong> <strong>وموازنة الحمل</strong> من أجل قابلية التوسع السلس.</p></li>
<li><p>تحسين <strong>بناء الفهرس الشامل</strong> وضمان <strong>أداء البحث الموزع</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>تكامل عميق مع <strong>Ray / Daft / PyTorch</strong> لدعم الدوال المحددة من قبل المستخدم (UDFs) الموزعة وحالات استخدام هندسة السياق.</p></li>
<li><p>توفير <strong>عروض توضيحية لـ RAG (Retrieval-Augmented Generation)</strong> <strong>والاستيراد من جداول Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 بناء مستقبل Milvus معًا<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus هو مشروع مفتوح المصدر يقوده مجتمع عالمي من المطورين.</p>
<p>ندعو جميع أعضاء المجتمع بحرارة للمساعدة في تشكيل قاعدة البيانات متعددة الوسائط من الجيل التالي:</p>
<ul>
<li><p>💬 <strong>مشاركة الملاحظات</strong>: اقتراح ميزات جديدة أو أفكار للتحسين</p></li>
<li><p>🐛 <strong>الإبلاغ عن المشكلات</strong>: الإبلاغ عن الأخطاء عبر GitHub Issues</p></li>
<li><p>🔧 <strong>المساهمة بالكود</strong>: أرسل طلبات سحب (PRs) وساعد في بناء الميزات الأساسية</p>
<ul>
<li><p><strong>طلبات السحب (Pull Requests</strong>): ساهم مباشرة في <a href="https://github.com/milvus-io/milvus/pulls">قاعدة الكود</a> الخاصة بنا. سواء كان ذلك لإصلاح الأخطاء البرمجية أو إضافة ميزات أو تحسين الوثائق، فإن مساهماتك مرحب بها.</p></li>
<li><p><strong>دليل التطوير</strong>: راجع <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">دليل المساهمين</a> للحصول على إرشادات حول المساهمة في الكود.</p></li>
</ul></li>
<li><p>⭐ <strong>انشر الخبر</strong>: شارك أفضل الممارسات وقصص النجاح</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
