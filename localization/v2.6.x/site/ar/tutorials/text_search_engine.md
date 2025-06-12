---
id: text_search_engine.md
summary: أنشئ محرك بحث نصي باستخدام Milvus.
title: محرك بحث نصي
---
<h1 id="Text-Search-Engine" class="common-anchor-header">محرك بحث نصي<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>في هذا البرنامج التعليمي، سوف تتعلم كيفية استخدام Milvus، قاعدة البيانات المتجهة مفتوحة المصدر، لبناء محرك بحث نصي.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">دفتر جوبيتر المفتوح</a></li>
</ul>
<p>يتضمن نموذج التعلم الآلي وبرامج الطرف الثالث المستخدمة:</p>
<ul>
<li>بيرت</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">تاهي</a></li>
</ul>
<p><br/></p>
<p>أحد التطبيقات الرئيسية لميلفوس في مجال معالجة اللغات الطبيعية (NLP) هو محرك البحث عن النصوص. وهو أداة رائعة يمكن أن تساعد المستخدمين في العثور على المعلومات التي يبحثون عنها. ويمكنه حتى إظهار المعلومات التي يصعب العثور عليها. تقارن محركات البحث النصي الكلمات المفتاحية أو الدلالات التي يدخلها المستخدمون بقاعدة بيانات من النصوص، ثم تُعيد النتائج التي تستوفي معايير معينة.</p>
<p><br/></p>
<p>ستتعلم في هذا البرنامج التعليمي كيفية إنشاء محرك بحث نصي. يستخدم هذا البرنامج التعليمي BERT لتحويل النصوص إلى متجهات ذات طول ثابت. يستخدم ميلفوس كقاعدة بيانات المتجهات للتخزين والبحث عن تشابه المتجهات. ثم استخدم MySQL لتعيين معرفات المتجهات التي تم إنشاؤها بواسطة Milvus إلى بيانات النص.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
