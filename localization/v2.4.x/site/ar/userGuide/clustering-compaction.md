---
id: clustering-compaction.md
title: ضغط التجميع
related_key: 'clustering, compaction'
summary: >-
  تم تصميم ضغط التجميع لتحسين أداء البحث وتقليل التكاليف في المجموعات الكبيرة.
  سيساعدك هذا الدليل على فهم ضغط المجموعات وكيف يمكن لهذه الميزة تحسين أداء
  البحث.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">ضغط التجميع<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم ضغط التجميع لتحسين أداء البحث وتقليل التكاليف في المجموعات الكبيرة. سيساعدك هذا الدليل على فهم ضغط التجميع وكيف يمكن لهذه الميزة تحسين أداء البحث.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم Milvus بتخزين الكيانات الواردة في مقاطع داخل مجموعة ويغلق المقطع عندما يمتلئ. إذا حدث ذلك، يتم إنشاء مقطع جديد لاستيعاب كيانات إضافية. ونتيجة لذلك، يتم توزيع الكيانات بشكل اعتباطي عبر المقاطع. يتطلب هذا التوزيع من Milvus البحث في مقاطع متعددة للعثور على أقرب الجيران إلى متجه استعلام معين.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>بدون ضغط التجميع</span> </span></p>
<p>إذا كان بإمكان Milvus توزيع الكيانات بين المقاطع بناءً على القيم الموجودة في حقل معين، يمكن تقييد نطاق البحث داخل مقطع واحد، وبالتالي تحسين أداء البحث.</p>
<p>إن<strong>ضغط التجميع</strong> هو ميزة في Milvus تقوم بإعادة توزيع الكيانات بين المقاطع في مجموعة استنادًا إلى القيم الموجودة في حقل قياسي. لتمكين هذه الميزة، تحتاج أولاً إلى تحديد حقل قياسي <strong>كمفتاح ت</strong>جميع. يسمح ذلك ل Milvus بإعادة توزيع الكيانات في مقطع عندما تقع قيم مفتاح التجميع الخاصة بها ضمن نطاق محدد. عندما تقوم بتشغيل ضغط التجميع، يقوم Milvus بإنشاء/تحديث فهرس عام يسمى <strong>PartitionStats،</strong> والذي يسجل علاقة التعيين بين المقاطع وقيم مفاتيح التجميع.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>مع ضغط التجميع</span> </span></p>
<p>باستخدام <strong>PartitionStats</strong> كمرجع، يمكن لـ Milvus تشذيب البيانات غير ذات الصلة عند تلقي طلب بحث/استعلام يحمل قيمة مفتاح تجميع وتقييد نطاق البحث داخل المقاطع التي تم تعيينها إلى القيمة، وبالتالي تحسين أداء البحث. للحصول على تفاصيل حول تحسين الأداء، راجع الاختبارات المعيارية.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">استخدام ضغط التجميع<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>ميزة ضغط التجميع في Milvus قابلة للتكوين بدرجة كبيرة. يمكنك اختيار تشغيله يدويًا أو تعيينه ليتم تشغيله تلقائيًا على فترات بواسطة Milvus. لتمكين ضغط التجميع، قم بما يلي:</p>
<h3 id="Global-Configuration" class="common-anchor-header">التكوين العام</h3><p>تحتاج إلى تعديل ملف تكوين Milvus كما هو موضح أدناه.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>تحديد ما إذا كان سيتم تمكين ضغط التجميع أم لا.<br>تعيين هذا إلى <code translate="no">true</code> إذا كنت بحاجة إلى تمكين هذه الميزة لكل مجموعة لها مفتاح تجميع.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>تحديد ما إذا كنت تريد تمكين الضغط الذي يتم تشغيله تلقائياً.<br>يشير تعيين هذا إلى <code translate="no">true</code> إلى أن Milvus يقوم بضغط المجموعات التي تحتوي على مفتاح تجميع في الفواصل الزمنية المحددة.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>يحدد الفاصل الزمني بالمللي ثانية الذي يبدأ عنده Milvus ضغط التجميع.<br>هذه المعلمة صالحة فقط عندما يتم تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>يحدد الحد الأدنى للفاصل الزمني بالثواني.<br>هذه المعلمة صالحة فقط عندما يتم تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.<br>يساعد تعيين هذه المعلمة على عدد صحيح أكبر من المشغّلInterval على تجنب عمليات التجميع المتكررة خلال فترة قصيرة.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>يحدد الحد الأقصى للفاصل الزمني بالثواني.<br>هذه المعلمة صالحة فقط عندما يتم تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.<br>بمجرد أن يكتشف Milvus أن المجموعة لم يتم تجميعها لمدة أطول من هذه القيمة، فإنه يفرض تجميعًا مضغوطًا.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>يحدد العتبة العليا لتشغيل ضغط التجميع.<br>هذه المعلمة صالحة فقط عندما يتم تعيين <code translate="no">autoEnable</code> على <code translate="no">true</code>.<br>بمجرد أن يكتشف Milvus أن حجم البيانات في مجموعة ما يتجاوز هذه القيمة، فإنه يبدأ عملية ضغط التجميع.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>يحدد مدة المهلة لضغط التجميع.<br>تفشل عملية ضغط التجميع إذا تجاوز وقت تنفيذها هذه القيمة.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>تحديد ما إذا كان Milvus يقوم بتشذيب البيانات بالرجوع إلى PartitionStats عند تلقي طلبات البحث/الاستعلام.<br>تعيين هذا إلى <code translate="no">true</code> يُمكّن Milvus من تشذيب البيانات غير ذات الصلة من المقاطع أثناء طلب البحث/الاستعلام.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>تحديد نسبة المخزن المؤقت للذاكرة لمهام ضغط المجموعات. <br>يقوم Milvus بمسح البيانات عندما يتجاوز حجم البيانات حجم المخزن المؤقت المخصص المحسوب باستخدام هذه النسبة.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>تحديد حجم تجمع العاملين لمهمة ضغط التجميع.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>عنصر التكوين</th><th>الوصف</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>تحديد ما إذا كان سيتم استخدام مفتاح القسم في المجموعات كمفتاح تجميع.<br>يشير تعيين هذا إلى <code translate="no">true</code> إلى استخدام مفتاح التقسيم كمفتاح تجميع.<br>يمكنك دائماً تجاوز هذا الإعداد في مجموعة من خلال تعيين مفتاح التجميع بشكل صريح.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>لتطبيق التغييرات المذكورة أعلاه على مجموعة Milvus الخاصة بك، يرجى اتباع الخطوات في <a href="/docs/ar/v2.4.x/configure-helm.md">تكوين Milvus مع Helm</a> <a href="/docs/ar/v2.4.x/configure_operator.md">وتكوين Milvus مع مشغلي Milvus</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">تكوين التجميع</h3><p>لضغط التجميع في مجموعة محددة، يجب عليك تحديد حقل قياسي من المجموعة كمفتاح التجميع.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يمكنك استخدام الحقول القياسية لأنواع البيانات التالية كمفتاح التجميع: <code translate="no">Int8</code> و <code translate="no">Int16</code> و و <code translate="no">Int32</code> و <code translate="no">Int64</code> و <code translate="no">Float</code> و <code translate="no">Double</code> و <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">تشغيل ضغط التجميع التجميعي<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا قمت بتمكين ضغط التجميع التلقائي، يقوم برنامج Milvus تلقائيًا بتشغيل الضغط التجميعي في الفاصل الزمني المحدد. بدلاً من ذلك، يمكنك تشغيل الضغط يدويًا على النحو التالي:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">اختبار معياري</h3><p>يحدد حجم البيانات وأنماط الاستعلام مجتمعةً تحسين الأداء الذي يمكن أن يحققه ضغط التجميع. يُظهر اختبار معياري داخلي أن ضغط التجميع يؤدي إلى تحسين يصل إلى 25 ضعفًا في الاستعلامات في الثانية (QPS).</p>
<p>يتم إجراء الاختبار المعياري على مجموعة تحتوي على كيانات من مجموعة بيانات LAION ذات 20 مليونًا و768 بُعدًا مع تعيين الحقل الرئيسي كمفتاح تجميع. بعد تشغيل ضغط التجميع في المجموعة، يتم إرسال عمليات البحث المتزامنة حتى يصل استخدام وحدة المعالجة المركزية إلى مستوى عالٍ من وحدة المعالجة المركزية.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">مرشح البحث</th>
      <th rowspan="2">نسبة التقليم</th>
      <th colspan="5">الكمون (مللي ثانية)</th>
      <th rowspan="2">QPS (طلبات/ثانية)</th>
    </tr>
    <tr>
      <th>متوسط</th>
      <th>الحد الأدنى</th>
      <th>الحد الأقصى</th>
      <th>المتوسط</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>لا يوجد</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>مفتاح &gt; 200 ومفتاح &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>مفتاح &gt; 200 ومفتاح &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>مفتاح &gt; 200 ومفتاح &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>المفتاح = = 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>كلما ضاق نطاق البحث في مرشحات البحث، تزداد نسبة التقليم. هذا يعني أنه يتم تخطي المزيد من الكيانات أثناء عملية البحث. عند مقارنة الإحصائيات في الصفين الأول والأخير، يمكنك أن ترى أن عمليات البحث بدون ضغط التجميع تتطلب مسح المجموعة بأكملها. من ناحية أخرى، يمكن أن تحقق عمليات البحث باستخدام ضغط التجميع باستخدام مفتاح محدد تحسينًا يصل إلى 25 ضعفًا.</p>
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
    </button></h2><p>إليك بعض النصائح لاستخدام ضغط التجميع بكفاءة:</p>
<ul>
<li><p>قم بتمكين ذلك للمجموعات ذات أحجام البيانات الكبيرة. يتحسن أداء البحث مع وجود أحجام بيانات أكبر في المجموعة. من الجيد تمكين هذه الميزة للمجموعات التي تحتوي على أكثر من مليون كيان.</p></li>
<li><p>اختيار مفتاح تجميع مناسب. يمكنك استخدام الحقول القياسية المستخدمة عادةً كشروط تصفية كمفتاح تجميع. بالنسبة للمجموعات التي تحتوي على بيانات من مستأجرين متعددين، يمكنك استخدام الحقل الذي يميز مستأجر عن آخر كمفتاح تجميع.</p></li>
<li><p>استخدم مفتاح التقسيم كمفتاح التجميع. يمكنك تعيين <code translate="no">common.usePartitionKeyAsClusteringKey</code> إلى صواب إذا كنت تريد تمكين هذه الميزة لجميع المجموعات في مثيل Milvus الخاص بك أو إذا كنت لا تزال تواجه مشكلات في الأداء في مجموعة كبيرة بمفتاح التقسيم. من خلال القيام بذلك، سيكون لديك مفتاح تجميع ومفتاح تقسيم عندما تختار حقلاً قياسيًا في مجموعة كمفتاح تقسيم.</p>
<p>لاحظ أن هذا الإعداد لا يمنعك من اختيار حقل قياسي آخر كمفتاح تجميع. تكون الأولوية دائمًا لمفتاح التجميع المعين صراحةً.</p></li>
</ul>
