---
id: troubleshooting.md
summary: >-
  Узнайте о типичных проблемах, с которыми вы можете столкнуться при работе с
  Milvus, и о том, как их решить.
title: Устранение неполадок
---
<h1 id="Troubleshooting" class="common-anchor-header">Устранение неполадок<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице перечислены общие проблемы, которые могут возникнуть при работе Milvus, а также возможные советы по их устранению. Проблемы на этой странице делятся на следующие категории:</p>
<ul>
<li><a href="#boot_issues">Проблемы с загрузкой</a></li>
<li><a href="#runtime_issues">Проблемы времени выполнения</a></li>
<li><a href="#api_issues">Проблемы с API</a></li>
<li><a href="#etcd_crash_issues">проблемы с аварийным завершением работы etcd</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">Проблемы загрузки<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Ошибки загрузки обычно фатальны. Выполните следующую команду, чтобы просмотреть подробную информацию об ошибке:</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">Проблемы во время выполнения<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Ошибки, возникающие во время выполнения, могут привести к сбоям в работе службы. Чтобы устранить эту проблему, проверьте совместимость между сервером и клиентом, прежде чем двигаться дальше.</p>
<h2 id="API-issues" class="common-anchor-header">Проблемы API<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Эти проблемы возникают во время вызовов методов API между сервером Milvus и вашим клиентом. Они будут возвращены клиенту синхронно или асинхронно.</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">Проблемы сбоя etcd<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. etcd pod pending</h3><p>Кластер etcd по умолчанию использует pvc. StorageClass должен быть предварительно сконфигурирован для кластера Kubernetes.</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. Авария etcd pod</h3><p>Когда etcd pod терпит крах с <code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code>, вы можете войти в этот pod и удалить файл <code translate="no">/bitnami/etcd/data/member_id</code>.</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3. Несколько стручков продолжают аварийно завершаться, в то время как <code translate="no">etcd-0</code> все еще запущен.</h3><p>Вы можете выполнить следующий код, если несколько стручков продолжают падать, пока <code translate="no">etcd-0</code> все еще запущен.</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4. Все капсулы аварийно завершают работу</h3><p>Если все капсулы аварийно завершают работу, попробуйте скопировать файл <code translate="no">/bitnami/etcd/data/member/snap/db</code>. Используйте <code translate="no">https://github.com/etcd-io/bbolt</code> для изменения данных базы данных.</p>
<p>Все метаданные Milvus хранятся в ведре <code translate="no">key</code>. Создайте резервную копию данных в этом ведре и выполните следующие команды. Обратите внимание, что данные префикса в файле <code translate="no">by-dev/meta/session</code> не требуют резервного копирования.</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>Если вам нужна помощь в решении проблемы, не стесняйтесь:</p>
<ul>
<li>Присоединяйтесь к нашему <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">каналу Slack</a> и обратитесь за поддержкой к команде Milvus.</li>
<li>Оформите<a href="https://github.com/milvus-io/milvus/issues/new/choose">проблему</a> на GitHub с подробным описанием вашей проблемы.</li>
</ul>
