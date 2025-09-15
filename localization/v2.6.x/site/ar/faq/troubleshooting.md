---
id: troubleshooting.md
summary: تعرف على المشكلات الشائعة التي قد تواجهها مع ميلفوس وكيفية التغلب عليها.
title: استكشاف الأخطاء وإصلاحها
---
<h1 id="Troubleshooting" class="common-anchor-header">استكشاف الأخطاء وإصلاحها<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>تسرد هذه الصفحة المشكلات الشائعة التي قد تحدث عند تشغيل Milvus، بالإضافة إلى النصائح الممكنة لاستكشاف الأخطاء وإصلاحها. تنقسم المشاكل في هذه الصفحة إلى الفئات التالية:</p>
<ul>
<li><a href="#boot_issues">مشاكل التمهيد</a></li>
<li><a href="#runtime_issues">مشاكل وقت التشغيل</a></li>
<li><a href="#api_issues">مشاكل واجهة برمجة التطبيقات</a></li>
<li><a href="#etcd_crash_issues">مشكلات تعطل إلخd</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">مشكلات التمهيد<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>عادةً ما تكون أخطاء التمهيد قاتلة. قم بتشغيل الأمر التالي لعرض تفاصيل الخطأ:</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">مشكلات وقت التشغيل<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>قد تتسبب الأخطاء التي تحدث أثناء وقت التشغيل في تعطل الخدمة. لاستكشاف هذه المشكلة وإصلاحها، تحقق من التوافق بين الخادم والعميل قبل المضي قدماً.</p>
<h2 id="API-issues" class="common-anchor-header">مشكلات واجهة برمجة التطبيقات<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>تحدث هذه المشكلات أثناء استدعاءات أسلوب واجهة برمجة التطبيقات بين خادم Milvus وعميلك. سيتم إرجاعها إلى العميل بشكل متزامن أو غير متزامن.</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">مشاكل تعطل إلخd<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. جراب جراب إلخd معلق<button data-href="#1-etcd-pod-pending" class="anchor-icon" translate="no">
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
    </button></h3><p>تستخدم مجموعة etcd pvc بشكل افتراضي. يجب تهيئة StorageClass مسبقًا لمجموعة Kubernetes.</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. تعطل جراب إلخd<button data-href="#2-etcd-pod-crash" class="anchor-icon" translate="no">
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
    </button></h3><p>عند تعطل جراب إلخd مع <code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code> ، يمكنك تسجيل الدخول إلى هذا الجراب وحذف الملف <code translate="no">/bitnami/etcd/data/member_id</code>.</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3. تستمر القرون المتعددة في التعطل أثناء استمرار تشغيل <code translate="no">etcd-0</code> <button data-href="#3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك تشغيل الكود التالي إذا استمر تعطل عدة كبسولات أثناء استمرار تشغيل <code translate="no">etcd-0</code>.</p>
<pre><code translate="no">kubectl scale sts <span class="hljs-operator">&lt;</span>etcd<span class="hljs-operator">-</span>sts<span class="hljs-operator">&gt;</span> <span class="hljs-comment">--replicas=1</span>
# <span class="hljs-keyword">delete</span> the pvc <span class="hljs-keyword">for</span> etcd<span class="hljs-number">-1</span> <span class="hljs-keyword">and</span> etcd<span class="hljs-number">-2</span>
kubectl scale sts <span class="hljs-operator">&lt;</span>etcd<span class="hljs-operator">-</span>sts<span class="hljs-operator">&gt;</span> <span class="hljs-comment">--replicas=3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4. تعطل جميع الكبسولات<button data-href="#4-All-pods-crash" class="anchor-icon" translate="no">
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
    </button></h3><p>عندما تتعطل جميع الكبسولات، حاول نسخ الملف <code translate="no">/bitnami/etcd/data/member/snap/db</code>. استخدم <code translate="no">https://github.com/etcd-io/bbolt</code> لتعديل بيانات قاعدة البيانات.</p>
<p>يتم الاحتفاظ بجميع بيانات Milvus الوصفية في دلو <code translate="no">key</code>. قم بعمل نسخة احتياطية من البيانات في هذه الدلو وقم بتشغيل الأوامر التالية. لاحظ أن بيانات البادئة في الملف <code translate="no">by-dev/meta/session</code> لا تتطلب نسخة احتياطية.</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>إذا كنت بحاجة إلى مساعدة في حل مشكلة، فلا تتردد في:</p>
<ul>
<li>انضم إلى <a href="https://discord.com/invite/8uyFbECzPX">قناة Discord</a> الخاصة بنا وتواصل للحصول على الدعم من فريق ميلفوس.</li>
<li><a href="https://github.com/milvus-io/milvus/issues/new/choose">قم بتقديم مشكلة</a> على GitHub تتضمن تفاصيل حول مشكلتك.</li>
</ul>
