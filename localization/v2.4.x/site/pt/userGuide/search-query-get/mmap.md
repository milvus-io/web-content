---
id: mmap.md
summary: O MMap permite mais dados num único nó.
title: Armazenamento de Dados com MMap
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Armazenamento de Dados com MMap<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, os ficheiros mapeados na memória permitem o mapeamento direto do conteúdo dos ficheiros na memória. Este recurso aumenta a eficiência da memória, particularmente em situações em que a memória disponível é escassa, mas o carregamento completo de dados é inviável. Este mecanismo de otimização pode aumentar a capacidade dos dados, garantindo o desempenho até um determinado limite; no entanto, quando a quantidade de dados excede demasiado a memória, o desempenho da pesquisa e da consulta pode sofrer uma degradação grave, pelo que deve optar por ativar ou desativar esta funcionalidade, conforme apropriado.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Configurar o mapeamento de memória<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>A partir do Milvus 2.4, tem a flexibilidade de ajustar o ficheiro de configuração estática para configurar as definições de mapeamento de memória predefinidas para todo o cluster antes da implementação. Além disso, há a opção de alterar dinamicamente os parâmetros para ajustar as configurações de mapeamento de memória nos níveis do cluster e do índice. No futuro, as futuras actualizações alargarão as capacidades de mapeamento de memória para incluir configurações ao nível do campo.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Antes da implantação do cluster: configuração global</h3><p>Antes de implantar um cluster, as configurações <strong>no nível do cluster</strong> aplicam o mapeamento de memória em todo o cluster. Isto assegura que todos os novos objectos irão aderir automaticamente a estas configurações. É importante notar que a modificação destas definições requer um reinício do cluster para se tornar efectiva.</p>
<p>Para ajustar as definições de mapeamento de memória do cluster, edite o ficheiro <code translate="no">configs/milvus.yaml</code>. Nesse arquivo, é possível especificar se o mapeamento de memória deve ser ativado por padrão e determinar o caminho do diretório para armazenar arquivos mapeados por memória. Se o caminho (<code translate="no">mmapDirPath</code>) for deixado sem especificação, o sistema predefine o armazenamento de ficheiros mapeados pela memória em <code translate="no">{localStorage.path}/mmap</code>. Para obter mais informações, consulte <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Configurações relacionadas ao armazenamento local</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Após <code translate="no">2.4.10</code>, a configuração <code translate="no">queryNode.mmap.mmapEnabled</code> divide-se em quatro campos separados abaixo, e todas as predefinições são <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>controla se os dados do vetor são mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>controla se o índice do vetor é mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>controla se os dados escalares são mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>controla se o índice escalar é mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Além disso, apenas o índice vetorial e os dados vectoriais mmap podem ser activados e desactivados para uma coleção individualmente, mas não para outras.</p>
<p>Compatibilidade: Se a configuração original <code translate="no">queryNode.mmap.mmapEnabled</code> estiver definida como <code translate="no">true</code>, a configuração recém-adicionada será definida como <code translate="no">true</code> neste momento. Se <code translate="no">queryNode.mmap.mmapEnabled</code> estiver definido como <code translate="no">false</code>, se a nova configuração estiver definida como <code translate="no">true</code>, o valor final será <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Durante o funcionamento do cluster: configuração dinâmica</h3><p>Durante o tempo de execução do cluster, é possível ajustar dinamicamente as definições de mapeamento de memória ao nível da coleção ou do índice.</p>
<p>No <strong>nível</strong> da coleção, o mapeamento de memória é aplicado a todos os dados brutos não indexados dentro de uma coleção, excluindo chaves primárias, carimbos de data/hora e IDs de linha. Essa abordagem é particularmente adequada para o gerenciamento abrangente de grandes conjuntos de dados.</p>
<p>Para ajustes dinâmicos às definições de mapeamento de memória numa coleção, utilize o método <code translate="no">set_properties()</code>. Aqui, é possível alternar <code translate="no">mmap.enabled</code> entre <code translate="no">True</code> ou <code translate="no">False</code>, conforme necessário.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Depois de <code translate="no">2.4.10</code>, as definições de mapeamento de memória numa coleção, utilize o método <code translate="no">add_field</code>. Aqui, pode alternar <code translate="no">mmap_enabled</code> entre <code translate="no">True</code> ou <code translate="no">False</code>, conforme necessário.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para configurações <strong>de nível de índice</strong>, o mapeamento de memória pode ser aplicado especificamente a índices de vetor sem afetar outros tipos de dados. Esta funcionalidade é valiosa para colecções que requerem um desempenho optimizado para pesquisas vectoriais.</p>
<p>Para ativar ou desativar o mapeamento de memória para um índice dentro de uma coleção, chame o método <code translate="no">alter_index()</code>, especificando o nome do índice de destino em <code translate="no">index_name</code> e definindo <code translate="no">mmap.enabled</code> para <code translate="no">True</code> ou <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Personalizar o caminho de armazenamento em diferentes implementações<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Por predefinição, os ficheiros mapeados na memória são guardados no diretório <code translate="no">/mmap</code> em <code translate="no">localStorage.path</code>. Eis como personalizar esta definição em vários métodos de implementação:</p>
<ul>
<li>Para o Milvus instalado usando o Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para o Milvus instalado usando o Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para o Milvus instalado usando o Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>O mapeamento de memória não pode ser ativado para uma coleção carregada, certifique-se de que a coleção foi liberada antes de ativar o mapeamento de memória.</p></li>
<li><p>O mapeamento de memória não é compatível com os índices de classe DiskANN ou GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Em quais cenários é recomendável habilitar o mapeamento de memória? Quais são as desvantagens após a ativação desse recurso?</strong></p>
<p>O mapeamento de memória é recomendado quando a memória é limitada ou quando os requisitos de desempenho são moderados. A ativação desta funcionalidade aumenta a capacidade de carregamento de dados. Por exemplo, com uma configuração de 2 CPUs e 8 GB de memória, a ativação do mapeamento de memória pode permitir que sejam carregados até 4 vezes mais dados do que se não for ativado. O impacto no desempenho varia:</p>
<ul>
<li><p>Com memória suficiente, o desempenho esperado é semelhante ao da utilização de apenas memória.</p></li>
<li><p>Com memória insuficiente, o desempenho esperado pode degradar-se.</p></li>
</ul></li>
<li><p><strong>Qual é a relação entre as configurações de nível de coleção e de nível de índice?</strong></p>
<p>O nível de coleção e o nível de índice não são relações inclusivas, o nível de coleção controla se os dados originais estão ou não activados para mmap, enquanto o nível de índice é apenas para índices vectoriais.</p></li>
<li><p><strong>Existe algum tipo de índice recomendado para o mapeamento de memória?</strong></p>
<p>Sim, o HNSW é recomendado para ativar o mmap. Já testámos índices das séries HNSW, IVF_FLAT, IVF_PQ/SQ anteriormente, o desempenho dos índices da série IVF caiu seriamente, enquanto a queda de desempenho de ativar o mmap para índices HNSW ainda está dentro das expectativas.</p></li>
<li><p><strong>Que tipo de armazenamento local é necessário para o mapeamento de memória?</strong></p>
<p>Um disco de alta qualidade melhora o desempenho, sendo as unidades NVMe a opção preferida.</p></li>
<li><p><strong>Os dados escalares podem ser mapeados na memória?</strong></p>
<p>O mapeamento de memória pode ser aplicado a dados escalares, mas não é aplicável a índices criados em campos escalares.</p></li>
<li><p><strong>Como é determinada a prioridade das configurações de mapeamento de memória em diferentes níveis?</strong></p>
<p>No Milvus, quando as configurações de mapeamento de memória são explicitamente definidas em vários níveis, as configurações ao nível do índice e ao nível da coleção partilham a prioridade mais elevada, seguindo-se as configurações ao nível do cluster.</p></li>
<li><p><strong>Se atualizar a partir do Milvus 2.3 e tiver configurado o caminho do diretório de mapeamento de memória, o que irá acontecer?</strong></p>
<p>Se atualizar a partir do Milvus 2.3 e tiver configurado o caminho do diretório de mapeamento de memória (<code translate="no">mmapDirPath</code>), a sua configuração será mantida e a predefinição para o mapeamento de memória ativado (<code translate="no">mmapEnabled</code>) será <code translate="no">true</code>. É importante migrar os metadados para sincronizar a configuração dos seus ficheiros mapeados na memória existentes. Para obter mais detalhes, consulte <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrar os metadados</a>.</p></li>
</ul>
