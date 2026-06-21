import APIBase from "./httpBase";

class LaunchReminderService extends APIBase {
  async create(email?: string) {
    return this.post<{ email: string; alreadyRegistered: boolean }>(
      "launch-reminders",
      email ? { email } : {},
    );
  }
}

export const launchReminderService = new LaunchReminderService();
