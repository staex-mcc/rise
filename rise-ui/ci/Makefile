IMAGE := ghcr.io/staex-mcc/rise-ui:latest

.PHONY: rise-ui
rise-ui:
	docker build --tag $(IMAGE) --file Dockerfile ..
	docker push $(IMAGE)
