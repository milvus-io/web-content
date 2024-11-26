---
id: configure_log.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure log for Milvus.
---

# log-related Configurations

Configures the system log output.

## `log.level`

<table id="log.level">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus log level. Option: debug, info, warn, error, panic, and fatal. </li>      
        <li>It is recommended to use debug level under test and development environments, and info level in production environment.</li>      </td>
      <td>info</td>
    </tr>
  </tbody>
</table>


## `log.file.rootPath`

<table id="log.file.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Root path to the log files.</li>      
        <li>The default value is set empty, indicating to output log files to standard output (stdout) and standard error (stderr).</li>      
        <li>If this parameter is set to a valid local path, Milvus writes and stores log files in this path.</li>      
        <li>Set this parameter as the path that you have permission to write.</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `log.file.maxSize`

<table id="log.file.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of a log file, unit: MB.      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>


## `log.file.maxAge`

<table id="log.file.maxAge">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum retention time before a log file is automatically cleared, unit: day. The minimum value is 1.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `log.file.maxBackups`

<table id="log.file.maxBackups">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of log files to back up, unit: day. The minimum value is 1.      </td>
      <td>20</td>
    </tr>
  </tbody>
</table>


## `log.format`

<table id="log.format">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Milvus log format. Option: text and JSON      </td>
      <td>text</td>
    </tr>
  </tbody>
</table>


## `log.stdout`

<table id="log.stdout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Stdout enable or not      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


