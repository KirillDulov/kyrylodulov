export const fetchProductsApi = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Літня сукня',
          price: 1200,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'Класичний костюм',
          price: 2500,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'Пальто жіноче',
          price: 3200,
          image: 'https://via.placeholder.com/150',
        },
      ]);
    }, 1000);
  });