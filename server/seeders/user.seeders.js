import { faker } from '@faker-js/faker';
import { User } from '../models/user.models.js';



const createUser = async (numUsers) => {
    try {

        const usersPromices = [];

        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                bio: faker.lorem.sentence(10),
                password: "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName()
                }
            })
            usersPromices.push(tempUser)

        }


        await Promise.all(usersPromices)

        console.log("Users created", numUsers);
        process.exit(1);

        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}



export { createUser };
