---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker - это облачная нативная система WAL в Milvus 2.6. Благодаря
  архитектуре с нулевым диском и двум режимам развертывания она обеспечивает
  высокую пропускную способность, низкие операционные накладные расходы и
  плавную масштабируемость на объектных хранилищах.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus 2.6 Woodpecker заменяет Kafka и Pulsar специально разработанной облачной системой журналов с опережающей записью (WAL). Разработанная для объектных хранилищ, Woodpecker упрощает операции, максимизирует пропускную способность и легко масштабируется.</p>
<p>Цели разработки Woodpecker:</p>
<ul>
<li><p>Высочайшая пропускная способность в облачных средах.</p></li>
<li><p>Долговечное протоколирование только с использованием приложений для надежного восстановления</p></li>
<li><p>Минимальные эксплуатационные расходы без локальных дисков и внешних брокеров.</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Архитектура с нулевым диском<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Основная инновация Woodpecker - архитектура с нулевым диском:</p>
<ul>
<li>Все данные журнала хранятся в облачном объектном хранилище (например, Amazon S3, Google Cloud Storage или Alibaba OS).</li>
<li>Метаданные управляются через распределенные хранилища ключевых значений, такие как <strong>etcd.</strong></li>
<li>Отсутствие зависимости от локального диска для основных операций</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>слои woodpecker</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Компоненты архитектуры<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Стандартное развертывание Woodpecker включает в себя следующие компоненты:</p>
<ul>
<li><strong>Клиент</strong>: Интерфейсный уровень для выдачи запросов на чтение и запись</li>
<li><strong>LogStore</strong>: Управляет высокоскоростной буферизацией записей, асинхронной загрузкой в хранилище и уплотнением журналов.</li>
<li><strong>Бэкэнд хранилища</strong>: Поддерживает масштабируемые и недорогие службы хранения, такие как S3, GCS, и файловые системы типа EFS.</li>
<li><strong>Etcd</strong>: Хранит метаданные и координирует состояние журналов на распределенных узлах.</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Режимы развертывания<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker предлагает два режима развертывания в соответствии с вашими потребностями:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Легкий и не требующий обслуживания.</h3><p>Режим MemoryBuffer обеспечивает простой и легкий вариант развертывания, при котором встроенный клиент Woodpecker временно буферизует входящие записи в памяти и периодически сбрасывает их в облачный сервис хранения объектов. В этом режиме буфер памяти встроен непосредственно в клиент, что обеспечивает эффективную сортировку перед отправкой в S3. Управление метаданными осуществляется с помощью <strong>etcd</strong> для обеспечения согласованности и координации. Этот режим лучше всего подходит для пакетных рабочих нагрузок в небольших развертываниях или производственных средах, для которых простота важнее производительности, особенно если низкая задержка записи не является критичной. Задержка записи в этом режиме обычно составляет 200-500 мс.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>развертывание режимов памяти woodpecker</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - оптимизирован для низких задержек и высокой долговечности</h3><p>Режим QuorumBuffer предназначен для чувствительных к задержкам и высокой частоте чтения/записи рабочих нагрузок, требующих как реагирования в реальном времени, так и высокой отказоустойчивости. В этом режиме клиент Woodpecker взаимодействует с системой кворума из трех реплик для обеспечения высокоскоростной буферизации записи, гарантируя высокую согласованность и доступность благодаря распределенному консенсусу.</p>
<p>Запись считается успешной, когда клиент успешно реплицирует данные как минимум на два из трех узлов кворума, что обычно завершается в течение однозначных миллисекунд, после чего данные асинхронно сбрасываются в облачное хранилище объектов для обеспечения долговременной сохранности. Такая архитектура минимизирует состояние узлов, устраняет необходимость в больших локальных дисковых томах и позволяет избежать сложного восстановления против энтропии, которое часто требуется в традиционных системах на основе кворума.</p>
<p>В результате получается упрощенный и надежный уровень WAL, идеально подходящий для критически важных производственных сред, где важны согласованность, доступность и быстрое восстановление.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>развертывание режима кворума woodpecker</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Контрольные показатели производительности<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы провели комплексные бенчмарки, чтобы оценить производительность Woodpecker на одном узле, с одним клиентом и одним лог-потоком. Результаты оказались впечатляющими по сравнению с Kafka и Pulsar:</p>
<table>
<thead>
<tr><th>Система</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Пропускная способность</td><td>129,96 МБ/с</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>задержка</td><td>58 мс</td><td>35мс</td><td>184 мс</td><td>1,8 мс</td><td>166 мс</td></tr>
</tbody>
</table>
<p>Для удобства мы измерили теоретические пределы пропускной способности различных бэкендов хранения данных на нашей тестовой машине:</p>
<ul>
<li>MinIO: ~110 МБ/с</li>
<li>Локальная файловая система: 600-750 МБ/с</li>
<li>Amazon S3 (один экземпляр EC2): до 1,1 ГБ/с.</li>
</ul>
<p>Примечательно, что Woodpecker постоянно достигал 60-80% от максимально возможной пропускной способности для каждого бэкенда - исключительный уровень эффективности для промежуточного ПО.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Основные показатели производительности</h3><ul>
<li>Режим локальной файловой системы: Woodpecker достиг скорости 450 МБ/с - 3,5× быстрее, чем Kafka, и 4,2× быстрее, чем Pulsar, - при сверхнизкой задержке всего 1,8 мс, что делает его идеальным для высокопроизводительных одноузловых развертываний.</li>
<li>Режим облачного хранения (S3): При прямой записи в S3 скорость Woodpecker достигла 750 МБ/с (около 68 % от теоретического предела S3), что на 5,8× выше, чем у Kafka, и на 7× выше, чем у Pulsar. Несмотря на более высокую задержку (166 мс), эта установка обеспечивает исключительную пропускную способность для рабочих нагрузок, ориентированных на пакетную обработку.</li>
<li>Режим хранения объектов (MinIO): Даже в режиме MinIO Woodpecker достиг 71 МБ/с - около 65 % от пропускной способности MinIO. Эта производительность сопоставима с Kafka и Pulsar, но при этом требует значительно меньше ресурсов.</li>
</ul>
<p>Woodpecker особенно оптимизирован для одновременной записи больших объемов данных, где поддержание порядка имеет решающее значение. И эти результаты отражают только ранние этапы разработки - ожидается, что текущие оптимизации в области объединения ввода-вывода, интеллектуальной буферизации и предварительной выборки позволят еще больше повысить производительность до теоретических пределов.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Операционные преимущества<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Облачная нативная архитектура Woodpecker обеспечивает значительные эксплуатационные преимущества:</p>
<ul>
<li><strong>Нулевое управление локальным хранилищем</strong>: Исключается управление дисковыми томами, настройка RAID-массивов и аппаратные сбои.</li>
<li><strong>Автоматическое масштабирование</strong>: Хранилище масштабируется вместе с облачным объектным хранилищем без необходимости планирования емкости.</li>
<li><strong>Экономическая эффективность</strong>: Хранилище с оплатой по факту использования с автоматическим выравниванием и сжатием.</li>
<li><strong>Высокая доступность</strong>: Использование 11-девятикратной долговечности облачных провайдеров с быстрым восстановлением.</li>
<li><strong>Упрощенное развертывание</strong>: Два режима развертывания (MemoryBuffer/QuorumBuffer) соответствуют различным операционным потребностям.</li>
<li><strong>Удобство для разработчиков</strong>: Ускоренная настройка среды и согласованная архитектура во всех средах.</li>
</ul>
<p>Эти преимущества делают Woodpecker особенно ценным для критически важных рабочих нагрузок RAG, агентов искусственного интеллекта и поиска с низкой задержкой, где простота эксплуатации важна не меньше, чем производительность.</p>
