const ML_API_URL = 'http://localhost:8000/detect'; // Disesuaikan dengan endpoint FastAPI Anda

const FoodLensMLAPI = {
  async predictFood(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(ML_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal memproses gambar');
    }
    return await response.json();
  }
};

export default FoodLensMLAPI;
