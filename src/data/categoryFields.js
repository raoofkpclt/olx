
export const categoryFields = {
  cars: [
    { 
      id: 'brand', 
      label: 'Brand', 
      type: 'select', 
      options: ['Toyota', 'Honda', 'Ford', 'BMW',"Maruthi","Benz","Audi","Mahindra","Hundai"],
      validation: { required: true }
    },
    { 
      id: 'year', 
      label: 'Year', 
      type: 'text',
      validation: { 
        required: true,
        pattern: /^\d{4}$/,
        min: 1900,
        max: new Date().getFullYear() + 1
      }
    },
    { 
      id: 'fuel', 
      label: 'Fuel', 
      type: 'buttons', 
      options: ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'],
      validation: { required: true }
    },
    { 
      id: 'transmission', 
      label: 'Transmission', 
      type: 'buttons', 
      options: ['Automatic', 'Manual'],
      validation: { required: true }
    }
  ],
  bike: [
    { 
      id: 'brand', 
      label: 'Brand', 
      type: 'select', 
      options: ['Hero', 'Honda', 'Yamaha', 'Bajaj','KTM',"Kawasaki","Ola","Enfield"],
      validation: { required: true }
    },
    { 
      id: 'year', 
      label: 'Year', 
      type: 'text',
      validation: { 
        required: true,
        pattern: /^\d{4}$/,
        min: 1900,
        max: new Date().getFullYear() + 1
      }
    },
  ],
  houses: [
    { 
      id: 'type', 
      label: 'Property Type', 
      type: 'select', 
      options: ['Apartment', 'House', 'Villa', 'Plot'],
      validation: { required: true }
    },
    { 
      id: 'bedrooms', 
      label: 'Bedrooms', 
      type: 'select', 
      options: ['1', '2', '3', '4', '5+'],
      validation: { required: true }
    },
    { 
      id: 'size', 
      label: 'Size (sq ft)', 
      type: 'text',
      validation: { 
        required: true,
        pattern: /^\d+$/,
        min: 100
      }
    },
    { 
      id: 'furnished', 
      label: 'Furnished', 
      type: 'buttons', 
      options: ['Yes', 'No', 'Semi-Furnished'],
      validation: { required: true }
    }
  ],
  electronics: [
    { 
      id: 'type', 
      label: 'Device Type', 
      type: 'select', 
      options: ['Mobile', 'Laptop', 'TV', 'Other'],
      validation: { required: true }
    },
    { 
      id: 'brand', 
      label: 'Brand', 
      type: 'text',
      validation: { required: true }
    },
    { 
      id: 'condition', 
      label: 'Condition', 
      type: 'buttons', 
      options: ['New', 'Used', 'Refurbished'],
      validation: { required: true }
    }
  ],
  furniture: [
    { 
      id: 'type', 
      label: 'Furniture Type', 
      type: 'select',
      options: ['Sofa', 'Table', 'Chair', 'Bed', 'Cabinet'],
      validation: { required: true }
    },
    { 
      id: 'material', 
      label: 'Material', 
      type: 'select', 
      options: ['Wood', 'Metal', 'Glass', 'Plastic'],
      validation: { required: true }
    },
    { 
      id: 'condition', 
      label: 'Condition', 
      type: 'buttons', 
      options: ['New', 'Used'],
      validation: { required: true }
    }
  ]
};
