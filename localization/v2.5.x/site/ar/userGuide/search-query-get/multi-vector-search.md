---
id: multi-vector-search.md
order: 2
summary: يوضح هذا الدليل كيفية إجراء البحث المختلط في ميلفوس وفهم إعادة ترتيب النتائج.
title: البحث الهجين
---
<h1 id="Hybrid-Search​" class="common-anchor-header">البحث الهجين<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>يشير البحث المختلط إلى طريقة بحث تُجري عمليات بحث متعددة للشبكات العصبية الاصطناعية في وقت واحد، وتعيد ترتيب مجموعات متعددة من النتائج من عمليات البحث هذه، ثم تُرجع في النهاية مجموعة واحدة من النتائج. يمكن أن يؤدي استخدام البحث الهجين إلى تحسين دقة البحث. يدعم Zilliz إجراء بحث هجين على مجموعة ذات حقول متجهة متعددة. </p>
<p>يُستخدم البحث الهجين بشكل شائع في سيناريوهات تشمل عمليات البحث عن المتجهات المتفرقة الكثيفة وعمليات البحث متعددة الوسائط. سيوضح هذا الدليل كيفية إجراء بحث هجين في Zilliz مع مثال محدد.</p>
<h2 id="Scenarios​" class="common-anchor-header">السيناريوهات<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>البحث الهجين مناسب للسيناريوهين التاليين.</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">بحث متناثر - كثيف المتجهات</h3><p>يمكن لأنواع مختلفة من المتجهات أن تمثل معلومات مختلفة، ويمكن أن يؤدي استخدام نماذج تضمين مختلفة إلى تمثيل ميزات وجوانب مختلفة من البيانات بشكل أكثر شمولاً. على سبيل المثال، يمكن أن يؤدي استخدام نماذج تضمين مختلفة لنفس الجملة إلى توليد متجه كثيف لتمثيل المعنى الدلالي ومتجه متناثر لتمثيل تكرار الكلمات في الجملة.</p>
<ul>
<li><p><strong>المتجهات المتفرقة:</strong> تتميز المتجهات المتفرقة بأبعادها المتجهة العالية ووجود عدد قليل من القيم غير الصفرية. هذه البنية تجعلها مناسبة بشكل خاص لتطبيقات استرجاع المعلومات التقليدية. في معظم الحالات، يتوافق عدد الأبعاد المستخدمة في المتجهات المتفرقة مع الرموز المختلفة في لغة واحدة أو أكثر. يتم تعيين قيمة لكل بُعد تشير إلى الأهمية النسبية لهذا الرمز في المستند. يثبت هذا التصميم فائدته للمهام التي تتضمن مطابقة النصوص.</p></li>
<li><p><strong>المتجهات الكثيفة:</strong> المتجهات الكثيفة هي تضمينات مشتقة من الشبكات العصبية. عند ترتيبها في مصفوفة مرتبة، تلتقط هذه المتجهات الجوهر الدلالي للنص المدخل. تجدر الإشارة إلى أن المتجهات الكثيفة لا تقتصر على معالجة النصوص؛ فهي تُستخدم أيضًا على نطاق واسع في الرؤية الحاسوبية لتمثيل دلالات البيانات المرئية. وتتميز هذه المتجهات الكثيفة، التي يتم إنشاؤها عادةً بواسطة نماذج تضمين النص، بأن معظم العناصر أو جميعها لا تساوي صفرًا. وبالتالي، تكون المتجهات الكثيفة فعالة بشكل خاص في تطبيقات البحث الدلالي، حيث يمكنها إرجاع النتائج الأكثر تشابهًا استنادًا إلى المسافة بين المتجهات حتى في حالة عدم وجود تطابق نصي دقيق. تتيح هذه الإمكانية الحصول على نتائج بحث أكثر دقة وإدراكًا للسياق، وغالبًا ما تلتقط العلاقات بين المفاهيم التي قد تغفلها الأساليب القائمة على الكلمات الرئيسية.</p></li>
</ul>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a> <a href="/docs/ar/dense-vector.md">والمتجهات الكثيفة</a>.</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">البحث متعدد الوسائط</h3><p>يشير البحث متعدد الوسائط إلى البحث عن تشابه البيانات غير المهيكلة عبر طرائق متعددة (مثل الصور ومقاطع الفيديو والصوت والنصوص وغيرها). على سبيل المثال، يمكن تمثيل شخص ما باستخدام طرائق مختلفة من البيانات مثل بصمات الأصابع والبصمات الصوتية وملامح الوجه. يدعم البحث الهجين عمليات بحث متعددة في وقت واحد. على سبيل المثال البحث عن شخص ببصمات أصابع وبصمات صوتية متشابهة.</p>
<h2 id="Workflow​" class="common-anchor-header">سير العمل<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>سير العمل الرئيسي لإجراء البحث الهجين هو كما يلي.</p>
<ol>
<li><p>توليد متجهات كثيفة من خلال تضمين نماذج مثل <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> و <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a>.</p></li>
<li><p>توليد متجهات متناثرة من خلال نماذج التضمين مثل <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a> و <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a> و <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a> وغيرها.</p></li>
<li><p>إنشاء مجموعة في Zilliz وتحديد مخطط المجموعة الذي يتضمن حقول المتجهات الكثيفة والمتناثرة.</p></li>
<li><p>أدخل المتجهات الكثيفة المتفرقة في المجموعة التي تم إنشاؤها للتو في الخطوة السابقة.</p></li>
<li><p>إجراء بحث هجين: سيعود البحث الهجين على المتجهات الكثيفة بمجموعة من أفضل K من النتائج الأكثر تشابهًا، كما سيعود البحث الهجين على المتجهات المتفرقة بمجموعة من أفضل K من النتائج.</p></li>
<li><p>التطبيع: قم بتطبيع درجات مجموعتي أعلى K من النتائج، وتحويل الدرجات إلى نطاق بين [0،1].</p></li>
<li><p>اختر إستراتيجية إعادة ترتيب مناسبة لدمج مجموعتي نتائج أعلى K وإعادة ترتيبها وإرجاع مجموعة نهائية من نتائج أعلى K في النهاية.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل البحث الهجين</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">أمثلة<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>سيستخدم هذا القسم مثالاً محددًا لتوضيح كيفية إجراء بحث هجين على المتجهات المتفرقة الكثيفة لتعزيز دقة عمليات البحث النصية.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">إنشاء مجموعة مع حقول متجهات متعددة</h3><p>تتضمن عملية إنشاء مجموعة ثلاثة أجزاء: تحديد مخطط المجموعة، وتكوين معلمات الفهرس، وإنشاء المجموعة.</p>
<h4 id="Define-schema​" class="common-anchor-header">تعريف المخطط</h4><p>في هذا المثال، يجب تعريف حقول متجهة متعددة ضمن مخطط المجموعة. حاليًا، يمكن أن تتضمن كل مجموعة ما يصل إلى 4 حقول متجهة بشكل افتراضي. لكن يمكنك أيضًا تعديل قيمة  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  لتضمين ما يصل إلى 10 حقول متجهة في مجموعة حسب الحاجة.</p>
<p>يحدد المثال التالي مخطط مجموعة، حيث <code translate="no">dense</code> و <code translate="no">sparse</code> هما حقلا المتجهات.</p>
<ul>
<li><p><code translate="no">id</code>: يعمل هذا الحقل كمفتاح أساسي لتخزين المعرفات النصية. نوع بيانات هذا الحقل هو INT64.</p></li>
<li><p><code translate="no">text</code>: يستخدم هذا الحقل لتخزين المحتوى النصي. نوع بيانات هذا الحقل هو VARCHAR، بحد أقصى للطول 1000 حرف.</p></li>
<li><p><code translate="no">dense</code>: يستخدم هذا الحقل لتخزين المتجهات الكثيفة للنصوص. نوع بيانات هذا الحقل هو FLOAT_VECTOR، ببعد متجه يبلغ 768.</p></li>
<li><p><code translate="no">sparse</code>: يستخدم هذا الحقل لتخزين المتجهات المتفرقة للنصوص. نوع بيانات هذا الحقل هو SPARSE_FLOAT_VECTOR.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بيثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>أثناء عمليات البحث في المتجهات المتناثرة، يمكنك تبسيط عملية توليد متجهات التضمين المتناثرة من خلال الاستفادة من إمكانيات البحث في النص الكامل. لمزيد من التفاصيل، راجع <a href="/docs/ar/full-text-search.md">البحث بالنص الكامل</a>.</p>
<h4 id="Create-index​" class="common-anchor-header">إنشاء فهرس</h4><p>بعد تحديد مخطط المجموعة، من الضروري إعداد فهارس المتجهات ومقاييس التشابه. في هذا المثال، يتم إنشاء فهرس IVF_FLAT لحقل المتجهات الكثيفة <code translate="no">dense</code> ، ويتم إنشاء فهرس SPARSE_INVERTED_INDEX لحقل المتجهات المتفرقة <code translate="no">sparse</code>. للتعرف على أنواع الفهارس المدعومة، راجع <a href="https://milvus.io/docs/index.md?tab=floating">شرح الفهرس</a>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors​</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Currently, only IP (Inner Product) is supported for sparse vectors​</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">إنشاء مجموعة</h4><p>قم بإنشاء مجموعة باسم <code translate="no">demo</code> مع مخطط المجموعة والفهارس التي تم تكوينها في الخطوتين السابقتين.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">إدراج البيانات</h3><p>أدخل المتجهات المتناثرة الكثيفة في المجموعة <code translate="no">demo</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
data=[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...]}​
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);​
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>);​
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));​
row1.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse1));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);​
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>);​
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));​
row2.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse2));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);​
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>);​
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));​
row3.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse3));​
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">var</span> data = [​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span> , <span class="hljs-attr">sparse</span>:[<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>]}       ​
]​
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;, &quot;sparse&quot;:{&quot;9637&quot;: 0.30856525997853057, &quot;4399&quot;: 0.19771651149001523}, &quot;dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},​
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;, &quot;sparse&quot;:{&quot;6959&quot;: 0.31025067641541815, &quot;1729&quot;: 0.8265339135915016}, &quot;dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},​
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;, &quot;sparse&quot;:{&quot;1220&quot;: 0.15303302147479103, &quot;7335&quot;: 0.9436728846033107}, &quot;dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}​
    ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">إنشاء مثيلات AnnSearchRequest متعددة</h3><p>يتم تنفيذ البحث الهجين من خلال إنشاء عدة <code translate="no">AnnSearchRequest</code> في الدالة <code translate="no">hybrid_search()</code> ، حيث يمثل كل <code translate="no">AnnSearchRequest</code> طلب بحث ANN أساسي لحقل متجه معين. لذلك، قبل إجراء البحث الهجين، من الضروري إنشاء <code translate="no">AnnSearchRequest</code> لكل حقل متجه.</p>
<div class="alert note">
<p>في البحث الهجين، يدعم كل <code translate="no">AnnSearchRequest</code> متجه استعلام واحد فقط.</p>
</div>
<p>لنفترض أن نص الاستعلام "من بدأ أبحاث الذكاء الاصطناعي؟" قد تم تحويله بالفعل إلى متجهات متفرقة وكثيفة. بناءً على ذلك، يتم إنشاء طلبي بحث <code translate="no">AnnSearchRequest</code> لحقلي المتجهات <code translate="no">sparse</code> و <code translate="no">dense</code> على التوالي، كما هو موضح في المثال التالي.</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)​
​
query_sparse_vector = {<span class="hljs-number">3573</span>: <span class="hljs-number">0.34701499565746674</span>}, {<span class="hljs-number">5263</span>: <span class="hljs-number">0.2639375518635271</span>}​
search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_sparse_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)​
​
reqs = [request_1, request_2]​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.vector.request.AnnSearchReq;​
import io.milvus.v2.service.vector.request.data.BaseVector;​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.request.data.SparseFloatVec;​
​
<span class="hljs-built_in">float</span>[] dense = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[]{<span class="hljs-number">-0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};​
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> TreeMap&lt;Long, Float&gt;() {{​
    put(<span class="hljs-number">3573L</span>, <span class="hljs-number">0.34701499f</span>);​
    put(<span class="hljs-number">5263L</span>, <span class="hljs-number">0.263937551f</span>);​
    ...​
}};​
​
​
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> FloatVec(dense));​
List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> SparseFloatVec(sparse));​
​
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .vectors(queryDenseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)​
        .topK(<span class="hljs-number">2</span>)​
        .build());​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .vectors(querySparseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>()​
        .topK(<span class="hljs-number">2</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> 
}​
​
<span class="hljs-keyword">const</span> search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_sparse_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
        <span class="hljs-string">&quot;params&quot;</span>: {}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> 
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[​
    {​
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],​
        &quot;annsField&quot;: &quot;dense&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {​
                &quot;nprobe&quot;: 10​
             }​
        },​
        &quot;limit&quot;: 2​
    },​
    {​
        &quot;data&quot;: [{&quot;3573&quot;: 0.34701499565746674}, {&quot;5263&quot;: 0.2639375518635271}],​
        &quot;annsField&quot;: &quot;sparse&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {}​
        },​
        &quot;limit&quot;: 2​
    }​
 ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>نظرًا لأن المعلمة <code translate="no">limit</code> مضبوطة على 2، فإن كل <code translate="no">AnnSearchRequest</code> يُرجع نتيجتي بحث. في هذا المثال، يتم إنشاء 2 <code translate="no">AnnSearchRequest</code> ، وبالتالي سيتم إرجاع إجمالي 4 نتائج بحث.</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">تكوين استراتيجية إعادة الترتيب</h3><p>لدمج وإعادة ترتيب مجموعتي نتائج بحث الشبكة النشطة ANN، من الضروري تحديد استراتيجية إعادة ترتيب مناسبة. يدعم Zilliz نوعين من استراتيجية إعادة الترتيب: استراتيجية <strong>إعادة الترتيب الموزونة</strong> واستراتيجية <strong>إعادة الترتيب RRFRanker</strong>. عند اختيار إستراتيجية إعادة الترتيب، من الأمور التي يجب أخذها بعين الاعتبار ما إذا كان هناك أي تركيز على بحث واحد أو أكثر من البحث الأساسي للشبكة العصبية الاصطناعية على حقول المتجهات.</p>
<ul>
<li><p><strong>مُرجِّح الرتبة</strong>: يوصى باستخدام هذه الاستراتيجية إذا كنت تريد أن تركز النتائج على حقل متجه معين. تسمح لك أداة WeightedRanker المرجحة بتعيين أوزان أعلى لحقول متجهة معينة، والتركيز عليها بشكل أكبر. على سبيل المثال، في عمليات البحث متعدد الوسائط، يمكن اعتبار الأوصاف النصية لصورة ما أكثر أهمية من الألوان في هذه الصورة.</p></li>
<li><p><strong>RRFRanker (مصنف دمج الرتب المتبادل)</strong>: يوصى بهذه الاستراتيجية عندما لا يكون هناك تركيز محدد. يمكن لـ RRRF موازنة أهمية كل حقل متجه بشكل فعال.</p></li>
</ul>
<p>لمزيد من التفاصيل حول آليات هاتين الاستراتيجيتين لإعادة التصنيف، راجع <a href="/docs/ar/reranking.md">إعادة التصنيف</a>.</p>
<p>يشرح المثالان التاليان كيفية استخدام استراتيجيتي إعادة الترتيب المرجحة وRRRFRanker.</p>
<ol>
<li><p><strong>مثال 1: استخدام أداة إعادة الترتيب المرجحة</strong></p>
<p>عند استخدام إستراتيجية WeightedRanker المرجحة، تحتاج إلى إدخال قيم الوزن في الدالة <code translate="no">WeightedRanker</code>. يتوافق عدد عمليات البحث الأساسية للشبكة العصبية الاصطناعية في البحث الهجين مع عدد القيم التي يجب إدخالها. يجب أن تكون قيم المدخلات في النطاق [0،1]، حيث تشير القيم الأقرب إلى 1 إلى أهمية أكبر.</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">جافا</a><a href="#curl">جافا</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
rerank= <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مثال 2: استخدام RRFRFRanker</strong></p>
<p>عند استخدام استراتيجية RRRFRanker، تحتاج إلى إدخال قيمة المعلمة <code translate="no">k</code> في RRFRanker. القيمة الافتراضية لـ <code translate="no">k</code> هي 60. تساعد هذه المعلمة على تحديد كيفية دمج الرتب من مختلف عمليات بحث الشبكة العنكبوتية الوطنية، بهدف موازنة ومزج الأهمية في جميع عمليات البحث.</p>
<p><div class="multipleCode">
<a href="#python">بايثون </a><a href="#java">جافا</a><a href="#curl">جافا</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">إجراء بحث هجين</h3><p>قبل إجراء بحث مختلط، من الضروري تحميل المجموعة في الذاكرة. إذا لم يكن لأي حقول متجهة في المجموعة فهرس أو لم يتم تحميلها، سيحدث خطأ عند استدعاء طريقة البحث الهجين. </p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي الإخراج.</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>بما أنه تم تحديد <code translate="no">limit=2</code> في البحث الهجين، سيعيد Zilliz ترتيب نتائج البحث الأربعة من الخطوة 3 ويعيد في النهاية فقط أعلى نتيجتي بحث متشابهتين. </p>
