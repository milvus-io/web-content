---
id: architecture_overview.md
summary: >-
  يوفر Milvus قاعدة بيانات متجهات سريعة وموثوقة ومستقرة مصممة خصيصًا للبحث عن
  التشابه والذكاء الاصطناعي.
title: نظرة عامة على بنية ميلفوس
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">نظرة عامة على بنية ميلفوس<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم Milvus على رأس مكتبات البحث عن المتجهات الشائعة بما في ذلك Faiss و HNSW و DiskANN و SCANN وغيرها، وقد صُمم Milvus للبحث عن التشابه في مجموعات بيانات المتجهات الكثيفة التي تحتوي على ملايين أو مليارات أو حتى تريليونات المتجهات. قبل المتابعة، تعرف على <a href="/docs/ar/glossary.md">المبادئ الأساسية</a> لاسترجاع التضمين.</p>
<p>يدعم Milvus أيضًا تجزئة البيانات، واستيعاب البيانات المتدفقة، والمخطط الديناميكي، والبحث الذي يجمع بين البيانات المتجهة والقياسية، والبحث متعدد المتجهات والهجين، والمتجهات المتفرقة والعديد من الوظائف المتقدمة الأخرى. توفر المنصة أداءً حسب الطلب ويمكن تحسينها لتناسب أي سيناريو استرجاع مضمن. نوصي بنشر Milvus باستخدام Kubernetes لتحقيق التوافر والمرونة المثلى.</p>
<p>تتبنى Milvus بنية تخزين مشتركة تتميز بتجزئة التخزين والحوسبة وقابلية التوسع الأفقي لعقد الحوسبة الخاصة بها. واتباعًا لمبدأ الفصل بين مستوى البيانات ومستوى التحكم، تتألف Milvus من <a href="/docs/ar/four_layers.md">أربع طبقات</a>: طبقة الوصول، وخدمة المنسق، والعقدة العاملة، والتخزين. هذه الطبقات مستقلة بشكل متبادل عندما يتعلق الأمر بالتوسع أو التعافي من الكوارث.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>مخطط_معماري</span> </span></p>
<p>وفقًا للشكل، يمكن تصنيف الواجهات إلى الفئات التالية:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML/إنتاج:</strong> إدراج/حذف/إدراج</li>
<li><strong>DQL:</strong> بحث / استعلام</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>تعرف على المزيد حول <a href="/docs/ar/four_layers.md">تقسيم الحوسبة/التخزين</a> في ميلفوس</li>
<li>تعرف على <a href="/docs/ar/main_components.md">المكونات الرئيسية</a> في ملفوس.</li>
</ul>
