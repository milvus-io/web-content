package httpserver

import "github.com/gin-gonic/gin"

const ListAction = "list"
const CollectionCategory = "/collections/"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	router.POST(UndefinedCategory+ListAction, timeoutMiddleware(wrapperPost(func() any { return &EmptyReq{} }, h.list)))
}

func timeoutMiddleware(h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) list(c *gin.Context) {}
