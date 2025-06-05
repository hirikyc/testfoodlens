from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import tensorflow as tf
import numpy as np
import cv2
import pickle
import os
from typing import List, Dict, Any
import uvicorn
from sklearn.metrics.pairwise import cosine_similarity

class RestaurantRecommender:
    def __init__(self, vectorizer, place_vectors, places_data):
        self.vectorizer = vectorizer
        self.place_vectors = place_vectors
        self.places_data = places_data
        
    def get_recommendations(self, food_name: str, top_n: int = 5) -> List[Dict[str, Any]]:
        # Transformasi nama makanan menjadi vektor
        food_vector = self.vectorizer.transform([food_name])
        
        # Hitung skor kemiripan
        similarity_scores = cosine_similarity(food_vector, self.place_vectors).flatten()
        
        # Ambil indeks top N
        top_indices = similarity_scores.argsort()[-top_n:][::-1]
        
        # Ambil rekomendasi
        recommendations = []
        for idx in top_indices:
            place = self.places_data.iloc[idx]
            recommendations.append({
                'name': place['name'],
                'cuisine': place['cuisine'],
                'rating': float(place['rating']),
                'similarity_score': float(similarity_scores[idx])
            })
            
        return recommendations

app = FastAPI(title="FoodLens API",
             description="API untuk deteksi makanan dan rekomendasi restoran",
             version="1.0.0")

# Aktifkan CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Muat model deteksi makanan
print("\nMemuat model deteksi makanan...")
model = tf.keras.models.load_model(os.path.join('models', 'food_detection.keras'))

# Muat label makanan
print("Memuat label makanan...")
with open(os.path.join('data', 'food_labels.pkl'), 'rb') as f:
    class_names = pickle.load(f)

# Muat asal makanan
print("Memuat asal makanan...")
with open(os.path.join('data', 'food_origins.pkl'), 'rb') as f:
    food_origins = pickle.load(f)

# Inisialisasi rekomendasi restoran
print("Menginisialisasi rekomendasi restoran...")
with open(os.path.join('models', 'recommendation_system.pkl'), 'rb') as f:
    recommender_data = pickle.load(f)
    recommender = RestaurantRecommender(
        vectorizer=recommender_data['vectorizer'],
        place_vectors=recommender_data['place_vectors'],
        places_data=recommender_data['places_data']
    )
    print("Tipe rekomender:", type(recommender))
    print("Konten rekomender:", recommender)

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """Preproses gambar untuk prediksi model"""
    # Konversi bytes ke numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Konversi BGR ke RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Resize gambar
    img = cv2.resize(img, (224, 224))
    
    # Normalisasi nilai pixel
    img = img.astype(np.float32) / 255.0
    
    return img

@app.get("/")
async def root():
    """Endpoint root"""
    return {
        "message": "Selamat datang di FoodLens API",
        "endpoints": {
            "/detect": "POST - Unggah gambar untuk deteksi makanan",
            "/recommend/{food_name}": "GET - Dapatkan rekomendasi restoran untuk makanan tertentu"
        }
    }

@app.post("/detect")
async def detect_food(file: UploadFile = File(...)):
    """
    Deteksi makanan dalam gambar yang diunggah dan dapatkan rekomendasi restoran
    
    Args:
        file (UploadFile): File gambar yang akan diproses
        
    Returns:
        dict: Hasil deteksi dan rekomendasi restoran
    """
    try:
        # Validasi tipe file
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail="File harus berupa gambar"
            )
            
        # Baca file gambar
        contents = await file.read()
        
        # Preproses gambar
        img = preprocess_image(contents)
        img = np.expand_dims(img, axis=0)
        
        # Dapatkan prediksi
        predictions = model.predict(img, verbose=0)[0]
        predicted_class = np.argmax(predictions)
        confidence = float(predictions[predicted_class])
        
        # Dapatkan 3 prediksi teratas
        top_3_idx = np.argsort(predictions)[-3:][::-1]
        top_predictions = [
            {
                'food_name': class_names[idx],
                'confidence': float(predictions[idx]),
                'origin': food_origins.get(class_names[idx], "Tidak diketahui")
            }
            for idx in top_3_idx
        ]
        
        # Dapatkan nama makanan yang terdeteksi
        detected_food = class_names[predicted_class]
        
        # Dapatkan rekomendasi restoran
        recommendations = recommender.get_recommendations(detected_food)
        
        return {
            'detection': {
                'food_name': detected_food,
                'origin': food_origins.get(detected_food, "Tidak diketahui"),
                'confidence': confidence,
                'top_predictions': top_predictions
            },
            'recommendations': recommendations
        }
        
    except Exception as e:
        print(f"Error in detect_food: {str(e)}")  # Tambahkan logging
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )

@app.get("/recommend/{food_name}")
async def get_recommendations(food_name: str):
    """
    Dapatkan rekomendasi restoran untuk makanan tertentu
    
    Args:
        food_name (str): Nama makanan untuk mendapatkan rekomendasi
        
    Returns:
        list: Daftar restoran yang direkomendasikan
    """
    try:
        recommendations = recommender.get_recommendations(food_name)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 