import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber:{
        type:String,
        required: true,
    },
    address:{
      type:String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;