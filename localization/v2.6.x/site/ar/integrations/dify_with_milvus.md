---
id: dify_with_milvus.md
summary: >-
  سنوضح لك في هذا البرنامج التعليمي كيفية نشر Dify مع Milvus، لتمكين الاسترجاع
  الفعال ومحرك RAG.
title: نشر Dify مع ميلفوس
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">نشر Dify مع ميلفوس<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> هي عبارة عن منصة مفتوحة المصدر مصممة لتبسيط بناء تطبيقات الذكاء الاصطناعي من خلال الجمع بين النسخ الاحتياطي كخدمة مع LLMOps. تدعم المنصة تطبيقات LLMs السائدة، وتوفر واجهة تنسيق فورية سهلة الاستخدام، ومحركات RAG عالية الجودة، وإطار عمل مرن لوكلاء الذكاء الاصطناعي. وبفضل تدفقات العمل منخفضة التعليمات البرمجية والواجهات سهلة الاستخدام وواجهات برمجة التطبيقات، يُمكّن Dify كلاً من المطورين والمستخدمين غير التقنيين من التركيز على إنشاء حلول ذكاء اصطناعي مبتكرة وواقعية دون التعامل مع التعقيدات.</p>
<p>سنوضح لك في هذا البرنامج التعليمي كيفية نشر Dify مع Milvus، لتمكين الاسترجاع الفعال ومحرك RAG.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">استنساخ المستودع<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>استنسخ الشيفرة المصدرية لـ Dify إلى جهازك المحلي:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">تعيين متغيرات البيئة<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>انتقل إلى دليل Docker في الشيفرة المصدرية لـ Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>انسخ ملف تكوين البيئة</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p>قم بتغيير القيمة <code translate="no">VECTOR_STORE</code> في الملف <code translate="no">.env</code> </p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>تأكد من أن تكوين ميلفوس في الملف <code translate="no">.env</code> يحتوي على السطر التالي:</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أنه من خلال تحديد <code translate="no">VECTOR_STORE=milvus</code> ، سيقوم Dify بإحضار خادم Milvus Standalone في Docker. على الرغم من أنه يمكنك الوصول إلى الخادم من خارج Docker من خلال <code translate="no">http://localhost:19530</code> ، إلا أنه لكي تتمكن حاويات Dify الأخرى من التحدث إليه داخل بيئة Docker، فإنها تحتاج إلى الاتصال باسم DNS الخاص <code translate="no">host.docker.internal</code>. وهكذا قمنا بتعيين <code translate="no">http://host.docker.internal:19530</code> ك <code translate="no">MILVUS_URI</code>.</p>
<p>لنشر الإنتاج، قد ترغب في تخصيص المصادقة. للمزيد من المعلومات حول كيفية تعيين الرمز المميز أو اسم المستخدم وكلمة المرور في Milvus، يمكنك الرجوع إلى <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">صفحة المصادقة</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">ابدأ تشغيل حاويات Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر الأمر المناسب لبدء تشغيل الحاويات بناءً على إصدار Docker Compose على نظامك. يمكنك استخدام الأمر <code translate="no">$ docker compose version</code> للتحقق من الإصدار، والرجوع إلى وثائق Docker لمزيد من المعلومات:</p>
<p>إذا كان لديك Docker Compose V2، استخدم الأمر التالي:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>إذا كان لديك Docker Compose V1، استخدم الأمر التالي:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">سجّل الدخول إلى Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>افتح المتصفح الخاص بك وانتقل إلى صفحة تثبيت Dify، ويمكنك تعيين حساب المسؤول الخاص بك هنا:<code translate="no">http://localhost/install</code> ، ثم قم بتسجيل الدخول إلى صفحة Dify الرئيسية لمزيد من الاستخدام.</p>
<p>لمزيد من الاستخدام والإرشادات، يرجى الرجوع إلى <a href="https://docs.dify.ai/">وثائق Dify</a>.</p>
