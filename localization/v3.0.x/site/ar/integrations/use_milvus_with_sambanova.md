---
id: use_milvus_with_sambanova.md
summary: >-
  يستفيد هذا البرنامج التعليمي من تكامل Milvus في مجموعات SambaNova للذكاء
  الاصطناعي للمبتدئين لبناء نظام استرجاع المعرفة المؤسسية على غرار RAG
  (الاسترجاع المعزز) لاسترجاع المعلومات والإجابة عليها استنادًا إلى المستندات
  الخاصة بالمؤسسة.
title: استخدم Milvus مع SambaNova
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">استخدم Milvus مع SambaNova<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">SambaNova</a> هي منصة تكنولوجيا ذكاء اصطناعي مبتكرة تعمل على تسريع نشر قدرات الذكاء الاصطناعي المتقدمة والتعلم العميق. وهي مصممة للاستخدام في المؤسسات، وهي تمكّن المؤسسات من الاستفادة من الذكاء الاصطناعي التوليدي لتحسين الأداء والكفاءة. ومن خلال توفير حلول متطورة مثل حزمة SambaNova Suite وDataScale، تمكّن المنصة الشركات من استخلاص رؤى قيمة من بياناتها، مما يؤدي إلى تحسينات تشغيلية وتعزيز فرص جديدة في مجال الذكاء الاصطناعي.</p>
<p><a href="https://github.com/sambanova/ai-starter-kit">مجموعات أدوات SambaNova للذكاء الاصطناعي</a> هي مجموعة من الموارد مفتوحة المصدر المصممة لمساعدة المطورين والشركات في نشر التطبيقات القائمة على الذكاء الاصطناعي باستخدام SambaNova. توفر هذه المجموعات أمثلة وأدلة عملية تسهل تنفيذ حالات استخدام الذكاء الاصطناعي المختلفة، مما يسهل على المستخدمين الاستفادة من تقنية SambaNova المتقدمة.</p>
<p>يستفيد هذا البرنامج التعليمي من تكامل Milvus في مجموعات أدوات SambaNova للذكاء الاصطناعي للمبتدئين لبناء نظام استرجاع المعرفة المؤسسية على غرار RAG (الاسترجاع المعزز)، لاسترجاع المعلومات والإجابة عليها استنادًا إلى المستندات الخاصة بالمؤسسة.</p>
<div class="alert note">
<p>يُشار في هذا البرنامج التعليمي بشكل أساسي إلى الدليل الرسمي لـ <a href="https://github.com/sambanova/ai-starter-kit/tree/main">SambaNova AI Starter Kits</a>. إذا وجدت أن هذا البرنامج التعليمي يحتوي على أجزاء قديمة، يمكنك إعطاء الأولوية لاتباع الدليل الرسمي وإنشاء مشكلة لنا.</p>
</div>
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
    </button></h2><p>نوصي باستخدام Python &gt;= 3.10 و &lt;3.12.</p>
<p>قم بزيارة <a href="https://cloud.sambanova.ai/">SambaNova Cloud</a> للحصول على مفتاح SambaNova API.</p>
<h2 id="Clone-the-repository" class="common-anchor-header">استنساخ المستودع<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">d ai-starter-kit/enterprise_knowledge_retriever</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">تغيير نوع مخزن المتجهات<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتغيير مخزن المتجهات عن طريق تعيين <code translate="no">db_type='milvus'</code> في الدالتين <code translate="no">create_vector_store()</code> و <code translate="no">load_vdb()</code> في <code translate="no">src/document_retrieval.py</code>.</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">تثبيت التبعيات<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتثبيت التبعيات المطلوبة عن طريق تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
source enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">بدء تشغيل التطبيق<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الأمر التالي لبدء تشغيل التطبيق:</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، سترى واجهة المستخدم في متصفحك:<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>بعد تعيين مفتاح SambaNova API الخاص بك في واجهة المستخدم، يمكنك التلاعب بواجهة المستخدم وطرح أسئلة حول مستنداتك.</p>
<p>للمزيد من التفاصيل، يُرجى الرجوع إلى الوثائق الرسمية <a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">لاسترجاع المعرفة المؤسسية لمجموعات SambaNova AI Starter Kits</a>.</p>
