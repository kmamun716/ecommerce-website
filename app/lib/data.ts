import { User } from "./models";
import { connectToDb } from "./utils";

export const fetchUsers = async () => {
    try {
        await connectToDb();
        const users = await User.find({});
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
}