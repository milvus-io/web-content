---
id: troubleshooting.md
summary: 了解使用 Milvus 时可能遇到的常见问题，以及如何克服这些问题。
title: 故障排除
---
<h1 id="Troubleshooting" class="common-anchor-header">故障排除<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>本页列出运行 Milvus 时可能出现的常见问题，以及可能的故障排除提示。本页面的问题分为以下几类：</p>
<ul>
<li><a href="#boot_issues">启动问题</a></li>
<li><a href="#runtime_issues">运行时问题</a></li>
<li><a href="#api_issues">API 问题</a></li>
<li><a href="#etcd_crash_issues">etcd 崩溃问题</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">启动问题<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>启动错误通常是致命的。运行以下命令可查看错误详情：</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">运行时问题<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>运行时发生的错误可能会导致服务崩溃。要排除此问题，请先检查服务器与客户端之间的兼容性，然后再继续操作。</p>
<h2 id="API-issues" class="common-anchor-header">API 问题<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>这些问题发生在 Milvus 服务器和客户端之间的 API 方法调用期间。它们将同步或非同步返回客户端。</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">etcd 崩溃问题<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. etcd pod 挂起</h3><p>etcd 集群默认使用 pvc。需要为 Kubernetes 集群预先配置 StorageClass。</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcd pod 崩溃</h3><p>当 etcd pod 崩溃时，<code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code> ，可以登录该 pod 并删除<code translate="no">/bitnami/etcd/data/member_id</code> 文件。</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3.当<code translate="no">etcd-0</code> 仍在运行时，多个 pod 不断崩溃</h3><p>如果多个 pod 在<code translate="no">etcd-0</code> 仍在运行时不断崩溃，您可以运行以下代码。</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4.所有 pod 均崩溃</h3><p>当所有 pod 崩溃时，请尝试复制<code translate="no">/bitnami/etcd/data/member/snap/db</code> 文件。使用<code translate="no">https://github.com/etcd-io/bbolt</code> 修改数据库数据。</p>
<p>所有 Milvus 元数据都保存在<code translate="no">key</code> 数据桶中。备份该数据桶中的数据并运行以下命令。请注意，<code translate="no">by-dev/meta/session</code> 文件中的前缀数据不需要备份。</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>如果您在解决问题时需要帮助，请随时</p>
<ul>
<li>加入我们的<a href="https://discord.com/invite/8uyFbECzPX">Discord 服务器</a>，寻求 Milvus 团队的支持。</li>
<li>在 GitHub 上<a href="https://github.com/milvus-io/milvus/issues/new/choose">提交问题</a>，并详细说明您的问题。</li>
</ul>
