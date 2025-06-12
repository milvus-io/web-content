---
id: integrate_with_airbyte.md
summary: >-
  Airbyte هي بنية تحتية مفتوحة المصدر لحركة البيانات لبناء خطوط أنابيب استخراج
  وتحميل البيانات (EL). وهي مصممة لتعدد الاستخدامات، وقابلية التوسع، وسهولة
  الاستخدام. يأتي كتالوج موصل Airbyte "جاهزًا" مع أكثر من 350 موصلًا مدمجًا
  مسبقًا. يمكن استخدام هذه الموصلات لبدء نسخ البيانات من مصدر إلى وجهة في بضع
  دقائق فقط.
title: 'Airbyte: بنية تحتية مفتوحة المصدر لنقل البيانات'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: بنية تحتية مفتوحة المصدر لنقل البيانات<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte هي بنية تحتية مفتوحة المصدر لنقل البيانات لبناء خطوط أنابيب استخراج وتحميل البيانات (EL). وهي مصممة لتعدد الاستخدامات، وقابلية التوسع، وسهولة الاستخدام. يأتي كتالوج موصل Airbyte "جاهزًا" مع أكثر من 350 موصلًا مدمجًا مسبقًا. يمكن استخدام هذه الموصلات لبدء نسخ البيانات من مصدر إلى وجهة في بضع دقائق فقط.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">المكونات الرئيسية ل Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. كتالوج الموصلات</h3><ul>
<li><strong>أكثر من 350 موصل مدمج مسبقاً</strong>: يأتي كتالوج موصل Airbyte "جاهزاً" مع أكثر من 350 موصل مدمج مسبقاً. يمكن استخدام هذه الموصلات لبدء نسخ البيانات من مصدر إلى وجهة في بضع دقائق فقط.</li>
<li><strong>منشئ موصل بدون كود</strong>: يمكنك بسهولة توسيع وظائف Airbyte لدعم حالات الاستخدام المخصصة الخاصة بك من خلال أدوات <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">مثل أداة إنشاء الموصلات بدون كود</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. المنصة</h3><p>توفر منصة Airbyte جميع الخدمات الأفقية المطلوبة لتهيئة عمليات نقل البيانات وتوسيع نطاقها، وهي متاحة كخدمة <a href="https://airbyte.com/product/airbyte-cloud">مُدارة سحابياً</a> أو <a href="https://airbyte.com/product/airbyte-enterprise">مُدارة ذاتياً</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. واجهة المستخدم</h3><p>تتميز Airbyte بواجهة مستخدم، <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">وPyAirbyte</a> (مكتبة Python)، وواجهة <a href="https://docs.airbyte.com/api-documentation">برمجة التطبيقات،</a> <a href="https://docs.airbyte.com/terraform-documentation">ومزود Terraform</a> للتكامل مع الأدوات والنهج المفضل لديك لإدارة البنية التحتية.</p>
<p>مع قدرة Airbyte، يمكن للمستخدمين دمج مصادر البيانات في مجموعة Milvus للبحث عن التشابه.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>ستحتاج إلى</p>
<ul>
<li>حساب Zendesk (أو مصدر بيانات آخر تريد مزامنة البيانات منه)</li>
<li>حساب Airbyte أو مثيل محلي</li>
<li>مفتاح OpenAI API</li>
<li>مجموعة ميلفوس العنقودية</li>
<li>بايثون 3.10 مثبت محلياً</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">إعداد مجموعة ميلفوس العنقودية<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت قد قمت بالفعل بنشر مجموعة K8s للإنتاج، يمكنك تخطي هذه الخطوة والمتابعة مباشرةً <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">لنشر Milvus Operator</a>. إذا لم يكن الأمر كذلك، يمكنك اتباع <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">الخطوات</a> لنشر مجموعة ميلفوس العنقودية مع مشغل ميلفوس.</p>
<p>يتم تخزين الكيانات الفردية (في حالتنا، تذاكر الدعم ومقالات القاعدة المعرفية) في "مجموعة" - بعد إعداد مجموعتك، تحتاج إلى إنشاء مجموعة. اختر اسمًا مناسبًا واضبط البُعد على 1536 لمطابقة البُعد المتجه الذي تم إنشاؤه بواسطة خدمة تضمينات OpenAI.</p>
<p>بعد الإنشاء، قم بتسجيل نقطة النهاية ومعلومات <a href="https://milvus.io/docs/authenticate.md?tab=docker">المصادقة</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">إعداد الاتصال في Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>قاعدة بياناتنا جاهزة، دعنا ننقل بعض البيانات! للقيام بذلك، نحتاج إلى تكوين اتصال في Airbyte. إما أن تقوم بالتسجيل للحصول على حساب Airbyte السحابي على <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> أو قم بتشغيل مثيل محلي كما هو موضح <a href="https://docs.airbyte.com/using-airbyte/getting-started/">في الوثائق</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">إعداد المصدر</h3><p>بمجرد تشغيل المثيل الخاص بك، نحتاج إلى إعداد الاتصال - انقر فوق "اتصال جديد" واختر موصل "دعم Zendesk" كمصدر. بعد النقر فوق الزر "اختبار وحفظ"، ستتحقق Airbyte من إمكانية إنشاء الاتصال.</p>
<p>على سحابة Airbyte، يمكنك المصادقة بسهولة عن طريق النقر على زر "مصادقة". عند استخدام مثيل Airbyte محلي، اتبع الإرشادات الموضحة في صفحة <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">التوثيق</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">إعداد الوجهة</h3><p>إذا كان كل شيء يعمل بشكل صحيح، فإن الخطوة التالية هي إعداد الوجهة لنقل البيانات إليها. هنا، اختر موصل "Milvus".</p>
<p>يقوم موصل "ميلفوس" بثلاثة أشياء:</p>
<ul>
<li><strong>التقطيع والتنسيق</strong> - تقسيم سجلات Zendesk إلى نص وبيانات وصفية. إذا كان النص أكبر من حجم القطعة المحدد، يتم تقسيم السجلات إلى أجزاء متعددة يتم تحميلها في المجموعة بشكل فردي. يمكن أن يحدث تقسيم النص (أو التقطيع)، على سبيل المثال، في حالة تذاكر الدعم الكبيرة أو المقالات المعرفية. من خلال تقسيم النص، يمكنك التأكد من أن عمليات البحث تؤدي دائمًا إلى نتائج مفيدة.</li>
</ul>
<p>دعنا نختار حجم قطعة بحجم 1000 رمز وحقول نصية من النص الأساسي والعنوان والوصف والموضوع، حيث ستكون هذه موجودة في البيانات التي سنتلقاها من Zendesk.</p>
<ul>
<li><strong>التضمين</strong> - يؤدي استخدام نماذج التعلّم الآلي إلى تحويل الأجزاء النصية التي ينتجها جزء المعالجة إلى تضمينات متجهة يمكنك بعد ذلك البحث عن التشابه الدلالي. لإنشاء التضمينات، يجب عليك توفير مفتاح OpenAI API. ستقوم Airbyte بإرسال كل جزء إلى OpenAI وإضافة المتجه الناتج إلى الكيانات التي تم تحميلها في مجموعة Milvus الخاصة بك.</li>
<li><strong>الفهرسة</strong> - بمجرد الانتهاء من فهرسة القطع، يمكنك تحميلها في قاعدة البيانات. للقيام بذلك، أدخل المعلومات التي حصلت عليها عند إعداد مجموعتك ومجموعتك في مجموعة Milvus العنقودية. <div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> سيؤدي النقر فوق "اختبار وحفظ" إلى التحقق مما إذا كان كل شيء مصطفًا بشكل صحيح (بيانات اعتماد صالحة، المجموعة موجودة ولها نفس الأبعاد المتجهة مثل التضمين الذي تم تكوينه، وما إلى ذلك).</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">إعداد تدفق مزامنة الدفق</h3><p>الخطوة الأخيرة قبل أن تصبح البيانات جاهزة للتدفق هي تحديد "التدفقات" المراد مزامنتها. الدفق هو مجموعة من السجلات في المصدر. نظرًا لأن Zendesk يدعم عددًا كبيرًا من التدفقات غير ذات الصلة بحالة الاستخدام الخاصة بنا، دعنا نختار فقط "التذاكر" و "المقالات" ونعطل جميع التدفقات الأخرى لتوفير النطاق الترددي والتأكد من أن المعلومات ذات الصلة فقط ستظهر في عمليات البحث:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> يمكنك تحديد الحقول المراد استخراجها من المصدر بالنقر على اسم الدفق. يعني وضع المزامنة "تزايدي |إلحاق + مستخرج" أن عمليات تشغيل الاتصال اللاحقة تحافظ على مزامنة Zendesk و Milvus أثناء نقل الحد الأدنى من البيانات (فقط المقالات والتذاكر التي تغيرت منذ آخر تشغيل).</p>
<p>بمجرد إعداد الاتصال، سيبدأ Airbyte في مزامنة البيانات. قد يستغرق الأمر بضع دقائق لتظهر في مجموعة ميلفوس الخاصة بك.</p>
<p>إذا قمت بتحديد تكرار النسخ المتماثل، فسيتم تشغيل Airbyte بانتظام للحفاظ على تحديث مجموعة Milvus الخاصة بك بالتغييرات التي تطرأ على مقالات Zendesk والمشكلات التي تم إنشاؤها حديثًا.</p>
<h3 id="Check-flow" class="common-anchor-header">التحقق من التدفق</h3><p>يمكنك التحقق في واجهة مستخدم مجموعة Milvus من واجهة مستخدم Milvus من كيفية تنظيم البيانات في المجموعة عن طريق الانتقال إلى الملعب وتنفيذ استعلام "استعلام البيانات" مع تعيين عامل تصفية إلى "_ab_stream == \"تذاكر\"".<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> كما ترى في طريقة عرض النتيجة، يتم تخزين كل سجل قادم من Zendesk ككيانات منفصلة في Milvus مع جميع البيانات الوصفية المحددة. يظهر الجزء النصي الذي يستند إليه التضمين كخاصية "نص" - هذا هو النص الذي تم تضمينه باستخدام OpenAI وسيكون ما سنبحث عنه.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">إنشاء تطبيق Streamlit للاستعلام عن المجموعة<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>بياناتنا جاهزة - نحتاج الآن إلى بناء التطبيق لاستخدامها. في هذه الحالة، سيكون التطبيق عبارة عن نموذج دعم بسيط للمستخدمين لإرسال حالات الدعم. عندما يضغط المستخدم على إرسال سنقوم بأمرين:</p>
<ul>
<li>البحث عن التذاكر المماثلة التي أرسلها مستخدمون من نفس المؤسسة</li>
<li>البحث عن المقالات القائمة على المعرفة التي قد تكون ذات صلة بالمستخدم</li>
</ul>
<p>في كلتا الحالتين، سنستفيد من البحث الدلالي باستخدام تضمينات OpenAI. للقيام بذلك، يتم أيضًا تضمين وصف المشكلة التي أدخلها المستخدم واستخدامه لاسترداد الكيانات المماثلة من مجموعة Milvus. إذا كانت هناك نتائج ذات صلة، يتم عرضها أسفل النموذج.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">إعداد بيئة واجهة المستخدم</h3><p>ستحتاج إلى تثبيت بايثون محلي لأننا سنستخدم Streamlit لتنفيذ التطبيق.</p>
<p>أولًا، قم بتثبيت Streamlit ومكتبة عميل Milvus ومكتبة عميل OpenAI محليًا:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>لتقديم نموذج دعم أساسي، قم بإنشاء ملف بايثون <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>لتشغيل تطبيقك، استخدم Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي ذلك إلى تصيير نموذج أساسي:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>يمكن أيضًا العثور على الكود الخاص بهذا المثال على <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">إعداد خدمة استعلام الواجهة الخلفية</h3><p>بعد ذلك، دعنا نتحقق من التذاكر المفتوحة الحالية التي قد تكون ذات صلة. للقيام بذلك، قمنا بتضمين النص الذي أدخله المستخدم باستخدام OpenAI، ثم أجرينا بحثًا عن التشابه في مجموعتنا، مع تصفية التذاكر التي لا تزال مفتوحة. إذا كانت هناك تذكرة ذات مسافة منخفضة جدًا بين التذكرة المقدمة والتذكرة الحالية، فأعلم المستخدم ولا ترسل:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>تحدث عدة أشياء هنا</p>
<ul>
<li>يتم إعداد الاتصال بمجموعة ميلفوس العنقودية.</li>
<li>يتم استخدام خدمة OpenAI لإنشاء تضمين للوصف الذي أدخله المستخدم.</li>
<li>يتم إجراء بحث عن التشابه، وتصفية النتائج حسب حالة التذكرة ومعرف المؤسسة (حيث أن التذاكر المفتوحة لنفس المؤسسة هي فقط ذات الصلة).</li>
<li>إذا كانت هناك نتائج وكانت المسافة بين متجهات التضمين للتذكرة الحالية والنص الذي تم إدخاله حديثًا أقل من حد معين، يتم استدعاء هذه الحقيقة.</li>
</ul>
<p>لتشغيل التطبيق الجديد، تحتاج إلى تعيين متغيرات البيئة لـ OpenAI و Milvus أولاً:</p>
<pre><code translate="no" class="language-shell">export MILVUS_TOKEN=...
export MILVUS_URL=https://...
export OPENAI_API_KEY=sk-...

streamlit run app.py
<button class="copy-code-btn"></button></code></pre>
<p>عند محاولة إرسال تذكرة موجودة بالفعل، هكذا ستبدو النتيجة:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> يمكن أيضًا العثور على الكود الخاص بهذا المثال على <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">إظهار المزيد من المعلومات ذات الصلة</h3><p>كما ترى في إخراج التصحيح الأخضر المخفي في النسخة النهائية، هناك تذكرتان مطابقتان لبحثنا (في الحالة جديدة، من المؤسسة الحالية، وقريبة من ناقل التضمين). ومع ذلك، احتلت الأولى (ذات صلة) مرتبة أعلى من الثانية (غير ذات صلة في هذه الحالة)، وهو ما ينعكس في قيمة المسافة الأقل. يتم التقاط هذه العلاقة في متجهات التضمين دون مطابقة الكلمات بشكل مباشر، كما هو الحال في البحث العادي عن النص الكامل.</p>
<p>في الختام، دعنا نعرض معلومات مفيدة بعد إرسال التذكرة لإعطاء المستخدم أكبر قدر ممكن من المعلومات ذات الصلة مقدمًا.</p>
<p>للقيام بذلك، سنقوم بإجراء بحثٍ ثانٍ بعد إرسال التذكرة لجلب مقالات قاعدة المعرفة الأكثر مطابقة:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>إذا لم يكن هناك تذكرة دعم مفتوحة مع درجة تشابه عالية، يتم إرسال التذكرة الجديدة وتظهر المقالات المعرفية ذات الصلة أدناه:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> يمكن أيضًا العثور على الكود الخاص بهذا المثال على <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">الخلاصة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>على الرغم من أن واجهة المستخدم المعروضة هنا ليست نموذج دعم فعلي، بل هي مثال لتوضيح حالة الاستخدام، إلا أن الجمع بين Airbyte و Milvus قوي للغاية - فهو يجعل من السهل تحميل النص من مجموعة متنوعة من المصادر (من قواعد البيانات مثل Postgres عبر واجهات برمجة التطبيقات مثل Zendesk أو GitHub إلى مصادر مخصصة تمامًا تم إنشاؤها باستخدام مجموعة أدوات تطوير البرمجيات SDK الخاصة بـ Airbyte أو أداة إنشاء الموصلات المرئية) وفهرستها في شكل مضمن في Milvus، وهو محرك بحث متجه قوي قادر على التوسع إلى كميات هائلة من البيانات.</p>
<p>Airbyte و Milvus مفتوحا المصدر ومجانيان تمامًا للاستخدام على بنيتك التحتية، مع عروض سحابية لإلغاء تحميل العمليات إذا رغبت في ذلك.</p>
<p>بالإضافة إلى حالة الاستخدام الكلاسيكية للبحث الدلالي الموضحة في هذه المقالة، يمكن أيضًا استخدام الإعداد العام لبناء روبوت دردشة للإجابة عن الأسئلة باستخدام طريقة RAG (الاسترجاع المعزز)، أو أنظمة التوصية، أو المساعدة في جعل الإعلانات أكثر ملاءمة وفعالية.</p>
