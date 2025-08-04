---
id: model-ranker-overview.md
title: نظرة عامة على مصنف النماذجCompatible with Milvus 2.6.x
summary: >-
  يصنّف البحث التقليدي عن المتجهات النتائج حسب التشابه الرياضي فقط - أي مدى
  تطابق المتجهات في الفضاء عالي الأبعاد. على الرغم من كفاءة هذا النهج، إلا أنه
  غالبًا ما يغفل الصلة الدلالية الحقيقية. فكّر في البحث عن "أفضل الممارسات
  لتحسين قاعدة البيانات": قد تتلقى مستندات ذات تشابه كبير في المتجهات التي تذكر
  هذه المصطلحات بشكل متكرر، ولكنها لا توفر في الواقع استراتيجيات تحسين قابلة
  للتنفيذ.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">نظرة عامة على مصنف النماذج<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يصنّف البحث التقليدي عن المتجهات النتائج فقط من خلال التشابه الرياضي - أي مدى تطابق المتجهات في الفضاء عالي الأبعاد. على الرغم من كفاءة هذا النهج، إلا أنه غالبًا ما يغفل الصلة الدلالية الحقيقية. فكِّر في البحث عن <strong>"أفضل الممارسات لتحسين قاعدة البيانات":</strong> قد تتلقى مستندات ذات تشابه متجه عالٍ تذكر هذه المصطلحات بشكل متكرر، ولكنها لا توفر في الواقع استراتيجيات تحسين قابلة للتنفيذ.</p>
<p>يقوم نموذج التصنيف بتحويل بحث Milvus من خلال دمج نماذج لغوية متقدمة تفهم العلاقات الدلالية بين الاستعلامات والمستندات. وبدلاً من الاعتماد فقط على التشابه المتجه، يقوم بتقييم معنى المحتوى والسياق لتقديم نتائج أكثر ذكاءً وملاءمة.</p>
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
<li><p>لا يمكن استخدام نماذج إعادة ترتيب النماذج مع عمليات البحث التجميعية.</p></li>
<li><p>يجب أن تكون الحقول المستخدمة لإعادة ترتيب النماذج من النوع النصي (<code translate="no">VARCHAR</code>).</p></li>
<li><p>يمكن لكل مصنف نماذج استخدام حقل واحد فقط <code translate="no">VARCHAR</code> في كل مرة للتقييم.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيف تعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم مصنفو النماذج بدمج قدرات فهم النماذج اللغوية في عملية البحث في ميلفوس من خلال سير عمل محدد بشكل جيد:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>نظرة عامة على مصنف النماذج</span> </span></p>
<ol>
<li><p><strong>الاستعلام الأولي</strong>: يرسل التطبيق الخاص بك استعلامًا إلى ملفوس</p></li>
<li><p><strong>البحث المتجه</strong>: يقوم ميلفوس بإجراء بحث متجه قياسي لتحديد المستندات المرشحة</p></li>
<li><p><strong>استرجاع المستندات المرشحة</strong>: يحدد النظام المجموعة الأولية من المستندات المرشحة بناءً على تشابه المتجهات.</p></li>
<li><p><strong>تقييم النموذج</strong>: تقوم وظيفة مصنف النماذج بمعالجة أزواج الاستعلام والمستندات:</p>
<ul>
<li><p>يرسل الاستعلام الأصلي والوثائق المرشحة إلى خدمة نموذج خارجي</p></li>
<li><p>يقوم نموذج اللغة بتقييم الصلة الدلالية بين الاستعلام وكل مستند</p></li>
<li><p>يحصل كل مستند على درجة ملاءمة بناءً على الفهم الدلالي</p></li>
</ul></li>
<li><p><strong>إعادة الترتيب الذكي</strong>: يتم إعادة ترتيب المستندات بناءً على درجات الملاءمة التي تم إنشاؤها بواسطة النموذج</p></li>
<li><p><strong>نتائج محسّنة</strong>: يتلقى تطبيقك نتائج مرتبة حسب الصلة الدلالية بدلاً من مجرد تشابه المتجهات</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">اختر مزود نموذج يناسب احتياجاتك<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus موفري خدمات النماذج التالية لإعادة الترتيب، ولكل منها خصائص مميزة:</p>
<table>
   <tr>
     <th><p>المزود</p></th>
     <th><p>الأفضل ل</p></th>
     <th><p>الخصائص</p></th>
     <th><p>مثال لحالة الاستخدام</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>التطبيقات المعقدة التي تتطلب فهماً دلالياً عميقاً وتخصيصاً عميقاً</p></td>
     <td><ul>
<li><p>يدعم نماذج لغوية كبيرة متنوعة</p></li>
<li><p>خيارات نشر مرنة</p></li>
<li><p>متطلبات حسابية أعلى</p></li>
<li><p>إمكانية تخصيص أكبر</p></li>
</ul></td>
     <td><p>منصة البحث القانوني التي تنشر نماذج خاصة بالمجال الذي يفهم المصطلحات القانونية وعلاقات السوابق القضائية</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>تنفيذ سريع مع استخدام فعال للموارد</p></td>
     <td><ul>
<li><p>خدمة خفيفة الوزن محسنة للعمليات النصية</p></li>
<li><p>نشر أسهل مع متطلبات موارد أقل</p></li>
<li><p>نماذج إعادة الترتيب المحسّنة مسبقاً</p></li>
<li><p>الحد الأدنى من نفقات البنية الأساسية</p></li>
</ul></td>
     <td><p>نظام إدارة محتوى يحتاج إلى إمكانات إعادة ترتيب فعالة مع متطلبات قياسية</p></td>
   </tr>
</table>
<p>للحصول على معلومات مفصلة حول تنفيذ كل خدمة نموذجية، راجع الوثائق المخصصة:</p>
<ul>
<li><p><a href="/docs/ar/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ar/tei-ranker.md">مصنف TEI</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">التنفيذ<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تنفيذ مصنف النماذج، تأكد من أن لديك:</p>
<ul>
<li><p>مجموعة Milvus مع حقل <code translate="no">VARCHAR</code> يحتوي على النص المراد إعادة تصنيفه</p></li>
<li><p>خدمة نموذج خارجي قيد التشغيل (vLLM أو TEI) يمكن الوصول إليها من خلال مثيل Milvus الخاص بك</p></li>
<li><p>اتصال شبكي مناسب بين ميلفوس وخدمة النموذج الذي اخترته</p></li>
</ul>
<p>تتكامل مصنفات النماذج بسلاسة مع كل من عمليات البحث المتجه القياسية وعمليات البحث المختلطة. يتضمن التنفيذ إنشاء كائن وظيفة يحدد تكوين إعادة الترتيب الخاص بك وتمريره إلى عمليات البحث.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">إنشاء مصنف نموذج</h3><p>لتنفيذ إعادة ترتيب النماذج، قم أولاً بتعريف كائن دالة مع التكوين المناسب:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة / مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>معرّف الدالة المستخدمة عند تنفيذ عمليات البحث.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>اسم الحقل النصي المراد استخدامه لإعادة الترتيب. يجب أن يكون حقلاً من النوع <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد نوع الدالة التي يتم إنشاؤها. يجب تعيينه إلى <code translate="no">RERANK</code> لجميع مصنفات النماذج.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قاموس يحتوي على تكوين لدالة إعادة الترتيب المستندة إلى النموذج. تختلف المعلمات (المفاتيح) المتاحة حسب الموفر (<code translate="no">tei</code> أو <code translate="no">vllm</code>). ارجع إلى <a href="/docs/ar/vllm-ranker.md">vLLM Ranker</a> أو <a href="/docs/ar/tei-ranker.md">TEI Ranker</a> لمزيد من التفاصيل.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يجب ضبطها على <code translate="no">"model"</code> لتمكين إعادة ترتيب النماذج.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>نعم</p></td>
     <td><p>موفر خدمة النموذج المراد استخدامه لإعادة الترتيب.</p></td>
     <td><p><code translate="no">"tei"</code> أو <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قائمة بسلاسل الاستعلامات التي يستخدمها نموذج إعادة الترتيب لحساب درجات الملاءمة. يجب أن يتطابق عدد سلاسل الاستعلامات مع عدد الاستعلامات في عملية البحث (حتى عند استخدام ناقلات الاستعلامات بدلاً من النص)، وإلا سيتم الإبلاغ عن خطأ.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>نعم</p></td>
     <td><p>عنوان URL لخدمة النموذج.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>لا</p></td>
     <td><p>الحد الأقصى لعدد المستندات المطلوب معالجتها في دفعة واحدة. تزيد القيم الأكبر من الإنتاجية ولكنها تتطلب المزيد من الذاكرة.</p></td>
     <td><p><code translate="no">32</code> (افتراضي)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">تطبيقه على البحث المتجه القياسي</h3><p>بعد تحديد مصنف النموذج الخاص بك، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى معلمة المصنف:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">تطبيقه على البحث المختلط</h3><p>يمكن أيضًا تطبيق مصنفات النموذج على عمليات البحث المختلط التي تجمع بين حقول متجهات متعددة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
