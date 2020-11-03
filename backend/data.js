import bcrypt from 'bcryptjs'
const data = {
    users: [
        {

            name: 'Ashutosh',
            email: "admin@example.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Akash',
            email: "user@example.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            // _id: '1',
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 120,
            brand: 'Nike',
            rating: 0,
            numReviews: 0,
            countInStock: 10,
            description: "High quality product"
        },
        {
            // _id: '2',
            name: 'Addidas fit Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            brand: 'Addidas',
            rating: 0,
            numReviews: 0,
            countInStock: 7,
            description: "High quality product"
        },
        {
            // _id: '3',
            name: 'Denim Jeans Shirt',
            category: 'Shirts',
            image: '/images/p5.jpg',
            price: 400,
            brand: 'Denim',
            rating: 0,
            numReviews: 0,
            countInStock: 9,
            description: "High quality product"
        },
        {
            // _id: '4',
            name: 'Nike Slim Jeans',
            category: 'Pants',
            image: '/images/i2.jpg',
            price: 120,
            brand: 'Nike',
            rating: 0,
            numReviews: 0,
            countInStock: 16,
            description: "High quality product"
        },
        {
            // _id: '5',
            name: 'Stylo Slim Jeans',
            category: 'Pants',
            image: '/images/i1.jpg',
            price: 320,
            brand: 'Stylo',
            rating: 0,
            numReviews: 0,
            countInStock: 4,
            description: "High quality product"
        },
        {
            // _id: '6',
            name: 'Cargo Fit Pant',
            category: 'Shirts',
            image: '/images/i2.jpg',
            price: 620,
            brand: 'Cargo',
            rating: 0,
            numReviews: 0,
            countInStock: 0,
            description: "High quality product"
        },
    ]
}
export default data;