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
<p>في هذا البرنامج التعليمي، سوف نوضح لك في هذا البرنامج التعليمي كيفية نشر Dify مع Milvus، لتمكين الاسترجاع الفعال ومحرك RAG.</p>
<div class="alert note">
<p>تعتمد هذه الوثائق بشكل أساسي على <a href="https://docs.dify.ai/">وثائق Dify</a> الرسمية. إذا وجدت أي محتوى قديم أو غير متناسق، يُرجى إعطاء الأولوية للوثائق الرسمية ولا تتردد في رفع مشكلة لنا.</p>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">استنساخ المستودع</h3><p>استنسخ الشيفرة المصدرية ل Dify إلى جهازك المحلي:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">إعداد تهيئة البيئة</h3><p>انتقل إلى دليل Docker في شيفرة Dify المصدرية</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>انسخ ملف تكوين البيئة</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">خيارات النشر<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك نشر ديفاي مع ميلفوس باستخدام طريقتين مختلفتين. اختر الطريقة التي تناسب احتياجاتك:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">الخيار 1: استخدام ميلفوس مع دوكر<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم هذا الخيار بتشغيل حاويات Milvus إلى جانب Dify على جهازك المحلي باستخدام Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">تكوين متغيرات البيئة</h3><p>قم بتحرير الملف <code translate="no">.env</code> باستخدام تكوين ميلفوس التالي:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>يستخدم <code translate="no">MILVUS_URI</code> <code translate="no">host.docker.internal:19530</code> الذي يسمح لحاويات Docker بالوصول إلى حاويات Milvus التي تعمل على الجهاز المضيف من خلال شبكة Docker الداخلية.</li>
<li><code translate="no">MILVUS_TOKEN</code> يمكن تركه فارغًا لعمليات نشر Milvus المحلية.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">بدء تشغيل حاويات Docker</h3><p>ابدأ تشغيل الحاويات باستخدام ملف التعريف <code translate="no">milvus</code> لتضمين خدمات Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا الأمر إلى بدء تشغيل خدمة Dify إلى جانب الحاويات <code translate="no">milvus-standalone</code> و <code translate="no">etcd</code> و <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">الخيار 2: استخدام زيليز كلاود<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم هذا الخيار بتوصيل Dify بخدمة Milvus المدارة على Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">تكوين متغيرات البيئة</h3><p>قم بتحرير الملف <code translate="no">.env</code> بتفاصيل اتصال Zilliz Cloud الخاص بك:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>استبدل <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">بنقطة النهاية العامة</a> الخاصة بك من Zilliz Cloud.</li>
<li>استبدل <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">بمفتاح API</a> الخاص بك من Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">ابدأ تشغيل حاويات Docker</h3><p>ابدأ تشغيل حاويات Dify فقط بدون ملف تعريف Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">الوصول إلى Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">سجّل الدخول إلى Dify</h3><p>افتح متصفحك وانتقل إلى صفحة تثبيت Dify، ويمكنك تعيين حساب المسؤول الخاص بك هنا:<code translate="no">http://localhost/install</code> ، ثم قم بتسجيل الدخول إلى صفحة Dify الرئيسية لمزيد من الاستخدام.</p>
<p>لمزيد من الاستخدام والإرشادات، يرجى الرجوع إلى <a href="https://docs.dify.ai/">وثائق Dify</a>.</p>
