---
id: roadmap.md
title: Mapa rodoviário de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus é uma base de dados vetorial de código aberto criada para alimentar
  aplicações de IA. Aqui está o nosso roteiro para orientar o nosso
  desenvolvimento.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roteiro de Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Bem-vindo ao roteiro do Milvus! Junte-se a nós na nossa viagem contínua para melhorar e fazer evoluir o Milvus. Estamos entusiasmados por partilhar as nossas realizações, planos futuros e a nossa visão do que está para vir. O nosso roteiro é mais do que uma lista de funcionalidades futuras - reflecte o nosso compromisso com a inovação e a nossa dedicação ao trabalho com a comunidade. Convidamo-lo a mergulhar no nosso roteiro, a dar o seu feedback e a ajudar a moldar o futuro do Milvus!</p>
<h2 id="Roadmap" class="common-anchor-header">Roteiro<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>Categoria</th>
            <th>Milvus 2.4.0 (recentemente alcançado)</th>
            <th>Milvus 2.5.0 (a ser lançado em meados do ano 24)</th>
            <th>Roteiro futuro (Milvus 3.0 esperado no CY24)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Amigo do programador de IA</strong><br/> Uma<i>pilha de tecnologia amiga do programador, melhorada com as mais recentes inovações de IA</i></td>
            <td><strong>Multi-vectores e pesquisa híbrida</strong><br/><i>Estrutura para recolha e fusão multiplex</i><br/><br/><strong>Aceleração de índices GPU</strong><br/><i>Suporte para QPS mais elevados e criação de índices mais rápida</i><br/><br/><strong>Biblioteca de modelos em PyMilvus</strong><br/><i>Modelos de incorporação integrados para Milvus</i></td>
            <td><strong>Vetor esparso (GA)</strong><br/><i>Extração de caraterísticas locais e pesquisa de palavras-chave</i><br/><br/><strong>Milvus Lite (GA)</strong><br/> Uma<i>versão leve e em memória do Milvus</i><br/><br/><strong>Galeria de modelos de incorporação</strong><br/><i>Suporte para incorporação de imagens e modelos multimodais e de reranker em bibliotecas de modelos</i></td>
            <td><strong>Entrada e saída de dados originais</strong><br/><i>Suporte para tipos de dados Blob</i><br/><br/><strong>Agrupamento de dados</strong><br/><i>Co-localidade de dados</i><br/><br/><strong>Pesquisa de vectores orientada para cenários</strong><br/><i>por exemplo, pesquisa multiobjectivo e filtragem NN</i><br/><br/><strong>Suporte para incorporação e ponto final de reranker</strong></td>
        </tr>
        <tr>
            <td><strong>Funcionalidade rica</strong><br/><i>Caraterísticas melhoradas de recuperação e gestão de dados</i></td>
            <td><strong>Suporte para os tipos de dados FP16 e BF16</strong><br/><i>Estes tipos de dados ML podem ajudar a reduzir a utilização da memória</i><br/><br/><strong>Pesquisa de agrupamento</strong><br/><i>Embeddings de divisão agregados</i><br/><br/><strong>Correspondência</strong> difusa<strong>e índice invertido</strong><br/><i>Suporte para correspondência difusa e indexação invertida para tipos escalares como varchar e int</i></td>
            <td><strong>Índice invertido para matriz e JSON</strong><br/><i>Indexação para matriz e suporte parcial a JSON</i><br/><br/><strong>Índice de</strong> conjunto de bits<br/><i>Velocidade de execução melhorada e agregação de dados futura</i><br/><br/><strong>Truncar coleção</strong><br/><i>Permite a eliminação de dados preservando os metadados</i><br/><br/><strong>Suporte para valores NULL e predefinidos</strong></td>
            <td><strong>Suporte para mais tipos de dados</strong><br/><i>e.g. Datetime, GIS</i><br/><br/><strong>Filtragem avançada de texto</strong><br/> e<i>.g. Match Phrase</i><br/><br/><strong>Desduplicação de chave primária</strong></td>
        </tr>
        <tr>
            <td><strong>Eficiência de custos e arquitetura</strong><br/><i>Sistemas avançados com ênfase na estabilidade, eficiência de custos, escalabilidade e desempenho</i></td>
            <td><strong>Suporte para mais colecções/partições</strong><br/><i>Lida com mais de 10.000 colecções em clusters mais pequenos</i><br/><br/><strong>Otimização de</strong> mapas<br/><i>Equilibra o consumo reduzido de memória com a latência</i><br/><br/><strong>Otimização de inserção em massa</strong><br/><i>Simplifica a importação de grandes conjuntos de dados</i></td>
            <td><strong>Lazy Load</strong><br/><i>Os dados são carregados a pedido através de operações de leitura</i><br/><br/><strong>Major Compaction</strong><br/><i>Redistribui os dados com base na configuração para melhorar o desempenho da leitura</i><br/><br/> Mmap<strong>para dados em crescimento</strong><br/><i>Ficheiros</i> Mmap<i>para segmentos de dados em expansão</i></td>
            <td><strong>Controlo de memória</strong><br/><i>Reduz os problemas de memória esgotada e proporciona uma gestão global da memória</i><br/><br/><strong>Introdução ao nó de registo</strong><br/><i>Assegura a consistência global e aborda o ponto de estrangulamento único na coordenação de raiz</i><br/><br/><strong>Formato de armazenamento V2</strong><br/><i>O design de formato universal estabelece as bases para o acesso a dados baseados em disco</i></td>
        </tr>
        <tr>
            <td><strong>Pronto para empresas</strong><br/><i>Projetado para atender às necessidades de ambientes de produção corporativos</i></td>
            <td><strong>Milvus CDC</strong><br/><i>Capacidade de replicação de dados</i><br/><br/><strong>Melhoria do registo de acesso</strong><br/><i>Registo detalhado para auditoria e rastreio</i></td>
            <td><strong>Novo Grupo de Recursos</strong><br/><i>Gestão de recursos melhorada</i><br/><br/><strong>Storage Hook</strong><br/><i>Suporte para encriptação BYOK (Bring Your Own Key)</i></td>
            <td><strong>Ajuste dinâmico do número</strong><i>de réplicas</i><br/><i>Facilita alterações dinâmicas ao número de réplicas</i><br/><br/><strong>Modificação dinâmica do esquema</strong><br/><i>por exemplo, adicionar/eliminar campos, modificar comprimentos varchar</i><br/><br/><strong>SDKs</strong> Rust<strong>e C#</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>O nosso roteiro é normalmente estruturado em três partes: a versão mais recente, a próxima versão e uma visão de médio a longo prazo no próximo ano.</li>
<li>Conforme progredimos, aprendemos continuamente e ocasionalmente ajustamos nosso foco, adicionando ou removendo itens conforme necessário.</li>
<li>Estes planos são indicativos e estão sujeitos a alterações, podendo variar consoante os serviços de subscrição.</li>
<li>Cumprimos rigorosamente o nosso roteiro, com as nossas <a href="/docs/pt/v2.4.x/release_notes.md">notas de lançamento</a> a servirem de referência.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Como contribuir<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>Sendo um projeto de código aberto, o Milvus prospera com as contribuições da comunidade. Eis como pode fazer parte do nosso percurso.</p>
<h3 id="Share-feedback" class="common-anchor-header">Partilhar feedback</h3><ul>
<li><p>Reportar problemas: Encontrou um erro ou tem uma sugestão? Abra um problema na nossa <a href="https://github.com/milvus-io/milvus/issues">página GitHub</a>.</p></li>
<li><p>Sugestões de recursos: Tem ideias para novas funcionalidades ou melhorias? <a href="https://github.com/milvus-io/milvus/discussions">Gostaríamos muito de as ouvir!</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contribuições de código</h3><ul>
<li><p>Solicitações pull: Contribua diretamente para a nossa <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Quer se trate de corrigir bugs, adicionar funcionalidades ou melhorar a documentação, as suas contribuições são bem-vindas.</p></li>
<li><p>Guia de desenvolvimento: Consulte o nosso <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guia do contribuidor</a> para obter diretrizes sobre contribuições de código.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Espalhe a palavra</h3><ul>
<li><p>Partilha social: Gosta do Milvus? Partilhe os seus casos de utilização e experiências nas redes sociais e em blogues de tecnologia.</p></li>
<li><p>Marque-nos com uma estrela no GitHub: Mostre o seu apoio marcando com uma estrela o nosso <a href="https://github.com/milvus-io/milvus">repositório GitHub</a>.</p></li>
</ul>
