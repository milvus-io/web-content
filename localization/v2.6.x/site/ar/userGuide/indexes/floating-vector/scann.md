---
id: scann.md
title: SCANN
summary: >-
  مدعومًا بمكتبة ScaNN من Google، تم تصميم فهرس SCANN في Milvus لمعالجة تحديات
  البحث عن التشابه المتجهي المتدرج، وتحقيق التوازن بين السرعة والدقة، حتى على
  مجموعات البيانات الكبيرة التي عادةً ما تشكل تحديات لمعظم خوارزميات البحث.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>مدعومًا بمكتبة <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> من Google، تم تصميم فهرس <code translate="no">SCANN</code> في Milvus لمعالجة تحديات البحث عن التشابه المتجهي المتدرج، وتحقيق التوازن بين السرعة والدقة، حتى على مجموعات البيانات الكبيرة التي عادةً ما تشكل تحديات لمعظم خوارزميات البحث.</p>
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
    </button></h2><p>تم تصميم ScaNN لحل أحد أكبر التحديات في البحث عن المتجهات: العثور بكفاءة على المتجهات الأكثر صلة في المساحات عالية الأبعاد، حتى مع نمو مجموعات البيانات بشكل أكبر وأكثر تعقيدًا. تقسم بنيتها عملية البحث عن المتجهات إلى مراحل متميزة:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>المسح</span> </span></p>
<ol>
<li><p><strong>التقسيم</strong>: تقسيم مجموعة البيانات إلى مجموعات. تعمل هذه الطريقة على تضييق مساحة البحث من خلال التركيز فقط على مجموعات البيانات الفرعية ذات الصلة بدلاً من مسح مجموعة البيانات بأكملها، مما يوفر الوقت وموارد المعالجة. غالبًا ما تستخدم شبكة ScaNN خوارزميات التجميع، مثل <a href="https://zilliz.com/blog/k-means-clustering">k-means،</a> لتحديد المجموعات، مما يسمح لها بإجراء عمليات البحث عن التشابه بكفاءة أكبر.</p></li>
<li><p><strong>التكميم</strong>: تطبق ScaNN عملية تكميم تُعرف باسم <a href="https://arxiv.org/abs/1908.10396">التكميم الكمي المتباين الخواص</a> بعد التقسيم. يركز التكميم الكمي التقليدي على تقليل المسافة الكلية بين المتجهات الأصلية والمضغوطة إلى الحد الأدنى، وهو أمر غير مثالي لمهام مثل <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">البحث عن أقصى ناتج داخلي (MIPS)</a>، حيث يتم تحديد التشابه من خلال الضرب الداخلي للمتجهات بدلاً من المسافة المباشرة. وبدلاً من ذلك، يعطي التكميم المتباين الأولوية للحفاظ على المكونات المتوازية بين المتجهات، أو الأجزاء الأكثر أهمية لحساب المنتجات الداخلية الدقيقة. يسمح هذا النهج لـ ScaNN بالحفاظ على دقة MIPS عالية من خلال محاذاة المتجهات المضغوطة بعناية مع الاستعلام، مما يتيح عمليات بحث أسرع وأكثر دقة في التشابه.</p></li>
<li><p><strong>إعادة الترتيب</strong>: مرحلة إعادة الترتيب هي الخطوة النهائية، حيث تقوم ScaNN بضبط نتائج البحث من مرحلتي التقسيم والتكميم. تطبق عملية إعادة الترتيب هذه عمليات حسابية دقيقة للمنتج الداخلي على أفضل المتجهات المرشحة، مما يضمن دقة النتائج النهائية بدقة عالية. تُعد إعادة الترتيب أمرًا بالغ الأهمية في محركات التوصية عالية السرعة أو تطبيقات البحث عن الصور حيث تعمل التصفية الأولية والتجميع كطبقة خشنة، وتضمن المرحلة النهائية إعادة النتائج الأكثر صلة فقط للمستخدم.</p></li>
</ol>
<p>يتم التحكم في أداء <code translate="no">SCANN</code> من خلال معلمتين رئيسيتين تتيحان لك ضبط التوازن بين السرعة والدقة:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: يتحكم في ما إذا كان يتم تخزين بيانات المتجه الأصلية إلى جانب التمثيلات الكمية. يؤدي تمكين هذه المعلمة إلى تحسين الدقة أثناء إعادة الترتيب ولكنه يزيد من متطلبات التخزين.</p></li>
<li><p><code translate="no">reorder_k</code>: يحدد عدد المرشحين الذين يتم تنقيحهم أثناء مرحلة إعادة الترتيب النهائية. تعمل القيم الأعلى على تحسين الدقة ولكنها تزيد من زمن انتقال البحث.</p></li>
</ul>
<p>للحصول على إرشادات مفصلة حول تحسين هذه المعلمات لحالة الاستخدام الخاصة بك، راجع <a href="/docs/ar/scann.md#Index-params">بارامترات الفهرس</a>.</p>
<h2 id="Build-index" class="common-anchor-header">إنشاء فهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس <code translate="no">SCANN</code> على حقل متجه في ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> ومعلمات إضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة <code translate="no">COSINE</code> و <code translate="no">L2</code> و <code translate="no">IP</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: : خيارات التكوين الإضافية لبناء الفهرس.</p>
<ul>
<li><code translate="no">with_raw_data</code>: ما إذا كان سيتم تخزين بيانات المتجه الأصلية إلى جانب التمثيل الكمي.</li>
</ul>
<p>لمعرفة المزيد من معلمات البناء المتوفرة للفهرس <code translate="no">SCANN</code> ، راجع <a href="/docs/ar/scann.md#Index-building-params">بارامترات بناء الفهرس</a>.</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
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
<li><code translate="no">reorder_k</code>: عدد المرشحين المطلوب تنقيحهم أثناء مرحلة إعادة الترتيب.</li>
</ul>
<p>لمعرفة المزيد من معلمات البحث المتوفرة للفهرس <code translate="no">SCANN</code> ، راجع <a href="/docs/ar/scann.md#Index-specific-search-params">باراميات البحث الخاصة بالفهرس</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/scann.md#Build-index">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>عدد وحدات المجموعة</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>تزيد <em>القائمة النونية</em> الأعلى من كفاءة التقليم وعادةً ما تسرّع البحث الخشن، لكن يمكن أن تصبح الأقسام صغيرة جدًا، مما قد يقلل من التذكر؛ بينما تقوم <em>القائمة النونية</em> الأقل بمسح مجموعات أكبر، مما يحسن التذكر لكن يبطئ البحث.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>ما إذا كان سيتم تخزين بيانات المتجه الأصلية إلى جانب التمثيل الكمي. عند التمكين، يسمح هذا الأمر بإجراء حسابات تشابه أكثر دقة أثناء مرحلة إعادة الترتيب باستخدام المتجهات الأصلية بدلاً من التقديرات التقريبية المكمّمة.</p></td>
     <td><p><strong>النوع</strong>: منطقية</p><p><strong>النطاق</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>القيمة الافتراضية</strong>: <code translate="no">true</code></p></td>
     <td><p>تعيين إلى <code translate="no">true</code> للحصول على <strong>دقة بحث أعلى</strong> وعندما لا تكون مساحة التخزين مصدر قلق أساسي. تتيح بيانات المتجه الأصلية إجراء حسابات تشابه أكثر دقة أثناء إعادة الترتيب.</p><p>تم التعيين على <code translate="no">false</code> <strong>لتقليل النفقات العامة للتخزين</strong> واستخدام الذاكرة، خاصةً بالنسبة لمجموعات البيانات الكبيرة. ومع ذلك، قد يؤدي ذلك إلى دقة بحث أقل قليلاً لأن مرحلة إعادة الترتيب ستستخدم متجهات مكيفة.</p><p><strong>موصى به</strong>: استخدم <code translate="no">true</code> لتطبيقات الإنتاج حيث تكون الدقة أمرًا بالغ الأهمية.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/scann.md#Search-on-index">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>تتحكم في عدد المتجهات المرشحة التي يتم تنقيحها أثناء مرحلة إعادة الترتيب. تحدد هذه المعلمة عدد أفضل المتجهات المرشحة من مرحلتي التقسيم والتكميم الأولي التي يتم إعادة تقييمها باستخدام حسابات تشابه أكثر دقة.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [1، <em>int_max</em>]</p><p><strong>القيمة الافتراضية</strong>: لا يوجد</p></td>
     <td><p>يؤدي وجود <code translate="no">reorder_k</code> أكبر بشكل عام إلى <strong>دقة بحث أعلى</strong> حيث يتم النظر في المزيد من المرشحين خلال مرحلة التنقيح النهائية. ومع ذلك، يؤدي هذا أيضًا <strong>إلى زيادة وقت البحث</strong> بسبب العمليات الحسابية الإضافية.</p><p>ضع في اعتبارك زيادة <code translate="no">reorder_k</code> عندما يكون تحقيق استرجاع عالٍ أمرًا بالغ الأهمية وتكون سرعة البحث أقل أهمية. نقطة البداية الجيدة هي 2-5 أضعاف المطلوب <code translate="no">limit</code> (أعلى عدد من النتائج المطلوب إرجاعها).</p><p>ضع في اعتبارك تقليل <code translate="no">reorder_k</code> لإعطاء الأولوية لعمليات البحث الأسرع، خاصةً في السيناريوهات التي يكون فيها الانخفاض الطفيف في الدقة مقبولاً.</p><p>في معظم الحالات، نوصيك بتعيين قيمة ضمن هذا النطاق:<em>[الحد،</em> <em>الحد</em> * 5].</p></td>
   </tr>
</table>
