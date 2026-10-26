---
id: tune_consistency.md
title: مستوى الاتساق
summary: >-
  بصفتها قاعدة بيانات متجهة موزعة، توفر Milvus مستويات متعددة من الاتساق لضمان
  تمكن كل عقدة أو نسخة متماثلة من الوصول إلى نفس البيانات أثناء عمليات القراءة
  والكتابة. وتشمل مستويات الاتساق المدعومة حاليًا: «القوي» (Strong)، و«المحدود»
  (Bounded)، و«النهائي» (Eventually)، و«الجلسة» (Session)، حيث يُعد «المحدود»
  (Bounded) هو مستوى الاتساق الافتراضي المستخدم.
---
<h1 id="Consistency-Level" class="common-anchor-header">مستوى الاتساق<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>باعتبارها قاعدة بيانات متجهة موزعة، توفر Milvus مستويات متعددة من الاتساق لضمان أن تتمكن كل عقدة أو نسخة متماثلة من الوصول إلى نفس البيانات أثناء عمليات القراءة والكتابة. حاليًا، تشمل مستويات الاتساق المدعومة: <strong>"قوي" (Strong</strong>) و <strong>"محدود</strong>" ( <strong>Bounded</strong>) و <strong>"نهائي" (Eventually</strong>) و <strong>"الجلسة</strong>" ( <strong>Session</strong>)، مع كون <strong>"محدود" (Bounded)</strong> هو مستوى الاتساق الافتراضي المستخدم.</p>
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
    </button></h2><p>Milvus هو نظام يفصل بين التخزين والحساب. تقوم <strong>العقد المتدفقة</strong> بإلحاق جميع عمليات الكتابة بسجل الكتابة المسبقة (WAL) وتحتفظ <strong>بالبيانات المتزايدة</strong> — وهي البيانات التي لا تزال موجودة في سجل الكتابة المسبقة ولم يتم حفظها بعد. تقوم عملية الاستعادة بتحويل البيانات المتزايدة إلى <strong>بيانات تاريخية</strong> (شرائح مختومة تم حفظها في تخزين الكائنات مثل MinIO/S3)، والتي يتم تقديمها بواسطة <strong>«عقد الاستعلام» (Query Nodes</strong>). يتم استلام كل طلب بحث أو استعلام بواسطة <strong>«مفوض الاستعلام» (Query Delegator)</strong> على عقدة البث التي تستضيف سجل الكتابة المسبق (WAL) للمجموعة: يقوم المفوض بإنشاء خطة الاستعلام، وتنفيذ الجزء المتعلق بالبيانات المتزايدة محليًّا، وإعادة توجيه الجزء المتعلق بالبيانات التاريخية إلى عقد الاستعلام ذات الصلة، ودمج النتائج قبل إرجاعها. لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.6.x/streaming_service.md">خدمة البث (Streaming Service)</a>.</p>
<p>لضمان الاتساق، يخصص Milvus لكل رسالة طابعًا زمنيًا من نوع Timestamp Oracle (TSO) يحدد ترتيبها في سجل WAL، ويقوم بإدراج طوابع زمنية للمزامنة بشكل مستمر في سجل WAL جنبًا إلى جنب مع رسائل البيانات. عند استلام طابع زمني للمزامنة (syncTs)، يتم تسجيله باعتباره «ServiceTime»، مما يعني أن جميع البيانات السابقة لـ «ServiceTime» تكون مرئية للاستعلامات. استنادًا إلى «ServiceTime»، يوفر Milvus طوابع زمنية مضمونة (GuaranteeTs) لتلبية متطلبات المستخدمين المختلفة فيما يتعلق بالاتساق والتوافر. يمكن للمستخدمين إبلاغ المُفوِّض بضرورة تضمين البيانات التي تسبق نقطة زمنية محددة في نطاق البحث من خلال تحديد GuaranteeTs في طلبات البحث الخاصة بهم.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" /> 
   <span>وقت الخدمة ووقت الضمان</span>
  
 </span></p>
<p>كما هو موضح في الشكل أعلاه، إذا كان GuaranteeTs أقل من ServiceTime، فهذا يعني أن جميع البيانات التي تسبق النقطة الزمنية المحددة مرئية بالفعل، مما يسمح بتنفيذ البحث على الفور. وعندما يكون GuaranteeTs أكبر من ServiceTime، يجب أن ينتظر البحث حتى يتجاوز ServiceTime قيمة GuaranteeTs قبل أن يتم تنفيذه.</p>
<p>يتعين على المستخدمين إيجاد توازن بين دقة الاستعلام وزمن استجابة الاستعلام. إذا كانت متطلبات المستخدمين عالية فيما يتعلق بالاتساق ولم يكونوا حساسين تجاه زمن استجابة الاستعلام، فيمكنهم تعيين GuaranteeTs على أكبر قيمة ممكنة؛ أما إذا رغب المستخدمون في الحصول على نتائج البحث بسرعة وكانوا أكثر تسامحًا تجاه دقة الاستعلام، فيمكن تعيين GuaranteeTs على قيمة أصغر.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" /> 
   <span>توضيح مستوى الاتساق</span>
  
 </span></p>
<p>يوفر Milvus أربعة أنواع من مستويات الاتساق بقيم GuaranteeTs مختلفة.</p>
<ul>
<li><p><strong>قوي</strong></p>
<p>يُستخدم الطابع الزمني الأحدث كقيمة GuaranteeTs، ويجب أن ينتظر البحث حتى يفي ServiceTime بقيمة GuaranteeTs قبل التنفيذ.</p></li>
<li><p><strong>نهائي</strong></p>
<p>يتم تعيين GuaranteeTs على قيمة صغيرة للغاية، مثل 1، لتجنب عمليات التحقق من الاتساق بحيث يتم تنفيذ البحث فورًا على البيانات المرئية حاليًا.</p></li>
<li><p><strong>تقادم محدود</strong></p>
<p>يتم تعيين GuaranteeTs على نقطة زمنية أقدم من أحدث طابع زمني، بحيث يتم تنفيذ عملية البحث مع التسامح مع عدم ظهور بعض البيانات الحديثة بعد.</p></li>
<li><p><strong>الجلسة</strong></p>
<p>يتم استخدام أحدث نقطة زمنية يقوم فيها العميل بإدراج البيانات كقيمة GuaranteeTs، بحيث يمكن للعمليات البحثية تغطية جميع البيانات التي أدخلها العميل.</p></li>
</ul>
<p>يستخدم Milvus "تقادم محدود" كمستوى التناسق الافتراضي. إذا لم يتم تحديد GuaranteeTs، يتم استخدام أحدث ServiceTime كقيمة GuaranteeTs.</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">تعيين مستوى الاتساق<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تعيين مستويات اتساق مختلفة عند إنشاء مجموعة وكذلك عند إجراء عمليات البحث والاستعلامات.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">تعيين مستوى الاتساق عند إنشاء المجموعة<button data-href="#Set-Consistency-Level-upon-Creating-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>عند إنشاء مجموعة، يمكنك تعيين مستوى الاتساق لعمليات البحث والاستعلامات داخل المجموعة. يعيّن مثال الكود التالي مستوى الاتساق على <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.BOUNDED)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>القيم الممكنة للمعلمة « <code translate="no">consistency_level</code> » هي « <code translate="no">Strong</code> » و« <code translate="no">Bounded</code> » و« <code translate="no">Eventually</code> » و« <code translate="no">Session</code> ».</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">تعيين مستوى الاتساق في البحث<button data-href="#Set-Consistency-Level-in-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يعيّد مثال الكود التالي ضبط مستوى الاتساق إلى <strong>«Bounded</strong>». لا ينطبق التغيير إلا على طلب البحث الحالي.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>هذه المعلمة متاحة أيضًا في عمليات البحث المختلطة ومكرر البحث. القيم الممكنة لمعلمة « <code translate="no">consistency_level</code> » هي « <code translate="no">Strong</code> » و« <code translate="no">Bounded</code> » و« <code translate="no">Eventually</code> » و« <code translate="no">Session</code> ».</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">تعيين مستوى الاتساق في الاستعلام<button data-href="#Set-Consistency-Level-in-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يضبط مثال الكود التالي مستوى الاتساق على <strong>«في النهاية» (Eventually</strong>). ينطبق هذا الإعداد على طلب الاستعلام الحالي فقط.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>هذه المعلمة متاحة أيضًا في مكرر الاستعلام. القيم الممكنة لمعلمة « <code translate="no">consistency_level</code> » هي « <code translate="no">Strong</code> » و« <code translate="no">Bounded</code> » و« <code translate="no">Eventually</code> » و« <code translate="no">Session</code> ».</p>
