---
id: warm-up.md
title: الإحماءCompatible with Milvus 2.6.4+
summary: >-
  يكمل الإحماء التخزين المتدرج عن طريق التحميل المسبق للحقول أو الفهارس المحددة
  في ذاكرة التخزين المؤقت قبل أن يصبح المقطع قابلاً للاستعلام. يمكنك تكوين عملية
  الإحماء على مستوى المجموعة أو المجموعة أو الحقل/الفهرس الفردي، مما يتيح تحكمًا
  دقيقًا في زمن وصول الاستعلام الأول واستخدام الموارد.
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
    </button></h1><p>تكمل ميزة<strong>الإحماء</strong> عملية<strong>الإحماء</strong> التخزين المتدرج عن طريق التحميل المسبق للحقول أو الفهارس المحددة في ذاكرة التخزين المؤقت قبل أن يصبح المقطع قابلاً للاستعلام. يمكنك تكوين عملية الإحماء على مستوى المجموعة أو المجموعة أو الحقل/الفهرس الفردي، مما يتيح تحكمًا دقيقًا في زمن وصول الاستعلام الأول واستخدام الموارد.</p>
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
    </button></h2><p>يعمل<a href="/docs/ar/tiered-storage-overview.md#Phase-1-Lazy-load">التحميل البطيء</a> في التخزين المتدرج على تحسين الكفاءة عن طريق تحميل البيانات الوصفية فقط في البداية. ومع ذلك، يمكن أن يتسبب ذلك في حدوث تأخير في الاستعلام الأول للبيانات الباردة، حيث يجب جلب الأجزاء أو الفهارس المطلوبة من التخزين البعيد.</p>
<p>تحل خاصية<strong>الإحماء</strong> هذه المشكلة عن طريق التخزين المؤقت للبيانات الهامة بشكل استباقي أثناء تهيئة المقطع.</p>
<p>إنه مفيد بشكل خاص عندما:</p>
<ul>
<li><p>يتم استخدام فهارس قياسية معينة بشكل متكرر في ظروف التصفية.</p></li>
<li><p>الفهارس المتجهة ضرورية لأداء البحث ويجب أن تكون جاهزة على الفور.</p></li>
<li><p>يكون زمن انتظار البدء البارد بعد إعادة تشغيل QueryNode أو تحميل مقطع جديد غير مقبول.</p></li>
</ul>
<p>في المقابل، <strong>لا يوصى</strong> بالإحماء للحقول أو الفهارس التي يتم الاستعلام عنها بشكل غير متكرر. يؤدي تعطيل الإحماء إلى تقصير وقت تحميل المقطع والحفاظ على مساحة ذاكرة التخزين المؤقت - وهو مثالي للحقول المتجهة الكبيرة أو الحقول القياسية غير الحرجة.</p>
<h2 id="Configuration-levels" class="common-anchor-header">مستويات التكوين<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
     <th><p><strong>المستوى</strong></p></th>
     <th><p><strong>النطاق</strong></p></th>
     <th><p><strong>طريقة التكوين</strong></p></th>
     <th><p><strong>الأولوية</strong></p></th>
   </tr>
   <tr>
     <td><p>الحقل/الفهرس</p></td>
     <td><p>حقل واحد أو فهرس واحد</p></td>
     <td><p>أساليب SDK: </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>الأعلى</p></td>
   </tr>
   <tr>
     <td><p>مجموعة</p></td>
     <td><p>جميع الحقول/الفهارس في مجموعة</p></td>
     <td><p>أساليب SDK:</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>متوسط</p></td>
   </tr>
   <tr>
     <td><p>المجموعة العنقودية</p></td>
     <td><p>جميع المجموعات في المجموعة</p></td>
     <td><p><code translate="no">milvus.yaml</code> ملف التكوين</p></td>
     <td><p>أدنى (افتراضي)</p></td>
   </tr>
</table>
<p><strong>تجاوز السلوك:</strong></p>
<ul>
<li><p>إذا كان للحقل إعداد إحماء خاص به، تكون لهذا الإعداد الأسبقية على إعدادات مستوى المجموعة ومستوى المجموعة.</p></li>
<li><p>في حالة عدم وجود إعداد على مستوى الحقل أو الفهرس، يتم تطبيق إعداد مستوى المجموعة.</p></li>
<li><p>في حالة عدم وجود إعدادات على مستوى الحقل أو الفهرس أو مستوى المجموعة، يتم تطبيق إعداد مستوى المجموعة.</p></li>
<li><p>عند استخدام عمليات التغيير، تسري أحدث قيمة تغيير.</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">تكوين الإحماء على مستوى المجموعة<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تكوين عملية الإحماء على مستوى المجموعة في ملف تكوين Milvus <code translate="no">milvus.yaml</code> ويتم تطبيقه على جميع المجموعات في المجموعة. هذا بمثابة خط الأساس الافتراضي.</p>
<p>يدعم كل نوع هدف إعدادين:</p>
<table>
   <tr>
     <th><p>إعداد الإحماء</p></th>
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
     <th><p>إعداد الإحماء</p></th>
     <th><p>الوصف</p></th>
     <th><p>حالة الاستخدام الموصى بها</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>يتحكم فيما إذا كان يتم تحميل بيانات الحقل القياسي مسبقاً.</p></td>
     <td><p>استخدم <code translate="no">sync</code> فقط إذا كانت الحقول القياسية صغيرة ويتم الوصول إليها بشكل متكرر في المرشحات. خلاف ذلك، <code translate="no">disable</code> لتقليل وقت التحميل.</p></td>
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
     <td><p>استخدم <code translate="no">sync</code> للفهارس المتجهة التي تعتبر حاسمة بالنسبة لزمن انتقال البحث. في أحمال العمل المجمعة أو منخفضة التردد، <code translate="no">disable</code> لجاهزية المقطع بشكل أسرع.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">تكوين الإحماء على مستوى المجموعة<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>تسمح لك عملية الإحماء على مستوى المجموعة بتجاوز الإعدادات الافتراضية للمجموعة لمجموعة محددة. يكون هذا مفيدًا عندما يكون للمجموعة أنماط وصول مختلفة عن الخط الأساسي على مستوى المجموعة.</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">تعيين الإحماء عند إنشاء مجموعة<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">تغيير إعدادات الإحماء على مجموعة موجودة<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب تغيير خصائص المجموعة قبل استدعاء <code translate="no">load()</code>. يؤدي تغيير مجموعة محملة إلى إرجاع خطأ. تسري التغييرات على إعدادات الإحماء في المرة التالية التي تقوم فيها بتحميل المجموعة.</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>مرجع الخاصية</strong>:</p>
<table>
   <tr>
     <th><p><strong>الخاصية</strong></p></th>
     <th><p><strong>إعدادات الإحماء</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>إعداد الإحماء لجميع الحقول القياسية في المجموعة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>إعداد الإحماء لجميع الفهارس القياسية في المجموعة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>| إعداد الإحماء لجميع الحقول المتجهة في المجموعة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>| إعداد الإحماء لجميع الفهارس المتجهة في المجموعة.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">تكوين الإحماء على مستوى الحقل<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر الإحماء على مستوى الحقل أفضل دقة، مما يسمح لك بالتحكم في سلوك الإحماء للحقول الفردية. يكون هذا مفيدًا عندما يكون لحقول محددة أنماط وصول فريدة.</p>
<p>يتم تطبيق الإحماء على مستوى الحقل على <strong>البيانات الخام للحقل</strong> فقط، وليس على الفهارس الموجودة في هذا الحقل. لتكوين الإحماء لفهرس، استخدم <a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">التكوين على مستوى الفهرس</a>.</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">تعيين الإحماء عند إنشاء حقل<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">تغيير إعدادات الإحماء في حقل موجود<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب تغيير إعدادات الحقل قبل استدعاء <code translate="no">load()</code>. يؤدي تغيير حقل على مجموعة محملة إلى إرجاع خطأ. تسري التغييرات في إعدادات الإحماء في المرة التالية التي تقوم فيها بتحميل المجموعة.</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">تكوين الإحماء على مستوى الفهرس<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>تسمح لك عملية الإحماء على مستوى الفهرس بالتحكم في التحميل المسبق للفهارس الفردية، بشكل مستقل عن إعدادات الإحماء الخاصة بالحقل الأساسي.</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">تعيين الإحماء عند إنشاء فهرس<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">تغيير إعدادات الإحماء على فهرس موجود<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب تغيير إعدادات الفهرس قبل استدعاء <code translate="no">load()</code>. يؤدي تغيير فهرس على مجموعة محملة إلى إرجاع خطأ. تسري التغييرات على إعدادات الإحماء في المرة التالية التي تقوم فيها بتحميل المجموعة.</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">مرجع سلوك الإحماء<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>يلخص الجدول التالي سلوك الإحماء في مراحل مختلفة من دورة حياة المقطع.</p>
<table>
   <tr>
     <th><p><strong>إعدادات الإحماء</strong></p></th>
     <th><p><strong>مرحلة التحميل</strong></p></th>
     <th><p><strong>مرحلة البحث/الاستعلام</strong></p></th>
     <th><p><strong>مرحلة الإصدار</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>يتم تحميل البيانات إلى وحدة التخزين المحلية. تعتمد الوجهة (قرص أو ذاكرة) على إعداد mmap.</p></td>
     <td><p>يصل الاستعلام إلى ذاكرة التخزين المؤقت المحلية مباشرةً.</p></td>
     <td><p>يتم مسح البيانات المحلية المخزنة مؤقتاً.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>لا يتم تحميل البيانات إلى التخزين المحلي.</p></td>
     <td><p>يتم جلب البيانات عند الطلب من وحدة تخزين الكائنات، ثم يتم تخزينها مؤقتاً محلياً استناداً إلى إعداد mmap.</p></td>
     <td><p>يتم مسح البيانات المحلية المخزنة مؤقتاً.</p></td>
   </tr>
</table>
<p><strong>التفاعل مع mmap:</strong></p>
<table>
   <tr>
     <th><p><strong>إعداد الإحماء</strong></p></th>
     <th><p><strong>تم تمكين Mmap</strong></p></th>
     <th><p><strong>موقع البيانات</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>القرص المحلي (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>الذاكرة المحلية</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>تم التعيين إلى القرص المحلي عند أول وصول</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>يتم تعيينها إلى الذاكرة المحلية عند أول وصول</p></td>
   </tr>
</table>
<p><strong>بنية دليل ذاكرة التخزين المؤقت المحلية (عند تمكين mmap):</strong></p>
<table>
   <tr>
     <th><p><strong>نوع البيانات</strong></p></th>
     <th><p><strong>مسار الدليل</strong></p></th>
   </tr>
   <tr>
     <td><p>بيانات الحقول العددية/المتجهة</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>ملفات الفهرس العددية/المتجهة</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
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
    </button></h2><p>يؤثر الإحماء على التحميل الأولي فقط. إذا تم إخلاء البيانات المخزنة مؤقتًا في وقت لاحق، فسيقوم الاستعلام التالي بإعادة تحميلها عند الطلب.</p>
<ul>
<li><p>تجنب الإفراط في استخدام <code translate="no">sync</code>. التحميل المسبق للعديد من الحقول يزيد من وقت التحميل وضغط ذاكرة التخزين المؤقت.</p></li>
<li><p>ابدأ بتحفظ - قم بتمكين الإحماء فقط للحقول والفهارس التي يتم الوصول إليها بشكل متكرر.</p></li>
<li><p>راقب وقت استجابة الاستعلام ومقاييس ذاكرة التخزين المؤقت، ثم قم بتوسيع التحميل المسبق حسب الحاجة.</p></li>
<li><p>بالنسبة لأحمال العمل المختلطة، قم بتطبيق <code translate="no">sync</code> على المجموعات الحساسة للأداء و <code translate="no">disable</code> على المجموعات الموجهة نحو السعة.</p></li>
</ul>
