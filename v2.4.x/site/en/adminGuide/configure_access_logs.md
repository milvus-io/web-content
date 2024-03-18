---
id: configure_access_logs.md
title: Configure Access Logs
---

# Configure Access Logs

The access log feature in Milvus allows server managers to record and analyze user access behavior, assisting in understanding aspects like query success rates and failure reasons.

This guide provides detailed instructions on configuring access logs in Milvus.

Configuration of access logs depends on the installation method of Milvus:

- **Helm Installation**: Configure in `values.yaml`. For more information, see [Configure Milvus with Helm Charts](configure-helm.md).
- **Docker Installation**: Configure in `milvus.yaml`. For more information, see [Configure Milvus with Docker Compose](configure-docker.md).
- **Operator Installation**: Modify `spec.components` in the configuration file. For more information, see [Configure Milvus with Milvus Operator](configure_operator.md).

## Configuration options

Choose among three configuration options based on your needs:

- **Base config**: For general purposes.
- **Config for local access log files**: For storing logs locally.
- **Config for uploading local access logs to MinIO**: For cloud storage and backup.

### Base config

Basic configuration involves enabling access logs and defining the log filename or using stdout.

```yaml
proxy:
  accessLog:
    enable: true
    # If `filename` is emtpy, logs will be printed to stdout.
    filename: ""
    # Additional formatter configurations...
```

- `proxy.accessLog.enable`: Whether to enable the access log feature. Defaults to **false**.
- `proxy.accessLog.filename`: The name of the access log file. If you leave this parameter empty, access logs will be printed to stdout.

### Config for local access log files

Configure local storage for access log files with parameters including the local file path, file size, and rotation interval:

```yaml
proxy:
  accessLog:
    enable: true
    filename: "access_log.txt" # Name of the access log file
    localPath: "/var/logs/milvus" # Local file path where the access log file is stored
    maxSize: 500 # Max size for each single access log file. Unit: MB
    rotatedTime: 24 # Time interval for log rotation. Unit: seconds
    maxBackups: 7 # Max number of sealed access log files that can be retained
    # Additional formatter configurations...
```

These parameters are specified when `filename` is not empty.

- `proxy.accessLog.localPath`: The local file path where the access log file is stored.
- `proxy.accessLog.maxSize`: The maximum size in MB allowed for a single access log file. If the log file size reaches this limit, a rotation process will be triggered. This process seals the current access log file, creates a new log file, and clears the contents of the original log file.
- `proxy.accessLog.rotatedTime`: The maximum time interval in seconds allowed for rotating a single access log file. Upon reaching the specified time interval, a rotation process is triggered, resulting in the creation of a new access log file and sealing of the previous one.
- `proxy.accessLog.maxBackups`: The maximum number of sealed access log files that can be retained. If the number of sealed access log files exceeds this limit, the oldest one will be deleted.

### Config for uploading local access log files to MinIO

Enable and configure settings to upload local access log files to MinIO:

```yaml
proxy:
  accessLog:
    enable: true
    filename: "access_log.txt"
    localPath: "/var/logs/milvus"
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: true
    remotePath: "/milvus/logs/access_logs"
    remoteMaxTime: 0
    # Additional formatter configurations...
```

When configuring MinIO parameters, ensure that you have set either `maxSize` or `rotatedTime`. Failure to do so may result in unsuccessful uploads of local access log files to MinIO.

- `proxy.accessLog.minioEnable`: Whether to upload local access log files to MinIO. Defaults to **false**.
- `proxy.accessLog.remotePath`: The path of the object storage for uploading access log files.
- `proxy.accessLog.remoteMaxTime`: The time interval allowed for uploading access log files. If the upload time of a log file exceeds this interval, the file will be deleted. Setting the value to 0 disables this feature.

## Formatter config

The default log format used for all methods is the `base` format, which does not require specific method associations. However, if you wish to customize the log output for specific methods, you can define a custom log format and apply it to the associated methods.

```yaml
proxy:
  accessLog:
    enable: true
    filename: "access_log.txt"
    localPath: "/var/logs/milvus"
    # Define custom formatters for access logs with format and applicable methods
    formatters:
      # The `base` formatter applies to all methods by default
      # The `base` formatter does not require specific method association
      base: 
        # Format string; an empty string means no log output
        format: "[$time_now] [ACCESS] <$user_name: $user_addr> $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]"
      # Custom formatter for specific methods (e.g., Query, Search)
      query: 
        format: "[$time_now] [ACCESS] <$user_name: $user_addr> $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]"
        # Specify the methods to which this custom formatter applies
        methods: ["Query", "Search"]
```

- `proxy.accessLog.<formatter_name>.format`: Defines the log format with dynamic metrics. For more information, see [Supported metrics](#reference-supported-metrics).
- `proxy.accessLog.<formatter_name>.methods`: Lists Milvus operations using this formatter. To obtain method names, see **MilvusService** in [Milvus methods](https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto).

## Reference: Supported metrics

| Metric Name        | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `$method_name`     | Name of the method                                                          |
| `$method_status`   | Status of access: **OK** or **Fail**                                        |
| `$method_expr`     | Expression used for query, search, or delete operations                     |
| `$trace_id`        | TraceID associated with the access                                          |
| `$user_addr`       | IP address of the user                                                      |
| `$user_name`       | Name of the user                                                            |
| `$response_size`   | Size of the response data                                                   |
| `$error_code`      | Error code specific to Milvus                                               |
| `$error_msg`       | Detailed error message                                                      |
| `$database_name`   | Name of the target Milvus database                                          |
| `$collection_name` | Name of the target Milvus collection                                        |
| `$partition_name`  | Name or names of the target Milvus partition(s)                             |
| `$time_cost`       | Time taken for completing the access                                        |
| `$time_now`        | Time at which the access log is printed (usually equivalent to `$time_end`) |
| `$time_start`      | Time at which the access starts                                             |
| `$time_end`        | Time at which the access ends                                               |
| `$sdk_version`     | Version of the Milvus SDK used by the user                                  |
