package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
)

type Word struct {
	Text string `json:"text"`
}

var (
	words []Word
	mu    sync.RWMutex
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from the Next.js development server
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "86400") // 24 hours

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func getWords(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		log.Printf("Method not allowed: %s", r.Method)
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	log.Printf("Handling GET request for words")
	mu.RLock()
	defer mu.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(words); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
	log.Printf("Successfully returned %d words", len(words))
}

func addWord(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		log.Printf("Method not allowed: %s", r.Method)
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var word Word
	if err := json.NewDecoder(r.Body).Decode(&word); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if word.Text == "" {
		log.Printf("Empty word received")
		http.Error(w, "Word cannot be empty", http.StatusBadRequest)
		return
	}

	log.Printf("Adding new word: %s", word.Text)
	mu.Lock()
	words = append(words, word)
	mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(word); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
	log.Printf("Successfully added word: %s", word.Text)
}

func main() {
	// Initialize the words slice
	words = make([]Word, 0)

	// Set up routes
	http.HandleFunc("/api/words", enableCORS(getWords))
	http.HandleFunc("/api/words/add", enableCORS(addWord))

	// Start the server
	serverAddr := ":8080"
	log.Printf("Server starting on %s...", serverAddr)
	if err := http.ListenAndServe(serverAddr, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}