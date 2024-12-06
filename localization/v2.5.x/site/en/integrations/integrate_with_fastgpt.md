---
id: integrate_with_fastgpt.md
summary: >-
  This tutorial will guide you on how to swiftly deploy your own exclusive
  FastGPT application using [Milvus](https://milvus.io/).
title: Deploying FastGPT with Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Deploying FastGPT with Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> is a knowledge-based question and answer system built on the LLM large language model, offering ready-to-use capabilities for data processing and model invocation. Furthermore, it enables workflow orchestration through Flow visualization, thus facilitating complex question and answer scenarios. This tutorial will guide you on how to swiftly deploy your own exclusive FastGPT application using <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">Download docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensure that you have already installed <a href="https://docs.docker.com/compose/">Docker Compose</a>.<br>
Execute the command below to download the docker-compose.yml file.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> fastgpt
$ <span class="hljs-built_in">cd</span> fastgpt
$ curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json

<span class="hljs-comment"># milvus version</span>
$ curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml
<span class="hljs-comment"># zilliz version</span>
<span class="hljs-comment"># curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>If you’re using the Zilliz version, adjust the <code translate="no">MILVUS_ADDRESS</code> and <code translate="no">MILVUS_TOKEN</code> link parameters in the docker-compose.yml file, which corresponds to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Launch the Container<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute in the same directory as docker-compose.yml. Ensure that the docker-compose version is ideally above 2.17, as some automation commands may not function otherwise.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Launch the container</span>
$ docker compose up -d
<span class="hljs-comment"># Wait for 10s, OneAPI typically needs to restart a few times to initially connect to Mysql</span>
$ sleep <span class="hljs-number">10</span>
<span class="hljs-comment"># Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display &#x27;channel not found&#x27; if not restarted, this can be temporarily resolved by manually restarting once, while waiting for the author&#x27;s fix)</span>
$ docker restart oneapi
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Access OneAPI to Add Models<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>OneAPI can be accessed at <code translate="no">ip:3001</code>. The default username is root, and the password is 123456. You can alter the password after logging in.<br>
Using OpenAI’s model as an example, click on the “Channel” tab, and select your chat model and embedding model under &quot;Models&quot;.<br>
Input your <a href="https://platform.openai.com/docs/quickstart">OpenAI API Key</a> in the “Secrets” section.<br>
For the use of models beyond OpenAI, and further information, please consult <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Setting Tokens<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Click on the “Tokens” tab. By default, there is a token <code translate="no">Initial Root Token</code>. You can also create a new token and set a quota on your own.<br>
Click “Copy” on your token, ensuring that the value of this token matches the <code translate="no">CHAT_API_KEY</code> value set in the docker-compose.yml file.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Accessing FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>At present, FastGPT can be directly accessed at <code translate="no">ip:3000</code> (please mind the firewall). The login username is root, with the password set to <code translate="no">DEFAULT_ROOT_PSW</code> within the docker-compose.yml environment variable. Should you require domain name access, you would need to install and configure <a href="https://nginx.org/en/">Nginx</a> on your own.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Stop the Container<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Run the following command to stop the container.</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
