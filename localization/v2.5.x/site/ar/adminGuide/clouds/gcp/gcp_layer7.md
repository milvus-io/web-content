---
id: gcp_layer7.md
title: إعداد موازن تحميل من الطبقة 7 لميلفوس على GCP
related_key: cluster
summary: >-
  تعرف على كيفية نشر مجموعة Milvus العنقودية خلف موازن تحميل من الطبقة السابعة
  على GCP.
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">إعداد موازن تحميل من الطبقة 7 لميلفوس على GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>عند مقارنته بموازن التحميل من الطبقة 4، فإن موازن التحميل من الطبقة 7 يوفر موازنة تحميل ذكية وإمكانيات تخزين مؤقت، وهو خيار رائع للخدمات السحابية الأصلية.</p>
<p>يرشدك هذا الدليل إلى كيفية إعداد موازن تحميل من الطبقة 7 لمجموعة Milvus التي تعمل بالفعل خلف موازن تحميل من الطبقة 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">قبل البدء</h3><ul>
<li><p>مشروع موجود بالفعل في حساب GCP الخاص بك.</p>
<p>لإنشاء مشروع، راجع <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">إنشاء المشاريع وإدارتها</a>. اسم المشروع المستخدم في هذا الدليل هو <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>لقد قمتَ بتثبيت <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a> و <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> و <a href="https://helm.sh/docs/intro/install/">Helm</a> محليًا أو قررت استخدام <a href="https://cloud.google.com/shell">Cloud Shell</a> المستند إلى المتصفح بدلاً من ذلك.</p></li>
<li><p>قمت <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">بتهيئة gcloud CLI</a> باستخدام بيانات اعتماد حساب GCP الخاص بك.</p></li>
<li><p>قمت <a href="/docs/ar/v2.5.x/gcp.md">بنشر مجموعة Milvus خلف موازن تحميل من الطبقة الرابعة على GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">تعديل تكوينات Milvus</h3><p>يفترض هذا الدليل أنك قمت بالفعل <a href="/docs/ar/v2.5.x/gcp.md">بنشر مجموعة Milvus خلف موازن تحميل من الطبقة 4 على GCP</a>.</p>
<p>قبل إعداد موازن تحميل من الطبقة السابعة لمجموعة Milvus العنقودية هذه، قم بتشغيل الأمر التالي لإزالة موازن تحميل الطبقة الرابعة.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>كخدمة خلفية لموازن تحميل الطبقة 7، يجب على Milvus تلبية <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">متطلبات تشفير معينة</a> حتى يتمكن من فهم طلبات HTTP/2 من موازن التحميل. لذلك، تحتاج إلى تمكين TLS على مجموعة Milvus الخاصة بك على النحو التالي.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>محتوى tls.yaml</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">إعداد نقطة نهاية التحقق من الصحة</h3><p>لضمان توافر الخدمة، تتطلب موازنة التحميل من الطبقة السابعة على GCP فحص الظروف الصحية للخدمة الخلفية. لذلك، نحن بحاجة إلى إعداد BackendConfig لتغليف نقطة نهاية التحقق من الصحة وربط BackendConfig بخدمة Milvus من خلال التعليقات التوضيحية.</p>
<p>المقتطف التالي هو إعدادات BackendConfig. احفظه بصيغة <code translate="no">backendconfig.yaml</code> لاستخدامه لاحقًا.</p>
<pre><code translate="no" class="language-yaml">apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    <span class="hljs-built_in">type</span>: HTTP
<button class="copy-code-btn"></button></code></pre>
<p>ثم قم بتشغيل الأمر التالي لإنشاء نقطة نهاية التحقق من الصحة.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>أخيرًا، قم بتحديث التعليقات التوضيحية لخدمة Milvus لتطلب من موازن تحميل الطبقة السابعة الذي سننشئه لاحقًا إجراء فحوصات الصحة باستخدام نقطة النهاية التي تم إنشاؤها للتو.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>بالنسبة للتعليق التوضيحي الأول,</p>
<p>فإن Milvus أصلي ل gRPC، وهو مبني على HTTP/2. لذلك، يمكننا استخدام HTTP/2 كبروتوكول اتصال بين موازن تحميل الطبقة السابعة وميلفوس.</p></li>
<li><p>أما بالنسبة للتعليق التوضيحي الثاني,</p>
<p>يقدم Milvus نقطة نهاية التحقق من الصحة فقط عبر gRPC و HTTP/1. نحتاج إلى إعداد BackendConfig لتغليف نقطة نهاية التحقق من الصحة وربطها بخدمة Milvus بحيث يقوم موازن تحميل الطبقة السابعة باستكشاف نقطة النهاية هذه لمعرفة الحالة الصحية ل Milvus.</p></li>
<li><p>أما بالنسبة للتعليق التوضيحي الثالث,</p>
<p>فهو يطلب إنشاء مجموعة نقطة نهاية الشبكة (NEG) بعد إنشاء نقطة نهاية الشبكة (Ingress). عند استخدام NEGs مع GKE Ingress، تسهل وحدة التحكم في الدخول إنشاء جميع جوانب موازن التحميل. يتضمن ذلك إنشاء عنوان IP الافتراضي، وقواعد إعادة التوجيه، والتحقق من الصحة، وقواعد جدار الحماية، والمزيد. لمزيد من التفاصيل، راجع <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">مستندات Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">إعداد شهادات TLS</h3><p>يتطلب TLS شهادات للعمل. <strong>هناك طريقتان لإنشاء الشهادات، وهما المدارة ذاتيًا والمدارة من Google.</strong></p>
<p>يستخدم هذا الدليل <strong>my-release.milvus.io</strong> كاسم مجال للوصول إلى خدمة Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">إنشاء شهادات مُدارة ذاتيًا</h4><p>قم بتشغيل الأوامر التالية لإنشاء شهادة.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
 -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
 -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>

<p>ثم قم بإنشاء سر في مجموعة GKE الخاصة بك مع هذه الملفات لاستخدامها لاحقًا.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">إنشاء شهادات مُدارة من Google</h4><p>المقتطف التالي هو إعداد شهادة مُدارة. احفظه بصيغة <code translate="no">managed-crt.yaml</code> لاستخدامه لاحقاً.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء شهادة مُدارة من خلال تطبيق الإعداد على مجموعة GKE العنقودية الخاصة بك على النحو التالي:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>قد يستمر هذا لفترة من الوقت. يمكنك التحقق من التقدم عن طريق تشغيل</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن تكون المخرجات مشابهة لما يلي:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد تحول <strong>certificateStatus</strong> إلى <strong>نشط،</strong> تكون جاهزًا لإعداد موازن التحميل.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">قم بإنشاء مدخل لإنشاء موازن تحميل من الطبقة السابعة</h3><p>قم بإنشاء ملف YAML بأحد المقتطفات التالية.</p>
<ul>
<li><p>استخدام الشهادات المُدارة ذاتيًا</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: networking.<span class="hljs-property">k8s</span>.<span class="hljs-property">io</span>/v1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Ingress</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release-milvus
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">tls</span>:
  - <span class="hljs-attr">hosts</span>:
    - my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">secretName</span>: my-release-milvus-tls
  <span class="hljs-attr">rules</span>:
  - <span class="hljs-attr">host</span>: my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">http</span>:
      <span class="hljs-attr">paths</span>:
      - <span class="hljs-attr">path</span>: /
        <span class="hljs-attr">pathType</span>: <span class="hljs-title class_">Prefix</span>
        <span class="hljs-attr">backend</span>:
          <span class="hljs-attr">service</span>:
            <span class="hljs-attr">name</span>: my-release-milvus
            <span class="hljs-attr">port</span>:
              <span class="hljs-attr">number</span>: <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>باستخدام الشهادات المُدارة ذاتيًا</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  namespace: default
  annotations:
    networking.gke.io/managed-certificates: <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
spec:
  rules:
  - host: my-release.milvus.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-release-milvus
            port:
              number: 19530
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>ثم يمكنك إنشاء Ingress من خلال تطبيق الملف على مجموعة GKE الخاصة بك.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>الآن، انتظر حتى تقوم جوجل بإعداد موازن تحميل الطبقة السابعة. يمكنك التحقق من التقدم عن طريق تشغيل</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>يجب أن يكون الناتج مشابهًا لما يلي:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد عرض عنوان IP في حقل <strong>ADDRESS،</strong> يكون موازن تحميل Layer-7 جاهزًا للاستخدام. يتم عرض كل من المنفذ 80 والمنفذ 443 في الإخراج أعلاه. تذكر أنه يجب عليك دائمًا استخدام المنفذ 443 لمصلحتك.</p>
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
<p>لاحظ أن معلمات الاتصال تختلف بالطريقة التي تختارها لإدارة الشهادات في <a href="#prepare-tls-certificates">إعداد شهادات TLS</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, server_pem_path=<span class="hljs-string">&quot;tls.crt&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)

<span class="hljs-comment"># For Google-managed certificates, there is not need to do so.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<div class="alert note">
<ul>
<li>يجب أن يتطابق عنوان IP ورقم المنفذ في <strong>المضيف</strong> <strong>والمنفذ</strong> مع تلك المدرجة في نهاية <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">إنشاء مدخل لإنشاء موازن تحميل من الطبقة السابعة</a>.</li>
<li>إذا كنت قد قمت بإعداد سجل DNS لتعيين اسم المجال إلى عنوان IP المضيف، استبدل عنوان IP في <strong>المضيف</strong> باسم المجال واحذف <strong>اسم_المخدم</strong>.</li>
</ul>
</div>
