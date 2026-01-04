---
id: resource_group.md
related_key: Manage Resource Groups
summary: 'Узнайте, как управлять группами ресурсов.'
title: Управление группами ресурсов
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">Управление группами ресурсов<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus можно использовать группу ресурсов, чтобы физически изолировать определенные узлы запросов от других. В этом руководстве рассказывается о том, как создавать и управлять пользовательскими группами ресурсов, а также перемещать узлы между ними.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">Что такое группа ресурсов<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Группа ресурсов может содержать несколько или все узлы запросов в кластере Milvus. Вы решаете, как распределить узлы запросов между группами ресурсов, исходя из того, что для вас наиболее целесообразно. Например, в сценарии с несколькими коллекциями можно выделить соответствующее количество узлов запросов для каждой группы ресурсов и загрузить коллекции в разные группы ресурсов, чтобы операции внутри каждой коллекции были физически независимы от операций в других коллекциях.</p>
<p>Обратите внимание, что экземпляр Milvus поддерживает ресурсную группу по умолчанию для хранения всех узлов запросов при запуске и называет ее <strong>__default_resource_group</strong>.</p>
<p>Начиная с версии 2.4.1, Milvus предоставляет декларативный API групп ресурсов, в то время как старый API групп ресурсов был устаревшим. Новый декларативный API позволяет пользователям достичь идемпотентности, чтобы упростить вторичную разработку в облачных нативных средах.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">Понятия группы ресурсов<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>Группа ресурсов описывается конфигурацией группы ресурсов:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Атрибут <strong>requests</strong> определяет условия, которым должна удовлетворять группа ресурсов.</li>
<li>Атрибут <strong>limits</strong> определяет максимальные ограничения для группы ресурсов.</li>
<li>Атрибуты <strong>transfer_from</strong> и <strong>transfer_to</strong> описывают, из каких групп ресурсов группа ресурсов должна предпочтительно получать ресурсы и в какие группы ресурсов она должна передавать ресурсы, соответственно.</li>
</ul>
<p>При изменении конфигурации группы ресурсов Milvus будет максимально корректировать текущие ресурсы узла запроса в соответствии с новой конфигурацией, гарантируя, что все группы ресурсов в конечном итоге удовлетворят следующему условию:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>За исключением следующих случаев:</p>
<ul>
<li>Когда количество QueryNodes в кластере Milvus недостаточно, т.е. <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code>, всегда будут существовать группы ресурсов без достаточного количества QueryNodes.</li>
<li>Когда количество QueryNodes в кластере Milvus избыточно, т.е. <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code>, избыточные QueryNodes всегда будут размещаться в <strong>__default_resource_group</strong> первыми.</li>
</ul>
<p>Конечно, если количество QueryNodes в кластере изменится, Milvus будет постоянно пытаться подстроиться под конечные условия. Поэтому можно сначала применить изменения в конфигурации группы ресурсов, а затем выполнить масштабирование QueryNode.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">Использование декларативного api для управления группой ресурсов<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Все примеры кода на этой странице приведены в версии PyMilvus 2.6.6. Перед их выполнением обновите свою установку PyMilvus.</p>
</div>
<ol>
<li><p>Создайте группу ресурсов.</p>
<p>Чтобы создать группу ресурсов, выполните следующие действия после подключения к экземпляру Milvus. В следующем фрагменте предполагается, что <code translate="no">default</code> - это псевдоним вашего соединения с Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    milvus_client.create_resource_group(name, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Список групп ресурсов.</p>
<p>Создав группу ресурсов, вы можете увидеть ее в списке групп ресурсов.</p>
<p>Чтобы просмотреть список групп ресурсов в экземпляре Milvus, выполните следующие действия:</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Опишите группу ресурсов.</p>
<p>Вы можете попросить Milvus описать группу ресурсов в концерне следующим образом:</p>
<pre><code translate="no" class="language-python">info = milvus_client.describe_resource_group(name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment"># ResourceGroupInfo:</span>
<span class="hljs-comment">#   &lt;name:rg1&gt;,     // resource group name</span>
<span class="hljs-comment">#   &lt;capacity:0&gt;,   // resource group capacity</span>
<span class="hljs-comment">#   &lt;num_available_node:1&gt;,  // resource group node num</span>
<span class="hljs-comment">#   &lt;num_loaded_replica:{}&gt;, // collection loaded replica num in resource group</span>
<span class="hljs-comment">#   &lt;num_outgoing_node:{}&gt;, // node num which still in use by replica in other resource group</span>
<span class="hljs-comment">#   &lt;num_incoming_node:{}&gt;, // node num which is in use by replica but belong to other resource group </span>
<span class="hljs-comment">#   &lt;config:{}&gt;,            // resource group config</span>
<span class="hljs-comment">#   &lt;nodes:[]&gt;              // node detail info</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Передача узлов между группами ресурсов.</p>
<p>Вы можете заметить, что в описанной группе ресурсов еще нет ни одного узла запроса. Переместите несколько узлов из стандартной группы ресурсов в создаваемую следующим образом: предположим, что в настоящее время в <strong>__default_resource_group</strong> кластера находится 1 узел запросов, и мы хотим перенести один узел в созданную <strong>rg</strong>.<code translate="no">update_resource_groups</code> обеспечивает атомарность при многократном изменении конфигурации, поэтому никакие промежуточные состояния не будут видны Milvus.</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    })
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Загрузка коллекций и разделов в группу ресурсов.</p>
<p>Как только в группе ресурсов появятся узлы запросов, можно загружать коллекции в эту группу ресурсов. В следующем фрагменте предполагается, что коллекция с именем <code translate="no">demo</code> уже существует.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>Также можно просто загрузить раздел в группу ресурсов, а его реплики распределить между несколькими группами ресурсов. В следующем фрагменте предполагается, что коллекция с именем <code translate="no">Books</code> уже существует и в ней есть раздел с именем <code translate="no">Novels</code>.</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что <code translate="no">_resource_groups</code> - необязательный параметр, и если его не указывать, Milvus загрузит реплики на узлы запросов в группе ресурсов по умолчанию.</p>
<p>Чтобы Milus загружал каждую реплику коллекции в отдельную группу ресурсов, убедитесь, что количество групп ресурсов равно количеству реплик.</p></li>
<li><p>Передача реплик между группами ресурсов.</p>
<p>Milvus использует <a href="/docs/ru/replica.md">реплики</a> для балансировки нагрузки между <a href="/docs/ru/glossary.md#Segment">сегментами</a>, распределенными по нескольким узлам запросов. Вы можете переместить определенные реплики коллекции из одной группы ресурсов в другую следующим образом:</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.transfer_replica(source, target, collection_name, num_replicas)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_replicas}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Сбросить группу ресурсов.</p>
<p>Вы можете в любой момент отказаться от группы ресурсов, в которой нет узла запроса (<code translate="no">limits.node_num = 0</code>). В этом руководстве группа ресурсов <code translate="no">rg</code> теперь имеет один узел запроса. Сначала необходимо изменить конфигурацию <code translate="no">limits.node_num</code> группы ресурсов на нулевую.</p>
<pre><code translate="no" class="language-python">resource_group = <span class="hljs-string">&quot;rg
try:
    milvus_client.update_resource_groups({
        resource_group: ResourceGroupConfig(
            requests={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
            limits={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
        ),
    })
    milvus_client.drop_resource_group(resource_group)
    print(f&quot;</span>Succeeded <span class="hljs-keyword">in</span> dropping {resource_group}.<span class="hljs-string">&quot;)
except Exception:
    print(f&quot;</span>Something went wrong <span class="hljs-keyword">while</span> dropping {resource_group}.<span class="hljs-string">&quot;)
</span><button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Для получения более подробной информации обратитесь к <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">соответствующим примерам в pymilvus</a>.</p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">Хорошая практика для управления масштабированием кластера<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>В настоящее время Milvus не может самостоятельно масштабироваться в облачных средах. Однако, используя <strong>Declarative Resource Group API</strong> в сочетании с контейнерной оркестровкой, Milvus может легко добиться изоляции ресурсов и управления ими для QueryNodes. Вот примерная практика управления QueryNodes в облачной среде:</p>
<ol>
<li><p>По умолчанию Milvus создает <strong>__default_resource_group</strong>. Эта группа ресурсов не может быть удалена, а также служит группой ресурсов загрузки по умолчанию для всех коллекций, и к ней всегда назначаются избыточные QueryNodes. Поэтому мы можем создать ожидающую группу ресурсов для хранения неиспользуемых ресурсов QueryNode, предотвращая занятие ресурсов QueryNode <strong> группой __default_resource_group</strong>.</p>
<p>Кроме того, если мы строго соблюдаем ограничение <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code>, мы можем точно контролировать распределение QueryNodes в кластере. Предположим, что в настоящее время в кластере есть только один QueryNode, и инициализируем кластер. Вот пример настройки:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    milvus_client.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    milvus_client.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Используя приведенный выше код примера, мы создаем группу ресурсов с именем <strong>__pending_nodes</strong> для хранения дополнительных QueryNodes. Мы также создаем две пользовательские группы ресурсов с именами <strong>rg1</strong> и <strong>rg2</strong>. Кроме того, мы убеждаемся, что для другой группы ресурсов приоритетным является восстановление недостающих или избыточных QueryNodes из <strong>__pending_nodes</strong>.</p></li>
<li><p>Масштабирование кластера</p>
<p>Предположим, что у нас есть следующая функция масштабирования:</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>Мы можем использовать API для масштабирования определенной группы ресурсов до заданного количества QueryNodes, не затрагивая другие группы ресурсов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
milvus_client.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
    <span class="hljs-string">&quot;rg2&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})
scale_to(<span class="hljs-number">5</span>)
<span class="hljs-comment"># rg1 has 3 nodes, rg2 has 1 node, __default_resource_group has 1 node.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Масштабирование кластера</p>
<p>Аналогично, мы можем установить правила масштабирования, которые определяют приоритет выбора QueryNodes из группы ресурсов <strong>__pending_nodes</strong>. Эту информацию можно получить через <code translate="no">describe_resource_group</code> API. Достижение цели масштабирования в заданной группе ресурсов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
milvus_client.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})

<span class="hljs-comment"># rg1 has 2 nodes, rg2 has 1 node, __default_resource_group has 1 node, __pending_nodes has 1 node.</span>
scale_to(<span class="hljs-number">4</span>)
<span class="hljs-comment"># scale the node in __pending_nodes</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">Как группы ресурсов взаимодействуют с несколькими репликами<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>Реплики одной коллекции и группы ресурсов имеют отношение N к N.</li>
<li>Когда несколько реплик одной коллекции загружаются в одну ресурсную группу, QueryNodes этой ресурсной группы равномерно распределяются между репликами, гарантируя, что разница в количестве QueryNodes у каждой реплики не превышает 1.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>Чтобы развернуть многопользовательский экземпляр Milvus, прочтите следующее:</p>
<ul>
<li><a href="/docs/ru/rbac.md">Включение RBAC</a></li>
<li><a href="/docs/ru/users_and_roles.md">Пользователи и роли</a></li>
</ul>
