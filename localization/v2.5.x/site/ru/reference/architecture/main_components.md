---
id: main_components.md
summary: Узнайте об основных компонентах автономной и кластерной системы Milvus.
title: Основные компоненты
---
<h1 id="Main-Components" class="common-anchor-header">Основные компоненты<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Существует два режима работы Milvus: автономный и кластерный. Эти два режима имеют одинаковые возможности. Вы можете выбрать режим, который лучше всего подходит для вашего размера набора данных, данных о трафике и т. д. На данный момент Milvus standalone не может быть обновлен "онлайн" до Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Автономный Milvus<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone включает в себя три компонента:</p>
<ul>
<li><p><strong>Milvus:</strong> основной функциональный компонент.</p></li>
<li><p><strong>Meta Store:</strong> Движок метаданных, который получает доступ и хранит метаданные внутренних компонентов Milvus, включая прокси, индексные узлы и многое другое.</p></li>
<li><p><strong>Хранилище объектов:</strong> Механизм хранения, который отвечает за сохранение данных в Milvus.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Автономная_архитектура</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Кластер Milvus<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Кластер Milvus</strong> включает в себя семь компонентов микросервисов и три сторонних зависимости. Все микросервисы могут быть развернуты на Kubernetes независимо друг от друга.</p>
<h3 id="Microservice-components" class="common-anchor-header">Компоненты микросервисов</h3><ul>
<li>Корневой координатор</li>
<li>Прокси</li>
<li>Координата запроса</li>
<li>Узел запросов</li>
<li>Коорд данных</li>
<li>Индексный узел</li>
<li>Узел данных</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Сторонние зависимости</h3><ul>
<li><strong>Метахранилище:</strong> Хранит метаданные для различных компонентов кластера, например, etcd.</li>
<li><strong>Хранилище объектов:</strong> Отвечает за сохранение данных больших файлов в кластере, таких как индексные и бинарные файлы журналов, например S3.</li>
<li><strong>Брокер журналов:</strong> Управляет журналами последних операций мутации, выводит потоковый журнал и предоставляет услуги публикации-подписки журналов, например, Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Распределенная_архитектура</span> </span></p>
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
    </button></h2><ul>
<li>Прочитайте <a href="/docs/ru/four_layers.md">раздел "Вычисления/распределение хранилищ"</a>, чтобы понять механизм и принцип работы Milvus.</li>
</ul>
