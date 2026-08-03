---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: >-
  Ознакомьтесь с необходимыми подготовительными действиями перед установкой
  Milvus Standalone.
title: Требования к установке автономной версии Milvus
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Требования к установке автономной версии Milvus<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Перед установкой экземпляра Milvus Standalone проверьте, соответствуют ли ваше аппаратное и программное обеспечение установленным требованиям.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Требования к аппаратному обеспечению<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Компонент</th><th>Требование</th><th>Рекомендации</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>Процессор</td><td><ul><li>Процессор Intel Core 2-го поколения или более поздней версии</li><li>Apple Silicon</li></ul></td><td><ul><li>Автономная конфигурация: 4 ядра или более</li><li>Кластер: 8 ядер или более</li></ul></td><td></td></tr>
<tr><td>Набор команд процессора</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Для векторного поиска по сходству и построения индексов в Milvus требуется поддержка процессором наборов расширений «одна инструкция — несколько данных» (SIMD). Убедитесь, что процессор поддерживает хотя бы одно из перечисленных расширений SIMD. Дополнительную информацию см. в разделе <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">«Процессоры с AVX</a> ».</td></tr>
<tr><td>Оперативная память</td><td><ul><li>Автономная система: 8 ГБ</li><li>Кластер: 32 ГБ</li></ul></td><td><ul><li>Автономная система: 16 ГБ</li><li>Кластер: 128 ГБ</li></ul></td><td>Объем оперативной памяти зависит от объема данных.</td></tr>
<tr><td>Жесткий диск</td><td>SSD с интерфейсом SATA 3.0 или выше</td><td>SSD NVMe или выше</td><td>Размер жесткого диска зависит от объема данных.</td></tr>
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
<tr><td>macOS 10.14 или более поздней версии</td><td>Docker Desktop</td><td>Настройте виртуальную машину (ВМ) Docker так, чтобы она использовала не менее 2 виртуальных процессоров (vCPU) и 8 ГБ начальной памяти. В противном случае установка может завершиться сбоем. <br/>Дополнительные сведения см. в разделе <a href="https://docs.docker.com/desktop/mac/install/">«Установка Docker Desktop на Mac</a> ».</td></tr>
<tr><td>Платформы Linux</td><td><ul><li>Docker 19.03 или более поздней версии</li><li>Docker Compose версии 1.25.1 или более поздней</li></ul></td><td>Дополнительные сведения см. в разделах <a href="https://docs.docker.com/engine/install/">«Установка Docker Engine</a> » и <a href="https://docs.docker.com/compose/install/">«Установка Docker Compose</a> ».</td></tr>
<tr><td>Windows с включенной поддержкой WSL 2</td><td>Docker Desktop</td><td>Мы рекомендуем хранить исходный код и другие данные, смонтированные в контейнеры Linux, в файловой системе Linux, а не в файловой системе Windows.<br/>Дополнительную информацию см. в разделах <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">«Установка Docker Desktop» и «Установка Docker Desktop на Windows с бэкендом WSL 2</a> ».</td></tr>
</tbody>
</table>
<p>Следующие зависимости будут автоматически установлены и настроены при установке Milvus Standalone с помощью скрипта Docker или конфигурации Docker Compose:</p>
<table>
<thead>
<tr><th>Программное обеспечение</th><th>Версия</th><th>Примечание</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>См. <a href="#Additional-disk-requirements">дополнительные требования к дисковому пространству</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Входит в состав Milvus</td><td>Очередь сообщений по умолчанию (встроенная); не требуется установка отдельного сервиса.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Необязательно — только если вы переключите очередь сообщений на Pulsar; по умолчанию не устанавливается.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Дополнительные требования к дискам<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Производительность диска имеет решающее значение для etcd. Настоятельно рекомендуется использовать локальные SSD-накопители NVMe. Медленное время отклика диска может привести к частым выборам лидера кластера, что в конечном итоге ухудшит работу службы etcd.</p>
<p>Чтобы проверить, соответствует ли ваш диск требованиям, воспользуйтесь <a href="https://github.com/axboe/fio">утилитой fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>В идеале диск, выделенный для etcd, должен обеспечивать более 500 IOPS и задержку fsync в 99-м процентиле не более 10 мс. Более подробные требования см. в <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">документации</a> etcd.</p>
<h2 id="Whats-next" class="common-anchor-header">Дальнейшие действия<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Если ваше аппаратное и программное обеспечение соответствует приведённым выше требованиям, вы можете</p>
<ul>
<li><a href="/docs/ru/install_standalone-docker.md">запустить Milvus в Docker</a></li>
<li><a href="/docs/ru/install_standalone-docker-compose.md">Запустить Milvus с помощью Docker Compose</a></li>
</ul>
