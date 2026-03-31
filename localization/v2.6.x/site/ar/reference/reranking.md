---
id: reranking.md
summary: >-
  يغطي هذا الموضوع عملية إعادة الترتيب، مع شرح أهميتها وتنفيذ طريقتين لإعادة
  الترتيب.
title: إعادة الترتيب
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
    </button></h1><p>يتيح Milvus إمكانات البحث المختلط باستخدام واجهة برمجة التطبيقات <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a> ، التي تتضمن استراتيجيات إعادة ترتيب متطورة لتحسين نتائج البحث من مثيلات <code translate="no">AnnSearchRequest</code> متعددة. يغطي هذا الموضوع عملية إعادة التصنيف، ويشرح أهميتها وتنفيذ استراتيجيات إعادة التصنيف المختلفة في ملفوس.</p>
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
    </button></h2><p>يوضح الشكل التالي تنفيذ البحث الهجين في ملفوس ويبرز دور إعادة الترتيب في العملية.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>تُعد إعادة الترتيب في البحث الهجين خطوة حاسمة تدمج النتائج من عدة حقول متجهة، مما يضمن أن يكون الناتج النهائي ملائمًا ومحدد الأولويات بدقة. يقدم ميلفوس حاليًا استراتيجيات إعادة الترتيب هذه:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: يدمج هذا النهج النتائج عن طريق حساب متوسط مرجح للنتائج (أو مسافات المتجهات) من عمليات بحث متجهات مختلفة. ويقوم بتعيين أوزان بناءً على أهمية كل حقل متجه.</p></li>
<li><p><code translate="no">RRFRanker</code>: تجمع هذه الاستراتيجية بين النتائج بناءً على رتبها عبر أعمدة المتجهات المختلفة.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">الدرجات المرجحة (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>تقوم إستراتيجية <code translate="no">WeightedRanker</code> بتعيين أوزان مختلفة للنتائج من كل مسار استرجاع متجه بناءً على أهمية كل حقل متجه. يتم تطبيق استراتيجية إعادة الترتيب هذه عندما تختلف أهمية كل حقل متجه، مما يسمح لك بالتركيز على حقول متجهات معينة على غيرها من خلال تعيين أوزان أعلى لها. على سبيل المثال، في بحث متعدد الوسائط، يمكن اعتبار الوصف النصي أكثر أهمية من توزيع الألوان في الصور.</p>
<p>تتم العملية الأساسية لـ WeightedRanker على النحو التالي:</p>
<ul>
<li><p><strong>جمع الدرجات أثناء الاسترجاع</strong>: جمع النتائج ودرجاتها من مسارات استرجاع المتجهات المختلفة.</p></li>
<li><p><strong>تطبيع النتائج</strong>: تطبيع الدرجات من كل مسار إلى نطاق [0،1]، حيث تشير القيم الأقرب إلى 1 إلى أهمية أعلى. يعد هذا التطبيع أمرًا بالغ الأهمية نظرًا لاختلاف توزيعات الدرجات باختلاف أنواع المقاييس. على سبيل المثال، تتراوح المسافة الخاصة ببروتوكول الإنترنت من [- ∞، + ∞]، بينما تتراوح المسافة الخاصة بـ L2 من [0، + ∞]. يستخدم ميلفوس الدالة <code translate="no">arctan</code> ، ويحول القيم إلى النطاق [0،1] لتوفير أساس موحد لأنواع المقاييس المختلفة.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>تخصيص الوزن</strong>: تعيين وزن <code translate="no">w𝑖</code> لكل مسار استرجاع المتجهات. يقوم المستخدمون بتحديد الأوزان التي تعكس موثوقية مصدر البيانات أو دقته أو المقاييس الأخرى ذات الصلة. يتراوح كل وزن من [0،1].</p></li>
<li><p><strong>دمج النقاط</strong>: حساب متوسط مرجح للدرجات الموزونة لاشتقاق الدرجة النهائية. يتم بعد ذلك ترتيب النتائج بناءً على هذه الدرجات من الأعلى إلى الأدنى لتوليد النتائج النهائية المصنفة.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>الموزون الموزون الموزون</span> </span></p>
<p>لاستخدام هذه الإستراتيجية، قم بتطبيق مثيل <code translate="no">WeightedRanker</code> وقم بتعيين قيم الترجيح عن طريق تمرير عدد متغير من الوسيطات الرقمية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن:</p>
<ul>
<li><p>تتراوح كل قيمة ترجيحية من 0 (الأقل أهمية) إلى 1 (الأكثر أهمية)، مما يؤثر على النتيجة المجمعة النهائية.</p></li>
<li><p>يجب أن يكون العدد الإجمالي لقيم الترجيح المقدمة في <code translate="no">WeightedRanker</code> مساويًا لعدد مثيلات <code translate="no">AnnSearchRequest</code> التي قمت بإنشائها سابقًا.</p></li>
<li><p>تجدر الإشارة إلى أنه نظرًا لاختلاف قياسات أنواع المقاييس المختلفة، فإننا نقوم بتطبيع مسافات نتائج الاستدعاء بحيث تقع في الفترة [0،1]، حيث يعني الرقم 0 اختلافًا و1 تشابهًا. ستكون النتيجة النهائية هي مجموع قيم الترجيح والمسافات.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">دمج الرتب المتبادلة (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRRF هي طريقة دمج البيانات التي تجمع بين قوائم الترتيب بناءً على مقلوب رتبها. إنها طريقة فعالة لموازنة تأثير كل حقل متجه، خاصةً عندما لا يكون هناك أسبقية واضحة للأهمية. تُستخدم هذه الاستراتيجية عادةً عندما ترغب في إعطاء اعتبار متساوٍ لجميع الحقول المتجهة أو عندما يكون هناك عدم يقين بشأن الأهمية النسبية لكل حقل.</p>
<p>وتتم العملية الأساسية لـ RRF على النحو التالي:</p>
<ul>
<li><p><strong>جمع التصنيفات أثناء الاسترجاع</strong>: تقوم المسترجعات عبر حقول متجهات متعددة باسترجاع النتائج وفرزها.</p></li>
<li><p><strong>دمج الرتب</strong>: تقوم خوارزمية RRF بموازنة ودمج الرتب من كل مسترجع. الصيغة كالتالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>RRF-ranker</span> </span></p>
<p>هنا، ع يمثل عدد مسارات الاسترجاع المختلفة، ورتبة ت(ف) هي موضع رتبة المستند المسترجع ف بواسطة المسترجع ت، وك هو معامل تنعيم، وعادةً ما يتم تعيينه إلى 60.</p></li>
<li><p><strong>الترتيب الشامل</strong>: إعادة ترتيب النتائج المسترجعة بناءً على الدرجات المجمعة للحصول على النتائج النهائية.</p></li>
</ul>
<p>لاستخدام هذه الاستراتيجية، قم بتطبيق مثيل <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>يسمح RRRF بموازنة التأثير عبر الحقول دون تحديد أوزان صريحة. سيتم إعطاء الأولوية لأفضل التطابقات المتفق عليها من قبل الحقول المتعددة في الترتيب النهائي.</p>
