---
id: clustering-compaction.md
title: ضغط التجميع
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/without-clustering-compaction.png" alt="Without Clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>بدون ضغط التجميع</span> </span></p>
<p>إذا كان بإمكان Milvus توزيع الكيانات بين المقاطع بناءً على القيم الموجودة في حقل معين، يمكن تقييد نطاق البحث داخل مقطع واحد، وبالتالي تحسين أداء البحث.</p>
<p><strong>ضغط التجميع</strong> هو ميزة في Milvus تقوم بإعادة توزيع الكيانات بين المقاطع في مجموعة بناءً على القيم الموجودة في حقل قياسي. لتمكين هذه الميزة، تحتاج أولاً إلى تحديد حقل قياسي <strong>كمفتاح ت</strong>جميع. يسمح ذلك ل Milvus بإعادة توزيع الكيانات في مقطع عندما تقع قيم مفتاح التجميع الخاصة بها ضمن نطاق محدد. عندما تقوم بتشغيل ضغط التجميع، يقوم Milvus بإنشاء/تحديث فهرس عام يسمى <strong>PartitionStats،</strong> والذي يسجل علاقة التعيين بين المقاطع وقيم مفاتيح التجميع.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/clustering-compaction.png" alt="Clustering Compaction" class="doc-image" id="clustering-compaction" />
   </span> <span class="img-wrapper"> <span>ضغط التجميع</span> </span></p>
<p>باستخدام <strong>PartitionStats</strong> كمرجع، يمكن ل Milvus تشذيب البيانات غير ذات الصلة عند تلقي طلب بحث/استعلام يحمل قيمة مفتاح تجميع وتقييد نطاق البحث داخل المقاطع التي تم تعيينها إلى القيمة، وبالتالي تحسين أداء البحث. للحصول على تفاصيل حول تحسين الأداء، راجع <a href="/docs/ar/clustering-compaction.md#Benchmark-Test">الاختبارات المعيارية</a>.</p>
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
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">clustering:</span>
      <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> 
      <span class="hljs-attr">autoEnable:</span> <span class="hljs-literal">false</span> 
      <span class="hljs-attr">triggerInterval:</span> <span class="hljs-number">600</span> 
      <span class="hljs-attr">minInterval:</span> <span class="hljs-number">3600</span> 
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-number">259200</span> 
      <span class="hljs-attr">newDataSizeThreshold:</span> <span class="hljs-string">512m</span> 
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">7200</span>
     
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">enableSegmentPrune:</span> <span class="hljs-literal">true</span> 

<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">clusteringCompaction:</span>
    <span class="hljs-attr">memoryBufferRatio:</span> <span class="hljs-number">0.1</span> 
    <span class="hljs-attr">workPoolSize:</span> <span class="hljs-number">8</span>  
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">usePartitionKeyAsClusteringKey:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>تكوين العنصر</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataCoord.compaction.clustering</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enable</code></p></td>
     <td><p>تحديد ما إذا كان سيتم تمكين ضغط التجميع أم لا. تعيين هذا إلى <code translate="no">true</code> إذا كنت بحاجة إلى تمكين هذه الميزة لكل مجموعة لها مفتاح تجميع.</p></td>
     <td><p>خطأ</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">autoEnable</code></p></td>
     <td><p>تحديد ما إذا كنت تريد تمكين الضغط الذي يتم تشغيله تلقائياً. يشير تعيين هذا إلى <code translate="no">true</code> إلى أن Milvus يقوم بضغط المجموعات التي تحتوي على مفتاح تجميع في الفواصل الزمنية المحددة.</p></td>
     <td><p>خطأ</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">triggerInterval</code></p></td>
     <td><p>تحديد الفاصل الزمني بالمللي ثانية الذي يبدأ عنده Milvus في ضغط التجميع. ينطبق هذا فقط عند تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">minInterval</code></p></td>
     <td><p>يحدد الحد الأدنى للفاصل الزمني بالمللي ثانية. ينطبق هذا فقط عند تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.</p><p>يساعد تعيين هذا إلى عدد صحيح أكبر من <code translate="no">triggerInterval</code> على تجنب عمليات التجميع المتكررة خلال فترة قصيرة.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxInterval</code></p></td>
     <td><p>يحدد الحد الأقصى للفاصل الزمني بالمللي ثانية. ينطبق هذا فقط عند تعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.</p><p>بمجرد أن يكتشف Milvus أن المجموعة لم يتم تجميعها-مضغوطة لمدة أطول من هذه القيمة، فإنه يفرض عملية ضغط تجميع.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">newDataSizeThreshold</code></p></td>
     <td><p>يحدد العتبة العليا لتشغيل ضغط التجميع. ينطبق هذا فقط عندما تقوم بتعيين <code translate="no">autoEnable</code> إلى <code translate="no">true</code>.</p><p>بمجرد أن يكتشف Milvus أن حجم البيانات في مجموعة ما يتجاوز هذه القيمة، فإنه يبدأ عملية ضغط التجميع.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">timeout</code></p></td>
     <td><p>تحديد مدة المهلة لضغط التجميع. تفشل عملية ضغط التجميع إذا تجاوز وقت تنفيذها هذه القيمة.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">queryNode</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">enableSegmentPrune</code></p></td>
     <td><p>يحدد ما إذا كان Milvus يقوم بتخفيض البيانات بالرجوع إلى PartitionStats عند تلقي طلبات البحث/الاستعلام. تعيين هذا إلى <code translate="no">true</code> بحيث يمكن لـ Milvus تشذيب البيانات عند تلقي طلبات البحث/الاستعلام بالرجوع إلى PartitionStats.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">dataNode.clusteringCompaction</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryBufferRatio</code></p></td>
     <td><p>تحديد نسبة المخزن المؤقت للذاكرة لمهام ضغط التجميع.  يقوم Milvus بمسح البيانات عندما يتجاوز حجم البيانات حجم المخزن المؤقت المخصص المحسوب باستخدام هذه النسبة.</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code translate="no">workPoolSize</code></p></td>
     <td><p>يحدد حجم تجمع العاملين لمهمة ضغط التجميع.</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="3"><p><code translate="no">common</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">usePartitionKeyAsClusteringKey</code></p></td>
     <td><p>تحديد ما إذا كان سيتم استخدام مفتاح التقسيم في المجموعات كمفتاح تجميع. تعيين هذا إلى صواب يجعل Milvus يعامل مفاتيح التقسيم في المجموعات كمفتاح التجميع. </p><p>يمكنك دائمًا تجاوز هذا الإعداد في المجموعة عن طريق تعيين مفتاح التجميع بشكل صريح.</p></td>
     <td></td>
   </tr>
</table>
<p>لتطبيق التغييرات المذكورة أعلاه على مجموعة Milvus الخاصة بك، يرجى اتباع الخطوات الواردة في <a href="/docs/ar/configure-helm.md#Configure-Milvus-via-configuration-file">تكوين Milvus مع Helm</a> <a href="/docs/ar/configure_operator.md">وتكوين Milvus مع مشغلي Milvus</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">تكوين التجميع</h3><p>لضغط التجميع في مجموعة معينة، يجب عليك تحديد حقل قياسي من المجموعة كمفتاح التجميع.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;key&quot;</span>, DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;var&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;key&quot;</span>)
        .dataType(DataType.Int64)
        .isClusteringKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;var&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span> = <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span> = <span class="hljs-string">&#x27;root:Milvus&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>,
});
<span class="hljs-keyword">const</span> schema = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;key&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_clustering_key</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;var&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
  ];
  
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;clustering_test&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يمكنك استخدام الحقول القياسية لأنواع البيانات التالية كمفتاح التجميع: <code translate="no">Int8</code> و <code translate="no">Int16</code> و و <code translate="no">Int32</code> و <code translate="no">Int64</code> و <code translate="no">Float</code> و <code translate="no">Double</code> و <code translate="no">VarChar</code>.</p>
</div>
<h3 id="Trigger-Clustering-Compaction" class="common-anchor-header">تشغيل ضغط التجميع التجميعي</h3><p>إذا قمت بتمكين الضغط التجميعي التلقائي للتجميع، يقوم برنامج Milvus تلقائيًا بتشغيل الضغط في الفاصل الزمني المحدد. بدلاً من ذلك، يمكنك تشغيل الضغط يدويًا على النحو التالي:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># trigger a manual compaction</span>
job_id = client.compact(
    collection_name=<span class="hljs-string">&quot;clustering_test&quot;</span>, 
    is_clustering=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># get the compaction state</span>
client.get_compaction_state(
    job_id=job_id,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CompactReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetCompactionStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.CompactResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetCompactionStateResp;

<span class="hljs-type">CompactResp</span> <span class="hljs-variable">compactResp</span> <span class="hljs-operator">=</span> client.compact(CompactReq.builder()
        .collectionName(<span class="hljs-string">&quot;clustering_test&quot;</span>)
        .isClustering(<span class="hljs-literal">true</span>)
        .build());

<span class="hljs-type">GetCompactionStateResp</span> <span class="hljs-variable">stateResp</span> <span class="hljs-operator">=</span> client.getCompactionState(GetCompactionStateReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build());

System.out.println(stateResp.getState());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// trigger a manual compaction</span>
<span class="hljs-keyword">const</span> {compactionID} = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">compact</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;clustering_test&quot;</span>, 
    <span class="hljs-attr">is_clustering</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// get the compaction state</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getCompactionState</span>({
    <span class="hljs-attr">compactionID</span>: compactionID,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Benchmark-Test" class="common-anchor-header">اختبار معياري<button data-href="#Benchmark-Test" class="anchor-icon" translate="no">
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
    </button></h2><p>يحدد حجم البيانات وأنماط الاستعلام مجتمعةً تحسين الأداء الذي يمكن أن يحققه ضغط التجميع. يُظهر اختبار معياري داخلي أن ضغط التجميع يؤدي إلى تحسين يصل إلى 25 ضعفًا في الاستعلامات في الثانية (QPS).</p>
<p>يتم إجراء الاختبار المعياري على مجموعة تحتوي على كيانات من مجموعة بيانات LAION ذات 20 مليونًا و768 بُعدًا مع تعيين الحقل <code translate="no">key</code> كمفتاح تجميع. بعد تشغيل عملية ضغط التجميع في المجموعة، يتم إرسال عمليات البحث المتزامنة حتى يصل استخدام وحدة المعالجة المركزية إلى مستوى عالٍ من وحدة المعالجة المركزية.</p>
<table>
   <tr>
     <th rowspan="2"><p>مرشح البحث</p></th>
     <th rowspan="2"><p>نسبة التقليم</p></th>
     <th colspan="5"><p>الكمون</p></th>
     <th rowspan="2"><p>الطلبات/الثانية</p></th>
   </tr>
   <tr>
     <td><p>متوسط متوسط</p></td>
     <td><p>الحد الأدنى</p></td>
     <td><p>الحد الأقصى</p></td>
     <td><p>المتوسط</p></td>
     <td><p>TP99</p></td>
   </tr>
   <tr>
     <td><p>غير متاح</p></td>
     <td><p>0%</p></td>
     <td><p>1685</p></td>
     <td><p>672</p></td>
     <td><p>2294</p></td>
     <td><p>1710</p></td>
     <td><p>2291</p></td>
     <td><p>17.75</p></td>
   </tr>
   <tr>
     <td><p>مفتاح&gt; 200 ومفتاح &lt; 800</p></td>
     <td><p>40.2%</p></td>
     <td><p>1045</p></td>
     <td><p>47</p></td>
     <td><p>1828</p></td>
     <td><p>1085</p></td>
     <td><p>1617</p></td>
     <td><p>28.38</p></td>
   </tr>
   <tr>
     <td><p>مفتاح&gt; 200 ومفتاح &lt; 600</p></td>
     <td><p>59.8%</p></td>
     <td><p>829</p></td>
     <td><p>45</p></td>
     <td><p>1483</p></td>
     <td><p>882</p></td>
     <td><p>1303</p></td>
     <td><p>35.78</p></td>
   </tr>
   <tr>
     <td><p>مفتاح&gt; 200 ومفتاح &lt; 400</p></td>
     <td><p>79.5%</p></td>
     <td><p>550</p></td>
     <td><p>100</p></td>
     <td><p>985</p></td>
     <td><p>584</p></td>
     <td><p>898</p></td>
     <td><p>54.00</p></td>
   </tr>
   <tr>
     <td><p>المفتاح==1000</p></td>
     <td><p>99%</p></td>
     <td><p>68</p></td>
     <td><p>24</p></td>
     <td><p>1273</p></td>
     <td><p>70</p></td>
     <td><p>246</p></td>
     <td><p>431.41</p></td>
   </tr>
</table>
<p>كلما ضاق نطاق البحث في مرشحات البحث، تزداد نسبة التقليم. هذا يعني أنه يتم تخطي المزيد من الكيانات أثناء عملية البحث. عند مقارنة الإحصائيات في الصفين الأول والأخير، يمكنك أن ترى أن عمليات البحث بدون ضغط التجميع تتطلب مسح المجموعة بأكملها. من ناحية أخرى، يمكن لعمليات البحث مع ضغط التجميع باستخدام مفتاح محدد أن تحقق تحسنًا يصل إلى 25 ضعفًا.</p>
<h2 id="Best-Practices" class="common-anchor-header">أفضل الممارسات<button data-href="#Best-Practices" class="anchor-icon" translate="no">
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
<li><p>قم بتمكين ذلك للمجموعات ذات أحجام البيانات الكبيرة.</p>
<p>يتحسن أداء البحث مع وجود أحجام بيانات أكبر في المجموعة. من الجيد تمكين هذه الميزة للمجموعات التي تحتوي على أكثر من مليون كيان.</p></li>
<li><p>اختر مفتاح تجميع مناسب.</p>
<p>يمكنك استخدام الحقول القياسية المستخدمة عادةً كشروط تصفية كمفتاح تجميع. بالنسبة للمجموعات التي تحتوي على بيانات من مستأجرين متعددين، يمكنك استخدام الحقل الذي يميز مستأجر عن آخر كمفتاح تجميع.</p></li>
<li><p>استخدم مفتاح التقسيم كمفتاح التجميع.</p>
<p>يمكنك تعيين <code translate="no">common.usePartitionKeyAsClusteringKey</code> على <code translate="no">true</code> إذا كنت ترغب في تمكين هذه الميزة لجميع المجموعات في مثيل Milvus الخاص بك أو إذا كنت لا تزال تواجه مشكلات في الأداء في مجموعة كبيرة بمفتاح التقسيم. من خلال القيام بذلك، سيكون لديك مفتاح تجميع ومفتاح تقسيم عندما تختار حقلاً قياسيًا في مجموعة كمفتاح تقسيم.</p>
<p>لاحظ أن هذا الإعداد لا يمنعك من اختيار حقل قياسي آخر كمفتاح تجميع. تكون الأولوية دائمًا لمفتاح التجميع المعين صراحةً.</p></li>
</ul>
