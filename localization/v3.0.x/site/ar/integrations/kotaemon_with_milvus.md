---
id: kotaemon_with_milvus.md
summary: >-
  سيرشدك هذا البرنامج التعليمي إلى كيفية تخصيص تطبيق kotaemon الخاص بك باستخدام
  Milvus.
title: Kotaemon RAG مع ميلفوس
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG مع ميلفوس<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> عبارة عن واجهة مستخدم RAG نظيفة ومفتوحة المصدر وقابلة للتخصيص للدردشة مع مستنداتك. تم تصميمه مع وضع كل من المستخدمين النهائيين والمطورين في الاعتبار.</p>
<p>يوفر Kotaemon واجهة مستخدم ويب لضمان جودة المستندات قابلة للتخصيص ومتعددة المستخدمين تدعم واجهة مستخدم ويب قابلة للتخصيص تدعم LLMs المحلية والمستندة إلى واجهة برمجة التطبيقات. وهو يوفر خط أنابيب RAG هجين مع استرجاع النص الكامل والمتجهات، وضمان جودة متعدد الوسائط للمستندات ذات الأشكال والجداول، واستشهادات متقدمة مع معاينات المستندات. وهو يدعم أساليب الاستدلال المعقدة مثل ReAct و ReWOO، ويوفر إعدادات قابلة للتكوين للاسترجاع والتوليد.</p>
<p>سيرشدك هذا البرنامج التعليمي إلى كيفية تخصيص تطبيق كوتايمون الخاص بك باستخدام <a href="https://milvus.io/">ميلفوس</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">التثبيت</h3><p>نوصي بتثبيت كوتايمون بهذه الطريقة:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">optional (setup <span class="hljs-built_in">env</span>)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git clone https://github.com/Cinnamon/kotaemon
cd kotaemon

pip install -e &quot;libs/kotaemon[all]&quot;
pip install -e &quot;libs/ktem&quot;
<button class="copy-code-btn"></button></code></pre>
<p>إلى جانب هذه الطريقة، هناك بعض الطرق الأخرى لتثبيت كوتايمون. يمكنك الرجوع إلى <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">الوثائق الرسمية</a> لمزيد من التفاصيل.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">تعيين ميلفوس كمخزن المتجهات الافتراضي</h3><p>لتغيير وحدة تخزين المتجهات الافتراضية إلى ميلفوس، عليك تعديل الملف <code translate="no">flowsettings.py</code> بالتبديل <code translate="no">KH_VECTORSTORE</code> إلى:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">تعيين متغيرات البيئة</h3><p>يمكنك تهيئة النماذج عبر الملف <code translate="no">.env</code> بالمعلومات اللازمة للاتصال بنماذج LLMs ونماذج التضمين. مثل OpenAI، Azure، Ollama، إلخ.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">تشغيل كوتيمون</h3><p>بعد إعداد متغيرات البيئة وتغيير وحدة تخزين المتجهات، يمكنك تشغيل كوتايمون عن طريق تشغيل الأمر التالي:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>اسم المستخدم / كلمة المرور الافتراضية هي: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">بدء تشغيل RAG باستخدام كوتايمون<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. أضف نماذج الذكاء الاصطناعي الخاصة بك</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>في علامة التبويب <code translate="no">Resources</code> ، يمكنك إضافة وتعيين نماذج LLM ونماذج التضمين الخاصة بك. يمكنك إضافة نماذج متعددة وتعيينها كنماذج نشطة أو غير نشطة. ما عليك سوى توفير واحد على الأقل. يمكنك أيضًا توفير نماذج متعددة للسماح بالتبديل بينها.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. قم بتحميل مستنداتك</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>من أجل القيام بضمان الجودة على مستنداتك، تحتاج إلى تحميلها إلى التطبيق أولاً. انتقل إلى علامة التبويب <code translate="no">File Index</code> ، ويمكنك تحميل وإدارة مستنداتك المخصصة.</p>
<p>بشكل افتراضي، يتم تخزين جميع بيانات التطبيق في المجلد <code translate="no">./ktem_app_data</code>. يتم تخزين بيانات قاعدة بيانات Milvus في <code translate="no">./ktem_app_data/user_data/vectorstore</code>. يمكنك نسخ هذا المجلد احتياطيًا أو نسخ هذا المجلد لنقل التثبيت إلى جهاز جديد.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. الدردشة مع مستنداتك</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>انتقل الآن إلى علامة التبويب <code translate="no">Chat</code>. تتكون علامة تبويب الدردشة من 3 مناطق: لوحة إعدادات المحادثة، حيث يمكنك إدارة المحادثات ومراجع الملفات؛ ولوحة الدردشة للتفاعل مع روبوت الدردشة؛ ولوحة المعلومات، التي تعرض الأدلة الداعمة ودرجات الثقة وتقييمات الملاءمة للإجابات.</p>
<p>يمكنك تحديد مستنداتك في لوحة إعدادات المحادثة. ثم ابدأ تشغيل RAG مع مستنداتك عن طريق كتابة رسالة في مربع الإدخال وإرسالها إلى روبوت المحادثة.</p>
<p>إذا كنت ترغب في التعمق في كيفية استخدام كوتيمون، يمكنك الحصول على إرشادات كاملة من <a href="https://cinnamon.github.io/kotaemon/usage/">الوثائق الرسمية</a>.</p>
