---
id: use_milvus_in_docsgpt.md
summary: >-
  سنوضح لك في هذا البرنامج التعليمي كيفية استخدام Milvus كقاعدة بيانات متجهات
  خلفية ل DocsGPT.
title: استخدام Milvus في DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">استخدام Milvus في DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> هو حل متقدم مفتوح المصدر يسهّل العثور على المعلومات في وثائق المشروع من خلال دمج نماذج GPT القوية. فهو يُمكّن المطورين من الحصول على إجابات دقيقة لأسئلتهم حول المشروع بسهولة، مما يُغنيهم عن عمليات البحث اليدوية التي تستغرق وقتًا طويلًا.</p>
<p>في هذا البرنامج التعليمي، سنوضح لك في هذا البرنامج التعليمي كيفية استخدام Milvus كقاعدة بيانات متجهة خلفية لـ DocsGPT.</p>
<div class="alert note">
<p>يُشار في هذا البرنامج التعليمي بشكل أساسي إلى دليل التثبيت الرسمي لـ <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. إذا وجدت أن هذا البرنامج التعليمي يحتوي على أجزاء قديمة، يمكنك إعطاء الأولوية لاتباع الدليل الرسمي وإنشاء مشكلة لنا.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">المتطلبات<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من تثبيت <a href="https://docs.docker.com/engine/install/">Docker</a> لديك</p>
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
    </button></h2><p>استنسخ المستودع وانتقل إليه:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">إضافة تبعية<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>ألحق التبعية <code translate="no">langchain-milvus</code> بملف <code translate="no">requirements.txt</code> ضمن المجلد <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">تعيين متغيرات البيئة<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>أضف <code translate="no">VECTOR_STORE=milvus</code> و <code translate="no">MILVUS_URI=...</code> و و <code translate="no">MILVUS_TOKEN=...</code> إلى متغيرات البيئة لكل من خدمتي <code translate="no">backend</code> و <code translate="no">worker</code> في الملف <code translate="no">docker-compose.yaml</code> ، هكذا</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة إلى <code translate="no">MILVUS_URI</code> و <code translate="no">MILVUS_TOKEN</code> ، يمكنك إما استخدام خدمة <a href="https://zilliz.com/cloud">زيليز كلاود</a> المدارة بالكامل (موصى به) أو خدمة ميلفوس التي يتم تشغيلها يدويًا.</p>
<ul>
<li><p>لخدمة Zilliz Cloud المدارة بالكامل: نوصي باستخدام خدمة Zilliz Cloud. يمكنك التسجيل للحصول على حساب تجريبي مجاني على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. بعد ذلك، ستحصل على <code translate="no">MILVUS_URI</code> و <code translate="no">MILVUS_TOKEN</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a>.</p></li>
<li><p>لبدء خدمة Milvus يدويًا: إذا كنت ترغب في إعداد خدمة Milvus، يمكنك اتباع <a href="https://milvus.io/docs/install_standalone-docker-compose.md">وثائق Milvus الرسمية</a> لإعداد خادم Milvus، ثم الحصول على <code translate="no">MILVUS_URI</code> و <code translate="no">MILVUS_TOKEN</code> من الخادم. يجب أن يكون <code translate="no">MILVUS_URI</code> و <code translate="no">MILVUS_TOKEN</code> بصيغة <code translate="no">http://&lt;your_server_ip&gt;:19530</code> و <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> على التوالي.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">ابدأ تشغيل الخدمات<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل: <code translate="no">./setup.sh</code></p>
<p>ثم انتقل إلى http://localhost:5173/.</p>
<p>يمكنك التلاعب بواجهة المستخدم وطرح أسئلة حول المستندات الخاصة بك.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>النص البديل</span> </span></p>
<p>إذا كنت تريد إيقاف الخدمات، قم بتشغيل:</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من التفاصيل والإعدادات الأكثر تقدمًا، يُرجى الرجوع إلى الوثائق الرسمية لـ <a href="https://github.com/arc53/DocsGPT">DocsGPT</a>.</p>
