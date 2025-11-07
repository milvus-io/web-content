---
id: warm-up.md
title: الإحماءCompatible with Milvus 2.6.4+
summary: >-
  في Milvus، يكمل خاصية الإحماء التخزين المتدرج من خلال تخفيف زمن الوصول الأول
  الذي يحدث عند الوصول إلى البيانات الباردة لأول مرة. وبمجرد التهيئة، تقوم خاصية
  الإحماء بالتحميل المسبق لأنواع محددة من الحقول أو الفهارس في ذاكرة التخزين
  المؤقت قبل أن يصبح المقطع قابلاً للاستعلام، مما يضمن توفر البيانات التي يتم
  الوصول إليها بشكل متكرر فور تحميلها.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">الإحماء<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، يكمل خاصية <strong>الإحماء</strong> التخزين المتدرج من خلال التخفيف من زمن الوصول الأول الذي يحدث عند الوصول إلى البيانات الباردة لأول مرة. وبمجرد التهيئة، تقوم خاصية الإحماء بالتحميل المسبق لأنواع محددة من الحقول أو الفهارس في ذاكرة التخزين المؤقت قبل أن يصبح المقطع قابلاً للاستعلام، مما يضمن توفر البيانات التي يتم الوصول إليها بشكل متكرر فور تحميلها.</p>
<h2 id="Why-warm-up" class="common-anchor-header">لماذا الإحماء<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل<a href="/docs/ar/tiered-storage-overview.md#Phase-1-Lazy-load">التحميل البطيء</a> في التخزين المتدرج على تحسين الكفاءة عن طريق تحميل البيانات الوصفية فقط في البداية. ومع ذلك، يمكن أن يتسبب ذلك في حدوث تأخير في أول استعلام للبيانات الباردة، حيث يجب جلب القطع أو الفهارس المطلوبة من تخزين الكائنات.</p>
<p>تحل<strong>ميزة الإحماء</strong> هذه المشكلة عن طريق التخزين المؤقت للبيانات الهامة بشكل استباقي أثناء تهيئة المقطع.</p>
<p>إنه مفيد بشكل خاص عندما:</p>
<ul>
<li><p>يتم استخدام فهارس قياسية معينة بشكل متكرر في ظروف التصفية.</p></li>
<li><p>الفهارس المتجهة ضرورية لأداء البحث ويجب أن تكون جاهزة على الفور.</p></li>
<li><p>يكون زمن انتظار البدء البارد بعد إعادة تشغيل QueryNode أو تحميل مقطع جديد غير مقبول.</p></li>
</ul>
<p>في المقابل، <strong>لا يوصى</strong> بالإحماء للحقول أو الفهارس التي يتم الاستعلام عنها بشكل غير متكرر. يؤدي تعطيل الإحماء إلى تقصير وقت تحميل المقطع والحفاظ على مساحة ذاكرة التخزين المؤقت - وهو مثالي للحقول المتجهة الكبيرة أو الحقول القياسية غير الحرجة.</p>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم التحكم في الإحماء ضمن <code translate="no">queryNode.segcore.tieredStorage.warmup</code> في <code translate="no">milvus.yaml</code>. يمكنك تكوينه بشكل منفصل للحقول القياسية والفهارس القياسية والحقول المتجهة والفهارس المتجهة. يدعم كل هدف وضعين:</p>
<table>
   <tr>
     <th><p>الوضع</p></th>
     <th><p>الوصف</p></th>
     <th><p>السيناريو النموذجي</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>التحميل المسبق قبل أن يصبح المقطع قابلاً للاستعلام. يزيد وقت التحميل قليلاً، لكن الاستعلام الأول لا يتكبد أي تأخير.</p></td>
     <td><p>يُستخدم للبيانات ذات الأداء الحرج التي يجب أن تكون متاحة على الفور، مثل الفهارس القياسية عالية التردد أو فهارس المتجهات الرئيسية المستخدمة في البحث.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>تخطي التحميل المسبق. يصبح المقطع قابلاً للاستعلام بشكل أسرع، ولكن قد يؤدي الاستعلام الأول إلى التحميل عند الطلب.</p></td>
     <td><p>يُستخدم للبيانات التي يتم الوصول إليها بشكل غير متكرر أو البيانات الكبيرة مثل الحقول المتجهة الخام أو الحقول القياسية غير الحرجة.</p></td>
   </tr>
</table>
<p><strong>مثال YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>القيم</p></th>
     <th><p>الوصف</p></th>
     <th><p>حالة الاستخدام الموصى بها</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>يتحكم فيما إذا كان يتم تحميل بيانات الحقل القياسي مسبقاً.</p></td>
     <td><p>استخدم <code translate="no">sync</code> فقط إذا كانت الحقول العددية صغيرة ويتم الوصول إليها بشكل متكرر في المرشحات. خلاف ذلك، <code translate="no">disable</code> لتقليل وقت التحميل.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>يتحكم فيما إذا كان يتم تحميل الفهارس العددية مسبقاً.</p></td>
     <td><p>استخدم <code translate="no">sync</code> للفهارس العددية المتضمنة في شروط التصفية المتكررة أو استعلامات النطاق.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>يتحكم فيما إذا كان يتم تحميل بيانات الحقل المتجه مسبقًا.</p></td>
     <td><p>بشكل عام <code translate="no">disable</code> لتجنب الاستخدام الكثيف لذاكرة التخزين المؤقت. قم بتمكين <code translate="no">sync</code> فقط عندما يجب استرداد المتجهات الخام مباشرةً بعد البحث (على سبيل المثال، نتائج التشابه مع استدعاء المتجهات).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>يتحكم فيما إذا كان يتم تحميل فهارس المتجهات مسبقًا أم لا.</p></td>
     <td><p>استخدم <code translate="no">sync</code> للفهارس المتجهة التي تعتبر حاسمة بالنسبة لزمن انتقال البحث. في أحمال العمل المجمعة أو منخفضة التردد، <code translate="no">disable</code> لجاهزية المقاطع بشكل أسرع.</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">أفضل الممارسات<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>يؤثر الإحماء على التحميل الأولي فقط. إذا تم إخلاء البيانات المخزنة مؤقتًا في وقت لاحق، فسيتم إعادة تحميل الاستعلام التالي عند الطلب.</p>
<ul>
<li><p>تجنب الإفراط في استخدام <code translate="no">sync</code>. يزيد التحميل المسبق للعديد من الحقول من وقت التحميل وضغط ذاكرة التخزين المؤقت.</p></li>
<li><p>ابدأ بتحفظ - قم بتمكين الإحماء فقط للحقول والفهارس التي يتم الوصول إليها بشكل متكرر.</p></li>
<li><p>راقب وقت استجابة الاستعلام ومقاييس ذاكرة التخزين المؤقت، ثم قم بتوسيع التحميل المسبق حسب الحاجة.</p></li>
<li><p>بالنسبة لأحمال العمل المختلطة، قم بتطبيق <code translate="no">sync</code> على المجموعات الحساسة للأداء و <code translate="no">disable</code> على المجموعات الموجهة نحو السعة.</p></li>
</ul>
