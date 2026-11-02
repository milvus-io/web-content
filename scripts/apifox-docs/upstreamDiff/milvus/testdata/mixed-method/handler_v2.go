package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	// Registration order deliberately differs from the (path, method) tuple
	// order: the extractor must emit /a get, /a post, /z get.
	router.GET(EntityCategory+GetAction, wrapperPost(func() any { return &JobIDReq{} }, h.getJob))
	router.POST(CollectionCategory+ListAction, wrapperPost(func() any { return &CollectionNameReq{} }, h.listCollections))
	router.POST(EntityCategory+GetAction, wrapperPost(func() any { return &JobIDReq{} }, h.getJob))
	router.GET(EntityCategory+DeleteAction, wrapperPost(func() any { return &JobIDReq{} }, h.getJob))
}

func wrapperPost(req func() any, h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) getJob(c *gin.Context) {}

func (h *HandlersV2) listCollections(c *gin.Context) {}
