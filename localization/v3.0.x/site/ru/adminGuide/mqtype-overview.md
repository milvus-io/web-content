---
id: mqtype-overview.md
title: Обзор очереди сообщений
summary: >-
  Обзор параметров очереди сообщений (mqType), поддерживаемых Milvus, а также
  рекомендации по их использованию в автономных и распределенных развертываниях.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Обзор очереди сообщений<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует очередь сообщений (журнал предварительной записи, WAL) для управления журналами недавних изменений, журналами выходных потоков и обеспечения подписок на журналы. В Milvus 3.x по умолчанию используется <strong>Woodpecker</strong>, который не требует отдельной инфраструктуры обмена сообщениями. Pulsar, Kafka и RocksMQ по-прежнему поддерживаются для определенных сценариев.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Поддерживаемые очереди сообщений<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Очередь сообщений</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Распределенная версия Milvus (кластер)</th><th>По умолчанию в</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ru/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (встроенный)</td><td style="text-align:center">✔️ (встроенный или в виде службы)</td><td><strong>Milvus 3.x</strong> (оба режима)</td><td>По умолчанию и рекомендуется. Облачный WAL в объектном хранилище; внешний сервис не требуется.</td></tr>
<tr><td><a href="/docs/ru/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (по умолчанию для кластера)</td><td>Поддерживается, внешний или входящий в состав.</td></tr>
<tr><td><a href="/docs/ru/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Поддерживается. Только Kafka 2.x или 3.x.</td></tr>
<tr><td><a href="/docs/ru/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (автономный режим по умолчанию)</td><td>Поддерживается <strong>только</strong> для <strong>автономного режима</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Каждый экземпляр Milvus использует ровно одну очередь сообщений.</p></li>
<li><p><strong>Ограничения</strong>, связанные с<strong>очередью сообщений</strong>: при обновлении до Milvus v3.0-beta необходимо сохранить текущий выбор очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p></li>
<li><p>Чтобы изменить очередь сообщений для запущенного экземпляра, см. раздел <a href="/docs/ru/switch-mq-type.md">«Смена типа MQ</a>». Функция «Смена MQ» доступна в <strong>Milvus 3.0 и более поздних версиях</strong> — сначала обновите систему до Milvus 3.0 или более поздней версии.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Выбор очереди сообщений<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Новые развертывания (Milvus 3.x):</strong> используйте <strong>Woodpecker</strong> (по умолчанию). В автономном режиме он запускается встроенным; для распределенного (кластерного) режима рекомендуется по умолчанию использовать выделенный <a href="/docs/ru/woodpecker.md#Deployment-modes">сервис</a>, развернутый с помощью Helm, при этом также поддерживается встроенный вариант.</li>
<li><strong>Существующие пользователи Pulsar или Kafka:</strong> Pulsar и Kafka по-прежнему полностью поддерживаются. Можно оставить их или <a href="/docs/ru/switch-mq-type.md">перейти на Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> поддерживается только в автономном режиме и заменен встроенным Woodpecker в Milvus 3.x.</li>
</ul>
