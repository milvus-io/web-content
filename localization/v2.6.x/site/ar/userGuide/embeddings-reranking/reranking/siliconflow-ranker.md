---
id: siliconflow-ranker.md
title: مصنف سيليكون فلو SiliconFlowCompatible with Milvus 2.6.x
summary: >-
  يستفيد برنامج SiliconFlow Ranker من نماذج إعادة الترتيب الشاملة الخاصة ب
  SiliconFlow لتعزيز ملاءمة البحث من خلال إعادة الترتيب الدلالي. وهو يوفر
  إمكانات مرنة لتقطيع المستندات ويدعم مجموعة واسعة من نماذج إعادة الترتيب
  المتخصصة من مختلف المزودين.
beta: Milvus 2.6.x
---
<h1 id="SiliconFlow-Ranker" class="common-anchor-header">مصنف سيليكون فلو SiliconFlow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFlow-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>يستفيد برنامج SiliconFlow Ranker من نماذج إعادة الترتيب الشاملة <a href="https://www.siliconflow.com/">الخاصة ب SiliconFlow</a> لتعزيز ملاءمة البحث من خلال إعادة الترتيب الدلالي. وهو يوفر إمكانات مرنة لتقطيع المستندات ويدعم مجموعة واسعة من نماذج إعادة الترتيب المتخصصة من مختلف المزودين.</p>
<p>يعتبر برنامج SiliconFlow Ranker ذا قيمة خاصة للتطبيقات التي تتطلب:</p>
<ul>
<li><p>تقطيع متقدم للمستندات مع تداخل قابل للتكوين لمعالجة المستندات الطويلة</p></li>
<li><p>الوصول إلى نماذج إعادة الترتيب المتنوعة بما في ذلك سلسلة BAAI/Bge-reranker ونماذج متخصصة أخرى</p></li>
<li><p>تسجيل مرن قائم على القطع حيث تمثل القطعة الأعلى نقاطًا درجة المستند</p></li>
<li><p>إعادة ترتيب فعالة من حيث التكلفة مع دعم كل من النماذج القياسية والنماذج الاحترافية</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تطبيق SiliconFlow Ranker في Milvus، تأكد من أن لديك</p>
<ul>
<li><p>مجموعة Milvus مع حقل <code translate="no">VARCHAR</code> يحتوي على النص المراد إعادة تصنيفه</p></li>
<li><p>مفتاح واجهة برمجة تطبيقات SiliconFlow صالح مع إمكانية الوصول إلى نماذج إعادة التصنيف. قم بالتسجيل في <a href="https://www.siliconflow.com/">منصة SiliconFlow</a> للحصول على بيانات اعتماد واجهة برمجة التطبيقات الخاصة بك. يمكنك إما</p>
<ul>
<li><p>تعيين متغير البيئة <code translate="no">SILICONFLOW_API_KEY</code> ، أو</p></li>
<li><p>تحديد مفتاح واجهة برمجة التطبيقات (API) مباشرةً في تكوين المُصنِّف</p></li>
</ul></li>
</ul>
<h2 id="Create-a-SiliconFlow-ranker-function" class="common-anchor-header">إنشاء وظيفة مصنف SiliconFlow<button data-href="#Create-a-SiliconFlow-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام مصنف SiliconFlow Ranker في تطبيق Milvus الخاص بك، قم بإنشاء كائن دالة تحدد كيفية عمل إعادة الترتيب. سيتم تمرير هذه الدالة إلى عمليات بحث Milvus لتحسين ترتيب النتائج.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure SiliconFlow Ranker</span>
siliconflow_ranker = Function(
    name=<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>,     <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,          <span class="hljs-comment"># Specifies SiliconFlow as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>, <span class="hljs-comment"># SiliconFlow reranking model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>: <span class="hljs-number">5</span>,            <span class="hljs-comment"># Optional: max chunks per document for supported models</span>
        <span class="hljs-string">&quot;overlap_tokens&quot;</span>: <span class="hljs-number">50</span>,               <span class="hljs-comment"># Optional: token overlap between chunks for supported models</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-siliconflow-api-key&quot; # Optional: if not set, uses SILICONFLOW_API_KEY env var</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SiliconFlow-ranker-specific-parameters" class="common-anchor-header">معلمات خاصة بـ SiliconFlow مصنّف خاص بـ SiliconFlow<button data-href="#SiliconFlow-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>المعلمات التالية خاصة بمصنّف SiliconFlow:</p>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>مطلوبة؟</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
     <th><p><strong>القيمة / مثال</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يجب ضبطها على <code translate="no">"model"</code> لتمكين إعادة ترتيب النماذج.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>نعم</p></td>
     <td><p>مزود خدمة النموذج المراد استخدامه لإعادة الترتيب.</p></td>
     <td><p><code translate="no">"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>نموذج إعادة ترتيب نموذج SiliconFlow لاستخدامه من النماذج المدعومة على منصة SiliconFlow. للاطلاع على قائمة نماذج إعادة الترتيب المتاحة، راجع <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">وثائق SiliconFlow</a>.</p></td>
     <td><p><code translate="no">"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قائمة سلاسل الاستعلامات المستخدمة من قبل نموذج إعادة الترتيب لحساب درجات الملاءمة. يجب أن يتطابق عدد سلاسل الاستعلامات مع عدد الاستعلامات في عملية البحث بالضبط (حتى عند استخدام ناقلات الاستعلام بدلاً من النص)، وإلا سيتم الإبلاغ عن خطأ.</p></td>
     <td><p><em>["استعلام البحث"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>لا</p></td>
     <td><p>نظرًا لأن خدمات النماذج قد لا تعالج جميع البيانات في وقت واحد، فإن هذا يضبط حجم الدُفعات للوصول إلى خدمة النماذج في طلبات متعددة.</p></td>
     <td><p><code translate="no">128</code> (افتراضي)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_chunks_per_doc</code></p></td>
     <td><p>لا</p></td>
     <td><p>الحد الأقصى لعدد القطع التي تم إنشاؤها من داخل المستند. يتم تقسيم المستندات الطويلة إلى أجزاء متعددة لحسابها، ويتم أخذ أعلى درجة من بين الأجزاء كدرجة المستند. مدعومة فقط من قبل نماذج محددة: <code translate="no">BAAI/bge-reranker-v2-m3</code> ، <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code> ، و <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">5</code>, <code translate="no">10</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">overlap_tokens</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>عدد الرموز المتداخلة بين الأجزاء المتجاورة عند تقسيم المستندات إلى أجزاء. يضمن ذلك الاستمرارية عبر حدود القطع لفهم دلالي أفضل. مدعومة فقط من قبل نماذج محددة: <code translate="no">BAAI/bge-reranker-v2-m3</code> ، <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code> ، و <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">50</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>بيانات اعتماد المصادقة للوصول إلى خدمات واجهة برمجة تطبيقات SiliconFlow. إذا لم يتم تحديدها، سيبحث النظام عن متغير البيئة <code translate="no">SILICONFLOW_API_KEY</code>.</p></td>
     <td><p><em>"مفتاحك-سيليكون فلو-API-مفتاح"</em></p></td>
   </tr>
</table>
<p><strong>دعم الميزة الخاصة بالنموذج</strong>: المعلمات <code translate="no">max_chunks_per_doc</code> و <code translate="no">overlap_tokens</code> مدعومة فقط من قبل نماذج محددة. عند استخدام نماذج أخرى، سيتم تجاهل هذه المعلمات.</p>
<div class="alert note">
<p>بالنسبة للمعلمات العامة المشتركة بين جميع مصنفات النماذج (على سبيل المثال، <code translate="no">provider</code> ، <code translate="no">queries</code>)، راجع <a href="/docs/ar/model-ranker-overview.md#Create-a-model-ranker">إنشاء مصنف نموذج</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">التطبيق على البحث المتجه القياسي<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>لتطبيق SiliconFlow Ranker على بحث متجه قياسي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with SiliconFlow reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                  <span class="hljs-comment"># Apply SiliconFlow reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">التطبيق على البحث الهجين<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن أيضاً استخدام مصنف SiliconFlow Ranker مع البحث الهجين للجمع بين طرق الاسترجاع الكثيفة والمتناثرة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with SiliconFlow reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                 <span class="hljs-comment"># Apply SiliconFlow reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
