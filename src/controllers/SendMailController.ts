import { Response, Request } from 'express';
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppErrors';
import { SurveysRepository } from "../repositories/SurveysRepositories";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailSercie from '../services/SendMailSercie';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      throw new AppError("User does not exists")
    }

    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })

    if (!surveyAlreadyExists) {
      throw new AppError("Survey does not exists")
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: userAlreadyExists.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: "",
      //user_id: userAlreadyExists.id,
      link: process.env.URL_MAIL,
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailSercie.execute(email, surveyAlreadyExists.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;
    await SendMailSercie.execute(email, surveyAlreadyExists.title, variables, npsPath);

    return response.json(surveyUser);
  }
}

export { SendMailController };