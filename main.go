package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/shv-ng/hirehustle/db"
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("fail to run: %v", err)
	}
}

func run() error {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	ctx := context.Background()
	connString := os.Getenv("POSTGRES_URL")
	if connString == "" {
		return fmt.Errorf("POSTGRES_URL is not set")
	}

	conn, err := pgx.Connect(ctx, connString)
	if err != nil {
		return err
	}
	defer conn.Close(ctx)

	queries := db.New(conn)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS middleware
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Route("/jobs", func(r chi.Router) {
		r.Post("/", createJobHandler(queries))
		r.Get("/", listJobsHandler(queries))
		r.Get("/{id}", getJobHandler(queries))
		r.Put("/{id}", updateJobHandler(queries))
		r.Delete("/{id}", deleteJobHandler(queries))
	})

	log.Println("🚀 Server starting on :8080")
	return http.ListenAndServe(":8080", r)
}
