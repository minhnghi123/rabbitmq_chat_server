export class UserStatusStore {
  private static instance: UserStatusStore;
  private userStatuses: Record<string, boolean> = {};
  private contructor() {
    this.userStatuses = {};
  }

  public static getInstance(): UserStatusStore {
    if (!UserStatusStore.instance) {
      UserStatusStore.instance = new UserStatusStore();
    }
    return UserStatusStore.instance;
  }
  public setUserOnline(userId: string): void {
    this.userStatuses[userId] = true;
  }
  public setUserOffline(userId: string): void {
    this.userStatuses[userId] = false;
  }
  public isUserOnline(userId: string): boolean {
    return !!this.userStatuses[userId];
  }
}
