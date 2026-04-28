---
id: integrate_with_fastgpt.md
summary: '本教學將引導您如何使用 [Milvus](https://milvus.io/)，快速部署自己專屬的 FastGPT 應用程式。'
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a>是建構在 LLM 大型語言模型上的知識型問答系統，可為資料處理和模型調用提供即時可用的功能。此外，它還可以透過 Flow 可視化來協調工作流程，從而促進複雜問題和回答情境的處理。本教學將引導您如何使用<a href="https://milvus.io/">Milvus</a> 快速部署自己專屬的 FastGPT 應用程式。</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">下載 docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>確保您已經安裝<a href="https://docs.docker.com/compose/">Docker Compose</a>。<br>
執行以下指令下載 docker-compose.yml 檔案。</p>
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
<p>如果您使用的是 Zilliz 版本，請調整 docker-compose.yml 檔案中的<code translate="no">MILVUS_ADDRESS</code> 和<code translate="no">MILVUS_TOKEN</code> link 參數，與<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>對應。</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">啟動容器<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>在與 docker-compose.yml 相同的目錄下執行。確保 docker-compose 的版本最好在 2.17 以上，否則某些自動化指令可能無法運作。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Launch the container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Wait <span class="hljs-keyword">for</span> 10s, OneAPI typically needs to restart a few <span class="hljs-built_in">times</span> to initially connect to Mysql</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sleep</span> 10</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display <span class="hljs-string">&#x27;channel not found&#x27;</span> <span class="hljs-keyword">if</span> not restarted, this can be temporarily resolved by manually restarting once, <span class="hljs-keyword">while</span> waiting <span class="hljs-keyword">for</span> the author<span class="hljs-string">&#x27;s fix)</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">docker restart oneapi</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">存取 OneAPI 來新增模型<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>OneAPI 的存取網址是<code translate="no">ip:3001</code> 。預設使用者名稱為 root，密碼為 123456。您可以在登入後更改密碼。<br>
以 OpenAI 的模型為例，點選「Channel」索引標籤，在「Models」下選擇您的聊天模型和嵌入模型。<br>
在「密碼」部分輸入您的<a href="https://platform.openai.com/docs/quickstart">OpenAI API</a>密碼。<br>
如需使用 OpenAI 以外的模型以及更多資訊，請參閱<a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>。</p>
<h2 id="Setting-Tokens" class="common-anchor-header">設定代號<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>按一下「Token」索引標籤。預設情況下，有一個代號<code translate="no">Initial Root Token</code> 。您也可以自行建立新的代號並設定配額。<br>
點選「Copy」你的代碼，確保這個代碼的值與在 docker-compose.yml 檔案中設定的<code translate="no">CHAT_API_KEY</code> 值相符。</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">存取 FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>目前 FastGPT 可以在<code translate="no">ip:3000</code> 直接存取 (請注意防火牆)。登入的使用者名稱是 root，密碼則是在 docker-compose.yml 環境變數中設定的<code translate="no">DEFAULT_ROOT_PSW</code> 。如果您需要域名訪問，您需要自行安裝和設定<a href="https://nginx.org/en/">Nginx</a>。</p>
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
    </button></h2><p>執行以下指令來停止容器。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
