# Stage 1: Build the binary
FROM golang:1.25-alpine AS builder

# Install build dependencies if needed (e.g., git, gcc)
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application
# CGO_ENABLED=0 ensures the binary is statically linked
RUN CGO_ENABLED=0 GOOS=linux go build -o hirehustle .

# Stage 2: Final lightweight image
FROM alpine:latest

# Install CA certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy only the compiled binary from the builder stage
COPY --from=builder /app/hirehustle .

# (Optional) Copy .env if you are not using environment variables via Docker/K8s
# COPY --from=builder /app/.env .

# Expose the port the app runs on
EXPOSE 8080

# Run the binary
CMD ["./hirehustle"]
