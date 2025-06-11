---
id: object_storage_operator.md
title: تكوين تخزين الكائنات باستخدام مشغل Milvus
related_key: "minio, s3, storage, etcd, pulsar"
summary: تعرف على كيفية تكوين تخزين الكائنات باستخدام مشغل Milvus.
---

<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">تكوين تخزين الكائنات باستخدام مشغل Milvus<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم Milvus MinIO أو S3 كمخزن كائنات لاستمرار الملفات واسعة النطاق، مثل ملفات الفهرس والسجلات الثنائية. يقدم هذا الموضوع كيفية تكوين تبعيات تخزين الكائنات عند تثبيت Milvus مع مشغل Milvus. لمزيد من التفاصيل، راجع <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">تكوين تخزين الكائنات مع</a> مشغل Milvus في مستودع مشغل Milvus.</p>
<p>يفترض هذا الموضوع أنك قمت بنشر مشغل Milvus.</p>
<div class="alert note">راجع <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">نشر مشغل Milvus</a> لمزيد من المعلومات. </div>
<p>تحتاج إلى تحديد ملف تكوين لاستخدام مشغل Milvus لبدء تشغيل مجموعة Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحتاج فقط إلى تحرير قالب التعليمات البرمجية في <code translate="no">milvus_cluster_default.yaml</code> لتكوين تبعيات الطرف الثالث. تقدم الأقسام التالية كيفية تكوين تخزين الكائنات و etcd وPulsar على التوالي.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">تكوين تخزين الكائنات<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>تستخدم مجموعة Milvus العنقودية MinIO أو S3 كمخزن كائنات لاستمرار الملفات واسعة النطاق، مثل ملفات الفهرس والسجلات الثنائية. أضف الحقول المطلوبة ضمن <code translate="no">spec.dependencies.storage</code> لتكوين تخزين الكائنات، الخيارات الممكنة هي <code translate="no">external</code> و <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">تخزين الكائنات الداخلية</h3><p>بشكل افتراضي، يقوم مشغل Milvus بنشر MinIO داخل المجموعة لـ Milvus. فيما يلي مثال على التكوين لتوضيح كيفية استخدام MinIO كمخزن كائنات داخلي.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد تطبيق التكوين أعلاه، سيتم تشغيل MinIO داخل الكتلة في الوضع المستقل مع حد ذاكرة يصل إلى 100 ميغابايت. لاحظ أن</p>
<ul>
<li><p>يحدد الحقل <code translate="no">deletionPolicy</code> سياسة الحذف الخاصة بـ MinIO داخل الكتلة. يتم تعيينه افتراضيًا على <code translate="no">Delete</code> ولديه <code translate="no">Retain</code> كخيار بديل.</p>
<ul>
<li><code translate="no">Delete</code> يشير إلى أن تخزين الكائنات داخل الكتلة يتم حذفه عند إيقاف مثيل Milvus الخاص بك.</li>
<li><code translate="no">Retain</code> يشير إلى أنه يتم الاحتفاظ بمخزن الكائنات داخل الكتلة كخدمة تبعية لبدء تشغيل مثيل Milvus الخاص بك في وقت لاحق.</li>
</ul></li>
<li><p>يحدد الحقل <code translate="no">pvcDeletion</code> ما إذا كان سيتم حذف PVC(مطالبة وحدة التخزين الدائمة) عند حذف وحدة تخزين الكائنات داخل الكتلة MinIO.</p></li>
</ul>
<p>الحقول الموجودة ضمن <code translate="no">inCluster.values</code> هي نفسها الموجودة في مخطط Milvus Helm، ويمكنك العثور عليها <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">هنا</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">تخزين الكائنات الخارجية</h3><p>يشير استخدام <code translate="no">external</code> في ملف YAML القالب إلى استخدام خدمة تخزين كائنات خارجية. لاستخدام وحدة تخزين كائنات خارجية، تحتاج إلى تعيين الحقول بشكل صحيح ضمن <code translate="no">spec.dependencies.storage</code> و <code translate="no">spec.config.minio</code> في ملف Milvus CRD.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">استخدام خدمة الويب Amazon Web Service (AWS) S3 كمخزن كائنات خارجي</h4><ul>
<li><p>تكوين الوصول إلى AWS S3 بواسطة AK/SK</p>
<p>يمكن الوصول إلى دلو S3 عادةً عن طريق زوج من مفتاح وصول ومفتاح سري للوصول. يمكنك إنشاء كائن <code translate="no">Secret</code> لتخزينها في Kubernetes الخاص بك على النحو التالي:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك تكوين دلو AWS S3 كمخزن كائن خارجي:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تكوين الوصول إلى AWS S3 بواسطة AssumeRole</p>
<p>وبدلاً من ذلك، يمكنك جعل Milvus يصل إلى دلو AWS S3 الخاص بك باستخدام <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole،</a> بحيث يتم تضمين بيانات الاعتماد المؤقتة فقط بدلاً من AK/SK الفعلي الخاص بك.</p>
<p>إذا كان هذا هو ما تفضله، فأنت بحاجة إلى إعداد دور على وحدة تحكم AWS الخاصة بك والحصول على ARN الخاص به، والذي عادةً ما يكون على شكل <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>ثم قم بإنشاء كائن <code translate="no">ServiceAccount</code> لتخزينه في Kubernetes الخاص بك على النحو التالي:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تعيين كل شيء، قم بالرجوع إلى <code translate="no">ServiceAccount</code> أعلاه في ملف YAML القالب، وقم بتعيين <code translate="no">spec.config.minio.useIAM</code> إلى <code translate="no">true</code> لتمكين AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">استخدم Google Cloud Storage (GCS) كمخزن كائنات خارجي</h4><p>تخزين كائنات AWS S3 ليس الخيار الوحيد. يمكنك أيضًا استخدام خدمة تخزين الكائنات من موفري السحابة العامة الآخرين، مثل Google Cloud.</p>
<ul>
<li><p>تكوين الوصول إلى GCS بواسطة AK/SK</p>
<p>يشبه التكوين في الغالب تكوين استخدام AWS S3. ما زلت بحاجة إلى إنشاء كائن <code translate="no">Secret</code> لتخزين بيانات الاعتماد الخاصة بك في Kubernetes الخاص بك.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، ما عليك سوى تغيير <code translate="no">endpoint</code> إلى <code translate="no">storage.googleapis.com:443</code> وتعيين <code translate="no">spec.config.minio.cloudProvider</code> إلى <code translate="no">gcp</code> على النحو التالي:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تكوين وصول GCS عن طريق AssumeRole</p>
<p>على غرار AWS S3، يمكنك أيضًا استخدام <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">هوية عبء العمل</a> للوصول إلى GCS ببيانات اعتماد مؤقتة إذا كنت تستخدم GKE كمجموعة Kubernetes الخاصة بك.</p>
<p>يختلف الشرح التوضيحي لـ <code translate="no">ServiceAccount</code> عن ذلك الخاص بـ AWS EKS. تحتاج إلى تحديد اسم حساب خدمة GCP بدلاً من الدور ARN.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، يمكنك تهيئة مثيل Milvus الخاص بك لاستخدام <code translate="no">ServiceAccount</code> أعلاه وتمكين AssumeRole عن طريق تعيين <code translate="no">spec.config.minio.useIAM</code> إلى <code translate="no">true</code> على النحو التالي:</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>تعرف على كيفية تكوين تبعيات Milvus الأخرى باستخدام مشغل Milvus:</p>
<ul>
<li><a href="/docs/ar/v2.5.x/meta_storage_operator.md">تكوين التخزين التعريفي باستخدام مشغل Milvus</a></li>
<li><a href="/docs/ar/v2.5.x/message_storage_operator.md">تكوين تخزين الرسائل باستخدام مشغل Milvus</a></li>
</ul>
