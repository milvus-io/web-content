---
id: schema.md
summary: تعلم كيفية تعريف مخطط في ميلفوس.
title: إدارة المخطط
---
<h1 id="Manage-Schema" class="common-anchor-header">إدارة المخطط<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع المخطط في ملفوس. يُستخدم المخطط لتحديد خصائص المجموعة والحقول الموجودة بداخلها.</p>
<h2 id="Field-schema" class="common-anchor-header">مخطط الحقل<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>مخطط الحقل هو التعريف المنطقي للحقل. وهو أول ما تحتاج إلى تعريفه قبل تحديد <a href="#Collection-schema">مخطط المجموعة</a> <a href="/docs/ar/manage-collections.md">وإدارة المجموعات</a>.</p>
<p>يدعم Milvus حقل مفتاح أساسي واحد فقط في المجموعة.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">خصائص مخطط الحقل</h3><table class="properties">
    <thead>
    <tr>
        <th>الخصائص</th>
        <th>الوصف</th>
        <th>ملاحظة</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>اسم الحقل في المجموعة المراد إنشاؤها</td>
        <td>نوع البيانات: سلسلة.<br/>إلزامي</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>نوع بيانات الحقل</td>
        <td>إلزامي</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>وصف الحقل</td>
        <td>نوع البيانات: سلسلة.<br/>اختياري</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>ما إذا كان سيتم تعيين الحقل كحقل مفتاح أساسي أم لا</td>
        <td>نوع البيانات: منطقية (<code translate="no">true</code> أو <code translate="no">false</code>).<br/>إلزامي لحقل المفتاح الأساسي</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (إلزامي لحقل المفتاح الأساسي)</td>
            <td>التبديل لتمكين أو تعطيل التخصيص التلقائي للمعرف (المفتاح الأساسي).</td>
            <td><code translate="no">True</code> أو <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (إلزامي لحقل VARCHAR)</td>
            <td>الحد الأقصى لطول البايت للسلاسل المسموح بإدراجها. لاحظ أن الأحرف متعددة البايتات (على سبيل المثال، أحرف Unicode) قد تشغل أكثر من بايت واحد لكل منها، لذا تأكد من أن طول البايت للسلاسل المدرجة لا يتجاوز الحد المحدد.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>بُعد المتجه</td>
            <td>نوع البيانات: عدد صحيح &isin; [1، 32768].<br/>إلزامي لحقل متجه كثيف. حذف لحقل <a href="https://milvus.io/docs/sparse_vector.md">متجه متناثر</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>ما إذا كان هذا الحقل هو حقل مفتاح التقسيم.</td>
        <td>نوع البيانات: منطقية (<code translate="no">true</code> أو <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">إنشاء مخطط حقل</h3><p>لتقليل التعقيد في إدخالات البيانات، يسمح لك Milvus بتحديد قيمة افتراضية لكل حقل متجه أثناء إنشاء مخطط الحقل، باستثناء حقل المفتاح الأساسي. يشير هذا إلى أنه إذا تركت حقلاً فارغًا عند إدراج البيانات، يتم تطبيق القيمة الافتراضية التي حددتها لهذا الحقل.</p>
<p>إنشاء مخطط حقل عادي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء مخطط حقل بقيم الحقول الافتراضية:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">أنواع البيانات المدعومة</h3><p><code translate="no">DataType</code> يحدد نوع البيانات التي يحتوي عليها الحقل. تدعم الحقول المختلفة أنواع بيانات مختلفة.</p>
<ul>
<li><p>يدعم حقل المفتاح الأساسي:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>varchar: varchar</li>
</ul></li>
<li><p>يدعم الحقل العددي:</p>
<ul>
<li>BOOL: منطقية (<code translate="no">true</code> أو <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>مزدوج: numpy.double.numpy.double</li>
<li>varchar: varchar</li>
<li>JSON: <a href="/docs/ar/use-json-fields.md">JSON</a></li>
<li>صفيف: <a href="/docs/ar/array_data_type.md">مصفوفة</a></li>
</ul>
<p>يتوفر JSON كنوع بيانات مركب. يتألف حقل JSON من أزواج مفاتيح وقيمة. كل مفتاح عبارة عن سلسلة، ويمكن أن تكون القيمة رقمًا أو سلسلة أو قيمة منطقية أو مصفوفة أو قائمة. لمزيد من التفاصيل، راجع <a href="/docs/ar/use-json-fields.md">JSON: نوع بيانات جديد</a>.</p></li>
<li><p>يدعم حقل المتجه:</p>
<ul>
<li>BINARY_VECTOR: يخزّن البيانات الثنائية كسلسلة من 0 و1، ويستخدم لتمثيل الميزات المدمجة في معالجة الصور واسترجاع المعلومات.</li>
<li>FLOAT_VECTOR: يخزن الأرقام ذات الفاصلة العائمة 32 بت، وتستخدم عادةً في الحوسبة العلمية والتعلم الآلي لتمثيل الأرقام الحقيقية.</li>
<li>FLOAT16_VECTOR: يخزّن الأرقام ذات الفاصلة العائمة نصف الدقيقة ذات 16 بت، وتستخدم في التعلم العميق وحسابات وحدة معالجة الرسومات من أجل كفاءة الذاكرة وعرض النطاق الترددي.</li>
<li>BFLOAT16_VECTOR: يخزّن الأرقام ذات الفاصلة العائمة 16 بت بدقة منخفضة ولكن بنفس نطاق الأس مثل Float32، وهي شائعة في التعلّم العميق لتقليل متطلبات الذاكرة والحسابات دون التأثير على الدقة بشكل كبير.</li>
<li>SPARSE_FLOAT_VECTOR: يخزن قائمة بالعناصر غير الصفرية والمؤشرات المقابلة لها، وتستخدم لتمثيل المتجهات المتفرقة. لمزيد من المعلومات، راجع <a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a>.</li>
</ul>
<p>يدعم ميلفوس حقول متجهات متعددة في مجموعة. لمزيد من المعلومات، راجع <a href="/docs/ar/multi-vector-search.md">البحث المختلط</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">مخطط المجموعة<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>مخطط المجموعة هو التعريف المنطقي للمجموعة. وعادةً ما تحتاج إلى تعريف <a href="#Field-schema">مخطط الحقل</a> قبل تعريف مخطط المجموعة <a href="/docs/ar/manage-collections.md">وإدارة المجموعات</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">خصائص مخطط المجموعة</h3><table class="properties">
    <thead>
    <tr>
        <th>الخصائص</th>
        <th>الوصف</th>
        <th>ملاحظة</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>الحقول في المجموعة المراد إنشاؤها</td>
        <td>إلزامي</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>وصف المجموعة</td>
        <td>نوع البيانات: سلسلة.<br/>اختياري</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>اسم الحقل الذي تم تصميمه ليكون بمثابة مفتاح التقسيم.</td>
        <td>نوع البيانات: سلسلة.<br/>اختياري.</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>ما إذا كان سيتم تمكين المخطط الديناميكي أم لا</td>
        <td>نوع البيانات: منطقية (<code translate="no">true</code> أو <code translate="no">false</code>).<br/>اختياري، الإعداد الافتراضي <code translate="no">False</code>.<br/>للحصول على تفاصيل حول المخطط الديناميكي، راجع <a herf="enable-dynamic-field.md">المخطط الديناميكي</a> وأدلة المستخدم لإدارة المجموعات.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">إنشاء مخطط مجموعة</h3><div class="alert note">
  حدد مخططات الحقول قبل تحديد مخطط مجموعة.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء مجموعة بالمخطط المحدد:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>, connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>يمكنك تعريف رقم الجزء مع <code translate="no">shards_num</code>.</li>
<li>يمكنك تحديد خادم ميلفوس الذي ترغب في إنشاء مجموعة عليه من خلال تحديد الاسم المستعار في <code translate="no">using</code>.</li>
<li>يمكنك تمكين ميزة مفتاح التقسيم على أحد الحقول عن طريق تعيين <code translate="no">is_partition_key</code> إلى <code translate="no">True</code> على الحقل إذا كنت بحاجة إلى تنفيذ <a href="/docs/ar/multi_tenancy.md">التآخي المتعدد المستند إلى مفتاح التقسيم</a>.</li>
<li>يمكنك تمكين المخطط الديناميكي عن طريق تعيين <code translate="no">enable_dynamic_field</code> إلى <code translate="no">True</code> في مخطط المجموعة إذا كنت بحاجة إلى <a href="/docs/ar/enable-dynamic-field.md">تمكين الحقل الديناميكي</a>.</li>
</ul>
</div>
<p><br/>
يمكنك أيضًا إنشاء مجموعة باستخدام <code translate="no">Collection.construct_from_dataframe</code> ، والتي تقوم تلقائيًا بإنشاء مخطط مجموعة من DataFrame وإنشاء مجموعة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>تعرف على كيفية إعداد المخطط عند <a href="/docs/ar/manage-collections.md">إدارة المجموعات</a>.</li>
<li>اقرأ المزيد عن <a href="/docs/ar/enable-dynamic-field.md">المخطط الديناميكي</a>.</li>
<li>اقرأ المزيد حول مفتاح التقسيم في <a href="/docs/ar/multi_tenancy.md">تعدد التآلف</a>.</li>
</ul>
