---
id: aws_layer7.md
title: Настройка балансировщика нагрузки Layer-7 для Milvus на AWS
related_key: cluster
summary: >-
  Узнайте, как развернуть кластер Milvus за балансировщиком нагрузки Layer-7 на
  AWS.
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Настройка балансировщика нагрузки Layer-7 для Milvus на AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
<li>Вы <a href="/docs/ru/v2.5.x/eks.md">развернули кластер Milvus за балансировщиком нагрузки Layer-4 на AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Настройка конфигураций Milvus</h3><p>В этом руководстве предполагается, что вы уже <a href="/docs/ru/v2.5.x/eks.md">развернули кластер Milvus за балансировщиком нагрузки Layer-4 на AWS</a>.</p>
<p>Перед настройкой балансировщика нагрузки Layer-7 для этого кластера Milvus выполните следующую команду, чтобы удалить балансировщик нагрузки Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Подготовьте сертификаты TLS</h3><p>Для работы TLS требуются сертификаты. Мы используем <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> для управления сертификатами, и нам нужно импортировать существующий сертификат в ACM. Обратитесь к разделу <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Импорт сертификата</a>. Ниже приведен пример.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Создание входного файла для генерации балансировщика нагрузки уровня 7</h3><p>Подготовьте файл ingress следующим образом и назовите его <code translate="no">ingress.yaml</code>. <strong>Замените arn и host сертификата на свои собственные.</strong></p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    alb.ingress.kubernetes.io/certificate-arn: <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

spec:
ingressClassName: alb
rules: - host: milvus-demo.milvus.io
http:
paths: - path: /
pathType: Prefix
backend:
service:
name: milvus-demo
port:
number: 19530
<button class="copy-code-btn"></button></code></pre>

<p>Затем вы можете создать Ingress, применив этот файл к кластеру EKS.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Теперь подождите, пока AWS настроит балансировщик нагрузки Layer-7. Вы можете проверить прогресс, выполнив команду</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>Результат должен быть похож на следующий:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Как только в поле <strong>ADDRESS</strong> появится адрес, балансировщик нагрузки Layer-7 будет готов к использованию.</p>
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
<li><strong>Хост</strong> и <strong>имя_сервера</strong> должны быть заменены на ваши собственные.</li>
<li>Если вы настроили DNS-запись для сопоставления доменного имени с alb, замените <strong>host</strong> на доменное имя и опустите <strong>server_name</strong>.</li>
</ul>
</div>
