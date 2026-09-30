---
id: configure_trace.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure trace for Milvus.
---

# trace-related Configurations



## `trace.exporter`

<table id="trace.exporter">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>trace exporter type, default is stdout,</li>      
        <li>optional values: ['noop','stdout', 'jaeger', 'otlp']</li>      </td>
      <td>noop</td>
    </tr>
  </tbody>
</table>


## `trace.sampleFraction`

<table id="trace.sampleFraction">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>fraction of traceID based sampler,</li>      
        <li>optional values: [0, 1]</li>      
        <li>Fractions >= 1 will always sample. Fractions < 0 are treated as zero.</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>


## `trace.jaeger.url`

<table id="trace.jaeger.url">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        when exporter is jaeger should set the jaeger's URL      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `trace.otlp.endpoint`

<table id="trace.otlp.endpoint">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        example: "127.0.0.1:4317" for grpc, "127.0.0.1:4318" for http      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `trace.otlp.method`

<table id="trace.otlp.method">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        otlp export method, acceptable values: ["grpc", "http"],  using "grpc" by default      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `trace.initTimeoutSeconds`

<table id="trace.initTimeoutSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segcore initialization timeout in seconds, preventing otlp grpc hangs forever      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


