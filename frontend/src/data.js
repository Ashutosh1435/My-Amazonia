import bcrypt from 'bcryptjs';

const data = {

    products: [
        {
            _id: '1',
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 120,
            brand: 'Nike',
            rating: 3.7,
            numReviews: 10,
            countInStock: 10,
            description: "High quality product"
        },
        {
            _id: '2',
            name: 'Addidas fit Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            brand: 'Addidas',
            rating: 5,
            numReviews: 10,
            countInStock: 7,
            description: "High quality product"
        },
        {
            _id: '3',
            name: 'Denim Jeans Shirt',
            category: 'Shirts',
            image: '/images/p5.jpg',
            price: 400,
            brand: 'Denim',
            rating: 3,
            numReviews: 10,
            countInStock: 9,
            description: "High quality product"
        },
        {
            _id: '4',
            name: 'Nike Slim Jeans',
            category: 'Pants',
            image: '/images/i2.jpg',
            price: 120,
            brand: 'Nike',
            rating: 5,
            numReviews: 10,
            countInStock: 16,
            description: "High quality product"
        },
        {
            _id: '5',
            name: 'Stylo Slim Jeans',
            category: 'Pants',
            image: '/images/i1.jpg',
            price: 320,
            brand: 'Stylo',
            rating: 3,
            numReviews: 10,
            countInStock: 4,
            description: "High quality product"
        },
        {
            _id: '6',
            name: 'Cargo Fit Pant',
            category: 'Shirts',
            image: '/images/i2.jpg',
            price: 620,
            brand: 'Cargo',
            rating: 4.5,
            numReviews: 10,
            countInStock: 0,
            description: "High quality product"
        },
    ]
}
export default data;