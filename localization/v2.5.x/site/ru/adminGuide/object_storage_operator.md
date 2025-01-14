---
id: object_storage_operator.md
title: Настройка объектного хранилища с помощью Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 'Узнайте, как настроить объектное хранилище с помощью Milvus Operator.'
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Настройка объектного хранилища с помощью Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует MinIO или S3 в качестве объектного хранилища для сохранения крупных файлов, таких как индексные файлы и двоичные журналы. В этой теме описывается настройка зависимостей объектного хранилища при установке Milvus с Milvus Operator. Дополнительные сведения см. в разделе <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Настройка объектного хранилища с Milvus Operator</a> в репозитории Milvus Operator.</p>
<p>В этой теме предполагается, что вы развернули Milvus Operator.</p>
<div class="alert note">Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Развертывание Milvus Operator</a>. </div>
<p>Вам нужно указать файл конфигурации для использования Milvus Operator для запуска кластера Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для настройки сторонних зависимостей достаточно отредактировать шаблон кода в <code translate="no">milvus_cluster_default.yaml</code>. В следующих разделах описывается настройка объектного хранилища, etcd и Pulsar соответственно.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Настройка хранилища объектов<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Кластер Milvus использует MinIO или S3 в качестве объектного хранилища для хранения больших файлов, таких как индексные файлы и двоичные журналы. Добавьте необходимые поля в поле <code translate="no">spec.dependencies.storage</code> для настройки объектного хранилища, возможные варианты: <code translate="no">external</code> и <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Внутреннее хранилище объектов</h3><p>По умолчанию Milvus Operator развертывает внутрикластерное MinIO для Milvus. Ниже приведен пример конфигурации, демонстрирующий использование этого MinIO в качестве внутреннего хранилища объектов.</p>
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
<p>После применения вышеуказанной конфигурации внутрикластерное MinIO будет работать в автономном режиме с ограничением памяти до 100Mi. Обратите внимание, что</p>
<ul>
<li><p>Поле <code translate="no">deletionPolicy</code> определяет политику удаления для in-cluster MinIO. По умолчанию оно принимает значение <code translate="no">Delete</code>, а в качестве альтернативного варианта может использоваться <code translate="no">Retain</code>.</p>
<ul>
<li><code translate="no">Delete</code> указывает, что внутрикластерное хранилище объектов удаляется при остановке экземпляра Milvus.</li>
<li><code translate="no">Retain</code> указывает, что внутрикластерное хранилище объектов сохраняется в качестве службы зависимостей для последующих запусков экземпляра Milvus.</li>
</ul></li>
<li><p>Поле <code translate="no">pvcDeletion</code> указывает, удалять ли PVC (Persistent Volume Claim) при удалении внутрикластерного MinIO.</p></li>
</ul>
<p>Поля в разделе <code translate="no">inCluster.values</code> такие же, как в Milvus Helm Chart, и вы можете найти их <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">здесь</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Внешнее хранилище объектов</h3><p>Использование <code translate="no">external</code> в файле YAML шаблона указывает на использование внешней службы хранения объектов. Чтобы использовать внешнее хранилище объектов, необходимо правильно задать поля <code translate="no">spec.dependencies.storage</code> и <code translate="no">spec.config.minio</code> в Milvus CRD.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Использование Amazon Web Service (AWS) S3 в качестве внешнего хранилища объектов</h4><ul>
<li><p>Настройте доступ к AWS S3 по AK/SK</p>
<p>Доступ к ведру S3 обычно осуществляется с помощью пары ключей доступа и секретного ключа доступа. Вы можете создать объект <code translate="no">Secret</code> для их хранения в Kubernetes следующим образом:</p>
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
<p>Затем можно настроить ведро AWS S3 в качестве внешнего хранилища объектов:</p>
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
<li><p>Configure AWS S3 Access by AssumeRole</p>
<p>В качестве альтернативы, вы можете заставить Milvus получить доступ к вашему ведру AWS S3, используя <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, так что будут задействованы только временные учетные данные, а не ваш реальный AK/SK.</p>
<p>Если вы предпочитаете именно этот вариант, вам нужно подготовить роль в консоли AWS и получить ее ARN, который обычно имеет вид <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Затем создайте объект <code translate="no">ServiceAccount</code> для его хранения в Kubernetes следующим образом:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Когда все готово, ссылайтесь на вышеупомянутый <code translate="no">ServiceAccount</code> в YAML-файле шаблона и установите <code translate="no">spec.config.minio.useIAM</code> на <code translate="no">true</code>, чтобы включить AssumeRole.</p>
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
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Использование облачного хранилища Google (GCS) в качестве внешнего хранилища объектов</h4><p>Объектное хранилище AWS S3 - не единственный выбор. Вы также можете использовать службу хранения объектов других провайдеров публичных облаков, например Google Cloud.</p>
<ul>
<li><p>Настройка доступа к GCS с помощью AK/SK</p>
<p>Конфигурация в основном аналогична настройке при использовании AWS S3. Вам по-прежнему нужно создать объект <code translate="no">Secret</code> для хранения учетных данных в Kubernetes.</p>
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
<p>Затем нужно только изменить <code translate="no">endpoint</code> на <code translate="no">storage.googleapis.com:443</code> и установить <code translate="no">spec.config.minio.cloudProvider</code> на <code translate="no">gcp</code>, как показано ниже:</p>
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
<li><p>Настройка доступа к GCS по AssumeRole</p>
<p>Подобно AWS S3, вы также можете использовать <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> для доступа к GCS с временными учетными данными, если вы используете GKE в качестве кластера Kubernetes.</p>
<p>Аннотация <code translate="no">ServiceAccount</code> отличается от аннотации AWS EKS. Вам нужно указать имя учетной записи службы GCP вместо ARN роли.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Затем вы можете настроить свой экземпляр Milvus на использование вышеуказанного <code translate="no">ServiceAccount</code> и включить AssumeRole, установив <code translate="no">spec.config.minio.useIAM</code> на <code translate="no">true</code>, как показано ниже:</p>
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
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Milvus Operator:</p>
<ul>
<li><a href="/docs/ru/meta_storage_operator.md">Настройка хранилища метаданных с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/message_storage_operator.md">Настройте хранилище сообщений с помощью Milvus Operator</a></li>
</ul>
