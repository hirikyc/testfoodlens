# FoodLens API

FoodLens adalah API untuk deteksi makanan dan rekomendasi restoran menggunakan teknologi machine learning. API ini dapat mendeteksi berbagai jenis makanan Indonesia dan memberikan rekomendasi restoran yang menyajikan makanan tersebut.

## Fitur

- **Deteksi Makanan**: Mengidentifikasi makanan dari gambar yang diunggah
- **Informasi Asal**: Menampilkan asal daerah dari makanan yang terdeteksi
- **Rekomendasi Restoran**: Memberikan rekomendasi restoran berdasarkan makanan yang terdeteksi
- **Top 3 Prediksi**: Menampilkan 3 prediksi teratas dengan tingkat kepercayaan
- **API Endpoint**: Mudah diintegrasikan dengan aplikasi frontend

## Struktur Proyek

```
app/
├── main.py                 # File utama FastAPI
├── models/
│   ├── food_detection.keras    # Model deteksi makanan
│   └── recommendation_system.pkl    # Sistem rekomendasi restoran
└── data/
    ├── food_labels.pkl     # Label makanan
    ├── food_origins.pkl    # Data asal makanan
    └── restaurant_db.csv   # Database restoran
```

## Persyaratan Sistem

- Python 3.11 atau lebih baru
- FastAPI
- TensorFlow
- OpenCV
- scikit-learn
- uvicorn
- python-multipart

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/hirikyc/FoodLens
cd FoodLens
```

2. Instal dependensi:
```bash
pip install fastapi uvicorn python-multipart tensorflow opencv-python scikit-learn
```

## Menjalankan Aplikasi

1. Masuk ke direktori aplikasi:
```bash
cd app
```

2. Jalankan server:
```bash
python3 main.py
```

Server akan berjalan di `http://localhost:8000`

## API Endpoints

### 1. Deteksi Makanan
- **URL**: `/detect`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `file`: File gambar (jpg, jpeg, png)
- **Response**:
```json
{
    "detection": {
        "food_name": "nama_makanan",
        "origin": "asal_daerah",
        "confidence": 0.95,
        "top_predictions": [
            {
                "food_name": "nama_makanan",
                "confidence": 0.95,
                "origin": "asal_daerah"
            }
        ]
    },
    "recommendations": [
        {
            "name": "nama_restoran",
            "cuisine": "jenis_masakan",
            "rating": 4.5,
            "similarity_score": 0.85
        }
    ]
}
```

### 2. Rekomendasi Restoran
- **URL**: `/recommend/{food_name}`
- **Method**: `GET`
- **Response**: Daftar restoran yang direkomendasikan

### 3. Halaman Upload
- **URL**: `/detect`
- **Method**: `GET`
- **Response**: Halaman HTML untuk upload gambar

## Dokumentasi API

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Contoh Integrasi

### Menggunakan JavaScript/Fetch
```javascript
// Upload gambar untuk deteksi
async function detectFood(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('http://localhost:8000/detect', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

// Mendapatkan rekomendasi restoran
async function getRecommendations(foodName) {
    const response = await fetch(`http://localhost:8000/recommend/${foodName}`);
    return await response.json();
}
```

### Menggunakan Python/Requests
```python
import requests

# Upload gambar untuk deteksi
def detect_food(image_path):
    with open(image_path, 'rb') as f:
        files = {'file': f}
        response = requests.post('http://localhost:8000/detect', files=files)
    return response.json()

# Mendapatkan rekomendasi restoran
def get_recommendations(food_name):
    response = requests.get(f'http://localhost:8000/recommend/{food_name}')
    return response.json()
```

## Pengembangan

### Menambahkan Makanan Baru
1. Tambahkan gambar makanan ke dataset training
2. Update model dengan data baru
3. Tambahkan informasi asal makanan di `food_origins.pkl`

### Memperbarui Sistem Rekomendasi
1. Update data restoran di `restaurant_db.csv`
2. Jalankan script pembuatan sistem rekomendasi
3. Simpan hasil di `recommendation_system.pkl`

## Lisensi

[NAMA_LISENSI]

## Kontak

[INFORMASI_KONTAK] 