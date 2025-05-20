---
id: birdwatcher_install_guides.md
summary: Milvus 디버깅을 위해 Birdwatch를 설치하는 방법을 알아보세요.
title: 버드워처 설치하기
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">버드워처 설치하기<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Birdwatcher를 설치하는 방법을 설명합니다.</p>
<h2 id="Local-install" class="common-anchor-header">로컬 설치<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ko/v2.4.x/install_standalone-docker.md">도커를 사용하여</a> Milvus Standalone을 설치한 경우 빌드된 바이너리를 다운로드하여 설치하거나, 일반 Go 모듈로 설치하거나, 소스에서 Birdwatcher를 빌드하는 것이 좋습니다.</p>
<ul>
<li><p>일반 Go 모듈로 설치하세요.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 Birdwatcher를 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>소스에서 빌드하기.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 Birdwatcher를 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>이미 빌드된 바이너리 다운로드</p>
<p>먼저 <a href="https://github.com/milvus-io/birdwatcher/releases/latest">최신 릴리스 페이지를</a> 열고 준비된 바이너리를 찾습니다.</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;<span class="hljs-built_in">arch</span>&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 압축을 풀고 다음과 같이 Birdwatcher를 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">Kubernetes 파드로 설치<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p>헬름 <a href="/docs/ko/v2.4.x/install_standalone-helm.md">차트</a> 또는 밀버스 <a href="/docs/ko/v2.4.x/install_standalone-operator.md">오퍼레이터를</a> 사용하여 밀버스 스탠드얼론을 설치했거나 <a href="/docs/ko/v2.4.x/install_cluster-helm.md">헬름 차트</a> 또는 밀버스 <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">오퍼레이터를</a> <a href="/docs/ko/v2.4.x/install_cluster-helm.md">사용하여</a> 밀버스 클러스터를 설치한 경우, Birdwatcher를 Kubernetes 파드로 설치하는 것이 좋습니다.</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">배포.yml 준비</h3><pre><code translate="no" class="language-yml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: birdwatcher
spec:
  selector:
    matchLabels:
      app: birdwatcher
  template:
    metadata:
      labels:
        app: birdwatcher
    spec:
      containers:
      - name: birdwatcher
        image: milvusdb/birdwatcher
        resources:
          limits:
            memory: <span class="hljs-string">&quot;128Mi&quot;</span>
            cpu: <span class="hljs-string">&quot;500m&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>DockerHub에서 사용 가능한 이미지가 최신 버전이 아닌 경우, 다음과 같이 소스 코드와 함께 제공된 Docker파일을 사용하여 Birdwatcher의 이미지를 빌드할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>로컬로 빌드한 이미지를 배포하려면 위의 사양에 <code translate="no">imagePullPolicy</code> 을 추가하고 <code translate="no">Never</code> 으로 설정해야 합니다.</p>
<pre><code translate="no" class="language-yaml">...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">deployment.yml 적용</h3><p>위의 YAML을 파일에 저장하고 이름을 <code translate="no">deployment.yml</code> 으로 지정한 후 다음 명령을 실행합니다.</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
