import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindManyOptions, Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  /**
   * this is function is used to create Feedback in Feedback Entity.
   * @param createFeedbackDto this will type of createFeedbackDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of Feedback
   */
  async createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback | any> {
    try {
      const feedback: Feedback = new Feedback();
      feedback.userID = createFeedbackDto.userID;
      feedback.name = createFeedbackDto.name;
      feedback.description = createFeedbackDto.description;
      await this.feedbackRepository.save(feedback);

      return {
        code:"200",
        message:"Feedback created successfully"
      }
    }catch(error) {
      console.log("Error while creating feedback:", error);
      return {
        code:"500",
        message:"External error.",
        error:error
      };
    }
  }

  /**
   * this function is used to get all the user's feedbacks
   * @returns promise of array of feedbacks
   */
  async findAllUsersFeedbacks(userID:string): Promise<Feedback[] | any> {
    try {
      const options: FindManyOptions<Feedback> = { //filtring criteria
        where: [
          {userID:userID}
        ], 
      };
      const feedbacks:Feedback[] = await this.feedbackRepository.find(options);
      return feedbacks;
    }catch(error) {
      console.log("Error while creating feedback:", error);
      return {
        code:"500",
        message:"External error.",
        error:error
      };
    }
  }

//   /**
//    * this function is used to updated specific user whose id is passed in
//    * parameter along with passed updated data
//    * @param id is type of number, which represent the id of user.
//    * @param updateUserDto this is partial type of createUserDto.
//    * @returns promise of udpate user
//    */
  async updateFeedback(userID: string, updateFeedbackDto: UpdateFeedbackDto): Promise<any> {
    try{
      const existOne = await this.feedbackRepository.findOne({
        where:[
          {userID:userID, id:updateFeedbackDto.id}
        ]
      });//check if feedback belongs to user and if it exist
      if(!existOne) {
        return {
          code:"404",
          message:"Feedback not found or does not belong to the user."
        }
      }
    const feedback: Feedback = new Feedback();
    feedback.id = updateFeedbackDto.id;
    feedback.userID = userID;
    feedback.name = updateFeedbackDto.name;
    feedback.description = updateFeedbackDto.description;
    feedback.isDraft = updateFeedbackDto.isDraft;
    feedback.json = updateFeedbackDto.json;
    await this.feedbackRepository.save(feedback);
    return {
      code:"200",
      message:`Feedback #${feedback.id} udpated successfully.`
    }
    }catch(error) {
      console.log("Error while updating feedback:", error)
      return {
        code:"500",
        message:"External error.",
        error:error
      };
    }
  }

  async removeFeedback(userID:string, feedbackID:string): Promise<any> {
    try
    {
      const feedback = await this.feedbackRepository.delete({
        userID: userID,
        id: feedbackID
      });
      if (!feedback) {
        return {
          code:"500",
          message:"External error."
        };
      }
  
      if (feedback.affected === 0) {
        return {
          code:"404",
          message:"Feedback not found or does not belong to the user."
        };
      }
    return {
      code:"200",
      message:`Feedback #${feedbackID} deleted successfully.`
    };
    }catch(error) {
      console.log("Error while deleting feedback", error);
      return {
        code:"500",
        message:"External error.",
        error:error
      };
    }
  }
}