---
id: best-practices-for-tiered-storage.md
title: أفضل الممارسات للتخزين المتدرجCompatible with Milvus 2.6.4+
summary: >-
  يوفر Milvus التخزين المتدرج لمساعدتك على التعامل بكفاءة مع البيانات واسعة
  النطاق مع تحقيق التوازن بين زمن استجابة الاستعلام والسعة واستخدام الموارد.
  يلخّص هذا الدليل التكوينات الموصى بها لأحمال العمل النموذجية ويشرح المنطق وراء
  كل استراتيجية ضبط.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">أفضل الممارسات للتخزين المتدرج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus التخزين المتدرج لمساعدتك على التعامل بكفاءة مع البيانات واسعة النطاق مع موازنة زمن استجابة الاستعلام والسعة واستخدام الموارد. يلخّص هذا الدليل التكوينات الموصى بها لأحمال العمل النموذجية ويشرح المنطق وراء كل استراتيجية ضبط.</p>
<h2 id="Before-you-start" class="common-anchor-header">قبل البدء<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>ميلفوس الإصدار 2.6.4 أو أحدث</p></li>
<li><p>يجب أن تحتوي عقد الاستعلام على موارد محلية مخصصة (ذاكرة وقرص). قد تشوه البيئات المشتركة تقدير ذاكرة التخزين المؤقت وتؤدي إلى سوء تقدير الإخلاء.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">اختر الاستراتيجية الصحيحة<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر التخزين المتدرج استراتيجيات تحميل وتخزين مؤقت مرنة يمكن دمجها لتناسب عبء العمل لديك.</p>
<table>
   <tr>
     <th><p>الهدف</p></th>
     <th><p>التركيز الموصى به</p></th>
     <th><p>الآلية الرئيسية</p></th>
   </tr>
   <tr>
     <td><p>تقليل وقت استجابة الاستعلام الأول</p></td>
     <td><p>التحميل المسبق للحقول الحرجة</p></td>
     <td><p>الإحماء</p></td>
   </tr>
   <tr>
     <td><p>التعامل مع البيانات واسعة النطاق بكفاءة</p></td>
     <td><p>التحميل عند الطلب</p></td>
     <td><p>تحميل كسول + تحميل جزئي</p></td>
   </tr>
   <tr>
     <td><p>الحفاظ على الاستقرار على المدى الطويل</p></td>
     <td><p>منع تجاوز ذاكرة التخزين المؤقت</p></td>
     <td><p>الإخلاء</p></td>
   </tr>
   <tr>
     <td><p>موازنة الأداء والسعة</p></td>
     <td><p>الجمع بين التحميل المسبق والتخزين المؤقت الديناميكي</p></td>
     <td><p>التكوين الهجين</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">السيناريو 1: الاسترجاع في الوقت الحقيقي، والاسترجاع في وقت الاستجابة المنخفض<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>متى تستخدم</strong></p>
<ul>
<li><p>وقت استجابة الاستعلام أمر بالغ الأهمية (على سبيل المثال، التوصية في الوقت الفعلي أو ترتيب البحث)</p></li>
<li><p>يتم الوصول إلى فهارس المتجهات الأساسية والمرشحات القياسية بشكل متكرر</p></li>
<li><p>الأداء المتسق أكثر أهمية من سرعة بدء التشغيل</p></li>
</ul>
<p><strong>التكوين الموصى به</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>الأساس المنطقي</strong></p>
<ul>
<li><p>يعمل الإحماء على التخلص من زمن الوصول الأول للفهارس القياسية والمتجهة عالية التردد.</p></li>
<li><p>يحافظ الإخلاء في الخلفية على ثبات ضغط ذاكرة التخزين المؤقت دون عرقلة الاستعلامات.</p></li>
<li><p>يؤدي تعطيل TTL لذاكرة التخزين المؤقت إلى تجنب عمليات إعادة التحميل غير الضرورية للبيانات الساخنة.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">السيناريو 2: التحليل الدفعي غير المتصل بالإنترنت<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>عند الاستخدام</strong></p>
<ul>
<li><p>تحمّل وقت استجابة الاستعلام مرتفع</p></li>
<li><p>تتضمن أحمال العمل مجموعات بيانات ضخمة أو العديد من الأجزاء</p></li>
<li><p>يتم إعطاء الأولوية للقدرة والإنتاجية على الاستجابة</p></li>
</ul>
<p><strong>التكوين الموصى به</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>الأساس المنطقي</strong></p>
<ul>
<li><p>يؤدي تعطيل الإحماء إلى تسريع بدء التشغيل عند تهيئة العديد من المقاطع.</p></li>
<li><p>تسمح العلامات المائية الأعلى باستخدام ذاكرة تخزين مؤقت أكثر كثافة، مما يحسن سعة التحميل الإجمالية.</p></li>
<li><p>يقوم TTL TTL لذاكرة التخزين المؤقت تلقائيًا بتنظيف البيانات غير المستخدمة لتحرير مساحة محلية.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">السيناريو 3: النشر المختلط (مختلط متصل + غير متصل)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>عند الاستخدام</strong></p>
<ul>
<li><p>مجموعة واحدة تخدم كلاً من أحمال العمل عبر الإنترنت والتحليلية</p></li>
<li><p>تتطلب بعض المجموعات وقت استجابة منخفض، بينما تعطي مجموعات أخرى الأولوية للسعة</p></li>
</ul>
<p><strong>الاستراتيجية الموصى بها</strong></p>
<ul>
<li><p>تطبيق <strong>التكوين في الوقت الفعلي</strong> على المجموعات الحساسة لزمن الاستجابة</p></li>
<li><p>تطبيق <strong>التكوين غير المتصل</strong> على المجموعات التحليلية أو الأرشيفية</p></li>
<li><p>اضبط نسبة ذاكرة التخزين المؤقت القابلة للإخلاء ونسبة ذاكرة التخزين المؤقت ونسب العلامات المائية بشكل مستقل لكل نوع من أنواع أحمال العمل</p></li>
</ul>
<p><strong>الأساس المنطقي</strong></p>
<p>يسمح الجمع بين التكوينات بالتحكم الدقيق في تخصيص الموارد.</p>
<p>تحافظ المجموعات الحرجة على ضمانات الكمون المنخفض، بينما يمكن للمجموعات الثانوية التعامل مع المزيد من المقاطع وحجم البيانات.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">نصائح ضبط إضافية<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>الجانب</p></th>
     <th><p>التوصية</p></th>
     <th><p>الشرح</p></th>
   </tr>
   <tr>
     <td><p><strong>نطاق الإحماء</strong></p></td>
     <td><p>التحميل المسبق للحقول أو الفهارس ذات التكرار العالي للاستعلام فقط.</p></td>
     <td><p>يزيد التحميل المسبق غير الضروري من وقت التحميل واستخدام الموارد.</p></td>
   </tr>
   <tr>
     <td><p><strong>ضبط الإخلاء</strong></p></td>
     <td><p>ابدأ بعلامات مائية افتراضية (75-80%) واضبطها تدريجيًا.</p></td>
     <td><p>تتسبب الفجوة الصغيرة في الإخلاء المتكرر؛ الفجوة الكبيرة تؤخر تحرير الموارد.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL TTL لذاكرة التخزين المؤقت</strong></p></td>
     <td><p>تعطيل لمجموعات البيانات الساخنة المستقرة؛ تمكين (على سبيل المثال، 1-3 أيام) للبيانات الديناميكية.</p></td>
     <td><p>يمنع تراكم ذاكرة التخزين المؤقت التي لا معنى لها مع موازنة نفقات التنظيف الزائدة.</p></td>
   </tr>
   <tr>
     <td><p><strong>نسبة الالتزام الزائد</strong></p></td>
     <td><p>تجنب القيم &gt; 0.7 إلا إذا كانت مساحة رأس الموارد كبيرة.</p></td>
     <td><p>قد يؤدي الإفراط في الالتزام المفرط إلى تعطل ذاكرة التخزين المؤقت وعدم استقرار زمن الاستجابة.</p></td>
   </tr>
   <tr>
     <td><p><strong>المراقبة</strong></p></td>
     <td><p>تتبع نسبة إصابة ذاكرة التخزين المؤقت واستخدام الموارد وتكرار الإخلاء.</p></td>
     <td><p>قد تشير الأحمال الباردة المتكررة إلى أن الإحماء أو العلامات المائية تحتاج إلى تعديل.</p></td>
   </tr>
</table>
