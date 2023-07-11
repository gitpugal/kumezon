export const users = {
    name: "users",
    type: "document",
    title: "Users",
    fields:[
        {
            name: "username",
            type: "string",
            title: "Username", 
        },
        {
            name: "email",
            type: "string",
            title: "Email", 
        },
        {
            name: "cart",
            type: "array",
            of: [{type: 'string'}],
            title: "Cart"
        },
        {
            name: "favorites",
            type: "array",
            of: [{type: "string"}],
            title: "Favorites"
        },
        {
            name: 'orders',
            title: 'Orders',
            type: "array",
            of: [{
                type: "document",
                fields: [
                    {
                        name: "productId",
                        type: "string",
                        title: "ProductId", 
                    },
                    {
                        name: "price",
                        type: "number",
                        title: "Price", 
                    },
                    {
                        name: "delivered",
                        type: "boolean",
                        title: "Delivered", 
                    },
                    {
                        name: "quantity",
                        type: "number",
                        title: "Quantity", 
                    },
                    {
                        name: "name",
                        type: "string",
                        title: "Name", 
                    },
                ]
            }]
        }
    ]
}