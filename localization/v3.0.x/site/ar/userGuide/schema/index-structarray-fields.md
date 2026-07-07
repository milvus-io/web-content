---
id: index-structarray-fields.md
title: فهرسة حقول StructArray
summary: >-
  قم بإنشاء فهارس على الحقول الفرعية لـ StructArray قبل إجراء البحث المتجه أو
  تسريع عملية التصفية القياسية. بالنسبة لحقل StructArray، يكون هدف الفهرس هو
  مسار الحقل الفرعي، مثل chunks[emb_list_vector] أو chunks[emb] أو
  chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">فهرسة حقول StructArray<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>قم بإنشاء فهارس على الحقول الفرعية لـ StructArray قبل تشغيل البحث المتجه أو تسريع التصفية القياسية. بالنسبة لحقل StructArray، يكون هدف الفهرس هو مسار حقل فرعي، مثل <code translate="no">chunks[emb_list_vector]</code> أو <code translate="no">chunks[emb]</code> أو <code translate="no">chunks[section]</code>.</p>
<p>تستخدم هذه الصفحة مجموعة <code translate="no">tech_articles</code> من <a href="/docs/ar/create-structarray-field.md">"إنشاء حقل StructArray</a>". يحتوي حقل StructArray <code translate="no">chunks</code> على حقول فرعية قياسية للتصفية وحقول فرعية متجهة للبحث.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل البدء<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من أن مخطط المجموعة يحتوي بالفعل على حقل StructArray <code translate="no">chunks</code> وأن البيانات قد تم إدراجها.</p>
<table>
<thead>
<tr><th>مسار الحقل الفرعي</th><th>النوع</th><th>الغرض من الفهرس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>البحث في EmbeddingList باستخدام مقاييس <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>البحث على مستوى العناصر باستخدام مقاييس متجهة عادية.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>التصفية التصنيفية.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>التصفية الرقمية والمسندات على غرار النطاق.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>التصفية المنطقية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>لا يقبل الحقل المتجه أو الحقل الفرعي المتجه سوى فهرس واحد. إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العناصر، فأنشئ حقلين فرعيين متجهين منفصلين وقم بفهرستهما بشكل منفصل. في هذه الصفحة، يتم فهرسة <code translate="no">chunks[emb_list_vector]</code> للبحث في EmbeddingList، ويتم فهرسة <code translate="no">chunks[emb]</code> للبحث على مستوى العناصر.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">اختر الفهارس<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم وضع البحث لاختيار عائلة المقاييس المتجهة.</p>
<table>
<thead>
<tr><th>هدف البحث أو التصفية</th><th>المسار المستهدف</th><th>ما يجب اختياره</th></tr>
</thead>
<tbody>
<tr><td>البحث في قائمة التضمين</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>مجموعة المقاييس " <code translate="no">MAX_SIM*</code> ".</td></tr>
<tr><td>البحث المتجهي على مستوى العنصر</td><td><code translate="no">chunks[emb]</code></td><td>عائلة المقاييس المتجهة العادية، مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>التصفية حسب السلسلة أو الفئة</td><td><code translate="no">chunks[section]</code></td><td>فهرس قياسي يدعمه الهدف الخاص بك.</td></tr>
<tr><td>التصفية حسب النطاق العددي</td><td><code translate="no">chunks[quality_score]</code>، <code translate="no">chunks[page]</code></td><td>مؤشر قياسي يدعمه الهدف الخاص بك.</td></tr>
<tr><td>التصفية حسب القيمة المنطقية</td><td><code translate="no">chunks[has_code]</code></td><td>مؤشر قياسي يدعمه الهدف الخاص بك.</td></tr>
</tbody>
</table>
<p>يعامل البحث في EmbeddingList المتجهات الموجودة في حقل فرعي من نوع StructArray كقائمة تضمين ويُرجع نتائج على مستوى الكيان. أما البحث على مستوى العنصر فيبحث في كل عنصر من عناصر Struct بشكل مستقل ويمكنه إرجاع إزاحة العنصر المطابق.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">إنشاء فهارس متجهة<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنشئ المثال التالي فهرسين متجهيين. يستخدم الفهرس الأول مقياس " <code translate="no">MAX_SIM*</code> " للبحث في قائمة التضمين (EmbeddingList). ويستخدم الفهرس الثاني مقياسًا متجهيًّا عاديًّا للبحث على مستوى العنصر.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تحذير
لا تقم بإنشاء فهرس « <code translate="no">MAX_SIM*</code> » وفهرس بمقياس متجه عادي في نفس الحقل الفرعي للمتجه. إذا كان كلا وضعي البحث مطلوبين، فاكتب المتجهات في حقلين فرعيين منفصلين للمتجه وأنشئ فهرسًا واحدًا لكل حقل فرعي.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">إنشاء فهارس قياسية<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء فهارس سكالارية على الحقول الفرعية السكالارية لـ StructArray عند استخدامها في عوامل التصفية. استخدم نفس صيغة مسار <code translate="no">structArray[subfield]</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>تعد الفهارس القياسية اختيارية ولكنها مفيدة عندما تظهر الحقول الفرعية القياسية لـ StructArray بشكل متكرر في عوامل التصفية، مثل <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> أو <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">توافق مقاييس الفهرس<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الجداول التالية لاختيار نوع الفهرس ونوع المقياس لحقل فرعي متجهي من StructArray. ابدأ من الهدف، ثم اختر عائلة المقاييس حسب وضع البحث.</p>
<p>اختر نوع فهرس Milvus ونوع المقياس من جداول التوافق التالية.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">البحث في EmbeddingList<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم بحث EmbeddingList مقاييس <code translate="no">MAX_SIM*</code>. ويعامل المتجهات الموجودة في حقل فرعي من نوع StructArray على أنها قائمة تضمين ويُرجع نتائج على مستوى الكيان.</p>
<table>
<thead>
<tr><th>نوع بيانات الحقل الفرعي للمتجهات</th><th>نوع الفهرس</th><th>نوع المقياس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>، <code translate="no">FLOAT16_VECTOR</code> ، <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>، <code translate="no">IVF_FLAT_CC</code> ، <code translate="no">HNSW</code> ، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code> ، <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>، <code translate="no">MAX_SIM_COSINE</code> ، <code translate="no">MAX_SIM_IP</code> ، <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>، <code translate="no">MAX_SIM_COSINE</code> ، <code translate="no">MAX_SIM_IP</code> ، <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>، <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">البحث على مستوى العناصر<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم البحث على مستوى العناصر مقاييس متجهة عادية. ويقوم بالبحث في كل عنصر من عناصر Struct بشكل مستقل ويمكنه إرجاع إزاحة العنصر المطابق.</p>
<table>
<thead>
<tr><th>نوع بيانات الحقل الفرعي للمتجه</th><th>نوع الفهرس</th><th>نوع المقياس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>، <code translate="no">FLOAT16_VECTOR</code> ، <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>، <code translate="no">IVF_FLAT</code> ، <code translate="no">IVF_FLAT_CC</code> ، <code translate="no">IVF_SQ8</code> ، <code translate="no">IVF_SQ_CC</code> ، <code translate="no">IVF_PQ</code> ، <code translate="no">SCANN</code> ، <code translate="no">IVF_RABITQ</code> ، <code translate="no">IVF_RABITQ_FASTSCAN</code> ، <code translate="no">HNSW</code> ، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code> ، <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code> ، <code translate="no">SUBSTRUCTURE</code> ، <code translate="no">SUPERSTRUCTURE</code> ، <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>للحصول على الدعم الخاص بالإصدارات والقيود الأخرى، راجع " <a href="/docs/ar/structarray-limits.md">قيود StructArray</a>".</p>
<h2 id="Verify-indexes" class="common-anchor-header">التحقق من الفهارس<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء الفهارس، قم بوصف فهارس المجموعة أو القائمة للتأكد من أن مسارات الحقول الفرعية المتوقعة قد تم فهرستها.</p>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا وصف فهرس معين إذا كان إصدار SDK الخاص بك يوفر واجهات برمجة تطبيقات (API) لوصف الفهارس.</p>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-rules" class="common-anchor-header">قواعد الفهرسة<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>القاعدة</th><th>الشرح</th></tr>
</thead>
<tbody>
<tr><td>استخدم صيغة المسار لفهارس الحقول الفرعية.</td><td>قم بفهرسة <code translate="no">chunks[emb]</code> ، وليس <code translate="no">emb</code> أو <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>يقبل كل حقل فرعي متجه فهرسًا واحدًا.</td><td>استخدم حقول فرعية متجهة منفصلة إذا كنت بحاجة إلى مجموعات مقاييس مختلفة.</td></tr>
<tr><td>استخدم مقاييس <code translate="no">MAX_SIM*</code> للبحث في EmbeddingList.</td><td>تتطلب بيانات استعلام EmbeddingList فهرسًا تم إنشاؤه باستخدام مقياس <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td>استخدم مقاييس المتجهات العادية للبحث على مستوى العناصر.</td><td>يستخدم البحث على مستوى العنصر بيانات استعلام متجهة عادية ومقاييس مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>قم بفهرسة الحقول الفرعية القياسية التي تظهر في عوامل التصفية.</td><td>استخدم أنواع الفهرس القياسي التي يدعمها هدفك.</td></tr>
<tr><td>ضع حدود الحقول المتجهة في الاعتبار.</td><td>العدد الإجمالي للحقول المتجهة والحقول الفرعية المتجهة محدود. راجع حدود StructArray قبل إضافة العديد من الحقول الفرعية المتجهة.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">الأخطاء الشائعة<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>إنشاء فهرس على <code translate="no">chunks.emb</code> بدلاً من <code translate="no">chunks[emb]</code>.</p></li>
<li><p>إنشاء فهرس <code translate="no">MAX_SIM*</code> فقط ثم محاولة إجراء بحث على مستوى العنصر في نفس الحقل الفرعي.</p></li>
<li><p>إنشاء فهرس متجه عادي فقط ثم محاولة تشغيل بحث EmbeddingList على نفس الحقل الفرعي.</p></li>
<li><p>إعادة استخدام حقل فرعي متجه واحد لكل من مقاييس <code translate="no">MAX_SIM*</code> والمقاييس المتجهة العادية.</p></li>
<li><p>تجاهل الفهارس القياسية لمرشحات StructArray المستخدمة بكثرة.</p></li>
<li><p>فهرسة حقل فرعي لـ StructArray غير موجود في مخطط Struct.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>لتشغيل بحث EmbeddingList على مستوى الكيان أو البحث المتجه على مستوى العنصر، اقرأ "البحث المتجه الأساسي باستخدام StructArray".</p></li>
<li><p>لتصفية الحقول الفرعية القياسية لـ StructArray أثناء البحث، اقرأ "البحث المُصفى باستخدام StructArray".</p></li>
<li><p>لمراجعة حدود الفهرس والمقاييس، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
