---
id: object_storage_operator.md
title: 밀버스 오퍼레이터로 오브젝트 스토리지 구성하기
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operator로 오브젝트 스토리지를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus 오퍼레이터로 오브젝트 스토리지 구성하기<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 인덱스 파일 및 바이너리 로그와 같은 대규모 파일을 보존하기 위해 MinIO 또는 S3를 오브젝트 스토리지로 사용합니다. 이 항목에서는 Milvus 오퍼레이터와 함께 Milvus를 설치할 때 오브젝트 스토리지 종속성을 구성하는 방법을 소개합니다. 자세한 내용은 Milvus <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Operator</a> 리포지토리에서 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Milvus Operator로 오브젝트 스토리지 구성하기를</a> 참조하세요.</p>
<p>이 항목에서는 Milvus Operator를 배포했다고 가정합니다.</p>
<div class="alert note">자세한 내용은 <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operator 배포하기를</a> 참조하세요. </div>
<p>밀버스 오퍼레이터를 사용하여 밀버스 클러스터를 시작하려면 구성 파일을 지정해야 합니다.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>타사 종속성을 구성하려면 <code translate="no">milvus_cluster_default.yaml</code> 에서 코드 템플릿을 편집하기만 하면 됩니다. 다음 섹션에서는 각각 개체 스토리지, etcd 및 Pulsar를 구성하는 방법을 소개합니다.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">오브젝트 스토리지 구성하기<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 클러스터는 인덱스 파일 및 바이너리 로그와 같은 대용량 파일을 유지하기 위해 MinIO 또는 S3를 오브젝트 스토리지로 사용합니다. 개체 스토리지를 구성하려면 <code translate="no">spec.dependencies.storage</code> 에서 필수 필드를 추가하고, 가능한 옵션은 <code translate="no">external</code> 과 <code translate="no">inCluster</code> 입니다.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">내부 오브젝트 스토리지</h3><p>기본적으로 Milvus Operator는 Milvus용 클러스터 내 MinIO를 배포합니다. 다음은 이 MinIO를 내부 오브젝트 스토리지로 사용하는 방법을 보여주는 구성 예시입니다.</p>
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
<p>위의 구성이 적용되면 클러스터 내 MinIO는 최대 100Mi의 메모리 제한으로 독립형 모드로 실행됩니다. 참고 사항</p>
<ul>
<li><p><code translate="no">deletionPolicy</code> 필드는 클러스터 내 MinIO의 삭제 정책을 지정합니다. 기본값은 <code translate="no">Delete</code> 이며 대체 옵션으로 <code translate="no">Retain</code> 이 있습니다.</p>
<ul>
<li><code translate="no">Delete</code> 는 Milvus 인스턴스를 중지할 때 클러스터 내 오브젝트 스토리지가 삭제됨을 나타냅니다.</li>
<li><code translate="no">Retain</code> 는 클러스터 내 오브젝트 스토리지가 나중에 Milvus 인스턴스를 시작할 때 종속성 서비스로 유지됨을 나타냅니다.</li>
</ul></li>
<li><p><code translate="no">pvcDeletion</code> 필드는 클러스터 내 MinIO가 삭제될 때 PVC(퍼시스턴트 볼륨 클레임)를 삭제할지 여부를 지정합니다.</p></li>
</ul>
<p><code translate="no">inCluster.values</code> 아래의 필드는 Milvus 헬름 차트에 있는 필드와 동일하며 <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">여기에서</a> 찾을 수 있습니다.</p>
<h3 id="External-object-storage" class="common-anchor-header">외부 오브젝트 스토리지</h3><p>템플릿 YAML 파일에서 <code translate="no">external</code> 을 사용하면 외부 오브젝트 스토리지 서비스를 사용함을 나타냅니다. 외부 오브젝트 저장소를 사용하려면 Milvus CRD의 <code translate="no">spec.dependencies.storage</code> 및 <code translate="no">spec.config.minio</code> 에서 필드를 올바르게 설정해야 합니다.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">외부 오브젝트 스토리지로 아마존 웹 서비스(AWS) S3 사용</h4><ul>
<li><p>AK/SK로 AWS S3 액세스 구성하기</p>
<p>S3 버킷은 일반적으로 액세스 키와 액세스 비밀 키 한 쌍으로 액세스할 수 있습니다. 다음과 같이 <code translate="no">Secret</code> 오브젝트를 생성하여 쿠버네티스에 저장할 수 있습니다:</p>
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
<p>그런 다음 AWS S3 버킷을 외부 오브젝트 스토리지로 구성할 수 있습니다:</p>
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
<li><p>역할로 AWS S3 액세스 구성하기</p>
<p>또는, 실제 AK/SK 대신 임시 자격 증명만 사용하도록 <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole을</a> 사용하여 Milvus가 AWS S3 버킷에 액세스하도록 할 수 있습니다.</p>
<p>이 방법을 선호하는 경우 AWS 콘솔에서 역할을 준비하고 일반적으로 <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code> 형식의 ARN을 가져와야 합니다.</p>
<p>그런 다음 다음과 같이 <code translate="no">ServiceAccount</code> 오브젝트를 생성하여 Kubernetes에 저장합니다:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>모든 설정이 완료되면 템플릿 YAML 파일에서 위의 <code translate="no">ServiceAccount</code> 을 참조하고 <code translate="no">spec.config.minio.useIAM</code> 을 <code translate="no">true</code> 으로 설정하여 AssumeRole을 활성화합니다.</p>
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
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">외부 오브젝트 스토리지로 구글 클라우드 스토리지(GCS) 사용</h4><p>AWS S3 오브젝트 스토리지만이 유일한 선택지는 아닙니다. Google Cloud와 같은 다른 퍼블릭 클라우드 제공업체의 오브젝트 스토리지 서비스를 사용할 수도 있습니다.</p>
<ul>
<li><p>AK/SK별 GCS 액세스 구성</p>
<p>구성은 대부분 AWS S3를 사용할 때와 비슷합니다. 여전히 <code translate="no">Secret</code> 오브젝트를 생성하여 자격 증명을 쿠버네티스에 저장해야 합니다.</p>
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
<p>그런 다음 다음과 같이 <code translate="no">endpoint</code> 을 <code translate="no">storage.googleapis.com:443</code> 으로 변경하고 <code translate="no">spec.config.minio.cloudProvider</code> 을 <code translate="no">gcp</code> 으로 설정하기만 하면 됩니다:</p>
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
<li><p>AssumeRole로 GCS 액세스 구성하기</p>
<p>AWS S3와 마찬가지로, GKE를 Kubernetes 클러스터로 사용하는 경우 임시 자격 <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">증명을</a> 사용하여 임시 자격 증명을 사용하여 GCS에 액세스할 수도 있습니다.</p>
<p><code translate="no">ServiceAccount</code> 의 어노테이션은 AWS EKS의 어노테이션과 다릅니다. 역할 ARN 대신 GCP 서비스 계정 이름을 지정해야 합니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 위의 <code translate="no">ServiceAccount</code> 을 사용하도록 Milvus 인스턴스를 구성하고 다음과 같이 <code translate="no">spec.config.minio.useIAM</code> 을 <code translate="no">true</code> 으로 설정하여 AssumeRole을 활성화할 수 있습니다:</p>
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
    </button></h2><p>Milvus 오퍼레이터로 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/meta_storage_operator.md">밀버스 오퍼레이터로 메타 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/message_storage_operator.md">밀버스 오퍼레이터로 메시지 저장소 구성하기</a></li>
</ul>
