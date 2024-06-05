/* MongoDB Connection Package  */
const mongoose = require("mongoose");

/* Schema(s) for User Schema */
const countrys = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

const genders = ['male', 'female'];

const roles = ['user', 'admin'];

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    houseNumber: {
        type: Number,
        required: true
    }
});

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const paymentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    },
    bic: {
        type: String,
        required: false
    }
});

const notificationElementSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* User Schema */
const userSchema = new mongoose.Schema({
    ID: {
        type: Number,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    address: addressSchema,
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    subscription: subscriptionSchema,
    payment: paymentSchema,
    hobbys: {
        type: [String],
        required: true,
        enum: [
            "Sport",
            "Kochen",
            "Lesen",
            "Reisen",
            "Musik",
            "Kunst",
            "Tiere",
            "Garten",
            "Fotografie",
            "Handwerk",
            "Technik",
            "Gesundheit",
            "Essen",
            "Trinken",
            "Kino",
            "Theater",
            "Tanzen",
            "Schwimmen",
            "Wandern",
            "Fahrrad",
            "Motorrad",
            "Auto",
            "Fliegen",
            "Boot",
            "Angeln",
            "Jagen",
            "Schießen",
            "Klettern",
            "Tauchen",
            "Skifahren",
            "Snowboard",
            "Surfen",
            "Segeln",
            "Kajak",
            "Kanu",
            "Rudern",
            "Tennis",
            "Golf",
            "Fußball",
            "Basketball",
            "Volleyball",
            "Handball",
            "Tischtennis",
            "Badminton",
            "Bowling",
            "Billard",
            "Dart",
            "Schach",
            "Poker",
            "Bridge",
            "Backgammon",
            "Brettspiele",
            "Kartenspiele",
            "Computerspiele",
            "Konsolenspiele",
            "Handyspiele",
            "Online Spiele",
            "Social Media",
            "Blogging",
            "Vlogging",
            "Podcasting",
            "Streaming",
            "Fernsehen",
            "Radio",
            "Musikinstrumente",
            "Gesang",
            "Tanz",
            "Theater",
            "Kunst",
            "Malen",
            "Zeichnen",
            "Basteln",
            "Modellbau",
            "Nähen",
            "Stricken",
            "Häkeln",
            "Kochen",
            "Backen",
            "Grillen",
            "Barbecue",
            "Essen",
            "Trinken",
            "Cocktails",
            "Wein",
            "Bier",
            "Whisky",
            "Rum",
            "Gin",
            "Wodka"
        ],
        default: []
    },
    notifications: [notificationElementSchema],
    locked: {
        type: Boolean,
        required: false,
    }
}, { timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});

/* Messages Schema */
const messagesSchema = new mongoose.Schema({
    ID: {
        type: Number,
        unique: true
    },
    senderId: {
        type: Number,
        required: true
    },
    receiverId: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* Images Schema */
const imagesSchema = new mongoose.Schema({
    ID: {
        type: Number,
        unique: true
    },
    byUserID: {
        type: Number,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    }
});

const matchesSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    },
    matchID: {
        type: Number,
        required: true
    }
});

/* Auto Assignment of Id(s) */
userSchema.pre("save", async (next) => {
    if (!this.ID) {
        try {
            const maxIdEntity = await User.findOne().sort({ ID: -1 }).select("ID");
            this.ID = maxIdEntity ? maxIdEntity.ID + 1 : 1;

            if (!this.address.country in countrys) {
                throw Error("That country doesn't exist!");
            };

            if (!this.gender in genders){
                throw Error("That country doesn't exist!");
            }

            if (!this.role in roles){
                throw Error("That role doesn't exist!");
            }
        } catch (error) {
            console.warn("[ERROR] :", error);
            return next(error);
        }
    }
    next();
});

messagesSchema.pre("save", async (next) => {
    if (!this.ID) {
        try {
            const maxIdEntity = await Messages.findOne().sort({ ID: -1 }).select("ID");
            this.ID = maxIdEntity ? maxIdEntity.ID + 1 : 1;

            const doesSenderIdExist = User.findOne({
                ID: this.senderId
            });
            const doesReceiverIdExist = User.findOne({
                ID: this.receiverId
            });
            if (!doesSenderIdExist || !doesReceiverIdExist){
                throw Error("Sender or receiver of the message does not exist!");
            }

        } catch (error) {
            console.warn("[ERROR] :", error);
            return next(error);
        }
    }
    next();
});

imagesSchema.pre("save", async (next) => {
    if (!this.ID) {
        try {
            const maxIdEntity = await Images.findOne().sort({ ID: -1 }).select("ID");
            this.ID = maxIdEntity ? maxIdEntity.ID + 1 : 1;

            const doesUserIdExist = User.findOne({
                ID: this.byUserID
            });
            if (!doesUserIdExist){
                throw Error("UserId of the images sender doesn't exist!");
            }

        } catch (error) {
            console.warn("[ERROR] :", error);
            return next(error);
        }
    }
    next();
});

matchesSchema.pre("save", async (next) => {
    if (!this.ID) {
        try {
            const maxIdEntity = await Matches.findOne().sort({ ID: -1 }).select("ID");
            this.ID = maxIdEntity ? maxIdEntity.ID + 1 : 1;

            const doesUserIdExist = User.findOne({
                ID: this.userID
            });
            const doesMatchIdExist = User.findOne({
                ID: this.matchID
            });
            if (!doesUserIdExist || !doesMatchIdExist){
                throw Error("UserId or MatchID doesn't exist!");
            }

        } catch (error) {
            console.warn("[ERROR] :", error);
            return next(error);
        }
    }
    next();
})

/* Create the model(s) */
const Images = mongoose.model("Images", imagesSchema);
const Matches = mongoose.model("Matches", matchesSchema);
const Messages = mongoose.model("Messages", messagesSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    Images,
    Matches,
    Messages,
    User
};
