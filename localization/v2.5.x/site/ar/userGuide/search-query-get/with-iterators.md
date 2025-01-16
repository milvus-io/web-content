---
id: with-iterators.md
order: 4
summary: يوفر Milvus مكررات بحث واستعلام لتكرار النتائج مع حجم كبير من الكيانات.
title: مع المتكررات
---
<h1 id="Search-Iterator​" class="common-anchor-header">مكرر البحث<button data-href="#Search-Iterator​" class="anchor-icon" translate="no">
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
    </button></h1><p>يحتوي بحث ANN Search على حد أقصى لعدد الكيانات التي يمكن استدعاؤها في استعلام واحد، وقد لا يلبي مجرد استخدام بحث ANN Search الأساسي متطلبات الاسترجاع على نطاق واسع. بالنسبة لطلبات بحث ANN Search حيث يتجاوز عدد الكيانات الأعلىK 16,384 كيانًا، يُنصح باستخدام أداة التكرار SearchIterator. سيقدم هذا القسم كيفية استخدام SearchIterator والاعتبارات ذات الصلة.</p>
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
    </button></h2><p>يقوم طلب البحث بإرجاع نتائج البحث، بينما يقوم SearchIterator بإرجاع مكرر. يمكنك استدعاء الأسلوب <strong>التالي()</strong> لهذا المُؤشِّر للحصول على نتائج البحث.</p>
<p>على وجه التحديد، يمكنك استخدام SearchIterators على النحو التالي.</p>
<ol>
<li><p>قم بإنشاء SearchIterator وقم بتعيين <strong>عدد الكيانات المراد إرجاعها لكل طلب بحث</strong> <strong>والعدد الإجمالي للكيانات المراد إرجاعها</strong>.</p></li>
<li><p>استدعاء الأسلوب <strong>التالي()</strong> من SearchIterator في حلقة للحصول على نتيجة البحث بطريقة ترقيم الصفحات.</p></li>
<li><p>استدع أسلوب <strong>الإغلاق()</strong> الخاص بالمُكرر لإنهاء الحلقة إذا أرجع الأسلوب <strong>التالي()</strong> نتيجة فارغة.</p></li>
</ol>
<h2 id="Create-SearchIterator​" class="common-anchor-header">إنشاء مكرر بحث<button data-href="#Create-SearchIterator​" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضِّح مقتطف الشيفرة التالي كيفية إنشاء مُؤشِّر بحث.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus import connections, Collection​
​
connections.connect(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-meta"># create iterator​</span>
query_vectors = [​
    [<span class="hljs-meta">0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592</span>]]​
​
collection = Collection(<span class="hljs-string">&quot;iterator_collection&quot;</span>)​
​
iterator = collection.search_iterator(​
    data=query_vectors,​
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,​
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    batch_size=<span class="hljs-number">50</span>,​
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>],​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    limit=<span class="hljs-number">20000</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.orm.iterator.SearchIterator;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam.MetricType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchIterator</span> <span class="hljs-variable">searchIterator</span> <span class="hljs-operator">=</span> client.searchIterator(SearchIteratorReq.builder()​
        .collectionName(<span class="hljs-string">&quot;iterator_collection&quot;</span>)​
        .vectors(Collections.singletonList(queryVector))​
        .vectorFieldName(<span class="hljs-string">&quot;vector&quot;</span>)​
        .batchSize(<span class="hljs-number">500L</span>)​
        .outputFields(Lists.newArrayList(<span class="hljs-string">&quot;color&quot;</span>))​
        .topK(<span class="hljs-number">20000</span>)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<p>في الأمثلة أعلاه، لقد قمت بتعيين عدد الكيانات المراد إرجاعها لكل بحث<strong>(batch_size/</strong><strong>batchSize</strong>) إلى 50، والعدد الإجمالي للكيانات المراد إرجاعها<strong>(topK</strong>) إلى 20,000.</p>
<h2 id="Use-SearchIterator​" class="common-anchor-header">استخدام SearchIterator<button data-href="#Use-SearchIterator​" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن يصبح SearchIterator جاهزًا، يمكنك استدعاء طريقة التالي() الخاصة به للحصول على نتائج البحث بطريقة ترقيم الصفحات.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a></div>
<pre><code translate="no" class="language-python">results = []​
​
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:​
    <span class="hljs-comment"># highlight-next-line​</span>
    result = iterator.<span class="hljs-built_in">next</span>()​
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:​
        <span class="hljs-comment"># highlight-next-line​</span>
        iterator.close()​
        <span class="hljs-keyword">break</span>​
    ​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:​
        results.append(hit.to_dict())​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;​
​
while (<span class="hljs-literal">true</span>) {​
    List&lt;QueryResultsWrapper.RowRecord&gt; res = searchIterator.next();​
    <span class="hljs-keyword">if</span> (res.isEmpty()) {​
        searchIterator.<span class="hljs-built_in">close</span>();​
        <span class="hljs-keyword">break</span>;​
    }​
​
    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord record : res) {​
        System.out.<span class="hljs-built_in">println</span>(record);​
    }​
}​

<button class="copy-code-btn"></button></code></pre>
<p>في الأمثلة البرمجية أعلاه، قمتَ بإنشاء حلقة لا نهائية واستدعيتَ طريقة <strong>التالي()</strong> في الحلقة لتخزين نتائج البحث في متغير وأغلقتَ المُؤشِّر عندما لا يُرجع <strong>التالي()</strong> شيئًا.</p>