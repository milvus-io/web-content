---
id: gcp_layer7.md
title: Настройка балансировщика нагрузки Layer-7 для Milvus на GCP
related_key: cluster
summary: >-
  Узнайте, как развернуть кластер Milvus за балансировщиком нагрузки Layer-7 на
  GCP.
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Настройка балансировщика нагрузки Layer-7 для Milvus на GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>По сравнению с балансировщиком нагрузки уровня 4, балансировщик нагрузки уровня 7 предлагает интеллектуальную балансировку нагрузки и возможности кэширования и является отличным выбором для облачных нативных сервисов.</p>
<p>В этом руководстве вы узнаете, как настроить балансировщик нагрузки уровня 7 для кластера Milvus, уже работающего за балансировщиком нагрузки уровня 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Перед началом работы</h3><ul>
<li><p>В вашей учетной записи GCP уже существует проект.</p>
<p>Чтобы создать проект, обратитесь к разделу <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Создание и управление проектами</a>. Название проекта, используемого в этом руководстве, - <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Вы локально установили <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> и <a href="https://helm.sh/docs/intro/install/">Helm</a> или решили использовать браузерную <a href="https://cloud.google.com/shell">оболочку Cloud Shell</a>.</p></li>
<li><p>Вы <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">инициализировали gcloud CLI</a> с помощью учетных данных учетной записи GCP.</p></li>
<li><p>Вы <a href="/docs/ru/v2.5.x/gcp.md">развернули кластер Milvus за балансировщиком нагрузки Layer-4 на GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Настройка конфигураций Milvus</h3><p>Это руководство предполагает, что вы уже <a href="/docs/ru/v2.5.x/gcp.md">развернули кластер Milvus за балансировщиком нагрузки Layer-4 на GCP</a>.</p>
<p>Перед настройкой балансировщика нагрузки Layer-7 для этого кластера Milvus выполните следующую команду, чтобы удалить балансировщик нагрузки Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Как внутренняя служба балансировщика нагрузки Layer-7, Milvus должен отвечать <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">определенным требованиям к шифрованию</a>, чтобы он мог понимать HTTP/2-запросы от балансировщика нагрузки. Поэтому вам необходимо включить TLS на кластере Milvus следующим образом.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>содержимое tls.yaml:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Настройка конечной точки проверки работоспособности</h3><p>Чтобы обеспечить доступность сервиса, балансировка нагрузки Layer-7 на GCP требует проверки состояния здоровья внутреннего сервиса. Поэтому нам нужно создать BackendConfig, чтобы обернуть конечную точку проверки состояния здоровья, и связать BackendConfig с сервисом Milvus с помощью аннотаций.</p>
<p>Следующий фрагмент представляет собой настройки BackendConfig. Сохраните его как <code translate="no">backendconfig.yaml</code> для последующего использования.</p>
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
<p>Затем выполните следующую команду для создания конечной точки проверки здоровья.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Наконец, обновите аннотации службы Milvus, чтобы попросить балансировщик нагрузки Layer-7, который мы создадим позже, выполнять проверку здоровья с помощью только что созданной конечной точки.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Что касается первой аннотации,</p>
<p>Milvus является родным для gRPC, который построен на HTTP/2. Поэтому мы можем использовать HTTP/2 в качестве протокола связи между балансировщиком нагрузки Layer-7 и Milvus.</p></li>
<li><p>Что касается второй аннотации,</p>
<p>Milvus предлагает только конечную точку проверки здоровья через gRPC и HTTP/1. Нам нужно настроить BackendConfig для обертывания конечной точки проверки здоровья и связать ее с сервисом Milvus, чтобы балансировщик нагрузки Layer-7 запрашивал эту конечную точку о состоянии здоровья Milvus.</p></li>
<li><p>Что касается третьей аннотации,</p>
<p>В ней предлагается создать группу конечных точек сети (NEG) после создания ингресса. Когда NEG используются с GKE Ingress, контроллер Ingress облегчает создание всех аспектов балансировщика нагрузки. Сюда входит создание виртуального IP-адреса, правил переадресации, проверок работоспособности, правил брандмауэра и т. д. Подробности см. в <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">документах Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Подготовьте сертификаты TLS</h3><p>Для работы TLS требуются сертификаты. <strong>Существует два способа создания сертификатов: самоуправляемый и управляемый Google.</strong></p>
<p>В этом руководстве используется <strong>my-release.milvus.io</strong> в качестве доменного имени для доступа к нашему сервису Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Создание самоуправляемых сертификатов</h4><p>Выполните следующие команды для создания сертификата.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
 -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
 -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>

<p>Затем создайте секрет в кластере GKE с этими файлами для последующего использования.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Создание управляемых сертификатов Google</h4><p>Следующий фрагмент представляет собой настройку ManagedCertificate. Сохраните его как <code translate="no">managed-crt.yaml</code> для последующего использования.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Создайте управляемый сертификат, применив настройку к кластеру GKE следующим образом:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Это может занять некоторое время. Вы можете проверить прогресс, выполнив команду</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>Результат должен быть похож на следующий:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Как только <strong>certificateStatus</strong> станет <strong>активным</strong>, вы будете готовы к настройке балансировщика нагрузки.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Создание ингресса для генерации балансировщика нагрузки уровня 7</h3><p>Создайте YAML-файл с одним из следующих фрагментов.</p>
<ul>
<li><p>Использование самоуправляемых сертификатов</p>
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
<li><p>Использование управляемых Google сертификатов</p>
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
<p>Затем вы можете создать Ingress, применив этот файл к кластеру GKE.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Теперь подождите, пока Google настроит балансировщик нагрузки Layer-7. Вы можете проверить прогресс, выполнив команду</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>Результат должен быть похож на следующий:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Как только в поле <strong>ADDRESS</strong> появится IP-адрес, балансировщик нагрузки Layer-7 будет готов к работе. В приведенном выше выводе отображаются оба порта - 80 и 443. Помните, что для вашего же блага всегда следует использовать порт 443.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Проверка соединения через балансировщик нагрузки Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом руководстве используется PyMilvus для проверки соединения с сервисом Milvus за балансировщиком нагрузки Layer-7, который мы только что создали. Подробные шаги описаны <a href="https://milvus.io/docs/v2.3.x/example_code.md">здесь</a>.</p>
<p>Обратите внимание, что параметры соединения зависят от выбранного вами способа управления сертификатами в <a href="#prepare-tls-certificates">Prepare TLS certificates</a>.</p>
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
<li>IP-адрес и номер порта в параметрах <strong>host</strong> и <strong>port</strong> должны совпадать с теми, что указаны в конце раздела <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a>.</li>
<li>Если вы настроили DNS-запись для сопоставления доменного имени с IP-адресом хоста, замените IP-адрес в <strong>host</strong> на доменное имя и опустите <strong>server_name</strong>.</li>
</ul>
</div>
