---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Перед установкой Milvus Standalone проведите необходимую подготовку.
title: Требования к установке Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Требования к установке Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Перед установкой экземпляра Milvus Standalone проверьте свое оборудование и программное обеспечение на соответствие требованиям.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Требования к оборудованию<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Компонент</th><th>Требование</th><th>Рекомендация</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>ПРОЦЕССОР</td><td><ul><li>Процессор Intel 2-го поколения Core или выше</li><li>Apple Silicon</li></ul></td><td><ul><li>Автономный: 4 ядра или более</li><li>Кластер: 8 ядер и более</li></ul></td><td></td></tr>
<tr><td>Набор инструкций процессора</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Поиск векторного сходства и построение индексов в Milvus требуют поддержки процессором наборов расширений "одна инструкция - несколько данных" (SIMD). Убедитесь, что процессор поддерживает хотя бы одно из перечисленных расширений SIMD. Дополнительные сведения см. в разделе <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">"Процессоры с AVX"</a>.</td></tr>
<tr><td>ОПЕРАТИВНАЯ ПАМЯТЬ</td><td><ul><li>Автономный: 8 Гб</li><li>Кластер: 32G</li></ul></td><td><ul><li>Автономная: 16 Гб</li><li>Кластер: 128G</li></ul></td><td>Объем оперативной памяти зависит от объема данных.</td></tr>
<tr><td>Жесткий диск</td><td>Твердотельный накопитель SATA 3.0 или выше</td><td>Твердотельный накопитель NVMe или выше</td><td>Объем жесткого диска зависит от объема данных.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Требования к программному обеспечению<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>Операционная система</th><th>Программное обеспечение</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 или более поздняя версия</td><td>Рабочий стол Docker</td><td>Установите виртуальную машину Docker (VM) так, чтобы она использовала минимум 2 виртуальных процессора (vCPU) и 8 ГБ начальной памяти. В противном случае установка может завершиться неудачей. <br/>Дополнительные сведения см. в разделе <a href="https://docs.docker.com/desktop/mac/install/">Установка Docker Desktop на Mac</a>.</td></tr>
<tr><td>Платформы Linux</td><td><ul><li>Docker 19.03 или более поздняя версия</li><li>Docker Compose 1.25.1 или более поздней версии.</li></ul></td><td>Дополнительные сведения см. в разделах <a href="https://docs.docker.com/engine/install/">Установка Docker Engine</a> и <a href="https://docs.docker.com/compose/install/">Установка Docker Compose</a>.</td></tr>
<tr><td>Windows с включенным WSL 2</td><td>Рабочий стол Docker</td><td>Мы рекомендуем хранить исходный код и другие данные, привязанные к контейнерам Linux, в файловой системе Linux, а не в файловой системе Windows.<br/>Дополнительную информацию см. в разделе <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Установка Docker Desktop на Windows с бэкендом WSL 2</a>.</td></tr>
</tbody>
</table>
<p>Следующие зависимости будут получены и настроены автоматически при установке Milvus Standalone с помощью сценария Docker или конфигурации Docker Compose:</p>
<table>
<thead>
<tr><th>Программное обеспечение</th><th>Версия</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>См. <a href="#Additional-disk-requirements">дополнительные требования к диску</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Дополнительные требования к диску<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Производительность дисков очень важна для работы etcd. Настоятельно рекомендуется использовать локальные NVMe SSD. Более медленный отклик диска может привести к частым выборам кластера, что в конечном итоге приведет к деградации сервиса etcd.</p>
<p>Чтобы проверить, соответствует ли ваш диск требованиям, используйте <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>В идеале ваш диск, предназначенный для etcd, должен достигать более 500 IOPS и менее 10 мс для 99-го процентиля задержки fsync. Более подробные требования можно найти в <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">документации по</a> etcd.</p>
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
    </button></h2><p>Если ваше оборудование и программное обеспечение соответствуют вышеуказанным требованиям, вы можете</p>
<ul>
<li><a href="/docs/ru/install_standalone-docker.md">Запустить Milvus в Docker</a></li>
<li><a href="/docs/ru/install_standalone-docker-compose.md">Запустить Milvus с помощью Docker Compose</a></li>
</ul>
