---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
order: 1
group: install_standalone-helm-gpu.md
summary: Learn how to install Milvus Cluster with Docker Compose.
title: Install Milvus Cluster with Docker Compose
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/install_standalone-helm-gpu.md" class=''>Standalone (Helm)</a><a href="/docs/v2.3.x/install_standalone-docker-compose-gpu.md" class='active '>Standalone (Docker Compose)</a><a href="/docs/v2.3.x/install_cluster-helm-gpu.md" class=''>Cluster (Helm)</a></div>
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
    </button></h1><p>This topic describes how to install a Milvus cluster with GPU support using Docker Compose.</p>
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
    </button></h2><p>Before installing Milvus with GPU support, make sure you have the following prerequisites:</p>
<ul>
<li><p>The compute capability of your GPU device is 7.0、7.5、8.0、8.6、8.9、9.0. To check whether your GPU device suffices the requirement, check <a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capability</a> on the NVIDIA developer website.</p></li>
<li><p>You have installed the NVIDIA driver for your GPU device on one of <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">the supported Linux distributions</a> and then the NVIDIA Container Toolkit following <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">this guide</a>.</p>
<p>For Ubuntu 22.04 users, you can install the driver and the container toolkit with the following commands:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>For other OS users, please refer to the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">official installation guide</a>.</p>
<p>You can check whether the driver has been installed correctly by running the following command:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">535.161</span><span class="hljs-number">.07</span>
<button class="copy-code-btn"></button></code></pre>
<p>You are recommended to use the drivers of version 535 and above.</p></li>
<li><p>You have installed a Kubernetes cluster, and the <code translate="no">kubectl</code> command-line tool has been configured to communicate with your cluster. It is recommended to run this tutorial on a cluster with at least two nodes that are not acting as control plane hosts.</p></li>
<li><p>You have installed Docker and Docker Compose on your local machine.</p></li>
<li><p>Check <a href="/docs/v2.3.x/prerequisite-docker.md">the requirements</a> for hardware and software requirements before installing Milvus.</p>
<ul>
<li>For the users using MacOS 10.14 or later, set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, the installation might fail.</li>
</ul></li>
</ul>
<h2 id="Install-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Install Milvus Standalone with Docker Compose<button data-href="#Install-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
<h3 id="Download-and-configure-the-YAML-file" class="common-anchor-header">Download and configure the <code translate="no">YAML</code> file</h3><p><a href="https://github.com/milvus-io/milvus/releases/download/v2.3.21/milvus-standalone-docker-compose-gpu.yml">Download</a> <code translate="no">milvus-standalone-docker-compose-gpu.yml</code> and save it as <code translate="no">docker-compose.yml</code> manually, or with the following command.</p>
<pre><code translate="no">$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.21/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>You need to make some changes to the environment variables of the standalone service in the YAML file as follows:</p>
<ul>
<li>To assign a specific GPU device to Milvus, locate the <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> field in the definition of the <code translate="no">standalone</code> service and replace its value with the ID of the desired GPU. You can use the <code translate="no">nvidia-smi</code> tool, included with NVIDIA GPU display drivers, to determine the ID of a GPU device. Milvus supports multiple GPU devices.</li>
</ul>
<p>Assign a single GPU device to Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Assign multiple GPU devices to Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
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
<p>Now check if the containers are up and running.</p>
<pre><code translate="no">$ <span class="hljs-built_in">sudo</span> docker compose ps
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
    </button></h2><p>After Milvus standalone starts, there will be three docker containers running, including the Milvus standalone service and its two dependencies.</p>
<pre><code translate="no">      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>If you have assigned multiple GPU devices to Milvus in <code translate="no">docker-compose.yml</code>, you can specify which GPU device is visible or available for use.</p>
<p>Make GPU device <code translate="no">0</code> visible to Milvus:</p>
<pre><code translate="no" class="language-shell">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Make GPU devices <code translate="no">0</code> and <code translate="no">1</code> visible to Milvus:</p>
<pre><code translate="no" class="language-shell">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Connect to Milvus</h3><p>Verify which local port the Milvus server is listening on. Replace the container name with your own.</p>
<pre><code translate="no" class="language-bash">$ docker port milvus-standalone 19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Please refer to <a href="https://milvus.io/docs/example_code.md">Hello Milvus</a>, then run the example code.</p>
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
    </button></h2><p>After Milvus is up and running, you can customize the memory pool by modifying the <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> settings in the <code translate="no">milvus.yaml</code> file.</p>
<div class="alert note">
<p>The <code translate="no">milvus.yaml</code> file is located in the <code translate="no">/milvus/configs/</code> directory inside the Milvus container.</p>
</div>
<p>To confgiure the memory pool, modify the <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> settings in the <code translate="no">milvus.yaml</code> file as follows.</p>
<ol>
<li><p>Use the following command to copy <code translate="no">milvus.yaml</code> from the Milvus container to your local machine. Replace <code translate="no">&lt;milvus_container_id&gt;</code> with your actual Milvus container ID.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Open the copied <code translate="no">milvus.yaml</code> file with your preferred text editor. For example, using vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit the <code translate="no">initMemSize</code> and <code translate="no">maxMemSize</code> settings as needed and save your changes:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Initial size of the memory pool. Defaults to 1024.</li>
<li><code translate="no">maxMemSize</code>: Maximum size of the memory pool. Defaults to 2048.</li>
</ul></li>
<li><p>Use the following command to copy the modified <code translate="no">milvus.yaml</code> file back to the Milvus container. Replace <code translate="no">&lt;milvus_container_id&gt;</code> with your actual Milvus container ID.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Restart the Milvus container to apply the changes:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
