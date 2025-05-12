---
id: consistency.md
summary: تعرف على مستويات الاتساق الأربعة في ميلفوس.
title: الاتساق
---
<h1 id="Consistency-Level​" class="common-anchor-header">مستوى الاتساق<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>بصفتها قاعدة بيانات متجهة موزعة، تقدم Milvus مستويات متعددة من الاتساق لضمان أن كل عقدة أو نسخة متماثلة يمكنها الوصول إلى نفس البيانات أثناء عمليات القراءة والكتابة. وتتضمن مستويات الاتساق المدعومة حاليًا مستويات الاتساق <strong>القوية</strong> <strong>والمحدودة</strong> <strong>والنهائية</strong> <strong>والجلسة،</strong> مع كون المستوى <strong>المحدود</strong> هو المستوى الافتراضي للاتساق المستخدم.</p>
<h2 id="Overview​" class="common-anchor-header">نظرة عامة<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>ميلفوس هو نظام يفصل بين التخزين والحوسبة. في هذا النظام، تكون <strong>DataNodes</strong> مسؤولة عن ثبات البيانات وتخزينها في نهاية المطاف في تخزين الكائنات الموزعة مثل MinIO/S3. تتعامل <strong>QueryNodes</strong> مع المهام الحسابية مثل البحث. تتضمن هذه المهام معالجة كل من <strong>البيانات الدفعية</strong> <strong>والبيانات المتدفقة</strong>. ببساطة، يمكن فهم البيانات الدفعية على أنها البيانات التي تم تخزينها بالفعل في وحدة تخزين الكائنات بينما تشير البيانات المتدفقة إلى البيانات التي لم يتم تخزينها بعد في وحدة تخزين الكائنات. نظرًا لوقت استجابة الشبكة، غالبًا ما لا تحتفظ QueryNodes بأحدث بيانات التدفق. من دون ضمانات إضافية، قد يؤدي إجراء البحث مباشرةً على بيانات التدفق إلى فقدان العديد من نقاط البيانات غير الملتزم بها، مما يؤثر على دقة نتائج البحث.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>البيانات المجمّعة وبيانات التدفق</span> </span></p>
<p>كما هو موضح في الشكل أعلاه، يمكن أن تتلقى عقد الاستعلامات كلاً من بيانات الدفق والبيانات الدفعية في وقت واحد بعد تلقي طلب بحث. ومع ذلك، وبسبب زمن انتقال الشبكة، قد تكون بيانات التدفق التي تحصل عليها عقد الاستعلام غير مكتملة.</p>
<p>ولمعالجة هذه المشكلة، تقوم Milvus بوضع طوابع زمنية لكل سجل في قائمة انتظار البيانات وإدراج طوابع زمنية للمزامنة باستمرار في قائمة انتظار البيانات. كلما تم استلام طابع زمني للمزامنة (syncTs)، تقوم QueryNodes بتعيينه كوقت الخدمة، مما يعني أن QueryNodes يمكنها رؤية جميع البيانات قبل وقت الخدمة هذا. استنادًا إلى ServiceTime، يمكن لـ Milvus توفير طوابع زمنية مضمونة (GuaranteeTs) لتلبية متطلبات المستخدم المختلفة من حيث الاتساق والتوافر. يمكن للمستخدمين إبلاغ QueryNodes بالحاجة إلى تضمين البيانات قبل نقطة زمنية محددة في نطاق البحث من خلال تحديد GuaranteeTs في طلبات البحث الخاصة بهم.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>وقت الخدمة و GuaranteeTs</span> </span></p>
<p>كما هو موضح في الشكل أعلاه، إذا كان GuaranteeTs أقل من ServiceTime، فهذا يعني أن جميع البيانات قبل النقطة الزمنية المحددة قد تمت كتابتها بالكامل على القرص، مما يسمح ل QueryNodes بتنفيذ عملية البحث على الفور. عندما يكون GuaranteeTs أكبر من ServiceTime، يجب أن تنتظر عقد الاستعلام حتى يتجاوز وقت الخدمة GuaranteeTs قبل أن تتمكن من تنفيذ عملية البحث.</p>
<p>يحتاج المستخدمون إلى إجراء مفاضلة بين دقة الاستعلام وزمن الاستعلام. إذا كان المستخدمون لديهم متطلبات اتساق عالية وليس لديهم حساسية تجاه زمن انتقال الاستعلام، فيمكنهم تعيين GuaranteeTs إلى قيمة كبيرة قدر الإمكان؛ إذا كان المستخدمون يرغبون في تلقي نتائج البحث بسرعة ويتحملون دقة الاستعلام، فيمكن تعيين GuaranteeTs إلى قيمة أصغر.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>توضيح مستويات الاتساق</span> </span></p>
<p>يوفّر ميلفوس أربعة أنواع من مستويات الاتساق مع مستويات ضمانات مختلفة.</p>
<ul>
<li><p><strong>قوي</strong></p>
<p>يتم استخدام أحدث طابع زمني كـ GuaranteeTs، ويتعين على عقد الاستعلام الانتظار حتى يفي وقت الخدمة بـ GuaranteeTs قبل تنفيذ طلبات البحث.</p></li>
<li><p><strong>نهائي</strong></p>
<p>يتم تعيين GuaranteeTs على قيمة صغيرة للغاية، مثل 1، لتجنب عمليات التحقق من الاتساق بحيث يمكن ل QueryNodes تنفيذ طلبات البحث على الفور على جميع البيانات الدفعية.</p></li>
<li><p><strong>محدود</strong>(افتراضي)</p>
<p>يتم تعيين GuranteeTs إلى نقطة زمنية أقدم من الطابع الزمني الأخير لجعل QueryNodes تنفذ عمليات البحث مع تحمل فقدان بيانات معينة.</p></li>
<li><p><strong>الجلسة</strong></p>
<p>يتم استخدام آخر نقطة زمنية يقوم فيها العميل بإدراج البيانات كـ GuaranteeTs بحيث يمكن لـ QueryNodes إجراء عمليات بحث على جميع البيانات التي أدرجها العميل.</p></li>
</ul>
<p>يستخدم ميلفوس مستوى الثبات المحدود كمستوى الاتساق الافتراضي. إذا تُرك مستوى الضمانة غير محدد، يتم استخدام أحدث وقت خدمة كمستوى ضمانة.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">تعيين مستوى الاتساق<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تعيين مستويات اتساق مختلفة عند إنشاء مجموعة وكذلك إجراء عمليات بحث واستعلامات.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">تعيين مستوى الاتساق عند إنشاء مجموعة</h3><p>عند إنشاء مجموعة، يمكنك تعيين مستوى الاتساق لعمليات البحث والاستعلامات داخل المجموعة. يقوم المثال البرمجي التالي بتعيين مستوى الاتساق إلى <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">تعيين مستوى الاتساق في البحث</h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يقوم مثال التعليمات البرمجية التالي بتعيين مستوى الاتساق إلى المستوى المحدود. ينطبق التغيير فقط على طلب البحث الحالي.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>هذه المعلمة متاحة أيضًا في عمليات البحث المختلطة ومكرر البحث. القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">تعيين مستوى الاتساق في الاستعلام</h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يقوم مثال التعليمات البرمجية التالي بتعيين مستوى الاتساق إلى <strong>النهاية</strong>. ينطبق الإعداد فقط على طلب الاستعلام الحالي.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>تتوفر هذه المعلمة أيضًا في مكرر الاستعلام. القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
