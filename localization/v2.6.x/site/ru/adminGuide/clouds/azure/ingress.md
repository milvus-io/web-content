---
id: ingress.md
title: Настройка входящего nginx с помощью Milvus
related_key: ingress nginx
summary: 'Узнайте, как настроить ingress nginx с помощью Milvus.'
---
<h1 id="Configure-ingress-nginx-with-Milvus" class="common-anchor-header">Настройка входящего nginx с помощью Milvus<button data-href="#Configure-ingress-nginx-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме рассказывается о том, как настроить ingress nginx с помощью Milvus. Для получения более подробной информации обратитесь к разделу <a href="https://learn.microsoft.com/en-us/azure/aks/ingress-tls?tabs=azure-cli">ingress-nginx</a>.</p>
<h2 id="Configure-ingress-nginx" class="common-anchor-header">Настройка входящего nginx<button data-href="#Configure-ingress-nginx" class="anchor-icon" translate="no">
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
<li>Установите env.</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> DNS_LABEL=<span class="hljs-string">&quot;milvustest&quot;</span> <span class="hljs-comment"># Your DNS label must be unique within its Azure location.</span>
<span class="hljs-built_in">export</span> NAMESPACE=<span class="hljs-string">&quot;ingress-basic&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Установить ingress nginx</li>
</ul>
<pre><code translate="no" class="language-bash">helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
    --create-namespace \
    --namespace <span class="hljs-variable">$NAMESPACE</span> \
    --<span class="hljs-built_in">set</span> controller.service.annotations.<span class="hljs-string">&quot;service\.beta\.kubernetes\.io/azure-dns-label-name&quot;</span>=<span class="hljs-variable">$DNS_LABEL</span> \  
    --<span class="hljs-built_in">set</span> controller.service.annotations.<span class="hljs-string">&quot;service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path&quot;</span>=/healthz
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Получить внешний IP-адрес.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl --namespace <span class="hljs-variable">$NAMESPACE</span> get services -o wide -w ingress-nginx-controller
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Настройте FQDN для вашего ингресс-контроллера.</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Public IP address of your ingress controller</span>
IP=<span class="hljs-string">&quot;MY_EXTERNAL_IP&quot;</span>

<span class="hljs-comment"># Get the resource-id of the public IP</span>
PUBLICIPID=$(az network public-ip list --query <span class="hljs-string">&quot;[?ipAddress!=null]|[?contains(ipAddress, &#x27;<span class="hljs-variable">$IP</span>&#x27;)].[id]&quot;</span> --output tsv)

<span class="hljs-comment"># Update public IP address with DNS name</span>
az network public-ip update --ids <span class="hljs-variable">$PUBLICIPID</span> --dns-name <span class="hljs-variable">$DNS_LABEL</span>

<span class="hljs-comment"># Display the FQDN</span>
az network public-ip show --ids <span class="hljs-variable">$PUBLICIPID</span> --query <span class="hljs-string">&quot;[dnsSettings.fqdn]&quot;</span> --output tsv
<span class="hljs-comment"># sample output: milvustest.eastus2.cloudapp.azure.com</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-cert-manager" class="common-anchor-header">Установите cert-manager<button data-href="#Install-cert-manager" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
    --namespace <span class="hljs-variable">$NAMESPACE</span> \
    --<span class="hljs-built_in">set</span> installCRDs=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-CA-cluster-issuer" class="common-anchor-header">Создайте кластерный эмитент CA<button data-href="#Create-a-CA-cluster-issuer" class="anchor-icon" translate="no">
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
<li>Создайте кластерный эмитент, например cluster-issuer.yaml, используя следующий пример манифеста. Замените MY_EMAIL_ADDRESS на действительный адрес вашей организации.</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ClusterIssuer</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">letsencrypt</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">acme:</span>
    <span class="hljs-attr">server:</span> <span class="hljs-string">https://acme-v02.api.letsencrypt.org/directory</span>
    <span class="hljs-attr">email:</span> <span class="hljs-string">MY_EMAIL_ADDRESS</span>
    <span class="hljs-attr">privateKeySecretRef:</span>
      <span class="hljs-attr">name:</span> <span class="hljs-string">letsencrypt</span>
    <span class="hljs-attr">solvers:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">http01:</span>
        <span class="hljs-attr">ingress:</span>
          <span class="hljs-attr">class:</span> <span class="hljs-string">nginx</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Примените эмитент с помощью команды kubectl apply.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl apply -f cluster-issuer.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Развертывание Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>обратитесь к <a href="https://milvus.io/docs/azure.md">Azure</a>, обратите внимание на значение config <code translate="no">service.type</code>, его нужно изменить на <code translate="no">ClusterIP</code>.</p>
<h2 id="Create-Milvus-ingress-route" class="common-anchor-header">Создайте ингресс-маршрут Milvus<button data-href="#Create-Milvus-ingress-route" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>содержимое ingress.yaml:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Ingress</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">cert-manager.io/cluster-issuer:</span> <span class="hljs-string">letsencrypt</span>
    <span class="hljs-attr">nginx.ingress.kubernetes.io/backend-protocol:</span> <span class="hljs-string">GRPC</span>
    <span class="hljs-attr">nginx.ingress.kubernetes.io/force-ssl-redirect:</span> <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-attr">nginx.ingress.kubernetes.io/proxy-body-size:</span> <span class="hljs-string">2048m</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">ingressClassName:</span> <span class="hljs-string">nginx</span>
  <span class="hljs-attr">tls:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">hosts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">milvustest.eastus2.cloudapp.azure.com</span> <span class="hljs-comment"># the FQDN</span>
    <span class="hljs-attr">secretName:</span> <span class="hljs-string">tls-secret</span>
  <span class="hljs-attr">rules:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">host:</span> <span class="hljs-string">milvustest.eastus2.cloudapp.azure.com</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-attr">paths:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">path:</span> <span class="hljs-string">/</span>
            <span class="hljs-attr">pathType:</span> <span class="hljs-string">Prefix</span>
            <span class="hljs-attr">backend:</span>
              <span class="hljs-attr">service:</span>
                <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
                <span class="hljs-attr">port:</span>
                  <span class="hljs-attr">number:</span> <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify" class="common-anchor-header">Verify<button data-href="#Verify" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">kubectl get certificate 
NAME         READY   SECRET       AGE
tls-secret   True    tls-secret   8m7s
kubectl get ingress
NAME                CLASS   HOSTS                                   ADDRESS        PORTS     AGE
my-release-milvus   nginx   milvustest.eastus2.cloudapp.azure.com   EXTERNAL-IP   80, 443   8m15s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Привет Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Пожалуйста, обратитесь к <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, измените uri args, затем запустите код.</p>
<pre><code translate="no" class="language-python">connections.connect(<span class="hljs-string">&quot;default&quot;</span>,uri=<span class="hljs-string">&quot;https://milvustest.eastus2.cloudapp.azure.com:443&quot;</span>) 
<button class="copy-code-btn"></button></code></pre>
