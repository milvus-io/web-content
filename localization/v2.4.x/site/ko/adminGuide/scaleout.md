---
id: scaleout.md
related_key: scale Milvus cluster
summary: Milvus 클러스터에서 수동 또는 자동으로 스케일아웃 및 스케일업하는 방법을 알아보세요.
title: Milvus 클러스터 확장
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Milvus 클러스터 확장<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 구성 요소의 수평적 확장을 지원합니다. 즉, 필요에 따라 각 유형의 워커 노드 수를 늘리거나 줄일 수 있습니다.</p>
<p>이 항목에서는 Milvus 클러스터에서 스케일 아웃 및 스케일링하는 방법에 대해 설명합니다. 확장하기 전에 이미 <a href="/docs/ko/v2.4.x/install_cluster-helm.md">Milvus 클러스터를 설치했다고</a> 가정합니다. 또한 시작하기 전에 <a href="/docs/ko/v2.4.x/architecture_overview.md">Milvus 아키텍처를</a> 숙지하는 것이 좋습니다.</p>
<p>이 튜토리얼에서는 3개의 쿼리 노드 스케일아웃을 예로 들어 설명합니다. 다른 유형의 노드를 스케일아웃하려면 명령줄에서 <code translate="no">queryNode</code> 를 해당 노드 유형으로 바꾸세요.</p>
<div class="alert note">
<p>밀버스 오퍼레이터로 클러스터를 확장하는 방법에 대한 자세한 내용은 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">밀버스 오퍼레이터로 클러스터 확장하기를</a> 참조하세요.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">수평 확장이란 무엇인가요?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>수평적 스케일링에는 스케일 아웃과 스케일 인이 포함됩니다.</p>
<h3 id="Scaling-out" class="common-anchor-header">스케일 아웃</h3><p>스케일 아웃은 클러스터의 노드 수를 늘리는 것을 말합니다. 스케일업과 달리 스케일아웃은 클러스터의 한 노드에 더 많은 리소스를 할당할 필요가 없습니다. 대신, 스케일 아웃은 노드를 더 추가하여 클러스터를 수평적으로 확장합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>스케일아웃</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>스케일업</span> </span></p>
<p><a href="/docs/ko/v2.4.x/architecture_overview.md">Milvus 아키텍처에</a> 따르면 상태 비저장 워커 노드에는 쿼리 노드, 데이터 노드, 인덱스 노드 및 프록시가 포함됩니다. 따라서 이러한 유형의 노드를 비즈니스 요구와 애플리케이션 시나리오에 맞게 스케일아웃할 수 있습니다. Milvus 클러스터는 수동 또는 자동으로 스케일아웃할 수 있습니다.</p>
<p>일반적으로 Milvus 클러스터가 과도하게 사용되는 경우 생성한 클러스터를 스케일아웃해야 합니다. 다음은 Milvus 클러스터를 스케일아웃해야 할 수 있는 몇 가지 일반적인 상황입니다:</p>
<ul>
<li>일정 기간 동안 CPU 및 메모리 사용률이 높은 경우.</li>
<li>쿼리 처리량이 높아지는 경우.</li>
<li>더 빠른 인덱싱 속도가 필요한 경우.</li>
<li>대량의 대용량 데이터 세트를 처리해야 합니다.</li>
<li>Milvus 서비스의 고가용성을 보장해야 합니다.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">스케일링 인</h3><p>스케일 인은 클러스터의 노드 수를 줄이는 것을 말합니다. 일반적으로 생성한 Milvus 클러스터의 활용도가 낮은 경우 스케일 인을 해야 합니다. 다음은 Milvus 클러스터에서 확장해야 하는 몇 가지 일반적인 상황입니다:</p>
<ul>
<li>일정 기간 동안 CPU 및 메모리 사용률이 낮습니다.</li>
<li>쿼리 처리량이 낮아집니다.</li>
<li>인덱싱에 더 빠른 속도가 필요하지 않은 경우.</li>
<li>처리할 데이터 세트의 크기가 작습니다.</li>
</ul>
<div class="alert note">
작업자 노드 수를 급격하게 줄이는 것은 권장하지 않습니다. 예를 들어 클러스터에 5개의 데이터 노드가 있는 경우, 서비스 가용성을 보장하기 위해 한 번에 하나의 데이터 노드를 줄이는 것이 좋습니다. 첫 번째 스케일 인 시도 후 서비스를 사용할 수 있게 되면 계속해서 데이터 노드 수를 더 줄일 수 있습니다.</div>
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
    </button></h2><p><code translate="no">kubectl get pods</code> 을 실행하여 생성한 Milvus 클러스터의 구성 요소 목록과 해당 구성 요소의 작동 상태를 확인합니다.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvus는 워커 노드 추가만 지원하며 코디네이터 구성 요소 추가는 지원하지 않습니다.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Milvus 클러스터 확장하기<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 클러스터를 수동 또는 자동으로 확장할 수 있습니다. 자동 확장이 활성화된 경우, CPU 및 메모리 리소스 사용량이 설정한 값에 도달하면 Milvus 클러스터가 자동으로 축소 또는 확장됩니다.</p>
<p>현재 Milvus 2.1.0은 수동으로 스케일 인 및 스케일 아웃만 지원합니다.</p>
<h4 id="Scaling-out" class="common-anchor-header">스케일 아웃</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> 을 실행하여 쿼리 노드를 수동으로 스케일 아웃합니다.</p>
<p>성공하면 다음 예시와 같이 쿼리 노드에 실행 중인 3개의 파드가 추가됩니다.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">스케일 인</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> 을 실행하여 쿼리 노드를 스케일 인합니다.</p>
<p>성공하면 다음 예제와 같이 쿼리 노드에서 실행 중인 3개의 파드가 1개로 줄어듭니다.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
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
    </button></h2><ul>
<li><p>Milvus 서비스를 모니터링하고 알림을 생성하는 방법을 배우려면 다음과 같이 하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/monitor.md">Kubernetes의 Prometheus Operator로 Milvus 모니터링</a> 배우기</li>
</ul></li>
<li><p>클라우드에 클러스터를 배포할 준비가 되셨다면:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Terraform을 사용하여 Amazon EKS에 Milvus를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.4.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.4.x/azure.md">Kubernetes를 사용하여 Microsoft Azure에 Milvus를 배포하는</a> 방법 알아보기</li>
</ul></li>
<li><p>리소스를 할당하는 방법에 대한 지침을 찾고 계신다면 이 문서를 참조하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/allocate.md#standalone">Kubernetes에서 리소스 할당하기</a></li>
</ul></li>
</ul>
