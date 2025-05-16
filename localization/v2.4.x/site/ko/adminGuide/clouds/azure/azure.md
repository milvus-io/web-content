---
id: azure.md
title: Kubernetes를 사용하여 Microsoft Azure에 Milvus 배포하기
related_key: cluster
summary: Azure에 Milvus 클러스터를 배포하는 방법을 알아보세요.
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">AKS를 사용하여 Azure에 Milvus 배포하기<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) 및 <a href="https://portal.azure.com">Azure 포털을</a> 사용하여 클러스터를 프로비저닝하고 생성하는 방법에 대해 설명합니다.</p>
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
    </button></h2><p>Azure 프로젝트가 올바르게 설정되어 있고 사용하려는 리소스에 액세스할 수 있는지 확인합니다. 액세스 권한이 확실하지 않은 경우 관리자에게 문의하세요.</p>
<h2 id="Software-requirements" class="common-anchor-header">소프트웨어 요구 사항<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">헬름</a></li>
</ul>
<p>또는 Azure CLI, kubectl 및 Helm이 사전 설치된 <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell을</a> 사용할 수 있습니다.</p>
<div class="alert note">Azure CLI를 설치한 후, 제대로 인증되었는지 확인한다. </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Kubernetes 클러스터 프로비저닝하기<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Azure 포털에 로그온합니다.</li>
<li>Azure 포털 메뉴 또는 <strong>홈</strong> 페이지에서 <strong>리소스 만들기를</strong> 선택합니다.</li>
<li><strong>컨테이너</strong> &gt; <strong>Kubernetes 서비스를</strong> 선택합니다.</li>
<li><strong>기본</strong> 페이지에서 다음 옵션을 구성합니다:</li>
</ol>
<ul>
<li><p><strong>프로젝트 세부 정보</strong>:</p>
<ul>
<li><p><strong>구독</strong>: 조직의 Azure 관리자에게 문의하여 어떤 구독을 사용해야 하는지 결정합니다.</p>
<ul>
<li><strong>리소스 그룹</strong>: 조직의 Azure 관리자에게 문의하여 사용해야 하는 리소스 그룹을 결정합니다.</li>
</ul></li>
</ul></li>
<li><p><strong>클러스터 세부 정보</strong>:</p>
<ul>
<li><p><strong>Kubernetes 클러스터 이름</strong>: 클러스터 이름을 입력합니다.</p></li>
<li><p><strong>지역</strong>: 리전: 리전을 선택합니다.</p></li>
<li><p><strong>가용 영역</strong>: 필요에 따라 <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">가용 영역을</a> 선택합니다. 프로덕션 클러스터의 경우, 가용 영역을 여러 개 선택하는 것이 좋습니다.</p></li>
</ul></li>
<li><p><strong>기본 노드 풀</strong>:</p>
<ul>
<li><p><strong>노드 크기</strong>: 최소 16GB의 RAM이 있는 VM을 선택하는 것이 좋지만 필요에 따라 가상 머신 크기를 선택할 수 있습니다.</p></li>
<li><p><strong>확장 방법</strong>: 확장 방법을 선택합니다.</p></li>
<li><p><strong>노드 수 범위</strong>: 노드 수에 대한 범위를 선택합니다.</p></li>
</ul></li>
<li><p><strong>노드 풀</strong>:</p>
<ul>
<li><p><strong>가상 노드를 사용</strong> 설정합니다: 가상 노드를 사용하려면 확인란을 선택합니다.</p></li>
<li><p><strong>가상 머신 스케일 세트 사용</strong>: <code translate="no">enabled</code> 을 선택하는 것이 좋습니다.</p></li>
</ul></li>
<li><p><strong>네트워킹</strong>:</p>
<ul>
<li><p><strong>네트워크 구성</strong>: <code translate="no">Kubenet</code> 을 선택하는 것이 좋습니다.</p></li>
<li><p><strong>DNS 이름 접두사</strong>: DNS 이름 접두사를 입력합니다.</p></li>
<li><p><strong>트래픽 라우팅</strong>:</p>
<ul>
<li><p><strong>로드 밸런서</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>HTTP 애플리케이션 라우팅</strong>: 필요하지 않습니다.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>옵션을 구성한 후 유효성 검사가 완료되면 <strong>검토 + 만들기를</strong> 클릭한 다음 <strong>만들기를</strong> 클릭합니다. 클러스터를 만드는 데 몇 분 정도 걸립니다.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">클러스터에 연결하기<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Kubernetes 서비스에서 생성한 클러스터로 이동하여 클릭합니다.</li>
<li>왼쪽 탐색 창에서 <code translate="no">Overview</code> 을 클릭합니다.</li>
<li>표시되는 <strong>개요</strong> 페이지에서 <strong>연결을</strong> 클릭하여 리소스 그룹 및 구독을 확인합니다.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">구독 및 자격 증명 설정<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">Azure Cloud Shell을 사용하여 다음 절차를 수행할 수 있습니다.</div>
<ol>
<li>다음 명령을 실행하여 구독을 설정합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>다음 명령을 실행하여 자격 증명을 다운로드하고 이를 사용하도록 Kubernetes CLI를 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
다음 절차에 동일한 셸을 사용하세요. 다른 셸로 전환하는 경우, 앞의 명령을 다시 실행하세요.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">외부 오브젝트 스토리지로 Azure Blob 스토리지 사용<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage는 Azure의 AWS Simple Storage Service(S3) 버전입니다.</p>
<ul>
<li>스토리지 계정 및 컨테이너 만들기</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>비밀 키 가져오기, 첫 번째 값 사용</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>values.yaml 추가</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
  <span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: <span class="hljs-literal">false</span>

externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
  cloudProvider: azure
  useSSL: <span class="hljs-literal">true</span>
  accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
  secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span> 
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
    </button></h2><p>이제 Kubernetes 클러스터가 준비되었습니다. 지금 바로 Milvus를 배포해 보겠습니다.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>앞의 명령에서 Milvus Helm 차트의 리포지토리를 로컬에 추가하고 최신 차트를 가져오도록 리포지토리를 업데이트했습니다. 그런 다음 Milvus 인스턴스를 설치하고 이름을 <strong>my-release로</strong> 지정합니다.</p>
<p>구성 <code translate="no">service.type</code> 값에 주목하세요. 이는 Layer-4 로드 밸런서를 통해 Milvus 인스턴스를 노출하고 싶다는 것을 나타냅니다.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">배포 확인<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 파드가 실행되면 다음 명령을 실행하여 외부 IP 주소를 가져옵니다.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
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
    </button></h2><p><a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus를</a> 참조하여 호스트 값을 외부 IP 주소로 변경한 다음 코드를 실행하세요.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/v2.4.x/eks.md">Kubernetes로 AWS에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터 배포하기</a></li>
</ul>
