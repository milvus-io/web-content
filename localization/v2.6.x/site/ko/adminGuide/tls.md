---
id: tls.md
title: 전송 중 암호화
summary: Milvus에서 TLS 프록시를 활성화하는 방법을 알아보세요.
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">전송 중 암호화<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS(전송 계층 보안)는 통신 보안을 보장하기 위한 암호화 프로토콜입니다. Milvus 프록시는 TLS 단방향 및 양방향 인증을 사용합니다.</p>
<p>이 항목에서는 Milvus 프록시에서 gRPC 및 RESTful 트래픽 모두에 대해 TLS를 활성화하는 방법에 대해 설명합니다.</p>
<div class="alert note">
<p>TLS와 사용자 인증은 서로 다른 두 가지 보안 접근 방식입니다. Milvus 시스템에서 사용자 인증과 TLS를 모두 사용 설정한 경우 사용자 이름, 비밀번호 및 인증서 파일 경로를 제공해야 합니다. 사용자 인증을 활성화하는 방법에 대한 자세한 내용은 <a href="/docs/ko/authenticate.md">사용자 액세스 인증을</a> 참조하세요.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">나만의 인증서 만들기<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><p>OpenSSL이 설치되어 있는지 확인합니다. 설치하지 않은 경우 먼저 OpenSSL을 <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">빌드하여 설치합니다</a>.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>OpenSSL이 설치되어 있지 않은 경우. 우분투에서 다음 명령을 사용하여 설치할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">sudo apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">파일 만들기</h3><ol>
<li><code translate="no">gen.sh</code> 파일을 만듭니다.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><code translate="no">gen.sh</code> 파일에 다음 스크립트를 복사합니다.</li>
</ol>
<p><code translate="no">gen.sh</code> 파일에서 <code translate="no">CommonName</code> 을 구성해야 합니다. <code translate="no">CommonName</code> 은 클라이언트가 연결할 때 지정해야 하는 서버 이름을 나타냅니다.</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out ca.key
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">create a new ca certificate</span>
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">gen.sh</code> 파일의 변수는 인증서 서명 요청 파일을 만드는 절차에 중요합니다. 처음 5개의 변수는 국가, 주, 위치, 조직, 조직 단위를 포함한 기본 서명 정보입니다. <code translate="no">CommonName</code> 는 클라이언트-서버 통신 중에 확인되므로 구성할 때 주의가 필요합니다.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header"><code translate="no">gen.sh</code> 을 실행하여 인증서 생성</h3><p><code translate="no">gen.sh</code> 파일을 실행하여 인증서를 생성합니다.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>다음 7개의 파일이 생성됩니다: <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code>, <code translate="no">server.key</code>, <code translate="no">server.pem</code>, <code translate="no">client.key</code>, <code translate="no">client.pem</code>.</p>
<p>나중에 인증서를 갱신하려면 <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code> 파일을 안전하게 보관하세요. <code translate="no">server.key</code> 및 <code translate="no">server.pem</code> 파일은 서버에서 사용하고 <code translate="no">client.key</code> 및 <code translate="no">client.pem</code> 파일은 클라이언트에서 사용합니다.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">인증서 갱신(선택 사항)</h3><p>인증서가 곧 만료될 경우와 같이 인증서를 갱신하려는 경우 다음 스크립트를 사용할 수 있습니다.</p>
<p>작업 디렉터리에 <code translate="no">ca.key</code>, <code translate="no">ca.pem</code>, <code translate="no">ca.srl</code> 가 필요합니다.</p>
<p><details><summary><code translate="no">renew.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">renew.sh</code> 파일을 실행하여 인증서를 만듭니다.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">TLS로 Milvus 서버 설정하기<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 TLS 암호화를 사용하여 Milvus 서버를 구성하는 단계를 간략하게 설명합니다.</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">Docker Compose 설정</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. Milvus 서버 구성 수정하기</h4><p>외부 TLS를 사용하려면 <code translate="no">milvus.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">http:</span>
    <span class="hljs-comment"># for now milvus do not support config restful on same port with grpc</span>
    <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
<span class="hljs-attr">tls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>파라미터</p>
<ul>
<li><code translate="no">serverPemPath</code>: 서버 인증서 파일의 경로입니다.</li>
<li><code translate="no">serverKeyPath</code>: 서버 키 파일의 경로입니다.</li>
<li><code translate="no">caPemPath</code>: CA 인증서 파일의 경로입니다.</li>
<li><code translate="no">tlsMode</code>: 외부 서비스를 위한 TLS 모드입니다. 유효한 값입니다:<ul>
<li><code translate="no">1</code>: 서버에만 인증서가 필요하고 클라이언트는 인증서를 확인하는 단방향 인증입니다. 이 모드를 사용하려면 서버 측에서는 <code translate="no">server.pem</code> 및 <code translate="no">server.key</code>, 클라이언트 측에서는 <code translate="no">server.pem</code> 이 필요합니다.</li>
<li><code translate="no">2</code>: 양방향 인증: 서버와 클라이언트 모두 보안 연결을 설정하기 위해 인증서가 필요합니다. 이 모드에서는 서버 측에 <code translate="no">server.pem</code>, <code translate="no">server.key</code>, <code translate="no">ca.pem</code>, 클라이언트 측에 <code translate="no">client.pem</code>, <code translate="no">client.key</code>, <code translate="no">ca.pem</code> 가 필요합니다.</li>
</ul></li>
</ul>
<p>내부 TLS를 사용하려면 <code translate="no">milvus.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>매개변수</p>
<ul>
<li><code translate="no">serverPemPath</code>: 서버 인증서 파일의 경로입니다.</li>
<li><code translate="no">serverKeyPath</code>: 서버 키 파일의 경로입니다.</li>
<li><code translate="no">caPemPath</code>: CA 인증서 파일의 경로입니다.</li>
<li><code translate="no">internaltlsEnabled</code>: 내부 TLS 사용 여부. 현재는 단방향 TLS만 지원됩니다.</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. 인증서 파일을 컨테이너에 매핑하기</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">인증서 파일 준비</h5><p><code translate="no">docker-compose.yaml</code> 과 같은 디렉터리에 <code translate="no">tls</code> 이라는 새 폴더를 만듭니다. <code translate="no">server.pem</code> , <code translate="no">server.key</code> 및 <code translate="no">ca.pem</code> 를 <code translate="no">tls</code> 폴더에 복사합니다. 다음과 같이 디렉토리 구조에 배치합니다:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
<span class="hljs-code">     ├── server.pem
     ├── server.key
     └── ca.pem
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">Docker Compose 구성 업데이트</h4><p><code translate="no">docker-compose.yaml</code> 파일을 편집하여 아래와 같이 컨테이너 내부의 인증서 파일 경로를 매핑합니다:</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:latest</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    <span class="hljs-attr">security_opt:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">seccomp:unconfined</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/tls:/milvus/tls</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Milvus 배포하기</h5><p>다음 명령을 실행하여 Milvus를 배포합니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">Milvus 오퍼레이터 설정</h3><p>인증서 파일을 작업 디렉터리에 넣습니다. 디렉토리 구조는 다음과 같아야 합니다:</p>
<pre><code translate="no">├── milvus.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>인증서 파일로 비밀을 만듭니다:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>외부 TLS를 사용하려면 <code translate="no">milvus.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable</span>
    <span class="hljs-attr">tls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>내부 TLS를 사용하려면 <code translate="no">milvus.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<p><code translate="no">internaltls.sni</code> 필드를 인증서의 일반 이름으로 바꾸는 것을 잊지 마세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    <span class="hljs-attr">internaltls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
      <span class="hljs-attr">sni:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># the CommonName in your certificates</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CR을 생성한다:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">Milvus 헬름 설정</h3><p>인증서 파일을 작업 디렉터리에 넣습니다. 디렉토리 구조는 다음과 같아야 합니다:</p>
<pre><code translate="no">├── values.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>인증서 파일로 비밀을 생성합니다:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>외부 TLS를 사용하려면 <code translate="no">values.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        tlsMode: 1 # tlsMode for external service 1 means set to 2 to enable Mutual TLS
    # Configure tls certificates path for external service
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>내부 TLS를 사용하려면 <code translate="no">values.yaml</code> 파일에 다음 구성을 추가합니다:</p>
<p><code translate="no">internaltls.sni</code> 필드를 인증서의 일반 이름으로 바꾸는 것을 잊지 마세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        internaltlsEnabled: true # whether to enable internal tls
    # Configure tls certificates path for internal service
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>밀버스 릴리스를 만듭니다:</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">내부 TLS 사용 확인<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>내부 TLS를 직접 확인하기는 어렵습니다. Milvus 로그를 확인하여 내부 TLS가 사용 설정되어 있는지 확인할 수 있습니다.</p>
<p>내부 TLS가 활성화된 경우 Milvus 로그에 다음과 같은 메시지가 표시됩니다:</p>
<pre><code translate="no"><span class="hljs-selector-attr">[...date time...]</span> <span class="hljs-selector-attr">[INFO]</span> <span class="hljs-selector-attr">[utils/util.go:56]</span> <span class="hljs-selector-attr">[<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>]</span> <span class="hljs-selector-attr">[value=true]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">TLS를 사용하여 Milvus 서버에 연결합니다.<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>SDK 상호 작용의 경우 TLS 모드에 따라 다음 설정을 사용합니다.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">단방향 TLS 연결</h3><p><code translate="no">server.pem</code> 경로를 제공하고 <code translate="no">server_name</code> 이 인증서에 구성된 <code translate="no">CommonName</code> 과 일치하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">양방향 TLS 연결</h3><p><code translate="no">client.pem</code>, <code translate="no">client.key</code> 및 <code translate="no">ca.pem</code> 경로를 제공하고 <code translate="no">server_name</code> 이 인증서에 구성된 <code translate="no">CommonName</code> 과 일치하는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    client_pem_path=<span class="hljs-string">&quot;path_to/client.pem&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;path_to/client.key&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;path_to/ca.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls1.py">예제_tls1.py</a> 및 <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls2.py">예제_tls2.py를</a> 참조하세요.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">TLS를 사용하여 Milvus RESTful 서버에 연결하기<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>RESTful API의 경우 <code translate="no">curl</code> 명령을 사용하여 tls를 확인할 수 있습니다.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">단방향 TLS 연결</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">양방향 TLS 연결</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
