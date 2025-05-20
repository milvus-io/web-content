---
id: gcp_layer7.md
title: GCP에서 Milvus용 레이어 7 로드밸런서 설정하기
related_key: cluster
summary: GCP의 Layer-7 로드 밸런서 뒤에 Milvus 클러스터를 배포하는 방법을 알아보세요.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">GCP에서 Milvus용 레이어 7 로드 밸런서 설정하기<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>레이어 4 로드 밸런서와 비교할 때, 레이어 7 로드 밸런서는 스마트 로드 밸런싱 및 캐싱 기능을 제공하며 클라우드 네이티브 서비스에 적합한 선택입니다.</p>
<p>이 가이드에서는 이미 레이어 4 로드 밸런서 뒤에서 실행 중인 Milvus 클러스터를 위한 레이어 7 로드 밸런서 설정 방법을 안내합니다.</p>
<h3 id="Before-your-start" class="common-anchor-header">시작하기 전에</h3><ul>
<li><p>GCP 계정에 프로젝트가 이미 존재합니다.</p>
<p>프로젝트를 생성하려면 <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">프로젝트 생성 및 관리하기를</a> 참조하세요. 이 가이드에서 사용된 프로젝트 이름은 <strong>milvus-testing-nonprod입니다</strong>.</p></li>
<li><p>로컬로 <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> 및 <a href="https://helm.sh/docs/intro/install/">Helm을</a> 설치했거나 대신 브라우저 기반 <a href="https://cloud.google.com/shell">Cloud Shell을</a> 사용하기로 결정했습니다.</p></li>
<li><p>GCP 계정 자격 증명으로 <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">gcloud CLI를 초기화했습니다</a>.</p></li>
<li><p><a href="/docs/ko/v2.4.x/gcp.md">GCP의 Layer-4 로드 밸런서 뒤에 Milvus 클러스터를 배포했습니다</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Milvus 구성 조정</h3><p>이 가이드에서는 <a href="/docs/ko/v2.4.x/gcp.md">GCP의 레이어 4 로드 밸런서 뒤에 Milvus 클러스터를</a> 이미 <a href="/docs/ko/v2.4.x/gcp.md">배포했다고</a> 가정합니다.</p>
<p>이 Milvus 클러스터에 대해 Layer-7 로드 밸런서를 설정하기 전에 다음 명령을 실행하여 Layer-4 로드 밸런서를 제거하세요.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Layer-7 로드 밸런서의 백엔드 서비스인 Milvus는 로드 밸런서의 HTTP/2 요청을 이해할 수 있도록 <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">특정 암호화 요구 사항을</a> 충족해야 합니다. 따라서 다음과 같이 Milvus 클러스터에서 TLS를 활성화해야 합니다.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>tls.yaml 콘텐츠:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">상태 확인 엔드포인트 설정</h3><p>서비스 가용성을 보장하기 위해 GCP에서 레이어 7 부하 분산은 백엔드 서비스의 상태 상태를 조사해야 합니다. 따라서 상태 확인 엔드포인트를 마무리하기 위해 백엔드 컨피그를 설정하고 어노테이션을 통해 백엔드 컨피그를 Milvus 서비스와 연결해야 합니다.</p>
<p>다음 스니펫은 BackendConfig 설정입니다. 나중에 사용할 수 있도록 <code translate="no">backendconfig.yaml</code> 으로 저장하세요.</p>
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
<p>그런 다음 다음 명령을 실행하여 상태 확인 엔드포인트를 생성합니다.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>마지막으로 Milvus 서비스의 어노테이션을 업데이트하여 나중에 생성할 Layer-7 로드밸런서에 방금 생성한 엔드포인트를 사용하여 상태 검사를 수행하도록 요청합니다.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>첫 번째 어노테이션에 관해서는,</p>
<p>Milvus는 HTTP/2를 기반으로 하는 gRPC를 기본으로 합니다. 따라서 HTTP/2를 Layer-7 로드밸런서와 Milvus 간의 통신 프로토콜로 사용할 수 있습니다.</p></li>
<li><p>두 번째 주석에 관해서는,</p>
<p>Milvus는 gRPC와 HTTP/1을 통한 상태 확인 엔드포인트만 제공합니다. 상태 확인 엔드포인트를 래핑하고 이를 Milvus 서비스와 연결하여 Layer-7 로드밸런서가 이 엔드포인트에서 Milvus의 상태 상태를 조사하도록 백엔드 컨피그(BackendConfig)를 설정해야 합니다.</p></li>
<li><p>세 번째 어노테이션에 대해 설명합니다,</p>
<p>인그레스가 생성된 후 네트워크 엔드포인트 그룹(NEG)을 생성하도록 요청합니다. NEG를 GKE 인그레스와 함께 사용하면 인그레스 컨트롤러가 로드 밸런서의 모든 측면을 쉽게 생성할 수 있습니다. 여기에는 가상 IP 주소, 포워딩 규칙, 상태 확인, 방화벽 규칙 등의 생성이 포함됩니다. 자세한 내용은 <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloud 문서를</a> 참조하세요.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">TLS 인증서 준비</h3><p>TLS를 사용하려면 인증서가 필요합니다. <strong>인증서를 만드는 방법에는 자체 관리형과 Google 관리형 두 가지가 있습니다.</strong></p>
<p>이 가이드에서는 Milvus 서비스에 액세스하기 위한 도메인 이름으로 <strong>my-release.milvus.io를</strong> 사용합니다.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">자체 관리 인증서 만들기</h4><p>다음 명령을 실행하여 인증서를 만듭니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 나중에 사용할 수 있도록 이 파일로 GKE 클러스터에 비밀을 만듭니다.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Google 관리 인증서 만들기</h4><p>다음 스니펫은 ManagedCertificate 설정입니다. 나중에 사용할 수 있도록 <code translate="no">managed-crt.yaml</code> 으로 저장하세요.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 GKE 클러스터에 설정을 적용하여 관리형 인증서를 만듭니다:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이 작업은 한동안 지속될 수 있습니다. 다음을 실행하여 진행 상황을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷해야 합니다:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p><strong>인증서 상태가</strong> <strong>활성으로</strong> 바뀌면 로드 밸런서를 설정할 준비가 된 것입니다.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">인그레스를 만들어 레이어 7 로드 밸런서를 생성하기</h3><p>다음 스니펫 중 하나를 사용하여 YAML 파일을 만듭니다.</p>
<ul>
<li><p>자체 관리 인증서 사용</p>
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
<li><p>Google 관리 인증서 사용</p>
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
<p>그런 다음 파일을 GKE 클러스터에 적용하여 인그레스를 생성할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이제 Google이 레이어 7 로드 밸런서를 설정할 때까지 기다립니다. 다음을 실행하여 진행 상황을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷해야 합니다:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p><strong>주소</strong> 필드에 IP 주소가 표시되면 레이어 7 로드 밸런서를 사용할 준비가 된 것입니다. 위의 출력에는 포트 80과 포트 443이 모두 표시됩니다. 항상 포트 443을 사용해야 한다는 점을 기억하세요.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Layer-7 로드 밸런서를 통한 연결 확인<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 PyMilvus를 사용하여 방금 만든 Layer-7 로드 밸런서 뒤에 있는 Milvus 서비스에 대한 연결을 확인합니다. 자세한 단계는 <a href="https://milvus.io/docs/v2.3.x/example_code.md">여기를 참조하세요</a>.</p>
<p>연결 매개변수는 <a href="#prepare-tls-certificates">TLS 인증서 준비에서</a> 인증서를 관리하는 방식에 따라 다릅니다.</p>
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
<li><strong>호스트</strong> 및 <strong>포트의</strong> IP 주소와 <strong>포트</strong> 번호는 <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">레이어 7 부하 분산 장치를 생성하려면 인그레스 생성의</a> 끝에 나열된 것과 일치해야 합니다.</li>
<li>도메인 이름을 호스트 IP 주소에 매핑하도록 DNS 레코드를 설정한 경우 <strong>호스트의</strong> IP 주소를 도메인 이름으로 바꾸고 <strong>server_name을</strong> 생략합니다.</li>
</ul>
</div>
