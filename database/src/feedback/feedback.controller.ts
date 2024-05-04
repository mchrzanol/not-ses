import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
  
  /**
   * whatever the string pass in controller decorator it will be appended to
   * API URL. to call any API from this controller you need to add prefix which is
   * passed in controller decorator.
   * in our case our base URL is http://localhost:3000/user
   */
  @Controller()
  export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}
  
    /**
     * create feedback function
     * @MessagePattern  'create-feedback'
     * @Return  feedback dto from db
     */
    @MessagePattern("create-feedback")
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
      return this.feedbackService.createFeedback(createFeedbackDto);
    }
  
    /**
     * gets all feedbacks related with userID
     * @MessagePattern  'find-all-feedback'
     * @Return  array of all user's feedbacks
     */
    @MessagePattern("find-all-feedback")
    findAll(@Body() userID:string) {
      return this.feedbackService.findAllUsersFeedbacks(userID);
    }

    @MessagePattern("update-feedback")
    update(@Body() { userID, updateFeedbackDto }: { userID: string, updateFeedbackDto: UpdateFeedbackDto }) {
      return this.feedbackService.updateFeedback(userID, updateFeedbackDto);
    }
  
    @MessagePattern("delete-feedback")
    remove(@Body() {userID, feedbackID} : {userID:string, feedbackID:string}) {
      return this.feedbackService.removeFeedback(userID, feedbackID);
    }
  }