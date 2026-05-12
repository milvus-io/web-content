---
id: gcs.md
title: 워크로드 아이덴티티로 GCS 액세스 구성하기
related_key: 'gcs, storage, workload identity, iam'
summary: Workload Identity로 gcs를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-GCS-Access-by-Workload-Identity" class="common-anchor-header">워크로드 아이덴티티로 GCS 액세스 구성하기<button data-href="#Configure-GCS-Access-by-Workload-Identity" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 헬름과 함께 Milvus를 설치할 때 워크로드 아이덴티티로 gcs 액세스를 구성하는 방법을 소개합니다. 자세한 내용은 <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">워크로드 아이덴티티를</a> 참조하세요.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>클러스터와 노드 풀에서 구글 클라우드 CLI 또는 구글 클라우드 콘솔을 사용하여 워크로드 아이덴티티를 활성화하세요. 노드 풀에서 Workload Identity를 사용하도록 설정하려면 먼저 클러스터 수준에서 Workload Identity를 사용하도록 설정해야 합니다.</p>
<h2 id="Configure-applications-to-use-Workload-Identity" class="common-anchor-header">Workload Identity를 사용하도록 애플리케이션 구성<button data-href="#Configure-applications-to-use-Workload-Identity" class="anchor-icon" translate="no">
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
<li>버킷을 생성합니다.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create gs://milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>애플리케이션이 사용할 Kubernetes 서비스 계정을 생성합니다.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl create serviceaccount milvus-gcs-access-sa
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>애플리케이션에 대한 IAM 서비스 계정을 생성하거나 기존 IAM 서비스 계정을 대신 사용하세요. 조직의 모든 프로젝트에서 모든 IAM 서비스 계정을 사용할 수 있습니다.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts create milvus-gcs-access-sa \
    --project=milvus-testing-nonprod
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>IAM 서비스 계정에 필요한 역할이 있는지 확인하세요. 다음 명령을 사용하여 추가 역할을 부여할 수 있습니다:</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud projects add-iam-policy-binding milvus-testing-nonprod \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com&quot;</span> \
    --role <span class="hljs-string">&quot;roles/storage.admin&quot;</span> \
    --condition=<span class="hljs-string">&#x27;title=milvus-testing-nonprod,expression=resource.service == &quot;storage.googleapis.com&quot; &amp;&amp; resource.name.startsWith(&quot;projects/_/buckets/milvus-testing-nonprod&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>두 서비스 계정 사이에 IAM 정책 바인딩을 추가하여 Kubernetes 서비스 계정이 IAM 서비스 계정으로 가장하도록 허용한다. 이 바인딩을 통해 Kubernetes 서비스 계정이 IAM 서비스 계정으로 작동할 수 있습니다.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts add-iam-policy-binding milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com \
    --role <span class="hljs-string">&quot;roles/iam.workloadIdentityUser&quot;</span> \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-testing-nonprod.svc.id.goog[default/milvus-gcs-access-sa]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Kubernetes 서비스 계정에 IAM 서비스 계정의 이메일 주소로 주석을 달기.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl annotate serviceaccount milvus-gcs-access-sa \
    --namespace default \
    iam.gke.io/gcp-service-account=milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-Workload-Identity-setup" class="common-anchor-header">워크로드 아이덴티티 설정 확인<button data-href="#Verify-the-Workload-Identity-setup" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">워크로드 아이덴티티를</a> 참조하세요. 파드 내에서 다음 명령어를 실행한다:</p>
<pre><code translate="no" class="language-bash">curl -H <span class="hljs-string">&quot;Metadata-Flavor: Google&quot;</span> http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/email
<button class="copy-code-btn"></button></code></pre>
<p>결과가 <code translate="no">milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com</code> 이면 정상입니다.</p>
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
    </button></h2><pre><code translate="no" class="language-bash">helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>values.yaml 내용을 확인합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">cluster:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">service:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">LoadBalancer</span>

<span class="hljs-attr">minio:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">serviceAccount:</span>
    <span class="hljs-attr">create:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-gcs-access-sa</span>

<span class="hljs-attr">externalS3:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">host:</span> <span class="hljs-string">storage.googleapis.com</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">443</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">milvus/my-release</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-testing-nonprod</span>
    <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">gcp</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
