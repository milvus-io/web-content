---
id: membership-match.md
title: التوافق بين الأعضاءCompatible with Milvus v3.0.2+
summary: >-
  تصفية الكيانات استنادًا إلى مجموعات كبيرة من الأعضاء باستخدام مرشحات بلوم
  المدمجة أو خرائط البتات الصاخبة الدقيقة، مع مراعاة قواعد الصياغة وأنماط طلبات
  SDK ودلالات الحذف والحدود التشغيلية.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">التوافق بين الأعضاء<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم مرشح مطابقة العضوية بتصفية الكيانات عن طريق اختبار ما إذا كانت قيمة الحقل القياسي تنتمي إلى مجموعة مقدمة من قبل المستدعي. يقوم العميل بإنشاء كتلة ثنائية مدمجة لمرشح العضوية ويمررها كقيمة قالب تعبير.</p>
<p>وهي تحل محل قوائم " <code translate="no">IN [...]</code> " الكبيرة. يقوم مرشح " <code translate="no">IN</code> " بتسلسل كل عضو في الطلب، لذا يمكن أن تتجاوز مجموعات الأعضاء الكبيرة بما يكفي حد الاستلام الخاص بـ gRPC للوكيل. باستخدام " <code translate="no">membership_match</code>"، يقوم الوكيل بالتحقق من صحة الكتلة وتضمينها في خطة الاستعلام دون إعادة إنشاء قائمة الأعضاء.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>سير عمل مطابقة العضوية: يقوم العميل بإنشاء blob قابل لإعادة الاستخدام، ويقوم الوكيل بالتحقق من صحته، وتقوم QueryNodes بتقييمه.</span>
  
 </span></p>
<p>يوضح الرسم البياني تقسيم العمل الثابت. يقوم العميل بإنشاء الكتلة مرة واحدة وإعادة استخدامها عبر الطلبات؛ ويقوم الوكيل بالتحقق من صحة حدود الغلاف والحجم ويدمج الكتلة في خطة الاستعلام حرفياً؛ وتقوم QueryNodes بتقييم الخطة مقابل البيانات الأولية أو الفهرس.</p>
<p>يحتوي المشغل على نوعين من الترميز مع ضمانات صحة مختلفة:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): عضوية تقريبية. من الممكن حدوث نتائج إيجابية خاطئة؛ ولا يُتوقع حدوث نتائج سلبية خاطئة من مرشح صالح. الاستخدام النموذجي: مرشحات الجمهور ذات الحجم الكبير أو مرشحات الاستبعاد حيث تكون النتائج الإيجابية الخاطئة العرضية مقبولة.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): عضوية دقيقة للقيم الصحيحة. الاستخدام النموذجي: قوائم التحكم في الوصول (ACL)، ورؤية المستأجرين، وفلاتر الامتثال، وعمليات الحذف حسب مجموعة المعرفات.</li>
</ul>
<p>لا تستخدم عضوية <strong>بلوم</strong> لاتخاذ قرارات التفويض أو عمليات الحذف المدمرة. قد تؤدي نتيجة إيجابية خاطئة إلى كشف كيان أو حذف كيان غير موجود في المجموعة المقصودة.</p>
<h3 id="Operational-checklist" class="common-anchor-header">قائمة مراجعة تشغيلية<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
<li>تأكد من نوع الحقل المستهدف وقم بإنشاء blob من نفس مجال القيم هذا.</li>
<li>اختر «بلوم» فقط عندما تكون النتائج الإيجابية الخاطئة مقبولة.</li>
<li>اختر Roaring لقوائم التحكم في الوصول (ACL)، والامتثال، وعزل المستأجرين، وعمليات الحذف.</li>
<li>قم بإنشاء blobs كبيرة مرة واحدة وأعد استخدامها؛ لا تقم بإعادة إنشائها داخل كل طلب.</li>
<li>حدد حجم الكتلة (blob) بالبايتات المتسلسلة، وليس بعدد العناصر المكونة لها.</li>
<li>في الكتلة ذات الإصدارات المختلطة، أكمل الترقية التدريجية، بالبدء بالوكلاء أولاً، قبل تمكين " <code translate="no">membership_match</code>".</li>
<li>اختبر التعبير على مجموعة غير إنتاجية قبل تمكين سير عمل تدميري.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">بناء جملة التعبير<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>الحجة الثانية هي عنصر نائب في القالب. توفر حزمة SDK قيمة العنصر النائب كملف protobuf <code translate="no">bytes</code> الذي يحتوي على كتلة التصفية التي أنشأها العميل. اجعل <code translate="no">type</code> صريحًا في تعبيرات الإنتاج حتى يكون عقد الصحة المقصود مرئيًا في الكود والسجلات.</p>
<p>الحجة <code translate="no">type</code> اختيارية. كل blob يحمل رأسًا سحريًا ذاتي الوصف، <code translate="no">MBF1</code> لـ Bloom و <code translate="no">MRB1</code> لـ Roaring، ويقوم الخادم باستكشاف الرأس عند حذف <code translate="no">type</code>. يتم رفض <code translate="no">type</code> الصريح الذي يتعارض مع رأس blob كخطأ في الطلب، وتؤدي الرؤوس غير المعروفة أو المقطوعة إلى حالة فشل مغلقة.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">اختر الترميز<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم «بلوم» (Bloom) عندما تكون النتائج الإيجابية الخاطئة مقبولة. يقبل «بلوم» الحقول الصحيحة الموقعة (<strong>INT8/16/32/64</strong>)، وحقول <strong>VARCHAR،</strong> ومسارات <strong>JSON</strong>. مرشح «بلوم» ليس قائمة سماح دقيقة.</p>
<p><code translate="no">fpr</code> (معدل الإيجابيات الكاذبة) هو احتمال أن يبلغ مرشح Bloom عن قيمة ما على أنها عضو في حين أن القيمة لم تُدرج مطلقًا: <code translate="no">fpr=0.005</code> يعني تقريبًا أن قيمة واحدة غير عضو من بين كل 200 قيمة يتم الإبلاغ عنها خطأً على أنها موجودة. يؤدي معدل إيجابيات كاذبة (fpr) أقل إلى إنتاج blob أكبر.</p>
<p>استخدم <strong>Roaring</strong> عندما يجب أن تكون كل مطابقة دقيقة. يقبل <strong>Roaring</strong> الحقول الصحيحة الموقعة فقط؛ يتم تمديد إشارة العناصر إلى <strong>INT64</strong> قبل التسلسل، لذا فإن INT8 -1 وINT64 -1 هما نفس العنصر. لا تستخدمه مع UUID أو حقول السلاسل الأخرى.</p>
<table>
<thead>
<tr><th>البعد</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>الدقة</td><td>تقريبي؛ احتمال وجود نتائج إيجابية خاطئة؛ لا توجد نتائج سلبية خاطئة</td><td>دقيق؛ لا توجد نتائج إيجابية خاطئة ولا نتائج سلبية خاطئة</td></tr>
<tr><td>الحقول</td><td>INT8/16/32/64، VARCHAR، مسارات JSON</td><td>INT8/16/32/64 الموقّعة فقط</td></tr>
<tr><td>حجم blob</td><td>عدد العناصر ومعدل الخطأ الإيجابي (FPR)؛ حوالي 11 بت لكل عنصر عند معدل خطأ إيجابي (FPR) يبلغ 0.005؛ هيكل على شكل قوة اثنين</td><td>توزيع القيم؛ يتم ضغط المجموعات الكثيفة إلى أحجام أصغر بكثير؛ تصل القيم العشوائية ذات 64 بت إلى الحد الأقصى للحاوية البالغ 262,144</td></tr>
<tr><td>الحذف</td><td>مرفوض في وقت التحليل</td><td>مسموح</td></tr>
<tr><td>الاستخدام النموذجي</td><td>مرشحات الجمهور والاستبعاد</td><td>قائمة التحكم في الوصول (ACL)، الامتثال، عزل المستأجر، الحذف حسب مجموعة المعرفات</td></tr>
</tbody>
</table>
<p>مسارات<strong>JSON</strong> مكتوبة بشكل صارم، صفًا بصف: يتم فحص سلسلة <strong>JSON</strong> كقيمة <strong>VARCHAR</strong> ، والعدد الصحيح <strong>في JSON</strong> كقيمة <strong>INT64</strong> ، ولا يتطابق عدد مزدوج <strong>في JSON</strong> أبدًا مع عنصر عدد صحيح، على عكس <code translate="no">IN</code> الدقيق، حيث 5.0 يساوي 5. إذا كان المبرمجون يقومون بترميز الأعداد الصحيحة بتنسيق عائم، فقم بتوحيدها عند الكتابة أو استخدم حقلًا عدديًا محدد النوع.</p>
<p>في كلتا الحالتين، قم ببناء مجموعة العناصر من نفس مجال القيم الخاص بالحقل الهدف. لا تقم بإنشاء مرشح بلوم (Bloom filter) من السلسلة <code translate="no">&quot;10086&quot;</code> وتطبيقه على حقل <code translate="no">INT64</code>. يسجل رأس الكتلة (blob) مجالات القيم التي تم إدراجها، ويتم رفض الكتلة ذات المجال الخاطئ من قبل الوكيل (proxy) مع ظهور خطأ في المعلمة بدلاً من عدم المطابقة بصمت. أعد استخدام الكتلة التي تم إنشاؤها عبر الطلبات بدلاً من إعادة إنشائها لكل استعلام.</p>
<p>بالنسبة للمجموعات التي تضم بضعة آلاف من العناصر أو أقل، يظل الترميز العادي <code translate="no">IN</code> هو الخيار الأبسط. لا يختار الخادم بين <strong>IN</strong> <strong>وBloom</strong> <strong>وRoaring</strong>. تقع مسؤولية اختيار الترميز على عاتق المستدعي.</p>
<p>لاختيار الترميز:</p>
<ol>
<li>حدد ما إذا كان عبء العمل يتحمل النتائج الإيجابية الخاطئة. إذا لم يكن الأمر كذلك، فلا يُعد <strong>Bloom</strong> خيارًا أبدًا.</li>
<li>للتحديد الدقيق للعضوية، استخدم <strong>Roaring</strong> مع حقل عدد صحيح موقّع. يتم ضغط القيم الكثيفة أو المجمعة إلى أصغر blobs.</li>
<li>تحقق من حدود الحجم. قد تتجاوز القيم العشوائية الموحدة ذات 64 بت الحد الأقصى للحاوية البالغ 262,144 أو حدود الحجم. إذا حدث ذلك، فاستخدم قائمة <strong>IN</strong> تقليدية تتناسب مع حدود الطلب.</li>
<li>للحصول على عضوية دقيقة في الحقول غير الصحيحة، استخدم <strong>IN</strong>. لا يوجد ترميز عضوية دقيق لهذه الحقول.</li>
</ol>
<p>مطابقة العضوية غير متاحة عبر واجهة برمجة التطبيقات (API) RESTful HTTP. تقبل معلمات قوالب تعبيرات HTTP القيم من نوع bool و number و string و array فقط؛ ولا يوجد نوع ثنائي <code translate="no">bytes</code> للكتلة (blob). استخدم SDK قائمًا على gRPC لتمرير كتل العضوية.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">أنماط طلبات SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>تركز المقتطفات التالية على إنشاء blobs للعضوية وتمريرها كمعلمات لقوالب التصفية. وتفترض هذه المقتطفات أن المجموعات والحقول موجودة بالفعل وتم تحميلها، وأن عملاء SDK متصلون، وأن متجهات الاستعلام وقوائم الأعضاء والمتغيرات المرجعية الأخرى محددة. تم حذف إعداد المجموعة والهيكل الأساسي الكامل للتطبيق.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">الحذف باستخدام Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم كتلة <strong>Roaring</strong> دقيقة عند حذف الكيانات المحددة بواسطة مجموعة معرّفات صحيحة خارجية. راجع مجموعة الأعضاء ونوع حقل المجموعة قبل إصدار أمر الحذف. لا تستخدم Bloom: فالعضوية التقريبية ليست مسند حذف آمن، ويتم رفض أشكال Bloom في تعبيرات الحذف عند وقت التحليل.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>تتبع دلالات الحذف مطابقة دقيقة ثلاثية القيم:</p>
<table>
<thead>
<tr><th>قيمة الحقل</th><th>membership_match(…)</th><th>ليس membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>لا توجد مطابقة (NULL)</td><td>لا توجد مطابقة (NULL)</td></tr>
<tr><td>في مجموعة الأعضاء</td><td>تطابق</td><td>لا توجد مطابقة</td></tr>
<tr><td>خارج المجموعة</td><td>لا توجد مطابقة</td><td>تطابق</td></tr>
</tbody>
</table>
<p>يُقرأ الجدول صفًا بصف: تعمل عملية الحذف باستخدام <code translate="no">membership_match</code> على إزالة الكيانات الموجودة داخل المجموعة، بينما تعمل عملية الحذف باستخدام <code translate="no">not membership_match</code> على إزالة الكيانات الموجودة خارج المجموعة، وتبقى الكيانات ذات القيمة NULL في كلتا الحالتين.</p>
<ul>
<li>لا يتم حذف الكيانات ذات قيمة الحقل NULL أبدًا، في أي من الحالتين.</li>
<li>لا تحذف الصورة النقطية الفارغة أي شيء. يحذف " <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> " كل كيان يحتوي على قيمة حقل غير NULL، وهو المكمل الدقيق، والذي قد يكون مجموعة كبيرة حسب التصميم.</li>
<li><code translate="no">not membership_match</code> هو المكمل الدقيق لمجموعة الأعضاء على الكيانات التي تحتوي على قيم حقول غير NULL، وليس تقريبًا.</li>
</ul>
<p>في المقاطع المختومة التي يتم تحميلها على أساس الفهرس فقط، دون بيانات سكالارية خام، يستخدم التقييم بحثًا عكسيًا محدودًا عندما يدعم الفهرس ذلك. وعندما لا تتوفر بيانات الحقول الخام ولا الفهرس المؤهل، يفشل الطلب باستخدام " <code translate="no">FieldNotLoaded</code> " بدلاً من إرجاع الكيانات غير المفلترة.</p>
<h2 id="Operational-limits" class="common-anchor-header">القيود التشغيلية<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>الإعداد</th><th>الافتراضي</th><th>قابل للتكوين</th><th>ما الذي يحدّه</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 ميغابايت</td><td><code translate="no">milvus.yaml</code> الوكيل</td><td>نص واحد من نوع blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 ميغابايت</td><td><code translate="no">milvus.yaml</code> الوكيل</td><td>المجموع لكل طلب</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 ميغابايت</td><td><code translate="no">milvus.yaml</code> الوكيل</td><td>الطلب بأكمله</td></tr>
<tr><td>الحد الأقصى لعدد الحاويات المرتفع</td><td>262,144</td><td>ثابت في الكود</td><td>لكل مرشح</td></tr>
<tr><td>تقدير الذاكرة المفككة في Roaring</td><td>64 ميغابايت</td><td>ثابت في الكود</td><td>لكل مرشح</td></tr>
<tr><td>حد تنسيق MBF1</td><td>128 ميغابايت</td><td>ثابت في الكود</td><td>الحد الأقصى لتنسيق blob</td></tr>
<tr><td>بلوم <code translate="no">fpr</code></td><td>0.005</td><td>منشئ العميل</td><td>هدف الإيجابية الكاذبة</td></tr>
</tbody>
</table>
<p>إعدادات " <code translate="no">proxy.*</code> " هي إعدادات خادم Milvus: يتم تعيينها بواسطة مشغل المجموعة في <code translate="no">milvus.yaml</code> ضمن قسم " <code translate="no">proxy</code> " ولا يمكن تعديلها لكل طلب أو لكل تعبير في وقت التصفية. يتم تحديد معدل القبول <strong>Roaring</strong> وسقف تنسيق MBF1 في التنفيذ ولا يمكن تكوينهما في أي مكان. يُعد صف " <code translate="no">fpr</code> " هو عنصر التحكم الوحيد من جانب العميل: يتم اختياره عند إنشاء الكتلة، مع نطاق مقبول يتراوح من 0.0001 إلى 0.05.</p>
<p>يستوعب نص الكتلة كحد أقصى حوالي 48.6 مليون عضو من نوع INT64 عند معدل fpr الافتراضي، مع السماح برأس مغلف ثابت بحجم 32 بايت في الأعلى. تغطي الميزانية على مستوى الطلب الحجم التسلسلي الإجمالي للخطط التي تحتوي على عناصر العضوية بالإضافة إلى الحجم التقديري الإجمالي بعد فك التشفير لمرشحات Roaring، وتشترك فيها الطلبات الفرعية لـ HybridSearch ومرشحات التقييم. تكون أجسام بلوم قوى اثنين: فعدد العناصر الذي يتجاوز حدود المستوى بقليل يضاعف حجم الكتلة، وغالبًا ما يتناسب معدل fpr الأعلى قليلاً مع المستوى الأدنى التالي. عندما يرفض الوكيل كتلة بلوم كبيرة الحجم، يقترح الخطأ قيمة « <code translate="no">fpr</code> » مناسبة.</p>
<ul>
<li>لا يتم تخزين نتائج تعبير العضوية مؤقتًا عبر الطلبات.</li>
<li>تفشل المجموعات ذات الإصدارات المختلطة في الإغلاق: ترفض عقد الاستعلام (QueryNodes) التي تعمل برمز قديم الخطط التي تحتوي على عقد خطة العضوية. قم بترقية الوكلاء أولاً، ثم أكمل الترقية التدريجية قبل تمكين المشغل.</li>
<li>تقوم سجلات الخادم بحجب بايتات الكتلة. يحتوي نص التعبير على اسم القالب فقط؛ ويتم إرسال الحمولة الثنائية خارج النطاق في قيم القالب.</li>
</ul>
