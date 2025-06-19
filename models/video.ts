import mongoose, { Schema, models, model } from "mongoose";

export const Video_Dimentions = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumnailUrl: string;
  cntrols?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const VideoShema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumnailUrl: {
    type: String,
    required: true,
  },
  cntrols: {
    type: Boolean,
    required: true,
  },
  transformation: {
    height: {
      type: Number,
      default: Video_Dimentions.height,
    },
    width: {
      type: Number,
      default: Video_Dimentions.width,
    },
    quality: {
        type : Number,
        min:1,
        max:100
    }
  },
},
{
    timestamps : true
});

const Video = models?.video || model<IVideo>("video", VideoShema)

export default Video