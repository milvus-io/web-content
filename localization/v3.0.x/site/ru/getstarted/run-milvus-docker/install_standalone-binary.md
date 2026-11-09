---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Проверьте наличие пакета RPM/DEB и выберите поддерживаемый способ автономной
  установки Milvus.
title: Установка автономной версии Milvus с помощью пакетов RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Установка автономной версии Milvus с помощью пакетов RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице описана доступность пакетов для Milvus Standalone и приведены ссылки на инструкции по установке с использованием опубликованных релизных материалов.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Проверка наличия пакетов<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>В выпусках Milvus 3.0.x, включая <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">версию 3.0.5</a>, публикуются файлы конфигурации Docker Compose, но не публикуются пакеты RPM или DEB. Не создавайте URL-адреса для загрузки RPM или DEB для этих выпусков; указание имени файла пакета в команде загрузки не делает этот ресурс доступным.</p>
<p>Для других версий перед выбором метода установки пакета проверьте раздел <strong>«Ресурсы»</strong> на <a href="https://github.com/milvus-io/milvus/releases">странице выпуска Milvus</a>. Используйте только те пакеты, которые действительно указаны для данной версии и архитектуры вашей системы.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Установка автономной версии Milvus с помощью Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Для версии 3.0.5 выберите один из следующих способов установки:</p>
<ul>
<li><a href="/docs/ru/install_standalone-docker-compose.md">Запустите Milvus с помощью Docker Compose (Linux)</a>, чтобы использовать конфигурацию Compose, опубликованную вместе с версией v3.0.5.</li>
<li><a href="/docs/ru/install_standalone-docker.md">Запустите Milvus в Docker (Linux)</a>, чтобы использовать скрипт автономной установки. Перед запуском скрипта проверьте тег образа.</li>
<li><a href="/docs/ru/install_standalone-windows.md">Запустите Milvus в Docker (Windows)</a>, чтобы использовать Docker Desktop с бэкендом WSL 2 и контейнерами Linux.</li>
</ul>
<p>Перед установкой проверьте <a href="/docs/ru/prerequisite-docker.md">системные требования к аппаратному и программному обеспечению</a>. После запуска экземпляра следуйте инструкциям раз <strong>дела «Использование существующего сервера Milvus»</strong> в <a href="/docs/ru/quickstart.md">руководстве «Быстрый старт»</a>, подключившись к <code translate="no">http://localhost:19530</code> вместо локального пути <code translate="no">.db</code>, чтобы внести данные и запустить поиск.</p>
