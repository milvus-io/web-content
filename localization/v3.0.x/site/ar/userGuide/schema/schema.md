---
id: schema.md
title: شرح المخطط
summary: >-
  يحدد المخطط بنية بيانات المجموعة. قبل إنشاء مجموعة، تحتاج إلى وضع تصميم
  لمخططها. تساعدك هذه الصفحة على فهم مخطط المجموعة وتصميم مثال للمخطط بنفسك.
---
<h1 id="Schema-Explained​" class="common-anchor-header">شرح المخطط<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>يحدد المخطط بنية بيانات المجموعة. قبل إنشاء مجموعة، تحتاج إلى وضع تصميم لمخططها. تساعدك هذه الصفحة على فهم مخطط المجموعة وتصميم مثال للمخطط بنفسك.</p>
<h2 id="Overview​" class="common-anchor-header">نظرة عامة<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>في Milvus، يقوم مخطط المجموعة بتجميع جدول في قاعدة بيانات علائقية، والذي يحدد كيفية تنظيم Milvus للبيانات في المجموعة. </p>
<p>يعد المخطط المصمم جيدًا أمرًا ضروريًا لأنه يلخص نموذج البيانات ويقرر ما إذا كان بإمكانك تحقيق أهداف العمل من خلال البحث. علاوة على ذلك، نظرًا لأن كل صف من البيانات المدرجة في المجموعة يجب أن يتبع المخطط، فإنه يساعد في الحفاظ على اتساق البيانات والجودة على المدى الطويل. من من منظور تقني، يؤدي المخطط المحدد جيدًا إلى تخزين بيانات الأعمدة بشكل جيد التنظيم وهيكل فهرس أنظف، مما يعزز أداء البحث.</p>
<p>يحتوي مخطط المجموعة على مفتاح أساسي، وأربعة حقول متجهة كحد أقصى، والعديد من الحقول القياسية. يوضح الرسم البياني التالي كيفية تعيين مقالة إلى قائمة حقول المخطط.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/schema-explained.png" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>تصميم المخطط</span> </span></p>
<p>يتضمن تصميم نموذج البيانات لنظام البحث تحليل احتياجات العمل وتجريد المعلومات في نموذج بيانات معبّر عن المخطط. على سبيل المثال، يجب "فهرسة" البحث في جزء من النص عن طريق تحويل السلسلة الحرفية إلى متجه من خلال "التضمين" وتمكين البحث في المتجه. بالإضافة إلى هذا الشرط الأساسي، قد يكون من الضروري تخزين خصائص أخرى مثل الطابع الزمني للنشر والمؤلف. تسمح هذه البيانات الوصفية بتنقيح عمليات البحث الدلالية من خلال التصفية، وإرجاع النصوص المنشورة بعد تاريخ محدد أو من قبل مؤلف معين فقط. يمكنك أيضًا استرداد هذه المقاييس مع النص الرئيسي لعرض نتيجة البحث في التطبيق. يجب تعيين مُعرِّف فريد لكل منها لتنظيم هذه الأجزاء النصية، معبراً عنه كعدد صحيح أو سلسلة. هذه العناصر ضرورية لتحقيق منطق بحث متطور.</p>
<p>راجع <a href="/docs/ar/schema-hands-on.md">التدريب العملي على تصميم المخطط</a> لمعرفة كيفية إنشاء مخطط جيد التصميم.</p>
<h2 id="Create-Schema​" class="common-anchor-header">إنشاء مخطط<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح مقتطف الشيفرة التالي كيفية إنشاء مخطط.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export schema='{​
    &quot;fields&quot;: []​
}'​

</code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">إضافة حقل أساسي<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>يُعرِّف الحقل الأساسي في مجموعة ما كيانًا بشكل فريد. يقبل فقط قيم <strong>Int64</strong> أو <strong>VarChar</strong>. توضح مقتطفات الشيفرة التالية كيفية إضافة الحقل الأساسي.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,​</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; ​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)​</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export primaryField='{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}'​
​
export schema='{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}'​

</code></pre>
<p>عند إضافة حقل، يمكنك توضيح الحقل صراحةً كحقل أساسي عن طريق تعيين الخاصية <code translate="no">is_primary</code> إلى <code translate="no">True</code>. يقبل الحقل الأساسي قيم <strong>Int64</strong> افتراضيًا. في هذه الحالة، يجب أن تكون قيمة الحقل الأساسي أعدادًا صحيحة مشابهة لـ <code translate="no">12345</code>. إذا اخترت استخدام قيم <strong>VarChar</strong> في الحقل الأساسي، فيجب أن تكون القيمة سلاسل مشابهة لـ <code translate="no">my_entity_1234</code>.</p>
<p>يمكنك أيضًا تعيين خصائص <code translate="no">autoId</code> على <code translate="no">True</code> لجعل ميلفوس يخصص قيم الحقل الأساسي تلقائيًا عند إدراج البيانات.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/primary-field.md">الحقل الأساسي والمعرف التلقائي</a>.</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">إضافة حقول متجهة<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>تقبل الحقول المتجهة العديد من التضمينات المتجهة المتفرقة والكثيفة. في ميلفوس، يمكنك إضافة أربعة حقول متجهة إلى مجموعة. توضح مقتطفات التعليمات البرمجية التالية كيفية إضافة حقل متجه.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export vectorField='{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField​
    ]​
}&quot;​

</code></pre>
<p>تشير المعلمة <code translate="no">dim</code> في مقتطفات التعليمات البرمجية أعلاه إلى بُعدية التضمينات المتجهة التي سيتم الاحتفاظ بها في الحقل المتجه. تشير القيمة <code translate="no">FLOAT_VECTOR</code> إلى أن حقل المتجه يحتوي على قائمة من الأعداد العائمة 32 بت، والتي تستخدم عادةً لتمثيل مضادات الجذر، بالإضافة إلى ذلك، يدعم ميلفوس أيضًا الأنواع التالية من تضمينات المتجهات.</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>يحتوي الحقل المتجه من هذا النوع على قائمة من الأعداد العائمة نصف الدقة 16 بت، وعادةً ما ينطبق على سيناريوهات التعلم العميق المقيد بالذاكرة أو الحوسبة القائمة على وحدة معالجة الرسومات.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>يحتفظ حقل متجه من هذا النوع بقائمة من الأرقام ذات الفاصلة العائمة ذات 16 بت ذات دقة مخفضة ولكن بنفس نطاق الأس مثل Float32. يُستخدم هذا النوع من البيانات بشكل شائع في سيناريوهات التعلّم العميق، حيث أنه يقلل من استخدام الذاكرة دون التأثير على الدقة بشكل كبير.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>يحتوي الحقل المتجه من هذا النوع على قائمة من 0 و1. وهي بمثابة ميزات مضغوطة لتمثيل البيانات في سيناريوهات معالجة الصور واسترجاع المعلومات.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>ويحتوي الحقل المتجه من هذا النوع على قائمة من الأرقام غير الصفرية وأرقام تسلسلها لتمثيل تضمينات متجهات متفرقة.</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">إضافة الحقول العددية<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>في الحالات الشائعة، يمكنك استخدام الحقول العددية لتخزين البيانات الوصفية للتضمينات المتجهة المخزنة في Milvus، وإجراء عمليات بحث الشبكة النانوية مع تصفية البيانات الوصفية لتحسين صحة نتائج البحث. يدعم Milvus أنواع حقول قياسية متعددة، بما في ذلك <strong>VarChar</strong> و <strong>Boolean</strong> و <strong>Int</strong> و Float و <strong>Double</strong> و <strong>Array</strong> و JSON.</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">إضافة حقول سلسلة<button data-href="#Add-String-Fields​" class="anchor-icon" translate="no">
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
    </button></h3><p>في Milvus، يمكنك استخدام حقول VarChar لتخزين السلاسل. لمعرفة المزيد عن حقل VarChar، راجع <a href="/docs/ar/string.md">حقل السلسلة</a>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span>​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)​</span>
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export varCharField='{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">إضافة حقول أرقام<button data-href="#Add-Number-Fields​" class="anchor-icon" translate="no">
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
    </button></h3><p>أنواع الأرقام التي يدعمها ميلفوس هي <code translate="no">Int8</code> و <code translate="no">Int16</code> و و <code translate="no">Int32</code> و <code translate="no">Int64</code> و <code translate="no">Float</code> و <code translate="no">Double</code>. لمعرفة المزيد عن حقول الأرقام، راجع <a href="/docs/ar/number.md">حقل الأرقام</a>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=DataType.INT64,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .dataType(DataType.Int64)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export int64Field='{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">إضافة حقول منطقية<button data-href="#Add-Boolean-Fields​" class="anchor-icon" translate="no">
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
    </button></h3><p>يدعم ميلفوس الحقول المنطقية. توضح مقتطفات التعليمات البرمجية التالية كيفية إضافة حقل منطقي.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=DataType.BOOL,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .dataType(DataType.Bool)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export boolField='{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">إضافة حقول JSON<button data-href="#Add-JSON-fields​" class="anchor-icon" translate="no">
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
    </button></h3><p>عادةً ما يخزن حقل JSON بيانات JSON نصف مهيكلة. للمزيد عن حقول JSON، راجع <a href="/docs/ar/use-json-fields.md">حقل JSON</a>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.jurl</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=DataType.JSON,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .dataType(DataType.JSON)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export jsonField='{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField​
    ]​
}&quot;​

</code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">إضافة حقول مصفوفة<button data-href="#Add-Array-Fields​" class="anchor-icon" translate="no">
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
    </button></h3><p>يخزن حقل المصفوفة قائمة من العناصر. يجب أن تكون أنواع البيانات لجميع العناصر في حقل المصفوفة متشابهة. للمزيد عن حقول المصفوفة، راجع <a href="/docs/ar/array_data_type.md">حقل المصفوفة</a>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=DataType.ARRAY,​
    element_type=DataType.VARCHAR,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(<span class="hljs-number">5</span>)​
        .maxLength(<span class="hljs-number">512</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">export arrayField='{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}'​
​
export schema=&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField,​
        $vectorField,​
        $varCharField,​
        $int64Field,​
        $boolField,​
        $jsonField,​
        $arrayField​
    ]​
}&quot;​

</code></pre>
<p></p>
