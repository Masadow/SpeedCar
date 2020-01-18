module.exports = {
    CarQuery: {
        myCars(root, args, context) {
            return context.prisma.user({id: context.user.id}).cars();
        },
        myCar(root, args, context) {
            return context.prisma.car({id: args.id}).then((car) => car && car.owner.id == context.user.id ? car : null);
        },
    },
    CarMutation: {
        addCar(root, args, context) {
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
        async editCar(root, args, context) {
            const canUpdate = await context.prisma.car({id: args.id}).then((car) => car && car.owner.id == context.user.id ? car : null);
            if (!canUpdate) {
                return {};
            }
            return context.prisma.updateCar({
                data: {
                    model: args.model,
                    brand: args.brand,
                    year: args.year,
                    horsepower: args.horsepower
                },
                where: {
                    id: args.id
                }
            });
        },
        deleteCar(root, args, context) {
            return context.prisma.deleteCar({
                id: args.id
            });
        }
    }
};