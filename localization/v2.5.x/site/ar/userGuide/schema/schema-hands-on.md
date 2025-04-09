---
id: schema-hands-on.md
title: التدريب العملي على تصميم المخطط
summary: >-
  تُعد أنظمة استرجاع المعلومات (IR)، والمعروفة أيضًا باسم محركات البحث، ضرورية
  لتطبيقات الذكاء الاصطناعي المختلفة مثل التوليد المعزز للاسترجاع (RAG) والبحث
  عن الصور والتوصية بالمنتجات. تتمثل الخطوة الأولى في تطوير نظام استرجاع
  المعلومات في تصميم نموذج البيانات، والذي يتضمن تحليل متطلبات العمل، وتحديد
  كيفية تنظيم المعلومات، وفهرسة البيانات لجعلها قابلة للبحث الدلالي.
---
<h1 id="Schema-Design-Hands-On" class="common-anchor-header">التدريب العملي على تصميم المخطط<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>تُعد أنظمة استرجاع المعلومات (IR)، والمعروفة أيضًا باسم محركات البحث، ضرورية لتطبيقات الذكاء الاصطناعي المختلفة مثل التوليد المعزز للاسترجاع (RAG) والبحث عن الصور والتوصية بالمنتجات. وتتمثل الخطوة الأولى في تطوير نظام IR في تصميم نموذج البيانات، والذي يتضمن تحليل متطلبات العمل، وتحديد كيفية تنظيم المعلومات، وفهرسة البيانات لجعلها قابلة للبحث الدلالي.</p>
<p>يدعم Milvus تحديد نموذج البيانات من خلال مخطط تجميع. وتنظم المجموعة البيانات غير المهيكلة مثل النصوص والصور، إلى جانب تمثيلاتها المتجهة، بما في ذلك المتجهات الكثيفة والمتناثرة بدقة مختلفة تستخدم للبحث الدلالي. بالإضافة إلى ذلك، يدعم Milvus تخزين وتصفية أنواع البيانات غير المتجهة التي تسمى "Scalar". تشمل الأنواع العددية BOOL و INT8/16/32/64 و FLOAT/DOUBLE و VARCHAR و JSON و Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="schema-hands-on" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>المخطط-التدريب العملي</span> </span></p>
<p>يتضمن تصميم نموذج البيانات لنظام البحث تحليل احتياجات العمل وتجريد المعلومات في نموذج بيانات معبر عن المخطط. على سبيل المثال، للبحث في جزء من النص، يجب "فهرسته" من خلال تحويل السلسلة الحرفية إلى متجه من خلال "التضمين"، مما يتيح البحث في المتجه. بالإضافة إلى هذا الشرط الأساسي، قد يكون من الضروري تخزين خصائص أخرى مثل الطابع الزمني للنشر والمؤلف. تسمح هذه البيانات الوصفية بتنقيح عمليات البحث الدلالي من خلال التصفية، بحيث لا تُعيد سوى النصوص المنشورة بعد تاريخ محدد أو من قبل مؤلف معين. قد يلزم أيضًا استرجاعها مع النص الرئيسي، لعرض نتيجة البحث في التطبيق. ولتنظيم هذه الأجزاء النصية، يجب تعيين معرّف فريد لكل منها، يتم التعبير عنه كعدد صحيح أو سلسلة. هذه العناصر ضرورية لتحقيق منطق بحث متطور.</p>
<p>يعد المخطط المصمم جيدًا مهمًا لأنه يلخص نموذج البيانات ويقرر ما إذا كان يمكن تحقيق أهداف العمل من خلال البحث. علاوة على ذلك، نظرًا لأن كل صف من البيانات التي يتم إدراجها في المجموعة يجب أن يتبع المخطط، فإنه يساعد بشكل كبير في الحفاظ على اتساق البيانات والجودة على المدى الطويل. من من منظور تقني، يؤدي المخطط المحدد جيدًا إلى تخزين بيانات الأعمدة بشكل جيد التنظيم وهيكل فهرس أنظف، مما يمكن أن يعزز أداء البحث.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">مثال على ذلك: البحث عن الأخبار<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>لنفترض أننا نريد إنشاء بحث لموقع إلكتروني إخباري ولدينا مجموعة من الأخبار مع نصوص وصور مصغرة وبيانات وصفية أخرى. أولاً، نحتاج أولاً إلى تحليل كيفية استخدام البيانات لدعم متطلبات العمل الخاصة بالبحث. تخيل أن المتطلب هو استرداد الأخبار استنادًا إلى الصورة المصغرة وملخص المحتوى، وأخذ البيانات الوصفية مثل معلومات المؤلف ووقت النشر كمعايير لتصفية نتيجة البحث. يمكن تقسيم هذه المتطلبات إلى:</p>
<ul>
<li><p>للبحث عن الصور من خلال النص، يمكننا تضمين الصور في متجهات عبر نموذج تضمين متعدد الوسائط يمكنه تعيين بيانات النص والصورة في نفس المساحة الكامنة.</p></li>
<li><p>يتم تضمين النص الموجز لمقالة ما في متجهات عبر نموذج تضمين النص.</p></li>
<li><p>للتصفية استنادًا إلى وقت النشر، يتم تخزين التواريخ كحقل قياسي ويلزم وجود فهرس للحقل القياسي للتصفية الفعالة. يمكن تخزين هياكل بيانات أخرى أكثر تعقيدًا مثل JSON في عدد قياسي وإجراء بحث مصفى على محتوياتها (فهرسة JSON ميزة قادمة).</p></li>
<li><p>لاسترداد الصورة المصغرة للصور بالبايت وعرضها على صفحة نتائج البحث، يتم تخزين عنوان url الخاص بالصورة أيضًا. وبالمثل، لنص الملخص والعنوان. (بدلاً من ذلك، يمكننا تخزين بيانات النص الخام وبيانات ملف الصورة كحقول قياسية إذا لزم الأمر).</p></li>
<li><p>لتحسين نتيجة البحث على النص الملخص، نقوم بتصميم نهج بحث هجين. بالنسبة لأحد مسارات الاسترجاع، نستخدم نموذج التضمين العادي لتوليد متجه كثيف من النص، مثل OpenAI's <code translate="no">text-embedding-3-large</code> أو نموذج <code translate="no">bge-large-en-v1.5</code> المفتوح المصدر. هذه النماذج جيدة في تمثيل الدلالات الإجمالية للنص. والمسار الآخر هو استخدام نماذج التضمين المتناثر مثل BM25 أو SPLADE لتوليد متجه متناثر، يشبه البحث في النص الكامل الذي يجيد استيعاب التفاصيل والمفاهيم الفردية في النص. يدعم Milvus استخدام كليهما في نفس مجموعة البيانات بفضل ميزة المتجهات المتعددة. يمكن إجراء البحث على متجهات متعددة في عملية واحدة <code translate="no">hybrid_search()</code>.</p></li>
<li><p>أخيرًا، نحتاج أيضًا إلى حقل معرّف لتحديد كل صفحة أخبار فردية، يشار إليها رسميًا باسم "كيان" في مصطلحات ميلفوس. يُستخدم هذا الحقل كمفتاح أساسي (أو "pk" اختصارًا).</p></li>
</ul>
<table>
   <tr>
     <th><p>اسم الحقل</p></th>
     <th><p>article_id (المفتاح الأساسي)</p></th>
     <th><p>العنوان</p></th>
     <th><p>المؤلف_المعلومات</p></th>
     <th><p>نشر_ت</p></th>
     <th><p>صورة_url</p></th>
     <th><p>متجه_الصورة</p></th>
     <th><p>ملخص</p></th>
     <th><p>ملخص_المتجه_الكثيف</p></th>
     <th><p>ملخص_المتجه_المتفرق</p></th>
   </tr>
   <tr>
     <td><p>النوع</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>متناثر_مُتجه_مُتفرق</p></td>
   </tr>
   <tr>
     <td><p>تحتاج إلى فهرس</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (الدعم قريبًا)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">كيفية تنفيذ مخطط المثال<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">إنشاء مخطط</h3><p>أولاً، نقوم بإنشاء مثيل عميل Milvus، والذي يمكن استخدامه للاتصال بخادم Milvus وإدارة المجموعات والبيانات.</p>
<p>لإعداد مخطط، نستخدم <code translate="no">create_schema()</code> لإنشاء كائن مخطط و <code translate="no">add_field()</code> لإضافة حقول إلى المخطط.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>قد تلاحظ الوسيطة <code translate="no">uri</code> في <code translate="no">MilvusClient</code> ، والتي تُستخدم للاتصال بخادم ميلفوس. يمكنك تعيين الوسيطات على النحو التالي:</p>
<ul>
<li><p>إذا كنت تحتاج فقط إلى قاعدة بيانات متجهية محلية للبيانات الصغيرة الحجم أو النماذج الأولية، فإن تعيين الوسيطة كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هي الطريقة الأكثر ملاءمة، حيث تستخدم تلقائيًا <a href="/docs/ar/milvus_lite.md">Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</p></li>
<li><p>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون ناقل، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="/docs/ar/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كـ uri، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين ميزة المصادقة على Milvus، استخدم "<your_username>:<your_password>" كرمز مميز، وإلا فلا تقم بتعيين الرمز المميز.</p></li>
<li><p>إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات في Zilliz Cloud.</p></li>
</ul>
<p>أما بالنسبة إلى <code translate="no">auto_id</code> في <code translate="no">MilvusClient.create_schema</code> ، فإن المعرف التلقائي هو سمة للحقل الأساسي الذي يحدد ما إذا كان سيتم تمكين الزيادة التلقائية للحقل الأساسي.  نظرًا لأننا قمنا بتعيين الحقل<code translate="no">article_id</code> كمفتاح أساسي ونريد إضافة معرف المقالة يدويًا، قمنا بتعيين <code translate="no">auto_id</code> False لتعطيل هذه الميزة.</p>
<p>بعد إضافة جميع الحقول إلى كائن المخطط، يتوافق كائن المخطط الخاص بنا مع الإدخالات في الجدول أعلاه.</p>
<h3 id="Define-Index" class="common-anchor-header">تعريف الفهرس</h3><p>بعد تعريف المخطط بحقول مختلفة، بما في ذلك حقول البيانات الوصفية والحقول المتجهة لبيانات الصور والملخص، تتضمن الخطوة التالية إعداد معلمات الفهرس. الفهرسة أمر بالغ الأهمية لتحسين البحث عن المتجهات واسترجاعها، مما يضمن أداء استعلام فعال. في القسم التالي، سنقوم بتعريف معلمات الفهرس للحقول المتجهة والقياسية المحددة في المجموعة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-built_in">new</span> ArrayList&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>بمجرد إعداد معلمات الفهرس وتطبيقها، يتم تحسين Milvus لمعالجة الاستعلامات المعقدة على البيانات المتجهة والقياسية. تعمل هذه الفهرسة على تحسين أداء ودقة عمليات البحث عن التشابه داخل المجموعة، مما يسمح باسترجاع المقالات بكفاءة استنادًا إلى متجهات الصور والمتجهات الموجزة. من خلال الاستفادة من <code translate="no">AUTOINDEX</code> للمتجهات الكثيفة، و <code translate="no">SPARSE_INVERTED_INDEX</code> للمتجهات المتفرقة و <code translate="no">INVERTED_INDEX</code> للكميات القياسية، يمكن لـ Milvus تحديد النتائج الأكثر صلة وإرجاعها بسرعة، مما يحسن بشكل كبير من تجربة المستخدم الإجمالية وفعالية عملية استرجاع البيانات.</p>
<p>هناك العديد من أنواع المؤشرات والمقاييس. لمزيد من المعلومات حولها، يمكنك الرجوع إلى <a href="/docs/ar/overview.md#Index-types">نوع فهرس Milvus</a> <a href="/docs/ar/glossary.md#Metric-type">ونوع مقياس Milvus</a>.</p>
<h3 id="Create-Collection" class="common-anchor-header">إنشاء مجموعة</h3><p>مع تحديد المخطط والفهارس، نقوم بإنشاء "مجموعة" بهذه المعلمات. المجموعة بالنسبة لـ Milvus مثل الجدول في قاعدة بيانات علائقية.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>يمكننا التحقق من إنشاء المجموعة بنجاح من خلال وصف المجموعة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">نودجيز</a> <a href="#go">جو</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">اعتبارات أخرى<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">تحميل الفهرس</h3><p>عند إنشاء مجموعة في Milvus، يمكنك اختيار تحميل الفهرس على الفور أو تأجيله إلى ما بعد استيعاب بعض البيانات بشكل مجمّع. عادةً، لا تحتاج إلى اتخاذ خيار صريح حول هذا الأمر، حيث توضح الأمثلة أعلاه أن الفهرس يتم إنشاؤه تلقائيًا لأي بيانات يتم استيعابها مباشرةً بعد إنشاء المجموعة. هذا يسمح بإمكانية البحث الفوري عن البيانات التي تم استيعابها. ومع ذلك، إذا كان لديك عملية إدراج مجمعة كبيرة بعد إنشاء المجموعة ولا تحتاج إلى البحث عن أي بيانات حتى نقطة معينة، يمكنك تأجيل بناء الفهرس عن طريق حذف index_params في إنشاء المجموعة وإنشاء الفهرس عن طريق استدعاء التحميل صراحةً بعد استيعاب جميع البيانات. تعتبر هذه الطريقة أكثر فعالية لبناء الفهرس على مجموعة كبيرة، ولكن لا يمكن إجراء أي عمليات بحث حتى استدعاء التحميل().</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">كيفية تعريف نموذج البيانات للمستأجرين المتعددين</h3><p>يُستخدم مفهوم المستأجرين المتعددين بشكل شائع في السيناريوهات التي يحتاج فيها تطبيق أو خدمة برمجية واحدة لخدمة عدة مستخدمين أو مؤسسات مستقلة، لكل منها بيئتها المعزولة. يظهر هذا بشكل متكرر في الحوسبة السحابية وتطبيقات SaaS (البرمجيات كخدمة) وأنظمة قواعد البيانات. على سبيل المثال، يمكن أن تستخدم خدمة التخزين السحابي الإيجار المتعدد للسماح لشركات مختلفة بتخزين بياناتها وإدارتها بشكل منفصل مع مشاركة نفس البنية التحتية الأساسية. هذا النهج يزيد من استخدام الموارد والكفاءة مع ضمان أمن البيانات والخصوصية لكل مستأجر.</p>
<p>أسهل طريقة للتمييز بين المستأجرين هي عزل بياناتهم ومواردهم عن بعضهم البعض. كل مستأجر إما لديه وصول حصري إلى موارد محددة أو يشارك الموارد مع الآخرين لإدارة كيانات Milvus مثل قواعد البيانات والمجموعات والأقسام. هناك طرق محددة تتماشى مع هذه الكيانات لتنفيذ الإيجار المتعدد. يمكنك الرجوع إلى <a href="/docs/ar/multi_tenancy.md#Multi-tenancy-strategies">صفحة الإيجار المتعدد</a> في <a href="/docs/ar/multi_tenancy.md#Multi-tenancy-strategies">ميلفوس</a> للمزيد من المعلومات.</p>
