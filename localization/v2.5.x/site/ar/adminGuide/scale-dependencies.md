---
id: scale-dependencies.md
title: تبعيات المقياس
---

<h1 id="Scale-Milvus-Dependencies" class="common-anchor-header">تبعيات مقياس ميلفوس<button data-href="#Scale-Milvus-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>يعتمد ميلفوس على العديد من التبعيات مثل MinIO وKafka وPulsar و إلخ. يمكن أن يؤدي توسيع نطاق هذه المكونات إلى تعزيز قدرة ميلفوس على التكيف مع المتطلبات المختلفة.</p>
<div class="alert note">
<p>بالنسبة لمستخدمي مشغل Milvus، راجع <a href="/docs/ar/v2.5.x/object_storage_operator.md">تكوين تخزين الكائنات باستخدام مشغل Mil</a>vus، <a href="/docs/ar/v2.5.x/meta_storage_operator.md">وتكوين التخزين التعريفي باستخدام مشغل Milvus،</a> <a href="/docs/ar/v2.5.x/message_storage_operator.md">وتكوين تخزين الرسائل باستخدام مشغل Milvus</a>.</p>
</div>
<h2 id="Scale-MinIO" class="common-anchor-header">توسيع نطاق MinIO<button data-href="#Scale-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-MinIO-pod" class="common-anchor-header">زيادة الموارد لكل جراب MinIO</h3><p>يمكن زيادة موارد MinIO، وهو نظام تخزين الكائنات الذي يستخدمه Milvus، لوحدة المعالجة المركزية وموارد الذاكرة الخاصة به لكل جراب.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
minio:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا زيادة سعة القرص لمجموعة MioIO عن طريق تغيير قيمة <code translate="no">spec.resources.requests.storage</code> يدويًا لكل مطالبة وحدة تخزين ثابتة من MioIO (PVC). لاحظ أن فئة التخزين الافتراضية يجب أن تسمح بتوسيع وحدة التخزين.</p>
<h3 id="Add-an-extra-MinIO-server-pool-Recommended" class="common-anchor-header">إضافة تجمع خوادم MioIO إضافي (موصى به)</h3><p>يُنصح بإضافة تجمع خوادم MioIO إضافي لمثيل Milvus الخاص بك.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yam;</span>
minio:
  zones: <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي هذا إلى إضافة تجمع خوادم إضافي إلى مجموعة خوادم MinIO الخاصة بك، مما يسمح لـ Milvus بالكتابة إلى تجمع خوادم MinIO استناداً إلى سعة القرص الحرة لكل تجمع خوادم. على سبيل المثال، إذا كان لدى مجموعة مكونة من ثلاثة تجمعات مساحة حرة إجمالية قدرها 10 تيرابايت موزعة على التجمعات على النحو التالي:</p>
<table>
<thead>
<tr><th></th><th>المساحة الخالية</th><th>إمكانية الكتابة</th></tr>
</thead>
<tbody>
<tr><td>المجمع أ</td><td>3 تيرابايت</td><td>30% (3/10)</td></tr>
<tr><td>المجمع ب</td><td>2 TiB</td><td>20% (2/10)</td></tr>
<tr><td>المجموعة C</td><td>5 TiB</td><td>50% (5/10)</td></tr>
</tbody>
</table>
<div class="alert note">
<p>لا يقوم MinIO بإعادة توازن الكائنات تلقائيًا عبر تجمعات الخوادم الجديدة. يمكنك بدء إجراء إعادة التوازن يدويًا باستخدام <code translate="no">mc admin rebalance</code> إذا لزم الأمر.</p>
</div>
<h2 id="Kafka" class="common-anchor-header">كافكا<button data-href="#Kafka" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resource-per-Kafka-broker-pod" class="common-anchor-header">زيادة الموارد لكل جراب وسيط كافكا</h3><p>قم بزيادة سعة وسيط كافكا عن طريق تعديل موارد وحدة المعالجة المركزية والذاكرة لكل جراب وسيط.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  resources:
     limits:
        cpu: <span class="hljs-number">2</span>
        memory: 12Gi
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا زيادة سعة الأقراص لمجموعة كافكا عن طريق تغيير قيمة <code translate="no">spec.resources.requests.storage</code> يدويًا لكل مطالبة وحدة تخزين ثابتة لكافكا (PVC). تأكد من أن فئة التخزين الافتراضية تسمح بتوسيع وحدة التخزين.</p>
<h2 id="Add-an-extra-Kafka-broker-pool-Recommended" class="common-anchor-header">إضافة تجمع وسيط كافكا إضافي (يُنصح بذلك)<button data-href="#Add-an-extra-Kafka-broker-pool-Recommended" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنصح بإضافة تجمّع خوادم كافكا إضافي لمثيل ميلفوس الخاص بك.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  replicaCount: <span class="hljs-number">4</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إضافة وسيط إضافي إلى مجموعة كافكا الخاصة بك.</p>
<div class="alert note">
<p>لا يقوم كافكا بإعادة موازنة المواضيع تلقائيًا عبر جميع الوسطاء. قم بإعادة موازنة المواضيع/الأقسام يدويًا عبر جميع وسطاء كافكا باستخدام <code translate="no">bin/kafka-reassign-partitions.sh</code> بعد تسجيل الدخول إلى كل جراب وسيط كافكا إذا لزم الأمر.</p>
</div>
<h2 id="Pulsar" class="common-anchor-header">بولسار<button data-href="#Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>يفصل بولسار بين الحوسبة والتخزين. يمكنك بشكل مستقل زيادة سعة وسطاء بولسار (الحوسبة) ووسطاء بولسار (التخزين).</p>
<h2 id="Increase-resources-per-Pulsar-broker-pod" class="common-anchor-header">زيادة الموارد في كل جراب وسيط بولسار<button data-href="#Increase-resources-per-Pulsar-broker-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Increase-resources-per-Pulsar-bookie-pod" class="common-anchor-header">زيادة الموارد لكل جراب وكيل مراهنات بولسار<button data-href="#Increase-resources-per-Pulsar-bookie-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا زيادة سعة القرص لمجموعة Pulsar من خلال تغيير قيمة <code translate="no">spec.resources.requests.storage</code> يدويًا لكل مطالبة وحدة تخزين ثابتة لكل وكيل مراهنات Pulsar (PVC). لاحظ أن فئة التخزين الافتراضية يجب أن تسمح بتوسيع وحدة التخزين.</p>
<p>تحتوي جراب وكيل مراهنات Pulsar على نوعين من التخزين: <code translate="no">journal</code> و <code translate="no">legers</code>. بالنسبة لنوع التخزين <code translate="no">journal</code> ، فكر في استخدام <code translate="no">ssd</code> أو <code translate="no">gp3</code> كفئة تخزين. فيما يلي مثال لتحديد فئة التخزين لمجلة بولسار.</p>
<pre><code translate="no">pulsar:
  bookkeeper:
    volumes:
      journal:
        size: 20Gi
        storageClassName: gp3
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-broker-pod" class="common-anchor-header">إضافة جراب وسيط نابض إضافي</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-bookie-pod-Recommended" class="common-anchor-header">إضافة جراب وسيط بولسار إضافي (موصى به)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="etcd" class="common-anchor-header">إلخd<button data-href="#etcd" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-etcd-pod-recommended" class="common-anchor-header">قم بزيادة الموارد لكل جراب مراهنات إلخd (موصى به)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-extra-etcd-pods" class="common-anchor-header">إضافة كبسولات إلخd إضافية</h3><p>يجب أن يكون العدد الإجمالي لحجرات إلخd بأعداد فردية.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  replicaCount: <span class="hljs-number">5</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد حفظ الملف، قم بتطبيق التغييرات باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
