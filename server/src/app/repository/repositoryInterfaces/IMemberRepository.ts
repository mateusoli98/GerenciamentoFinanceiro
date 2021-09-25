export interface IMemberRepository {
  create(userId: string, planningGuid: string): Promise<boolean>;
}
