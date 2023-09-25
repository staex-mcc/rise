IMAGE := ghcr.io/staex-mcc/rise-node:latest

.PHONY: rise
rise:
	docker build --tag $(IMAGE) --file Dockerfile ..
	docker push $(IMAGE)
