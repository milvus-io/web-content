---
id: integrate_with_spark.md
summary: >-
  يتكامل Apache Spark وDatabricks مع Milvus وZilliz Cloud للجمع بين معالجة
  البيانات الضخمة والبحث المتجه. تعرّف على كيفية إنشاء بحث وتحليلات مدعومة
  بالذكاء الاصطناعي باستخدام موصل Spark-Milvus.
title: استخدام Apache Spark™ مع Milvus/Zilliz Cloud لخطوط أنابيب الذكاء الاصطناعي
---
<h1 id="Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="common-anchor-header">استخدام Apache Spark™ مع Milvus/Zilliz Cloud لخطوط أنابيب الذكاء الاصطناعي<button data-href="#Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر <a href="https://github.com/zilliztech/spark-milvus">موصّل Spark-Milvus Connector</a> تكامل Apache Spark وDatabricks مع Milvus وZilliz Cloud. فهو يربط بين ميزات معالجة البيانات الضخمة القوية في Apache Spark وميزات التعلم الآلي (ML) في Apache Spark مع قدرات البحث المتجه المتطورة في Milvus. يتيح هذا التكامل سير عمل مبسّط للبحث المدعوم بالذكاء الاصطناعي والتحليلات المتقدمة وتدريب تعلّم الآلة والإدارة الفعالة للبيانات المتجهة واسعة النطاق.</p>
<p>Apache Spark هي عبارة عن منصة معالجة بيانات موزعة مصممة للتعامل مع مجموعات البيانات الضخمة بحسابات عالية السرعة. عند إقرانها مع Milvus أو Zilliz Cloud، فإنها تفتح إمكانيات جديدة لحالات الاستخدام مثل البحث الدلالي وأنظمة التوصيات وتحليلات البيانات القائمة على الذكاء الاصطناعي.</p>
<p>على سبيل المثال، يمكن ل Spark معالجة مجموعات البيانات الكبيرة على دفعات لإنشاء تضمينات عبر نماذج التعلم الآلي، ثم استخدام موصل Spark-Milvus لتخزين هذه التضمينات مباشرة في Milvus أو Zilliz Cloud. وبمجرد فهرستها، يمكن البحث في هذه البيانات أو تحليلها بسرعة، مما يؤدي إلى إنشاء خط أنابيب قوي للذكاء الاصطناعي وسير عمل البيانات الضخمة.</p>
<p>يدعم موصل Spark-Milvus مهام مثل الإدخال التكراري والجماعي للبيانات في Milvus، ومزامنة البيانات بين الأنظمة، والتحليلات المتقدمة على البيانات المتجهة المخزنة في Milvus. سيرشدك هذا الدليل إلى الخطوات اللازمة لتهيئة الرابط واستخدامه بفعالية لحالات الاستخدام مثل:</p>
<ul>
<li>تحميل بيانات المتجهات بكفاءة في Milvus على دفعات كبيرة,</li>
<li>نقل البيانات بين ميلفوس وأنظمة التخزين أو قواعد البيانات الأخرى,</li>
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>يدعم موصل Spark-Milvus Connector لغتي البرمجة Scala و Python. يمكن للمستخدمين استخدامه مع <strong>Pyspark</strong> أو <strong>Spark-shell</strong>. لتشغيل هذا العرض التوضيحي، قم بإعداد بيئة Spark التي تحتوي على تبعية Spark-Milvus Connector في الخطوات التالية:</p>
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
<pre><code translate="no">./bin/pyspark --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>شرارة قذيفة</strong></p>
<pre><code translate="no">./bin/spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">عرض توضيحي<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا العرض التوضيحي، نقوم بإنشاء نموذج Spark DataFrame مع بيانات متجهة ونكتبها إلى Milvus من خلال Spark-Milvus Connector. سيتم إنشاء مجموعة في Milvus تلقائيًا استنادًا إلى المخطط والخيارات المحددة.</p>
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
<pre><code translate="no" class="language-scala">import org.apache.spark.sql.{SaveMode, SparkSession}

object Hello extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;HelloSparkMilvus&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;a&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (2, &quot;b&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (3, &quot;c&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (4, &quot;d&quot;, Seq(1.0,2.0,3.0,4.0,5.0))
  ).toDF(&quot;id&quot;, &quot;text&quot;, &quot;vec&quot;)

  // set milvus options
  val milvusOptions = Map(
      &quot;milvus.host&quot; -&gt; &quot;localhost&quot; -&gt; uri,
      &quot;milvus.port&quot; -&gt; &quot;19530&quot;,
      &quot;milvus.collection.name&quot; -&gt; &quot;hello_spark_milvus&quot;,
      &quot;milvus.collection.vectorField&quot; -&gt; &quot;vec&quot;,
      &quot;milvus.collection.vectorDim&quot; -&gt; &quot;5&quot;,
      &quot;milvus.collection.primaryKeyField&quot;, &quot;id&quot;
    )
    
  sampleDF.write.format(&quot;milvus&quot;)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">خيارات ملفوس<button data-href="#Milvus-options" class="anchor-icon" translate="no">
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
    </button></h3><p>في قسم <a href="#Quick-start">البداية السريعة،</a> عرضنا خيارات الإعداد أثناء العمليات مع ميلفوس. يتم تجريد هذه الخيارات كخيارات Milvus. يتم استخدامها لإنشاء اتصالات مع ميلفوس والتحكم في سلوكيات ميلفوس الأخرى. ليست كل الخيارات إلزامية.</p>
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
<tr><td><code translate="no">milvus.secure</code></td><td><code translate="no">false</code></td><td>تمكين اتصالات TLS/SSL الآمنة.</td></tr>
<tr><td><code translate="no">milvus.secure.serverName</code></td><td><code translate="no">localhost</code></td><td>اسم المضيف المتوقع للتحقق من TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.serverPemPath</code></td><td><code translate="no">--</code></td><td>المسار إلى ملف PEM الخاص بالخادم للتحقق من TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.caCert</code></td><td><code translate="no">--</code></td><td>المسار إلى ملف شهادة CA للتحقق.</td></tr>
<tr><td><code translate="no">milvus.secure.clientCert</code></td><td><code translate="no">--</code></td><td>المسار إلى شهادة العميل للمصادقة.</td></tr>
<tr><td><code translate="no">milvus.secure.clientKey</code></td><td><code translate="no">--</code></td><td>المسار إلى مفتاح العميل الخاص للمصادقة.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>اسم حقل المفتاح الأساسي في المجموعة. مطلوب في حالة عدم وجود المجموعة.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>اسم حقل المتجه في المجموعة. مطلوب إذا كانت المجموعة غير موجودة.</td></tr>
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
<h3 id="milvus" class="common-anchor-header">ميلفوس<button data-href="#milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>في <a href="#Quick-start">البداية السريعة،</a> نستخدم تنسيق <strong>milvus</strong> لكتابة بيانات نموذجية في مجموعة Milvus. تنسيق <strong>milvus</strong> هو تنسيق بيانات جديد يدعم كتابة بيانات Spark DataFrame بسلاسة في مجموعات Milvus. يتم تحقيق ذلك من خلال استدعاءات دفعية إلى واجهة برمجة التطبيقات Insert API الخاصة بـ Milvus SDK. في حالة عدم وجود مجموعة في Milvus، سيتم إنشاء مجموعة جديدة بناءً على مخطط إطار البيانات. ومع ذلك، قد لا تدعم المجموعة التي تم إنشاؤها تلقائيًا جميع ميزات مخطط المجموعة. لذلك، يوصى بإنشاء مجموعة عبر SDK أولاً ثم استخدام شرارة ميلفوس للكتابة. لمزيد من المعلومات، يرجى الرجوع إلى <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">العرض التوضيحي</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">ميلفوسبينوغ<button data-href="#milvusbinlog" class="anchor-icon" translate="no">
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
    </button></h3><p>تنسيق البيانات الجديد <strong>milvusbinlog</strong> مخصص لقراءة بيانات Milvus binlog المدمجة في Milvus. Binlog هو تنسيق تخزين البيانات الداخلية لـ Milvus استناداً إلى الباركيه. لسوء الحظ، لا يمكن قراءتها من قبل مكتبة باركيه عادية، لذلك قمنا بتنفيذ تنسيق البيانات الجديد هذا لمساعدة وظيفة Spark على قراءتها. لا يوصى باستخدام <strong>تنسيق milvusbinlog</strong> مباشرةً إلا إذا كنت على دراية بتفاصيل التخزين الداخلي لـ Milvus. نقترح استخدام دالة <a href="#MilvusUtils">MilvusUtils</a> التي سيتم تقديمها في القسم التالي.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .format(&quot;milvusbinlog&quot;)
  .load(path)
  .withColumnRenamed(&quot;val&quot;, &quot;embedding&quot;)
</code></pre>
<h3 id="mjson" class="common-anchor-header">مجسون<button data-href="#mjson" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر ميلفوس وظيفة <a href="https://milvus.io/docs/bulk_insert.md">بولكنسيرت</a> لتحسين أداء الكتابة عند العمل مع مجموعات البيانات الكبيرة. ومع ذلك، فإن تنسيق JSON الذي يستخدمه Milvus يختلف قليلاً عن تنسيق إخراج JSON الافتراضي الخاص بـ Spark. لحل هذه المشكلة، نقدم تنسيق بيانات <strong>mjson</strong> لتوليد بيانات تلبي متطلبات Milvus. فيما يلي مثال يوضح الفرق بين JSON-lines و <strong>mjson</strong>:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (مطلوب لـ Milvus Bulkinsert):</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;rows&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
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
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection<button data-href="#MilvusUtilsreadMilvusCollection" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>MilvusUtils.readMilvusCollection</strong> هي واجهة بسيطة لتحميل مجموعة Milvus كاملة في إطار بيانات Spark. وهي تغلف العديد من العمليات، بما في ذلك استدعاء Milvus SDK، وقراءة <strong>milvusbinlog</strong> وعمليات الاتحاد/الربط الشائعة.</p>
<pre><code translate="no" class="language-scala">val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
</code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark<button data-href="#MilvusUtilsbulkInsertFromSpark" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر MilvusUtils<strong>.bulkInsertFertFromSpark</strong> طريقة ملائمة لاستيراد ملفات إخراج Spark إلى Milvus دفعة واحدة. وهي تلتف على واجهة برمجة تطبيقات <strong>Bullkinsert</strong> الخاصة بحزمة تطوير البرمجيات Milvus SDK.</p>
<pre><code translate="no" class="language-scala">df.write.format(&quot;parquet&quot;).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, &quot;parquet&quot;)
</code></pre>
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
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; التضمين -&gt; ميلفوس<button data-href="#MySQL---embedding---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا العرض التوضيحي، سنقوم بما يلي</p>
<ol>
<li>قراءة البيانات من MySQL من خلال موصل Spark-MySQL,</li>
<li>توليد التضمين (باستخدام Word2Vec كمثال)، و</li>
<li>كتابة البيانات المضمنة في ملفوس.</li>
</ol>
<p>لتمكين موصل Spark-MySQL، تحتاج إلى إضافة التبعية التالية إلى بيئة Spark الخاصة بك:</p>
<pre><code translate="no">spark-shell <span class="hljs-attr">--jars</span> spark-milvus-<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>-SNAPSHOT<span class="hljs-selector-class">.jar</span>,mysql-connector-j-<span class="hljs-attribute">x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.jar</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.{SaveMode, SparkSession}
import zilliztech.spark.milvus.MilvusOptions._

import org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo  extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;Mysql2MilvusDemo&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;),
    (2, &quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;),
    (3, &quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;),
    (4, &quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;)
  ).toDF(&quot;id&quot;, &quot;text&quot;)

  // Write to MySQL Table
  sampleDF.write
    .mode(SaveMode.Append)
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .save()

  // Read from MySQL Table
  val dfMysql = spark.read
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .load()

  val tokenizer = new Tokenizer().setInputCol(&quot;text&quot;).setOutputCol(&quot;tokens&quot;)
  val tokenizedDf = tokenizer.transform(dfMysql)

  // Learn a mapping from words to Vectors.
  val word2Vec = new Word2Vec()
    .setInputCol(&quot;tokens&quot;)
    .setOutputCol(&quot;vectors&quot;)
    .setVectorSize(128)
    .setMinCount(0)
  val model = word2Vec.fit(tokenizedDf)

  val result = model.transform(tokenizedDf)

  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // Apply the UDF to the DataFrame
  val resultDF = result.withColumn(&quot;embedding&quot;, vectorToArrayUDF($&quot;vectors&quot;))
  val milvusDf = resultDF.drop(&quot;tokens&quot;).drop(&quot;vectors&quot;)

  milvusDf.write.format(&quot;milvus&quot;)
    .option(MILVUS_HOST, &quot;localhost&quot;)
    .option(MILVUS_PORT, &quot;19530&quot;)
    .option(MILVUS_COLLECTION_NAME, &quot;text_embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_FIELD, &quot;embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_DIM, &quot;128&quot;)
    .option(MILVUS_COLLECTION_PRIMARY_KEY, &quot;id&quot;)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">ميلفوس -&gt; تحويل -&gt; ميلفوس<button data-href="#Milvus---Transform---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا العرض التوضيحي، سنقوم بما يلي</p>
<ol>
<li>قراءة البيانات من مجموعة Milvus,</li>
<li>تطبيق تحويل (باستخدام PCA كمثال)، و</li>
<li>كتابة البيانات المحولة إلى ملفوس آخر عبر واجهة برمجة تطبيقات بولكنسيرت.</li>
</ol>
<div class="alert notes">
<p>نموذج PCA هو نموذج تحويل يقلل من أبعاد متجهات التضمين، وهي عملية شائعة في التعلم الآلي. يمكنك إضافة أي عمليات معالجة أخرى، مثل التصفية أو الضم أو التطبيع، إلى خطوة التحويل.</p>
</div>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.PCA
import org.apache.spark.ml.linalg.{Vector, Vectors}
import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.util.CaseInsensitiveStringMap
import zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

import scala.collection.JavaConverters._

object TransformDemo extends App {
  val sparkConf = new SparkConf().setMaster(&quot;local&quot;)
  val spark = SparkSession.builder().config(sparkConf).getOrCreate()

  import spark.implicits._

  val host = &quot;localhost&quot;
  val port = 19530
  val user = &quot;root&quot;
  val password = &quot;Milvus&quot;
  val fs = &quot;s3a://&quot;
  val bucketName = &quot;a-bucket&quot;
  val rootPath = &quot;files&quot;
  val minioAK = &quot;minioadmin&quot;
  val minioSK = &quot;minioadmin&quot;
  val minioEndpoint = &quot;localhost:9000&quot;
  val collectionName = &quot;hello_spark_milvus1&quot;
  val targetCollectionName = &quot;hello_spark_milvus2&quot;

  val properties = Map(
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

  // 1, configurations
  val milvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(properties.asJava))

  // 2, batch read milvus collection data to dataframe
  //  Schema: dim of `embeddings` is 8
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=8        |
  // +-+------------+------------+------------------+
  val arrayToVectorUDF = udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
  val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
    .withColumn(&quot;embeddings_vec&quot;, arrayToVectorUDF($&quot;embeddings&quot;))
    .drop(&quot;embeddings&quot;)
  
  // 3. Use PCA to reduce dim of vector
  val dim = 4
  val pca = new PCA()
    .setInputCol(&quot;embeddings_vec&quot;)
    .setOutputCol(&quot;pca_vec&quot;)
    .setK(dim)
    .fit(collectionDF)
  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // embeddings dim number reduce to 4
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=4        |
  // +-+------------+------------+------------------+
  val pcaDf = pca.transform(collectionDF)
    .withColumn(&quot;embeddings&quot;, vectorToArrayUDF($&quot;pca_vec&quot;))
    .select(&quot;pk&quot;, &quot;random&quot;, &quot;embeddings&quot;)

  // 4. Write PCAed data to S3
  val outputPath = &quot;s3a://a-bucket/result&quot;
  pcaDf.write
    .mode(&quot;overwrite&quot;)
    .format(&quot;parquet&quot;)
    .save(outputPath)

  // 5. Config MilvusOptions of target table  
  val targetProperties = Map(
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
  val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
  // 6. Bulkinsert Spark output files into milvus
  MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;parquet&quot;)
}
</code></pre>
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">داتابريكس -&gt; زيليز كلاود<button data-href="#Databricks---Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كنت تستخدم Zilliz Cloud (خدمة Milvus المُدارة)، يمكنك الاستفادة من واجهة برمجة تطبيقات استيراد البيانات الملائمة. توفر Zilliz Cloud أدوات ووثائق شاملة لمساعدتك على نقل بياناتك بكفاءة من مصادر بيانات مختلفة، بما في ذلك Spark وDatabricks. ما عليك سوى إعداد دلو S3 كوسيط وفتح وصوله إلى حساب Zilliz Cloud الخاص بك. ستقوم واجهة برمجة تطبيقات استيراد البيانات في زيليز كلاود بتحميل دفعة كاملة من البيانات تلقائيًا من دلو S3 إلى مجموعة زيليز كلاود الخاصة بك.</p>
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
<pre><code translate="no" class="language-scala">// Write the data in batch into the Milvus bucket storage.
val outputPath = &quot;s3://my-temp-bucket/result&quot;
df.write
  .mode(&quot;overwrite&quot;)
  .format(&quot;mjson&quot;)
  .save(outputPath)
// Specify Milvus options.
val targetProperties = Map(
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
val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
// Bulk insert Spark output files into Milvus
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;mjson&quot;)
</code></pre>
<h2 id="Hands-on-Notebook" class="common-anchor-header">المفكرة العملية<button data-href="#Hands-on-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>لمساعدتك على البدء سريعًا في استخدام موصل Spark-Milvus Connector، يمكنك الاطلاع على دفتر الملاحظات الذي يرشدك خلال أمثلة استيعاب البيانات المتدفقة والدفعية ل Spark إلى Milvus و Zilliz Cloud.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">التدريب العملي على موصل Spark-Milvus Connector</a></li>
</ul>
