package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	router.POST(CollectionCategory+ListAction, timeoutMiddleware(wrapperPost(func() any { return &CollectionNameReq{} }, h.listCollections), wrapperPost(func() any { return &JobIDReq{} }, h.getJob)))
}

func timeoutMiddleware(h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) listCollections(c *gin.Context) {}

func (h *HandlersV2) getJob(c *gin.Context) {}
