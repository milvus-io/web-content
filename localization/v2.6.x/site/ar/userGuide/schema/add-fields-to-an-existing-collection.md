---
id: add-fields-to-an-existing-collection.md
title: إضافة حقول إلى مجموعة موجودةCompatible with Milvus 2.6.x
summary: >-
  يسمح لك Milvus بإضافة حقول جديدة ديناميكيًا إلى المجموعات الموجودة، مما يسهل
  تطوير مخطط بياناتك مع تغير احتياجات تطبيقك. يوضح لك هذا الدليل كيفية إضافة
  حقول في سيناريوهات مختلفة باستخدام أمثلة عملية.
beta: Milvus 2.6.x
---
<h1 id="Add-Fields-to-an-Existing-Collection" class="common-anchor-header">إضافة حقول إلى مجموعة موجودة<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-Fields-to-an-Existing-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>يسمح لك Milvus بإضافة حقول جديدة ديناميكيًا إلى المجموعات الموجودة، مما يسهل تطوير مخطط بياناتك مع تغير احتياجات تطبيقك. يوضح لك هذا الدليل كيفية إضافة حقول في سيناريوهات مختلفة باستخدام أمثلة عملية.</p>
<h2 id="Considerations" class="common-anchor-header">الاعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل إضافة حقول إلى مجموعتك، ضع هذه النقاط المهمة في الاعتبار:</p>
<ul>
<li><p>يمكنك إضافة حقول قياسية (<code translate="no">INT64</code> ، <code translate="no">VARCHAR</code> ، ، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code> ، إلخ). لا يمكن إضافة الحقول المتجهة إلى المجموعات الموجودة.</p></li>
<li><p>يجب أن تكون الحقول الجديدة قابلة للإلغاء (nullable=صحيح) لاستيعاب الكيانات الموجودة التي لا تحتوي على قيم للحقل الجديد.</p></li>
<li><p>تؤدي إضافة حقول إلى المجموعات المحملة إلى زيادة استخدام الذاكرة.</p></li>
<li><p>يوجد حد أقصى لإجمالي الحقول لكل مجموعة. لمزيد من التفاصيل، راجع <a href="/docs/ar/limitations.md#Number-of-resources-in-a-collection">حدود ميلفوس</a>.</p></li>
<li><p>يجب أن تكون أسماء الحقول فريدة بين الحقول الثابتة.</p></li>
<li><p>لا يمكنك إضافة حقل <code translate="no">$meta</code> لتمكين وظيفة الحقل الديناميكي للمجموعات التي لم يتم إنشاؤها في الأصل باستخدام <code translate="no">enable_dynamic_field=True</code>.</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>يفترض هذا الدليل أن لديك</p>
<ul>
<li><p>مثيل Milvus قيد التشغيل</p></li>
<li><p>تم تثبيت Milvus SDK</p></li>
<li><p>مجموعة موجودة</p></li>
</ul>
<div class="alert note">
<p>ارجع إلى <a href="/docs/ar/create-collection.md">إنشاء مجموعة لإنشاء مجموعة</a> والعمليات الأساسية.</p>
</div>
<h2 id="Basic-usage" class="common-anchor-header">الاستخدام الأساسي<button data-href="#Basic-usage" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-1-Quickly-add-nullable-fields" class="common-anchor-header">السيناريو 1: إضافة حقول قابلة للإلغاء بسرعة<button data-href="#Scenario-1-Quickly-add-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>إن أبسط طريقة لتوسيع مجموعتك هي إضافة حقول قابلة للإلغاء. هذا مثالي عندما تحتاج إلى إضافة سمات جديدة بسرعة إلى بياناتك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a nullable field to an existing collection</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Returns almost immediately (non-blocking)</span>
<span class="hljs-comment"># - Makes the field available for use with minimal delay</span>
<span class="hljs-comment"># - Sets NULL for all existing entities</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;created_timestamp&quot;</span>,  <span class="hljs-comment"># Name of the new field to add</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type must be a scalar type</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
    <span class="hljs-comment"># Allows NULL values for existing entities</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">ما يجب توقعه</h3><ul>
<li><p>ستحتوي<strong>الكيانات الحالية</strong> على NULL للحقل الجديد</p></li>
<li><p>يمكن أن تحتوي<strong>الكيانات الجديدة</strong> على قيم فارغة أو فعلية</p></li>
<li><p>يحدث<strong>توافر الحقل</strong> على الفور تقريبًا بأقل قدر من التأخير بسبب المزامنة الداخلية للمخطط</p></li>
<li><p><strong>يمكن الاستعلام عنها مباشرة</strong> بعد فترة المزامنة القصيرة</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-string">&#x27;created_timestamp&#x27;</span>: <span class="hljs-literal">None</span>  <span class="hljs-comment"># New field shows NULL for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-2-Add-fields-with-default-values" class="common-anchor-header">السيناريو 2: إضافة حقول بقيم افتراضية<button data-href="#Scenario-2-Add-fields-with-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما تريد أن يكون للكيانات الموجودة قيمة أولية ذات معنى بدلاً من NULL، حدد القيم الافتراضية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a field with default value</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Sets the default value for all existing entities</span>
<span class="hljs-comment"># - Makes the field available with minimal delay</span>
<span class="hljs-comment"># - Maintains data consistency with the default value</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;priority_level&quot;</span>,     <span class="hljs-comment"># Name of the new field</span>
    data_type=DataType.VARCHAR,      <span class="hljs-comment"># String type field</span>
    max_length=<span class="hljs-number">20</span>,                   <span class="hljs-comment"># Maximum string length</span>
    nullable=<span class="hljs-literal">True</span>,                   <span class="hljs-comment"># Required for added fields</span>
    default_value=<span class="hljs-string">&quot;standard&quot;</span>         <span class="hljs-comment"># Value assigned to existing entities</span>
    <span class="hljs-comment"># Also used for new entities if no value provided</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">ما يجب توقعه</h3><ul>
<li><p>ستحتوي<strong>الكيانات الحالية</strong> على القيمة الافتراضية (<code translate="no">&quot;standard&quot;</code>) للحقل المضاف حديثًا</p></li>
<li><p>يمكن للكيانات<strong>الجديدة</strong> تجاوز القيمة الافتراضية أو استخدامها إذا لم يتم توفير قيمة</p></li>
<li><p>يحدث<strong>توافر الحقل</strong> على الفور تقريبًا بأقل تأخير</p></li>
<li><p><strong>يمكن الاستعلام مباشرةً</strong> بعد فترة المزامنة القصيرة</p></li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: 1,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  <span class="hljs-comment"># Shows default value for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-enable-dynamic-schema-functionality-by-adding-a-meta-field" class="common-anchor-header">هل يمكنني تمكين وظيفة المخطط الديناميكي عن طريق إضافة حقل <code translate="no">$meta</code> ؟</h3><p>لا، لا يمكنك استخدام <code translate="no">add_collection_field</code> لإضافة حقل <code translate="no">$meta</code> لتمكين وظيفة الحقل الديناميكي. يجب تمكين المخطط الديناميكي عند إنشاء المجموعة عن طريق تعيين <code translate="no">enable_dynamic_field=True</code> في المخطط.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This is NOT supported</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;existing_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;$meta&quot;</span>,
    data_type=DataType.JSON  <span class="hljs-comment"># This operation will fail</span>
)

<span class="hljs-comment"># ✅ Dynamic field must be enabled during collection creation</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-happens-when-I-add-a-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">ماذا يحدث عندما أقوم بإضافة حقل بنفس اسم مفتاح الحقل الديناميكي؟</h3><p>عندما تكون مجموعتك ممكّنة للحقل الديناميكي (<code translate="no">$meta</code> موجود)، يمكنك إضافة حقول ثابتة لها نفس اسم مفاتيح الحقول الديناميكية الموجودة. سيخفي الحقل الثابت الجديد مفتاح الحقل الديناميكي، ولكن يتم الاحتفاظ بالبيانات الديناميكية الأصلية.</p>
<p><strong>مثال على السيناريو:</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Original collection with dynamic field enabled</span>
<span class="hljs-comment"># Insert data with dynamic field keys</span>
data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>,  <span class="hljs-comment"># Dynamic field key as string</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">99.5</span>                                 <span class="hljs-comment"># Another dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=data)

<span class="hljs-comment"># Add static field with same name as existing dynamic field key</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;extra_info&quot;</span>,         <span class="hljs-comment"># Same name as dynamic field key</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type can differ from dynamic field key</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
)

<span class="hljs-comment"># Insert new data after adding static field</span>
new_data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-number">100</span>,               <span class="hljs-comment"># Now must use INT64 type (static field)</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">88.0</span>                    <span class="hljs-comment"># Still a dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=new_data)
<button class="copy-code-btn"></button></code></pre>
<p><strong>ما يمكن توقعه:</strong></p>
<ul>
<li><p>ستحتوي<strong>الكيانات الحالية</strong> على NULL للحقل الثابت الجديد <code translate="no">extra_info</code></p></li>
<li><p>يجب أن تستخدم<strong>الكيانات الجديدة</strong> نوع بيانات الحقل الثابت (<code translate="no">INT64</code>)</p></li>
<li><p>يتم الاحتفاظ<strong>بقيم مفاتيح الحقل الديناميكي الأصلية</strong> ويمكن الوصول إليها عبر بناء الجملة <code translate="no">$meta</code> </p></li>
<li><p><strong>يخفي الحقل الثابت مفتاح الحقل الديناميكي</strong> في الاستعلامات العادية</p></li>
</ul>
<p><strong>الوصول إلى كل من القيم الثابتة والديناميكية</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Query static field only (dynamic field key is masked)</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 1, &quot;extra_info&quot;: None}  # NULL for existing entity</span>

<span class="hljs-comment"># 2. Query both static and original dynamic values</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;$meta[&#x27;extra_info&#x27;]&quot;</span>]
)
<span class="hljs-comment"># Returns: {</span>
<span class="hljs-comment">#     &quot;id&quot;: 1,</span>
<span class="hljs-comment">#     &quot;extra_info&quot;: None,                           # Static field value (NULL)</span>
<span class="hljs-comment">#     &quot;$meta[&#x27;extra_info&#x27;]&quot;: &quot;this is a dynamic field key&quot;  # Original dynamic value</span>
<span class="hljs-comment"># }</span>

<span class="hljs-comment"># 3. Query new entity with static field value</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 2&quot;</span>, 
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 2, &quot;extra_info&quot;: 100}  # Static field value</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="How-long-does-it-take-for-a-new-field-to-become-available" class="common-anchor-header">كم من الوقت يستغرق الحقل الجديد ليصبح متاحًا؟</h3><p>تصبح الحقول المضافة متاحة على الفور تقريبًا، ولكن قد يكون هناك تأخير وجيز بسبب بث تغيير المخطط الداخلي عبر مجموعة Milvus. تضمن هذه المزامنة أن تكون جميع العقد على علم بتحديث المخطط قبل معالجة الاستعلامات التي تتضمن الحقل الجديد.</p>
