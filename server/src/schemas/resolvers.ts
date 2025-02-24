import { User } from '../models/index.js'
import { signToken, AuthenticationError } from '../services/auth.js';

interface AddUserArgs {
          username: string;
          email: string;
          password: string;
        }

interface LoginUserArgs {
    email: string;
    password: string;
}

interface AddBookArgs {
    userId: string;
    bookId: string;
    
}

interface RemoveBookArgs {
    userId: string;
    bookId: string;
}

const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find({}).populate('savedBooks');
            } catch (error) {
                console.error('Failed to fetch users data.', error);
                throw new Error('Failed to fetch users data.');
            }
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                console.log('hit-me')
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }

            throw new AuthenticationError('could not authenticate user.')
        }
    },
    Mutation: {

        // user mutations

        addUser: async (_parent: any, { username, email, password }: AddUserArgs) => {
            console.log(username, email, password);
            const user = await User.create({username, email, password});
            const token = signToken({username: user.username, email: user.email, _id: user._id});

            return { token, user }
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            console.log(email, password);
            //find user
            const user = await User.findOne({ email });
            //throw error if none
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.')
            }
            //check password
            const correctPw = await user.isCorrectPassword(password);
            //throw error if bad
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.')
            }
            //extract jwt compatible info
            //get token
            const tokenKey = {username: user.username, email: user.email, _id: user.id}
            console.log('tokenKey:', tokenKey);
            const token = signToken({username: user.username, email: user.email, _id: user._id});
            //give token and user data
            return { token, user };
        },

        // book mutations

        addBook: async (_parent: any, { userId, bookId }: AddBookArgs) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { savedBooks: bookId }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },

        removeBook: async (_parent: any, { userId, bookId }: RemoveBookArgs) => {
            return await User.findOneAndUpdate(
                {_id: userId },
                {$pull: { savedBooks: { _id: bookId } } },
                {new: true}
            );
        },
    }
}

export default resolvers;