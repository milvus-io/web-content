---
id: reranking.md
title: إعادة الترتيب
summary: >-
  يحقق البحث المختلط نتائج بحث أكثر دقة من خلال عمليات بحث متعددة ومتزامنة في آن
  واحد. تُرجع عمليات البحث المتعددة عدة مجموعات من النتائج، والتي تتطلب
  استراتيجية إعادة ترتيب للمساعدة في دمج النتائج وإعادة ترتيبها وإرجاع مجموعة
  واحدة من النتائج. سيعرض هذا الدليل استراتيجيات إعادة الترتيب التي يدعمها
  ميلفوس ويقدم نصائح لاختيار استراتيجية إعادة الترتيب المناسبة.
---
<h1 id="Reranking" class="common-anchor-header">إعادة الترتيب<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>يحقق البحث المختلط نتائج بحث أكثر دقة من خلال عمليات بحث متعددة ومتزامنة في آن واحد. تُرجع عمليات البحث المتعددة عدة مجموعات من النتائج، والتي تتطلب استراتيجية إعادة ترتيب للمساعدة في دمج النتائج وإعادة ترتيبها وإرجاع مجموعة واحدة من النتائج. سيعرض هذا الدليل استراتيجيات إعادة الترتيب التي يدعمها ميلفوس ويقدم نصائح لاختيار استراتيجية إعادة الترتيب المناسبة.</p>
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
    </button></h2><p>يوضح الرسم البياني التالي سير العمل الرئيسي لإجراء بحث هجين في تطبيق بحث متعدد الوسائط . في الرسم البياني، أحد المسارين هو البحث الأساسي للشبكة العصبية الاصطناعية على النصوص والمسار الآخر هو البحث الأساسي للشبكة العصبية الاصطناعية على الصور. يُنشئ كل مسار مجموعة من النتائج بناءً على درجة تشابه النص والصورة على التوالي<strong>(الحد 1</strong> <strong>والحد 2</strong>). ثم يتم تطبيق إستراتيجية إعادة الترتيب لإعادة ترتيب مجموعتين من النتائج بناءً على معيار موحد، وفي النهاية دمج مجموعتي النتائج في مجموعة نهائية من نتائج البحث، <strong>الحد (النهائي)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>إعادة تصنيف متعدد المتجهات</span> </span></p>
<p>في البحث الهجين، تُعد إعادة الترتيب خطوة حاسمة تدمج النتائج من عمليات بحث متعددة المتجهات لضمان أن يكون الناتج النهائي هو الأكثر صلة ودقة. يدعم ميلفوس حاليًا استراتيجيتي إعادة الترتيب التاليتين:</p>
<ul>
<li><p><strong><a href="/docs/ar/reranking.md#WeightedRanker">إعادة الترتيب المرجحة</a></strong>: تدمج هذه الاستراتيجية النتائج عن طريق حساب درجة مرجحة للنتائج (أو المسافات) من عمليات بحث متجهات مختلفة. يتم تعيين الأوزان بناءً على أهمية كل حقل متجه، مما يسمح بالتخصيص وفقًا لأولويات حالة استخدام محددة.</p></li>
<li><p><strong><a href="/docs/ar/reranking.md#RRFRanker">RRFRanker</a> (مصنف دمج الرتب المتبادل)</strong>: تجمع هذه الاستراتيجية بين النتائج بناءً على الترتيب. وهي تستخدم طريقة توازن بين رتب النتائج من عمليات بحث مختلفة، مما يؤدي غالبًا إلى دمج أكثر إنصافًا وفعالية لأنواع أو طرائق بيانات متنوعة.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">المُصنِّف الموزون<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>تقوم استراتيجية WeightedRanker المرجحة بتخصيص أوزان مختلفة لنتائج كل مسار من مسارات البحث المتجه بناءً على أهميتها.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">آلية عمل المُصنِّف الموزون الموزون</h3><p>سير العمل الرئيسي لاستراتيجية WeightedRanker الموزونة هو كما يلي:</p>
<ol>
<li><p><strong>جمع نتائج البحث</strong>: جمع النتائج والنتائج من كل مسار من مسارات البحث المتجه (النتيجة_1، النتيجة_2).</p></li>
<li><p><strong>تطبيع الدرجات</strong>: قد يستخدم كل بحث مقاييس تشابه مختلفة، مما ينتج عنه توزيعات درجات متنوعة. على سبيل المثال، يمكن أن يؤدي استخدام الضرب الداخلي (IP) كنوع تشابه إلى درجات تتراوح بين [- ∞، + ∞]، بينما يؤدي استخدام المسافة الإقليدية (L2) إلى درجات تتراوح بين [0، + ∞]. نظرًا لأن نطاقات الدرجات من عمليات البحث المختلفة تختلف ولا يمكن مقارنتها مباشرة، فمن الضروري تطبيع الدرجات من كل مسار بحث. عادة، يتم تطبيق دالة <code translate="no">arctan</code> لتحويل الدرجات إلى نطاق بين [0، 1] (الدرجة_1_مطبعة، الدرجة_2_مطبع). تشير الدرجات الأقرب إلى 1 إلى تشابه أعلى.</p></li>
<li><p><strong>تعيين الأوزان</strong>: استنادًا إلى الأهمية المعينة لحقول المتجهات المختلفة، يتم تخصيص أوزان<strong>(wi</strong>) للدرجات المعيارية (الدرجة_1_المعيارية، الدرجة_2_المعيارية). يجب أن تتراوح أوزان كل مسار بين [0،1]. الدرجات المرجحة الناتجة هي الدرجة_1_ المرجحة والدرجة_2_ المرجحة.</p></li>
<li><p><strong>دمج الدرجات</strong>: يتم ترتيب الدرجات الموزونة (الدرجة_1_ المرجحة والدرجة_2_ المرجحة) من الأعلى إلى الأقل لإنتاج مجموعة نهائية من الدرجات (الدرجة_النهائية).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>أداة إعادة التصنيف المرجحة</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">مثال على أداة إعادة التصنيف المرجحة</h3><p>يوضّح هذا المثال بحثًا هجينًا متعدد الوسائط (topK=5) يتضمن صورًا ونصوصًا ويوضح كيف تقوم استراتيجية إعادة الترتيب المرجحة بإعادة ترتيب النتائج من عمليتي بحث في الشبكة العصبية الاصطناعية.</p>
<ul>
<li>نتائج بحث الشبكة العصبية الاصطناعية على الصور （topK=5)：</li>
</ul>
<table>
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
</table>
<ul>
<li>نتائج بحث الشبكة العصبية الاصطناعية على النصوص （topK=5)：</li>
</ul>
<table>
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
</table>
<ul>
<li>استخدم WeightedRanker لتعيين أوزان لنتائج البحث عن الصور والنصوص. لنفترض أن وزن البحث في الصورة ANN هو 0.6 ووزن البحث في النص هو 0.4.</li>
</ul>
<table>
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
</table>
<ul>
<li>النتائج النهائية بعد إعادة الترتيب （توب ك = 5)：النتائج النهائية بعد إعادة الترتيب</li>
</ul>
<table>
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
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">استخدام أداة الترجيح</h3><p>عند استخدام استراتيجية WeightedRanker، من الضروري إدخال قيم الترجيح. يجب أن يتوافق عدد قيم الترجيح التي يجب إدخالها مع عدد طلبات البحث الأساسية للشبكة العصبية الاصطناعية في البحث الهجين. يجب أن تقع قيم الترجيح المدخلة في نطاق [0،1]، حيث تشير القيم الأقرب إلى 1 إلى أهمية أكبر.</p>
<p>على سبيل المثال، لنفترض أن هناك طلبين أساسيين للبحث في البحث الهجين: البحث النصي والبحث عن الصور. إذا اعتُبر البحث النصي أكثر أهمية، فينبغي تعيين وزن أكبر له.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جو جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>دمج الرتب المتبادل (RRF) هو طريقة دمج البيانات التي تجمع بين القوائم المرتبة بناءً على مقلوب ترتيبها. توازن استراتيجية إعادة الترتيب هذه بشكل فعال بين أهمية كل مسار من مسارات البحث المتجه.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">آلية عمل RRFRanker</h3><p>سير العمل الرئيسي لاستراتيجية RRFRanker على النحو التالي:</p>
<ol>
<li><p><strong>جمع تصنيفات البحث</strong>: جمع تصنيفات النتائج من كل مسار من مسارات البحث المتجه (الرتبة_1، الرتبة_2).</p></li>
<li><p><strong>دمج التصنيفات</strong>: تحويل التصنيفات من كل مسار (rank_rf_1، rank_rf_rf_2) وفقًا لصيغة .</p>
<p>تتضمن الصيغة الحسابية <em>N،</em> والتي تمثل عدد عمليات الاسترجاع. <em>راندي</em><em>(د</em>) هو موضع ترتيب المستند <em>(د)</em> الناتج عن المسترجع <em>i(th)</em>. <em>k</em> هو معامل تنعيم يتم تعيينه عادةً عند 60.</p></li>
<li><p><strong>الترتيب الإجمالي</strong>: إعادة تصنيف نتائج البحث بناءً على التصنيفات المجمعة لإنتاج النتائج النهائية.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>مُعيد تصنيف RRRF</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">مثال على RRRFRanker</h3><p>يوضّح هذا المثال بحثًا هجينًا (topK=5) على متجهات متناثرة وكثيفة ويوضح كيفية إعادة ترتيب استراتيجية RRFRanker للنتائج من عمليتي بحث في الشبكة العصبية الاصطناعية.</p>
<ul>
<li>نتائج بحث ANN على متجهات متناثرة من النصوص （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>المعرف</strong></p></th>
     <th><p><strong>الترتيب (متناثر)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>نتائج بحث الشبكة العصبية الاصطناعية على متجهات كثيفة من النصوص （topK = 5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>المعرف</strong></p></th>
     <th><p><strong>الرتبة (كثيفة)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>استخدم RRF لإعادة ترتيب ترتيب مجموعتي نتائج البحث. افترض أن معلمة التنعيم <code translate="no">k</code> مضبوطة على 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>المعرف</strong></p></th>
     <th><p><strong>النتيجة (متناثرة)</strong></p></th>
     <th><p><strong>النتيجة (كثيفة)</strong></p></th>
     <th><p><strong>النتيجة النهائية</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>غير متاح</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>غير متاح</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>غير متاح</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>غير متاح</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>النتائج النهائية بعد إعادة الترتيب （توبك=5)：النتائج النهائية بعد إعادة الترتيب</li>
</ul>
<table>
   <tr>
     <th><p><strong>الرتبة</strong></p></th>
     <th><p><strong>المعرف</strong></p></th>
     <th><p><strong>النتيجة النهائية</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">استخدام RRFRFRanker</h3><p>عند استخدام استراتيجية إعادة ترتيب RRRF، تحتاج إلى تكوين المعلمة <code translate="no">k</code>. وهي معلمة تنعيم يمكن أن تغير بشكل فعال الأوزان النسبية للبحث عن النص الكامل مقابل البحث المتجه. القيمة الافتراضية لهذه المعلمة هي 60، ويمكن ضبطها ضمن نطاق (0، 16384). يجب أن تكون القيمة أرقام فاصلة عائمة. القيمة الموصى بها هي بين [10، 100]. في حين أن <code translate="no">k=60</code> هو خيار شائع، إلا أن القيمة المثلى <code translate="no">k</code> يمكن أن تختلف بناءً على تطبيقاتك ومجموعات البيانات الخاصة بك. نوصي باختبار هذه المعلمة وتعديلها بناءً على حالة الاستخدام الخاصة بك لتحقيق أفضل أداء.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جو جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">حدد استراتيجية إعادة الترتيب الصحيحة<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>عند اختيار استراتيجية إعادة الترتيب، من الأمور التي يجب أخذها في الاعتبار ما إذا كان هناك أي تركيز على بحث واحد أو أكثر من البحث الأساسي لشبكة ANN على حقول المتجهات.</p>
<ul>
<li><p><strong>مرجِّح الرتبة</strong>: يوصى بهذه الاستراتيجية إذا كنت تريد أن تركز النتائج على حقل متجه معين. تسمح لك أداة WeightedRanker المرجحة بتعيين أوزان أعلى لحقول متجهة معينة، والتركيز عليها بشكل أكبر. على سبيل المثال، في عمليات البحث متعدد الوسائط، يمكن اعتبار الأوصاف النصية لصورة ما أكثر أهمية من الألوان في هذه الصورة.</p></li>
<li><p><strong>RRFRanker (مصنف دمج الرتب المتبادل)</strong>: يوصى بهذه الاستراتيجية عندما لا يكون هناك تركيز محدد. يمكن لـ RRRF موازنة أهمية كل حقل متجه بشكل فعال.</p></li>
</ul>
