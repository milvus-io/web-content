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
    </button></h2><table>
<thead>
<tr><th>المجال</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>شكل المخطط</td><td>لا يمكن استخدام Struct إلا كنوع عنصر لحقل Array. لا يُدعم Struct كحقل مجموعة من المستوى الأعلى.</td></tr>
<tr><td>مخطط الحقل الفرعي</td><td>تشترك جميع عناصر Struct في حقل StructArray نفسه في مخطط Struct واحد محدد مسبقًا.</td></tr>
<tr><td>السعة</td><td><code translate="no">max_capacity</code> مطلوب ويحدد عدد عناصر Struct التي يمكن لكيان واحد تخزينها في حقل StructArray.</td></tr>
<tr><td>تغييرات الحقول الفرعية</td><td>بعد إنشاء حقل StructArray، لا يمكنك إضافة حقول فرعية إلى حقل StructArray الموجود.</td></tr>
<tr><td>مسار الحقل الفرعي</td><td>استخدم مسارات <code translate="no">structArray[subfield]</code> ، مثل <code translate="no">chunks[emb]</code> ، للفهارس وأهداف البحث وحقول الإخراج والمرشحات. لا تستخدم <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>إدراج الشكل</td><td>أدخل حقل StructArray كمصفوفة من الكائنات. لا تستخدم صيغة المسار داخل حمولات الإدراج.</td></tr>
<tr><td>فهارس المتجهات</td><td>يقبل حقل المتجه أو الحقل الفرعي للمتجه فهرسًا واحدًا فقط. استخدم حقول فرعية منفصلة للمتجهات للبحث في EmbeddingList والبحث على مستوى العناصر.</td></tr>
<tr><td>الدوال</td><td>لا يتم دعم وظائف الحقول للحقول أو الحقول الفرعية داخل حقل StructArray.</td></tr>
<tr><td>الحقول القابلة للقيمة "Null"</td><td>تخضع حقول StructArray القابلة للقيمة الفارغة لقيود الإصدار. وعندما تكون مدعومة، تنطبق القيمة الفارغة على حقل StructArray بأكمله، وليس على عنصر Struct فردي بشكل مستقل.</td></tr>
<tr><td>حقل الإضافة الديناميكي</td><td>تخضع إضافة حقل StructArray إلى مجموعة موجودة للإصدار وتتطلب أن يكون الحقل المضاف قابلاً للقيمة null.</td></tr>
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
    </button></h2><table>
<thead>
<tr><th>الحد</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>Struct ليس نوع حقل من المستوى الأعلى.</td><td>قم بإنشاء حقل StructArray كـ <code translate="no">datatype=DataType.ARRAY</code> مع <code translate="no">element_type=DataType.STRUCT</code> و <code translate="no">struct_schema</code>.</td></tr>
<tr><td>تشترك جميع العناصر في مخطط واحد.</td><td>يتبع كل عنصر Struct في حقل StructArray نفس قائمة الحقول الفرعية وأنواع بيانات الحقول الفرعية.</td></tr>
<tr><td><code translate="no">max_capacity</code> مطلوب.</td><td>يجب ألا يتجاوز عدد عناصر Struct في كيان واحد قيمة <code translate="no">max_capacity</code> المُعدة لحقل StructArray.</td></tr>
<tr><td>الحقول الفرعية الموجودة ثابتة.</td><td>لا يمكنك إضافة حقول فرعية جديدة إلى حقل StructArray موجود. لتغيير مخطط الحقول الفرعية، قم بإزالة حقل StructArray ثم أضفه مرة أخرى باستخدام المخطط المحدث.</td></tr>
<tr><td>لا يتم دعم StructArray المتداخلة.</td><td>لا يمكن أن يحتوي حقل StructArray على حقول فرعية متداخلة من نوع <code translate="no">Array</code> أو <code translate="no">ArrayOfVector</code> أو <code translate="no">Struct</code> أو <code translate="no">ArrayOfStruct</code>.</td></tr>
<tr><td>لا يتم دعم الدوال داخل StructArray.</td><td>لا تقم بتعريف دوال الحقول لحقول StructArray أو حقولها الفرعية.</td></tr>
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
    </button></h2><p>يتم تعيين الحقول الفرعية لـ StructArray إلى تخزين مادي على غرار المصفوفات. يسرد الجدول التالي الأنواع المادية المدعومة وغير المدعومة.</p>
<table>
<thead>
<tr><th>النوع المادي للحقل الفرعي في Struct</th><th>الدعم</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>مدعوم</td><td>قم بتعريف الحقل الفرعي على النحو التالي: <code translate="no">DataType.BOOL</code>.</td></tr>
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
<tr><td><code translate="no">Array</code> أو <code translate="no">ArrayOfVector</code> أو <code translate="no">Struct</code> أو <code translate="no">ArrayOfStruct</code></td><td>غير مدعوم</td><td>لا تدعم حقول StructArray الحقول الفرعية المتداخلة من نوع المصفوفة أو مصفوفة المتجهات أو Struct أو Array-of-Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">حدود المخطط القابل للفراغ والديناميكي<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتمد سلوك StructArray القابل للقيمة الفارغة وإضافة حقول StructArray الديناميكية على الإصدار.</p>
<table>
<thead>
<tr><th>القدرة</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>حقل StructArray القابل للقيمة الفارغة</td><td>مدعوم فقط في الإصدارات التي تتضمن دعم StructArray القابل للقيمة الفارغة ودعم المصفوفات المتجهة القابلة للقيمة الفارغة.</td></tr>
<tr><td>القيمة الفارغة في Python</td><td>استخدم <code translate="no">None</code> لإدراج قيمة StructArray فارغة في Python. لا تستخدم <code translate="no">Null</code> أو <code translate="no">null</code>.</td></tr>
<tr><td>نطاق القيمة الفارغة</td><td>تنطبق القيمة الفارغة على حقل StructArray بأكمله. على سبيل المثال، لا يكون <code translate="no">chunks=None</code> صالحًا إلا عندما يكون <code translate="no">chunks</code> قابلاً للقيمة الفارغة.</td></tr>
<tr><td>قيمة StructArray فارغة جزئيًا</td><td>عندما يحتوي حقل StructArray على قيمة صفيف صالحة، لا تخلط صفيفات الحقول الفرعية التي يمكن أن تكون null مع صفيفات الحقول الفرعية الصالحة في نفس القيمة.</td></tr>
<tr><td>الإضافة الديناميكية لحقل StructArray</td><td>لا يتم دعم إضافة حقل StructArray إلى مجموعة موجودة إلا في الإصدارات التي تتضمن دعمًا ديناميكيًا لحقول StructArray.</td></tr>
<tr><td>متطلبات القابلية للصفر للإضافة الديناميكية</td><td>يجب أن يكون حقل StructArray المضاف إلى مجموعة موجودة قابلاً للقيمة null لأن الكيانات الموجودة لا تحتوي على قيمة للحقل الجديد.</td></tr>
<tr><td>الكيانات الموجودة بعد الإضافة الديناميكية</td><td>تُرجع الكيانات الموجودة القيمة " <code translate="no">null</code> " لحقل StructArray المضاف عبر حقوله الفرعية.</td></tr>
</tbody>
</table>
<p>في Milvus v3.0.x، تتوفر حقول StructArray القابلة للقيمة الفارغة، ومصفوفات المتجهات القابلة للقيمة الفارغة، وإضافة حقول StructArray الديناميكية.</p>
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
    </button></h2><table>
<thead>
<tr><th>الحد</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>شكل الحمولة</td><td>أدخل حقل StructArray كمصفوفة من كائنات Struct، مثل <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>أسماء الحقول الفرعية</td><td>داخل كل كائن Struct، استخدم أسماء الحقول الفرعية مثل <code translate="no">text</code> و <code translate="no">emb</code> ، وليس المسارات مثل <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>مواءمة المخطط</td><td>يجب أن يتطابق كل عنصر Struct مع مخطط Struct.</td></tr>
<tr><td>السعة</td><td>يجب ألا يتجاوز عدد عناصر Struct في كيان واحد <code translate="no">max_capacity</code>.</td></tr>
<tr><td>أبعاد المتجه</td><td>يجب أن تتطابق قيم المتجهات مع <code translate="no">dim</code> المُعدة لحقولها الفرعية المتجهة.</td></tr>
<tr><td>تكرار في وضع البحث</td><td>إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العناصر، فاكتب المتجهات في حقلين فرعيين منفصلين للمتجهات.</td></tr>
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
    </button></h2><p>يمكن فهرسة حقل فرعي متجه من نوع StructArray إما للبحث في EmbeddingList أو للبحث على مستوى العناصر. ولا يمكن للحقل الفرعي المتجه نفسه استخدام مجموعتي المقاييس معًا لأن كل حقل متجه أو حقل فرعي متجه لا يقبل سوى فهرس واحد.</p>
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
<p>تُعتبر الحقول الفرعية المتجهة لـ StructArray حقولًا فرعية متجهة عند تخطيط مخطط المجموعة. حافظ على إجمالي عدد الحقول المتجهة والحقول الفرعية المتجهة ضمن حدود الإصدار المستهدف ومستوى الخدمة.</p>
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
    </button></h2><table>
<thead>
<tr><th>سلوك البحث</th><th>الدعم والحدود</th></tr>
</thead>
<tbody>
<tr><td>البحث الأساسي في EmbeddingList</td><td>مدعوم في الحقول الفرعية للمتجهات StructArray المفهرسة باستخدام مقاييس <code translate="no">MAX_SIM*</code>. يُرجع نتائج على مستوى الكيان.</td></tr>
<tr><td>البحث الأساسي على مستوى العناصر</td><td>مدعوم في الحقول الفرعية للمتجهات StructArray المفهرسة باستخدام مقاييس المتجهات العادية. يمكن أن يعرض إزاحات العناصر المطابقة.</td></tr>
<tr><td>البحث في النطاق</td><td>مدعوم وفقًا لوضع البحث ودعم الفهرس/المقياس في الإصدار المستهدف. لمعرفة سلوك نطاق البحث المختلط في طلبات StructArray على مستوى العناصر، تحقق من الإصدار المستهدف.</td></tr>
<tr><td>البحث بالتجميع</td><td>يمكن أن يُرجع البحث المجمّع على مستوى العناصر الإزاحات. يعتمد سلوك التجميع في البحث المختلط لطلبات StructArray على مستوى العناصر على الإصدار.</td></tr>
<tr><td>البحث المختلط</td><td>يمكن أن يتضمن طلب البحث الهجين طلبات الحقول الفرعية للمتجه StructArray فقط عندما يدعم الإصدار المستهدف تركيبة البحث تلك. ولا يزال كل طلب يتبع عائلة المقاييس الخاصة بالحقل الفرعي للمتجه المفهرس.</td></tr>
<tr><td>إخراج الإزاحة</td><td>يتوفر الإزاحة لنتائج البحث على مستوى العنصر. يعرض بحث EmbeddingList نتائج على مستوى الكيان ولا يستخدم إزاحات العناصر كوحدة النتيجة الأساسية.</td></tr>
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
    </button></h2><p>تتم معالجة التصفية القياسية لـ StructArray بواسطة عوامل StructArray، مثل " <code translate="no">element_filter</code> " ومجموعة " <code translate="no">MATCH_*</code> ". توجد مصفوفة دعم المسندات التفصيلية في <a href="/docs/ar/struct-array-operators.md">"StructArray Operators</a>".</p>
<p>على مستوى عام:</p>
<ul>
<li><p>استخدم <code translate="no">$[subfield]</code> فقط داخل عوامل StructArray.</p></li>
<li><p>استخدم الحقول الفرعية القياسية للمسلّطات القياسية.</p></li>
<li><p>لا تستخدم الحقول الفرعية المتجهة كمدخلات للمسلّطات القياسية لـ <code translate="no">$[...]</code>.</p></li>
<li><p>لا يتم دعم صيغة مسار JSON، ووظائف JSON، ووظائف حاويات المصفوفات، ووظائف مطابقة النص، ووظائف الهندسة / نظم المعلومات الجغرافية، وتعبيرات Timestamptz للمسافات على مستوى العناصر في StructArray.</p></li>
<li><p>يفضل استخدام المقارنات المنطقية الصريحة مثل <code translate="no">$[has_code] == true</code> بدلاً من التعبيرات المنطقية المجردة.</p></li>
</ul>
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
<li><p>لإدراج البيانات، اقرأ " <a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a>".</p></li>
<li><p>لإنشاء فهارس متجهة وعلمية، اقرأ <a href="/docs/ar/index-structarray-fields.md">«فهرسة حقول StructArray</a>».</p></li>
<li><p>لمراجعة صيغة مرشح StructArray، اقرأ " <a href="/docs/ar/struct-array-operators.md">عوامل StructArray</a>".</p></li>
</ol>
