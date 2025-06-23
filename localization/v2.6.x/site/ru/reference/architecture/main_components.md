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
    </button></h1><p>Кластер Milvus состоит из пяти основных компонентов и трех сторонних зависимостей. Каждый компонент может быть развернут на Kubernetes независимо:</p>
<h2 id="Milvus-components" class="common-anchor-header">Компоненты Milvus<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Координатор: ровно один на кластер</li>
<li>Прокси: один или несколько на кластер</li>
<li>Узел потоковой передачи: один или несколько на кластер</li>
<li>Узел запросов: один или несколько на кластер</li>
<li>Узел данных: один или несколько на кластер</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Сторонние зависимости<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Meta Store:</strong> Хранит метаданные для различных компонентов milvus, например, etcd.</li>
<li><strong>Хранилище объектов:</strong> Отвечает за сохранение данных больших файлов в milvus, таких как индексные и бинарные файлы журналов, например S3.</li>
<li><strong>Хранилище WAL:</strong> Обеспечивает сервис записи с опережением (WAL) для milvus, например woodpecker.<ul>
<li>В режиме нулевого диска woodpecker <strong>WAL</strong> напрямую использует объектное хранилище и метахранилище без дополнительного развертывания, что снижает зависимость от сторонних производителей.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Режимы развертывания Milvus<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Существует два режима работы Milvus:</p>
<h3 id="Standalone" class="common-anchor-header">Автономный</h3><p>Единственный экземпляр Milvus, в котором все компоненты работают в одном процессе, что подходит для небольших наборов данных и низкой рабочей нагрузки. Кроме того, в автономном режиме можно выбрать более простую реализацию WAL, такую как woodpecker и rocksmq, чтобы исключить необходимость в сторонних зависимостях от WAL Storage.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Автономная_архитектура</span> </span></p>
<p>В настоящее время невозможно выполнить онлайн-обновление с автономного экземпляра Milvus на кластер Milvus, даже если бэкенд хранилища WAL поддерживает режим кластера.</p>
<h3 id="Cluster" class="common-anchor-header">Кластер</h3><p>Распределенный режим развертывания Milvus, при котором каждый компонент работает независимо и может быть масштабирован для обеспечения эластичности. Такая конфигурация подходит для больших наборов данных и сценариев с высокой нагрузкой.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
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
<li>Прочитайте раздел <a href="/docs/ru/v2.6.x/four_layers.md">"Распределение вычислений/хранилищ"</a>, чтобы понять механизм и принцип работы Milvus.</li>
</ul>
