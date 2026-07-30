---
id: milvus_cdc_overview.md
summary: >-
  Milvus CDC синхронизирует изменения данных между кластерами Milvus для
  обеспечения аварийного восстановления по схеме «основной-резервный».
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC (Change Data Capture) реплицирует изменения данных из одного кластера Milvus в другой. С помощью CDC можно построить топологию аварийного восстановления «основной-резервный» для Milvus.</p>
<p>В топологии «основной-резервный» один кластер выступает в роли основного и принимает записи. Один или несколько резервных кластеров непрерывно получают изменения от основного кластера и могут обслуживать трафик чтения. Когда основной кластер становится недоступным или требует технического обслуживания, вы можете переключить сервисный трафик на резервный кластер.</p>
<h2 id="Architecture" class="common-anchor-header">Архитектура<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Типичная топология включает:</p>
<ul>
<li><strong>Основной кластер</strong>: исходный кластер для репликации. Он принимает запросы на чтение и запись.</li>
<li><strong>Резервный кластер</strong>: целевой кластер для репликации. Он получает изменения от основного кластера и находится в режиме «только для чтения», пока остается резервным.</li>
<li><strong>Узел CDC</strong>: компонент Milvus, который пересылает изменения WAL от текущего основного кластера к резервным кластерам. Разверните CDC на каждом кластере, который может стать основным после переключения или отработки отказа.</li>
<li><strong>Топология репликации</strong>: настроенная связь «источник-цель», например cluster-a -&gt; cluster-b.
Ниже приведена иллюстрация топологии. <span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   Рабочий процесс CDC</span>
  
 </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">Поддерживаемые топологии<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>Наиболее распространённая конфигурация CDC — один основной и один резервный кластер:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC также поддерживает топологию с одним основным и несколькими резервными кластерами:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC не поддерживает развертывания с несколькими основными серверами или в режиме «актив-актив», при которых два или более кластеров одновременно принимают трафик записи.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">Поведение основного и резервного узлов<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>Роль</th><th>Чтение</th><th>Запись</th><th>Поведение репликации</th></tr>
</thead>
<tbody>
<tr><td>Основной</td><td>Да</td><td>Да</td><td>Отправляет изменения в резервные кластеры</td></tr>
<tr><td>Резервный</td><td>Да</td><td>Нет</td><td>Получает реплицированные изменения от основного кластера</td></tr>
</tbody>
</table>
<p>Резервный кластер отклоняет запросы на прямую запись. Это предотвращает ситуацию «раздвоенного мозга» и обеспечивает согласованность топологии репликации.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">Плановое переключение и переключение при сбое<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC предоставляет два способа перенаправления трафика сервиса с текущего основного сервера на резервный кластер.</p>
<table>
<thead>
<tr><th>Операция</th><th>Используйте, когда</th><th>Потеря данных</th><th>Ожидаемое поведение</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ru/cdc_switchover.md">Переключение</a></strong></td><td>Текущий основной сервер по-прежнему доступен, либо вы проводите плановое техническое обслуживание</td><td>RPO = 0</td><td>Ожидание получения оставшихся реплицированных данных перед сменой ролей</td></tr>
<tr><td><strong><a href="/docs/ru/cdc_failover.md">Переключение при сбое</a></strong></td><td>Текущий первичный сервер недоступен и не может быть быстро восстановлен</td><td>Возможно</td><td>Немедленно повышает статус резервного сервера до основного, чтобы можно было возобновить запись</td></tr>
</tbody>
</table>
<p>Используйте переключение (switchover) в тех случаях, когда текущий первичный сервер ещё может отвечать на запросы. Используйте отработку отказа (failover) только тогда, когда восстановление доступности важнее, чем ожидание восстановления исходного первичного сервера.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">Задержка CDC и почему она важна<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Задержка CDC — это объем данных, которые были записаны в основной кластер, но еще не применены к резервному кластеру.</p>
<p>Задержка CDC влияет на оба варианта восстановления:</p>
<ul>
<li>Во время переключения меньшая задержка CDC обычно означает, что операция завершается быстрее.</li>
<li>Во время перехода на резервный узел задержка CDC представляет собой окно данных, которое может быть утрачено, если исходный основной узел недоступен.</li>
</ul>
<p>Необходимо постоянно отслеживать задержку CDC и поддерживать её на как можно более низком уровне. На странице <a href="/docs/ru/set_up_cdc_replication.md">«Настройка репликации CDC»</a> приведён пример PromQL для оценки задержки CDC.</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">Массовый импорт в репликации CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>В топологии репликации CDC при массовом импорте необходимо использовать режим двухфазной фиксации (2PC) с параметром ` <code translate="no">auto_commit=false</code>`. Запускайте импорт и фиксацию только на первичном кластере и убедитесь, что файлы импорта доступны как для первичного, так и для резервного кластеров. Подробности см. в разделе <a href="/docs/ru/bulk_import_in_cdc_replication.md">«Массовый импорт в репликации CDC</a>».</p>
<h2 id="Limitations" class="common-anchor-header">Ограничения<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>В настоящее время Milvus CDC имеет следующие ограничения:</p>
<ul>
<li>Поддерживаются только топологии <strong>с одним первичным кластером</strong>.</li>
<li><strong>Не</strong> поддерживает запись в режиме «актив-актив» или с несколькими первичными кластерами.</li>
<li>Резервные кластеры могут обслуживать трафик чтения, но отклоняют прямые записи, пока остаются резервными.</li>
<li>При отработке отказа могут быть утрачены данные, которые были записаны на старый первичный узел, но еще не реплицированы на резервный.</li>
<li>Настроенный набор каналов ( <code translate="no">pchannels</code> ) должен соответствовать фактической схеме каналов каждого кластера.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Часто задаваемые вопросы<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">Может ли резервный кластер обрабатывать запросы?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Да. Резервный кластер может обрабатывать трафик чтения. Он не может принимать записи, пока не станет основным.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Поддерживает ли Milvus CDC запись в режиме «актив-актив»?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. Milvus CDC разработан для топологии с одним основным кластером. Одновременная запись в несколько кластеров может привести к «раздвоению мозга» и расхождению данных.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">Происходит ли потеря данных при переключении?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Нет. При переключении ожидается завершение репликации оставшихся данных, прежде чем резервный кластер станет основным.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">Приводит ли отработка отказа к потере данных?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Возможно. Любые данные, записанные на старый первичный сервер, но ещё не реплицированные на резервный, могут быть утеряны.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">Какой объём данных может быть утрачен при переключении на резервный сервер?<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>Потенциальная потеря данных ограничивается отставанием CDC на момент, когда основной сервер стал недоступным.</p>
