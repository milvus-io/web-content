---
id: gpu_index.md
related_key: gpu_index
summary: آلية مؤشر GPU في ميلفوس.
title: فهرس وحدة معالجة الرسومات
---
<h1 id="GPU-Index" class="common-anchor-header">فهرس وحدة معالجة الرسومات<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>يدعم Milvus أنواع فهرس GPU المختلفة لتسريع أداء البحث وكفاءته، خاصةً في سيناريوهات الإنتاجية العالية والاستدعاء العالي. يقدم هذا الموضوع نظرة عامة على أنواع فهارس GPU التي تدعمها Milvus، وحالات الاستخدام المناسبة لها، وخصائص الأداء. للحصول على معلومات حول إنشاء الفهارس باستخدام وحدة معالجة الرسومات، راجع <a href="/docs/ar/index-with-gpu.md">الفهرسة باستخدام وحدة معالجة الرسومات</a>.</p>
<p>من المهم ملاحظة أن استخدام فهرس GPU قد لا يقلل بالضرورة من زمن الاستجابة مقارنة باستخدام فهرس وحدة المعالجة المركزية. إذا كنت ترغب في زيادة الإنتاجية إلى أقصى حد، فستحتاج إلى ضغط طلب مرتفع للغاية أو عدد كبير من ناقلات الاستعلام.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>الأداء</span> </span></p>
<p>يساهم فريق Nvidia <a href="https://rapids.ai/">RAPIDS</a> في دعم وحدة معالجة الرسومات في ميلفوس. فيما يلي أنواع فهرس GPU المدعومة حاليًا من قبل Milvus.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA هو فهرس قائم على الرسم البياني مُحسَّن لوحدات معالجة الرسوم البيانية، ويمكن أن يكون استخدام وحدات معالجة الرسومات الاستدلالية لتشغيل إصدار Milvus GPU أكثر فعالية من حيث التكلفة مقارنةً باستخدام وحدات معالجة الرسومات باهظة الثمن من فئة التدريب.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>تؤثر على الاستدعاء ووقت الإنشاء من خلال تحديد درجة الرسم البياني قبل التقليم. القيم الموصى بها هي <code translate="no">32</code> أو <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>تؤثر على أداء البحث والاستدعاء من خلال تحديد درجة الرسم البياني بعد التقليم. ينتج عن الفرق الأكبر بين هاتين الدرجتين وقت بناء أطول. يجب أن تكون قيمته أصغر من قيمة <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>يحدد خوارزمية إنشاء الرسم البياني قبل التقليم. القيم الممكنة:</br><code translate="no">IVF_PQ</code>: توفر جودة أعلى ولكن وقت بناء أبطأ.</br> <code translate="no">NN_DESCENT</code>: يوفر إنشاء أسرع مع احتمال استرجاع أقل.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. القيم الممكنة:</br><code translate="no">“true”</code>: تخزين مجموعة البيانات الأصلية مؤقتًا لتحسين الاستدعاء من خلال تحسين نتائج البحث.</br> <code translate="no">“false”</code>: عدم تخزين مجموعة البيانات الأصلية مؤقتًا لحفظ ذاكرة وحدة معالجة الرسومات.</td><td><code translate="no">“false”</code></td></tr>
<tr><td><code translate="no">adapt_for_cpu</code></td><td>يقرر ما إذا كان سيتم استخدام وحدة معالجة الرسومات لبناء الفهرس ووحدة المعالجة المركزية للبحث. <br/>يتطلب ضبط هذه المعلمة على <code translate="no">true</code> وجود المعلمة <code translate="no">ef</code> في طلبات البحث.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>تحدد حجم النتائج الوسيطة التي يتم الاحتفاظ بها أثناء البحث. قد تؤدي القيمة الأكبر إلى تحسين الاستدعاء على حساب أداء البحث. يجب أن تكون مساوية على الأقل للقيمة النهائية لأعلى k (الحد الأعلى) وعادةً ما تكون قوة 2 (على سبيل المثال، 16، 32، 64، 128).</td><td>فارغة</td></tr>
<tr><td><code translate="no">search_width</code></td><td>يحدد عدد نقاط الدخول إلى الرسم البياني CAGRA أثناء البحث. يمكن أن تؤدي زيادة هذه القيمة إلى تحسين الاستدعاء ولكنها قد تؤثر على أداء البحث （على سبيل المثال 1، 2، 4، 8، 16، 32).</td><td>فارغة</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>يتحكم في عملية تكرار البحث. بشكل افتراضي، يتم ضبطها على <code translate="no">0</code> ، وتحدد CAGRA تلقائيًا عدد التكرارات بناءً على <code translate="no">itopk_size</code> و <code translate="no">search_width</code>. يمكن أن يساعد ضبط هذه القيم يدويًا في تحقيق التوازن بين الأداء والدقة.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>يحدد عدد خيوط CUDA المستخدمة لحساب المسافة المترية على وحدة معالجة الرسومات. القيم الشائعة هي قوة 2 حتى 32 (على سبيل المثال 2، 4، 8، 16، 32). لها تأثير طفيف على أداء البحث. القيمة الافتراضية هي <code translate="no">0</code> ، حيث يقوم Milvus تلقائيًا بتحديد <code translate="no">team_size</code> بناءً على بُعد المتجه.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">ef</code></td><td>يحدد مفاضلة وقت/دقة الاستعلام. تؤدي القيمة الأعلى <code translate="no">ef</code> إلى بحث أكثر دقة ولكن أبطأ. <br/>هذه المعلمة إلزامية إذا قمت بتعيين <code translate="no">adapt_for_cpu</code> على <code translate="no">true</code> عند إنشاء الفهرس.</td><td><code translate="no">[top_k, int_max]</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>حدود البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (أعلى-ك)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (أعلى-ك)</td><td>&lt;=ماكس((<code translate="no">itopk_size</code> + 31)// 32، <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>على غرار <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT،</a> يقسم GPU_IVF_FLAT أيضًا بيانات المتجه إلى <code translate="no">nlist</code> وحدة عنقودية، ثم يقارن المسافات بين متجه الإدخال الهدف ومركز كل مجموعة. اعتمادًا على عدد المجموعات التي تم تعيين النظام للاستعلام عنها (<code translate="no">nprobe</code>)، يتم إرجاع نتائج بحث التشابه بناءً على المقارنات بين المدخلات المستهدفة والمتجهات في المجموعة (المجموعات) الأكثر تشابهًا فقط - مما يقلل وقت الاستعلام بشكل كبير.</p>
<p>من خلال ضبط <code translate="no">nprobe</code> ، يمكن إيجاد توازن مثالي بين الدقة والسرعة لسيناريو معين. توضح نتائج <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">اختبار أداء IVF_FLAT</a> أن وقت الاستعلام يزداد بشكل حاد مع زيادة عدد متجهات الإدخال المستهدفة (<code translate="no">nq</code>)، وعدد المجموعات المطلوب البحث عنها (<code translate="no">nprobe</code>).</p>
<p>يعد GPU_IVF_FLAT هو فهرس IVF الأساسي، وتكون البيانات المشفرة المخزنة في كل وحدة متسقة مع البيانات الأصلية.</p>
<p>عند إجراء عمليات البحث، لاحظ أنه يمكنك تعيين أعلى K حتى 256 لأي بحث مقابل مجموعة مفهرسة GPU_IVF_FLAT.</p>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات المجموعة</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. القيم الممكنة:</br><code translate="no">“true”</code>: تخزين مجموعة البيانات الأصلية مؤقتًا لتحسين الاستدعاء من خلال تحسين نتائج البحث.</br> <code translate="no">“false”</code>: عدم تخزين مجموعة البيانات الأصلية مؤقتًا لحفظ ذاكرة وحدة معالجة الرسومات.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث شائع</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>حدود البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (أعلى-ك)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (التكميم الكمي للمنتج) تحلل بشكل موحد الفضاء المتجه الأصلي عالي الأبعاد إلى نواتج ديكارتية من <code translate="no">m</code> مساحات متجهة منخفضة الأبعاد، ثم تقوم بتكميم المساحات المتجهة منخفضة الأبعاد المتحللة. وبدلاً من حساب المسافات بين المتجه الهدف ومركز جميع الوحدات، يتيح التكميم الكمي للمنتج حساب المسافات بين المتجه الهدف ومركز التجميع لكل فضاء منخفض الأبعاد ويقلل بشكل كبير من تعقيد الوقت وتعقيد المساحة للخوارزمية.</p>
<p>يقوم IVF_PQ بإجراء تجميع فهرس IVF قبل تكميم حاصل ضرب المتجهات. ملف الفهرس الخاص به أصغر من IVF_SQ8، لكنه يتسبب أيضًا في فقدان الدقة أثناء البحث عن المتجهات.</p>
<div class="alert note">
<p>تختلف معلمات بناء الفهرس ومعلمات البحث باختلاف توزيع Milvus. حدد توزيع ميلفوس الخاص بك أولاً.</p>
<p>عند إجراء عمليات البحث، لاحظ أنه يمكنك تعيين أعلى K حتى 8192 لأي بحث مقابل مجموعة مفهرسة GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>معلمات بناء الفهرس</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>عدد وحدات المجموعة</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>عدد عوامل تكميم المنتج,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[اختياري] عدد وحدات البت التي يتم تخزين كل متجه منخفض الأبعاد فيها.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>يقرر ما إذا كان سيتم تخزين مجموعة البيانات الأصلية مؤقتًا في ذاكرة وحدة معالجة الرسومات. القيم الممكنة:</br><code translate="no">“true”</code>: تخزين مجموعة البيانات الأصلية مؤقتًا لتحسين الاستدعاء من خلال تحسين نتائج البحث.</br> <code translate="no">“false”</code>: عدم تخزين مجموعة البيانات الأصلية مؤقتًا لحفظ ذاكرة وحدة معالجة الرسومات.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>معلمات البحث</p>
<ul>
<li><p>بحث شائع</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>عدد الوحدات المطلوب الاستعلام عنها</td><td>[1، ن ليست]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>حدود البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>النطاق</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (أعلى-ك)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">gpu_brute_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>تم تصميم GPU_BRUTE_FORCE للحالات التي يكون فيها الاستدعاء العالي للغاية أمرًا بالغ الأهمية، مما يضمن استدعاء 1 من خلال مقارنة كل استعلام مع جميع المتجهات في مجموعة البيانات. يتطلب فقط نوع المقياس (<code translate="no">metric_type</code>) و top-k (<code translate="no">limit</code>) كمعلمات بناء الفهرس والبحث.</p>
<p>بالنسبة إلى GPU_BRUTE_FORCE، لا يلزم إضافة معلمات بناء الفهرس أو معلمات البحث.</p>
<h2 id="Conclusion" class="common-anchor-header">الخلاصة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>في الوقت الحالي، يقوم Milvus بتحميل جميع الفهارس في ذاكرة وحدة معالجة الرسومات لعمليات بحث فعالة. يعتمد مقدار البيانات التي يمكن تحميلها على حجم ذاكرة وحدة معالجة الرسومات:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: يبلغ استخدام الذاكرة حوالي 1.8 ضعف استخدام البيانات المتجهة الأصلية.</li>
<li><strong>GPU_IVF_FLAT</strong> و <strong>GPU_BRUTE_FORCE</strong>: يتطلب ذاكرة مساوية لحجم البيانات الأصلية.</li>
<li><strong>GPU_IVF_PQ</strong>: يستخدم بصمة ذاكرة أصغر، والتي تعتمد على إعدادات معلمة الضغط.</li>
</ul>
