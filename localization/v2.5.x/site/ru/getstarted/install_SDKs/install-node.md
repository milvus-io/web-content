---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: "Узнайте, как установить Node.js SDK от Milvus."
title: Установка Milvus Nodejs SDK
---

<h1 id="Install-Milvus-Nodejs-SDK" class="common-anchor-header">Установка Milvus Nodejs SDK<button data-href="#Install-Milvus-Nodejs-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как установить Milvus Node.js SDK для Milvus.</p>
<h2 id="Compatibility" class="common-anchor-header">Совместимость<button data-href="#Compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей подборке показаны версии Milvus и рекомендуемые версии @zilliz/milvus2-sdk-node:</p>
<table>
<thead>
<tr><th style="text-align:center">Версия Milvus</th><th style="text-align:center">Рекомендуемая версия @zilliz/milvus2-sdk-node</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.5.x</td><td style="text-align:center">последняя</td></tr>
<tr><td style="text-align:center">2.4.x</td><td style="text-align:center">2.4.10</td></tr>
<tr><td style="text-align:center">2.3.x</td><td style="text-align:center">2.3.5</td></tr>
<tr><td style="text-align:center">2.2.x</td><td style="text-align:center">2.2.x</td></tr>
<tr><td style="text-align:center">2.1.x</td><td style="text-align:center">2.1.x</td></tr>
<tr><td style="text-align:center">2.0.1</td><td style="text-align:center">2.0.0, 2.0.1</td></tr>
<tr><td style="text-align:center">2.0.0</td><td style="text-align:center">2.0.0</td></tr>
</tbody>
</table>
<h2 id="Requirement" class="common-anchor-header">Требования<button data-href="#Requirement" class="anchor-icon" translate="no">
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
    </button></h2><p>Node.js v18+</p>
<h2 id="Installation" class="common-anchor-header">Установка<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Рекомендуемый способ начать использовать клиент Milvus node.js - это использовать npm (менеджер пакетов Node) для установки зависимости в ваш проект.</p>
<pre><code translate="no" class="language-javascript">npm install @zilliz/milvus2-sdk-node
<span class="hljs-comment"># or ...</span>
yarn add @zilliz/milvus2-sdk-node
<button class="copy-code-btn"></button></code></pre>
<p>Это загрузит Milvus node.js sdk и добавит запись о зависимости в ваш файл package.json.</p>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Установив Milvus Node.js SDK, вы можете:</p>
<ul>
<li><p>Просмотреть <a href="https://github.com/milvus-io/milvus-sdk-node">быстрый старт milvus node.js sdk</a></p></li>
<li><p>Изучить основные операции Milvus:</p>
<ul>
<li><a href="/docs/ru/v2.5.x/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/v2.5.x/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/v2.5.x/insert-update-delete.md">Вставка, вставка и удаление</a></li>
<li><a href="/docs/ru/v2.5.x/single-vector-search.md">Одновекторный поиск</a></li>
<li><a href="/docs/ru/v2.5.x/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p>Изучите <a href="/api-reference/node/v2.4.x/About.md">справочник Milvus Node.js API</a></p></li>
</ul>
