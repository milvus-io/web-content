---
id: multi-vector-search.md
order: 2
summary: يوضح هذا الدليل كيفية إجراء البحث المختلط في ميلفوس وفهم إعادة ترتيب النتائج.
title: البحث الهجين
---
<h1 id="Hybrid-Search" class="common-anchor-header">البحث الهجين<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>منذ الإصدار Milvus 2.4، قدمنا دعمًا متعدد المتجهات وإطار بحث مختلط، مما يعني أنه يمكن للمستخدمين جلب عدة حقول متجهات (حتى 10) في مجموعة واحدة. تمثل هذه المتجهات في أعمدة مختلفة أوجهًا متنوعة من البيانات، تنشأ من نماذج تضمين مختلفة أو تخضع لطرق معالجة مختلفة. يتم دمج نتائج عمليات البحث المختلطة باستخدام استراتيجيات إعادة الترتيب، مثل دمج الرتب المتبادلة (RRF) والتسجيل المرجّح. لمعرفة المزيد حول استراتيجيات إعادة الترتيب، راجع <a href="/docs/ar/v2.4.x/reranking.md">إعادة الترتيب</a>.</p>
<p>هذه الميزة مفيدة بشكل خاص في سيناريوهات البحث الشامل، مثل تحديد الشخص الأكثر تشابهًا في مكتبة متجهة استنادًا إلى سمات مختلفة مثل الصور والصوت وبصمات الأصابع، إلخ.</p>
<p>في هذا البرنامج التعليمي، سوف تتعلم كيفية:</p>
<ul>
<li><p>إنشاء مثيلات <code translate="no">AnnSearchRequest</code> متعددة لعمليات البحث عن التشابه في حقول متجهات مختلفة;</p></li>
<li><p>تكوين استراتيجية إعادة الترتيب لدمج نتائج البحث وإعادة ترتيبها من مثيلات <code translate="no">AnnSearchRequest</code> متعددة;</p></li>
<li><p>استخدام طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> لإجراء بحث مختلط.</p></li>
</ul>
<div class="alert note">
<p>تستخدم مقتطفات التعليمات البرمجية في هذه الصفحة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">الوحدة النمطية PyMilvus ORM</a> للتفاعل مع Milvus. ستتوفر مقتطفات التعليمات البرمجية مع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">وحدة MilvusClient SDK</a> الجديدة قريبًا.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">الاستعدادات<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل البدء ببحث مختلط، تأكد من أن لديك مجموعة ذات حقول متجهة متعددة. يقدم Milvus حاليًا أربعة حقول متجهة افتراضيًا لكل مجموعة، والتي يمكن تمديدها إلى عشرة حقول بحد أقصى عن طريق تعديل تكوين <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>فيما يلي مثال على إنشاء مجموعة باسم <code translate="no">test_collection</code> مع حقلي متجه، <code translate="no">filmVector</code> و <code translate="no">posterVector</code> ، وإدراج كيانات عشوائية فيها.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">الخطوة 1: إنشاء مثيلات AnnSearchRequest متعددة<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم البحث المختلط واجهة برمجة التطبيقات <code translate="no">hybrid_search()</code> لتنفيذ طلبات بحث ANN متعددة في مكالمة واحدة. يمثل كل <code translate="no">AnnSearchRequest</code> طلب بحث واحد على حقل متجه محدد.</p>
<p>يقوم المثال التالي بإنشاء مثيلين <code translate="no">AnnSearchRequest</code> لإجراء عمليات بحث تشابه فردية على حقلي متجهين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>المعلمات:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(كائن</em>)</p>
<p>فئة تمثل طلب بحث في حقل متجه واحد. يمكن أن يحتوي كل بحث مختلط على 1 إلى 1,024 كائن <code translate="no">ANNSearchRequest</code> في المرة الواحدة.</p></li>
<li><p><code translate="no">data</code> <em>(قائمة</em>)</p>
<p>متجه الاستعلام للبحث في <code translate="no">AnnSearchRequest</code> واحد . في الوقت الحالي، تقبل هذه المعلمة قائمة تحتوي على متجه استعلام واحد فقط، على سبيل المثال، <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. في المستقبل، سيتم توسيع هذه المعلمة لقبول متجهات استعلام متعددة.</p></li>
<li><p><code translate="no">anns_field</code> <em>(سلسلة</em>)</p>
<p>اسم حقل المتجه المراد استخدامه في حقل متجه واحد <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>قاموس من معلمات البحث لحقل بحث واحد <code translate="no">AnnSearchRequest</code>. تتطابق معلمات البحث هذه مع تلك الخاصة بالبحث في متجه واحد. لمزيد من المعلومات، راجع معلمات <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">البحث</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>الحد الأقصى لعدد نتائج البحث المراد تضمينها في متجه واحد <code translate="no">ANNSearchRequest</code>.</p>
<p>تؤثر هذه المعلمة فقط على عدد نتائج البحث المراد إرجاعها ضمن متجه فردي <code translate="no">ANNSearchRequest</code> ، ولا تحدد النتائج النهائية المراد إرجاعها لاستدعاء <code translate="no">hybrid_search</code>. في البحث المختلط، يتم تحديد النتائج النهائية من خلال دمج النتائج من مثيلات <code translate="no">ANNSearchRequest</code> المتعددة وإعادة ترتيبها.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">الخطوة 2: تكوين إستراتيجية إعادة الترتيب<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء مثيلات <code translate="no">AnnSearchRequest</code> ، قم بتكوين إستراتيجية إعادة الترتيب لدمج النتائج وإعادة ترتيبها. يوجد حاليًا خياران: <code translate="no">WeightedRanker</code> و <code translate="no">RRFRanker</code>. لمزيد من المعلومات حول استراتيجيات إعادة التصنيف، راجع <a href="/docs/ar/v2.4.x/reranking.md">إعادة التصنيف</a>.</p>
<ul>
<li><p>استخدام الدرجات الموزونة</p>
<p>يتم استخدام <code translate="no">WeightedRanker</code> لتعيين أهمية للنتائج من كل بحث عن حقل متجه بأوزان محددة. إذا قمت بتفضيل بعض الحقول المتجهة على غيرها، يمكن أن يعكس <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> ذلك في نتائج البحث المجمعة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>عند استخدام <code translate="no">WeightedRanker</code> ، لاحظ أن:</p>
<ul>
<li>تتراوح كل قيمة ترجيح من 0 (الأقل أهمية) إلى 1 (الأكثر أهمية)، مما يؤثر على الدرجة المجمعة النهائية.</li>
<li>يجب أن يساوي العدد الإجمالي لقيم الترجيح المقدمة في <code translate="no">WeightedRanker</code> عدد مثيلات <code translate="no">AnnSearchRequest</code> التي قمت بإنشائها.</li>
</ul></li>
<li><p>استخدام دمج الرتب المتبادل (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">الخطوة 3: إجراء بحث هجين<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>مع تعيين مثيلات <code translate="no">AnnSearchRequest</code> واستراتيجية إعادة الترتيب، استخدم الطريقة <code translate="no">hybrid_search()</code> لإجراء البحث الهجين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>المعلمات:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(قائمة</em>)</p>
<p>قائمة بطلبات البحث، حيث يكون كل طلب كائن <code translate="no">ANNSearchRequest</code>. يمكن أن يتوافق كل طلب مع حقل متجه مختلف ومجموعة مختلفة من معلمات البحث.</p></li>
<li><p><code translate="no">rerank</code> <em>(كائن</em>)</p>
<p>استراتيجية إعادة الترتيب لاستخدامها في البحث المختلط. القيم الممكنة: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> و <code translate="no">RRFRanker()</code>.</p>
<p>لمزيد من المعلومات حول استراتيجيات إعادة الترتيب، راجع <a href="/docs/ar/v2.4.x/reranking.md">إعادة الترتيب</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>الحد الأقصى لعدد النتائج النهائية المراد إرجاعها في البحث المختلط.</p></li>
</ul>
<p>يكون الإخراج مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>عادةً ما يكون لكل مجموعة بدل افتراضي يصل إلى 4 حقول متجهة. ومع ذلك، يتوفر لديك خيار ضبط التكوين <code translate="no">proxy.maxVectorFieldNum</code> لتوسيع الحد الأقصى لعدد الحقول المتجهة في المجموعة، بحد أقصى 10 حقول متجهة لكل مجموعة. راجع <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">التكوينات المتعلقة بالوكيل</a> لمعرفة المزيد.</p></li>
<li><p>ستؤدي الحقول المتجهة المفهرسة أو المحملة جزئيًا في مجموعة إلى حدوث خطأ.</p></li>
<li><p>حاليًا، يمكن لكل <code translate="no">AnnSearchRequest</code> في بحث مختلط أن يحمل متجه استعلام واحد فقط.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>في أي سيناريو يوصى بالبحث المختلط؟</strong></p>
<p>يعد البحث المختلط مثاليًا للحالات المعقدة التي تتطلب دقة عالية، خاصةً عندما يمكن تمثيل كيان ما من خلال متجهات متعددة ومتنوعة. ينطبق هذا على الحالات التي تتم فيها معالجة نفس البيانات، مثل الجملة، من خلال نماذج تضمين مختلفة أو عندما يتم تحويل المعلومات متعددة الوسائط (مثل الصور وبصمات الأصابع والبصمات الصوتية للفرد) إلى تنسيقات متجهات مختلفة. من خلال تعيين أوزان لهذه المتجهات، يمكن أن يؤدي تأثيرها المشترك إلى إثراء عملية الاسترجاع بشكل كبير وتحسين فعالية نتائج البحث.</p></li>
<li><p><strong>كيف يقوم المصنف الموزون بتطبيع المسافات بين حقول المتجهات المختلفة؟</strong></p>
<p>يقوم المصنف الموزون بتطبيع المسافات بين حقول المتجهات باستخدام أوزان مخصصة لكل حقل. ويحسب أهمية كل حقل متجه وفقًا لوزنه، مع إعطاء الأولوية للحقول ذات الأوزان الأعلى. ويُنصح باستخدام نفس نوع المقياس عبر طلبات بحث الشبكة ANN لضمان الاتساق. تضمن هذه الطريقة أن يكون للمتجهات التي تعتبر أكثر أهمية تأثيرًا أكبر على الترتيب العام.</p></li>
<li><p><strong>هل من الممكن استخدام أدوات تصنيف بديلة مثل Cohere Ranker أو BGE Ranker؟</strong></p>
<p>حاليًا، يتم دعم أدوات التصنيف المتوفرة فقط. يجري العمل على خطط لتضمين مصنفات إضافية للتحديثات المستقبلية.</p></li>
<li><p><strong>هل من الممكن إجراء عمليات بحث هجينة متعددة في نفس الوقت؟</strong></p>
<p>نعم، يتم دعم التنفيذ المتزامن لعمليات بحث هجينة متعددة في نفس الوقت.</p></li>
<li><p><strong>هل يمكنني استخدام نفس الحقل المتجه في كائنات AnnSearchRequest متعددة لإجراء عمليات بحث مختلطة؟</strong></p>
<p>من الناحية الفنية، من الممكن استخدام نفس الحقل المتجه في كائنات AnnSearchRequest متعددة لعمليات البحث المختلطة. ليس من الضروري وجود حقول متجهة متعددة لإجراء بحث مختلط.</p></li>
</ul>
