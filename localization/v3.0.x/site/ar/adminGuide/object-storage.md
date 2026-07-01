---
id: object-storage.md
title: التخزين الكائني
---
<h1 id="Object-Storage" class="common-anchor-header">التخزين الكائني<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>يخزن Milvus ملفات الفهرس والسجلات الثنائية — التي تشكل الجزء الأكبر من بياناته — في تخزين الكائنات. يدعم Milvus MinIO ومجموعة من مخازن الكائنات السحابية والمتوافقة مع S3.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">مخازن الكائنات المدعومة<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>المزود / الخدمة</th><th style="text-align:center">مدعوم كوحدة تخزين كائنات Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (الافتراضي لعمليات النشر ذاتية الاستضافة)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>تخزين Azure Blob</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>وحدات تخزين أخرى متوافقة مع S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>للحصول على تفاصيل التكوين، راجع <a href="/docs/ar/deploy_s3.md">تكوين التخزين الكائني باستخدام Docker Compose أو Helm</a> <a href="/docs/ar/object_storage_operator.md">وتكوين التخزين الكائني باستخدام Milvus Operator</a>.</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">متطلبات إضافية عند استخدام Woodpecker المدمج<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>عند تشغيل قائمة انتظار رسائل <strong>Woodpecker</strong> الافتراضية مع الخلفية الخاصة بتخزين الكائنات (<code translate="no">storage.type=minio</code>)، يقوم Woodpecker بكتابة سجل الكتابة المسبقة الخاص به إلى نفس تخزين الكائنات ويتطلب <strong>دلالات الكتابة المشروطة (Conditional-Write) الصارمة لـ S3</strong>. لا تتوافق جميع مخازن الكائنات مع هذه المتطلبات — على سبيل المثال، <strong>لا</strong> يُدعم Huawei Cloud OBS حاليًا كخلفية لـ Woodpecker على الرغم من أنه يعمل كمخزن كائنات Milvus عادي.</p>
<p>راجع مصفوفة توافق تخزين الكائنات على صفحة <a href="/docs/ar/woodpecker.md">Woodpecker</a> لمعرفة المتطلبات الدقيقة لكل مزود.</p>
