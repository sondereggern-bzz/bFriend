const mongoose = require('mongoose');
const { User, Images, Messages, Matches } = require('./models');

mongoose.connect('mongodb://localhost:27017/bFriend-database');

// Sample test data for two users
const usersData = [
    {
        ID: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        passwordHash: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', // "hello"
        address: {
            country: 'United States of America',
            city: 'New York',
            street: '123 Main Street',
            houseNumber: 101
        },
        gender: 'male',
        role: 'user',
        subscription: {
            name: 'Premium',
            price: 19.99
        },
        payment: {
            fullname: 'John Doe',
            iban: 'IBAN1234567890',
            bic: 'BIC987654321'
        },
        hobbys: ['Sport', 'Lesen', 'Fotografie'],
        features: [
            {
                name: 'Messaging',
                active: true
            },
            {
                name: 'Premium',
                active: true
            }
        ],
        notifications: [{ message: 'Welcome to our platform!' }]
    },
    {
        ID: 2,
        firstname: 'Alice',
        lastname: 'Smith',
        email: 'alice@example.com',
        passwordHash: 'hashed_password',
        address: {
            country: 'Canada',
            city: 'Toronto',
            street: '456 Elm Street',
            houseNumber: 202
        },
        gender: 'female',
        role: 'user',
        subscription: {
            name: 'Basic',
            price: 9.99
        },
        payment: {
            fullname: 'Alice Smith',
            iban: 'IBAN0987654321',
            bic: 'BIC123456789'
        },
        hobbys: ['Reisen', 'Fotografie', 'Kochen'],
        features: [
            {
                name: 'Messaging',
                active: true
            },
            {
                name: 'Basic',
                active: true
            }
        ],
        notifications: [{ message: 'Welcome to our platform!' }]
    }
];

const imagesData = [
    {
        ID: 1,
        byUserID: 1,
        filename: 'image1.jpg',
        extension: 'jpg',
        image: Buffer.from('your_image_data_here', 'base64')
    },
    {
        ID: 2,
        byUserID: 2,
        filename: 'image2.jpg',
        extension: 'jpg',
        image: Buffer.from('your_image_data_here', 'base64')
    }
];

const messagesData = [
    {
        ID: 1,
        senderId: 1,
        receiverId: 2,
        message: 'Hello Alice!'
    },
    {
        ID: 2,
        senderId: 2,
        receiverId: 1,
        message: 'Hi John!'
    }
];

const matchesData = [
    {
        userID: 1,
        matchID: 2
    },
    {
        userID: 2,
        matchID: 1
    }
];

async function insertTestData() {
    try {
        const users = await User.create(usersData);
        console.log('Users created:', users);

        const images = await Images.create(imagesData);
        console.log('Images created:', images);

        const messages = await Messages.create(messagesData);
        console.log('Messages created:', messages);

        const matches = await Matches.create(matchesData);
        console.log('Matches created:', matches);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting test data:', error);
    }
}

insertTestData();
