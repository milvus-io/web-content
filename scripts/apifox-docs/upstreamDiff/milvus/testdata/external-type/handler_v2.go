package httpserver

import "github.com/gin-gonic/gin"

const CollectionCategory = "/collections/"
const CreateAction = "create"

type HandlersV2 struct{}

func (h *HandlersV2) RegisterRoutesToV2(router gin.IRouter) {
	router.POST(CollectionCategory+CreateAction, timeoutMiddleware(wrapperPost(func() any { return &BorrowReq{} }, h.create)))
}

func timeoutMiddleware(h gin.HandlerFunc) gin.HandlerFunc { return h }

func (h *HandlersV2) create(c *gin.Context) {}
