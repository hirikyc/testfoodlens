export default class HomeModel {
  getExampleFoods() {
    return [
      {
        name: 'Pempek',
        region: 'Palembang',
        image: '/images/pages-picture/home_page_pempek_pictures.jpg',
        category: 'olahan ikan, makanan khas,gorengan',
      },
      {
        name: 'Bebek Betutu',
        region: 'Bali',
        image: '/images/pages-picture/home_page_bebek_betutu_pictures.jpg',
        category: 'olahan bebek, makanan khas, daging',
      },
    ];
  }
}
