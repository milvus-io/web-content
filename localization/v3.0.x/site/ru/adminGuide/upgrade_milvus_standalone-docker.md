---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 'Узнайте, как обновить автономную версию Milvus с помощью Docker Compose.'
title: Обновление автономной версии Milvus с помощью Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ru/upgrade_milvus_standalone-operator.md" class=''>Milvus,</a><a href="/docs/ru/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/ru/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Обновление автономной версии Milvus с помощью Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве описано, как обновить автономную версию Milvus 2.6.x до версии 3.0.5 с помощью Docker Compose.</p>
<div class="alert note">
<p>Эта процедура была проверена на официальной конфигурации Docker Compose для автономной версии Milvus 2.6.20 с изменением, касающимся только образа. На этапе 2 дополнительно добавляется служба владения каталогом данных из конфигурации Compose версии v3.0.5, которая не была охвачена данной проверкой.</p>
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
<li>Docker Engine и Docker Compose V2</li>
<li>Существующий автономный дистрибутив Milvus 2.6.x, управляемый с помощью Docker Compose</li>
<li>Файл Docker Compose и конфигурация, используемые для существующего развертывания</li>
<li>Актуальная резервная копия метаданных Milvus и постоянных данных</li>
</ul>
<p><strong>Ограничения</strong>, связанные с<strong>очередью сообщений</strong>: при обновлении до Milvus v3.0.5 необходимо сохранить текущий выбор системы очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p>
<div class="alert warning">
<p>Не заменяйте текущий файл Compose и не изменяйте версии зависимостей в рамках этой процедуры. Сохраните существующие etcd, объектное хранилище, очередь сообщений, тома и конфигурацию. Обновите тег образа Milvus и добавьте службу владения каталогом данных, как описано в шаге 2.</p>
<p>Если в вашем файле Compose используется тег <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code>, а Docker не может загрузить этот образ, замените его на <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, который используется в конфигурации Compose версии 3.0.5. Сохраните тот же тег выпуска.</p>
<p>Эта процедура не проверяет возможность перехода на более раннюю версию или отката путем смены образа Milvus обратно на версию 2.6.x. После записи данных версией v3.0.5 откат, выполняемый только для образа, может не смочь прочитать обновлённое состояние. Если обновление завершится сбоем, остановите запись данных и воспользуйтесь планом восстановления, который восстанавливает метаданные, существовавшие до обновления, и резервные копии постоянных данных. Сначала проверьте план восстановления в тестовой среде.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Процесс обновления<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Шаг 1: Сделайте резервную копию текущей конфигурации<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Сохраните копию текущего файла Compose и всех смонтированных файлов конфигурации Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Перед началом обновления убедитесь, что текущие контейнеры находятся в рабочем состоянии:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Шаг 2: Обновите образ Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>В существующем файле Compose обновите образ службы <code translate="no">standalone</code>, замените записи <code translate="no">depends_on</code> на приведенные ниже и добавьте службу <code translate="no">milvus-volume-init</code>. Используйте один и тот же образ для обеих служб и смонтируйте тот же каталог хоста, который служба <code translate="no">standalone</code> монтирует по адресу <code translate="no">/var/lib/milvus</code>. Оставьте остальные настройки службы <code translate="no">standalone</code> без изменений:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Образы Milvus v3.0.5 запускают Milvus от имени пользователя <code translate="no">milvus</code> (не root), тогда как образы Milvus 2.6.x не задают пользователя и запускают Milvus от имени <code translate="no">root</code>. Служба <code translate="no">milvus-volume-init</code> взята из конфигурации Compose версии v3.0.5. Она запускается один раз как <code translate="no">root</code> до запуска Milvus и изменяет владельца каталога <code translate="no">/var/lib/milvus</code> и его содержимого на пользователя и группу <code translate="no">milvus</code>, чтобы Milvus мог записывать в файлы, созданные при развертывании версии 2.6.x. Затем она записывает маркерный файл <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> в каталог <code translate="no">/var/lib/milvus</code> и не вносит никаких изменений при последующих запусках, пока этот маркерный файл существует. Если позже вы восстановите в каталог данных файлы, принадлежащие другому пользователю, удалите файл-маркер, чтобы служба снова заработала.</p>
<p>Загрузите целевой образ и заново создайте контейнер Milvus. Поскольку служба <code translate="no">standalone</code> зависит от <code translate="no">milvus-volume-init</code>, Docker Compose дожидается завершения работы <code translate="no">milvus-volume-init</code> перед запуском нового контейнера Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose поддерживает работу существующих контейнеров etcd и object-storage и повторно использует настроенные каталоги данных. Если вы изменили конфигурацию какой-либо зависимости, например образа MinIO, Compose заново создаст этот контейнер и сохранит его смонтированные тома.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Проверка обновления<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Проверьте состояние контейнера и образ, используемый контейнером Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что служба <code translate="no">standalone</code> работает исправно, её образ — <code translate="no">milvusdb/milvus:v3.0.5</code>, а существующие коллекции по-прежнему доступны для запросов и поиска. Выполните эти проверки, прежде чем включать какие-либо функции, специфичные для версии v3.0.5.</p>
<div class="alert note">
<p>Обновление до Milvus 3.0 не приводит к включению Storage V3. После проверки обновления ознакомьтесь с <a href="/docs/ru/storage-v3.md">Storage V3</a>, прежде чем включать функции, зависящие от него. После того как Milvus запишет данные в Storage V3, переход на более старую версию Milvus, не поддерживающую чтение данных из Storage V3, не допускается.</p>
</div>
