---
id: build_RAG_with_milvus_and_feast.md
summary: >-
  في هذا البرنامج التعليمي، سنقوم في هذا البرنامج التعليمي ببناء خط أنابيب
  استرجاع-مُعزَّز (RAG) باستخدام Feast وMilvus. Feast عبارة عن مخزن ميزات مفتوح
  المصدر يعمل على تبسيط إدارة الميزات للتعلم الآلي، مما يتيح تخزين واسترجاع
  البيانات المنظمة بكفاءة لكل من التدريب والاستدلال في الوقت الفعلي. Milvus
  عبارة عن قاعدة بيانات متجهة عالية الأداء مصممة للبحث السريع عن التشابه، مما
  يجعلها مثالية لاسترداد المستندات ذات الصلة في عمليات سير عمل RAG.
title: بناء RAG باستخدام Milvus وFeast
---
<h1 id="Build-RAG-with-Milvus-and-Feast" class="common-anchor-header">بناء RAG باستخدام Milvus وFeast<button data-href="#Build-RAG-with-Milvus-and-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>في هذا البرنامج التعليمي، سنقوم في هذا البرنامج التعليمي ببناء خط أنابيب توليد الاسترجاع المعزز (RAG) باستخدام <a href="https://github.com/feast-dev/feast">Feast</a> و <a href="https://milvus.io/">Milvus</a>. Feast هو مخزن ميزات مفتوح المصدر يعمل على تبسيط إدارة الميزات للتعلم الآلي، مما يتيح تخزين واسترجاع البيانات المنظمة بكفاءة لكل من التدريب والاستدلال في الوقت الفعلي. Milvus عبارة عن قاعدة بيانات متجهة عالية الأداء مصممة للبحث السريع عن التشابه، مما يجعلها مثالية لاسترجاع المستندات ذات الصلة في عمليات سير عمل RAG.</p>
<p>بشكل أساسي، سنستخدم Feast لحقن المستندات والبيانات المهيكلة (أي الميزات) في سياق نموذج اللغة الكبيرة (LLM) لتشغيل تطبيق RAG (استرجاع الجيل المعزز) مع Milvus كقاعدة بيانات متجهة عبر الإنترنت.</p>
<h1 id="Why-Feast" class="common-anchor-header">لماذا العيد؟<button data-href="#Why-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p>يحل Feast العديد من المشكلات الشائعة في هذا التدفق:</p>
<ol>
<li><strong>الاسترجاع عبر الإنترنت:</strong> في وقت الاستنتاج، غالبًا ما تحتاج تطبيقات التوليد المعزز للاسترجاع عبر الإنترنت إلى الوصول إلى بيانات غير متاحة بسهولة وتحتاج إلى حسابها مسبقًا من مصادر بيانات أخرى.<ul>
<li>يدير Feast النشر إلى مجموعة متنوعة من المتاجر عبر الإنترنت (مثل Milvus وDynamoDB وRedis وGoogle Cloud Datastore) ويضمن <em>توفر</em> الميزات الضرورية باستمرار <em>وحسابها حديثًا</em> في وقت الاستدلال.</li>
</ul></li>
<li><strong>البحث عن المتجهات:</strong> قام Feast ببناء دعم للبحث عن التشابه المتجه الذي يمكن تهيئته بسهولة بشكل معلن حتى يتمكن المستخدمون من التركيز على تطبيقاتهم. يوفر ميلفوس قدرات بحث قوية وفعالة في البحث عن التشابه المتجهي.</li>
<li><strong>بيانات منظمة أكثر ثراءً:</strong> إلى جانب البحث المتجه، يمكن للمستخدمين الاستعلام عن الحقول المهيكلة القياسية لإدخالها في سياق LLM للحصول على تجارب مستخدم أفضل.</li>
<li><strong>الميزة/السياق والإصدار:</strong> غالبًا ما تكون الفرق المختلفة داخل المؤسسة غير قادرة على إعادة استخدام البيانات عبر المشاريع والخدمات، مما يؤدي إلى تكرار منطق التطبيق. تحتوي النماذج على تبعيات البيانات التي تحتاج إلى إصدارها، على سبيل المثال عند إجراء اختبارات A/B على إصدارات النماذج/المطالبات.<ul>
<li>يمكّن Feast من اكتشاف المستندات والميزات المستخدمة سابقًا والتعاون بشأنها، كما يتيح إمكانية إصدار مجموعات من البيانات.</li>
</ul></li>
</ol>
<p>سنقوم بـ</p>
<ol>
<li>نشر مخزن ميزات محلي مع <strong>مخزن ملف باركيه غير متصل بالإنترنت</strong> <strong>ومخزن ميلفوس على الإنترنت</strong>.</li>
<li>كتابة/إضفاء الطابع المادي على البيانات (أي قيم الميزات) من المخزن غير المتصل (ملف باركيه) إلى المخزن عبر الإنترنت (ملف باركيه).</li>
<li>تقديم الميزات باستخدام مجموعة أدوات تطوير البرمجيات الخاصة بـ Feast SDK مع إمكانيات البحث المتجه في Milvus</li>
<li>حقن المستند في سياق LLM للإجابة على الأسئلة</li>
</ol>
<div class="alert note">
<p>يعتمد هذا البرنامج التعليمي على دليل التكامل الرسمي لـ Milvus من <a href="https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb">مستودع Feast</a>. في حين أننا نسعى جاهدين للحفاظ على تحديث هذا البرنامج التعليمي، إذا واجهت أي تناقضات، يرجى الرجوع إلى الدليل الرسمي ولا تتردد في فتح مشكلة في مستودعنا للحصول على أي تحديثات ضرورية.</p>
</div>
<h2 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies" class="common-anchor-header">التبعيات</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;feast[milvus]&#x27;</span> openai -U -q</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>سنستخدم OpenAI كموفر LLM الخاص بنا. يمكنك تسجيل الدخول إلى موقعه الرسمي وإعداد <a href="https://platform.openai.com/api-keys">OPENAI_API_KEY</a> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-**************&quot;</span>

llm_client = OpenAI(
    api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Data" class="common-anchor-header">إعداد البيانات<button data-href="#Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>سنستخدم البيانات من المجلد التالي كمثال لدينا:<br>
<a href="https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo">Feast RAG Feature Repo</a></p>
<p>بعد تنزيل البيانات، ستجد الملفات التالية:</p>
<pre><code translate="no" class="language-bash">feature_repo/
│── data/                  <span class="hljs-comment"># Contains pre-processed Wikipedia city data in Parquet format</span>
│── example_repo.py        <span class="hljs-comment"># Defines feature views and entities for the city data</span>
│── feature_store.yaml     <span class="hljs-comment"># Configures Milvus and feature store settings</span>
│── test_workflow.py       <span class="hljs-comment"># Example workflow for Feast operations</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Key-Configuration-Files" class="common-anchor-header">ملفات تكوين المفاتيح</h3><h4 id="1-featurestoreyaml" class="common-anchor-header">1. feature_store.yaml</h4><p>يقوم هذا الملف بتكوين البنية التحتية لمخزن الميزات:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">project:</span> <span class="hljs-string">rag</span>
<span class="hljs-attr">provider:</span> <span class="hljs-string">local</span>
<span class="hljs-attr">registry:</span> <span class="hljs-string">data/registry.db</span>

<span class="hljs-attr">online_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">milvus</span>            <span class="hljs-comment"># Uses Milvus for vector storage</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">data/online_store.db</span>
  <span class="hljs-attr">vector_enabled:</span> <span class="hljs-literal">true</span>    <span class="hljs-comment"># Enables vector similarity search</span>
  <span class="hljs-attr">embedding_dim:</span> <span class="hljs-number">384</span>      <span class="hljs-comment"># Dimension of our embeddings</span>
  <span class="hljs-attr">index_type:</span> <span class="hljs-string">&quot;FLAT&quot;</span>      <span class="hljs-comment"># Vector index type</span>
  <span class="hljs-attr">metric_type:</span> <span class="hljs-string">&quot;COSINE&quot;</span>   <span class="hljs-comment"># Similarity metric</span>

<span class="hljs-attr">offline_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">file</span>              <span class="hljs-comment"># Uses file-based offline storage</span>
<button class="copy-code-btn"></button></code></pre>
<p>يؤسس هذا التكوين:</p>
<ul>
<li>Milvus كمخزن على الإنترنت لاسترجاع المتجهات السريعة</li>
<li>تخزين الملفات دون اتصال بالإنترنت لمعالجة البيانات التاريخية</li>
<li>إمكانيات البحث عن المتجهات مع تشابه COSINE</li>
</ul>
<h4 id="2-examplerepopy" class="common-anchor-header">2. example_repo.py</h4><p>يحتوي على تعريفات الميزات لبيانات مدينتنا، بما في ذلك:</p>
<ul>
<li>تعريفات الكيانات للمدن</li>
<li>طرق عرض الميزات لمعلومات المدينة والتضمينات</li>
<li>مواصفات المخطط لقاعدة بيانات المتجهات</li>
</ul>
<h4 id="3-Data-Directory" class="common-anchor-header">3. دليل البيانات</h4><p>يحتوي على بيانات مدن ويكيبيديا المعالجة مسبقًا مع:</p>
<ul>
<li>أوصاف المدن وملخصاتها</li>
<li>التضمينات المحسوبة مسبقاً (متجهات 384 بُعداً)</li>
<li>البيانات الوصفية المرتبطة مثل أسماء المدن والولايات</li>
</ul>
<p>تعمل هذه الملفات معًا لإنشاء مخزن ميزات يجمع بين إمكانيات البحث المتجهية في ميلفوس وإدارة ميزات فيست، مما يتيح استرجاع معلومات المدينة ذات الصلة بكفاءة لتطبيق RAG الخاص بنا.</p>
<h2 id="Inspect-the-Data" class="common-anchor-header">فحص البيانات<button data-href="#Inspect-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تخزين بيانات الميزات الأولية التي لدينا في هذا العرض التوضيحي في ملف باركيه محلي. تحتوي مجموعة البيانات على ملخصات ويكيبيديا للمدن المختلفة. دعونا نفحص البيانات أولاً.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_parquet(
    <span class="hljs-string">&quot;/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet&quot;</span>
)
df[<span class="hljs-string">&quot;vector&quot;</span>] = df[<span class="hljs-string">&quot;vector&quot;</span>].apply(<span class="hljs-keyword">lambda</span> x: x.tolist())
embedding_length = <span class="hljs-built_in">len</span>(df[<span class="hljs-string">&quot;vector&quot;</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;embedding length = <span class="hljs-subst">{embedding_length}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">embedding length = 384
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

display(df.head())
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody t tr tr th:فقط من النوع { محاذاة رأسية: وسط؛ }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>المعرف</th>
      <th>العنصر_المعرف</th>
      <th>الطابع الزمني للحدث</th>
      <th>الحالة</th>
      <th>ملخص_ويكي</th>
      <th>أجزاء_الجملة</th>
      <th>المتجه</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، وغالبًا ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة مدينة نيويورك...</td>
      <td>تتألف المدينة من خمسة أحياء، كل منها...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، وغالباً ما يطلق عليها اسم مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك هي مركز عالمي للتمويل والتجارة...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة ...</td>
      <td>مدينة نيويورك هي بؤرة العالم في العالم ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، وغالباً ما يطلق عليها اسم مدينة نيويورك أو ببساطة...</td>
      <td>يُقدر عدد سكانها في عام 2022 بـ 8,335 نسمة...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="common-anchor-header">تسجيل تعريفات الميزات ونشر مخزن الميزات<button data-href="#Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تنزيل <code translate="no">feature_repo</code> ، نحتاج إلى تشغيل <code translate="no">feast apply</code> لتسجيل طرق عرض الميزات والكيانات المحددة في <code translate="no">example_repo.py</code> ، وإعداد <strong>Milvus</strong> كجداول المتجر عبر الإنترنت.</p>
<p>تأكد من أنك قمت بالتسجيل في الدليل <code translate="no">feature_repo</code> قبل تشغيل الأمر.</p>
<pre><code translate="no" class="language-bash">feast apply
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Features-into-Milvus" class="common-anchor-header">تحميل الميزات في ملفوس<button data-href="#Load-Features-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن نقوم بتحميل الميزات إلى ملفوس. تتضمن هذه الخطوة تسلسل قيم الميزات من المخزن غير المتصل وكتابتها في ملفوس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">import</span> warnings

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

store = FeatureStore(repo_path=<span class="hljs-string">&quot;/path/to/feature_repo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">store.write_to_online_store(feature_view_name=<span class="hljs-string">&quot;city_embeddings&quot;</span>, df=df)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db
</code></pre>
<p>لاحظ أنه يوجد الآن <code translate="no">online_store.db</code> و <code translate="no">registry.db</code> ، اللذان يخزنان الميزات المتجسدة ومعلومات المخطط، على التوالي. يمكننا إلقاء نظرة على الملف <code translate="no">online_store.db</code>.</p>
<pre><code translate="no" class="language-python">pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[<span class="hljs-number">0</span>]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;item_id == &#x27;0&#x27;&quot;</span>,
)
pd.DataFrame(milvus_query_result[<span class="hljs-number">0</span>]).head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody t tr tr th:only-of-type { محاذاة رأسية: وسط؛ }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>تم إنشاؤه_ت</th>
      <th>event_ts</th>
      <th>العنصر_المعرف</th>
      <th>أجزاء_الجملة</th>
      <th>الحالة</th>
      <th>المتجه</th>
      <th>ويكي_ملخص</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، نيويورك</td>
      <td>0.146573</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة مدينة...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، نيويورك</td>
      <td>-0.073177</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة مدينة...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، نيويورك</td>
      <td>0.052114</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، نيويورك</td>
      <td>0.033187</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، نيويورك</td>
      <td>0.012013</td>
      <td>نيويورك، غالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Build-RAG" class="common-anchor-header">بناء RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Embedding-a-Query-Using-PyTorch-and-Sentence-Transformers" class="common-anchor-header">1. تضمين استعلام باستخدام PyTorch ومحولات الجمل</h3><p>أثناء الاستدلال (على سبيل المثال، أثناء إرسال المستخدم لرسالة دردشة) نحتاج إلى تضمين نص الإدخال. يمكن اعتبار ذلك بمثابة تحويل ميزة لبيانات الإدخال. في هذا المثال، سنقوم بذلك باستخدام محول جملة صغير من Hugging Face.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, FieldSchema
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> example_repo <span class="hljs-keyword">import</span> city_embeddings_feature_view, item

TOKENIZER = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>
MODEL = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">mean_pooling</span>(<span class="hljs-params">model_output, attention_mask</span>):
    token_embeddings = model_output[
        <span class="hljs-number">0</span>
    ]  <span class="hljs-comment"># First element of model_output contains all token embeddings</span>
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    <span class="hljs-keyword">return</span> torch.<span class="hljs-built_in">sum</span>(token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>) / torch.clamp(
        input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_model</span>(<span class="hljs-params">sentences, tokenizer, model</span>):
    encoded_input = tokenizer(
        sentences, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )
    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>])
    sentence_embeddings = F.normalize(sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> sentence_embeddings
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Fetching-Real-time-Vectors-and-Data-for-Online-Inference" class="common-anchor-header">2. جلب المتجهات والبيانات في الوقت الحقيقي للاستدلال عبر الإنترنت</h3><p>بمجرد تحويل الاستعلام إلى تضمين، فإن الخطوة التالية هي استرداد المستندات ذات الصلة من مخزن المتجهات. في وقت الاستدلال، نستفيد من البحث عن تشابه المتجهات للعثور على تضمينات المستندات الأكثر صلة المخزنة في مخزن الميزات عبر الإنترنت، باستخدام <code translate="no">retrieve_online_documents_v2()</code>. يمكن بعد ذلك إدخال متجهات الميزات هذه في سياق LLM.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Which city has the largest population in New York?&quot;</span>

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

<span class="hljs-comment"># Retrieve top k documents</span>
context_data = store.retrieve_online_documents_v2(
    features=[
        <span class="hljs-string">&quot;city_embeddings:vector&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:item_id&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:state&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:sentence_chunks&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:wiki_summary&quot;</span>,
    ],
    query=query,
    top_k=<span class="hljs-number">3</span>,
    distance_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
).to_df()
display(context_data)
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody t tr tr th:only-of-type { محاذاة رأسية: الوسط؛ }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>المتجه</th>
      <th>العنصر_المعرف</th>
      <th>الحالة</th>
      <th>أجزاء_الجملة</th>
      <th>ملخص_ويكي</th>
      <th>المسافة</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك، غالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>نيويورك، نيويورك</td>
      <td>نيويورك هي المدينة الجغرافية والديموغرافية...</td>
      <td>نيويورك، وغالباً ما تسمى مدينة نيويورك أو ببساطة...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>نيويورك، نيويورك</td>
      <td>يبلغ عدد سكانها أكثر من 20.1 مليون نسمة...</td>
      <td>نيويورك، وغالباً ما يطلق عليها اسم مدينة نيويورك أو ببساطة...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>
<h3 id="3-Formatting-Retrieved-Documents-for-RAG-Context" class="common-anchor-header">3. تنسيق المستندات المسترجعة لسياق RAG</h3><p>بعد استرجاع المستندات ذات الصلة، نحتاج إلى تنسيق البيانات في سياق منظم يمكن استخدامه بكفاءة في التطبيقات النهائية. تضمن هذه الخطوة أن تكون المعلومات المستخرجة نظيفة ومنظمة وجاهزة للاندماج في خط أنابيب RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_documents</span>(<span class="hljs-params">context_df</span>):
    output_context = <span class="hljs-string">&quot;&quot;</span>
    unique_documents = context_df.drop_duplicates().apply(
        <span class="hljs-keyword">lambda</span> x: <span class="hljs-string">&quot;City &amp; State = {&quot;</span>
        + x[<span class="hljs-string">&quot;state&quot;</span>]
        + <span class="hljs-string">&quot;}\nSummary = {&quot;</span>
        + x[<span class="hljs-string">&quot;wiki_summary&quot;</span>].strip()
        + <span class="hljs-string">&quot;}&quot;</span>,
        axis=<span class="hljs-number">1</span>,
    )
    <span class="hljs-keyword">for</span> i, document_text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(unique_documents):
        output_context += <span class="hljs-string">f&quot;****START DOCUMENT <span class="hljs-subst">{i}</span>****\n<span class="hljs-subst">{document_text.strip()}</span>\n****END DOCUMENT <span class="hljs-subst">{i}</span>****&quot;</span>
    <span class="hljs-keyword">return</span> output_context


RAG_CONTEXT = format_documents(context_data[[<span class="hljs-string">&quot;state&quot;</span>, <span class="hljs-string">&quot;wiki_summary&quot;</span>]])
<span class="hljs-built_in">print</span>(RAG_CONTEXT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">****START DOCUMENT 0****
City &amp; State = {New York, New York}
Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
****END DOCUMENT 0****
</code></pre>
<h3 id="4-Generating-Responses-Using-Retrieved-Context" class="common-anchor-header">4. توليد الاستجابات باستخدام السياق المستخرج</h3><p>الآن بعد أن قمنا بتنسيق المستندات المسترجعة، يمكننا دمجها في موجه منظم لتوليد الردود. تضمن هذه الخطوة أن المساعد يعتمد فقط على المعلومات المسترجعة ويتجنب الهلوسة في الردود.</p>
<pre><code translate="no" class="language-python">FULL_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don&#x27;t know the answer, just say &quot;I do not know.&quot; Don&#x27;t make up an answer.

Here are document(s) you should use when answer the users question:
<span class="hljs-subst">{RAG_CONTEXT}</span>
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: FULL_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: question},
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>.join([c.message.content <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> response.choices]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.
</code></pre>
