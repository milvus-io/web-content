---
id: milvus_and_n8n.md
summary: >-
  n8n عبارة عن منصة قوية مفتوحة المصدر لأتمتة سير العمل تتيح لك ربط العديد من
  التطبيقات والخدمات وواجهات برمجة التطبيقات معًا لإنشاء عمليات سير عمل آلية دون
  الحاجة إلى الترميز. من خلال واجهته المرئية القائمة على العقد، يمكّن n8n
  المستخدمين من إنشاء عمليات أتمتة معقدة من خلال ربط العقد التي تمثل خدمات أو
  إجراءات مختلفة. وهو قابل للاستضافة الذاتية، وقابل للتوسعة بدرجة كبيرة، ويدعم
  كلاً من الترخيص العادل والترخيص المؤسسي.
title: البدء باستخدام ميلفوس و n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">الشروع في استخدام ميلفوس و n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">مقدمة إلى n8n وعقدة مخزن ميلفوس فيكتور<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> عبارة عن منصة قوية مفتوحة المصدر لأتمتة سير العمل تتيح لك ربط العديد من التطبيقات والخدمات وواجهات برمجة التطبيقات معًا لإنشاء عمليات سير عمل مؤتمتة دون الحاجة إلى الترميز. من خلال واجهته المرئية القائمة على العقد، يمكّن n8n المستخدمين من إنشاء عمليات أتمتة معقدة من خلال ربط العقد التي تمثل خدمات أو إجراءات مختلفة. وهو قابل للاستضافة الذاتية، وقابل للتوسعة بدرجة كبيرة، ويدعم كلاً من الترخيص العادل والترخيص المؤسسي.</p>
<p>تدمج عقدة <strong>متجر Milvus Vector Store</strong> في n8n <a href="https://milvus.io/">Milvus</a> في عمليات سير عمل الأتمتة الخاصة بك. يتيح لك ذلك إجراء البحث الدلالي، وتشغيل أنظمة توليد الاسترجاع المعزز (RAG)، وبناء تطبيقات ذكاء اصطناعي ذكية - كل ذلك ضمن النظام البيئي n8n.</p>
<p>تعتمد هذه الوثائق بشكل أساسي على <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">وثائق متجر n8n Milvus Vector Store</a> الرسمية. إذا وجدت أي محتوى قديم أو غير متناسق، يُرجى إعطاء الأولوية للوثائق الرسمية ولا تتردد في إثارة مشكلة لنا.</p>
<h2 id="Key-Features" class="common-anchor-header">الميزات الرئيسية<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>باستخدام عقدة مخزن متجه ميلفوس فيكتور في n8n، يمكنك:</p>
<ul>
<li>التفاعل مع قاعدة بيانات ملفوس الخاصة بك <a href="https://docs.n8n.io/glossary/#ai-vector-store">كمخزن مت</a>جهات</li>
<li>إدراج المستندات في ملفوس</li>
<li>الحصول على المستندات من ملفوس</li>
<li>استرداد المستندات لتزويدها إلى مسترجع متصل <a href="https://docs.n8n.io/glossary/#ai-chain">بسلسلة</a></li>
<li>الاتصال مباشرةً <a href="https://docs.n8n.io/glossary/#ai-agent">بوكيل</a> <a href="https://docs.n8n.io/glossary/#ai-tool">كأداة</a></li>
<li>تصفية المستندات بناءً على البيانات الوصفية</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">أنماط استخدام العقدة<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك استخدام عقدة مخزن ميلفوس المتجه في n8n بالأنماط التالية.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">استخدام كعقدة عادية لإدراج المستندات واسترجاعها</h3><p>يمكنك استخدام مخزن Milvus Vector Store كعقدة عادية لإدراج المستندات أو استرجاعها. يضع هذا النمط مخزن Milvus Vector Store في تدفق الاتصال العادي دون استخدام وكيل.</p>
<p>راجع <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">نموذج المثال</a> هذا لمعرفة كيفية إنشاء نظام يخزن المستندات في Milvus ويسترجعها لدعم الإجابات المستشهد بها والمستندة إلى الدردشة.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">الاتصال مباشرة بوكيل ذكاء اصطناعي كأداة</h3><p>يمكنك توصيل عقدة مخزن المتجهات Milvus Vector Store مباشرةً بموصل أداة <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">وكيل الذكاء</a> الاصطناعي لاستخدام مخزن المتجهات كمورد عند الإجابة على الاستفسارات.</p>
<p>هنا، سيكون الاتصال هنا: وكيل ذكاء اصطناعي (موصل الأدوات) -&gt; عقدة مخزن متجه ميلفوس. انظر <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">نموذج المثال</a> هذا حيث يتم تضمين البيانات وفهرستها في Milvus، ويستخدم وكيل الذكاء الاصطناعي مخزن المتجهات كأداة معرفة للإجابة عن الأسئلة.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">استخدام مسترجع لجلب المستندات</h3><p>يمكنك استخدام عقدة مسترجع <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">مخزن</a> المتجهات مع عقدة مخزن متجهات Milvus لجلب المستندات من عقدة مخزن متجهات Milvus. يُستخدم هذا غالبًا مع عقدة <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">سلسلة الأسئلة والأجوبة</a> لجلب المستندات من مخزن المتجهات التي تطابق مدخلات الدردشة المحددة.</p>
<p>يبدو تدفق اتصال العقدة النموذجي كالتالي: سلسلة الأسئلة والأجوبة (موصل سلسلة الأسئلة والأجوبة) -&gt; مسترجع مخزن المتجهات (موصل مخزن المتجهات) -&gt; مخزن متجه ميلفوس المتجه.</p>
<p>تحقق من <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">مثال سير العمل</a> هذا لمعرفة كيفية استيعاب البيانات الخارجية في Milvus وبناء نظام أسئلة وأجوبة دلالي قائم على الدردشة.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">استخدم أداة الإجابة عن الأسئلة في مخزن المتجهات للإجابة عن الأسئلة</h3><p>يستخدم نمط آخر <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">أداة الإجابة عن الأسئلة</a> في <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">مخزن</a> المتجهات لتلخيص النتائج والإجابة عن الأسئلة من عقدة مخزن المتجهات في Milvus. بدلاً من توصيل مخزن المتجهات Milvus Vector Store مباشرةً كأداة، يستخدم هذا النمط أداة مصممة خصيصًا لتلخيص البيانات في مخزن المتجهات.</p>
<p>سيبدو تدفق الاتصالات على النحو التالي عامل الذكاء الاصطناعي (موصل الأدوات) -&gt; أداة الإجابة عن أسئلة مخزن المتجهات (موصل مخزن المتجهات) -&gt; مخزن ميلفوس المتجه.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">أوضاع تشغيل العقدة<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>تدعم عقدة مخزن متجه Milvus Vector Store أوضاع تشغيل متعددة، كل منها مصمم خصيصًا لحالات استخدام سير العمل المختلفة. يساعد فهم هذه الأوضاع في تصميم سير عمل أكثر فعالية.</p>
<p>سنقدم نظرة عامة عالية المستوى على أوضاع التشغيل المتاحة والخيارات أدناه. للحصول على قائمة كاملة بمعلمات الإدخال وخيارات التكوين لكل وضع، يرجى الرجوع إلى <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">الوثائق الرسمية</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">نظرة عامة على أوضاع التشغيل</h3><p>تدعم عقدة مخزن متجه ميلفوس المتجه أربعة أوضاع متميزة:</p>
<ul>
<li><strong>الحصول على العديد</strong>: استرجاع مستندات متعددة استنادًا إلى التشابه الدلالي مع المطالبة.</li>
<li><strong>إدراج مستندات</strong>: إدراج مستندات جديدة في مجموعة Milvus الخاصة بك.</li>
<li><strong>استرجاع المستندات (كمخزن متجه للسلسلة/الأداة)</strong>: استخدم العقدة كمسترجع داخل نظام قائم على سلسلة.</li>
<li><strong>استرجاع المستندات (كأداة لعامل الذكاء الاصطناعي)</strong>: استخدم العقدة كمورد أداة لوكيل الذكاء الاصطناعي أثناء مهام الإجابة عن الأسئلة.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">خيارات العقدة الإضافية</h3><ul>
<li><strong>تصفية بيانات التعريف</strong> (وضع الحصول على العديد فقط): تصفية النتائج بناءً على مفاتيح بيانات التعريف المخصصة. تطبق الحقول المتعددة شرط AND.</li>
<li><strong>مسح المجموعة</strong> (وضع إدراج المستندات فقط): إزالة المستندات الموجودة من المجموعة قبل إدراج مستندات جديدة.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">الموارد ذات الصلة</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">وثائق تكامل n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">وثائق سلسلة اللغات Milvus Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">وثائق الذكاء الاصطناعي المتقدم ل n8n</a></li>
</ul>
