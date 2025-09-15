---
id: performance_faq.md
summary: >-
  اعثر على إجابات للأسئلة المتداولة حول أداء البحث، وتحسينات الأداء، وغيرها من
  المشكلات المتعلقة بالأداء.
title: الأسئلة الشائعة حول الأداء
---
<h1 id="Performance-FAQ" class="common-anchor-header">الأسئلة الشائعة حول الأداء<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">كيف يتم تعيين <code translate="no">nlist</code> و <code translate="no">nprobe</code> لفهارس IVF؟</h4><p>الإعداد <code translate="no">nlist</code> خاص بالسيناريو. وكقاعدة عامة، فإن القيمة الموصى بها <code translate="no">nlist</code> هي <code translate="no">4 × sqrt(n)</code> ، حيث <code translate="no">n</code> هو إجمالي عدد الكيانات في المقطع.</p>
<p>يتم تحديد حجم كل مقطع بواسطة المعلمة <code translate="no">datacoord.segment.maxSize</code> ، والتي يتم تعيينها إلى 512 ميجابايت افتراضيًا. يمكن تقدير العدد الإجمالي للكيانات في المقطع n بقسمة <code translate="no">datacoord.segment.maxSize</code> على حجم كل كيان.</p>
<p>إن تحديد <code translate="no">nprobe</code> خاص بمجموعة البيانات والسيناريو، ويتضمن مفاضلة بين الدقة وأداء الاستعلام. نوصي بإيجاد القيمة المثالية من خلال التجريب المتكرر.</p>
<p>الرسوم البيانية التالية هي نتائج اختبار تم إجراؤه على مجموعة بيانات sift50m وفهرس IVF_SQ8، والذي يقارن بين الاستدعاء وأداء الاستعلام لأزواج مختلفة <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>اختبار الدقة</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>اختبار الأداء</span> <span>اختبار الأداء</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">لماذا تستغرق الاستعلامات أحيانًا وقتًا أطول على مجموعات البيانات الأصغر؟</h4><p>تُجرى عمليات الاستعلام على شرائح. تقلل الفهارس من الوقت الذي يستغرقه الاستعلام عن مقطع ما. إذا لم تتم فهرسة مقطع ما، يلجأ برنامج Milvus إلى البحث بالقوة الغاشمة على البيانات الخام - مما يزيد من وقت الاستعلام بشكل كبير.</p>
<p>لذلك، عادةً ما يستغرق الاستعلام عن مجموعة بيانات صغيرة (مجموعة) وقتًا أطول لأنه لم يتم إنشاء فهرس لها. ويرجع ذلك إلى عدم وصول أحجام شرائحه إلى عتبة بناء الفهرس التي حددها <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. اتصل بـ <code translate="no">create_index()</code> لإجبار ميلفوس على فهرسة المقاطع التي وصلت إلى العتبة ولكن لم تتم فهرستها تلقائيًا بعد، مما يحسن أداء الاستعلام بشكل كبير.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">ما هي العوامل التي تؤثر على استخدام وحدة المعالجة المركزية؟</h4><p>يزداد استخدام وحدة المعالجة المركزية عندما يقوم ميلفوس ببناء الفهارس أو تشغيل الاستعلامات. بشكل عام، يكون إنشاء الفهرس مكثفًا لوحدة المعالجة المركزية إلا عند استخدام Annoy، الذي يعمل على مؤشر ترابط واحد.</p>
<p>عند تشغيل الاستعلامات، يتأثر استخدام وحدة المعالجة المركزية <code translate="no">nq</code> و <code translate="no">nprobe</code>. عندما يكون <code translate="no">nq</code> و <code translate="no">nprobe</code> صغيرًا، يكون التزامن منخفضًا ويظل استخدام وحدة المعالجة المركزية منخفضًا.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">هل يؤثر إدراج البيانات والبحث في نفس الوقت على أداء الاستعلام؟</h4><p>عمليات الإدراج ليست كثيفة الاستخدام لوحدة المعالجة المركزية. ومع ذلك، نظرًا لأن المقاطع الجديدة قد لا تصل إلى الحد الأدنى لبناء الفهرس، يلجأ ميلفوس إلى البحث بالقوة الغاشمة - مما يؤثر بشكل كبير على أداء الاستعلام.</p>
<p>تحدد المعلمة <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> عتبة بناء الفهرس للمقطع، ويتم تعيينها إلى 1024 صفًا بشكل افتراضي. راجع <a href="/docs/ar/system_configuration.md">تكوين النظام</a> لمزيد من المعلومات.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">هل يمكن أن تؤدي فهرسة حقل VARCHAR إلى تحسين سرعة الحذف؟</h4><p>يمكن أن تؤدي فهرسة حقل VARCHAR إلى تسريع عمليات "الحذف حسب التعبير"، ولكن في ظل ظروف معينة فقط:</p>
<ul>
<li><strong>الفهرس المقلوب</strong>: يساعد هذا الفهرس في فهرسة <code translate="no">IN</code> أو <code translate="no">==</code> التعبيرات على حقول VARCHAR غير الأساسية.</li>
<li><strong>الفهرس الثلاثي</strong>: يساعد هذا الفهرس في استعلامات البادئة (على سبيل المثال، <code translate="no">LIKE prefix%</code>) على حقول VARCHAR غير أساسية.</li>
</ul>
<p>ومع ذلك، لا تؤدي فهرسة حقل VARCHAR إلى تسريع عملية الفهرسة:</p>
<ul>
<li><strong>الحذف حسب المعرفات</strong>: عندما يكون حقل VARCHAR هو المفتاح الأساسي.</li>
<li><strong>التعبيرات غير المرتبطة</strong>: عندما لا يكون حقل VARCHAR جزءًا من تعبير الحذف.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">هل لا تزال لديك أسئلة؟</h4><p>يمكنك ذلك:</p>
<ul>
<li>الاطلاع على <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> على GitHub. لا تتردد في طرح الأسئلة ومشاركة الأفكار ومساعدة الآخرين.</li>
<li>انضم إلى <a href="https://discord.com/invite/8uyFbECzPX">قناة Discord</a> الخاصة بنا للحصول على الدعم والتفاعل مع مجتمعنا مفتوح المصدر.</li>
</ul>
