---
id: attu_install-docker.md
label: Install with Docker Compose
order: 0
group: attu_install-docker.md
related_key: attu
summary: Learn how to install Attu with Docker Compose to manage your Milvus service.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.2.x/attu_install-docker.md" class='active '>Install with Docker Compose</a><a href="/docs/v2.2.x/attu_install-helm.md" class=''>Install with Helm Chart</a><a href="/docs/v2.2.x/attu_install-package.md" class=''>Install with Package</a></div>
<h1 id="Install-Attu-with-Docker" class="common-anchor-header">Install Attu with Docker<button data-href="#Install-Attu-with-Docker" class="anchor-icon" translate="no">
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
    </button></h1><p>Attu is an efficient open-source management tool for Milvus. This topic describes how to install Attu with Docker Compose, an efficient open-source management tool for Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus installed on <a href="/docs/v2.2.x/install_standalone-docker.md">your local device</a>.</li>
<li>Docker 19.03 or later</li>
<li>Milvus 2.1.0 or later</li>
</ul>
<div class="alert note">
See <a href="https://milvus.io/docs/v2.0.x/attu_install-docker.md">v2.0.x Attu doc</a> if you are using Milvus 2.0.x.
</div>
<h2 id="Milvus-to-Attu-Version-Mapping" class="common-anchor-header">Milvus to Attu Version Mapping<button data-href="#Milvus-to-Attu-Version-Mapping" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Milvus Version</th><th>Recommended Attu Image Version</th></tr>
</thead>
<tbody>
<tr><td>v2.0.x</td><td>v2.0.5</td></tr>
<tr><td>v2.1.x</td><td>v2.1.5</td></tr>
<tr><td>v2.2.x</td><td>v2.2.8</td></tr>
</tbody>
</table>
<h2 id="Start-an-Attu-instance" class="common-anchor-header">Start an Attu instance<button data-href="#Start-an-Attu-instance" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-Apache">docker run -p 8000:3000  -e MILVUS_URL={your machine IP}:19530 zilliz/attu:v2.2.8
<button class="copy-code-btn"></button></code></pre>
<p>Once you start the docker, visit <code translate="no">http://{ your machine IP }:8000</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.
And we alsow support TLS connection, username and password.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_install.png" alt="Attu_install" class="doc-image" id="attu_install" />
    <span>Attu_install</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_install_user_pwd.png" alt="Attu_Login_user_pwd" class="doc-image" id="attu_login_user_pwd" />
    <span>Attu_Login_user_pwd</span>
  </span>
</p>
<h1 id="Install-Milvus-Standalone-and-Attu-with-Docker-Compose" class="common-anchor-header">Install Milvus Standalone and Attu with Docker Compose<button data-href="#Install-Milvus-Standalone-and-Attu-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/milvus-io/milvus/releases/download/v2.2.16/milvus-standalone-docker-compose.yml">Download</a> <code translate="no">milvus-standalone-docker-compose.yml</code> and save it as <code translate="no">docker-compose.yml</code> manually, or with the following command.</p>
<pre><code translate="no">$ wget https://github.com/milvus-io/milvus/releases/download/v2.2.16/milvus-standalone-docker-compose.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>Edit the downloaded <code translate="no">docker-compose.yml</code> file using your favorite text editor and add the following to the services block:</p>
<pre><code translate="no">  attu:
    container_name: attu
    image: zilliz/attu:v2.2.8
    environment:
      MILVUS_URL: milvus-standalone:19530
    ports:
      - <span class="hljs-string">&quot;8000:3000&quot;</span>
    depends_on:
      - <span class="hljs-string">&quot;standalone&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In the same directory as the <code translate="no">docker-compose.yml</code> file, start up Milvus and Attu by running:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose up -d
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
If your system has Docker Compose V2 installed instead of V1, use <code translate="no"> docker compose </code> instead of <code translate="no"> docker-compose </code>. Check if this is the case with <code translate="no"> $ docker compose version </code>. Read <a href="https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command"> here </a> for more information.
</div>
<pre><code translate="no" class="language-text">Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
Creating attu ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<p>Now check if the containers are up and running.</p>
<pre><code translate="no">$ <span class="hljs-built_in">sudo</span> docker-compose ps
<button class="copy-code-btn"></button></code></pre>
<p>After Milvus standalone starts, there will be three docker containers running, including the Milvus standalone service and its two dependencies.</p>
<pre><code translate="no">      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
attu                /usr/bin/docker-entrypoint ...   Up             0.0.0.0:8000-&gt;3000/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Visit <code translate="no">http://{ your machine IP }:8000</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.
And we alsow support TLS connection, username and password.</p>
<h2 id="Contribution" class="common-anchor-header">Contribution<button data-href="#Contribution" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu is an open-source project. All contributions are welcome. Please read our <a href="https://github.com/zilliztech/attu">Contribute guide</a> before making contributions.</p>
<p>If you find a bug or want to request a new feature, please create a <a href="https://github.com/zilliztech/attu">GitHub Issue</a>, and make sure that the same issue has not been created by someone else.</p>
