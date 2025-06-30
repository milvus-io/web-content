---
id: quickstart_with_attu.md
summary: >-
  Attu هي أداة إدارة شاملة ومفتوحة المصدر لـ Milvus. تتميز بواجهة مستخدم رسومية
  بديهية (GUI)، مما يتيح لك التفاعل بسهولة مع قواعد بياناتك. ببضع نقرات فقط،
  يمكنك تصور حالة مجموعتك وإدارة البيانات الوصفية وإجراء استعلامات البيانات وغير
  ذلك الكثير.
title: بداية سريعة مع Attu - واجهة مستخدم الويب الخاصة بـ Milvus
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">البدء السريع مع Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. مقدمة<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> هو أداة إدارة شاملة ومفتوحة المصدر لملفوس. تتميز بواجهة مستخدم رسومية سهلة الاستخدام (GUI)، مما يتيح لك التفاعل بسهولة مع قواعد بياناتك. ببضع نقرات فقط، يمكنك تصور حالة مجموعتك وإدارة البيانات الوصفية وإجراء استعلامات البيانات وغير ذلك الكثير.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. تثبيت تطبيق سطح المكتب<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتنزيل إصدار سطح المكتب من Attu من خلال زيارة <a href="https://github.com/zilliztech/attu/releases">صفحة إصدارات Attu GitHub</a>. حدد الإصدار المناسب لنظام التشغيل الخاص بك واتبع خطوات التثبيت.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">ملاحظة لنظام macOS (شريحة سلسلة M):</h3><p>إذا واجهت الخطأ:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل الأمر التالي في المحطة الطرفية لتجاوز هذه المشكلة:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. الاتصال بـ Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Attu الاتصال بكل من <strong>Milvus Standalone</strong> و <strong>Zilliz Cloud،</strong> مما يوفر مرونة في العمل مع قواعد البيانات المحلية أو المستضافة على السحابة.</p>
<p>لاستخدام Milvus Standalone محليًا:</p>
<ol>
<li>ابدأ تشغيل ميلفوس ستاندالون باتباع <a href="https://milvus.io/docs/install_standalone-docker.md">دليل تثبيت ميلفوس</a>.</li>
<li>افتح Attu وأدخل معلومات الاتصال:<ul>
<li>عنوان ميلفوس: URI خادم Milvus Standalone الخاص بك، على سبيل المثال http://localhost:19530</li>
<li>إعدادات اختيارية أخرى: يمكنك ضبطها بناءً على تكوينات ميلفوس الخاصة بك أو تركها كإعدادات افتراضية.</li>
</ul></li>
<li>انقر فوق اتصال للوصول إلى قاعدة البيانات الخاصة بك.</li>
</ol>
<blockquote>
<p>يمكنك أيضًا توصيل ميلفوس المُدار بالكامل على <a href="https://zilliz.com/cloud">زيليز كلاود</a>. ما عليك سوى تعيين <code translate="no">Milvus Address</code> و <code translate="no">token</code> إلى <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> لمثيل Zilliz Cloud الخاص بك.</p>
</blockquote>
<ol start="4">
<li>انقر للوصول إلى قاعدة البيانات الخاصة بك.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. إعداد البيانات، وإنشاء المجموعة، وإدراج البيانات<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 إعداد البيانات</h3><p>نستخدم صفحات الأسئلة الشائعة من <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">وثائق ميلفوس 2.4.x</a> كمجموعة بيانات لهذا المثال.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">تنزيل البيانات واستخراجها:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">معالجة ملفات تخفيض السعر:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 توليد التضمينات</h3><p>حدد نموذج تضمين لتوليد تضمينات نصية باستخدام <code translate="no">milvus_model</code>. نستخدم نموذج <code translate="no">DefaultEmbeddingFunction</code> كمثال، وهو نموذج تضمين خفيف الوزن ومدرب مسبقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">الإخراج:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 إنشاء مجموعة</h3><p>اتصل بميلفوس وأنشئ مجموعة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 إدراج البيانات</h3><p>قم بتكرار الأسطر النصية وإنشاء تضمينات وإدراج البيانات في ملفوس:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 تصور البيانات والمخطط</h3><p>يمكننا الآن تصور مخطط البيانات والكيانات المدرجة باستخدام واجهة أتو. يعرض المخطط الحقول المحددة، بما في ذلك حقل <code translate="no">id</code> من النوع <code translate="no">Int64</code> وحقل <code translate="no">vector</code> من النوع <code translate="no">FloatVector(768)</code> مع مقياس <code translate="no">Inner Product (IP)</code>. يتم تحميل المجموعة بـ <strong>72 كيانًا</strong>.</p>
<p>بالإضافة إلى ذلك، يمكننا عرض البيانات المدرجة، بما في ذلك المعرف، والتضمينات المتجهة، والحقول الديناميكية التي تخزن البيانات الوصفية مثل المحتوى النصي. تدعم الواجهة التصفية والاستعلام بناءً على شروط محددة أو حقول ديناميكية.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. تصوّر نتائج البحث والعلاقات<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Attu واجهة قوية لتصور علاقات البيانات واستكشافها. لفحص نقاط البيانات المدرجة وعلاقات التشابه بينها، اتبع الخطوات التالية:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>إجراء بحث</strong></h3><p>انتقل إلى علامة التبويب <strong>بحث المتجهات</strong> في أتو.</p>
<ol>
<li>انقر على زر <strong>توليد بيانات عشوائية</strong> لإنشاء استعلامات اختبارية.</li>
<li>انقر فوق <strong>بحث</strong> لاسترداد النتائج بناءً على البيانات التي تم إنشاؤها.</li>
</ol>
<p>يتم عرض النتائج في جدول، يعرض المعرفات ودرجات التشابه والحقول الديناميكية لكل كيان مطابق.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>استكشاف علاقات البيانات</strong></h3><p>انقر فوق الزر <strong>استكشاف</strong> في لوحة النتائج لتصور العلاقات بين متجه الاستعلام ونتائج البحث في <strong>بنية تشبه الرسم البياني المعرفي</strong>.</p>
<ul>
<li>تمثل <strong>العقدة المركزية</strong> متجه البحث.</li>
<li>تمثل <strong>العقد المتصلة</strong> نتائج البحث، وسيؤدي النقر فوقها إلى عرض المعلومات التفصيلية للعقدة المقابلة.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>توسيع الرسم البياني</strong></h3><p>انقر نقرًا مزدوجًا فوق أي عقدة نتيجة لتوسيع اتصالاتها. يكشف هذا الإجراء عن علاقات إضافية بين العقدة المحددة ونقاط البيانات الأخرى في المجموعة، مما يؤدي إلى إنشاء <strong>رسم بياني معرفي أكبر ومترابط</strong>.</p>
<p>يتيح هذا العرض الموسّع استكشافًا أعمق لكيفية ارتباط نقاط البيانات ببعضها البعض، استنادًا إلى تشابه المتجهات.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. الخاتمة<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل Attu على تبسيط إدارة وتصور البيانات المتجهة المخزنة في ميلفوس. من إدخال البيانات إلى تنفيذ الاستعلام والاستكشاف التفاعلي، يوفر واجهة سهلة الاستخدام للتعامل مع مهام البحث المتجه المعقدة. وبفضل ميزات مثل دعم المخطط الديناميكي وتصورات البحث الرسومية ومرشحات الاستعلام المرنة، يمكّن Attu المستخدمين من تحليل مجموعات البيانات واسعة النطاق بفعالية.</p>
<p>من خلال الاستفادة من أدوات الاستكشاف المرئي في Attu، يمكن للمستخدمين فهم بياناتهم بشكل أفضل، وتحديد العلاقات الخفية، واتخاذ قرارات قائمة على البيانات. ابدأ في استكشاف مجموعات البيانات الخاصة بك اليوم مع Attu وMilvus!</p>
<hr>
