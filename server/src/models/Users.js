import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'profileModel'
    },
    profileModel: {
        type: String,
        enum: ['Student','Teacher'],
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    //Only hash if the password has changed.
    if (!this.isModified('password')) return next();
    //Turn it into an unreadable spell.
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);