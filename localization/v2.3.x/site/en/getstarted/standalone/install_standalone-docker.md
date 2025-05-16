---
id: install_standalone-docker.md
label: Docker
related_key: Docker
order: 0
group: install_standalone-docker.md
summary: Learn how to install Milvus standalone with Docker.
title: Install Milvus Standalone with Docker
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/install_standalone-docker.md" class='active '>Docker</a><a href="/docs/v2.3.x/install_standalone-operator.md" class=''>Milvus Operator</a><a href="/docs/v2.3.x/install_standalone-helm.md" class=''>Helm</a><a href="/docs/v2.3.x/install_standalone-aptyum.md" class=''>DEB/RPM</a><a href="/docs/v2.3.x/install_standalone-docker-compose.md" class=''>Docker Compose</a></div>
<h1 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Install Milvus Standalone with Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus standalone using Docker.</p>
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
<li><p><a href="https://docs.docker.com/get-docker/">Install Docker</a>.</p></li>
<li><p><a href="/docs/v2.3.x/prerequisite-helm.md">Check the requirements for hardware and software</a> prior to your installation.</p></li>
</ul>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Install Milvus Standalone with Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
<li>Start Milvus.</li>
</ul>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.3/scripts/standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p>Connect to Milvus
Please refer to <a href="https://milvus.io/docs/example_code.md">Hello Milvus</a>, then run the example code.</p></li>
<li><p>Stop Milvus</p></li>
</ul>
<p>To stop Milvus standalone, run:</p>
<pre><code translate="no">bash standalone_embed.sh stop
<button class="copy-code-btn"></button></code></pre>
<p>To delete data after stopping Milvus, run:</p>
<pre><code translate="no">bash standalone_embed.<span class="hljs-property">sh</span> <span class="hljs-keyword">delete</span>
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
<li><p>Check <a href="/docs/v2.3.x/example_code.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Check <a href="/docs/v2.3.x/index.md">In-memory Index</a> for more about CPU-compatible index types.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.3.x/manage_connection.md">Connect to Milvus server</a></li>
<li><a href="/docs/v2.3.x/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/v2.3.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.3.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.3.x/insert_data.md">Insert data</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
</ul></li>
<li><p>Explore <a href="/docs/v2.3.x/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/v2.3.x/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/v2.3.x/monitor.md">Monitor Milvus with Prometheus</a></p></li>
</ul>
