# 🚗 Hopster - A Ride Sharing System (WIP)

Hopster is a modular, scalable, and microservice-based ride-sharing backend system written in **Go** using **gRPC**, designed to handle real-world challenges of user onboarding, driver management, and trip coordination.

> 🔧 Currently in development – built with clean architecture principles, type-safe protobufs, and structured monorepo tooling.

---

## 📐 Architecture

Hopster is structured into 3 main services + 1 gateway:

```

apps/
├── user      --> Manages user registration & login
├── driver    --> Handles driver profile & availability
├── trip      --> Coordinates ride creation & status
├── gateway   --> HTTP interface for frontend, routes to internal gRPC services
packages/
└── proto     --> Shared protobuf definitions and generated Go code

````

Each service exposes a **gRPC interface**, and the gateway handles **HTTP requests** and converts them into internal gRPC calls.

---

## ⚙️ Tech Stack

- 🧠 **Golang** – Modern, fast, strongly typed backend
- 🔌 **gRPC** – Internal service communication
- 📦 **Protocol Buffers** – Schema definition & code generation
- 🛠️ **Monorepo** – Centralized using native Go tooling
- 📁 **Modular Clients** – Each service has a gRPC client abstraction
- 🧪 **Testable Design** – Handler abstractions for easier mocking

---

## 🚀 Getting Started

### ✅ Prerequisites
- Go 1.21+
- Protobuf compiler (`protoc`)
- `protoc-gen-go` and `protoc-gen-go-grpc`

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
````

### 📦 Clone and setup

```bash
git clone https://github.com/parthkapoor-dev/hopster
cd hopster

# Initialize and download Go modules
go mod tidy
```

### 🔧 Build Protobufs

```bash
protoc --go_out=packages/proto/build --go-grpc_out=packages/proto/build \
  --proto_path=packages/proto packages/proto/*.proto
```

### 🏁 Run services

#### 1. Start the **User Service**

```bash
cd apps/user
go run main.go
```

#### 2. Start the **Gateway**

```bash
cd apps/gateway
go run main.go
```

> Services listen on ports like `:2000`, and Gateway on `:3000` by default.

---

## 📨 API Flow Example

```
Frontend  -->  Gateway (HTTP)  -->  gRPC (User Service)
POST /users/register           -->  RegisterNewUser(ctx, pb.User)
```

The gateway translates HTTP requests into protobufs, calls the gRPC method, and responds to the client.

---

## 🛠️ Roadmap

* [x] gRPC Setup with Gateway
* [x] User Service Skeleton
* [ ] Implement User Registration Logic (DB)
* [ ] Add Driver Service
* [ ] Add Trip Service
* [ ] Authentication & Middleware
* [ ] Docker Compose + Dev tooling

---

## 🤝 Contribution

Pull requests and issues are welcome. Let’s build something scalable and elegant!

---

## 🧑‍💻 Author

**Parth Kapoor**
[🌐 Portfolio](https://parthkapoor.me) | [🔗 LinkedIn](https://linkedin.com/in/parthkapoor08) | [📂 GitHub](https://github.com/parthkapoor-dev)

---

## 📄 License

MIT License
