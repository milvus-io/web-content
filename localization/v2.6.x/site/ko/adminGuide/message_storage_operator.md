---
id: message_storage_operator.md
title: Milvus Operator를 사용하여 메시지 스토리지 구성하기
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operator를 사용하여 메시지 저장소를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus Operator를 사용하여 메시지 스토리지 구성하기<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 최근 변경 내역의 로그 관리, 스트림 로그 출력 및 로그 구독 제공을 위해 RocksMQ, Pulsar 또는 Kafka를 사용합니다. 이 항목에서는 Milvus Operator를 사용하여 Milvus를 설치할 때 메시지 저장소 종속성을 구성하는 방법을 설명합니다. 자세한 내용은 Milvus Operator 저장소의 " <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Milvus Operator를 사용하여 메시지 저장소 구성</a> "을 참조하십시오.</p>
<p>이 항목은 Milvus Operator가 이미 배포되어 있음을 전제로 합니다.</p>
<div class="alert note">자세한 내용은 <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">‘Milvus Operator 배포’를</a> 참조하십시오. </div>
<p>Milvus Operator를 사용하여 Milvus 클러스터를 시작하려면 구성 파일을 지정해야 합니다.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>타사 종속성을 구성하려면 <code translate="no">milvus_cluster_default.yaml</code> 에 있는 코드 템플릿만 편집하면 됩니다. 다음 섹션에서는 오브젝트 스토리지, etcd 및 Pulsar를 각각 구성하는 방법을 소개합니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 표는 Milvus 독립 실행형 및 클러스터 모드에서 RocksMQ, Pulsar, Kafka 및 Woodpecker가 지원되는지 여부를 보여줍니다.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th><th style="text-align:center">Woodpecker</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">단독 모드</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">클러스터 모드</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>메시지 저장소를 지정할 때 다음과 같은 다른 제한 사항도 있습니다:</p>
<ul>
<li>Milvus 인스턴스 하나당 하나의 메시지 저장소만 지원됩니다. 하지만 하나의 인스턴스에 여러 메시지 저장소를 설정하는 방식에 대해서는 여전히 하위 호환성을 유지합니다. 우선순위는 다음과 같습니다:
<ul>
<li>독립 실행 모드: RocksMQ(기본값) &gt; Pulsar &gt; Kafka</li>
<li>클러스터 모드: Pulsar (기본값) &gt; Kafka</li>
</ul></li>
<li>Milvus 시스템이 실행 중인 동안에는 메시지 저장소를 변경할 수 없습니다.</li>
<li>Kafka 2.x 또는 3.x 버전만 지원됩니다.</li>
<li><strong>업그레이드 제한 사항</strong>: <strong>메시지 큐 제한 사항</strong>: Milvus v2.6.19로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경 기능은 향후 버전에서 제공될 예정입니다.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">RocksMQ 구성<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ는 Milvus 독립 실행형(standalone)의 기본 메시지 저장소입니다.</p>
<div class="alert note">
<p>현재 Milvus Operator를 통해서만 Milvus 독립 실행형 버전의 메시지 저장소로 RocksMQ를 구성할 수 있습니다.</p>
</div>
<h4 id="Example" class="common-anchor-header">예시</h4><p>다음 예제는 RocksMQ 서비스를 구성하는 방법입니다.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">rocksmq</span>
    <span class="hljs-attr">rocksmq:</span>
      <span class="hljs-attr">persistence:</span>
        <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">persistentVolumeClaim:</span>
          <span class="hljs-attr">spec:</span>
            <span class="hljs-attr">accessModes:</span> [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            <span class="hljs-attr">storageClassName:</span> <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            <span class="hljs-attr">resources:</span>
              <span class="hljs-attr">requests:</span>
                <span class="hljs-attr">storage:</span> <span class="hljs-string">10Gi</span>  <span class="hljs-comment"># Specify your desired storage size</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">주요 구성 옵션:</h5><ul>
<li><code translate="no">msgStreamType</code>: rocksmq: RocksMQ를 메시지 큐로 명시적으로 설정합니다</li>
<li><code translate="no">persistence.enabled</code>: RocksMQ 데이터에 대한 영구 저장을 활성화합니다</li>
<li><code translate="no">persistence.pvcDeletion</code>: true인 경우, Milvus 인스턴스가 삭제되면 PVC도 함께 삭제됩니다</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: 표준 Kubernetes PVC 사양</li>
<li><code translate="no">accessModes</code>: 일반적으로 블록 스토리지를 위한 <code translate="no">ReadWriteOnce</code> </li>
<li><code translate="no">storageClassName</code>: 클러스터의 스토리지 클래스</li>
<li><code translate="no">storage</code>: 영구 볼륨의 크기</li>
</ul>
<h2 id="Configure-Woodpecker" class="common-anchor-header">Woodpecker 구성<button data-href="#Configure-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker는 오브젝트 스토리지를 위해 설계된 클라우드 네이티브 WAL(Write-Ahead Log)입니다. 높은 처리량, 낮은 운영 오버헤드 및 원활한 확장성을 제공합니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/use-woodpecker.md">Woodpecker 사용을</a> 참조하십시오.</p>
<h2 id="Configure-Pulsar" class="common-anchor-header">Pulsar 구성<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar는 최근 변경 내역의 로그를 관리하고, 스트림 로그를 출력하며, 로그 구독 기능을 제공합니다. 메시지 저장을 위한 Pulsar 구성은 Milvus 독립 실행형 및 Milvus 클러스터 모두에서 지원됩니다. 그러나 Milvus Operator를 사용하는 경우, Milvus 클러스터의 메시지 저장소로만 Pulsar를 구성할 수 있습니다. Pulsar를 구성하려면 ‘ <code translate="no">spec.dependencies.pulsar</code> ’ 아래에 필수 필드를 추가하십시오.</p>
<p><code translate="no">pulsar</code> <code translate="no">external</code> 및 를 지원합니다. <code translate="no">inCluster</code></p>
<h3 id="External-Pulsar" class="common-anchor-header">외부 Pulsar<button data-href="#External-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> 는 외부 Pulsar 서비스를 사용함을 나타냅니다.
외부 Pulsar 서비스를 구성하는 데 사용되는 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">external</code>: <code translate="no">true</code> 값은 Milvus가 외부 Pulsar 서비스를 사용함을 나타냅니다.</li>
<li><code translate="no">endpoints</code>: Pulsar의 엔드포인트입니다.</li>
</ul>
<h4 id="Example" class="common-anchor-header">예시</h4><p>다음 예제는 외부 Pulsar 서비스를 구성하는 방법입니다.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">pulsar:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:6650</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">내부 Pulsar<button data-href="#Internal-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> 는 Milvus 클러스터가 시작될 때 클러스터 내에서 Pulsar 서비스가 자동으로 시작된다는 것을 나타냅니다.</p>
<h4 id="Example" class="common-anchor-header">예</h4><p>다음 예제는 내부 Pulsar 서비스를 구성하는 방법입니다.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">components:</span>
            <span class="hljs-attr">autorecovery:</span> <span class="hljs-literal">false</span>
          <span class="hljs-attr">zookeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">bookkeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">resoureces:</span>
              <span class="hljs-attr">limit:</span>
                <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
          <span class="hljs-attr">broker:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">configData:</span>
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              <span class="hljs-attr">autoSkipNonRecoverableData:</span> <span class="hljs-string">&quot;true&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultEnsembleSize:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultWriteQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultAckQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
          <span class="hljs-attr">proxy:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">이 예제에서는 Pulsar의 각 구성 요소에 대한 복제본 수, Pulsar BookKeeper의 컴퓨팅 리소스 및 기타 구성을 지정합니다.</div>
<div class="alert note"><a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml에서</a> 내부 Pulsar 서비스를 구성하기 위한 전체 구성 항목을 확인하십시오. 앞의 예제와 같이 <code translate="no">pulsar.inCluster.values</code> 아래에 필요에 따라 구성 항목을 추가하십시오.</div>
<p>구성 파일의 이름이 <code translate="no">milvuscluster.yaml</code> 라고 가정하고, 다음 명령을 실행하여 구성을 적용합니다.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Kafka 구성<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar는 Milvus 클러스터의 기본 메시지 저장소입니다. Kafka를 사용하려면 선택적 필드인 <code translate="no">msgStreamType</code> 을 추가하여 Kafka를 구성하십시오.</p>
<p><code translate="no">kafka</code> <code translate="no">external</code> 및 을 지원합니다. <code translate="no">inCluster</code></p>
<h3 id="External-Kafka" class="common-anchor-header">외부 Kafka<button data-href="#External-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> 는 외부 Kafka 서비스를 사용함을 나타냅니다.</p>
<p>외부 Kafka 서비스를 구성하는 데 사용되는 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">external</code>: <code translate="no">true</code> 값은 Milvus가 외부 Kafka 서비스를 사용함을 나타냅니다.</li>
<li><code translate="no">brokerList</code>: 메시지를 전송할 브로커 목록입니다.</li>
</ul>
<h4 id="Example" class="common-anchor-header">예시</h4><p>다음 예제는 외부 Kafka 서비스를 구성하는 방법입니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">PLAINTEXT</span>
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">brokerList:</span> 
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>SASL 구성은 operator v0.8.5 이상 버전에서 지원됩니다.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Internal Kafka<button data-href="#Internal-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> 는 Milvus 클러스터가 시작되면 클러스터 내에서 Kafka 서비스가 자동으로 시작된다는 것을 나타냅니다.</p>
<h4 id="Example" class="common-anchor-header">예</h4><p>다음 예제는 내부 Kafka 서비스를 구성하는 방법입니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span> 
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">inCluster:</span> 
        <span class="hljs-attr">values:</span> {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>내부 Kafka 서비스를 구성하는 데 필요한 전체 구성 항목은 <a href="https://artifacthub.io/packages/helm/bitnami/kafka">여기에서</a> 확인할 수 있습니다. 필요에 따라 ` <code translate="no">kafka.inCluster.values</code>` 아래에 구성 항목을 추가하십시오.</p>
<p>구성 파일 이름이 <code translate="no">milvuscluster.yaml</code> 라고 가정할 때, 다음 명령을 실행하여 구성을 적용하십시오.</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
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
    </button></h2><p>Milvus Operator를 사용하여 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/object_storage_operator.md">Milvus Operator를 사용하여 오브젝트 스토리지 구성</a></li>
<li><a href="/docs/ko/v2.6.x/meta_storage_operator.md">Milvus Operator를 사용하여 메타 스토리지 구성</a></li>
</ul>
