---
id: alert.md
title: Создать оповещение
related_key: monitor and alert.
summary: 'Узнайте, как создать оповещение для сервисов Milvus в Grafana.'
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Создание оповещения для служб Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме представлен механизм оповещений для служб Milvus и объясняется, зачем, когда и как создавать оповещения в Milvus.</p>
<p>Создавая оповещения, вы можете получать уведомления, когда значение определенной метрики превышает заданный вами порог.</p>
<p>Например, вы создаете оповещение и устанавливаете 80 МБ в качестве максимального значения для использования памяти компонентами Milvus. Если фактическое использование превышает заданное число, вы будете получать предупреждения с напоминанием о том, что использование памяти компонентом Milvus превысило 80 МБ. Получив предупреждение, вы сможете соответствующим образом скорректировать распределение ресурсов и своевременно обеспечить доступность сервиса.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Сценарии создания оповещений<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Ниже перечислены распространенные сценарии, для которых необходимо создать оповещение.</p>
<ul>
<li>Слишком высокое использование процессора или памяти компонентами Milvus.</li>
<li>В подкадах компонентов Milvus не хватает дискового пространства.</li>
<li>Подсистемы компонентов Milvus слишком часто перезапускаются.</li>
</ul>
<p>Для настройки оповещений доступны следующие метрики:</p>
<table>
<thead>
<tr><th>Метрика</th><th>Описание</th><th>Единица измерения</th></tr>
</thead>
<tbody>
<tr><td>Использование ЦП</td><td>Использование процессора компонентами Milvus, которое отображается временем работы процессора.</td><td>Секунда</td></tr>
<tr><td>Память</td><td>Ресурсы памяти, потребляемые компонентами Milvus.</td><td>МБ</td></tr>
<tr><td>Гороутины</td><td>Параллельно выполняемые действия на языке GO.</td><td>/</td></tr>
<tr><td>Потоки ОС</td><td>Нити, или легкие процессы в операционной системе.</td><td>/</td></tr>
<tr><td>Process Opened Fds</td><td>Текущее количество используемых дескрипторов файлов.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Настройка оповещений<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>В данном руководстве рассматривается пример создания оповещения об использовании памяти компонентами Milvus. Для создания других типов оповещений, пожалуйста, настройте свои команды соответствующим образом. Если в процессе работы у вас возникнут какие-либо проблемы, спрашивайте в <a href="https://github.com/milvus-io/milvus/discussions">обсуждениях на Github</a> или заводите тему в <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Предварительные условия</h3><p>В этом руководстве предполагается, что у вас установлена и настроена Grafana. Если нет, рекомендуем прочитать <a href="/docs/ru/v2.4.x/monitor.md">руководство по мониторингу</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Добавьте новый запрос</h3><p>Чтобы добавить оповещение об использовании памяти компонентами Milvus, отредактируйте панель Memory. Затем добавьте новый запрос с метрикой: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Сохраните приборную панель</h3><p>Сохраните приборную панель и подождите несколько минут, чтобы увидеть оповещение.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>Запрос оповещения Grafana не поддерживает шаблонные переменные. Поэтому необходимо добавить второй запрос без шаблонных переменных в метках. По умолчанию второй запрос называется "A". Вы можете переименовать его, нажав на выпадающий список.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Запрос_оповещения</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Добавление уведомлений о тревоге</h3><p>Чтобы получать уведомления о тревогах, добавьте &quot;канал уведомлений&quot;. Затем укажите канал в поле &quot;Отправить на&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Alert_notification</span> </span></p>
<p>Если оповещение успешно создано и сработало, вы получите уведомление, как показано на скриншоте ниже.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Уведомление_сообщение</span> </span></p>
<p>Чтобы удалить оповещение, перейдите на панель "Оповещение" и нажмите кнопку "Удалить".</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Удалить_оповещение</span> </span></p>
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
<li>Если вам нужно начать мониторинг сервисов для Milvus:<ul>
<li>Прочитайте <a href="/docs/ru/v2.4.x/monitor.md">руководство по мониторингу</a></li>
<li>Узнайте, как <a href="/docs/ru/v2.4.x/visualize.md">визуализировать метрики мониторинга</a></li>
</ul></li>
<li>Если вы создали оповещения об использовании памяти компонентами Milvus:<ul>
<li>Узнайте, как <a href="/docs/ru/v2.4.x/allocate.md#standalone">выделять ресурсы</a></li>
</ul></li>
<li>Если вы ищете информацию о том, как масштабировать кластер Milvus:<ul>
<li>Узнайте, <a href="/docs/ru/v2.4.x/scaleout.md">как масштабировать кластер Milvus</a></li>
</ul></li>
</ul>
