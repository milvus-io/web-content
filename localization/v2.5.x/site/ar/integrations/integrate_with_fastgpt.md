---
id: integrate_with_fastgpt.md
summary: >-
  سيرشدك هذا البرنامج التعليمي إلى كيفية نشر تطبيق FastGPT الحصري الخاص بك بسرعة
  باستخدام [Milvus] (https://milvus.io/).
title: نشر FastGPT مع Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">نشر FastGPT مع Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> هو نظام أسئلة وأجوبة قائم على المعرفة مبني على نموذج اللغة الكبيرة LLM، ويوفر إمكانات جاهزة للاستخدام لمعالجة البيانات واستدعاء النموذج. وعلاوةً على ذلك، فهو يتيح تنسيق سير العمل من خلال تصوّر التدفق، مما يسهّل سيناريوهات الأسئلة والأجوبة المعقدة. سيرشدك هذا البرنامج التعليمي إلى كيفية نشر تطبيق FastGPT الحصري الخاص بك بسرعة باستخدام <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">قم بتنزيل docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من أنك قمت بتثبيت <a href="https://docs.docker.com/compose/">Docker Compose</a> بالفعل.<br>
نفّذ الأمر أدناه لتنزيل ملف docker-compose.yml.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> fastgpt
$ <span class="hljs-built_in">cd</span> fastgpt
$ curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json

<span class="hljs-comment"># milvus version</span>
$ curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml
<span class="hljs-comment"># zilliz version</span>
<span class="hljs-comment"># curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>إذا كنت تستخدم إصدار <a href="https://zilliz.com/cloud">Zilliz،</a> فقم بتعديل معلمات الرابط <code translate="no">MILVUS_ADDRESS</code> و <code translate="no">MILVUS_TOKEN</code> في ملف docker-compose.yml، والذي يتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">قم بتشغيل الحاوية<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بالتشغيل في نفس دليل docker-compose.yml. تأكد من أن إصدار docker-compose أعلى من الإصدار 2.17 بشكل مثالي، حيث أن بعض أوامر الأتمتة قد لا تعمل بخلاف ذلك.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Launch the container</span>
$ docker compose up -d
<span class="hljs-comment"># Wait for 10s, OneAPI typically needs to restart a few times to initially connect to Mysql</span>
$ sleep <span class="hljs-number">10</span>
<span class="hljs-comment"># Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display &#x27;channel not found&#x27; if not restarted, this can be temporarily resolved by manually restarting once, while waiting for the author&#x27;s fix)</span>
$ docker restart oneapi
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">الوصول إلى OneAPI لإضافة نماذج<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن الوصول إلى OneAPI على <code translate="no">ip:3001</code>. اسم المستخدم الافتراضي هو الجذر، وكلمة المرور هي 123456. يمكنك تغيير كلمة المرور بعد تسجيل الدخول.<br>
باستخدام نموذج OpenAI كمثال، انقر على علامة التبويب &quot;القناة&quot;، وحدد نموذج الدردشة ونموذج التضمين ضمن &quot;النماذج&quot;.<br>
أدخل <a href="https://platform.openai.com/docs/quickstart">مفتاح OpenAI API</a> الخاص بك في قسم "الأسرار".<br>
لاستخدام النماذج خارج OpenAI، ولمزيد من المعلومات، يُرجى الرجوع إلى <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">إعداد الرموز<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>انقر على علامة التبويب "الرموز". بشكل افتراضي، يوجد رمز مميز <code translate="no">Initial Root Token</code>. يمكنك أيضًا إنشاء رمز مميز جديد وتعيين حصة خاصة بك.<br>
انقر فوق "نسخ" على الرمز المميز الخاص بك، مع التأكد من أن قيمة هذا الرمز المميز تتطابق مع قيمة <code translate="no">CHAT_API_KEY</code> المحددة في ملف docker-compose.yml.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">الوصول إلى FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>في الوقت الحالي، يمكن الوصول إلى FastGPT مباشرةً على <code translate="no">ip:3000</code> (يرجى الانتباه إلى جدار الحماية). اسم المستخدم لتسجيل الدخول هو الجذر، مع تعيين كلمة المرور إلى <code translate="no">DEFAULT_ROOT_PSW</code> ضمن متغير البيئة docker-compose.yml. إذا كنت بحاجة إلى الوصول إلى اسم المجال، فستحتاج إلى تثبيت <a href="https://nginx.org/en/">Nginx</a> وتهيئته بنفسك.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">إيقاف الحاوية<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل الأمر التالي لإيقاف الحاوية.</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
