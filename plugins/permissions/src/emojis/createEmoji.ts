import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function createEmoji(bot: BotWithCache) {
  const createEmoji = bot.helpers.createEmoji;

  bot.helpers.createEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return await createEmoji(guildId, id);
  };
}
