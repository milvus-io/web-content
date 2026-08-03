---
id: model-ranker-overview.md
title: نظرة عامة على «Model Ranker»Compatible with Milvus 2.6.x
summary: >-
  يعتمد البحث المتجهي التقليدي في ترتيب النتائج على التشابه الرياضي البحت — أي
  مدى تطابق المتجهات في الفضاء عالي الأبعاد. ورغم كفاءة هذه الطريقة، فإنها
  غالبًا ما تغفل الصلة الدلالية الحقيقية. لنفترض أنك تبحث عن «أفضل الممارسات
  لتحسين قواعد البيانات»: قد تحصل على مستندات ذات تشابه متجهي عالٍ تذكر هذه
  المصطلحات بشكل متكرر، لكنها لا تقدم في الواقع استراتيجيات تحسين قابلة للتطبيق.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">نظرة عامة على «Model Ranker»<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يعمل البحث المتجهي التقليدي على ترتيب النتائج بناءً على التشابه الرياضي البحت — أي مدى تطابق المتجهات في الفضاء عالي الأبعاد. ورغم كفاءة هذه الطريقة، إلا أنها غالبًا ما تغفل الصلة الدلالية الحقيقية. لنفترض أنك تبحث عن <strong>"أفضل الممارسات لتحسين قواعد البيانات":</strong> قد تحصل على مستندات ذات تشابه متجهي عالٍ تذكر هذه المصطلحات بشكل متكرر، لكنها لا تقدم في الواقع استراتيجيات تحسين قابلة للتطبيق.</p>
<p>يعمل «Model Ranker» على تحويل طريقة البحث في Milvus من خلال دمج نماذج لغوية متقدمة تفهم العلاقات الدلالية بين الاستعلامات والوثائق. فبدلاً من الاعتماد فقط على تشابه المتجهات، يقوم بتقييم معنى المحتوى وسياقه لتقديم نتائج أكثر ذكاءً وصلةً بالموضوع.</p>
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
    </button></h2><ul>
<li><p>لا يمكن استخدام مُصنِّفي النماذج مع عمليات البحث المجمَّعة.</p></li>
<li><p>يجب أن تكون الحقول المستخدمة لإعادة ترتيب النماذج من النوع النصي (<code translate="no">VARCHAR</code>).</p></li>
<li><p>يمكن لكل أداة ترتيب النماذج استخدام حقل واحد فقط من نوع <code translate="no">VARCHAR</code> في كل مرة للتقييم.</p></li>
</ul>
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
    </button></h2><p>تدمج أدوات تصنيف النماذج قدرات فهم نماذج اللغة في عملية البحث في Milvus من خلال سير عمل محدد جيدًا:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>نظرة عامة على أداة ترتيب النماذج</span>
  
 </span></p>
<ol>
<li><p><strong>الاستعلام الأولي</strong>: يرسل تطبيقك استعلامًا إلى Milvus</p></li>
<li><p><strong>البحث المتجهي</strong>: يقوم Milvus بإجراء بحث متجهي قياسي لتحديد المستندات المرشحة</p></li>
<li><p><strong>استرجاع المستندات المرشحة</strong>: يحدد النظام المجموعة الأولية من المستندات المرشحة بناءً على تشابه المتجهات</p></li>
<li><p><strong>تقييم النموذج</strong>: تعالج وظيفة "Model Ranker" أزواج الاستعلامات والوثائق:</p>
<ul>
<li><p>يرسل الاستعلام الأصلي والوثائق المرشحة إلى خدمة نموذج خارجية</p></li>
<li><p>يقوم نموذج اللغة بتقييم الصلة الدلالية بين الاستعلام وكل مستند</p></li>
<li><p>يحصل كل مستند على درجة صلة بناءً على الفهم الدلالي</p></li>
</ul></li>
<li><p><strong>إعادة الترتيب الذكي</strong>: يتم إعادة ترتيب المستندات بناءً على درجات الصلة التي يولدها النموذج</p></li>
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
    </button></h2><p>يدعم Milvus مزودي خدمات النماذج التاليين لإعادة الترتيب، ولكل منهم خصائص مميزة:</p>
<table>
   <tr>
     <th><p>المزود</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>الخصائص</p></th>
     <th><p>مثال على حالة الاستخدام</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>التطبيقات المعقدة التي تتطلب فهمًا دلاليًا عميقًا وتخصيصًا</p></td>
     <td><ul><li><p>يدعم نماذج لغوية كبيرة متنوعة</p></li><li><p>خيارات نشر مرنة</p></li><li><p>متطلبات حسابية أعلى</p></li><li><p>إمكانيات تخصيص أكبر</p></li></ul></td>
     <td><p>منصة بحث قانوني تنشر نماذج خاصة بالمجال تفهم المصطلحات القانونية والعلاقات بين السوابق القضائية</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>تنفيذ سريع مع استخدام فعال للموارد</p></td>
     <td><ul><li><p>خدمة خفيفة الوزن مُحسّنة لعمليات معالجة النصوص</p></li><li><p>نشر أسهل مع متطلبات موارد أقل</p></li><li><p>نماذج إعادة ترتيب مُحسّنة مسبقًا</p></li><li><p>أقل تكلفة ممكنة للبنية التحتية</p></li></ul></td>
     <td><p>نظام إدارة المحتوى الذي يحتاج إلى قدرات إعادة ترتيب فعالة مع متطلبات قياسية</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>تطبيقات مؤسسية تضع الموثوقية وسهولة التكامل في مقدمة أولوياتها</p></td>
     <td><ul><li><p>موثوقية وقابلية للتوسع على مستوى المؤسسات</p></li><li><p>خدمة مُدارة دون الحاجة إلى صيانة البنية التحتية</p></li><li><p>قدرات إعادة ترتيب متعددة اللغات</p></li><li><p>تحديد معدل الاستخدام ومعالجة الأخطاء مدمجان</p></li></ul></td>
     <td><p>منصة تجارة إلكترونية تتطلب بحثًا عالي التوافر مع أداء API ثابت وكتالوجات منتجات متعددة اللغات</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>تطبيقات RAG ذات متطلبات محددة للأداء والسياق</p></td>
     <td><ul><li><p>نماذج مدربة خصيصًا لمهام إعادة الترتيب</p></li><li><p>ضوابط اقتطاع دقيقة لأطوال المستندات المتنوعة</p></li><li><p>استدلال مُحسّن لأحمال العمل في بيئة الإنتاج</p></li><li><p>متغيرات متعددة للنماذج (rerank-2، rerank-lite، إلخ)</p></li></ul></td>
     <td><p>قاعدة بيانات بحثية تحتوي على مستندات بأطوال متفاوتة تتطلب تحكمًا دقيقًا في الأداء وفهمًا دلاليًا متخصصًا</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>تطبيقات تعالج المستندات الطويلة مع إعطاء الأولوية للفعالية من حيث التكلفة</p></td>
     <td><ul><li><p>تقسيم المستندات إلى أجزاء متقدمة مع تداخل قابل للتكوين</p></li><li><p>تقييم قائم على الأجزاء (الجزء الحاصل على أعلى تقييم يمثل المستند)</p></li><li><p>دعم نماذج إعادة الترتيب المتنوعة</p></li><li><p>فعالة من حيث التكلفة مع إصدارات نموذجية ومحترفة</p></li></ul></td>
     <td><p>نظام بحث في الوثائق الفنية يعالج الكتيبات والأوراق الطويلة التي تتطلب تقسيمًا ذكيًا والتحكم في التداخل</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>تطبيقات تستخدم نماذج تشابه الجمل المستضافة من Hugging Face</p></td>
     <td><ul><li><p>يستخدم مزود خدمة " <code translate="no">hf-inference</code> " المستضاف</p></li><li><p>يختار النماذج من Hugging Face Hub</p></li><li><p>يحسب درجة تشابه جملة واحدة لكل مرشح</p></li><li><p>تستخدم مصادقة مفتاح واجهة برمجة التطبيقات (API)</p></li></ul></td>
     <td><p>تطبيقات البحث الدلالي التي ترغب في إعادة ترتيب النصوص المرشحة باستخدام نموذج Hugging Face دون تشغيل خدمة استدلال منفصلة</p></td>
   </tr>
</table>
<p>للحصول على معلومات تفصيلية حول تنفيذ كل خدمة نموذج، يرجى الرجوع إلى الوثائق المخصصة:</p>
<ul>
<li><p><a href="/docs/ar/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ar/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/ar/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/ar/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/ar/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
<li><p><a href="/docs/ar/v2.6.x/hugging-face-ranker.md">مُصنِّف Hugging Face</a></p></li>
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
    </button></h2><p>قبل تنفيذ Model Ranker، تأكد من توفر ما يلي:</p>
<ul>
<li><p>مجموعة Milvus تحتوي على حقل " <code translate="no">VARCHAR</code> " (التصنيف) الذي يتضمن النص المراد إعادة تصنيفه</p></li>
<li><p>خدمة نموذج خارجية قيد التشغيل يمكن الوصول إليها من مثيل Milvus الخاص بك</p></li>
<li><p>اتصال شبكي مناسب بين Milvus وخدمة النموذج التي اخترتها</p></li>
</ul>
<p>تتكامل أدوات تصنيف النماذج بسلاسة مع كل من عمليات البحث المتجه القياسية وعمليات البحث المختلطة. يتضمن التنفيذ إنشاء كائن Function يحدد تكوين إعادة الترتيب الخاص بك وتمريره إلى عمليات البحث.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">إنشاء أداة تصنيف النموذج<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>لتنفيذ إعادة ترتيب النماذج، قم أولاً بتعريف كائن Function بالتكوين المناسب. في هذا المثال، نستخدم TEI كمزود الخدمة:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة / المثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>معرف الدالة الخاص بك الذي يُستخدم عند تنفيذ عمليات البحث.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>اسم حقل النص الذي سيتم استخدامه لإعادة الترتيب.</p><p>يجب أن يكون حقلًا من النوع " <code translate="no">VARCHAR</code> ".</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد نوع الدالة التي يتم إنشاؤها.</p><p>يجب ضبطه على " <code translate="no">RERANK</code> " لجميع أدوات ترتيب النماذج.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قاموس يحتوي على إعدادات وظيفة إعادة الترتيب القائمة على النموذج. تختلف المعلمات (المفاتيح) المتاحة باختلاف مزود الخدمة.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يجب ضبطه على " <code translate="no">"model"</code> " لتمكين إعادة الترتيب باستخدام النموذج.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>نعم</p></td>
     <td><p>مزود خدمة النموذج الذي سيتم استخدامه لإعادة الترتيب.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قائمة سلاسل الاستعلام التي يستخدمها نموذج إعادة الترتيب لحساب درجات الصلة.</p><p>يجب أن يتطابق عدد سلاسل الاستعلام تمامًا مع عدد الاستعلامات في عملية البحث (حتى عند استخدام متجهات الاستعلام بدلاً من النص)، وإلا فسيتم الإبلاغ عن خطأ.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>نعم</p></td>
     <td><p>عنوان URL لخدمة النموذج.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>لا</p></td>
     <td><p>الحد الأقصى لعدد المستندات التي يمكن معالجتها في دفعة واحدة. تؤدي القيم الأكبر إلى زيادة معدل الإنتاجية ولكنها تتطلب ذاكرة أكبر.</p></td>
     <td><p><code translate="no">32</code> (الافتراضي)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">التطبيق على البحث المتجه القياسي<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تعريف مُصنِّف النموذج الخاص بك، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى معلمة المُصنِّف:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
