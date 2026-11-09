---
id: json-shredding.md
title: تقسيم JSONCompatible with Milvus 2.6.2+
summary: >-
  تعمل تقنية «JSON shredding» على تسريع استعلامات JSON من خلال تحويل التخزين
  التقليدي القائم على الصفوف إلى تخزين عمودي مُحسَّن. مع الحفاظ على مرونة JSON
  في نمذجة البيانات، يقوم Milvus بإجراء تحسين عمودي خلف الكواليس يُحسّن بشكل
  كبير من كفاءة الوصول والاستعلام.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">تقسيم JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>يعمل تجزئة JSON على تسريع استعلامات JSON من خلال تحويل التخزين التقليدي القائم على الصفوف إلى تخزين عمودي مُحسّن. مع الحفاظ على مرونة JSON في نمذجة البيانات، يقوم Milvus بإجراء تحسين عمودي خلف الكواليس يحسّن بشكل كبير من كفاءة الوصول والاستعلام.</p>
<p>يُعد تجزئة JSON فعالة في معظم سيناريوهات استعلامات JSON. وتصبح مزايا الأداء أكثر وضوحًا مع:</p>
<ul>
<li><p><strong>مستندات JSON الأكبر حجمًا والأكثر تعقيدًا</strong> - زيادة أكبر في الأداء مع زيادة حجم المستند</p></li>
<li><p><strong>أحمال العمل التي تتطلب قراءة مكثفة</strong> - عمليات التصفية أو الفرز أو البحث المتكررة على مفاتيح JSON</p></li>
<li><p><strong>أنماط الاستعلام المختلطة</strong> - تستفيد الاستعلامات عبر مفاتيح JSON المختلفة من نهج التخزين الهجين</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيفية عملها<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>تتم عملية تجزئة JSON على ثلاث مراحل متميزة لتحسين البيانات من أجل استرجاعها بسرعة.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">المرحلة 1: الاستيعاب وتصنيف المفاتيح<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>مع كتابة مستندات JSON جديدة، يقوم Milvus باستمرار بأخذ عينات منها وتحليلها لإنشاء إحصائيات لكل مفتاح JSON. يتضمن هذا التحليل نسبة تكرار المفتاح واستقرار النوع (ما إذا كان نوع البيانات متسقًا عبر المستندات).</p>
<p>بناءً على هذه الإحصائيات، يتم تصنيف مفاتيح JSON إلى الفئات التالية لتحقيق التخزين الأمثل.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">فئات مفاتيح JSON</h4><table>
   <tr>
     <th><p>نوع المفتاح</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p>المفاتيح المحددة النوع</p></td>
     <td><p>المفاتيح الموجودة في معظم المستندات والتي يكون لها دائمًا نفس نوع البيانات (على سبيل المثال، جميع الأعداد الصحيحة أو جميع السلاسل).</p></td>
   </tr>
   <tr>
     <td><p>المفاتيح الديناميكية</p></td>
     <td><p>المفاتيح التي تظهر بشكل متكرر ولكنها تحتوي على أنواع بيانات مختلطة (على سبيل المثال، أحيانًا سلسلة أحرف، وأحيانًا عدد صحيح).</p></td>
   </tr>
   <tr>
     <td><p>المفاتيح المشتركة</p></td>
     <td><p>المفاتيح التي تظهر بشكل غير متكرر أو المتداخلة التي تقع تحت عتبة تكرار قابلة للتكوين<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">مثال على التصنيف</h4><p>لنفترض أن لدينا عينة من بيانات JSON تحتوي على مفاتيح JSON التالية:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>بناءً على هذه البيانات، سيتم تصنيف المفاتيح على النحو التالي:</p>
<ul>
<li><p><strong>المفاتيح المحددة النوع</strong>: <code translate="no">a</code> و <code translate="no">f</code> (دائمًا عدد صحيح)</p></li>
<li><p><strong>المفاتيح الديناميكية</strong>: <code translate="no">b</code> (مزيج من السلسلة/العدد الصحيح)</p></li>
<li><p><strong>المفاتيح المشتركة</strong>: <code translate="no">e</code> (مفتاح نادر الظهور)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">المرحلة 2: تحسين التخزين<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>يحدد التصنيف الناتج عن <a href="/docs/ar/json-shredding.md#Phase-1-Ingestion--key-classification">المرحلة 1</a> تخطيط التخزين. يستخدم Milvus تنسيقًا عموديًا مُحسّنًا للاستعلامات.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>تدفق تجزئة Json</span>
  
 </span></p>
<ul>
<li><p><strong>الأعمدة المقسمة</strong>: بالنسبة <strong>للمفاتيح</strong> <strong>المحددة</strong> <strong>النوع والديناميكية،</strong> تُكتب البيانات في أعمدة مخصصة. يتيح هذا التخزين العمودي إجراء عمليات مسح سريعة ومباشرة أثناء الاستعلامات، حيث يمكن لـ Milvus قراءة البيانات المطلوبة لمفتاح معين فقط دون معالجة المستند بأكمله.</p></li>
<li><p><strong>العمود المشترك</strong>: يتم تخزين جميع <strong>المفاتيح المشتركة</strong> معًا في عمود JSON ثنائي واحد ومضغوط. يتم إنشاء <strong>فهرس معكوس</strong> للمفاتيح المشتركة على هذا العمود. هذا الفهرس ضروري لتسريع عمليات الاستعلام على المفاتيح منخفضة التكرار من خلال السماح لـ Milvus بتقليص البيانات بسرعة، مما يضيق نطاق البحث بشكل فعال ليقتصر فقط على الصفوف التي تحتوي على المفتاح المحدد.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">المرحلة 3: تنفيذ الاستعلام<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>تستفيد المرحلة النهائية من تخطيط التخزين المُحسّن لاختيار المسار الأسرع لكل مسند استعلام بشكل ذكي.</p>
<ul>
<li><p><strong>المسار السريع</strong>: الاستعلامات على المفاتيح المحددة النوع/الديناميكية (على سبيل المثال، <code translate="no">json['a'] &lt; 100</code>) تصل إلى الأعمدة المخصصة مباشرةً</p></li>
<li><p><strong>المسار المُحسّن</strong>: الاستعلامات على المفاتيح المشتركة (على سبيل المثال، <code translate="no">json['e'] = 'rare'</code>) تستخدم الفهرس المقلوب لتحديد موقع المستندات ذات الصلة بسرعة</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">تمكين تجزئة JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>لتنشيط الميزة، قم بتعيين <code translate="no">common.enabledJSONShredding</code> إلى <code translate="no">true</code> في ملف التكوين الخاص بـ <code translate="no">milvus.yaml</code>. ستؤدي البيانات الجديدة تلقائيًا إلى تشغيل عملية التجزئة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد التفعيل، سيبدأ Milvus في تحليل وإعادة هيكلة بيانات JSON الخاصة بك فور استيعابها دون أي تدخل يدوي إضافي.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">ضبط المعلمات<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمعظم المستخدمين، بمجرد تمكين تجزئة JSON، تكون الإعدادات الافتراضية للمعلمات الأخرى كافية. ومع ذلك، يمكنك ضبط سلوك تجزئة JSON بدقة باستخدام هذه المعلمات في <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
     <th><p>نصائح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>يتحكم في ما إذا كانت عمليات إنشاء وتحميل تجزئة JSON ممكّنة أم لا.</p></td>
     <td><p>false</p></td>
     <td><p>يجب ضبطه على <strong>true</strong> لتفعيل الميزة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>يحدد ما إذا كان Milvus يستخدم البيانات المقسمة للتسريع.</p></td>
     <td><p>true</p></td>
     <td><p>اضبطه على <strong>false</strong> كإجراء استردادي في حالة فشل الاستعلامات، للعودة إلى مسار الاستعلام الأصلي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>يحدد ما إذا كان Milvus يستخدم mmap عند تحميل البيانات المجزأة.</p><p>للحصول على التفاصيل، راجع <a href="/docs/ar/mmap.md">استخدام mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>يتم تحسين هذا الإعداد بشكل عام من أجل الأداء. لا تقم بتعديله إلا إذا كانت لديك احتياجات محددة لإدارة الذاكرة أو قيود على نظامك.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>العدد الأقصى لمفاتيح JSON التي سيتم تخزينها في الأعمدة المجزأة. </p><p>إذا تجاوز عدد المفاتيح التي تظهر بشكل متكرر هذا الحد، فسيعطي Milvus الأولوية للمفاتيح الأكثر تكرارًا للتجزئة، وسيتم تخزين المفاتيح المتبقية في العمود المشترك.</p></td>
     <td><p>1024</p></td>
     <td><p>هذا العدد كافٍ لمعظم السيناريوهات. بالنسبة لملفات JSON التي تحتوي على آلاف المفاتيح التي تظهر بشكل متكرر، قد تحتاج إلى زيادة هذا العدد، ولكن عليك مراقبة استخدام مساحة التخزين.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>الحد الأدنى لنسبة التكرار التي يجب أن تتمتع بها مفتاح JSON ليتم النظر في تجزئته إلى عمود مجزأ.</p><p>يُعتبر المفتاح متكرر الظهور إذا كانت نسبته أعلى من هذا الحد.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>قم بزيادة هذه القيمة</strong> (على سبيل المثال، إلى 0.5) إذا تجاوز عدد المفاتيح التي تستوفي معايير التجزئة الحد الأقصى لـ <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. يؤدي ذلك إلى تشديد الحد الأدنى، مما يقلل من عدد المفاتيح المؤهلة للتجزئة.</p><p><strong>قم بتخفيضها</strong> (على سبيل المثال، إلى 0.1) إذا كنت ترغب في تجزئة المزيد من المفاتيح التي تظهر بتكرار أقل من عتبة 30% الافتراضية.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">معايير الأداء<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>تُظهر اختباراتنا تحسينات كبيرة في الأداء عبر أنواع مفاتيح JSON وأنماط الاستعلام المختلفة.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">بيئة الاختبار ومنهجيته<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>الأجهزة</strong>: مجموعة مكونة من نواة واحدة وذاكرة 8 جيجابايت</p></li>
<li><p><strong>مجموعة البيانات</strong>: مليون مستند من <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>متوسط حجم المستند</strong>: 478.89 بايت</p></li>
<li><p><strong>مدة الاختبار</strong>: 100 ثانية لقياس معدل الاستعلامات في الثانية (QPS) وزمن الاستجابة</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">النتائج: المفاتيح المحددة<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>قيس هذا الاختبار الأداء عند الاستعلام عن مفتاح موجود في معظم المستندات.</p>
<table>
   <tr>
     <th><p>تعبير الاستعلام</p></th>
     <th><p>نوع قيمة المفتاح</p></th>
     <th><p>QPS (بدون التجزئة)</p></th>
     <th><p>QPS (مع التجزئة)</p></th>
     <th><p>تحسين الأداء</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>عدد صحيح</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>سلسلة</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">النتائج: المفاتيح المشتركة<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>ركز هذا الاختبار على الاستعلام عن المفاتيح المتفرقة والمتداخلة التي تندرج ضمن فئة "المشتركة".</p>
<table>
   <tr>
     <th><p>تعبير الاستعلام</p></th>
     <th><p>نوع قيمة المفتاح</p></th>
     <th><p>QPS (بدون التجزئة)</p></th>
     <th><p>QPS (مع التجزئة)</p></th>
     <th><p>تحسين الأداء</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>عدد صحيح متداخل</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>سلسلة متداخلة</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">أهم النتائج<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>تُظهر<strong>استعلامات المفاتيح المشتركة</strong> التحسينات الأكثر دراماتيكية (أسرع بما يصل إلى 89x)</p></li>
<li><p>توفر<strong>استعلامات المفاتيح المحددة</strong> مكاسب ثابتة في الأداء تتراوح بين 15 و30 ضعفًا</p></li>
<li><p>تستفيد<strong>جميع أنواع الاستعلامات</strong> من تقنية JSON Shredding دون أي تراجع في الأداء</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>كيف يمكنني التحقق من أن تقطيع JSON يعمل بشكل صحيح؟</strong></p>
<ol>
<li><p>أولاً، تحقق مما إذا كانت البيانات قد تم إنشاؤها باستخدام الأمر « <code translate="no">show segment --format table</code> » في أداة <a href="/docs/ar/birdwatcher_usage_guides.md">Birdwatcher</a>. في حالة النجاح، سيحتوي الناتج على « <code translate="no">shredding_data/</code> » و« <code translate="no">shared_key_index/</code> » ضمن حقل <strong>«Json Key Stats</strong> ».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>مخرجات Birdwatcher</span>
  
 </span></p></li>
<li><p>بعد ذلك، تحقق من تحميل البيانات عن طريق تشغيل الأمر <code translate="no">show loaded-json-stats</code> على عقدة الاستعلام. ستعرض النتيجة تفاصيل حول البيانات المقسمة التي تم تحميلها لكل عقدة استعلام.</p></li>
</ol></li>
<li><p><strong>ماذا لو واجهت خطأً؟</strong></p>
<p>إذا فشلت عملية الإنشاء أو التحميل، يمكنك تعطيل الميزة بسرعة عن طريق تعيين <code translate="no">common.enabledJSONShredding=false</code>. لمسح أي مهام متبقية، استخدم الأمر <code translate="no">remove stats-task &lt;task_id&gt;</code> في <a href="/docs/ar/birdwatcher_usage_guides.md">Birdwatcher</a>. إذا فشل استعلام ما، فقم بتعيين <code translate="no">common.usingjsonShreddingForQuery=false</code> للعودة إلى مسار الاستعلام الأصلي، متجاوزًا البيانات المجزأة.</p></li>
</ul>
<ul>
<li><p><strong>كيف يمكنني الاختيار بين تجزئة JSON وفهرسة JSON؟</strong></p>
<ul>
<li><p>يُعد<strong>تجزئة JSON</strong> مثاليًا للمفاتيح التي تظهر بشكل متكرر في مستنداتك، خاصةً بالنسبة للبنى المعقدة لـ JSON. فهو يجمع بين مزايا التخزين العمودي والفهرسة المقلوبة، مما يجعله مناسبًا تمامًا للسيناريوهات التي تتطلب قراءة مكثفة حيث تقوم بالاستعلام عن العديد من المفاتيح المختلفة. ومع ذلك، لا يُنصح باستخدامه للمستندات الصغيرة جدًّا من نوع JSON نظرًا لأن مكاسب الأداء تكون ضئيلة. كلما انخفضت نسبة قيمة المفتاح إلى الحجم الإجمالي لمستند JSON، كان تحسين الأداء الناتج عن التجزئة أفضل.</p></li>
<li><p>تعد<strong>فهرسة JSON</strong> أفضل للتحسين المستهدف للاستعلامات المحددة القائمة على المفاتيح، كما أنها تتطلب تكلفة تخزين أقل. وهي مناسبة لهياكل JSON الأبسط. لاحظ أن تقسيم JSON لا يغطي الاستعلامات على المفاتيح الموجودة داخل المصفوفات، لذا ستحتاج إلى فهرس JSON لتسريع تلك الاستعلامات.</p></li>
</ul>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/json-field-overview.md#Next-Accelerate-JSON-queries">«نظرة عامة</a> على <a href="/docs/ar/json-field-overview.md#Next-Accelerate-JSON-queries">حقول JSON</a>».</p></li>
</ul>
