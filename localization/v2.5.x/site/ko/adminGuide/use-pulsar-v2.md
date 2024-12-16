---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus v2.5.x의 경우 Pulsar를 v3로 업그레이드할 것을 권장합니다. 그러나 Pulsar v2를 선호하는 경우 이 문서에서는
  Milvus v2.5.x에서 Pulsar v2를 계속 사용하기 위한 단계를 안내합니다.
title: Milvus v2.5.x와 함께 Pulsar v2 사용
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Milvus v2.5.x와 함께 Pulsar v2 사용<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus v2.5.x를 실행하려면 Pulsar를 v3로 업그레이드할 것을 권장합니다. 자세한 내용은 <a href="/docs/ko/upgrade-pulsar-v3.md">Pulsar 업그레이드를</a> 참조하세요. 그러나 Milvus v2.5.x와 함께 Pulsar v2를 사용하려는 경우, 이 문서에서는 Pulsar v2와 함께 Milvus v2.5.x를 실행하는 절차를 안내합니다.</p>
<p>이미 실행 중인 Milvus 인스턴스가 있고 이를 v2.5.x로 업그레이드하되 Pulsar v2를 계속 사용하려는 경우 이 페이지의 단계를 따를 수 있습니다.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Milvus v2.5.x를 업그레이드하는 동안 Pulsar v2 계속 사용하기<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 실행 중인 Milvus 인스턴스를 Milvus v2.5.x로 업그레이드하는 동안 Pulsar v2를 계속 사용하는 단계를 안내합니다.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">밀버스 오퍼레이터 사용자</h3><p>Milvus Operator는 기본적으로 Pulsar v2 업그레이드와 호환됩니다. <a href="/docs/ko/upgrade_milvus_cluster-operator.md">밀버스 오퍼레이터로 밀버스 클러스터 업그레이드를</a> 참조하여 밀버스 인스턴스를 v2.5.x로 업그레이드할 수 있습니다.</p>
<p>업그레이드가 완료되면 Milvus 인스턴스에서 Pulsar v2를 계속 사용할 수 있습니다.</p>
<h3 id="For-Helm-users" class="common-anchor-header">헬름 사용자의 경우</h3><p>업그레이드하기 전에 다음을 확인한다.</p>
<ul>
<li><p>헬름 버전이 v3.12 이상이며 최신 버전을 권장합니다.</p>
<p>자세한 내용은 <a href="https://helm.sh/docs/intro/install/">헬름 설치를</a> 참조하세요.</p></li>
<li><p>사용 중인 쿠버네티스 버전이 v1.20 이상.</p></li>
</ul>
<p>이 문서의 작업은 이를 가정한다:</p>
<ul>
<li><p>Milvus가 <code translate="no">default</code> 네임스페이스에 설치되었다.</p></li>
<li><p>밀버스의 릴리스 이름은 <code translate="no">my-release</code> 이다.</p></li>
</ul>
<p>Milvus를 업그레이드하기 전에 <code translate="no">values.yaml</code> 파일을 변경하여 Pulsar 버전을 v2로 지정해야 합니다. 단계는 다음과 같습니다:</p>
<ol>
<li><p>Milvus 인스턴스의 현재 <code translate="no">values.yaml</code> 파일을 가져옵니다.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">values.yaml</code> 파일을 편집하여 Pulsar 버전을 v2로 지정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">image</code> 의 경우 <code translate="no">tag</code> 을 원하는 Milvus 버전(예: <code translate="no">v2.5.0-beta</code>)으로 변경합니다.</p></li>
<li><p>밀버스 헬름 차트를 업데이트합니다.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>밀버스 인스턴스를 업그레이드합니다.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Pulsar v2로 새 Milvus 인스턴스 생성하기<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Pulsar v2로 새 Milvus 인스턴스를 생성하는 단계를 안내합니다.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Milvus 운영자 사용자의 경우</h3><p>Milvus v2.5.x를 배포하기 전에 Milvus CRD(고객 리소스 정의) 파일을 다운로드하여 편집해야 합니다. Milvus Operator를 사용하여 Milvus를 설치하는 방법에 대한 자세한 내용은 Milvus <a href="/docs/ko/install_cluster-milvusoperator.md">Operator로 Milvus 클러스터 설치를</a> 참조하세요.</p>
<ol>
<li><p>CRD 파일을 다운로드합니다.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">milvus_cluster_default.yaml</code> 파일을 편집하여 Pulsar 버전을 v2로 지정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">dependencies</code> 의 경우 <code translate="no">pulsar.inCluster.chartVersion</code> 을 <code translate="no">pulsar-v2</code> 으로 변경합니다.</p></li>
<li><p>밀버스 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">오퍼레이터로 밀버스 클러스터 설치의</a> 단계를 계속 진행하여 편집한 CRD 파일을 사용하여 Pulsar v2와 함께 밀버스 v2.5.x를 배포합니다.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">헬름 사용자의 경우</h3><p>Milvus v2.5.x를 배포하기 전에 <code translate="no">values.yaml</code> 파일을 준비하거나 인라인 파라미터를 사용하여 Pulsar 버전을 지정할 수 있습니다. 헬름을 사용하여 Milvus를 설치하는 방법에 대한 자세한 내용은 <a href="/docs/ko/install_cluster-helm.md">헬름으로 Milvus 클러스터 설치를</a> 참조하세요.</p>
<ul>
<li><p>인라인 파라미터를 사용하여 Pulsar 버전을 v2로 지정합니다.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">values.yaml</code> 파일을 사용하여 Pulsar 버전을 v2로 지정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">values.yaml</code> 파일을 사용하여 Pulsar v2와 함께 Milvus v2.5.x를 배포합니다.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
