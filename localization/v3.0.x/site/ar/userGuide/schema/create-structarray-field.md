---
id: create-structarray-field.md
title: إنشاء حقل StructArray
summary: >-
  قم بإنشاء حقل StructArray عندما تحتاج إحدى الكيانات إلى احتواء قائمة مرتبة من
  العناصر المنظمة. حقل StructArray هو حقل Array يكون نوع عناصره هو Struct. ويتبع
  كل عنصر من عناصر Struct نفس المخطط، ويمكن أن يحتوي على حقول فرعية قياسية أو
  حقول فرعية متجهة أو كليهما.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">إنشاء حقل StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>قم بإنشاء حقل StructArray عندما تحتاج إحدى الكيانات إلى احتواء قائمة مرتبة من العناصر المنظمة. حقل StructArray هو حقل Array يكون نوع عنصره Struct. يتبع كل عنصر Struct نفس المخطط ويمكن أن يحتوي على حقول فرعية قياسية أو حقول فرعية متجهة أو كليهما.</p>
<p>توضح هذه الصفحة كيفية تعريف مخطط Struct، وإضافته كحقل StructArray، واختيار الحقول الفرعية للبحث والتصفية لاحقًا، وفهم قواعد المخطط التي تنطبق قبل إدراج البيانات أو فهرستها.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل البدء<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>تستخدم هذه الصفحة مجموعة باسم « <code translate="no">tech_articles</code> ». يمثل كل كيان مقالًا تقنيًا واحدًا، ويخزن حقل « <code translate="no">chunks</code> » البيانات على مستوى المقطع كعناصر Struct.</p>
<table>
<thead>
<tr><th>الحقل</th><th>النوع</th><th>الغرض</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>المفتاح الأساسي للمقالة.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>عنوان المقالة.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>فئة على مستوى المقالة.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>حقل متجه على مستوى المقالة، يُستخدم لاحقًا في أمثلة البحث المختلط.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>حقل StructArray الذي يخزن النص على مستوى المقطع، والبيانات الوصفية، والتضمينات.</td></tr>
</tbody>
</table>
<p>يحتوي حقل StructArray الخاص بـ « <code translate="no">chunks</code> » على الحقول الفرعية التالية.</p>
<table>
<thead>
<tr><th>الحقل الفرعي</th><th>النوع</th><th>الغرض</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>نص المقطع.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>اسم القسم، مثل <code translate="no">index</code> أو <code translate="no">search</code> أو <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>رقم الصفحة أو الموضع المنطقي للجزء.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>النتيجة على مستوى المقطع المستخدمة في التصفية القياسية وأمثلة النطاق.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>ما إذا كانت المقطوعة تحتوي على كود أم لا.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>الحقل الفرعي المتجه للبحث في EmbeddingList باستخدام مقاييس <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>حقل فرعي متجه للبحث على مستوى العنصر باستخدام مقاييس متجهة عادية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>لا يقبل الحقل المتجه أو الحقل الفرعي المتجه سوى فهرس واحد. إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العنصر، فقم بتعريف حقلين فرعيين متجهين منفصلين. في هذا المثال، يُستخدم <code translate="no">chunks[emb_list_vector]</code> للبحث في EmbeddingList، ويُستخدم <code translate="no">chunks[emb]</code> للبحث على مستوى العنصر.</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">أنواع بيانات الحقول الفرعية المدعومة<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>يخزن حقل StructArray قيمة مصفوفة واحدة لكل حقل فرعي من نوع Struct. عند تعريف مخطط Struct، اختر أنواع الحقول الفرعية من مجموعات القيم القياسية والمتجهة المدعومة.</p>
<table>
<thead>
<tr><th>النوع الفعلي للحقول الفرعية لـ Struct</th><th>الدعم</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على النحو التالي: <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.INT8</code> أو <code translate="no">DataType.INT16</code> أو <code translate="no">DataType.INT32</code> أو <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT</code> أو <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.VARCHAR</code> وقم بتعيين <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT16_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.BFLOAT16_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.INT8_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.BINARY_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>غير مدعوم</td><td>لا يتم دعم الحقول الفرعية للمتجهات المتفرقة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>غير مدعوم</td><td>استخدم <code translate="no">VARCHAR</code> ، وليس <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>غير مدعوم</td><td>لا يتم دعم الحقول الفرعية JSON في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>غير مدعوم</td><td>الحقول الفرعية للهندسة ووظائف نظم المعلومات الجغرافية (GIS) غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>غير مدعوم</td><td>الحقول الفرعية النصية غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>غير مدعوم</td><td>الحقول الفرعية من نوع Timestamptz والتعبيرات المرتبطة بوقت محدد غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array</code> أو <code translate="no">ArrayOfVector</code> أو <code translate="no">Struct</code> أو <code translate="no">ArrayOfStruct</code></td><td>غير مدعوم</td><td>لا يمكن أن يحتوي حقل StructArray على مصفوفات متداخلة، أو مصفوفات متجهة متداخلة، أو حقول Struct متداخلة، أو حقول Array-of-Struct متداخلة.</td></tr>
</tbody>
</table>
<p>للحصول على معلومات حول الدعم الخاص بالإصدارات وسلوك القيم القابلة للـ null والقيود الأخرى، راجع " <a href="/docs/ar/structarray-limits.md">قيود StructArray</a>".</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">إنشاء مجموعة تحتوي على حقل StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء حقل StructArray، قم أولاً بتعريف مخطط Struct الذي يستخدمه كل عنصر. ثم أضف حقل Array وقم بتعيين نوع العنصر الخاص به إلى Struct.</p>
<ol>
<li><p>قم بإنشاء مخطط المجموعة.</p></li>
<li><p>أضف حقول على مستوى المجموعة، مثل المفتاح الأساسي وحقول مستوى المقالة.</p></li>
<li><p>قم بإنشاء مخطط Struct للعناصر المخزنة داخل حقل StructArray.</p></li>
<li><p>أضف حقول فرعية قياسية ومتجهة إلى مخطط Struct.</p></li>
<li><p>أضف حقل Array باستخدام " <code translate="no">element_type=DataType.STRUCT</code>".</p></li>
<li><p>تعيين " <code translate="no">struct_schema</code> " إلى مخطط Struct.</p></li>
<li><p>تعيين " <code translate="no">max_capacity</code> " لتحديد عدد عناصر Struct التي يمكن لكل كيان تخزينها في الحقل.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">فهم مسارات حقل StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء حقل StructArray، قم بالإشارة إلى حقوله الفرعية باستخدام صيغة مسار <code translate="no">structArray[subfield]</code>. استخدم هذه الصيغة عند إنشاء الفهارس، أو البحث في الحقول الفرعية المتجهة، أو إخراج الحقول الفرعية، أو إنشاء عوامل تصفية قياسية.</p>
<table>
<thead>
<tr><th>المسار</th><th>المعنى</th><th>الاستخدام الشائع</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>الحقل الفرعي <code translate="no">text</code> داخل كل عنصر Struct.</td><td>حقل الإخراج أو التصفية القياسية.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>تسمية القسم لكل مقطع.</td><td>التصفية القياسية.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>درجة الجودة على مستوى المقطع.</td><td>التصفية القياسية أو الفهرس القياسي.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>الحقل الفرعي المتجه المستخدم كقائمة تضمين.</td><td>البحث في EmbeddingList باستخدام <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>الحقل الفرعي المتجه الذي يستخدمه كل عنصر من عناصر Struct بشكل مستقل.</td><td>البحث المتجهي على مستوى العنصر.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">جعل حقل StructArray قابلاً للقيمة الفارغة<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus v3.0.x حقول StructArray القابلة للقيمة الفارغة. يسمح حقل StructArray القابل للقيمة الفارغة للكيان بتخزين <code translate="no">null</code> لحقل StructArray بأكمله.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تحذير
الحقول StructArray القابلة للقيمة الفارغة متاحة فقط في Milvus v3.0.x. بالنسبة لحقل StructArray القابل للقيمة الفارغة، يمكن للكيان توفير قيمة StructArray صالحة أو تعيين الحقل بأكمله إلى <code translate="no">null</code>. عند إدراج قيمة StructArray صالحة، يجب أن تكون جميع الحقول الفرعية إما فارغة أو ذات قيم صالحة. يؤدي إدراج كيان مع تعيين بعض الحقول الفرعية على null وتعيين أخرى على قيم صالحة إلى حدوث خطأ. لمزيد من التفاصيل، راجع <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">إضافة حقل StructArray إلى مجموعة موجودة<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus v3.0.x إضافة حقل StructArray إلى مجموعة موجودة. يجب أن يكون حقل StructArray المضاف قابلاً للقيمة null، لأن الكيانات الموجودة بالفعل في المجموعة لا تحتوي على قيم للحقل الجديد.</p>
<p>لإضافة حقل StructArray إلى مجموعة موجودة، قم أولاً بتعريف مخطط Struct. ثم استدعِ <code translate="no">add_collection_struct_field()</code> وقم بتعيين <code translate="no">nullable=True</code>.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>بعد إضافة حقل StructArray، تُرجع الكيانات الموجودة القيمة <code translate="no">null</code> للحقل الجديد عبر جميع حقوله الفرعية.</p>
<p>بعد إنشاء حقل StructArray، لا يمكنك إضافة حقول فرعية جديدة إلى حقل StructArray الموجود. إذا احتجت إلى سمات عناصر إضافية لاحقًا، فاستدعِ <code translate="no">drop_collection_field()</code> لإزالة حقل StructArray، ثم أضف حقل StructArray جديدًا باستخدام مخطط Struct المحدث.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">قواعد المخطط<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<thead>
<tr><th>القاعدة</th><th>التفسير</th></tr>
</thead>
<tbody>
<tr><td>يُستخدم Struct كنوع عنصر Array.</td><td>قم بإنشاء حقل StructArray كحقل Array باستخدام <code translate="no">element_type=STRUCT</code>. لا تقم بإنشاء Struct كحقل تجميع من المستوى الأعلى.</td></tr>
<tr><td>تشترك جميع العناصر في مخطط واحد.</td><td>يتبع كل عنصر Struct في حقل StructArray نفسه مخطط Struct المحدد لذلك الحقل.</td></tr>
<tr><td><code translate="no">max_capacity</code> مطلوب.</td><td>وهو يحدد عدد عناصر Struct التي يمكن لكل كيان تخزينها في حقل StructArray.</td></tr>
<tr><td>يُسمح فقط بأنواع الحقول الفرعية المدعومة.</td><td>استخدم أنواع الحقول الفرعية القياسية والمتجهة التي يدعمها StructArray. لا تقم بتعريف الحقول الفرعية من نوع JSON أو Geometry أو Text أو Timestamptz أو SparseFloatVector أو الحقول الفرعية المتداخلة من نوع Struct / Array.</td></tr>
<tr><td>تحتاج الحقول الفرعية المتجهة إلى فهارس قبل البحث.</td><td>قم بإنشاء فهارس على مسارات مثل <code translate="no">chunks[emb_list_vector]</code> أو <code translate="no">chunks[emb]</code> قبل تشغيل البحث المتجهي.</td></tr>
<tr><td>يحتوي كل حقل فرعي متجه على فهرس واحد.</td><td>إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العناصر، فأنشئ حقلين فرعيين متجهين منفصلين.</td></tr>
<tr><td>الحقول الفرعية StructArray الموجودة ثابتة.</td><td>بعد إنشاء حقل StructArray، لا تتوقع إضافة المزيد من الحقول الفرعية إلى نفس حقل StructArray هذا.</td></tr>
<tr><td>لا يتم دعم الدوال داخل Struct.</td><td>لا تقم بتعريف وظائف للحقول أو الحقول الفرعية داخل حقل StructArray.</td></tr>
<tr><td>يجب أن تتوافق الحقول الفرعية القياسية مع متطلبات التصفية.</td><td>أضف حقولًا مثل <code translate="no">section</code> أو <code translate="no">quality_score</code> أو <code translate="no">has_code</code> فقط عندما تحتاج إلى تصفية هذه الحقول أو تجميعها أو إخراجها لاحقًا.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">الأخطاء الشائعة<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>إنشاء <code translate="no">DataType.STRUCT</code> كحقل تجميع من المستوى الأعلى بدلاً من استخدامه كنوع عنصر لحقل Array.</p></li>
<li><p>نسيان تعيين <code translate="no">max_capacity</code> في حقل StructArray.</p></li>
<li><p>تحديد أنواع الحقول الفرعية غير المدعومة، مثل JSON أو Geometry أو Text أو Timestamptz أو SparseFloatVector أو Array المتداخلة أو Struct المتداخلة أو Array-of-Struct.</p></li>
<li><p>استخدام <code translate="no">String</code> كنوع حقل فرعي. استخدم <code translate="no">VARCHAR</code> وقم بتعيين <code translate="no">max_length</code>.</p></li>
<li><p>استخدام حقل فرعي متجه واحد لكل من البحث في EmbeddingList والبحث على مستوى العناصر.</p></li>
<li><p>إضافة الحقول الفرعية المتجهة فقط وتجاهل الحقول الفرعية القياسية اللازمة للتصفية، مثل <code translate="no">section</code> أو <code translate="no">quality_score</code> أو <code translate="no">has_code</code>.</p></li>
<li><p>معاملة الحقول الفرعية المتجهة كمدخلات للمسندات القياسية <code translate="no">$[...]</code>. استخدام الحقول الفرعية المتجهة للبحث المتجه، والحقول الفرعية القياسية للمسندات القياسية.</p></li>
<li><p>الافتراض بإمكانية إضافة حقول فرعية جديدة إلى حقل StructArray موجود بعد إنشاء الحقل.</p></li>
<li><p>استخدام <code translate="no">chunks.emb</code> أو <code translate="no">chunks.emb_list_vector</code> بدلاً من صيغة المسار المطلوبة <code translate="no">chunks[emb]</code> أو <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>معاملة سلوك StructArray القابل للقيمة الفارغة على أنه متاح في كل إصدار مستهدف.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>لإدراج بيانات متداخلة في حقل StructArray، اقرأ " <a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a>".</p></li>
<li><p>لإنشاء فهارس متجهة وعلمية، اقرأ <a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a>.</p></li>
<li><p>للبحث في الحقول الفرعية المتجهة لـ StructArray، اقرأ "البحث المتجه الأساسي باستخدام StructArray".</p></li>
<li><p>لمراجعة أنواع البيانات المدعومة، وسلوك القيم التي يمكن أن تكون فارغة، والقيود الخاصة بالإصدارات، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
