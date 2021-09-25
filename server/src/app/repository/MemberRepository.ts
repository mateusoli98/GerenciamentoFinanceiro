import { getRepository } from "typeorm";
import Member from "../models/Member";
import { IMemberRepository } from "./repositoryInterfaces/IMemberRepository";

class MemberRepository implements IMemberRepository {
  async create(userId: string, planningGuid: string): Promise<boolean> {
    const repository = getRepository(Member);

    await repository.query(
      `INSERT INTO 
            public.member("planningGuid", "userId")
	    VALUES ('${planningGuid}', '${userId}')`
    );

    return false;
  }
}

export default new MemberRepository();
