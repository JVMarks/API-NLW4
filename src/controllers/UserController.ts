import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    //SELECT * FROM USERS WHERE EMAIL = EMAIL
    const userAleradyExists = await usersRepository.findOne({
      email,
    });

    if (userAleradyExists) {
      return response.status(400).json({
        error: "User already exists!",
      });
    }

    const user = usersRepository.create({
      name,
      email,
    })

    await usersRepository.save(user);

    return response.status(201).son(user);
  }

}

export { UserController };