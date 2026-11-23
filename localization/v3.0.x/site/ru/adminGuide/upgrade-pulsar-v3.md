---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: >-
  Узнайте, как обновить Pulsar с версии V2 до V3 в Milvus, чтобы вы могли
  использовать последнюю версию Milvus v2.5.x.
title: Обновление Pulsar в Milvus с версии V2 до V3
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">Обновление Pulsar ​<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой статье описана процедура обновления компонента Pulsar с версии V2 до V3, если у вас уже есть работающая установка Milvus с Pulsar V2.​</p>
<p>Начиная с Milvus v2.5, <strong>milvus-helm</strong> и <strong>milvus-operator</strong> по умолчанию будут использовать Pulsar V3 для устранения некоторых ошибок и уязвимостей безопасности.​ Хотя Milvus 2.5 совместим с Pulsar 2.x, обновление до Pulsar V3 не является обязательным. Для повышения стабильности и производительности мы рекомендуем обновиться до Pulsar V3.</p>
<p>Если вы предпочитаете использовать Pulsar V2 с Milvus v2.5.x, ознакомьтесь с руководством <a href="/docs/ru/use-pulsar-v2.md">«Использование Pulsar V2 с Milvus v2.5.x</a>».</p>
<div class="alert note">
<ol>
<li><p>Процесс обновления требует кратковременного перерыва в работе сервиса (обычно занимает от нескольких минут до более десяти минут, в зависимости от объема данных).​</p></li>
<li><p>Перед началом операции необходимо остановить все запущенные клиенты, записывающие данные в Milvus. В противном случае записанные данные могут быть утеряны.​</p></li>
<li><p>В данной статье предполагается, что Milvus установлен в пространстве имён <code translate="no">default</code> и имеет имя <code translate="no">my-release</code>. При выполнении команд, скопированных с этой страницы, пожалуйста, замените параметры на своё собственное пространство имён и название версии.​</p></li>
<li><p>Убедитесь, что ваша рабочая среда имеет права доступа в указанном выше пространстве имён в кластере Kubernetes и что установлены следующие версии:​</p>
<p>a. <code translate="no">kubectl</code> &gt;= 1.20​</p>
<p>b. <code translate="no">helm</code> &gt;= 3.14.0​</p>
<p>c. <code translate="no">cat</code>, <code translate="no">grep</code>, <code translate="no">awk</code> для операций с строками​</p>
<p>d. <code translate="no">curl</code> или <strong>Attu v2.4+</strong> для взаимодействия с API управления Milvus​</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">План развития<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Процесс обновления включает следующие этапы:</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">Сохраните данные, не используемые в Pulsar​.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">Остановите Milvus и удалите Pulsar V2​.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">Запустите Pulsar V3 и Milvus​.</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">Процедуры<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе приведены подробные инструкции по обновлению Pulsar с версии V2 до V3 в Milvus.</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">Сохранение данных, не использованных в Pulsar<button data-href="#Persist-data-not-consumed-in-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>На этом этапе необходимо убедиться, что существующие данные в Pulsar были сохранены в службе объектного хранения. Доступно два подхода, и вы можете выбрать тот, который соответствует вашим потребностям.</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">Подход 1: Использование Attu</h4><p>Если в вашей рабочей среде Milvus имеется лишь небольшое количество коллекций с небольшим числом сегментов, вы можете использовать Attu для сохранения данных в службе объектного хранения.​</p>
<ol>
<li><p>Выберите все коллекции во всех ваших базах данных, перейдите на панель « <code translate="no">Segments</code> », нажмите кнопку « <code translate="no">Flush</code> »​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" /> 
   <span>Панель «Segment» коллекции</span>
  
 </span></p></li>
<li><p>Затем во всплывающем окне снова нажмите « <code translate="no">Flush</code> ».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" /> 
   <span>Запрос на сброс данных в Attu</span>
  
 </span></p></li>
<li><p>Затем дождитесь, пока состояние постоянных сегментов всех коллекций не станет « <code translate="no">Flushed</code> ».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" /> 
   <span>Просмотр статуса очистки данных в Attu</span>
  
 </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">Способ 2: Использование API управления</h4><ol>
<li><p>Направьте трафик через прокси-порт 9091 прокси-сервера Milvus на локальный хост для последующих операций.​</p>
<pre><code translate="no" class="language-bash">kubectl -n default port-forward deploy/my-release-milvus-proxy 9091:9091 &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>Результат:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>] <span class="hljs-number">8116</span><span class="hljs-string">​</span>
<span class="hljs-string">Forwarding</span> <span class="hljs-string">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span><span class="hljs-string">:9091</span> <span class="hljs-string">-&gt;</span> <span class="hljs-number">9091</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Сохраните PID для последующей очистки.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">pid=8116​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Запустите действие по сохранению всех вставленных данных из Pulsar в объектное хранилище.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>Результат:​</p>
<pre><code translate="no" class="language-yaml">{<span class="hljs-string">​</span>
  <span class="hljs-attr">&quot;segmentIDs&quot;:</span> [<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998181000</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953999383600</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998180800</span><span class="hljs-string">​</span>
  ]<span class="hljs-string">​</span>
}<span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверить, что все сегменты сброшены.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>По завершении вы должны увидеть следующий вывод​</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span><span class="hljs-attr">&quot;flushed&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">}</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Остановите фоновый процесс « <code translate="no">kubectl port-forward</code> »​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kill</span> <span class="hljs-string">$pid​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Результат:</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>]  <span class="hljs-string">+</span> <span class="hljs-number">8116 </span><span class="hljs-string">terminated</span>  <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">port-forward</span> <span class="hljs-string">deploy/my-release-milvus-proxy</span> <span class="hljs-number">9091</span><span class="hljs-string">:9091</span>                      <span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">Остановите Milvus и удалите Pulsar V2<button data-href="#Stop-Milvus-and-delete-Pulsar-V2" class="anchor-icon" translate="no">
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
    </button></h3><p>На этом этапе необходимо остановить под Milvus и удалить развертывание Pulsar V2. Доступны два отдельных раздела:</p>
<ul>
<li><p>Для пользователей Milvus Helm</p>
<p>Если вы установили Milvus с помощью диаграммы Helm для Milvus, перейдите к разделу <a href="#Delete-Pulsar-V2-using-Helm">«Удаление Pulsar V2 с помощью Helm</a>».</p></li>
<li><p>Для пользователей Milvus Operator</p>
<p>Если вы установили Milvus с помощью Milvus Operator, перейдите к разделу <a href="#Delete-Pulsar-V2-using-Milvus-Operator">«Удаление Pulsar V2 с помощью Milvus Operator</a>».</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">Удаление Pulsar V2 с помощью Helm</h4><p>Если вы установили Milvus с помощью диаграммы Milvus Helm, выполните приведенные ниже действия, чтобы остановить под Milvus и удалить развертывание Pulsar V2.</p>
<ol>
<li><p>Сохраните текущие значения релиза Milvus в файле « <code translate="no">values.yaml</code> » для последующего восстановления:​</p>
<pre><code translate="no" class="language-bash">helm -n default get values my-release -o yaml &gt; values.yaml​
<span class="hljs-built_in">cat</span> values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Используйте команду для остановки Milvus и всех зависимостей. Не беспокойтесь о томах данных — по умолчанию они будут сохранены.​</p>
<pre><code translate="no" class="language-bash">helm -n default uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>Вывод​</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[PersistentVolumeClaim] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Необходимо очистить список PVC и PV Pulsar (Persistent Volume Claims и Persistent Volume)​</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>Вывод​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">Volume</span> <span class="hljs-string">Claims:​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​</span>
<span class="hljs-string">Volumes:​</span>
<span class="hljs-string">pvc-f590a4de-df31-4ca8-a424-007eac3c619a​</span>
<span class="hljs-string">pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​</span>
<span class="hljs-string">pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​</span>
<span class="hljs-string">pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​</span>
<span class="hljs-string">pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Убедитесь, что список PVC в файле <code translate="no">pulsar-pvcs.txt</code> состоит исключительно из элементов Pulsar.​ После того как вы убедитесь в отсутствии ошибок, удалите эти PVC.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> pulsar-pvcs.txt |xargs -I {} kubectl -n default delete pvc {} --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Результат:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> <span class="hljs-string">deleted​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(Необязательно) В зависимости от класса хранения, предоставляющего PVC, может потребоваться также вручную удалить PV.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">cat</span> <span class="hljs-string">pulsar-pvs.txt</span> <span class="hljs-string">|xargs</span> <span class="hljs-string">-I</span> {} <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">delete</span> <span class="hljs-string">pvc</span> {} <span class="hljs-string">--wait=false​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Не беспокойтесь, если выводят ошибки NotFound. Они уже удалены контроллерами Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">Удаление Pulsar V2 с помощью Milvus Operator</h4><p>Если вы установили Milvus с помощью Milvus Operator, выполните следующие действия, чтобы остановить под Milvus и удалить развертывание Pulsar V2.</p>
<ol>
<li><p>Сохраните текущий манифест Milvus в файле <code translate="no">milvus.yaml</code> для дальнейшего использования​.</p>
<pre><code translate="no" class="language-bash">kubectl -n default get milvus my-release -o yaml &gt; milvus.yaml​
<span class="hljs-built_in">head</span> milvus.yaml -n 20​

<button class="copy-code-btn"></button></code></pre>
<p>Результат:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-string">annotations:​</span>
    <span class="hljs-attr">milvus.io/dependency-values-merged:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/pod-service-label-added:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/querynode-current-group-id:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-attr">creationTimestamp:</span> <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-string">finalizers:​</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus.milvus.io/finalizer​</span>
  <span class="hljs-attr">generation:</span> <span class="hljs-number">3</span><span class="hljs-string">​</span>
  <span class="hljs-string">labels:​</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus​</span>
    <span class="hljs-attr">milvus.io/operator-version:</span> <span class="hljs-number">1.1</span><span class="hljs-number">.2</span><span class="hljs-string">​</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">my-release​</span>
<span class="hljs-attr">namespace:</span> <span class="hljs-string">default​</span>
<span class="hljs-attr">resourceVersion:</span> <span class="hljs-string">&quot;692217324&quot;</span><span class="hljs-string">​</span>
<span class="hljs-attr">uid:</span> <span class="hljs-string">7a469ed0-9df1-494e-bd9a-340fac4305b5​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">components:​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Создайте файл <code translate="no">patch.yaml</code> со следующим содержанием.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># a patch to retain etcd &amp; storage data and delete pulsar data while delete milvus​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">etcd:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">storage:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Используйте файл ` <code translate="no">kubectl patch</code> `, чтобы сохранить данные etcd и хранилища и удалить данные Pulsar при удалении Milvus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">patch</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release</span> <span class="hljs-string">--patch-file</span> <span class="hljs-string">patch.yaml</span> <span class="hljs-string">--type=merge​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Результат:​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Остановите Milvus и удалите Pulsar V2. Не беспокойтесь о томах данных etcd и объектного хранилища — они будут сохранены по умолчанию.</p>
<pre><code translate="no" class="language-bash">kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​
kubectl -n default get milvus my-release​
kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Результат: Обратите внимание, что для плавной остановки milvus и удаления томов pulsar оператором может потребоваться несколько минут.​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   True      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь завершения выполнения команды.</p></li>
<li><p>Проверьте ещё раз, чтобы убедиться, что ресурс Milvus удалён​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">get</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Результат должен выглядеть примерно так:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-literal">No</span> <span class="hljs-string">resources</span> <span class="hljs-string">found</span> <span class="hljs-string">in</span> <span class="hljs-string">default</span> <span class="hljs-string">namespace.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">Запустите Pulsar V3 и Milvus<button data-href="#Start-Pulsar-V3-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>На этом этапе вам необходимо запустить поды Pulsar V3 и Milvus. Доступны два отдельных раздела:</p>
<ul>
<li><p>Для пользователей Helm</p>
<p>Если вы установили Milvus с помощью диаграммы Helm для Milvus, перейдите в раздел <a href="#For-Helm-User">«Для пользователей Helm</a>».</p></li>
<li><p>Для пользователей Milvus Operator</p>
<p>Если вы установили Milvus с помощью Milvus Operator, перейдите к разделу <a href="#For-Milvus-Operator-User">«Для пользователей Milvus Operator</a>».</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">Запуск Pulsar V3 с помощью Helm</h4><ol>
<li><p>Отредактируйте файл « <code translate="no">values.yaml</code> », сохраненный на предыдущем шаге.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
<span class="hljs-string">pulsar:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
<span class="hljs-string">pulsarv3:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Обновите локальный репозиторий Helm​</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm​
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>Результат</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists with the same configuration, skipping​
Hang tight <span class="hljs-keyword">while</span> we grab the latest from your chart repositories...​
...Successfully got an update from the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
Update Complete. ⎈Happy Helming!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Установите релиз Milvus с новейшей версией диаграммы Helm, используя отредактированный файл « <code translate="no">values.yaml</code> »​</p>
<pre><code translate="no" class="language-bash">helm -n default install my-release zilliztech/milvus --reset-values -f values.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>Результат</p>
<pre><code translate="no" class="language-bash">NAME: my-release​
LAST DEPLOYED: Fri Nov 22 15:31:27 2024​
NAMESPACE: default​
STATUS: deployed​
REVISION: 1​
TEST SUITE: None​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте, все ли поды запланированы и запущены с помощью команды ` <code translate="no">kubectl -n default get pods</code>`.</p>
<p>Запуск всех подов может занять несколько минут​</p>
<p>Вывод будет выглядеть примерно так:​</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd-0                             1/1     Running     0          4m3s​
my-release-milvus-datanode-56487bc4bc-s6mbd   1/1     Running     0          4m5s​
my-release-milvus-indexnode-6476894d6-rv85d   1/1     Running     0          4m5s​
my-release-milvus-mixcoord-6d8875cb9c-67fcq   1/1     Running     0          4m4s​
my-release-milvus-proxy-7bc45d57c5-2qf8m      1/1     Running     0          4m4s​
my-release-milvus-querynode-77465747b-kt7f4   1/1     Running     0          4m4s​
my-release-minio-684ff4f5df-pnc97             1/1     Running     0          4m5s​
my-release-pulsarv3-bookie-0                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-1                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-2                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-init-6z4tk         0/1     Completed   0          4m1s​
my-release-pulsarv3-broker-0                  1/1     Running     0          4m2s​
my-release-pulsarv3-broker-1                  1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-0                   1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-1                   1/1     Running     0          4m2s​
my-release-pulsarv3-pulsar-init-wvqpc         0/1     Completed   0          4m1s​
my-release-pulsarv3-recovery-0                1/1     Running     0          4m3s​
my-release-pulsarv3-zookeeper-0               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-1               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-2               1/1     Running     0          4m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">Запустите Pulsar V3 и используйте Milvus Operator</h4><ol>
<li><p>Отредактируйте файл ` <code translate="no">milvus.yaml</code> `, сохраненный на предыдущем шаге.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-attr">annotations:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">resourceVersion:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">uid:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v3​</span>
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        <span class="hljs-attr">values:</span> <span class="hljs-literal">null</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Убедитесь, что ваш Milvus Operator обновлен до версии v1.1.2 или более поздней​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">add</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">https://zilliztech.github.io/milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">update</span> <span class="hljs-string">milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">-n</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">upgrade</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">milvus-operator/milvus-operator​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Используйте команду для запуска Milvus с Pulsar V3​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">-f</span> <span class="hljs-string">milvus.yaml​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Результат​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">milvus.milvus.io/my-release</span> <span class="hljs-string">created​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте, все ли поды запланированы и запущены с помощью <code translate="no">kubectl -n default get pods</code>.</p>
<p>Запуск всех под-контейнеров может занять несколько минут.​</p>
<p>Результат будет выглядеть примерно так:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">NAME</span>                                            <span class="hljs-string">READY</span>   <span class="hljs-string">STATUS</span>      <span class="hljs-string">RESTARTS</span>   <span class="hljs-string">AGE​</span>
<span class="hljs-string">my-release-etcd-0</span>                               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-milvus-datanode-57fd59ff58-5mdrk</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-indexnode-67867c6b9b-4wsbw</span>    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-mixcoord-797849f9bb-sf8z5</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-proxy-5d5bf98445-c55m6</span>        <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-querynode-0-64797f5c9-lw4rh</span>   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">92s​</span>
<span class="hljs-string">my-release-minio-79476ccb49-zvt2h</span>               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-pulsar-bookie-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-2</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-init-v8fdj</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-proxy-0</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-proxy-1</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-pulsar-init-5lhx7</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-recovery-0</span>                    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-0</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-1</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-2</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>​</p>
