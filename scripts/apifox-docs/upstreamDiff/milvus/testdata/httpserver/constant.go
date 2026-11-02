package httpserver

const (
	CollectionCategory = "/collections/"
	EntityCategory     = "/entities/"

	ListAction          = "list"
	CreateAction        = "create"
	DeleteAction        = "delete"
	GetProgressAction   = "get_progress" // deprecated, keep it for compatibility, use the import job describe route instead
)
