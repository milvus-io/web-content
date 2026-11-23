---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Learn how to install Milvus standalone with Docker Compose.
title: Run Milvus with Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Run Milvus with Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>This page illustrates how to launch a Milvus instance in Docker using Docker Compose.</p>
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
<li>Install the <a href="https://docs.docker.com/compose/install/linux/">Docker Compose plugin</a> (V2 or later) and verify it with <code translate="no">docker compose version</code>. These instructions use <code translate="no">docker compose</code>, not the legacy <code translate="no">docker-compose</code> V1 command.</li>
<li><a href="/docs/prerequisite-docker.md">Check the requirements for hardware and software</a> prior to your installation.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Install Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides a Docker Compose configuration file in the Milvus repository. Download the configuration for v3.0.5 with the <code translate="no">wget</code> command below. Right after the download, before you edit the file or start Milvus with <code translate="no">sudo docker compose up -d</code>, run <code translate="no">sha256sum docker-compose.yaml</code> and compare the result with the <code translate="no">sha256</code> digest listed for <code translate="no">milvus-standalone-docker-compose.yaml</code> on the <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5 release page</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Default deployment (v3.0.5):</strong> <code translate="no">docker compose up -d</code> starts three long-running containers — <code translate="no">milvus-etcd</code> (metadata), <code translate="no">milvus-minio</code> (object storage), and <code translate="no">milvus-standalone</code>. The message queue is <strong>Woodpecker (embedded, with MinIO / object storage as its WAL backend)</strong>, so no separate message-queue container is required.</p>
<p>The configuration also runs the one-shot <code translate="no">milvus-volume-init</code> service to prepare data-directory ownership. It exits after completing that task.</p>
<p><strong>Message-queue default by version:</strong></p>
<ul>
<li><strong>2.5.x</strong> — default message queue is <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x and later</strong> — default message queue is <strong>Woodpecker (embedded)</strong>.</li>
</ul>
<p>Use the configuration attached to the release you intend to install. For an existing deployment, follow the upgrade instructions instead of replacing its configuration with a new-installation file.</p>
<ul>
<li><p>If <code translate="no">docker compose</code> is unavailable, install the Compose plugin using the <a href="https://docs.docker.com/compose/install/linux/">Docker instructions</a>.</p></li>
<li><p>If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we’ll provide you with the necessary support.</p></li>
</ul>
</div>
<p>After starting up Milvus,</p>
<ul>
<li>Containers named <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, and <strong>milvus-etcd</strong> are up.
<ul>
<li>The <strong>milvus-etcd</strong> container does not expose any ports to the host and maps its data to <strong>volumes/etcd</strong> in the current folder.</li>
<li>The <strong>milvus-minio</strong> container publishes ports <strong>9000</strong> and <strong>9001</strong> with the default authentication credentials and maps its data to <strong>volumes/minio</strong> in the current folder.</li>
<li>The <strong>milvus-standalone</strong> container publishes ports <strong>19530</strong> and <strong>9091</strong> with the default settings and maps its data to <strong>volumes/milvus</strong> in the current folder.</li>
</ul></li>
</ul>
<p>The <code translate="no">standalone</code> service sets <code translate="no">security_opt: seccomp:unconfined</code>, so the Milvus container runs without the default Docker seccomp profile.</p>
<div class="alert warning">
<blockquote>
<p>The configuration file publishes these ports without a host address. Docker publishes a port without a host address on all host addresses, so other machines that can reach this host can also connect to Milvus and MinIO. MinIO uses the access key and secret key <code translate="no">minioadmin</code>, which are set in the configuration file. To limit access to this host, add <code translate="no">127.0.0.1:</code> to the <code translate="no">ports</code> entries of the <code translate="no">minio</code> and <code translate="no">standalone</code> services in <code translate="no">docker-compose.yaml</code>, for example <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, and run <code translate="no">sudo docker compose up -d</code> again. To use other MinIO credentials, change <code translate="no">MINIO_ACCESS_KEY</code> and <code translate="no">MINIO_SECRET_KEY</code> of the <code translate="no">minio</code> service, and set the same values in <code translate="no">minio.accessKeyID</code> and <code translate="no">minio.secretAccessKey</code> of the Milvus configuration. To require credentials for Milvus connections, see <a href="/docs/authenticate.md">Authenticate User Access</a>.</p>
</blockquote>
</div>
<p>You can check if the containers are up and running using the following command:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">PORTS</code> column can also list each published port with the IPv6 address <code translate="no">[::]</code>, for example <code translate="no">[::]:19530-&gt;19530/tcp</code>, because Docker publishes a port without a host address on both <code translate="no">0.0.0.0</code> and <code translate="no">[::]</code>.</p>
<p>You can also access Milvus WebUI at <code translate="no">http://127.0.0.1:9091/webui/</code> to learn more about the your Milvus instance. For details, refer to <a href="/docs/milvus-webui.md">Milvus WebUI</a>.</p>
<p>To try the running server, follow the <strong>Use an existing Milvus server</strong> path in <a href="/docs/quickstart.md">Quickstart</a> and connect to <code translate="no">http://localhost:19530</code>. Do not use the local <code translate="no">.db</code> connection block, which starts a separate Milvus Lite database.</p>
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
    </button></h2><p>To update Milvus configuration to suit your needs, put your settings in a <code translate="no">user.yaml</code> file on the host and mount it at <code translate="no">/milvus/configs/user.yaml</code> in the <code translate="no">milvus-standalone</code> container. The configuration file mounts only <code translate="no">/var/lib/milvus</code> into this container, so a <code translate="no">user.yaml</code> that you edit inside the container is lost when Compose recreates the container, for example after a change to <code translate="no">docker-compose.yaml</code> or to the Milvus image.</p>
<ol>
<li><p>Create <code translate="no">user.yaml</code> in the folder that contains <code translate="no">docker-compose.yaml</code>. Create the file before you mount it: if the source path does not exist, Compose creates a directory with that name instead.
The following assumes that you need to override the default <code translate="no">proxy.healthCheckTimeout</code>. For applicable configuration items, refer to <a href="/docs/system_configuration.md">System Configuration</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>In <code translate="no">docker-compose.yaml</code>, add the file to the <code translate="no">volumes</code> list of the <code translate="no">standalone</code> service. Keep the other settings of the service, such as <code translate="no">security_opt</code>, <code translate="no">healthcheck</code>, and <code translate="no">depends_on</code>, as they are.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Apply the change. Because the service configuration changed, Compose recreates the <code translate="no">milvus-standalone</code> container and keeps the data in its mounted volumes.</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>After the file is mounted, restart the <code translate="no">standalone</code> service to apply later changes to <code translate="no">user.yaml</code>:</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Upgrade an existing deployment<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>For a Milvus 2.6.x standalone deployment, follow <a href="/docs/upgrade_milvus_standalone-docker.md">Upgrade Milvus Standalone with Docker Compose</a>. Back up metadata and persistent data, preserve the existing dependencies and configuration, and validate the documented source-to-target upgrade path before changing the Milvus image. Do not replace an older deployment’s Compose file with the new-installation configuration above.</p>
<p><strong>Message Queue limitations</strong>: When upgrading to Milvus v3.0.5, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.</p>
<p>Milvus 2.6.x and later default to Woodpecker, while 2.5.x deployments default to <strong>RocksMQ</strong>. If the deployment you are upgrading still runs RocksMQ, pin it in <code translate="no">user.yaml</code> before changing the Milvus image, so the upgraded instance keeps its existing message queue instead of starting with the new default:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>After the upgraded instance is running on v3.0.5, you can move from RocksMQ to Woodpecker with <a href="/docs/switch-mq-type.md">Switch Message Queue</a>, which is available in Milvus 3.0 and later.</p>
<h2 id="Optional-dependencies" class="common-anchor-header">Optional dependencies<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>This deployment runs <strong>Woodpecker</strong> (embedded, MinIO WAL backend) for messaging, <strong>etcd</strong> for metadata, and <strong>MinIO</strong> for object storage. To use a different message queue or connect external object storage / metadata, see:</p>
<ul>
<li>Message queue: <a href="/docs/woodpecker.md">Woodpecker</a> (default) · <a href="/docs/mq_pulsar.md">Pulsar</a> · <a href="/docs/mq_kafka.md">Kafka</a> · <a href="/docs/mq_rocksmq.md">RocksMQ</a></li>
<li>Object storage: <a href="/docs/deploy_s3.md">MinIO</a> (default) · <a href="/docs/deploy_s3.md">AWS S3</a> · <a href="/docs/abs.md">Azure Blob</a> · <a href="/docs/gcs.md">GCP Cloud Storage</a> · <a href="/docs/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/deploy_s3.md">Tencent COS</a> · <a href="/docs/deploy_s3.md">Huawei OBS</a> · <a href="/docs/deploy_s3.md">S3-compatible</a></li>
<li>Metadata: <a href="/docs/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 is disabled by default. Enable it before using features that depend on it. For requirements and compatibility considerations, see <a href="/docs/storage-v3.md">Storage V3</a>.</p>
</div>
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
<li><p><a href="/docs/upgrade_milvus_standalone-docker.md">Upgrade Milvus Standalone with Docker Compose</a>.</p></li>
<li><p><a href="/docs/scaleout.md">Scale a Milvus cluster</a> on Kubernetes. That procedure uses Helm and does not apply to this Docker deployment.</p></li>
<li><p>Deploy your Milvus cluster on clouds:</p>
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
