---
id: integrate_with_spark.md
summary: تناقش هذه الصفحة موصل Spark-Milvus.
title: دليل مستخدم موصل Spark-Milvus Connector
---
<h1 id="Spark-Milvus-Connector-User-Guide" class="common-anchor-header">دليل مستخدم موصل Spark-Milvus Connector<button data-href="#Spark-Milvus-Connector-User-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر موصل Spark-Milvus Connector (https://github.com/zilliztech/spark-milvus) تكاملاً سلسًا بين Apache Spark و Milvus، حيث يجمع بين ميزات معالجة البيانات وتعلم الآلة في Apache Spark مع قدرات تخزين البيانات المتجهة وإمكانيات البحث في Milvus. يتيح هذا التكامل العديد من التطبيقات المثيرة للاهتمام، بما في ذلك:</p>
<ul>
<li>تحميل البيانات المتجهة بكفاءة في Milvus على دفعات كبيرة,</li>
<li>نقل البيانات بين Milvus وأنظمة التخزين أو قواعد البيانات الأخرى,</li>
<li>تحليل البيانات في Milvus من خلال الاستفادة من Spark MLlib وأدوات الذكاء الاصطناعي الأخرى.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">البدء السريع<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">التحضير</h3><p>يدعم موصل Spark-Milvus Connector لغتي البرمجة Scala و Python. يمكن للمستخدمين استخدامه مع <strong>Pyspark</strong> أو <strong>Spark-shell</strong>. لتشغيل هذا العرض التوضيحي، قم بإعداد بيئة Spark التي تحتوي على تبعية Spark-Milvus Connector في الخطوات التالية:</p>
<ol>
<li><p>تثبيت أباتشي سبارك (الإصدار &gt;= 3.3.0)</p>
<p>يمكنك تثبيت Apache Spark بالرجوع إلى <a href="https://spark.apache.org/docs/latest/">الوثائق الرسمية</a>.</p></li>
<li><p>قم بتنزيل ملف جرة <strong>شرارة ميلفوس</strong>.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ابدأ وقت تشغيل Spark مع جرة شرارة <strong>ميلفوس</strong> كأحد التبعيات.</p>
<p>لبدء وقت تشغيل Spark مع Spark-Milvus Connector، أضف <strong>الشرارة-ميلفوس</strong> التي تم تنزيلها كأحد التبعيات إلى الأمر.</p>
<ul>
<li><p><strong>بيسبارك</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/pyspark --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>شرارة قذيفة</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/spark-shell --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">عرض توضيحي</h3><p>في هذا العرض التوضيحي، نقوم بإنشاء نموذج Spark DataFrame مع بيانات متجهة ونكتبها إلى Milvus من خلال Spark-Milvus Connector. سيتم إنشاء مجموعة في Milvus تلقائيًا استنادًا إلى المخطط والخيارات المحددة.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#scala">سكالا</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pyspark.sql <span class="hljs-keyword">import</span> SparkSession

columns = [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>]
data = [(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>])]
sample_df = spark.sparkContext.parallelize(data).toDF(columns)
sample_df.write \
    .mode(<span class="hljs-string">&quot;append&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.host&quot;</span>, <span class="hljs-string">&quot;localhost&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.port&quot;</span>, <span class="hljs-string">&quot;19530&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.name&quot;</span>, <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>) \
    .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvus&quot;</span>) \
    .save()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}

object Hello <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
    .appName(<span class="hljs-string">&quot;HelloSparkMilvus&quot;</span>)
    .getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-comment">// Create DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
    (<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>))
  ).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>)

  <span class="hljs-comment">// set milvus options</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> Map(
      <span class="hljs-string">&quot;milvus.host&quot;</span> -&gt; <span class="hljs-string">&quot;localhost&quot;</span> -&gt; uri,
      <span class="hljs-string">&quot;milvus.port&quot;</span> -&gt; <span class="hljs-string">&quot;19530&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.name&quot;</span> -&gt; <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span> -&gt; <span class="hljs-string">&quot;vec&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span> -&gt; <span class="hljs-string">&quot;5&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>
    )
    
  sampleDF.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
<button class="copy-code-btn"></button></code></pre>
<p>بعد تنفيذ الكود أعلاه، يمكنك عرض البيانات المدرجة في Milvus باستخدام SDK أو Attu (لوحة معلومات Milvus). يمكنك العثور على مجموعة باسم <code translate="no">hello_spark_milvus</code> تم إنشاؤها مع 4 كيانات تم إدراجها بالفعل فيها.</p>
<h2 id="Features--concepts" class="common-anchor-header">الميزات والمفاهيم<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">خيارات ملفوس</h3><p>في قسم <a href="#Quick-start">البداية السريعة،</a> عرضنا خيارات الإعداد أثناء العمليات مع ميلفوس. يتم تجريد هذه الخيارات كخيارات Milvus. يتم استخدامها لإنشاء اتصالات مع ميلفوس والتحكم في سلوكيات ميلفوس الأخرى. ليست كل الخيارات إلزامية.</p>
<table>
<thead>
<tr><th>مفتاح الخيار</th><th>القيمة الافتراضية</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>مضيف خادم ملفوس. راجع <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات Milvus</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>منفذ خادم ميلفوس. راجع <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات Milvus</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>اسم المستخدم لخادم ميلفوس. انظر <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات Milvus</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>كلمة المرور لخادم ميلفوس. راجع <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات Milvus</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>URI لخادم Milvus URI. راجع <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات ملفوس</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>الرمز المميز لخادم ميلفوس. راجع <a href="https://milvus.io/docs/manage_connection.md">إدارة اتصالات ملفوس</a> للحصول على التفاصيل.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>اسم قاعدة بيانات ملفوس للقراءة أو الكتابة.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>اسم مجموعة Milvus المراد قراءتها أو كتابتها.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>اسم حقل المفتاح الأساسي في المجموعة. مطلوب في حالة عدم وجود المجموعة.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>اسم الحقل المتجه في المجموعة. مطلوب إذا كانت المجموعة غير موجودة.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>بُعد الحقل المتجه في المجموعة. مطلوب إذا كانت المجموعة غير موجودة.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>إذا لم تكن المجموعة غير موجودة، يحدد هذا الخيار ما إذا كان سيتم إنشاء معرفات للكيانات تلقائيًا. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/create_collection.md">إنشاء_مجموعة</a></td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>اسم المجموعة في مخزن ميلفوس. يجب أن يكون هذا هو نفسه <code translate="no">minio.bucketName</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml.</a></td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>المسار الجذر لتخزين Milvus. يجب أن يكون هذا هو نفسه <code translate="no">minio.rootpath</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>نظام ملفات وحدة تخزين Milvus. تنطبق القيمة <code translate="no">s3a://</code> على Spark مفتوح المصدر. استخدم <code translate="no">s3://</code> لـ Databricks.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>نقطة النهاية لتخزين Milvus. يجب أن يكون هذا هو نفسه <code translate="no">minio.address</code>:<code translate="no">minio.port</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml.</a></td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>مستخدم وحدة تخزين Milvus. يجب أن يكون هذا هو نفسه <code translate="no">minio.accessKeyID</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>كلمة مرور مخزن ميلفوس. يجب أن تكون هي نفسها <code translate="no">minio.secretAccessKey</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>ما إذا كان يجب استخدام SSL لتخزين Milvus. يجب أن يكون هذا هو نفسه <code translate="no">minio.useSSL</code> في <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">تنسيق بيانات Milvus<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم موصل Spark-Milvus Connector قراءة وكتابة البيانات بتنسيقات بيانات Milvus التالية:</p>
<ul>
<li><code translate="no">milvus</code>: تنسيق بيانات Milvus للتحويل السلس من Spark DataFrame إلى كيانات Milvus.</li>
<li><code translate="no">milvusbinlog</code>: تنسيق بيانات Milvus لقراءة بيانات مدونة Milvus المدمجة.</li>
<li><code translate="no">mjson</code>: تنسيق Milvus JSON لإدخال البيانات المجمعة في Milvus.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">ميلفوس</h3><p>في <a href="#Quick-start">البداية السريعة،</a> نستخدم تنسيق <strong>milvus</strong> لكتابة بيانات نموذجية في مجموعة Milvus. تنسيق <strong>milvus</strong> هو تنسيق بيانات جديد يدعم كتابة بيانات Spark DataFrame بسلاسة في مجموعات Milvus. يتم تحقيق ذلك من خلال استدعاءات دفعية إلى واجهة برمجة التطبيقات Insert API الخاصة بـ Milvus SDK. في حالة عدم وجود مجموعة في Milvus، سيتم إنشاء مجموعة جديدة بناءً على مخطط إطار البيانات. ومع ذلك، قد لا تدعم المجموعة التي تم إنشاؤها تلقائيًا جميع ميزات مخطط المجموعة. لذلك، يوصى بإنشاء مجموعة عبر SDK أولاً ثم استخدام شرارة ميلفوس للكتابة. لمزيد من المعلومات، يرجى الرجوع إلى <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">العرض التوضيحي</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">ميلفوسبينوغ</h3><p>تنسيق البيانات الجديد <strong>milvusbinlog</strong> مخصص لقراءة بيانات Milvus binlog المدمجة في Milvus. Binlog هو تنسيق تخزين البيانات الداخلية لـ Milvus استناداً إلى الباركيه. لسوء الحظ، لا يمكن قراءتها من قبل مكتبة باركيه عادية، لذلك قمنا بتنفيذ تنسيق البيانات الجديد هذا لمساعدة وظيفة Spark على قراءتها. لا يوصى باستخدام <strong>تنسيق milvusbinlog</strong> مباشرةً إلا إذا كنت على دراية بتفاصيل التخزين الداخلي لـ Milvus. نقترح استخدام دالة <a href="#MilvusUtils">MilvusUtils</a> التي سيتم تقديمها في القسم التالي.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvusbinlog&quot;</span>)
  .load(path)
  .withColumnRenamed(<span class="hljs-string">&quot;val&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="mjson" class="common-anchor-header">مجسون</h3><p>يوفر ميلفوس وظيفة <a href="https://milvus.io/docs/bulk_insert.md">بولكنسيرت</a> لتحسين أداء الكتابة عند العمل مع مجموعات البيانات الكبيرة. ومع ذلك، فإن تنسيق JSON المستخدم من قبل Milvus يختلف قليلاً عن تنسيق إخراج JSON الافتراضي الخاص بـ Spark. لحل هذه المشكلة، نقدم تنسيق بيانات <strong>mjson</strong> لتوليد بيانات تلبي متطلبات Milvus. فيما يلي مثال يوضح الفرق بين JSON-lines و <strong>mjson</strong>:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (مطلوب لـ Milvus Bulkinsert):</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;rows&quot;</span>:[
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
    ]
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>سيتم تحسين هذا في المستقبل. نوصي باستخدام تنسيق الباركيه في تكامل شرارة ميلفوس إذا كان إصدار ميلفوس الخاص بك هو الإصدار 2.3.7+ الذي يدعم بولكنسيرت بتنسيق الباركيه. انظر <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">العرض التوضيحي</a> على Github.</p>
<h2 id="MilvusUtils" class="common-anchor-header">MilvusUtils<button data-href="#MilvusUtils" class="anchor-icon" translate="no">
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
    </button></h2><p>يحتوي MilvusUtils على العديد من دوال الاستخدام المفيدة. وهي مدعومة حاليًا في سكالا فقط. المزيد من أمثلة الاستخدام في قسم <a href="#Advanced-Usage">الاستخدام المتقدم</a>.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection</h3><p><strong>MilvusUtils.readMilvusCollection</strong> هي واجهة بسيطة لتحميل مجموعة Milvus كاملة في إطار بيانات Spark. وهي تغلف العديد من العمليات، بما في ذلك استدعاء Milvus SDK، وقراءة <strong>milvusbinlog</strong> وعمليات الاتحاد/الربط الشائعة.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark</h3><p>يوفر MilvusUtils<strong>.bulkInsertFertFromSpark</strong> طريقة ملائمة لاستيراد ملفات إخراج Spark إلى Milvus دفعة واحدة. وهي تلتف على واجهة برمجة تطبيقات <strong>Bullkinsert</strong> الخاصة بحزمة تطوير البرمجيات Milvus SDK.</p>
<pre><code translate="no" class="language-scala">df.write.<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;parquet&quot;</span>).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">الاستخدام المتقدم<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، ستجد في هذا القسم أمثلة استخدام متقدمة لموصل Spark-Milvus لتحليل البيانات وترحيلها. لمزيد من العروض التوضيحية، انظر <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">الأمثلة</a>.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; التضمين -&gt; ميلفوس</h3><p>في هذا العرض التوضيحي، سنقوم بما يلي</p>
<ol>
<li>قراءة البيانات من MySQL من خلال موصل Spark-MySQL,</li>
<li>توليد التضمين (باستخدام Word2Vec كمثال)، و</li>
<li>كتابة البيانات المضمنة في ملفوس.</li>
</ol>
<p>لتمكين موصل Spark-MySQL، تحتاج إلى إضافة التبعية التالية إلى بيئة Spark الخاصة بك:</p>
<pre><code translate="no">spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar,mysql-connector-j-x.x.x.jar
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.MilvusOptions._

<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo  <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
    .appName(<span class="hljs-string">&quot;Mysql2MilvusDemo&quot;</span>)
    .getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-comment">// Create DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
    (<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;</span>),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;</span>),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;</span>),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;</span>)
  ).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>)

  <span class="hljs-comment">// Write to MySQL Table</span>
  sampleDF.write
    .mode(SaveMode.Append)
    .format(<span class="hljs-string">&quot;jdbc&quot;</span>)
    .option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
    .option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
    .option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
    .option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
    .option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
    .save()

  <span class="hljs-comment">// Read from MySQL Table</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">dfMysql</span> <span class="hljs-operator">=</span> spark.read
    .format(<span class="hljs-string">&quot;jdbc&quot;</span>)
    .option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
    .option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
    .option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
    .option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
    .option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
    .load()

  <span class="hljs-type">val</span> <span class="hljs-variable">tokenizer</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Tokenizer</span>().setInputCol(<span class="hljs-string">&quot;text&quot;</span>).setOutputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">tokenizedDf</span> <span class="hljs-operator">=</span> tokenizer.transform(dfMysql)

  <span class="hljs-comment">// Learn a mapping from words to Vectors.</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">word2Vec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Word2Vec</span>()
    .setInputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
    .setOutputCol(<span class="hljs-string">&quot;vectors&quot;</span>)
    .setVectorSize(<span class="hljs-number">128</span>)
    .setMinCount(<span class="hljs-number">0</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">model</span> <span class="hljs-operator">=</span> word2Vec.fit(tokenizedDf)

  <span class="hljs-type">val</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> model.transform(tokenizedDf)

  <span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
  <span class="hljs-comment">// Apply the UDF to the DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">resultDF</span> <span class="hljs-operator">=</span> result.withColumn(<span class="hljs-string">&quot;embedding&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;vectors&quot;</span>))
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusDf</span> <span class="hljs-operator">=</span> resultDF.drop(<span class="hljs-string">&quot;tokens&quot;</span>).drop(<span class="hljs-string">&quot;vectors&quot;</span>)

  milvusDf.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
    .option(MILVUS_HOST, <span class="hljs-string">&quot;localhost&quot;</span>)
    .option(MILVUS_PORT, <span class="hljs-string">&quot;19530&quot;</span>)
    .option(MILVUS_COLLECTION_NAME, <span class="hljs-string">&quot;text_embedding&quot;</span>)
    .option(MILVUS_COLLECTION_VECTOR_FIELD, <span class="hljs-string">&quot;embedding&quot;</span>)
    .option(MILVUS_COLLECTION_VECTOR_DIM, <span class="hljs-string">&quot;128&quot;</span>)
    .option(MILVUS_COLLECTION_PRIMARY_KEY, <span class="hljs-string">&quot;id&quot;</span>)
    .mode(SaveMode.Append)
    .save()
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">ميلفوس -&gt; تحويل -&gt; ميلفوس</h3><p>في هذا العرض التوضيحي، سنقوم بما يلي</p>
<ol>
<li>قراءة البيانات من مجموعة Milvus,</li>
<li>تطبيق تحويل (باستخدام PCA كمثال)، و</li>
<li>كتابة البيانات المحولة إلى ملفوس آخر عبر واجهة برمجة تطبيقات بولكنسيرت.</li>
</ol>
<div class="alert notes">
<p>نموذج PCA هو نموذج تحويل يقلل من أبعاد متجهات التضمين، وهي عملية شائعة في التعلم الآلي. يمكنك إضافة أي عمليات معالجة أخرى، مثل التصفية أو الضم أو التطبيع، إلى خطوة التحويل.</p>
</div>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.PCA
<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.{Vector, Vectors}
<span class="hljs-keyword">import</span> org.apache.spark.SparkConf
<span class="hljs-keyword">import</span> org.apache.spark.sql.SparkSession
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.util.CaseInsensitiveStringMap
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

<span class="hljs-keyword">import</span> scala.collection.JavaConverters._

object TransformDemo <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {
  <span class="hljs-type">val</span> <span class="hljs-variable">sparkConf</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparkConf</span>().setMaster(<span class="hljs-string">&quot;local&quot;</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().config(sparkConf).getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-type">val</span> <span class="hljs-variable">host</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">port</span> <span class="hljs-operator">=</span> <span class="hljs-number">19530</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">user</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">password</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">fs</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">bucketName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;a-bucket&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">rootPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;files&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioAK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioSK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioEndpoint</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost:9000&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus1&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">targetCollectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus2&quot;</span>

  <span class="hljs-type">val</span> <span class="hljs-variable">properties</span> <span class="hljs-operator">=</span> Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; collectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )

  <span class="hljs-comment">// 1, configurations</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(properties.asJava))

  <span class="hljs-comment">// 2, batch read milvus collection data to dataframe</span>
  <span class="hljs-comment">//  Schema: dim of `embeddings` is 8</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// | | field name | field type | other attributes |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |</span>
  <span class="hljs-comment">// | |            |            |   auto_id=False  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |2|  &quot;random&quot;  |    Double  |                  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector|     dim=8        |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">arrayToVectorUDF</span> <span class="hljs-operator">=</span> udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
  <span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
    .withColumn(<span class="hljs-string">&quot;embeddings_vec&quot;</span>, arrayToVectorUDF($<span class="hljs-string">&quot;embeddings&quot;</span>))
    .drop(<span class="hljs-string">&quot;embeddings&quot;</span>)
  
  <span class="hljs-comment">// 3. Use PCA to reduce dim of vector</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">dim</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">pca</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">PCA</span>()
    .setInputCol(<span class="hljs-string">&quot;embeddings_vec&quot;</span>)
    .setOutputCol(<span class="hljs-string">&quot;pca_vec&quot;</span>)
    .setK(dim)
    .fit(collectionDF)
  <span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
  <span class="hljs-comment">// embeddings dim number reduce to 4</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// | | field name | field type | other attributes |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |</span>
  <span class="hljs-comment">// | |            |            |   auto_id=False  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |2|  &quot;random&quot;  |    Double  |                  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector|     dim=4        |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">pcaDf</span> <span class="hljs-operator">=</span> pca.transform(collectionDF)
    .withColumn(<span class="hljs-string">&quot;embeddings&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;pca_vec&quot;</span>))
    .select(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;random&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>)

  <span class="hljs-comment">// 4. Write PCAed data to S3</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://a-bucket/result&quot;</span>
  pcaDf.write
    .mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
    .format(<span class="hljs-string">&quot;parquet&quot;</span>)
    .save(outputPath)

  <span class="hljs-comment">// 5. Config MilvusOptions of target table  </span>
  <span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )
  <span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))
  
  <span class="hljs-comment">// 6. Bulkinsert Spark output files into milvus</span>
  MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">داتابريكس -&gt; زيليز كلاود</h3><p>إذا كنت تستخدم Zilliz Cloud (خدمة Milvus المُدارة)، يمكنك الاستفادة من واجهة برمجة تطبيقات استيراد البيانات الملائمة. توفر Zilliz Cloud أدوات ووثائق شاملة لمساعدتك على نقل بياناتك بكفاءة من مصادر بيانات مختلفة، بما في ذلك Spark وDatabricks. ما عليك سوى إعداد دلو S3 كوسيط وفتح وصوله إلى حساب Zilliz Cloud الخاص بك. ستقوم واجهة برمجة تطبيقات استيراد البيانات في زيليز كلاود بتحميل دفعة كاملة من البيانات تلقائيًا من دلو S3 إلى مجموعة زيليز كلاود الخاصة بك.</p>
<p><strong>التحضيرات</strong></p>
<ol>
<li><p>قم بتحميل وقت تشغيل Spark عن طريق إضافة ملف جرة إلى مجموعة Databricks Cluster الخاصة بك.</p>
<p>يمكنك تثبيت مكتبة بطرق مختلفة. تُظهر لقطة الشاشة هذه تحميل جرة من المحلية إلى الكتلة. لمزيد من المعلومات، راجع <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">مكتبات الكتلة</a> في وثائق Databricks.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>تثبيت مكتبة داتابريكس</span> </span></p></li>
<li><p>قم بإنشاء دلو S3 وقم بتكوينه كموقع تخزين خارجي لمجموعة مكتبات Databricks الخاصة بك.</p>
<p>يتطلب بولكنسيرت تخزين البيانات المطلوبة في دلو مؤقت بحيث يمكن لزيليز كلاود استيراد البيانات دفعة واحدة. يمكنك إنشاء دلو S3 وتهيئته كموقع خارجي لـ داتابريكس. يرجى الرجوع إلى <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">المواقع الخارجية</a> للحصول على التفاصيل.</p></li>
<li><p>قم بتأمين بيانات اعتماد Databricks الخاصة بك.</p>
<p>لمزيد من التفاصيل، ارجع إلى الإرشادات الموجودة في المدونة <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">إدارة بيانات الاعتماد بشكل آمن في داتابريكس</a>.</p></li>
</ol>
<p><strong>عرض توضيحي</strong></p>
<p>إليك مقتطف رمز يعرض عملية ترحيل البيانات المجمعة. على غرار مثال ميلفوس أعلاه، تحتاج فقط إلى استبدال بيانات الاعتماد وعنوان دلو S3.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-comment">// Write the data in batch into the Milvus bucket storage.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3://my-temp-bucket/result&quot;</span>
df.write
  .mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
  .format(<span class="hljs-string">&quot;mjson&quot;</span>)
  .save(outputPath)
<span class="hljs-comment">// Specify Milvus options.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
  MilvusOptions.MILVUS_URI -&gt; zilliz_uri,
  MilvusOptions.MILVUS_TOKEN -&gt; zilliz_token,
  MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
  MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
  MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
  MilvusOptions.MILVUS_FS -&gt; fs,
  MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
  MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
  MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)
<span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))
  
<span class="hljs-comment">// Bulk insert Spark output files into Milvus</span>
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;mjson&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hands-on" class="common-anchor-header">التدريب العملي<button data-href="#Hands-on" class="anchor-icon" translate="no">
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
    </button></h2><p>لمساعدتك على البدء سريعًا في استخدام موصل Spark-Milvus Connector، أعددنا لك دفتر ملاحظات يرشدك خلال عمليتي نقل البيانات المتدفقة والدُفعات باستخدام Milvus و Zilliz Cloud.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">التدريب العملي على موصّل Spark-Milvus Connector</a></li>
</ul>