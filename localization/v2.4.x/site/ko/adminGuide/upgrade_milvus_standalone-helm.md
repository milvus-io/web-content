---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 헬름 차트를 사용하여 Milvus를 스탠드얼론으로 업그레이드하는 방법을 알아보세요.
title: 헬름 차트로 Milvus 스탠드얼론 업그레이드하기
---
<div class="tab-wrapper"><a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>밀버스</a><a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-helm.md" class='active '>오퍼레이터헬름도커</a><a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>컴포즈</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">헬름 차트로 Milvus 스탠드얼론 업그레이드하기<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Milvus 헬름 차트를 사용하여 Milvus 스탠드얼론을 업그레이드하는 방법을 설명합니다.</p>
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
<li>헬름 버전 &gt;= 3.14.0</li>
<li>쿠버네티스 버전 &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>밀버스-헬름 차트 버전 4.2.21부터 pulsar-v3.x 차트를 종속 요소로 도입했습니다. 이전 버전과의 호환성을 위해 헬름을 v3.14 이상 버전으로 업그레이드하고 <code translate="no">helm upgrade</code> 을 사용할 때마다 <code translate="no">--reset-then-reuse-values</code> 옵션을 추가해야 한다.</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Milvus 버전 확인<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 새로운 Milvus 버전을 확인합니다.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus 헬름 차트 리포지토리( <code translate="no">https://milvus-io.github.io/milvus-helm/</code> )가 아카이브되었으며, 다음과 같이 <code translate="no">https://zilliztech.github.io/milvus-helm/</code> 에서 추가 업데이트를 받을 수 있습니다:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>보관된 리포지토리는 4.0.31까지의 차트에 대해 계속 사용할 수 있습니다. 이후 릴리스에서는 새 리포지토리를 사용하세요.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Milvus의 업그레이드 경로는 다음과 같이 선택할 수 있습니다:</p>
<div style="display: none;">- 밀버스 v2.2.3 이상 릴리스에서 v2.4.23으로 [롤링 업그레이드 수행](#conduct-a-rolling-upgrade).</div>
<ul>
<li><p>v2.2.3 이전 마이너 릴리스에서 v2.4.23으로 업그레이드하려면<a href="#Upgrade-Milvus-using-Helm">헬름을 사용하여 Milvus를 업그레이드</a> 한다.</p></li>
<li><p>Milvus v2.1.x에서 v2.4.23으로 업그레이드하기 전에<a href="#Migrate-the-metadata">메타데이터를 마이그레이션한다</a>.</p></li>
</ul>
<div style="display:none;">
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">롤링 업그레이드 수행<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.2.3부터는 Milvus 코디네이터가 활성-대기 모드에서 작동하도록 구성하고 롤링 업그레이드 기능을 활성화하여 코디네이터 업그레이드 중에 들어오는 요청에 응답할 수 있도록 할 수 있습니다. 이전 릴리스에서는 업그레이드 중에 코디네이터를 제거했다가 다시 생성해야 하므로 서비스 다운타임이 발생할 수 있습니다.</p>
<p>롤링 업그레이드를 하려면 코디네이터가 활성-대기 모드에서 작업해야 합니다. 제공되는 <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">스크립트를</a> 사용하여 코디네이터가 활성 대기 모드에서 작업하도록 구성하고 롤링 업그레이드를 시작할 수 있습니다.</p>
<p>쿠버네티스가 제공하는 롤링 업데이트 기능을 기반으로, 위의 스크립트는 종속성에 따라 배포를 순서대로 업데이트합니다. 또한, Milvus는 업그레이드 중에 해당 구성 요소가 종속된 구성 요소와 호환성을 유지하도록 하는 메커니즘을 구현하여 잠재적인 서비스 중단 시간을 크게 줄입니다.</p>
<p>이 스크립트는 헬름과 함께 설치된 밀버스의 업그레이드에만 적용된다. 다음 표에는 스크립트에서 사용할 수 있는 명령 플래그가 나열되어 있다.</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>기본값</th><th>필수</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 인스턴스 이름</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus가 설치된 네임스페이스입니다.</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">t</code></td><td>대상 Milvus 버전</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">w</code></td><td>새 Milvus 이미지 태그</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>True</td></tr>
<tr><td><code translate="no">o</code></td><td>작동</td><td><code translate="no">update</code></td><td>False</td></tr>
</tbody>
</table>
<p>Milvus 인스턴스의 모든 배포가 정상 상태에 있는지 확인했습니다. 다음 명령을 실행하여 Milvus 인스턴스를 2.4.23으로 업그레이드할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>이 스크립트는 <strong>RocksMQ와</strong> 함께 설치된 Milvus 인스턴스에는 <strong>적용되지 않습니다</strong>.</li>
<li>이 스크립트는 배포의 업그레이드 순서를 하드코딩하며 변경할 수 없습니다.</li>
<li>이 스크립트는 <code translate="no">kubectl patch</code> 을 사용하여 배포를 업데이트하고 <code translate="no">kubectl rollout status</code> 을 사용하여 상태를 확인합니다.</li>
<li>이 스크립트는 <code translate="no">kubectl patch</code> 을 사용하여 배포의 <code translate="no">app.kubernetes.io/version</code> 레이블을 명령의 <code translate="no">-t</code> 플래그 뒤에 지정된 레이블로 업데이트합니다.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">헬름을 사용하여 밀버스 업그레이드<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스를 v2.2.3 이전의 마이너 릴리스에서 최신 버전으로 업그레이드하려면 다음 명령을 실행한다:</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>앞의 명령에서 헬름 차트 버전을 사용한다. 헬름 차트 버전을 구하는 방법에 대한 자세한 내용은 <a href="#Check-the-Milvus-version">Milvus 버전 확인을</a> 참조한다.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">메타데이터 마이그레이션<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.2.0부터는 메타데이터가 이전 릴리즈의 메타데이터와 호환되지 않는다. 다음 예제 코드 조각은 Milvus 2.1.4에서 Milvus 2.2.0으로 업그레이드하는 것을 가정한다.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Milvus 버전 확인</h3><p><code translate="no">$ helm list</code> 을 실행하여 Milvus 앱 버전을 확인합니다. <code translate="no">APP VERSION</code> 이 2.1.4임을 확인할 수 있습니다.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>     
my-release          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. 실행 중인 포드 확인</h3><p><code translate="no">$ kubectl get pods</code> 을 실행하여 실행 중인 파드를 확인합니다. 다음과 같은 출력을 확인할 수 있습니다.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. 이미지 태그 확인</h3><p>파드의 이미지 태그를 확인합니다 <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Milvus 클러스터의 릴리즈가 v2.1.4임을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. 메타데이터 마이그레이션</h3><p>Milvus 2.2의 주요 변경 사항은 세그먼트 인덱스의 메타데이터 구조입니다. 따라서 Milvus를 v2.1.x에서 v2.2.0으로 업그레이드하는 동안 헬름을 사용하여 메타데이터를 마이그레이션해야 한다. 다음은 메타데이터를 안전하게 마이그레이션하기 위한 <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">스크립트이다</a>.</p>
<p>이 스크립트는 K8s 클러스터에 설치된 Milvus에만 적용됩니다. 프로세스 중에 오류가 발생하면 먼저 롤백 작업을 통해 이전 버전으로 롤백하세요.</p>
<p>다음 표에는 메타 마이그레이션을 위해 수행할 수 있는 작업이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>기본값</th><th>필수</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 인스턴스 이름입니다.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus가 설치된 네임스페이스입니다.</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">s</code></td><td>소스 Milvus 버전입니다.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">t</code></td><td>대상 Milvus 버전입니다.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">r</code></td><td>밀버스 메타의 루트 경로입니다.</td><td><code translate="no">by-dev</code></td><td>False</td></tr>
<tr><td><code translate="no">w</code></td><td>새 Milvus 이미지 태그입니다.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>메타 마이그레이션 이미지 태그입니다.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>메타 마이그레이션 작업입니다.</td><td><code translate="no">migrate</code></td><td>False</td></tr>
<tr><td><code translate="no">d</code></td><td>마이그레이션이 완료된 후 마이그레이션 파드를 삭제할지 여부입니다.</td><td><code translate="no">false</code></td><td>False</td></tr>
<tr><td><code translate="no">c</code></td><td>메타 마이그레이션 pvc의 스토리지 클래스.</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>밀버스에서 사용하는 etcd 엔포인트.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. 메타데이터 마이그레이션</h4><ol>
<li><a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">마이그레이션 스크립트를</a> 다운로드합니다.</li>
<li>Milvus 구성 요소를 중지합니다. Milvus etcd의 라이브 세션은 마이그레이션 실패를 일으킬 수 있습니다.</li>
<li>Milvus 메타데이터에 대한 백업을 생성합니다.</li>
<li>Milvus 메타데이터를 마이그레이션합니다.</li>
<li>새 이미지로 Milvus 구성 요소를 시작합니다.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2423" class="common-anchor-header">2. Milvus를 v2.1.x에서 2.4.23으로 업그레이드합니다.</h4><p>다음 명령은 Milvus를 v2.1.4에서 2.4.23으로 업그레이드한다고 가정합니다. 필요에 맞는 버전으로 변경하세요.</p>
<ol>
<li><p>밀버스 인스턴스 이름, 소스 밀버스 버전, 대상 밀버스 버전을 지정합니다.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus가 기본 K8s 네임스페이스에 설치되지 않은 경우 <code translate="no">-n</code> 로 네임스페이스를 지정합니다.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus가 사용자 지정 <code translate="no">rootpath</code> 과 함께 설치된 경우 <code translate="no">-r</code> 으로 루트 경로를 지정합니다.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus가 사용자 지정 <code translate="no">image</code> 과 함께 설치된 경우 이미지 태그를 <code translate="no">-w</code> 으로 지정합니다.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>마이그레이션이 완료된 후 마이그레이션 파드를 자동으로 제거하려면 <code translate="no">-d true</code> 을 설정합니다.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -w milvusdb/milvus:v2.4.23 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>마이그레이션이 실패하면 롤백하고 다시 마이그레이션하세요.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o migrate -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
</ol>
