package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	registerGroupRoutes(router)
}

func registerGroupRoutes(router gin.IRouter) {
	router.POST("/v2/vectordb/collections/list", nil)
}
