# Use a versão mais recente do Go (1.21 ou superior)
FROM golang:1.23-alpine as builder

# Install Git and other necessary packages
RUN apk add --no-cache git

# Build the custom k6 with the xk6-kafka extension
RUN go install go.k6.io/xk6/cmd/xk6@latest && \
    xk6 build --with github.com/mostafa/xk6-kafka@latest

# Use the official k6 image as the base for the final container
FROM alpine:3.18

# Copy the built k6 binary from the builder
COPY --from=builder /go/k6 /usr/bin/k6

# Set entrypoint to the k6 binary
ENTRYPOINT ["k6"]
