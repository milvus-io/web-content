---
id: architecture_overview.md
summary: >-
  Milvus - это быстрая, надежная и стабильная база данных векторов, созданная
  специально для поиска сходств и искусственного интеллекта.
title: Обзор архитектуры Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Обзор архитектуры Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Построенный на основе популярных библиотек векторного поиска, таких как Faiss, HNSW, DiskANN, SCANN и других, Milvus был разработан для поиска сходства в плотных векторных наборах данных, содержащих миллионы, миллиарды и даже триллионы векторов. Прежде чем приступить к работе, ознакомьтесь с <a href="/docs/ru/glossary.md">основными принципами</a> поиска по вкраплениям.</p>
<p>Milvus также поддерживает чередование данных, потоковый ввод данных, динамическую схему, поиск в сочетании векторных и скалярных данных, многовекторный и гибридный поиск, разреженный вектор и многие другие расширенные функции. Платформа обеспечивает производительность по требованию и может быть оптимизирована под любой сценарий поиска встраивания. Мы рекомендуем развертывать Milvus с помощью Kubernetes для оптимальной доступности и эластичности.</p>
<p>В Milvus используется архитектура с общим хранилищем, предусматривающая дезагрегацию хранилищ и вычислений и горизонтальную масштабируемость вычислительных узлов. Следуя принципу разделения плоскости данных и плоскости управления, Milvus включает в себя <a href="/docs/ru/four_layers.md">четыре уровня</a>: уровень доступа, сервис-координатор, рабочий узел и хранилище. Эти уровни являются взаимно независимыми, когда речь идет о масштабировании или аварийном восстановлении.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Архитектура_диаграммы</span> </span></p>
<p>Согласно рисунку, интерфейсы можно разделить на следующие категории:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> insert / delete / upsert</li>
<li><strong>DQL:</strong> поиск / запрос</li>
</ul>
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
<li>Узнайте больше о <a href="/docs/ru/four_layers.md">дезагрегации вычислений/хранилищ</a> в Milvus</li>
<li>Узнайте об <a href="/docs/ru/main_components.md">основных компонентах</a> Milvus.</li>
</ul>
