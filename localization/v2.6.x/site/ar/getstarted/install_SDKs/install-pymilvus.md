---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: تعرف على كيفية تثبيت حزمة SDK لـ Milvus بلغة Python.
title: تثبيت حزمة أدوات تطوير البرامج (SDK) لـ Milvus بلغة Python
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">تثبيت حزمة أدوات تطوير البرامج (SDK) لـ Milvus بلغة Python<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تثبيت حزمة تطوير البرامج (SDK) لـ Milvus بلغة Python، pymilvus، لـ Milvus.</p>
<p>يدعم الإصدار الحالي من Milvus حزم SDK بلغات Python وNode.js وGO وJava.</p>
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
    </button></h2><ul>
<li>يلزم توفر Python 3.7 أو إصدار أحدث.</li>
<li>يجب تثبيت Google protobuf. يمكنك تثبيته باستخدام الأمر <code translate="no">pip3 install protobuf==3.20.0</code>.</li>
<li>يجب تثبيت grpcio-tools. يمكنك تثبيته باستخدام الأمر <code translate="no">pip3 install grpcio-tools</code>.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">تثبيت PyMilvus عبر pip<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>يتوفر PyMilvus في <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>.</p>
<div class="alert note">
يُنصح بتثبيت إصدار PyMilvus الذي يتوافق مع إصدار خادم Milvus الذي قمت بتثبيته. لمزيد من المعلومات، راجع <a href="/docs/ar/v2.6.x/release_notes.md">ملاحظات الإصدار</a>.
</div>
<pre><code translate="no"><span class="hljs-variable">$ </span>python3 -m pip install pymilvus==<span class="hljs-number">2.6</span>.<span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-installation" class="common-anchor-header">التحقق من التثبيت<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا تم تثبيت PyMilvus بشكل صحيح، فلن تظهر أي استثناءات عند تشغيل الأمر التالي.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>python3 -c <span class="hljs-string">&quot;from pymilvus import Collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تثبيت PyMilvus، يمكنك:</p>
<ul>
<li><p>تعلم العمليات الأساسية لـ Milvus:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/v2.6.x/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/v2.6.x/insert-update-delete.md">الإدراج والتحديث والحذف</a></li>
<li><a href="/docs/ar/v2.6.x/single-vector-search.md">البحث عن متجه واحد</a></li>
<li><a href="/docs/ar/v2.6.x/multi-vector-search.md">البحث المختلط</a></li>
</ul></li>
<li><p>استكشاف <a href="/api-reference/pymilvus/v2.6.x/About.md">مرجع واجهة برمجة تطبيقات PyMilvus</a></p></li>
</ul>
