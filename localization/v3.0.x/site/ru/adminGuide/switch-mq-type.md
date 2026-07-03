---
id: switch-mq-type.md
title: Смена типа MQ
summary: >-
  Переключить очередь сообщений существующего развертывания Milvus с Woodpecker
  на другую очередь сообщений без простоев.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Смена типа MQ<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве описано, как переключить очередь сообщений (MQ) существующего развертывания Milvus <strong>с Woodpecker на другую очередь сообщений</strong> в режиме онлайн и без простоев.</p>
<div class="alert warning">
<p>Эта функция находится в стадии подготовки к выпуску и может быть изменена. Если вы хотите опробовать эту функцию или у вас есть вопросы, обратитесь в службу поддержки Milvus.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Функция «Смена MQ» доступна в Milvus 3.0 и более поздних версиях.</strong> Перед использованием обновите свой экземпляр Milvus до версии 3.0 или более поздней — в более ранних версиях эта функция недоступна.</li>
<li>Инстанс работает корректно.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Область применения<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>В данном руководстве рассматривается только переключение <strong>между Woodpecker и другой очередью сообщений</strong>. Прямое переключение между Pulsar и Kafka не входит в сферу применения данного руководства.</p>
<ul>
<li><a href="/docs/ru/switch-rocksmq-woodpecker.md">Переключение между RocksMQ и Woodpecker</a> — автономная версия Milvus (Docker Compose)</li>
<li><a href="/docs/ru/switch-pulsar-woodpecker.md">Переключение между Pulsar и Woodpecker</a> — кластер Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/ru/switch-kafka-woodpecker.md">Переключение между Kafka и Woodpecker</a> — кластер Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Общий рабочий процесс<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Убедитесь, что экземпляр Milvus работает корректно.</li>
<li>Уточните тип исходного и целевого MQ.</li>
<li>Отразите настройки доступа целевого MQ в конфигурации Milvus, <strong>не</strong> изменяя значение параметра « <code translate="no">mqType</code> ».</li>
<li>Запустите переключение, вызвав API WAL alter в MixCoord.</li>
<li>Проследите за журналами, чтобы убедиться, что переключение завершилось.</li>
</ol>
<div class="alert note">
<p>Перед переключением убедитесь, что целевой MQ не содержит тем с именами, совпадающими с именами тем, используемых текущим экземпляром Milvus. Это особенно важно, если целевой MQ ранее использовался другим экземпляром Milvus, поскольку конфликтующие имена тем могут привести к непредвиденному поведению.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Матрица поддержки<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Исходный MQ</th><th>Целевой MQ</th><th>Развертывание</th><th>Статус</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (локальный/MinIO)</td><td>Автономный (Docker Compose)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Woodpecker (локальный/MinIO)</td><td>RocksMQ</td><td>Автономный (Docker Compose)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Pulsar (встроенный/внешний)</td><td>Woodpecker (MinIO)</td><td>Кластер (Helm / Operator)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (внешний)</td><td>Кластер (Helm / Operator)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Kafka (встроенный/внешний)</td><td>Woodpecker (MinIO)</td><td>Кластер (Helm / Operator)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (внешний)</td><td>Кластер (Helm / Operator)</td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker локальный (или наоборот)</td><td>любой</td><td><strong>Не поддерживается</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Старайтесь избегать многократного переключения между типами MQ. Если переключение все же необходимо, перед каждым переключением обязательно очищайте связанные данные — остаточные данные могут привести к непредвиденному поведению.</p>
</div>
