---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  إن فهرس IVF_SQ8 هو خوارزمية فهرسة قائمة على التكميم مصممة لمعالجة تحديات البحث
  عن التشابه على نطاق واسع. يحقق هذا النوع من الفهرس عمليات بحث أسرع مع بصمة
  ذاكرة أصغر بكثير مقارنةً بأساليب البحث الشامل.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>إن فهرس <strong>IVF_SQ8</strong> هو خوارزمية فهرسة <strong>قائمة على التكميم</strong> مصممة لمعالجة تحديات البحث عن التشابه على نطاق واسع. يحقق هذا النوع من الفهرس عمليات بحث أسرع مع بصمة ذاكرة أصغر بكثير مقارنةً بطرق البحث الشاملة.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتمد فهرس IVF_SQ8 على مكونين رئيسيين:</p>
<ul>
<li><p><strong>ملف مقلوب (IVF)</strong>: ينظّم البيانات في مجموعات، مما يمكّن خوارزمية البحث من التركيز فقط على المجموعات الفرعية الأكثر صلة من المتجهات.</p></li>
<li><p><strong>التكميم الكمي القياسي (SQ8)</strong>: يضغط المتجهات إلى شكل أكثر إحكامًا، مما يقلل بشكل كبير من استخدام الذاكرة مع الحفاظ على دقة كافية لحسابات التشابه السريعة.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>يشبه IVF إنشاء فهرس في كتاب. بدلاً من مسح كل صفحة (أو، في حالتنا، كل متجه)، يمكنك البحث عن كلمات رئيسية محددة (مجموعات) في الفهرس للعثور بسرعة على الصفحات (المتجهات) ذات الصلة. في السيناريو الخاص بنا، يتم تجميع المتجهات في مجموعات، وستقوم الخوارزمية بالبحث ضمن مجموعات قليلة قريبة من متجه الاستعلام.</p>
<p>إليك كيفية عملها:</p>
<ol>
<li><p><strong>التجميع:</strong> يتم تقسيم مجموعة البيانات المتجهة إلى عدد محدد من العناقيد باستخدام خوارزمية تجميع مثل k-means. تحتوي كل مجموعة على مركزية (متجه تمثيلي للمجموعة).</p></li>
<li><p><strong>التعيين:</strong> يتم تعيين كل متجه إلى المجموعة التي يكون متجهها المركزي الأقرب إليه.</p></li>
<li><p><strong>الفهرس المقلوب:</strong> يتم إنشاء فهرس يعيّن مركز كل مجموعة عنقودية إلى قائمة المتجهات المعينة لتلك المجموعة.</p></li>
<li><p><strong>بحث:</strong> عند البحث عن أقرب الجيران، تقارن خوارزمية البحث متجه الاستعلام الخاص بك مع مراكز المجموعات العنقودية وتختار المجموعة (المجموعات) الواعدة. ثم يتم تضييق نطاق البحث إلى المتجهات داخل تلك المجموعات المختارة.</p></li>
</ol>
<p>لمعرفة المزيد حول تفاصيلها الفنية، راجع <a href="/docs/ar/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>التكميم الكمي القياسي (SQ) هي تقنية تُستخدم لتقليل حجم المتجهات عالية الأبعاد عن طريق استبدال قيمها بتمثيلات أصغر وأكثر إحكاما. يستخدم متغير <strong>SQ8</strong> الأعداد الصحيحة 8 بت بدلاً من أرقام الفاصلة العائمة النموذجية 32 بت لتخزين كل قيمة بُعد من المتجه. هذا يقلل بشكل كبير من حجم الذاكرة المطلوبة لتخزين البيانات.</p>
<p>إليك كيفية عمل SQ8:</p>
<ol>
<li><p><strong>تحديد النطاق:</strong> أولاً، تحديد القيم الدنيا والقصوى داخل المتجه. يحدد هذا النطاق حدود التكميم.</p></li>
<li><p><strong>التطبيع:</strong> تطبيع قيم المتجه إلى نطاق بين 0 و1 باستخدام الصيغة:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>يضمن ذلك تعيين جميع القيم بشكل متناسب داخل نطاق موحد، وإعدادها للضغط.</p></li>
<li><p><strong>ضغط 8 بت:</strong> اضرب القيمة المعيارية في 255 (القيمة القصوى لعدد صحيح 8 بت) وقم بتقريب الناتج إلى أقرب عدد صحيح. هذا يضغط كل قيمة بشكل فعال إلى تمثيل 8 بت.</p></li>
</ol>
<p>لنفترض أن لديك قيمة بُعد 1.2، مع قيمة صغرى -1.7 وقيمة قصوى 2.3. يوضّح الشكل التالي كيفية تطبيق SQ8 لتحويل قيمة عوامة32 إلى عدد صحيح int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>يجمع فهرس IVF_SQ8 بين IVF و SQ8 لإجراء عمليات بحث التشابه بكفاءة:</p>
<ol>
<li><p><strong>يضيّق IVF نطاق البحث</strong>: يتم تقسيم مجموعة البيانات إلى مجموعات، وعندما يتم إصدار استعلام، يقارن IVF أولاً الاستعلام بمراكز المجموعات، ويختار المجموعات الأكثر صلة.</p></li>
<li><p><strong>يعمل SQ8 على تسريع عمليات حساب المسافة</strong>: داخل المجموعات المختارة، يقوم SQ8 بضغط المتجهات إلى أعداد صحيحة 8 بت، مما يقلل من استخدام الذاكرة ويسرّع من عمليات حساب المسافة.</p></li>
</ol>
<p>باستخدام IVF لتركيز البحث و SQ8 لتسريع العمليات الحسابية، يحقق IVF_SQ8 كلاً من أوقات البحث السريعة وكفاءة الذاكرة.</p>
<h2 id="Build-index" class="common-anchor-header">بناء الفهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لبناء فهرس <code translate="no">IVF_SQ8</code> على حقل متجه في ميلفوس، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">nlist</code>: عدد المجموعات المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">IVF_SQ8</code> ، راجع <a href="/docs/ar/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">بارامز بناء الف</a>هرس.</p></li>
</ul>
<p>بمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الأسلوب <code translate="no">create_index()</code> مباشرةً أو تمرير بارامترات الفهرس في الأسلوب <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث عن التشابه على الفهرس.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">params</code>: خيارات التكوين الإضافية للبحث على الفهرس.</p>
<ul>
<li><code translate="no">nprobe</code>: عدد المجموعات للبحث عن الكيانات المرشحة.</li>
</ul>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">IVF_SQ8</code> ، راجع <a href="/docs/ar/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">باراميات البحث الخاصة بالفهرس</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">بارامترات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لبناء الفهرس وإجراء عمليات البحث على الفهرس.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>عامل التجميع</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>عدد المجموعات المراد إنشاؤها باستخدام خوارزمية k-means أثناء بناء الفهرس.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 65536]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">128</code></p></td>
     <td><p>تعمل القيم الأكبر <code translate="no">nlist</code> على تحسين الاسترجاع من خلال إنشاء مجموعات أكثر دقة ولكنها تزيد من وقت بناء الفهرس. قم بالتحسين بناءً على حجم مجموعة البيانات والموارد المتاحة. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>عامل التهيئة</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>عدد المجموعات للبحث عن المرشحين.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, <em>nlist</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تسمح القيم الأعلى بالبحث في عدد أكبر من المجموعات، مما يحسّن الاستدعاء من خلال توسيع نطاق البحث ولكن على حساب زيادة زمن انتقال الاستعلام. قم بتعيين <code translate="no">nprobe</code> بشكل متناسب مع <code translate="no">nlist</code> لتحقيق التوازن بين السرعة والدقة.</p>
<p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1, nlist].</p></td>
   </tr>
</table>
