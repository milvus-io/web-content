---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: 최신 버전의 Milvus v2.5.x를 사용할 수 있도록 Milvus에서 Pulsar를 V2에서 V3로 업그레이드하는 방법을 알아보세요.
title: Milvus의 Pulsar를 V2에서 V3로 업그레이드하기
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">Pulsar 업그레이드<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>이 문서에서는 이미 Pulsar V2로 작동 중인 Milvus 배포가 있는 경우 Pulsar 구성 요소를 V2에서 V3로 업그레이드하는 절차에 대해 설명합니다. Milvus v2.5부터는 일부 버그와 보안 취약성을 수정하기 위해 기본적으로 <strong>milvus-helm</strong> 및 <strong>milvus-operator가</strong> Pulsar V3를 사용합니다.</p>
<div class="alert note">
<ol>
<li><p>업그레이드 과정에서 잠시 서비스가 중단될 수 있습니다(일반적으로 데이터 양에 따라 약 몇 분에서 10분 이상 소요됨).</p></li>
<li><p>작업 전에 실행 중인 모든 클라이언트가 Milvus에 데이터를 쓰지 못하도록 중지해야 합니다. 그렇지 않으면 기록된 데이터가 손실될 수 있습니다.</p></li>
<li><p>이 문서에서는 Milvus가 네임스페이스 <code translate="no">default</code> 에 설치되어 있고 이름이 <code translate="no">my-release</code> 이라고 가정합니다. 이 페이지에서 복사한 명령을 실행하는 동안 매개변수를 사용자 네임스페이스와 릴리스 이름으로 변경하세요.</p></li>
<li><p>작업 환경에 위에서 언급한 네임스페이스에 대한 권한이 있고 다음 명령어가 설치되어 있는지 확인합니다.</p>
<p>a. <code translate="no">kubectl</code> &gt;= 1.20</p>
<p>b. <code translate="no">helm</code> &gt;= 3.14.0</p>
<p>c. <code translate="no">cat</code>, <code translate="no">grep</code>, <code translate="no">awk</code> 문자열 조작 작업용</p>
<p>d. <code translate="no">curl</code> 또는 <strong>Attu v2.4 이상</strong>, 밀버스 관리 API와 상호 작용하기 위해</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">로드맵<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>업그레이드 프로세스에는 다음 단계가 포함됩니다:</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">펄서에서 소비되지 않는 데이터를 유지합니다.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">Milvus를 중지하고 pulsar V2를 삭제합니다.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">Pulsar V3 및 Milvus를 시작합니다.</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">절차<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Milvus에서 Pulsar를 V2에서 V3로 업그레이드하는 자세한 절차를 설명합니다.</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">Pulsar에서 소비되지 않는 데이터 유지</h3><p>이 단계에서는 Pulsar의 기존 데이터가 오브젝트 스토리지 서비스에 보존되어 있는지 확인해야 합니다. 두 가지 접근 방식을 사용할 수 있으며, 필요에 맞는 방식을 선택할 수 있습니다.</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">접근 방식 1: Attu 사용</h4><p>작동 중인 Milvus 배포에 세그먼트 수가 많지 않은 적은 수의 컬렉션만 있는 경우, Attu를 사용하여 데이터를 객체 스토리지 서비스에 지속시킬 수 있습니다.</p>
<ol>
<li><p>모든 데이터베이스에서 모든 컬렉션을 선택하고 <code translate="no">Segments</code> 패널로 이동하여 <code translate="no">Flush</code> 버튼을 클릭합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
   </span> <span class="img-wrapper"> <span>컬렉션의 세그먼트 패널</span> </span></p></li>
<li><p>그런 다음 팝업이 나타나면 <code translate="no">Flush</code> 을 다시 클릭합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
   </span> <span class="img-wrapper"> <span>Attu의 데이터 플러시 프롬프트</span> </span></p></li>
<li><p>그런 다음 모든 컬렉션의 영구 세그먼트 상태가 <code translate="no">Flushed</code> 이 될 때까지 기다립니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
   </span> <span class="img-wrapper"> <span>Attu에서 데이터 플러시 상태 보기</span> </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">접근 방식 2: 관리 API 사용</h4><ol>
<li><p>후속 작업을 위해 Milvus 프록시 포트 9091을 로컬 호스트에 프록시합니다.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span> &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>] <span class="hljs-number">8116</span>​
Forwarding <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">9091</span> -&gt; <span class="hljs-number">9091</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>나중에 정리할 수 있도록 Pid를 저장합니다.</p>
<pre><code translate="no" class="language-yaml">pid=8116​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>삽입된 모든 데이터를 Pulsar에서 Ojbect Storage로 보존하는 작업을 트리거합니다.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-yaml">{​
  <span class="hljs-string">&quot;segmentIDs&quot;</span>: [​
    <span class="hljs-number">454097953998181000</span>,​
    <span class="hljs-number">454097953999383600</span>,​
    <span class="hljs-number">454097953998180800</span>​
  ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>모든 세그먼트 플러시됨을 확인합니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>완료되면 다음과 같은 출력이 표시됩니다.</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;flushed&quot;</span>:<span class="hljs-literal">true</span>}​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>백엔드 <code translate="no">kubectl port-forward</code> 프로세스 중지</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-built_in">kill</span> <span class="hljs-variable">$pid</span>​

<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-meta">1</span>]  + <span class="hljs-number">8116</span> terminated  kubectl -n <span class="hljs-literal">default</span> port-forward deploy/my-release-milvus-proxy <span class="hljs-number">9091</span>:<span class="hljs-number">9091</span>                      ​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">Milvus를 중지하고 Pulsar V2를 삭제합니다.</h3><p>이 단계에서는 Milvus 파드를 중지하고 Pulsar V2 배포를 삭제해야 합니다. 두 가지 섹션이 있습니다:</p>
<ul>
<li><p>밀버스 헬름 사용자의 경우</p>
<p>밀버스 헬름 차트를 사용하여 밀버스를 설치한 경우, <a href="#Delete-Pulsar-V2-using-Helm">헬름 사용자의 경우로</a> 이동합니다.</p></li>
<li><p>밀버스 오퍼레이터 사용자의 경우</p>
<p>밀버스 오퍼레이터를 사용하여 밀버스를 설치한 경우 밀버스 오퍼레이터 <a href="#Delete-Pulsar-V2-using-Milvus-Operator">사용자의 경우로</a> 이동합니다.</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">헬름을 사용하여 펄서 V2 삭제하기</h4><p>Milvus 헬름 차트를 사용하여 Milvus를 설치한 경우, 아래 단계에 따라 Milvus 파드를 중지하고 Pulsar V2 배포를 삭제하세요.</p>
<ol>
<li><p>나중에 복구할 수 있도록 현재 Milvus 릴리스 값을 <code translate="no">values.yaml</code> 에 저장합니다.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> values my-release -o yaml &gt; values.yaml​
cat values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>명령을 사용하여 Milvus와 모든 종속성을 중지합니다. 데이터 볼륨은 기본적으로 유지되므로 걱정하지 마세요.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>출력</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[<span class="hljs-meta">PersistentVolumeClaim</span>] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>펄서 PVC 및 PV(퍼시스턴트 볼륨 클레임 및 퍼시스턴트 볼륨) 목록을 지워야 합니다.</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>출력</p>
<pre><code translate="no" class="language-yaml">Volume Claims:​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​
my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​
my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​
Volumes:​
pvc-f590a4de-df31-4ca8-a424-007eac3c619a​
pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​
pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​
pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​
pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">pulsar-pvcs.txt</code> 의 PVC 목록이 모두 Pulsar용인지 확인합니다. 오류가 없는 것을 확인했다면 PVC를 삭제합니다.</p>
<pre><code translate="no" class="language-bash">cat pulsar-pvcs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-yaml">persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> deleted​
persistentvolumeclaim <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(선택 사항) PVC를 제공하는 스토리지 클래스에 따라 PV를 수동으로 제거해야 할 수도 있습니다.</p>
<pre><code translate="no" class="language-yaml">cat pulsar-pvs.<span class="hljs-property">txt</span> |xargs -I {} kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> pvc {} --wait=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>찾을 수 없음 오류가 출력되어도 괜찮습니다. 이미 쿠버네티스 컨트롤러에 의해 삭제되었기 때문입니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> not found​
<span class="hljs-title class_">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-title function_">server</span> (<span class="hljs-title class_">NotFound</span>): persistentvolumeclaims <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> not found​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">Milvus 오퍼레이터를 사용하여 Pulsar V2 삭제하기</h4><p>Milvus Operator를 사용하여 Milvus를 설치한 경우, 아래 단계에 따라 Milvus 파드를 중지하고 Pulsar V2 배포를 삭제하세요.</p>
<ol>
<li><p>나중에 사용할 수 있도록 현재 Milvus 매니페스트를 <code translate="no">milvus.yaml</code> 에 저장합니다.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release -o yaml &gt; milvus.yaml​
head milvus.yaml -n <span class="hljs-number">20</span>​

<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations:​
    milvus.io/dependency-values-merged: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/pod-service-label-added: <span class="hljs-string">&quot;true&quot;</span>​
    milvus.io/querynode-current-group-id: <span class="hljs-string">&quot;0&quot;</span>​
  creationTimestamp: <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span>​
  finalizers:​
  - milvus.milvus.io/finalizer​
  generation: 3​
  labels:​
    app: milvus​
    milvus.io/operator-version: 1.1.2​
name: my-release​
namespace: default​
resourceVersion: <span class="hljs-string">&quot;692217324&quot;</span>​
uid: 7a469ed0-9df1-494e-bd9a-340fac4305b5​
spec:​
  components:​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>다음 내용으로 <code translate="no">patch.yaml</code> 파일을 생성합니다.</p>
<pre><code translate="no" class="language-yaml"># a patch to retain etcd &amp; storage data and <span class="hljs-built_in">delete</span> pulsar data while <span class="hljs-built_in">delete</span> milvus​
spec:​
  dependencies:​
    etcd:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    storage:​
      inCluster:​
        deletionPolicy: Retain​
        pvcDeletion: <span class="hljs-literal">false</span>​
    pulsar:​
      inCluster:​
        deletionPolicy: Delete​
        pvcDeletion: <span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">kubectl patch</code> 을 사용하여 Milvus를 삭제하는 동안 etcd 및 스토리지 데이터를 유지하고 펄서 데이터를 삭제합니다.</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-keyword">default</span> patch milvus my-release --patch-file patch.yaml --<span class="hljs-keyword">type</span>=merge​

<button class="copy-code-btn"></button></code></pre>
<p>출력.</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>밀버스를 중지하고 펄서 V2를 삭제합니다. etcd 및 오브젝트 스토리지 데이터 볼륨은 기본적으로 유지되므로 걱정하지 마세요.</p>
<pre><code translate="no" class="language-bash">kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">false</span>​
kubectl -n <span class="hljs-keyword">default</span> get milvus my-release​
kubectl -n <span class="hljs-keyword">default</span> <span class="hljs-keyword">delete</span> milvus my-release --wait=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>출력: 밀버스가 정상적으로 중지되고 운영자가 펄서 볼륨을 삭제하는 데 몇 분 정도 걸릴 수 있습니다.</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   <span class="hljs-literal">True</span>      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>명령이 완료될 때까지 기다리세요.</p></li>
<li><p>밀버스 리소스가 사라졌는지 다시 확인합니다.</p>
<pre><code translate="no" class="language-yaml">kubectl -n <span class="hljs-literal">default</span> <span class="hljs-keyword">get</span> milvus my-release​

<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 같아야 합니다.</p>
<pre><code translate="no" class="language-yaml">No resources found <span class="hljs-keyword">in</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">namespace</span>.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">Pulsar V3 및 Milvus 시작</h3><p>이 단계에서는 Pulsar V3와 Milvus 파드를 시작해야 합니다. 두 개의 별도 섹션을 사용할 수 있습니다:</p>
<ul>
<li><p>헬름 사용자의 경우</p>
<p>밀버스 헬름 차트를 사용하여 밀버스를 설치한 경우, <a href="#For-Helm-User">헬름 사용자의</a> 경우로 이동합니다.</p></li>
<li><p>밀버스 오퍼레이터 사용자의 경우</p>
<p>밀버스 오퍼레이터를 사용하여 밀버스를 설치한 경우, 밀버스 오퍼레이터 <a href="#For-Milvus-Operator-User">사용자의 경우로</a> 이동합니다.</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">Pulsar V3를 시작하고 헬름을 사용합니다.</h4><ol>
<li><p>이전 단계에서 저장한 <code translate="no">values.yaml</code> 을 편집합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
pulsar:​
  enabled: false <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
pulsarv3:​
  enabled: true​
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>로컬 헬름 리포지토리를 업데이트합니다.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> zilliztech https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm​</span>
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>출력</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists <span class="hljs-keyword">with</span> the same configuration, skipping​
<span class="hljs-title class_">Hang</span> tight <span class="hljs-keyword">while</span> we grab the latest <span class="hljs-keyword">from</span> your chart repositories...​
...<span class="hljs-title class_">Successfully</span> got an update <span class="hljs-keyword">from</span> the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
<span class="hljs-title class_">Update</span> <span class="hljs-title class_">Complete</span>. ⎈<span class="hljs-title class_">Happy</span> <span class="hljs-title class_">Helming</span>!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>편집한 <code translate="no">values.yaml</code> 을 사용하여 최신 헬름 차트 버전으로 밀버스 릴리스를 설치합니다.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-keyword">default</span> install my-release zilliztech/milvus --reset-values -f values.<span class="hljs-property">yaml</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output</p>
<pre><code translate="no" class="language-bash"><span class="hljs-attr">NAME</span>: my-release​
<span class="hljs-variable constant_">LAST</span> <span class="hljs-attr">DEPLOYED</span>: <span class="hljs-title class_">Fri</span> <span class="hljs-title class_">Nov</span> <span class="hljs-number">22</span> <span class="hljs-number">15</span>:<span class="hljs-number">31</span>:<span class="hljs-number">27</span> <span class="hljs-number">2024</span>​
<span class="hljs-attr">NAMESPACE</span>: <span class="hljs-keyword">default</span>​
<span class="hljs-attr">STATUS</span>: deployed​
<span class="hljs-attr">REVISION</span>: <span class="hljs-number">1</span>​
<span class="hljs-variable constant_">TEST</span> <span class="hljs-attr">SUITE</span>: <span class="hljs-title class_">None</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>파드가 모두 스케줄링되고 <code translate="no">kubectl -n default get pods</code> 로 실행되는지 확인한다.</p>
<p>모든 파드가 시작되는 데 몇 분 정도 걸릴 수 있다.</p>
<p>출력은 다음과 같습니다.</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-milvus-datanode<span class="hljs-number">-56487b</span>c4bc-s6mbd   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-indexnode<span class="hljs-number">-6476894</span>d6-rv85d   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-milvus-mixcoord<span class="hljs-number">-6</span>d8875cb9c<span class="hljs-number">-67f</span>cq   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-proxy<span class="hljs-number">-7b</span>c45d57c5<span class="hljs-number">-2</span>qf8m      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-milvus-querynode<span class="hljs-number">-77465747b</span>-kt7f4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m4s​
my-release-minio<span class="hljs-number">-684f</span>f4f5df-pnc97             <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m5s​
my-release-pulsarv3-bookie<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie<span class="hljs-number">-2</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-bookie-<span class="hljs-keyword">init</span><span class="hljs-number">-6</span>z4tk         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-broker<span class="hljs-number">-0</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-broker<span class="hljs-number">-1</span>                  <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-proxy<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-pulsar-<span class="hljs-keyword">init</span>-wvqpc         <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m1s​
my-release-pulsarv3-recovery<span class="hljs-number">-0</span>                <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m3s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-0</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-1</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​
my-release-pulsarv3-zookeeper<span class="hljs-number">-2</span>               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">4</span>m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">Pulsar V3를 시작하고 밀버스 오퍼레이터를 사용합니다.</h4><ol>
<li><p>이전 단계에서 저장한 <code translate="no">milvus.yaml</code> 을 편집합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
apiVersion: milvus.io/v1beta1​
kind: Milvus​
metadata:​
  annotations: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  resourceVersion: null <span class="hljs-comment"># this field should be removed or set to null​</span>
  uid: null <span class="hljs-comment"># this field should be removed or set to null​</span>
spec:​
  dependencies:​
    pulsar:​
      inCluster:​
        chartVersion: pulsar-v3​
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        values: null​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>밀버스 오퍼레이터가 v1.1.2 이상 버전으로 업그레이드되었는지 확인합니다.</p>
<pre><code translate="no" class="language-yaml">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator​</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>​
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>​

<button class="copy-code-btn"></button></code></pre>
<p>명령을 사용하여 Pulsar V3로 밀버스 시작하기</p>
<pre><code translate="no" class="language-yaml">kubectl create -f milvus.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>출력</p>
<pre><code translate="no" class="language-yaml">milvus.milvus.io/my-release created​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>모든 파드가 <code translate="no">kubectl -n default get pods</code> 로 스케줄링되고 실행되는지 확인합니다. </p>
<p>모든 파드가 시작되려면 몇 분 정도 걸릴 수 있습니다.</p>
<p>출력은 다음과 같습니다.</p>
<pre><code translate="no" class="language-yaml">NAME                                            READY   STATUS      RESTARTS   AGE​
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-milvus-datanode<span class="hljs-number">-57f</span>d59ff58<span class="hljs-number">-5</span>mdrk     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-indexnode<span class="hljs-number">-67867</span>c6b9b<span class="hljs-number">-4</span>wsbw    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-mixcoord<span class="hljs-number">-797849f</span>9bb-sf8z5     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-proxy<span class="hljs-number">-5</span>d5bf98445-c55m6        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">93</span>s​
my-release-milvus-querynode<span class="hljs-number">-0</span><span class="hljs-number">-64797f</span>5c9-lw4rh   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">92</span>s​
my-release-minio<span class="hljs-number">-79476</span>ccb49-zvt2h               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">65</span>m​
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-v8fdj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span><span class="hljs-number">-5l</span>hx7             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m11s​
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">5</span>m10s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p></p>
