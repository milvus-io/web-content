---
id: weighted-ranker.md
title: مصنف مرجح
summary: >-
  يجمع المُصنِّف الموزون بذكاء بين النتائج من مسارات بحث متعددة ويحدد أولوياتها
  من خلال تعيين أوزان أهمية مختلفة لكل منها. على غرار الطريقة التي يوازن بها
  الطاهي الماهر بين مكونات متعددة لإعداد الطبق المثالي، يوازن برنامج التصنيف
  المرجح بين نتائج البحث المختلفة لتقديم النتائج المجمعة الأكثر صلة. هذا النهج
  مثالي عند البحث عبر عدة حقول أو طرائق متجهة حيث يجب أن تساهم بعض الحقول في
  الترتيب النهائي بشكل أكبر من غيرها.
---
<h1 id="Weighted-Ranker" class="common-anchor-header">مصنف مرجح<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>يجمع المُصنِّف الموزون بين النتائج من مسارات بحث متعددة ويحدد أولوياتها بذكاء من خلال تعيين أوزان أهمية مختلفة لكل منها. على غرار الطريقة التي يوازن بها الطاهي الماهر بين مكونات متعددة لإعداد الطبق المثالي، يوازن مُصنِّف التصنيف الموزون بين نتائج البحث المختلفة لتقديم النتائج المجمعة الأكثر صلة. هذا النهج مثالي عند البحث عبر عدة حقول أو طرائق متجهة حيث يجب أن تساهم بعض الحقول في الترتيب النهائي بشكل أكبر من غيرها.</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">متى تستخدم أداة التصنيف المرجحة<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>تم تصميم أداة التصنيف المرجحة خصيصًا لسيناريوهات البحث المختلطة حيث تحتاج إلى دمج النتائج من مسارات بحث متجهة متعددة. وهو فعال بشكل خاص لـ</p>
<table>
   <tr>
     <th><p>حالة الاستخدام</p></th>
     <th><p>مثال</p></th>
     <th><p>لماذا يعمل المصنف المرجح بشكل جيد</p></th>
   </tr>
   <tr>
     <td><p>بحث التجارة الإلكترونية</p></td>
     <td><p>البحث عن المنتج الذي يجمع بين تشابه الصورة والوصف النصي</p></td>
     <td><p>يسمح لبائعي التجزئة بإعطاء الأولوية للتشابه المرئي لعناصر الموضة مع التركيز على الأوصاف النصية للمنتجات التقنية</p></td>
   </tr>
   <tr>
     <td><p>البحث عن محتوى الوسائط</p></td>
     <td><p>استرجاع الفيديو باستخدام كل من الميزات المرئية والنصوص الصوتية</p></td>
     <td><p>يوازن بين أهمية المحتوى المرئي وأهمية الحوار المنطوق بناءً على هدف الاستعلام</p></td>
   </tr>
   <tr>
     <td><p>استرجاع المستندات</p></td>
     <td><p>البحث عن المستندات المؤسسية مع تضمينات متعددة لأقسام مختلفة</p></td>
     <td><p>يعطي وزناً أكبر للعنوان والملخصات المضمنة مع مراعاة تضمينات النص الكامل</p></td>
   </tr>
</table>
<p>إذا كان تطبيق البحث المختلط الخاص بك يتطلب الجمع بين مسارات بحث متعددة مع التحكم في أهميتها النسبية، فإن مصنف الموزون هو خيارك المثالي.</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">آلية المصنف المرجح<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>سير العمل الرئيسي لإستراتيجية المُصنِّف الموزون على النحو التالي:</p>
<ol>
<li><p><strong>جمع نتائج البحث</strong>: جمع النتائج والنتائج من كل مسار بحث متجه (النتيجة_1، النتيجة_2).</p></li>
<li><p><strong>تطبيع النتيجة</strong>: قد يستخدم كل بحث مقاييس تشابه مختلفة، مما ينتج عنه توزيعات درجات متنوعة. على سبيل المثال، يمكن أن يؤدي استخدام الضرب الداخلي (IP) كنوع تشابه إلى درجات تتراوح بين [- ∞، + ∞]، بينما يؤدي استخدام المسافة الإقليدية (L2) إلى درجات تتراوح بين [0، + ∞]. نظرًا لأن نطاقات الدرجات من عمليات البحث المختلفة تختلف ولا يمكن مقارنتها مباشرة، فمن الضروري تطبيع الدرجات من كل مسار بحث. عادة، يتم تطبيق دالة <code translate="no">arctan</code> لتحويل الدرجات إلى نطاق بين [0، 1] (الدرجة_1_مطبعة، الدرجة_2_مطبع). تشير الدرجات الأقرب إلى 1 إلى تشابه أعلى.</p></li>
<li><p><strong>تعيين الأوزان</strong>: بناءً على الأهمية المعطاة لمجالات المتجهات المختلفة، يتم تخصيص أوزان<strong>(wi</strong>) للدرجات المعيارية (الدرجة_1_المعيارية، الدرجة_2_المعيارية). يجب أن تتراوح أوزان كل مسار بين [0،1]. الدرجات المرجحة الناتجة هي الدرجة_1_ المرجحة والدرجة_2_ المرجحة.</p></li>
<li><p><strong>دمج الدرجات</strong>: يتم ترتيب الدرجات الموزونة (الدرجة_1_ المرجحة والدرجة_2_ المرجحة) من الأعلى إلى الأقل لإنتاج مجموعة نهائية من الدرجات (الدرجة_النهائية).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>المصنف الموزون</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">مثال على مصنف مرجح<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضّح هذا المثال بحثًا هجينًا متعدد الوسائط (topK=5) يتضمن صورًا ونصوصًا ويوضح كيف تقوم استراتيجية المُصنّف المرجّح بإعادة ترتيب النتائج من عمليتي بحث في الشبكة العصبية الاصطناعية.</p>
<ul>
<li><p>نتائج بحث الشبكة العصبية الاصطناعية على الصور （topK=5)：</p>
<p><table>
<tr>
<th><p><strong>المعرف</strong></p></th>
<th><p><strong>النتيجة (الصورة)</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.92</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0.88</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0.85</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.83</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.8</p></td>
</tr>
</table></p></li>
<li><p>نتائج بحث الشبكة العصبية الاصطناعية على النصوص （topK=5)：</p>
<p><table>
<tr>
<th><p><strong>المعرف</strong></p></th>
<th><p><strong>النتيجة (نص)</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.91</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.87</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>0.85</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.82</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>0.78</p></td>
</tr>
</table></p></li>
<li><p>استخدم WeightedRanker لتعيين أوزان لنتائج البحث عن الصور والنصوص. لنفترض أن وزن البحث في الصورة ANN هو 0.6 ووزن البحث في النص هو 0.4.</p>
<p><table>
<tr>
<th><p><strong>المعرف</strong></p></th>
<th><p><strong>النتيجة (صورة)</strong></p></th>
<th><p><strong>النتيجة (النص)</strong></p></th>
<th><p><strong>النتيجة المرجحة</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0.92</p></td>
<td><p>0.87</p></td>
<td><p>0.6×0.92+0.4×0.87=0.90</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0.88</p></td>
<td><p>غير متاح</p></td>
<td><p>0.6×0.88+0.4×0=0.528</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0.85</p></td>
<td><p>غير متاح</p></td>
<td><p>0.6×0.85+0.4×0=0.51</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0.83</p></td>
<td><p>0.91</p></td>
<td><p>0.6×0.83+0.4×0.91=0.86</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0.80</p></td>
<td><p>0.82</p></td>
<td><p>0.6×0.80+0.4×0.82=0.81</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>غير موجود في الصورة</p></td>
<td><p>0.85</p></td>
<td><p>0.6×0+0.4×0.85=0.34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>غير موجود في الصورة</p></td>
<td><p>0.78</p></td>
<td><p>0.6×0+0.4×0.78=0.312</p></td>
</tr>
</table></p></li>
<li><p>النتائج النهائية بعد إعادة الترتيب （توب ك = 5)：النتائج النهائية بعد إعادة الترتيب</p>
<p><table>
<tr>
<th><p><strong>الرتبة</strong></p></th>
<th><p><strong>المعرف</strong></p></th>
<th><p><strong>النتيجة النهائية</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0.90</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0.86</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0.81</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0.528</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0.51</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">استخدام مصنف الرتب المرجحة<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>عند استخدام إستراتيجية المُصنِّف المرجِّح، من الضروري إدخال قيم الترجيح. يجب أن يتوافق عدد قيم الترجيح التي يجب إدخالها مع عدد طلبات البحث الأساسية للشبكة العصبية الاصطناعية في البحث الهجين. يجب أن تقع قيم الوزن الترجيحي للإدخال في نطاق [0،1]، حيث تشير القيم الأقرب إلى 1 إلى أهمية أكبر.</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">إنشاء مرتبة مرجحة<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>على سبيل المثال، لنفترض أن هناك طلبين أساسيين للبحث في البحث الهجين: البحث النصي والبحث عن الصور. إذا كان البحث النصي يعتبر أكثر أهمية، فيجب أن يتم تعيين وزن أكبر له.</p>
<div class="alert note">
<p>يتيح لك Milvus 2.6.x والإصدارات الأحدث تكوين استراتيجيات إعادة الترتيب مباشرةً عبر واجهة برمجة التطبيقات <code translate="no">Function</code>. إذا كنت تستخدم إصدارًا سابقًا (قبل الإصدار 2.6.0)، فارجع إلى وثائق <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">إعادة الترتيب</a> للحصول على تعليمات الإعداد.</p>
</div>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;strategy&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;params&quot;</span>, <span class="hljs-string">&quot;{\&quot;weights\&quot;: [0.1, 0.6], \&quot;norm_score\&quot;: true}&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>هل هي مطلوبة؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة/مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>المعرف الفريد لهذه الوظيفة</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قائمة بالحقول المتجهة المراد تطبيق الدالة عليها (يجب أن تكون فارغة لمصنف مرجح)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>نوع الدالة المراد استدعاؤها؛ استخدم <code translate="no">RERANK</code> لتحديد استراتيجية إعادة الترتيب</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد طريقة إعادة الترتيب المراد استخدامها.</p><p>يجب ضبطها على <code translate="no">weighted</code> لاستخدام طريقة إعادة الترتيب المرجحة.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>نعم</p></td>
     <td><p>مصفوفة من الأوزان المقابلة لكل مسار بحث؛ القيم ∈ [0،1].</p><p>لمزيد من التفاصيل، راجع <a href="/docs/ar/weighted-ranker.md#Mechanism-of-Weighted-Ranker">آلية مصنف الترجيح</a>.</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>لا</p></td>
     <td><p>ما إذا كان سيتم تطبيع الدرجات الأولية (باستخدام الأكتان) قبل الترجيح.</p><p>لمزيد من التفاصيل، ارجع إلى <a href="/docs/ar/weighted-ranker.md#Mechanism-of-Weighted-Ranker">آلية المصنف المرجح</a>.</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">تنطبق على البحث المختلط<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>تم تصميم أداة التصنيف المرجحة خصيصًا لعمليات البحث المختلط التي تجمع بين عدة حقول متجهة. عند إجراء بحث مختلط، يجب تحديد الأوزان لكل مسار بحث:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;\&quot;modern dining table\&quot;&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());
        
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
    <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
    <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  output_fields = [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات عن البحث الهجين، راجع <a href="/docs/ar/multi-vector-search.md">البحث الهجين متعدد المتجهات</a>.</p>
