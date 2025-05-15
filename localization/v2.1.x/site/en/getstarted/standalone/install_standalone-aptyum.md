---
id: install_standalone-aptyum.md
label: APT or YUM
related_key: Install
order: 2
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with APT or YUM.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.1.x/install_standalone-docker.md" class=''>Docker Compose</a><a href="/docs/v2.1.x/install_standalone-helm.md" class=''>Helm</a><a href="/docs/v2.1.x/install_standalone-aptyum.md" class='active '>APT or YUM</a></div>
<h1 id="Install-Milvus-Standalone-with-APTYUM" class="common-anchor-header">Install Milvus Standalone with APT/YUM<button data-href="#Install-Milvus-Standalone-with-APTYUM" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus standalone using package manager APT or YUM on Linux systems.</p>
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
    </button></h2><p>Ensure that your CPU, RAM, and disk meets the requirements in <a href="/docs/v2.1.x/prerequisite-docker.md">Environment Checklist</a> prior to your installation.</p>
<h2 id="Install-Milvus-with-APT-on-Ubuntu" class="common-anchor-header">Install Milvus with APT on Ubuntu<button data-href="#Install-Milvus-with-APT-on-Ubuntu" class="anchor-icon" translate="no">
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
    </button></h2><p>On Ubuntu, you can install Milvus standalone either via Launchpad PPA or directly with a <code translate="no">.deb</code> package.</p>
<h3 id="Install-via-Launchpad-PPA" class="common-anchor-header">Install via Launchpad PPA</h3><p>You can install Milvus standalone via Launchpad PPA (Personal Package Archive). PPA allows you to install packages outside Ubuntu’s official repository with APT.</p>
<div class="alert note">
Currently, the PPA package of Milvus only supports Ubuntu 18.04.
</div>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install software-properties-common
$ <span class="hljs-built_in">sudo</span> add-apt-repository ppa:milvusdb/milvus
$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-with-a-deb-package" class="common-anchor-header">Install with a <code translate="no">.deb</code> package</h3><p>You can also download the <code translate="no">.deb</code> package that Milvus provides and install Milvus standalone.</p>
<pre><code translate="no" class="language-bash">$ wget https://github.com/milvus-io/milvus/releases/download/v2.1.4/milvus_2.1.4-1_amd64.deb
$ <span class="hljs-built_in">sudo</span> apt-get update
$ <span class="hljs-built_in">sudo</span> dpkg -i milvus_2.1.4-1_amd64.deb
$ <span class="hljs-built_in">sudo</span> apt-get -f install
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-YUM-on-CentOS" class="common-anchor-header">Install Milvus with YUM on CentOS<button data-href="#Install-Milvus-with-YUM-on-CentOS" class="anchor-icon" translate="no">
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
    </button></h2><p>On CentOS, you can install Milvus standalone with YUM.</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> yum install https://github.com/milvus-io/milvus/releases/download/v2.1.4/milvus-2.1.4-1.el7.x86_64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-the-status-of-Milvus-and-its-dependencies" class="common-anchor-header">Check the status of Milvus and its dependencies<button data-href="#Check-the-status-of-Milvus-and-its-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>After installation, Milvus standalone and its dependencies (etcd and MinIO) start automatically. You can check their status by:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> systemctl status milvus
$ <span class="hljs-built_in">sudo</span> systemctl status milvus-etcd
$ <span class="hljs-built_in">sudo</span> systemctl status milvus-minio
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Uninstall Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Run the following command to uninstall Milvus.</p>
<pre><code translate="no" class="language-bash">$ sudo apt-<span class="hljs-keyword">get</span> <span class="hljs-keyword">remove</span> milvus
<button class="copy-code-btn"></button></code></pre>
<p>Additionally, remove Milvus from your system’s repository list if you installed via PPA.</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> add-apt-repository --remove ppa:milvusdb/milvus
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
<li><p>Check <a href="/docs/v2.1.x/example_code.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.1.x/manage_connection.md">Connect to Milvus server</a></li>
<li><a href="/docs/v2.1.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.1.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.1.x/insert_data.md">Insert data</a></li>
<li><a href="/docs/v2.1.x/search.md">Conduct a vector search</a></li>
</ul></li>
<li><p>Explore <a href="/docs/v2.1.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed for importing and exporting data in Milvus.</p></li>
<li><p><a href="/docs/v2.1.x/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
