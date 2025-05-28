---
id: aws_layer7.md
title: إعداد موازن تحميل من الطبقة 7 لميلفوس على AWS
related_key: cluster
summary: >-
  تعرف على كيفية نشر مجموعة Milvus العنقودية خلف موازن تحميل من الطبقة السابعة
  على AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">إعداد موازن تحميل من الطبقة 7 لميلفوس على AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>عند مقارنته بموازن تحميل الطبقة 4، يوفر موازن التحميل من الطبقة 7 إمكانات ذكية لموازنة التحميل والتخزين المؤقت، وهو خيار رائع للخدمات السحابية الأصلية.</p>
<p>يرشدك هذا الدليل إلى كيفية إعداد موازن تحميل من الطبقة 7 لمجموعة Milvus التي تعمل بالفعل خلف موازن تحميل من الطبقة 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">قبل البدء</h3><ul>
<li>لقد قمت <a href="/docs/ar/eks.md">بنشر مجموعة Milvus خلف موازن تحميل من الطبقة 4 على AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">تعديل تكوينات Milvus</h3><p>يفترض هذا الدليل أنك قمت بالفعل <a href="/docs/ar/eks.md">بنشر مجموعة Milvus خلف موازن تحميل من الطبقة 4 على AWS</a>.</p>
<p>قبل إعداد موازن تحميل من الطبقة السابعة لمجموعة Milvus العنقودية هذه، قم بتشغيل الأمر التالي لإزالة موازن تحميل الطبقة الرابعة.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.type=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">إعداد شهادات TLS</h3><p>يتطلب TLS شهادات للعمل. نحن نستخدم <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> لإدارة الشهادات ونحتاج إلى استيراد شهادة موجودة إلى ACM. ارجع إلى <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">استيراد شهادة</a>. وفيما يلي مثال على ذلك.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># If the import-certificate command is successful, it returns the arn of the imported certificate.</span>
aws acm import-certificate --certificate fileb://Certificate.pem \
      --certificate-chain fileb://CertificateChain.pem \
      --private-key fileb://PrivateKey.pem  
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">قم بإنشاء مدخل لإنشاء موازن تحميل من الطبقة السابعة</h3><p>قم بإعداد ملف الدخول على النحو التالي وقم بتسميته <code translate="no">ingress.yaml</code>. <strong>قم باستبدال الشهادة arn والمضيف بالشهادة الخاصة بك.</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Ingress</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-demo</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/scheme:</span> <span class="hljs-string">internet-facing</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/backend-protocol-version:</span> <span class="hljs-string">GRPC</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/target-type:</span> <span class="hljs-string">ip</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/listen-ports:</span> <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    <span class="hljs-attr">alb.ingress.kubernetes.io/certificate-arn:</span> <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">ingressClassName:</span> <span class="hljs-string">alb</span>
  <span class="hljs-attr">rules:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">host:</span> <span class="hljs-string">milvus-demo.milvus.io</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-attr">paths:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">path:</span> <span class="hljs-string">/</span>
          <span class="hljs-attr">pathType:</span> <span class="hljs-string">Prefix</span>
          <span class="hljs-attr">backend:</span>
            <span class="hljs-attr">service:</span>
              <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-demo</span>
              <span class="hljs-attr">port:</span>
                <span class="hljs-attr">number:</span> <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك إنشاء الدخول عن طريق تطبيق الملف على مجموعة EKS الخاصة بك.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>الآن، انتظر حتى تقوم AWS بإعداد موازن تحميل الطبقة 7. يمكنك التحقق من التقدم عن طريق تشغيل</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يكون الناتج مشابهًا لما يلي:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد عرض العنوان في حقل <strong>ADDRESS،</strong> يكون موازن تحميل Layer-7 جاهزًا للاستخدام.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">تحقق من الاتصال من خلال موازن التحميل Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم هذا الدليل PyMilvus للتحقق من الاتصال بخدمة Milvus خلف موازن تحميل Layer-7 الذي أنشأناه للتو. للاطلاع على الخطوات التفصيلية، <a href="https://milvus.io/docs/v2.3.x/example_code.md">اقرأ هذا</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>يجب استبدال <strong>المضيف</strong> <strong>واسم_الخادم</strong> باسمك.</li>
<li>إذا كنت قد أعددت سجل DNS لتعيين اسم المجال إلى alb، استبدل <strong>المضيف</strong> باسم المجال واحذف <strong>اسم_الخادم_الاسم</strong>.</li>
</ul>
</div>
