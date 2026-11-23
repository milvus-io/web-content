---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: Learn how to install Milvus standalone with GPU support using Docker Compose.
title: Run Milvus with GPU Support Using Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Run Milvus with GPU Support Using Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>This page illustrates how to start a Milvus instance with GPU support using Docker Compose.</p>
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
<li><a href="/docs/prerequisite-gpu.md">Check the requirements for hardware and software</a> prior to your installation.</li>
</ul>
<div class="alert note">
<p>If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we’ll provide you with the necessary support.</p>
</div>
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
    </button></h2><p>To install Milvus with GPU support using Docker Compose, follow these steps.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Download and configure the YAML file<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Download <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> and save it as docker-compose.yml manually, or with the following command.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>To check the download, compare the output of the following command with the <code translate="no">sha256</code> digest listed for <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> on the <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">release page</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You can change the GPU devices assigned to Milvus in the <code translate="no">deploy</code> section of the <code translate="no">standalone</code> service in the YAML file as follows:</p>
<ul>
<li>To assign a specific GPU device to Milvus, locate the <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> field in the definition of the <code translate="no">standalone</code> service and replace its value with the ID of the desired GPU. You can use the <code translate="no">nvidia-smi</code> tool, included with NVIDIA GPU display drivers, to determine the ID of a GPU device. Milvus supports multiple GPU devices.</li>
</ul>
<p>Assign a single GPU device to Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Assign multiple GPU devices to Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Start Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>In the directory that holds docker-compose.yml, start Milvus by running:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you failed to run the above command, check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on <a href="https://docs.docker.com/compose/">this page</a>.</p>
</div>
<p>After starting up Milvus,</p>
<ul>
<li>Containers named <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, and <strong>milvus-etcd</strong> are up.
<ul>
<li>The <strong>milvus-etcd</strong> container does not expose any ports to the host and maps its data to <strong>volumes/etcd</strong> in the current folder.</li>
<li>The <strong>milvus-minio</strong> container serves ports <strong>9000</strong> and <strong>9001</strong> with the default authentication credentials and maps its data to <strong>volumes/minio</strong> in the current folder.</li>
<li>The <strong>milvus-standalone</strong> container serves ports <strong>19530</strong> and <strong>9091</strong> with the default settings and maps its data to <strong>volumes/milvus</strong> in the current folder.</li>
</ul></li>
</ul>
<p>The <code translate="no">standalone</code> service sets <code translate="no">security_opt: seccomp:unconfined</code>, so the Milvus container runs without the default Docker seccomp profile.</p>
<div class="alert warning">
<blockquote>
<p>The Compose file publishes these ports without a host IP, so Docker binds them to all network interfaces of the host, and other machines that can reach this host can connect to Milvus and MinIO. MinIO uses the access key and secret key <code translate="no">minioadmin</code>, which are set in the Compose file. To publish the ports on the loopback address only, add <code translate="no">127.0.0.1:</code> to the <code translate="no">ports</code> entries of the <code translate="no">minio</code> and <code translate="no">standalone</code> services in <code translate="no">docker-compose.yml</code>, for example <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, and run <code translate="no">sudo docker compose up -d</code> again. For details, see <a href="https://docs.docker.com/engine/network/port-publishing/">Port publishing and mapping</a>. To use other MinIO credentials, change <code translate="no">MINIO_ACCESS_KEY</code> and <code translate="no">MINIO_SECRET_KEY</code> of the <code translate="no">minio</code> service, and set the same values in <code translate="no">minio.accessKeyID</code> and <code translate="no">minio.secretAccessKey</code> of the Milvus configuration. To require a user name and password for client connections to Milvus, see <a href="/docs/authenticate.md">Authenticate User Access</a>.</p>
</blockquote>
</div>
<p>You can check if the containers are up and running using the following command:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>By default, the command lists only running containers. Check that the output lists the <strong>milvus-etcd</strong>, <strong>milvus-minio</strong>, and <strong>milvus-standalone</strong> containers, and that the <code translate="no">STATUS</code> column of each of them starts with <code translate="no">Up</code>.</p>
<p>You can also access Milvus WebUI at <code translate="no">http://127.0.0.1:9091/webui/</code> to learn more about the your Milvus instance. For details, refer to <a href="/docs/milvus-webui.md">Milvus WebUI</a>.</p>
<p>To change the GPU devices that Milvus uses after it has started, edit the <code translate="no">device_ids</code> field under <code translate="no">deploy.resources.reservations.devices</code> of the <code translate="no">standalone</code> service in docker-compose.yml as shown in step 1, and then run the following command. Because the service configuration has changed, <code translate="no">docker compose up</code> stops and recreates the <strong>milvus-standalone</strong> container. For details, see <a href="https://docs.docker.com/compose/how-tos/gpu-support/">Run Docker Compose services with GPU access</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>You can stop and delete this container as follows.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configure memory pool<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>After Milvus is up and running, you can customize the memory pool by changing the <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> settings in the <code translate="no">gpu</code> section of the Milvus configuration.</p>
<div class="alert note">
<p>The <code translate="no">milvus.yaml</code> file is located in the <code translate="no">/milvus/configs/</code> directory inside the Milvus container. Settings in a <code translate="no">user.yaml</code> file in the same directory override the values in <code translate="no">milvus.yaml</code>.</p>
</div>
<p>To keep your settings when the container is recreated, store them in a <code translate="no">user.yaml</code> file on the host and mount the file into the container as follows.</p>
<ol>
<li><p>In the directory that holds docker-compose.yml, create a file named <code translate="no">user.yaml</code> with the settings you want to change. The following example shows the <code translate="no">gpu</code> section with its default values. Replace them with the sizes you need:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Initial size of the memory pool, in MB. Defaults to 2048.</li>
<li><code translate="no">maxMemSize</code>: Maximum size of the memory pool, in MB. Defaults to 4096.</li>
</ul></li>
<li><p>In docker-compose.yml, add the <code translate="no">user.yaml</code> file to the <code translate="no">volumes</code> list of the <code translate="no">standalone</code> service:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Recreate the Milvus container to apply the changes:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>After the file is mounted, restart the <code translate="no">standalone</code> service to apply later changes to <code translate="no">user.yaml</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Check <a href="/docs/milvus-webui.md">Milvus WebUI</a> to learn more about the Milvus instance.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/insert-update-delete.md">Insert, Upsert & Delete</a></li>
<li><a href="/docs/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/upgrade_milvus_standalone-docker.md">Upgrade Milvus Standalone with Docker Compose</a>. That page shows the CPU image tag. For this GPU deployment, keep the <code translate="no">-gpu</code> suffix (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) and keep your <code translate="no">deploy</code> and <code translate="no">user.yaml</code> settings.</p></li>
<li><p><a href="/docs/scaleout.md">Scale a Milvus cluster</a> on Kubernetes. That procedure uses Helm and does not apply to this Docker deployment.</p></li>
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
