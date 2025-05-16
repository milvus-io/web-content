---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
order: 4
group: install_standalone-docker.md
summary: Learn how to install Milvus standalone with Docker Compose.
title: Install Milvus Standalone with Docker Compose
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/install_standalone-docker.md" class=''>Docker</a><a href="/docs/v2.3.x/install_standalone-operator.md" class=''>Milvus Operator</a><a href="/docs/v2.3.x/install_standalone-helm.md" class=''>Helm</a><a href="/docs/v2.3.x/install_standalone-aptyum.md" class=''>DEB/RPM</a><a href="/docs/v2.3.x/install_standalone-docker-compose.md" class='active '>Docker Compose</a></div>
<h1 id="Install-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Install Milvus Standalone with Docker Compose<button data-href="#Install-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus standalone with Docker Compose.</p>
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
<li><p>Check whether <a href="https://docs.docker.com/compose/install/">Docker and Docker Compose</a> are installed on your machine.</p></li>
<li><p>Check <a href="/docs/v2.3.x/prerequisite-docker.md">the requirements</a> for hardware and software requirements before installing Milvus.</p>
<ul>
<li>For the users using MacOS 10.14 or later, set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, the installation might fail.</li>
</ul></li>
</ul>
<h2 id="Procedure" class="common-anchor-header">Procedure<button data-href="#Procedure" class="anchor-icon" translate="no">
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
    </button></h2><p>To install Milvus standalone with Docker Compose, follow these steps:</p>
<h3 id="Download-the-YAML-file" class="common-anchor-header">Download the <code translate="no">YAML</code> file</h3><p><a href="https://github.com/milvus-io/milvus/releases/download/v2.3.21/milvus-standalone-docker-compose.yml">Download</a> <code translate="no">milvus-standalone-docker-compose.yml</code> and save it as <code translate="no">docker-compose.yml</code> manually, or with the following command.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.21/milvus-standalone-docker-compose.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Start Milvus</h3><p>In the directory that holds <code translate="no">docker-compose.yml</code>, start Milvus by running:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you failed to run the above command, please check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on <a href="https://docs.docker.com/compose/">this page</a>.</p>
</div>
<pre><code translate="no" class="language-text">Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-Installation" class="common-anchor-header">Verify the Installation<button data-href="#Verify-the-Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Now check if the containers are up and running.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>After Milvus standalone starts, there will be three docker containers running, including the Milvus standalone service and its two dependencies.</p>
<pre><code translate="no">      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Connect to Milvus</h3><p>Verify which local port the Milvus server is listening on. Replace the container name with your own.</p>
<pre><code translate="no" class="language-bash">$ docker port milvus-standalone 19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Please refer to <a href="https://milvus.io/docs/example_code.md">Hello Milvus</a>, then run the example code.</p>
<h2 id="Stop-Milvus" class="common-anchor-header">Stop Milvus<button data-href="#Stop-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>To stop Milvus standalone, run:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>To delete data after stopping Milvus, run:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf  volumes
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Having installed Milvus, you can:</p>
<ul>
<li>Check <a href="/docs/v2.3.x/example_code.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</li>
<li>Check <a href="/docs/v2.3.x/index.md">In-memory Index</a> for more about CPU-compatible index types.</li>
<li>Learn the basic operations of Milvus:
<ul>
<li><a href="/docs/v2.3.x/manage_connection.md">Connect to Milvus server</a></li>
<li><a href="/docs/v2.3.x/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/v2.3.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.3.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.3.x/insert_data.md">Insert data</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
</ul></li>
<li>Explore <a href="/docs/v2.3.x/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</li>
<li>Explore <a href="/docs/v2.3.x/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</li>
<li>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, an open-source GUI tool for intuitive Milvus management.</li>
<li><a href="/docs/v2.3.x/monitor.md">Monitor Milvus with Prometheus</a></li>
</ul>
