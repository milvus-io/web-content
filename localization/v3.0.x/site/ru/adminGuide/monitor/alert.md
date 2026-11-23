---
id: alert.md
title: Создать оповещение
related_key: monitor and alert.
summary: 'Узнайте, как настроить оповещение для сервисов Milvus в Grafana.'
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Создание оповещения для сервисов Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом разделе представлен механизм оповещений для сервисов Milvus, а также объясняется, зачем, когда и как создавать оповещения в Milvus.</p>
<p>Создавая оповещения, вы сможете получать уведомления, когда значение определенного показателя превысит заданный вами порог.</p>
<p>Например, вы создаете оповещение и устанавливаете 80 МБ в качестве максимального значения использования памяти компонентами Milvus. Если фактическое использование превысит заданное значение, вы получите оповещения, напоминающие о том, что использование памяти компонентами Milvus превышает 80 МБ. Получив оповещение, вы сможете своевременно скорректировать распределение ресурсов, чтобы обеспечить доступность сервиса.</p>
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
    </button></h2><p>Ниже приведены некоторые типичные сценарии, в которых необходимо создать оповещение.</p>
<ul>
<li>Слишком высокое использование ЦП или памяти компонентами Milvus.</li>
<li>В подах компонентов Milvus заканчивается место на диске.</li>
<li>Поды компонентов Milvus перезапускаются слишком часто.</li>
</ul>
<p>Для настройки оповещений доступны следующие метрики:</p>
<table>
<thead>
<tr><th>Показатель</th><th>Описание</th><th>Единица измерения</th></tr>
</thead>
<tbody>
<tr><td>Использование ЦП</td><td>Использование ЦП компонентами Milvus, которое определяется временем работы ЦП.</td><td>Секунда</td></tr>
<tr><td>Память</td><td>Ресурсы памяти, потребляемые компонентами Milvus.</td><td>МБ</td></tr>
<tr><td>Горутины</td><td>Параллельно выполняемые задачи на языке GO.</td><td>/</td></tr>
<tr><td>Потоки ОС</td><td>Потоки, или «облегчённые процессы» в операционной системе.</td><td>/</td></tr>
<tr><td>Открытые файловые дескрипторы процесса</td><td>Текущее количество используемых файловых дескрипторов.</td><td>/</td></tr>
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
    </button></h2><p>В данном руководстве в качестве примера рассматривается создание оповещения об использовании памяти компонентами Milvus. Для создания оповещений других типов, пожалуйста, соответствующим образом скорректируйте команды. Если в процессе у вас возникнут какие-либо проблемы, не стесняйтесь задавать вопросы на <a href="https://discuss.milvus.io/">форуме Milvus</a> или начинать обсуждение в <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>В данном руководстве предполагается, что у вас установлена и настроена Grafana. Если это не так, рекомендуем ознакомиться с <a href="/docs/ru/monitor.md">руководством по мониторингу</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Добавьте новый запрос<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы добавить оповещение об использовании памяти компонентами Milvus, откройте панель «Память» (Memory). Затем добавьте новый запрос с метрикой: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Сохраните панель инструментов<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Сохраните панель инструментов и подождите несколько минут, чтобы увидеть оповещение.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>Запрос оповещения Grafana не поддерживает переменные шаблона. Поэтому вам следует добавить второй запрос без каких-либо переменных шаблона в метках. По умолчанию второй запрос имеет название «A». Вы можете переименовать его, щелкнув по раскрывающемуся списку.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>Alert_query</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Добавление уведомлений об оповещениях<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы получать уведомления об оповещениях, создайте точку контакта. В Grafana перейдите в <strong>раздел «Alerts &amp; IRM»</strong> &gt; <strong>«Alerting»</strong> &gt; <strong>«Notification configuration»</strong>, выберите вкладку <strong>«Contact points</strong> » и нажмите <strong> «+ New contact point</strong>». Затем в разделе <strong>«Configure notifications</strong> » правила оповещения выберите точку контакта или настройте маршрутизацию уведомлений с помощью политик уведомлений.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>Если оповещение успешно создано и сработало, вы получите уведомление, как показано на скриншоте ниже.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>Notification_message</span>
  
 </span></p>
<p>Чтобы удалить оповещение, перейдите на панель «Оповещения» и нажмите кнопку удаления.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>Delete_alert</span>
  
 </span></p>
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
<li>Если вам нужно начать мониторинг сервисов для Milvus:
<ul>
<li>Ознакомьтесь с <a href="/docs/ru/monitor.md">руководством по мониторингу</a></li>
<li>Узнайте, как <a href="/docs/ru/visualize.md">визуализировать показатели мониторинга</a></li>
</ul></li>
<li>Если вы создали оповещения об использовании памяти компонентами Milvus:
<ul>
<li>Узнайте, как <a href="/docs/ru/allocate.md#standalone">распределять ресурсы</a></li>
</ul></li>
<li>Если вы ищете информацию о том, как масштабировать кластер Milvus:
<ul>
<li>Узнайте, как <a href="/docs/ru/scaleout.md">масштабировать кластер Milvus</a></li>
</ul></li>
</ul>
