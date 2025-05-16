---
id: install_cluster-docker.md
label: Docker Compose
related_key: Docker
order: 0
group: install_cluster-docker.md
summary: Learn how to install Milvus cluster with Docker Compose.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.0.x/install_cluster-docker.md" class='active '>Docker Compose</a><a href="/docs/v2.0.x/install_cluster-helm.md" class=''>Helm</a><a href="/docs/v2.0.x/install_cluster-milvusoperator.md" class=''>Milvus Operator</a><a href="/docs/v2.0.x/install_cluster-ansible.md" class=''>Ansible</a></div>
<h1 id="Install-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Install Milvus Cluster with Docker Compose<button data-href="#Install-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces how to deploy a Milvus cluster with Docker Compose.</p>
<div class="alert note">
Docker Compose cannot deploy Milvus distributed clusters across machines, and can only be used in test environments. It is not recommended that you deploy Milvus distributed clusters in this way in production environments.
</div>
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
    </button></h2><p><a href="/docs/v2.0.x/prerequisite-docker.md">Check the requirements for hardware and software</a> prior to your installation.</p>
<h2 id="Download-an-installation-file" class="common-anchor-header">Download an installation file<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-cluster-docker-compose.yml">Download</a> <code translate="no">milvus-cluster-docker-compose.yml</code> directly or with the following command, and save it as <code translate="no">docker-compose.yml</code>.</p>
<pre><code translate="no">$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-cluster-docker-compose.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Start Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-Shell">$ <span class="hljs-built_in">sudo</span> docker-compose up -d
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Text">Docker Compose is now <span class="hljs-keyword">in</span> the Docker CLI, try `docker compose up`
Creating milvus-etcd   ... <span class="hljs-keyword">done</span>
Creating milvus-minio  ... <span class="hljs-keyword">done</span>
Creating milvus-pulsar ... <span class="hljs-keyword">done</span>
Creating milvus-proxy      ... <span class="hljs-keyword">done</span>
Creating milvus-rootcoord  ... <span class="hljs-keyword">done</span>
Creating milvus-indexcoord ... <span class="hljs-keyword">done</span>
Creating milvus-querycoord ... <span class="hljs-keyword">done</span>
Creating milvus-datacoord  ... <span class="hljs-keyword">done</span>
Creating milvus-querynode  ... <span class="hljs-keyword">done</span>
Creating milvus-indexnode  ... <span class="hljs-keyword">done</span>
Creating milvus-datanode   ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<p>Check the status of the containers.</p>
<pre><code translate="no">$ <span class="hljs-built_in">sudo</span> docker ps
<button class="copy-code-btn"></button></code></pre>
<p>After Milvus cluster starts, 11 running docker containers appear including three dependencies and eight Milvus services.</p>
<pre><code translate="no">      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-datacoord    /tini -- milvus run datacoord    Up
milvus-datanode     /tini -- milvus run datanode     Up
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-indexcoord   /tini -- milvus run indexcoord   Up
milvus-indexnode    /tini -- milvus run indexnode    Up
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-proxy        /tini -- milvus run proxy        Up             0.0.0.0:19530-&gt;19530/tcp,:::19530-&gt;19530/tcp
milvus-pulsar       bin/pulsar standalone            Up
milvus-querycoord   /tini -- milvus run querycoord   Up
milvus-querynode    /tini -- milvus run querynode    Up
milvus-rootcoord    /tini -- milvus run rootcoord    Up
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>To stop Milvus cluster, run <code translate="no">$ sudo docker-compose down</code>.</p>
<p>To delete data after stopping Milvus, run <code translate="no">$ sudo rm -rf  volumes</code>.</p>
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
<li><p>Check <a href="/docs/v2.0.x/example_code.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.0.x/manage_connection.md">Connect to Milvus server</a></li>
<li><a href="/docs/v2.0.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.0.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.0.x/insert_data.md">Insert data</a></li>
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
</ul></li>
<li><p>Explore <a href="/docs/v2.0.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed for importing and exporting data in Milvus.</p></li>
<li><p><a href="/docs/v2.0.x/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
