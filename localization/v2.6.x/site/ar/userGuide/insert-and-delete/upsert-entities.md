---
id: upsert-entities.md
title: إدراج الكيانات
summary: توفر عملية upsert طريقة ملائمة لإدراج أو تحديث الكيانات في مجموعة.
---
<h1 id="Upsert-Entities" class="common-anchor-header">إدراج الكيانات<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>توفر العملية <code translate="no">upsert</code> طريقة ملائمة لإدراج أو تحديث الكيانات في مجموعة.</p>
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
    </button></h2><p>يمكنك استخدام <code translate="no">upsert</code> إما لإدراج كيان جديد أو تحديث كيان موجود، اعتمادًا على ما إذا كان المفتاح الأساسي المقدم في طلب الإدراج موجودًا في المجموعة. إذا لم يتم العثور على المفتاح الأساسي، تحدث عملية إدراج. خلاف ذلك، سيتم إجراء عملية تحديث.</p>
<p>يعمل الإدراج في Milvus إما في وضع <strong>التجاوز</strong> أو <strong>الدمج</strong>.</p>
<h3 id="Upsert-in-override-mode" class="common-anchor-header">إدراج في وضع التجاوز<button data-href="#Upsert-in-override-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>يجمع طلب upsert الذي يعمل في وضع التجاوز بين الإدراج والحذف. عندما يتم استلام طلب <code translate="no">upsert</code> لكيان موجود، يقوم Milvus بإدراج البيانات الموجودة في حمولة الطلب وحذف الكيان الموجود مع المفتاح الأساسي الأصلي المحدد في البيانات في نفس الوقت.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/upsert-in-override-mode.png" alt="Upsert In Override Mode" class="doc-image" id="upsert-in-override-mode" />
   </span> <span class="img-wrapper"> <span>الإدراج في وضع التجاوز</span> </span></p>
<p>إذا تم تمكين <code translate="no">autoid</code> في المجموعة المستهدفة على الحقل الأساسي الخاص بها، فسيقوم Milvus بإنشاء مفتاح أساسي جديد للبيانات المنقولة في حمولة الطلب قبل إدراجها.</p>
<p>بالنسبة للحقول التي تم تمكين <code translate="no">nullable</code> ، يمكنك حذفها في طلب <code translate="no">upsert</code> إذا كانت لا تتطلب أي تحديثات.</p>
<h3 id="Upsert-in-merge-mode--Milvus-v262+" class="common-anchor-header">الإدراج في وضع الدمج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك أيضًا استخدام العلامة <code translate="no">partial_update</code> لجعل طلب الإضافة يعمل في وضع الدمج. يتيح لك ذلك تضمين الحقول التي تحتاج إلى تحديث فقط في حمولة الطلب.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/upsert-in-merge-mode.png" alt="Upsert In Merge Mode" class="doc-image" id="upsert-in-merge-mode" />
   </span> <span class="img-wrapper"> <span>Upsert في وضع الدمج</span> </span></p>
<p>لإجراء عملية دمج، قم بتعيين <code translate="no">partial_update</code> إلى <code translate="no">True</code> في طلب <code translate="no">upsert</code> مع المفتاح الأساسي والحقول المراد تحديثها بقيمها الجديدة.</p>
<p>عند تلقي مثل هذا الطلب، يقوم Milvus بإجراء استعلام بتناسق قوي لاسترداد الكيان، وتحديث قيم الحقول بناءً على البيانات الواردة في الطلب، وإدراج البيانات المعدلة، ثم حذف الكيان الحالي مع المفتاح الأساسي الأصلي المحمول في الطلب.</p>
<h3 id="Upsert-behaviors-special-notes" class="common-anchor-header">سلوكيات الإدراج: ملاحظات خاصة<button data-href="#Upsert-behaviors-special-notes" class="anchor-icon" translate="no">
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
    </button></h3><p>هناك العديد من الملاحظات الخاصة التي يجب مراعاتها قبل استخدام ميزة الدمج. تفترض الحالات التالية أن لديك مجموعة تحتوي على حقلين قياسيين باسم <code translate="no">title</code> و <code translate="no">issue</code> ، إلى جانب مفتاح أساسي <code translate="no">id</code> وحقل متجه يسمى <code translate="no">vector</code>.</p>
<ul>
<li><p><strong>حقول Upsert مع</strong> <strong>تمكين</strong> <code translate="no">nullable</code> <strong>.</strong></p>
<p>افترض أن الحقل <code translate="no">issue</code> يمكن أن يكون فارغًا. عندما تقوم بإدراج هذه الحقول، لاحظ ذلك:</p>
<ul>
<li><p>إذا قمت بحذف الحقل <code translate="no">issue</code> في الطلب <code translate="no">upsert</code> وتعطيل <code translate="no">partial_update</code> ، فسيتم تحديث الحقل <code translate="no">issue</code> إلى <code translate="no">null</code> بدلاً من الاحتفاظ بقيمته الأصلية.</p></li>
<li><p>للحفاظ على القيمة الأصلية للحقل <code translate="no">issue</code> ، تحتاج إما إلى تمكين <code translate="no">partial_update</code> وحذف الحقل <code translate="no">issue</code> أو تضمين الحقل <code translate="no">issue</code> بقيمته الأصلية في الطلب <code translate="no">upsert</code>.</p></li>
</ul></li>
<li><p><strong>رفع المفاتيح في الحقل الديناميكي</strong>.</p>
<p>لنفترض أنك قمت بتمكين المفتاح الديناميكي في مجموعة الأمثلة، وكانت أزواج المفاتيح-القيم في الحقل الديناميكي لكيان ما مشابهة لـ <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>.</p>
<p>عند إعادة إدراج الكيان بمفاتيح، مثل <code translate="no">author</code> أو <code translate="no">year</code> أو أو <code translate="no">tags</code> أو إضافة مفاتيح أخرى، لاحظ ذلك:</p>
<ul>
<li><p>إذا قمت بإعادة إدراج مع تعطيل <code translate="no">partial_update</code> ، فإن السلوك الافتراضي هو <strong>التجاوز</strong>. وهذا يعني أن قيمة الحقل الديناميكي سيتم تجاوزها من قبل جميع الحقول غير المعرفة من قبل المخطط المدرجة في الطلب وقيمها.</p>
<p>على سبيل المثال، إذا كانت البيانات المضمنة في الطلب هي <code translate="no">{&quot;author&quot;: &quot;Jane&quot;, &quot;genre&quot;: &quot;fantasy&quot;}</code> ، فسيتم تحديث أزواج المفاتيح-القيم في الحقل الديناميكي للكيان الهدف إلى ذلك.</p></li>
<li><p>إذا قمت بالإدراج مع تمكين <code translate="no">partial_update</code> ، فإن السلوك الافتراضي هو <strong>الدمج</strong>. ويعني ذلك أن قيمة الحقل الديناميكي سيتم دمجها مع جميع الحقول غير المحددة في النموذج المضمنة في الطلب وقيمها.</p>
<p>على سبيل المثال، إذا كانت البيانات المضمنة في الطلب هي <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code> ، ستصبح أزواج المفاتيح-القيم في الحقل الديناميكي للكيان الهدف <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;], &quot;genre&quot;: &quot;fantasy&quot;}</code> بعد عملية الإضافة.</p></li>
</ul></li>
<li><p><strong>إعادة إدراج حقل JSON.</strong></p>
<p>لنفترض أن مجموعة الأمثلة تحتوي على حقل JSON معرّف من قبل المخطط اسمه <code translate="no">extras</code> ، وأزواج القيمة الرئيسية في حقل JSON هذا في كيان ما مشابهة لـ <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>.</p>
<p>عندما تقوم بإدراج الحقل <code translate="no">extras</code> الخاص بكيان ما ببيانات JSON المعدلة، لاحظ أنه يتم التعامل مع حقل JSON ككل، ولا يمكنك تحديث المفاتيح الفردية بشكل انتقائي. وبعبارة أخرى، <strong>لا</strong> يدعم حقل JSON عملية الإدراج في وضع <strong>الدمج</strong>.</p></li>
</ul>
<h3 id="Limits--Restrictions" class="common-anchor-header">الحدود والقيود<button data-href="#Limits--Restrictions" class="anchor-icon" translate="no">
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
    </button></h3><p>بناءً على المحتوى أعلاه، هناك العديد من الحدود والقيود التي يجب اتباعها:</p>
<ul>
<li><p>يجب أن يتضمن طلب <code translate="no">upsert</code> دائمًا المفاتيح الأساسية للكيانات المستهدفة.</p></li>
<li><p>يجب أن تكون المجموعة المستهدفة محملة ومتاحة للاستعلامات.</p></li>
<li><p>يجب أن تكون جميع الحقول المحددة في الطلب موجودة في مخطط المجموعة المستهدفة.</p></li>
<li><p>يجب أن تتطابق قيم جميع الحقول المحددة في الطلب مع أنواع البيانات المحددة في المخطط.</p></li>
<li><p>بالنسبة لأي حقل مشتق من حقل آخر باستخدام الدوال، سيقوم ميلفوس بإزالة الحقل المشتق أثناء عملية إعادة الإدراج للسماح بإعادة الحساب.</p></li>
</ul>
<h2 id="Upsert-entities-in-a-collection" class="common-anchor-header">إعادة إدراج الكيانات في مجموعة<button data-href="#Upsert-entities-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنقوم بإدراج الكيانات في مجموعة تسمى <code translate="no">my_collection</code>. تحتوي هذه المجموعة على حقلين فقط باسم <code translate="no">id</code> و <code translate="no">vector</code> و <code translate="no">title</code> و <code translate="no">issue</code>. الحقل <code translate="no">id</code> هو الحقل الأساسي، بينما الحقلان <code translate="no">title</code> و <code translate="no">issue</code> هما حقلان قياسيان.</p>
<p>سيتم تجاوز الكيانات الثلاثة، إذا كانت موجودة في المجموعة، من قبل تلك التي يتضمنها طلب الإدراج.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.19&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \&quot;title\&quot;: \&quot;Artificial Intelligence in Real Life\&quot;, \&quot;issue\&quot;: \&quot;\vol.12\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \&quot;title\&quot;: \&quot;Hollow Man\&quot;, \&quot;issue\&quot;: \&quot;vol.19\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \&quot;title\&quot;: \&quot;Treasure Hunt in Missouri\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.19&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

titleColumn := column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
})

issueColumn := column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.12&quot;</span>, <span class="hljs-string">&quot;vol.19&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;vector&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], &quot;title&quot;: &quot;Artificial Intelligence in Real Life&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], &quot;title&quot;: &quot;Hollow Man&quot;, &quot;issue&quot;: &quot;vol.19&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], &quot;title&quot;: &quot;Treasure Hunt in Missouri&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-a-partition" class="common-anchor-header">إدراج الكيانات في قسم<button data-href="#Upsert-entities-in-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك أيضًا إدراج كيانات في قسم محدد. تفترض مقتطفات الشيفرة التالية أن لديك قسمًا باسم <strong>PartitionA</strong> في مجموعتك.</p>
<p>سيتم تجاوز الكيانات الثلاثة، إذا كانت موجودة في القسم، من قبل الكيانات المضمنة في الطلب.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.34&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.2&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    },
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \&quot;title\&quot;: \&quot;Layour Design Reference\&quot;, \&quot;issue\&quot;: \&quot;vol.34\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \&quot;title\&quot;: \&quot;Doraemon and His Friends\&quot;, \&quot;issue\&quot;: \&quot;vol.2\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \&quot;title\&quot;: \&quot;Pikkachu and Pokemon\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.34&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.2&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">titleColumn = column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.34&quot;</span>, <span class="hljs-string">&quot;vol.2&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>, 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartition(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 10, &quot;vector&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], &quot;title&quot;: &quot;Layour Design Reference&quot;, &quot;issue&quot;: &quot;vol.34&quot;},
        {&quot;id&quot;: 11, &quot;vector&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], &quot;title&quot;: &quot;Doraemon and His Friends&quot;, &quot;issue&quot;: &quot;vol.2&quot;},
        {&quot;id&quot;: 12, &quot;vector&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], &quot;title&quot;: &quot;Pikkachu and Pokemon&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             10,</span>
<span class="hljs-comment">#             11,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-merge-mode--Milvus-v262+" class="common-anchor-header">إدراج الكيانات في وضع الدمج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-entities-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضّح المثال البرمجي التالي كيفية رفع إدراج الكيانات مع تحديثات جزئية. قم بتوفير الحقول التي تحتاج إلى تحديثات وقيمها الجديدة فقط، بالإضافة إلى علامة التحديث الجزئي الصريحة.</p>
<p>في المثال التالي، سيتم تحديث الحقل <code translate="no">issue</code> الخاص بالكيانات المحددة في طلب التحديث إلى القيم المضمنة في الطلب.</p>
<div class="alert note">
<p>عند تنفيذ عملية إعادة إدراج في وضع الدمج، تأكد من أن الكيانات المتضمنة في الطلب لها نفس مجموعة الحقول. لنفترض أن هناك كيانين أو أكثر سيتم إدراجها، كما هو موضح في مقتطف الشيفرة التالي، من المهم أن تتضمن حقولًا متطابقة لمنع الأخطاء والحفاظ على تكامل البيانات.</p>
</div>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">نودجيس</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partial_update=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.14&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Arrays.asList(row1, row2))
        .partialUpdate(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pkColumn := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.17&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    data,
    <span class="hljs-attr">partial_update</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;my_collection&quot;</span>
<span class="hljs-built_in">export</span> UPSERT_DATA=<span class="hljs-string">&#x27;[
  {
    &quot;id&quot;: 1,
    &quot;issue&quot;: &quot;vol.14&quot;
  },
  {
    &quot;id&quot;: 2,
    &quot;issue&quot;: &quot;vol.7&quot;
  }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/upsert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">${UPSERT_DATA}</span>,
    \&quot;partialUpdate\&quot;: true
  }&quot;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 2,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#              3,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
