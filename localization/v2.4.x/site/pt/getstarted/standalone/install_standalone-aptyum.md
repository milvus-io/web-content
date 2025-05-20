---
id: install_standalone-aptyum.md
label: DEB/RPM
related_key: Install
order: 3
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with dpkg/yum.
title: Install Milvus Standalone with dpkg/yum
deprecate: true
---

<div class="tab-wrapper"><a href="/docs/pt/v2.4.x/install_standalone-operator.md" class=''>Milvus Operator</a><a href="/docs/pt/v2.4.x/install_standalone-helm.md" class=''>Helm</a><a href="/docs/pt/v2.4.x/install_standalone-aptyum.md" class='active '>DEB/RPM</a></div>
<h1 id="Install-Milvus-Standalone-with-dpkgyum" class="common-anchor-header">Install Milvus Standalone with dpkg/yum<button data-href="#Install-Milvus-Standalone-with-dpkgyum" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus standalone using package manager dpkg or yum on Linux systems.</p>
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
    </button></h2><p>Check <a href="/docs/pt/v2.4.x/prerequisite-docker.md">the requirements</a> for hardware and software prior to your installation.</p>
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
    </button></h2><h3 id="Install-Milvus-with-dpkg-on-Ubuntu" class="common-anchor-header">Install Milvus with dpkg on Ubuntu</h3><pre><code translate="no" class="language-bash">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.1/milvus_2.4.1-1_amd64.deb
$ <span class="hljs-built_in">sudo</span> apt-get update
$ <span class="hljs-built_in">sudo</span> dpkg -i milvus_2.4.1-1_amd64.deb
$ <span class="hljs-built_in">sudo</span> apt-get -f install
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Milvus-with-yum-on-RedHat9" class="common-anchor-header">Install Milvus with yum on RedHat9</h3><pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> yum install -y https://github.com/milvus-io/milvus/releases/download/v2.4.1/milvus-2.4.1-1.el9.x86_64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-the-status-of-Milvus" class="common-anchor-header">Check the status of Milvus<button data-href="#Check-the-status-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> systemctl restart milvus
$ <span class="hljs-built_in">sudo</span> systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-Milvus" class="common-anchor-header">Connect to Milvus<button data-href="#Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Please refer to <a href="https://milvus.io/docs/example_code.md">Hello Milvus</a>, then run the example code.</p>
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
    </button></h2><h3 id="Uninstall-Milvus-on-Ubuntu" class="common-anchor-header">Uninstall Milvus on Ubuntu</h3><pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> dpkg -P milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall-Milvus-on-RedHat9" class="common-anchor-header">Uninstall Milvus on RedHat9</h3><pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> yum remove -y milvus
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
<li><p>Check <a href="/docs/pt/v2.4.x/quickstart.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Check <a href="/docs/pt/v2.4.x/index.md">In-memory Index</a> for more about CPU-compatible index types.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/manage_databases.md">Manage Databases</a></li>
<li><a href="/docs/pt/v2.4.x/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/pt/v2.4.x/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/pt/v2.4.x/insert-update-delete.md">Insert, Upsert &amp; Delete</a></li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, an open-source tool for Milvus data backups.</p></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, an open-source tool for debugging Milvus and dynamic configuration updates.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, an open-source GUI tool for intuitive Milvus management.</p></li>
<li><p><a href="/docs/pt/v2.4.x/monitor.md">Monitor Milvus with Prometheus</a></p></li>
</ul>
