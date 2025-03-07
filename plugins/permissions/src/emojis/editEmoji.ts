import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function editEmoji(bot: BotWithCache) {
  const editEmoji = bot.helpers.editEmoji;

  bot.helpers.editEmoji = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return await editEmoji(guildId, id, options);
  };
}
