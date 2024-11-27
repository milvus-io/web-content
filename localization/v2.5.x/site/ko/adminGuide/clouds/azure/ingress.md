---
id: ingress.md
title: Milvus로 인그레스 엔진스 구성하기
related_key: ingress nginx
summary: Milvus로 ingress nginx를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-ingress-nginx-with-Milvus" class="common-anchor-header">Milvus로 인그레스 엔진스 구성하기<button data-href="#Configure-ingress-nginx-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus로 ingress nginx를 구성하는 방법을 소개합니다. 자세한 내용은 <a href="https://learn.microsoft.com/en-us/azure/aks/ingress-tls?tabs=azure-cli">ingress-nginx를</a> 참조하세요.</p>
<h2 id="Configure-ingress-nginx" class="common-anchor-header">인그레스 엔진스 구성<button data-href="#Configure-ingress-nginx" class="anchor-icon" translate="no">
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
<li>환경 설정</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> DNS_LABEL=<span class="hljs-string">&quot;milvustest&quot;</span> <span class="hljs-comment"># Your DNS label must be unique within its Azure location.</span>
<span class="hljs-built_in">export</span> NAMESPACE=<span class="hljs-string">&quot;ingress-basic&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>인그레스 nginx 설치</li>
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
<li>외부 IP 주소를 얻습니다.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl --namespace <span class="hljs-variable">$NAMESPACE</span> get services -o wide -w ingress-nginx-controller
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>인그레스 컨트롤러의 FQDN을 구성합니다.</li>
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
<h2 id="Install-cert-manager" class="common-anchor-header">인증서 관리자 설치<button data-href="#Install-cert-manager" class="anchor-icon" translate="no">
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
<h2 id="Create-a-CA-cluster-issuer" class="common-anchor-header">CA 클러스터 발급자 만들기<button data-href="#Create-a-CA-cluster-issuer" class="anchor-icon" translate="no">
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
<li>다음 예제 매니페스트에 따라 클러스터 발급자(예: cluster-issuer.yaml)를 만듭니다. MY_EMAIL_ADDRESS를 조직의 유효한 주소로 바꿉니다.</li>
</ul>
<pre><code translate="no" class="language-yaml">apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: MY_EMAIL_ADDRESS
    privateKeySecretRef:
      name: letsencrypt
    solvers:
    - http01:
        ingress:
          class: nginx
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>kubectl apply 명령을 사용하여 발급자를 적용한다.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl apply -f cluster-issuer.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Milvus 배포<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>를 참조하고, <code translate="no">service.type</code> 값을 <code translate="no">ClusterIP</code> 으로 변경해야 합니다.</p>
<h2 id="Create-Milvus-ingress-route" class="common-anchor-header">Milvus 인그레스 경로 생성<button data-href="#Create-Milvus-ingress-route" class="anchor-icon" translate="no">
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
<p>ingress.yaml 콘텐츠를 생성합니다:</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    nginx.ingress.kubernetes.io/backend-protocol: GRPC
    nginx.ingress.kubernetes.io/force-ssl-redirect: <span class="hljs-string">&quot;true&quot;</span>
    nginx.ingress.kubernetes.io/proxy-body-size: 2048m
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - milvustest.eastus2.cloudapp.azure.com <span class="hljs-comment"># the FQDN</span>
    secretName: tls-secret
  rules:
    - host: milvustest.eastus2.cloudapp.azure.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-release-milvus
                port:
                  number: 19530
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
    </button></h2><pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> certificate 
NAME         READY   SECRET       AGE
tls-secret   True    tls-secret   <span class="hljs-number">8</span>m7s
kubectl <span class="hljs-keyword">get</span> ingress
NAME                CLASS   HOSTS                                   ADDRESS        PORTS     AGE
my-release-milvus   nginx   milvustest.eastus2.cloudapp.azure.com   EXTERNAL-IP   <span class="hljs-number">80</span>, <span class="hljs-number">443</span>   <span class="hljs-number">8</span>m15s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Hello Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus를</a> 참조하여 URL 인수를 변경한 후 코드를 실행하세요.</p>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">connect</span>(<span class="hljs-string">&quot;default&quot;</span>,uri=<span class="hljs-string">&quot;https://milvustest.eastus2.cloudapp.azure.com:443&quot;</span>) 
<button class="copy-code-btn"></button></code></pre>
