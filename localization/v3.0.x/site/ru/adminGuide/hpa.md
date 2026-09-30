---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Узнайте, как настроить Horizontal Pod Autoscaling (HPA) для динамического
  масштабирования кластера Milvus.
title: Настройка горизонтального автомасштабирования (HPA) для Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Настройка горизонтального автомасштабирования (HPA) для Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA) - это функция Kubernetes, которая автоматически регулирует количество бодов в развертывании на основе использования ресурсов, таких как процессор или память. В Milvus HPA можно применить к компонентам без статических данных, таким как <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code> и <code translate="no">indexNode</code>, чтобы динамически масштабировать кластер в ответ на изменения рабочей нагрузки.</p>
<p>В этом руководстве рассказывается о том, как настроить HPA для компонентов Milvus с помощью Milvus Operator.</p>
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
<li>Работающий кластер Milvus, развернутый с помощью Milvus Operator.</li>
<li>Доступ к сайту <code translate="no">kubectl</code> для управления ресурсами Kubernetes.</li>
<li>Знакомство с архитектурой Milvus и Kubernetes HPA.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Настройка HPA с помощью Milvus Operator<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы включить HPA в кластере Milvus, управляемом Milvus Operator, выполните следующие действия:</p>
<ol>
<li><p><strong>Установите значение Replicas на -1</strong>:</p>
<p>В пользовательском ресурсе Milvus (CR) установите в поле <code translate="no">replicas</code> значение <code translate="no">-1</code> для компонента, который вы хотите масштабировать с помощью HPA. Это передаст управление масштабированием HPA, а не оператору. Вы можете редактировать CR напрямую или использовать следующую команду <code translate="no">kubectl patch</code> для быстрого переключения на управление HPA:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Замените <code translate="no">&lt;your-release-name&gt;</code> на имя вашего кластера Milvus.</p>
<p>Чтобы убедиться, что изменения были применены, выполните команду:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат должен быть <code translate="no">-1</code>, подтверждающий, что компонент <code translate="no">proxy</code> теперь находится под управлением HPA.</p>
<p>Кроме того, вы можете определить его в CR YAML:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;your-release-name&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Define an HPA Resource</strong>:</p>
<p>Создайте ресурс HPA для целевого развертывания нужного компонента. Ниже приведен пример для компонента <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">autoscaling/v2</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">HorizontalPodAutoscaler</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy-hpa</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">scaleTargetRef:</span>
    <span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy</span>
  <span class="hljs-attr">minReplicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">maxReplicas:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">metrics:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">cpu</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">memory</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
  <span class="hljs-attr">behavior:</span>
    <span class="hljs-attr">scaleUp:</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">30</span>
    <span class="hljs-attr">scaleDown:</span>
      <span class="hljs-attr">stabilizationWindowSeconds:</span> <span class="hljs-number">300</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">60</span>
<button class="copy-code-btn"></button></code></pre>
<p>Замените <code translate="no">my-release</code> в <code translate="no">metadata.name</code> и <code translate="no">spec.scaleTargetRef.name</code> на фактическое имя кластера Milvus (например, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> и <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Примените конфигурацию HPA</strong>:</p>
<p>Разверните ресурс HPA с помощью следующей команды:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы убедиться, что HPA успешно создан, выполните команду:</p>
<pre><code translate="no" class="language-bash">kubectl get hpa
<button class="copy-code-btn"></button></code></pre>
<p>Вы должны увидеть результаты, аналогичные следующим:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-operator">-</span>hpa   Deployment<span class="hljs-operator">/</span>my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy   <span class="hljs-operator">&lt;</span><span class="hljs-keyword">some</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">/</span><span class="hljs-number">60</span><span class="hljs-operator">%</span>      <span class="hljs-number">2</span>         <span class="hljs-number">10</span>        <span class="hljs-number">2</span>          <span class="hljs-operator">&lt;</span><span class="hljs-type">time</span><span class="hljs-operator">&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Поля <code translate="no">NAME</code> и <code translate="no">REFERENCE</code> будут отражать имя вашего кластера (например, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> и <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Указывает развертывание для масштабирования (например, <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> и <code translate="no">maxReplicas</code>: Задает диапазон масштабирования (в данном примере от 2 до 10 стручков).</li>
<li><code translate="no">metrics</code>: Настраивает масштабирование на основе использования процессора и памяти, ориентируясь на среднее использование 60 %.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA позволяет Milvus эффективно адаптироваться к изменяющимся рабочим нагрузкам. Используя команду <code translate="no">kubectl patch</code>, вы можете быстро переключить компонент на управление HPA без ручного редактирования всего CR. Для получения более подробной информации обратитесь к <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">документации Kubernetes HPA</a>.</p>
