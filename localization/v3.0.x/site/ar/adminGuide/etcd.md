---
id: etcd.md
title: etcd
---
<h1 id="etcd-Metadata" class="common-anchor-header">etcd (البيانات الوصفية)<button data-href="#etcd-Metadata" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم Milvus <strong>etcd</strong> لتخزين البيانات الوصفية مثل مخططات المجموعات وحالة العقد ونقاط فحص استهلاك الرسائل.</p>
<h2 id="Version" class="common-anchor-header">الإصدار<button data-href="#Version" class="anchor-icon" translate="no">
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
    </button></h2><p>تم التحقق من توافق Milvus مع <strong>etcd 3.5.x</strong>. عند تثبيت Milvus باستخدام Helm، تكون صورة etcd المرفقة هي <code translate="no">milvusdb/etcd:3.5.25-r1</code> بشكل افتراضي.</p>
<h2 id="Change-the-etcd-image-with-Helm" class="common-anchor-header">تغيير صورة etcd باستخدام Helm<button data-href="#Change-the-etcd-image-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>لتثبيت إصدار صورة etcd أو استبداله، قم بتجاوز <code translate="no">etcd.image.tag</code> (و، إذا لزم الأمر، <code translate="no">etcd.image.repository</code>) عند التثبيت أو الترقية باستخدام Helm:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> etcd.image.repository=milvusdb/etcd \
  --<span class="hljs-built_in">set</span> etcd.image.tag=3.5.25-r1
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ etcd الخارجي، أو للحصول على تفاصيل حول تكوين Docker Compose / Helm / Milvus Operator، راجع <a href="/docs/ar/deploy_etcd.md">تكوين التخزين التوضيحي باستخدام Docker Compose أو Helm</a> <a href="/docs/ar/meta_storage_operator.md">وتكوين التخزين التوضيحي باستخدام Milvus Operator</a>.</p>
