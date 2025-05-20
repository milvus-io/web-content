---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: Milvus 운영자를 사용하여 Kubernetes에 Milvus 클러스터를 설치하는 방법 알아보기
title: 밀버스 운영자로 밀버스 클러스터 설치하기
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">밀버스 오퍼레이터로 쿠버네티스에서 밀버스 실행하기<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 <a href="https://github.com/zilliztech/milvus-operator">밀버스 오퍼레이터를</a> 사용하여 쿠버네티스에서 밀버스 인스턴스를 시작하는 방법을 설명한다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator는 전체 Milvus 서비스 스택을 배포하고 관리하여 Kubernetes(K8s) 클러스터를 대상으로 하는 데 도움이 되는 솔루션입니다. 이 스택에는 모든 Milvus 구성 요소와 etcd, Pulsar, MinIO와 같은 관련 종속 요소가 포함됩니다.</p>
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
    </button></h2><ul>
<li><p><a href="/docs/ko/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">K8s 클러스터를 생성합니다</a>.</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass를</a> 설치합니다. 설치된 StorageClass는 아래와 같이 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>설치 전 <a href="/docs/ko/v2.4.x/prerequisite-helm.md">하드웨어 및 소프트웨어 요구 사항을</a> 확인합니다.</p></li>
<li><p>Milvus를 설치하기 전에 <a href="https://milvus.io/tools/sizing">Milvus 사이징 툴을</a> 사용하여 데이터 크기에 따라 하드웨어 요구 사항을 추정하는 것이 좋습니다. 이렇게 하면 Milvus 설치를 위한 최적의 성능과 리소스 할당을 보장하는 데 도움이 됩니다.</p></li>
</ul>
<div class="alert note">
<p>이미지를 가져오는 데 문제가 발생하면 <a href="mailto:community@zilliz.com">community@zilliz.com</a> 으로 문의하여 문제에 대한 자세한 내용을 알려주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Milvus 오퍼레이터 설치<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 오퍼레이터는 <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">쿠버네티스 커스텀 리</a>소스 위에 밀버스 클러스터 커스텀 리소스를 정의합니다. 사용자 정의 리소스가 정의되면, 선언적 방식으로 K8s API를 사용하고 Milvus 배포 스택을 관리하여 확장성과 고가용성을 보장할 수 있습니다.</p>
<p>다음 중 한 가지 방법으로 Milvus Operator를 설치할 수 있습니다:</p>
<ul>
<li><a href="#Install-with-Helm">헬름 사용</a></li>
<li><a href="#Install-with-kubectl">kubectl 사용</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">헬름으로 설치</h3><p>다음 명령어를 실행하여 헬름으로 Milvus Operator를 설치합니다.</p>
<pre><code translate="no" class="language-shell">$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.1.9/milvus-operator-1.1.9.tgz
<button class="copy-code-btn"></button></code></pre>
<p>설치 프로세스가 끝나면 다음과 유사한 출력을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  <span class="hljs-number">7</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">40</span> <span class="hljs-number">2022</span>
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: <span class="hljs-number">1</span>
TEST SUITE: <span class="hljs-literal">None</span>
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check <span class="hljs-keyword">if</span> its successfully installed
If Operator <span class="hljs-keyword">not</span> started successfully, check the checke<span class="hljs-string">r&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
</span><button class="copy-code-btn"></button></code></pre>
<h3 id="Install-with-kubectl" class="common-anchor-header">kubectl로 설치</h3><p>다음 명령어를 실행하여 밀버스 오퍼레이터를 설치한다. <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>설치 프로세스가 끝나면 다음과 유사한 출력이 표시됩니다.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>다음과 같이 Milvus Operator 파드가 실행 중인지 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods -n milvus-<span class="hljs-keyword">operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Milvus 클러스터 배포</h3><p>Milvus Operator 파드가 실행 중이면 다음과 같이 Milvus 클러스터를 배포할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 명령은 기본 구성을 사용하여 별도의 파드에 구성 요소 및 종속 요소와 함께 Milvus 클러스터를 배포합니다. 이러한 설정을 사용자 정의하려면 <a href="https://milvus.io/tools/sizing">Milvus 크기</a> 조정 <a href="https://milvus.io/tools/sizing">도구를</a> 사용하여 실제 데이터 크기에 따라 구성을 조정한 다음 해당 YAML 파일을 다운로드하는 것이 좋습니다. 구성 매개변수에 대해 자세히 알아보려면 <a href="https://milvus.io/docs/system_configuration.md">Milvus 시스템 구성 체크리스트를</a> 참조하세요.</p>
<div class="alert note">
<ul>
<li>릴리스 이름에는 문자, 숫자 및 대시만 포함해야 합니다. 릴리스 이름에는 점을 사용할 수 없습니다.</li>
<li>모든 구성 요소가 단일 포드 내에 포함된 독립 실행형 모드로 Milvus 인스턴스를 배포할 수도 있습니다. 이렇게 하려면 위의 명령에서 구성 파일 URL을 다음과 같이 변경합니다. <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Milvus 클러스터 상태 확인</h4><p>다음 명령어를 실행하여 Milvus 클러스터 상태를 확인합니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 클러스터가 준비되면 위 명령의 출력은 다음과 비슷해야 합니다. <code translate="no">status.status</code> 필드가 <code translate="no">Unhealthy</code> 으로 유지되면 Milvus 클러스터가 아직 생성 중입니다.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    reason: StorageReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    message: Pulsar <span class="hljs-keyword">is</span> ready
    reason: PulsarReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    message: Etcd endpoints <span class="hljs-keyword">is</span> healthy
    reason: EtcdReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    message: All Milvus components are healthy
    reason: MilvusClusterHealthy
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:<span class="hljs-number">19530</span>
  status: Healthy
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 오퍼레이터는 etcd, Pulsar, MinIO와 같은 Milvus 종속 요소를 생성한 다음 프록시, 코디네이터, 노드와 같은 Milvus 구성 요소를 생성합니다.</p>
<p>Milvus 클러스터가 준비되면, Milvus 클러스터의 모든 파드의 상태는 다음과 비슷해야 합니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods

NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-milvus-datanode<span class="hljs-number">-5</span>c686bd65-wxtmf      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-indexnode<span class="hljs-number">-5b</span>9787b54-xclbx     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-querynode<span class="hljs-number">-5b</span>cb59f6-nhqqw      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-mixcoord-fdcccfc84<span class="hljs-number">-9964</span>g      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-toolset<span class="hljs-number">-0</span>                     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Milvus로 로컬 포트 포워딩</h3><p>다음 명령어를 실행하여 Milvus 클러스터가 서비스하는 포트를 가져옵니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>출력은 Milvus 인스턴스가 기본 포트 <strong>19530에서</strong> 서비스하고 있음을 보여줍니다.</p>
<div class="alert note">
<p>독립 실행형 모드로 Milvus를 배포한 경우, 파드 이름을 <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> 에서 <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> 으로 변경합니다.</p>
</div>
<p>그런 다음 다음 명령을 실행하여 로컬 포트를 Milvus가 서비스하는 포트로 전달합니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>선택적으로, 위의 명령에서 <code translate="no">27017:19530</code> 대신 <code translate="no">:19530</code> 을 사용하여 <code translate="no">kubectl</code> 이 로컬 포트를 할당하도록 하여 포트 충돌을 관리할 필요가 없도록 할 수 있다.</p>
<p>기본적으로 kubectl의 포트 포워딩은 <code translate="no">localhost</code> 에서만 수신 대기한다. 밀버스가 선택한 또는 모든 IP 주소에서 수신 대기하도록 하려면 <code translate="no">address</code> 플래그를 사용한다. 다음 명령은 호스트 머신의 모든 IP 주소에서 포트 포워딩을 수신 대기하도록 한다.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Milvus 제거<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 Milvus 클러스터를 제거합니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>기본 구성을 사용하여 Milvus 클러스터를 삭제하는 경우 etcd, Pulsar, MinIO와 같은 종속성은 삭제되지 않습니다. 따라서 다음에 동일한 Milvus 클러스터 인스턴스를 설치할 때 이러한 종속성이 다시 사용됩니다.</li>
<li>Milvus 클러스터와 함께 종속성 및 프라이빗 가상 클라우드(PVC)를 삭제하려면 <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">구성 파일을</a> 참조하세요.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Milvus 운영자 제거<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 오퍼레이터를 제거하는 방법에는 두 가지가 있다.</p>
<ul>
<li><a href="#Uninstall-with-Helm">헬름으로 제거</a></li>
<li><a href="#Uninstall-with-kubectl">kubectl로 제거</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">헬름으로 제거</h4><pre><code translate="no" class="language-shell">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">kubectl로 제거</h4><pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/v1.1.9/deploy/manifests/deployment.yaml</span>
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
    </button></h2><p>도커에 밀버스를 설치했다면, 이제 할 수 있다:</p>
<ul>
<li><p><a href="/docs/ko/v2.4.x/quickstart.md">Hello Milvus를</a> 확인하여 Milvus가 무엇을 할 수 있는지 확인합니다.</p></li>
<li><p>Milvus의 기본 작동에 대해 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/insert-update-delete.md">삽입, 위로 올리기 및 삭제</a></li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-helm.md">헬름 차트를 사용하여 Milvus 업그레이드</a>.</p></li>
<li><p><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장하기</a>.</p></li>
<li><p>Milvu 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">마이크로소프트 애저</a></li>
</ul></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://milvus.io/docs/attu.md">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/monitor.md">Prometheus로 Milvus 모니터링</a>.</p></li>
</ul>
