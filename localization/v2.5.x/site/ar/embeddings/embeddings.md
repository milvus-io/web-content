---
id: embeddings.md
order: 1
summary: تعرف على كيفية إنشاء تضمينات لبياناتك.
title: نظرة عامة على التضمين
---
<h1 id="Embedding-Overview" class="common-anchor-header">نظرة عامة على التضمين<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>التضمين هو مفهوم للتعلم الآلي لتعيين البيانات في فضاء عالي الأبعاد، حيث يتم وضع البيانات ذات الدلالات المتشابهة بالقرب من بعضها البعض. وعادةً ما تكون شبكة عصبية عميقة من BERT أو غيرها من عائلات المحولات، يمكن لنموذج التضمين أن يمثل دلالات النصوص والصور وأنواع البيانات الأخرى بشكل فعال بسلسلة من الأرقام المعروفة باسم المتجهات. الميزة الرئيسية لهذه النماذج هي أن المسافة الرياضية بين المتجهات في الفضاء عالي الأبعاد يمكن أن تشير إلى تشابه دلالات النصوص أو الصور الأصلية. وتفتح هذه الخاصية العديد من تطبيقات استرجاع المعلومات، مثل محركات البحث على الويب مثل Google وBing، والبحث عن المنتجات والتوصيات على مواقع التجارة الإلكترونية، ونموذج التوليد المعزز للاسترجاع (RAG) الذي شاع مؤخرًا في الذكاء الاصطناعي التوليدي.</p>
<p>هناك فئتان رئيسيتان من التضمينات، تنتج كل منهما نوعًا مختلفًا من المتجهات:</p>
<ul>
<li><p><strong>التضمين الكثيف</strong>: تمثل معظم نماذج التضمين المعلومات كمتجه ذي نقطة عائمة من مئات إلى آلاف الأبعاد. ويسمى الناتج متجهات "كثيفة" لأن معظم الأبعاد لها قيم غير صفرية. على سبيل المثال، يُنتج نموذج التضمين مفتوح المصدر الشهير BAAI/bge-base-en-v1.5 متجهات مكونة من 768 رقم فاصلة عائمة (متجه عائم ذو 768 بُعدًا).</p></li>
<li><p><strong>التضمين المتناثر</strong>: في المقابل، تحتوي متجهات مخرجات التضمينات المتفرقة على معظم أبعادها صفر، أي المتجهات "المتفرقة". هذه المتجهات غالبًا ما يكون لها أبعاد أعلى بكثير (عشرات الآلاف أو أكثر) والتي يتم تحديدها حسب حجم المفردات الرمزية. يمكن توليد المتجهات المتفرقة بواسطة الشبكات العصبية العميقة أو التحليل الإحصائي للنصوص. ونظرًا لقابليتها للتفسير وقدرات التعميم الأفضل خارج المجال، يتم اعتماد التضمينات المتفرقة بشكل متزايد من قبل المطورين كمكمل للتضمينات الكثيفة.</p></li>
</ul>
<p>Milvus هي قاعدة بيانات متجهة مصممة لإدارة البيانات المتجهة وتخزينها واسترجاعها. من خلال دمج نماذج التضمين <a href="https://milvus.io/docs/rerankers-overview.md">وإعادة الترتيب</a> السائدة، يمكنك بسهولة تحويل النص الأصلي إلى متجهات قابلة للبحث أو إعادة ترتيب النتائج باستخدام نماذج قوية لتحقيق نتائج أكثر دقة لـ RAG. يعمل هذا التكامل على تبسيط عملية تحويل النص وإلغاء الحاجة إلى مكونات تضمين أو إعادة ترتيب إضافية، وبالتالي تبسيط عملية تطوير RAG والتحقق من صحة النتائج.</p>
<p>لإنشاء تضمينات أثناء العمل، راجع <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">استخدام نموذج PyMilvus لتوليد تضمينات نصية</a>.</p>
<table>
<thead>
<tr><th>وظيفة التضمين</th><th>النوع</th><th>واجهة برمجة التطبيقات أو مفتوحة المصدر</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">Openai</a></td><td>كثيفة</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">محول الجملة</a></td><td>كثيف</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">سبليد</a></td><td>متناثر</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">بجي-م3</a></td><td>هجين</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">فوياجاي</a></td><td>كثيف</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">جينا</a></td><td>كثيفة</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">التماسك</a></td><td>كثيف</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">مدرب</a></td><td>كثيف</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">ميسترال للذكاء الاصطناعي</a></td><td>كثيف</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">نوميكس</a></td><td>كثيف</td><td>واجهة برمجة التطبيقات</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>هجين</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">موديل2فيك</a></td><td>هجين</td><td>مفتوح المصدر</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">جيميني</a></td><td>هجين</td><td>خاص</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">مثال 1: استخدام دالة التضمين الافتراضية لتوليد متجهات كثيفة<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام دوال التضمين مع Milvus، قم أولاً بتثبيت مكتبة عميل PyMilvus مع الحزمة الفرعية <code translate="no">model</code> التي تغلف جميع الأدوات المساعدة لتوليد التضمين.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تدعم الحزمة الفرعية <code translate="no">model</code> نماذج التضمين المختلفة، من <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI،</a> <a href="https://milvus.io/docs/embed-with-sentence-transform.md">ومحولات الجملة،</a> و <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3،</a> إلى نماذج <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a> المدربة مسبقًا. وللتبسيط، يستخدم هذا المثال <code translate="no">DefaultEmbeddingFunction</code> وهو نموذج محولات الجمل من طراز <strong>MiniLM-L6-v2 بالكامل،</strong> ويبلغ حجم النموذج حوالي 70 ميغابايت وسيتم تنزيله أثناء الاستخدام الأول:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">مثال 2: توليد متجهات كثيفة ومتناثرة في مكالمة واحدة باستخدام نموذج BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا المثال، نستخدم في هذا المثال نموذج <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> الهجين لتضمين النص في كل من المتجهات الكثيفة والمتناثرة واستخدامها لاسترداد المستندات ذات الصلة. الخطوات الإجمالية هي كما يلي:</p>
<ol>
<li><p>تضمين النص كمتجهات كثيفة ومتناثرة باستخدام نموذج BGE-M3;</p></li>
<li><p>إعداد مجموعة Milvus لتخزين المتجهات الكثيفة والمتناثرة;</p></li>
<li><p>إدراج البيانات في ملفوس;</p></li>
<li><p>البحث وفحص النتيجة.</p></li>
</ol>
<p>أولاً، نحتاج إلى تثبيت التبعيات اللازمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>استخدم BGE M3 لترميز المستندات والاستعلامات لتضمين الاسترجاع.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
