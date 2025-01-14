---
id: rag_with_langflow.md
summary: >-
  يوضّح هذا الدليل كيفية استخدام Langflow لإنشاء خط أنابيب توليد معزز للاسترجاع
  (RAG) باستخدام Milvus.
title: بناء نظام RAG باستخدام Langflow مع Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">بناء نظام RAG باستخدام Langflow مع Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضّح هذا الدليل كيفية استخدام <a href="https://www.langflow.org/">لانجفلو</a> لبناء نظام توليد معزز للاسترجاع (RAG) مع <a href="https://milvus.io/">ميلفوس</a>.</p>
<p>يعمل نظام RAG على تعزيز توليد النصوص من خلال استرجاع المستندات ذات الصلة من قاعدة معرفية أولاً ثم توليد استجابات جديدة بناءً على هذا السياق. يُستخدم نظام Milvus لتخزين واسترجاع تضمينات النصوص، بينما يسهّل نظام Langflow دمج الاسترجاع والتوليد في سير عمل مرئي.</p>
<p>يمكّن لانجفلو من إنشاء خطوط أنابيب RAG بسهولة، حيث يتم تضمين أجزاء من النص وتخزينها في Milvus واسترجاعها عند إجراء الاستعلامات ذات الصلة. يتيح ذلك لنموذج اللغة توليد استجابات مستنيرة حسب السياق.</p>
<p>يعمل Milvus كقاعدة بيانات متجهة قابلة للتطوير تعثر بسرعة على نص متشابه دلاليًا، بينما يتيح لك برنامج Langflow إدارة كيفية تعامل خط الأنابيب مع استرجاع النص وتوليد الاستجابة. يوفران معًا طريقة فعالة لبناء خط أنابيب RAG قوي للتطبيقات المحسّنة القائمة على النصوص.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تشغيل هذا الدفتر، تأكد من تثبيت التبعيات التالية:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">البرنامج التعليمي<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تثبيت جميع التبعيات، ابدأ تشغيل لوحة معلومات Langflow عن طريق كتابة الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>ثم ستظهر لوحة تحكم منبثقة كما هو موضح أدناه: <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>نريد إنشاء مشروع <strong>Vector Store،</strong> لذا علينا أولاً النقر على زر <strong>مشروع جديد</strong>. ستظهر لوحة منبثقة، ونختار خيار <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>لوحة</span> </span></p>
<p>بمجرد أن يتم إنشاء مشروع Vector Store Rag بنجاح، فإن مخزن المتجهات الافتراضي هو AstraDB، بينما نريد استخدام Milvus. لذلك نحن بحاجة إلى استبدال هذه الوحدة النمطية astraDB بـ Milvus من أجل استخدام Milvus كمخزن متجهات. <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">خطوات استبدال astraDB بـ Milvus:</h3><ol>
<li>إزالة البطاقات الموجودة من مخزن المتجهات. انقر على بطاقتين من بطاقات AstraDB المميزة باللون الأحمر في الصورة أعلاه، واضغط على <strong>مسافة للخلف</strong> لحذفها.</li>
<li>انقر على خيار <strong>Vector Store</strong> في الشريط الجانبي، واختر Milvus واسحبه إلى اللوحة. افعل ذلك مرتين لأننا نحتاج إلى بطاقتي ميلفوس، واحدة لتخزين سير عمل معالجة الملفات والأخرى لسير عمل البحث.</li>
<li>اربط وحدات Milvus Modules ببقية المكونات. انظر الصورة أدناه للرجوع إليها.</li>
<li>قم بتكوين بيانات اعتماد Milvus لكلا وحدتي Milvus. إن أبسط طريقة هي استخدام Milvus Lite عن طريق تعيين URI اتصال إلى milvus_demo.db. إذا كان لديك خادم Milvus منشور ذاتيًا أو على Zilliz Cloud، فقم بتعيين URI الاتصال إلى نقطة نهاية الخادم وكلمة مرور الاتصال إلى الرمز المميز (بالنسبة لـ Milvus يكون ذلك متسلسلًا &quot;<username>:<password>&quot;، أما بالنسبة لـ Zilliz Cloud فهو مفتاح API). انظر الصورة أدناه كمرجع:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>عرض توضيحي لهيكل ميلفوس</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">تضمين المعرفة في نظام RAG</h3><ol>
<li>قم بتحميل ملف كقاعدة معرفية لـ LLM من خلال وحدة الملف في أسفل اليسار. قمنا هنا بتحميل ملف يحتوي على مقدمة موجزة عن ميلفوس</li>
<li>قم بتشغيل سير عمل الإدراج بالضغط على زر التشغيل في الوحدة النمطية Milvus في أسفل اليمين. سيؤدي ذلك إلى إدراج المعرفة في مخزن ملف ميلفوس المتجه</li>
<li>اختبر ما إذا كانت المعرفة في الذاكرة افتح الملعب واطلب أي شيء يتعلق بالملف الذي قمت بتحميله.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>لماذا ميلفوس</span> </span></p>
