package httpserver

import "github.com/gin-gonic/gin"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	router.POST(CollectionCategory+ListAction, timeoutMiddleware(wrapperPost(func() any { return &CollectionNameReq{} }, wrapperTraceLog(h.listCollections))))
	router.POST(CollectionCategory+GetProgressAction, timeoutMiddleware(wrapperPost(func() any { return &JobIDReq{JobID: "default"} }, wrapperTraceLog(h.getProgress))))
	router.POST(EntityCategory+DeleteAction, h.dqlAdmission(timeoutMiddleware(wrapperPost(func() any {
		return &CollectionDataReq{}
	}, h.deleteEntities))))
	router.POST(CollectionCategory+CreateAction, timeoutMiddleware(wrapperPost(func() any { return &CreateCollectionReq{} }, wrapperTraceLog(h.createCollection))))
}

func timeoutMiddleware(h gin.HandlerFunc) gin.HandlerFunc { return h }

func wrapperTraceLog(h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) dqlAdmission(h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) listCollections(c *gin.Context) {}

func (h *HandlersV2) getProgress(c *gin.Context) {}

func (h *HandlersV2) deleteEntities(c *gin.Context) {}

func (h *HandlersV2) createCollection(c *gin.Context) {}
