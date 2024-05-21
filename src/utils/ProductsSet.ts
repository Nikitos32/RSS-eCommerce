import { ProductData } from '@commercetools/platform-sdk';
export const ProductsSet: ProductData[] = [
  {
    //https://www.wayfair.com/furniture/pdp/gracie-oaks-inelda-mid-century-upholstered-side-chair-farmhouse-dining-chairs-with-wood-legs-w008098064.html
    name: {
      'en-US': 'Upholstered chair with wooden legs',
    },
    description: {
      'en-US':
        'The dining chairs are the perfect classical ensemble for any occasion. Our armless kitchen curved backrest chairs bring any interior space a sophisticated mid-century modern touch with their wood frames and comfy upholstered backrests and seating. The iconic splayed legs are beautifully tapered to offer your dining room set the clean and refined atmosphere you’ve been looking for.',
    },
    categories: [
      {
        typeId: 'category',
        id: 'ot-baldy',
      },
      {
        typeId: 'category',
        id: 'ot-baldy-2',
      },
    ],
    slug: {
      'en-US': 'upholstered-chair-wooden-legs',
    },
    categoryOrderHints: {},
    masterVariant: {
      id: 1,
      sku: 'UCWL',
      prices: [
        {
          id: 'ot-baldy-0bb903e2e6d7',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 38999,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: 'ot-baldy-0bb903e2e45',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 35999,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      images: [
        {
          url: '/public/photos/ucwl-1',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/ucwl-2.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/ucwl-3.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
      ],
      attributes: [
        {
          name: 'productspec',
          value: {
            'en-US': '- Includes 2 chair',
          },
        },
      ],
    },
    variants: [],
    searchKeywords: {},
  },
  {
    // https://virtualmuebles.com/products/kit-por-4-sillas-eames-patas-en-madera-para-comedor-sala-restaurante-amarillas
    name: {
      'en-US': 'Chair with wooden legs',
    },
    description: {
      'en-US':
        'Design is suitable for modern homes, therefore, you can use it in a dining room',
    },
    categories: [
      {
        typeId: 'category',
        id: 'ot-baldy-34',
      },
      {
        typeId: 'category',
        id: 'ot-baldy-2443',
      },
    ],
    slug: {
      'en-US': 'chair-wooden-legs',
    },
    categoryOrderHints: {},
    masterVariant: {
      id: 1,
      sku: 'CWL',
      prices: [
        {
          id: 'ot-baldy-0bb903re6d7',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 31999,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: 'ot-baldy-0bb903e2ew5',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 27999,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      images: [
        {
          url: '/public/photos/cwl-1.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/cwl-2.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/cwl-3.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
      ],
      attributes: [
        {
          name: 'productspec',
          value: {
            'en-US': '- Includes 4 chair',
          },
        },
      ],
    },
    variants: [],
    searchKeywords: {},
  },
  {
    // https://virtualmuebles.com/products/kit-por-4-sillas-eames-patas-en-madera-para-comedor-sala-restaurante-amarillas
    name: {
      'en-US': 'Bar Chair',
    },
    description: {
      'en-US':
        'Stool is made of iron, and features a round pedestal base with a built-in footrest. The plastic seat features a low profile and a bucket style. We love that this stool is height-adjustable and that it swivels 360°, so you can find just the right position when you’re eating or entertaining. This set completes the look in any mid-century modern or minimalist setting.',
    },
    categories: [
      {
        typeId: 'category',
        id: 'ot-baldy-334',
      },
      {
        typeId: 'category',
        id: 'ot-baldy-244f3',
      },
    ],
    slug: {
      'en-US': 'bar-chair',
    },
    categoryOrderHints: {},
    masterVariant: {
      id: 1,
      sku: 'BC',
      prices: [
        {
          id: 'ot-baldy-b90334re6d7',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 27999,
            fractionDigits: 2,
          },
          country: 'DE',
        },
        {
          id: 'ot-baldy-0b3e2ew5',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 23999,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      images: [
        {
          url: '/public/photos/bc-1.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/bc-2.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
        {
          url: '/public/photos/bc-3.webp',
          dimensions: {
            w: 1200,
            h: 1200,
          },
        },
      ],
      attributes: [
        {
          name: 'productspec',
          value: {
            'en-US': '- Includes 1 chair',
          },
        },
      ],
    },
    variants: [],
    searchKeywords: {},
  },
];
