import { AllowedMentionsTypes, Bot } from "../../deps.ts";
import { validateComponents } from "../components.ts";

export function sendMessage(bot: Bot) {
  const sendMessage = bot.helpers.sendMessage;

  bot.helpers.sendMessage = function (channelId, content) {
    if (
      content.content &&
      !bot.utils.validateLength(content.content, { max: 2000 })
    ) {
      throw new Error("The content should not exceed 2000 characters.");
    }

    if (content.allowedMentions) {
      if (content.allowedMentions.users?.length) {
        if (
          content.allowedMentions.parse?.includes(
            AllowedMentionsTypes.UserMentions,
          )
        ) {
          content.allowedMentions.parse = content.allowedMentions.parse.filter((
            p,
          ) => p !== "users");
        }

        if (content.allowedMentions.users.length > 100) {
          content.allowedMentions.users = content.allowedMentions.users.slice(
            0,
            100,
          );
        }
      }

      if (content.allowedMentions.roles?.length) {
        if (
          content.allowedMentions.parse?.includes(
            AllowedMentionsTypes.RoleMentions,
          )
        ) {
          content.allowedMentions.parse = content.allowedMentions.parse.filter((
            p,
          ) => p !== "roles");
        }

        if (content.allowedMentions.roles.length > 100) {
          content.allowedMentions.roles = content.allowedMentions.roles.slice(
            0,
            100,
          );
        }
      }
    }

    if (content.components) validateComponents(bot, content.components);

    return sendMessage(channelId, content);
  };
}
