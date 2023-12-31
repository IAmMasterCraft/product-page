const phoneList = [
  {
    manufacturer: "Samsung",
    phoneName: "Galaxy S23",
    price: 880.00,
    sim: "Single SIM",
    condition: "Refurbished",
    color: "Black",
    network: "4G",
    storage: "256GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "Apple",
    phoneName: "iPhone 13",
    price: 799.99,
    sim: "Dual SIM",
    condition: "New",
    color: "Blue",
    network: "5G",
    storage: "128GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "Google",
    phoneName: "Pixel 6",
    price: 699.99,
    sim: "Single SIM",
    condition: "New",
    color: "White",
    network: "5G",
    storage: "128GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "OnePlus",
    phoneName: "OnePlus 9",
    price: 749.99,
    sim: "Dual SIM",
    condition: "New",
    color: "Silver",
    network: "5G",
    storage: "256GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "Xiaomi",
    phoneName: "Redmi Note 10",
    price: 299.99,
    sim: "Dual SIM",
    condition: "New",
    color: "Green",
    network: "4G",
    storage: "64GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "Sony",
    phoneName: "Xperia 5 III",
    price: 899.99,
    sim: "Single SIM",
    condition: "New",
    color: "Black",
    network: "5G",
    storage: "128GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "LG",
    phoneName: "LG G8 ThinQ",
    price: 399.99,
    sim: "Single SIM",
    condition: "Refurbished",
    color: "Gray",
    network: "4G",
    storage: "64GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
  {
    manufacturer: "Huawei",
    phoneName: "P40 Pro",
    price: 599.99,
    sim: "Dual SIM",
    condition: "New",
    color: "Silver",
    network: "4G",
    storage: "256GB",
    image: "product-image.jpeg",
    imageList: {
      thumbnails: [
        "product-image-thumbnail.jpeg",
        "product-image-front-thumbnail.jpeg",
        "product-image-back-thumbnail.jpeg",
      ],
      largeImages: [
        "product-image-large.jpeg",
        "product-image-front-large.jpeg",
        "product-image-back-large.jpeg",
      ],
      originalResolution: [
        "product-image.jpeg",
        "product-image-front.jpeg",
        "product-image-back.jpeg",
      ],
    },
    videos: [
      "single-click-zoom-desktop.mp4",
      "double-tap-zoom-mobile.mp4",
      "drag-swipe-in-mobile.mp4",
    ],
  },
];

const getPhone = (slug) => {
  const splittedSlug = slug.split("-");
  const manufacturer = splittedSlug.shift();
  const phoneName = splittedSlug.join(" ");
  const result = phoneList.find((phone) => {
    const actualManufacturer = phone.manufacturer.toLowerCase();
    const actualPhoneName = phone.phoneName.toLowerCase();
    if (actualManufacturer === manufacturer && actualPhoneName === phoneName) return phone;
  });
  return result;
}

export default {
  getPhone,
  phoneList,
};
