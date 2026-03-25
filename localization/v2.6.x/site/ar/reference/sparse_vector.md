---
id: sparse_vector.md
summary: تعلم كيفية استخدام المتجهات المتفرقة في ميلفوس.
title: المتجهات المتفرقة
---
<h1 id="Sparse-Vector" class="common-anchor-header">المتجهات المتفرقة<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>تمثل المتجهات المتفرقة الكلمات أو العبارات باستخدام تضمينات المتجهات حيث تكون معظم العناصر صفرية، مع وجود عنصر واحد فقط غير صفري يشير إلى وجود كلمة معينة. تتفوق نماذج المتجهات المتناثرة، مثل <a href="https://arxiv.org/abs/2109.10086">SPLADEv2،</a> على النماذج الكثيفة في البحث عن المعرفة خارج النطاق، والوعي بالكلمات الرئيسية، وقابلية التفسير. وهي مفيدة بشكل خاص في استرجاع المعلومات ومعالجة اللغة الطبيعية وأنظمة التوصيات، حيث يمكن أن يؤدي الجمع بين المتجهات المتفرقة للاستدعاء ونموذج كبير للترتيب إلى تحسين نتائج الاسترجاع بشكل كبير.</p>
<p>في ميلفوس، يتبع استخدام المتجهات المتفرقة سير عمل مماثل لسير عمل المتجهات الكثيفة. وهو يتضمن إنشاء مجموعة بعمود متجه متناثر، وإدراج البيانات، وإنشاء فهرس، وإجراء عمليات بحث عن التشابه والاستعلامات القياسية.</p>
<p>في هذا البرنامج التعليمي، سوف تتعلم كيفية:</p>
<ul>
<li>إعداد تضمينات المتجهات المتفرقة;</li>
<li>إنشاء مجموعة مع حقل متجه متناثر;</li>
<li>إدراج الكيانات ذات التضمينات المتجهة المتفرقة;</li>
<li>فهرسة المجموعة وإجراء بحث ANN على المتجهات المتفرقة.</li>
</ul>
<p>لمشاهدة المتجهات المتفرقة أثناء العمل، راجع <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py.</a></p>
<div class="admonition note">
    <p><b>ملاحظات</b></p>
        حاليًا، دعم المتجهات المتفرقة هو ميزة تجريبية في الإصدار 2.4.0، مع وجود خطط لجعلها متاحة بشكل عام في الإصدار 3.0.0.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">إعداد تضمينات المتجهات المتفرقة<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام المتجهات المتفرقة في ميلفوس، قم بإعداد تضمينات المتجهات بأحد التنسيقات المدعومة:</p>
<ul>
<li><p><strong>المصفوفات المتفرقة</strong>: استخدم عائلة فئة <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> لتمثيل التضمينات المتفرقة الخاصة بك. هذه الطريقة فعالة للتعامل مع البيانات واسعة النطاق وعالية الأبعاد.</p></li>
<li><p><strong>قائمة القواميس</strong>: تمثيل كل تضمين متناثر كقاموس، منظم على شكل <code translate="no">{dimension_index: value, ...}</code> ، حيث يمثل كل زوج من المفاتيح والقيمة فهرس البعد وقيمته المقابلة.</p>
<p>مثال:</p>
<pre><code translate="no" class="language-python">{<span class="hljs-number">2</span>: <span class="hljs-number">0.33</span>, <span class="hljs-number">98</span>: <span class="hljs-number">0.72</span>, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>قائمة قواميس التضمين المتكرر</strong>: مشابه لقائمة القواميس، ولكن استخدم قائمة من القواميس، <code translate="no">[(dimension_index, value)]</code> ، لتحديد الأبعاد غير الصفرية وقيمها فقط.</p>
<p>مثال:</p>
<pre><code translate="no" class="language-python">[(<span class="hljs-number">2</span>, <span class="hljs-number">0.33</span>), (<span class="hljs-number">98</span>, <span class="hljs-number">0.72</span>), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>يقوم المثال التالي بإعداد التضمينات المتفرقة عن طريق توليد مصفوفة متناثرة عشوائية لـ 10000 كيان، لكل منها 10000 بُعد وكثافة تناثرية تبلغ 0.005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>ملاحظات</b></p>
<p>يجب أن تكون أبعاد المتجهات من نوع Python <code translate="no">int</code> أو <code translate="no">numpy.integer</code> ، ويجب أن تكون القيم من نوع Python <code translate="no">float</code> أو <code translate="no">numpy.floating</code>.</p>
</div>
<p>لتوليد التضمينات، يمكنك أيضًا استخدام الحزمة <code translate="no">model</code> المضمنة في مكتبة PyMilvus، والتي تقدم مجموعة من وظائف التضمين. لمزيد من التفاصيل، راجع <a href="/docs/ar/embeddings.md">التضمينات</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">إنشاء مجموعة ذات حقل متجه متناثر<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء مجموعة مع حقل متجه متناثر، قم بتعيين <strong>نوع بيانات</strong> حقل المتجه المتناثر إلى <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. على عكس المتجهات الكثيفة، ليست هناك حاجة لتحديد بُعد للمتجهات المتفرقة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على تفاصيل حول معلمات المجموعة الشائعة، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a>.</p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">إدراج الكيانات ذات التضمينات المتجهة المتفرقة<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>لإدراج الكيانات ذات التضمينات المتجهة المتناثرة، ما عليك سوى تمرير قائمة الكيانات إلى <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> الطريقة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">فهرسة المجموعة<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل إجراء عمليات البحث عن التشابه، قم بإنشاء فهرس للمجموعة. لمزيد من المعلومات حول أنواع الفهرس والمعلمات راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">إضافة_فهرس()</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">وإنشاء_فهرس()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>لبناء فهرس على المتجهات المتناثرة، لاحظ ما يلي:</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. الخيارات الممكنة للمتجهات المتفرقة:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: فهرس مقلوب يقوم بتعيين كل بُعد إلى متجهاته غير الصفرية، مما يسهل الوصول المباشر إلى البيانات ذات الصلة أثناء عمليات البحث. مثالي لمجموعات البيانات ذات البيانات المتفرقة ولكن عالية الأبعاد.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: يستخدم خوارزمية (WAND) الضعيفة لتجاوز المرشحين غير المحتملين بسرعة، مع تركيز التقييم على أولئك الذين لديهم إمكانات ترتيب أعلى. يعامل الأبعاد على أنها مصطلحات ومتجهات كمستندات، مما يسرّع من عمليات البحث في مجموعات البيانات الكبيرة والمتناثرة.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: يتم دعم مقياس المسافة <code translate="no">IP</code> (المنتج الداخلي) فقط للمتجهات المتفرقة.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: معلمة الفهرس المستخدمة خصيصًا للمتجهات المتفرقة. تتحكم في نسبة قيم المتجهات الصغيرة التي يتم استبعادها أثناء عملية الفهرسة. تتيح هذه المعلمة ضبط المفاضلة بين الكفاءة والدقة من خلال تجاهل القيم الصغيرة عند إنشاء الفهرس. على سبيل المثال، إذا كان <code translate="no">drop_ratio_build = 0.3</code> ، أثناء إنشاء الفهرس، يتم تجميع جميع القيم من جميع المتجهات المتفرقة وفرزها. لا يتم تضمين أصغر 30% من هذه القيم في الفهرس، مما يقلل من عبء العمل الحسابي أثناء البحث.</p></li>
</ul>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/index.md">الفهرس داخل الذاكرة</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">إجراء بحث في الفهرس داخل الذاكرة<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد أن تتم فهرسة المجموعة وتحميلها في الذاكرة، استخدم طريقة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> لاسترداد المستندات ذات الصلة بناءً على الاستعلام.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load the collection into memory</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

<span class="hljs-comment"># Perform ANN search on sparse vectors</span>

<span class="hljs-comment"># for demo purpose we search for the last inserted vector</span>
query_vector = entities[-<span class="hljs-number">1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during search.</span>
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> search_res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
        
<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272710786&#x27;, &#x27;distance&#x27;: 7.220192909240723, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272710786&#x27;, &#x27;scalar_field&#x27;: 0.46767865218233806}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272708317&#x27;, &#x27;distance&#x27;: 1.2287548780441284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272708317&#x27;, &#x27;scalar_field&#x27;: 0.7315987515699472}}</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: &#x27;448458373272702005&#x27;, &#x27;distance&#x27;: 0.9848432540893555, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;448458373272702005&#x27;, &#x27;scalar_field&#x27;: 0.9871869181562156}}</span>
<button class="copy-code-btn"></button></code></pre>
<p>عند تكوين معلمات البحث، لاحظ ما يلي:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: معلمة البحث المستخدمة خصيصًا للمتجهات المتفرقة. يسمح هذا الخيار بضبط عملية البحث بشكل دقيق من خلال تحديد نسبة أصغر القيم في متجه الاستعلام لتجاهلها. يساعد في تحقيق التوازن بين دقة البحث والأداء. كلما قلّت القيمة المحددة لـ <code translate="no">drop_ratio_search</code> ، قلّت مساهمة هذه القيم الصغيرة في النتيجة النهائية. من خلال تجاهل بعض القيم الصغيرة، يمكن تحسين أداء البحث بأقل تأثير على الدقة.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">إجراء استعلامات قياسية<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى البحث في الشبكة النانوية، يدعم ميلفوس أيضًا الاستعلامات القياسية على المتجهات المتفرقة. تسمح لك هذه الاستعلامات باسترداد المستندات بناءً على قيمة قياسية مرتبطة بالمتجه المتناثر. لمزيد من المعلومات حول المعلمات، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">الاستعلام ()</a>.</p>
<p>تصفية الكيانات ذات <strong>الحقل_المتجه القياسي</strong> الأكبر من 3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform a query by specifying filter expr</span>
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;pk&#x27;: &#x27;448458373272701862&#x27;, &#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}}, {&#x27;pk&#x27;: &#x27;448458373272702421&#x27;, &#x27;scalar_field&#x27;: 0.9990218525410719, &#x27;sparse_vector&#x27;: {448: 0.587817907333374, 1866: 0.0994109958410263, 2438: 0.8672442436218262, 2533: 0.8063794374465942, 2595: 0.02122959867119789, 2828: 0.33827054500579834, 2871: 0.1984412521123886, 2938: 0.09674275666475296, 3154: 0.21552987396717072, 3662: 0.5236313343048096, 3711: 0.6463911533355713, 4029: 0.4041993021965027, 7143: 0.7370485663414001, 7589: 0.37588241696357727, 7776: 0.436136394739151, 7962: 0.06377989053726196, 8385: 0.5808192491531372, 8592: 0.8865005970001221, 8648: 0.05727503448724747, 9071: 0.9450633525848389, 9161: 0.146037295460701, 9358: 0.1903032660484314, 9679: 0.3146636486053467, 9974: 0.8561339378356934, 9991: 0.15841573476791382}}]</span>
<button class="copy-code-btn"></button></code></pre>
<p>تصفية الكيانات حسب المفتاح الأساسي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
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
    </button></h2><p>عند استخدام المتجهات المتفرقة في ميلفوس، ضع في اعتبارك الحدود التالية:</p>
<ul>
<li><p>حاليًا، يتم دعم مقياس مسافة <strong>IP</strong> فقط للمتجهات المتفرقة.</p></li>
<li><p>بالنسبة لحقول المتجهات المتناثرة، يتم دعم نوعي فهرس <strong>SPARSE_INVERTED_INDEX</strong> و <strong>SPARSE_WAND</strong> فقط.</p></li>
<li><p>في الوقت الحالي، لا يتم دعم <a href="https://milvus.io/docs/single-vector-search.md#Range-search">البحث عن النطاق</a> <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">والبحث عن التجميع</a> <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">ومكرر البحث</a> للمتجهات المتفرقة.</p></li>
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
<li><p><strong>ما هو مقياس المسافة المدعوم للمتجهات المتفرقة؟</strong></p>
<p>لا تدعم المتجهات المتفرقة سوى مقياس المسافة الضرب الداخلي (IP) بسبب الأبعاد العالية للمتجهات المتفرقة، مما يجعل المسافة L2 ومسافة جيب التمام غير عمليتين.</p></li>
<li><p><strong>هل يمكنك شرح الفرق بين SPARSE_INVERTED_INDEX و SPARSE_WAND، وكيف يمكنني الاختيار بينهما؟</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> هو فهرس مقلوب تقليدي، بينما يستخدم <strong>SPARSE_WAND</strong> خوارزمية <strong>SPARSE_WAND</strong> خوارزمية <a href="https://dl.acm.org/doi/10.1145/956863.956944">ضعيفة</a> لتقليل عدد تقييمات مسافة IP الكاملة أثناء البحث. عادةً ما تكون <strong>SPARSE_WAND</strong> أسرع، لكن أداءها يمكن أن ينخفض مع زيادة كثافة المتجهات. للاختيار بينها، قم بإجراء التجارب والمعايير بناءً على مجموعة البيانات وحالة الاستخدام الخاصة بك.</p></li>
<li><p><strong>كيف يمكنني اختيار معلمات drop_ratio_build و drop_ratio_search؟</strong></p>
<p>يعتمد اختيار <strong>دروب_راتيو_بيلد</strong> <strong>ودروب_راتيو_بحث</strong> على خصائص بياناتك ومتطلباتك من حيث زمن انتقال/إنتاجية البحث والدقة.</p></li>
<li><p><strong>ما هي أنواع البيانات المدعومة للتضمينات المتفرقة؟</strong></p>
<p>يجب أن يكون جزء البُعد عددًا صحيحًا غير موزع 32 بت، ويمكن أن يكون جزء القيمة رقمًا عائمًا غير سالب 32 بت.</p></li>
<li><p><strong>هل يمكن أن يكون بُعد التضمين المتناثر أي قيمة منفصلة ضمن فضاء uint32؟</strong></p>
<p>نعم، مع استثناء واحد. يمكن أن يكون بُعد التضمين المتناثر أي قيمة في نطاق <code translate="no">[0, maximum of uint32)</code>. هذا يعني أنه لا يمكنك استخدام القيمة القصوى لـ uint32.</p></li>
<li><p><strong>هل تجرى عمليات البحث على المقاطع المتزايدة من خلال فهرس أم بالقوة الغاشمة؟</strong></p>
<p>يتم إجراء عمليات البحث على المقاطع المتنامية من خلال فهرس من نفس نوع فهرس المقطع المختوم. بالنسبة للمقاطع المتنامية الجديدة قبل إنشاء الفهرس، يتم استخدام البحث بالقوة الغاشمة.</p></li>
<li><p><strong>هل من الممكن وجود متجهات متناثرة وكثيفة في مجموعة واحدة؟</strong></p>
<p>نعم، مع دعم أنواع المتجهات المتعددة، يمكنك إنشاء مجموعات مع كل من أعمدة المتجهات المتفرقة والكثيفة وإجراء عمليات بحث مختلطة عليها.</p></li>
<li><p><strong>ما هي متطلبات التضمينات المتفرقة لإدراجها أو البحث عنها؟</strong></p>
<p>يجب أن تحتوي التضمينات المتفرقة على قيمة واحدة غير صفرية على الأقل، ويجب أن تكون مؤشرات المتجهات غير سالبة.</p></li>
</ul>
