---
id: integrate_with_jina.md
summary: >-
  يوضّح هذا الدليل كيفية استخدام تضمينات جينا وميلفوس لإجراء مهام البحث عن
  التشابه واسترجاعه.
title: دمج ميلفوس مع جينا
---
<h1 id="Integrate-Milvus-with-Jina-AI" class="common-anchor-header">دمج ميلفوس مع جينا للذكاء الاصطناعي<button data-href="#Integrate-Milvus-with-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>يوضح هذا الدليل كيفية استخدام تضمينات جينا للذكاء الاصطناعي وميلفوس لإجراء مهام البحث عن التشابه واسترجاعه.</p>
<h2 id="Who-is-Jina-AI" class="common-anchor-header">من هي جينا للذكاء الاصطناعي<button data-href="#Who-is-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>جينا للذكاء الاصطناعي، التي تأسست في عام 2020 في برلين، هي شركة رائدة في مجال الذكاء الاصطناعي تركز على إحداث ثورة في مستقبل الذكاء الاصطناعي من خلال مؤسسة البحث الخاصة بها. تهدف شركة Jina AI، المتخصصة في الذكاء الاصطناعي متعدد الوسائط، إلى تمكين الشركات والمطورين من تسخير قوة البيانات متعددة الوسائط لخلق القيمة وتوفير التكاليف من خلال مجموعة متكاملة من المكونات، بما في ذلك التضمينات، وإعادة التضمين، والعمليات الفورية، والبنية التحتية الأساسية. تتميز تضمينات Jina AI المتطورة بأداء من الدرجة الأولى، وتتميز بنموذج بطول 8192 رمزًا رمزيًا مثاليًا لتمثيل البيانات الشاملة. ومن خلال تقديم الدعم متعدد اللغات والتكامل السلس مع منصات رائدة مثل OpenAI، تسهل هذه التضمينات التطبيقات متعددة اللغات.</p>
<h2 id="Milvus-and-Jina-AIs-Embedding" class="common-anchor-header">تضمين ميلفوس وجينا للذكاء الاصطناعي<button data-href="#Milvus-and-Jina-AIs-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>من أجل تخزين هذه التضمينات والبحث فيها بكفاءة من أجل السرعة والتوسع، يلزم وجود بنية تحتية محددة مصممة لهذا الغرض. Milvus عبارة عن قاعدة بيانات متجهية متقدمة مفتوحة المصدر معروفة على نطاق واسع وقادرة على التعامل مع البيانات المتجهة واسعة النطاق. تتيح Milvus إمكانية البحث السريع والدقيق عن المتجهات (التضمينات) وفقًا للكثير من المقاييس. تسمح قابليته للتوسع بالتعامل السلس مع أحجام هائلة من بيانات الصور، مما يضمن عمليات بحث عالية الأداء حتى مع نمو مجموعات البيانات.</p>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>تم دمج تضمينات جينا في مكتبة نماذج PyMilvus. والآن، سنقوم بعرض أمثلة برمجية لتوضيح كيفية استخدام تضمينات جينا في العمل.</p>
<p>قبل أن نبدأ، نحتاج إلى تثبيت مكتبة النماذج لـ PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus
$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong>. (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، واختر "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h2 id="General-Purpose-Embedding" class="common-anchor-header">التضمين للأغراض العامة<button data-href="#General-Purpose-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>يتفوق نموذج التضمين الأساسي في Jina AI في فهم النص التفصيلي، مما يجعله مثاليًا للبحث الدلالي، وبالتالي تصنيف المحتوى، وبالتالي يدعم تحليل المشاعر المتقدم، وتلخيص النصوص، وأنظمة التوصيات المخصصة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>
)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information retrieval is the process of finding relevant information from a large collection of data or documents.&quot;</span>

qvecs = ef.encode_queries([query])  <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>
dvecs = ef.encode_documents([doc])  <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bilingual-Embeddings" class="common-anchor-header">التضمينات ثنائية اللغة<button data-href="#Bilingual-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل نماذج Jina AI ثنائية اللغة على تعزيز المنصات متعددة اللغات والدعم العالمي واكتشاف المحتوى متعدد اللغات. وهي مصممة للترجمة بين الألمانية-الإنجليزية والصينية-الإنجليزية، وتعزز التفاهم بين المجموعات اللغوية المتنوعة، مما يسهل التفاعلات بين اللغات.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-de&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information Retrieval ist der Prozess, relevante Informationen aus einer großen Sammlung von Daten oder Dokumenten zu finden.&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Code-Embeddings" class="common-anchor-header">تضمين الرموز<button data-href="#Code-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر نموذج تضمين الكود الخاص بـ Jina AI إمكانية البحث من خلال الكود والوثائق. وهو يدعم اللغة الإنجليزية و30 لغة برمجة شائعة يمكن استخدامها لتحسين التنقل في التعليمات البرمجية ومراجعة التعليمات البرمجية بشكل مبسط والمساعدة الآلية في التوثيق.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-code&quot;</span>, jina_api_key)

<span class="hljs-comment"># Case1: Enhanced Code Navigation</span>
<span class="hljs-comment"># query: text description of the functionality</span>
<span class="hljs-comment"># document: relevant code snippet</span>

query = <span class="hljs-string">&quot;function to calculate average in Python.&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Case2: Streamlined Code Review</span>
<span class="hljs-comment"># query: text description of the programming concept</span>
<span class="hljs-comment"># document: relevante code snippet or PR</span>

query = <span class="hljs-string">&quot;pull quest related to Collection&quot;</span>
doc = <span class="hljs-string">&quot;fix:[restful v2] parameters of create collection ...&quot;</span>

<span class="hljs-comment"># Case3: Automatic Documentation Assistance</span>
<span class="hljs-comment"># query: code snippet you need explanation</span>
<span class="hljs-comment"># document: relevante document or DocsString</span>

query = <span class="hljs-string">&quot;What is Collection in Milvus&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.
Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.
&quot;&quot;&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search-with-Jina--Milvus" class="common-anchor-header">البحث الدلالي مع جينا وميلفوس<button data-href="#Semantic-Search-with-Jina--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>مع وظيفة التضمين المتجه القوية، يمكننا الجمع بين التضمينات المسترجعة باستخدام نماذج Jina AI مع قاعدة بيانات Milvus Lite المتجهة لإجراء بحث دلالي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># `jina-embeddings-v3` supports flexible embedding sizes (32, 64, 128, 256, 512, 768, 1024), allowing for truncating embeddings to fit your application. </span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=DIMENSION,
)


doc = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

dvecs = ef.encode_documents(doc) <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: dvecs[i], <span class="hljs-string">&quot;text&quot;</span>: doc[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(dvecs))
]

milvus_client = MilvusClient(<span class="hljs-string">&quot;./milvus_jina_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

res = milvus_client.insert(collection_name=COLLECTION_NAME, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>أما بالنسبة لحجة <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ملف Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<p>مع وجود جميع البيانات في قاعدة بيانات Milvus vector، يمكننا الآن إجراء بحث دلالي من خلال إنشاء تضمين متجه للاستعلام وإجراء بحث متجه.</p>
<pre><code translate="no" class="language-python">queries = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>
qvecs = ef.encode_queries([queries]) <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=[qvecs[<span class="hljs-number">0</span>]],  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)[<span class="hljs-number">0</span>]

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 1, 'distance': 0.8802614808082581, 'entity': {'text': &quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, 'subject': 'history'}}
</code></pre>
<h2 id="Jina-Reranker" class="common-anchor-header">إعادة تصنيف جينا<button data-href="#Jina-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Jina Ai أيضًا أداة إعادة التصنيف لتعزيز جودة الاسترجاع بعد البحث باستخدام التضمينات.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> JinaRerankFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>

rf = JinaRerankFunction(<span class="hljs-string">&quot;jina-reranker-v1-base-en&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

rf(query, documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[RerankResult(text=&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, score=0.9370958209037781, index=1),
 RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
 RerankResult(text=&quot;In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;, score=0.3498658835887909, index=0),
 RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
</code></pre>
