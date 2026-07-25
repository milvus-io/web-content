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
    </button></h1><p>عندما يبحث المتسوق عن "أحذية جري سوداء للتدريب اليومي"، يقوم البحث عن أقرب الجيران التقريبي (ANN) بترتيب المنتجات حسب تشابه المتجهات ويعرض قائمة مسطحة بأفضل K نتائج. قد تكون النتائج ذات صلة ولكنها متكررة: في المثال أدناه، أربعة من النتائج الست الأولى هي منتجات Nike، بينما تظهر Adidas وPuma مرة واحدة لكل منهما.</p>
<p>لا يمكن للقائمة المسطحة أن توفر التنوع أو الإحصائيات على مستوى العلامة التجارية بشكل مباشر. قد يحتاج التطبيق إلى ما يصل إلى منتجين تمثيليين من كل علامة تجارية، أو عدد المنتجات المسترجعة لكل علامة تجارية، أو متوسط السعر لكل علامة تجارية.</p>
<p>يقوم «تجميع البحث» بتنظيم الكيانات المسترجعة في مجموعات بناءً على حقل قياسي محدد. في هذا المثال، تصبح كل علامة تجارية مجموعة منفصلة. يمكن لـ Milvus بعد ذلك حساب الإحصائيات بشكل مستقل لكل مجموعة وإرجاع منتجات تمثيلية من كل مجموعة، مما يجعل نتائج البحث أسهل في المقارنة وأكثر تنوعًا.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>تصبح نتيجة البحث المسطحة عن أحذية الجري مجموعة من المجموعات القابلة للمقارنة حسب العلامة التجارية</span>
  
 </span></p>
<p>تقوم «تجميع نتائج البحث» بتلخيص العناصر المرشحة التي تم استرجاعها بدلاً من كل كيان في المجموعة. وبالتالي، فإن أعداد المجموعات ومقاييسها تقريبية وتظل مرتبطة بمدى صلة المتجهات.</p>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="Three-stage Search Aggregation workflow from ANN retrieval to bucket results" class="doc-image" id="three-stage-search-aggregation-workflow-from-ann-retrieval-to-bucket-results" /> 
   <span>سير عمل «تجميع البحث» المكون من ثلاث مراحل بدءًا من استرجاع الشبكة العصبية الاصطناعية (ANN) وصولًا إلى نتائج المجموعات</span>
  
 </span></p>
<ol>
<li><p><strong>استرجاع المرشحات.</strong> يقوم Milvus بتشغيل بحث الشبكة العصبية الاصطناعية (ANN) لإنشاء مجموعة استرجاع من الكيانات الأقرب إلى متجه الاستعلام. تعمل «تجميع نتائج البحث» على هذه المجموعة بدلاً من العمل على كل كيان في المجموعة، وبالتالي تحدد المجموعة الكيانات التي يمكن أن تساهم في المجموعات.</p></li>
<li><p><strong>إنشاء المجموعات.</strong> تحدد ميزة « <code translate="no">SearchAggregation.fields</code> » الحقول القياسية التي تشكل مفتاح كل مجموعة. في الشكل، تضع ميزة « <code translate="no">brand</code> » المرشحين الستة في مجموعات Nike وAdidas وPuma. عند تحديد حقول متعددة، لا تشترك الكيانات في مجموعة ما إلا عندما تتطابق تركيبات قيم حقولها.</p></li>
<li><p><strong>حساب النتائج وإرجاعها.</strong> يقوم Milvus بحساب المقاييس المُعدة لكل مجموعة، وترتيب المجموعات المكتملة، واستخدام <code translate="no">TopHits</code> لاختيار الكيانات التمثيلية. تحتوي كل مجموعة في <code translate="no">result.agg_buckets</code> على مفتاحها، وعددها، ومقاييسها، ونتائج البحث المطابقة، والمجموعات الفرعية الاختيارية.</p></li>
</ol>
<p>باستخدام <code translate="no">sub_aggregation</code> ، يكرر Milvus الخطوتين 2 و3 داخل كل مجموعة أم. ونظرًا لأن كل مرحلة تعمل على تجمع استرجاع الشبكة العصبية الاصطناعية (ANN)، فإن التغييرات في معدل استرجاع البحث يمكن أن تغير أعداد المجموعات، والمقاييس، والترتيب، ونتائج البحث، والنتائج المتداخلة.</p>
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
<li><p><strong>عمليات التجميع المتداخلة:</strong> يمكن أن يحتوي الطلب على عملية تجميع جذرية واحدة ( <code translate="no">SearchAggregation</code> ) وما يصل إلى ثلاثة مستويات متداخلة من عمليات التجميع الفرعية ( <code translate="no">sub_aggregation</code> )، بحد أقصى أربعة مستويات إجمالًا.</p></li>
<li><p><strong>الحقول المستخدمة لإنشاء مفاتيح المجموعات:</strong> لا يدعم التجميع الجذري ( <code translate="no">SearchAggregation.fields</code> ) الحقول <code translate="no">FLOAT</code> أو <code translate="no">DOUBLE</code> أو vector أو <code translate="no">JSON</code> أو الحقول الديناميكية.</p></li>
<li><p><strong>حقول المقاييس والفرز:</strong> لا يدعم كل من <code translate="no">metrics</code> و <code translate="no">TopHits.sort</code> الحقول <code translate="no">JSON</code> أو الحقول الديناميكية.</p></li>
<li><p><strong>الحقول المتكررة:</strong> لا يمكن أن يظهر الحقل نفسه في أكثر من قائمة واحدة من قوائم <code translate="no">SearchAggregation.fields</code>. على سبيل المثال، إذا كان التجميع الجذري يستخدم <code translate="no">fields=[&quot;category&quot;]</code> ، فلا يمكن لـ <code translate="no">sub_aggregation</code> المتداخل أن يستخدم أيضًا <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>التركيبات غير المدعومة:</strong> لا يمكن دمج «تجميع البحث» (Search Aggregation) مع «التجميع المتكرر» ( <code translate="no">offset</code>) أو «مكررات البحث» (Search Iterators) أو «البحث الهجين» (Hybrid Search) أو «أداة التمييز» (Highlighter) أو «التجميع المتكرر» ( <code translate="no">group_by_field</code>) أو «التجميع المتداخل» ( <code translate="no">group_by_fields</code>).</p></li>
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
    </button></h2><p>اختر المثال الذي يتطابق مع ما تريد تكوينه:</p>
<table>
<thead>
<tr><th>الهدف</th><th>الإعدادات الرئيسية</th><th>مثال</th></tr>
</thead>
<tbody>
<tr><td>إنشاء مفاتيح المجموعات</td><td><code translate="no">fields</code>، <code translate="no">size</code></td><td><a href="#build-bucket-keys">إنشاء مفاتيح الباكيت</a></td></tr>
<tr><td>حساب الإحصائيات وترتيب المجموعات</td><td><code translate="no">metrics</code>، <code translate="no">order</code></td><td><a href="#calculate-metrics-and-order-buckets">حساب المقاييس وترتيب المجموعات</a></td></tr>
<tr><td>إرجاع وفرز الزيارات التمثيلية</td><td><code translate="no">top_hits</code>، <code translate="no">TopHits.size</code> ، <code translate="no">TopHits.sort</code></td><td><a href="#return-and-sort-representative-hits">إرجاع النتائج الممثلة وفرزها</a></td></tr>
<tr><td>إنشاء نتائج هرمية</td><td><code translate="no">sub_aggregation</code></td><td><a href="#create-nested-buckets">إنشاء مجموعات متداخلة</a></td></tr>
</tbody>
</table>
<p>تستخدم الأمثلة أدناه مجموعة منتجات تحتوي على حقول العلامة التجارية والفئة واللون والسعر والتقييم. قم بتوسيع القسم التالي لإنشاء المجموعة وتحديد متغيرات البحث المشتركة.</p>
<p><details></p>
<p><summary>إعداد مجموعة الأمثلة</summary></p>
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
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Puma Velocity Nitro&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Puma&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Windrunner Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Own The Run Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Vomero 17&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike InfinityRN 4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.flush(collection_name)
client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>يُهيئ الإعداد أعلاه " <code translate="no">COSINE</code> " لكل من الفهرس المتجه ومعلمات البحث. ولذلك، تستخدم الأمثلة اللاحقة " <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> " لوضع التشابه الجيبي الأعلى أولاً. بالنسبة لمقياس المسافة مثل " <code translate="no">L2</code>"، استخدم " <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>".</p>
<h3 id="Build-bucket-keys" class="common-anchor-header">إنشاء مفاتيح المجموعات<button data-href="#Build-bucket-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>ابدأ بإنشاء كائن <code translate="no">SearchAggregation</code>. يؤدي التكوين التالي إلى إنشاء دلو واحد لكل قيمة <code translate="no">brand</code> مميزة واختيار ما يصل إلى ثلاثة دلاء لإرجاعها:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span>
    size=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>المعلمات الشائعة الاستخدام هي:</p>
<table>
<thead>
<tr><th>المعلمة</th><th>القيمة في هذا المثال</th><th>الغرض</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td><code translate="no">[&quot;brand&quot;]</code></td><td>قائمة غير فارغة من الحقول القياسية التي تشكل مفتاح المجموعة. يُنشئ حقل واحد مفتاحًا من جزء واحد.</td></tr>
<tr><td><code translate="no">size</code></td><td><code translate="no">3</code></td><td>العدد الأقصى للمجموعات التي يتم إرجاعها في مستوى التجميع هذا.</td></tr>
</tbody>
</table>
<p>قم بتمرير الكائن إلى المعلمة <code translate="no">search_aggregation</code> الخاصة بـ <code translate="no">MilvusClient.search()</code>:</p>
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
<p><details></p>
<p><summary>عرض ناتج دلو المثال</summary></p>
<p>تم التقاط الناتج التالي من الطلب أعلاه وتسلسله بتنسيق JSON لتسهيل القراءة. يعرض PyMilvus كائنات <code translate="no">AggregationBucket</code> بدلاً من JSON.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Puma&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>بالنسبة لمتجه الاستعلام الفردي في هذا الدليل، اقرأ المجموعات ذات المستوى الأعلى التي تم إرجاعها من <code translate="no">result.agg_buckets[0]</code>. تعرض كل مجموعة <code translate="no">key</code> ، وكيان مجموعة الاسترجاع <code translate="no">count</code> ، و <code translate="no">metrics</code> المحسوب، و <code translate="no">hits</code> التمثيلي، والمجموعات المتداخلة في <code translate="no">sub_groups</code>.</p>
<p>تعيد الأقسام التالية تعريف <code translate="no">aggregation</code> لحالات استخدام أخرى. قم بتمرير الكائن المحدث إلى نفس المعلمة <code translate="no">search_aggregation</code> وأعد تشغيل استدعاء البحث.</p>
<p>يتجاهل Milvus <code translate="no">limit</code> عند تعيين <code translate="no">search_aggregation</code>. استخدم قيمة الجذر <code translate="no">SearchAggregation.size</code> للتحكم في عدد المجموعات ذات المستوى الأعلى.</p>
<p>لإنشاء مفتاح دلو مركب، قم بتمرير أسماء حقول متعددة في نفس القائمة:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكن أن ينتج عن هذا التكوين مفاتيح مثل <code translate="no">(Nike, black)</code> و <code translate="no">(Nike, blue)</code> و <code translate="no">(Adidas, white)</code>. لا يتشارك كيانان في نفس الباكت إلا عندما تتطابق القيمتان. يحافظ Milvus على ترتيب القائمة، لذا فإن <code translate="no">brand</code> هو المكون الأول للمفتاح و <code translate="no">color</code> هو المكون الثاني. قم بتمرير سلاسل متعددة في قائمة مسطحة واحدة؛ لا يتم دعم القوائم المتداخلة.</p>
<p><code translate="no">size=6</code> هو الحد الأقصى لعدد المجموعات المركبة التي يتم إرجاعها في مستوى التجميع هذا. تحتوي البيانات المثال على خمسة تركيبات مميزة للعلامة التجارية واللون، لذا يمكن إرجاع الخمسة جميعًا. ضمن <a href="#limits">حد الإدخالات المرجعة</a>، يساهم هذا الطلب بـ <code translate="no">1 query vector × 6 buckets × 1 = 6</code> من إدخالات النتائج المُعدة مسبقًا.</p>
<h3 id="Calculate-metrics-and-order-buckets" class="common-anchor-header">حساب المقاييس وترتيب المجموعات<button data-href="#Calculate-metrics-and-order-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>أضف <code translate="no">metrics</code> و <code translate="no">order</code> عندما تحتاج إلى إحصائيات المجموعات وترتيب محدد للمجموعات:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
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
<p><strong>تحديد مقاييس المجموعات.</strong></p>
<p>يربط كل إدخال من نوع « <code translate="no">SearchAggregation.metrics</code> » اسمًا مستعارًا محددًا من قبل المستخدم بـ « <code translate="no">{operation: source}</code> »:</p>
<table>
<thead>
<tr><th>الاسم المستعار</th><th>العملية</th><th>المصدر</th><th>النتيجة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">product_count</code></td><td><code translate="no">count</code></td><td><code translate="no">&quot;*&quot;</code></td><td>يحسب كل كيان في مجموعة الاسترجاع المخصص للحاوية.</td></tr>
<tr><td><code translate="no">avg_price</code></td><td><code translate="no">avg</code></td><td><code translate="no">price</code></td><td>يحسب متوسط قيم <code translate="no">price</code> غير الفارغة.</td></tr>
<tr><td><code translate="no">min_price</code></td><td><code translate="no">min</code></td><td><code translate="no">price</code></td><td>تُرجع أدنى قيمة غير فارغة لـ <code translate="no">price</code>.</td></tr>
</tbody>
</table>
<p>يدعم تجميع البحث عمليات المقاييس التالية:</p>
<ul>
<li><code translate="no">count</code> يقبل المصدر الخاص <code translate="no">&quot;*&quot;</code> لحساب كل كيان في الحاوية، أو اسم حقل لحساب الكيانات التي لا تكون قيمة حقلها <code translate="no">NULL</code>. على سبيل المثال، إذا كانت الحاوية تحتوي على 10 كيانات وكان اثنان منها قد تم تعيين <code translate="no">price</code> لهما على <code translate="no">NULL</code> ، فإن المقياس <code translate="no">count</code> الذي يستخدم المصدر <code translate="no">&quot;*&quot;</code> يُرجع 10، بينما المقياس الذي يستخدم المصدر <code translate="no">&quot;price&quot;</code> يُرجع 8.</li>
<li><code translate="no">sum</code>، <code translate="no">avg</code> ، <code translate="no">min</code> ، و <code translate="no">max</code> تقبل حقلًا رقميًا مدعومًا أو المصدر المدمج <code translate="no">_score</code> ، الذي يمثل تشابه أو مسافة الشبكة العصبية الاصطناعية (ANN). تتجاهل هذه العمليات قيم <code translate="no">NULL</code>.</li>
</ul>
<p>لترتيب المجموعات وفقًا لقيمة مشتقة من <code translate="no">_score</code> ، قم بتعريف اسم مستعار للمقياس استنادًا إلى <code translate="no">_score</code> ، ثم استخدم هذا الاسم المستعار في <code translate="no">order</code>. لا يُعد <code translate="no">_score</code> مفتاحًا مباشرًا لترتيب المجموعات. على سبيل المثال، نظرًا لأن هذا الدليل يستخدم <code translate="no">COSINE</code> ، قم بتعريف <code translate="no">&quot;max_score&quot;: {&quot;max&quot;: &quot;_score&quot;}</code> في <code translate="no">metrics</code> ، ثم استخدم <code translate="no">{&quot;max_score&quot;: &quot;desc&quot;}</code> في <code translate="no">order</code>. يؤدي ذلك إلى وضع المجموعات التي تحتوي على الكيان الأكثر مطابقة والذي يحصل على درجة تشابه أعلى في المرتبة الأولى.</p>
<p><strong>ترتيب المجموعات.</strong></p>
<p><code translate="no">SearchAggregation.order</code> يتحكم في ترتيب المجموعات التي يتم إرجاعها. كل إدخال يربط مفتاح الترتيب بـ <code translate="no">&quot;asc&quot;</code> أو <code translate="no">&quot;desc&quot;</code>. يقوم Milvus بتقييم الإدخالات المتعددة من الأول إلى الأخير.</p>
<p>يمكن أن يكون مفتاح الفرز:</p>
<ul>
<li>اسم مستعار لمقياس محدد في <code translate="no">metrics</code> على نفس مستوى التجميع، مثل <code translate="no">avg_price</code> ؛</li>
<li>مفتاح « <code translate="no">_count</code> » المدمج، الذي يمثل عدد كيانات مجموعة الاسترجاع في الحاوية؛ أو</li>
<li>مفتاح <code translate="no">_key</code> المدمج، الذي يمثل مفتاح الباكيت بدلاً من حقل المجموعة المسمى <code translate="no">_key</code>.</li>
</ul>
<p>إذا حذفت <code translate="no">order</code> ، فسيحتفظ Milvus بترتيب اكتشاف الباكيت من مجموعة الاسترجاع. قم بتعيين <code translate="no">order</code> عندما يجب أن تتبع الباكيتات مقياسًا أو عددًا أو مفتاحًا.</p>
<p>في هذا المثال:</p>
<table>
<thead>
<tr><th>المدخل</th><th>التأثير</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">{&quot;avg_price&quot;: &quot;desc&quot;}</code></td><td>يُرتب المجموعات من الأعلى إلى الأدنى وفقًا لـ <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">{&quot;_key&quot;: &quot;asc&quot;}</code></td><td>يحسم التعادل بترتيب مفاتيح المجموعات التصاعدي. مع <code translate="no">fields=[&quot;brand&quot;]</code> ، تتبع المجموعات ذات الأسعار المتساوية الترتيب الأبجدي: <code translate="no">Adidas</code> ، <code translate="no">Nike</code> ، ثم <code translate="no">Puma</code>. لا تتأثر المجموعات ذات قيم <code translate="no">avg_price</code> المختلفة. مع <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> ، يقارن Milvus <code translate="no">brand</code> أولاً، ولا يقارن <code translate="no">color</code> إلا عندما تكون قيم العلامات التجارية متساوية.</td></tr>
</tbody>
</table>
<h3 id="Return-and-sort-representative-hits" class="common-anchor-header">إرجاع النتائج التمثيلية وفرزها<button data-href="#Return-and-sort-representative-hits" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">TopHits</code> لإرجاع وفرز الكيانات التمثيلية من كل مجموعة محددة:</p>
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
<p><summary>عرض مجموعة تحتوي على نتائج ممثلة</summary></p>
<p>تم التقاط المجموعة التالية الخاصة بـ Nike من الطلب أعلاه وتم تسلسلها بتنسيق JSON لتسهيل القراءة.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997663497924805</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997047781944275</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span><span class="hljs-punctuation">,</span>
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
<tr><td><code translate="no">top_hits</code></td><td>اختياري. يقوم بتكوين الكيانات التمثيلية لمستوى التجميع هذا. إذا تم حذفه، فإن Milvus لا يزال يعرض مفتاح المجموعة، والعدد، والمقاييس، والمجموعات الفرعية، لكن <code translate="no">bucket.hits</code> يظل فارغًا.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>يعرض ما يصل إلى كيانين تمثيليين من كل مجموعة محددة.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>ترتيب الكيانات داخل كل دلو باستخدام المعايير المذكورة.</td></tr>
</tbody>
</table>
<p>قم بتعيين <code translate="no">top_hits</code> فقط عندما يحتاج التطبيق إلى كيانات تمثيلية من كل دلو.</p>
<p><code translate="no">SearchAggregation.order</code> يقوم `sorts buckets` بفرز المجموعات، بينما يقوم ` <code translate="no">TopHits.sort</code> ` بفرز الكيانات داخل كل مجموعة. يقبل ` <code translate="no">TopHits.sort</code> ` أسماء الحقول القياسية المدعومة والحقل المدمج ` <code translate="no">_score</code> `، الذي يمثل التشابه أو المسافة في الشبكة العصبية الاصطناعية (ANN). يقوم Milvus بتقييم إدخالات ` <code translate="no">sort</code> ` من الأول إلى الأخير. في هذا المثال، يتم ترتيب المنتجات حسب <code translate="no">rating</code> من الأعلى إلى الأدنى، ولا يتم استخدام <code translate="no">_score</code> إلا عندما يتساوى تقييمان. ونظرًا لأن الإعداد يستخدم <code translate="no">COSINE</code> ، فإن الترتيب التنازلي <code translate="no">_score</code> يضع المنتج الأكثر تشابهًا في المرتبة الأولى.</p>
<p>لا يلزم أن تظهر الحقول التي يستخدمها <code translate="no">TopHits.sort</code> في <code translate="no">output_fields</code>. ومع ذلك، يتم تضمين الحقول الموجودة في <code translate="no">output_fields</code> فقط في تعيين <code translate="no">fields</code> لكل نتيجة يتم إرجاعها.</p>
<p>يكشف كل <code translate="no">AggregationHit</code> مُرجع عن مفتاحه الأساسي في <code translate="no">pk</code> ، ودرجة المتجه في <code translate="no">score</code> ، وحقول الإخراج المطلوبة في <code translate="no">fields</code>.</p>
<h3 id="Create-nested-buckets" class="common-anchor-header">إنشاء مجموعات متداخلة<button data-href="#Create-nested-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">sub_aggregation</code> لتشغيل تجميع آخر داخل كل دلو أبوي. لا يتلقى التجميع الفرعي سوى الكيانات المخصصة للدلو الأبوي الخاص به. يقوم التكوين التالي أولاً بتجميع المنتجات حسب الفئة، ثم تجميع المنتجات في كل فئة حسب العلامة التجارية:</p>
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
<p>يُظهر المقتطف المتسلسل التالي المجموعة الأم <code translate="no">running_shoes</code> ومجموعتها الفرعية Adidas. تم حذف المجموعتين الفرعيتين Nike وPuma اختصارًا.</p>
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
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
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
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.999454140663147</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span><span class="hljs-punctuation">,</span>
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
<p>يقوم Milvus أولاً باختيار ما يصل إلى مجموعتين من فئات المجموعات، مرتبة حسب <code translate="no">product_count</code>. ثم يقوم بتشغيل <code translate="no">sub_aggregation</code> بشكل مستقل داخل كل فئة محددة ويعرض ما يصل إلى ثلاث مجموعات للعلامات التجارية، مرتبة حسب <code translate="no">avg_rating</code>.</p>
<p>في الناتج أعلاه:</p>
<ul>
<li>يحتوي المجموع الجذري <code translate="no">running_shoes</code> على أربعة كيانات من مجموعة الاسترجاع. وتحتوي مجموعات <code translate="no">metrics</code> الخاصة به على قيم المستوى الجذري <code translate="no">avg_price</code> و <code translate="no">product_count</code>.</li>
<li>تحتوي قائمة <code translate="no">sub_groups</code> الخاصة بالمجموعة الجذرية على مجموعات العلامات التجارية الفرعية. تحتوي مجموعة Adidas المعروضة على كيان واحد وقيمتي <code translate="no">avg_rating</code> و <code translate="no">brand_count</code> الخاصتين بها.</li>
<li>قائمة <code translate="no">hits</code> الخاصة بالمجموعة الجذرية فارغة لأن التجميع الجذري لا يقوم بتكوين <code translate="no">top_hits</code>. تحتوي المجموعة الفرعية «Adidas» على نتيجة تمثيلية لأن <code translate="no">top_hits</code> تم تكوينه في <code translate="no">sub_aggregation</code>.</li>
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
    </button></h3><p>يقوم تجميع البحث بتلخيص مجموعة استرجاع شبكة الأنونيموس (ANN). ولا يقوم بتشغيل تجميع للمجموعة الكاملة.</p>
<p>على سبيل المثال، لنفترض أن مجموعة تحتوي على 5,000 منتج من Nike، لكن مجموعة الاسترجاع لاستعلام واحد تحتوي على 35 منتجًا من Nike. يصف مقياس « <code translate="no">product_count</code> » في مجموعة Nike تلك المنتجات الـ35 المسترجعة. ولا يبلغ عن 5,000.</p>
<p>يكون التقريب مهمًا بشكل خاص عندما يستخدم « <code translate="no">order</code> » اسمًا مستعارًا للمقياس. يمكن أن تؤدي التغييرات في استرجاع البحث إلى تغيير قيم المقاييس، وبالتالي تغيير المجموعات التي تتناسب مع « <code translate="no">SearchAggregation.size</code> ». يمكن أن يؤدي التجميع المتداخل إلى تضخيم هذا التأثير لأن كل مستوى فرعي يعمل على الكيانات المتاحة في المجموعة الأم.</p>
<p>إذا كنت بحاجة إلى إحصائيات دقيقة عن كل كيان مطابق، فاستخدم سير عمل تجميع الاستعلام الدقيق بدلاً من تجميع البحث.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">كيف يختلف «تجميع البحث» عن «البحث المجمّع»؟<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <a href="/docs/ar/grouping-search.md">«البحث التجميعي» (Grouping Search</a> ) عندما يكون هدفك هو تحسين تنوع النتائج والتحكم في عدد الكيانات التي تعرضها كل مجموعة.</p>
<p>استخدم «التجميع البحثي» (Search Aggregation) عندما تحتاج إلى نتائج مجمعات منظمة، مثل المفاتيح المركبة، أو المقاييس لكل مجمع، أو ترتيب المجمعات، أو النتائج التمثيلية المصنفة بشكل مستقل، أو المجمعات المتداخلة. يستخدم «التجميع البحثي» (Search Aggregation) واجهة برمجة تطبيقات (API) منفصلة ويعرض نتائجه عبر <code translate="no">result.agg_buckets</code>.</p>
<p>لا تقم بدمج <code translate="no">search_aggregation</code> مع <code translate="no">group_by_field</code> أو <code translate="no">group_by_fields</code> في نفس الطلب.</p>
