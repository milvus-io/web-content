---
id: integrate_with_fastgpt.md
summary: '本教程将指导您如何使用 [Milvus](https://milvus.io/)迅速部署自己的专属 FastGPT 应用程序。'
title: 使用 Milvus 部署 FastGPT
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">使用 Milvus 部署 FastGPT<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a>是一个基于知识的问答系统，建立在 LLM 大型语言模型之上，为数据处理和模型调用提供了随时可用的功能。此外，它还能通过 Flow 可视化实现工作流协调，从而为复杂的问答场景提供便利。本教程将指导您如何使用<a href="https://milvus.io/">Milvus</a> 迅速部署自己专属的 FastGPT 应用程序。</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">下载 docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>确保已安装<a href="https://docs.docker.com/compose/">Docker Compose</a>。<br>
执行下面的命令下载 docker-compose.yml 文件。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">milvus version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">zilliz version</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>如果你使用的是 Zilliz 版本，请调整 docker-compose.yml 文件中的<code translate="no">MILVUS_ADDRESS</code> 和<code translate="no">MILVUS_TOKEN</code> 链接参数，这两个参数与<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">启动容器<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>在与 docker-compose.yml 文件相同的目录下执行。确保 docker-compose 的版本最好在 2.17 以上，否则某些自动化命令可能无法运行。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Launch the container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Wait <span class="hljs-keyword">for</span> 10s, OneAPI typically needs to restart a few <span class="hljs-built_in">times</span> to initially connect to Mysql</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sleep</span> 10</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display <span class="hljs-string">&#x27;channel not found&#x27;</span> <span class="hljs-keyword">if</span> not restarted, this can be temporarily resolved by manually restarting once, <span class="hljs-keyword">while</span> waiting <span class="hljs-keyword">for</span> the author<span class="hljs-string">&#x27;s fix)</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">docker restart oneapi</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">访问 OneAPI 添加模型<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>访问 OneAPI 的网址是<code translate="no">ip:3001</code> 。默认用户名为 root，密码为 123456。登录后可更改密码。<br>
以 OpenAI 的模型为例，点击 "Channel"（频道）选项卡，在 "Models"（模型）下选择聊天模型和 Embeddings 模型。<br>
在 "<a href="https://platform.openai.com/docs/quickstart">密钥</a>"部分输入<a href="https://platform.openai.com/docs/quickstart">OpenAI API 密钥</a>。<br>
有关 OpenAI 以外模型的使用和更多信息，请查阅<a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>。</p>
<h2 id="Setting-Tokens" class="common-anchor-header">设置令牌<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>点击 "令牌 "选项卡。默认情况下，有一个令牌<code translate="no">Initial Root Token</code> 。您也可以创建一个新的令牌，并自行设置配额。<br>
点击令牌上的 "复制"（Copy），确保该令牌的值与在 docker-compose.yml 文件中设置的<code translate="no">CHAT_API_KEY</code> 值一致。</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">访问 FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，可以通过<code translate="no">ip:3000</code> 直接访问 FastGPT（请注意防火墙）。登录用户名为 root，密码在 docker-compose.yml 环境变量中设置为<code translate="no">DEFAULT_ROOT_PSW</code> 。如果需要域名访问，则需要自行安装和配置<a href="https://nginx.org/en/">Nginx</a>。</p>
<h2 id="Stop-the-Container" class="common-anchor-header">停止容器<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>运行以下命令停止容器。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
