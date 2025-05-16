---
id: openshift.md
title: OpenShift에 Milvus 클러스터 배포하기
related_key: cluster
summary: OpenShift에서 Milvus 클러스터를 배포하는 방법을 알아보세요.
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">OpenShift에 Milvus 클러스터 배포하기<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 OpenShift에 Milvus를 배포하는 방법에 대한 단계별 가이드를 제공합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>배포 프로세스를 시작하기 전에 다음 사항을 확인하세요:</p>
<ul>
<li>실행 중인 OpenShift 클러스터.</li>
<li>충분한 권한(<code translate="no">cluster-admin</code> 역할 또는 이와 동등한 권한)을 가진 OpenShift 클러스터 액세스 권한.</li>
<li>OpenShift 컨테이너 플랫폼 웹 콘솔에 액세스.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">1단계: Cert Manager 설치<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator의 TLS 인증서를 관리하려면 Cert Manager가 필요합니다.</p>
<ol>
<li><p>사용 중인 OpenShift 버전에 적합한 Cert Manager 버전을 찾습니다: <a href="https://cert-manager.io/docs/releases/">Cert Manager 릴리스</a>.</p></li>
<li><p>공식 가이드에 따라 Cert Manager를 설치합니다: <a href="https://cert-manager.io/docs/installation/">Cert Manager 설치</a>.</p></li>
<li><p>Cert Manager가 작동하는지 확인합니다:</p>
<ol>
<li><p>OpenShift 콘솔에서 <strong>워크로드</strong> &gt; <strong>파드로</strong> 이동합니다. 프로젝트 <strong>cert-manager를</strong> 선택합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>모든 파드가 준비되었는지 확인합니다. 예를 들어, 아래 이미지는 파드가 아직 시작 중임을 나타냅니다. 모든 파드가 준비될 때까지 기다립니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>cert-manager-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">2단계: Milvus 운영자를 위한 자체 서명 인증서 발급하기<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">kubeadmin</code> 또는 이와 동등한 권한으로 로그인했는지 확인합니다.</p>
<ol>
<li><p>다음 매니페스트 파일 <code translate="no">milvus-operator-certificate.yaml</code> 을 만듭니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: milvus-operator-serving-cert
  namespace: milvus-operator
spec:
  dnsNames:
  - milvus-operator-webhook-service.milvus-operator.svc
  - milvus-operator-webhook-service.milvus-operator.svc.cluster.local
  issuerRef:
    kind: Issuer
    name: milvus-operator-selfsigned-issuer
  secretName: milvus-operator-webhook-cert
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: milvus-operator-selfsigned-issuer
  namespace: milvus-operator
spec:
  selfSigned: {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>파일을 적용합니다:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-<span class="hljs-keyword">operator</span>-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">3단계: Milvus 오퍼레이터 설치<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 밀버스 오퍼레이터 설치를 시작할 수 있습니다. 구성 프로세스를 간소화하기 위해 헬름을 사용하여 Milvus Operator를 설치하는 것이 좋습니다.</p>
<ol>
<li><p>밀버스 오퍼레이터 헬름 리포지토리를 추가합니다:</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>밀버스 오퍼레이터를 설치합니다:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">4단계: Milvus 배포<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 설명서 사이트의 나머지 가이드를 따르세요: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Milvus 배포하기</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">다음 단계<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
    </button></h2><p>다른 클라우드에 Milvus를 배포하는 방법을 알아보려면 다음과 같이 하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Kubernetes를 사용하여 AWS에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">Kubernetes를 사용하여 Azure에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">쿠버네티스를 사용하여 GCP에 Milvus 클러스터 배포하기</a></li>
</ul>
