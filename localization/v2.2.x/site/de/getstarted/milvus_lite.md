---
id: milvus_lite.md
related_key: installation
title: Milvus Lite
summary: 'Learn how to install, configure, and use Milvus Lite.'
---
<h1 id="Get-Started-with-Milvus-Lite" class="common-anchor-header">Get Started with Milvus Lite<button data-href="#Get-Started-with-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to install, configure, and use <a href="https://github.com/milvus-io/milvus-lite">Milvus Lite</a>.</p>
<div class="alert caution">
<p>Do not use Milvus Lite in any production environment or if you require high performance. For production purposes, consider using Milvus clusters or fully-managed Milvus on Zilliz Cloud.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite is a lightweight version of Milvus that works seamlessly with Google Colab and Jupyter Notebook.</p>
<p>Thanks to the ability of Milvus standalone to run with embedded etcd and local storage, Milvus Lite comes with a single binary with no other dependencies that you can easily install and run on your machine, or embed in any of your Python applications.</p>
<p>Anything you do with Milvus Lite, and any code you write for Milvus Lite can be safely migrated to Milvus instances installed in other ways.</p>
<p>It also comes with a CLI-based Milvus standalone server to run on your machine. Embedding it into your Python code or using it as a standalone server is up to your choice.</p>
<h2 id="Application-scenarios" class="common-anchor-header">Application scenarios<button data-href="#Application-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite is suitable for the following scenarios:</p>
<ul>
<li>You want to use Milvus directly without having it installed using <a href="https://milvus.io/docs/install_standalone-operator.md">Milvus Operator</a>, <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a>, or <a href="https://milvus.io/docs/install_standalone-docker.md">Docker Compose</a> etc.</li>
<li>You do not want to launch any virtual machines or containers while you are using Milvus.</li>
<li>You want to embed Milvus features in your Python applications.</li>
</ul>
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
<li><p>Python 3.7 or later</p></li>
<li><p>Verified operating systems are as follows:</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64)</li>
<li>CentOS &gt;= 7.0 (x86_64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon)</li>
</ul></li>
</ul>
<div class="alert note">  
<ul>
<li>For Linux users, Milvus Lite uses <strong>manylinux2014</strong> as the base image. It should be able to run on most Linux distributions.</li>
<li>Milvus Lite can also run on Windows. However, this is not strictly verified.</li>
</ul>
</div>
<h2 id="Install-Milvus-Lite" class="common-anchor-header">Install Milvus Lite<button data-href="#Install-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite is available on PyPI, you can install it via <code translate="no">pip</code>.</p>
<pre><code translate="no" class="language-shell">$ python3 -m pip install milvus
<button class="copy-code-btn"></button></code></pre>
<p>Or, install it with PyMilvus as follows:</p>
<pre><code translate="no" class="language-shell">$ python3 -m pip install milvus[client]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-started" class="common-anchor-header">Get started<button data-href="#Get-started" class="anchor-icon" translate="no">
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
    </button></h2><p>You can download the example notebook from the <a href="https://github.com/milvus-io/milvus-lite/tree/main/examples">example</a> folder of our project repository to get started.</p>
<h2 id="Use-Milvus-Lite" class="common-anchor-header">Use Milvus Lite<button data-href="#Use-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>You can import Milvus Lite as a Python library or use it as a CLI-based Milvus standalone server to run on your machine.</p>
<h3 id="Start-Milvus-Lite" class="common-anchor-header">Start Milvus Lite</h3><ul>
<li><p>To start Milvus Lite as a Python module, do as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> milvus <span class="hljs-keyword">import</span> default_server
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, utility

<span class="hljs-comment"># (OPTIONAL) Set if you want store all related data to specific location</span>
<span class="hljs-comment"># Default location:</span>
<span class="hljs-comment">#   %APPDATA%/milvus-io/milvus-server on windows</span>
<span class="hljs-comment">#   ~/.milvus-io/milvus-server on linux</span>
<span class="hljs-comment"># default_server.set_base_dir(&#x27;milvus_data&#x27;)</span>

<span class="hljs-comment"># (OPTIONAL) if you want cleanup previous data</span>
<span class="hljs-comment"># default_server.cleanup()</span>

<span class="hljs-comment"># Start your milvus server</span>
default_server.start()

<span class="hljs-comment"># Now you could connect with localhost and the given port</span>
<span class="hljs-comment"># Port is defined by default_server.listen_port</span>
connections.connect(host=<span class="hljs-string">&#x27;127.0.0.1&#x27;</span>, port=default_server.listen_port)

<span class="hljs-comment"># Check if the server is ready.</span>
<span class="hljs-built_in">print</span>(utility.get_server_version())

<span class="hljs-comment"># Stop your milvus server</span>
default_server.stop()
<button class="copy-code-btn"></button></code></pre>
<p>You can also use the <code translate="no">with</code> statement to have Milvus Lite automatically stop when you do not need it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> milvus <span class="hljs-keyword">import</span> default_server

<span class="hljs-keyword">with</span> default_server:
  <span class="hljs-comment"># Milvus Lite has already started, use default_server here.</span>
  connections.connect(host=<span class="hljs-string">&#x27;127.0.0.1&#x27;</span>, port=default_server.listen_port)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>To start Milvus Lite as a CLI-based standalone server, run</p>
<pre><code translate="no" class="language-shell">$ milvus-server
<button class="copy-code-btn"></button></code></pre>
<p>Then you can use PyMilvus or other ways that suit you to connect to the standalone server.</p></li>
</ul>
<h3 id="Start-Milvus-Lite-in-debug-mode" class="common-anchor-header">Start Milvus Lite in debug mode</h3><ul>
<li><p>To run Milvus Lite in debug mode as a Python Module, do as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> milvus <span class="hljs-keyword">import</span> debug_server, MilvusServer

debug_server.run()

<span class="hljs-comment"># Or you can create a MilvusServer by yourself</span>
<span class="hljs-comment"># server = MilvusServer(debug=True)</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>To run the standalone server in debug mode, do as follows:</p>
<pre><code translate="no" class="language-shell">$ milvus-server --debug
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Persist-data-and-logs" class="common-anchor-header">Persist data and logs</h3><ul>
<li><p>To set a local directory for Milvus Lite to store all related data and logs in a local directory, do as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> milvus <span class="hljs-keyword">import</span> default_server

<span class="hljs-keyword">with</span> <span class="hljs-attr">default_server</span>:
  default_server.<span class="hljs-title function_">set_base_dir</span>(<span class="hljs-string">&#x27;milvus_data&#x27;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>To persist all data and logs generated by the standalone server on your local drive, run</p>
<pre><code translate="no" class="language-shell">$ milvus-server --data milvus_data
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Configure-Milvus-Lite" class="common-anchor-header">Configure Milvus Lite<button data-href="#Configure-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>You can configure Milvus Lite in the same way as you do Milvus instances through both Python APIs and CLI.</p>
<ul>
<li><p>To configure Milvus Lite using Python APIs, you can use the <code translate="no">config.set</code> API of a <code translate="no">MilvusServer</code> instance for both basic and extra configuration items as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> milvus <span class="hljs-keyword">import</span> default_server

<span class="hljs-keyword">with</span> default_server:
  default_server.config.<span class="hljs-built_in">set</span>(<span class="hljs-string">&#x27;system_Log_level&#x27;</span>, <span class="hljs-string">&#x27;info&#x27;</span>)
  default_server.config.<span class="hljs-built_in">set</span>(<span class="hljs-string">&#x27;proxy_port&#x27;</span>, <span class="hljs-number">19531</span>)
  default_server.config.<span class="hljs-built_in">set</span>(<span class="hljs-string">&#x27;dataCoord.segment.maxSize&#x27;</span>, <span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>To configure Milvus Lite using CLI, run the following for basic configurations.</p>
<pre><code translate="no" class="language-shell">$ milvus-server --system-log-level info
$ milvus-server --proxy-port 19531
<button class="copy-code-btn"></button></code></pre>
<p>Or, run the following for extra configurations.</p>
<pre><code translate="no" class="language-shell">$ milvus-server --extra-config dataCoord.segment.maxSize=1024
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>You can find all configurable configuration items in <code translate="no">config.yaml</code> template shipped with the Milvus package.</p>
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
    </button></h2><p>If you have new ideas and want to contribute to Milvus Lite, please read the <a href="https://github.com/milvus-io/milvus-lite/blob/main/CONTRIBUTING.md">Contributing Guide</a> first.</p>
<p>If you encounter any problems when installing or using Milvus Lite, <a href="https://github.com/milvus-io/milvus-lite/issues/new">file an issue here</a>.</p>
