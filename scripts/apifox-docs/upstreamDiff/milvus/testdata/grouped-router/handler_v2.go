package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	g := router.Group("/v2/vectordb")
	g.POST("/collections/list", wrapperPost(func() any { return &CollectionNameReq{} }, h.listCollections))
	router.POST(CollectionCategory+CreateAction, wrapperPost(func() any { return &CollectionNameReq{} }, h.listCollections))
}

func wrapperPost(req func() any, h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) listCollections(c *gin.Context) {}
