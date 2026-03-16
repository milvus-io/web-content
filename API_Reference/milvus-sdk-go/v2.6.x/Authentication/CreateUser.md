# CreateUser()

This operation creates a new user with a username and password.

```go
func (c *Client) CreateUser(ctx context.Context, opt CreateUserOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateUserOption(userName, password)

err := client.CreateUser(ctx, option)
```

**PARAMETERS:**

- **userName** (*string*)

      The name of the user.

- **password** (*string*)

      The password for the user.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.CreateUser(ctx, milvusclient.NewCreateUserOption("my_user", "P@ssw0rd"))
if err != nil {
	// handle error
}
```
