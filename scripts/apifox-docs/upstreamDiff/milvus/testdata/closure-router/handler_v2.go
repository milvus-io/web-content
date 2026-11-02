package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	router.POST(CollectionCategory+ListAction, wrapperPost(func() any { return &CollectionNameReq{} }, func(c *gin.Context) {
		audit(c, router)
	}))
}

func wrapperPost(req func() any, h gin.HandlerFunc) gin.HandlerFunc { return h }

func audit(c *gin.Context, router gin.IRouter) {}
