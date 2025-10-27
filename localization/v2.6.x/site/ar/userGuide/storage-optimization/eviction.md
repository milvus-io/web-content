---
id: eviction.md
title: الإخلاءCompatible with Milvus 2.6.4+
summary: >-
  يدير الإخلاء موارد ذاكرة التخزين المؤقت لكل عقدة استعلام في Milvus. عند
  تمكينه، يقوم تلقائيًا بإزالة البيانات المخزنة مؤقتًا بمجرد الوصول إلى عتبات
  الموارد، مما يضمن أداءً مستقرًا ويمنع استنفاد الذاكرة أو القرص.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">الإخلاء<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>يدير الإخلاء موارد ذاكرة التخزين المؤقت لكل عقدة استعلام في Milvus. عند تمكينه، يقوم تلقائيًا بإزالة البيانات المخزنة مؤقتًا بمجرد الوصول إلى عتبات الموارد، مما يضمن أداءً مستقرًا ويمنع استنفاد الذاكرة أو القرص.</p>
<p>يستخدم الإخلاء سياسة <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">أقل استخدامًا (LRU)</a> لاستعادة مساحة ذاكرة التخزين المؤقت. يتم تخزين البيانات الوصفية دائمًا في ذاكرة التخزين المؤقت ولا يتم إخلاؤها أبدًا، لأنها ضرورية لتخطيط الاستعلامات وعادةً ما تكون صغيرة.</p>
<div class="alert note">
<p>يجب تمكين الإخلاء بشكل صريح. بدون التهيئة، ستستمر البيانات المخزنة مؤقتًا في التراكم حتى يتم استنفاد الموارد.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">أنواع الإخلاء<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ميلفوس وضعين متكاملين للإخلاء<strong>(المزامنة</strong> والإخلاء <strong>غير المتزامن</strong>) يعملان معاً من أجل إدارة مثالية للموارد:</p>
<table>
   <tr>
     <th><p>المزامنة</p></th>
     <th><p>الإخلاء المتزامن</p></th>
     <th><p>الإخلاء غير المتزامن</p></th>
   </tr>
   <tr>
     <td><p>الزناد</p></td>
     <td><p>يحدث أثناء الاستعلام أو البحث عندما يتجاوز استخدام الذاكرة أو القرص الحدود الداخلية.</p></td>
     <td><p>يتم تشغيله بواسطة مؤشر ترابط في الخلفية عندما يتجاوز الاستخدام علامة مائية عالية أو عندما تصل البيانات المخزنة مؤقتًا إلى وقت التشغيل (TTL).</p></td>
   </tr>
   <tr>
     <td><p>السلوك</p></td>
     <td><p>تتوقف عمليات الاستعلام أو البحث مؤقتًا مؤقتًا بينما تستعيد "عقدة الاستعلام" مساحة التخزين المؤقت. تستمر عملية الإخلاء حتى ينخفض الاستخدام إلى ما دون العلامة المائية المنخفضة أو تحدث مهلة. إذا تم الوصول إلى المهلة ولم يكن بالإمكان استعادة بيانات كافية، فقد يفشل الاستعلام أو البحث.</p></td>
     <td><p>يتم تشغيله بشكل دوري في الخلفية بشكل استباقي لإخلاء البيانات المخزنة مؤقتًا عندما يتجاوز الاستخدام العلامة المائية العالية أو عند انتهاء صلاحية البيانات بناءً على مدة صلاحية التخزين المؤقت. يستمر الإخلاء حتى ينخفض الاستخدام إلى ما دون العلامة المائية المنخفضة. لا يتم حظر الاستعلامات.</p></td>
   </tr>
   <tr>
     <td><p>الأفضل ل</p></td>
     <td><p>أحمال العمل التي يمكن أن تتحمل طفرات وقت الاستجابة القصيرة أو التوقف المؤقت أثناء ذروة الاستخدام. مفيد عندما لا يمكن للإخلاء غير المتزامن استعادة المساحة بالسرعة الكافية.</p></td>
     <td><p>أحمال العمل الحساسة للكمون التي تتطلب أداء استعلام سلسًا ويمكن التنبؤ به. مثالية لإدارة الموارد الاستباقية.</p></td>
   </tr>
   <tr>
     <td><p>تحذيرات</p></td>
     <td><p>يمكن أن يسبب تأخيرات قصيرة في الاستعلام أو مهلات في حالة عدم توفر بيانات كافية قابلة للإخلاء.</p></td>
     <td><p>يتطلب علامات مائية عالية/منخفضة مضبوطة بشكل صحيح وإعدادات TTL. نفقات زائدة طفيفة من مؤشر ترابط الخلفية.</p></td>
   </tr>
   <tr>
     <td><p>التهيئة</p></td>
     <td><p>ممكّن عبر <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>ممكّن عبر <code translate="no">backgroundEvictionEnabled: true</code> (يتطلب <code translate="no">evictionEnabled: true</code> في نفس الوقت)</p></td>
   </tr>
</table>
<p><strong>الإعداد الموصى به</strong>:</p>
<ul>
<li><p>يمكن تمكين كلا وضعي الإخلاء معًا لتحقيق التوازن الأمثل، شريطة أن يستفيد عبء العمل لديك من التخزين المتدرج ويمكنه تحمل زمن الوصول إلى زمن الوصول المرتبط بالإخلاء.</p></li>
<li><p>بالنسبة لاختبار الأداء أو السيناريوهات الحرجة لوقت الاستجابة، ضع في اعتبارك تعطيل الإخلاء بالكامل لتجنب الحمل الزائد لجلب الشبكة بعد الإخلاء.</p></li>
</ul>
<div class="alert note">
<p>بالنسبة للحقول والفهارس القابلة للإخلاء، تتطابق وحدة الإخلاء مع دقة التحميل - يتم إخلاء الحقول العددية/المتجهات حسب القطعة ويتم إخلاء الفهارس العددية/المتجهات حسب المقطع.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">تمكين الإخلاء<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>تكوين الإخلاء ضمن <code translate="no">queryNode.segcore.tieredStorage</code> في <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>النوع</p></th>
     <th><p>القيم</p></th>
     <th><p>الوصف</p></th>
     <th><p>حالة الاستخدام الموصى بها</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>بولي</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>مفتاح رئيسي لاستراتيجية الإخلاء. الإعداد الافتراضي إلى <code translate="no">false</code>. تمكين وضع الإخلاء المتزامن.</p></td>
     <td><p>يتم تعيينه دائمًا على <code translate="no">true</code> في التخزين المتدرج.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>بool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>تشغيل الإخلاء بشكل غير متزامن في الخلفية. يتطلب <code translate="no">evictionEnabled: true</code>. الإعداد الافتراضي إلى <code translate="no">false</code>.</p></td>
     <td><p>استخدم <code translate="no">true</code> للحصول على أداء استعلام أكثر سلاسة؛ فهو يقلل من تكرار إخلاء المزامنة.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">تكوين العلامات المائية<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>تحدد العلامات المائية متى يبدأ إخلاء ذاكرة التخزين المؤقت وينتهي لكل من الذاكرة والقرص. لكل نوع مورد عتبتان:</p>
<ul>
<li><p><strong>علامة مائية عالية</strong>: يبدأ الإخلاء عندما يتجاوز الاستخدام هذه القيمة.</p></li>
<li><p><strong>علامة مائية منخفضة</strong>: يستمر الإخلاء حتى يقل الاستخدام عن هذه القيمة.</p></li>
</ul>
<div class="alert note">
<p>يسري هذا التكوين فقط عند <a href="/docs/ar/eviction.md#Enable-eviction">تمكين الإخلاء</a>.</p>
</div>
<p><strong>مثال YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>النوع</p></th>
     <th><p>النطاق</p></th>
     <th><p>الوصف</p></th>
     <th><p>حالة الاستخدام الموصى بها</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>عائم</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>مستوى استخدام الذاكرة حيث يتوقف الإخلاء.</p></td>
     <td><p>ابدأ من <code translate="no">0.75</code>. أقل قليلاً إذا كانت ذاكرة QueryNode محدودة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>عائم</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>مستوى استخدام الذاكرة حيث يبدأ الإخلاء غير المتزامن.</p></td>
     <td><p>ابدأ من <code translate="no">0.8</code>. احتفظ بفجوة معقولة من العلامة المائية المنخفضة (على سبيل المثال، 0.05-0.10) لمنع المشغلات المتكررة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>تعويم</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>مستوى استخدام القرص حيث يتوقف الإخلاء.</p></td>
     <td><p>ابدأ من <code translate="no">0.75</code>. اضبط أقل إذا كان إدخال/إخراج القرص محدودًا.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>عائم</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>مستوى استخدام القرص حيث يبدأ الإخلاء غير المتزامن.</p></td>
     <td><p>ابدأ من <code translate="no">0.8</code>. احتفظ بفجوة معقولة من العلامة المائية المنخفضة (على سبيل المثال، 0.05-0.10) لمنع المشغلات المتكررة.</p></td>
   </tr>
</table>
<p><strong>أفضل الممارسات</strong>:</p>
<ul>
<li><p>لا تقم بتعيين علامات مائية عالية أو منخفضة أعلى من 0.80 تقريبًا لترك مساحة للاستخدام الثابت لعقدة الاستعلام الثابتة وعمليات الاندفاع في وقت الاستعلام.</p></li>
<li><p>تجنب الفجوات الكبيرة بين العلامات المائية المرتفعة والمنخفضة؛ فالفجوات الكبيرة تطيل كل دورة إخلاء ويمكن أن تضيف وقت استجابة.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">تكوين TTL TTL لذاكرة التخزين المؤقت<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم<strong>وقت التخزين المؤقت للذاكرة المؤقتة (TTL)</strong> تلقائيًا بإزالة البيانات المخزنة مؤقتًا بعد مدة محددة، حتى إذا لم يتم الوصول إلى عتبات الموارد. وهو يعمل جنبًا إلى جنب مع الإخلاء LRU لمنع البيانات القديمة من شغل ذاكرة التخزين المؤقت إلى أجل غير مسمى.</p>
<div class="alert note">
<p>تتطلب ذاكرة التخزين المؤقت TTL <code translate="no">backgroundEvictionEnabled: true</code> ، حيث يتم تشغيلها على نفس مؤشر ترابط الخلفية.</p>
</div>
<p><strong>مثال YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>النوع</p></th>
     <th><p>الوحدة</p></th>
     <th><p>الوصف</p></th>
     <th><p>حالة الاستخدام الموصى بها</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>عدد صحيح</p></td>
     <td><p>ثانية</p></td>
     <td><p>المدة قبل انتهاء صلاحية البيانات المخزنة مؤقتاً. تتم إزالة العناصر منتهية الصلاحية في الخلفية.</p></td>
     <td><p>استخدم TTL TTL قصيرة (ساعات) للبيانات الديناميكية للغاية؛ استخدم TTL طويلة (أيام) لمجموعات البيانات المستقرة. قم بتعيين 0 لتعطيل انتهاء الصلاحية المستند إلى الوقت.</p></td>
   </tr>
</table>
