---
id: search-aggregation.md
title: تجميع نتائج البحثCompatible with Milvus 3.0.x
summary: >-
  تجميع نتائج البحث المتجه في مجموعات، وحساب المقاييس لكل مجموعة، وترتيب
  المجموعات، وإرجاع النتائج الممثلة.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">تجميع نتائج البحث<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>عندما يبحث المتسوق عن "أحذية جري سوداء للتدريب اليومي"، يقوم البحث عن أقرب الجيران التقريبي (ANN) بترتيب المنتجات حسب تشابه المتجهات ويعرض قائمة مسطحة بأفضل K نتائج. قد تكون النتائج ذات صلة ولكنها متكررة: في المثال أدناه، أربعة من النتائج الست الأولى هي منتجات العلامة التجارية أ، بينما تظهر العلامة التجارية ب والعلامة التجارية ج مرة واحدة لكل منهما.</p>
<p>لا يمكن للقائمة المسطحة أن توفر مباشرةً ملخصًا موجهًا نحو الفئات. قد يحتاج التطبيق إلى مقارنة العلامات التجارية حسب عدد المرشحين المحتفظ بهم أو متوسط السعر، أو فحص عدد صغير من المنتجات التمثيلية من كل علامة تجارية، أو تنظيم النتائج في مستويات متعددة من الفئات.</p>
<p>يقوم «تجميع البحث» (Search Aggregation) بتنظيم المرشحين المحتفظ بهم من شبكة الجيران (ANN) في فئات بناءً على الحقول القياسية المحددة. في هذا المثال، تصبح كل علامة تجارية فئة منفصلة. يمكن لـ Milvus حساب الإحصائيات لكل فئة، وترتيب الفئات، وإرفاق المنتجات التمثيلية. يستهلك التطبيق هذا الرد الذي يعطي الأولوية للفئات من خلال «الاستعلام المركب» ( <code translate="no">result.agg_buckets</code>).</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>تصبح نتيجة البحث المسطحة عن أحذية الجري مجموعة من فئات العلامات التجارية القابلة للمقارنة</span>
  
 </span></p>
<p>لا يقوم «تجميع البحث» (Search Aggregation) بتشغيل تجميع دقيق للمجموعة الكاملة. يعتمد وجود المجموعات، وعددها، ومقاييسها، وترتيبها، والنتائج التمثيلية على المرشحات التي احتفظت بها مراحل الشبكة العصبية الاصطناعية (ANN) والتجميع.</p>
<h2 id="How-it-works" class="common-anchor-header">كيفية العمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>يتم تجميع المرشحين من الشبكة العصبية الاصطناعية (ANN) حسب مفاتيح المجموعات ويتم إرجاعهم مع الأعداد والمقاييس والنتائج التمثيلية</span>
  
 </span></p>
<ol>
<li><p><strong>استرجاع المرشحين.</strong> يقوم Milvus بتشغيل بحث الشبكة العصبية الاصطناعية (ANN) للعثور على الكيانات الأقرب إلى متجه الاستعلام. ثم تحتفظ مرحلة التجميع بعدد محدود من المرشحين لكل مفتاح مركب كامل. يمثل هذا الحد الأقصى لعدد المرشحين لكل مفتاح أكبر قيمة لـ <code translate="no">TopHits.size</code> في أي مكان في شجرة التجميع، أو <code translate="no">1</code> عندما لا يتم تكوين أي مستوى لـ <code translate="no">top_hits</code>.</p></li>
<li><p><strong>إنشاء المجموعات (buckets).</strong> يحدد <code translate="no">SearchAggregation.fields</code> مفتاح المجموعة (bucket key). كل تركيبة فريدة من قيم الحقول تُنشئ مفتاحًا منفصلاً. في الشكل، يُنشئ <code translate="no">fields=[&quot;brand&quot;]</code> مفاتيح المجموعات التالية: <code translate="no">(Brand A)</code> و <code translate="no">(Brand B)</code> و <code translate="no">(Brand C)</code>. تنتمي المرشحات المحتفظ بها التي تحمل نفس المفتاح إلى نفس المجموعة وتساهم في <code translate="no">count</code> الخاص بها. يحدد <code translate="no">SearchAggregation.size</code> عدد المجموعات التي يعرضها Milvus.</p></li>
<li><p><strong>حساب النتائج وإرجاعها.</strong> يحتوي كل دلو مُرجع على مفتاحه وعدد المرشحين المحتفظ بهم. يمكن لـ Milvus أيضًا حساب المقاييس المُعدة مسبقًا، وترتيب الدلاء، وإرجاع الكيانات التمثيلية، وإنشاء دلاء فرعية. يعرض كل <code translate="no">AggregationBucket</code> في <code translate="no">result.agg_buckets</code> <code translate="no">key</code> و <code translate="no">count</code> و <code translate="no">metrics</code> و <code translate="no">hits</code> و <code translate="no">sub_groups</code>. عند تمكين «تجميع البحث» (Search Aggregation)، تكون قائمة نتائج البحث العادية فارغة.</p></li>
</ol>
<p>في الرسم التخطيطي، توفر <code translate="no">TopHits.size=4</code> ميزانية مرشحين لكل مفتاح تبلغ أربعة، لذا فإن المرشحين الأربعة المحتفظ بهم للعلامة التجارية «A» ينتجون <code translate="no">count: 4</code>. لا تعرض بطاقة العلامة التجارية «A» المكتملة سوى اثنين من النتائج التمثيلية الأربعة التي تم إرجاعها للحفاظ على إيجاز الشكل.</p>
<p>باستخدام <code translate="no">sub_aggregation</code> ، يكرر Milvus الخطوتين 2 و3 داخل كل مجموعة أصلية. يمكن أن تؤدي التغييرات في معدل الاسترجاع لشبكة ANN أو الميزانية المخصصة للمرشحين لكل مفتاح إلى تغيير عدد المجموعات والمقاييس والترتيب والنتائج والنتائج المتداخلة.</p>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل استخدام تجميع البحث، يرجى ملاحظة الحدود التالية:</p>
<ul>
<li><p><strong>التجميعات المتداخلة:</strong> يمكن أن يحتوي الطلب على تجميع جذر واحد لـ <code translate="no">SearchAggregation</code> وما يصل إلى ثلاثة مستويات متداخلة من <code translate="no">sub_aggregation</code> ، بحد أقصى أربعة مستويات إجمالًا.</p></li>
<li><p><strong>الحقول المستخدمة لإنشاء مفاتيح المجموعات:</strong> يدعم « <code translate="no">SearchAggregation.fields</code> » الحقول المنطقية (Boolean)، والأعداد الصحيحة (integer)، و« <code translate="no">VARCHAR</code> »، و« <code translate="no">TIMESTAMPTZ</code> ». ولا يدعم الحقول « <code translate="no">FLOAT</code> »، و« <code translate="no">DOUBLE</code> »، و« <code translate="no">ARRAY</code> »، و« <code translate="no">JSON</code> »، و« <code translate="no">GEOMETRY</code> »، و« <code translate="no">TEXT</code> »، أو الحقول المتجهة (vector)، أو الحقول الديناميكية.</p></li>
<li><p><strong>الحقول المترية:</strong> <code translate="no">count</code> تقبل <code translate="no">&quot;*&quot;</code> أو أي حقل غير<code translate="no">JSON</code> وغير ديناميكي، وتتخطى قيم <code translate="no">NULL</code> عند تحديد حقل. <code translate="no">sum</code> و <code translate="no">avg</code> تقبلان الحقول الصحيحة والعائمة. <code translate="no">min</code> و <code translate="no">max</code> تقبلان بالإضافة إلى ذلك الحقول النصية و <code translate="no">TIMESTAMPTZ</code>.</p></li>
<li><p><strong>حقول فرز «Top Hits»:</strong> تقبل <code translate="no">TopHits.sort</code> الحقول القابلة للمقارنة من نوع «Boolean» و«Integer» و«Floating-point» و«String» و« <code translate="no">TIMESTAMPTZ</code> »، بالإضافة إلى <code translate="no">_score</code>. ولا تدعم <code translate="no">ARRAY</code> أو <code translate="no">JSON</code> أو <code translate="no">GEOMETRY</code> أو الحقول المتجهة أو الديناميكية.</p></li>
<li><p><strong>الميزانية المرشحة:</strong> أكبر قيمة لـ <code translate="no">TopHits.size</code> في أي مكان في شجرة التجميع هي أيضًا عدد المرشحين المحتفظ بهم لكل مفتاح مركب كامل. إذا لم يتم تكوين <code translate="no">top_hits</code> في أي مستوى، يحتفظ Milvus بمرشح واحد لكل مفتاح. يتم حساب <code translate="no">count</code> والمقاييس الخاصة بالمجموعة من هذه المرشحين المحتفظ بهم، لذا فإن تغيير <code translate="no">TopHits.size</code> يمكن أن يغيرها.</p></li>
<li><p><strong>حقول المجموعات القابلة للقيمة الفارغة:</strong> تشكل قيمة <code translate="no">NULL</code> مفتاح المجموعة الخاص بها. لاستبعاد المجموعة الفارغة، أضف مرشحًا مثل <code translate="no">brand is not null</code> إلى طلب البحث.</p></li>
<li><p><strong>الحقول المتكررة:</strong> لا يمكن أن يظهر الحقل نفسه في أكثر من قائمة واحدة من قوائم « <code translate="no">SearchAggregation.fields</code> ». على سبيل المثال، إذا كان التجميع الجذري يستخدم <code translate="no">fields=[&quot;category&quot;]</code> ، فلا يمكن لـ « <code translate="no">sub_aggregation</code> » المتداخلة أن تستخدم أيضًا <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>التركيبات غير المدعومة:</strong> لا يمكن دمج «تجميع البحث» (Search Aggregation) مع «التجميع المتكرر» ( <code translate="no">offset</code>) أو «مكررات البحث» (Search Iterators) أو «البحث الهجين» (Hybrid Search) أو «أداة التمييز» (Highlighter) أو «البحث التجميعي» (Grouping Search).</p></li>
<li><p><strong>المدخلات المرجعة:</strong> حافظ على الحد الأقصى المُعد لعدد مدخلات النتائج عند 10,000 أو أقل. احسب هذا الحد الأقصى على النحو التالي:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>استخدم « <code translate="no">1</code> » كعامل أخير عندما لا يتم تكوين أي مستوى لـ « <code translate="no">TopHits</code> ». على سبيل المثال، متجه استعلام واحد، و10 مجموعات جذرية، وخمس مجموعات فرعية لكل مجموعة جذرية، ونتيجتان لكل مجموعة فرعية، ينتج عنها الحد الأقصى المُكوّن التالي:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">استخدام تجميع البحث<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر مثالًا بناءً على ما تريد تحقيقه:</p>
<table>
<thead>
<tr><th>انتقل إلى</th><th>الوصف</th><th>الإعدادات الرئيسية</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">قارن وفرز المجموعات</a></td><td>احسب إحصائيات كل مجموعة على حدة لمقارنة المجموعات، ثم قم بفرز المجموعات التي تم إرجاعها حسب المقاييس أو الأعداد أو المفاتيح.</td><td><code translate="no">fields</code>، <code translate="no">size</code> ، <code translate="no">metrics</code> ، <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">عرض نتائج تمثيلية من كل مجموعة</a></td><td>إرجاع عدد محدود من الكيانات من كل مجموعة وفرز تلك الكيانات بشكل مستقل حسب الحقول القياسية أو النتيجة المتجهة.</td><td><code translate="no">top_hits</code>، <code translate="no">TopHits.size</code> ، <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">تجميع النتائج على مستويات متعددة</a></td><td>تنظيم النتائج في مستويات مجموعات رئيسية وفرعية لتحليل أبعاد متعددة بالتسلسل.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>تستخدم الأمثلة أدناه مجموعة منتجات تحتوي على حقول العلامة التجارية والفئة واللون والسعر والتقييم. جميع أسماء العلامات التجارية وأسماء المنتجات والأسعار والتقييمات ونتائج البحث هي بيانات أمثلة اصطناعية. قم بتوسيع القسم التالي لإنشاء المجموعة وتحديد متغيرات البحث المشتركة.</p>
<p><details></p>
<p><summary>إعداد المجموعة النموذجية</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>يُهيئ الإعداد أعلاه <code translate="no">COSINE</code> لكل من الفهرس المتجه ومعلمات البحث. لذلك، تستخدم الأمثلة اللاحقة <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> لوضع تشابه جيب التمام الأعلى أولاً. بالنسبة لمقياس المسافة مثل <code translate="no">L2</code> ، استخدم <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">مقارنة المجموعات وفرزها<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم هذا النمط عندما تحتاج إلى مقارنة مجموعات من الكيانات المسترجعة باستخدام إحصائيات محسوبة والتحكم في ترتيب إرجاع المجموعات. في هذا المثال، يقوم Milvus بتجميع المنتجات المسترجعة حسب <code translate="no">brand</code> ، ويحسب مقاييس السعر لكل مجموعة من العلامات التجارية، ويصنف المجموعات حسب متوسط السعر.</p>
<p>إذا كان هدفك هو تحسين تنوع النتائج فقط عن طريق إرجاع كيان واحد أو أكثر لكل قيمة حقل، فاستخدم <a href="/docs/ar/grouping-search.md">«البحث المجمّع» (Grouping Search</a> ) بدلاً من ذلك.</p>
<p>يُنشئ التكوين التالي ما يصل إلى ثلاث مجموعات للعلامات التجارية، ويحسب المقاييس لكل مجموعة، ويصنف المجموعات حسب متوسط السعر:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>قم بتمرير الكائن إلى المعلمة <code translate="no">search_aggregation</code> في <code translate="no">MilvusClient.search()</code>:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>عند تعيين المعلمة « <code translate="no">search_aggregation</code> »، لا يُرجع PyMilvus أي نتائج كيانات عادية في « <code translate="no">result[0]</code> ». اقرأ استجابة المجموعة من « <code translate="no">result.agg_buckets[0]</code> » بدلاً من ذلك. تتحكم المعلمة « <code translate="no">output_fields</code> » في الحقول القياسية التي تظهر في كل تعيين « <code translate="no">AggregationHit.fields</code> » مُرجع؛ ولا يزال بإمكان Milvus استخدام حقول «metric-source» و«sort» غير المدرجة في « <code translate="no">output_fields</code> ».</p>
<p><details></p>
<p><summary>عرض نموذج لإخراج الباكيت</summary></p>
<p>تم التقاط الناتج التالي من الطلب أعلاه وتم تسلسله بتنسيق JSON لتسهيل القراءة. يُرجع PyMilvus كائنات <code translate="no">AggregationBucket</code> بدلاً من JSON. تكون قيمة <code translate="no">key</code> دائمًا قائمة مرتبة من مكونات المفتاح، حتى عندما يحتوي <code translate="no">fields</code> على حقل واحد فقط. وهذا يحافظ على ترتيب الحقول للمفاتيح المركبة.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>بالنسبة لمتجه الاستعلام الفردي في هذا الدليل، اقرأ المجموعات ذات المستوى الأعلى التي تم إرجاعها من <code translate="no">result.agg_buckets[0]</code>. تعرض كل مجموعة مكونات مفتاحها المرتبة، و <code translate="no">count</code> للمرشحين المحتفظ بهم، و <code translate="no">metrics</code> المحسوب، و <code translate="no">hits</code> التمثيلي، والمجموعات المتداخلة في <code translate="no">sub_groups</code>.</p>
<p>اقرأ التكوين على النحو التالي:</p>
<table>
<thead>
<tr><th>الإعداد</th><th>ما يتحكم فيه</th><th>في هذا المثال</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>كيف يقوم Milvus بإنشاء مفاتيح المجموعات</td><td>يُنشئ دلوًا واحدًا لكل قيمة مميزة من قيم <code translate="no">brand</code>.</td></tr>
<tr><td><code translate="no">size</code></td><td>الحد الأقصى لعدد المجموعات التي يتم إرجاعها</td><td>يُرجع ما يصل إلى ثلاثة باكتات للعلامة التجارية.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>الإحصائيات المحسوبة لكل مجموعة</td><td>يُحسب عدد المنتجات، ومتوسط السعر، والسعر الأدنى.</td></tr>
<tr><td><code translate="no">order</code></td><td>كيف يقوم Milvus بفرز المجموعات التي يتم إرجاعها</td><td>يُصنف حسب متوسط السعر، ثم يستخدم مفتاح المجموعة (bucket key) لكسر التعادل.</td></tr>
</tbody>
</table>
<p>يتجاهل Milvus <code translate="no">limit</code> عند تعيين <code translate="no">search_aggregation</code>. استخدم قيمة الجذر <code translate="no">SearchAggregation.size</code> للتحكم في عدد المجموعات ذات المستوى الأعلى.</p>
<p>باستخدام هذه الإعدادات، يعرض Milvus مجموعات العلامات التجارية B و A و C بترتيب تنازلي وفقًا لـ <code translate="no">avg_price</code>. يُطبق معيار <code translate="no">_key</code> فقط عندما يكون للمجموعات نفس متوسط السعر. ونظرًا لأن هذا التكوين لا يحدد <code translate="no">top_hits</code> ، فإن قائمة <code translate="no">hits</code> لكل مجموعة تكون فارغة وتكون الميزانية المرشحة لكل مفتاح هي <code translate="no">1</code>. وبالتالي، فإن الأعداد والمقاييس المعروضة تصف مرشحًا واحدًا محفوظًا لكل علامة تجارية. قم بتكوين <code translate="no">top_hits</code> بقيمة أكبر لـ <code translate="no">TopHits.size</code> عندما يحتاج التجميع إلى نافذة مقاييس أوسع لكل مفتاح.</p>
<p><details></p>
<p><summary>قواعد المقاييس والترتيب</summary></p>
<p>يقوم كل إدخال في <code translate="no">SearchAggregation.metrics</code> بتعيين اسم مستعار محدد من قبل المستخدم إلى <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>المصدر</th><th>العمليات المدعومة</th><th>السلوك</th></tr>
</thead>
<tbody>
<tr><td>أي حقل غير<code translate="no">JSON</code> وغير ديناميكي</td><td><code translate="no">count</code></td><td>يحسب المرشحين المحتفظ بهم الذين لا يكون حقل المصدر الخاص بهم هو <code translate="no">NULL</code>.</td></tr>
<tr><td>حقل عدد صحيح أو عدد عائم</td><td><code translate="no">sum</code>، و <code translate="no">avg</code> ، و <code translate="no">min</code> ، <code translate="no">max</code></td><td>يحسب القيم المحتفظ بها غير الفارغة.</td></tr>
<tr><td>حقل من نوع سلسلة أو <code translate="no">TIMESTAMPTZ</code> </td><td><code translate="no">min</code>، <code translate="no">max</code></td><td>يختار الحد الأدنى أو الحد الأقصى للقيمة المحتفظ بها غير الفارغة.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>يحسب كل مرشح محتفظ به في المجموعة. تتطابق النتيجة مع <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>، <code translate="no">avg</code> ، <code translate="no">min</code> ، <code translate="no">max</code></td><td>يجمع قيم التشابه أو المسافة وفقًا لشبكة ANN للمرشحين المحتفظ بهم.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> يقبل المفاتيح التالية:</p>
<table>
<thead>
<tr><th>مفتاح الترتيب</th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td>اسم مستعار للمقياس</td><td>يُصنف حسب قيمة محسوبة في <code translate="no">metrics</code> على نفس مستوى التجميع، مثل <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>يُرتب حسب عدد المرشحين المحتفظ بهم في كل دلو.</td></tr>
<tr><td><code translate="no">_key</code></td><td>يُرتب حسب مفتاح المجموعة بدلاً من حقل المجموعة المسمى <code translate="no">_key</code>.</td></tr>
</tbody>
</table>
<p>يقوم كل إدخال في <code translate="no">order</code> بتعيين مفتاح إلى <code translate="no">&quot;asc&quot;</code> أو <code translate="no">&quot;desc&quot;</code>. يقوم Milvus بتقييم الإدخالات المتعددة من الأول إلى الأخير. إذا حذفت <code translate="no">order</code> ، فسيحتفظ Milvus بترتيب اكتشاف المجموعات من مجموعة المرشحين المحتفظ بهم.</p>
<p>لفرز المجموعات حسب جودة مطابقة المتجهات، احسب أولاً مقياسًا على مستوى المجموعة من <code translate="no">_score</code> ، ثم استخدم الاسم المستعار للمقياس في <code translate="no">order</code>. لا يمكنك استخدام <code translate="no">_score</code> مباشرةً كمفتاح لترتيب المجموعات لأن كل مجموعة يمكن أن تحتوي على عدة درجات للكيانات. على سبيل المثال، مع <code translate="no">COSINE</code> أو <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>باستخدام <code translate="no">L2</code> ، احسب الحد الأدنى لقيمة <code translate="no">_score</code> وقم بفرز الاسم المستعار للمقياس بترتيب تصاعدي بحيث تأتي المجموعات ذات المسافة الأقل أولاً.</p>
<p></details></p>
<p><details></p>
<p><summary>إنشاء مفاتيح مجموعات مركبة</summary></p>
<p>لإنشاء مفتاح دلو مركب، قم بتمرير أسماء حقول متعددة في نفس القائمة:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكن أن ينتج عن هذا التكوين مفاتيح مثل <code translate="no">(Brand A, black)</code> و <code translate="no">(Brand A, blue)</code> و <code translate="no">(Brand B, white)</code>. لا تشترك كيانان في نفس المجموعة إلا عندما تتطابق القيمتان. يحافظ Milvus على ترتيب القائمة، لذا فإن <code translate="no">brand</code> هو المكون الأول للمفتاح و <code translate="no">color</code> هو المكون الثاني. عند استخدام <code translate="no">_key</code> في <code translate="no">order</code> ، يقارن Milvus مكونات المفتاح المركب بنفس الترتيب. قم بتمرير سلاسل متعددة في قائمة مسطحة واحدة؛ لا يتم دعم القوائم المتداخلة.</p>
<p><code translate="no">size=6</code> هو الحد الأقصى لعدد المجموعات المركبة التي يتم إرجاعها في مستوى التجميع هذا. تحتوي البيانات المثال على خمسة تركيبات مميزة للعلامة التجارية واللون، لذا يمكن إرجاع الخمسة جميعًا. في <a href="#Limits">حد الإدخالات المرجعة</a>، يساهم هذا الطلب بـ <code translate="no">1 query vector × 6 buckets × 1 = 6</code> إدخالات النتائج المُعدة.</p>
<p>تؤدي الحقول المتعددة في قائمة واحدة <code translate="no">SearchAggregation.fields</code> إلى إنشاء مفتاح مجموعة مركب في مستوى التجميع هذا. لإنشاء تسلسل هرمي للمجموعات بين الأصل والفرع، استخدم <a href="#Group-results-at-multiple-levels">التجميع المتداخل</a>.</p>
<p></details></p>
<p>تعيد الأمثلة التالية تعريف <code translate="no">aggregation</code>. قم بتمرير الكائن المحدث إلى نفس المعلمة <code translate="no">search_aggregation</code> وأعد تشغيل استدعاء البحث.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">عرض نتائج تمثيلية من كل مجموعة<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتضمين الكيانات التمثيلية عندما يحتاج التطبيق إلى عرض المنتجات الفعلية من كل مجموعة. في هذا المثال، يعرض Milvus ما يصل إلى منتجين من كل مجموعة علامة تجارية، مرتبة حسب التقييم ثم حسب درجة المتجه.</p>
<p>قم بتكوين <code translate="no">TopHits</code> على النحو التالي:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>عرض مجموعة تحتوي على نتائج تمثيلية</summary></p>
<p>تم التقاط مجموعة العلامة التجارية «A» التالية من الطلب أعلاه وتم تسلسلها بتنسيق JSON لتسهيل القراءة.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>المعلمة</th><th>الغرض</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>اختياري. يقوم بتكوين الكيانات التمثيلية لمستوى التجميع هذا. إذا تم حذفه، فإن " <code translate="no">bucket.hits</code> " يكون فارغًا وتصبح الميزانية المرشحة لكل مفتاح هي "واحد" بشكل افتراضي.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>تُرجع ما يصل إلى كيانين تمثيليين من كل مجموعة محددة وتُعيّن الميزانية المرشحة لكل مفتاح على اثنين لشجرة التجميع بأكملها.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>ترتيب الكيانات داخل كل مجموعة باستخدام المعايير المذكورة.</td></tr>
</tbody>
</table>
<p>قم بتكوين « <code translate="no">top_hits</code> » عندما يحتاج التطبيق إلى كيانات تمثيلية أو عندما تحتاج الأعداد والمقاييس إلى نافذة مرشحة أوسع لكل مفتاح. يؤدي تكبير « <code translate="no">TopHits.size</code> » إلى زيادة كل من الميزانية المرشحة والحد الأقصى لحساب الإدخالات المرجعة في <a href="#Limits">«Limits</a>».</p>
<p><code translate="no">SearchAggregation.order</code> يقوم بفرز المجموعات (buckets)، بينما يقوم " <code translate="no">TopHits.sort</code> " بفرز الكيانات المحتفظ بها داخل كل مجموعة. لا يغير ترتيب الفرز الكيانات المرشحة التي تم الاحتفاظ بها لـ " <code translate="no">count</code> " والمقاييس. يقبل " <code translate="no">TopHits.sort</code> " أسماء الحقول العددية القابلة للمقارنة المدعومة والحقل المدمج " <code translate="no">_score</code> "، الذي يمثل تشابه أو مسافة الشبكة العصبية الاصطناعية (ANN). يقوم Milvus بتقييم إدخالات " <code translate="no">sort</code> " من الأول إلى الأخير. في هذا المثال، يتم ترتيب المنتجات حسب <code translate="no">rating</code> من الأعلى إلى الأدنى، ولا يتم استخدام <code translate="no">_score</code> إلا عندما يتساوى تقييمان. ونظرًا لأن الإعداد يستخدم <code translate="no">COSINE</code> ، فإن الترتيب التنازلي <code translate="no">_score</code> يضع المنتج الأكثر تشابهًا في المرتبة الأولى.</p>
<p>لا يلزم أن تظهر الحقول المستخدمة بواسطة <code translate="no">metrics</code> أو <code translate="no">TopHits.sort</code> في <code translate="no">output_fields</code>. يقوم Milvus باسترداد هذه الحقول داخليًا، ولكن يتم تضمين الحقول المذكورة صراحةً في <code translate="no">output_fields</code> فقط في تعيين <code translate="no">fields</code> لكل نتيجة يتم إرجاعها. تظل المفاتيح الأساسية ودرجات المتجهات متاحة من خلال <code translate="no">AggregationHit.pk</code> و <code translate="no">AggregationHit.score</code>.</p>
<p>يكشف كل <code translate="no">AggregationHit</code> الذي يتم إرجاعه عن مفتاحه الأساسي في <code translate="no">pk</code> ، ودرجة المتجه في <code translate="no">score</code> ، وحقول الإخراج المطلوبة في <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">تجميع النتائج على مستويات متعددة<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم التجميع المتداخل عندما تحتاج إلى مستوى واحد من المجموعات داخل مستوى آخر. في هذا المثال، يقوم Milvus بإنشاء مجموعات الفئات أولاً، ثم يقوم بإنشاء مجموعات العلامات التجارية داخل كل فئة.</p>
<p>لا يتلقى التجميع الفرعي سوى الكيانات المخصصة لمجموعة التجميع الأصلية. يتحكم <code translate="no">fields</code> في مفتاح مجموعة التجميع في كل مستوى من مستويات التجميع، بينما ينشئ <code translate="no">sub_aggregation</code> التسلسل الهرمي بين الأصل والفرع.</p>
<p>يُنشئ التكوين أدناه مجموعة فئة بمفتاح <code translate="no">(running_shoes)</code>. داخل تلك المجموعة الأم، يُنشئ التجميع الفرعي مجموعات علامات تجارية منفصلة بمفاتيح مثل <code translate="no">(Brand A)</code> و <code translate="no">(Brand B)</code> و <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>يمكن لكل مستوى استخدام حقول متعددة بشكل مستقل. على سبيل المثال، سيؤدي استخدام <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> في التجميع الفرعي إلى إنشاء مفاتيح فرعية مركبة مثل <code translate="no">(Brand A, black)</code>.</p>
<p>التكوين التالي ينفذ هذا التسلسل الهرمي:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>عرض نتيجة دلو متداخل</summary></p>
<p>يُظهر المقتطف المتسلسل التالي الباكيت الأصلي <code translate="no">running_shoes</code> وباكيته الفرعي Brand B. تم حذف الباكيتات الفرعية Brand A و Brand C للاختصار.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>تمثل النتيجة المعروضة مسار المجموعة <code translate="no">(running_shoes) → (Brand B)</code> ، وليس مفتاح مجموعة مركبًا واحدًا <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>يختار Milvus أولاً ما يصل إلى دلاء فئة اثنين، مرتبة حسب <code translate="no">product_count</code>. ثم يقوم بتشغيل <code translate="no">sub_aggregation</code> بشكل مستقل داخل كل فئة مختارة ويعرض ما يصل إلى ثلاثة دلاء للعلامات التجارية، مرتبة حسب <code translate="no">avg_rating</code>.</p>
<p>في الناتج أعلاه:</p>
<ul>
<li>تحتوي فئة الجذر <code translate="no">running_shoes</code> على أربعة مرشحين محتفظ بهم عبر مفاتيحها المركبة الفرعية. وتحتوي فئة <code translate="no">metrics</code> الخاصة بها على قيم المستوى الجذري <code translate="no">avg_price</code> و <code translate="no">product_count</code>.</li>
<li>تحتوي قائمة <code translate="no">sub_groups</code> الخاصة بالحاوية الجذرية على الحاويات الفرعية للعلامات التجارية. تحتوي الحاوية المعروضة Brand B على مرشح واحد محفوظ وقيمتي <code translate="no">avg_rating</code> و <code translate="no">brand_count</code> الخاصتين بها.</li>
<li>قائمة <code translate="no">hits</code> الخاصة بالحاوية الجذرية فارغة لأن التجميع الجذري لا يقوم بتكوين <code translate="no">top_hits</code>. تحتوي الحاوية الفرعية للعلامة التجارية B على نتيجة مطابقة تمثيلية لأن <code translate="no">top_hits</code> تم تكوينه في <code translate="no">sub_aggregation</code>.</li>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">ما مدى دقة أعداد المجموعات والمقاييس؟<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>يلخص تجميع البحث المرشحين المحتفظ بهم من شبكة ANN. ولا يقوم بتشغيل تجميع للمجموعة الكاملة.</p>
<p>يتم الاحتفاظ بالمرشحين عبر مرحلتين تقريبيتين. قد يتجاهل بحث الشبكة العصبية الاصطناعية (ANN) كيانات المجموعة ذات الصلة، وتحتفظ مرحلة التجميع بأكبر عدد من المرشحين <code translate="no">TopHits.size</code> لكل مفتاح مركب كامل. إذا لم يتم تكوين أي مستوى لـ <code translate="no">top_hits</code> ، فإن هذا الحد لكل مفتاح هو واحد.</p>
<p>على سبيل المثال، لنفترض أن مجموعة تحتوي على 5,000 منتج من العلامة التجارية «A» وأن العديد منها ذو صلة باستعلام المتجه. إذا استخدم التجميع <code translate="no">TopHits(size=4)</code> ، فيمكن لمجموعة العلامة التجارية «A» الاحتفاظ بأربعة مرشحين كحد أقصى لمفتاح مركب كامل. ويصف كل من <code translate="no">count</code> والمقاييس تلك المرشحات المحتفظ بها، وليس جميع منتجات العلامة التجارية «A» ذات الصلة ولا جميع كيانات المجموعة البالغ عددها 5,000.</p>
<p>يكون التقريب أكثر أهمية عندما يستخدم التجميع « <code translate="no">order</code> » اسمًا مستعارًا للمقياس. يمكن أن تؤدي التغييرات في معدل استرجاع البحث إلى تغيير قيم المقاييس، وبالتالي تغيير المجموعات التي تتناسب مع « <code translate="no">SearchAggregation.size</code> ». يمكن أن يؤدي التجميع المتداخل إلى تضخيم هذا التأثير لأن كل مستوى فرعي يعمل على الكيانات المتاحة في المجموعة الأم.</p>
<p>إذا كنت بحاجة إلى إحصائيات دقيقة عن كل كيان مطابق، فاستخدم سير عمل تجميع الاستعلام الدقيق بدلاً من تجميع البحث.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">كيف يختلف «تجميع البحث» عن «البحث التجميعي»؟<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>اختر بناءً على الشكل الأساسي لنتائج التطبيق:</p>
<table>
<thead>
<tr><th>الحاجة الأساسية</th><th>الخيار المفضل</th><th>الاستجابة المطلوبة</th></tr>
</thead>
<tbody>
<tr><td>إرجاع قائمة كيانات مرتبة بشكل قياسي مع عدد أقل من القيم المتكررة في حقل التجميع</td><td><a href="/docs/ar/grouping-search.md">البحث المجمّع</a></td><td>نتائج البحث المسطحة لكل متجه استعلام</td></tr>
<tr><td>فحص المجموعات أو مقارنتها كأوعية، باستخدام المفاتيح، أو الأعداد، أو المقاييس، أو الترتيب، أو النتائج التمثيلية، أو الأوعية الفرعية</td><td>تجميع البحث</td><td><code translate="no">AggregationBucket</code> في <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>حتى عندما يقوم تجميع البحث بتكوين <code translate="no">top_hits</code> ، تظل استجابته الأساسية عبارة عن شجرة مجموعات. يظل البحث التجميعي مفيدًا عندما يقوم التطبيق بالفعل بمعالجة نتائج البحث العادية ويريد في المقام الأول تنوع النتائج.</p>
<p>تتعارض واجهات برمجة التطبيقات (APIs) مع بعضها البعض. يرفع PyMilvus استثناءً من نوع « <code translate="no">ParamError</code> » عندما يتم دمج « <code translate="no">search_aggregation</code> » مع « <code translate="no">group_by_field</code> » أو « <code translate="no">group_by_fields</code> » في نفس الطلب.</p>
