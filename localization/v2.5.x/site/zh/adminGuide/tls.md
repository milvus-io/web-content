---
id: tls.md
title: 传输中的加密
summary: 了解如何在 Milvus 启用 TLS 代理。
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">传输中的加密<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS（传输层安全）是一种确保通信安全的加密协议。Milvus 代理使用 TLS 单向和双向验证。</p>
<p>本主题将介绍如何在 Milvus 代理中启用 TLS，用于 gRPC 和 RESTful 流量。</p>
<div class="alert note">
<p>TLS 和用户身份验证是两种不同的安全方法。如果在 Milvus 系统中同时启用了用户身份验证和 TLS，则需要提供用户名、密码和证书文件路径。有关如何启用用户身份验证的信息，请参阅<a href="/docs/zh/authenticate.md">验证用户访问</a>。</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">创建自己的证书<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><p>确保已安装 OpenSSL。如果尚未安装，请先<a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">构建并安装</a>OpenSSL。</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>如果未安装 OpenSSL。可在 Ubuntu 中使用以下命令安装。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">创建文件</h3><ol>
<li>创建<code translate="no">gen.sh</code> 文件。</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>将以下脚本复制到<code translate="no">gen.sh</code> 。</li>
</ol>
<p>有必要在<code translate="no">gen.sh</code> 文件中配置<code translate="no">CommonName</code> 。<code translate="no">CommonName</code> 指的是客户端在连接时应指定的服务器名称。</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta">#!/usr/bin/env sh</span>
<span class="hljs-comment"># your variables</span>
Country=<span class="hljs-string">&quot;US&quot;</span>
State=<span class="hljs-string">&quot;CA&quot;</span>
Location=<span class="hljs-string">&quot;Redwood City&quot;</span>
Organization=<span class="hljs-string">&quot;zilliz&quot;</span>
OrganizationUnit=<span class="hljs-string">&quot;devops&quot;</span>
CommonName=<span class="hljs-string">&quot;localhost&quot;</span>
ExpireDays=3650 <span class="hljs-comment"># 10 years</span>

<span class="hljs-comment"># generate private key for ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out ca.key
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

<span class="hljs-comment"># create a new ca certificate</span>
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>

<span class="hljs-comment"># prepare extension config for signing certificates</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;</span><span class="hljs-variable">$CommonName</span> &gt; openssl.cnf

<span class="hljs-comment"># sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<span class="hljs-comment"># sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">gen.sh</code> 文件中的变量对创建证书签名请求文件的过程至关重要。前五个变量是基本的签名信息，包括国家、州、地点、组织、组织单位。在配置<code translate="no">CommonName</code> 时需要谨慎，因为它将在客户端与服务器通信时进行验证。</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">运行<code translate="no">gen.sh</code> 生成证书</h3><p>运行<code translate="no">gen.sh</code> 文件创建证书。</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>将创建以下七个文件：<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code>,<code translate="no">server.key</code>,<code translate="no">server.pem</code>,<code translate="no">client.key</code>,<code translate="no">client.pem</code> 。</p>
<p>请确保<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code> 安全，以便以后更新证书。<code translate="no">server.key</code> 和<code translate="no">server.pem</code> 文件由服务器使用，而<code translate="no">client.key</code> 和<code translate="no">client.pem</code> 文件由客户端使用。</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">更新证书（可选）</h3><p>如果您想在某些情况下更新证书，例如证书即将过期，可以使用以下脚本。</p>
<p>您的工作目录中需要<code translate="no">ca.key</code>,<code translate="no">ca.pem</code>,<code translate="no">ca.srl</code> 。</p>
<p><details><summary><code translate="no">renew.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta">#!/usr/bin/env sh</span>
<span class="hljs-comment"># your variables</span>
Country=<span class="hljs-string">&quot;US&quot;</span>
State=<span class="hljs-string">&quot;CA&quot;</span>
Location=<span class="hljs-string">&quot;Redwood City&quot;</span>
Organization=<span class="hljs-string">&quot;zilliz&quot;</span>
OrganizationUnit=<span class="hljs-string">&quot;devops&quot;</span>
CommonName=<span class="hljs-string">&quot;localhost&quot;</span>
ExpireDays=3650 <span class="hljs-comment"># 10 years</span>

<span class="hljs-comment"># generate private key for ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

<span class="hljs-comment"># prepare extension config for signing certificates</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;</span><span class="hljs-variable">$CommonName</span> &gt; openssl.cnf

<span class="hljs-comment"># sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<span class="hljs-comment"># sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj <span class="hljs-string">&quot;/C=<span class="hljs-variable">$Country</span>/ST=<span class="hljs-variable">$State</span>/L=<span class="hljs-variable">$Location</span>/O=<span class="hljs-variable">$Organization</span>/OU=<span class="hljs-variable">$OrganizationUnit</span>/CN=<span class="hljs-variable">$CommonName</span>&quot;</span>\
  | openssl x509 -req -days <span class="hljs-variable">$ExpireDays</span> -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>运行<code translate="no">renew.sh</code> 文件创建证书。</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">使用 TLS 设置 Milvus 服务器<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>本节概述了使用 TLS 加密配置 Milvus 服务器的步骤。</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">为 Docker Compose 设置</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1.修改 Milvus 服务器配置</h4><p>要启用外部 TLS，请在<code translate="no">milvus.yaml</code> 文件中添加以下配置：</p>
<pre><code translate="no" class="language-yaml">proxy:
  http:
    <span class="hljs-comment"># for now milvus do not support config restful on same port with grpc</span>
    <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
    port: <span class="hljs-number">8080</span> 
tls:
  serverPemPath: /milvus/tls/server.pem
  serverKeyPath: /milvus/tls/server.key
  caPemPath: /milvus/tls/ca.pem

common:
  security:
    tlsMode: <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>参数：</p>
<ul>
<li><code translate="no">serverPemPath</code>:服务器证书文件的路径。</li>
<li><code translate="no">serverKeyPath</code>:服务器密钥文件的路径。</li>
<li><code translate="no">caPemPath</code>:CA 证书文件的路径。</li>
<li><code translate="no">tlsMode</code>:外部服务的 TLS 模式。有效值：<ul>
<li><code translate="no">1</code>:单向验证，即只有服务器需要证书，客户端验证证书。该模式要求服务器端提供<code translate="no">server.pem</code> 和<code translate="no">server.key</code> ，客户端提供<code translate="no">server.pem</code> 。</li>
<li><code translate="no">2</code>:双向验证：服务器和客户端都需要证书才能建立安全连接。这种模式要求服务器端使用<code translate="no">server.pem</code> 、<code translate="no">server.key</code> 和<code translate="no">ca.pem</code> ，客户端使用<code translate="no">client.pem</code> 、<code translate="no">client.key</code> 和<code translate="no">ca.pem</code> 。</li>
</ul></li>
</ul>
<p>要启用内部 TLS，请在<code translate="no">milvus.yaml</code> 文件中添加以下配置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls</span>:
  <span class="hljs-attr">serverPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">pem</span>
  <span class="hljs-attr">serverKeyPath</span>: <span class="hljs-regexp">/milvus/</span>tls/server.<span class="hljs-property">key</span>
  <span class="hljs-attr">caPemPath</span>: <span class="hljs-regexp">/milvus/</span>tls/ca.<span class="hljs-property">pem</span>

<span class="hljs-attr">common</span>:
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">internaltlsEnabled</span>: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>参数：</p>
<ul>
<li><code translate="no">serverPemPath</code>:服务器证书文件的路径。</li>
<li><code translate="no">serverKeyPath</code>:服务器密钥文件的路径。</li>
<li><code translate="no">caPemPath</code>:CA 证书文件的路径。</li>
<li><code translate="no">internaltlsEnabled</code>:是否启用内部 TLS。目前只支持单向 TLS。</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2.将证书文件映射到容器</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">准备证书文件</h5><p>在与<code translate="no">docker-compose.yaml</code> 相同的目录下新建一个名为<code translate="no">tls</code> 的文件夹。将<code translate="no">server.pem</code> 、<code translate="no">server.key</code> 和<code translate="no">ca.pem</code> 复制到<code translate="no">tls</code> 文件夹。将它们放在如下目录结构中：</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
<button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">更新 Docker Compose 配置</h4><p>编辑<code translate="no">docker-compose.yaml</code> 文件，在容器内映射证书文件路径，如下所示：</p>
<pre><code translate="no" class="language-yaml">  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:latest
    <span class="hljs-built_in">command</span>: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    security_opt:
    - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/tls:/milvus/tls
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 部署 Milvus</h5><p>执行以下命令部署 Milvus：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">为 Milvus 操作符进行设置</h3><p>将证书文件放到工作目录中。目录结构应如下所示：</p>
<pre><code translate="no">├── milvus.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>创建一个包含证书文件的密文：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>要启用外部 TLS，请在<code translate="no">milvus.yaml</code> 文件中添加以下配置：</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        tlsMode: <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable</span>
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
  components:
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>要启用内部 TLS，请在<code translate="no">milvus.yaml</code> 文件中添加以下配置：</p>
<p>切记用证书中的 CommonName 替换<code translate="no">internaltls.sni</code> 字段。</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        internaltlsEnabled: true <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost <span class="hljs-comment"># the CommonName in your certificates</span>
  components:
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>创建 Milvus CR：</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">设置为 Milvus Helm</h3><p>将证书文件放入工作目录。目录结构应如下所示：</p>
<pre><code translate="no">├── values.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>创建一个包含证书文件的密文：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">pem</span> --<span class="hljs-keyword">from</span>-file=server.<span class="hljs-property">key</span> --<span class="hljs-keyword">from</span>-file=ca.<span class="hljs-property">pem</span>
<button class="copy-code-btn"></button></code></pre>
<p>要启用外部 TLS，请在<code translate="no">values.yaml</code> 文件中添加以下配置：</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    proxy:
      http:
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        port: <span class="hljs-number">8080</span> 
    common:
      security:
        tlsMode: <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 means set to 2 to enable Mutual TLS</span>
    <span class="hljs-comment"># Configure tls certificates path for external service</span>
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
<span class="hljs-comment"># mount the certs secret to the milvus container</span>
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: true
<button class="copy-code-btn"></button></code></pre>
<p>要启用内部 TLS，请在<code translate="no">values.yaml</code> 文件中添加以下配置：</p>
<p>切记用证书中的 CommonName 替换<code translate="no">internaltls.sni</code> 字段。</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        internaltlsEnabled: <span class="hljs-literal">true</span> <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
<span class="hljs-comment"># mount the certs secret to the milvus container</span>
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>创建 milvus 版本：</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">验证已启用内部 TLS<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>很难直接验证内部 TLS。你可以检查 Milvus 日志，查看内部 TLS 是否已启用。</p>
<p>在 Milvus 日志中，如果启用了内部 TLS，你应该看到以下信息：</p>
<pre><code translate="no">[...<span class="hljs-built_in">date</span> time...] [INFO] [utils/util.go:56] [<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>] [value=<span class="hljs-literal">true</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">使用 TLS 连接到 Milvus 服务器<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 SDK 交互，根据 TLS 模式使用以下设置。</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">单向 TLS 连接</h3><p>提供<code translate="no">server.pem</code> 的路径，并确保<code translate="no">server_name</code> 与证书中配置的<code translate="no">CommonName</code> 匹配。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">双向 TLS 连接</h3><p>提供<code translate="no">client.pem</code> 、<code translate="no">client.key</code> 和<code translate="no">ca.pem</code> 的路径，并确保<code translate="no">server_name</code> 与证书中配置的<code translate="no">CommonName</code> 匹配。</p>
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
<p>更多信息请参阅<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">example_tls1.py</a>和<a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls2.py">example_tls2.</a> <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/example_tls1.py">py</a>。</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">使用 TLS 连接到 Milvus RESTful 服务器<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 RESTful API，可以使用<code translate="no">curl</code> 命令检查 TLS。</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">单向 TLS 连接</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">双向 TLS 连接</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
