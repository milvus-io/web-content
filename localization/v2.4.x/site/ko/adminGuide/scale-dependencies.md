---
id: scale-dependencies.md
title: 스케일 종속성
---
<h1 id="Scale-Milvus-Dependencies" class="common-anchor-header">Milvus 종속성 확장<button data-href="#Scale-Milvus-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 MinIO, Kafka, Pulsar 등 다양한 종속 요소에 의존합니다. 이러한 구성 요소를 확장하면 다양한 요구 사항에 대한 Milvus의 적응성을 향상시킬 수 있습니다.</p>
<div class="alert note">
<p>Milvus 오퍼레이터 사용자의 경우 <a href="/docs/ko/v2.4.x/object_storage_operator.md">Milvus 오퍼레이터로 오브젝트 스토리지 구성하기</a>, Milvus 오퍼레이터로 <a href="/docs/ko/v2.4.x/meta_storage_operator.md">메타 스토리지 구성하기</a>, Milvus <a href="/docs/ko/v2.4.x/message_storage_operator.md">오퍼레이터로 메시지 스토리지 구성을</a> 참조하세요.</p>
</div>
<h2 id="Scale-MinIO" class="common-anchor-header">MinIO 스케일링<button data-href="#Scale-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-MinIO-pod" class="common-anchor-header">MinIO 포드당 리소스 늘리기</h3><p>Milvus에서 사용하는 오브젝트 스토리지 시스템인 MinIO는 각 포드마다 CPU와 메모리 리소스를 늘릴 수 있습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
minio:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령어로 변경 사항을 적용하세요:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>또한 각 MioIO 영구 볼륨 클레임(PVC)에 대해 <code translate="no">spec.resources.requests.storage</code> 값을 수동으로 변경하여 MioIO 클러스터의 디스크 용량을 늘릴 수 있습니다. 기본 스토리지 클래스는 볼륨 확장을 허용해야 한다는 점에 유의하세요.</p>
<h3 id="Add-an-extra-MinIO-server-pool-Recommended" class="common-anchor-header">추가 MinIO 서버 풀 추가(권장)</h3><p>Milvus 인스턴스를 위해 추가 MioIO 서버 풀을 추가하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yam;</span>
minio:
  zones: <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령으로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 MinIO 클러스터에 추가 서버 풀이 추가되어 각 서버 풀의 여유 디스크 용량에 따라 Milvus가 MinIO 서버 풀에 쓸 수 있습니다. 예를 들어, 3개의 풀로 구성된 그룹에 다음과 같이 풀에 총 10TB의 여유 공간이 분산되어 있는 경우입니다:</p>
<table>
<thead>
<tr><th></th><th>여유 공간</th><th>쓰기 가능성</th></tr>
</thead>
<tbody>
<tr><td>풀 A</td><td>3 TiB</td><td>30% (3/10)</td></tr>
<tr><td>풀 B</td><td>2 TiB</td><td>20% (2/10)</td></tr>
<tr><td>풀 C</td><td>5 TiB</td><td>50% (5/10)</td></tr>
</tbody>
</table>
<div class="alert note">
<p>MinIO는 새 서버 풀에서 오브젝트를 자동으로 리밸런싱하지 않습니다. 필요한 경우 <code translate="no">mc admin rebalance</code> 에서 수동으로 리밸런싱 절차를 시작할 수 있습니다.</p>
</div>
<h2 id="Kafka" class="common-anchor-header">Kafka<button data-href="#Kafka" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resource-per-Kafka-broker-pod" class="common-anchor-header">Kafka 브로커 포드당 리소스 증가</h3><p>각 브로커 파드의 CPU 및 메모리 리소스를 조정하여 Kafka 브로커 용량을 향상하세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  resources:
     limits:
        cpu: <span class="hljs-number">2</span>
        memory: 12Gi
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령어로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>또한 각 Kafka 영구 볼륨 클레임(PVC)에 대해 <code translate="no">spec.resources.requests.storage</code> 값을 수동으로 변경하여 Kafka 클러스터의 디스크 용량을 늘릴 수도 있습니다. 기본 스토리지 클래스가 볼륨 확장을 허용하는지 확인합니다.</p>
<h2 id="Add-an-extra-Kafka-broker-pool-Recommended" class="common-anchor-header">추가 Kafka 브로커 풀 추가(권장)<button data-href="#Add-an-extra-Kafka-broker-pool-Recommended" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 인스턴스를 위해 추가 Kafka 서버 풀을 추가하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  replicaCount: <span class="hljs-number">4</span>
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령으로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Kafka 클러스터에 추가 브로커가 추가됩니다.</p>
<div class="alert note">
<p>Kafka는 모든 브로커에서 토픽을 자동으로 리밸런싱하지 않습니다. 필요한 경우 각 Kafka 브로커 포드에 로그인한 후 <code translate="no">bin/kafka-reassign-partitions.sh</code> 을 사용하여 모든 Kafka 브로커에서 토픽/파티션의 균형을 수동으로 재조정하세요.</p>
</div>
<h2 id="Pulsar" class="common-anchor-header">Pulsar<button data-href="#Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar는 계산과 스토리지를 분리합니다. Pulsar 브로커(계산)와 Pulsar 부키(저장)의 용량을 독립적으로 늘릴 수 있습니다.</p>
<h2 id="Increase-resources-per-Pulsar-broker-pod" class="common-anchor-header">Pulsar 브로커 포드당 리소스 늘리기<button data-href="#Increase-resources-per-Pulsar-broker-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령으로 변경 사항을 적용하세요:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Increase-resources-per-Pulsar-bookie-pod" class="common-anchor-header">Pulsar 부키 포드당 리소스 늘리기<button data-href="#Increase-resources-per-Pulsar-bookie-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령으로 변경 사항을 적용하세요:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>각 Pulsar 부키의 PVC(퍼시스턴트 볼륨 클레임)에 대해 <code translate="no">spec.resources.requests.storage</code> 값을 수동으로 변경하여 Pulsar 클러스터의 디스크 용량을 늘릴 수도 있습니다. 기본 스토리지 클래스는 볼륨 확장을 허용해야 한다는 점에 유의하세요.</p>
<p>Pulsar 부키 포드에는 <code translate="no">journal</code> 와 <code translate="no">legers</code> 의 두 가지 유형의 스토리지가 있습니다. <code translate="no">journal</code> 유형의 스토리지의 경우, <code translate="no">ssd</code> 또는 <code translate="no">gp3</code> 를 스토리지 클래스로 사용하는 것이 좋습니다. 다음은 펄서 저널의 스토리지 클래스를 지정하는 예제입니다.</p>
<pre><code translate="no">pulsar:
  bookkeeper:
    volumes:
      journal:
        size: 20Gi
        storageClassName: gp3
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-broker-pod" class="common-anchor-header">추가 Pulsar 브로커 포드 추가</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령어로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-bookie-pod-Recommended" class="common-anchor-header">추가 Pulsar 부키 포드 추가(권장)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령어로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="etcd" class="common-anchor-header">etcd<button data-href="#etcd" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-etcd-pod-recommended" class="common-anchor-header">etcd 파드당 리소스 늘리기(권장)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후, 다음 명령어로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-extra-etcd-pods" class="common-anchor-header">추가 etcd 파드 추가</h3><p>etcd 파드의 총 개수는 홀수여야 합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  replicaCount: <span class="hljs-number">5</span>
<button class="copy-code-btn"></button></code></pre>
<p>파일을 저장한 후 다음 명령어로 변경 사항을 적용합니다:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
