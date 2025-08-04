---
id: tune_consistency.md
title: مستوى الاتساق
summary: >-
  كقاعدة بيانات متجهة موزعة، تقدم Milvus مستويات متعددة من الاتساق لضمان أن كل
  عقدة أو نسخة متماثلة يمكنها الوصول إلى نفس البيانات أثناء عمليات القراءة
  والكتابة. تتضمن مستويات الاتساق المدعومة حاليًا مستويات الاتساق القوية
  والمحدودة والنهائية والجلسة، مع كون المستوى المحدود هو المستوى الافتراضي
  للاتساق المستخدم.
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
    </button></h1><p>كقاعدة بيانات متجهة موزعة، تقدم Milvus مستويات متعددة من الاتساق لضمان أن كل عقدة أو نسخة متماثلة يمكنها الوصول إلى نفس البيانات أثناء عمليات القراءة والكتابة. وتتضمن مستويات الاتساق المدعومة حاليًا مستويات الاتساق <strong>القوية</strong> <strong>والمحدودة</strong> <strong>والنهائية</strong> <strong>والجلسة،</strong> مع كون المستوى <strong>المحدود</strong> هو المستوى الافتراضي للاتساق المستخدم.</p>
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
    </button></h2><p>ميلفوس هو نظام يفصل بين التخزين والحوسبة. في هذا النظام، تكون <strong>DataNodes</strong> مسؤولة عن ثبات البيانات وتخزينها في نهاية المطاف في تخزين الكائنات الموزعة مثل MinIO/S3. تتعامل <strong>QueryNodes</strong> مع المهام الحسابية مثل البحث. تتضمن هذه المهام معالجة كل من <strong>البيانات الدفعية</strong> <strong>والبيانات المتدفقة</strong>. ببساطة، يمكن فهم البيانات الدفعية على أنها البيانات التي تم تخزينها بالفعل في وحدة تخزين الكائنات بينما تشير البيانات المتدفقة إلى البيانات التي لم يتم تخزينها بعد في وحدة تخزين الكائنات. نظرًا لوقت استجابة الشبكة، غالبًا ما لا تحتفظ QueryNodes بأحدث بيانات التدفق. وبدون ضمانات إضافية، قد يؤدي إجراء البحث مباشرةً على بيانات التدفق إلى فقدان العديد من نقاط البيانات غير الملتزم بها، مما يؤثر على دقة نتائج البحث.</p>
<p>الإصدار التجاري من ميلفوس هو نظام يفصل بين التخزين والحوسبة. في هذا النظام، تكون عقد البيانات DataNodes مسؤولة عن ثبات البيانات وتخزينها في نهاية المطاف في تخزين كائنات موزعة مثل MinIO/S3. تتعامل QueryNodes مع المهام الحسابية مثل البحث. تتضمن هذه المهام معالجة كل من البيانات الدفعية والبيانات المتدفقة. ببساطة، يمكن فهم البيانات الدفعية على أنها البيانات التي تم تخزينها بالفعل في وحدة تخزين الكائنات، بينما تشير البيانات المتدفقة إلى البيانات التي لم يتم تخزينها بعد في وحدة تخزين الكائنات. نظرًا لوقت استجابة الشبكة، غالبًا ما لا تحتفظ QueryNodes بأحدث بيانات التدفق. من دون ضمانات إضافية، قد يؤدي إجراء البحث مباشرةً على بيانات التدفق إلى فقدان العديد من نقاط البيانات غير الملتزم بها، مما يؤثر على دقة نتائج البحث.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/batch-data-and-streaming-data.png" alt="Batch Data And Streaming Data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>البيانات المجمّعة وبيانات التدفق</span> </span></p>
<p>كما هو موضح في الشكل أعلاه، يمكن أن تتلقى عقد الاستعلامات كلاً من بيانات الدفق والبيانات الدفعية في وقت واحد بعد تلقي طلب بحث. ومع ذلك، بسبب زمن انتقال الشبكة، قد تكون بيانات التدفق التي تحصل عليها عقد الاستعلام غير مكتملة.</p>
<p>ولمعالجة هذه المشكلة، تقوم Milvus بوضع طوابع زمنية لكل سجل في قائمة انتظار البيانات وإدراج طوابع زمنية للمزامنة باستمرار في قائمة انتظار البيانات. كلما تم استلام طابع زمني للمزامنة (syncTs)، تقوم QueryNodes بتعيينه كوقت الخدمة، مما يعني أن QueryNodes يمكنها رؤية جميع البيانات قبل وقت الخدمة هذا. استنادًا إلى ServiceTime، يمكن لـ Milvus توفير طوابع زمنية مضمونة (GuaranteeTs) لتلبية متطلبات المستخدم المختلفة من حيث الاتساق والتوافر. يمكن للمستخدمين إبلاغ QueryNodes بالحاجة إلى تضمين البيانات قبل نقطة زمنية محددة في نطاق البحث عن طريق تحديد GuaranteeTs في طلبات البحث الخاصة بهم.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" />
   </span> <span class="img-wrapper"> <span>وقت الخدمة ووقت الضمان</span> </span></p>
<p>كما هو موضح في الشكل أعلاه، إذا كان GuaranteeTs أقل من وقت الخدمة، فهذا يعني أن جميع البيانات قبل النقطة الزمنية المحددة قد تمت كتابتها بالكامل على القرص، مما يسمح لـ QueryNodes بإجراء عملية البحث على الفور. عندما يكون GuaranteeTs أكبر من ServiceTime، يجب أن تنتظر عقد الاستعلام حتى يتجاوز وقت الخدمة GuaranteeTs قبل أن تتمكن من تنفيذ عملية البحث.</p>
<p>يحتاج المستخدمون إلى إجراء مفاضلة بين دقة الاستعلام وزمن الاستعلام. إذا كان المستخدمون لديهم متطلبات اتساق عالية وليس لديهم حساسية تجاه زمن انتقال الاستعلام، فيمكنهم تعيين GuaranteeTs إلى قيمة كبيرة قدر الإمكان؛ إذا كان المستخدمون يرغبون في تلقي نتائج البحث بسرعة ويتحملون دقة الاستعلام، فيمكن تعيين GuaranteeTs إلى قيمة أصغر.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" />
   </span> <span class="img-wrapper"> <span>توضيح مستوى الاتساق</span> </span></p>
<p>يوفر ميلفوس أربعة أنواع من مستويات الاتساق مع مستويات ضمانات مختلفة.</p>
<ul>
<li><p><strong>قوي</strong></p>
<p>يتم استخدام أحدث طابع زمني كـ GuaranteeTs، ويتعين على عقد الاستعلام الانتظار حتى يفي وقت الخدمة بـ GuaranteeTs قبل تنفيذ طلبات البحث.</p></li>
<li><p><strong>نهائي</strong></p>
<p>يتم تعيين GuaranteeTs على قيمة صغيرة للغاية، مثل 1، لتجنب عمليات التحقق من الاتساق بحيث يمكن لـ QueryNodes تنفيذ طلبات البحث على الفور على جميع البيانات الدفعية.</p></li>
<li><p><strong>الثبات المحدود</strong></p>
<p>يتم تعيين GuranteeTs إلى نقطة زمنية أقدم من الطابع الزمني الأخير لجعل QueryNodes تنفذ عمليات البحث مع تحمل فقدان بيانات معينة.</p></li>
<li><p><strong>الجلسة</strong></p>
<p>يتم استخدام آخر نقطة زمنية يقوم فيها العميل بإدراج البيانات كـ GuaranteeTs بحيث يمكن لـ QueryNodes إجراء عمليات بحث على جميع البيانات التي أدخلها العميل.</p></li>
</ul>
<p>يستخدم ميلفوس مستوى الثبات المحدود كمستوى الاتساق الافتراضي. إذا تُرك مستوى الضمانة غير محدد، يتم استخدام أحدث وقت خدمة كمستوى ضمانة.</p>
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
    </button></h2><p>يمكنك تعيين مستويات اتساق مختلفة عند إنشاء مجموعة وكذلك إجراء عمليات بحث واستعلامات.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">تعيين مستوى الاتساق عند إنشاء مجموعة</h3><p>عند إنشاء مجموعة، يمكنك تعيين مستوى الاتساق لعمليات البحث والاستعلامات داخل المجموعة. يقوم المثال البرمجي التالي بتعيين مستوى الاتساق إلى <strong>قوي</strong>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.STRONG)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClStrong))
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
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">تعيين مستوى الاتساق في البحث</h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يقوم مثال التعليمات البرمجية التالي بتعيين مستوى الاتساق إلى المستوى <strong>المحدود</strong>. ينطبق التغيير فقط على طلب البحث الحالي.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جافا غو</a> <a href="#bash">CURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>هذه المعلمة متاحة أيضًا في عمليات البحث المختلطة ومكرر البحث. القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">تعيين مستوى الاتساق في الاستعلام</h3><p>يمكنك دائمًا تغيير مستوى الاتساق لبحث معين. يقوم مثال التعليمات البرمجية التالي بتعيين مستوى الاتساق إلى <strong>النهاية</strong>. ينطبق الإعداد فقط على طلب الاستعلام الحالي.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جافا جو</a> <a href="#bash">cURL</a></div>
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
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تتوفر هذه المعلمة أيضًا في مكرر الاستعلام. القيم الممكنة للمعلمة <code translate="no">consistency_level</code> هي <code translate="no">Strong</code> و <code translate="no">Bounded</code> و <code translate="no">Eventually</code> و <code translate="no">Session</code>.</p>
