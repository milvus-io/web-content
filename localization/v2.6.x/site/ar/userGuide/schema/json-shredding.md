---
id: json-shredding.md
title: تمزيق JSONCompatible with Milvus 2.6.2+
summary: >-
  يعمل تمزيق JSON على تسريع استعلامات JSON من خلال تحويل التخزين التقليدي القائم
  على الصفوف إلى تخزين عمودي محسّن. مع الحفاظ على مرونة JSON لنمذجة البيانات،
  يقوم Milvus بتحسين الأعمدة من وراء الكواليس مما يحسن بشكل كبير من كفاءة الوصول
  والاستعلام.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">تمزيق JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>يعمل تمزيق JSON على تسريع استعلامات JSON من خلال تحويل التخزين التقليدي القائم على الصفوف إلى تخزين عمودي محسّن. مع الحفاظ على مرونة JSON لنمذجة البيانات، يقوم Milvus بتحسين الأعمدة من وراء الكواليس مما يحسن بشكل كبير من كفاءة الوصول والاستعلام.</p>
<p>يعتبر تمزيق JSON فعالاً لمعظم سيناريوهات استعلام JSON. تصبح فوائد الأداء أكثر وضوحًا مع:</p>
<ul>
<li><p><strong>مستندات JSON الأكبر حجماً والأكثر تعقيداً</strong> - مكاسب أكبر في الأداء مع زيادة حجم المستند</p></li>
<li><p><strong>أعباء عمل القراءة الثقيلة</strong> - التصفية المتكررة أو الفرز أو البحث على مفاتيح JSON</p></li>
<li><p><strong>أنماط الاستعلامات المختلطة</strong> - تستفيد الاستعلامات عبر مفاتيح JSON المختلفة من نهج التخزين المختلط</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>تتم عملية تمزيق JSON على ثلاث مراحل متميزة لتحسين البيانات لاسترجاعها بسرعة.</p>
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
    </button></h3><p>عندما تتم كتابة مستندات JSON جديدة، تقوم Milvus باستمرار بأخذ عينات منها وتحليلها لبناء إحصائيات لكل مفتاح JSON. يتضمن هذا التحليل نسبة تكرار المفتاح واستقرار النوع (ما إذا كان نوع بياناته متناسقًا عبر المستندات).</p>
<p>استنادًا إلى هذه الإحصائيات، يتم تصنيف مفاتيح JSON إلى ما يلي للتخزين الأمثل.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">فئات مفاتيح JSON</h4><table>
   <tr>
     <th><p>نوع المفتاح</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p>المفاتيح المكتوبة</p></td>
     <td><p>مفاتيح موجودة في معظم المستندات ولها دائمًا نفس نوع البيانات (على سبيل المثال، جميع الأعداد الصحيحة أو جميع السلاسل).</p></td>
   </tr>
   <tr>
     <td><p>مفاتيح ديناميكية</p></td>
     <td><p>المفاتيح التي تظهر بشكل متكرر ولكن لها نوع بيانات مختلط (على سبيل المثال، أحيانًا سلسلة وأحيانًا عدد صحيح).</p></td>
   </tr>
   <tr>
     <td><p>المفاتيح المشتركة</p></td>
     <td><p>مفاتيح تظهر بشكل غير متكرر أو مفاتيح متداخلة تقل عن عتبة تكرار قابلة للتكوين<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">مثال على التصنيف</h4><p>انظر إلى نموذج بيانات JSON الذي يحتوي على مفاتيح JSON التالية:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>بناءً على هذه البيانات، سيتم تصنيف المفاتيح على النحو التالي:</p>
<ul>
<li><p><strong>المفاتيح المكتوبة</strong>: <code translate="no">a</code> و <code translate="no">f</code> (دائماً عدد صحيح)</p></li>
<li><p><strong>المفاتيح الديناميكية</strong>: <code translate="no">b</code> (سلسلة مختلطة/عدد صحيح)</p></li>
<li><p>المفاتيح<strong>المشتركة</strong>: <code translate="no">e</code> (مفتاح نادر الظهور)</p></li>
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
    </button></h3><p>يحدد التصنيف من <a href="/docs/ar/json-shredding.md#Phase-1-Ingestion--key-classification">المرحلة 1</a> تخطيط التخزين. يستخدم Milvus تنسيقًا عموديًا محسّنًا للاستعلامات.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>تدفق تمزيق Json</span> </span></p>
<ul>
<li><p><strong>الأعمدة المقطعة</strong>: بالنسبة <strong>للمفاتيح</strong> <strong>المكتوبة</strong> <strong>والديناميكية،</strong> تتم كتابة البيانات إلى أعمدة مخصصة. يسمح هذا التخزين العمودي بإجراء عمليات مسح سريعة ومباشرة أثناء الاستعلامات، حيث يمكن لـ Milvus قراءة البيانات المطلوبة لمفتاح معين فقط دون معالجة المستند بأكمله.</p></li>
<li><p><strong>العمود المشترك</strong>: يتم تخزين جميع <strong>المفاتيح المشتركة</strong> معًا في عمود JSON ثنائي واحد مضغوط. يتم بناء <strong>فهرس مقلوب</strong> للمفتاح المشترك على هذا العمود. هذا الفهرس مهم لتسريع الاستعلامات على المفاتيح منخفضة التردد من خلال السماح لـ Milvus بتهذيب البيانات بسرعة، مما يؤدي إلى تضييق مساحة البحث بشكل فعال إلى تلك الصفوف التي تحتوي على المفتاح المحدد فقط.</p></li>
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
    </button></h3><p>تستفيد المرحلة الأخيرة من تخطيط التخزين المحسّن لتحديد أسرع مسار بذكاء لكل مسند استعلام.</p>
<ul>
<li><p><strong>المسار السريع</strong>: تصل الاستعلامات على المفاتيح المكتوبة/الديناميكية (على سبيل المثال، <code translate="no">json['a'] &lt; 100</code>) إلى الأعمدة المخصصة مباشرةً</p></li>
<li><p><strong>المسار الأمثل</strong>: الاستعلامات على المفاتيح المشتركة (على سبيل المثال، <code translate="no">json['e'] = 'rare'</code>) تستخدم الفهرس المقلوب لتحديد موقع المستندات ذات الصلة بسرعة</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">تمكين تمزيق JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>لتفعيل الميزة، قم بتعيين <code translate="no">common.enabledJSONShredding</code> إلى <code translate="no">true</code> في ملف التكوين <code translate="no">milvus.yaml</code> الخاص بك. ستؤدي البيانات الجديدة تلقائيًا إلى تشغيل عملية التمزيق.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد التمكين، سيبدأ ميلفوس في تحليل بيانات JSON وإعادة هيكلتها عند الاستيعاب دون أي تدخل يدوي آخر.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">ضبط المعلمة<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمعظم المستخدمين، بمجرد تمكين تمزيق JSON، تكون الإعدادات الافتراضية للمعلمات الأخرى كافية. ومع ذلك، يمكنك ضبط سلوك تمزيق JSON باستخدام هذه المعلمات في <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة الافتراضية</p></th>
     <th><p>نصيحة الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>يتحكم فيما إذا كانت عمليات بناء وتحميل تمزيق JSON ممكّنة أم لا.</p></td>
     <td><p>خطأ</p></td>
     <td><p>يجب تعيينها إلى <strong>صواب</strong> لتفعيل الميزة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>يتحكم فيما إذا كان Milvus يستخدم البيانات الممزقة للتسريع.</p></td>
     <td><p>صواب</p></td>
     <td><p>يتم تعيينه إلى <strong>خطأ</strong> كإجراء استرداد في حالة فشل الاستعلامات، والعودة إلى مسار الاستعلام الأصلي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>يحدد ما إذا كان Milvus يستخدم mmap عند تحميل بيانات التقطيع.</p><p>لمزيد من التفاصيل، راجع <a href="/docs/ar/mmap.md">استخدام mmap</a>.</p></td>
     <td><p>صحيح</p></td>
     <td><p>يتم تحسين هذا الإعداد بشكل عام للأداء. اضبطه فقط إذا كانت لديك احتياجات أو قيود محددة لإدارة الذاكرة على نظامك.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>الحد الأقصى لعدد مفاتيح JSON التي سيتم تخزينها في الأعمدة المقطوعة. </p><p>إذا تجاوز عدد المفاتيح التي تظهر بشكل متكرر هذا الحد، فسيقوم Milvus بإعطاء الأولوية للمفاتيح الأكثر تكراراً للتقطيع، وسيتم تخزين المفاتيح المتبقية في العمود المشترك.</p></td>
     <td><p>1024</p></td>
     <td><p>هذا يكفي لمعظم السيناريوهات. بالنسبة ل JSON التي تحتوي على آلاف المفاتيح التي تظهر بشكل متكرر، قد تحتاج إلى زيادة هذا الحد، ولكن راقب استخدام التخزين.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>يجب أن يكون الحد الأدنى لنسبة التكرار لمفتاح JSON لكي يتم اعتباره للتقطيع في عمود ممزق.</p><p>يعتبر المفتاح متكرر الظهور إذا كانت نسبته أعلى من هذا الحد.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>زيادة</strong> (على سبيل المثال، إلى 0.5) إذا تجاوز عدد المفاتيح التي تستوفي معايير التقطيع الحد <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. هذا يجعل العتبة أكثر صرامة، مما يقلل من عدد المفاتيح المؤهلة للتمزيق.</p><p><strong>قلل</strong> (على سبيل المثال، إلى 0.1) إذا كنت ترغب في تمزيق المزيد من المفاتيح التي تظهر بشكل أقل من الحد الافتراضي البالغ 30%.</p></td>
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
    </button></h2><p>يُظهر اختبارنا تحسينات كبيرة في الأداء عبر أنواع مفاتيح JSON وأنماط استعلام مختلفة.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">بيئة الاختبار والمنهجية<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>الأجهزة</strong>: 1 نواة/مجموعة عنقودية بسعة 8 جيجابايت</p></li>
<li><p><strong>مجموعة البيانات</strong>: 1 مليون مستند من <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>متوسط حجم المستند</strong>: 478.89 بايت</p></li>
<li><p><strong>مدة الاختبار</strong>: 100 ثانية لقياس سرعة الاستجابة في الثانية ووقت الاستجابة</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">النتائج: المفاتيح المكتوبة<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>يقيس هذا الاختبار الأداء عند الاستعلام عن مفتاح موجود في معظم المستندات.</p>
<table>
   <tr>
     <th><p>تعبير الاستعلام</p></th>
     <th><p>نوع قيمة المفتاح</p></th>
     <th><p>QPS (بدون تمزيق)</p></th>
     <th><p>QPS (مع التقطيع)</p></th>
     <th><p>تعزيز الأداء</p></th>
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
     <th><p>QPS (بدون تمزيق)</p></th>
     <th><p>QPS (مع التقطيع)</p></th>
     <th><p>تعزيز الأداء</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>الأعداد الصحيحة المتداخلة</p></td>
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
<h3 id="Key-insights" class="common-anchor-header">الرؤى الرئيسية<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p>تُظهر استعلامات<strong>المفاتيح المشتركة</strong> التحسينات الأكثر دراماتيكية (أسرع بما يصل إلى 89 ضعفًا)</p></li>
<li><p>توفر استعلامات<strong>المفاتيح المكتوبة</strong> مكاسب ثابتة في الأداء تتراوح بين 15 و30 ضعفًا</p></li>
<li><p>تستفيد<strong>جميع أنواع الاستعلامات</strong> من تقطيع JSON Shredding دون أي تراجع في الأداء</p></li>
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
<li><p><strong>كيف أتحقق مما إذا كان تمزيق JSON يعمل بشكل صحيح؟</strong></p>
<ol>
<li><p>أولاً، تحقق مما إذا كانت البيانات قد تم إنشاؤها باستخدام الأمر <code translate="no">show segment --format table</code> في أداة <a href="/docs/ar/birdwatcher_usage_guides.md">Birdwatcher</a>. إذا نجحت، سيحتوي الإخراج على <code translate="no">shredding_data/</code> و <code translate="no">shared_key_index/</code> تحت حقل <strong>إحصائيات مفاتيح Json</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>مخرجات أداة مراقبة الطيور</span> </span></p></li>
<li><p>بعد ذلك، تحقق من تحميل البيانات عن طريق تشغيل <code translate="no">show loaded-json-stats</code> على عقدة الاستعلام. سيعرض الإخراج تفاصيل حول البيانات المقطوعة المحملة لكل عقدة استعلام.</p></li>
</ol></li>
<li><p><strong>ماذا لو واجهت خطأ؟</strong></p>
<p>في حالة فشل عملية الإنشاء أو التحميل، يمكنك تعطيل الميزة بسرعة عن طريق الإعداد <code translate="no">common.enabledJSONShredding=false</code>. لمسح أي مهام متبقية، استخدم الأمر <code translate="no">remove stats-task &lt;task_id&gt;</code> في <a href="/docs/ar/birdwatcher_usage_guides.md">Birdwatcher</a>. في حالة فشل الاستعلام، قم بتعيين <code translate="no">common.usingjsonShreddingForQuery=false</code> للعودة إلى مسار الاستعلام الأصلي، متجاوزاً البيانات الممزقة.</p></li>
<li><p><strong>كيف يمكنني الاختيار بين تمزيق JSON وفهرسة JSON؟</strong></p>
<ul>
<li><p>يُعتبر<strong>تمزيق J</strong> SON مثاليًا للمفاتيح التي تظهر بشكل متكرر في مستنداتك، خاصةً بالنسبة لهياكل JSON المعقدة. فهو يجمع بين مزايا التخزين العمودي والفهرسة المقلوبة، مما يجعله مناسبًا تمامًا لسيناريوهات القراءة الثقيلة حيث تستعلم عن العديد من المفاتيح المختلفة. ومع ذلك، لا يوصى باستخدامه مع مستندات JSON الصغيرة جدًا لأن مكسب الأداء يكون ضئيلًا. كلما قلت نسبة قيمة المفتاح إلى الحجم الكلي لمستند JSON، كلما كان تحسين الأداء من التقطيع أفضل.</p></li>
<li><p>تُعد<strong>فهرسة JSON</strong> أفضل للتحسين المستهدف للاستعلامات المستندة إلى مفاتيح محددة ولها نفقات تخزين أقل. إنه مناسب لهياكل JSON الأبسط. لاحظ أن تمزيق JSON لا يغطي الاستعلامات على المفاتيح داخل المصفوفات، لذا فأنت بحاجة إلى فهرس JSON لتسريع تلك الاستعلامات.</p></li>
</ul>
<p>للحصول على التفاصيل، ارجع إلى <a href="/docs/ar/json-field-overview.md#Next-Accelerate-JSON-queries">نظرة عامة على حقل JSON</a>.</p></li>
</ul>
