---
id: manage-file-resources.md
title: إدارة موارد الملفات
summary: >-
  تسجيل وإدارة ملفات القاموس الخارجية التي يمكن لمحللي النصوص في ميلفوس تحميلها
  في وقت التشغيل.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">إدارة موارد الملفات<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>مورد <strong>الملف</strong> هو مرجع مسجّل في الخادم إلى ملف قاموس خارجي تستهلكه محللات النصوص في وقت التشغيل. في Milvus 3.0، يمكن لأربعة مكوّنات محلّل أن تحمّل قواميسها من مورد ملف بدلًا من صفيف مضمن:</p>
<table>
   <tr>
     <th><p><strong>مكوّن المحلّل</strong></p></th>
     <th><p><strong>معلمة تقبل مورد ملف</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/jieba-tokenizer.md">مُرمِّز جيبا</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/stop-filter.md">مرشح الإيقاف</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/decompounder-filter.md">مُرشِّح مُحلِّل</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/synonym-filter.md">مرشح المرادفات</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>تحل موارد الملفات مشكلتين عمليتين مع مصفوفات القاموس المضمنة:</p>
<ul>
<li><p>القواميس الحقيقية كبيرة. يمكن أن تكون مفردات جيبا الصينية عشرات الآلاف من الأسطر؛ وجداول المرادفات عادةً ما تكون آلاف القواعد. إن تضمينها في تكوين المحلل غير عملي.</p></li>
<li><p>عادةً ما تتم مشاركة نفس القاموس عبر المجموعات. تسجيلها مرة واحدة، ثم الرجوع إليها بالاسم، يحافظ على صغر حجم المخططات ويجعل تحديثات القاموس عملية واحدة.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">أنواع موارد الملفات<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ميلفوس نوعين من موارد الملفات مع مسؤوليات إدارة مختلفة:</p>
<table>
   <tr>
     <th><p><strong>النوع</strong></p></th>
     <th><p><strong>مكان وجود الملف</strong></p></th>
     <th><p><strong>من يدير الملف</strong></p></th>
     <th><p><strong>ملائم</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>بعيد</strong></p></td>
     <td><p>في مخزن الكائنات (MinIO / S3 / GCS / Azure) الذي تم تكوين مجموعة Milvus الخاصة بك لاستخدامه بالفعل</p></td>
     <td><p>Milvus، عبر واجهات برمجة التطبيقات الخاصة بالعميل <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>موصى به لمعظم عمليات النشر.</p></td>
   </tr>
   <tr>
     <td><p><strong>محلي</strong></p></td>
     <td><p>على نفس المسار المطلق على نظام الملفات المحلي لكل مكون من مكونات Milvus (DataNode، QueryNode، StreamingNode)</p></td>
     <td><p>أنت - قم بتحميل الملف بنفسك، على سبيل المثال عبر وحدة تخزين Kubernetes</p></td>
     <td><p>سيناريوهات مفتوحة المصدر / ذاتية الاستضافة حيث تفضل إدارة ملفات القاموس خارج Milvus.</p></td>
   </tr>
</table>
<p>تستعرض بقية هذه الصفحة كلا النوعين، بدءًا من النوع البعيد الأكثر شيوعًا.</p>
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
    </button></h2><ul>
<li><p>بالنسبة لموارد الملفات <strong>عن</strong> بعد، يجب تكوين عملية نشر ملف Milvus الخاص بك مع مخزن كائنات. معظم عمليات النشر موجودة بالفعل - تحقق من قسم <code translate="no">minio:</code> من <code translate="no">milvus.yaml</code> الخاص بك (أو قيم مخطط هيلم المكافئة). لاحظ القيم <code translate="no">bucketName</code> و <code translate="no">rootPath</code> ؛ ستحتاج إليها عند تسجيل موارد الملفات.</p></li>
<li><p>بالنسبة لموارد الملفات <strong>المحلية،</strong> يجب أن تكون قادرًا على وضع الملفات على كل جراب / حاوية Milvus في نفس المسار المطلق. تعتمد كيفية القيام بذلك على عملية النشر الخاصة بك (ربط التحميل أو وحدة التخزين المدعومة بخريطة التكوين، أو حاوية البدء، وما إلى ذلك).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">تسجيل مورد ملف بعيد<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>تسجيل مورد ملف عن بعد هو سير عمل من ثلاث خطوات: <strong>قم بتحميل</strong> الملف إلى تخزين الكائن، وقم <strong>بتسجيله</strong> في Milvus تحت اسم مختار، ثم قم <strong>بالإشارة</strong> إليه من أي محلل يحتاج إليه.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">الخطوة 1. تحميل ملف القاموس إلى مخزن الكائنات<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم أداتك الخاصة (<code translate="no">mc</code> ، <code translate="no">aws s3 cp</code> ، ، <code translate="no">boto3</code> ، أو أي عميل متوافق مع S3) لوضع الملف في الدلو الذي تم تكوين Milvus لاستخدامه.</p>
<p>على سبيل المثال، إذا كان <code translate="no">milvus.yaml</code> يحتوي على:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحميل ملف باسم <code translate="no">chinese_terms.txt</code> مع <code translate="no">rootPath</code> كبادئة يضع الكائن في <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>الوسيطة <code translate="no">path</code> التي ستقوم بتمريرها إلى <code translate="no">add_file_resource</code> في الخطوة 2 هي <strong>مفتاح الكائن الكامل، بما في ذلك بادئة rootPath</strong> - في المثال أعلاه، <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. يتم رفض المسار بدون البادئة (على سبيل المثال، فقط <code translate="no">&quot;chinese_terms.txt&quot;</code>) مع الخطأ <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">الخطوة 2. تسجيل الملف مع <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> يتم التحقق من صحته بشكل متزامن: لا يتم إرجاع الاستدعاء إلا بعد أن يتأكد ميلفوس من وجود الكائن على <code translate="no">path</code> في مخزن الكائنات المهيأ. إذا كان الكائن مفقودًا، ترفع المكالمة <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - قم بتحميل الملف أولاً، ثم أعد المحاولة.</p>
<p>الاستدعاء غير محدد. لا يؤدي استدعاء <code translate="no">add_file_resource</code> مرتين بنفس <code translate="no">name</code> و <code translate="no">path</code> إلى إنشاء نسخ مكررة.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">الخطوة 3. قم بالإشارة إلى مورد الملف من محلل<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>حيثما تقبل معلمة محلل مرجع ملف (<code translate="no">extra_dict_file</code> ، <code translate="no">stop_words_file</code> ، ، <code translate="no">word_list_file</code> ، <code translate="no">synonyms_file</code>)، استخدم النموذج البعيد المتعارف عليه:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>تستخدم جميع معلمات المحلل الأربعة نفس الشكل؛ يختلف فقط مفتاح المحلل المحيط. للاطلاع على أمثلة ملموسة لكل محلل، انظر Jieba tokenizer، ومرشح الإيقاف، ومرشح فك التجميع، ومرشح المترادفات.</p>
<p>أسماء المعلمات هي <code translate="no">resource_name</code> و <code translate="no">file_name</code> - وليس <code translate="no">name</code> و <code translate="no">file</code>. يؤدي استخدام <code translate="no">name</code> / <code translate="no">file</code> (أو <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> بدلاً من <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) إلى رفع <code translate="no">MilvusException</code> في وقت إنشاء المحلل برسالة مثل <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">قائمة موارد الملف<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> تُرجع قائمة من <code translate="no">FileResourceInfo</code> كائنات ، كل منها <code translate="no">.name</code> و <code translate="no">.path</code>. تُرجع المجموعة الفارغة <code translate="no">[]</code>. لا يوجد لكل مورد <code translate="no">get</code> ؛ <code translate="no">list_file_resources</code> هي واجهة برمجة التطبيقات الوحيدة للقراءة.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">إزالة مورد ملف<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> هو أمرٌ غير محدد: استدعاؤه لاسم غير موجود يُرجع <code translate="no">None</code> دون إثارة.</p>
<p>قبل إزالة مورد ملف، قم بإسقاط أو تغيير أي مجموعات تشير تكوينات محللها إليه. الاحتفاظ بمورد ملف حتى لا تعتمد أي مجموعة عليه يجنبك خطر فشل عمليات البحث عن المحلل بعد اختفاء المورد.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">استخدام مورد ملف محلي<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>يشير مورد ملف <strong>محلي</strong> مباشرة إلى مسار على نظام الملفات المحلي لكل مكون من مكونات Milvus. لا يوجد <code translate="no">add_file_resource</code> استدعاء - لا يتتبع مالفوس الموارد المحلية. يمكنك وضع الملف في نفس المسار المطلق على كل جراب أو حاوية ذات صلة بنفسك، ثم الإشارة إليه بالمسار:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>موارد الملفات المحلية صالحة فقط في عمليات النشر حيث تتحكم في أنظمة الملفات الخاصة بعُقد البيانات وعُقد الاستعلام وعُقد التدفق - عادةً ما تكون Milvus ذاتية الاستضافة على معدن مكشوف أو على مجموعة Kubernetes حيث يمكنك إضافة وحدة تخزين محمولة. يجب أن يكون الملف موجودًا في نفس المسار المطلق بالضبط على كل مكوِّن؛ وإلا ستفشل بعض العُقد عند تحميل المحلِّل.</p>
<p>يتم فتح الملف عند إنشاء المحلل لأول مرة. إذا لم يكن المسار موجودًا في تلك النقطة، يفشل إنشاء المحلِّل مع <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">اعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>التوفر على مستوى الكتلة ليس فورياً.</strong> بعد إرجاع <code translate="no">add_file_resource</code> ، يقوم Milvus بمزامنة الملف لكل مكون يحتاج إليه. خلال هذه النافذة القصيرة، قد يفشل إنشاء مجموعة تشير إلى المورد على العقد التي لم تتم مزامنتها بعد. الإصلاح النموذجي هو إعادة محاولة استدعاء الإنشاء بعد بضع ثوانٍ.</p></li>
<li><p><strong>الإزالة فقط عندما لا تعتمد أي مجموعة على المورد.</strong> قم بإسقاط أو تغيير أي مجموعة يشير تكوين محللها إلى المورد قبل استدعاء <code translate="no">remove_file_resource</code> ، لتجنب عمليات البحث في المحلل التي تفشل في العثور على الملف.</p></li>
<li><p><strong>البيانات الوصفية فقط.</strong> <code translate="no">list_file_resources()</code> إرجاع <code translate="no">name</code> و <code translate="no">path</code> - لا يوجد حجم أو المجموع الاختباري أو وقت التحميل أو بيانات وصفية أخرى. تتبع إصدارات القاموس باصطلاح التسمية الخاص بك إذا كنت بحاجة إليها.</p></li>
</ul>
