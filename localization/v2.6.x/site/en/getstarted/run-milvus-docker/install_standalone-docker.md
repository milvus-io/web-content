---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Learn how to install Milvus standalone with Docker.
title: Run Milvus in Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Run Milvus in Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>This page illustrates how to launch a Milvus instance in Docker.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Install Docker</a>.</li>
<li><a href="/docs/prerequisite-docker.md">Check the requirements for hardware and software</a> prior to your installation.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Install Milvus in Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides an installation script to install it as a docker container. The script is available in the <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus repository</a>. To install Milvus in Docker, just run</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>What’s new in v2.6.2:</strong></p>
<ul>
<li><strong>Streaming Node</strong>: Enhanced data processing capabilities</li>
<li><strong>Woodpecker MQ</strong>: Improved message queue with reduced maintenance overhead, see <a href="/docs/use-woodpecker.md">Use Woodpecker</a> for detail</li>
<li><strong>Optimized Architecture</strong>: Consolidated components for better performance</li>
</ul>
<p>Always download the latest script to ensure you get the most recent configurations and architecture improvements.</p>
<p>If you want to use <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> in standalone deployment mode, it is recommended to use the <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a> deployment method.</p>
<p>If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we’ll provide you with the necessary support.</p>
</div>
<p>After running the installation script:</p>
<ul>
<li>A docker container named milvus has been started at port <strong>19530</strong>.</li>
<li>An embed etcd is installed along with Milvus in the same container and serves at port <strong>2379</strong>. Its configuration file is mapped to <strong>embedEtcd.yaml</strong> in the current folder.</li>
<li>To change the default Milvus configuration, add your settings to the <strong>user.yaml</strong> file in the current folder and then restart the service.</li>
<li>The Milvus data volume is mapped to <strong>volumes/milvus</strong> in the current folder.</li>
</ul>
<p>You can access Milvus WebUI at <code translate="no">http://127.0.0.1:9091/webui/</code> to learn more about the your Milvus instance. For details, refer to <a href="/docs/milvus-webui.md">Milvus WebUI</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Optional) Update Milvus configurations<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>You can modify the Milvus configurations in the <strong>user.yaml</strong> file in the current folder. For example, to change the <code translate="no">proxy.healthCheckTimeout</code> to <code translate="no">1000</code> ms, you can modify the file as follows:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Then restart the service as follows:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>For applicable configuration items, refer to <a href="/docs/system_configuration.md">System Configuration</a>.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Upgrade Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>You can upgrade to the latest version of Milvus using the built-in upgrade command. This automatically downloads the latest configuration and Milvus image:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>The upgrade command automatically:</p>
<ul>
<li>Downloads the latest installation script with updated configurations</li>
<li>Pulls the latest Milvus Docker image</li>
<li>Restarts the container with the new version</li>
<li>Preserves your existing data and configurations</li>
</ul>
<p>This is the recommended way to upgrade your Milvus standalone deployment.</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Stop and delete Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>You can stop and delete this container as follows</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
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
    </button></h2><p>Having installed Milvus in Docker, you can:</p>
<ul>
<li><p>Check <a href="/docs/quickstart.md">Quickstart</a> to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/insert-update-delete.md">Insert, Upsert & Delete</a></li>
<li><a href="/docs/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/upgrade_milvus_cluster-helm.md">Upgrade Milvus Using Helm Chart</a>.</p></li>
<li><p><a href="/docs/scaleout.md">Scale your Milvus cluster</a>.</p></li>
<li><p>Deploy your Milvu cluster on clouds:</p>
<ul>
<li><a href="/docs/eks.md">Amazon EKS</a></li>
<li><a href="/docs/gcp.md">Google Cloud</a></li>
<li><a href="/docs/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/milvus-webui.md">Milvus WebUI</a>, an intuitive web interface for Milvus observability and management.</p></li>
<li><p>Explore <a href="/docs/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
