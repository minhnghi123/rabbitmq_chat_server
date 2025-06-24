import amqp, { Connection, Channel } from "amqplib";
import config from "../config/config";
import { User } from "../database";
import { ApiError } from "../utils";
import mongoose from "mongoose";

class RabbitMQService {
  private requestQueue = "USER_DETAILS_REQUEST";
  private responseQueue = "USER_DETAILS_RESPONSE";
  private connection!: Connection;
  private channel!: Channel;
  constructor() {
    this.init();
  }
  async init() {
    this.connection = await amqp.connect(config.msgBrokerURL!);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(this.requestQueue);
    await this.channel.assertQueue(this.responseQueue);

    this.listenForRequests();
  }
  private async listenForRequests() {
    this.channel.consume(this.requestQueue, async (msg) => {
      if (msg && msg.content) {
        try {
          const { userId } = JSON.parse(msg.content.toString());
          const userDetails = await getUserDetails(userId);

          // Send the user details response
          this.channel.sendToQueue(
            this.responseQueue,
            Buffer.from(JSON.stringify(userDetails)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
        } catch (error) {
          // Log error, optionally send error response
          console.error(error);
        } finally {
          // Always acknowledge the message to avoid crash
          this.channel.ack(msg);
        }
      }
    });
  }
}
const getUserDetails = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id");
  }
  const userDetails = await User.findById(userId).select("-password");
  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }
  return userDetails;
};

export const rabbitMQService = new RabbitMQService();
