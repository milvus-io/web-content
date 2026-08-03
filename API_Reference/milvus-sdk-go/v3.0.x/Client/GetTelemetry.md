# GetTelemetry()

This operation returns the client telemetry manager for collecting and reporting client-side metrics.

```go
func (c *Client) GetTelemetry() *ClientTelemetryManager
```

**RETURN TYPE:**

*ClientTelemetryManager*

**RETURNS:**

The telemetry manager associated with this client, or nil if telemetry is not enabled.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

telemetry := cli.GetTelemetry()
if telemetry != nil {
	fmt.Println("Telemetry client ID:", telemetry.GetClientID())
}
```
