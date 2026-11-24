---
id: performance_faq.md
summary: >-
  اطلع على إجابات الأسئلة الشائعة حول أداء البحث، وتحسينات الأداء، والمسائل
  الأخرى المتعلقة بالأداء.
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">كيفية ضبط القيم <code translate="no">nlist</code> و <code translate="no">nprobe</code> لمؤشرات IVF؟</h4><p>يعتمد إعداد <code translate="no">nlist</code> على السيناريو المحدد. كقاعدة عامة، القيمة الموصى بها لـ <code translate="no">nlist</code> هي <code translate="no">4 × sqrt(n)</code> ، حيث <code translate="no">n</code> هو العدد الإجمالي للكيانات في المقطع.</p>
<p>يتم تحديد حجم كل مقطع بواسطة المعلمة <code translate="no">datacoord.segment.maxSize</code> ، والتي يتم تعيينها افتراضيًا على 1024 ميغابايت. يمكن تقدير العدد الإجمالي للكيانات في المقطع n بقسمة <code translate="no">datacoord.segment.maxSize</code> على حجم كل كيان.</p>
<p>يختلف إعداد المعلمة <code translate="no">nprobe</code> باختلاف مجموعة البيانات والسيناريو، ويتطلب التوفيق بين الدقة وأداء الاستعلام. نوصي بتحديد القيمة المثالية من خلال إجراء تجارب متكررة.</p>
<p>الرسوم البيانية التالية هي نتائج اختبار تم إجراؤه على مجموعة البيانات sift50m وفهرس IVF_SQ8، والذي يقارن بين معدل الاسترجاع وأداء الاستعلام لمختلف أزواج القيم <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>اختبار الدقة</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   اختبار الأداء</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">لماذا تستغرق الاستعلامات أحيانًا وقتًا أطول في مجموعات البيانات الأصغر حجمًا؟</h4><p>تُجرى عمليات الاستعلام على المقاطع. تقلل الفهارس من الوقت الذي يستغرقه الاستعلام عن مقطع ما. إذا لم يتم فهرسة مقطع ما، يلجأ Milvus إلى البحث بالقوة الغاشمة في البيانات الأولية — مما يزيد وقت الاستعلام بشكل كبير.</p>
<p>لذلك، عادةً ما يستغرق الاستعلام وقتًا أطول على مجموعة بيانات صغيرة (مجموعة) لأنها لم تُفهرس بعد. ويرجع ذلك إلى أن أحجام شرائحها لم تصل إلى عتبة إنشاء الفهرس المحددة بواسطة <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. استدعِ <code translate="no">create_index()</code> لإجبار Milvus على فهرسة الشرائح التي وصلت إلى العتبة ولكن لم يتم فهرستها تلقائيًا بعد، مما يحسّن أداء الاستعلام بشكل كبير.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">ما العوامل التي تؤثر على استخدام وحدة المعالجة المركزية (CPU)؟</h4><p>يزيد استخدام وحدة المعالجة المركزية (CPU) عندما يقوم Milvus بإنشاء الفهارس أو تشغيل الاستعلامات. بشكل عام، يعتبر إنشاء الفهارس عملية تستهلك الكثير من موارد وحدة المعالجة المركزية (CPU) باستثناء عند استخدام Annoy، الذي يعمل على خيط واحد.</p>
<p>عند تشغيل الاستعلامات، يتأثر استخدام وحدة المعالجة المركزية (CPU) بقيمتي <code translate="no">nq</code> و <code translate="no">nprobe</code>. عندما تكون قيمتي <code translate="no">nq</code> و <code translate="no">nprobe</code> صغيرتين، يكون التزامن منخفضًا ويظل استخدام وحدة المعالجة المركزية (CPU) منخفضًا.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">هل يؤثر إدراج البيانات والبحث في آن واحد على أداء الاستعلام؟</h4><p>عمليات الإدراج لا تستهلك الكثير من موارد وحدة المعالجة المركزية (CPU). ومع ذلك، نظرًا لأن المقاطع الجديدة قد لا تكون قد وصلت إلى الحد الأدنى المطلوب لبناء الفهرس، يلجأ Milvus إلى البحث بالقوة الغاشمة — مما يؤثر بشكل كبير على أداء الاستعلام.</p>
<p>يحدد المعامل <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> عتبة إنشاء الفهرس للجزء، ويتم تعيينه على 1024 صفًا بشكل افتراضي. راجع <a href="/docs/ar/system_configuration.md">«تكوين النظام»</a> لمزيد من المعلومات.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">هل يمكن أن يؤدي فهرسة حقل VARCHAR إلى تحسين سرعة الحذف؟</h4><p>يمكن أن يؤدي فهرسة حقل VARCHAR إلى تسريع عمليات «الحذف حسب التعبير»، ولكن فقط في ظل شروط معينة:</p>
<ul>
<li><strong>الفهرس المقلوب (INVERTED Index</strong>): يساعد هذا الفهرس في تعبيرات « <code translate="no">IN</code> » أو « <code translate="no">==</code> » على حقول VARCHAR غير المرتبطة بالمفتاح الأساسي.</li>
<li><strong>فهرس Trie</strong>: يساعد هذا الفهرس في استعلامات البادئة (على سبيل المثال، <code translate="no">LIKE prefix%</code>) على حقول VARCHAR غير الرئيسية.</li>
</ul>
<p>ومع ذلك، فإن فهرسة حقل VARCHAR لا تسرع:</p>
<ul>
<li><strong>الحذف باستخدام المعرفات (IDs)</strong>: عندما يكون حقل VARCHAR هو المفتاح الأساسي.</li>
<li><strong>التعبيرات غير ذات الصلة</strong>: عندما لا يكون حقل VARCHAR جزءًا من تعبير الحذف.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">هل لا تزال لديك أسئلة؟</h4><p>يمكنك:</p>
<ul>
<li>تصفح <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> على GitHub. لا تتردد في طرح الأسئلة ومشاركة الأفكار ومساعدة الآخرين.</li>
<li>انضم إلى <a href="https://discord.com/invite/8uyFbECzPX">قناتنا على Discord</a> للحصول على الدعم والتفاعل مع مجتمعنا مفتوح المصدر.</li>
</ul>
