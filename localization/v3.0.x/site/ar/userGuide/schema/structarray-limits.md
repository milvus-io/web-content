---
id: structarray-limits.md
title: حدود StructArray
summary: >-
  يشمل دعم StructArray تعريف المخطط، وحمولات الإدراج، والفهرسة، وأنماط البحث،
  والمرشحات الخاصة بـ StructArray. استخدم هذه الصفحة كمرجع للقيود قبل الاعتماد
  على سلوك StructArray في بيئة الإنتاج.
---
<h1 id="StructArray-Limits" class="common-anchor-header">حدود StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>يشمل دعم StructArray تعريف المخطط، وإدراج الحمولات، والفهرسة، وأنماط البحث، والمرشحات الخاصة بـ StructArray. استخدم هذه الصفحة كمرجع للحدود قبل الاعتماد على سلوك StructArray في بيئة الإنتاج.</p>
<p>تأتي معظم حدود StructArray من أحد ثلاثة مصادر: نموذج مخطط StructArray، ووضع البحث الذي تختاره للحقول الفرعية للمتجهات، وإصدار Milvus الذي تعمل عليه مجموعتك.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">نظرة عامة على الحدود<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
    </button></h2><p>القيود الرئيسية لـ StructArray هي:</p>
<table>
<thead>
<tr><th>المجال</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>شكل المخطط</td><td>لا يمكن استخدام Struct إلا كنوع عنصر لحقل Array. ولا يُدعم Struct كحقل تجميع من المستوى الأعلى.</td></tr>
<tr><td>مخطط الحقل الفرعي</td><td>تشترك جميع عناصر Struct الموجودة في حقل StructArray نفسه في مخطط Struct واحد محدد مسبقًا.</td></tr>
<tr><td>الحقول الفرعية المتداخلة</td><td>بدءًا من Milvus 3.0.6، يمكن أن تحتوي Struct على حقول فرعية من نوع القيمة العددية ( <code translate="no">ARRAY</code> ) ذات مستوى تداخل واحد. لا يتم دعم الحقول الفرعية المتداخلة من أنواع <code translate="no">Struct</code> و <code translate="no">ArrayOfStruct</code> وJSON في أي إصدار.</td></tr>
<tr><td>السعة</td><td><code translate="no">max_capacity</code> مطلوب ويحدد عدد عناصر Struct التي يمكن لكيان واحد تخزينها في حقل StructArray.</td></tr>
<tr><td>تغييرات الحقول الفرعية</td><td>بدءًا من Milvus 3.0.6، يمكنك إضافة حقل فرعي قابل للإلغاء (element-nullable) إلى حقل StructArray موجود أو حذف حقل فرعي منه. تتطلب الإصدارات السابقة حذف حقل StructArray بالكامل وإعادة إضافته.</td></tr>
<tr><td>مسار الحقل الفرعي</td><td>استخدم مسارات <code translate="no">structArray[subfield]</code> ، مثل <code translate="no">chunks[emb]</code> ، للفهارس وأهداف البحث وحقول الإخراج والمرشحات. لا تستخدم <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>إدراج الشكل</td><td>أدخل حقل StructArray كمصفوفة من الكائنات. لا تستخدم صيغة المسار داخل حمولات الإدراج.</td></tr>
<tr><td>فهارس المتجهات</td><td>يقبل حقل المتجه أو الحقل الفرعي للمتجه فهرسًا واحدًا فقط. استخدم حقول فرعية منفصلة للمتجهات للبحث في EmbeddingList والبحث على مستوى العناصر.</td></tr>
<tr><td>الدوال</td><td>لا يتم دعم وظائف الحقول للحقول أو الحقول الفرعية داخل حقل StructArray.</td></tr>
<tr><td>الحقول القابلة للقيمة الفارغة</td><td>الحقول StructArray القابلة للقيمة الفارغة (Nullable) مرتبطة بالإصدار. تنطبق القيمة الفارغة على مستوى الصف على حقل StructArray بأكمله. بدءًا من Milvus 3.0.6، يمكن للحقل الفرعي أيضًا السماح بقيمة فارغة في عنصر Struct فردي: <code translate="no">nullable=True</code> في حقل فرعي سكالي أو متجه، و <code translate="no">element_nullable=True</code> في حقل فرعي مصفوفة. لا يمكن أن يكون عنصر Struct نفسه فارغًا.</td></tr>
<tr><td>حقل الإضافة الديناميكي</td><td>تخضع إضافة حقل StructArray إلى مجموعة موجودة لقيود الإصدار وتتطلب أن يكون الحقل المضاف قابلاً للقيمة null.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">حدود المخطط<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>تخضع مخططات StructArray للقيود التالية:</p>
<table>
<thead>
<tr><th>الحد</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>Struct ليس نوع حقل من المستوى الأعلى.</td><td>قم بإنشاء حقل StructArray كـ <code translate="no">datatype=DataType.ARRAY</code> مع <code translate="no">element_type=DataType.STRUCT</code> و <code translate="no">struct_schema</code>.</td></tr>
<tr><td>تشترك جميع العناصر في مخطط واحد.</td><td>يتبع كل عنصر Struct في حقل StructArray نفس قائمة الحقول الفرعية وأنواع بيانات الحقول الفرعية.</td></tr>
<tr><td><code translate="no">max_capacity</code> مطلوب.</td><td>يجب ألا يتجاوز عدد عناصر Struct في كيان واحد قيمة <code translate="no">max_capacity</code> المُعدة لحقل StructArray.</td></tr>
<tr><td>تحتوي الحقول الفرعية ذات القيم العددية ( <code translate="no">ARRAY</code> ) على معلمات تحديد الحجم ( <code translate="no">max_capacity</code>) لكل حقل فرعي.</td><td>يُعلن الحقل الفرعي من نوع « <code translate="no">ARRAY</code> » القيمية عن « <code translate="no">max_capacity</code> » لمصفوفته الداخلية، ويقوم Milvus برفض عنصر Struct الذي تتجاوز مصفوفته الداخلية السعة المُعلنة لذلك الحقل الفرعي. لا يلزم أن تتطابق القيم عبر الحقول الفرعية. يجب أن تكون القيمة أكبر من 0 وألا تتجاوز « <code translate="no">proxy.maxArrayCapacity</code> »، والتي تبلغ قيمتها الافتراضية 4096.</td></tr>
<tr><td>قد تتغير الحقول الفرعية في Milvus 3.0.6 والإصدارات الأحدث.</td><td>أضف حقلًا فرعيًّا قابلًا للإلغاء (nullable)، أو احذف حقلًا فرعيًّا باستخدام مساره، مثل <code translate="no">chunks[lang]</code>. لا يمكنك حذف الحقل الفرعي الأخير لحقل StructArray، أو الحقل المتجه الأخير للمجموعة، أو الحقل الفرعي الذي تستخدمه الدالة (Function). في الإصدارات السابقة، احذف حقل StructArray وأضفه مرة أخرى باستخدام المخطط المحدث.</td></tr>
<tr><td>لا يتم دعم Struct المتداخلة.</td><td>لا يمكن أن تحتوي Struct على حقول فرعية متداخلة من نوع <code translate="no">Struct</code> أو <code translate="no">ArrayOfStruct</code> أو JSON. بدءًا من Milvus 3.0.6، يمكن أن تحتوي Struct على حقول فرعية قياسية من نوع <code translate="no">ARRAY</code> بمستوى تداخل واحد. لا يمكن أن تحتوي الحقول الفرعية من نوع <code translate="no">ARRAY</code> على متجهات.</td></tr>
<tr><td>لا يتم دعم الدوال داخل StructArray.</td><td>لا تقم بتعريف دوال الحقول لحقول StructArray أو حقولها الفرعية.</td></tr>
<tr><td>خصائص الحقول محدودة في حقول StructArray.</td><td>بدءًا من Milvus 3.0.6، لا تقبل الأوامر " <code translate="no">alter_collection_field()</code> " على حقل StructArray أو على مسار حقل فرعي سوى " <code translate="no">mmap.enabled</code>" و" <code translate="no">field.description</code>" و" <code translate="no">warmup</code>". يتم رفض الخصائص الأخرى، مثل " <code translate="no">max_capacity</code> " و" <code translate="no">max_length</code>".</td></tr>
<tr><td>لا يُدعم تحليل النص في الحقول الفرعية.</td><td>يتم رفض تعيين <code translate="no">enable_match</code> أو <code translate="no">enable_analyzer</code> على حقل فرعي من نوع Struct. يتم إنشاء فهارس النص فقط للحقول ذات المستوى الأعلى.</td></tr>
</tbody>
</table>
<p>للاطلاع على أمثلة لإنشاء المخطط، راجع <a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a>.</p>
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
    </button></h2><p>يتم تعيين الحقول الفرعية StructArray إلى تخزين مادي على غرار المصفوفات. يسرد الجدول التالي الأنواع المادية المدعومة وغير المدعومة:</p>
<table>
<thead>
<tr><th>النوع المادي للحقل الفرعي من نوع Struct</th><th>الدعم</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>مدعوم</td><td>قم بتعريف الحقل الفرعي على النحو التالي: <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.INT8</code> أو <code translate="no">DataType.INT16</code> أو <code translate="no">DataType.INT32</code> أو <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT</code> أو <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.VARCHAR</code> وقم بتعيين <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.FLOAT16_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.BFLOAT16_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.INT8_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>مدعوم</td><td>حدد الحقل الفرعي على أنه <code translate="no">DataType.BINARY_VECTOR</code> وقم بتعيين <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>غير مدعوم</td><td>لا يتم دعم الحقول الفرعية للمتجهات المتفرقة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>غير مدعوم</td><td>استخدم <code translate="no">VARCHAR</code> ، وليس <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>غير مدعوم</td><td>لا يتم دعم الحقول الفرعية JSON في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>غير مدعوم</td><td>الحقول الفرعية للهندسة ووظائف نظم المعلومات الجغرافية (GIS) غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>غير مدعوم</td><td>الحقول الفرعية النصية غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>غير مدعوم</td><td>الحقول الفرعية من نوع Timestamptz والتعبيرات المرتبطة بالوقت غير مدعومة في حقول StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>مدعوم في Milvus 3.0.6 والإصدارات الأحدث</td><td>قم بتعريف الحقل الفرعي على أنه <code translate="no">DataType.ARRAY</code> مع قيمة عددية <code translate="no">element_type</code> وقيمة <code translate="no">max_capacity</code> للمصفوفة الداخلية. عندئذٍ يحتفظ كل عنصر Struct بمصفوفة داخلية واحدة. اضبط <code translate="no">nullable=True</code> على الحقل الفرعي للسماح بمصفوفة داخلية فارغة و <code translate="no">element_nullable=True</code> للسماح بقيم فارغة بداخلها.</td></tr>
<tr><td><code translate="no">Array</code> من <code translate="no">Array</code> من <code translate="no">Array</code> ، <code translate="no">Array</code> من المتجهات، <code translate="no">Struct</code> ، أو <code translate="no">ArrayOfStruct</code></td><td>غير مدعوم</td><td>يقتصر تداخل المصفوفات داخل Struct على مستوى واحد، ولا يمكن للمصفوفة الداخلية أن تحتوي على متجهات، ولا يتم دعم الحقول الفرعية المتداخلة من نوع Struct أو Array-of-Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">حدود المخطط القابل للقيمة الفارغة والديناميكي<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>يصف الجدول التالي سلوك StructArray القابل للقيمة الفارغة وإضافة الحقول الديناميكية إلى StructArray، مع مراعاة بيان التوفر أدناه:</p>
<table>
<thead>
<tr><th>القدرة</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>حقل StructArray القابل للقيمة الفارغة</td><td>مع مراعاة بيان التوفر أدناه، قم بتعيين " <code translate="no">nullable=True</code> " على StructArray الأصلي؛ ولا تقم بتكوين الحقول الفرعية لـ Struct على أنها قابلة للقيمة الفارغة بشكل مستقل.</td></tr>
<tr><td>القيمة NULL في Python</td><td>استخدم <code translate="no">None</code> لإدراج قيمة StructArray فارغة في Python. لا تستخدم <code translate="no">Null</code> أو <code translate="no">null</code>.</td></tr>
<tr><td>نطاق القيمة "NULL"</td><td>تنطبق القيمة NULL على حقل StructArray بأكمله. على سبيل المثال، لا يكون <code translate="no">chunks=None</code> صالحًا إلا عندما يكون <code translate="no">chunks</code> قابلاً للقيمة null.</td></tr>
<tr><td>قيمة StructArray فارغة جزئيًا</td><td>عندما يحتوي حقل StructArray على قيمة صفيف صالحة، لا تخلط صفيفات الحقول الفرعية التي يمكن أن تكون null مع صفيفات الحقول الفرعية الصالحة في نفس القيمة.</td></tr>
<tr><td>القيمة الفارغة على مستوى العنصر</td><td>مدعوم في Milvus 3.0.6 والإصدارات الأحدث. يمكن أن يسمح الحقل الفرعي من النوع القيمية أو المتجه أو <code translate="no">ARRAY</code> بقيمة null في عناصر Struct الفردية: <code translate="no">nullable=True</code> في الحقل الفرعي من النوع القيمية أو المتجه، و <code translate="no">element_nullable=True</code> في الحقل الفرعي من النوع <code translate="no">ARRAY</code>. لا يزال الإعداد <code translate="no">nullable</code> على مستوى الصف يأتي من StructArray الأصلي؛ ويؤدي تعيين <code translate="no">nullable=True</code> على الحقل الفرعي إلى تمكين null على مستوى العنصر، وليس على مستوى الصف.</td></tr>
<tr><td>عنصر Struct فارغ</td><td>لا يمكن أن يكون عنصر Struct نفسه null، مثل <code translate="no">[null, {...}]</code>. قم بدلاً من ذلك بتعيين قيم الحقول الفرعية للعنصر إلى null.</td></tr>
<tr><td>الحقول الفرعية المحذوفة</td><td>بدءًا من Milvus 3.0.6، يمكنك حذف حقل فرعي قابل للقيمة null على مستوى العنصر من عنصر Struct، ويقوم Milvus بتخزين القيمة null له. يجب أن يكون الحقل الفرعي غير القابل للقيمة null على مستوى العنصر موجودًا في كل عنصر Struct. في الإصدارات السابقة، يجب أن يوفر كل عنصر Struct كل الحقول الفرعية.</td></tr>
<tr><td>الإضافة الديناميكية لحقل StructArray</td><td>مع مراعاة بيان التوفر أدناه.</td></tr>
<tr><td>متطلبات القيم الفارغة للإضافة الديناميكية</td><td>يجب أن يكون حقل StructArray المضاف إلى مجموعة موجودة قابلاً للقيمة "null" لأن الكيانات الموجودة لا تحتوي على قيمة للحقل الجديد.</td></tr>
<tr><td>الكيانات الموجودة بعد الإضافة الديناميكية</td><td>تُرجع الكيانات الموجودة قيمة " <code translate="no">null</code> " لحقل StructArray المضاف.</td></tr>
<tr><td>الحقل الفرعي للإضافة الديناميكية</td><td>مدعوم في Milvus 3.0.6 والإصدارات الأحدث. يجب إنشاء الحقل الفرعي المضاف بقيمة " <code translate="no">nullable=True</code>"؛ كما أن الحقل الفرعي المضاف من نوع " <code translate="no">ARRAY</code> " يأخذ أيضًا قيمة " <code translate="no">element_nullable=True</code> " للقيم الفارغة داخل المصفوفة الداخلية. تُرجع الكيانات الموجودة قيمة "null" للحقل الفرعي الجديد في كل عنصر من عناصر "Struct" الخاصة بها، وتظل الكيانات التي يكون حقل "StructArray" الخاص بها فارغًا في حالة "null".</td></tr>
</tbody>
</table>
<p>يدعم Milvus 3.0.0 والإصدارات الأحدث حقول StructArray القابلة للقيمة null، والمصفوفات المتجهة القابلة للقيمة null، والإضافة الديناميكية لحقول StructArray في كل من عمليات النشر المستقلة والموزعة. لا تدعم إصدارات Milvus السابقة هذه الإمكانيات.</p>
<p>يدعم Milvus 3.0.6 والإصدارات الأحدث أيضًا القيم الفارغة على مستوى العناصر، والحقول الفرعية القياسية من نوع « <code translate="no">ARRAY</code> »، وإضافة أو حذف الحقول الفرعية لحقل «StructArray» موجود. تتطلب هذه الإمكانيات استخدام «Storage V2» ولا تتوفر في المجموعات الخارجية.</p>
<p>في Zilliz Cloud، تتوفر هذه الإمكانيات على المجموعات حسب الطلب (On-Demand Clusters) التي تعمل بنظام Milvus 3.0.0 أو إصدارات أحدث. ولا تدعمها مجموعات الخدمة (Serving Clusters).</p>
<p>للاطلاع على أمثلة الإدراج باستخدام حقول StructArray القابلة للقيمة الفارغة، راجع <a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">حدود الإدراج<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>تخضع حمولات الإدراج في StructArray للحدود التالية:</p>
<table>
<thead>
<tr><th>الحد</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>شكل الحمولة</td><td>أدخل حقل StructArray كمصفوفة من كائنات Struct، مثل <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>أسماء الحقول الفرعية</td><td>داخل كل كائن Struct، استخدم أسماء الحقول الفرعية مثل <code translate="no">text</code> و <code translate="no">emb</code> ، وليس المسارات مثل <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>مطابقة المخطط</td><td>يجب أن يتطابق كل عنصر Struct مع مخطط Struct. بدءًا من Milvus 3.0.6، يمكن حذف الحقل الفرعي القابل للإلغاء (nullable) أو تعيينه إلى <code translate="no">null</code> في عنصر Struct.</td></tr>
<tr><td>السعة</td><td>يجب ألا يتجاوز عدد عناصر Struct في كيان واحد <code translate="no">max_capacity</code>.</td></tr>
<tr><td>أبعاد المتجه</td><td>يجب أن تتطابق قيم المتجهات مع <code translate="no">dim</code> المُعدة لحقولها الفرعية المتجهة.</td></tr>
<tr><td>تكرار في وضع البحث</td><td>إذا كنت بحاجة إلى كل من البحث في قائمة التضمين (EmbeddingList) والبحث على مستوى العناصر، فاكتب المتجهات في حقلين فرعيين منفصلين للمتجهات.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">حدود الفهرس والمقياس<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن فهرسة حقل فرعي متجه من نوع StructArray إما للبحث في قائمة التضمين (EmbeddingList) أو للبحث على مستوى العناصر. لا يمكن للحقل الفرعي المتجه نفسه استخدام مجموعتي المقاييس معًا لأن كل حقل متجه أو حقل فرعي متجه لا يقبل سوى فهرس واحد فقط. تستخدم أوضاع البحث مجموعات المقاييس التالية:</p>
<table>
<thead>
<tr><th>وضع البحث</th><th>مجموعة المقاييس</th><th>مستوى النتيجة</th></tr>
</thead>
<tbody>
<tr><td>البحث في EmbeddingList</td><td><code translate="no">MAX_SIM</code>، أو مقاييس « <code translate="no">MAX_SIM_COSINE</code> » أو « <code translate="no">MAX_SIM_IP</code> » أو « <code translate="no">MAX_SIM_L2</code> » أو « <code translate="no">MAX_SIM_*</code> » الثنائية</td><td>نتائج على مستوى الكيان.</td></tr>
<tr><td>البحث على مستوى العنصر</td><td>مقاييس متجهة عادية مثل <code translate="no">L2</code> ، <code translate="no">IP</code> ، <code translate="no">COSINE</code> ، <code translate="no">HAMMING</code> ، أو <code translate="no">JACCARD</code></td><td>نتائج على مستوى العنصر يمكن أن تتضمن إزاحة العنصر المطابق.</td></tr>
</tbody>
</table>
<p>استخدم حقول فرعية متجهة منفصلة عندما يكون كلا الوضعين مطلوبين. على سبيل المثال، استخدم <code translate="no">chunks[emb_list_vector]</code> للبحث في EmbeddingList و <code translate="no">chunks[emb]</code> للبحث على مستوى العنصر.</p>
<p>يُحتسب عدد الحقول الفرعية المتجهة لـ StructArray كحقول متجهة ضمن الحد الأقصى على مستوى المجموعة <code translate="no">proxy.maxVectorFieldNum</code> ، والذي يبلغ 10 بشكل افتراضي. يُعتبر حقل StructArray الذي تكون حقوله الفرعية المتجهة هي الحقول المتجهة الوحيدة في المجموعة حقلًا صالحًا، ويتم رفض حذف مثل هذا الحقل إذا أدى ذلك إلى ترك المجموعة بدون حقل متجه. احرص على إبقاء العدد الإجمالي للحقول المتجهة والحقول الفرعية المتجهة ضمن حدود الإصدار المستهدف ومستوى الخدمة.</p>
<p>بدءًا من Milvus 3.0.6، لا يدعم الحقل الفرعي المتجه القابل للقيمة الفارغة (element-nullable) سوى البحث على مستوى العنصر باستخدام المقاييس المتجهة العادية. يتم رفض المقاييس <code translate="no">MAX_SIM*</code> ، وفهارس EmbeddingList، والبحث في EmbeddingList في الحقول الفرعية المتجهة القابلة للقيمة الفارغة، ولا يقوم <code translate="no">AUTOINDEX</code> باختيار مقياس <code translate="no">MAX_SIM*</code> لها. لا تشارك المتجهات ذات القيمة «null» في عملية البحث. لا يتم دعم الفهارس القياسية في الحقول الفرعية التي تسمح بوجود عناصر ذات قيمة «null» أو في الحقول الفرعية القياسية من نوع « <code translate="no">ARRAY</code> ».</p>
<p>للاطلاع على مصفوفة أنواع الفهارس وأنواع المقاييس المدعومة، راجع <a href="/docs/ar/index-structarray-fields.md">حقول StructArray للفهرس</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">حدود البحث<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>يخضع سلوك البحث في StructArray للقيود التالية:</p>
<table>
<thead>
<tr><th>سلوك البحث</th><th>الدعم والقيود</th></tr>
</thead>
<tbody>
<tr><td>البحث الأساسي في EmbeddingList</td><td>مدعوم في الحقول الفرعية للمتجهات في StructArray المفهرسة باستخدام مقاييس <code translate="no">MAX_SIM*</code>. يُرجع نتائج على مستوى الكيان.</td></tr>
<tr><td>البحث الأساسي على مستوى العناصر</td><td>مدعوم في الحقول الفرعية للمتجهات StructArray المفهرسة باستخدام مقاييس المتجهات العادية. يمكن أن يعرض إزاحات العناصر المطابقة.</td></tr>
<tr><td>البحث في النطاق</td><td>مدعوم وفقًا لوضع البحث ودعم الفهرس/المقياس في الإصدار المستهدف. لمعرفة سلوك نطاق البحث المختلط في طلبات StructArray على مستوى العناصر، تحقق من الإصدار المستهدف.</td></tr>
<tr><td>البحث بالتجميع</td><td>يمكن أن يُرجع البحث المجمّع على مستوى العناصر إزاحات. يعتمد سلوك التجميع في البحث المختلط لطلبات StructArray على مستوى العناصر على الإصدار.</td></tr>
<tr><td>البحث المختلط</td><td>يمكن أن يتضمن طلب البحث الهجين طلبات الحقول الفرعية للمتجه StructArray فقط عندما يدعم الإصدار المستهدف تركيبة البحث تلك. ولا يزال كل طلب يتبع عائلة المقاييس الخاصة بالحقل الفرعي للمتجه المفهرس.</td></tr>
<tr><td>إخراج الإزاحة</td><td>يتوفر الإزاحة لنتائج البحث على مستوى العنصر. يُرجع بحث EmbeddingList نتائج على مستوى الكيان ولا يستخدم إزاحات العناصر كوحدة النتيجة الأساسية.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">حدود التصفية والمشغلات<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>تتم معالجة التصفية القياسية لـ StructArray بواسطة عوامل StructArray، مثل <code translate="no">element_filter</code> ومجموعة <code translate="no">MATCH_*</code>. توجد مصفوفة دعم المسندات التفصيلية في <a href="/docs/ar/struct-array-operators.md">StructArray Operators</a>.</p>
<p>على مستوى عام:</p>
<ul>
<li><p>استخدم <code translate="no">$[subfield]</code> فقط داخل عوامل StructArray.</p></li>
<li><p>يمكن أن تشير تعبيرات التصفية على مستوى الصف أيضًا إلى مسارات StructArray مباشرةً: <code translate="no">chunks[0][section]</code> لموضع عنصر واحد، و <code translate="no">array_length(chunks)</code> لعدد العناصر، و <code translate="no">array_contains(chunks[section], ...)</code> لقيم الحقول الفرعية عبر العناصر، و <code translate="no">chunks is null</code> على حقل StructArray قابل للفراغ.</p></li>
<li><p>استخدم الحقول الفرعية القياسية للمسلّطات القياسية.</p></li>
<li><p>لا تستخدم الحقول الفرعية المتجهة كمدخلات للمسلّطات القياسية <code translate="no">$[...]</code>.</p></li>
</ul>
<ul>
<li>لا يتم دعم صيغة مسار JSON، ووظائف JSON، ووظائف مطابقة النص، ووظائف الهندسة / نظم المعلومات الجغرافية (GIS)، وتعبيرات Timestamptz للمسافات على مستوى العناصر في StructArray. بدءًا من Milvus 3.0.6، يتم دعم <code translate="no">array_contains</code> و <code translate="no">array_contains_any</code> و <code translate="no">array_contains_all</code> و <code translate="no">array_length</code> في <code translate="no">$[subfield]</code> للحقول الفرعية العددية <code translate="no">ARRAY</code> ، ويتم دعم <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> لكل نوع من أنواع الحقول الفرعية.</li>
</ul>
<ul>
<li>ابتداءً من Milvus 3.0.6، تؤدي قيمة الحقل الفرعي الفارغة في عنصر Struct إلى جعل مسند العنصر «مجهول» بدلاً من «خطأ». يحتفظ <code translate="no">element_filter</code> فقط بالعناصر التي يكون مسندها «صحيح»، بينما <code translate="no">MATCH_*</code> يُعتبر العنصر «المجهول» حالة «فشل». لمزيد من التفاصيل، راجع <a href="/docs/ar/struct-array-operators.md">«عمليات StructArray</a>».</li>
</ul>
<ul>
<li>يفضل استخدام المقارنات المنطقية الصريحة مثل <code translate="no">$[has_code] == true</code> بدلاً من التعبيرات المنطقية المجردة.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">حدود الاستيراد والتخزين<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><th>الحد</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>تنسيقات الملفات المصدرية</td><td>يمكن أن تحتوي ملفات JSON و JSONL و CSV و Parquet على حقول StructArray. تحتوي ملفات NumPy على ملف واحد لكل حقل من المستوى الأعلى ولا يمكنها توفير بيانات StructArray؛ استخدم ملفات JSON أو CSV أو Parquet للمجموعات التي تحتوي على حقل StructArray. لمعرفة أشكال الملفات، راجع <a href="/docs/ar/prepare-source-data.md#StructArray-fields-in-source-files">"تحضير البيانات المصدرية</a>".</td></tr>
<tr><td>تنسيق التخزين</td><td>تتطلب الحقول الفرعية القابلة للقيمة الفارغة (nullable) والحقول الفرعية القياسية ( <code translate="no">ARRAY</code> ) تنسيق التخزين V2. لا يمكن الوصول إلى تنسيق التخزين V1 للمجموعات التي تستخدم هذه الحقول الفرعية: قد يبدو إنشاء المجموعة وإدراج البيانات ناجحًا، لكن البيانات تفشل عند عملية التفريغ (flush)، وهي حالة غير مدعومة. يرفض التخزين V3 مع تعيين " <code translate="no">common.storage.enableGrowingSourceFlush</code> " على " <code translate="no">true</code> " الطلبات التي تستخدم الحقول الفرعية القابلة للقيمة "null" أو الحقول الفرعية القياسية <code translate="no">ARRAY</code>.</td></tr>
<tr><td>المجموعات الخارجية</td><td>لا يتم دعم الحقول الفرعية التي يمكن أن تكون قيمتها "null" (element-nullable subfields) والحقول الفرعية ذات القيم العددية (scalar <code translate="no">ARRAY</code> ) في المجموعات الخارجية.</td></tr>
<tr><td>استيراد النسخ الاحتياطية واللقطات</td><td>يتم رفض استيراد سجلات binlog، مثل استعادة النسخ الاحتياطي، واستيراد مصدر اللقطات للمجموعات التي تحتوي على حقول فرعية قابلة للقيمة الفارغة أو حقول فرعية قياسية <code translate="no">ARRAY</code>.</td></tr>
<tr><td>التراجع إلى إصدار أقدم</td><td>لا يمكن تشغيل المجموعات التي تحتوي على حقول فرعية قابلة للقيمة الفارغة أو حقول فرعية ذات قيمة ثابتة ( <code translate="no">ARRAY</code> ) على إصدار أقدم من Milvus 3.0.6. يؤدي إعادة تشغيل سجل الكتابة المسبقة (write-ahead log) على الإصدار الأقدم إلى حدوث خطأ فادح. تؤدي إعادة الترقية إلى Milvus 3.0.6 أو إصدار أحدث إلى استعادة البيانات.</td></tr>
</tbody>
</table>
<h2 id="Related-pages" class="common-anchor-header">الصفحات ذات الصلة<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>لإنشاء حقل StructArray، اقرأ <a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a>.</p></li>
<li><p>لإدراج البيانات، اقرأ <a href="/docs/ar/insert-data-into-structarray-fields.md">«إدراج البيانات في حقول StructArray</a>».</p></li>
<li><p>لإنشاء فهارس متجهة وعلمية، اقرأ " <a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a>".</p></li>
<li><p>لمراجعة صيغة مرشح StructArray، اقرأ <a href="/docs/ar/struct-array-operators.md">«عوامل StructArray</a>».</p></li>
</ol>
