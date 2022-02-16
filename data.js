const tables =[
    {
        id:"1",
        name:"salon",
        category_id:"1",
    },
    {
        id:"2",
        name:"salon",
        category_id:"1",
    },
    {
        id:"3",
        name:"salon",
        category_id:"2",
    },
    {
        id:"4",
        name:"salon",
        category_id:"3",
    },
    {
        id:"5",
        name:"salon",
        category_id:"3",
    },
];

const categories =[
    {
        id: "1",
        name: "fast",
        table_id:"1"
    },
    {
        id: "2",
        name: "drink",
        table_id:"2"
    },
    {
        id: "3",
        name: "drink",
        table_id:"3"
    },
    {
        id: "3",
        name: "Grills",
        table_id:"4"
    },
];
const foods =[
    {
        id: "1",
        name: "khalaf",
        category_id: "2",
    },
    {
        id: "1",
        name: "mjaas",
        category_id: "2",
    },
    {
        id: "2",
        name: "zingar",
        category_id: "1",
    },
    {
        id: "3",
        name: "borger",
        category_id: "1",
    },
    {
        id: "3",
        name: "kebab",
        category_id: "3",
    },
];
const comments =[
    {
        id:"1",
        text: "its very nice",
        food_id: "1"
    },
    {
        id:"2",
        text: "its not nice",
        food_id: "1"
    },
    {
        id: "3",
        text: "its normal",
        food_id: "2"
    }
]

module.exports = {categories, foods , comments, tables}