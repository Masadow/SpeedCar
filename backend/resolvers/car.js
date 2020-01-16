module.exports = {
    CarQuery: {
        my_cars(root, args, context) {
            return context.prisma.user({id: context.user.id}).cars()
        }
    },
    CarMutation: {
        add_car(root, args, context) {
            return context.prisma.createCar({
                owner: {
                    connect: {id: context.user.id},
                },
                model: args.model,
                brand: args.brand,
                year: args.year,
                horsepower: args.horsepower
            });
        },
    }
};