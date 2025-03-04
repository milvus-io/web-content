---
id: ETL_using_vectorETL.md
summary: >-
  في هذا البرنامج التعليمي، سوف نستكشف كيفية تحميل البيانات بكفاءة في ميلفوس
  باستخدام [VectorETL] (https://github.com/ContextData/VectorETL)، وهو إطار عمل
  خفيف الوزن لـ ETL مصمم لقواعد البيانات المتجهة. يعمل VectorETL على تبسيط عملية
  استخراج البيانات من مصادر مختلفة، وتحويلها إلى تضمينات متجهة باستخدام نماذج
  الذكاء الاصطناعي، وتخزينها في Milvus لاسترجاعها بسرعة وقابلية للتطوير. بحلول
  نهاية هذا البرنامج التعليمي، سيكون لديك خط أنابيب ETL عامل يسمح لك بدمج وإدارة
  أنظمة البحث المتجهية بسهولة. دعونا نبدأ!
title: تحميل البيانات بكفاءة إلى ميلفوس باستخدام VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">تحميل البيانات بكفاءة إلى ميلفوس باستخدام VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>في هذا البرنامج التعليمي، سنستكشف كيفية تحميل البيانات بكفاءة في Milvus باستخدام <a href="https://github.com/ContextData/VectorETL">VectorETL،</a> وهو إطار عمل خفيف الوزن لعمليات ETL مصمم لقواعد البيانات المتجهة. يعمل VectorETL على تبسيط عملية استخراج البيانات من مصادر مختلفة، وتحويلها إلى تضمينات متجهة باستخدام نماذج الذكاء الاصطناعي، وتخزينها في Milvus لاسترجاعها بسرعة وقابلية للتطوير. بحلول نهاية هذا البرنامج التعليمي، سيكون لديك خط أنابيب ETL عامل يسمح لك بدمج وإدارة أنظمة البحث المتجهية بسهولة. دعونا نبدأ!</p>
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">التبعية والبيئة</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>يدعم VectorETL العديد من مصادر البيانات، بما في ذلك Amazon S3 و Google Cloud Storage و Local File وغيرها. يمكنك الاطلاع على القائمة الكاملة للمصادر المدعومة <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">هنا</a>. في هذا البرنامج التعليمي، سنركز في هذا البرنامج التعليمي على Amazon S3 كمثال لمصدر البيانات.</p>
<p>سنقوم بتحميل المستندات من Amazon S3. لذلك، تحتاج إلى إعداد <code translate="no">AWS_ACCESS_KEY_ID</code> و <code translate="no">AWS_SECRET_ACCESS_KEY</code> كمتغيرات بيئة للوصول الآمن إلى دلو S3 الخاص بك. بالإضافة إلى ذلك، سوف نستخدم نموذج التضمين الخاص بـ OpenAI <code translate="no">text-embedding-ada-002</code> لتوليد تضمينات للبيانات. يجب عليك أيضًا إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح api</a> <code translate="no">OPENAI_API_KEY</code> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">سير العمل<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">تحديد مصدر البيانات (Amazon S3)</h3><p>في هذه الحالة، نحن نقوم باستخراج المستندات من دلو Amazon S3. يسمح لنا VectorETL بتحديد اسم الدلو، ومسار الملفات، ونوع البيانات التي نعمل معها.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">تكوين نموذج التضمين (OpenAI)</h3><p>بمجرد إعداد مصدر البيانات لدينا، نحتاج إلى تحديد نموذج التضمين الذي سيحول بياناتنا النصية إلى تضمينات متجهة. هنا، نستخدم OpenAI <code translate="no">text-embedding-ada-002</code> في هذا المثال.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">إعداد ميلفوس كقاعدة البيانات المستهدفة</h3><p>نحن بحاجة إلى تخزين التضمينات التي تم إنشاؤها في Milvus. هنا، نحدد معلمات اتصال Milvus الخاصة بنا باستخدام Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>بالنسبة إلى <code translate="no">host</code> و <code translate="no">api_key</code>:</p>
<ul>
<li><p>يعد تعيين <code translate="no">host</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، وترك <code translate="no">api_key</code> فارغًا هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا ملف <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</p></li>
<li><p>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">host</code> واترك <code translate="no">api_key</code> فارغًا.</p></li>
<li><p>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">host</code> و <code translate="no">api_key</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">تحديد الأعمدة للتضمين</h3><p>الآن، نحتاج إلى تحديد الأعمدة من ملفات CSV التي يجب تحويلها إلى تضمينات. يضمن ذلك معالجة الحقول النصية ذات الصلة فقط، مما يحسّن الكفاءة والتخزين على حد سواء.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">إنشاء خط أنابيب VectorETL وتنفيذه</h3><p>مع وجود جميع التكوينات في مكانها الصحيح، نقوم الآن بتهيئة خط أنابيب ETL، وإعداد تدفق البيانات، وتنفيذه.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>من خلال اتباع هذا البرنامج التعليمي، نكون قد نجحنا في بناء خط أنابيب ETL شامل لنقل المستندات من Amazon S3 إلى Milvus باستخدام VectorETL. يتسم VectorETL بالمرونة في مصادر البيانات، بحيث يمكنك اختيار مصادر البيانات التي تريدها بناءً على احتياجات تطبيقك المحددة. وبفضل تصميم VectorETL المعياري، يمكنك بسهولة توسيع خط الأنابيب هذا لدعم مصادر البيانات الأخرى، وتضمين النماذج، مما يجعله أداة قوية لسير عمل الذكاء الاصطناعي وهندسة البيانات!</p>
