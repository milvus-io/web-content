---
id: operational_faq.md
summary: >-
  Encontre respostas para as perguntas mais frequentes sobre as operações em
  Milvus.
title: FAQ operacional
---
<h1 id="Operational-FAQ" class="common-anchor-header">FAQ operacional<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-is-a-QueryNode-delegator-and-what-are-its-responsibilities" class="common-anchor-header">O que é um delegador QueryNode e quais são as suas responsabilidades?</h4><p>Quando uma coleção é carregada, um QueryNode subscreve canais DML para mensagens de inserção e eliminação provenientes da fila de mensagens. O QueryNode que assina esses canais, conhecido como delegador, é responsável por:</p>
<ul>
<li>Gerenciar segmentos crescentes que exigem memória adicional devido a inserções em andamento.</li>
<li>Receber mensagens de exclusão e passá-las para outros QueryNodes que mantêm os segmentos relevantes.</li>
</ul>
<h4 id="How-to-identify-delegator-nodes-for-a-collection" class="common-anchor-header">Como identificar nós delegadores para uma coleção?</h4><p>Use o Birdwatcher.</p>
<p>Instale o Birdwatcher da seguinte <a href="https://milvus.io/docs/birdwatcher_install_guides.md#Install-Birdwatcher">forma</a> e, em seguida, execute o seguinte comando:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<span class="hljs-meta prompt_"># </span><span class="language-bash">Find delegator nodes <span class="hljs-keyword">for</span> your collection</span>
Milvus(my-release) &gt; show segment-loaded-grpc --collection &lt;your-collectionID&gt;

ServerID 2
Channel by-dev-rootcoord-dml_2, collection: 430123456789, version 1
Leader view for channel: by-dev-rootcoord-dml_2
Growing segments count: 1, ids: [430123456789_4]
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Map server ID to pod IP</span>
Milvus(my-release) &gt; show session

Node(s) querynode
        ID: 1        Version: 2.4.0        Address: 10.0.0.4:19530
        ID: 2        Version: 2.4.0        Address: 10.0.0.5:19530
        ID: 3        Version: 2.4.0        Address: 10.0.0.6:19530
<button class="copy-code-btn"></button></code></pre>
<h4 id="What-parameters-can-be-adjusted-if-query-node-memory-usage-is-unbalanced" class="common-anchor-header">Que parâmetros podem ser ajustados se a utilização da memória do nó de consulta estiver desequilibrada?</h4><p>Por vezes, a memória do nó de consulta varia porque alguns actuam como delegadores utilizando mais RAM. Se a memória de um delegador for alta, ajuste queryCoord.delegatorMemoryOverloadFactor para descarregar segmentos selados para outros nós e reduzir o uso de RAM.</p>
<ul>
<li>O valor padrão é 0,1.</li>
<li>Aumentar esse valor (por exemplo, para 0,3 ou mais) fará com que o sistema descarregue mais segmentos selados do delegador sobrecarregado para outros QueryNodes, ajudando a equilibrar o uso da memória. E também pode tentar aumentar o valor até 1, o que significa que nenhum segmento selado será carregado nos nós delegadores.</li>
</ul>
<p>Se não quiser reiniciar o cluster, pode modificar a configuração do milvus com o birdwatcher:</p>
<pre><code translate="no">.<span class="hljs-operator">/</span>birdwatcher
Offline <span class="hljs-operator">&gt;</span> <span class="hljs-keyword">connect</span> <span class="hljs-comment">--etcd &lt;your-etcd-ip&gt;:2379 --auto</span>

# Change delegatorMemoryOverloadFactor <span class="hljs-keyword">to</span> <span class="hljs-number">0.3</span> <span class="hljs-keyword">without</span> restart, <span class="hljs-keyword">default</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">is</span> <span class="hljs-number">0.1</span>
<span class="hljs-keyword">set</span> config<span class="hljs-operator">-</span>etcd <span class="hljs-comment">--key queryCoord.delegatorMemoryOverloadFactor --value 0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="How-to-set-shardnum-for-a-collection" class="common-anchor-header">Como definir shard_num para uma coleção?</h4><p>Como prática recomendada, para uma coleção com vectores de dimensão 768, recomenda-se a utilização de pelo menos 1 shard por ~100 milhões de vectores. Para casos de uso de escrita pesada, use 4 shards por ~100 milhões de vetores.</p>
<p>Por exemplo, se tiver 100 milhões de vectores, utilize 1-4 shards. Se tiver 500 milhões de vectores, utilize 5-10 fragmentos.</p>
<h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">E se eu não conseguir extrair a imagem do Milvus Docker do Docker Hub?</h4><p>Se não conseguiu extrair a imagem do Milvus Docker do Docker Hub, tente adicionar outros espelhos de registo.</p>
<p>Os utilizadores da China continental podem adicionar o URL "https://registry.docker-cn.com" à matriz registry-mirrors em <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;registry-mirrors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">O Docker é a única maneira de instalar e executar o Milvus?</h4><p>O Docker é uma maneira eficiente de implantar o Milvus, mas não é a única maneira. Também é possível implantar o Milvus a partir do código fonte. Isso requer Ubuntu (18.04 ou superior) ou CentOS (7 ou superior). Consulte <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Criação do Milvus a partir do código-fonte</a> para obter mais informações.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Quais são os principais factores que afectam a recuperação?</h4><p>A recuperação é afetada principalmente pelo tipo de índice e pelos parâmetros de pesquisa.</p>
<p>Para o índice FLAT, o Milvus faz uma pesquisa exaustiva dentro de uma coleção, com um retorno de 100%.</p>
<p>Para os índices IVF, o parâmetro nprobe determina o âmbito de uma pesquisa dentro da coleção. O aumento de nprobe aumenta a proporção de vectores pesquisados e a recuperação, mas diminui o desempenho da consulta.</p>
<p>Para o índice HNSW, o parâmetro ef determina a amplitude da pesquisa no gráfico. Aumentar ef aumenta o número de pontos pesquisados no gráfico e a recuperação, mas diminui o desempenho da consulta.</p>
<p>Para obter mais informações, consulte <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Indexação de vetor</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Por que minhas alterações nos arquivos de configuração não surtiram efeito?</h4><p>O Milvus não oferece suporte à modificação de arquivos de configuração durante o tempo de execução. É necessário reiniciar o Milvus Docker para que as alterações nos ficheiros de configuração tenham efeito.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Como é que sei se o Milvus foi iniciado com sucesso?</h4><p>Se o Milvus for iniciado com o Docker Compose, execute <code translate="no">docker ps</code> para observar quantos contentores Docker estão em execução e verificar se os serviços do Milvus foram iniciados corretamente.</p>
<p>Para o Milvus autónomo, deve ser possível observar pelo menos três contentores Docker em execução, sendo um o serviço Milvus e os outros dois o serviço de gestão e armazenamento etcd. Para obter mais informações, consulte <a href="/docs/pt/install_standalone-docker.md">Instalação do Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Porque é que a hora nos ficheiros de registo é diferente da hora do sistema?</h4><p>A diferença de horário geralmente se deve ao fato de que a máquina host não usa o Tempo Universal Coordenado (UTC).</p>
<p>Os arquivos de log dentro da imagem do Docker usam o UTC por padrão. Se o seu computador host não usa UTC, esse problema pode ocorrer.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Como é que sei se o meu CPU suporta o Milvus?</h4><p>As operações de computação do Milvus dependem do suporte da CPU para o conjunto de instruções de extensão SIMD (Single Instruction, Multiple Data). Se o seu CPU suporta o conjunto de instruções de extensão SIMD é crucial para a construção de índices e pesquisa de similaridade vetorial no Milvus. Certifique-se de que o seu CPU suporta pelo menos um dos seguintes conjuntos de instruções SIMD:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Execute o comando lscpu para verificar se sua CPU suporta os conjuntos de instruções SIMD mencionados acima:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>lscpu |<span class="hljs-params"> grep -e sse4_2 -e avx -e avx2 -e avx512
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Por que o Milvus retorna <code translate="no">illegal instruction</code> durante a inicialização?</h4><p>O Milvus requer que sua CPU suporte um conjunto de instruções SIMD: SSE4.2, AVX, AVX2, ou AVX512. A CPU deve suportar pelo menos um desses conjuntos para garantir que o Milvus funcione normalmente. Um erro <code translate="no">illegal instruction</code> retornado durante a inicialização sugere que sua CPU não suporta nenhum dos quatro conjuntos de instruções acima.</p>
<p>Veja <a href="/docs/pt/prerequisite-docker.md">o suporte da CPU para o conjunto de instruções SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Posso instalar o Milvus no Windows?</h4><p>Sim. Você pode instalar o Milvus no Windows compilando a partir do código fonte ou de um pacote binário.</p>
<p>Veja <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Executar o Milvus no Windows</a> para saber como instalar o Milvus no Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Recebi um erro ao instalar o pymilvus no Windows. O que devo fazer?</h4><p>Tente utilizar o seguinte comando para atualizar o pymilvus para a versão mais recente.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus
<button class="copy-code-btn"></button></code></pre>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Posso instalar o Milvus quando estou desligado da Internet?</h4><p>Sim. Pode instalar o Milvus num ambiente offline. Consulte <a href="/docs/pt/install_offline-helm.md">Instalar o Milvus offline</a> para obter mais informações.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Onde posso encontrar os registos gerados pelo Milvus?</h4><p>Por defeito, o registo do Milvus é impresso em stout (saída padrão) e stderr (erro padrão), no entanto, recomendamos vivamente que redireccione o seu registo para um volume persistente em produção. Para o fazer, actualize <code translate="no">log.file.rootPath</code> em <strong>milvus.yaml</strong>. E se implementar o Milvus com o gráfico <code translate="no">milvus-helm</code>, também precisa de ativar a persistência do registo primeiro através de <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Se não alterou a configuração, utilizar kubectl logs <pod-name> ou docker logs CONTAINER também pode ajudá-lo a encontrar o registo.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Posso criar um índice para um segmento antes de inserir dados nele?</h4><p>Sim, pode. Mas recomendamos a inserção de dados em lotes, cada um dos quais não deve exceder 256 MB, antes de indexar cada segmento.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Posso partilhar uma instância etcd entre várias instâncias Milvus?</h4><p>Sim, pode partilhar uma instância etcd entre várias instâncias Milvus. Para isso, é necessário alterar <code translate="no">etcd.rootPath</code> para um valor separado para cada instância Milvus nos ficheiros de configuração de cada uma delas antes de as iniciar.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Posso compartilhar uma instância do Pulsar entre várias instâncias do Milvus?</h4><p>Sim, pode partilhar uma instância Pulsar entre várias instâncias Milvus. Para fazer isso, você pode</p>
<ul>
<li>Se o multi-tenancy estiver habilitado na sua instância Pulsar, considere alocar um tenant ou namespace separado para cada instância Milvus. Para isso, é necessário alterar <code translate="no">pulsar.tenant</code> ou <code translate="no">pulsar.namespace</code> nos ficheiros de configuração das suas instâncias Milvus para um valor único para cada uma delas antes de as iniciar.</li>
<li>Se não planeia ativar o multi-tenancy na sua instância Pulsar, considere alterar <code translate="no">msgChannel.chanNamePrefix.cluster</code> nos ficheiros de configuração das suas instâncias Milvus para um valor único para cada uma antes de as iniciar.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Posso compartilhar uma instância MinIO entre várias instâncias Milvus?</h4><p>Sim, pode partilhar uma instância MinIO entre várias instâncias Milvus. Para tal, é necessário alterar <code translate="no">minio.rootPath</code> para um valor único para cada instância Milvus nos ficheiros de configuração de cada uma delas antes de as iniciar.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Como posso lidar com a mensagem de erro <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>A mensagem de erro <code translate="no">Illegal uri [example.db]</code> indica que está a tentar ligar-se ao Milvus Lite utilizando uma versão anterior do PyMilvus que não suporta este tipo de ligação. Para resolver este problema, actualize a sua instalação do PyMilvus para, pelo menos, a versão 2.4.2, que inclui suporte para ligação ao Milvus Lite.</p>
<p>Você pode atualizar o PyMilvus usando o seguinte comando:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Porque é que estou a obter menos resultados do que os <code translate="no">limit</code> que defini na minha pesquisa/consulta?</h4><p>Existem várias razões pelas quais pode receber menos resultados do que o <code translate="no">limit</code> que especificou:</p>
<ul>
<li><p><strong>Dados limitados</strong>: A coleção pode não ter entidades suficientes para atender ao limite solicitado. Se o número total de entidades na coleção for inferior ao limite, receberá naturalmente menos resultados.</p></li>
<li><p><strong>Chaves primárias duplicadas</strong>: O Milvus dá prioridade a entidades específicas quando encontra chaves primárias duplicadas durante uma pesquisa. Este comportamento varia consoante o tipo de pesquisa:</p></li>
<li><p><strong>Consulta (correspondência exacta)</strong>: Milvus seleciona a última entidade com a PK correspondente. ANN Search: Milvus seleciona a entidade com a maior pontuação de similaridade, mesmo que as entidades partilhem o mesmo PK. Esta priorização pode resultar em menos resultados únicos do que o limite se a sua coleção tiver muitas chaves primárias duplicadas.</p></li>
<li><p><strong>Correspondências insuficientes</strong>: As expressões de filtragem da pesquisa podem ser muito rigorosas, resultando em menos entidades que atendem ao limite de similaridade. Se as condições definidas para a pesquisa forem muito restritivas, não haverá correspondência suficiente de entidades, levando a menos resultados do que o esperado.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. O que é que causa este erro e como é que pode ser resolvido?</h4><p>Este erro ocorre quando se tenta utilizar o Milvus Lite numa plataforma Windows. O Milvus Lite foi concebido principalmente para ambientes Linux e pode não ter suporte nativo para Windows.</p>
<p>A solução é utilizar um ambiente Linux:</p>
<ul>
<li>Use um sistema operacional baseado em Linux ou uma máquina virtual para executar o Milvus Lite.</li>
<li>Esta abordagem garantirá a compatibilidade com as dependências e funcionalidades da biblioteca.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">O que são os erros de "comprimento excede o comprimento máximo" no Milvus, e como eles podem ser entendidos e resolvidos?</h4><p>Os erros de "comprimento excede o comprimento máximo" no Milvus ocorrem quando o tamanho de um elemento de dados ultrapassa o tamanho máximo permitido para uma coleção ou campo. Eis alguns exemplos e explicações:</p>
<ul>
<li><p>Erro de campo JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Erro de comprimento da cadeia de caracteres: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Erro no campo VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Para compreender e resolver estes erros:</p>
<ul>
<li>Compreenda que <code translate="no">len(str)</code> em Python representa o número de caracteres, não o tamanho em bytes.</li>
<li>Para tipos de dados baseados em cadeias de caracteres como VARCHAR e JSON, utilize <code translate="no">len(bytes(str, encoding='utf-8'))</code> para determinar o tamanho real em bytes, que é o que Milvus utiliza para "max-length".</li>
</ul>
<p>Exemplo em Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>. O que causa este erro e como pode ser resolvido?</h4><p>Este erro indica que está a tentar ligar-se ao Milvus Lite utilizando uma versão anterior do pymilvus que não o suporta. Para o resolver, actualize a sua instalação do pymilvus para, pelo menos, a versão 2.4.2. Esta versão suporta a ligação ao Milvus Lite. Para atualizar, utilize o seguinte comando:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Ainda tem dúvidas?</h4><p>Você pode:</p>
<ul>
<li>Confira <a href="https://github.com/milvus-io/milvus/issues">o Milvus</a> no GitHub. Sinta-se à vontade para fazer perguntas, partilhar ideias e ajudar os outros.</li>
<li>Junte-se ao nosso <a href="https://discuss.milvus.io/">Fórum Milvus</a> ou <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Canal Slack</a> para encontrar suporte e envolver-se com a nossa comunidade de código aberto.</li>
</ul>
