---
id: meta_storage_operator.md
title: Milvus 오퍼레이터로 메타 스토리지 구성하기
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operator로 메타 스토리지를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus 오퍼레이터로 메타 스토리지 구성하기<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 메타데이터 저장을 위해 etcd를 사용합니다. 이 항목에서는 Milvus 오퍼레이터로 Milvus를 설치할 때 메타 스토리지 종속성을 구성하는 방법을 소개합니다. 자세한 내용은 Milvus <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">오퍼레이터</a> 리파지토리에서 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Milvus 오퍼레이터로 메타 스토리지 구성하기를</a> 참조하세요.</p>
<p>이 항목에서는 Milvus Operator를 배포했다고 가정합니다.</p>
<div class="alert note">자세한 내용은 <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operator 배포하기를</a> 참조하세요. </div>
<p>밀버스 오퍼레이터를 사용하여 밀버스 클러스터를 시작하려면 구성 파일을 지정해야 합니다.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>타사 종속성을 구성하려면 <code translate="no">milvus_cluster_default.yaml</code> 에서 코드 템플릿을 편집하기만 하면 됩니다. 다음 섹션에서는 각각 개체 스토리지, etcd 및 Pulsar를 구성하는 방법을 소개합니다.</p>
<h2 id="Configure-etcd" class="common-anchor-header">etcd 구성하기<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">spec.dependencies.etcd</code> 아래에 필수 필드를 추가하여 etcd를 구성합니다.</p>
<p><code translate="no">etcd</code> <code translate="no">external</code> 및 <code translate="no">inCluster</code> 을 지원합니다.</p>
<p>외부 etcd 서비스를 구성하는 데 사용되는 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">external</code>: <code translate="no">true</code> 값은 Milvus가 외부 etcd 서비스를 사용함을 나타냅니다.</li>
<li><code translate="no">endpoints</code>: etcd의 엔드포인트입니다.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">외부 etcd</h3><h4 id="Example" class="common-anchor-header">예제</h4><p>다음은 외부 etcd 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    etcd: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">내부 etcd</h3><p><code translate="no">inCluster</code> 는 Milvus 클러스터가 시작될 때 클러스터에서 자동으로 etcd 서비스가 시작됨을 나타냅니다.</p>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음은 내부 etcd 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    etcd:
      inCluster:
        values:
          replicaCount: 5
          resources:
            limits: 
              cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
  components: {}
  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">앞의 예에서는 복제본 수를 <code translate="no">5</code> 로 지정하고 etcd의 컴퓨팅 리소스를 제한합니다.</div>
<div class="alert note"><a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml에서</a> 내부 etcd 서비스를 구성하기 위한 전체 구성 항목을 찾습니다. 앞의 예와 같이 <code translate="no">etcd.inCluster.values</code> 아래에 필요에 따라 구성 항목을 추가합니다.</div>
<p>구성 파일의 이름이 <code translate="no">milvuscluster.yaml</code> 이라고 가정하고 다음 명령을 실행하여 구성을 적용합니다.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Milvus Operator로 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/object_storage_operator.md">Milvus 오퍼레이터로 객체 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/message_storage_operator.md">Milvus 오퍼레이터로 메시지 저장소 구성하기</a></li>
</ul>
