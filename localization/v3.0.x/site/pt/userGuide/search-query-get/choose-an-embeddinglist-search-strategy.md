---
id: choose-an-embeddinglist-search-strategy.md
title: Escolher uma estratégia de pesquisa EmbeddingList
summary: >-
  As estratégias de pesquisa da EmbeddingList determinam a forma como o Milvus
  constrói um índice aproximado de candidatos para a pesquisa na EmbeddingList.
  A estratégia predefinida é a tokenann. É possível mudar para muvera ou lemur
  quando a lista de embeddings for grande, a TokenANN for demasiado dispendiosa
  ou uma representação aprendida/comprimida ao nível da linha for mais adequada.
  O resultado final continua a ser produzido pelo reclassificação do MaxSim
  quando a opção «emb_list_rerank» está ativada.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Escolher uma estratégia de pesquisa EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>As estratégias de pesquisa da EmbeddingList determinam a forma como o Milvus constrói um índice aproximado de candidatos para a pesquisa da EmbeddingList. A estratégia predefinida é « <code translate="no">tokenann</code> ». Pode mudar para « <code translate="no">muvera</code> » ou « <code translate="no">lemur</code> » quando a lista de embeddings for grande, o TokenANN for demasiado dispendioso ou uma representação aprendida/comprimida ao nível da linha for mais adequada. O resultado final continua a ser produzido pelo reclassificação do MaxSim quando a opção « <code translate="no">emb_list_rerank</code> » está ativada.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Por que razão existem estratégias de pesquisa<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>A EmbeddingList foi concebida para linhas que contêm vários vetores, tais como embeddings de tokens num documento de texto, embeddings de patches num documento visual ou embeddings de clipes num vídeo. Em vez de comparar um vetor de consulta com um vetor de linha, o MaxSim compara uma lista de embeddings de consulta com uma lista de embeddings de documentos e agrega as melhores correspondências.</p>
<p>Isto proporciona um melhor poder de representação, mas o MaxSim exato é dispendioso em grande escala. Uma pesquisa MaxSim por força bruta teria de comparar os vetores de consulta com todos os vetores em todas as linhas candidatas. Isso é normalmente demasiado lento para uma pesquisa em produção.</p>
<table>
<thead>
<tr><th>### Problema - Cada linha pode conter muitos vetores. - A aplicação exata do MaxSim em todas as linhas é dispendiosa. - O tamanho do índice e a latência da pesquisa podem aumentar rapidamente.</th><th>### Estratégia - Utilizar um método de recuperação aproximado na primeira fase. - Recuperar mais candidatos do que os topK solicitados. - Reordenar os candidatos com o MaxSim exato.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>Neste sentido, o « <code translate="no">emb_list_strategy</code> » é principalmente uma estratégia de construção de índices e de recuperação de candidatos. É configurado durante a construção do índice e determina como é produzido o conjunto de candidatos da ANN na primeira fase. Os parâmetros de tempo de pesquisa, tais como « <code translate="no">retrieval_ann_ratio</code> » e « <code translate="no">emb_list_rerank</code> », controlam então quantos candidatos são recuperados e se a reclassificação por MaxSim é aplicada.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Estratégias disponíveis<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>Estratégia</th><th>Unidade de recuperação de candidatos</th><th>O que resolve</th><th>Melhor ajuste</th><th>Principal compromisso</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Vetores individuais dentro de cada linha</td><td>Mantém os vetores originais e evita perdas de compressão.</td><td>Pesquisa com prioridade na qualidade, listas de embeddings curtas ou médias, embeddings de alta discriminação.</td><td>Índice maior e custo de recuperação de candidatos mais elevado.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Um vetor codificado por linha</td><td>Comprime uma lista de embeddings numa representação FDE de dimensão fixa sem necessidade de treino.</td><td>Documentos mais longos, embeddings de alta discriminação, casos em que o TokenANN é demasiado pesado.</td><td>A projeção aleatória introduz perda por aproximação; a dimensão do FDE afeta a latência.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Um vetor aprendido por linha</td><td>Aprende uma compressão específica do corpus a partir de listas de embeddings para vetores de linha de dimensão fixa.</td><td>Incorporações de baixa discriminação, recuperação multimodal ou de documentos visuais, listas de incorporações extensas.</td><td>Requer treino e pode ser sensível à distribuição do corpus e ao viés do comprimento dos documentos.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indexa todos os vetores da lista de embeddings. Durante a pesquisa, cada vetor de consulta realiza uma recuperação ANN, os vetores correspondentes são agregados de volta às suas linhas e as linhas candidatas resultantes são reclassificadas com o MaxSim.</p>
<div class="alert note">
<p><strong>Utilize o TokenANN quando a qualidade for a principal prioridade.</strong> É a aproximação mais próxima do cálculo original do MaxSim, uma vez que mantém todos os vetores disponíveis no índice da primeira fase.</p>
</div>
<ul>
<li><p><strong>Adequado para:</strong> fragmentos de texto curtos, linhas com um número pequeno ou moderado de vetores, forte separação semântica ao nível dos tokens, linhas de base sensíveis à qualidade.</p></li>
<li><p><strong>Menos adequado:</strong> documentos muito longos, páginas visuais com milhares de vetores de patch, restrições rigorosas de memória ou latência.</p></li>
<li><p><strong>Comportamento ao nível do elemento:</strong> o TokenANN pode recuperar candidatos a partir de vetores individuais antes de os agregar novamente em linhas. O resultado final da pesquisa na EmbeddingList continua a ser ao nível da linha após a pontuação do MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">O MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> codifica cada lista de incorporação num vetor de dimensão fixa utilizando projeções aleatórias. Isto transforma a recuperação da primeira fase numa pesquisa vetorial padrão ao nível da linha. Os candidatos são então reclassificados com o MaxSim.</p>
<div class="alert note">
<p><strong>Utilize o MUVERA quando o TokenANN for demasiado pesado, mas não pretender uma etapa de treino.</strong> É um meio-termo prático entre qualidade e custo.</p>
</div>
<ul>
<li><p><strong>Ideal para:</strong> documentos de texto longos, espaços de embedding de alta discriminação, cargas de trabalho que necessitam de um índice de menor dimensão do que o TokenANN.</p></li>
<li><p><strong>Menos adequado:</strong> espaços de incorporação de baixa discriminação ou casos em que a representação FDE se torna demasiado multidimensional para o orçamento de latência.</p></li>
<li><p><strong>Parâmetros importantes:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code> e <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">O LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> treina um modelo para comprimir cada lista de embeddings numa representação de dimensão fixa. A pesquisa ANN da primeira fase é executada nos vetores aprendidos ao nível da linha, e os candidatos são reclassificados com o MaxSim.</p>
<div class="alert note">
<p><strong>Utilize o LEMUR quando a compressão aprendida justificar o custo de treino.</strong> Pode funcionar bem em espaços de incorporação de baixa discriminação e na recuperação multimodal, mas deve ser validado em relação ao corpus-alvo, uma vez que pode ser sensível à distribuição do comprimento dos documentos.</p>
</div>
<ul>
<li><p><strong>Adequado para:</strong> pesquisa de documentos visuais, embeddings de patches multimodais, espaços de embedding de baixa discriminação, grandes listas de embeddings onde o TokenANN não é prático.</p></li>
<li><p><strong>Menos adequado:</strong> corpora em constante mudança, embeddings de alta discriminação com comprimentos de documentos altamente assimétricos, cargas de trabalho em que o custo de treino é inaceitável.</p></li>
<li><p><strong>Parâmetros importantes:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code> e <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Comportamento e configuração por predefinição<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>A estratégia EmbeddingList predefinida no Knowhere é <code translate="no">tokenann</code>. Se não especificar <code translate="no">emb_list_strategy</code>, o Knowhere utiliza o TokenANN. Os valores predefinidos no momento da pesquisa incluem <code translate="no">retrieval_ann_ratio=3.0</code> e <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Itens de configuração por estratégia<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte enumera os itens de configuração específicos de cada estratégia. No Milvus, os itens de compilação são normalmente passados no mapa <code translate="no">params</code> ao criar um índice. Se necessitar de valores predefinidos do lado do servidor, estes devem ser definidos no ficheiro de configuração do Milvus, na secção <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>Estratégia</th><th>Item de configuração</th><th>Fase</th><th>Padrão</th><th>Quando alterar</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Criação do índice</td><td><code translate="no">tokenann</code></td><td>Utilize explicitamente quando pretender o comportamento de indexação padrão do vetor de elementos ou quando for utilizado o DiskANN.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Criação do índice</td><td><code translate="no">tokenann</code></td><td>Utilize quando pretender uma recuperação codificada ao nível da linha sem necessidade de treino.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Criação do índice</td><td><code translate="no">4</code></td><td>Controla o número de projeções do SimHash. Valores mais elevados criam mais buckets e podem melhorar a qualidade da codificação, mas aumentam a dimensionalidade codificada.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Criação do índice</td><td><code translate="no">7</code></td><td>Controla o número de codificações FDE independentes que são concatenadas. Valores mais elevados podem melhorar a robustez, mas aumentam o custo do índice e da pesquisa.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Criação do índice</td><td><code translate="no">42</code></td><td>Definir para projeções aleatórias reproduzíveis, especialmente em testes e comparações de benchmark.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Criação do índice</td><td><code translate="no">tokenann</code></td><td>Utilizar quando se espera que a compressão aprendida ao nível da linha funcione melhor do que a projeção aleatória fixa.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Criação do índice</td><td><code translate="no">256</code></td><td>Controla o tamanho da representação comprimida. Aumente para obter mais capacidade; diminua para reduzir o consumo de memória e acelerar a recuperação.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Criação do índice</td><td><code translate="no">20000</code></td><td>Aumente quando o corpus for diversificado e a compressão aprendida não se ajustar adequadamente; reduza apenas para testes de pequena dimensão ou construções mais rápidas.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Criação do índice</td><td><code translate="no">50</code></td><td>Aumente se o treino não tiver convergido; reduza quando o tempo de construção for a principal restrição.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Construção do índice</td><td><code translate="no">512</code></td><td>Ajuste em função do rendimento do treino e da utilização de memória.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Construção do índice</td><td><code translate="no">0.001</code></td><td>Ajuste quando o treino estiver instável ou convergir demasiado lentamente.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Criação do índice</td><td><code translate="no">42</code></td><td>Defina para execuções de treino reprodutíveis.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Criação do índice</td><td><code translate="no">2</code></td><td>Aumente apenas quando o corpus necessitar de um extrator de características mais expressivo e for possível suportar o custo adicional de treino.</td></tr>
<tr><td>Todas as estratégias</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Pesquisa</td><td><code translate="no">3.0</code></td><td>Aumente para recuperar mais candidatos na primeira fase e melhorar a taxa de recuperação; diminua para reduzir a latência.</td></tr>
<tr><td>Todas as estratégias</td><td><code translate="no">emb_list_rerank</code></td><td>Pesquisa</td><td><code translate="no">true</code></td><td>Mantenha ativado para o reclassificação do MaxSim. Desative apenas em experiências controladas em que a qualidade da ANN da primeira fase esteja a ser medida diretamente.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Configurar a estratégia no Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>No Milvus, a estratégia é passada como um parâmetro de índice ao criar um índice num campo EmbeddingList, tal como um subcampo vetorial StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Para o LEMUR, forneça os parâmetros de treino do LEMUR no mesmo mapa « <code translate="no">params</code> ».</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Configurar os valores predefinidos do lado do servidor no Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus também pode preencher parâmetros de índice a partir de ` <code translate="no">milvus.yaml</code>`. A secção relevante é ` <code translate="no">knowhere</code>`. Os parâmetros são organizados por tipo de índice e fase, utilizando o padrão ` <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>`. Os parâmetros de índice fornecidos pelo utilizador têm precedência sobre estes valores predefinidos.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Dê preferência aos parâmetros por índice para a seleção de estratégias.</strong> Um valor predefinido do ficheiro de configuração do Milvus aplica-se de forma geral aos índices desse tipo e fase. Utilize os parâmetros de <code translate="no">create_index</code> quando diferentes coleções ou campos necessitarem de estratégias EmbeddingList diferentes.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Configurar a recuperação de candidatos no momento da pesquisa<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>A estratégia determina como o índice é construído. No momento da pesquisa, utilize <code translate="no">retrieval_ann_ratio</code> para controlar quantos candidatos da primeira fase são recuperados antes da reclassificação do MaxSim. Valores mais elevados geralmente melhoram a recuperação, mas aumentam a latência.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parâmetro</th><th>Fase</th><th>Padrão</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Construção do índice</td><td><code translate="no">tokenann</code></td><td>Seleciona a forma como os candidatos da EmbeddingList são indexados e recuperados.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Pesquisa</td><td><code translate="no">3.0</code></td><td>Fator de expansão dos candidatos para a primeira ronda da ANN.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Pesquisa</td><td><code translate="no">true</code></td><td>Se os candidatos recuperados devem ser reclassificados com o MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Notas de compatibilidade:</strong> O MUVERA e o LEMUR suportam atualmente dados fp32 no Knowhere. O DiskANN suporta a EmbeddingList apenas com a estratégia TokenANN. Se utilizar tipos de vetores que não sejam fp32 ou o DiskANN, verifique o suporte da estratégia antes de alterar o valor predefinido.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Como escolher uma estratégia<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Não existe uma estratégia universalmente melhor. Escolha com base no comprimento da lista de incorporação, na discriminação do espaço de incorporação, no orçamento de latência, no tamanho do índice e na possibilidade de realizar uma etapa de treino.</p>
<table>
<thead>
<tr><th>Pergunta</th><th>Sinal</th><th>Ponto de partida recomendado</th></tr>
</thead>
<tbody>
<tr><td>Precisa de uma linha de base de alta qualidade?</td><td>Pretende medir a melhor aproximação prática antes de otimizar o custo.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>As linhas têm um número reduzido ou moderado de vetores?</td><td>Cada linha contém um número reduzido de vetores de token, patch ou clip.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>O TokenANN é demasiado grande ou demasiado lento?</td><td>O tamanho do índice ou a latência de recuperação na primeira fase constituem o estrangulamento.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Pretende compressão sem treino?</td><td>Precisa de um modelo operacional mais simples e de uma codificação reprodutível.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>O espaço de incorporação tem baixa discriminação?</td><td>As ANN a nível de token apresentam ruído, e a projeção aleatória não preserva sinal suficiente.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>A carga de trabalho é visual ou multimodal?</td><td>As linhas contêm muitos vetores de patch, e a TokenANN é demasiado dispendiosa.</td><td><code translate="no">lemur</code> ou <code translate="no">muvera</code></td></tr>
<tr><td>O comprimento dos documentos apresenta grande assimetria?</td><td>Algumas linhas contêm muito mais vetores do que outras.</td><td>Comece com <code translate="no">muvera</code>; valide cuidadosamente <code translate="no">lemur</code>.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Fluxo de trabalho de avaliação sugerido<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Comece com <code translate="no">tokenann</code> como referência de qualidade, quando o tamanho do conjunto de dados o permitir.</p></li>
<li><p>Execute as mesmas consultas com <code translate="no">muvera</code> e compare a taxa de recuperação, o nDCG, a latência e o tamanho do índice.</p></li>
<li><p>Experimente o <code translate="no">lemur</code> quando a lista de embeddings for grande, o espaço de embeddings for ruidoso ou a carga de trabalho for visual ou multimodal.</p></li>
<li><p>Ajuste o parâmetro « <code translate="no">retrieval_ann_ratio</code> » antes de alterar demasiados parâmetros de compilação. Aumente-o se a taxa de recuperação for baixa; reduza-o se a latência for demasiado elevada.</p></li>
<li><p>Valide sempre com consultas representativas e distribuições de comprimento de documentos. Uma estratégia que funciona com texto curto pode não funcionar com documentos visuais ou corpora de cauda longa.</p></li>
</ol>
<table>
<thead>
<tr><th>### Qualidade em primeiro lugar Comece com o ` <code translate="no">tokenann</code>`. Utilize-o como referência para a qualidade da aproximação do MaxSim.</th><th>### Equilibrado Experimente <code translate="no">muvera</code> quando precisar de um custo mais baixo sem adicionar um pipeline de treino.</th><th>### Comprimido Experimente <code translate="no">lemur</code> quando for provável que a compressão aprendida ao nível da linha tenha um desempenho superior à projeção aleatória fixa.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Referências utilizadas neste rascunho<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Testes do Milvus para <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> e <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Tratamento do ficheiro de configuração do Milvus para os valores predefinidos do índice do lado do servidor na secção « <code translate="no">knowhere</code> ».</p></li>
<li><p>Definições de parâmetros do Knowhere para valores predefinidos e nomes de estratégias suportadas.</p></li>
<li><p>Verificações de compatibilidade do Knowhere para o suporte exclusivo a fp32 do MUVERA/LEMUR e ao suporte exclusivo ao TokenANN do DiskANN.</p></li>
<li><p>Notas de avaliação interna que comparam o TokenANN, o MUVERA e o LEMUR para a recuperação de candidatos no MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Nota de publicação:</strong> Antes de publicar externamente, verifique quais os parâmetros oficialmente suportados na versão do Milvus em questão e se o produto pretende expor todos os parâmetros de baixo nível do Knowhere ou apenas um subconjunto mais reduzido e documentado.</p>
</div>
