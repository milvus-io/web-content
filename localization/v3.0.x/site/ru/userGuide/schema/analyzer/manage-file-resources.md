---
id: manage-file-resources.md
title: Управление файловыми ресурсами
summary: >-
  Регистрация и управление внешними файлами словарей, которые анализаторы текста
  Milvus могут загружать во время выполнения программы.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Управление файловыми ресурсами<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Файловый ресурс</strong> - это зарегистрированная на сервере ссылка на внешний файл словаря, который текстовые анализаторы потребляют во время выполнения. В Milvus 3.0 четыре компонента анализатора могут загружать свои словари из файлового ресурса, а не из встроенного массива:</p>
<table>
   <tr>
     <th><p><strong>Компонент анализатора</strong></p></th>
     <th><p><strong>Параметр, принимающий файловый ресурс</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/jieba-tokenizer.md">Токенизатор Jieba</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/stop-filter.md">Стоп-фильтр</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/decompounder-filter.md">Фильтр декомпонентов</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/synonym-filter.md">Фильтр синонимов</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Файловые ресурсы решают две практические проблемы, связанные с массивами встроенных словарей:</p>
<ul>
<li><p>Реальные словари очень велики. Словарь китайского языка Jieba может состоять из десятков тысяч строк; таблицы синонимов обычно состоят из тысяч правил. Встраивать их в конфигурацию анализатора непрактично.</p></li>
<li><p>Один и тот же словарь обычно используется во всех коллекциях. Регистрация его один раз и последующее обращение к нему по имени позволяет сохранить схемы небольшими и сделать обновление словаря одной операцией.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Типы файловых ресурсов<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает два типа файловых ресурсов с разными обязанностями по управлению:</p>
<table>
   <tr>
     <th><p><strong>Тип</strong></p></th>
     <th><p><strong>Где находится файл</strong></p></th>
     <th><p><strong>Кто управляет файлом</strong></p></th>
     <th><p><strong>Подходит</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Удаленный</strong></p></td>
     <td><p>В хранилище объектов (MinIO / S3 / GCS / Azure), на использование которого уже настроен ваш кластер Milvus</p></td>
     <td><p>Milvus, через клиентские API <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code>.</p></td>
     <td><p>Рекомендуется для большинства развертываний.</p></td>
   </tr>
   <tr>
     <td><p><strong>Локальный</strong></p></td>
     <td><p>По одному и тому же абсолютному пути в локальной файловой системе каждого компонента Milvus (DataNode, QueryNode, StreamingNode).</p></td>
     <td><p>Вы сами монтируете файл, например, через том Kubernetes.</p></td>
     <td><p>Сценарии с открытым исходным кодом / самостоятельным хостингом, когда вы предпочитаете управлять файлами словарей вне Milvus.</p></td>
   </tr>
</table>
<p>Остальная часть этой страницы посвящена обоим типам, начиная с более распространенного удаленного типа.</p>
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
<li><p>Для <strong>удаленных</strong> файловых ресурсов развертывание Milvus должно быть сконфигурировано с хранилищем объектов. Большинство развертываний уже настроены - проверьте раздел <code translate="no">minio:</code> вашего <code translate="no">milvus.yaml</code> (или эквивалентные значения диаграммы Helm). Обратите внимание на значения <code translate="no">bucketName</code> и <code translate="no">rootPath</code>; они понадобятся вам при регистрации файловых ресурсов.</p></li>
<li><p>Для <strong>локальных</strong> файловых ресурсов вы должны иметь возможность размещать файлы в каждой капсуле/контейнере Milvus по одному и тому же абсолютному пути. Как вы это сделаете, зависит от вашего развертывания (bind mount, том с поддержкой ConfigMap, init-контейнер и т. д.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Регистрация удаленного файлового ресурса<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Регистрация удаленного файлового ресурса - это трехэтапный рабочий процесс: <strong>загрузите</strong> файл в хранилище объектов, <strong>зарегистрируйте</strong> его в Milvus под выбранным именем, а затем <strong>ссылайтесь</strong> на него в любом анализаторе, которому он нужен.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Шаг 1. Загрузка файла словаря в хранилище объектов<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>С помощью собственного инструментария (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code> или любого S3-совместимого клиента) поместите файл в ведро, которое настроено на использование Milvus.</p>
<p>Например, если <code translate="no">milvus.yaml</code> содержит:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Загрузка файла с именем <code translate="no">chinese_terms.txt</code> и префиксом <code translate="no">rootPath</code> помещает объект на <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>Аргумент <code translate="no">path</code>, который вы передадите в <code translate="no">add_file_resource</code> на шаге 2, - это <strong>полный ключ объекта, включая префикс rootPath</strong> - для приведенного выше примера <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Путь без префикса (например, просто <code translate="no">&quot;chinese_terms.txt&quot;</code>) будет отклонен с ошибкой <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Шаг 2. Зарегистрируйте файл в <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> проверяет синхронно: вызов возвращается только после того, как Milvus подтвердит, что объект по адресу <code translate="no">path</code> существует в сконфигурированном хранилище объектов. Если объект отсутствует, вызов вызывает ошибку <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - сначала загрузите файл, а затем повторите попытку.</p>
<p>Вызов является идемпотентным. Вызов <code translate="no">add_file_resource</code> дважды с одними и теми же <code translate="no">name</code> и <code translate="no">path</code> не создает дубликатов.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Шаг 3. Ссылка на файловый ресурс из анализатора<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Везде, где параметр анализатора принимает ссылку на файл (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), используйте каноническую удаленную форму:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Все четыре параметра анализатора используют одну и ту же форму; различается только окружающий ключ анализатора. Конкретные примеры анализаторов см. в разделах "Токенизатор Jieba", "Стоп-фильтр", "Декомпундер" и "Синоним".</p>
<p>Имена параметров <code translate="no">resource_name</code> и <code translate="no">file_name</code> - не <code translate="no">name</code> и <code translate="no">file</code>. Использование <code translate="no">name</code> / <code translate="no">file</code> (или <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> вместо <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) приводит к появлению <code translate="no">MilvusException</code> во время создания анализатора с сообщением, подобным <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Список ресурсов файла<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> возвращает список объектов <code translate="no">FileResourceInfo</code>, каждый из которых имеет атрибуты <code translate="no">.name</code> и <code translate="no">.path</code>. Пустой кластер возвращает <code translate="no">[]</code>. Для каждого ресурса <code translate="no">get</code> не существует; <code translate="no">list_file_resources</code> - единственный API для чтения.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Удаление файлового ресурса<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> является идемпотентным: его вызов для несуществующего имени возвращает <code translate="no">None</code> без повышения.</p>
<p>Перед удалением файлового ресурса удалите или измените все коллекции, конфигурации анализатора которых ссылаются на него. Сохранение файлового ресурса до тех пор, пока ни одна коллекция не будет зависеть от него, позволяет избежать риска сбоя поиска анализатора после того, как ресурс исчезнет.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Использование локального файлового ресурса<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Локальный</strong> файловый ресурс указывает непосредственно на путь в локальной файловой системе каждого компонента Milvus. Нет никакого вызова <code translate="no">add_file_resource</code> - Milvus не отслеживает локальные ресурсы. Вы сами размещаете файл по тому же абсолютному пути в каждом соответствующем стручке или контейнере, а затем ссылаетесь на него по пути:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Локальные файловые ресурсы действительны только в тех развертываниях, где вы контролируете файловые системы DataNodes, QueryNodes и StreamingNodes - обычно это самостоятельное размещение Milvus на пустом металле или на кластере Kubernetes, где вы можете добавить монтирование тома. Файл должен существовать по одному и тому же абсолютному пути на каждом компоненте, иначе некоторые узлы не смогут загрузить анализатор.</p>
<p>Файл открывается при первом создании анализатора. Если в этот момент путь не существует, создание анализатора завершится неудачей с ошибкой <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Соображения<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>Доступность всего кластера не является мгновенной.</strong> После возвращения <code translate="no">add_file_resource</code> Milvus синхронизирует файл со всеми компонентами, которым он нужен. Во время этого короткого окна коллекция, ссылающаяся на ресурс, может не создаться на узлах, которые еще не синхронизировались. Типичное решение - повторить вызов create через несколько секунд.</p></li>
<li><p><strong>Удаляйте только в том случае, если ни одна коллекция не зависит от ресурса.</strong> Удалите или измените любую коллекцию, чья конфигурация анализатора ссылается на ресурс, перед вызовом <code translate="no">remove_file_resource</code>, чтобы избежать неудачных поисков файла в анализаторе.</p></li>
<li><p><strong>Только метаданные.</strong> <code translate="no">list_file_resources()</code> возвращает <code translate="no">name</code> и <code translate="no">path</code> - нет размера, контрольной суммы, времени загрузки или других метаданных. Если вам нужно, отслеживайте версии словарей с помощью собственного соглашения об именовании.</p></li>
</ul>
